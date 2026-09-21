import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import SEO from "../components/SEO";

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

/* The two refusals carry the page. Both are commercial statements of the
   Neutrality Charter rather than pricing trivia: a vendor paid per attempt is
   paid to attempt, and a vendor paid a share of recovery is an agency competing
   with the institution's own. Naming the incentive we removed is stronger than
   naming the unit we bill. */
const REFUSALS = [
  {
    head: "Not per attempt.",
    body:
      "A platform paid per attempt is paid to attempt. ShieldX can decide that the right action is no action — that an account is self-curing, that the window is wrong, that nobody should be contacted today. Under per-attempt pricing every one of those decisions costs us money. We will not hold a commercial incentive that argues with the decision.",
  },
  {
    head: "Not a share of what you recover.",
    body:
      "A share of recovery makes us an agency, competing with the agencies you already run and the ones we are supposed to rank on one methodology. It also prices our work against your borrowers' hardship. The institution sets the objective; we do not take a position in the outcome.",
  },
];

const UNITS = [
  {
    line: "Decisioning",
    unit: "Per governed account",
    note:
      "Flat across the portfolio. Not per bucket, not per product, not per lookup — bucket and product variation shows up in channel usage, not in the price of the decision.",
  },
  {
    line: "Voice",
    unit: "Per connected minute",
    note: "Metered as used. One channel among several, and never the default.",
  },
  {
    line: "Intelligence",
    unit: "Per analysed minute",
    note: "Post-call review of calls already recorded. Metered on what is analysed.",
  },
  {
    line: "Assist",
    unit: "Per minute of assistance",
    note:
      "Not per seat. You already pay for the dialler, the CRM and the telco; Assist is a layer over them, so it is billed on assistance actually given.",
  },
  {
    line: "Field conduct",
    unit: "Per resolved account",
    note: "Not per visit. Field work is paid on resolution in this market, and we follow that.",
  },
  {
    line: "Implementation",
    unit: "One-time, per institution",
    note:
      "Integration and workflow build, stated separately from the recurring line rather than amortised into it.",
  },
];

export default function Pricing() {
  return (
    <Layout>
      <SEO
        title="Pricing"
        description="ShieldX is priced per governed account for decisioning, with channels metered separately as used — never per attempt, and never as a share of what you recover."
        path="/pricing"
      />

      {/* ═══ HERO ═══ */}
      <section className="max-w-5xl mx-auto px-8 pt-[120px] pb-16 text-center">
        <Motion>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs tracking-[0.18em] mb-8"
            style={{ boxShadow: "0 0 18px rgba(59,130,246,0.22)" }}>
            PRICING
          </div>
          <h1 className="text-[32px] md:text-[50px] leading-[1.08] font-semibold mb-6">
            You pay for the decision.<br />Not for the attempt.
          </h1>
          <p className="text-white/62 text-[17px] max-w-2xl mx-auto leading-relaxed">
            Decisioning is priced per governed account. Channels are metered separately,
            as used. What we refuse to charge for matters more than the unit — it is what
            keeps the commercial model from arguing with the decision.
          </p>
        </Motion>
      </section>

      {/* ═══ THE TWO REFUSALS ═══ */}
      <div className="bg-white/[0.05] border-y border-white/[0.09]">
        <section className="max-w-5xl mx-auto px-8 py-24">
          <Motion>
            <div className="flex items-center gap-3 mb-12">
              <div className="h-px w-6 bg-white/20" />
              <span className="text-[11px] text-white/55 tracking-[0.22em]">
                WHAT WE WILL NOT CHARGE FOR
              </span>
            </div>
          </Motion>

          <div className="grid md:grid-cols-2 gap-5">
            {REFUSALS.map((r, i) => (
              <Motion key={r.head} delay={i * 0.08}>
                <div className="h-full p-7 rounded-xl border border-white/[0.10] bg-white/[0.02]">
                  <div className="text-white text-[17px] font-semibold mb-3">{r.head}</div>
                  <p className="text-white/58 text-[14.5px] leading-relaxed">{r.body}</p>
                </div>
              </Motion>
            ))}
          </div>

          <Motion delay={0.2}>
            <p className="mt-10 text-white/48 text-[14px] leading-relaxed max-w-3xl">
              Both are commercial forms of the same commitment the{" "}
              <Link to="/neutrality"
                className="text-emerald-400/75 hover:text-emerald-400 underline underline-offset-2 transition-colors">
                Neutrality Charter
              </Link>{" "}
              makes structurally. A charter that says we never favour our own channel,
              paired with a price that pays us to use it, would not be worth reading.
            </p>
          </Motion>
        </section>
      </div>

      {/* ═══ THE LINES ═══ */}
      <section className="max-w-5xl mx-auto px-8 py-24">
        <Motion>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">WHAT IS BILLED</span>
          </div>
          <h2 className="text-[26px] md:text-[38px] font-semibold leading-tight mb-5">
            Separate lines, separate units.
          </h2>
          <p className="text-white/55 text-[15px] leading-relaxed max-w-2xl mb-12">
            Nothing is blended into a single per-account fee. Each line is billed on the
            unit that matches the work it does, so a portfolio that uses no voice is not
            quietly paying for voice.
          </p>
        </Motion>

        <div className="border-t border-white/[0.08]">
          {UNITS.map((u, i) => (
            <Motion key={u.line} delay={Math.min(i * 0.05, 0.2)}>
              <div className="border-b border-white/[0.08] py-6 grid md:grid-cols-[200px_210px_1fr] gap-2 md:gap-8 items-baseline">
                <div className="text-white text-[15px] font-medium">{u.line}</div>
                <div className="text-blue-300/75 text-[13.5px] font-mono">{u.unit}</div>
                <div className="text-white/52 text-[14px] leading-relaxed">{u.note}</div>
              </div>
            </Motion>
          ))}
        </div>
      </section>

      {/* ═══ THE BREAKUP ═══ */}
      <div className="bg-white/[0.05] border-y border-white/[0.09]">
        <section className="max-w-3xl mx-auto px-8 py-24">
          <Motion>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-white/20" />
              <span className="text-[11px] text-white/55 tracking-[0.22em]">THE BREAKUP</span>
            </div>
            <h2 className="text-[24px] md:text-[34px] font-semibold leading-tight mb-5">
              You can see it. We don't price on it.
            </h2>
            <p className="text-white/58 text-[15px] leading-relaxed">
              Every enrichment call, every signal fetched, every check run against an
              account is recorded and retrievable — per account, per decision, on demand.
              That record exists as proof, not as an invoice. We do not itemise lookups
              and bill them back, because you already own your data and a per-lookup price
              would make us a reseller of it. You pay for what ShieldX does over the top:
              integration, decisioning, the governance record, and the analytics that come
              out of it.
            </p>
          </Motion>
        </section>
      </div>

      {/* ═══ WHAT A QUOTE NEEDS ═══ */}
      <section className="max-w-5xl mx-auto px-8 py-24">
        <Motion>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">GETTING A NUMBER</span>
          </div>
          <h2 className="text-[26px] md:text-[38px] font-semibold leading-tight mb-5">
            We quote against your book, not a rate card.
          </h2>
          <p className="text-white/55 text-[15px] leading-relaxed max-w-2xl mb-8">
            Coverage is modelled on the whole portfolio rather than a convenient slice —
            a late-stage or written-off book needs enrichment on most of it, and a quote
            that assumes otherwise is one you would have to renegotiate. To price a
            deployment we need the shape of the book, the channels you already run, and
            which of them you want ShieldX to touch.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/demo"
              className="inline-block bg-white text-black px-8 py-3.5 rounded-lg text-sm font-semibold
                hover:opacity-90 hover:scale-[1.02] transition-all duration-200
                shadow-[0_0_30px_rgba(255,255,255,0.12)]">
              Request a walkthrough
            </Link>
            <Link to="/platform/verdict"
              className="inline-block px-8 py-3.5 rounded-lg text-sm font-semibold border border-white/15
                text-white/75 hover:text-white hover:border-white/30 transition-all duration-200">
              Start with a Verdict audit
            </Link>
          </div>
        </Motion>
      </section>
    </Layout>
  );
}
