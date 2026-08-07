import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

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

// Written against the integration surface that actually exists today.
// Batch/SFTP for the decisioning platform; API keys and signed webhooks on
// the voice channel. Roadmap items are labelled as roadmap. No endpoint is
// described here that an architect could call and find missing.
const STAGES = [
  {
    n: "01",
    title: "Accounts in",
    lede: "Your extract, on your schedule, through an endpoint your InfoSec team whitelists.",
    rows: [
      ["Transport", "SFTP to a whitelisted endpoint, or S3 with cross-account access"],
      ["Format", "Delimited file, one row per account, encrypted in transit and at rest"],
      ["Cadence", "Daily is typical; intra-day supported where the portfolio warrants it"],
      ["Mapping", "Your column names map once to ShieldX's canonical schema — you don't rename anything on your side"],
    ],
  },
  {
    n: "02",
    title: "Decisions out",
    lede: "Every account gets a treatment, a cohort, a channel, and a reason code.",
    rows: [
      ["Return file", "Decision per account — treatment, cohort, channel, send-window, reason codes"],
      ["Operational UI", "The same decisions, worked directly by your collections and compliance teams"],
      ["Dispatch", "Where you want ShieldX to execute, decisions route through your own CPaaS, dialer, or agency work-lists"],
      ["Record", "Full decision log retained and exportable for audit — inputs, rules fired, outcome"],
    ],
  },
  {
    n: "03",
    title: "Outcomes back",
    lede: "The loop only closes if what happened returns to the system that decided.",
    rows: [
      ["Feedback file", "Payments, contact results, dispositions, agency outcomes"],
      ["Channel telemetry", "Delivery and call outcomes flow back automatically where ShieldX dispatches"],
      ["Effect", "Outcomes update the next decision on that account — this is the loop, not a report"],
    ],
  },
];

const BANK_WORK = [
  "A scheduled extract from your CBS or collections module, in any column layout you already produce",
  "An SFTP account or S3 path on a whitelisted endpoint, with key exchange",
  "A one-time mapping session — your fields to the canonical schema",
  "A return path for the decision file, or UI access for the teams who will work it",
  "An outcome extract, usually from the same system as the first",
];

export default function Integration() {
  return (
    <Layout>
      <SEO
        title="Integration"
        description="What your IT team actually builds to integrate ShieldX: secure file-based exchange over SFTP into a canonical schema, decisions returned per account, and outcomes fed back to close the loop."
        path="/integration"
      />

      <section className="max-w-4xl mx-auto px-8 pt-[120px] pb-32">

        <Motion>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs tracking-[0.18em] mb-7"
              style={{ boxShadow: "0 0 18px rgba(59,130,246,0.22)" }}>
              INTEGRATION
            </div>
            <h1 className="text-[32px] md:text-[44px] font-semibold leading-tight mb-6">
              Files in. Decisions out.<br />Outcomes back.
            </h1>
            <p className="text-white/62 text-[17px] leading-relaxed max-w-2xl">
              ShieldX integrates the way tier-one Indian banks actually integrate:
              encrypted file exchange over SFTP, through endpoints your InfoSec team
              whitelists, into a canonical schema. It is the pattern their middleware
              teams have built a hundred times and their auditors already understand —
              which is why it clears security review faster than anything else.
            </p>
            <p className="text-white/45 text-[15px] leading-relaxed max-w-2xl mt-5">
              No changes to your core banking or collections systems. No agent installed
              anywhere. If you can produce a scheduled extract, you can run ShieldX.
            </p>
          </div>
        </Motion>

        <div className="space-y-14">
          {STAGES.map((s, i) => (
            <Motion key={s.n} delay={i * 0.05}>
              <div>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[11px] font-mono text-blue-400/50">{s.n}</span>
                  <h2 className="text-[21px] font-semibold">{s.title}</h2>
                </div>
                <p className="text-white/55 text-[15px] leading-relaxed mb-6 md:pl-[42px]">{s.lede}</p>
                <div className="md:pl-[42px]">
                  <div className="rounded-xl border border-white/[0.08] overflow-hidden">
                    {s.rows.map(([k, v], j) => (
                      <div key={j}
                        className={`grid md:grid-cols-[150px_1fr] gap-1 md:gap-6 px-5 py-4 ${j > 0 ? "border-t border-white/[0.06]" : ""}`}>
                        <div className="text-[11px] tracking-[0.14em] text-white/35 pt-0.5">{k.toUpperCase()}</div>
                        <div className="text-white/60 text-[14px] leading-relaxed">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Motion>
          ))}
        </div>

        {/* WHAT THE BANK BUILDS */}
        <Motion>
          <div className="border-t border-white/[0.08] mt-16 pt-12">
            <h2 className="text-[21px] font-semibold mb-3">What your IT team builds</h2>
            <p className="text-white/50 text-[14.5px] leading-relaxed max-w-2xl mb-7">
              The honest list. Scoped against your environment on a technical call —
              we don't quote an integration timeline before seeing what your extract
              already produces.
            </p>
            <div className="space-y-3">
              {BANK_WORK.map((w, i) => (
                <div key={i} className="flex items-start gap-3.5 text-[14.5px] text-white/58 leading-relaxed">
                  <span className="text-blue-400/55 mt-0.5 shrink-0 text-[12px]">→</span>
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </Motion>

        {/* VOICE CHANNEL — programmatic */}
        <Motion>
          <div className="border-t border-white/[0.08] mt-14 pt-12">
            <h2 className="text-[21px] font-semibold mb-3">Voice channel: programmatic</h2>
            <p className="text-white/50 text-[14.5px] leading-relaxed max-w-2xl mb-6">
              Where ShieldX voice is in use, integration is API-based rather than
              batch — for CRM and dialer systems that need to push and receive in
              near real time.
            </p>
            <div className="rounded-xl border border-white/[0.08] overflow-hidden">
              {[
                ["Authentication", "Scoped API keys, issued and revocable per integration"],
                ["Push targets", "Call targets posted programmatically, with duplicate-batch protection"],
                ["Outcome webhooks", "Signed with HMAC-SHA256 and delivered through a retry queue — not fire-and-forget"],
                ["Audit", "Every programmatic action logged against the key that made it"],
              ].map(([k, v], j) => (
                <div key={j} className={`grid md:grid-cols-[150px_1fr] gap-1 md:gap-6 px-5 py-4 ${j > 0 ? "border-t border-white/[0.06]" : ""}`}>
                  <div className="text-[11px] tracking-[0.14em] text-white/35 pt-0.5">{k.toUpperCase()}</div>
                  <div className="text-white/60 text-[14px] leading-relaxed">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </Motion>

        {/* ROADMAP — labelled as such */}
        <Motion>
          <div className="border-t border-white/[0.08] mt-14 pt-12">
            <div className="text-[10px] text-white/35 tracking-[0.2em] mb-4">ON THE ROADMAP</div>
            <p className="text-white/50 text-[14.5px] leading-relaxed max-w-2xl">
              Programmatic decisioning APIs — real-time signal ingest and an outbound
              decision webhook, on the same treatment-in / outcome-out contract every
              execution adapter already speaks. Batch remains supported regardless;
              for most institutions it is the preferred path, not a fallback.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 text-[13px]">
              <Link to="/deploy" className="text-blue-300/75 hover:text-blue-300 transition-colors">
                How we deploy →
              </Link>
              <Link to="/outsourcing" className="text-blue-300/75 hover:text-blue-300 transition-colors">
                RBI outsourcing positions →
              </Link>
              <Link to="/security" className="text-blue-300/75 hover:text-blue-300 transition-colors">
                Security and data residency →
              </Link>
            </div>
          </div>
        </Motion>

      </section>
    </Layout>
  );
}
