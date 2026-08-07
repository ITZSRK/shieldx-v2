import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BLUE = "#60a5fa";
const AMBER = "#f59e0b";

function InventoryVisual() {
  const rows = [
    { model: "Collections-PD", owner: "Risk Team", vendor: "In-house", validated: "2026-06-12", risk: "Tier 2" },
    { model: "Contact-Propensity", owner: "Analytics", vendor: "Third-party", validated: "2026-05-30", risk: "Tier 1" },
  ];
  return (
    <div className="rounded-lg border border-white/[0.10] overflow-hidden">
      <div className="grid grid-cols-5 gap-2 px-3 py-2 text-[8px] text-white/35 tracking-wide border-b border-white/[0.08] bg-white/[0.02]">
        <span>MODEL</span><span>OWNER</span><span>VENDOR</span><span>VALIDATED</span><span>RISK</span>
      </div>
      {rows.map(r => (
        <div key={r.model} className="grid grid-cols-5 gap-2 px-3 py-2.5 text-[9.5px] text-white/75 border-b border-white/[0.05] last:border-0">
          <span className="truncate">{r.model}</span>
          <span className="text-white/50 truncate">{r.owner}</span>
          <span className="text-white/50 truncate">{r.vendor}</span>
          <span className="text-white/50">{r.validated}</span>
          <span style={{ color: BLUE }} className="font-medium">{r.risk}</span>
        </div>
      ))}
    </div>
  );
}

function MonitoringVisual() {
  const cohorts = [
    { name: "P1", status: "stable" },
    { name: "P2", status: "stable" },
    { name: "P3", status: "watch" },
  ];

  return (
    <div className="rounded-lg border border-white/[0.10] p-4 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-white/50 tracking-wide">DISTRIBUTION DRIFT</span>
          <span className="text-[8px] text-white/30 tracking-wide">BASELINE vs. CURRENT</span>
        </div>
        <svg viewBox="0 0 120 36" className="w-full h-10">
          <motion.polyline
            points="2,32 20,28 38,13 56,5 74,13 92,28 110,32"
            fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="1.1" strokeDasharray="2.5 2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <motion.polyline
            points="2,34 20,31 38,21 56,7 74,9 92,23 110,32"
            fill="none" stroke={BLUE} strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
          />
        </svg>
      </div>

      <div>
        <div className="text-[9px] text-white/50 tracking-wide mb-2">COHORT STABILITY</div>
        <div className="flex gap-2">
          {cohorts.map(c => (
            <div key={c.name} className="flex-1 rounded-md border px-2 py-1.5 text-center"
              style={{
                borderColor: c.status === "watch" ? `${AMBER}45` : `${BLUE}35`,
                background: c.status === "watch" ? `${AMBER}10` : `${BLUE}0a`,
              }}>
              <div className="text-white/80 text-[10px] font-medium">{c.name}</div>
              <div className="text-[7.5px] tracking-wide mt-0.5" style={{ color: c.status === "watch" ? AMBER : BLUE }}>
                {c.status === "watch" ? "WATCH" : "STABLE"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-white/40 text-[9.5px] leading-relaxed">Outcomes feed back automatically — performance tracked per cohort, not just at launch.</div>
    </div>
  );
}

function EvidenceVisual() {
  const docs = ["Decision Audit Trail", "Version History", "Champion/Challenger Report"];
  return (
    <div className="rounded-lg border border-white/[0.10] p-4 space-y-2">
      {docs.map((d, i) => (
        <motion.div key={d} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          className="flex items-center gap-2 text-[10.5px] text-white/75 rounded-md border border-white/[0.08] bg-white/[0.02] px-3 py-2">
          <span style={{ color: BLUE }}>▤</span> {d}
        </motion.div>
      ))}
      <div className="text-[9.5px] text-white/40 pt-1">→ Exportable on demand for regulatory inspection</div>
    </div>
  );
}

const TIERS = [
  {
    tier: "01",
    name: "Inventory",
    desc: "A model registry for every model touching collections — owner, purpose, vendor, version, last validation, and risk tier — including models that never touch ShieldX.",
    Visual: InventoryVisual,
  },
  {
    tier: "02",
    name: "Monitoring",
    desc: "For scores flowing through ShieldX as inputs: distribution drift, cohort stability, and — because ShieldX captures outcomes — actual predictive performance over time.",
    Visual: MonitoringVisual,
  },
  {
    tier: "03",
    name: "Evidence packs",
    desc: "Challenger comparison reports, decision audit trails, and version histories, exportable as documentation for regulatory inspection. Governance gates feed this automatically.",
    Visual: EvidenceVisual,
  },
];

export default function ModelGovernanceTiers() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => setActive(a => (a + 1) % TIERS.length), 5000);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  function selectTier(i) {
    clearInterval(intervalRef.current);
    setPaused(true);
    setActive(i);
  }

  const t = TIERS[active];
  const Visual = t.Visual;

  return (
    <div className="rounded-2xl border border-blue-400/[0.18] overflow-hidden"
      style={{
        background: "linear-gradient(170deg, rgba(96,165,250,0.05), rgba(0,0,0,0.6) 45%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.5)",
      }}>
      <div className="flex border-b border-white/[0.08]">
        {TIERS.map((tier, i) => {
          const isActive = active === i;
          return (
            <button key={tier.tier}
              onClick={() => selectTier(i)}
              className="flex-1 px-3 py-3.5 text-[12px] font-medium tracking-wide transition-colors duration-300 relative flex items-center justify-center gap-2"
              style={{ color: isActive ? BLUE : "rgba(255,255,255,0.45)", background: isActive ? `${BLUE}12` : "transparent" }}>
              <span className="font-mono text-[10px] opacity-70">{tier.tier}</span>
              <span>{tier.name}</span>
              {isActive && (
                <motion.div layoutId="mrm-underline" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: BLUE, boxShadow: `0 0 8px ${BLUE}` }} />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-7 md:p-9 grid md:grid-cols-2 gap-8 items-center">
        <motion.div key={t.tier + "-desc"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
          <div className="text-white font-medium text-[17px] mb-2.5">{t.name}</div>
          <div className="text-white/58 text-[13.5px] leading-relaxed">{t.desc}</div>
        </motion.div>
        <motion.div key={t.tier + "-visual"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
          <Visual />
        </motion.div>
      </div>
    </div>
  );
}
