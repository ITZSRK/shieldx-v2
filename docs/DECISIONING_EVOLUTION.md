# ShieldX Decisioning Evolution — Strategy Spine

**Status:** Locked strategy reference. All repos (decisioning, VI, voice AI) build against this document.
**Last updated:** August 2026
**Owner:** SRK

---

## 0. Governing Thesis

Models are commoditized. The moat is the workflow, the decision record, and the governance layer — not the model. ShieldX evolves from *a system that makes decisions* into **the system of record for how credit conversations happen and what worked**.

Corollaries:
- **Rent all intelligence; own the harness.** Every model (scoring, STT, LLM, TTS) sits behind an interface with an eval suite in front of it. Models are swappable components. Evals, context layer, and routing are permanent ShieldX assets.
- Never invest in "our model is better" as a value proposition. Model accuracy is a fast-depreciating asset. Invest in evals, outcome capture, and loop closure instead.
- There is exactly **one decision spine**. VI and Diya are not products with their own brains — they are an input organ and an execution channel of the same spine.
- **Control plane vs execution plane.** ShieldX owns the control plane (decisions, orchestration, record, governance) and is agnostic about the execution plane (whose pipes deliver). The defining rule: *every decision flows through ShieldX; execution may flow through anything — ours or theirs.*

---

## 0.5 Stack Architecture (top to bottom)

1. **System of record** — decision log + outcome log + conversation-derived features. The permanent asset.
2. **Decisioning — Decision.** Scores, rules, cohorts, champion/challenger. Mandatory in every deployment.
3. **Orchestration — Orchestrate (internal module of Decision).** Decisions → sequenced, timed, constrained instructions: retry logic, channel fallback, contact-window compliance, agency capacity allocation. Also mandatory — orchestration is part of deciding *how*, not part of executing.
4. **Execution adapters (pluggable, neutral).** Interchangeable channels behind one contract: client's dialer, client's CPaaS under client's handles/templates, agency work-lists (SFTP/API), WhatsApp/SMS/email rails, **Engage**, **Diya**. Every adapter speaks the same treatment-code-in / outcome-code-out contract from the canonical taxonomy. **The adapter contract is the platform's most important technical interface** — specify it formally as part of the taxonomy deliverable.
5. **Sensing — VI + outcome ingestion.** Post-call analysis, payment events, contact results — flowing back into the record regardless of whose pipes executed. VI closes the loop even in brain-only deployments.

**Product roles in this frame:**
- **Decision** = the company. Non-negotiable in every deal.
- **Engage** = the *reference execution channel* for clients without pipes — not "our execution platform." Tier-one banks may never use it; NBFCs/ARCs/agencies get brain-plus-hands.
- **Assist** = the human channel's adapter. Context is how a decision reaches a human (briefing = treatment instruction made usable); Live is decisioning extended into the conversation.
- **Diya** = one adapter among many. Never the brain.
- **VI** = the sensory system, not a channel. Works across all executors' recordings.

## 0.6 Deployment Patterns

| Pattern | Client profile | Execution | ShieldX role |
|---|---|---|---|
| **A** | Tier-one bank; bank-owned handles, DLT templates, own CPaaS contracts (SMS/email/WhatsApp) | Their rails, their identity | Engine picks account, treatment, template, send-time; dispatches via adapter to their CPaaS. Full decision visibility, zero execution ownership. |
| **B** | Bank voice channel with external OBD/tele-calling partners | Their partners + optionally Diya | Diya enters as *additional capacity in the same governed pool*, never a replacement pitch. Identical scorecard; volume follows performance under the bank's allocation policy. |
| **C** | NBFC / ARC / agency with no pipes | ShieldX (Engage + Diya) | Brain and hands. ARCIL white-label and agency partnerships are this motion. |

Same platform, same taxonomy, same record — only the adapter mix varies. Honest answer to "do you execute?": *always the decision, never necessarily the delivery.*

## 0.7 Neutrality Principles (structural, not aspirational)

1. **ShieldX will never operate human collections.** No tele-calling floor, no field force — ever. This makes agency scoring and portfolio-allocation recommendations credibly neutral. Agencies are distribution, not competition. The only human-layer play is Assist: improve everyone's people, employ none.
2. **Symmetric measurement.** ShieldX-owned channels (Diya, Engage) are scored by the same VI pipeline, same outcome codes, same metrics as every third party. No separate methodology. The bank's vendor scorecard includes ShieldX's own channels, underperformance visible.
3. **The institution owns the objective function.** ShieldX computes allocation against the client's stated policy (weights on cost-per-resolution, kept-PTP, compliance score, etc.) and *recommends*; allocation policy changes pass through the client's governance gate — the same gate as champion/challenger promotion. Conflict-of-interest answer and MRM answer are one mechanism.

See companion document: `NEUTRALITY_CHARTER.md`.

---

## 1. The Four Layers

### Layer 1 — Deterministic decisioning (NOW — anchor bank Phase 1)
Rule engine (11 rules, 4 tiers) + self-cure score. The critical requirement at this stage is **logging discipline**, not intelligence.

**Decision Log Standard (non-negotiable, audit before go-live):**
Every decision record must contain:
1. Full input snapshot (all features as seen at decision time)
2. Which rules fired, in order
3. Score(s) at time of decision, with model version
4. Treatment assigned (canonical treatment code)
5. Timestamp, account cohort tag (P0–P3, live/write-off book), engine version

If Phase 1 does nothing but make decent decisions and log them perfectly, it has succeeded. Real production data will beat model improvements.

### Layer 2 — Causal learning loop (one decision at a time)
The reporting loop becomes a learning loop through **champion/challenger with randomization**. Correlation without randomization is still a reporting loop.

**Mechanics per experiment:**
1. **Pick one decision point.** Narrow, named, one cohort. (First candidate: channel + time-of-day for first contact, P1 live-book, DPD 5–15.)
2. **Pre-register the outcome metric** before starting (e.g., kept-PTP rate within 7 days). Written down, never chosen after seeing results.
3. **Champion/challenger split.** Champion (current rules) ~90%, challenger policy randomized ~10%.
4. **Pre-commit volume + window** (e.g., 5,000 accounts/arm, 30-day window). No peeking, no early stopping.
5. **Promotion gate.** Challenger promotes only if it beats champion beyond a pre-set margin, through a documented, versioned, signed-off governance gate. The gate itself is an MRM artifact.
6. **Then the next decision.** One at a time. Each experiment produces a real uplift number on real portfolios — the numbers that replace synthetic-only validation claims.

**Deal-breaker filters before building any learned policy:**
- Can we name the exact decision it improves?
- Can it beat the honestly-tuned current rule engine?
- Will multiple parts of the platform consume the output?

### Layer 3 — VI feeds the spine (structural differentiator)
VI output is not only scorecards/compliance flags. VI must emit **decision features** in the canonical schema:
- Objection type
- Dispute mentioned (flag + type)
- Hardship claimed (flag + type)
- Promise language strength
- Sentiment trajectory
- Right-party-contact confirmation

These flow back as inputs to the *next* decision on that account (e.g., hardship claimed → suppress hard-tone SMS, route to settlement track). This is the literal implementation of "learns from what was actually said." No competitor owns both the decision layer and the conversation layer.

VI remains **post-call / batch** — never described as real-time.

### Layer 4 — Diya as a governed channel
When voice AI returns to scope (after India re-platforming: Sarvam Phase A → self-hosted open-weight Phase B), the decision engine decides who gets a Diya call, when, with what objective. Diya outcomes flow back using the **same treatment/outcome taxonomy** as every other channel. Positioning: not "an AI caller" but "one more channel under the same decisioning and governance as everything else."

---

## 2. Canonical Taxonomy (highest-leverage item this quarter)

Cross-client learning dies if each client's data means something different. Lock **v1 now**, before client #2 onboards:

- **Feature dictionary:** cohort definitions, DPD buckets, product types, two-vector scores (contactability × collectability), P0–P3 tags, live vs write-off book flag.
- **Treatment code set:** every action any client/channel takes maps to ShieldX codes (channel × tone × offer-type × timing).
- **Outcome code set:** contact result, promise result, payment result, resolution codes.

Every new client onboards *into* this taxonomy; mapping happens at ingestion. ARCIL white-label data mapping must use this schema, not a parallel one. Taxonomy must have room for a voice-agent channel even before Diya ships.

Live book and write-off book have **different objective functions** — never share a single model or policy family across them.

---

## 3. Governance as the Second Product (Intelligence module, not standalone GRC)

RBI draft Model Risk Management guidance covers rule engines and third-party models, mandates Three Lines of Defense, and includes fairness/bias testing. ShieldX is in scope — and so is every model the bank uses in collections. Turn this from compliance cost into a product face:

**Tier 1 — Inventory.** Model registry: every model touching collections registered (owner, purpose, vendor, version, last validation, risk tier) — including models that never touch ShieldX.

**Tier 2 — Monitoring (only for scores flowing through ShieldX as inputs).** Black-box monitoring of third-party/bank-internal scores: distribution drift (PSI), cohort stability, and — because ShieldX captures outcomes — actual predictive performance over time. "Vendor X's propensity score degraded on rank-ordering since January" is a sentence no bank can currently produce.

**Tier 3 — Evidence packs.** Auto-generated challenger comparison reports, decision audit trails, drift reports, version histories — exportable as RBI inspection documentation. Governance gates from Layer 2 feed this automatically.

Honest boundary: models that don't route through ShieldX get inventory + document storage only, not monitoring. Never oversell this.

Buyer effect: risk/compliance becomes an internal champion instead of a gatekeeper.

---

## 4. Cross-Portfolio Learning (FY28+ moat; foundations laid NOW)

Vision: cohort-level treatment knowledge across lenders — no customer data, only "portfolios with these characteristics respond to this treatment." Accumulated form:

> credit-card • DPD 30–60 • salaried • low-contactability/high-collectability → settlement-anchored SMS sequence outperforms call-first by X% across N portfolios

**Three present-day prerequisites:**
1. **Canonical taxonomy** (Section 2) enforced from client #2 onward.
2. **Contract clause** in every MSA from now: permission to use anonymized, aggregated, derived insights for benchmarking, research, platform improvement — explicitly excluding personal data and client-identifiable information. Insert into ARCIL and agency-partnership paperwork now; flag for anchor bank at next contract cycle (do not fight it in Phase 1). Framing precedent: bureau-style pooled anonymized behavior data.
3. **Aggregation architecture, not anonymization theater.** Learning only on cohort-level aggregates. No record-level data leaves a client boundary. Minimum cell size (~50 accounts) suppression. Central store holds treatment-response distributions per cohort signature, never accounts. DPDP-safe by design.

**Product form:** cold-start priors — client #N gets treatment priors from N−1 portfolios on day one. True network effect; the basis for infrastructure (not SaaS) valuation multiples at Series A.

Placement: vision slide only, carefully worded. Not in client conversations yet.

---

## 5. Phase Sequencing

| Phase | Deliverables |
|---|---|
| **Phase 1 (now)** | Perfect decision logging + canonical schema v1 + MSA insights clause in new contracts |
| **Phase 2** | First champion/challenger experiment + VI decision-features → decisioning bridge + model registry v1 |
| **Phase 3** | Diya as governed channel (post re-platform) + third-party score monitoring tier + first cross-client aggregates |

Each phase is independently sellable; nothing depends on a leap.

---

## 6. Standing Constraints (apply everywhere)

- Never name the anchor bank client ("a leading private-sector bank").
- No model performance figures, AUC, or accuracy numbers in external materials. 0.90 AUC is synthetic-data-only; never quote as real-world.
- No internal codenames on client-facing screens.
- No fabricated production volumes or certifications.
- VI is post-call/batch — never real-time — in all communications.
- Reconcile test-count discrepancy (65 in repo vs 76 in pitch materials) before investor diligence.
