import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ================= USE CASE DATA ================= */

const USE_CASES = [
  { key:"collections", label:"COLLECTIONS", color:"#f59e0b", bg:"rgba(245,158,11,0.08)"  },
  { key:"lending",     label:"LENDING",     color:"#818cf8", bg:"rgba(129,140,248,0.10)" },
  { key:"servicing",   label:"SERVICING",   color:"#34d399", bg:"rgba(52,211,153,0.08)"  },
];

const VERTICAL_COLORS = {
  Collections: { hex: "#f59e0b", rgb: "245,158,11"  },
  Lending:     { hex: "#818cf8", rgb: "129,140,248" },
  Servicing:   { hex: "#34d399", rgb: "52,211,153"  },
};

const SNAPSHOTS = {
  collections: {
    event:"payment_missed", customer:"CUST-48321",
    dpd:'"30–60 days"', risk:'"0.82 — HIGH"',
    comp:{ trai_window:"PASS", trai_dnd:"CLEAR", dpdp_consent:"PASS", rbi_fpc:"PASS" },
    action:'"VOICE_AI_TRIGGERED"',
  },
  lending: {
    event:"loan_application", customer:"CUST-91042",
    foir:'"34% — within limit"', cibil:'"741 — PRIME"',
    comp:{ rbi_fpc:"PASS", dpdp_consent:"PASS", kyc_master:"PASS" },
    action:'"APPROVED"',
  },
  servicing: {
    event:"grievance_raised", customer:"CUST-73218",
    intent:'"BILLING_DISPUTE"', sla:'"30-day RBI Ombudsman"',
    comp:{ ombudsman_scheme:"PASS", dpdp_rights:"PASS", rbi_charter:"PASS" },
    action:'"GRIEVANCE_QUEUED"',
  },
};

/* ================= LIVE DECISION STREAM ================= */

function LiveDecisionStream() {
  const [ucIdx, setUcIdx] = useState(0);
  const [revealed, setRevealed] = useState(0);

  const keys = {
    collections: ["event","customer","dpd","risk","trai_window","trai_dnd","dpdp_consent","rbi_fpc","action"],
    lending:     ["event","customer","foir","cibil","rbi_fpc","dpdp_consent","kyc_master","action"],
    servicing:   ["event","customer","intent","sla","ombudsman_scheme","dpdp_rights","rbi_charter","action"],
  };
  const snap = SNAPSHOTS[USE_CASES[ucIdx].key];
  const seq  = keys[USE_CASES[ucIdx].key];

  useEffect(() => {
    setRevealed(0);
    const i = setInterval(() => {
      setRevealed(r => {
        if (r >= seq.length - 1) return r;
        return r + 1;
      });
    }, 340);
    return () => clearInterval(i);
  }, [ucIdx]);

  useEffect(() => {
    const t = setTimeout(() => {
      setUcIdx(p => (p + 1) % USE_CASES.length);
    }, 5200);
    return () => clearTimeout(t);
  }, [ucIdx]);

  const compKeys = ["trai_window","trai_dnd","dpdp_consent","rbi_fpc","ombudsman_scheme","dpdp_rights","rbi_charter","kyc_master"];
  const isComp = k => compKeys.includes(k);
  const isAction = k => k === "action";

  const getValue = k => {
    if (isComp(k)) return snap.comp?.[k];
    return snap[k];
  };

  const fmtVal = (k, v) => {
    if (!v) return null;
    if (v === "PASS" || v === "CLEAR" || v === "APPROVED") return { text:`"${v}"`, color:"#4ade80" };
    if (v === "BLOCKED") return { text:`"${v}"`, color:"#f87171" };
    if (isAction(k)) return { text: v, color:"#93c5fd" };
    return { text: typeof v === "string" && v.startsWith('"') ? v : `"${v}"`, color:"rgba(255,255,255,0.72)" };
  };

  const rows = seq.map((k, idx) => {
    const v = getValue(k);
    const fmt = fmtVal(k, v);
    const isActive = idx === revealed;
    const isPast   = idx < revealed;
    const keyColor = isActive ? "#93c5fd" : isPast ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.18)";
    return { k, fmt, isActive, isPast, keyColor };
  }).filter(r => r.fmt);

  return (
    <div className="border border-white/10 rounded-xl bg-black/60 overflow-hidden font-mono text-xs">
      <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="flex-1 text-center text-white/62 text-[10px] tracking-[0.15em]">shieldx — decision runtime</span>
        <div className="flex items-center gap-1.5 text-[10px] text-blue-400">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* tabs */}
      <div className="flex border-b border-white/[0.06]">
        {USE_CASES.map((uc, i) => (
          <button key={uc.key} onClick={() => setUcIdx(i)}
            className="px-4 pt-2 pb-1.5 text-[10px] tracking-widest transition-all duration-150 border-r border-white/[0.06] relative"
            style={{
              color:      i===ucIdx ? uc.color : "rgba(255,255,255,0.38)",
              background: i===ucIdx ? uc.bg    : "transparent",
              fontWeight: i===ucIdx ? "600"    : "400",
            }}>
            {uc.label}
            {i===ucIdx && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: uc.color, opacity: 0.75 }} />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={ucIdx} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.2}}
          className="px-5 py-4 space-y-[5px]">
          <div style={{color:"rgba(255,255,255,0.22)"}}>{"{"}</div>
          {rows.map(({k, fmt, isActive, keyColor}) => (
            <div key={k} className="pl-4 flex gap-2">
              <span style={{color:keyColor}}>{`"${k}":`}</span>
              <span style={{color: isActive ? fmt.color : fmt.color}}>{fmt.text}</span>
            </div>
          ))}
          <div style={{color:"rgba(255,255,255,0.22)"}}>{"}"}</div>
        </motion.div>
      </AnimatePresence>

      <div className="border-t border-white/[0.07] px-4 py-2 flex justify-between text-[10px]">
        <span className="text-white/22">reason codes attached · audit_id logged · immutable</span>
        <span className="text-emerald-400/60">Compliant ✓</span>
      </div>
    </div>
  );
}

/* ================= GOVERNANCE COVERAGE MATRIX ================= */

function GovernanceCoverage() {
  const [hRow, setHRow] = useState(null);
  const [autoRow, setAutoRow] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-120px" });

  useEffect(() => {
    if (!isInView) return;
    const i = setInterval(() => setAutoRow(r => (r + 1) % 3), 1800);
    return () => clearInterval(i);
  }, [isInView]);

  const activeRow = hRow !== null ? hRow : autoRow;

  const cols = ["Signal", "Decision", "Compliance", "Execution", "Audit"];
  const rows = [
    {
      uc: "Collections",
      cells: [
        "CBS payment_missed trigger",
        "DPD bucket + risk score",
        "TRAI window · DND · DPDP consent · RBI FPC",
        "Voice AI · SMS · Human agent",
        "Immutable log per contact",
      ],
    },
    {
      uc: "Lending",
      cells: [
        "LOS application submitted",
        "FOIR · CIBIL · risk model",
        "RBI FPC · DPDPA 2025 · DPDP consent · KYC",
        "Approval or rejection notice",
        "Decision payload + reason codes",
      ],
    },
    {
      uc: "Servicing",
      cells: [
        "CRM grievance or enquiry",
        "Intent classification",
        "RBI Ombudsman SLA · DPDP rights · Charter",
        "Resolution routing · human handoff",
        "SLA-tracked log entry",
      ],
    },
  ];

  const compIdx = 2;

  return (
    <div ref={ref}>
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">GOVERNANCE COVERAGE</span>
            <div className="h-px w-6 bg-white/20" />
          </div>
        <h2 className="text-[22px] md:text-[32px] font-semibold mb-3">What ShieldX covers — end to end.</h2>
        <p className="text-white/65 max-w-xl mx-auto text-sm leading-relaxed">
          Every vertical flows through the same five-stage pipeline. The rules change per workflow. The control architecture does not.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.07] overflow-hidden">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr style={{background:"rgba(255,255,255,0.025)"}}>
              <th className="text-left px-5 py-3.5 text-white/30 tracking-widest font-normal text-[10px] w-[130px] border-b border-white/[0.07]">VERTICAL</th>
              {cols.map((c, i) => (
                <th key={c}
                  className="px-4 py-3.5 font-normal tracking-widest text-[10px] border-b border-white/[0.07] text-center"
                  style={{ color: i===compIdx ? "rgba(74,222,128,0.55)" : "rgba(255,255,255,0.32)" }}
                >{c.toUpperCase()}{i===compIdx && <span className="ml-1 text-emerald-400/40">✓</span>}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const isActive = ri === activeRow;
              return (
                <motion.tr key={row.uc}
                  onMouseEnter={() => setHRow(ri)}
                  onMouseLeave={() => setHRow(null)}
                  className="cursor-default border-t transition-colors duration-300"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                  animate={{ background: isActive ? `rgba(${VERTICAL_COLORS[row.uc].rgb},0.05)` : "transparent" }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? VERTICAL_COLORS[row.uc].hex : "rgba(255,255,255,0.15)",
                          boxShadow: isActive ? `0 0 6px ${VERTICAL_COLORS[row.uc].hex}cc` : "none",
                        }}/>
                      <span className="text-[11px] font-medium tracking-widest transition-colors duration-300"
                        style={{ color: isActive ? VERTICAL_COLORS[row.uc].hex : "rgba(255,255,255,0.4)" }}>
                        {row.uc.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  {row.cells.map((cell, ci) => (
                    <td key={ci}
                      className="px-4 py-5 text-center text-[11px] leading-relaxed transition-all duration-300"
                      style={{
                        background: ci===compIdx && isActive ? "rgba(74,222,128,0.05)" : "transparent",
                        color: ci===compIdx
                          ? (isActive ? "rgba(74,222,128,0.9)" : "rgba(74,222,128,0.38)")
                          : (isActive ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.3)"),
                        borderLeft:  ci===compIdx ? "1px solid rgba(74,222,128,0.1)" : "none",
                        borderRight: ci===compIdx ? "1px solid rgba(74,222,128,0.1)" : "none",
                        fontWeight: isActive ? 400 : 300,
                      }}
                    >{cell}</td>
                  ))}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] text-white/28 px-1">
        <span style={{color:"rgba(74,222,128,0.5)"}}>■</span>
        Compliance = hard gate — execution blocked if any check fails · Rows auto-cycle on scroll
      </div>
    </div>
  );
}

/* ================= EXECUTION LOG ================= */

const LOG_STREAM = [
  { t:"09:14:02.003", uc:"COLLECTIONS", c:"CUST-48321", ev:"payment_missed",   comp:"PASS", action:"voice_ai_triggered",     ok:true  },
  { t:"09:14:02.041", uc:"LENDING",     c:"CUST-91042", ev:"loan_application",  comp:"PASS", action:"approval_notice_sent",   ok:true  },
  { t:"09:14:02.078", uc:"SERVICING",   c:"CUST-73218", ev:"grievance_raised",  comp:"PASS", action:"grievance_queued",        ok:true  },
  { t:"09:14:02.519", uc:"COLLECTIONS", c:"CUST-22917", ev:"payment_missed",   comp:"BLOCK",action:"trai_dnd_violation",      ok:false },
  { t:"09:14:02.681", uc:"LENDING",     c:"CUST-50034", ev:"loan_application",  comp:"PASS", action:"rejection_notice_sent",  ok:true  },
  { t:"09:14:02.847", uc:"SERVICING",   c:"CUST-64502", ev:"hardship_request",  comp:"PASS", action:"restructure_triggered",  ok:true  },
  { t:"09:14:03.112", uc:"COLLECTIONS", c:"CUST-31108", ev:"payment_missed",   comp:"PASS", action:"sms_triggered",           ok:true  },
  { t:"09:14:03.290", uc:"LENDING",     c:"CUST-78809", ev:"loan_application",  comp:"PASS", action:"approval_notice_sent",   ok:true  },
  { t:"09:14:03.455", uc:"SERVICING",   c:"CUST-10024", ev:"dispute_raised",    comp:"PASS", action:"bureau_dispute_filed",   ok:true  },
];

const UC_COLORS = {
  COLLECTIONS: "#f59e0b",
  LENDING:     "#818cf8",
  SERVICING:   "#34d399",
};

function ExecutionLog() {
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const i = setInterval(() => {
      setVisible(v => v >= LOG_STREAM.length ? 4 : v + 1);
    }, 620);
    return () => clearInterval(i);
  }, []);

  const shown = LOG_STREAM.slice(0, visible);

  return (
    <div>
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">EXECUTION LOG</span>
            <div className="h-px w-6 bg-white/20" />
          </div>
        <h2 className="text-[22px] md:text-[32px] font-semibold mb-3">Three verticals. One governed pipeline.</h2>
        <p className="text-white/65 max-w-xl mx-auto text-sm leading-relaxed">
          Collections, lending, and servicing decisions execute simultaneously — each checked, each logged, each explainable.
        </p>
      </div>

      <div className="border border-white/10 rounded-xl bg-black/60 overflow-hidden font-mono text-[11px]">
        <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="flex-1 text-center text-white/62 text-[10px] tracking-[0.15em]">shieldx — governance execution stream</span>
          <div className="flex items-center gap-1.5 text-[10px] text-blue-400">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            LIVE
          </div>
        </div>

        <div className="px-0 py-1">
          {/* header row */}
          <div className="grid grid-cols-[140px_110px_110px_1fr_80px_1fr] gap-2 px-4 py-1.5 text-[10px] text-white/22 tracking-widest border-b border-white/[0.05]">
            <span>TIMESTAMP</span>
            <span>VERTICAL</span>
            <span>CUSTOMER</span>
            <span>EVENT</span>
            <span>COMP</span>
            <span>ACTION</span>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {shown.map((row, i) => (
              <motion.div key={i}
                initial={{opacity:0, x:-8}} animate={{opacity:1, x:0}} transition={{duration:.25}}
                className="grid grid-cols-[140px_110px_110px_1fr_80px_1fr] gap-2 px-4 py-2 items-center hover:bg-white/[0.02] transition-colors duration-100"
              >
                <span className="text-white/28">{row.t}</span>
                <span style={{color: UC_COLORS[row.uc]}}>{row.uc}</span>
                <span className="text-white/65">{row.c}</span>
                <span className="text-white/55">{row.ev}</span>
                <span style={{color: row.ok ? "#4ade80" : "#f87171", fontWeight:500}}>
                  {row.comp}
                </span>
                <span style={{color: row.ok ? "rgba(255,255,255,0.55)" : "rgba(248,113,113,0.6)"}}>
                  {row.action}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.07] px-4 py-2 flex justify-between text-[10px]">
          <span className="text-white/22">{shown.length} decisions executed · {shown.filter(r=>r.ok).length} compliant · {shown.filter(r=>!r.ok).length} blocked</span>
          <span className="text-white/30">Every row written to immutable audit log</span>
        </div>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function Solutions() {
  const [hoveredCard, setHoveredCard] = useState(null);
  return (
    <Layout>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 pt-[120px] pb-16 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs tracking-[0.18em] mb-8"
            style={{boxShadow:"0 0 18px rgba(59,130,246,0.22)"}}>
            SOLUTIONS
          </div>
          <h1 className="text-[32px] md:text-[48px] font-semibold leading-[1.06] mb-5">
            Three verticals.<br />
            <span className="text-white/68">One governed</span><br />
            decision layer.
          </h1>
          <p className="text-white/68 leading-relaxed mb-8 max-w-md text-[15px]">
            Collections, lending, and servicing — each a distinct workflow,
            each running through the same five-stage decision pipeline.
            Every signal evaluated. Every action compliant before it executes.
          </p>
          <div className="flex flex-wrap gap-2">
            {["RBI Fair Practices Code","TRAI Guidelines","DPDPA 2025"].map((t,i) => (
              <span key={i} className="text-[10px] px-3 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/[0.06] text-blue-300/70 tracking-wide"
                style={{boxShadow:"0 0 10px rgba(59,130,246,0.12)"}}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <LiveDecisionStream />
      </section>

      {/* GOVERNANCE COVERAGE */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <GovernanceCoverage />
      </section>

      {/* EXECUTION LOG */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-28">
        <ExecutionLog />
      </section>

      {/* USE CASE HUBS */}
      <section className="max-w-6xl mx-auto px-8 pb-32">
        <div className="text-[10px] text-white/65 tracking-[0.2em] mb-6">EXPLORE BY VERTICAL</div>
        <h3 className="text-[28px] font-semibold mb-10">Go deeper into each workflow.</h3>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {[
            {
              to: "/collections", label: "Collections", tag: "COLLECTIONS",
              desc: "Channel scoring, TRAI DND checks, DPDP consent validation, and RBI FPC-aligned contact strategy governed per customer — before every outreach.",
              stats: [{ v:"6", l:"Compliance checks" }, { v:"TRAI + DPDP", l:"Frameworks enforced" }],
              hex: "#f59e0b", rgb: "245,158,11",
            },
            {
              to: "/lending", label: "Lending", tag: "LENDING",
              desc: "FOIR, bureau pull, risk model, and RBI FPC checks run in sequence — rejection communication and audit trail generated automatically.",
              stats: [{ v:"3", l:"Bureaus checked" }, { v:"100%", l:"Rejection notice coverage" }],
              hex: "#818cf8", rgb: "129,140,248",
            },
            {
              to: "/servicing", label: "Servicing", tag: "SERVICING",
              desc: "Intent classified, policy validated, RBI Ombudsman SLA enforced, and grievance routed to the right resolution path on every interaction.",
              stats: [{ v:"30-day", l:"RBI Ombudsman SLA" }, { v:"100%", l:"Grievance coverage" }],
              hex: "#34d399", rgb: "52,211,153",
            },
          ].map((c, i) => (
            <Link key={i} to={c.to}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="block p-7 rounded-xl border transition-all duration-200 hover:scale-[1.018]"
              style={{
                borderColor: hoveredCard === i ? `${c.hex}50` : "rgba(255,255,255,0.07)",
                background:  hoveredCard === i ? `rgba(${c.rgb},0.05)` : "rgba(255,255,255,0.02)",
                boxShadow:   hoveredCard === i ? `0 0 28px rgba(${c.rgb},0.11)` : "none",
              }}
            >
              <div className="text-[10px] tracking-widest mb-4 transition-colors"
                style={{ color: hoveredCard === i ? c.hex : `${c.hex}70` }}>{c.tag}</div>
              <div className="text-white/75 text-[14px] leading-relaxed mb-5">{c.desc}</div>
              <div className="flex gap-5 mb-5">
                {c.stats.map((s, j) => (
                  <div key={j}>
                    <div className="text-base font-semibold" style={{ color: hoveredCard === i ? c.hex : "white" }}>{s.v}</div>
                    <div className="text-[11px] text-white/35">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs transition-colors" style={{ color: `${c.hex}80` }}>Explore {c.label} →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-white/[0.04] border-y border-white/[0.09]">
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-[11px] text-white/55 tracking-[0.22em] mb-5">NEXT STEP</div>
          <h2 className="text-[24px] md:text-[34px] font-semibold mb-4">
            See the platform run a live decision.
          </h2>
          <p className="text-white/62 mb-10 max-w-md mx-auto leading-relaxed">
            20 minutes. The full five-stage pipeline — your context, your questions.
          </p>
          <Link
            to="/demo"
            className="inline-block bg-white text-black px-9 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
          >
            Request a walkthrough
          </Link>
          <div className="mt-6 text-[11px] text-white/28 flex items-center justify-center gap-3">
            <span>Tailored to your scenario</span>
            <span className="text-white/15">·</span>
            <span>India-deployed</span>
            <span className="text-white/15">·</span>
            <span>DPDPA 2025 ready</span>
          </div>
        </motion.div>
      </section>
      </div>

    </Layout>
  );
}
