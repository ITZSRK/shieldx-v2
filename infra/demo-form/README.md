# Demo-request form handler

Replaces the Make.com webhook the demo form used to post to. That webhook was
`hook.eu1.make.com` — Make's **EU** region — while the site's privacy policy
says personal data is not transferred outside India. The first thing a bank
CXO gave us therefore left the country before anything else happened.

This runs in `ap-south-1` and mails through SES in the same region.

## One-time setup

**1. Attach this policy to the `vi-terraform-deploy` IAM user.**
Name it `shieldx-demo-form`. It is scoped to one function; nothing wider.
(`IAMFullAccess` is already on that user, so the execution role is created by
`deploy.sh` — no separate role step is needed.)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ManageDemoFormFunction",
      "Effect": "Allow",
      "Action": [
        "lambda:CreateFunction",
        "lambda:UpdateFunctionCode",
        "lambda:UpdateFunctionConfiguration",
        "lambda:GetFunction",
        "lambda:GetFunctionConfiguration",
        "lambda:GetFunctionUrlConfig",
        "lambda:CreateFunctionUrlConfig",
        "lambda:UpdateFunctionUrlConfig",
        "lambda:AddPermission",
        "lambda:InvokeFunction"
      ],
      "Resource": "arn:aws:lambda:ap-south-1:971422673619:function:shieldx-demo-form"
    },
    {
      "Sid": "SesSetupAndSend",
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail",
        "ses:CreateEmailIdentity",
        "ses:GetEmailIdentity",
        "ses:ListEmailIdentities",
        "ses:GetAccount"
      ],
      "Resource": "*"
    }
  ]
}
```

Plus API Gateway, which the first version of this did not need:

```json
{
  "Effect": "Allow",
  "Action": ["apigateway:GET","apigateway:POST","apigateway:PATCH","apigateway:PUT","apigateway:DELETE"],
  "Resource": ["arn:aws:apigateway:ap-south-1::/apis","arn:aws:apigateway:ap-south-1::/apis/*"]
}
```

**2. Run the deploy.**

```bash
./infra/demo-form/deploy.sh
```

The first run will report that the recipient address is not a verified SES
identity and trigger a verification email. Click the link, re-run, and it
prints the endpoint URL.

**3. Put the printed URL into `src/pages/Demo.jsx`**, replacing the Make.com
one, then commit — GitHub Actions deploys the site.

## Lead store and alerting

Leads are written to the **`shieldx-demo-leads`** DynamoDB table in `ap-south-1`
*before* the email is sent. Email alone was not a record — deleting the mail
meant losing the lead, and an SES outage meant never knowing one arrived.

```bash
aws dynamodb scan --table-name shieldx-demo-leads --region ap-south-1
```

The handler stores first, mails second, and returns `200` if **either**
succeeds. It only returns `502` when both fail. Each path logs a distinct
line — `LEAD_STORE_FAILURE`, `LEAD_MAIL_FAILURE`, `LEAD_LOST` — and a
CloudWatch metric filter turns those into the `shieldx-demo-form-lead-failure`
alarm, which notifies the `shieldx-demo-form-alerts` SNS topic.

Alarm on the log lines, not on Lambda's error metric: a partial failure still
returns `200`, so the error metric stays flat and would never fire.

**Retention.** Rows carry an `expiresAt` TTL, default **1095 days (3 years)**.
DynamoDB deletes them automatically. This is personal data under the DPDP Act,
so the retention period is a deliberate decision — change it with
`LEAD_RETENTION_DAYS` and re-run the deploy. Existing rows keep the TTL they
were written with.

## SES sandbox

The account starts in the SES sandbox, which only permits sending to verified
addresses. That is fine here: the only recipient is our own inbox. Production
access is only needed if we ever mail the lead directly (an autoresponder, for
example) — that would be a support request to AWS.

## Why API Gateway and not a Lambda Function URL

Both dead ends are recorded here so nobody spends an afternoon rediscovering
them:

1. **A public Lambda Function URL does not work in this account.** With
   `AuthType: NONE` and a correct `Principal: "*"` resource policy, anonymous
   requests return `403 AccessDeniedException` and never invoke the function. A
   SigV4-signed request to the same URL returns `200`. It is an account-level
   control, not a permissions gap, so no policy fixes it.
2. **CloudFront + Origin Access Control in front of that URL also failed.** The
   origin, OAC (`lambda` type), `AllViewerExceptHostHeader` origin request
   policy and the `cloudfront.amazonaws.com` resource policy were all in place,
   across two path-pattern variants, and the function logged **zero
   invocations**. The site's SPA fallback (`403 -> /index.html` as `200`) masks
   the real status, so every failure looks like a cheerful 200 — check
   CloudWatch invocation counts, not HTTP status, when debugging this.

API Gateway avoids both. It is a normal regional HTTPS endpoint in
`ap-south-1`, so the residency property is unchanged.

## Notes

- The Function URL restricts CORS to `https://queloshieldx.in`. Browsers from
  other origins are refused; note that CORS is not an authentication control,
  and a determined caller can still POST directly. The handler is therefore
  written to be safe with untrusted input: every field is length-capped and
  HTML-escaped before it reaches the mail body, and a honeypot field absorbs
  the common bots.
- The handler never logs lead data — only the failure reason if SES rejects.
- Reply-To is set to the lead's address, so replying from the inbox reaches
  them rather than us.
- Retire the Make.com scenario only after a real submission has arrived
  through this path.
