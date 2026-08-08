#!/usr/bin/env bash
# Deploys the demo-request handler: Lambda + Function URL + SES, all ap-south-1.
# Idempotent — safe to re-run to ship a code change.
#
# Prerequisites (see README.md): the vi-terraform-deploy user needs the
# shieldx-demo-form policy attached, and LEAD_RECIPIENT must be a
# verified SES identity (the script triggers verification if it isn't).
set -euo pipefail

REGION=ap-south-1
ACCOUNT=971422673619
FN=shieldx-demo-form
ROLE=shieldx-demo-form-lambda-role
RECIPIENT=${LEAD_RECIPIENT:-sudarson.krishnan@queloai.online}
SENDER=${LEAD_SENDER:-$RECIPIENT}
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export AWS_PAGER=""

say() { printf '\n\033[1m==> %s\033[0m\n' "$1"; }

say "Execution role"
if aws iam get-role --role-name "$ROLE" >/dev/null 2>&1; then
  echo "  exists"
else
  aws iam create-role --role-name "$ROLE" \
    --description "Execution role for the ShieldX website demo-request handler" \
    --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}' >/dev/null
  aws iam attach-role-policy --role-name "$ROLE" \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
  aws iam put-role-policy --role-name "$ROLE" --policy-name send-email \
    --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["ses:SendEmail","ses:SendRawEmail"],"Resource":"*"}]}'
  echo "  created — waiting for IAM propagation"
  sleep 12
fi

say "SES identity: $RECIPIENT"
STATUS=$(aws sesv2 get-email-identity --email-identity "$RECIPIENT" --region "$REGION" \
  --query 'VerifiedForSendingStatus' --output text 2>/dev/null || echo "MISSING")
if [ "$STATUS" = "True" ]; then
  echo "  verified"
else
  if [ "$STATUS" = "MISSING" ]; then
    aws sesv2 create-email-identity --email-identity "$RECIPIENT" --region "$REGION" >/dev/null
  fi
  echo "  NOT VERIFIED — AWS has emailed $RECIPIENT."
  echo "  Click the link in that mail, then re-run this script."
  exit 1
fi

say "Packaging"
BUILD="$(mktemp -d)"
cp "$HERE/index.mjs" "$BUILD/"
# @aws-sdk/client-sesv2 is present in the Lambda nodejs22.x runtime image, so
# nothing is bundled — the zip stays a couple of KB and deploys in seconds.
(cd "$BUILD" && zip -q -r function.zip index.mjs)

ENVVARS="Variables={LEAD_RECIPIENT=$RECIPIENT,LEAD_SENDER=$SENDER}"

say "Function"
if aws lambda get-function --function-name "$FN" --region "$REGION" >/dev/null 2>&1; then
  aws lambda update-function-code --function-name "$FN" --region "$REGION" \
    --zip-file "fileb://$BUILD/function.zip" >/dev/null
  aws lambda wait function-updated --function-name "$FN" --region "$REGION"
  aws lambda update-function-configuration --function-name "$FN" --region "$REGION" \
    --environment "$ENVVARS" --timeout 10 --memory-size 256 >/dev/null
  echo "  updated"
else
  aws lambda create-function --function-name "$FN" --region "$REGION" \
    --runtime nodejs22.x --handler index.handler \
    --role "arn:aws:iam::$ACCOUNT:role/$ROLE" \
    --zip-file "fileb://$BUILD/function.zip" \
    --environment "$ENVVARS" --timeout 10 --memory-size 256 \
    --description "ShieldX website demo-request form -> SES" >/dev/null
  aws lambda wait function-active --function-name "$FN" --region "$REGION"
  echo "  created"
fi

say "Function URL"
if ! aws lambda get-function-url-config --function-name "$FN" --region "$REGION" >/dev/null 2>&1; then
  aws lambda create-function-url-config --function-name "$FN" --region "$REGION" \
    --auth-type NONE \
    --cors 'AllowOrigins=["https://queloshieldx.in"],AllowMethods=["POST"],AllowHeaders=["content-type"],MaxAge=86400' >/dev/null
  # Function URLs still need an explicit resource policy for public invoke.
  aws lambda add-permission --function-name "$FN" --region "$REGION" \
    --statement-id FunctionURLAllowPublicAccess \
    --action lambda:InvokeFunctionUrl --principal "*" \
    --function-url-auth-type NONE >/dev/null 2>&1 || true
fi
URL=$(aws lambda get-function-url-config --function-name "$FN" --region "$REGION" \
  --query FunctionUrl --output text)

rm -rf "$BUILD"

say "Done"
echo "  Endpoint: $URL"
echo "  Put this in src/pages/Demo.jsx, replacing the Make.com URL."
