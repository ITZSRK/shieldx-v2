import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import SEO from "./SEO";

function Motion({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function CrossLinkCard({ crossLink, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={crossLink.to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block rounded-xl border p-6 transition-all duration-300 no-underline"
      style={{
        borderColor: hovered ? `${color}45` : "rgba(255,255,255,0.10)",
        background: hovered ? `${color}0d` : "rgba(255,255,255,0.03)",
        boxShadow: hovered ? `0 12px 28px ${color}18` : "none",
      }}>
      <div className="text-white text-sm font-medium mb-1">{crossLink.title}</div>
      <div className="text-white/50 text-sm">{crossLink.desc} →</div>
    </Link>
  );
}

export default function CapabilityPage({ id, name, tag, color, line, body, visual, visualLabel, video, videoLabel, videoTitle, crossLink }) {
  return (
    <Layout>
      <SEO title={`${name} — Platform`} description={body || line} path={`/platform/${id}`} />
      <section className="max-w-4xl mx-auto px-8 pt-[120px] pb-8">
        <Motion>
          <Link to="/platform" className="inline-flex items-center gap-2 text-white/35 text-xs hover:text-white/65 transition-colors">
            ← Platform
          </Link>
        </Motion>
      </section>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 55% at 18% 0%, ${color}16, transparent 65%)` }} />
        <section className="relative z-10 max-w-4xl mx-auto px-8 pb-20">
          <Motion delay={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs tracking-[0.18em] mb-8"
              style={{ borderColor: `${color}35`, background: `${color}12`, color, boxShadow: `0 0 18px ${color}25` }}>
              {tag}
            </div>
            <h1 className="text-[36px] md:text-[54px] font-semibold leading-[1.08] mb-4" style={{ color }}>
              {name}
            </h1>
            <p className="text-white/70 text-[18px] mb-6">{line}</p>
            <p className="text-white/58 text-[16px] leading-relaxed max-w-2xl">{body}</p>
          </Motion>
        </section>
      </div>

      {visual && (
        <div className="bg-white/[0.04] border-y border-white/[0.09]">
          <section className="max-w-5xl mx-auto px-8 py-20">
            <Motion>
              <div className="flex items-center justify-center gap-2.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
                <span className="text-[11px] text-white/40 tracking-[0.2em]">{visualLabel ?? `${name.toUpperCase()} IN ACTION`}</span>
                <span className="text-[8px] text-white/25 tracking-widest border border-white/[0.12] rounded-full px-2 py-0.5">ILLUSTRATIVE</span>
              </div>
              {visual}
            </Motion>
          </section>
        </div>
      )}

      {video && (
        <section className="max-w-3xl mx-auto px-8 py-20">
          <Motion>
            <div className="text-center mb-8">
              <span className="text-[11px] text-white/40 tracking-[0.2em]">{videoLabel ?? "IN ACTION"}</span>
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.10]"
              style={{ paddingBottom: "56.25%", background: "rgba(0,0,0,0.5)" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${video}?controls=1&rel=0&modestbranding=1&color=white`}
                title={videoTitle ?? `ShieldX ${name} — Demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Motion>
        </section>
      )}

      {crossLink && (
        <section className="max-w-4xl mx-auto px-8 py-16">
          <Motion>
            <CrossLinkCard crossLink={crossLink} color={color} />
          </Motion>
        </section>
      )}

      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <Motion>
          <h2 className="text-[24px] md:text-[32px] font-semibold mb-4">See {name} on a live decision.</h2>
          <p className="text-white/62 mb-8">20 minutes. Your portfolio, your channels.</p>
          <Link to="/demo"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
            Request a walkthrough
          </Link>
        </Motion>
      </section>
    </Layout>
  );
}
