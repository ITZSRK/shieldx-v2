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

const SECTIONS = [
  {
    id: "no-human-collections",
    short: "We never run human collections",
    title: "1. We will never operate human collections.",
    body: `ShieldX will not run a tele-calling floor, employ collection agents, or operate a field force — for any client, at any scale, ever. We rank and allocate work among collection agencies; we will never be one. Our only role in the human channel is to make every institution's and every agency's people more effective — through pre-call context, in-call assistance, and post-call learning.`,
  },
  {
    id: "same-rules",
    short: "Every channel is scored the same — including ours",
    title: "2. Every channel is measured by the same rules — including ours.",
    body: `Where ShieldX offers its own execution channels, they are scored by the identical analysis pipeline, outcome definitions, and metrics applied to every third-party channel. There is no separate methodology for our own products. Client-facing performance dashboards include ShieldX-owned channels alongside all others, and underperformance is displayed with the same prominence as anyone else's.`,
    seeLink: { to: "/deploy", label: "See the identical scorecard" },
  },
  {
    id: "institution-owns",
    short: "You own the objective function",
    title: "3. The institution owns the objective function.",
    body: `ShieldX does not decide what "good" means. Each institution sets its own allocation policy — the weights it places on resolution rates, cost, compliance conduct, and customer experience. Our engine computes recommendations against the institution's stated objectives, and material changes to allocation follow the institution's approval process. We recommend; the institution decides.`,
  },
  {
    id: "on-the-record",
    short: "Every decision is logged and auditable",
    title: "4. Every decision is on the record.",
    body: `Every decision the platform makes is logged with its inputs, the logic that fired, and the outcome that followed — versioned, explainable, and available to the institution's audit, risk, and compliance functions. Our measurement of partners and channels is auditable by the institutions who rely on it.`,
    seeLink: { to: "/governance", label: "See the audit trail" },
  },
  {
    id: "no-compete",
    short: "We don't compete with the stack we orchestrate",
    title: "5. We do not compete with the stack we orchestrate.",
    body: `Institutions keep the communication partners, sender identities, templates, and contracts they already have. ShieldX routes decisions through the pipes an institution trusts; our own channels exist to fill gaps, not to displace working relationships. Volume moves between channels and partners only on measured performance under the institution's own policy — never on our commercial preference.`,
    seeLink: { to: "/deploy", label: "See how we deploy" },
  },
  {
    id: "data-ownership",
    short: "Client data belongs to the client",
    title: "6. Client data belongs to the client.",
    body: `Record-level data never leaves a client's boundary for any cross-client purpose — for any reason.`,
  },
];

function IconSeparate() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
      <circle cx="7" cy="12" r="4" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
function IconBalance() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
      <rect x="5" y="8" width="14" height="2.4" rx="1.2" fill="currentColor" />
      <rect x="5" y="14" width="14" height="2.4" rx="1.2" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}
function IconSliders() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
      <line x1="6" y1="4" x2="6" y2="20" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.35" />
      <circle cx="6" cy="9" r="2" fill="currentColor" />
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.35" />
      <circle cx="12" cy="15" r="2" fill="currentColor" />
      <line x1="18" y1="4" x2="18" y2="20" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.35" />
      <circle cx="18" cy="7" r="2" fill="currentColor" />
    </svg>
  );
}
function IconLedger() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
      <rect x="5" y="6" width="14" height="2" rx="1" fill="currentColor" fillOpacity="0.9" />
      <rect x="5" y="11" width="11" height="2" rx="1" fill="currentColor" fillOpacity="0.55" />
      <rect x="5" y="16" width="8" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}
function IconPlug() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
      <rect x="12" y="6" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="5" cy="12" r="3" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.3" />
      <line x1="8" y1="12" x2="12" y2="12" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
      <path d="M12 3l7 3v6c0 5-3 7.5-7 9-4-1.5-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.08" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

const ICONS = [IconSeparate, IconBalance, IconSliders, IconLedger, IconPlug, IconShield];

function CommitmentIndex() {
  function jumpTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <div className="grid sm:grid-cols-2 gap-2.5 mb-14">
      {SECTIONS.map((s, i) => {
        const Icon = ICONS[i];
        return (
          <button key={s.id} onClick={() => jumpTo(s.id)}
            className="text-left rounded-lg border border-white/[0.10] bg-white/[0.02] px-4 py-3.5 hover:border-emerald-400/30 hover:bg-emerald-500/[0.04] transition-all duration-200 group flex items-start gap-3">
            <div className="text-emerald-400/55 group-hover:text-emerald-400/85 transition-colors mt-0.5 shrink-0">
              <Icon />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400/50 group-hover:text-emerald-400/80 transition-colors mb-1">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-[13px] text-white/75 group-hover:text-white/95 transition-colors leading-snug">{s.short}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function Neutrality() {
  return (
    <Layout>
      <SEO
        title="The Neutrality Charter"
        description="Our commitments as decisioning infrastructure for collections — structurally neutral, not neutral by promise. ShieldX will never operate human collections."
        path="/neutrality"
      />
      <section className="max-w-3xl mx-auto px-8 pt-[120px] pb-32">

        <Motion>
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 text-xs tracking-[0.18em] mb-6"
              style={{ boxShadow: "0 0 18px rgba(52,211,153,0.22)" }}>
              TRUST
            </div>
            <h1 className="text-[36px] md:text-[44px] font-semibold mb-4">The ShieldX Neutrality Charter</h1>
            <p className="text-white/55 text-[15px] italic leading-relaxed">
              Our commitments as decisioning infrastructure for collections.
            </p>
          </div>
        </Motion>

        <Motion delay={0.05}>
          <p className="text-white/58 text-sm leading-[1.9] border-t border-white/[0.08] pt-8 mb-10">
            ShieldX sits in a position of trust: we decide how accounts are worked, we measure
            the performance of every channel and every partner, and we recommend who should be
            allocated what. Institutions, agencies, and channel partners can only rely on that
            position if it is structurally neutral — not neutral by promise, but neutral by
            design. These are our standing commitments.
          </p>
        </Motion>

        <Motion delay={0.08}>
          <CommitmentIndex />
        </Motion>

        <div className="space-y-12">
          {SECTIONS.map((s, i) => (
            <Motion key={i} delay={i * 0.04}>
              <div id={s.id} className="border-t border-white/[0.08] pt-8 scroll-mt-24">
                <h2 className="text-lg font-medium text-white mb-4">{s.title}</h2>
                <div className="text-white/50 text-sm leading-[1.85] whitespace-pre-line">{s.body}</div>
                {s.seeLink && (
                  <Link to={s.seeLink.to}
                    className="inline-flex items-center gap-1.5 mt-4 text-[13px] text-emerald-400/70 hover:text-emerald-400 transition-colors">
                    {s.seeLink.label} →
                  </Link>
                )}
              </div>
            </Motion>
          ))}
        </div>

        <Motion delay={0.1}>
          <div className="border-t border-white/[0.08] mt-12 pt-8 text-white/45 text-sm italic leading-relaxed">
            These commitments are structural to how ShieldX is built and sold. Partners and
            clients may hold us to them in writing.
            <div className="mt-4 not-italic text-white/60">— Quelo Technologies Private Limited</div>
          </div>
        </Motion>

      </section>
    </Layout>
  );
}
