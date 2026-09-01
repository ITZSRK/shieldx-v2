import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SHIELDX = "#06b6d4";
const OWNER_COLOR = { shieldx: SHIELDX, bank: "#94a3b8", partner: "#f59e0b" };

const PHASE = { SHIELDX: "shieldx", HOP1: "hop1", DELIVERY: "delivery", HOP2: "hop2", CUSTOMER: "customer", FEEDBACK: "feedback", RECEIVED: "received" };

const PATTERNS = [
  {
    letter: "A",
    name: "Your rails, your identity",
    profile: "Tier-one bank — bank-owned handles, DLT templates, own CPaaS contracts",
    deliveryLabel: "Bank's Stack",
    deliveryOwner: "bank",
    groups: [
      { name: "CPaaS Vendor", items: [{ label: "WhatsApp · SMS · Email", sub: "Bank's contract, sender ID & templates" }] },
      { name: "Agency & Contact Center Partners", items: [{ label: "Field & Tele-calling Network", sub: "Bank's existing partner relationships" }] },
    ],
    note: "ShieldX dispatches through it — nothing new to provision.",
    proof: "Full decision visibility. Zero displacement.",
    hop1Label: "API Webhook",
    hop2Label: "Bank Sends",
    feedbackLabel: "Delivery Receipt",
  },
  {
    letter: "B",
    name: "Voice as a governed pool",
    profile: "Bank voice channel with external OBD / tele-calling partners",
    deliveryLabel: "Governed Voice Pool",
    deliveryOwner: "mixed",
    note: "Volume shifts to whichever performs — under the bank's own allocation policy.",
    proof: "Identical scorecard. Never a replacement pitch.",
    hop1Label: "Scorecard Routes",
    hop2Label: "Partner Calls",
    feedbackLabel: "Call Outcome",
  },
  {
    letter: "C",
    name: "Full stack",
    profile: "NBFCs, ARCs, and agencies without pipes of their own",
    deliveryLabel: "ShieldX Stack",
    deliveryOwner: "shieldx",
    deliveryItems: [
      { label: "Engage", sub: "SMS · WhatsApp · Email" },
      { label: "Voice", sub: "Voice execution adapter" },
      { label: "Agency Network", sub: "Work-list orchestration" },
    ],
    note: "Brain and hands — the complete stack, one vendor.",
    proof: "Same platform, same taxonomy, same record.",
    hop1Label: "Internal Handoff",
    hop2Label: "ShieldX Sends",
    feedbackLabel: "Engagement Result",
  },
];

const POOL_STATES = [
  [
    { name: "Partner Vendor A", owner: "partner", pct: 45 },
    { name: "Partner Vendor B", owner: "partner", pct: 35 },
    { name: "ShieldX Voice", owner: "shieldx", pct: 20 },
  ],
  [
    { name: "Partner Vendor A", owner: "partner", pct: 32 },
    { name: "Partner Vendor B", owner: "partner", pct: 28 },
    { name: "ShieldX Voice", owner: "shieldx", pct: 40 },
  ],
];

function patternColor(p) {
  return p.deliveryOwner === "mixed" ? OWNER_COLOR.partner : OWNER_COLOR[p.deliveryOwner];
}

function subCountFor(pattern) {
  if (pattern.groups) return pattern.groups.length;
  if (pattern.deliveryOwner === "mixed") return POOL_STATES[0].length;
  return pattern.deliveryItems.length;
}

function OwnerDot({ owner, size = 6 }) {
  return <span className="inline-block rounded-full shrink-0" style={{ width: size, height: size, background: OWNER_COLOR[owner] }} />;
}

function FlowConnector({ color, label, active }) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0 w-14 md:w-20">
      <span className="text-[6.5px] md:text-[7px] uppercase tracking-widest text-center leading-tight transition-colors duration-300"
        style={{ color: active ? color : "rgba(255,255,255,0.32)" }}>
        {label}
      </span>
      <div className="relative w-full h-[2px] rounded-full overflow-visible transition-colors duration-300"
        style={{ background: active ? `${color}45` : `${color}18` }}>
        {active && (
          <motion.div key={label}
            className="absolute top-1/2 w-1.5 h-1.5 rounded-full -translate-y-1/2"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: "88%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </div>
    </div>
  );
}

function DeliveryNode({ pattern, poolTick, color, phase, subIndex }) {
  const highlighting = phase === PHASE.DELIVERY;

  if (pattern.deliveryOwner === "mixed") {
    const rows = POOL_STATES[poolTick];
    return (
      <div className="w-full space-y-2.5">
        {rows.map((r, i) => {
          const isActive = highlighting && i === subIndex;
          return (
            <motion.div key={r.name} className="text-left rounded-md"
              animate={{ opacity: highlighting && !isActive ? 0.42 : 1, scale: isActive ? 1.03 : 1 }}
              style={isActive ? { boxShadow: `0 0 0 1px ${OWNER_COLOR[r.owner]}50, 0 0 16px ${OWNER_COLOR[r.owner]}30` } : {}}
              transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-1.5 text-[10.5px] text-white/80">
                  <OwnerDot owner={r.owner} /> {r.name}
                </span>
                <span className="text-[10px] font-mono font-semibold" style={{ color: OWNER_COLOR[r.owner] }}>{r.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: OWNER_COLOR[r.owner], boxShadow: `0 0 8px ${OWNER_COLOR[r.owner]}90` }}
                  animate={{ width: `${r.pct}%` }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (pattern.groups) {
    return (
      <div className="w-full space-y-3">
        {pattern.groups.map((g, i) => {
          const isActive = highlighting && i === subIndex;
          return (
            <motion.div key={g.name} animate={{ opacity: highlighting && !isActive ? 0.4 : 1 }} transition={{ duration: 0.3 }}>
              <div className="text-[8px] tracking-widest text-white/35 mb-1.5">{g.name.toUpperCase()}</div>
              <div className="space-y-1.5">
                {g.items.map(item => (
                  <motion.div key={item.label} className="flex items-center gap-2 rounded-md border px-2.5 py-1.5"
                    animate={{
                      borderColor: isActive ? `${color}95` : `${color}45`,
                      backgroundColor: isActive ? `${color}22` : `${color}12`,
                      scale: isActive ? 1.03 : 1,
                    }}
                    style={isActive ? { boxShadow: `0 0 16px ${color}35` } : {}}
                    transition={{ duration: 0.3 }}>
                    <OwnerDot owner={pattern.deliveryOwner} />
                    <div className="min-w-0">
                      <div className="text-white/85 text-[10.5px] font-medium leading-tight">{item.label}</div>
                      <div className="text-white/45 text-[9px] leading-tight">{item.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full space-y-1.5">
      {pattern.deliveryItems.map((item, i) => {
        const isActive = highlighting && i === subIndex;
        return (
          <motion.div key={item.label} className="flex items-center gap-2 rounded-md border px-2.5 py-1.5"
            animate={{
              borderColor: isActive ? `${color}95` : `${color}45`,
              backgroundColor: isActive ? `${color}22` : `${color}12`,
              opacity: highlighting && !isActive ? 0.45 : 1,
              scale: isActive ? 1.03 : 1,
            }}
            style={isActive ? { boxShadow: `0 0 16px ${color}35` } : {}}
            transition={{ duration: 0.3 }}>
            <OwnerDot owner={pattern.deliveryOwner} />
            <div className="min-w-0">
              <div className="text-white/85 text-[10.5px] font-medium leading-tight">{item.label}</div>
              <div className="text-white/45 text-[9px] leading-tight">{item.sub}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function DeploymentSwitchboard() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [poolTick, setPoolTick] = useState(0);
  const [phase, setPhase] = useState(PHASE.SHIELDX);
  const [subIndex, setSubIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => setActive(a => (a + 1) % PATTERNS.length), 7200);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  function selectPattern(i) {
    clearInterval(intervalRef.current);
    setPaused(true);
    setActive(i);
  }

  useEffect(() => {
    if (active !== 1) return;
    const i = setInterval(() => setPoolTick(t => (t + 1) % POOL_STATES.length), 2600);
    return () => clearInterval(i);
  }, [active]);

  // Narrative sequencer: replays the decision → delivery → customer → feedback loop for whichever pattern is active
  useEffect(() => {
    let cancelled = false;
    const timeouts = [];
    const schedule = (fn, delay) => { const id = setTimeout(() => { if (!cancelled) fn(); }, delay); timeouts.push(id); };

    function run() {
      const subCount = subCountFor(PATTERNS[active]);
      setPhase(PHASE.SHIELDX);
      setSubIndex(0);

      let t = 800;
      schedule(() => setPhase(PHASE.HOP1), t);
      t += 850;
      schedule(() => { setPhase(PHASE.DELIVERY); setSubIndex(0); }, t);
      const deliveryStart = t;
      for (let i = 1; i < subCount; i++) {
        schedule(() => setSubIndex(i), deliveryStart + i * 650);
      }
      t = deliveryStart + subCount * 650;
      schedule(() => setPhase(PHASE.HOP2), t);
      t += 850;
      schedule(() => setPhase(PHASE.CUSTOMER), t);
      t += 750;
      schedule(() => setPhase(PHASE.FEEDBACK), t);
      t += 850;
      schedule(() => setPhase(PHASE.RECEIVED), t);
      t += 650;
      schedule(run, t);
    }
    run();

    return () => { cancelled = true; timeouts.forEach(clearTimeout); };
  }, [active]);

  const pattern = PATTERNS[active];
  const color = patternColor(pattern);
  const isShieldXActive = phase === PHASE.SHIELDX || phase === PHASE.RECEIVED;
  const isHop1Active = phase === PHASE.HOP1;
  const isHop2Active = phase === PHASE.HOP2;
  const isCustomerActive = phase === PHASE.CUSTOMER;
  const isFeedbackActive = phase === PHASE.FEEDBACK || phase === PHASE.RECEIVED;

  return (
    <motion.div className="rounded-2xl border overflow-hidden"
      animate={{ borderColor: `${color}35` }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(170deg, rgba(255,255,255,0.04), rgba(0,0,0,0.6) 45%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.5)",
      }}>
      <motion.div className="h-[3px] w-full" animate={{ backgroundColor: color, boxShadow: `0 0 10px ${color}55` }} transition={{ duration: 0.5 }} />

      <div className="flex border-b border-white/[0.08]">
        {PATTERNS.map((p, i) => {
          const c = patternColor(p);
          const isActive = active === i;
          return (
            <button key={p.letter}
              onClick={() => selectPattern(i)}
              className="flex-1 px-3 md:px-4 py-3.5 text-[12px] font-medium tracking-wide transition-colors duration-300 relative flex items-center justify-center gap-2"
              style={{ color: isActive ? c : "rgba(255,255,255,0.45)", background: isActive ? `${c}12` : "transparent" }}>
              <OwnerDot owner={p.deliveryOwner === "mixed" ? "partner" : p.deliveryOwner} size={isActive ? 6 : 5} />
              <span className="font-mono text-[10px] opacity-70">{p.letter}</span>
              <span className="hidden sm:inline">{p.name}</span>
              {isActive && (
                <motion.div layoutId="deploy-underline" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between px-6 pt-4">
        <span className="text-[9px] text-white/30 tracking-widest">{pattern.profile.toUpperCase()}</span>
        <span className="text-[8px] text-white/25 tracking-widest border border-white/[0.12] rounded-full px-2 py-0.5">ILLUSTRATIVE</span>
      </div>

      <div className="p-6 md:p-10 min-h-[300px] flex flex-col justify-center">
        <div className="flex items-center justify-start md:justify-center gap-1.5 md:gap-2.5 overflow-x-auto px-1">
          <motion.div className="rounded-xl border px-3.5 py-4 text-center w-[130px] md:w-[160px] shrink-0"
            animate={{
              borderColor: isShieldXActive ? `${SHIELDX}90` : `${SHIELDX}35`,
              backgroundColor: isShieldXActive ? `${SHIELDX}18` : "rgba(255,255,255,0.015)",
              boxShadow: isShieldXActive ? `0 0 22px ${SHIELDX}38` : "0 0 0px transparent",
              scale: isShieldXActive ? 1.02 : 1,
            }}
            transition={{ duration: 0.35 }}>
            <div className="text-[11px] font-semibold mb-1.5" style={{ color: SHIELDX }}>ShieldX Decides</div>
            <div className="text-white/50 text-[9.5px] leading-relaxed">Account · Treatment<br />Template · Send-time</div>
          </motion.div>

          <FlowConnector color={color} label={pattern.hop1Label} active={isHop1Active} />

          <motion.div className="rounded-xl border px-3.5 py-4 w-[200px] md:w-[230px] shrink-0"
            animate={{
              borderColor: `${color}55`,
              backgroundColor: `${color}14`,
              boxShadow: phase === PHASE.DELIVERY ? `0 0 26px ${color}30` : `0 12px 32px ${color}20`,
            }}
            transition={{ duration: 0.4 }}>
            <motion.div key={pattern.letter}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}>
              <div className="text-[11px] font-semibold mb-2.5 text-center" style={{ color }}>{pattern.deliveryLabel}</div>
              <DeliveryNode pattern={pattern} poolTick={poolTick} color={color} phase={phase} subIndex={subIndex} />
            </motion.div>
          </motion.div>

          <FlowConnector color={color} label={pattern.hop2Label} active={isHop2Active} />

          <motion.div className="rounded-xl border px-3.5 py-4 text-center w-[110px] md:w-[130px] shrink-0"
            animate={{
              borderColor: isCustomerActive ? `${color}90` : "rgba(255,255,255,0.10)",
              backgroundColor: isCustomerActive ? `${color}18` : "rgba(255,255,255,0.02)",
              boxShadow: isCustomerActive ? `0 0 20px ${color}35` : "0 0 0px transparent",
              scale: isCustomerActive ? 1.02 : 1,
            }}
            transition={{ duration: 0.35 }}>
            <div className="text-white/60 text-[11px] font-semibold">Customer</div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-5">
          <motion.svg width="13" height="9" viewBox="0 0 13 9" fill="none"
            animate={{ x: isFeedbackActive ? [0, -3, 0] : 0 }}
            transition={{ duration: 0.8, repeat: isFeedbackActive ? Infinity : 0, ease: "easeInOut" }}>
            <path d="M12 4.5H1M1 4.5L4.5 1M1 4.5L4.5 8" stroke={isFeedbackActive ? color : "rgba(255,255,255,0.22)"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          <motion.span className="text-[9px] tracking-widest uppercase"
            animate={{ color: isFeedbackActive ? color : "rgba(255,255,255,0.28)" }}
            transition={{ duration: 0.3 }}>
            {pattern.feedbackLabel} → next decision
          </motion.span>
        </div>

        <motion.p key={pattern.letter + "-note"}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-white/55 text-[12.5px] text-center leading-relaxed mt-5 max-w-md mx-auto">
          {pattern.note}
        </motion.p>
      </div>

      <motion.div className="border-t px-6 py-4 text-center" animate={{ borderColor: `${color}30` }} transition={{ duration: 0.5 }}>
        <span className="text-[12px] font-medium" style={{ color }}>{pattern.proof}</span>
      </motion.div>
    </motion.div>
  );
}
