import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHANNELS = [
  { id: "sms",   label: "SMS / WhatsApp" },
  { id: "agency", label: "Agency" },
  { id: "voice", label: "Diya — Voice AI" },
];

const LANGS = [
  { name: "Hindi",    sample: "आपका भुगतान बकाया है" },
  { name: "Tamil",    sample: "உங்கள் கட்டணம் நிலுவையில் உள்ளது" },
  { name: "Telugu",   sample: "మీ చెల్లింపు బాకీ ఉంది" },
  { name: "Kannada",  sample: "ನಿಮ್ಮ ಪಾವತಿ ಬಾಕಿ ಇದೆ" },
  { name: "Marathi",  sample: "तुमचे पेमेंट थकीत आहे" },
  { name: "Bengali",  sample: "আপনার পেমেন্ট বকেয়া আছে" },
];

function SmsMock() {
  return (
    <div className="max-w-xs mx-auto">
      <div className="rounded-2xl border border-white/[0.12] bg-black/40 p-4">
        <div className="text-[10px] text-white/55 mb-3 tracking-wide">FROM: BANK-ALRT</div>
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-2xl rounded-tl-sm bg-[#fbbf24]/[0.12] border border-[#fbbf24]/30 px-4 py-3 text-[12px] text-white/85 leading-relaxed">
          Your payment of ₹24,000 is due. Reply PAY to settle via UPI, or call us to discuss options.
        </motion.div>
        <div className="text-[9px] text-white/25 mt-2 text-right">Sent under the bank's own sender ID</div>
      </div>
    </div>
  );
}

function AgencyMock() {
  const rows = [
    { acct: "CUST-48321", dpd: "42", amt: "₹24,000", status: "ASSIGNED" },
    { acct: "CUST-48117", dpd: "31", amt: "₹11,500", status: "ASSIGNED" },
    { acct: "CUST-47902", dpd: "58", amt: "₹52,000", status: "IN PROGRESS" },
  ];
  return (
    <div className="max-w-md mx-auto rounded-xl border border-white/[0.12] bg-black/40 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/[0.08] text-[10px] text-white/55 tracking-wide flex justify-between">
        <span>WORK-LIST — SFTP PUSH</span>
        <span className="text-[#fbbf24]/85">3 accounts</span>
      </div>
      {rows.map((r, i) => (
        <motion.div key={r.acct}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}
          className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05] last:border-0 text-[11px]">
          <span className="text-white/85 font-mono">{r.acct}</span>
          <span className="text-white/55">DPD {r.dpd}</span>
          <span className="text-white/85">{r.amt}</span>
          <span className="text-[9px] px-2 py-0.5 rounded" style={{ color: "#fbbf24", background: "#fbbf2418" }}>{r.status}</span>
        </motion.div>
      ))}
    </div>
  );
}

function VoiceMock() {
  const [lang, setLang] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setLang(l => (l + 1) % LANGS.length), 2400);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="max-w-sm mx-auto text-center">
      <div className="flex items-end justify-center gap-1 h-16 mb-5">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div key={i}
            className="w-1.5 rounded-full"
            style={{ background: "#fbbf24" }}
            animate={{ height: [6, 10 + ((i * 37) % 40), 6] }}
            transition={{ duration: 0.9 + (i % 5) * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={lang}
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/85 text-[15px] mb-4 min-h-[24px]">
          {LANGS[lang].sample}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-2">
        {LANGS.map((l, i) => (
          <span key={l.name} className="text-[10px] px-2.5 py-1 rounded-full border transition-all duration-300"
            style={{
              borderColor: i === lang ? "#fbbf2480" : "rgba(255,255,255,0.10)",
              background: i === lang ? "#fbbf2420" : "transparent",
              color: i === lang ? "#fbbf24" : "rgba(255,255,255,0.35)",
            }}>
            {l.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ChannelSwitchboard() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const i = setInterval(() => setActive(a => (a + 1) % CHANNELS.length), 3800);
    return () => clearInterval(i);
  }, [paused]);

  return (
    <div className="rounded-xl border border-amber-400/[0.18] overflow-hidden"
      style={{
        background: "linear-gradient(160deg, rgba(251,191,36,0.05), rgba(0,0,0,0.6) 45%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.5)",
      }}>
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, transparent, #fbbf24aa, transparent)" }} />
      <div className="flex border-b border-white/[0.08]">
        {CHANNELS.map((c, i) => (
          <button key={c.id}
            onClick={() => { setActive(i); setPaused(true); }}
            className="flex-1 px-4 py-3.5 text-[12px] font-medium tracking-wide transition-all duration-200 relative"
            style={{ color: active === i ? "#fbbf24" : "rgba(255,255,255,0.45)" }}>
            {c.label}
            {active === i && (
              <motion.div layoutId="switchboard-underline" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "#fbbf24" }} />
            )}
          </button>
        ))}
      </div>

      <div className="p-10 min-h-[220px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} className="w-full">
            {active === 0 && <SmsMock />}
            {active === 1 && <AgencyMock />}
            {active === 2 && <VoiceMock />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
