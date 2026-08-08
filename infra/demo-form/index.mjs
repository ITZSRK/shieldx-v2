// Demo-request handler. Replaces the Make.com webhook the form used to post to,
// which lived in Make's EU region — while the privacy policy promises no
// transfer of personal data outside India. This runs in ap-south-1 and mails
// through SES in the same region, so the lead never leaves the country.
//
// Deployed as a Lambda Function URL (no API Gateway — nothing here needs it).

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const REGION = process.env.AWS_REGION || "ap-south-1";
const TO = process.env.LEAD_RECIPIENT;
const FROM = process.env.LEAD_SENDER;
const ALLOWED_ORIGIN = "https://queloshieldx.in";

const ses = new SESv2Client({ region: REGION });

const FIELDS = ["name", "company", "email", "role", "useCase"];
const MAX = { name: 120, company: 160, email: 200, role: 120, useCase: 4000 };

const cors = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

const reply = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json", ...cors },
  body: JSON.stringify(body),
});

// Escape before interpolating into the HTML mail body. Without this a lead
// could inject markup into an email we send ourselves.
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

export const handler = async (event) => {
  const method = event?.requestContext?.http?.method;
  if (method === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (method !== "POST") return reply(405, { error: "Method not allowed" });

  let data;
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body;
    data = JSON.parse(raw || "{}");
  } catch {
    return reply(400, { error: "Invalid JSON" });
  }

  // Honeypot: a hidden field only a bot fills. Accept silently so the bot
  // cannot distinguish rejection from success and retry differently.
  if (data.website) return reply(200, { ok: true });

  const clean = {};
  for (const f of FIELDS) {
    const v = (data[f] ?? "").toString().trim();
    if (!v) return reply(400, { error: `Missing field: ${f}` });
    if (v.length > MAX[f]) return reply(400, { error: `Field too long: ${f}` });
    clean[f] = v;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean.email)) {
    return reply(400, { error: "Invalid email" });
  }

  const received = new Date().toISOString();
  const rows = [
    ["Name", clean.name],
    ["Company", clean.company],
    ["Email", clean.email],
    ["Role", clean.role],
    ["Received", received],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;white-space:nowrap">${k}</td>` +
        `<td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`
    )
    .join("");

  const html =
    `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#111">` +
    `<h2 style="margin:0 0 18px;font-size:17px">New demo request</h2>` +
    `<table style="border-collapse:collapse;margin-bottom:20px">${rows}</table>` +
    `<div style="color:#666;margin-bottom:6px">Use case</div>` +
    `<div style="white-space:pre-wrap;padding:14px 16px;background:#f5f5f5;border-radius:6px">${esc(
      clean.useCase
    )}</div>` +
    `<p style="color:#999;font-size:12px;margin-top:22px">` +
    `queloshieldx.in · processed in ${REGION}</p></div>`;

  const text =
    `New demo request\n\n` +
    `Name: ${clean.name}\nCompany: ${clean.company}\nEmail: ${clean.email}\n` +
    `Role: ${clean.role}\nReceived: ${received}\n\nUse case:\n${clean.useCase}\n`;

  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: FROM,
        Destination: { ToAddresses: [TO] },
        // So hitting reply goes to the lead, not to ourselves.
        ReplyToAddresses: [clean.email],
        Content: {
          Simple: {
            Subject: {
              Data: `Demo request — ${clean.name}, ${clean.company}`,
              Charset: "UTF-8",
            },
            Body: {
              Html: { Data: html, Charset: "UTF-8" },
              Text: { Data: text, Charset: "UTF-8" },
            },
          },
        },
      })
    );
  } catch (err) {
    // Log the failure reason, never the lead's data.
    console.error("SES send failed:", err.name, err.message);
    return reply(502, { error: "Could not send" });
  }

  return reply(200, { ok: true });
};
