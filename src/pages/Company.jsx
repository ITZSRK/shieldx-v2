import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import founder from "../assets/founder.png";

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
   HERO VISUAL — Decision Record (collections only)
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
      { rule:"Suppression", result:"PASS", note:"Not listed"      },
      { rule:"Day rule",    result:"PASS", note:"Not Sun/holiday" },
      { rule:"Frequency",   result:"PASS", note:"Within limit"    },
    ],
    verdict:      "EXECUTE",
    action:       "Agent call · 2:00 PM IST · Assist context",
    verdictColor: "#34d399",
  },
  {
    id:          "DEC-20260411-7822",
    vertical:    "COLLECTIONS",
    vertColor:   "#f59e0b",
    customer:    "Meera N.",
    event:       "promise_to_pay",
    context:     "₹18,000 · DPD-15",
    checks: [
      { rule:"TRAI Window", result:"PASS", note:"11:00–19:00 IST" },
      { rule:"Day rule",    result:"PASS", note:"Not Sun/holiday" },
      { rule:"Frequency",   result:"PASS", note:"Within limit"    },
      { rule:"Frequency Cap", result:"PASS", note:"Within limit"  },
    ],
    verdict:      "EXECUTE",
    action:       "WhatsApp reminder · bank handle",
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
      { rule:"Suppression", result:"PASS", note:"Not listed"                },
      { rule:"Day rule",    result:"PASS", note:"Not Sun/holiday"           },
      { rule:"Frequency",   result:"PASS", note:"Within limit"              },
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
        <span className="text-[9px] text-white/20 tracking-widest">Illustrative</span>
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
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
// Sequence, not timing — see the note on Home's SCENARIO. The point of this
// trace is that the violation is caught and the decision revised before
// anything is dispatched, which is an ordering claim, not a speed claim.
const TRACE = [
  { seq: "01", text: "Signal received",                    kind: "step",    note: "payment_missed · Priya S. · ₹24,000 · DPD-7"     },
  { seq: "02", text: "Decision: Call customer at 7:30 AM", kind: "step",    note: null                                               },
  { seq: "03", text: "TRAI Window Violation",              kind: "blocked", note: "Outreach at 7:30 AM — before TRAI window (8 AM IST)" },
  { seq: "04", text: "Decision revised: Call at 2:00 PM",  kind: "step",    note: null                                               },
  { seq: "05", text: "Compliance Cleared",                 kind: "passed",  note: "Window ✓  Day rule ✓  Frequency ✓  Suppression ✓"               },
  { seq: "06", text: "Agent call triggered",                kind: "step",    note: "Governed · Hardship-aware · Optimal window"       },
  { seq: "07", text: "Audit record written",               kind: "step",    note: "AUD-20260614-48321 · Hash-chained"                   },
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

      <div className="px-5 py-2.5 border-b border-white/[0.05] flex items-center gap-2">
        <span className="text-[10px] text-white/35 tracking-widest shrink-0">TRIGGER</span>
        <span className="text-white/58 text-[11px] truncate">payment_missed · Priya S. · ₹24,000 · DPD-7</span>
      </div>

      <div className="px-5 py-4 space-y-2.5 h-[256px] overflow-hidden">
        {TRACE.slice(0, visible).map((s, i) => {
          const isLatest = i === visible - 1;

          if (s.kind === "blocked") {
            return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="border border-red-400/40 bg-red-400/[0.07] rounded-lg px-4 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-red-400 text-[10px] font-semibold tracking-wide">✗ BLOCKED</span>
                    <span className="text-white/22 text-[10px] tabular-nums">{s.seq}</span>
                  </div>
                  <div className="text-white/65 text-[11px]">{s.text}</div>
                  {isLatest && <div className="text-red-400/55 text-[10px] mt-1">{s.note}</div>}
                </div>
              </motion.div>
            );
          }

          if (s.kind === "passed") {
            return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="border border-emerald-400/40 bg-emerald-400/[0.06] rounded-lg px-4 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-emerald-400 text-[10px] font-semibold tracking-wide">✓ CLEARED</span>
                    <span className="text-white/22 text-[10px] tabular-nums">{s.seq}</span>
                  </div>
                  <div className="text-white/65 text-[11px]">{s.text}</div>
                  {isLatest && <div className="text-emerald-400/55 text-[10px] mt-1">{s.note}</div>}
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLatest ? 1 : 0.38 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 text-[11px] pl-1"
            >
              <span className="text-white/22 w-[22px] shrink-0 pt-px tabular-nums">{s.seq}</span>
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

      <div className={`border-t border-white/[0.12] px-5 py-2.5 flex justify-between text-[10px] transition-opacity duration-500 ${
        visible >= total ? "opacity-100" : "opacity-0"
      }`}>
        <span className="text-white/30">Zero violations · Illustrative simulation</span>
        <span className="text-emerald-400/65">Governed ✓</span>
      </div>

    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CATEGORY DECLARATION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PILLARS = [
  {
    label:  "Infrastructure, not software",
    detail: "No customer UI. No system replacement. A governed layer beneath your application layer."
  },
  {
    label:  "Decisions, not triggers",
    detail: "Context, risk, and compliance evaluated before any action fires — not a rule-based trigger."
  },
  {
    label:  "Compliance as a gate, not a report",
    detail: "Violations blocked before execution, not flagged after."
  },
];

function CategoryDeclaration() {
  const [active, setActive] = useState(null);

  return (
    <div>

      <div className="relative rounded-2xl overflow-hidden border border-blue-400/[0.15] mb-5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.12),transparent_58%)]" />

        <div className="relative px-5 md:px-10 pt-10 md:pt-14 pb-10 md:pb-12 grid md:grid-cols-[1fr_280px] gap-8 md:gap-14 items-center">

          <div>
            <div className="text-[10px] text-blue-300/55 tracking-[0.25em] mb-5">DEFINING A CATEGORY</div>
            <h2 className="text-[26px] md:text-[48px] font-semibold leading-[1.06] mb-6">
              Real-Time Decisioning<br />Infrastructure
            </h2>
            <p className="text-white/66 leading-relaxed max-w-md text-[15px]">
              Not a replacement for any system you already run — the layer that was missing
              between them.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Not a CRM", "Not a CPaaS", "Not a business rule engine"].map((t, i) => (
                <span key={i} className="text-[11px] px-3 py-1.5 rounded-full border border-white/[0.10] text-white/58">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[9px] text-white/30 tracking-[0.2em] mb-3">HOW SHIELDX DIFFERS</div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.015] overflow-hidden">
              <div className="grid px-4 pt-3 pb-2 border-b border-white/[0.06]"
                style={{gridTemplateColumns:"1fr repeat(4, 34px)", gap:"0 4px"}}>
                <div />
                {["CRM","CPaaS","BRE","ShieldX"].map((h, i) => (
                  <div key={h} className="text-center text-[8px] tracking-widest font-medium"
                    style={{color: i === 3 ? "rgba(96,165,250,0.75)" : "rgba(255,255,255,0.25)"}}>
                    {h}
                  </div>
                ))}
              </div>
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
                  style={{gridTemplateColumns:"1fr repeat(4, 34px)", gap:"0 4px"}}>
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
              ShieldX is the only layer that covers all six.
            </div>
          </div>

        </div>
      </div>

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
    sub:  "Triggers produce inconsistent outcomes. Computed decisions are explainable and governed.",
  },
  {
    text: "Compliance belongs inside execution, not beside it.",
    sub:  "Post-execution checks report what went wrong. Pre-execution gates prevent it.",
  },
  {
    text: "Every credit conversation should be intentional.",
    sub:  "Wrong channel, wrong time, no consent — in a regulated environment, that's a liability event.",
  },
  {
    text: "Execution without governance is liability.",
    sub:  "Fire without a decision layer in between, and every ungoverned outcome is exposure waiting to surface.",
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
          className={`py-5 flex items-start gap-10 cursor-default select-none transition-all duration-400 ${
            i === active ? "opacity-100" : "opacity-60"
          }`}
        >
          <div className={`text-[11px] font-mono pt-1.5 w-7 shrink-0 transition-colors duration-300 ${
            i === active ? "text-blue-400" : "text-white/20"
          }`}>
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="flex-1 border-l-2 pl-7 transition-all duration-400"
            style={{borderColor: i === active ? "rgba(96,165,250,0.50)" : "transparent"}}>
            <div
              className="text-[15px] md:text-[19px] leading-snug mb-0 transition-all duration-400"
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

/* ━━━ MOAT LOOP — decide / converse / learn, closing the loop ━━━ */
const LOOP_NODES = [
  { label: "Decide", color: "#60a5fa", x: 75, y: 16 },
  { label: "Converse", color: "#34d399", x: 129, y: 112 },
  { label: "Learn", color: "#a78bfa", x: 21, y: 112 },
];

const LOOP_EDGES = [
  { label: "treatment", x1: 75, y1: 16, x2: 129, y2: 112, lx: 108, ly: 58, anchor: "start" },
  { label: "call recorded", x1: 129, y1: 112, x2: 21, y2: 112, lx: 75, ly: 130, anchor: "middle" },
  { label: "applied", x1: 21, y1: 112, x2: 75, y2: 16, lx: 42, ly: 58, anchor: "end" },
];

function MoatLoop() {
  return (
    <div className="rounded-2xl border border-white/[0.10] bg-white/[0.02] p-7 flex flex-col items-center justify-center h-full">
      <svg viewBox="0 0 150 145" width="160" height="155">
        <defs>
          <marker id="loopArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="rgba(255,255,255,0.4)" />
          </marker>
        </defs>
        {LOOP_EDGES.map(e => (
          <g key={e.label}>
            <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke="rgba(255,255,255,0.16)" strokeWidth="1.3" markerEnd="url(#loopArrow)" />
            <text x={e.lx} y={e.ly} textAnchor={e.anchor}
              fill="rgba(255,255,255,0.38)" fontSize="7" letterSpacing="0.02em">
              {e.label}
            </text>
          </g>
        ))}
        <motion.circle r="3.5" fill="white"
          animate={{ cx: [75, 129, 21, 75], cy: [16, 112, 112, 16] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "linear", times: [0, 0.333, 0.667, 1] }}
          style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.85))" }}
        />
        {LOOP_NODES.map(n => (
          <circle key={n.label} cx={n.x} cy={n.y} r="7" fill={n.color} fillOpacity="0.18" stroke={n.color} strokeWidth="1.4" />
        ))}
      </svg>
      <div className="flex gap-4 mt-3">
        {LOOP_NODES.map(n => (
          <div key={n.label} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: n.color }} />
            <span className="text-[10.5px] text-white/55">{n.label}</span>
          </div>
        ))}
      </div>
      <div className="text-white/35 text-[10px] mt-3 text-center leading-relaxed max-w-[180px]">
        Every conversation closes the loop back into the next decision.
      </div>
    </div>
  );
}

/* ━━━ FOUNDING CRED — interactive signal cards ━━━ */
const CREDS = [
  {
    label: "DOMAIN FOCUS",
    val:   "Collections — the decisioning infrastructure Indian lenders run it on.",
    ctx:   "One decision spine, purpose-built for how credit conversations happen in Indian BFSI.",
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
    ctx:   "Engineered for a full loan book in a single scored run — each one compliant, explainable, and auditable without performance trade-offs.",
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

/* ━━━ PAGE ━━━ */
export default function Company() {
  return (
    <Layout>
      <SEO
        title="Company"
        description="ShieldX is the decisioning infrastructure that closes the gap between signal and action in Indian BFSI collections — built by Quelo Technologies, Mumbai."
        path="/company"
      />

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
              The decision layer<br />collections was missing.
            </h1>
          </Motion>

          <Motion delay={0.16}>
            <p className="text-white/68 text-[17px] leading-relaxed mb-4">
              Signals flow from every system. What happens between signal and action
              is uncontrolled, ungoverned, and unauditable.
            </p>
            <p className="text-[19px] font-semibold text-white" style={{textShadow:"0 0 28px rgba(52,211,153,0.50)"}}>
              ShieldX is the decisioning infrastructure that closes that gap.
            </p>
          </Motion>
        </div>

        <Motion delay={0.2}>
          <HeroVisual />
        </Motion>

      </section>

      {/* ═══ WHAT SHIELDX IS (Standard boilerplate) ═══ */}
      <section className="max-w-6xl mx-auto px-8 pb-28 grid md:grid-cols-2 gap-16 items-start">

        <div className="order-last md:order-first">
          <Motion delay={0.15}>
            <ComplianceCatch />
          </Motion>
        </div>

        <div className="order-first md:order-last">
          <Motion>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-0.5 h-4 rounded-full bg-blue-400/45" />
              <span className="text-[11px] text-white/55 tracking-[0.2em]">HOW IT WORKS</span>
            </div>
            <h2 className="text-[26px] md:text-[36px] font-semibold leading-tight mb-5">
              Decide. Execute.<br />Learn. Repeat.
            </h2>
            <p className="text-white/68 leading-relaxed mb-4">
              Quelo Technologies is a Mumbai-based, DPIIT-recognized fintech infrastructure
              company. ShieldX sits above a lender's communication stack and below its
              credit policy.
            </p>
            <p className="text-white/68 leading-relaxed mb-4">
              Decides who to contact, when, and how — dispatches through calls,
              messages, and agency networks — and logs every decision for RBI's
              model risk management discipline.
            </p>
          </Motion>
        </div>

      </section>

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

      {/* ═══ WHY IT WINS ═══ */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <div className="grid md:grid-cols-[1fr_220px] gap-10 md:gap-14 items-center">
          <div>
            <Motion>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-0.5 h-4 rounded-full bg-blue-400/45" />
                <span className="text-[11px] text-white/55 tracking-[0.2em]">WHY IT WINS</span>
              </div>
              <h2 className="text-[26px] md:text-[34px] font-semibold mb-6 max-w-2xl">
                Models are commoditized; the moat is the loop.
              </h2>
              <p className="text-white/62 max-w-2xl leading-relaxed mb-10">
                ShieldX is the only architecture that owns both the decision layer and the
                conversation layer of collections — so it is the only one where what a
                borrower says in a call systematically changes the next decision on that
                account. Every decision is logged, explainable, and auditable by design,
                aligned with RBI's emerging model risk management framework.
              </p>
            </Motion>
            <Motion delay={0.08}>
              <div className="flex items-center gap-3 p-6 rounded-xl border border-white/[0.10] bg-white/[0.03] max-w-2xl">
                <div className="w-8 h-8 rounded-lg border border-emerald-400/25 bg-emerald-500/[0.08] flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-400 text-xs">✓</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Live with <span className="text-white">a leading private-sector bank</span>, with
                  active engagements across ARCs and collection agencies. Quelo is DPIIT-recognized.
                </p>
              </div>
            </Motion>
          </div>
          <Motion delay={0.12}>
            <MoatLoop />
          </Motion>
        </div>
      </section>

      {/* ═══ BELIEFS ═══ */}
      <div className="bg-white/[0.04] border-y border-white/[0.09]">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <Motion>
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">WHAT WE BELIEVE</span>
            <div className="h-px w-6 bg-white/20" />
          </div>
        </Motion>
        <Beliefs />
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
          <div className="grid md:grid-cols-[1fr_300px] gap-12 items-start max-w-5xl">

            {/* Portrait leads, quote and attribution to its right — the photo
                carries enough size to read as a portrait rather than an avatar.
                Stacks on mobile. */}
            <div className="grid md:grid-cols-[190px_1fr] gap-7 md:gap-8 items-start">
              <img
                src={founder}
                alt="Sudarson Radhakrishnan, Founder & CEO of ShieldX"
                className="w-[165px] md:w-[190px] rounded-xl object-cover border border-white/[0.14]"
                style={{ aspectRatio: "470 / 600", boxShadow: "0 0 34px rgba(59,130,246,0.12)" }}
                loading="lazy"
                decoding="async"
              />
              <div>
                <div className="text-[19px] md:text-[20px] text-white/65 leading-relaxed mb-7 border-l-2 border-blue-400/40 pl-7 italic">
                  "Financial institutions don't have a technology problem. They have a decision
                  governance problem. Every system generates signals — but nothing governs what
                  happens between that signal and the action it triggers. ShieldX is that layer."
                </div>
                <div className="pl-7">
                  <div className="text-white text-sm font-medium">Sudarson Radhakrishnan</div>
                  <div className="text-white/58 text-sm mt-0.5">Founder & CEO · ShieldX</div>
                  <p className="text-white/42 text-[13px] leading-relaxed mt-3 max-w-md">
                    18 years of BFSI experience across Citibank, Standard Chartered, Armsoftech,
                    and Yubi. Quelo Technologies Private Limited is Mumbai-based and DPIIT-recognized.
                  </p>
                </div>
              </div>
            </div>

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
                Decide, execute, and learn — one decision layer, 20 minutes.
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
