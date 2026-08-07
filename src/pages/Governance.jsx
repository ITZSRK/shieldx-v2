import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import ComplianceGate from "../components/governance/ComplianceGate";
import ModelGovernanceTiers from "../components/governance/ModelGovernanceTiers";

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
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <Motion>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-0.5 h-4 rounded-full bg-emerald-400/45" />
              <span className="text-[11px] text-white/55 tracking-[0.2em]">CONDUCT COMPLIANCE</span>
            </div>
            <h2 className="text-[24px] md:text-[32px] font-semibold mb-3">Every conversation passes through this gate.</h2>
            <p className="text-white/62 max-w-md leading-relaxed">Not a policy document — a live, automatic check on every outreach attempt. Two accounts, two outcomes.</p>
          </Motion>
          <Motion delay={0.1}>
            <ComplianceGate />
          </Motion>
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
            <h2 className="text-[24px] md:text-[32px] font-semibold mb-3">Built for RBI's draft Model Risk Management framework.</h2>
            <p className="text-white/62 mb-12 max-w-2xl leading-relaxed">
              Inventory, drift monitoring, and audit-ready evidence — for every model touching
              collections, not just the ones ShieldX scores.
            </p>
          </Motion>

          <Motion delay={0.1}>
            <ModelGovernanceTiers />
          </Motion>

          <Motion delay={0.15}>
            <p className="text-white/45 text-[13px] max-w-2xl mt-6 leading-relaxed">
              Inventory, drift, and evidence — tracked together, not as three separate afterthoughts.
            </p>
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
