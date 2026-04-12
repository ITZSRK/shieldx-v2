import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useEffect, useState } from "react";

/* ━━━ MOTION ━━━ */
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

/* ━━━ WINDOW DOTS — macOS traffic lights ━━━ */
function WindowDots() {
  return (
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO VISUAL — Decision Record
   Cycles through 3 governed decisions with animated
   compliance checks and a pass/blocked verdict.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DECISIONS = [
  {
    id:          "DEC-20260411-7821",
    vertical:    "COLLECTIONS",
    vertColor:   "#f59e0b",
    customer:    "Priya S.",
    event:       "payment_missed",
    context:     "₹24,000 · DPD-7",
    checks: [
      { rule:"TRAI Window", result:"PASS", note:"08:00–19:00 IST" },
      { rule:"TRAI DND",    result:"PASS", note:"Not registered"  },
      { rule:"DPDPA 2025",  result:"PASS", note:"Consent verified"},
      { rule:"RBI FPC",     result:"PASS", note:"Compliant"       },
    ],
    verdict:      "EXECUTE",
    action:       "Voice AI · 2:00 PM IST",
    verdictColor: "#34d399",
  },
  {
    id:          "DEC-20260411-7822",
    vertical:    "LENDING",
    vertColor:   "#818cf8",
    customer:    "Rajan M.",
    event:       "application_submitted",
    context:     "₹8L loan · LTV 58%",
    checks: [
      { rule:"Bureau Score", result:"PASS", note:"CIBIL 734"    },
      { rule:"Policy Gate",  result:"PASS", note:"Within band"  },
      { rule:"DPDPA 2025",   result:"PASS", note:"Consent on file"},
      { rule:"Dedup Check",  result:"PASS", note:"No duplicate" },
    ],
    verdict:      "EXECUTE",
    action:       "Approval notice · Email",
    verdictColor: "#34d399",
  },
  {
    id:          "DEC-20260411-7823",
    vertical:    "COLLECTIONS",
    vertColor:   "#f59e0b",
    customer:    "Arun K.",
    event:       "payment_missed",
    context:     "₹11,500 · DPD-3",
    checks: [
      { rule:"TRAI Window", result:"FAIL", note:"07:30 AM — outside window" },
      { rule:"TRAI DND",    result:"PASS", note:"Not registered"            },
      { rule:"DPDPA 2025",  result:"PASS", note:"Consent verified"          },
      { rule:"RBI FPC",     result:"PASS", note:"Compliant"                 },
    ],
    verdict:      "BLOCKED",
    action:       "Rescheduled · 10:00 AM IST",
    verdictColor: "#ef4444",
  },
];

function HeroVisual() {
  const [decIdx,      setDecIdx]      = useState(0);
  const [checkCount,  setCheckCount]  = useState(0);
  const [showVerdict, setShowVerdict] = useState(false);

  const d = DECISIONS[decIdx];

  useEffect(() => {
    setCheckCount(0);
    setShowVerdict(false);
    const timers = [
      setTimeout(() => setCheckCount(1), 420),
      setTimeout(() => setCheckCount(2), 780),
      setTimeout(() => setCheckCount(3), 1130),
      setTimeout(() => setCheckCount(4), 1480),
      setTimeout(() => setShowVerdict(true), 1950),
      setTimeout(() => setDecIdx(i => (i + 1) % DECISIONS.length), 5600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [decIdx]);

  return (
    <div className="border border-white/10 rounded-xl bg-black/60 overflow-hidden text-xs">

      {/* HEADER */}
      <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-[5px] h-[5px] rounded-full transition-colors duration-500"
            style={{background: d.vertColor + "cc"}} />
          <span className="text-[10px] tracking-[0.18em] transition-colors duration-500 font-mono"
            style={{color: d.vertColor + "bb"}}>{d.vertical}</span>
          <span className="text-white/15">·</span>
          <span className="text-[10px] text-white/25 font-mono">{d.id}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-blue-400/70 font-mono">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* CUSTOMER CONTEXT */}
      <div className="px-4 pt-3.5 pb-3 border-b border-white/[0.05]">
        <div className="text-[9px] text-white/22 tracking-[0.22em] mb-2.5 font-mono">DECISION RECORD</div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-white/70 text-[13px]">{d.customer}</span>
          <span className="text-white/20">·</span>
          <span className="text-white/62 text-[11px] font-mono">{d.event}</span>
        </div>
        <div className="text-white/28 text-[10px]">{d.context}</div>
      </div>

      {/* COMPLIANCE CHECKS */}
      <div className="px-4 pt-3.5 pb-3.5 space-y-2.5">
        {d.checks.map((c, i) => (
          <div key={`${decIdx}-${i}`} className="flex items-center justify-between transition-opacity duration-300"
            style={{opacity: checkCount > i ? 1 : 0}}>
            <div className="flex items-center gap-2">
              <div className="w-[5px] h-[5px] rounded-full flex-shrink-0 transition-colors duration-300"
                style={{background: c.result === "PASS" ? "#34d399" : "#ef4444"}} />
              <span className="text-white/68 text-[11px]">{c.rule}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/20 text-[10px] font-mono">{c.note}</span>
              <span className="text-[10px] font-mono font-semibold"
                style={{color: c.result === "PASS" ? "#34d399" : "#ef4444"}}>
                {c.result}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* VERDICT */}
      <div className="border-t border-white/[0.12] px-4 py-3 flex items-center justify-between transition-opacity duration-400"
        style={{opacity: showVerdict ? 1 : 0}}>
        <span className="text-white/32 text-[11px]">{d.action}</span>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md"
          style={{
            color:       d.verdictColor,
            background:  d.verdictColor + "18",
            border:      `1px solid ${d.verdictColor}38`,
          }}>
          {d.verdict}
        </span>
      </div>

    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPLIANCE ENFORCEMENT VISUAL
   Decision trace — depth view of a single governed decision.
   Visually distinct from hero: vertical trace with
   colored BLOCKED / CLEARED gate cards, not a data table.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const TRACE = [
  { ms: "0ms",  text: "Signal received",                    kind: "step",    note: "payment_missed · Priya S. · ₹24,000 · DPD-7"     },
  { ms: "11ms", text: "Decision: Call customer at 7:30 AM", kind: "step",    note: null                                               },
  { ms: "14ms", text: "TRAI Window Violation",              kind: "blocked", note: "Outreach at 7:30 AM — before TRAI window (8 AM IST)" },
  { ms: "15ms", text: "Decision revised: Call at 2:00 PM",  kind: "step",    note: null                                               },
  { ms: "19ms", text: "Compliance Cleared",                 kind: "passed",  note: "TRAI ✓  DND ✓  DPDP ✓  RBI FPC ✓"               },
  { ms: "28ms", text: "Voice AI outreach triggered",        kind: "step",    note: "Governed · Hardship-aware · Optimal window"       },
  { ms: "29ms", text: "Audit record written",               kind: "step",    note: "AUD-20260614-48321 · Immutable"                   },
];

const TRACE_DELAYS = [400, 650, 700, 1700, 700, 1400, 700, 3500];

function ComplianceCatch() {
  const [visible, setVisible] = useState(0);
  const total = TRACE.length;

  useEffect(() => {
    const delay = visible <= total ? TRACE_DELAYS[visible] ?? 3500 : 3500;
    const t = setTimeout(() => setVisible(v => v >= total ? 0 : v + 1), delay);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="border border-white/10 rounded-xl bg-black/55 overflow-hidden font-mono text-xs">

      {/* TITLE BAR — emerald indicator differentiates from hero blue */}
      <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-3">
        <WindowDots />
        <span className="flex-1 text-center text-white/55 text-[10px] tracking-[0.18em]">
          ShieldX — Compliance Enforcement
        </span>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ENFORCING
        </div>
      </div>

      {/* TRIGGER */}
      <div className="px-5 py-2.5 border-b border-white/[0.05] flex items-center gap-2">
        <span className="text-[10px] text-white/35 tracking-widest shrink-0">TRIGGER</span>
        <span className="text-white/58 text-[11px] truncate">payment_missed · Priya S. · ₹24,000 · DPD-7</span>
      </div>

      {/* DECISION TRACE — vertical flow with gate cards */}
      <div className="px-5 py-4 space-y-2.5 h-[256px] overflow-hidden">
        {TRACE.slice(0, visible).map((s, i) => {
          const isLatest = i === visible - 1;

          /* ── BLOCKED gate ── */
          if (s.kind === "blocked") {
            return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="border border-red-400/40 bg-red-400/[0.07] rounded-lg px-4 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-red-400 text-[10px] font-semibold tracking-wide">✗ BLOCKED</span>
                    <span className="text-white/22 text-[10px]">[{s.ms}]</span>
                  </div>
                  <div className="text-white/65 text-[11px]">{s.text}</div>
                  {isLatest && <div className="text-red-400/55 text-[10px] mt-1">{s.note}</div>}
                </div>
              </motion.div>
            );
          }

          /* ── PASSED gate ── */
          if (s.kind === "passed") {
            return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="border border-emerald-400/40 bg-emerald-400/[0.06] rounded-lg px-4 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-emerald-400 text-[10px] font-semibold tracking-wide">✓ CLEARED</span>
                    <span className="text-white/22 text-[10px]">[{s.ms}]</span>
                  </div>
                  <div className="text-white/65 text-[11px]">{s.text}</div>
                  {isLatest && <div className="text-emerald-400/55 text-[10px] mt-1">{s.note}</div>}
                </div>
              </motion.div>
            );
          }

          /* ── Regular trace step ── */
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLatest ? 1 : 0.38 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 text-[11px] pl-1"
            >
              <span className="text-white/22 w-[44px] shrink-0 pt-px">[{s.ms}]</span>
              <div className="flex-1 min-w-0">
                <span className="text-white/62">{s.text}</span>
                {isLatest && s.note && (
                  <div className="text-white/28 text-[10px] mt-0.5">{s.note}</div>
                )}
              </div>
              <span className="text-white/20 text-[10px] pt-px shrink-0">✓</span>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className={`border-t border-white/[0.12] px-5 py-2.5 flex justify-between text-[10px] transition-opacity duration-500 ${
        visible >= total ? "opacity-100" : "opacity-0"
      }`}>
        <span className="text-white/30">Enforcement latency: 5ms · Zero violations</span>
        <span className="text-emerald-400/65">Governed ✓</span>
      </div>

    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CATEGORY DECLARATION
   Confident category creation — no comparisons, no NOT/IS.
   Defines what the category IS through three pillars.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PILLARS = [
  {
    label:  "Infrastructure, not software",
    detail: "No customer UI. No system replacement. Sits beneath the application layer — a governed layer between signals and execution."
  },
  {
    label:  "Decisions, not triggers",
    detail: "Context, risk, compliance, and channel — evaluated before any action fires. Explainable outcomes, not rule-based triggers."
  },
  {
    label:  "Compliance as a gate, not a report",
    detail: "Violations blocked before execution. Not flagged after. Regulatory enforcement at the infrastructure level."
  },
];

function CategoryDeclaration() {
  const [active, setActive] = useState(null);

  return (
    <div>

      {/* Main declaration panel */}
      <div className="relative rounded-2xl overflow-hidden border border-blue-400/[0.15] mb-5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.12),transparent_58%)]" />

        <div className="relative px-5 md:px-10 pt-10 md:pt-14 pb-10 md:pb-12 grid md:grid-cols-[1fr_280px] gap-8 md:gap-14 items-center">

          {/* Left: declaration */}
          <div>
            <div className="text-[10px] text-blue-300/55 tracking-[0.25em] mb-5">DEFINING A NEW CATEGORY</div>
            <h2 className="text-[26px] md:text-[48px] font-semibold leading-[1.06] mb-6">
              Customer Decisioning<br />Infrastructure
            </h2>
            <p className="text-white/66 leading-relaxed max-w-md text-[15px]">
              A new layer in the financial technology stack — between systems of record and channels of execution.
              Not a replacement of any existing system. The decisioning layer between them.
            </p>

            {/* NOT pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["Not a CRM", "Not a CPaaS", "Not a business rule engine"].map((t, i) => (
                <span key={i} className="text-[11px] px-3 py-1.5 rounded-full border border-white/[0.10] text-white/58">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: category comparison matrix */}
          <div>
            <div className="text-[9px] text-white/30 tracking-[0.2em] mb-3">HOW CDI DIFFERS</div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.015] overflow-hidden">
              {/* Header row */}
              <div className="grid px-4 pt-3 pb-2 border-b border-white/[0.06]"
                style={{gridTemplateColumns:"1fr repeat(4, 30px)", gap:"0 4px"}}>
                <div />
                {["CRM","CPaaS","BRE","CDI"].map((h, i) => (
                  <div key={h} className="text-center text-[8px] tracking-widest font-medium"
                    style={{color: i === 3 ? "rgba(96,165,250,0.75)" : "rgba(255,255,255,0.25)"}}>
                    {h}
                  </div>
                ))}
              </div>
              {/* Capability rows */}
              {[
                { cap:"Contact management",    v:[1,0,0,1] },
                { cap:"Channel delivery",       v:[0,1,0,1] },
                { cap:"Rule evaluation",        v:[0,0,1,1] },
                { cap:"Pre-exec compliance",    v:[0,0,0,1] },
                { cap:"Decision audit trail",   v:[0,0,0,1] },
                { cap:"Regulatory enforcement", v:[0,0,0,1] },
              ].map((row, ri) => (
                <div key={ri}
                  className="grid px-4 py-2.5 border-b border-white/[0.04] last:border-0 transition-colors duration-200 hover:bg-white/[0.05]"
                  style={{gridTemplateColumns:"1fr repeat(4, 30px)", gap:"0 4px"}}>
                  <div className="text-[10px] text-white/58 leading-tight self-center">{row.cap}</div>
                  {row.v.map((val, ci) => (
                    <div key={ci} className="flex items-center justify-center text-[11px] font-medium"
                      style={{
                        color: ci === 3
                          ? (val ? "rgba(96,165,250,0.85)" : "rgba(255,255,255,0.18)")
                          : (val ? "rgba(255,255,255,0.52)" : "rgba(255,255,255,0.13)"),
                      }}>
                      {val ? "✓" : "—"}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-2 text-[9px] text-white/22 px-0.5">
              CDI is the only layer that covers all six.
            </div>
          </div>

        </div>
      </div>

      {/* Three pillars */}
      <div className="grid md:grid-cols-3 gap-4">
        {PILLARS.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="p-6 rounded-xl border cursor-default transition-all duration-300"
            style={{
              borderColor: active === i ? "rgba(96,165,250,0.35)" : "rgba(255,255,255,0.12)",
              background:  active === i ? "rgba(96,165,250,0.07)" : "rgba(255,255,255,0.04)",
              boxShadow:   active === i ? "0 0 28px rgba(59,130,246,0.12)" : "none",
            }}
          >
            <div className="w-6 h-[1px] mb-4 transition-colors duration-300"
              style={{background: active === i ? "rgba(96,165,250,0.6)" : "rgba(255,255,255,0.15)"}} />
            <div className="text-[13px] font-medium mb-3 transition-colors duration-300"
              style={{color: active === i ? "white" : "rgba(255,255,255,0.85)"}}>
              {p.label}
            </div>
            <div className="text-xs leading-relaxed transition-colors duration-300"
              style={{color: active === i ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.62)"}}>
              {p.detail}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ━━━ BELIEFS — auto-cycle, hover freezes ━━━ */
const BELIEFS = [
  {
    text: "Decisions should be computed, not triggered.",
    sub:  "Rule-based triggers produce inconsistent, unauditable outcomes. Computed decisions produce explainable, governed ones — every time.",
  },
  {
    text: "Compliance belongs inside execution, not beside it.",
    sub:  "Post-execution compliance checks are reports of what went wrong. Pre-execution compliance gates are what prevent it.",
  },
  {
    text: "Every customer interaction should be intentional.",
    sub:  "Accidental outreach — wrong channel, wrong time, no consent — isn't just ineffective. In a regulated environment, it's a liability event.",
  },
  {
    text: "Execution without governance is liability.",
    sub:  "When systems fire without a decision layer between them, every ungoverned outcome is a regulatory exposure waiting to be discovered.",
  },
];

function Beliefs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const i = setInterval(() => setActive(a => (a + 1) % BELIEFS.length), 3000);
    return () => clearInterval(i);
  }, [paused]);

  return (
    <div className="divide-y divide-white/[0.06]">
      {BELIEFS.map((b, i) => (
        <div
          key={i}
          onMouseEnter={() => { setActive(i); setPaused(true); }}
          onMouseLeave={() => setPaused(false)}
          className={`py-9 flex items-start gap-10 cursor-default select-none transition-all duration-400 ${
            i === active ? "opacity-100" : "opacity-60"
          }`}
        >
          <div className={`text-[11px] font-mono pt-2.5 w-7 shrink-0 transition-colors duration-300 ${
            i === active ? "text-blue-400" : "text-white/20"
          }`}>
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="flex-1 border-l-2 pl-7 transition-all duration-400"
            style={{borderColor: i === active ? "rgba(96,165,250,0.50)" : "transparent"}}>
            <div
              className="text-[18px] md:text-[26px] leading-snug mb-0 transition-all duration-400"
              style={{
                color: i === active ? "white" : "rgba(255,255,255,0.62)",
                textShadow: i === active ? "0 0 40px rgba(59,130,246,0.25)" : "none",
              }}
            >
              {b.text}
            </div>
            <div className="overflow-hidden transition-all duration-500"
              style={{
                maxHeight: i === active ? "80px" : "0px",
                opacity:   i === active ? 1 : 0,
                marginTop: i === active ? "10px" : "0px",
              }}>
              <p className="text-sm text-white/62 leading-relaxed">{b.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ━━━ FOUNDING CRED — interactive signal cards ━━━ */
const CREDS = [
  {
    label: "DOMAIN FOCUS",
    val:   "Collections · Lending · Servicing",
    ctx:   "Built across all three verticals — not specialised in one. The same decision layer governs each, with vertical-specific compliance logic built in.",
  },
  {
    label: "INDUSTRY",
    val:   "Indian BFSI — with global applicability.",
    ctx:   "Designed for the regulatory and operational reality of Indian financial services. Built to extend to any regulated market where governed decisions matter.",
  },
  {
    label: "PROBLEM ORIGIN",
    val:   "Operator-observed — not consultant-assumed",
    ctx:   "The gap was identified inside live operations, not from analyst reports or market research. ShieldX names a problem that existed long before it had a name.",
  },
  {
    label: "BUILT FOR",
    val:   "High-volume, regulated decision workflows",
    ctx:   "Engineered for thousands of decisions per minute — each one compliant, explainable, and auditable without performance trade-offs.",
  },
];

function FoundingCred() {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="space-y-2">
      {CREDS.map((item, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="rounded-xl px-5 py-3.5 border cursor-default transition-all duration-300"
          style={{
            borderColor: hovered === i ? "rgba(96,165,250,0.28)" : "rgba(255,255,255,0.07)",
            background:  hovered === i ? "rgba(59,130,246,0.045)" : "rgba(255,255,255,0.02)",
            boxShadow:   hovered === i ? "0 0 20px rgba(59,130,246,0.07)" : "none",
          }}
        >
          <div className="text-[9px] tracking-widest mb-1 transition-colors duration-300"
            style={{color: hovered === i ? "rgba(96,165,250,0.55)" : "rgba(255,255,255,0.28)"}}>
            {item.label}
          </div>
          <div className="text-[13px] transition-colors duration-300"
            style={{color: hovered === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.62)"}}>
            {item.val}
          </div>
          <div className="overflow-hidden transition-all duration-400"
            style={{
              maxHeight: hovered === i ? "72px" : "0px",
              opacity:   hovered === i ? 1 : 0,
              marginTop: hovered === i ? "8px" : "0px",
            }}>
            <p className="text-[11px] text-white/42 leading-relaxed">{item.ctx}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ━━━ BFSI CARDS — auto-cycle, hover freezes, links to sub-pages ━━━ */
const BFSI = [
  {
    area: "Collections",
    to:   "/collections",
    line: "Every missed payment is a decision point.",
    sub:  "Who to contact. When. Which channel. What offer. ShieldX governs all of it.",
  },
  {
    area: "Lending",
    to:   "/lending",
    line: "Every application is a risk computation.",
    sub:  "Eligibility, risk, compliance — evaluated at the moment of decision, not after.",
  },
  {
    area: "Servicing",
    to:   "/servicing",
    line: "Every request is a decision event.",
    sub:  "Intent classified. Policy validated. Resolution executed. Every time.",
  },
];

function BFSICards() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const i = setInterval(() => setActive(a => (a + 1) % BFSI.length), 2800);
    return () => clearInterval(i);
  }, [paused]);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {BFSI.map((item, i) => (
        <Link
          key={i}
          to={item.to}
          onMouseEnter={() => { setActive(i); setPaused(true); }}
          onMouseLeave={() => setPaused(false)}
          className={`block p-8 rounded-xl border select-none transition-all duration-400 no-underline ${
            i === active
              ? "border-blue-400/28 bg-blue-500/[0.05] shadow-[0_0_35px_rgba(59,130,246,0.1)] opacity-100"
              : "border-white/[0.12] bg-white/[0.04] opacity-70"
          }`}
        >
          <div className={`text-[10px] tracking-[0.2em] mb-4 transition-colors duration-300 ${
            i === active ? "text-blue-400/70" : "text-white/28"
          }`}>{item.area.toUpperCase()}</div>

          <div className="text-white text-[16px] leading-snug mb-3">{item.line}</div>

          <div className={`text-sm leading-relaxed transition-colors duration-300 ${
            i === active ? "text-white/68" : "text-white/52"
          }`}>{item.sub}</div>

          <div className={`mt-5 text-xs transition-colors duration-300 ${
            i === active ? "text-blue-400/60" : "text-white/18"
          }`}>Explore →</div>
        </Link>
      ))}
    </div>
  );
}

/* ━━━ PAGE ━━━ */
export default function Company() {
  return (
    <Layout>

      {/* ═══ HERO ═══ */}
      <section className="max-w-6xl mx-auto px-8 pt-[120px] pb-24 grid md:grid-cols-2 gap-16 items-center">

        <div>
          <Motion>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs tracking-[0.18em] mb-9"
              style={{boxShadow:"0 0 18px rgba(59,130,246,0.22)"}}>
              COMPANY
            </div>
          </Motion>

          <Motion delay={0.08}>
            <h1 className="text-[32px] md:text-[50px] leading-[1.07] font-semibold mb-6">
              The decision layer<br />BFSI was missing.
            </h1>
          </Motion>

          <Motion delay={0.16}>
            <p className="text-white/68 text-[17px] leading-relaxed">
              Signals flow from every system. What happens between signal and action
              is uncontrolled, ungoverned, and unauditable.
              ShieldX closes that gap.
            </p>
          </Motion>
        </div>

        <Motion delay={0.2}>
          <HeroVisual />
        </Motion>

      </section>

      {/* ═══ FOUNDING INSIGHT ═══ */}
      <section className="max-w-6xl mx-auto px-8 pb-28 grid md:grid-cols-2 gap-16 items-start">

        {/* Compliance enforcement — LEFT on desktop, below text on mobile */}
        <div className="order-last md:order-first">
          <Motion delay={0.15}>
            <ComplianceCatch />
          </Motion>
        </div>

        {/* Text — RIGHT on desktop, first on mobile */}
        <div className="order-first md:order-last">
          <Motion>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-0.5 h-4 rounded-full bg-blue-400/45" />
              <span className="text-[11px] text-white/55 tracking-[0.2em]">WHY WE BUILT IT</span>
            </div>
            <h2 className="text-[26px] md:text-[36px] font-semibold leading-tight mb-5">
              Three systems.<br />No layer between them.
            </h2>
            <p className="text-white/68 leading-relaxed mb-4">
              Every financial institution has systems of record, systems of engagement,
              and systems of execution. Between them — nothing governing decisions.
            </p>
            <p className="text-white font-medium">
              ShieldX is that layer.
            </p>
          </Motion>
        </div>

      </section>

      {/* ═══ PRODUCT VIDEO ═══ */}
      <div className="bg-white/[0.04] border-y border-white/[0.09]">
      <section className="max-w-5xl mx-auto px-8 py-20">
        <Motion>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-6 bg-white/20" />
              <span className="text-[11px] text-white/55 tracking-[0.22em]">IN ACTION</span>
              <div className="h-px w-6 bg-white/20" />
            </div>
            <h2 className="text-[30px] font-semibold mb-3">Watch ShieldX run a live decision.</h2>
            <p className="text-white/58 text-sm max-w-md mx-auto leading-relaxed">
              Signal in. Compliance checked. Governed action out. End to end.
            </p>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.10]"
            style={{ paddingBottom: "56.25%", background: "rgba(0,0,0,0.5)" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/sjl9hKDv_3o?controls=1&rel=0&modestbranding=1&color=white"
              title="ShieldX — Live Decision Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Motion>
      </section>
      </div>

      {/* ═══ CATEGORY DECLARATION ═══ */}
      <div className="bg-white/[0.04] border-y border-white/[0.09]">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <Motion>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">CATEGORY</span>
            <div className="h-px w-6 bg-white/20" />
          </div>
        </Motion>
        <Motion delay={0.08}>
          <CategoryDeclaration />
        </Motion>
      </section>
      </div>

      {/* ═══ BELIEFS ═══ */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <Motion>
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">WHAT WE BELIEVE</span>
            <div className="h-px w-6 bg-white/20" />
          </div>
        </Motion>
        <Beliefs />
      </section>

      {/* ═══ INDUSTRY ═══ */}
      <div className="bg-white/[0.04] border-y border-white/[0.09]">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <Motion>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-0.5 h-4 rounded-full bg-blue-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">INDUSTRY</span>
          </div>
          <h2 className="text-[26px] md:text-[34px] font-semibold mb-10">Built for BFSI.</h2>
        </Motion>
        <BFSICards />
      </section>
      </div>

      {/* ═══ FOUNDER ═══ */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">

        <Motion>
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-0.5 h-4 rounded-full bg-blue-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">FOUNDING TEAM</span>
          </div>
        </Motion>

        <Motion delay={0.08}>
          <div className="grid md:grid-cols-[1fr_300px] gap-12 items-start max-w-4xl">

            {/* Quote + bio */}
            <div>
              <div className="text-[20px] text-white/65 leading-relaxed mb-8 border-l-2 border-blue-400/40 pl-7 italic">
                "Financial institutions don't have a technology problem. They have a decision
                governance problem. Every system generates signals — but nothing governs what
                happens between that signal and the action it triggers. ShieldX is that layer."
              </div>
              <div className="pl-7">
                <div className="text-white text-sm font-medium">Sudarson Radhakrishnan</div>
                <div className="text-white/58 text-sm mt-0.5">Founder & CEO · ShieldX</div>
                <p className="text-white/42 text-[13px] leading-relaxed mt-3 max-w-sm">
                  Observed the gap firsthand — across collections, lending, and servicing
                  at scale in Indian BFSI. Built the tool that didn't exist.
                </p>
              </div>
            </div>

            {/* Credibility signals — interactive */}
            <FoundingCred />

          </div>
        </Motion>

      </section>

      {/* ═══ CTA — inline, no oversized box ═══ */}
      <section className="max-w-6xl mx-auto px-8 pb-32">
        <Motion>
          <div className="border-t border-white/[0.08] pt-12 flex items-center justify-between flex-wrap gap-6">
            <div>
              <div className="text-xl font-semibold mb-1">See what ShieldX closes.</div>
              <div className="text-white/58 text-sm">
                Collections · Lending · Servicing — one decision layer, 20 minutes.
              </div>
            </div>
            <Link
              to="/demo"
              className="inline-block bg-white text-black px-7 py-2.5 rounded-md text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shrink-0"
            >
              Request a walkthrough
            </Link>
          </div>
        </Motion>
      </section>

    </Layout>
  );
}
