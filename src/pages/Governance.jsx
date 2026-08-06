import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

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

/* Conduct compliance — migrated from the retired Collections page */
const CONDUCT = [
  { label: "TRAI Calling Window",      desc: "No outreach before 8 AM or after 7 PM IST. Enforced automatically per TRAI guidelines on telecom communications. No manual override permitted." },
  { label: "TRAI DND",                 desc: "Real-time check against TRAI's Do Not Disturb registry before every contact attempt. Numbers registered on DND are blocked before execution." },
  { label: "RBI Fair Practices Code",  desc: "Recovery practices governed per RBI circular on Fair Practices Code for Lenders. No coercive recovery. Grievance escalation paths enforced as mandated." },
  { label: "RBI Recovery Agent Rules", desc: "Outreach governed per RBI guidelines on recovery agent conduct. Communication restricted to respectful, regulated interactions only." },
  { label: "DPDP Act, 2023",           desc: "Channel-level consent verified per the Digital Personal Data Protection Act, 2023 before any AI-driven communication is triggered." },
  { label: "Frequency Caps",           desc: "Per-customer, per-product daily and weekly outreach limits enforced automatically per applicable RBI and TRAI guidelines — no manual rule management required." },
];

/* Model governance — RBI draft MRM */
const MRM_TIERS = [
  {
    tier: "Tier 1",
    name: "Inventory",
    desc: "A model registry for every model touching collections — owner, purpose, vendor, version, last validation, and risk tier — including models that never touch ShieldX.",
  },
  {
    tier: "Tier 2",
    name: "Monitoring",
    desc: "For scores flowing through ShieldX as inputs: distribution drift, cohort stability, and — because ShieldX captures outcomes — actual predictive performance over time.",
  },
  {
    tier: "Tier 3",
    name: "Evidence packs",
    desc: "Challenger comparison reports, decision audit trails, and version histories, exportable as documentation for regulatory inspection. Governance gates feed this automatically.",
  },
];

export default function Governance() {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-8 pt-[120px] pb-16 text-center">
        <Motion>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 text-xs tracking-[0.18em] mb-8"
            style={{boxShadow:"0 0 18px rgba(52,211,153,0.22)"}}>
            GOVERNANCE
          </div>
          <h1 className="text-[32px] md:text-[50px] leading-[1.08] font-semibold mb-6">
            Conduct compliance.<br />Model governance.
          </h1>
          <p className="text-white/62 text-[17px] max-w-2xl mx-auto leading-relaxed">
            Every decision is validated against applicable regulation before it fires —
            and every model behind that decision is inventoried, monitored, and explainable
            on demand.
          </p>
        </Motion>
      </section>

      {/* CONDUCT COMPLIANCE */}
      <section className="max-w-6xl mx-auto px-8 pb-24">
        <Motion>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-0.5 h-4 rounded-full bg-emerald-400/45" />
            <span className="text-[11px] text-white/55 tracking-[0.2em]">CONDUCT COMPLIANCE</span>
          </div>
          <h2 className="text-[24px] md:text-[32px] font-semibold mb-3">Enforced before any action fires.</h2>
          <p className="text-white/62 mb-10 max-w-xl">Every outreach decision is validated against applicable regulations before execution. Nothing fires without passing every check.</p>
        </Motion>
        <div className="grid md:grid-cols-2 gap-3">
          {CONDUCT.map((c, i) => (
            <Motion key={i} delay={i * 0.05}>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.10] bg-white/[0.04]
                hover:border-emerald-400/28 hover:bg-white/[0.04] transition-all duration-200 cursor-default group">
                <div className="w-7 h-7 rounded-lg border border-emerald-400/20 bg-emerald-500/[0.06] flex items-center justify-center flex-shrink-0
                  group-hover:border-emerald-400/40 group-hover:bg-emerald-500/[0.10] transition-all duration-200">
                  <span className="text-emerald-400/55 text-xs group-hover:text-emerald-400/80 transition-colors">✓</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white/88 mb-1.5">{c.label}</div>
                  <div className="text-[12px] text-white/62 leading-relaxed">{c.desc}</div>
                </div>
              </div>
            </Motion>
          ))}
        </div>
      </section>

      {/* MODEL GOVERNANCE */}
      <div className="bg-white/[0.05] border-y border-white/[0.09]">
        <section className="max-w-6xl mx-auto px-8 py-24">
          <Motion>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-0.5 h-4 rounded-full bg-blue-400/45" />
              <span className="text-[11px] text-white/55 tracking-[0.2em]">MODEL GOVERNANCE</span>
            </div>
            <h2 className="text-[24px] md:text-[32px] font-semibold mb-3">Designed for RBI's draft Model Risk Management framework.</h2>
            <p className="text-white/62 mb-12 max-w-2xl leading-relaxed">
              RBI's draft Model Risk Management guidance covers decisioning systems — including
              rule engines and third-party models — and calls for inventory, validation,
              documentation, a Three Lines of Defense structure, and fairness testing. ShieldX
              ships the platform capability this requires: decision audit trails, versioned
              rules and strategies, champion/challenger evidence, and explainability by design.
            </p>
          </Motion>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {MRM_TIERS.map((t, i) => (
              <Motion key={t.tier} delay={i * 0.08}>
                <div className="rounded-xl border border-white/[0.10] bg-white/[0.03] p-6 h-full hover:border-blue-400/25 hover:bg-white/[0.05] transition-all duration-200">
                  <div className="text-[10px] text-blue-300/60 tracking-widest mb-2">{t.tier.toUpperCase()}</div>
                  <div className="text-white font-medium mb-3">{t.name}</div>
                  <div className="text-white/58 text-sm leading-relaxed">{t.desc}</div>
                </div>
              </Motion>
            ))}
          </div>

          <Motion>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 text-[13px] text-white/45 leading-relaxed max-w-3xl">
              Model registry and drift monitoring are on the platform roadmap. Models that don't
              route through ShieldX get inventory and document storage only, not monitoring — we
              don't oversell what isn't built yet.
            </div>
          </Motion>
        </section>
      </div>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-8 py-28 text-center">
        <Motion>
          <h2 className="text-[24px] md:text-[32px] font-semibold mb-4">See the audit trail live.</h2>
          <p className="text-white/62 mb-8 max-w-md mx-auto leading-relaxed">
            20 minutes. Walk through a real decision record, end to end.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/demo"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
              Request a walkthrough
            </Link>
            <Link to="/neutrality" className="text-sm text-white/50 hover:text-white/80 transition-colors">
              Read the Neutrality Charter →
            </Link>
          </div>
        </Motion>
      </section>
    </Layout>
  );
}
