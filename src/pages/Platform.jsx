import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

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
    { ms:"in",   label:"Signal received",     sub:"event ingested · payload normalised",         highlight:false },
    { ms:"·",    label:"Decision computed",   sub:"risk tier assigned · eligibility evaluated",   highlight:false },
    { ms:"·",    label:"Compliance validated", sub:"contact rules re-checked at dispatch",        highlight:true  },
    { ms:"·",    label:"Orchestrated",        sub:"channel and time window confirmed",            highlight:false },
    { ms:"·",    label:"Handed off",          sub:"dispatched via adapter · outcome captured",    highlight:false },
    { ms:"~1s",  label:"Audit written",       sub:"hash-chained log written · AUD-20260614-48321",   highlight:false },
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

/* ─── ENGINE ARCHITECTURE — regrouped under product names ───── */
function EngineArchitecture() {
  const [active, setActive] = useState(4);
  const [paused, setPaused] = useState(false);
  const stages = [
    { num:"01", name:"Signal Ingestion",  group:"DECISION", color:"blue", desc:"Receives allocation files and out-of-band signal feeds over secure SFTP, plus direct scoring calls where an institution prefers them. Validates schema and surfaces duplicates for resolution before processing." },
    { num:"02", name:"Normalisation",     group:"DECISION", color:"blue", desc:"Parses raw payloads into a canonical decision context object — customer ID, product type, event classification, timestamps, and metadata unified into a single structure." },
    { num:"03", name:"Scoring",           group:"DECISION", color:"blue", desc:"Configurable model weights and rule sets evaluate customer risk tier, cohort, and channel eligibility. Holdout studies with deterministic, reproducible account assignment, so a lift claim can be reconstructed rather than asserted." },
    { num:"04", name:"Rule Evaluation",   group:"DECISION", color:"blue", desc:"Applies institution-specific business rules — DPD buckets, product policies, cohort overrides, frequency caps — layered on top of the base scoring output." },
    { num:"05", name:"Compliance Gate",   group:"GOVERN",   color:"green", desc:"Contact rules are re-evaluated at dispatch, not at decision time: calling window (8AM–7PM IST by default), Sunday and national-holiday rules in IST, daily frequency caps, and institution-set suppression entries. Automated channel sends are blocked if any rule fails. Rules resolve per product and portfolio, with effective dating.", highlight:true },
    { num:"06", name:"Sequencing",        group:"DECISION", color:"blue", desc:"Part of Decision, not a separate product — sequences the governed decision into timed, constrained instructions: retry logic, contact-window compliance, and escalation when a channel is exhausted." },
    { num:"07", name:"Execution Adapters", group:"EXECUTE", color:"amber", desc:"Pluggable and neutral. The bank's own CPaaS under the bank's handles and templates, the bank's dialer, agency work-lists (SFTP/API), Engage, or the voice execution adapter — every adapter speaks the same treatment-in / outcome-out contract.", link:"/deploy" },
    { num:"08", name:"System of Record",  group:"RECORD",   color:"emerald", desc:"Writes a tamper-evident, hash-chained record per decision: payload, the rule waterfall evaluated, the rule that fired, routing outcome and execution status — with an integrity-verification endpoint." },
    { num:"09", name:"Intelligence",      group:"SENSE",    color:"violet", desc:"Post-call analysis of recorded calls — batch, not in-call (Assist covers the live call) — extracting objections, hardship, and promise language as decision features that flow into the next decision on that account." },
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

/* ─── INTEGRATION ────────────────────────────────────── */
const CONNECTS = [
  {
    n:"01", label:"INTEGRATION", color:"#60a5fa",
    title:"Built for how banks actually integrate",
    detail:"Secure file-based exchange — SFTP, encrypted, whitelisted endpoints — mapped into ShieldX's canonical schema. The pattern tier-one InfoSec approves fastest. The voice channel additionally runs on API keys and signed webhooks.",
    proof:"No CBS / LOS code changes required",
    link:"/integration",
  },
  {
    n:"02", label:"DEPLOYMENT", color:"#fbbf24",
    title:"On-prem, cloud, or hybrid",
    detail:"Adapts to your infrastructure policy — including on-premise deployment inside your own boundary, and DPDP data residency requirements.",
    proof:"Existing infrastructure preserved",
  },
  {
    n:"03", label:"TIME TO VALUE", color:"#4ade80",
    title:"3–6 weeks from data access",
    detail:"From first data access to your first governed, compliant, auditable decision — depending on how ready your extract is. Phased rollout available.",
    proof:"Live on one portfolio first — expand from there",
  },
];

function IntegrationSection() {
  const [hovered, setHovered] = useState(null);
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
        {CONNECTS.map((col, i) => {
          const active = hovered === i;
          return (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-xl px-6 py-5 border cursor-default transition-all duration-300"
              style={{
                borderColor: active ? `${col.color}60` : "rgba(255,255,255,0.12)",
                background:  active ? `${col.color}0d` : "rgba(255,255,255,0.04)",
                boxShadow:   active ? `0 12px 32px ${col.color}22` : "none",
                transform:   active ? "translateY(-4px)" : "none",
              }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-mono transition-colors duration-300" style={{ color: active ? col.color : "rgba(255,255,255,0.22)" }}>{col.n}</span>
                <span className="text-[9px] tracking-widest transition-colors duration-300" style={{ color: active ? `${col.color}cc` : "rgba(255,255,255,0.35)" }}>{col.label}</span>
              </div>
              <div className="text-sm font-semibold text-white mb-2">{col.title}</div>
              <div className="text-xs text-white/42 leading-relaxed mb-4">{col.detail}</div>
              <div className="flex items-center gap-1.5 pt-3 border-t transition-colors duration-300" style={{ borderColor: active ? `${col.color}30` : "rgba(255,255,255,0.06)" }}>
                <span className="text-[11px]" style={{ color: active ? col.color : "rgba(74,222,128,0.70)" }}>✓</span>
                <span className="text-[11px] transition-colors duration-300" style={{ color: active ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.40)" }}>{col.proof}</span>
              </div>
              {col.link && (
                <Link to={col.link} className="inline-block mt-3 text-[11px] transition-colors duration-300"
                  style={{ color: active ? col.color : "rgba(255,255,255,0.35)" }}>
                  What your IT team builds →
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── OBSERVABILITY (no fabricated volumes/latency; illustrative) ── */
function ObservabilitySection() {
  const [tick,    setTick]    = useState(0);
  const [hovered, setHovered] = useState(null);

  const feed = [
    { id:"DEC-48331", uc:"COLLECTIONS", result:"VOICE QUEUED · WINDOW OK",         ok:true,  color:"#f59e0b" },
    { id:"DEC-48330", uc:"COLLECTIONS", result:"SMS BLOCKED · SUPPRESSION LIST",       ok:false, color:"#f59e0b" },
    { id:"DEC-48329", uc:"COLLECTIONS", result:"WHATSAPP SENT · WITHIN CAP",     ok:true,  color:"#818cf8" },
    { id:"DEC-48328", uc:"COLLECTIONS", result:"CALL ANALYSED · HARDSHIP FLAGGED", ok:true, color:"#34d399" },
    { id:"DEC-48327", uc:"COLLECTIONS", result:"VOICE BLOCKED · OUTSIDE HOURS", ok:false, color:"#f59e0b" },
    { id:"DEC-48326", uc:"COLLECTIONS", result:"SETTLEMENT OFFER · DAY RULE OK",  ok:true,  color:"#818cf8" },
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
              { label:"Decision latency",val:"~1 second",sub:"Signal to governed decision",  color:"#60a5fa" },
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
                { name:"Voice",      ok:true },
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
            desc: "Detected breaches recorded with rule type, reviewer, timestamp and disposition — filterable by rule, portfolio and period. An audit trail you can query rather than reconstruct.",
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
            desc: "Platform-wide compliance posture and decision volume. The single view that tells leadership whether the decision layer is working.",
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

/* ─── FOUR CAPABILITIES — teasers linking to their own pages ─── */
const CAPABILITY_TEASERS = [
  { id: "decision",     name: "Decision",     tag: "THE BRAIN",                       color: "#60a5fa", line: "Scores, rules, and cohort strategy — computes the treatment for every account." },
  { id: "engage",       name: "Engage",       tag: "REFERENCE EXECUTION CHANNEL",     color: "#fbbf24", line: "SMS, WhatsApp, agencies, and voice AI — for institutions without pipes." },
  { id: "assist",       name: "Assist",       tag: "THE HUMAN CHANNEL'S ADAPTER",     color: "#4ade80", line: "Briefs the agent before the call. Guides them live during it." },
  { id: "intelligence", name: "Intelligence", tag: "THE SENSORY SYSTEM",              color: "#a78bfa", line: "Post-call, not in-call — Assist covers the call itself." },
];

function CapabilityTeasers() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {CAPABILITY_TEASERS.map((p, i) => (
        <Motion key={p.id} delay={i * 0.06}>
          <Link to={`/platform/${p.id}`}
            className="block rounded-2xl border p-7 no-underline transition-all duration-200 hover:scale-[1.01]"
            style={{ borderColor: `${p.color}30`, background: `${p.color}08` }}>
            <span className="text-[10px] tracking-[0.2em] font-medium" style={{ color: p.color }}>{p.tag}</span>
            <h3 className="text-[22px] font-semibold mt-2 mb-1.5" style={{ color: p.color }}>{p.name}</h3>
            <div className="text-white/60 text-sm mb-4">{p.line}</div>
            <span className="text-[12px]" style={{ color: `${p.color}cc` }}>Explore {p.name} →</span>
          </Link>
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
      <SEO
        title="Platform"
        description="One decision engine, not four separate products. Signal in, governed decision out — computed, validated, executed, and learned from across every channel."
        path="/platform"
      />
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
            One decision engine, not four separate products. It sits between your
            core systems and every channel — controlling how every decision is
            computed, validated, executed, and learned from.
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
        <Motion><EngineArchitecture /></Motion>
      </section>
      </div>

      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <Motion>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-6 bg-white/20" />
              <span className="text-[11px] text-white/55 tracking-[0.22em]">ONE DECISION SPINE</span>
              <div className="h-px w-6 bg-white/20" />
            </div>
            <h2 className="text-[36px] font-semibold mb-3">Four capabilities. One system.</h2>
            <p className="text-white/62 max-w-md mx-auto mt-3 leading-relaxed text-sm">
              Not four separate products with their own brains — one decision engine,
              reaching every point it needs to. Each has its own page.
            </p>
          </div>
        </Motion>
        <CapabilityTeasers />
      </section>

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
