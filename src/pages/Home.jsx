import Navbar from "../layouts/Navbar";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Layout from "../layouts/Layout";

/* ================= MOTION ================= */
function Motion({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ================= ARCHITECTURE ================= */
function ArchitectureStack() {
  const layers = [
    "Signal Layer",
    "Decision Engine",
    "Compliance Enforcement",
    "Routing Logic",
    "Execution"
  ];

  const layerInfo = [
    "CBS, LOS, and CRM fire events into ShieldX. Every trigger normalised before evaluation begins.",
    "Customer risk, segment, and context computed before any channel or action is considered.",
    "TRAI window, DND, DPDP consent, RBI FPC — enforced in sequence. A single violation blocks execution.",
    "Channel, timing, message template, and offer parameters determined from the governed decision.",
    "Outreach fires with full reason codes attached. Immutable audit record written per interaction."
  ];

  const STAGE_COLORS = [
    { hex:"#94a3b8", border:"rgba(148,163,184,0.28)", bg:"rgba(148,163,184,0.06)", label:"rgba(148,163,184,0.65)", glow:"rgba(148,163,184,0.45)" },
    { hex:"#60a5fa", border:"rgba(96,165,250,0.28)",  bg:"rgba(96,165,250,0.06)",  label:"rgba(96,165,250,0.65)",  glow:"rgba(96,165,250,0.50)"  },
    { hex:"#4ade80", border:"rgba(74,222,128,0.28)",  bg:"rgba(74,222,128,0.06)",  label:"rgba(74,222,128,0.65)",  glow:"rgba(74,222,128,0.50)"  },
    { hex:"#fb923c", border:"rgba(251,146,60,0.28)",  bg:"rgba(251,146,60,0.06)",  label:"rgba(251,146,60,0.65)",  glow:"rgba(251,146,60,0.50)"  },
    { hex:"#a78bfa", border:"rgba(167,139,250,0.28)", bg:"rgba(167,139,250,0.06)", label:"rgba(167,139,250,0.65)", glow:"rgba(167,139,250,0.50)" },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setActive((p) => (p + 1) % layers.length);
    }, 2800);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-16 items-center">

      {/* LEFT */}
      <div>
        <div className="text-[10px] font-mono text-white/28 tracking-[0.2em] mb-5">5 STAGES · 1 CONTROL PLANE</div>

        <p className="text-white/55 text-[15px] leading-relaxed mb-5">
          Sits between your CBS, LOS, CRM, and every outreach channel. Every decision passes through all five stages — none skippable, none overridable without a logged reason.
        </p>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="rounded-xl p-4 border"
          style={{ borderColor: STAGE_COLORS[active].border, background: STAGE_COLORS[active].bg }}
        >
          <div className="text-[9px] font-mono tracking-[0.2em] mb-2"
            style={{ color: STAGE_COLORS[active].label }}>
            {layers[active].toUpperCase()}
          </div>
          <p className="text-white/78 text-sm leading-relaxed">{layerInfo[active]}</p>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="
        rounded-2xl p-6
        bg-black/60
        border border-white/15
        shadow-[0_0_50px_rgba(59,130,246,0.2)]
      ">
        <div className="space-y-4">
          {layers.map((layer, i) => {
            const isActive = i === active;
            const sc = STAGE_COLORS[i];

            return (
              <div
                key={i}
                className="h-11 rounded-md flex items-center justify-center gap-2 text-sm transition-all duration-500"
                style={isActive ? {
                  background: sc.bg,
                  border: `1px solid ${sc.border}`,
                  color: sc.hex,
                  transform: "scale(1.03)",
                  boxShadow: `0 0 22px ${sc.glow}`,
                } : {
                  border: "1px solid transparent",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {isActive && <div className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: sc.hex }} />}
                {layer}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

/* ================= GOVERNED DECISION SCENARIOS ================= */
const SCENARIOS = [
  {
    label: "COLLECTIONS",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    event: "payment_missed",
    customer: "CUST-48321 · DPD 30–60 · ₹24,000",
    steps: [
      { ms:"0ms",  text:"Signal received",               note:"CBS payment_missed event ingested",           color:"white" },
      { ms:"8ms",  text:"Risk scored — 0.82 HIGH",        note:"DPD bucket evaluated, channel assessed",     color:"white" },
      { ms:"14ms", text:"TRAI window — COMPLIANT",        note:"2:00 PM IST — within 8 AM–7 PM window",     color:"green" },
      { ms:"16ms", text:"TRAI DND — CLEAR",               note:"DND check passed",                           color:"green" },
      { ms:"17ms", text:"DPDP consent — PASS",            note:"Consent verified before execution",          color:"green" },
      { ms:"18ms", text:"RBI FPC — PASS",                 note:"Fair practices code compliant",              color:"green" },
      { ms:"19ms", text:"Voice AI outreach triggered",    note:"Governed · hardship-aware · optimal window", color:"blue"  },
      { ms:"19ms", text:"Audit record written",           note:"AUD-20260614-48321 · Immutable",             color:"dim"   },
    ],
  },
  {
    label: "LENDING",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.10)",
    event: "loan_application",
    customer: "CUST-91042 · PRIME · ₹5,00,000",
    steps: [
      { ms:"0ms",  text:"Application received",           note:"LOS event ingested, payload normalised",     color:"white" },
      { ms:"9ms",  text:"FOIR evaluated — 34% (OK)",      note:"Within institution threshold",               color:"white" },
      { ms:"13ms", text:"CIBIL — 741, Equifax — 738",     note:"Multi-bureau pull completed",                color:"white" },
      { ms:"17ms", text:"RBI FPC — PASS",                 note:"Fair lending practices verified",            color:"green" },
      { ms:"18ms", text:"DPDP consent — PASS",            note:"Bureau pull consent confirmed",              color:"green" },
      { ms:"19ms", text:"KYC Master Direction — PASS",      note:"KYC verification status confirmed",          color:"green" },
      { ms:"20ms", text:"Approval notice triggered",      note:"Communication as per RBI guidelines",        color:"blue"  },
      { ms:"20ms", text:"Decision payload logged",        note:"Reason codes attached · Audit-ready",        color:"dim"   },
    ],
  },
  {
    label: "SERVICING",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    event: "grievance_raised",
    customer: "CUST-73218 · BILLING_DISPUTE",
    steps: [
      { ms:"0ms",  text:"Grievance received",             note:"CRM event ingested, intent extraction begins",color:"white"},
      { ms:"6ms",  text:"Intent — BILLING_DISPUTE",       note:"Classification confidence: 0.94",            color:"white" },
      { ms:"11ms", text:"RBI Ombudsman SLA — 30 days",    note:"SLA clock started, deadline set",            color:"green" },
      { ms:"14ms", text:"DPDP rights — PASS",             note:"Customer rights verified",                   color:"green" },
      { ms:"16ms", text:"RBI Charter — PASS",             note:"Charter of customer rights compliant",       color:"green" },
      { ms:"18ms", text:"Grievance queue routed",         note:"Assigned to billing dispute handler",        color:"blue"  },
      { ms:"18ms", text:"SLA-tracked log written",        note:"AUD-20260614-73218 · RBI-ready",             color:"dim"   },
    ],
  },
];

const STEP_COLORS = {
  white: { text:"rgba(255,255,255,0.75)", dot:"rgba(255,255,255,0.4)"  },
  green: { text:"#4ade80",               dot:"#4ade80"                 },
  blue:  { text:"#93c5fd",               dot:"#60a5fa"                 },
  dim:   { text:"rgba(255,255,255,0.32)", dot:"rgba(255,255,255,0.18)" },
};

function GovernedDecisionView() {
  const [scIdx, setScIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const sc = SCENARIOS[scIdx];

  useEffect(() => {
    setStepIdx(0);
  }, [scIdx]);

  useEffect(() => {
    const i = setInterval(() => {
      setStepIdx(s => {
        if (s >= sc.steps.length - 1) {
          setScIdx(p => (p + 1) % SCENARIOS.length);
          return 0;
        }
        return s + 1;
      });
    }, 600);
    return () => clearInterval(i);
  }, [sc]);

  return (
    <div className="border border-white/15 rounded-xl bg-black/50 overflow-hidden font-mono text-xs">

      {/* tab row */}
      <div className="flex border-b border-white/[0.07]">
        {SCENARIOS.map((s, i) => (
          <button key={s.label} onClick={() => setScIdx(i)}
            className="flex-1 px-3 pt-2.5 pb-2 text-[10px] tracking-widest transition-all duration-200 border-r border-white/[0.06] last:border-r-0 relative"
            style={{
              color: i===scIdx ? s.color : "rgba(255,255,255,0.38)",
              background: i===scIdx ? s.bg : "transparent",
              fontWeight: i===scIdx ? "600" : "400",
            }}>
            {s.label}
            {i===scIdx && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t"
                style={{ background: s.color, opacity: 0.75 }} />
            )}
          </button>
        ))}
      </div>

      {/* trigger line */}
      <div className="px-5 py-2.5 border-b border-white/[0.09] flex items-center gap-3">
        <span className="text-[9px] text-white/25 tracking-widest">TRIGGER</span>
        <span className="text-white/55 text-[11px]">{sc.event}</span>
        <span className="text-white/28 text-[10px]">·</span>
        <span className="text-white/35 text-[10px]">{sc.customer}</span>
      </div>

      {/* steps */}
      <div className="px-5 py-4 space-y-2.5 min-h-[240px]">
        {sc.steps.map((step, i) => {
          const shown = i <= stepIdx;
          const isActive = i === stepIdx;
          const c = STEP_COLORS[step.color];
          return (
            <motion.div key={`${scIdx}-${i}`}
              initial={{opacity:0, x:-6}} animate={{opacity: shown ? 1 : 0, x: shown ? 0 : -6}}
              transition={{duration:.22}}
              className="flex items-start gap-3"
            >
              <span className="text-white/22 w-[42px] shrink-0 pt-px text-[10px]">[{step.ms}]</span>
              <div className="flex items-center gap-2 flex-1">
                <div className="w-[5px] h-[5px] rounded-full flex-shrink-0 mt-px transition-all duration-200"
                  style={{
                    background: c.dot,
                    boxShadow: isActive ? `0 0 6px ${c.dot}` : "none",
                  }}/>
                <div>
                  <span style={{color: c.text}}>{step.text}</span>
                  {isActive && (
                    <div className="text-[10px] text-white/30 mt-0.5">{step.note}</div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="border-t border-white/[0.07] px-5 py-2.5 flex justify-between text-[10px]">
        <span className="text-white/22">Every step logged · Every check recorded · Regulator-ready</span>
        <span style={{color:"rgba(74,222,128,0.6)"}}>Compliant ✓</span>
      </div>
    </div>
  );
}

/* ================= PROBLEM CARDS ================= */
const PROBLEMS = [
  {
    n: "01",
    head: "CBS fires signals directly into channels.",
    body: "No scoring. No compliance check. No channel logic between the event and the outreach.",
    num: "#fbbf24",
    dot: "rgba(251,191,36,0.55)",
    card: "border-amber-400/[0.15] bg-amber-500/[0.02] hover:border-amber-400/[0.42] hover:bg-amber-500/[0.04] hover:shadow-[0_0_28px_rgba(251,191,36,0.07)]",
  },
  {
    n: "02",
    head: "Vendors operate with no shared compliance gate.",
    body: "TRAI violations. RBI FPC breaches. Discovered in post-call audits — not blocked before they happen.",
    num: "#f87171",
    dot: "rgba(248,113,113,0.55)",
    card: "border-red-400/[0.15] bg-red-500/[0.02] hover:border-red-400/[0.42] hover:bg-red-500/[0.04] hover:shadow-[0_0_28px_rgba(248,113,113,0.08)]",
  },
  {
    n: "03",
    head: "When RBI asks, there's no answer.",
    body: "No reason codes. No immutable log. No evidence of why a customer was contacted at 7:30 AM.",
    num: "#c084fc",
    dot: "rgba(192,132,252,0.55)",
    card: "border-violet-400/[0.15] bg-violet-500/[0.02] hover:border-violet-400/[0.42] hover:bg-violet-500/[0.04] hover:shadow-[0_0_28px_rgba(192,132,252,0.08)]",
  },
];

/* ================= PAGE ================= */
export default function Home() {
  return (
    <div className="bg-[#050507] text-white overflow-hidden relative">

      <Navbar />

      {/* GRID */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]
        bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
        bg-[size:72px_72px]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.12),transparent_40%)]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.07),transparent_50%)]" />

      {/* ── HERO ── */}
      <section className="px-8 pt-32 pb-20 text-center max-w-5xl mx-auto">
        <Motion>
          <h1 className="text-[62px] leading-[1.04] font-semibold tracking-tight mb-6">
            Customer Decisioning<br />Infrastructure.
          </h1>

          <p className="text-[18px] text-white/68 mb-5 max-w-lg mx-auto leading-relaxed">
            Every customer decision your institution makes — credit, collections,
            servicing, or internal — evaluated, validated against regulation,
            and audited. Before any action is triggered.
          </p>

          <div className="flex items-center justify-center gap-3 text-[12px] text-white/28 mb-10">
            <span>Not a CRM</span>
            <span className="text-white/15">·</span>
            <span>Not a CPaaS</span>
            <span className="text-white/15">·</span>
            <span>Not a rule engine</span>
          </div>

          <div className="flex justify-center gap-3 mb-14 flex-wrap">
            {[
              { label:"Collections", to:"/collections", cls:"border-amber-400/25 text-amber-300/80 bg-amber-500/[0.08] hover:border-amber-400/50 hover:text-amber-200 hover:bg-amber-500/[0.14]" },
              { label:"Lending",     to:"/lending",     cls:"border-indigo-400/25 text-indigo-300/80 bg-indigo-500/[0.08] hover:border-indigo-400/50 hover:text-indigo-200 hover:bg-indigo-500/[0.14]" },
              { label:"Servicing",   to:"/servicing",   cls:"border-emerald-400/25 text-emerald-300/80 bg-emerald-500/[0.08] hover:border-emerald-400/50 hover:text-emerald-200 hover:bg-emerald-500/[0.14]" },
            ].map((t) => (
              <Link key={t.label} to={t.to}
                className={`px-4 py-1.5 rounded-full text-xs border transition-all duration-200 ${t.cls}`}>
                {t.label}
              </Link>
            ))}
          </div>
        </Motion>

        <Motion delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-3xl" />
            <div className="absolute inset-x-8 -bottom-4 h-16 bg-blue-500/15 blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(96,165,250,0.18)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 24px 80px rgba(59,130,246,0.22), 0 4px 20px rgba(0,0,0,0.6)",
                background: "rgba(0,0,0,0.4)",
              }}>
              <img src={dashboard} className="w-full opacity-95" loading="lazy" decoding="async" />
            </div>
          </div>
        </Motion>
      </section>

      {/* ── THE GAP ── */}
      <div className="bg-white/[0.05] border-y border-white/[0.09]">
      <Motion>
      <section className="px-8 py-24 max-w-6xl mx-auto">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">THE PROBLEM</span>
            <div className="h-px w-6 bg-white/20" />
          </div>
          <h2 className="text-[42px] font-semibold leading-tight">
            Banks have every system.<br />
            <span className="text-white/62">Except the one that sits between them.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PROBLEMS.map((c, i) => (
            <div key={i} className={`p-7 rounded-xl border transition-all duration-300 cursor-default ${c.card}`}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: c.dot }} />
                <span className="text-[10px] font-mono" style={{ color: c.num }}>{c.n}</span>
              </div>
              <div className="text-white/82 text-[15px] font-medium leading-snug mb-3">{c.head}</div>
              <div className="text-white/62 text-sm leading-relaxed">{c.body}</div>
            </div>
          ))}
        </div>

      </section>
      </Motion>
      </div>{/* ── close THE GAP band ── */}

      {/* ── WHAT SHIELDX IS ── */}
      <Motion>
      <section className="px-8 py-24 max-w-6xl mx-auto">

        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">HOW IT WORKS</span>
            <div className="h-px w-6 bg-white/20" />
          </div>
          <h2 className="text-[40px] font-semibold mb-4">
            Five stages. One auditable pipeline.
          </h2>
          <p className="text-white/65 text-[16px] mb-5 max-w-lg mx-auto leading-relaxed">
            Every customer decision passes through all five stages — none skippable,
            none silent, every one logged.
          </p>
        </div>

        <ArchitectureStack />

      </section>
      </Motion>

      {/* ── LIVE DEMO ── */}
      <div className="bg-white/[0.05] border-y border-white/[0.09]">
      <Motion>
      <section className="px-8 py-24 max-w-4xl mx-auto text-center">

        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-white/20" />
          <span className="text-[11px] text-white/55 tracking-[0.22em]">LIVE</span>
          <div className="h-px w-6 bg-white/20" />
        </div>
        <h2 className="text-[36px] font-semibold mb-3">
          Watch a live decision run.
        </h2>
        <p className="text-white/62 mb-10">
          TRAI window. RBI FPC. DPDP consent. Every check enforced in sequence — before the channel fires.
        </p>

        <GovernedDecisionView />

      </section>
      </Motion>
      </div>{/* ── close LIVE DEMO band ── */}

      {/* ── CTA ── */}
      <Motion>
      <section className="px-8 pt-24 pb-32 text-center max-w-2xl mx-auto">

        <h2 className="text-[40px] font-semibold mb-4">
          Ready to see it for yourself?
        </h2>
        <p className="text-white/62 mb-8">
          20 minutes. Your use case. Collections, Lending, or Servicing.
        </p>

        <Link to="/demo"
          className="inline-block bg-white text-black px-10 py-3.5 rounded-lg text-sm font-semibold
            hover:opacity-90 hover:scale-[1.02] transition-all duration-200
            shadow-[0_0_30px_rgba(255,255,255,0.12)]">
          Request a walkthrough
        </Link>

        <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-white/22">
          <span>No commitment</span>
          <span className="text-white/12">·</span>
          <span>India-deployed</span>
          <span className="text-white/12">·</span>
          <span>DPDPA 2025 rules-ready</span>
        </div>

      </section>
      </Motion>

      <Footer />

    </div>
  );
}