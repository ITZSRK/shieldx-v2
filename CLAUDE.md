# shieldx-v2

The **public ShieldX website** — `queloshieldx.in`, served from S3 +
CloudFront behind Route 53.

## Two things before you touch anything

**1. This repo lives on the Desktop, not in `~/Documents/GitHub/`.**
Every other ShieldX repo is there; this one is not. It was missing from
`~/STATUS.md` entirely until 2026-08-12 despite being a live production
surface. If you are looking for "the website repo", this is it —
`~/shieldx`, `~/shieldx/shieldx-website` and `~/Downloads/shieldx-website`
are all old, superseded copies.

**2. Pushing `main` auto-deploys to the live site.**
Standing rule: **build locally, screenshot, and get SRK's approval before
pushing.** An unpushed commit sitting here is usually *deliberately parked*
awaiting approval, not forgotten — ask before pushing it.

## Read this first

`~/shieldx-hq/` is the source of truth for positioning and constraints.
This repo is a public surface, so the constraints are not advisory:

- **Never name the anchor bank.** Anywhere. "A leading private-sector bank."
- **No model performance figures** — no AUC, no accuracy claims.
- **VI is never "real-time."** Post-call / batch only. The word is banned in
  VI content.
- **Voice AI is never the lead example** or the default-selected channel.
- **Sole founder** in all team references.
- **"DPDP Act, 2023"** — never "DPDPA 2025".
- No internal codenames: **Orchestrate**, **CredSignal**.

The governing sentence is locked and used verbatim:

> "ShieldX decides how every credit conversation should happen, executes it
> across every channel, and learns from what was actually said."

Positioning is **Customer Decisioning Infrastructure**. (The investor deck
footer says "Real-Time Decisioning Infrastructure" — that is a recorded,
deliberate carve-out for the deck footer only. Website copy uses Customer.)

## Design rules, learned the hard way

- **Dark is the ground for product pages.** Light backgrounds are for
  **Insights documents only**. Alternating light/dark bands on product pages
  were tried and rejected — do not reintroduce them.
- Insights articles are published here (RBI draft Model Risk Management
  guidance; DPDP collections implications).

## Insights content

Regulatory and statutory claims get a lawyer's read before publishing.
Verify source links by **reading the document**, not by checking that the
URL returns 200 — a live link to the wrong or superseded document is worse
than no link.

## Infra

- S3 bucket `shieldx-v2-site`, CloudFront, Route 53. Deploy IAM user is
  `shieldx-v2-github-deploy`.
- `queloai.online` is a **redirect and email domain only** — not the primary
  web domain. `queloshieldx.in` is primary.
- Retired hosting paths that may still appear in old material and should be
  rejected on sight: `shieldx-decision-engine.netlify.app`,
  `shieldx-engine.onrender.com`.
