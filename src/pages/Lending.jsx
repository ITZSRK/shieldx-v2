import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useEffect, useState } from "react";

function Motion({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function WindowDots() {
  return (
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
    </div>
  );
}

/* ── APPLICATION DECISION PIPELINE ── */
const STAGES = [
  { id: "eligibility", label: "Eligibility",  result: "PASS",     detail: "Age 28 · Income ₹82,000/mo · Product: Personal Loan" },
  { id: "bureau",      label: "Bureau",        result: "PASS",     detail: "CIBIL 741 · Equifax 738 · CRIF 735 · No NPA accounts" },
  { id: "risk",        label: "Risk Model",    result: "MEDIUM",   detail: "FOIR 36% · Employment tenure 2.1yr · Segment: Prime-B" },
  { id: "compliance",  label: "Compliance",    result: "PASS",     detail: "DPDP consent verified · KYC complete · RBI FPC: Clear" },
  { id: "decision",    label: "Decision",      result: "APPROVED", detail: "₹4,50,000 · 36m · 12.4% p.a. · Rejection notice: N/A" },
];

const APPLICATIONS = [
  { type: "Personal Loan",  amount: "₹3,20,000", segment: "Prime-A" },
  { type: "Home Loan",      amount: "₹48,00,000", segment: "Super-Prime" },
  { type: "Business Loan",  amount: "₹12,00,000", segment: "Thin-file" },
];

function ApplicationPipeline() {
  const [appIdx,   setAppIdx]   = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [running,  setRunning]  = useState(true);

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => {
      setStageIdx(s => {
        if (s === STAGES.length - 1) {
          setAppIdx(a => (a + 1) % APPLICATIONS.length);
          return 0;
        }
        return s + 1;
      });
    }, 1100);
    return () => clearInterval(i);
  }, [running]);

  const app = APPLICATIONS[appIdx];

  return (
    <div className="border border-white/10 rounded-xl bg-black/60 overflow-hidden font-mono text-xs">

      <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-3">
        <WindowDots />
        <span className="flex-1 text-center text-white/55 text-[10px] tracking-[0.15em]">
          Application Decision Pipeline — Lending
        </span>
        <div className="flex items-center gap-1.5 text-[10px] text-indigo-400">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* Application header */}
      <div className="px-5 py-2.5 border-b border-white/[0.05] flex items-center gap-3">
        <span className="text-[10px] text-white/35 tracking-widest shrink-0">APPLICATION</span>
        <motion.span key={appIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="text-white/60 text-[11px] flex-1 truncate">
          {app.type} · {app.amount} · {app.segment}
        </motion.span>
        <span className="text-[10px] text-indigo-400/70 tracking-wide shrink-0">IN PROGRESS</span>
      </div>

      {/* Stage pipeline */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-0.5 mb-4">
          {STAGES.map((s, i) => {
            const done    = i < stageIdx;
            const current = i === stageIdx;
            return (
              <div key={s.id} className="flex-1 flex items-center gap-0">
                <div className={`flex-1 h-[2px] transition-all duration-500 ${
                  done ? "bg-indigo-400" : current ? "bg-indigo-400/50" : "bg-white/[0.07]"
                }`} />
                <div className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
                  done    ? "bg-indigo-400"
                  : current ? "bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.9)]"
                  : "bg-white/[0.1]"
                }`} />
              </div>
            );
          })}
          <div className="flex-1 h-[2px] bg-white/[0.07]" />
        </div>

        <div className="flex justify-between px-0 mb-5">
          {STAGES.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center" style={{ width: `${100 / STAGES.length}%` }}>
              <span className={`text-[9px] tracking-wider transition-colors ${
                i === stageIdx ? "text-indigo-400" : i < stageIdx ? "text-white/62" : "text-white/18"
              }`}>{s.label.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active stage detail */}
      <div className="mx-5 mb-4 border border-white/[0.12] rounded-lg px-4 py-3 bg-white/[0.04] min-h-[54px]">
        <motion.div key={stageIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-white/35 tracking-widest">{STAGES[stageIdx].label.toUpperCase()}</span>
            <span className={`text-[10px] tracking-wide font-medium ${
              STAGES[stageIdx].result === "APPROVED" ? "text-emerald-400"
              : STAGES[stageIdx].result === "PASS"    ? "text-indigo-400"
              : STAGES[stageIdx].result === "MEDIUM"  ? "text-yellow-400/80"
              : "text-red-400"
            }`}>{STAGES[stageIdx].result}</span>
          </div>
          <div className="text-white/45 text-[11px]">{STAGES[stageIdx].detail}</div>
        </motion.div>
      </div>

      <div className="border-t border-white/[0.12] px-5 py-2.5 flex justify-between text-[10px]">
        <span className="text-white/30">ShieldX Decision Engine · {STAGES.length} checks · deterministic</span>
        <span className="text-emerald-400/60">Audit trail active ✓</span>
      </div>

    </div>
  );
}

/* ── WORKFLOW ── */
const STEPS = [
  { n: "01", title: "Application received",     detail: "Application payload ingested from LOS, bank's digital channel, or partner API. Fields normalised: applicant ID, product type, requested amount, purpose, channel source. Queued for eligibility evaluation in sequence." },
  { n: "02", title: "Eligibility evaluated",    detail: "Age, income, existing liability relationships, and RBI negative list checks applied. FOIR computed against declared and verified income. Applicants below threshold declined with mandatory reason communication before bureau is pulled — preventing unnecessary CIBIL inquiries." },
  { n: "03", title: "Bureau consent verified",  detail: "DPDPA 2025-compliant consent check executed before any bureau pull. CIBIL, Equifax, and CRIF Highmark queried only after consent is confirmed. Consent scope, purpose, and expiry tracked and enforced automatically per CICRA 2005." },
  { n: "04", title: "Risk model executed",      detail: "Internal scorecard applied using bureau data, repayment behaviour, and product-specific parameters. FOIR and LTV computed. Segment assigned: Super-Prime / Prime / Near-Prime / Sub-Prime. Risk tier determines decisioning path and applicable rate band." },
  { n: "05", title: "Compliance gate applied",  detail: "RBI Fair Practices Code for Lenders validated. RBI product-specific guidelines checked (interest rate caps, LTV limits, product eligibility). Offer parameters validated against applicable RBI circulars. Any single violation returns decline with correct reason codes — no override permitted." },
  { n: "06", title: "Decision delivered",       detail: "Approval with terms, counter-offer, or decline delivered to originating channel. Approved decisions include rate, tenor, and amount. Declines include mandatory rejection communication with reason codes per RBI's guidelines on transparency in lending decisions." },
  { n: "07", title: "Audit record written",     detail: "Immutable record: every bureau pull, every score, every RBI rule checked, every decision. Exportable for RBI inspection. Fair Practices Code compliance analysis can be run across the full decision set at any point." },
];

function WorkflowSteps() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const i = setInterval(() => setActive(a => (a + 1) % STEPS.length), 2200);
    return () => clearInterval(i);
  }, [paused]);

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
      <div className="space-y-0.5">
        {STEPS.map((s, i) => (
          <div key={i}
            onClick={() => { setActive(i); setPaused(true); }}
            onMouseLeave={() => setPaused(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
              i === active ? "bg-white/[0.04] border border-white/10" : "border border-transparent hover:bg-white/[0.04]"
            }`}
          >
            <span className={`text-[10px] font-mono shrink-0 transition-colors ${i === active ? "text-indigo-400" : "text-white/22"}`}>{s.n}</span>
            <span className={`text-sm transition-colors ${i === active ? "text-white" : "text-white/62"}`}>{s.title}</span>
          </div>
        ))}
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
        className="border border-white/10 rounded-xl p-7 bg-white/[0.04] sticky top-24">
        <div className="text-[10px] font-mono text-indigo-400/70 mb-2 tracking-widest">STEP {STEPS[active].n}</div>
        <div className="text-white font-medium mb-3 text-lg">{STEPS[active].title}</div>
        <div className="text-white/48 text-sm leading-relaxed">{STEPS[active].detail}</div>
      </motion.div>
    </div>
  );
}

/* ── COMPLIANCE RULES ── */
const COMP = [
  { label: "RBI Fair Practices Code",   desc: "Every lending decision governed by RBI's Fair Practices Code for Lenders. Consistent, transparent, and non-discriminatory application across all segments and products." },
  { label: "DPDPA 2025 Consent",     desc: "Bureau pulls gated behind verified, purpose-specific digital consent per the Digital Personal Data Protection Act, 2023. Consent scope, purpose, and expiry tracked and enforced per CICRA 2005." },
  { label: "Rejection Communication",   desc: "All declines trigger mandatory communication with reason codes as required under RBI's guidelines on transparency in lending. Delivered automatically — no manual step required." },
  { label: "RBI Product Circulars",     desc: "Interest rate caps, LTV limits, and product eligibility rules enforced per applicable RBI master directions and circulars. No manual override of regulatory guardrails." },
  { label: "KYC Master Direction",      desc: "KYC verification status validated against RBI KYC Master Direction 2016 (updated) before decisioning proceeds. Incomplete or expired KYC halts the pipeline automatically." },
  { label: "Thin-file Governance",      desc: "Applicants with insufficient bureau history routed to alternative RBI-permitted scoring paths — not blanket declined. Model choice and rationale logged per audit requirements." },
];

/* ── BEFORE / AFTER ── */
const PAIRS = [
  { w: "Credit policy in spreadsheets — interpreted differently by each credit officer",         x: "Policy encoded in decision engine — applied identically to every application, every time" },
  { w: "Bureau pulled before DPDP consent verified — regulatory violation risk",                 x: "DPDP consent gate enforced before every CIBIL/Equifax/CRIF pull — compliant by design" },
  { w: "Rejection letters written manually — RBI-mandated reason codes missing or inconsistent", x: "Rejection communication generated automatically with correct reason codes per RBI guidelines" },
  { w: "RBI Fair Practices Code review run manually and quarterly — violations already occurred", x: "Every decision logged with FPC compliance flags — audit-ready in real time on demand" },
  { w: "Counter-offer decided by credit officer — inconsistent, undocumented, unexplainable",    x: "Counter-offer rules computed by engine — deterministic, auditable, RBI-inspection-ready" },
];

export default function Lending() {
  const [hovered, setHovered] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <Layout>

      {/* BREADCRUMB */}
      <div className="max-w-6xl mx-auto px-8 pt-[100px] pb-0">
        <Motion>
          <Link to="/solutions" className="inline-flex items-center gap-2 text-white/35 text-xs hover:text-white/65 transition-colors">
            ← Solutions
          </Link>
        </Motion>
      </div>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 pt-8 pb-24 grid md:grid-cols-2 gap-16 items-center">

        <div>
          <Motion>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 text-xs tracking-[0.18em] mb-8"
              style={{boxShadow:"0 0 18px rgba(129,140,248,0.28)"}}>
              LENDING
            </div>
          </Motion>

          <Motion delay={0.08}>
            <h1 className="text-[46px] leading-[1.07] font-semibold mb-5">
              Every credit decision.<br />Governed end to end.
            </h1>
          </Motion>

          <Motion delay={0.14}>
            <p className="text-white/68 text-[17px] leading-relaxed mb-8">
              ShieldX runs every application through eligibility, bureau, risk, and compliance
              checks — in sequence, at speed — and delivers a compliant, audited outcome every time.
            </p>
          </Motion>

          <Motion delay={0.2}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { stat: "5",    label: "Decision stages" },
                { stat: "3",    label: "Bureaus checked (CIBIL, Equifax, CRIF)" },
                { stat: "100%", label: "Rejection notice coverage" },
              ].map((m, i) => (
                <div key={i} className="border border-white/[0.12] rounded-xl p-4 bg-white/[0.04]">
                  <div className="text-xl font-semibold text-indigo-300 mb-1">{m.stat}</div>
                  <div className="text-white/68 text-xs">{m.label}</div>
                </div>
              ))}
            </div>
          </Motion>
        </div>

        <Motion delay={0.18}>
          <ApplicationPipeline />
        </Motion>

      </section>

      {/* WORKFLOW */}
      <div className="bg-white/[0.05] border-y border-white/[0.05]">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <Motion>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-0.5 h-4 rounded-full bg-indigo-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">DECISION WORKFLOW</span>
          </div>
          <h2 className="text-[34px] font-semibold mb-10">How every lending decision runs through ShieldX.</h2>
        </Motion>
        <Motion delay={0.08}>
          <WorkflowSteps />
        </Motion>
      </section>
      </div>

      {/* COMPLIANCE */}
      <section className="max-w-6xl mx-auto px-8 pb-28">
        <Motion>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-0.5 h-4 rounded-full bg-indigo-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">COMPLIANCE ENFORCEMENT</span>
          </div>
          <h2 className="text-[34px] font-semibold mb-3">Built for the regulatory reality of lending.</h2>
          <p className="text-white/62 mb-10 max-w-xl">Every application decision is validated against fair lending law, data protection requirements, and product regulations — before a single outcome is delivered.</p>
        </Motion>
        <div className="grid md:grid-cols-2 gap-3">
          {COMP.map((c, i) => (
            <Motion key={i} delay={i * 0.06}>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.04]
                hover:border-indigo-400/28 hover:bg-white/[0.04] transition-all duration-200 cursor-default group">
                <div className="w-7 h-7 rounded-lg border border-indigo-400/20 bg-indigo-500/[0.06] flex items-center justify-center flex-shrink-0
                  group-hover:border-indigo-400/40 group-hover:bg-indigo-500/[0.10] transition-all duration-200">
                  <span className="text-indigo-400/55 text-xs group-hover:text-indigo-400/80 transition-colors">✓</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white/88 mb-1.5">{c.label}</div>
                  <div className="text-[12px] text-white/62 leading-relaxed">{c.desc}</div>
                </div>
              </div>
            </Motion>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <div className="bg-white/[0.05] border-y border-white/[0.05]">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <Motion>
          <div className="mb-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-0.5 h-4 rounded-full bg-indigo-400/45" />
              <span className="text-[11px] text-white/55 tracking-[0.2em]">THE SHIFT</span>
            </div>
            <h2 className="text-[34px] font-semibold">Compliant lending. In practice.</h2>
          </div>
        </Motion>
        <Motion delay={0.06}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_52px_1fr] gap-4 md:gap-0">

            {/* Left — UNGOVERNED */}
            <div className="rounded-2xl border border-red-500/[0.18] bg-red-500/[0.025] p-6"
              style={{boxShadow:"0 0 50px rgba(239,68,68,0.08)"}}>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-6 h-6 rounded-full bg-red-500/15 border border-red-400/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 text-[10px] leading-none">✕</span>
                </div>
                <span className="text-[10px] text-red-400/65 tracking-[0.2em] font-medium">WITHOUT SHIELDX</span>
              </div>
              <div className="space-y-0.5">
                {PAIRS.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 py-3.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-red-400/45 text-[11px] flex-shrink-0 mt-0.5">✕</span>
                    <span className="text-white/52 text-sm leading-relaxed">{p.w}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/[0.08] border border-red-400/20">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
                <span className="text-[10px] text-red-400/65 tracking-widest">EXPOSURE: HIGH</span>
              </div>
            </div>

            {/* Center */}
            <div className="hidden md:flex flex-col items-center justify-center gap-3 px-2">
              <div className="w-px flex-1" style={{background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.09),transparent)"}} />
              <div className="w-9 h-9 rounded-xl border border-blue-400/25 bg-blue-500/[0.07] flex flex-col items-center justify-center gap-0.5 flex-shrink-0">
                <span className="text-blue-300/50 text-[8px] tracking-[0.1em]">SX</span>
                <span className="text-blue-400/45 text-xs leading-none">›</span>
              </div>
              <div className="w-px flex-1" style={{background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.09),transparent)"}} />
            </div>

            {/* Right — WITH SHIELDX (indigo) */}
            <div className="rounded-2xl border border-indigo-500/[0.18] bg-indigo-500/[0.025] p-6"
              style={{boxShadow:"0 0 50px rgba(129,140,248,0.10)"}}>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-6 h-6 rounded-full bg-indigo-500/15 border border-indigo-400/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-400 text-[10px] leading-none">✓</span>
                </div>
                <span className="text-[10px] text-indigo-400/65 tracking-[0.2em] font-medium">WITH SHIELDX</span>
              </div>
              <div className="space-y-0.5">
                {PAIRS.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 py-3.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-indigo-400/55 text-[11px] flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-white/72 text-sm leading-relaxed">{p.x}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/[0.08] border border-indigo-400/20">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/70" />
                <span className="text-[10px] text-indigo-400/65 tracking-widest">GOVERNED: ✓</span>
              </div>
            </div>
          </div>
        </Motion>
      </section>
      </div>

      {/* CROSS-LINKS */}
      <section className="max-w-6xl mx-auto px-8 pb-28">
        <Motion>
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-0.5 h-4 rounded-full bg-indigo-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">OTHER USE CASES</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { to: "/collections", label: "Collections", desc: "Govern every contact decision — channel, timing, message, and compliance — before outreach fires.", hex: "#f59e0b", rgb: "245,158,11"  },
              { to: "/servicing",   label: "Servicing",   desc: "Classify intent, validate policy, and route every customer request to the right resolution.",    hex: "#34d399", rgb: "52,211,153"  },
            ].map((l, i) => (
              <Link key={i} to={l.to}
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(null)}
                className="block p-7 rounded-xl border transition-all duration-200 hover:scale-[1.018]"
                style={{
                  borderColor: hoveredLink === i ? `${l.hex}55` : "rgba(255,255,255,0.07)",
                  background:  hoveredLink === i ? `rgba(${l.rgb},0.05)` : "rgba(255,255,255,0.02)",
                  boxShadow:   hoveredLink === i ? `0 0 24px rgba(${l.rgb},0.10)` : "none",
                }}>
                <div className="text-xs tracking-widest mb-2 transition-colors" style={{ color: hoveredLink === i ? l.hex : `${l.hex}70` }}>{l.label.toUpperCase()}</div>
                <div className="text-white font-medium mb-2">{l.desc}</div>
                <div className="text-xs" style={{ color: `${l.hex}70` }}>Explore →</div>
              </Link>
            ))}
          </div>
        </Motion>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-8 pb-32">
        <Motion>
          <div className="border-t border-white/[0.08] pt-12 flex items-center justify-between flex-wrap gap-6">
            <div>
              <div className="text-xl font-semibold mb-1">See a live lending decision.</div>
              <div className="text-white/58 text-sm">Walk through a live application decision pipeline — from submission to outcome.</div>
            </div>
            <Link to="/demo" className="inline-block bg-white text-black px-7 py-2.5 rounded-md text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shrink-0">
              Request a walkthrough
            </Link>
          </div>
        </Motion>
      </section>

    </Layout>
  );
}
