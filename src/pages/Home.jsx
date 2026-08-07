import Navbar from "../layouts/Navbar";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

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

/* ================= SYSTEM LOOP — capabilities + the stages they drive, merged ================= */
const STAGES = ["Signal", "Decide", "Govern", "Execute", "Learn"];

const LOOP_CAPABILITIES = [
  { letter: "D", name: "Decision",     to: "/platform/decision",     color: "#60a5fa", line: "Builds the customer footprint, then computes the treatment.", stages: [1, 2] },
  { letter: "E", name: "Engage",       to: "/platform/engage",       color: "#fbbf24", line: "SMS, WhatsApp, agencies, and voice AI — for institutions without pipes.", stages: [3] },
  { letter: "A", name: "Assist",       to: "/platform/assist",       color: "#4ade80", line: "The human channel's adapter, before and during the call.", stages: [3] },
  { letter: "I", name: "Intelligence", to: "/platform/intelligence", color: "#a78bfa", line: "Learns from what was actually said.",                     stages: [4] },
];

function SystemLoop() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const i = setInterval(() => setActive(a => (a + 1) % LOOP_CAPABILITIES.length), 3200);
    return () => clearInterval(i);
  }, [paused]);

  const cap = LOOP_CAPABILITIES[active];

  return (
    <div>
      {/* stage pills — light up with whichever capability is active below */}
      <div className="flex items-center justify-center gap-1.5 mb-16 flex-wrap">
        {STAGES.map((stage, i) => {
          const isLit = cap.stages.includes(i);
          return (
            <div key={stage} className="flex items-center gap-1.5">
              <div className="px-4 py-2.5 rounded-lg border text-[12px] font-medium tracking-wide transition-all duration-300"
                style={{
                  borderColor: isLit ? `${cap.color}70` : "rgba(255,255,255,0.10)",
                  background:  isLit ? `${cap.color}18` : "rgba(255,255,255,0.03)",
                  color:       isLit ? cap.color : "rgba(255,255,255,0.45)",
                  boxShadow:   isLit ? `0 0 20px ${cap.color}30` : "none",
                  transform:   isLit ? "translateY(-2px)" : "none",
                }}>
                {stage}
              </div>
              {i < STAGES.length - 1 && <span className="text-white/15 text-xs">›</span>}
            </div>
          );
        })}
      </div>

      {/* capability cards — hover/click drives which stages light up above */}
      <div className="grid md:grid-cols-4 gap-4">
        {LOOP_CAPABILITIES.map((c, i) => (
          <Link key={c.name} to={c.to}
            onMouseEnter={() => { setActive(i); setPaused(true); }}
            onMouseLeave={() => setPaused(false)}
            className="block p-6 rounded-xl border transition-all duration-200 no-underline"
            style={{
              borderColor: active === i ? `${c.color}55` : "rgba(255,255,255,0.10)",
              background:  active === i ? `${c.color}0d` : "rgba(255,255,255,0.03)",
            }}>
            <div className="w-9 h-9 rounded-lg border flex items-center justify-center mb-4 font-mono text-sm font-semibold transition-all duration-200"
              style={{
                borderColor: active === i ? `${c.color}70` : `${c.color}30`,
                color: c.color,
                background: `${c.color}12`,
              }}>
              {c.letter}
            </div>
            <div className="text-sm font-medium mb-2" style={{ color: active === i ? c.color : "white" }}>{c.name}</div>
            <div className="text-white/55 text-xs leading-relaxed">{c.line}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ================= GOVERNED DECISION — SINGLE COLLECTIONS SCENARIO ================= */
const SCENARIO = {
  event: "payment_missed",
  customer: "CUST-48321 · DPD 30–60 · ₹24,000",
  steps: [
    { ms:"0ms",  text:"Signal received",                 note:"CBS payment_missed event ingested",             color:"white" },
    { ms:"8ms",  text:"Risk tier — HIGH",                 note:"DPD bucket evaluated, cohort assigned",         color:"white" },
    { ms:"12ms", text:"Eligible channels: agent call, WhatsApp, SMS", note:"Voice AI eligible, not selected",   color:"white" },
    { ms:"14ms", text:"TRAI window — COMPLIANT",          note:"2:00 PM IST — within 8 AM–7 PM window",         color:"green" },
    { ms:"16ms", text:"TRAI DND — CLEAR",                 note:"DND check passed",                              color:"green" },
    { ms:"17ms", text:"DPDP consent — PASS",               note:"Consent verified before execution",             color:"green" },
    { ms:"18ms", text:"RBI FPC — PASS",                    note:"Fair practices code compliant",                 color:"green" },
    { ms:"19ms", text:"Handoff: agent call · Assist context", note:"Governed decision handed off through adapter", color:"blue" },
    { ms:"19ms", text:"Audit record written",              note:"AUD-20260614-48321 · Immutable",                color:"dim"   },
    { ms:"—",    text:"Call analysed post-call — hardship mentioned", note:"Next treatment updated · the loop closes", color:"blue" },
  ],
};

const STEP_COLORS = {
  white: { text:"rgba(255,255,255,0.75)", dot:"rgba(255,255,255,0.4)"  },
  green: { text:"#4ade80",               dot:"#4ade80"                 },
  blue:  { text:"#93c5fd",               dot:"#60a5fa"                 },
  dim:   { text:"rgba(255,255,255,0.32)", dot:"rgba(255,255,255,0.18)" },
};

function GovernedDecisionView() {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setStepIdx(s => (s >= SCENARIO.steps.length - 1 ? 0 : s + 1));
    }, 650);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="border border-white/15 rounded-xl bg-black/50 overflow-hidden font-mono text-xs">

      {/* header */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.07]">
        <span className="text-[10px] tracking-widest text-amber-300/70">COLLECTIONS</span>
        <span className="text-[9px] text-white/25 tracking-widest">Illustrative simulation</span>
      </div>

      {/* trigger line */}
      <div className="px-5 py-2.5 border-b border-white/[0.09] flex items-center gap-3">
        <span className="text-[9px] text-white/25 tracking-widest">TRIGGER</span>
        <span className="text-white/55 text-[11px]">{SCENARIO.event}</span>
        <span className="text-white/28 text-[10px]">·</span>
        <span className="text-white/35 text-[10px]">{SCENARIO.customer}</span>
      </div>

      {/* steps */}
      <div className="px-5 py-4 space-y-2.5 min-h-[280px]">
        {SCENARIO.steps.map((step, i) => {
          const shown = i <= stepIdx;
          const isActive = i === stepIdx;
          const c = STEP_COLORS[step.color];
          return (
            <motion.div key={i}
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
    body: "No scoring, no compliance check, no channel logic in between.",
    num: "#fbbf24",
    dot: "rgba(251,191,36,0.55)",
    card: "border-amber-400/[0.15] bg-amber-500/[0.02] hover:border-amber-400/[0.42] hover:bg-amber-500/[0.04] hover:shadow-[0_0_28px_rgba(251,191,36,0.07)]",
  },
  {
    n: "02",
    head: "Vendors operate with no shared compliance gate.",
    body: "Violations surface in post-call audits — never blocked before they happen.",
    num: "#f87171",
    dot: "rgba(248,113,113,0.55)",
    card: "border-red-400/[0.15] bg-red-500/[0.02] hover:border-red-400/[0.42] hover:bg-red-500/[0.04] hover:shadow-[0_0_28px_rgba(248,113,113,0.08)]",
  },
  {
    n: "03",
    head: "When RBI asks, there's no answer.",
    body: "No reason codes, no immutable log, no evidence when it matters.",
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
      <section className="px-8 pt-32 pb-20 text-center max-w-4xl mx-auto">
        <Motion>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs tracking-[0.18em] mb-8"
            style={{boxShadow:"0 0 18px rgba(59,130,246,0.22)"}}>
            REAL-TIME DECISIONING INFRASTRUCTURE
          </div>
          <h1 className="text-[34px] md:text-[54px] leading-[1.15] font-semibold tracking-tight mb-6">
            Every credit decision<br />your bank makes, ungoverned.
          </h1>

          <p className="text-[18px] text-white/62 mb-16 max-w-lg mx-auto leading-relaxed">
            ShieldX closes that gap — deciding, executing, and learning from every
            credit conversation, governed end to end.
          </p>
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
          <h2 className="text-[26px] md:text-[42px] font-semibold leading-tight">
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

      {/* ── VIDEO ── */}
      <div className="bg-white/[0.05] border-y border-white/[0.09]">
      <Motion>
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">SEE IT IN 90 SECONDS</span>
            <div className="h-px w-6 bg-white/20" />
          </div>
          <h2 className="text-[26px] md:text-[36px] font-semibold">Watch ShieldX run a live decision.</h2>
        </div>
        <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/[0.10]"
          style={{ paddingBottom: "42%", background: "rgba(0,0,0,0.5)" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube-nocookie.com/embed/sjl9hKDv_3o?controls=1&rel=0&modestbranding=1&color=white"
            title="ShieldX — Live Decision Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
      </Motion>
      </div>{/* ── close VIDEO band ── */}

      {/* ── ONE DECISION SPINE (capabilities + the stages they drive, merged) ── */}
      <Motion>
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <div className="mb-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">ONE DECISION SPINE</span>
            <div className="h-px w-6 bg-white/20" />
          </div>
          <h2 className="text-[26px] md:text-[36px] font-semibold mb-3">Four capabilities. Five stages. One loop.</h2>
          <p className="text-white/58 text-[15px] max-w-md mx-auto leading-relaxed">
            Not four separate products — one decision engine. Hover a capability to
            see which stage of the loop it drives.
          </p>
        </div>
        <SystemLoop />
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
        <h2 className="text-[24px] md:text-[36px] font-semibold mb-3">
          Watch a governed decision run.
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

        <div className="flex items-center justify-center gap-3 mb-8 text-[12px] text-white/35 flex-wrap">
          <span>Live with a leading private-sector bank</span>
          <span className="text-white/15">·</span>
          <span>DPIIT-recognized</span>
          <span className="text-white/15">·</span>
          <span>Mumbai</span>
        </div>

        <h2 className="text-[28px] md:text-[40px] font-semibold mb-4">
          Ready to see it for yourself?
        </h2>
        <p className="text-white/62 mb-8">
          20 minutes. Your portfolio, your channels — every decision and every compliance check, live.
        </p>

        <Link to="/demo"
          className="inline-block bg-white text-black px-10 py-3.5 rounded-lg text-sm font-semibold
            hover:opacity-90 hover:scale-[1.02] transition-all duration-200
            shadow-[0_0_30px_rgba(255,255,255,0.12)]">
          Request a walkthrough
        </Link>

        <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-white/22">
          <span>Tailored to your portfolio</span>
          <span className="text-white/12">·</span>
          <span>India-deployed</span>
          <span className="text-white/12">·</span>
          <span>DPDP Act-ready</span>
        </div>

      </section>
      </Motion>

      <Footer />

    </div>
  );
}
