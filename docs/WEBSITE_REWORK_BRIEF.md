# ShieldX Website Rework Brief — v2 Relaunch

**For:** Claude Code session on the website repo
**Companion documents (place in repo `/docs` and read before starting):**
`DECISIONING_EVOLUTION.md` · `NEUTRALITY_CHARTER.md` · `QUELO_SHIELDX_BOILERPLATE.md`

---

## 0. Ground rules

- **Keep the design system.** Dark theme, glow accents, card grid, Motion wrappers, animated runtime demos — all retained. This is copy + information-architecture surgery, not a redesign.
- **Two-phase plan.** Phase 1 (this brief): content surgery in the current React SPA. Phase 2 (separate task, later): migrate to Next.js static generation for SEO/crawlability. Do NOT mix the phases.
- **Standing constraints (violations are release blockers):**
  - Never name the anchor bank. Only "a leading private-sector bank."
  - No model performance figures anywhere — no AUC, accuracy, confidence scores, latency claims ("under 5ms"), or prediction claims ("breach predicted 2 hours before").
  - No internal codenames.
  - VI (Voice Intelligence) is post-call / batch. Never real-time. Never blur with Assist Live.
  - Voice AI is never the lead example or default selected channel in any demo.
  - Statute name: "Digital Personal Data Protection Act, 2023" / "DPDP Act" (rules notified 2025 may be referenced as "DPDP Rules"). Replace every "DPDPA 2025" badge/label accordingly.
  - Any simulated UI must be capability-true OR carry a visible "Illustrative simulation" label.

## 1. Sitemap change

**Remove from nav and routing (301 to `/` when SSR lands):**
- `/lending` (Lending.jsx) — retire
- `/servicing` (Servicing.jsx) — retire
- `/solutions` (Solutions.jsx) — retire (three-vertical framing is dead)

**Keep (rework per sections below):**
- `/` Home · `/platform` · `/company` · `/demo` · `/security` · `/privacy` · `/terms`

**Add (new pages, existing design language):**
- `/platform/decision`, `/platform/engage`, `/platform/assist`, `/platform/intelligence` (or one `/platform` page with four deep sections — implementer's choice based on current router)
- `/deploy` — "How we deploy" (Patterns A/B/C)
- `/governance` — conduct compliance + RBI MRM readiness
- `/neutrality` — the charter, verbatim

**Nav order:** Platform · How we deploy · Governance · Neutrality · Company · [Request a walkthrough →]

## 2. Home (Home.jsx)

**Hero (replace):**
- H1: `Real-time decisioning infrastructure for India's credit conversations.`
- Sub: `ShieldX decides how every credit conversation should happen, executes it across every channel, and learns from what was actually said — governed and auditable end to end.`
- Proof strip under CTA: `Live with a leading private-sector bank · DPIIT-recognized · Mumbai`

**5-stage strip (rework labels):** current "Signal → Decision → Compliance → Routing → Execution" becomes the loop: `Signal → Decide → Govern → Execute → Learn`. The "Learn" stage is new: copy = "Post-call intelligence extracts what was said — objections, hardship, promises — and feeds the next decision. The loop closes."

**Animated runtime demo (keep component, fix content):**
- Keep ONLY the Collections scenario. Delete Lending and Servicing scenario data.
- Selected channel: change `voice_ai` → agent call with Assist context (e.g. `channel_selected: agent_call · assist_context`) or WhatsApp via bank's handle. Voice AI may appear as one *eligible* channel chip among several, not the selection.
- Remove numeric risk score (0.82) → categorical tier (`Risk tier: HIGH` is fine). Remove "under 5ms" and similar latency/accuracy claims.
- Add small caption: `Illustrative simulation`.
- Add a final demo step after "Audit record written": `Call analysed post-call — hardship mentioned → next treatment updated` (shows the loop).

**New section — the stack (5 rows, top→bottom):** System of record → Decision → Orchestrate → Execution adapters (theirs or ours) → Sensing (VI). One line each from DECISIONING_EVOLUTION.md §0.5. This replaces any three-vertical grid.

**Four product cards:** Decision / Engage / Assist / Intelligence, one line each (roles per §0.5), linking to platform pages.

## 3. Platform (Platform.jsx)

The existing 8-stage "Engine Internals" maps well — re-group under product names:
- Stages: Signal Ingestion, Normalisation, Scoring, Rule Evaluation, Compliance Gate, Routing → group under **Decision** (Routing stage is **Orchestrate — an internal module of Decision**).
- **Execution Adapter** stage → expand: adapters are pluggable and neutral; client's CPaaS under client's handles/templates, client's dialer, agency work-lists (SFTP/API), Engage, Diya voice — all speaking one treatment-in/outcome-out contract. Link to `/deploy`.
- **Audit Writer** → rename framing to **System of record**: decision log + outcome log + conversation-derived features.
- **Add ninth block — Intelligence (sensing):** post-call analysis of recorded calls (batch), extracting decision features that flow into the next decision. Explicitly "post-call — not an in-call system."
- Scoring block: remove "AI layer" tag hype; keep "configurable model weights and rule sets," add "champion/challenger by design — every strategy change measured against the incumbent before promotion."
- Runtime ticker: same fixes as Home demo (no voice_ai selection, no 0.82, illustrative label).

**Product sections/pages (copy from boilerplate + evolution doc):**
- **Decision** — the brain; scores, rules, cohort strategy, champion/challenger; mandatory in every deployment.
- **Engage** — reference execution channel *for institutions without pipes*; explicitly: "Have a CPaaS, dialer, and templates already? Keep them — ShieldX routes through your stack. Engage exists for institutions that need execution built in."
- **Assist** — two tiers: Assist Context (pre-call briefing — how a decision reaches a human) and Assist Live (in-call guidance). Note graceful degradation: audio failure degrades to Context, never to blank.
- **Intelligence** — post-call voice intelligence (compliance conduct flags, agent scorecards, decision features) + the governance face (registry, drift, evidence — link `/governance`).

## 4. New page — /deploy ("How we deploy")

Direct build from DECISIONING_EVOLUTION.md §0.6. Three pattern cards:
- **Pattern A — Your rails, your identity.** Bank keeps CPaaS contracts, sender IDs, DLT templates, WhatsApp handle. ShieldX decides account, treatment, template, timing; dispatches through the bank's stack. "Full decision visibility. Zero displacement."
- **Pattern B — Voice as a governed pool.** Existing voice partners keep their volume; any new channel (including ShieldX voice) enters the same pool, measured on one symmetric scorecard; volume follows performance under the institution's own allocation policy.
- **Pattern C — Full stack.** NBFCs, ARCs, agencies without pipes: Decision + Engage + voice, brain and hands.
Close with: "Always the decision. Never necessarily the delivery."

## 5. New page — /governance

Two halves:
- **Conduct compliance (salvage the good existing content):** move the TRAI window / TRAI DND / DPDP consent / RBI Fair Practices Code / recovery-agent conduct / frequency caps cards here from Collections.jsx (fix DPDPA naming). Framing: "enforced before any action fires."
- **Model governance (new — RBI MRM):** RBI's draft Model Risk Management guidance covers decisioning systems including rule engines and third-party models — inventory, validation, documentation, Three Lines of Defense, fairness testing. ShieldX ships this as platform capability: decision audit trails, versioned rules and strategies, champion/challenger evidence, explainability by design. Word carefully as "designed for RBI's draft MRM framework" (not "MRM-certified" or claims of features not yet built — no model registry claims as shipped; say "registry and drift monitoring on the platform roadmap" if mentioned at all, or omit).

## 6. New page — /neutrality

Render NEUTRALITY_CHARTER.md verbatim in the legal-page layout (same as Privacy/Terms). Title: "The ShieldX Neutrality Charter." Add nav/footer link.

## 7. Company (Company.jsx)

- Keep "The decision layer BFSI was missing" hero if desired, but scope the story to collections/credit conversations — remove lending/servicing decision-card examples (DEC-…LENDING cards) from the animation, or relabel all cards as collections decisions.
- Body: use the Standard + Extended boilerplate from QUELO_SHIELDX_BOILERPLATE.md. Founder: Sudarson Radhakrishnan, sole founder, 18 years BFSI (Citibank, Standard Chartered, Armsoftech, Yubi). DPIIT-recognized. Mumbai.
- No other team members or founder references anywhere.

## 8. Demo (Demo.jsx)

- Sub-copy: `20 minutes. Your portfolio, your channels — every decision and every compliance check, live.` Remove "Collections, Lending, or Servicing."
- Role dropdown: drop "Head of Lending"; add "Head of Recovery / Agency". useCase dropdown: replace with `Live-book collections · Write-off / NPA recovery · Agency performance · Compliance & governance`.
- Keep webhook + success state as-is.

## 9. Legal fixes (Terms.jsx, Privacy.jsx, Security.jsx)

- Terms "Agreement": domain `shieldx.in` → `queloshieldx.in`.
- Terms scope: remove "insurance companies" and IRDAI; audience = banks, NBFCs, ARCs, and collection partners regulated under applicable Indian law.
- Terms jurisdiction: Bengaluru → **Mumbai, Maharashtra**.
- Privacy "Who we are": "banks, NBFCs, and insurance companies" → "banks, NBFCs, ARCs, and their collection partners". Registered address: Mumbai, Maharashtra.
- Email domains (privacy@/legal@/security@ on queloai.online): leave as-is unless SRK confirms switch to @queloshieldx.in — flag in PR description as an open decision.
- Security page: keep essentially as-is (it's good). Only fix any "DPDPA 2025" labels → "DPDP Act, 2023".

## 10. Global sweeps (run across all files)

1. `DPDPA 2025` → `DPDP Act, 2023` (badge text may read `DPDP Act Aligned`).
2. `Customer Decisioning Infrastructure` → `Real-Time Decisioning Infrastructure` (title tag, meta description, any headings). New meta description: `ShieldX is the real-time decisioning infrastructure for collections in Indian BFSI — deciding, executing, and learning from every credit conversation, governed end to end.`
3. Remove every remaining `lending`, `servicing`, `insurance`, `IRDAI` reference outside the retired files.
4. Remove numeric scores/confidences/latencies from all simulated UI; categorical labels only; `Illustrative simulation` captions on all animated demos.
5. `voice_ai` as selected channel → replace everywhere per §2.
6. Verify ShieldX logo/footer treatment is consistent; footer line: `ShieldX · Real-Time Decisioning Infrastructure · © Quelo Technologies Pvt. Ltd.`

## 11. Definition of done

- [ ] Lending/Servicing/Solutions removed from router + nav; no dead links
- [ ] All §10 sweeps grep-clean (`grep -ri "dpdpa 2025\|lending\|servicing\|insurance\|0\.82\|0\.94\|under 5ms\|voice_ai" src/` returns nothing unintended)
- [ ] New pages render on mobile (site is Tailwind responsive — verify new pages at 380px)
- [ ] Every page passes the standing-constraints checklist in §0
- [ ] PR description lists the queloai.online email question as an open decision for SRK

## Phase 2 (separate task — do not start now)
Migrate to Next.js static generation. Port page components, add schema.org Organization markup, per-page meta, sitemap.xml, 301s from retired routes. SEO phrase everywhere: "Quelo ShieldX" (the bare "ShieldX" namespace is not winnable).
