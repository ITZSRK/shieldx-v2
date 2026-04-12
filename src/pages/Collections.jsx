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

/* ── CONTACT STRATEGY ENGINE ── */
const CH_DATA = [
  { name: "Voice AI",  base: 94.2, compliance: "TRAI Window OK",      ok: true,  status: "SELECTED" },
  { name: "SMS",       base: 62.1, compliance: "TRAI DND Match",      ok: false, status: "BLOCKED"  },
  { name: "WhatsApp",  base: 71.4, compliance: "DPDP Consent Absent", ok: false, status: "BLOCKED"  },
  { name: "Email",     base: 38.7, compliance: "DPDP Consent OK",     ok: true,  status: "SKIPPED"  },
];

const TRIGGERS = [
  { event: "Payment missed",    detail: "₹24,000 · DPD-7 · Bucket B"  },
  { event: "Promise broken",    detail: "₹18,000 · DPD-15 · Bucket A" },
  { event: "High risk flagged", detail: "₹52,000 · DPD-30 · Bucket C" },
];

function ContactStrategyEngine() {
  const [tIdx, setTIdx]     = useState(0);
  const [scores, setScores] = useState(CH_DATA.map(c => c.base));
  const [phase, setPhase]   = useState("decided");

  useEffect(() => {
    const i = setInterval(() => {
      setPhase("evaluating");
      const t = setTimeout(() => {
        setTIdx(x => (x + 1) % TRIGGERS.length);
        setPhase("decided");
      }, 900);
      return () => clearTimeout(t);
    }, 4000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setScores(CH_DATA.map(c => +(c.base + (Math.random() * 0.4 - 0.2)).toFixed(1)));
    }, 750);
    return () => clearInterval(i);
  }, []);

  const tr = TRIGGERS[tIdx];

  return (
    <div className="border border-white/10 rounded-xl bg-black/60 overflow-hidden font-mono text-xs">

      <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-3">
        <WindowDots />
        <span className="flex-1 text-center text-white/55 text-[10px] tracking-[0.15em]">
          Contact Strategy Engine — Collections
        </span>
        <div className="flex items-center gap-1.5 text-[10px] text-amber-400">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          LIVE
        </div>
      </div>

      <div className="px-5 py-2.5 border-b border-white/[0.05] flex items-center gap-3">
        <span className="text-[10px] text-white/35 tracking-widest shrink-0">TRIGGER</span>
        <motion.span key={tIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="text-white/60 text-[11px] flex-1 truncate">
          {tr.event} · {tr.detail}
        </motion.span>
        <span className={`text-[10px] tracking-wide shrink-0 ${
          phase === "evaluating" ? "text-yellow-400/70" : "text-emerald-400/70"
        }`}>{phase === "evaluating" ? "EVALUATING" : "DECIDED"}</span>
      </div>

      <div className="px-5 pt-3 pb-2 flex gap-3 text-[10px] text-white/28 tracking-widest border-b border-white/[0.05]">
        <span className="w-[80px] shrink-0">CHANNEL</span>
        <span className="flex-1">COMPLIANCE</span>
        <span className="w-[48px] text-right shrink-0">SCORE</span>
        <span className="w-[72px] text-right shrink-0">DECISION</span>
      </div>

      <div className="px-5 py-3.5 space-y-3">
        {CH_DATA.map((ch, i) => {
          const sel = ch.status === "SELECTED";
          const blk = ch.status === "BLOCKED";
          return (
            <div key={i} className={`flex items-center gap-3 text-[11px] transition-opacity duration-400 ${sel ? "opacity-100" : "opacity-38"}`}>
              <span className={`w-[80px] shrink-0 ${sel ? "text-white" : "text-white/45"}`}>{ch.name}</span>
              <span className={`flex-1 ${ch.ok ? "text-white/58" : "text-red-400/60"}`}>{ch.ok ? "✓" : "✗"} {ch.compliance}</span>
              <span className={`w-[48px] text-right shrink-0 ${sel ? "text-amber-400" : "text-white/25"}`}>{scores[i].toFixed(1)}</span>
              <span className={`w-[72px] text-right shrink-0 text-[10px] tracking-wide ${
                sel ? "text-amber-400" : blk ? "text-red-400/60" : "text-white/22"
              }`}>{ch.status}</span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/[0.12] px-5 py-2.5 flex justify-between text-[10px]">
        <span className="text-white/30">
          {phase === "evaluating" ? "Computing optimal strategy..." : "Voice AI · 2:00 PM IST · Hardship-aware script HW-3"}
        </span>
        <span className="text-emerald-400/60">RBI FPC Compliant ✓</span>
      </div>

    </div>
  );
}

/* ── WORKFLOW ── */
const STEPS = [
  { n: "01", title: "Trigger received",    detail: "Payment missed event ingested from CBS. Payload normalized: customer ID, DPD bucket, outstanding amount, product type. Queued for evaluation in under 5ms." },
  { n: "02", title: "Customer evaluated",  detail: "Risk tier computed from repayment history, bureau score, and product type. Channel preference derived from past engagement data. Segment classification applied." },
  { n: "03", title: "Channels scored",     detail: "Each eligible channel scored against customer segment, time-window compliance, historical response rates, and business rules. Compliance-blocked channels are removed before scoring." },
  { n: "04", title: "Compliance gate",     detail: "TRAI calling window (8 AM–7 PM IST) verified. TRAI DND registry checked in real time. RBI Fair Practices Code rules applied. DPDPA 2025 consent status validated. Frequency cap enforced. Any single violation blocks execution." },
  { n: "05", title: "Strategy computed",   detail: "Optimal channel, timing window, message template, and offer parameters selected. Decision payload constructed with full reason codes attached." },
  { n: "06", title: "Execution governed",  detail: "Outreach triggered via selected channel adapter. Response captured and fed back to the decision engine. Next-best action computed based on outcome." },
  { n: "07", title: "Audit written",       detail: "Immutable record created per interaction. Reason codes, compliance checks, channel rationale, and outcome all logged. Exportable for regulatory review on demand." },
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
            <span className={`text-[10px] font-mono shrink-0 transition-colors ${i === active ? "text-amber-400" : "text-white/22"}`}>{s.n}</span>
            <span className={`text-sm transition-colors ${i === active ? "text-white" : "text-white/62"}`}>{s.title}</span>
          </div>
        ))}
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
        className="border border-white/10 rounded-xl p-7 bg-white/[0.04] sticky top-24">
        <div className="text-[10px] font-mono text-amber-400/70 mb-2 tracking-widest">STEP {STEPS[active].n}</div>
        <div className="text-white font-medium mb-3 text-lg">{STEPS[active].title}</div>
        <div className="text-white/48 text-sm leading-relaxed">{STEPS[active].detail}</div>
      </motion.div>
    </div>
  );
}

/* ── COMPLIANCE RULES ── */
const COMP = [
  { label: "TRAI Calling Window",       desc: "No outreach before 8 AM or after 7 PM IST. Enforced automatically per TRAI guidelines on telecom communications. No manual override permitted." },
  { label: "TRAI DND",                  desc: "Real-time check against TRAI's Do Not Disturb registry before every contact attempt. Numbers registered on DND are blocked before execution." },
  { label: "RBI Fair Practices Code",   desc: "Recovery practices governed per RBI circular on Fair Practices Code for Lenders. No coercive recovery. Grievance escalation paths enforced as mandated." },
  { label: "RBI Recovery Agent Rules",  desc: "Outreach governed per RBI guidelines on recovery agent conduct. Communication restricted to respectful, regulated interactions only." },
  { label: "DPDPA 2025",                desc: "Channel-level consent verified per the Digital Personal Data Protection Act before any AI-driven communication is triggered." },
  { label: "Frequency Caps",            desc: "Per-customer, per-product daily and weekly outreach limits enforced automatically per applicable RBI and TRAI guidelines — no manual rule management required." },
];

/* ── BEFORE / AFTER ── */
const PAIRS = [
  { w: "Manual dialing lists — no channel intelligence, DPD bucket ignored",            x: "Channel scored per customer DPD bucket, segment, and TRAI compliance window" },
  { w: "TRAI DND violations discovered in post-call audit — regulator notices follow",  x: "TRAI DND check enforced before every call fires — violations blocked by design" },
  { w: "Same customer contacted by multiple agents simultaneously — RBI FPC breach",    x: "Single governed outreach per cycle — no duplicate contacts, no FPC violations" },
  { w: "No reason codes — cannot explain recovery decisions to RBI on inspection",      x: "Full reason code audit trail per interaction, RBI inspection-ready on demand" },
  { w: "Hardship-blind outreach — escalates customer complaints to RBI Ombudsman",      x: "Hardship-sensitive scripts and reduced frequency computed per customer segment" },
];

export default function Collections() {
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-500/10 text-amber-300 text-xs tracking-[0.18em] mb-8"
              style={{boxShadow:"0 0 18px rgba(245,158,11,0.28)"}}>
              COLLECTIONS
            </div>
          </Motion>

          <Motion delay={0.08}>
            <h1 className="text-[46px] leading-[1.07] font-semibold mb-5">
              Every collections decision.<br />Compliant in real time.
            </h1>
          </Motion>

          <Motion delay={0.14}>
            <p className="text-white/50 text-[17px] leading-relaxed mb-8">
              ShieldX evaluates every customer signal and determines the right contact
              strategy — channel, timing, message, compliance — before a single outreach fires.
            </p>
          </Motion>

          <Motion delay={0.2}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { stat: "6",    label: "Compliance checks/decision" },
                { stat: "4",    label: "Channels governed" },
                { stat: "100%", label: "Audit trail coverage" },
              ].map((m, i) => (
                <div key={i} className="border border-white/[0.12] rounded-xl p-4 bg-white/[0.04]">
                  <div className="text-xl font-semibold text-amber-300 mb-1">{m.stat}</div>
                  <div className="text-white/50 text-xs">{m.label}</div>
                </div>
              ))}
            </div>
          </Motion>
        </div>

        <Motion delay={0.18}>
          <ContactStrategyEngine />
        </Motion>

      </section>

      {/* WORKFLOW */}
      <div className="bg-white/[0.05] border-y border-white/[0.05]">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <Motion>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-0.5 h-4 rounded-full bg-amber-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">DECISION WORKFLOW</span>
          </div>
          <h2 className="text-[34px] font-semibold mb-10">How every collections decision runs through ShieldX.</h2>
        </Motion>
        <Motion delay={0.08}>
          <WorkflowSteps />
        </Motion>
      </section>
      </div>

      {/* COMPLIANCE */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <Motion>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-0.5 h-4 rounded-full bg-amber-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">COMPLIANCE ENFORCEMENT</span>
          </div>
          <h2 className="text-[34px] font-semibold mb-3">Built for the regulatory reality of collections.</h2>
          <p className="text-white/62 mb-10 max-w-xl">Every outreach decision is validated against applicable regulations before execution. Nothing fires without passing every check.</p>
        </Motion>
        <div className="grid md:grid-cols-2 gap-3">
          {COMP.map((c, i) => (
            <Motion key={i} delay={i * 0.06}>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.10] bg-white/[0.04]
                hover:border-amber-400/28 hover:bg-white/[0.04] transition-all duration-200 cursor-default group">
                <div className="w-7 h-7 rounded-lg border border-amber-400/20 bg-amber-500/[0.06] flex items-center justify-center flex-shrink-0
                  group-hover:border-amber-400/40 group-hover:bg-amber-500/[0.10] transition-all duration-200">
                  <span className="text-amber-400/55 text-xs group-hover:text-amber-400/80 transition-colors">✓</span>
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
              <div className="w-0.5 h-4 rounded-full bg-amber-400/45" />
              <span className="text-[11px] text-white/55 tracking-[0.2em]">THE SHIFT</span>
            </div>
            <h2 className="text-[34px] font-semibold">Compliant collections. In practice.</h2>
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
              <div className="w-px flex-1" style={{background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.12),transparent)"}} />
              <div className="w-9 h-9 rounded-full border border-white/25 bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                <span className="text-white/55 text-base leading-none">→</span>
              </div>
              <div className="w-px flex-1" style={{background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.12),transparent)"}} />
            </div>

            {/* Right — WITH SHIELDX (amber) */}
            <div className="rounded-2xl border border-amber-500/[0.30] bg-amber-500/[0.05] p-6"
              style={{boxShadow:"0 0 70px rgba(245,158,11,0.18)"}}>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/35 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 text-[10px] leading-none">✓</span>
                </div>
                <span className="text-[10px] text-amber-400/80 tracking-[0.2em] font-medium">WITH SHIELDX</span>
              </div>
              <div className="space-y-0.5">
                {PAIRS.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 py-3.5 border-b border-white/[0.06] last:border-0">
                    <span className="text-amber-400/70 text-[11px] flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-white/82 text-sm leading-relaxed">{p.x}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/[0.12] border border-amber-400/30">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                <span className="text-[10px] text-amber-400/80 tracking-widest">GOVERNED: ✓</span>
              </div>
            </div>
          </div>
        </Motion>
      </section>
      </div>

      {/* CROSS-LINKS */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <Motion>
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-0.5 h-4 rounded-full bg-amber-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">OTHER USE CASES</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { to: "/lending",   label: "Lending",   desc: "Run every loan application through eligibility, bureau, risk, and compliance — before a single outcome is delivered.",      hex: "#818cf8", rgb: "129,140,248" },
              { to: "/servicing", label: "Servicing",  desc: "Classify intent, validate policy, and route every customer request to the right resolution.", hex: "#34d399", rgb: "52,211,153"  },
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
              <div className="text-xl font-semibold mb-1">Watch a live collections decision.</div>
              <div className="text-white/58 text-sm">Walk through a live collections decision pipeline — end to end.</div>
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
