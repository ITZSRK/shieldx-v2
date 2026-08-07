import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  { speaker: "Agent",    text: "This is regarding your payment of ₹24,000, currently 42 days overdue." },
  { speaker: "Customer", text: "I lost my job last month, I can't pay the full amount right now.", tag: "HARDSHIP", tagColor: "#f87171" },
  { speaker: "Agent",    text: "I understand. Let's look at some options that could work for you." },
  { speaker: "Customer", text: "I can pay half by next Friday, and the rest in two weeks.", tag: "PROMISE", tagColor: "#4ade80" },
  { speaker: "Agent",    text: "That works. I'll note that and follow up Friday." },
];

const FEATURES = [
  { label: "Hardship claimed", val: "Job loss" },
  { label: "Promise strength", val: "Strong — dated, partial" },
  { label: "Next treatment",   val: "Settlement track, reduced frequency" },
];

export default function TranscriptAnnotator() {
  const [visible, setVisible] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visible >= LINES.length) {
      const t = setTimeout(() => setDone(true), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible(v => v + 1), 1500);
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => { setDone(false); setVisible(0); }, 3200);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <div className="relative rounded-2xl border border-purple-400/[0.18] overflow-hidden"
      style={{
        background: "linear-gradient(200deg, rgba(167,139,250,0.06), rgba(0,0,0,0.6) 50%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.5)",
      }}>
      <div className="absolute inset-x-0 top-0 h-24 opacity-[0.10] pointer-events-none flex items-end gap-[3px] px-4">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="flex-1 bg-purple-300 rounded-t" style={{ height: `${8 + ((i * 53) % 60)}%` }} />
        ))}
      </div>
      <div className="relative px-5 py-2.5 border-b border-white/[0.08] flex items-center justify-between">
        <span className="text-[10px] text-white/35 tracking-wide">RECORDED CALL — TRANSCRIPT</span>
        <span className="text-[9px] text-white/22 tracking-widest">Batch analysis, post-call</span>
      </div>

      <div className="relative p-6 pt-16 min-h-[280px] space-y-3">
        {LINES.map((l, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: i < visible ? 1 : 0, y: i < visible ? 0 : 6 }}
            transition={{ duration: 0.35 }}
            className={`flex ${l.speaker === "Agent" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[75%] rounded-xl px-4 py-2.5 ${l.speaker === "Agent" ? "bg-white/[0.05] border border-white/[0.08]" : "border"}`}
              style={l.speaker === "Customer" ? { background: l.tag ? `${l.tagColor}10` : "rgba(167,139,250,0.06)", borderColor: l.tag ? `${l.tagColor}35` : "rgba(167,139,250,0.25)" } : {}}>
              <div className="text-[10px] text-white/60 font-medium mb-1">{l.speaker}</div>
              <div className="text-white/90 text-[13px] leading-relaxed">{l.text}</div>
              {l.tag && i < visible && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                  className="inline-block mt-2 text-[9px] font-mono font-semibold px-2 py-0.5 rounded"
                  style={{ color: l.tagColor, background: `${l.tagColor}18`, border: `1px solid ${l.tagColor}40` }}>
                  {l.tag}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {done && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/[0.08] px-6 py-5 overflow-hidden">
            <div className="text-[10px] text-purple-300/60 tracking-widest mb-3">→ FEEDS THE NEXT DECISION</div>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {FEATURES.map((f, i) => (
                <motion.div key={f.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                  className="rounded-lg border border-purple-400/25 bg-purple-400/[0.06] px-3.5 py-2.5">
                  <div className="text-[9px] text-purple-300/60 mb-1">{f.label}</div>
                  <div className="text-white/80 text-[11.5px]">{f.val}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
