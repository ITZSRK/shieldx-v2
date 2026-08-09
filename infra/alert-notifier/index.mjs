// Delivers CloudWatch alarm notifications by email through SES.
//
// Why this exists rather than subscribing an address to the SNS topic
// directly: every SNS email carries an unsubscribe URL, and following it is a
// plain GET that deactivates the subscription with no confirmation. Mail
// security scanners and link prefetchers follow URLs in messages as a matter of
// course, so an SNS email subscription silently unsubscribes itself — which
// already happened here, to the Gmail address, within minutes of confirming it.
//
// The failure mode is the dangerous kind: alerting disables itself, and you
// only discover it the next time something breaks and nobody is told. Mail we
// compose ourselves has no unsubscribe link, so there is nothing to click.

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const REGION = process.env.AWS_REGION || "ap-south-1";
const FROM = process.env.ALERT_SENDER;
const TO = (process.env.ALERT_RECIPIENTS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const ses = new SESv2Client({ region: REGION });

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const COLOR = { ALARM: "#c0392b", OK: "#1e8449", INSUFFICIENT_DATA: "#b7791f" };

export const handler = async (event) => {
  if (!TO.length) {
    console.error("ALERT_DELIVERY_FAILURE: no ALERT_RECIPIENTS configured");
    return;
  }

  for (const record of event.Records ?? []) {
    const raw = record.Sns?.Message ?? "";
    let a = null;
    try {
      a = JSON.parse(raw);
    } catch {
      // Not a CloudWatch alarm — forward the text so nothing is swallowed.
    }

    const state = a?.NewStateValue ?? "NOTIFICATION";
    const name = a?.AlarmName ?? record.Sns?.Subject ?? "AWS notification";
    const reason = a?.NewStateReason ?? raw;
    const when = a?.StateChangeTime ?? new Date().toISOString();
    const region = a?.Region ?? REGION;
    const accent = COLOR[state] ?? "#555";

    const subject = `[${state}] ${name}`;

    const html =
      `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#111">` +
      `<div style="display:inline-block;padding:4px 12px;border-radius:4px;background:${accent};color:#fff;font-weight:600;font-size:13px;letter-spacing:.04em">${esc(
        state
      )}</div>` +
      `<h2 style="margin:14px 0 6px;font-size:18px">${esc(name)}</h2>` +
      `<p style="margin:0 0 18px;color:#666">${esc(when)} · ${esc(region)}</p>` +
      `<div style="white-space:pre-wrap;padding:14px 16px;background:#f5f5f5;border-radius:6px;font-size:14px">${esc(
        reason
      )}</div>` +
      (state === "ALARM"
        ? `<p style="margin-top:18px">Check the handler logs:<br>` +
          `<code style="font-size:13px">aws logs tail /aws/lambda/shieldx-demo-form --since 30m --region ${esc(
            region
          )}</code></p>`
        : "") +
      `<p style="color:#999;font-size:12px;margin-top:22px">` +
      `Sent by shieldx-alert-notifier via SES. No unsubscribe link by design — ` +
      `see infra/alert-notifier/index.mjs.</p></div>`;

    const text = `[${state}] ${name}\n${when} · ${region}\n\n${reason}\n`;

    try {
      await ses.send(
        new SendEmailCommand({
          FromEmailAddress: FROM,
          Destination: { ToAddresses: TO },
          Content: {
            Simple: {
              Subject: { Data: subject, Charset: "UTF-8" },
              Body: {
                Html: { Data: html, Charset: "UTF-8" },
                Text: { Data: text, Charset: "UTF-8" },
              },
            },
          },
        })
      );
      console.log(`ALERT_DELIVERED: ${subject} -> ${TO.length} recipient(s)`);
    } catch (err) {
      // Nothing downstream can catch this, so make it loud in the log.
      console.error("ALERT_DELIVERY_FAILURE:", err.name, err.message);
      throw err;
    }
  }
};
