import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";

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

/* ─── HERO RIGHT: LIVE DECISION TRACE ────────────────── */
function LiveDecisionTrace() {
  const stages = [
    { ms:"0ms",  label:"Signal received",     sub:"event ingested · payload normalised",         highlight:false },
    { ms:"4ms",  label:"Decision computed",   sub:"risk tier assigned · eligibility evaluated",   highlight:false },
    { ms:"11ms", label:"Compliance validated", sub:"all regulatory checks passed",                highlight:true  },
    { ms:"18ms", label:"Orchestrated",        sub:"channel and time window confirmed",            highlight:false },
    { ms:"24ms", label:"Handed off",          sub:"dispatched via adapter · outcome captured",    highlight:false },
    { ms:"24ms", label:"Audit written",       sub:"immutable log created · AUD-20260614-48321",   highlight:false },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setActive(a => (a + 1) % stages.length), 1300);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="border border-white/15 rounded-xl bg-black/65 overflow-hidden">
      <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="flex-1 text-center text-white/40 text-[10px] tracking-[0.15em]">ShieldX — Decision Runtime</span>
        <span className="text-[9px] text-white/22 tracking-widest">Illustrative</span>
      </div>

      <div className="p-4 font-mono space-y-0.5">
        {stages.map((s, i) => (
          <div key={i}
            className="flex items-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-400"
            style={{
              background: i === active
                ? (s.highlight ? "rgba(74,222,128,0.07)" : "rgba(96,165,250,0.05)")
                : "transparent",
            }}
          >
            <span className="text-[10px] w-9 shrink-0 tabular-nums mt-0.5 transition-colors duration-300"
              style={{ color: i === active ? (s.highlight ? "rgba(74,222,128,0.65)" : "rgba(96,165,250,0.6)") : "rgba(255,255,255,0.16)" }}>
              {s.ms}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] leading-tight transition-colors duration-300" style={{
                color: i === active
                  ? (s.highlight ? "#4ade80" : "#93c5fd")
                  : i < active ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.20)",
              }}>
                {s.label}
                {i === active && <span className="ml-1.5 animate-pulse" style={{ color: s.highlight ? "rgba(74,222,128,0.7)" : "rgba(96,165,250,0.7)" }}>▮</span>}
              </div>
              <div className="text-[9px] mt-0.5 leading-snug transition-colors duration-300" style={{
                color: i === active
                  ? (s.highlight ? "rgba(74,222,128,0.42)" : "rgba(96,165,250,0.38)")
                  : "rgba(255,255,255,0.10)",
              }}>
                {s.sub}
              </div>
            </div>
            {i < active && (
              <span className="text-[10px] shrink-0 mt-0.5" style={{ color: "rgba(74,222,128,0.45)" }}>✓</span>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.08] px-4 py-2 flex justify-between text-[9px] text-white/20">
        <span>One path · Every decision governed</span>
        <span style={{ color: "rgba(74,222,128,0.50)" }}>Compliant ✓</span>
      </div>
    </div>
  );
}

/* ─── DECISION DEBUGGER ──────────────────────────────── */
function DecisionDebugger() {
  const steps = [
    { ms:"0ms",  label:"Signal received",      detail:"CBS triggers payment_missed event — payload normalised" },
    { ms:"7ms",  label:"Decision computed",    detail:"Customer scored, channel eligibility evaluated" },
    { ms:"14ms", label:"Compliance validated", detail:"Regulatory check passed — execution permitted", highlight:true },
    { ms:"21ms", label:"Orchestrated",         detail:"Channel selected, time window confirmed" },
    { ms:"28ms", label:"Handed off",           detail:"Dispatched via adapter — response captured" },
    { ms:"28ms", label:"Audit recorded",       detail:"Immutable log written — AUD-20260614-48321" },
  ];
  const [active, setActive] = useState(2);
  useEffect(() => {
    const i = setInterval(() => setActive(p => (p+1) % steps.length), 1900);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        {steps.map((s,i) => (
          <div key={i}
            onClick={() => setActive(i)}
            className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-200"
            style={{ background: i===active ? "rgba(255,255,255,0.03)" : "transparent" }}
          >
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300 ${i===active ? "animate-pulse" : ""}`} style={{
              background: i===active ? (s.highlight ? "#4ade80" : "#60a5fa") : "rgba(255,255,255,0.14)",
              boxShadow: i===active ? `0 0 10px ${s.highlight ? "rgba(74,222,128,.8)" : "rgba(96,165,250,.8)"}` : "none",
            }} />
            <div>
              <div className="text-sm font-mono transition-colors duration-200" style={{
                color: i===active ? (s.highlight ? "#4ade80" : "#93c5fd")
                  : i<active ? "rgba(255,255,255,.55)" : "rgba(255,255,255,.45)",
              }}>
                [{s.ms}] {s.label}
              </div>
              {i===active && (
                <motion.div initial={{opacity:0,y:3}} animate={{opacity:1,y:0}}
                  className="text-xs text-white/35 mt-0.5">{s.detail}</motion.div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border border-white/15 rounded-xl p-5 bg-black/50 font-mono text-xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/65 text-xs font-sans font-medium not-italic">
            Live decision state<span className="inline-block ml-1 animate-pulse" style={{color:"#4ade80"}}>▮</span>
          </span>
          <span className="text-[9px] tracking-widest text-white/22">ILLUSTRATIVE</span>
        </div>
        <div className="space-y-[5px] text-white/45">
          <div>customer_id: <span className="text-white/80">48321</span></div>
          <div>dpd_bucket: <span className="text-white/80">30–60</span></div>
          <div>risk_tier: <span className="text-white/80">HIGH</span></div>
          <div>compliance: <span style={{color:"#4ade80"}}>PASS</span></div>
          <div>channel_selected: <span style={{color:"#93c5fd"}}>agent_call · assist_context</span></div>
          <div className="pt-2 mt-1 border-t border-white/15">
            <div style={{color:"#93c5fd"}}>[{steps[active].ms}] {steps[active].label}</div>
            <div>decision_id: <span className="text-white/45">DEC-48321</span></div>
            <div>audit_id: <span className="text-white/45">AUD-20260614-48321</span></div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-white/15 text-white/22 text-[10px]">
          Every field logged immutably · Exportable for regulatory audit on demand
        </div>
      </div>
    </div>
  );
}

/* ─── ENGINE ARCHITECTURE — regrouped under product names ───── */
function EngineArchitecture() {
  const [active, setActive] = useState(4);
  const [paused, setPaused] = useState(false);
  const stages = [
    { num:"01", name:"Signal Ingestion",  group:"DECISION", color:"blue", desc:"Receives structured event triggers from CBS, LOS, CRM, and campaign systems via REST API and webhooks. Validates schema and deduplicates before passing downstream." },
    { num:"02", name:"Normalisation",     group:"DECISION", color:"blue", desc:"Parses raw payloads into a canonical decision context object — customer ID, product type, event classification, timestamps, and metadata unified into a single structure." },
    { num:"03", name:"Scoring",           group:"DECISION", color:"blue", desc:"Configurable model weights and rule sets evaluate customer risk tier, cohort, and channel eligibility. Champion/challenger by design — every strategy change is measured against the incumbent before promotion." },
    { num:"04", name:"Rule Evaluation",   group:"DECISION", color:"blue", desc:"Applies institution-specific business rules — DPD buckets, product policies, cohort overrides, frequency caps — layered on top of the base scoring output." },
    { num:"05", name:"Compliance Gate",   group:"GOVERN",   color:"green", desc:"Hard regulatory checks run here: TRAI calling window (8AM–7PM IST), TRAI DND scrub, DPDP Act consent validation, RBI Fair Practices Code, and frequency limits. Nothing executes unless all checks pass.", highlight:true },
    { num:"06", name:"Orchestrate",       group:"DECISION", color:"blue", desc:"An internal module of Decision — sequences the governed decision into timed, constrained instructions: retry logic, channel fallback, contact-window compliance, agency capacity allocation." },
    { num:"07", name:"Execution Adapters", group:"EXECUTE", color:"amber", desc:"Pluggable and neutral. The bank's own CPaaS under the bank's handles and templates, the bank's dialer, agency work-lists (SFTP/API), Engage, or Diya voice — every adapter speaks the same treatment-in / outcome-out contract.", link:"/deploy" },
    { num:"08", name:"System of Record",  group:"RECORD",   color:"violet", desc:"Writes an immutable record per interaction: decision payload, compliance check results, routing outcome, execution status, and full reason codes. Exportable on demand." },
    { num:"09", name:"Intelligence",      group:"SENSE",    color:"emerald", desc:"Post-call analysis of recorded calls — batch, not in-call — extracting objections, hardship, and promise language as decision features that flow into the next decision on that account." },
  ];
  const COLOR_HEX = { blue:"96,165,250", green:"74,222,128", amber:"251,191,36", violet:"167,139,250", emerald:"52,211,153" };

  useEffect(() => {
    if (paused) return;
    const i = setInterval(() => setActive(p => (p+1) % stages.length), 3500);
    return () => clearInterval(i);
  }, [paused]);

  const s = stages[active];
  const rgb = COLOR_HEX[s.color];

  return (
    <div>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-white/20" />
          <span className="text-[11px] text-white/55 tracking-[0.22em]">ENGINE INTERNALS</span>
          <div className="h-px w-6 bg-white/20" />
        </div>
        <h2 className="text-[24px] md:text-[36px] font-semibold mb-4">Nine stages.<br />One closed loop.</h2>
        <p className="text-white/68 max-w-lg mx-auto leading-relaxed">
          Every interaction traverses the same path — from raw signal to compliant execution to the next decision.
          No stage is skipped. Every stage is logged.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-8 items-start">
        {/* stage list */}
        <div className="grid grid-cols-3 gap-1.5">
          {stages.map((l,i) => (
            <div key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="flex flex-col gap-1 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200"
              style={{
                background: i===active ? `rgba(${COLOR_HEX[l.color]},.06)` : "rgba(255,255,255,.015)",
                border: i===active ? `1px solid rgba(${COLOR_HEX[l.color]},.25)` : "1px solid rgba(255,255,255,.05)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono w-5 flex-shrink-0 transition-colors duration-200"
                  style={{color: i===active ? `rgba(${COLOR_HEX[l.color]},.7)` : "rgba(255,255,255,.2)"}}>
                  {l.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium leading-tight transition-colors duration-200 truncate" style={{
                    color: i===active ? `rgb(${COLOR_HEX[l.color]})` : "rgba(255,255,255,.45)",
                  }}>{l.name}</div>
                </div>
              </div>
              <span className="text-[8px] tracking-widest pl-7" style={{color: i===active ? `rgba(${COLOR_HEX[l.color]},.55)` : "rgba(255,255,255,.15)"}}>{l.group}</span>
            </div>
          ))}
        </div>

        {/* detail card */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}}
            transition={{duration:.22}}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="rounded-xl p-6 border"
            style={{
              borderColor: `rgba(${rgb},.25)`,
              background:  `rgba(${rgb},.04)`,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono" style={{color: `rgba(${rgb},.5)`}}>
                Stage {s.num}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded border" style={{
                color: `rgb(${rgb})`,
                borderColor: `rgba(${rgb},.3)`,
                background: `rgba(${rgb},.08)`,
              }}>{s.group}</span>
            </div>
            <div className="text-base font-semibold mb-3" style={{color: s.highlight ? "#4ade80" : "white"}}>
              {s.name}
            </div>
            <div className="text-sm text-white/52 leading-relaxed">{s.desc}</div>
            {s.highlight && (
              <div className="mt-4 pt-4 border-t border-white/[0.12] text-[11px] text-emerald-400/60 flex items-center gap-1.5">
                <span style={{color:"#4ade80"}}>✓</span>
                Hard gate — execution blocked if any check fails
              </div>
            )}
            {s.link && (
              <div className="mt-4 pt-4 border-t border-white/[0.12]">
                <Link to={s.link} className="text-[11px] text-amber-300/70 hover:text-amber-300 transition-colors">
                  See how adapters work across deployment patterns →
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── COMPLIANCE ─────────────────────────────────────── */
function ComplianceSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hPill,  setHPill]  = useState(null);

  const checks = [
    { label:"TRAI Window",          detail:"No outreach before 8 AM or after 7 PM IST. Enforced at execution level — no override permitted.",                        reg:"TRAI"     },
    { label:"TRAI DND",            detail:"Real-time scrub against TRAI's Do Not Disturb registry before every contact attempt.",                                   reg:"TRAI"     },
    { label:"DPDP Consent",        detail:"Per-channel consent validated before any interaction triggers. Scope, purpose, and expiry enforced.",                     reg:"DPDP"     },
    { label:"RBI Fair Practices",  detail:"Recovery conduct governed per RBI circular on Fair Practices Code for Lenders — no coercive or unreasonable contact.",   reg:"RBI"      },
    { label:"Frequency Cap",       detail:"Daily and weekly outreach limits per customer enforced automatically — per applicable RBI and TRAI guidelines.",          reg:"RBI·TRAI" },
  ];

  const pills = ["RBI Fair Practices Code","TRAI Guidelines","DPDP Act, 2023","Debt Recovery Frameworks","RBI Draft MRM Guidance"];

  useEffect(() => {
    if (paused) return;
    const i = setInterval(() => setActive(a => (a + 1) % checks.length), 2800);
    return () => clearInterval(i);
  }, [paused]);

  return (
    <div>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-white/20" />
          <span className="text-[11px] text-white/55 tracking-[0.22em]">COMPLIANCE ENFORCEMENT</span>
          <div className="h-px w-6 bg-white/20" />
        </div>
        <h2 className="text-[24px] md:text-[36px] font-semibold mb-4">Compliance is not a layer.<br />It is the gatekeeper.</h2>
        <p className="text-[17px] md:text-[20px] font-medium text-white/90 max-w-xl mx-auto mb-3 leading-snug">
          Every decision is blocked unless compliant.
        </p>
        <p className="text-white/55 max-w-lg mx-auto leading-relaxed text-sm">
          Every regulatory check runs at infrastructure level, in real time,
          before anything reaches the customer.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-10">
        {/* Flow header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="px-4 py-2 rounded-lg border border-blue-400/25 bg-blue-500/[0.06] shrink-0">
            <div className="text-[9px] text-blue-300/50 tracking-widest mb-0.5">DECISION</div>
            <div className="text-[11px] text-blue-300/65 font-mono">SIGNAL ›</div>
          </div>
          <div className="flex-1 border-t border-dashed border-white/[0.09]" />
          <div className="text-[9px] text-white/32 tracking-[0.2em] shrink-0 font-medium">COMPLIANCE GATE</div>
          <div className="flex-1 border-t border-dashed border-white/[0.09]" />
          <div className="px-4 py-2 rounded-lg border border-emerald-400/25 bg-emerald-500/[0.06] shrink-0">
            <div className="text-[9px] text-emerald-300/50 tracking-widest mb-0.5">GOVERNED</div>
            <div className="text-[11px] text-emerald-300/65 font-mono">EXECUTE ✓</div>
          </div>
        </div>

        {/* Five gate cards */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {checks.map((c, i) => (
            <div key={i}
              className="rounded-xl p-3 border text-center cursor-pointer transition-all duration-300"
              style={{
                borderColor: i === active ? "rgba(74,222,128,0.42)" : i < active ? "rgba(74,222,128,0.18)" : "rgba(255,255,255,0.06)",
                background:  i === active ? "rgba(74,222,128,0.07)" : i < active ? "rgba(74,222,128,0.03)" : "rgba(255,255,255,0.015)",
                transform:   i === active ? "translateY(-4px)" : "none",
                boxShadow:   i === active ? "0 8px 20px rgba(74,222,128,0.08)" : "none",
              }}
              onClick={() => { setActive(i); setPaused(true); }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="text-sm mb-1.5 transition-all duration-300"
                style={{color: i <= active ? "#4ade80" : "rgba(255,255,255,0.15)"}}>
                {i < active ? "✓" : i === active ? "●" : "○"}
              </div>
              <div className="text-[10px] font-medium leading-snug mb-1 transition-colors duration-300"
                style={{color: i <= active ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.30)"}}>
                {c.label}
              </div>
              <div className="text-[9px] tracking-wider transition-colors duration-300"
                style={{color: i <= active ? "rgba(74,222,128,0.60)" : "rgba(255,255,255,0.15)"}}>
                {c.reg}
              </div>
            </div>
          ))}
        </div>

        {/* Active detail */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}}
            transition={{duration:.2}}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="border rounded-xl px-6 py-4 flex items-center gap-5"
            style={{borderColor:"rgba(74,222,128,0.22)",background:"rgba(74,222,128,0.03)"}}
          >
            <div className="w-9 h-9 rounded-xl border border-emerald-400/30 bg-emerald-500/[0.08] flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-400 text-sm">✓</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white mb-1">{checks[active].label}</div>
              <div className="text-sm text-white/66 leading-relaxed">{checks[active].detail}</div>
            </div>
            <div className="text-[10px] text-emerald-400/60 tracking-widest shrink-0 font-medium">PASS</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Proof line */}
      <p className="text-center text-sm text-white/38 mb-8 mt-2">
        Every blocked action is logged with a reason code — exportable for regulatory review on demand.
        <br className="hidden md:block" />
        <Link to="/governance" className="text-emerald-400/60 hover:text-emerald-400 transition-colors">
          Full conduct compliance and model governance detail →
        </Link>
      </p>

      {/* Regulation pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {pills.map((p,i) => (
          <motion.span key={i}
            className="text-xs px-4 py-1.5 rounded-full border cursor-default"
            style={{
              borderColor: hPill===i ? "rgba(74,222,128,.40)" : "rgba(255,255,255,.10)",
              color:       hPill===i ? "#4ade80" : "rgba(255,255,255,.42)",
              background:  hPill===i ? "rgba(74,222,128,.06)" : "transparent",
            }}
            onMouseEnter={() => setHPill(i)}
            onMouseLeave={() => setHPill(null)}
            animate={{ y: hPill===i ? -2 : 0 }}
            transition={{ duration:.14 }}
          >{p}</motion.span>
        ))}
      </div>
    </div>
  );
}

/* ─── BEFORE / AFTER ─────────────────────────────────── */
function BeforeAfter() {
  const [hovered, setHovered] = useState(null);
  const pairs = [
    { without:"Independent vendor triggers",               with_:"Single decision engine" },
    { without:"No compliance check before execution",      with_:"Compliance verified before every action" },
    { without:"Channel conflict — same customer hit twice", with_:"Unified orchestration — one decision, one channel" },
    { without:"No audit trail",                            with_:"Immutable audit on every interaction" },
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-white/20" />
          <span className="text-[11px] text-white/55 tracking-[0.22em]">THE SHIFT</span>
          <div className="h-px w-6 bg-white/20" />
        </div>
        <h2 className="text-[24px] md:text-[36px] font-semibold mb-4">
          <span className="text-white/32">Ungoverned decisions have a cost.</span><br />
          <span style={{textShadow:"0 0 32px rgba(52,211,153,0.55)"}}>ShieldX eliminates it.</span>
        </h2>
        <p className="text-white/66 max-w-md mx-auto leading-relaxed text-sm">
          The same signals. The same channels. Completely different outcomes — when a decision layer sits between them.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-[1fr_52px_1fr]">

        {/* Left — UNGOVERNED */}
        <div className="rounded-2xl border p-6 transition-all duration-400 cursor-default"
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
          style={{
            borderColor: hovered==="left" ? "rgba(239,68,68,0.40)" : "rgba(239,68,68,0.22)",
            background:  hovered==="left" ? "rgba(239,68,68,0.07)"  : "rgba(239,68,68,0.035)",
            boxShadow:   hovered==="left" ? "0 0 80px rgba(239,68,68,0.28)" : "0 0 60px rgba(239,68,68,0.11)",
          }}>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-6 h-6 rounded-full bg-red-500/15 border border-red-400/25 flex items-center justify-center flex-shrink-0">
              <span className="text-red-400 text-[10px] leading-none">✕</span>
            </div>
            <span className="text-[10px] text-red-400/65 tracking-[0.2em] font-medium">WITHOUT SHIELDX</span>
          </div>
          <div className="space-y-0.5">
            {pairs.map((p, i) => (
              <div key={i} className="flex items-start gap-3 py-3.5 border-b border-white/[0.04] last:border-0">
                <span className="text-red-400/45 text-[11px] flex-shrink-0 mt-0.5">✕</span>
                <span className="text-white/52 text-sm leading-relaxed">{p.without}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/[0.08] border border-red-400/20">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
            <span className="text-[10px] text-red-400/65 tracking-widest">EXPOSURE: HIGH</span>
          </div>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center justify-center gap-3 px-2">
          <div className="w-px flex-1" style={{background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.12),transparent)"}} />
          <div className="w-9 h-9 rounded-full border border-white/25 bg-white/[0.06] flex items-center justify-center flex-shrink-0">
            <span className="text-white/55 text-base leading-none">→</span>
          </div>
          <div className="w-px flex-1" style={{background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.12),transparent)"}} />
        </div>

        {/* Right — WITH SHIELDX */}
        <div className="rounded-2xl border p-6 transition-all duration-400 cursor-default"
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
          style={{
            borderColor: hovered==="right" ? "rgba(52,211,153,0.50)"  : "rgba(52,211,153,0.30)",
            background:  hovered==="right" ? "rgba(52,211,153,0.09)"  : "rgba(52,211,153,0.05)",
            boxShadow:   hovered==="right" ? "0 0 90px rgba(52,211,153,0.35)" : "0 0 70px rgba(52,211,153,0.18)",
          }}>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/35 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-400 text-[10px] leading-none">✓</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 tracking-[0.2em] font-medium">WITH SHIELDX</span>
          </div>
          <div className="space-y-0.5">
            {pairs.map((p, i) => (
              <div key={i} className="flex items-start gap-3 py-3.5 border-b border-white/[0.06] last:border-0">
                <span className="text-emerald-400/70 text-[11px] flex-shrink-0 mt-0.5">✓</span>
                <span className="text-white/82 text-sm leading-relaxed">{p.with_}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/[0.12] border border-emerald-400/30">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            <span className="text-[10px] text-emerald-400/80 tracking-widest">GOVERNED: 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── INTEGRATION ────────────────────────────────────── */
function IntegrationSection() {
  return (
    <div>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-white/20" />
          <span className="text-[11px] text-white/55 tracking-[0.22em]">HOW IT CONNECTS</span>
          <div className="h-px w-6 bg-white/20" />
        </div>
        <h2 className="text-[24px] md:text-[36px] font-semibold mb-4">Plug in.<br />Don't rip out.</h2>
        <p className="text-white/68 max-w-lg mx-auto leading-relaxed">
          No middleware rip-out. No core system changes. ShieldX connects via
          standard APIs — and sits between what you have and every channel you use.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            n:"01", label:"INTEGRATION",
            title:"API-first, event-driven",
            detail:"REST endpoints and webhooks. Event-driven and pull-based both supported. Zero changes to your core systems.",
            proof:"No CBS / LOS code changes required",
          },
          {
            n:"02", label:"DEPLOYMENT",
            title:"On-prem, cloud, or hybrid",
            detail:"Adapts to your infrastructure policy — including air-gapped Tier-1 and DPDP data residency requirements.",
            proof:"Existing infrastructure preserved",
          },
          {
            n:"03", label:"TIME TO VALUE",
            title:"3–6 weeks to first decision",
            detail:"From agreement to your first governed, compliant, auditable decision. Phased rollout available.",
            proof:"Live on one portfolio first — expand from there",
          },
        ].map((col, i) => (
          <div key={i} className="border border-white/[0.12] rounded-xl px-6 py-5 bg-white/[0.04]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-mono text-white/22">{col.n}</span>
              <span className="text-[9px] text-white/35 tracking-widest">{col.label}</span>
            </div>
            <div className="text-sm font-semibold text-white mb-2">{col.title}</div>
            <div className="text-xs text-white/42 leading-relaxed mb-4">{col.detail}</div>
            <div className="flex items-center gap-1.5 pt-3 border-t border-white/[0.06]">
              <span className="text-[11px]" style={{color:"rgba(74,222,128,0.70)"}}>✓</span>
              <span className="text-[11px] text-white/40">{col.proof}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── OBSERVABILITY (no fabricated volumes/latency; illustrative) ── */
function ObservabilitySection() {
  const [tick,    setTick]    = useState(0);
  const [hovered, setHovered] = useState(null);

  const feed = [
    { id:"DEC-48331", uc:"COLLECTIONS", result:"AGENT CALL · TRAI PASS",         ok:true,  color:"#f59e0b" },
    { id:"DEC-48330", uc:"COLLECTIONS", result:"SMS BLOCKED · DND MATCH",       ok:false, color:"#f59e0b" },
    { id:"DEC-48329", uc:"COLLECTIONS", result:"WHATSAPP SENT · DPDP PASS",     ok:true,  color:"#818cf8" },
    { id:"DEC-48328", uc:"COLLECTIONS", result:"CALL ANALYSED · HARDSHIP FLAGGED", ok:true, color:"#34d399" },
    { id:"DEC-48327", uc:"COLLECTIONS", result:"AGENT CALL BLOCKED · OUT OF WINDOW", ok:false, color:"#f59e0b" },
    { id:"DEC-48326", uc:"COLLECTIONS", result:"SETTLEMENT OFFER · RBI FPC OK",  ok:true,  color:"#818cf8" },
  ];

  useEffect(() => {
    const i = setInterval(() => setTick(t => t + 1), 1600);
    return () => clearInterval(i);
  }, []);

  return (
    <div>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-white/20" />
          <span className="text-[11px] text-white/55 tracking-[0.22em]">OBSERVABILITY</span>
          <div className="h-px w-6 bg-white/20" />
        </div>
        <h2 className="text-[24px] md:text-[36px] font-semibold mb-4">Every decision visible.<br />Every action explainable.</h2>
        <p className="text-white/68 max-w-lg mx-auto leading-relaxed">
          Not campaign metrics — full decision traceability. Every interaction logged at the decision
          level, not the channel level. Compliance health, audit trails, and exceptions in one place —
          regulator-ready on demand.
        </p>
      </div>

      {/* Live dashboard mockup */}
      <div className="border border-white/15 rounded-2xl overflow-hidden bg-black/40 mb-8 max-w-5xl mx-auto">
        <div className="border-b border-white/[0.12] px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="flex-1 text-center text-white/28 text-[10px] tracking-[0.15em]">ShieldX — Observability Console</span>
          <span className="text-[9px] text-white/22 tracking-widest">Illustrative</span>
        </div>

        <div className="p-5 grid md:grid-cols-[1fr_1fr_220px] gap-4">
          {/* Capability tiles — no fabricated production numbers */}
          <div className="grid grid-cols-2 gap-2 content-start">
            {[
              { label:"Compliance",      val:"Tracked",  sub:"Per campaign, per channel",  color:"#4ade80" },
              { label:"Decision latency",val:"Real-time",sub:"Signal to decision",          color:"#60a5fa" },
              { label:"Audit coverage",  val:"100%",     sub:"Every interaction logged, by design", color:"#4ade80" },
              { label:"Traceability",    val:"Decision-level", sub:"Not just channel-level", color:"#a78bfa" },
            ].map((k, i) => (
              <div key={i} className="border border-white/[0.12] rounded-xl p-3 bg-white/[0.04]">
                <div className="text-[16px] font-semibold mb-0.5 leading-none" style={{color:k.color}}>{k.val}</div>
                <div className="text-[10px] text-white/58 leading-tight mt-1">{k.label}</div>
                <div className="text-[9px] text-white/25 mt-0.5">{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Channel compliance */}
          <div className="border border-white/[0.12] rounded-xl p-4 bg-white/[0.04]">
            <div className="text-[10px] text-white/38 tracking-widest mb-3">CHANNEL COMPLIANCE</div>
            <div className="divide-y divide-white/[0.05]">
              {[
                { name:"Agent Call", ok:true },
                { name:"SMS",        ok:true },
                { name:"WhatsApp",   ok:true },
                { name:"Email",      ok:true },
                { name:"Diya (voice)", ok:true },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{background: "rgba(74,222,128,0.7)"}} />
                    <span className="text-[11px] text-white/52">{c.name}</span>
                  </div>
                  <span className="text-[8px] px-1.5 py-0.5 rounded font-medium tracking-wide"
                    style={{
                      background: "rgba(74,222,128,0.08)",
                      border:     "1px solid rgba(74,222,128,0.15)",
                      color:      "rgba(74,222,128,0.65)",
                    }}>
                    MONITORED
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-[9px] text-white/25 tracking-widest">SAME SCORECARD</span>
              <span className="text-[10px] text-white/40">Ours and theirs, alike</span>
            </div>
          </div>

          {/* Live decision feed */}
          <div className="border border-white/[0.12] rounded-xl p-4 bg-white/[0.04] font-mono text-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-white/38 tracking-widest not-italic font-sans">LIVE FEED</span>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <div className="space-y-2">
              {[0,1,2,3].map(offset => {
                const d = feed[(tick + offset) % feed.length];
                return (
                  <motion.div key={`${tick}-${offset}`}
                    initial={offset===0 ? {opacity:0,x:-5} : {opacity: 1 - offset * 0.18}}
                    animate={{opacity: 1 - offset * 0.2, x:0}}
                    transition={{duration:0.3}}
                    className="border rounded-lg px-2.5 py-2 transition-all duration-300"
                    style={{
                      borderColor: offset===0 ? `${d.color}28` : "rgba(255,255,255,0.04)",
                      background:  offset===0 ? `${d.color}08` : "transparent",
                    }}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{background: d.color, opacity: offset===0 ? 0.7 : 0.3}} />
                      <span className="text-[8px] tracking-widest" style={{color: `${d.color}${offset===0 ? "99" : "55"}`}}>{d.uc}</span>
                      <span className="text-[8px] text-white/18 ml-auto">{d.id}</span>
                    </div>
                    <div className="text-[9px] pl-2.5" style={{color: d.ok ? "rgba(74,222,128,0.72)" : "rgba(248,113,113,0.65)"}}>
                      {d.result}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Persona tiles */}
      <div className="mt-4 mb-8 text-center max-w-5xl mx-auto">
        <p className="text-[11px] text-white/38 tracking-[0.22em]">WHO USES THIS</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {[
          {
            role: "COMPLIANCE OFFICER",
            action: "Regulatory review — on demand.",
            desc: "Every blocked decision logged with a reason code. Exception reports formatted for RBI and TRAI review — ready when the regulator asks, not scrambled after the fact.",
            accent: "#4ade80",
            accentDim: "rgba(74,222,128,0.55)",
            border: "rgba(74,222,128,0.18)",
            borderHover: "rgba(74,222,128,0.38)",
            bg: "rgba(74,222,128,0.03)",
            bgHover: "rgba(74,222,128,0.06)",
            glow: "rgba(74,222,128,0.10)",
          },
          {
            role: "OPERATIONS HEAD",
            action: "Portfolio performance — in real time.",
            desc: "Channel-level compliance score, contact rate, and exception count per portfolio. Spot what's drifting before it becomes a violation.",
            accent: "#93c5fd",
            accentDim: "rgba(96,165,250,0.55)",
            border: "rgba(96,165,250,0.18)",
            borderHover: "rgba(96,165,250,0.38)",
            bg: "rgba(96,165,250,0.03)",
            bgHover: "rgba(96,165,250,0.06)",
            glow: "rgba(96,165,250,0.10)",
          },
          {
            role: "CEO / BOARD",
            action: "Governance health — one view.",
            desc: "Platform-wide compliance posture, SLA adherence, and decision volume. The single view that tells leadership whether the decision layer is working.",
            accent: "#c4b5fd",
            accentDim: "rgba(167,139,250,0.55)",
            border: "rgba(167,139,250,0.18)",
            borderHover: "rgba(167,139,250,0.38)",
            bg: "rgba(167,139,250,0.03)",
            bgHover: "rgba(167,139,250,0.06)",
            glow: "rgba(167,139,250,0.10)",
          },
        ].map((p, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="rounded-2xl p-7 border cursor-default transition-all duration-300"
            style={{
              borderColor: hovered===i ? p.borderHover : p.border,
              background:  hovered===i ? p.bgHover : p.bg,
              boxShadow:   hovered===i ? `0 0 40px ${p.glow}` : "none",
            }}
          >
            <div className="text-[10px] tracking-[0.22em] mb-4 font-medium" style={{color:p.accentDim}}>{p.role}</div>
            <div className="text-[17px] font-semibold mb-3 leading-snug" style={{color:p.accent}}>{p.action}</div>
            <div className="text-sm text-white/65 leading-relaxed">{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── FOUR PRODUCTS — DEEP DIVE ──────────────────────── */
const PRODUCT_DEEP = [
  {
    id: "decision",
    name: "Decision",
    tag: "THE BRAIN",
    color: "#60a5fa",
    line: "Mandatory in every deployment.",
    body: "Scores, rules, cohort strategy, and champion/challenger. Decision computes what should happen to every account — who, when, which channel, with what treatment — and never ships a policy change without measuring it against the incumbent first.",
  },
  {
    id: "engage",
    name: "Engage",
    tag: "REFERENCE EXECUTION CHANNEL",
    color: "#fbbf24",
    line: "For institutions without pipes of their own.",
    body: "Have a CPaaS, dialer, and templates already? Keep them — ShieldX routes through your stack. Engage exists for institutions that need execution built in. Tier-one banks may never use it; NBFCs, ARCs, and agencies get brain and hands together.",
  },
  {
    id: "assist",
    name: "Assist",
    tag: "THE HUMAN CHANNEL'S ADAPTER",
    color: "#4ade80",
    line: "Two tiers, one graceful fallback.",
    body: "Assist Context is how a governed decision reaches a human — a pre-call briefing built from the treatment instruction. Assist Live extends decisioning into the conversation itself, in real time. If audio fails, Assist degrades to Context — never to blank.",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    tag: "THE SENSORY SYSTEM",
    color: "#a78bfa",
    line: "Post-call, not in-call.",
    body: "Batch analysis of recorded calls — compliance conduct flags, agent scorecards, and decision features (objection type, hardship, promise strength) that flow back into the next decision. Also the governance face: registry, drift, and evidence for RBI's draft MRM framework.",
  },
];

function ProductDeepDive() {
  return (
    <div className="space-y-6">
      {PRODUCT_DEEP.map((p, i) => (
        <Motion key={p.id} delay={i * 0.06}>
          <div id={p.id} className="scroll-mt-28 rounded-2xl border p-8 md:p-10"
            style={{ borderColor: `${p.color}30`, background: `${p.color}08` }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] tracking-[0.2em] font-medium" style={{ color: p.color }}>{p.tag}</span>
            </div>
            <h3 className="text-[26px] font-semibold mb-2" style={{ color: p.color }}>{p.name}</h3>
            <div className="text-white/70 text-sm mb-4">{p.line}</div>
            <p className="text-white/60 leading-relaxed max-w-2xl">{p.body}</p>
            {p.id === "engage" || p.id === "assist" ? (
              <div className="mt-5 pt-5 border-t border-white/[0.08]">
                <Link to="/deploy" className="text-[12px] hover:opacity-80 transition-opacity" style={{ color: p.color }}>
                  See deployment patterns →
                </Link>
              </div>
            ) : null}
            {p.id === "intelligence" ? (
              <div className="mt-5 pt-5 border-t border-white/[0.08]">
                <Link to="/governance" className="text-[12px] hover:opacity-80 transition-opacity" style={{ color: p.color }}>
                  See governance and model risk detail →
                </Link>
              </div>
            ) : null}
          </div>
        </Motion>
      ))}
    </div>
  );
}

/* ─── CTA ────────────────────────────────────────────── */
function CTASection() {
  return (
    <div className="rounded-2xl text-center py-16 px-8"
      style={{
        border:"1px solid rgba(255,255,255,.08)",
        background:"rgba(0,0,0,.4)",
        boxShadow:"0 0 80px rgba(96,165,250,.07)",
      }}
    >
      <h2 className="text-[24px] md:text-[32px] font-semibold mb-4">Watch it run a live pipeline.</h2>
      <p className="text-white/68 mb-10 max-w-md mx-auto leading-relaxed">
        Signal to compliant execution to learning — every stage, live, in 20 minutes.
        Tailored to your portfolio and your questions.
      </p>
      <Link to="/demo"
        className="inline-block px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
        style={{background:"white",color:"black"}}
      >
        Request a walkthrough
      </Link>
      <div className="mt-6 text-xs text-white/30 flex items-center justify-center gap-2 flex-wrap">
        <Link to="/deploy"     className="hover:text-white/60 transition-colors">How we deploy</Link>
        <span className="text-white/15">·</span>
        <Link to="/governance" className="hover:text-white/60 transition-colors">Governance</Link>
        <span className="text-white/15">·</span>
        <Link to="/neutrality" className="hover:text-white/60 transition-colors">Neutrality</Link>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────── */
export default function Platform() {
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-8 pt-[100px] pb-24 grid md:grid-cols-[3fr_2fr] gap-12 items-center">
        <Motion>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs tracking-[0.18em] mb-8"
            style={{boxShadow:"0 0 18px rgba(59,130,246,0.22)"}}>
            PLATFORM
          </div>
          <h1 className="text-[32px] md:text-[52px] leading-[1.05] font-semibold mb-5">
            Signal in.<br />Governed decision out.
          </h1>
          <p className="text-white/68 leading-relaxed mb-8 max-w-xl text-[15px]">
            Sits between your core systems and every channel — controlling
            how every decision is computed, validated, executed, and learned from.
          </p>
          <div className="inline-flex items-center gap-1 p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.05]">
            {["SIGNAL","DECIDE","GOVERN","EXECUTE","LEARN"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-1">
                <span className="text-[11px] px-3 py-1.5 rounded-md font-medium tracking-wide"
                  style={{
                    color:       s==="GOVERN" ? "rgba(74,222,128,1.0)"  : "rgba(255,255,255,0.65)",
                    background:  s==="GOVERN" ? "rgba(74,222,128,0.10)" : "transparent",
                  }}>
                  {s}
                </span>
                {i < arr.length - 1 && <span className="text-white/20 text-[11px]">›</span>}
              </span>
            ))}
          </div>
        </Motion>
        <Motion delay={0.15}><LiveDecisionTrace /></Motion>
      </section>

      <div className="bg-white/[0.04] border-y border-white/[0.09]">
      <section className="max-w-6xl mx-auto px-8 py-28">
        <Motion><BeforeAfter /></Motion>
      </section>
      </div>

      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <Motion>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-6 bg-white/20" />
              <span className="text-[11px] text-white/55 tracking-[0.22em]">DECISION RUNTIME</span>
              <div className="h-px w-6 bg-white/20" />
            </div>
            <h2 className="text-[36px] font-semibold">From signal to governed execution.</h2>
            <p className="text-white/62 max-w-md mx-auto mt-3 leading-relaxed text-sm">
              One path. Every time. Scored, compliance-checked, orchestrated, handed off, and logged — in sequence, before execution.
            </p>
          </div>
          <DecisionDebugger />
        </Motion>
      </section>

      <div className="bg-white/[0.04] border-y border-white/[0.09]">
      <section className="max-w-6xl mx-auto px-8 py-28">
        <Motion><EngineArchitecture /></Motion>
      </section>
      </div>

      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <Motion>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-6 bg-white/20" />
              <span className="text-[11px] text-white/55 tracking-[0.22em]">THE PRODUCTS</span>
              <div className="h-px w-6 bg-white/20" />
            </div>
            <h2 className="text-[36px] font-semibold mb-3">Four products. One loop.</h2>
          </div>
        </Motion>
        <ProductDeepDive />
      </section>

      <div className="bg-white/[0.04] border-y border-white/[0.09]">
      <section className="max-w-6xl mx-auto px-8 py-28">
        <Motion><ComplianceSection /></Motion>
      </section>
      </div>

      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <Motion><IntegrationSection /></Motion>
      </section>

      <div className="bg-white/[0.04] border-y border-white/[0.09]">
      <section className="max-w-6xl mx-auto px-8 py-28">
        <Motion><ObservabilitySection /></Motion>
      </section>
      </div>

      <section className="max-w-4xl mx-auto px-8 pb-32 pt-20">
        <Motion><CTASection /></Motion>
      </section>
    </Layout>
  );
}
