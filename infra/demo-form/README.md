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

**2. Run the deploy.**

```bash
./infra/demo-form/deploy.sh
```

The first run will report that the recipient address is not a verified SES
identity and trigger a verification email. Click the link, re-run, and it
prints the endpoint URL.

**3. Put the printed URL into `src/pages/Demo.jsx`**, replacing the Make.com
one, then commit — GitHub Actions deploys the site.

## SES sandbox

The account starts in the SES sandbox, which only permits sending to verified
addresses. That is fine here: the only recipient is our own inbox. Production
access is only needed if we ever mail the lead directly (an autoresponder, for
example) — that would be a support request to AWS.

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
