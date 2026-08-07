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

// Every position below is one ShieldX can actually hold contractually today.
// Operational specifics that vary per institution — RTO/RPO targets, notice
// periods, audit frequency — are deliberately left to the MSA rather than
// published as fixed numbers we would then be held to across every deal.
const POSITIONS = [
  {
    n: "01",
    title: "Right to audit",
    body: `The institution, its internal and external auditors, and the Reserve Bank of India may audit ShieldX's books, records, and controls insofar as they relate to the services provided. This right is contractual, survives for the record-retention period, and is not contingent on notice periods that would frustrate a regulatory inspection.`,
  },
  {
    n: "02",
    title: "Regulatory access and inspection",
    body: `RBI and any other statutory authority with jurisdiction over the institution may access ShieldX's records, systems, and premises relating to the engagement, and may require information directly from us. We do not treat supervisory access as a confidentiality exception to be negotiated.`,
  },
  {
    n: "03",
    title: "Data ownership and residency",
    body: `Client and borrower data belongs to the institution at all times. It is hosted in India — AWS Mumbai (ap-south-1) — or within the institution's own boundary for on-premise deployments. ShieldX asserts no ownership, no licence for cross-client use, and no right to retain data beyond the term.`,
  },
  {
    n: "04",
    title: "Exit management and data return",
    body: `On termination, the institution receives its decision logs, outcome records, and derived features in a documented, machine-readable format — not a proprietary export that creates lock-in. Residual data is destroyed on a defined schedule with written confirmation. Transition assistance is available during the exit window.`,
  },
  {
    n: "05",
    title: "Sub-contracting and fourth parties",
    body: `Sub-processors are disclosed before engagement and listed publicly. Material changes are notified in advance, and the institution may object. No sub-processor receives access broader than the function it performs.`,
  },
  {
    n: "06",
    title: "Business continuity",
    body: `Backups and point-in-time recovery are in place, with restore drills performed. Recovery objectives are agreed per engagement against the institution's own BCP requirements rather than asserted as a single universal figure, and are documented in the MSA.`,
  },
  {
    n: "07",
    title: "Incident reporting",
    body: `Security incidents are reported to the institution without undue delay and within the timelines its own obligations require — including the six-hour reporting window under the CERT-In Directions, 2022, where applicable. ICT log retention is configured to the institution's requirement, including the 180-day CERT-In window, and logs are held in India.`,
  },
  {
    n: "08",
    title: "Concentration risk",
    body: `ShieldX is designed to be removable. The decision layer runs above execution, so an institution keeps its CPaaS contracts, dialer, and agency relationships throughout — see how we deploy. The system of record is exportable. Neither dependency is engineered to raise the cost of leaving.`,
  },
];

export default function Outsourcing() {
  return (
    <Layout>
      <SEO
        title="RBI Outsourcing"
        description="How ShieldX supports a regulated lender's obligations under the RBI Master Direction on Outsourcing of Information Technology Services, 2023 — audit rights, regulatory access, data residency, exit management, and sub-processor disclosure."
        path="/outsourcing"
      />

      <section className="max-w-4xl mx-auto px-8 pt-[120px] pb-32">

        <Motion>
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 text-xs tracking-[0.18em] mb-7"
              style={{ boxShadow: "0 0 18px rgba(52,211,153,0.22)" }}>
              VENDOR DILIGENCE
            </div>
            <h1 className="text-[32px] md:text-[44px] font-semibold leading-tight mb-6">
              We are a material outsourcing<br />arrangement. We're built for it.
            </h1>
            <p className="text-white/62 text-[17px] leading-relaxed max-w-2xl">
              For a regulated lender, engaging ShieldX is outsourcing of information
              technology services under the RBI Master Direction of April 2023. That
              obligation sits with the institution — but it is only satisfiable if the
              provider is willing to hold the other end of it.
            </p>
            <p className="text-white/45 text-[15px] leading-relaxed max-w-2xl mt-5">
              This page states the positions we hold contractually, so your vendor-risk
              team can assess them before a conversation rather than three months into one.
            </p>
          </div>
        </Motion>

        <div className="space-y-px">
          {POSITIONS.map((p, i) => (
            <Motion key={p.n} delay={i * 0.03}>
              <div className="border-t border-white/[0.08] py-8 grid md:grid-cols-[52px_1fr] gap-4 md:gap-7">
                <div className="text-[11px] font-mono text-emerald-400/45 pt-1">{p.n}</div>
                <div>
                  <h2 className="text-[17px] font-medium mb-3">{p.title}</h2>
                  <p className="text-white/50 text-[14.5px] leading-[1.75]">{p.body}</p>
                </div>
              </div>
            </Motion>
          ))}
        </div>

        <Motion>
          <div className="border-t border-white/[0.08] mt-4 pt-10">
            <p className="text-white/45 text-[14px] leading-relaxed max-w-2xl">
              Operational specifics — recovery objectives, notice periods, audit
              frequency, service levels — are agreed per engagement in the Master
              Services Agreement, against the institution's own policy. We publish
              positions here, not numbers we would have to hold identically across
              every institution regardless of its requirements.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 text-[13px]">
              <Link to="/security" className="text-emerald-400/75 hover:text-emerald-400 transition-colors">
                Security controls and subprocessors →
              </Link>
              <Link to="/neutrality" className="text-emerald-400/75 hover:text-emerald-400 transition-colors">
                The Neutrality Charter →
              </Link>
              <Link to="/deploy" className="text-emerald-400/75 hover:text-emerald-400 transition-colors">
                How we deploy →
              </Link>
            </div>
          </div>
        </Motion>

        <Motion>
          <div className="mt-14 border border-white/[0.08] rounded-xl p-7 bg-white/[0.02]">
            <div className="text-white text-[15px] font-medium mb-2">Diligence pack</div>
            <p className="text-white/45 text-[13.5px] leading-relaxed">
              VAPT report, security documentation, DPA, and our standard MSA clauses
              covering the positions above are available to institutions under NDA.
              Request them through a walkthrough, or write to{" "}
              <span className="text-white/70">legal@queloai.online</span>.
            </p>
          </div>
        </Motion>

      </section>
    </Layout>
  );
}
