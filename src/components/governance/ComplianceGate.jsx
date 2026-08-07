import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EMERALD = "#34d399";
const BLOCKED = "#f87171";

// These are the checks the dispatch gate actually evaluates —
// src/services/ComplianceGate.js, whose rule table constrains attributes to
// exactly FREQUENCY, TIME_OF_DAY and DAY_OF_WEEK_HOLIDAY. Controls handled
// elsewhere in the chain (DND upstream at the institution, conduct detection
// post-call in Intelligence) are described where they happen, not here.
const CHECKS = [
  { label: "Calling Window", desc: "No voice outreach before 8 AM or after 7 PM IST. Configurable per institution." },
  { label: "Day & Holiday Rule", desc: "Sundays and national holidays blocked, evaluated in IST." },
  { label: "Frequency Cap", desc: "Daily contact limits, configurable per product and portfolio." },
  { label: "Suppression List", desc: "Institution-set do-not-contact entries honoured before every send." },
];

const SCENARIOS = [
  {
    id: "CUST-33210",
    result: "cleared",
    payoff: "All checks cleared — decision dispatches inside the permitted window.",
  },
  {
    id: "CUST-59042",
    result: "blocked",
    blockedAt: 1,
    payoff: "Blocked at the calling window — outreach suppressed, re-evaluated at the next valid slot.",
  },
];

function StatusDot({ status }) {
  if (status === "blocked") {
    return (
      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 relative z-10"
        style={{ background: `${BLOCKED}20`, border: `1px solid ${BLOCKED}90` }}>
        <span style={{ color: BLOCKED }} className="text-[9px] leading-none">✕</span>
      </div>
    );
  }
  if (status === "cleared") {
    return (
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 relative z-10"
        style={{ background: `${EMERALD}20`, border: `1px solid ${EMERALD}90` }}>
        <span style={{ color: EMERALD }} className="text-[9px] leading-none">✓</span>
      </motion.div>
    );
  }
  return <div className="w-5 h-5 rounded-full border border-white/[0.14] shrink-0 relative z-10" />;
}

export default function ComplianceGate() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [checkIdx, setCheckIdx] = useState(-1);
  const [done, setDone] = useState(false);

  const scenario = SCENARIOS[scenarioIdx];

  useEffect(() => {
    let cancelled = false;
    const timeouts = [];
    const schedule = (fn, delay) => { const id = setTimeout(() => { if (!cancelled) fn(); }, delay); timeouts.push(id); };

    setCheckIdx(-1);
    setDone(false);
    const stopAt = scenario.result === "blocked" ? scenario.blockedAt : CHECKS.length - 1;
    let t = 550;
    for (let i = 0; i <= stopAt; i++) {
      schedule(() => setCheckIdx(i), t);
      t += 550;
    }
    schedule(() => setDone(true), t + 250);
    schedule(() => setScenarioIdx(s => (s + 1) % SCENARIOS.length), t + 3400);

    return () => { cancelled = true; timeouts.forEach(clearTimeout); };
  }, [scenarioIdx]);

  return (
    <div className="rounded-2xl border overflow-hidden w-full max-w-md mx-auto"
      style={{
        borderColor: `${scenario.result === "blocked" ? BLOCKED : EMERALD}30`,
        background: "linear-gradient(170deg, rgba(52,211,153,0.05), rgba(0,0,0,0.6) 45%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.5)",
      }}>
      <div className="flex items-center justify-between px-5 pt-5">
        <span className="text-[10px] text-white/45 font-mono tracking-widest">{scenario.id}</span>
        <span className="text-[8px] text-white/25 tracking-widest border border-white/[0.12] rounded-full px-2 py-0.5">ILLUSTRATIVE</span>
      </div>

      <div className="px-5 py-5">
        {CHECKS.map((c, i) => {
          const status = i > checkIdx ? "pending" : (scenario.result === "blocked" && i === scenario.blockedAt ? "blocked" : "cleared");
          const isLast = i === CHECKS.length - 1;
          const lineColor = status === "pending" ? "rgba(255,255,255,0.08)" : status === "blocked" ? `${BLOCKED}40` : `${EMERALD}40`;
          return (
            <div key={c.label} className="relative flex gap-3 pb-4 last:pb-0">
              {!isLast && <div className="absolute left-[9px] top-5 bottom-0 w-px" style={{ background: lineColor }} />}
              <StatusDot status={status} />
              <div className="min-w-0 pt-[1px]">
                <div className="text-[12px] font-medium transition-colors duration-300"
                  style={{ color: status === "pending" ? "rgba(255,255,255,0.35)" : status === "blocked" ? BLOCKED : "rgba(255,255,255,0.9)" }}>
                  {c.label}
                </div>
                <div className="text-[10.5px] text-white/40 leading-snug mt-0.5">{c.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 pb-5">
        <motion.div
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 6 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg border px-4 py-3 text-center"
          style={{
            borderColor: `${scenario.result === "blocked" ? BLOCKED : EMERALD}45`,
            background: `${scenario.result === "blocked" ? BLOCKED : EMERALD}12`,
          }}>
          <div className="text-[12px] font-semibold" style={{ color: scenario.result === "blocked" ? BLOCKED : EMERALD }}>
            {scenario.result === "blocked" ? "✕ Decision blocked" : "✓ Decision fires"}
          </div>
          <div className="text-white/55 text-[11px] mt-1">{scenario.payoff}</div>
        </motion.div>
      </div>
    </div>
  );
}
