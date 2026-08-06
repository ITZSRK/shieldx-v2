import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useState } from "react";

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

const PATTERNS = [
  {
    letter: "A",
    name: "Your rails, your identity",
    profile: "Tier-one bank — bank-owned handles, DLT templates, own CPaaS contracts",
    color: "#60a5fa",
    body: "The bank keeps its CPaaS contracts, sender IDs, DLT templates, and WhatsApp handle. ShieldX decides the account, treatment, template, and send-time — and dispatches through the bank's own stack.",
    proof: "Full decision visibility. Zero displacement.",
  },
  {
    letter: "B",
    name: "Voice as a governed pool",
    profile: "Bank voice channel with external OBD / tele-calling partners",
    color: "#4ade80",
    body: "Existing voice partners keep their volume. Any new channel — including ShieldX's own voice — enters the same governed pool, measured on one symmetric scorecard. Volume follows performance, under the institution's own allocation policy.",
    proof: "Identical scorecard. Never a replacement pitch.",
  },
  {
    letter: "C",
    name: "Full stack",
    profile: "NBFCs, ARCs, and agencies without pipes of their own",
    color: "#fbbf24",
    body: "Brain and hands. ShieldX provides Decision, Engage, and voice together — the complete stack for institutions that don't already have execution infrastructure. ARCIL white-label and agency partnerships run this motion.",
    proof: "Same platform, same taxonomy, same record.",
  },
];

export default function Deploy() {
  const [hovered, setHovered] = useState(null);

  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-8 pt-[120px] pb-20 text-center">
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

      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {PATTERNS.map((p, i) => (
            <Motion key={p.letter} delay={i * 0.08}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="rounded-2xl border p-7 h-full transition-all duration-300"
                style={{
                  borderColor: hovered === i ? `${p.color}55` : `${p.color}22`,
                  background:  hovered === i ? `${p.color}0d` : `${p.color}06`,
                  boxShadow:   hovered === i ? `0 0 40px ${p.color}18` : "none",
                }}
              >
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center mb-6 font-mono text-lg font-semibold"
                  style={{ borderColor: `${p.color}40`, color: p.color, background: `${p.color}10` }}>
                  {p.letter}
                </div>
                <div className="text-[10px] tracking-[0.2em] mb-3" style={{ color: `${p.color}aa` }}>{p.profile.toUpperCase()}</div>
                <h3 className="text-[20px] font-semibold mb-4 text-white">{p.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{p.body}</p>
                <div className="pt-5 border-t border-white/[0.08]">
                  <span className="text-[12px] font-medium" style={{ color: p.color }}>{p.proof}</span>
                </div>
              </div>
            </Motion>
          ))}
        </div>
      </section>

      <div className="bg-white/[0.04] border-y border-white/[0.09]">
        <section className="max-w-4xl mx-auto px-8 py-20 text-center">
          <Motion>
            <p className="text-[20px] md:text-[28px] font-semibold leading-snug mb-4">
              "Do you execute?"
            </p>
            <p className="text-white/62 max-w-xl mx-auto leading-relaxed">
              Honest answer: always the decision, never necessarily the delivery. ShieldX
              routes decisions through the pipes an institution already trusts. Our own
              channels — Engage, Diya — exist to fill gaps, not to displace working
              relationships. Volume moves between channels and partners only on measured
              performance, under the institution's own policy — never on our commercial
              preference.
            </p>
            <Link to="/neutrality" className="inline-block mt-6 text-sm text-emerald-400/70 hover:text-emerald-400 transition-colors">
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
