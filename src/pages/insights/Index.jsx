import Layout from "../../layouts/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";

function Motion({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// Only published pieces belong here. Listing planned titles as "coming soon"
// advertises an empty shelf — better to have three finished pieces over time
// than six announced ones.
const PIECES = [
  {
    to: "/insights/dpdp-collections",
    kicker: "REGULATION",
    title: "Collections inherits its consent",
    dek: "Under DPDP, what a recovery team is permitted to do was largely decided by the notice given at origination — often years earlier, by a different department, in a form nobody wrote with collections in mind.",
    date: "August 2026",
  },
  {
    to: "/insights/rbi-model-risk-management",
    kicker: "REGULATION",
    title: "Your rules engine is a model now",
    dek: "RBI's draft model risk guidance defines a model by what it does, not what it's called. On that definition, the spreadsheet your collections team scores on is in scope — and so is every vendor system making decisions on your book.",
    date: "August 2026",
  },
  {
    to: "/insights/who-scores-the-agencies",
    kicker: "NEUTRALITY",
    title: "Who scores the agencies?",
    dek: "Every collections vendor optimises the slice it was given. None can see the whole book — which leaves the most consequential decision in collections made on the least information.",
    date: "August 2026",
  },
];

export default function InsightsIndex() {
  return (
    <Layout>
      <SEO
        title="Insights"
        description="Written pieces on decisioning, neutrality, and regulation in Indian collections — from the team building ShieldX."
        path="/insights"
      />

      <section className="max-w-3xl mx-auto px-8 pt-[120px] pb-32">
        <Motion>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 text-xs tracking-[0.18em] mb-7"
              style={{ boxShadow: "0 0 18px rgba(52,211,153,0.22)" }}>
              INSIGHTS
            </div>
            <h1 className="text-[32px] md:text-[44px] font-semibold leading-tight mb-6">
              Arguments, not announcements.
            </h1>
            <p className="text-white/60 text-[17px] leading-relaxed max-w-xl">
              Pieces on how credit conversations get decided, governed, and
              measured in India — written for the people who have to answer for
              them.
            </p>
          </div>
        </Motion>

        <div className="border-t border-white/[0.09]">
          {PIECES.map((p, i) => (
            <Motion key={p.to} delay={i * 0.05}>
              <Link to={p.to} className="group block border-b border-white/[0.09] py-9 no-underline">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] text-emerald-400/55 tracking-[0.2em]">{p.kicker}</span>
                  <span className="text-white/15">·</span>
                  <span className="text-[11px] text-white/30">{p.date}</span>
                </div>
                <h2 className="text-[22px] md:text-[25px] font-semibold mb-3 leading-snug text-white group-hover:text-emerald-300/90 transition-colors">
                  {p.title}
                </h2>
                <p className="text-white/50 text-[15px] leading-relaxed max-w-2xl mb-4">{p.dek}</p>
                <span className="text-[13px] text-emerald-400/60 group-hover:text-emerald-400 transition-colors">
                  Read →
                </span>
              </Link>
            </Motion>
          ))}
        </div>
      </section>
    </Layout>
  );
}
