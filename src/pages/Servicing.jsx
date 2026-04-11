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

/* ── INTENT ROUTER ── */
const INTENTS = [
  { raw: "Can I change my EMI date?",             intent: "EMI_DATE_CHANGE",      confidence: 97, policy: "PASS",    route: "Self-serve portal",        sla: "Instant" },
  { raw: "Why was my loan application rejected?",  intent: "REJECTION_ENQUIRY",    confidence: 94, policy: "PASS",    route: "Credit team queue",        sla: "24h" },
  { raw: "I lost my job and can't pay",            intent: "HARDSHIP_REQUEST",     confidence: 99, policy: "PASS",    route: "Hardship specialist",      sla: "4h" },
  { raw: "Raise a grievance on my account",        intent: "GRIEVANCE",            confidence: 96, policy: "PASS",    route: "Grievance officer",        sla: "RBI 30-day" },
  { raw: "Foreclose my home loan",                 intent: "FORECLOSURE_REQUEST",  confidence: 98, policy: "REVIEW",  route: "Senior servicing agent",   sla: "2h" },
  { raw: "CIBIL shows wrong outstanding balance",  intent: "BUREAU_DISPUTE",       confidence: 93, policy: "PASS",    route: "CIC correction team",      sla: "CIC 30-day" },
];

function IntentRouter() {
  const [idx,     setIdx]     = useState(0);
  const [phase,   setPhase]   = useState("classified");
  const [bar,     setBar]     = useState(100);

  useEffect(() => {
    const i = setInterval(() => {
      setPhase("classifying");
      setBar(0);
      const t = setTimeout(() => {
        setIdx(x => (x + 1) % INTENTS.length);
        setPhase("classified");
        setBar(100);
      }, 700);
      return () => clearTimeout(t);
    }, 3200);
    return () => clearInterval(i);
  }, []);

  const item = INTENTS[idx];

  return (
    <div className="border border-white/10 rounded-xl bg-black/60 overflow-hidden font-mono text-xs">

      <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-3">
        <WindowDots />
        <span className="flex-1 text-center text-white/55 text-[10px] tracking-[0.15em]">
          Intent Router — Servicing
        </span>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* Raw input */}
      <div className="px-5 py-3 border-b border-white/[0.05]">
        <div className="text-[10px] text-white/30 tracking-widest mb-1.5">CUSTOMER REQUEST</div>
        <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="text-white/65 text-[13px] leading-snug">
          "{item.raw}"
        </motion.div>
      </div>

      {/* Classification result */}
      <div className="px-5 pt-3 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-white/30 tracking-widest">CLASSIFICATION</span>
          <span className={`text-[10px] tracking-wide ${phase === "classifying" ? "text-yellow-400/70" : "text-emerald-400"}`}>
            {phase === "classifying" ? "CLASSIFYING..." : "CLASSIFIED"}
          </span>
        </div>

        <motion.div key={idx + "-result"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.08 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/50 text-[11px]">{item.intent}</span>
            <span className="text-emerald-400">{item.confidence}%</span>
          </div>

          {/* Confidence bar */}
          <div className="h-[2px] bg-white/[0.08] rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${phase === "classifying" ? 0 : item.confidence}%` }}
            />
          </div>
        </motion.div>
      </div>

      {/* Routing output */}
      <div className="mx-5 mb-4 border border-white/[0.07] rounded-lg overflow-hidden">
        <motion.div key={idx + "-route"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.15 }}>
          <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
            <div className="px-3 py-2.5">
              <div className="text-[9px] text-white/28 tracking-wider mb-1">POLICY</div>
              <span className={`text-[10px] ${item.policy === "PASS" ? "text-emerald-400/80" : "text-yellow-400/80"}`}>
                {item.policy}
              </span>
            </div>
            <div className="px-3 py-2.5">
              <div className="text-[9px] text-white/28 tracking-wider mb-1">ROUTE</div>
              <span className="text-white/55 text-[10px] leading-tight">{item.route}</span>
            </div>
            <div className="px-3 py-2.5">
              <div className="text-[9px] text-white/28 tracking-wider mb-1">SLA</div>
              <span className="text-white/55 text-[10px]">{item.sla}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white/[0.07] px-5 py-2.5 flex justify-between text-[10px]">
        <span className="text-white/30">ShieldX · Intent classification + policy routing</span>
        <span className="text-emerald-400/60">Governed ✓</span>
      </div>

    </div>
  );
}

/* ── WORKFLOW ── */
const STEPS = [
  { n: "01", title: "Request received",        detail: "Customer request ingested from any channel — IVR, mobile app, email, branch system, or voice AI. Source, channel, and timestamp captured. Request normalized into a structured payload for classification." },
  { n: "02", title: "Intent classified",       detail: "NLP classification identifies the intent type and confidence score. Multi-intent requests decomposed into individual intents. Classification model continuously updated on institution-specific language patterns." },
  { n: "03", title: "Account context loaded",  detail: "Customer account state retrieved: product type, outstanding balance, payment history, prior interactions, existing open requests. Context used to validate intent and determine eligible actions." },
  { n: "04", title: "Policy validated",        detail: "Applicable institutional and regulatory policies matched against intent and account context. Eligibility for self-service, specialist routing, or escalation determined. SLA clock started at this stage." },
  { n: "05", title: "Route computed",          detail: "Optimal resolution path determined: self-serve automation, callback queue, specialist team, or escalation. Priority computed from intent criticality and SLA proximity. Duplicate requests detected and merged." },
  { n: "06", title: "Resolution executed",     detail: "Action triggered via appropriate system: self-serve update, CRM task creation, voice AI callback, or agent screen pop. Outcome captured and fed back to determine if follow-up action is needed." },
  { n: "07", title: "Audit and SLA tracked",   detail: "Every request, classification, routing decision, and outcome recorded immutably. SLA breach predicted 2 hours before deadline. Grievance escalations tracked to statutory closure dates per RBI circular." },
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
              i === active ? "bg-white/[0.04] border border-white/10" : "border border-transparent hover:bg-white/[0.02]"
            }`}
          >
            <span className={`text-[10px] font-mono shrink-0 transition-colors ${i === active ? "text-emerald-400" : "text-white/22"}`}>{s.n}</span>
            <span className={`text-sm transition-colors ${i === active ? "text-white" : "text-white/40"}`}>{s.title}</span>
          </div>
        ))}
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
        className="border border-white/10 rounded-xl p-7 bg-white/[0.02] sticky top-24">
        <div className="text-[10px] font-mono text-emerald-400/70 mb-2 tracking-widest">STEP {STEPS[active].n}</div>
        <div className="text-white font-medium mb-3 text-lg">{STEPS[active].title}</div>
        <div className="text-white/48 text-sm leading-relaxed">{STEPS[active].detail}</div>
      </motion.div>
    </div>
  );
}

/* ── COMPLIANCE RULES ── */
const COMP = [
  { label: "RBI Integrated Ombudsman Scheme",  desc: "Grievance submissions tracked from receipt to closure per the RBI Integrated Ombudsman Scheme 2021. 30-day statutory deadline monitored. Escalation triggered automatically before breach." },
  { label: "DPDPA 2025",                    desc: "Customer data accessed only by agents with a verified, need-based purpose per the Digital Personal Data Protection Act, 2023. Access logged per interaction. Data minimisation enforced." },
  { label: "RBI Escalation Framework",         desc: "Mandatory escalation paths enforced for regulated intent types: hardship, disputes, fraud. Once escalated per RBI's customer protection guidelines, cannot be re-routed to lower resolution tiers." },
  { label: "CICRA Bureau Disputes",            desc: "CIBIL and bureau disputes logged with timestamped acknowledgment. Correction timelines tracked against the 30-day CIC resolution deadline per Credit Information Companies (Regulation) Act, 2005." },
  { label: "RBI Hardship Protections",         desc: "Hardship intent triggers protected servicing protocols per RBI's guidelines. Recovery outreach paused pending resolution. Debt collection activity restricted for declared hardship customers." },
  { label: "RBI Charter of Customer Rights",   desc: "Customer rights guaranteed under RBI's Charter of Customer Rights enforced at every interaction — right to fair treatment, transparency, and grievance redressal." },
];

/* ── BEFORE / AFTER ── */
const PAIRS = [
  { w: "Customers routed to wrong teams — multiple transfers, repeated information requests", x: "Intent classified before routing — correct team on first contact, every time" },
  { w: "Grievance SLA tracked in spreadsheets — breaches discovered after the fact",          x: "SLA clock starts on receipt — breach predicted and escalated before it occurs" },
  { w: "Hardship customers handled by collections agents — escalating complaints",            x: "Hardship intent triggers protected protocol — collections activity paused automatically" },
  { w: "CIBIL dispute corrections untracked — customers chase for updates manually",          x: "Bureau correction timelines logged and tracked against regulatory deadlines" },
  { w: "No audit trail for servicing decisions — regulatory review requires manual search",   x: "Every classification, route, and outcome immutably logged — review-ready on demand" },
];

export default function Servicing() {
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 text-xs tracking-[0.18em] mb-8"
              style={{boxShadow:"0 0 18px rgba(52,211,153,0.28)"}}>
              SERVICING
            </div>
          </Motion>

          <Motion delay={0.08}>
            <h1 className="text-[46px] leading-[1.07] font-semibold mb-5">
              Every customer request.<br />Classified and resolved.
            </h1>
          </Motion>

          <Motion delay={0.14}>
            <p className="text-white/50 text-[17px] leading-relaxed mb-8">
              ShieldX classifies intent, validates policy, computes the correct route, and
              enforces SLAs — across every servicing interaction, at any volume.
            </p>
          </Motion>

          <Motion delay={0.2}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { stat: "6",       label: "Intent categories" },
                { stat: "100%",    label: "SLA coverage" },
                { stat: "30-day",  label: "RBI Ombudsman SLA enforced" },
              ].map((m, i) => (
                <div key={i} className="border border-white/[0.07] rounded-xl p-4 bg-white/[0.02]">
                  <div className="text-xl font-semibold text-emerald-300 mb-1">{m.stat}</div>
                  <div className="text-white/50 text-xs">{m.label}</div>
                </div>
              ))}
            </div>
          </Motion>
        </div>

        <Motion delay={0.18}>
          <IntentRouter />
        </Motion>

      </section>

      {/* WORKFLOW */}
      <div className="bg-white/[0.025] border-y border-white/[0.05]">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <Motion>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-0.5 h-4 rounded-full bg-emerald-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">DECISION WORKFLOW</span>
          </div>
          <h2 className="text-[34px] font-semibold mb-10">How ShieldX governs every servicing interaction.</h2>
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
            <div className="w-0.5 h-4 rounded-full bg-emerald-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">COMPLIANCE ENFORCEMENT</span>
          </div>
          <h2 className="text-[34px] font-semibold mb-3">Built for the regulatory reality of servicing.</h2>
          <p className="text-white/42 mb-10 max-w-xl">Every resolution path is governed by applicable regulations, statutory timelines, and institutional policy — enforced automatically, not manually managed.</p>
        </Motion>
        <div className="grid md:grid-cols-2 gap-3">
          {COMP.map((c, i) => (
            <Motion key={i} delay={i * 0.06}>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]
                hover:border-emerald-400/28 hover:bg-white/[0.04] transition-all duration-200 cursor-default group">
                <div className="w-7 h-7 rounded-lg border border-emerald-400/20 bg-emerald-500/[0.06] flex items-center justify-center flex-shrink-0
                  group-hover:border-emerald-400/40 group-hover:bg-emerald-500/[0.10] transition-all duration-200">
                  <span className="text-emerald-400/55 text-xs group-hover:text-emerald-400/80 transition-colors">✓</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white/88 mb-1.5">{c.label}</div>
                  <div className="text-[12px] text-white/40 leading-relaxed">{c.desc}</div>
                </div>
              </div>
            </Motion>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <div className="bg-white/[0.025] border-y border-white/[0.05]">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <Motion>
          <div className="mb-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-0.5 h-4 rounded-full bg-emerald-400/45" />
              <span className="text-[11px] text-white/55 tracking-[0.2em]">THE SHIFT</span>
            </div>
            <h2 className="text-[34px] font-semibold">What governed servicing looks like.</h2>
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

            {/* Right — WITH SHIELDX (emerald) */}
            <div className="rounded-2xl border border-emerald-500/[0.18] bg-emerald-500/[0.025] p-6"
              style={{boxShadow:"0 0 50px rgba(52,211,153,0.10)"}}>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-400 text-[10px] leading-none">✓</span>
                </div>
                <span className="text-[10px] text-emerald-400/65 tracking-[0.2em] font-medium">WITH SHIELDX</span>
              </div>
              <div className="space-y-0.5">
                {PAIRS.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 py-3.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-emerald-400/55 text-[11px] flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-white/72 text-sm leading-relaxed">{p.x}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/[0.08] border border-emerald-400/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                <span className="text-[10px] text-emerald-400/65 tracking-widest">GOVERNED: ✓</span>
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
            <div className="w-0.5 h-4 rounded-full bg-emerald-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">OTHER USE CASES</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { to: "/collections", label: "Collections", desc: "Govern every contact decision — channel, timing, message, and compliance — before outreach fires.", hex: "#f59e0b", rgb: "245,158,11"  },
              { to: "/lending",     label: "Lending",     desc: "Govern eligibility, risk, and decision delivery across every loan application.",                    hex: "#818cf8", rgb: "129,140,248" },
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
              <div className="text-xl font-semibold mb-1">See servicing governed in action.</div>
              <div className="text-white/38 text-sm">Walk through a live intent classification and resolution pipeline — end to end.</div>
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
