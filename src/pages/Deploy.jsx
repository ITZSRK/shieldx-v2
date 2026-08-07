import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import DeploymentSwitchboard from "../components/deploy/DeploymentSwitchboard";

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

export default function Deploy() {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 50% at 50% 0%, rgba(96,165,250,0.14), transparent 65%)" }} />
        <section className="relative z-10 max-w-5xl mx-auto px-8 pt-[120px] pb-20 text-center">
          <Motion>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs tracking-[0.18em] mb-8"
              style={{boxShadow:"0 0 18px rgba(59,130,246,0.22)"}}>
              HOW WE DEPLOY
            </div>
            <h1 className="text-[32px] md:text-[50px] leading-[1.08] font-semibold mb-6">
              Always the decision.<br />Never necessarily the delivery.
            </h1>
            <p className="text-white/62 text-[17px] max-w-2xl mx-auto leading-relaxed">
              Same platform, same taxonomy, same record — only the adapter mix varies.
              Three deployment patterns cover how institutions actually run collections today.
            </p>
          </Motion>
        </section>
      </div>

      <section className="max-w-4xl mx-auto px-8 pb-24">
        <Motion>
          <DeploymentSwitchboard />
        </Motion>
      </section>

      <div className="bg-white/[0.04] border-y border-white/[0.09]">
        <section className="max-w-2xl mx-auto px-8 py-12 text-center">
          <Motion>
            <p className="text-[16px] font-semibold mb-2">"Do you execute?"</p>
            <p className="text-white/55 text-[13.5px] max-w-lg mx-auto leading-relaxed">
              Honest answer: no. Engage and Diya fill gaps —
              they don't displace working relationships.
            </p>
            <Link to="/neutrality" className="inline-block mt-3 text-[12.5px] text-emerald-400/70 hover:text-emerald-400 transition-colors">
              Read the full Neutrality Charter →
            </Link>
          </Motion>
        </section>
      </div>

      <section className="max-w-4xl mx-auto px-8 py-28 text-center">
        <Motion>
          <h2 className="text-[24px] md:text-[32px] font-semibold mb-4">See which pattern fits.</h2>
          <p className="text-white/62 mb-8 max-w-md mx-auto leading-relaxed">
            20 minutes. Your stack, your channels — mapped to the right deployment pattern.
          </p>
          <Link to="/demo"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
            Request a walkthrough
          </Link>
        </Motion>
      </section>
    </Layout>
  );
}
