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

/* ─── HERO RIGHT: CONTROL PLANE SCHEMATIC ────────────── */
const PIPELINE_STAGES = [
  { label:"Signal Ingestion",  gate:false },
  { label:"Decision Engine",   gate:false },
  { label:"Compliance Gate",   gate:true  },
  { label:"Routing Engine",    gate:false },
  { label:"Execution Adapter", gate:false },
];
const SOURCES  = [{ tag:"CBS",  full:"Core Banking"    }, { tag:"LOS", full:"Loan Origination" }, { tag:"CRM", full:"Campaign / CRM"   }];
const CHANNELS = ["Voice AI", "SMS", "WhatsApp Business", "Email", "Human in Loop"];

function ControlPlaneSchematic() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setStep(s => (s + 1) % PIPELINE_STAGES.length), 850);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="border border-white/10 rounded-xl bg-black/65 overflow-hidden">
      <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="flex-1 text-center text-white/40 text-[10px] tracking-[0.15em]">ShieldX — Control Plane</span>
        <div className="flex items-center gap-1.5 text-[10px] text-blue-400">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* schematic: sources → ShieldX → channels */}
      <div className="p-5 grid grid-cols-[1fr_20px_148px_20px_1fr] items-center gap-1">

        {/* left: source systems */}
        <div>
          <div className="text-[9px] text-white/22 tracking-widest mb-3 text-right">SOURCE SYSTEMS</div>
          <div className="space-y-1.5">
            {SOURCES.map((s, i) => (
              <div key={i} className="flex items-center justify-end gap-2 px-3 py-2 rounded-lg border transition-all duration-300"
                style={{
                  borderColor: step % SOURCES.length === i ? "rgba(96,165,250,0.35)" : "rgba(255,255,255,0.06)",
                  background:  step % SOURCES.length === i ? "rgba(96,165,250,0.06)" : "rgba(255,255,255,0.015)",
                }}>
                <span className="text-[11px] transition-colors duration-300"
                  style={{color: step % SOURCES.length === i ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)"}}>
                  {s.full}
                </span>
                <span className="text-[9px] font-mono font-bold transition-colors duration-300"
                  style={{color: step % SOURCES.length === i ? "#93c5fd" : "rgba(255,255,255,0.22)"}}>
                  {s.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* arrow in */}
        <div className="flex flex-col items-center justify-center gap-[5px] mt-6">
          {[0.5, 0.3, 0.15].map((o, i) => (
            <div key={i} className="w-1 h-1 rounded-full" style={{background:`rgba(96,165,250,${o})`}} />
          ))}
          <span className="text-blue-400/35 text-[11px] -mt-0.5">›</span>
        </div>

        {/* center: ShieldX pipeline */}
        <div className="border border-blue-400/30 rounded-xl overflow-hidden"
          style={{background:"rgba(59,130,246,0.04)", boxShadow:"0 0 24px rgba(59,130,246,0.12)"}}>
          <div className="border-b border-blue-400/[0.12] px-3 py-2 text-center">
            <span className="text-[10px] text-blue-300/65 tracking-[0.18em]">SHIELDX</span>
          </div>
          <div className="px-2.5 py-3 space-y-1">
            {PIPELINE_STAGES.map((p, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md transition-all duration-300"
                style={{background: step===i ? (p.gate ? "rgba(74,222,128,0.09)" : "rgba(96,165,250,0.09)") : "transparent"}}>
                <div className="w-[5px] h-[5px] rounded-full flex-shrink-0 transition-all duration-300" style={{
                  background: step===i ? (p.gate ? "#4ade80" : "#60a5fa") : "rgba(255,255,255,0.1)",
                  boxShadow:  step===i ? `0 0 6px ${p.gate ? "rgba(74,222,128,0.9)" : "rgba(96,165,250,0.9)"}` : "none",
                }}/>
                <span className="text-[10px] leading-tight transition-colors duration-300" style={{
                  color: step===i ? (p.gate ? "#4ade80" : "#93c5fd") : "rgba(255,255,255,0.28)",
                }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* arrow out */}
        <div className="flex flex-col items-center justify-center gap-[5px] mt-6">
          <span className="text-blue-400/35 text-[11px] -mb-0.5">›</span>
          {[0.15, 0.3, 0.5].map((o, i) => (
            <div key={i} className="w-1 h-1 rounded-full" style={{background:`rgba(96,165,250,${o})`}} />
          ))}
        </div>

        {/* right: channels */}
        <div>
          <div className="text-[9px] text-white/22 tracking-widest mb-3">CHANNELS</div>
          <div className="space-y-1.5">
            {CHANNELS.map((c, i) => {
              const isActive = step === PIPELINE_STAGES.length - 1 && i === step % CHANNELS.length;
              return (
                <div key={i} className="px-3 py-2 rounded-lg border text-[11px] transition-all duration-300"
                  style={{
                    borderColor: isActive ? "rgba(96,165,250,0.7)" : "rgba(255,255,255,0.06)",
                    background:  isActive ? "rgba(96,165,250,0.14)" : "rgba(255,255,255,0.015)",
                    color:       isActive ? "#93c5fd" : "rgba(255,255,255,0.38)",
                    boxShadow:   isActive ? "0 0 12px rgba(96,165,250,0.35)" : "none",
                    transform:   isActive ? "translateX(2px)" : "none",
                  }}>
                  {c}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div className="border-t border-white/[0.07] px-5 py-2.5 flex justify-between text-[10px]">
        <span className="text-white/22">API-first · No rip-and-replace · On-prem or cloud</span>
        <span style={{color:"rgba(74,222,128,0.55)"}}>Compliant ✓</span>
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
    { ms:"21ms", label:"Routing determined",   detail:"Channel selected, time window confirmed" },
    { ms:"28ms", label:"Execution triggered",  detail:"Outreach placed — response captured" },
    { ms:"28ms", label:"Audit recorded",       detail:"Immutable log written — AUD-20240411-48321" },
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
            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300" style={{
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

      <div className="border border-white/10 rounded-xl p-5 bg-black/50 font-mono text-xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/65 text-xs font-sans font-medium not-italic">Live state</span>
          <span className="text-[10px] tracking-widest" style={{color:"#4ade80"}}>RUNNING</span>
        </div>
        <div className="space-y-[5px] text-white/45">
          <div>customer_id: <span className="text-white/80">48321</span></div>
          <div>event: <span className="text-white/80">payment_missed</span></div>
          <div>dpd_bucket: <span className="text-white/80">30–60</span></div>
          <div>risk_score: <span className="text-white/80">0.82</span></div>
          <div>dnd_status: <span style={{color:"#4ade80"}}>CLEAR</span></div>
          <div>trai_window: <span style={{color:"#4ade80"}}>COMPLIANT</span></div>
          <div>compliance: <span style={{color:"#4ade80"}}>PASS</span></div>
          <div className="pt-2 mt-1 border-t border-white/10">
            <div style={{color:"#93c5fd"}}>[{steps[active].ms}] {steps[active].label}</div>
            <div>execution: <span style={{color:"#93c5fd"}}>voice_ai_triggered</span></div>
            <div>audit_id: <span className="text-white/45">AUD-20240411-48321</span></div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 text-white/22 text-[10px]">
          Every field logged immutably · Exportable for regulatory audit on demand
        </div>
      </div>
    </div>
  );
}

/* ─── ENGINE ARCHITECTURE ────────────────────────────── */
function EngineArchitecture() {
  const [active, setActive] = useState(4);
  const stages = [
    { num:"01", name:"Signal Ingestion",    badge:"Input",       color:"blue",  desc:"Receives structured event triggers from CBS, LOS, CRM, and campaign systems via REST API and webhooks. Validates schema and deduplicates before passing downstream." },
    { num:"02", name:"Normalisation",       badge:"Transform",   color:"blue",  desc:"Parses raw payloads into a canonical decision context object — customer ID, product type, event classification, timestamps, and metadata unified into a single structure." },
    { num:"03", name:"Scoring Engine",      badge:"AI layer",    color:"blue",  desc:"Evaluates customer risk score, intent classification, contact preference, and channel eligibility using configurable model weights and rule sets." },
    { num:"04", name:"Rule Evaluation",     badge:"Logic",       color:"blue",  desc:"Applies institution-specific business rules — DPD buckets, product policies, segment overrides, frequency caps — layered on top of the base scoring output." },
    { num:"05", name:"Compliance Gate",     badge:"Gatekeeper",  color:"green", desc:"Hard regulatory checks run here: TRAI calling window (8AM–7PM IST), TRAI DND scrub, DPDPA 2025 consent validation, RBI Fair Practices Code, and frequency limits. Nothing executes unless all checks pass.", highlight:true },
    { num:"06", name:"Routing Engine",      badge:"Orchestration",color:"blue", desc:"Selects optimal channel, time slot, language, and agent type based on scoring output, compliance constraints, and customer segment — all resolved in a single routing decision." },
    { num:"07", name:"Execution Adapter",   badge:"Output",      color:"blue",  desc:"Dispatches to the selected channel via registered adapters — Voice AI, SMS, WhatsApp Business, email, or human agent queue — with real-time response capture and callback handling." },
    { num:"08", name:"Audit Writer",        badge:"Immutable",   color:"blue",  desc:"Writes an immutable audit record per interaction: event type, decision payload, compliance check results, routing outcome, execution status, and full reason codes. Exportable on demand." },
  ];
  useEffect(() => {
    const i = setInterval(() => setActive(p => (p+1) % stages.length), 2400);
    return () => clearInterval(i);
  }, []);

  const s = stages[active];
  const isGreen = s.highlight;

  return (
    <div>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-white/20" />
          <span className="text-[11px] text-white/55 tracking-[0.22em]">ENGINE INTERNALS</span>
          <div className="h-px w-6 bg-white/20" />
        </div>
        <h2 className="text-[36px] font-semibold mb-4">Eight stages.<br />One auditable pipeline.</h2>
        <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
          Every interaction traverses the same path — from raw signal to compliant execution.
          No stage is skipped. Every stage is logged.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-8 items-start">
        {/* stage list */}
        <div className="grid grid-cols-2 gap-1.5">
          {stages.map((l,i) => (
            <div key={i} onClick={() => setActive(i)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200"
              style={{
                background: i===active ? (l.highlight ? "rgba(74,222,128,.06)" : "rgba(96,165,250,.06)") : "rgba(255,255,255,.015)",
                border: i===active
                  ? `1px solid ${l.highlight ? "rgba(74,222,128,.28)" : "rgba(96,165,250,.25)"}`
                  : "1px solid rgba(255,255,255,.05)",
              }}
            >
              <span className="text-[10px] font-mono w-5 flex-shrink-0 transition-colors duration-200"
                style={{color: i===active ? (l.highlight ? "rgba(74,222,128,.7)" : "rgba(96,165,250,.7)") : "rgba(255,255,255,.2)"}}>
                {l.num}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium leading-tight transition-colors duration-200 truncate" style={{
                  color: i===active ? (l.highlight ? "#4ade80" : "#93c5fd") : "rgba(255,255,255,.45)",
                }}>{l.name}</div>
              </div>
              {i===active && (
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200" style={{
                  background: l.highlight ? "#4ade80" : "#60a5fa",
                  boxShadow: `0 0 6px ${l.highlight ? "rgba(74,222,128,.8)" : "rgba(96,165,250,.8)"}`,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* detail card */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}}
            transition={{duration:.22}}
            className="rounded-xl p-6 border"
            style={{
              borderColor: isGreen ? "rgba(74,222,128,.25)" : "rgba(96,165,250,.2)",
              background:  isGreen ? "rgba(74,222,128,.04)" : "rgba(96,165,250,.04)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono" style={{color: isGreen ? "rgba(74,222,128,.5)" : "rgba(96,165,250,.5)"}}>
                Stage {s.num}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded border" style={{
                color: isGreen ? "#4ade80" : "#93c5fd",
                borderColor: isGreen ? "rgba(74,222,128,.3)" : "rgba(96,165,250,.3)",
                background: isGreen ? "rgba(74,222,128,.08)" : "rgba(96,165,250,.08)",
              }}>{s.badge}</span>
            </div>
            <div className="text-base font-semibold mb-3" style={{color: isGreen ? "#4ade80" : "white"}}>
              {s.name}
            </div>
            <div className="text-sm text-white/52 leading-relaxed">{s.desc}</div>
            {isGreen && (
              <div className="mt-4 pt-4 border-t border-white/[0.07] text-[11px] text-emerald-400/60 flex items-center gap-1.5">
                <span style={{color:"#4ade80"}}>✓</span>
                Hard gate — execution blocked if any check fails
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
  const [hPill,  setHPill]  = useState(null);

  const checks = [
    { label:"TRAI Window",          detail:"No outreach before 8 AM or after 7 PM IST. Enforced at execution level — no override permitted.",                        reg:"TRAI"     },
    { label:"TRAI DND",            detail:"Real-time scrub against TRAI's Do Not Disturb registry before every contact attempt.",                                   reg:"TRAI"     },
    { label:"DPDP Consent",        detail:"Per-channel consent validated before any AI-driven interaction triggers. Scope, purpose, and expiry enforced.",            reg:"DPDP"     },
    { label:"RBI Fair Practices",  detail:"Recovery conduct governed per RBI circular on Fair Practices Code for Lenders — no coercive or unreasonable contact.",   reg:"RBI"      },
    { label:"Frequency Cap",       detail:"Daily and weekly outreach limits per customer enforced automatically — per applicable RBI and TRAI guidelines.",          reg:"RBI·TRAI" },
  ];

  const pills = ["RBI Fair Practices Code","TRAI Guidelines","DPDPA 2025","Debt Recovery Frameworks","RBI KYC Master Direction"];

  useEffect(() => {
    const i = setInterval(() => setActive(a => (a + 1) % checks.length), 1400);
    return () => clearInterval(i);
  }, []);

  return (
    <div>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-white/20" />
          <span className="text-[11px] text-white/55 tracking-[0.22em]">COMPLIANCE ENFORCEMENT</span>
          <div className="h-px w-6 bg-white/20" />
        </div>
        <h2 className="text-[36px] font-semibold mb-4">Compliance is not a layer.<br />It is the gatekeeper.</h2>
        <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
          No interaction executes unless it passes every regulatory check — in real time,
          at infrastructure level, before anything reaches the customer.
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
              onClick={() => setActive(i)}
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
            className="border rounded-xl px-6 py-4 flex items-center gap-5"
            style={{borderColor:"rgba(74,222,128,0.22)",background:"rgba(74,222,128,0.03)"}}
          >
            <div className="w-9 h-9 rounded-xl border border-emerald-400/30 bg-emerald-500/[0.08] flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-400 text-sm">✓</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white mb-1">{checks[active].label}</div>
              <div className="text-sm text-white/48 leading-relaxed">{checks[active].detail}</div>
            </div>
            <div className="text-[10px] text-emerald-400/60 tracking-widest shrink-0 font-medium">PASS</div>
          </motion.div>
        </AnimatePresence>
      </div>

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
  const pairs = [
    { without:"Independent vendor triggers — no shared decision logic",                  with_:"Single decision engine controls every channel trigger" },
    { without:"Multiple vendors on same account — no real-time compliance check",        with_:"Every vendor trigger validated through one compliance layer before execution" },
    { without:"Channel conflicts — same customer contacted simultaneously",               with_:"Unified routing — channel selected by logic, not availability" },
    { without:"Violations discovered post-facto — never blocked",                        with_:"Violations blocked at infrastructure — before they fire" },
    { without:"No audit trail — cannot prove compliance in any review",                  with_:"Immutable audit log per interaction — regulator-ready on demand" },
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-white/20" />
          <span className="text-[11px] text-white/55 tracking-[0.22em]">THE SHIFT</span>
          <div className="h-px w-6 bg-white/20" />
        </div>
        <h2 className="text-[36px] font-semibold mb-4">Ungoverned decisions have a cost.<br /><span className="text-white/45">ShieldX eliminates it.</span></h2>
        <p className="text-white/48 max-w-md mx-auto leading-relaxed text-sm">
          The same signals. The same channels. Completely different outcomes — when a decision layer sits between them.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-[1fr_52px_1fr]">

        {/* Left — UNGOVERNED */}
        <div className="rounded-2xl border border-red-500/[0.18] bg-red-500/[0.025] p-6">
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
          <div className="w-px flex-1" style={{background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.09),transparent)"}} />
          <div className="w-9 h-9 rounded-xl border border-blue-400/25 bg-blue-500/[0.07] flex flex-col items-center justify-center gap-0.5 flex-shrink-0">
            <span className="text-blue-300/50 text-[8px] tracking-[0.1em]">SX</span>
            <span className="text-blue-400/45 text-xs leading-none">›</span>
          </div>
          <div className="w-px flex-1" style={{background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.09),transparent)"}} />
        </div>

        {/* Right — WITH SHIELDX */}
        <div className="rounded-2xl border border-emerald-500/[0.18] bg-emerald-500/[0.025] p-6">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-400 text-[10px] leading-none">✓</span>
            </div>
            <span className="text-[10px] text-emerald-400/65 tracking-[0.2em] font-medium">WITH SHIELDX</span>
          </div>
          <div className="space-y-0.5">
            {pairs.map((p, i) => (
              <div key={i} className="flex items-start gap-3 py-3.5 border-b border-white/[0.04] last:border-0">
                <span className="text-emerald-400/55 text-[11px] flex-shrink-0 mt-0.5">✓</span>
                <span className="text-white/72 text-sm leading-relaxed">{p.with_}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/[0.08] border border-emerald-400/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            <span className="text-[10px] text-emerald-400/65 tracking-widest">GOVERNED: 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── INTEGRATION ────────────────────────────────────── */
function IntegrationSection() {
  const [activeSrc, setActiveSrc] = useState(0);
  const [activeCh,  setActiveCh]  = useState(0);

  const sources  = [
    { tag:"CBS", full:"Core Banking System",  event:"payment_missed →"        },
    { tag:"LOS", full:"Loan Origination",     event:"application_submitted →" },
    { tag:"CRM", full:"Campaign / CRM",       event:"grievance_raised →"      },
  ];
  const channels = ["Voice AI","SMS","WhatsApp Business","Email","Human in Loop"];
  const inner    = ["Decision Engine","Compliance Gate","Routing Engine","Audit Writer"];

  useEffect(() => {
    const i = setInterval(() => setActiveSrc(a => (a + 1) % sources.length), 1800);
    return () => clearInterval(i);
  }, []);
  useEffect(() => {
    const i = setInterval(() => setActiveCh(a => (a + 1) % channels.length), 1100);
    return () => clearInterval(i);
  }, []);

  return (
    <div>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-white/20" />
          <span className="text-[11px] text-white/55 tracking-[0.22em]">HOW IT CONNECTS</span>
          <div className="h-px w-6 bg-white/20" />
        </div>
        <h2 className="text-[36px] font-semibold mb-4">Three connection points.<br />Zero core banking changes.</h2>
        <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
          Raw CBS, LOS, and CRM events go in. Governed, compliant, routed decisions come out.
          No rip-and-replace — ShieldX plugs into what you already have.
        </p>
      </div>

      {/* Architecture diagram */}
      <div className="max-w-5xl mx-auto grid grid-cols-[1fr_28px_180px_28px_1fr] items-center gap-0 mb-10">

        {/* Source systems */}
        <div>
          <div className="text-[9px] text-white/22 tracking-widest mb-3 text-right">SOURCE SYSTEMS</div>
          <div className="space-y-2">
            {sources.map((s, i) => (
              <div key={i} className="flex items-center justify-end gap-3 px-4 py-3 rounded-xl border transition-all duration-400"
                style={{
                  borderColor: activeSrc===i ? "rgba(96,165,250,0.35)" : "rgba(255,255,255,0.06)",
                  background:  activeSrc===i ? "rgba(96,165,250,0.06)" : "rgba(255,255,255,0.02)",
                }}>
                <div className="text-right">
                  <div className="text-[11px] transition-colors duration-300"
                    style={{color: activeSrc===i ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.32)"}}>
                    {s.full}
                  </div>
                  {activeSrc===i && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-[9px] font-mono mt-0.5" style={{color:"rgba(96,165,250,0.55)"}}>
                      {s.event}
                    </motion.div>
                  )}
                </div>
                <div className="w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold transition-all duration-300"
                  style={{
                    borderColor: activeSrc===i ? "rgba(96,165,250,0.40)" : "rgba(255,255,255,0.10)",
                    background:  activeSrc===i ? "rgba(96,165,250,0.10)" : "rgba(255,255,255,0.03)",
                    color:       activeSrc===i ? "#93c5fd" : "rgba(255,255,255,0.28)",
                  }}>{s.tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow in */}
        <div className="flex flex-col items-center justify-center gap-[5px] mt-6">
          {[0.5,0.32,0.16].map((o,i) => (
            <div key={i} className="w-1 h-1 rounded-full" style={{background:`rgba(96,165,250,${o})`}} />
          ))}
          <span className="text-blue-400/35 text-xs">›</span>
        </div>

        {/* ShieldX core */}
        <div className="border border-blue-400/30 rounded-2xl overflow-hidden"
          style={{background:"rgba(59,130,246,0.04)",boxShadow:"0 0 28px rgba(59,130,246,0.10)"}}>
          <div className="border-b border-blue-400/[0.12] px-3 py-2 text-center">
            <span className="text-[10px] text-blue-300/60 tracking-[0.2em]">ShieldX</span>
          </div>
          <div className="p-3 space-y-1.5">
            {inner.map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                style={{
                  background: i===1 ? "rgba(74,222,128,0.07)" : "rgba(255,255,255,0.02)",
                  border: i===1 ? "1px solid rgba(74,222,128,0.18)" : "1px solid rgba(255,255,255,0.04)",
                }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: i===1 ? "#4ade80" : "rgba(96,165,250,0.6)",
                    boxShadow:  i===1 ? "0 0 5px rgba(74,222,128,0.8)" : "none",
                  }} />
                <span className="text-[10px]"
                  style={{color: i===1 ? "#4ade80" : "rgba(255,255,255,0.42)"}}>
                  {s}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-blue-400/[0.08] px-3 py-2 text-center">
            <span className="text-[9px] text-white/20 tracking-widest">API-first · No rip-and-replace</span>
          </div>
        </div>

        {/* Arrow out */}
        <div className="flex flex-col items-center justify-center gap-[5px] mt-6">
          <span className="text-blue-400/35 text-xs">›</span>
          {[0.16,0.32,0.5].map((o,i) => (
            <div key={i} className="w-1 h-1 rounded-full" style={{background:`rgba(96,165,250,${o})`}} />
          ))}
        </div>

        {/* Channels */}
        <div>
          <div className="text-[9px] text-white/22 tracking-widest mb-3">CHANNELS</div>
          <div className="space-y-2">
            {channels.map((c, i) => (
              <div key={i} className="px-4 py-3 rounded-xl border text-[11px] transition-all duration-300"
                style={{
                  borderColor: activeCh===i ? "rgba(96,165,250,0.55)" : "rgba(255,255,255,0.06)",
                  background:  activeCh===i ? "rgba(96,165,250,0.08)" : "rgba(255,255,255,0.02)",
                  color:       activeCh===i ? "#93c5fd" : "rgba(255,255,255,0.38)",
                  transform:   activeCh===i ? "translateX(4px)" : "none",
                }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Three proof-point cards */}
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { n:"01", label:"INBOUND",    title:"CBS · LOS · CRM events",     detail:"REST API and webhooks. Event-driven and pull-based both supported.",                                              proof:"Zero CBS / LOS code changes required"           },
          { n:"02", label:"EXECUTION",  title:"All your existing channels",  detail:"Pre-built adapters for Voice AI, SMS, WhatsApp Business, Email, and Human in Loop.",                            proof:"Existing vendor relationships preserved"          },
          { n:"03", label:"DEPLOYMENT", title:"Cloud, on-prem, or hybrid",   detail:"Adapts to your infrastructure policy — including air-gapped Tier-1 and DPDP data residency requirements.",     proof:"Typical integration: 3–6 weeks to first decision" },
        ].map((col, i) => (
          <div key={i} className="border border-white/[0.07] rounded-xl px-5 py-4 bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-mono text-white/22">{col.n}</span>
              <span className="text-[9px] text-white/35 tracking-widest">{col.label}</span>
            </div>
            <div className="text-sm font-semibold text-white mb-1">{col.title}</div>
            <div className="text-xs text-white/38 leading-relaxed mb-3">{col.detail}</div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px]" style={{color:"rgba(74,222,128,0.70)"}}>✓</span>
              <span className="text-[11px] text-white/38">{col.proof}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── OBSERVABILITY ──────────────────────────────────── */
function ObservabilitySection() {
  const [tick,    setTick]    = useState(0);
  const [hovered, setHovered] = useState(null);

  const feed = [
    { id:"DEC-48331", uc:"COLLECTIONS", result:"VOICE AI · TRAI PASS",          ok:true,  color:"#f59e0b" },
    { id:"DEC-48330", uc:"COLLECTIONS", result:"SMS BLOCKED · DND MATCH",       ok:false, color:"#f59e0b" },
    { id:"DEC-48329", uc:"LENDING",     result:"APPROVAL NOTICE · DPDP PASS",   ok:true,  color:"#818cf8" },
    { id:"DEC-48328", uc:"SERVICING",   result:"GRIEVANCE QUEUED · SLA SET",     ok:true,  color:"#34d399" },
    { id:"DEC-48327", uc:"COLLECTIONS", result:"VOICE BLOCKED · OUT OF WINDOW",  ok:false, color:"#f59e0b" },
    { id:"DEC-48326", uc:"LENDING",     result:"REJECTION NOTICE · RBI FPC OK",  ok:true,  color:"#818cf8" },
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
        <h2 className="text-[36px] font-semibold mb-4">Every decision visible.<br />Every action explainable.</h2>
        <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
          Banks need to explain every outreach to a regulator on demand.
          ShieldX surfaces compliance health, campaign performance, and decision audit trails in one place.
        </p>
      </div>

      {/* Live dashboard mockup */}
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/40 mb-8 max-w-5xl mx-auto">
        <div className="border-b border-white/[0.07] px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="flex-1 text-center text-white/28 text-[10px] tracking-[0.15em]">ShieldX — Observability Console</span>
          <div className="flex items-center gap-1.5 text-[10px] text-blue-400/80">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            LIVE
          </div>
        </div>

        <div className="p-5 grid md:grid-cols-[1fr_1fr_220px] gap-4">
          {/* KPI tiles */}
          <div className="grid grid-cols-2 gap-2 content-start">
            {[
              { label:"Compliance Score",  val:"99.7%",  sub:"All campaigns",     color:"#4ade80" },
              { label:"Avg Latency",       val:"28ms",   sub:"Signal to execute", color:"#60a5fa" },
              { label:"Platform Uptime",   val:"99.95%", sub:"SLA commitment",    color:"#4ade80" },
              { label:"Interactions",      val:"1.4M+",  sub:"Logged this month", color:"#a78bfa" },
            ].map((k, i) => (
              <div key={i} className="border border-white/[0.07] rounded-xl p-3 bg-white/[0.02]">
                <div className="text-[20px] font-semibold mb-0.5 leading-none" style={{color:k.color}}>{k.val}</div>
                <div className="text-[10px] text-white/58 leading-tight mt-1">{k.label}</div>
                <div className="text-[9px] text-white/25 mt-0.5">{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Channel compliance scores */}
          <div className="border border-white/[0.07] rounded-xl p-4 bg-white/[0.02]">
            <div className="text-[10px] text-white/38 tracking-widest mb-3">CHANNEL COMPLIANCE</div>
            <div className="divide-y divide-white/[0.05]">
              {[
                { name:"Voice AI",  pct:98.2 },
                { name:"SMS",       pct:100  },
                { name:"WhatsApp",  pct:97.6 },
                { name:"Email",     pct:100  },
                { name:"Human",     pct:100  },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{background: c.pct === 100 ? "rgba(74,222,128,0.7)" : "rgba(251,191,36,0.7)"}} />
                    <span className="text-[11px] text-white/52">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold tabular-nums"
                      style={{color: c.pct === 100 ? "rgba(74,222,128,0.85)" : "rgba(251,191,36,0.85)"}}>
                      {c.pct}%
                    </span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded font-medium tracking-wide"
                      style={{
                        background: "rgba(74,222,128,0.08)",
                        border:     "1px solid rgba(74,222,128,0.15)",
                        color:      "rgba(74,222,128,0.65)",
                      }}>
                      PASS
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-[9px] text-white/25 tracking-widest">PLATFORM AVG</span>
              <span className="text-[11px] font-semibold" style={{color:"rgba(74,222,128,0.85)"}}>99.1%</span>
            </div>
          </div>

          {/* Live decision feed */}
          <div className="border border-white/[0.07] rounded-xl p-4 bg-white/[0.02] font-mono text-xs">
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

      {/* Persona tiles — who uses observability and for what */}
      <div className="grid md:grid-cols-3 gap-3 max-w-5xl mx-auto">
        {[
          {
            role: "COMPLIANCE OFFICER",
            action: "Regulatory review",
            desc: "Every blocked decision with a reason code. Exception reports formatted for RBI and TRAI review — on demand, not scrambled.",
            accent: "rgba(74,222,128,0.55)",
            border: "rgba(74,222,128,0.14)",
            bg: "rgba(74,222,128,0.025)",
          },
          {
            role: "OPERATIONS HEAD",
            action: "Campaign performance",
            desc: "Channel-level compliance score, contact rate, and exception count per campaign. Spot what's drifting before it becomes a violation.",
            accent: "rgba(96,165,250,0.55)",
            border: "rgba(96,165,250,0.14)",
            bg: "rgba(96,165,250,0.025)",
          },
          {
            role: "CEO / BOARD",
            action: "Governance health",
            desc: "Platform-wide compliance score, SLA adherence, and interaction volume — the single number that tells you whether the decision layer is working.",
            accent: "rgba(167,139,250,0.55)",
            border: "rgba(167,139,250,0.14)",
            bg: "rgba(167,139,250,0.025)",
          },
        ].map((p, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="rounded-xl p-5 border cursor-default transition-all duration-300"
            style={{
              borderColor: hovered===i ? p.border.replace("0.14","0.35") : p.border,
              background:  hovered===i ? p.bg.replace("0.025","0.055") : p.bg,
            }}
          >
            <div className="text-[9px] tracking-[0.2em] mb-1 font-medium" style={{color:p.accent}}>{p.role}</div>
            <div className="text-[13px] font-medium text-white/82 mb-2">{p.action}</div>
            <div className="text-[12px] text-white/42 leading-relaxed">{p.desc}</div>
          </div>
        ))}
      </div>
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
      <h2 className="text-[32px] font-semibold mb-4">Bring control to every customer interaction.</h2>
      <p className="text-white/50 mb-10 max-w-md mx-auto leading-relaxed">
        See ShieldX run a live decision pipeline — from signal ingestion
        to compliant execution — in 20 minutes.
      </p>
      <Link to="/demo"
        className="inline-block px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
        style={{background:"white",color:"black"}}
      >
        Request a walkthrough
      </Link>
      <div className="mt-6 text-xs text-white/30 flex items-center justify-center gap-2">
        <Link to="/collections" className="hover:text-white/60 transition-colors">Collections</Link>
        <span className="text-white/15">·</span>
        <Link to="/lending"     className="hover:text-white/60 transition-colors">Lending</Link>
        <span className="text-white/15">·</span>
        <Link to="/servicing"   className="hover:text-white/60 transition-colors">Servicing</Link>
        <span className="text-white/15">·</span>
        <span className="text-white/20">All controlled by one decision layer</span>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────── */
export default function Platform() {
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-8 pt-[100px] pb-24 grid md:grid-cols-2 gap-16 items-center">
        <Motion>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs tracking-[0.18em] mb-8"
            style={{boxShadow:"0 0 18px rgba(59,130,246,0.22)"}}>
            PLATFORM
          </div>
          <h1 className="text-[52px] leading-[1.05] font-semibold mb-5">
            The control plane your<br />
            <span className="text-white/55">core banking stack</span><br />
            was never built to include.
          </h1>
          <p className="text-white/50 leading-relaxed mb-8 max-w-md text-[15px]">
            Signal in. Compliant, audited decision out.
            ShieldX is that layer — evaluate, validate, route, execute, audit.
            Every time. Under 30ms.
          </p>
          <div className="inline-flex items-center gap-0.5 p-1 rounded-lg border border-white/[0.08] bg-white/[0.025]">
            {["SIGNAL","DECISION","COMPLIANCE","EXECUTION","AUDIT"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-0.5">
                <span className="text-[10px] px-2.5 py-1 rounded-md font-medium"
                  style={{
                    color:       s==="COMPLIANCE" ? "rgba(74,222,128,0.9)"  : "rgba(255,255,255,0.52)",
                    background:  s==="COMPLIANCE" ? "rgba(74,222,128,0.08)" : "transparent",
                  }}>
                  {s}
                </span>
                {i < arr.length - 1 && <span className="text-white/15 text-[10px] px-0.5">›</span>}
              </span>
            ))}
          </div>
        </Motion>
        <Motion delay={0.15}><ControlPlaneSchematic /></Motion>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-28">
        <Motion><BeforeAfter /></Motion>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-28">
        <Motion>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-6 bg-white/20" />
              <span className="text-[11px] text-white/55 tracking-[0.22em]">DECISION RUNTIME</span>
              <div className="h-px w-6 bg-white/20" />
            </div>
            <h2 className="text-[36px] font-semibold">From signal to governed execution.</h2>
            <p className="text-white/42 max-w-md mx-auto mt-3 leading-relaxed text-sm">
              One path. Every time. Scored, compliance-checked, routed, executed, and logged — in under 30 milliseconds.
            </p>
          </div>
          <DecisionDebugger />
        </Motion>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-28">
        <Motion><EngineArchitecture /></Motion>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-28">
        <Motion><ComplianceSection /></Motion>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-28">
        <Motion><IntegrationSection /></Motion>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-28">
        <Motion><ObservabilitySection /></Motion>
      </section>

      <section className="max-w-4xl mx-auto px-8 pb-32">
        <Motion><CTASection /></Motion>
      </section>
    </Layout>
  );
}
