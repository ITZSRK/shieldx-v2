import Layout from "../layouts/Layout";
import { motion } from "framer-motion";

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

const SECTIONS = [
  {
    title: "1. We will never operate human collections.",
    body: `ShieldX will not run a tele-calling floor, employ collection agents, or operate a field force — for any client, at any scale, ever. We rank and allocate work among collection agencies; we will never be one. Our only role in the human channel is to make every institution's and every agency's people more effective — through pre-call context, in-call assistance, and post-call learning.`,
  },
  {
    title: "2. Every channel is measured by the same rules — including ours.",
    body: `Where ShieldX offers its own execution channels, they are scored by the identical analysis pipeline, outcome definitions, and metrics applied to every third-party channel. There is no separate methodology for our own products. Client-facing performance dashboards include ShieldX-owned channels alongside all others, and underperformance is displayed with the same prominence as anyone else's.`,
  },
  {
    title: "3. The institution owns the objective function.",
    body: `ShieldX does not decide what "good" means. Each institution sets its own allocation policy — the weights it places on resolution rates, cost, compliance conduct, and customer experience. Our engine computes recommendations against the institution's stated objectives, and material changes to allocation follow the institution's approval process. We recommend; the institution decides.`,
  },
  {
    title: "4. Every decision is on the record.",
    body: `Every decision the platform makes is logged with its inputs, the logic that fired, and the outcome that followed — versioned, explainable, and available to the institution's audit, risk, and compliance functions. Our measurement of partners and channels is auditable by the institutions who rely on it.`,
  },
  {
    title: "5. We do not compete with the stack we orchestrate.",
    body: `Institutions keep the communication partners, sender identities, templates, and contracts they already have. ShieldX routes decisions through the pipes an institution trusts; our own channels exist to fill gaps, not to displace working relationships. Volume moves between channels and partners only on measured performance under the institution's own policy — never on our commercial preference.`,
  },
  {
    title: "6. Client data belongs to the client.",
    body: `Record-level data never leaves a client's boundary for any cross-client purpose. Platform-level learning, where contractually permitted, uses only anonymized, aggregated, cohort-level patterns that cannot identify any institution, portfolio, or individual.`,
  },
];

export default function Neutrality() {
  return (
    <Layout>
      <section className="max-w-3xl mx-auto px-8 pt-[120px] pb-32">

        <Motion>
          <div className="mb-6">
            <div className="text-[10px] text-white/40 tracking-[0.2em] mb-4">TRUST</div>
            <h1 className="text-[36px] md:text-[44px] font-semibold mb-4">The ShieldX Neutrality Charter</h1>
            <p className="text-white/55 text-[15px] italic leading-relaxed">
              Our commitments as decisioning infrastructure for collections.
            </p>
          </div>
        </Motion>

        <Motion delay={0.05}>
          <p className="text-white/58 text-sm leading-[1.9] border-t border-white/[0.08] pt-8 mb-12">
            ShieldX sits in a position of trust: we decide how accounts are worked, we measure
            the performance of every channel and every partner, and we recommend who should be
            allocated what. Institutions, agencies, and channel partners can only rely on that
            position if it is structurally neutral — not neutral by promise, but neutral by
            design. These are our standing commitments.
          </p>
        </Motion>

        <div className="space-y-12">
          {SECTIONS.map((s, i) => (
            <Motion key={i} delay={i * 0.04}>
              <div className="border-t border-white/[0.08] pt-8">
                <h2 className="text-lg font-medium text-white mb-4">{s.title}</h2>
                <div className="text-white/50 text-sm leading-[1.85] whitespace-pre-line">{s.body}</div>
              </div>
            </Motion>
          ))}
        </div>

        <Motion delay={0.1}>
          <div className="border-t border-white/[0.08] mt-12 pt-8 text-white/45 text-sm italic leading-relaxed">
            These commitments are structural to how ShieldX is built and sold. Partners and
            clients may hold us to them in writing.
            <div className="mt-4 not-italic text-white/60">— Quelo Technologies Pvt. Ltd.</div>
          </div>
        </Motion>

      </section>
    </Layout>
  );
}
