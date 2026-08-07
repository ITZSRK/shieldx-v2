import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "./SEO";
import founder from "../assets/founder.png";

// Shared chrome for long-form pieces. Reading measure is deliberately
// narrower than the product pages (~66ch) and the type larger — these are
// read start to finish rather than scanned, which is the opposite of how
// everything else on this site is used.
export default function InsightLayout({ title, description, path, kicker, dek, date, children }) {
  return (
    <Layout>
      <SEO title={title} description={description} path={path} />

      <article className="max-w-[680px] mx-auto px-8 pt-[120px] pb-32">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link to="/insights" className="inline-flex items-center gap-2 text-white/35 text-xs hover:text-white/65 transition-colors mb-9">
            ← Insights
          </Link>

          <div className="text-[11px] text-emerald-400/60 tracking-[0.2em] mb-5">{kicker}</div>

          <h1 className="text-[32px] md:text-[42px] font-semibold leading-[1.15] tracking-tight mb-6"
            style={{ textWrap: "balance" }}>
            {title}
          </h1>

          {dek && (
            <p className="text-white/60 text-[18px] leading-relaxed mb-9">{dek}</p>
          )}

          <div className="flex items-center gap-3.5 pb-9 mb-11 border-b border-white/[0.09]">
            <img src={founder} alt="" aria-hidden="true"
              className="w-9 h-9 rounded-full object-cover border border-white/[0.12]" />
            <div className="text-[13px]">
              <span className="text-white/70">Sudarson Radhakrishnan</span>
              <span className="text-white/30"> · Founder &amp; CEO</span>
              {date && <span className="text-white/25"> · {date}</span>}
            </div>
          </div>
        </motion.div>

        <div className="insight-body">{children}</div>

        <div className="border-t border-white/[0.09] mt-16 pt-9">
          <p className="text-white/45 text-[14px] leading-relaxed mb-6">
            ShieldX is decisioning infrastructure for collections. The commitments
            described here are published in full as the Neutrality Charter.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]">
            <Link to="/neutrality" className="text-emerald-400/75 hover:text-emerald-400 transition-colors">
              Read the Neutrality Charter →
            </Link>
            <Link to="/demo" className="text-white/45 hover:text-white/75 transition-colors">
              Request a walkthrough →
            </Link>
          </div>
        </div>
      </article>

      <style>{`
        .insight-body p {
          color: rgba(255,255,255,0.66);
          font-size: 16.5px;
          line-height: 1.85;
          margin-bottom: 1.55em;
        }
        .insight-body h2 {
          color: #fff;
          font-size: 21px;
          font-weight: 600;
          line-height: 1.35;
          margin: 2.6em 0 0.9em;
          text-wrap: balance;
        }
        .insight-body strong { color: rgba(255,255,255,0.92); font-weight: 600; }
        .insight-body em { color: rgba(255,255,255,0.78); }
        .insight-body ul { margin: 0 0 1.55em; padding-left: 0; list-style: none; }
        .insight-body li {
          color: rgba(255,255,255,0.66);
          font-size: 16.5px;
          line-height: 1.8;
          margin-bottom: 0.75em;
          padding-left: 1.5em;
          position: relative;
        }
        .insight-body li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: rgba(52,211,153,0.5);
        }
        .insight-body blockquote {
          margin: 2.2em 0;
          padding-left: 1.5em;
          border-left: 2px solid rgba(52,211,153,0.4);
          color: rgba(255,255,255,0.8);
          font-size: 19px;
          line-height: 1.65;
        }
      `}</style>
    </Layout>
  );
}
