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

const PILLARS = [
  {
    tag: "DATA PROTECTION",
    title: "DPDPA 2025 aligned",
    desc: "Our data handling practices are designed to align with the Digital Personal Data Protection Act, 2023. Purpose limitation, data minimisation, and consent management are built into our processing workflows — not bolted on after the fact.",
  },
  {
    tag: "CERTIFICATION",
    title: "ISO 27001 certification in progress",
    desc: "We are actively working towards ISO/IEC 27001:2022 certification for our information security management system. Controls across access management, incident response, vulnerability management, and business continuity are being implemented and documented.",
  },
  {
    tag: "ACCESS CONTROL",
    title: "Least-privilege access architecture",
    desc: "Role-based access controls are enforced across all internal systems. Engineers access only what their role requires. Access reviews are conducted periodically. No standing privileged access to production environments.",
  },
  {
    tag: "ENCRYPTION",
    title: "Encryption at rest and in transit",
    desc: "All data is encrypted at rest using AES-256. All data in transit is protected using TLS 1.2 or higher. Keys are managed through dedicated key management infrastructure and rotated regularly.",
  },
  {
    tag: "AUDIT",
    title: "Immutable audit infrastructure",
    desc: "Every decision, access event, and configuration change is logged to an immutable audit trail. Logs cannot be altered or deleted by application-layer operations. Exportable for regulatory review on demand.",
  },
  {
    tag: "INCIDENT RESPONSE",
    title: "Incident detection and response",
    desc: "We maintain a documented incident response plan covering detection, containment, investigation, and notification. Security events are monitored continuously. Affected parties are notified within timelines required under applicable Indian regulations.",
  },
];

const PRACTICES = [
  "Secure development lifecycle with mandatory code review",
  "Dependency vulnerability scanning on every build",
  "Regular penetration testing by third-party security firms",
  "No customer production data used in development or test environments",
  "Vendor security assessment before onboarding third-party processors",
  "Business continuity and disaster recovery plans maintained and tested",
  "Employee security awareness training conducted regularly",
  "Sensitive credentials managed through secrets management tooling — never hardcoded",
];

export default function Security() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-8 pt-[120px] pb-32">

        {/* HEADER */}
        <Motion>
          <div className="mb-16">
            <div className="text-[10px] text-white/40 tracking-[0.2em] mb-4">TRUST & SECURITY</div>
            <h1 className="text-[40px] font-semibold mb-5">Security at ShieldX</h1>
            <p className="text-white/50 text-[17px] leading-relaxed max-w-2xl">
              ShieldX processes decision-critical data for financial institutions. Security is infrastructure — not a feature.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["DPDPA 2025 Aligned", "ISO 27001 In Progress", "AES-256 Encryption", "TLS 1.2+ In Transit"].map((b, i) => (
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
