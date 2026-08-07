import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LIVE_SUGGESTIONS = [
  "Customer mentioned reduced income. Offer a 3-month settlement plan before discussing full payment.",
  "Customer agreed to partial payment. Confirm the amount and log a promise-to-pay for Friday.",
];

export default function AssistToggle() {
  const [mode, setMode] = useState("live"); // "live" | "context"
  const [degrading, setDegrading] = useState(false);
  const [userTouched, setUserTouched] = useState(false);
  const [liveTick, setLiveTick] = useState(0);

  // auto-demo: live guidance updates once, then a dropped connection degrades to Context
  useEffect(() => {
    if (userTouched || mode !== "live") return;
    setLiveTick(0);
    const t1 = setTimeout(() => setLiveTick(1), 2100);
    const t2 = setTimeout(() => {
      setDegrading(true);
      setTimeout(() => { setMode("context"); setDegrading(false); }, 900);
    }, 4600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [mode, userTouched]);

  useEffect(() => {
    if (!userTouched) return;
    const t = setTimeout(() => setUserTouched(false), 8000);
    return () => clearTimeout(t);
  }, [userTouched]);

  return (
    <div className="rounded-[28px] border border-emerald-400/[0.18] overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 20%, rgba(74,222,128,0.08), rgba(0,0,0,0.6) 60%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.5)",
      }}>

      {/* toggle */}
      <div className="flex items-center justify-center gap-4 py-6 border-b border-white/[0.08]">
        <span className="text-[12px] font-medium transition-colors" style={{ color: mode === "live" ? "#4ade80" : "rgba(255,255,255,0.35)" }}>
          Assist Live
        </span>
        <button
          onClick={() => { setUserTouched(true); setMode(m => m === "live" ? "context" : "live"); }}
          className="relative w-14 h-7 rounded-full border transition-colors duration-300"
          style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="absolute top-1 w-5 h-5 rounded-full"
            style={{ background: mode === "live" ? "#4ade80" : "#93c5fd", boxShadow: `0 0 10px ${mode === "live" ? "#4ade8090" : "#93c5fd90"}` }}
            animate={{ left: mode === "live" ? 4 : 30 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </button>
        <span className="text-[12px] font-medium transition-colors" style={{ color: mode === "context" ? "#93c5fd" : "rgba(255,255,255,0.35)" }}>
          Assist Context
        </span>
      </div>

      {/* mock agent screen */}
      <div className="p-8 min-h-[280px] relative">
        <AnimatePresence>
          {degrading && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-red-400 text-[11px] tracking-widest mb-2 animate-pulse">CONNECTION LOST</div>
                <div className="text-white/50 text-[11px]">Degrading to Assist Context — never to blank</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-md mx-auto rounded-xl border border-white/[0.10] bg-black/40 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/[0.08] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: mode === "live" ? "#4ade80" : "#93c5fd" }} />
            <span className="text-[10px] text-white/65 tracking-wide">CUST-48321 · Priya S. · Agent: Rihaan</span>
          </div>

          <AnimatePresence mode="wait">
            {mode === "live" ? (
              <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5">
                <div className="text-[10px] text-emerald-400/70 tracking-widest mb-3">● LIVE — {liveTick === 0 ? "00:47" : "01:32"}</div>
                <AnimatePresence mode="wait">
                  <motion.div key={liveTick} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="rounded-lg border border-emerald-400/25 bg-emerald-400/[0.06] p-3.5">
                    <div className="text-[9px] text-emerald-400/60 tracking-widest mb-1.5">SUGGESTED — LIVE</div>
                    <div className="text-white/85 text-[12px] leading-relaxed">{LIVE_SUGGESTIONS[liveTick]}</div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div key="context" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5">
                <div className="text-[10px] text-blue-300/70 tracking-widest mb-3">PRE-CALL BRIEFING</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[12px]"><span className="text-white/40">Risk tier</span><span className="text-white/80">HIGH</span></div>
                  <div className="flex justify-between text-[12px]"><span className="text-white/40">DPD</span><span className="text-white/80">30–60</span></div>
                  <div className="flex justify-between text-[12px]"><span className="text-white/40">Suggested opening</span><span className="text-white/80 text-right max-w-[60%]">Hardship-aware, offer settlement</span></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
