import Layout from "../layouts/Layout";
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

const PILLARS = [
  {
    tag: "DATA PROTECTION",
    title: "DPDP Act, 2023 aligned",
    desc: "Our data handling practices are designed to align with the Digital Personal Data Protection Act, 2023. Purpose limitation, data minimisation, and consent management are built into our processing workflows — not bolted on after the fact.",
  },
  {
    tag: "ASSURANCE",
    title: "Independent VAPT completed",
    desc: "Vulnerability assessment and penetration testing has been carried out by an independent third party. The report is available to prospective and existing clients under NDA as part of vendor due diligence.",
  },
  {
    tag: "CERTIFICATION",
    title: "ISO 27001 certification in progress",
    desc: "We are actively working towards ISO/IEC 27001:2022 certification for our information security management system. Controls across access management, incident response, vulnerability management, and business continuity are being implemented and documented. We are not SOC 2 audited.",
  },
  {
    tag: "ACCESS CONTROL",
    title: "Least-privilege access architecture",
    desc: "Role-based access control is enforced in the application, with MFA on all accounts and immediate session revocation. Infrastructure access is key-based and limited to named individuals.",
  },
  {
    tag: "ENCRYPTION",
    title: "Encryption at rest and in transit",
    desc: "Personal data is encrypted at the column level with AES-256-GCM under KMS-managed keys, rotated annually. Backups and object storage use AES-256 server-side encryption. Data in transit is protected with TLS 1.2 or higher.",
  },
  {
    tag: "AUDIT",
    title: "Tamper-evident audit infrastructure",
    desc: "Decisions and administrative actions are written to append-only, hash-chained logs. Any later edit, deletion or reordering breaks the chain and is surfaced by an on-demand integrity check. PII access is recorded insert-only. Records are browsable per account and per period, and produced for auditors on request.",
  },
  {
    tag: "INCIDENT RESPONSE",
    title: "Incident detection and response",
    desc: "Security events are monitored continuously through metrics and log-based alerting. Affected parties are notified within the timelines required under applicable Indian regulations, including the CERT-In reporting window.",
  },
];

// Every line here has to be defensible in a bank's InfoSec questionnaire —
// an unsupported claim discovered in diligence discredits the supported ones
// alongside it. Aspirational practices belong in the roadmap, not this list.
const PRACTICES = [
  "Secure development lifecycle with mandatory code review",
  "Automated dependency vulnerability scanning across production repositories",
  "Independent VAPT completed — report available under NDA",
  "No customer production data used in development or test environments",
  "Daily logical backups, weekly base backups, and continuous WAL archiving supporting point-in-time recovery, with a documented restore procedure",
  "Sensitive credentials managed through secrets management tooling — never hardcoded",
];

// Platform subprocessors — third parties that may process client or borrower
// data in the course of delivering the service. Deliberately scoped to the
// platform: vendors that only handle website enquiry data (analytics, the
// contact form) are covered in the Privacy Policy instead, since they never
// touch client data.
const SUBPROCESSORS = [
  { name: "Amazon Web Services",   role: "Infrastructure, storage, key management",   region: "India (ap-south-1)" },
  { name: "Fonada",                role: "SMS, IVR and voice telephony delivery",      region: "India" },
  { name: "SendGrid",              role: "Email delivery",                              region: "United States" },
  { name: "Meta (WhatsApp Cloud)", role: "WhatsApp message delivery",                   region: "United States" },
  { name: "Ola Maps",              role: "Address geocoding",                           region: "India" },
  { name: "LiveKit",               role: "Real-time voice session transport",          region: "Configurable" },
  { name: "Deepgram",              role: "Speech recognition",                          region: "Configurable" },
  { name: "Sarvam AI",             role: "Indic speech and language models",            region: "India" },
  { name: "OpenAI",                role: "Language model inference",                     region: "United States" },
  { name: "Cartesia / ElevenLabs", role: "Speech synthesis",                             region: "United States" },
];

export default function Security() {
  return (
    <Layout>
      <SEO
        title="Security"
        description="ShieldX processes decision-critical data for financial institutions. Security is infrastructure — not a feature."
        path="/security"
      />
      <section className="max-w-4xl mx-auto px-8 pt-[120px] pb-32">

        {/* HEADER */}
        <Motion>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs tracking-[0.18em] mb-6"
              style={{ boxShadow: "0 0 18px rgba(59,130,246,0.22)" }}>
              TRUST & SECURITY
            </div>
            <h1 className="text-[40px] font-semibold mb-5">Security at ShieldX</h1>
            <p className="text-white/50 text-[17px] leading-relaxed max-w-2xl">
              ShieldX processes decision-critical data for financial institutions. Security is infrastructure — not a feature.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["DPDP Act Aligned", "ISO 27001 In Progress", "AES-256 PII Encryption", "TLS 1.2+ In Transit"].map((b, i) => (
                <span key={i} className="px-4 py-1.5 rounded-full text-xs border border-blue-400/20 bg-blue-500/[0.06] text-blue-300/70">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Motion>

        {/* PILLARS */}
        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {PILLARS.map((p, i) => (
            <Motion key={i} delay={i * 0.06}>
              <div className="border border-white/[0.07] rounded-xl p-7 bg-white/[0.02] hover:border-blue-400/30 hover:bg-white/[0.04] hover:scale-[1.018] hover:shadow-[0_0_28px_rgba(59,130,246,0.11)] transition-all duration-300 h-full">
                <div className="text-[10px] text-blue-400/60 tracking-[0.18em] mb-3">{p.tag}</div>
                <div className="text-white font-medium mb-3">{p.title}</div>
                <div className="text-white/42 text-sm leading-relaxed">{p.desc}</div>
              </div>
            </Motion>
          ))}
        </div>

        {/* PRACTICES */}
        <Motion>
          <div className="border-t border-white/[0.08] pt-12">
            <div className="text-[10px] text-white/40 tracking-[0.2em] mb-6">SECURITY PRACTICES</div>
            <h2 className="text-2xl font-semibold mb-8">What we do, not just what we claim.</h2>
            <div className="space-y-3">
              {PRACTICES.map((p, i) => (
                <div key={i} className="flex items-start gap-4 text-sm text-white/55">
                  <span className="text-blue-400/60 mt-0.5 shrink-0">✓</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </Motion>

        {/* DATA RESIDENCY & PROCESSING */}
        <Motion>
          <div className="border-t border-white/[0.08] pt-12 mt-16">
            <div className="text-[10px] text-white/40 tracking-[0.2em] mb-6">DATA RESIDENCY &amp; PROCESSING</div>
            <h2 className="text-2xl font-semibold mb-5">Where your data sits, and who touches it.</h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-2xl mb-4">
              Client and borrower data is hosted in India, in AWS's Mumbai region
              (ap-south-1). Deployment can be cloud, hybrid, or on-premise within
              the institution's own boundary where infrastructure policy requires it.
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-2xl mb-10">
              Data processing agreements are in place with each processor listed
              below. Processors are engaged only for the function described, and
              record-level data is never used for any cross-client purpose — see
              the{" "}
              <a href="/neutrality" className="text-blue-300/80 hover:text-blue-300 underline underline-offset-2 transition-colors">
                Neutrality Charter
              </a>.
            </p>

            <div className="text-[10px] text-white/40 tracking-[0.2em] mb-4">PLATFORM SUBPROCESSORS</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[520px]">
                <thead>
                  <tr className="text-[10px] text-white/35 tracking-[0.14em] text-left">
                    <th className="font-normal pb-3 pr-6">PROCESSOR</th>
                    <th className="font-normal pb-3 pr-6">PURPOSE</th>
                    <th className="font-normal pb-3">PROCESSING REGION</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBPROCESSORS.map((s, i) => (
                    <tr key={i} className="border-t border-white/[0.06]">
                      <td className="py-3 pr-6 text-white/75 whitespace-nowrap">{s.name}</td>
                      <td className="py-3 pr-6 text-white/45">{s.role}</td>
                      <td className="py-3 text-white/45 whitespace-nowrap">{s.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-white/32 text-[12.5px] leading-relaxed mt-5 max-w-2xl">
              Which processors are engaged depends on the deployment. Messaging and
              telephony processors apply where ShieldX dispatches those channels;
              speech and language processors apply only to ShieldX voice. Where
              execution runs entirely on the institution's own rails, neither set
              is engaged.
            </p>
          </div>
        </Motion>

        {/* CONTACT */}
        <Motion>
          <div className="mt-16 border border-white/[0.07] rounded-xl p-8 bg-white/[0.02]">
            <div className="text-white font-medium mb-2">Security disclosure</div>
            <p className="text-white/42 text-sm leading-relaxed mb-4">
              If you believe you have found a security vulnerability in ShieldX, please report it responsibly to our security team. We commit to acknowledging your report within 48 hours and working with you on a resolution timeline.
            </p>
            <div className="text-sm text-white/50">
              Contact: <span className="text-white/70">security@queloai.online</span>
            </div>
          </div>
        </Motion>

      </section>
    </Layout>
  );
}
