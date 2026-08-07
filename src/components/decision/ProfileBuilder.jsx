import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCOUNTS = [
  {
    id: "CUST-48321",
    cohort: "P1 · LIVE BOOK",
    cohortColor: "#4ade80",
    fields: [
      { tag: "CBS",    color: "#60a5fa", label: "Core Banking",       value: "Outstanding ₹24,000 · DPD 42" },
      { tag: "BUREAU", color: "#4ade80", label: "Bureau Pull",        value: "3 active loans, no new delinquency" },
      { tag: "AA",     color: "#fbbf24", label: "Account Aggregator", value: "Salary credit detected, monthly" },
      { tag: "GEO",    color: "#a78bfa", label: "Geocoded Address",   value: "Tier-2 city, stable 3+ years" },
    ],
    gauges: [
      { label: "Contactability", level: 4 },
      { label: "Collectability", level: 3 },
    ],
    orchestrated: "SMS + WhatsApp scheduled · 2:00 PM IST",
  },
  {
    id: "CUST-51907",
    cohort: "P3 · WRITE-OFF BOOK",
    cohortColor: "#f87171",
    fields: [
      { tag: "CBS",    color: "#60a5fa", label: "Core Banking",       value: "Outstanding ₹68,000 · DPD 145" },
      { tag: "BUREAU", color: "#4ade80", label: "Bureau Pull",        value: "2 write-offs on file" },
      { tag: "AA",     color: "#fbbf24", label: "Account Aggregator", value: "No recent salary credit" },
      { tag: "GEO",    color: "#a78bfa", label: "Geocoded Address",   value: "Address unverified, high mobility" },
    ],
    gauges: [
      { label: "Contactability", level: 1 },
      { label: "Collectability", level: 1 },
    ],
    orchestrated: "Agency work-list · reduced frequency",
  },
];

const LEVEL_LABEL = ["LOW", "LOW", "MEDIUM", "HIGH", "HIGH"];

export default function ProfileBuilder() {
  const [acctIdx, setAcctIdx] = useState(0);
  const [phase, setPhase] = useState(0);

  const acct = ACCOUNTS[acctIdx];
  const FIELD_COUNT = acct.fields.length;
  const totalPhases = FIELD_COUNT + 4; // fields, gauges, cohort, orchestrated, hold

  useEffect(() => {
    const delay = phase === 0 ? 500 : phase <= FIELD_COUNT ? 700 : phase === totalPhases ? 2400 : 850;
    const t = setTimeout(() => {
      if (phase >= totalPhases) {
        setAcctIdx(a => (a + 1) % ACCOUNTS.length);
        setPhase(0);
      } else {
        setPhase(p => p + 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [phase, totalPhases, FIELD_COUNT]);

  const fieldsShown = Math.min(phase, FIELD_COUNT);
  const gaugesActive = phase > FIELD_COUNT;
  const cohortShown = phase > FIELD_COUNT + 1;
  const orchestratedShown = phase > FIELD_COUNT + 2;

  return (
    <div className="relative rounded-2xl border border-blue-400/[0.15] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(96,165,250,0.06), rgba(0,0,0,0.6) 40%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.5)",
      }}>
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #60a5fa 1px, transparent 1px), linear-gradient(to bottom, #60a5fa 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
      <div className="relative grid md:grid-cols-2 gap-0">

        {/* LEFT — assembling record */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-white/[0.08]">
          <div className="flex items-center justify-between mb-6">
            <AnimatePresence mode="wait">
              <motion.span key={acct.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-[11px] text-white/65 font-mono tracking-widest">{acct.id}</motion.span>
            </AnimatePresence>
            <AnimatePresence>
              {cohortShown && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: -4 }}
                  className="text-[10px] font-mono font-bold px-2.5 py-1 rounded border"
                  style={{ borderColor: `${acct.cohortColor}80`, background: `${acct.cohortColor}18`, color: acct.cohortColor }}>
                  {acct.cohort}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-3 min-h-[200px]">
            {acct.fields.map((f, i) => (
              <motion.div key={`${acct.id}-${f.tag}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: i < fieldsShown ? 1 : 0, x: i < fieldsShown ? 0 : -12 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5">
                <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded shrink-0"
                  style={{ color: f.color, background: `${f.color}18`, border: `1px solid ${f.color}40` }}>
                  {f.tag}
                </span>
                <div className="min-w-0">
                  <div className="text-white/85 text-[12px] font-medium">{f.label}</div>
                  <div className="text-white/60 text-[11px] truncate">{f.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {orchestratedShown && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 text-[11px] text-white/50">
                <span className="text-blue-300/70">→ Orchestrated:</span> {acct.orchestrated}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — gauges */}
        <div className="p-8 flex flex-col justify-center gap-8">
          {acct.gauges.map(g => (
            <div key={g.label}>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-white/70 text-[13px] font-medium">{g.label}</span>
                <span className="text-[10px] font-mono" style={{ color: gaugesActive ? acct.cohortColor : "rgba(255,255,255,0.25)" }}>
                  {gaugesActive ? LEVEL_LABEL[g.level] : "—"}
                </span>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.div key={i}
                    className="h-2 flex-1 rounded-full"
                    animate={{
                      background: gaugesActive && i <= g.level ? acct.cohortColor : "rgba(255,255,255,0.08)",
                      boxShadow: gaugesActive && i <= g.level ? `0 0 10px ${acct.cohortColor}70` : "none",
                    }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                  />
                ))}
              </div>
            </div>
          ))}
          <p className="text-white/40 text-[11px] leading-relaxed mt-2">
            Two vectors, not one risk number — computed independently, then combined with the cohort tag to select treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
