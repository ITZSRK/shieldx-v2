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

const SECTIONS = [
  {
    title: "Who we are",
    body: `ShieldX is a product of Quelo Technologies Private Limited, a company incorporated in India. We build decision infrastructure for financial institutions — banks, NBFCs, ARCs, and their collection partners operating in India.

For the purposes of this Privacy Policy, "we", "us", and "our" refer to Quelo Technologies Private Limited. Our registered address is in Mumbai, Maharashtra, India.`,
  },
  {
    title: "Applicable law",
    body: `This Privacy Policy is governed by and construed in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable rules thereunder, as notified by the Ministry of Electronics and Information Technology, Government of India.

We act as a Data Fiduciary under the DPDP Act in respect of personal data we collect directly. Where we process personal data on behalf of our institutional customers (financial institutions), we act as a Data Processor and are bound by the data processing agreements in place with those institutions.`,
  },
  {
    title: "What data we collect",
    body: `We collect the following categories of personal data:

• Contact and identity data: name, email address, phone number, and organisation name, collected when you engage with us via our website, demo requests, or sales conversations.

• Usage data: interaction logs, browser type, IP address, and session data collected when you access our website or product interfaces.

• Professional data: job title, company, and information you voluntarily provide in communications with us.

We do not collect sensitive personal data (as defined under the DPDP Act) directly through our website. Our institutional customers are responsible for data they input into ShieldX systems under their own regulatory obligations.`,
  },
  {
    title: "Purpose and legal basis",
    body: `We process personal data for the following purposes, each supported by a legitimate basis under the DPDP Act:

• To respond to demo requests and enquiries — based on your consent provided at the point of submission.

• To communicate product updates and relevant information to prospects and customers — based on legitimate interest or consent, as applicable.

• To operate, maintain, and improve our platform — based on contractual necessity for customers, and legitimate interest for prospects.

• To meet our legal and regulatory obligations — based on legal obligation.

We will not use your personal data for purposes beyond those stated here without obtaining your prior consent.`,
  },
  {
    title: "Data sharing",
    body: `We do not sell your personal data. We may share it in the following circumstances:

• With service providers who process data on our behalf under contractual data processing agreements — limited to what is necessary for the service.

• With regulatory authorities or law enforcement where required by applicable Indian law.

• In the event of a business transfer (merger, acquisition, or asset sale), with the acquiring party, subject to equivalent privacy protections.

We do not transfer personal data outside India except where required by contract or law, and only with adequate safeguards in place as required under the DPDP Act.`,
  },
  {
    title: "Your rights under the DPDP Act",
    body: `As a data principal under the DPDP Act, you have the following rights:

• Right to access: request confirmation of whether we hold your personal data and a summary of the data.

• Right to correction: request correction of inaccurate or incomplete personal data.

• Right to erasure: request deletion of personal data where it is no longer necessary for the stated purpose.

• Right to grievance redressal: raise a grievance with our Data Protection Officer and receive a response within the timelines prescribed under the DPDP Act.

• Right to nominate: nominate another individual to exercise your rights in the event of your death or incapacity.

To exercise any of these rights, contact our Data Protection Officer at the details below.`,
  },
  {
    title: "Data retention",
    body: `We retain personal data only for as long as necessary to fulfil the stated purpose, or as required by applicable Indian law and regulatory obligations.

Contact and communication data is retained for up to 3 years from the date of last interaction, unless a longer retention period is required by law. Audit logs are retained as required under applicable financial sector regulations.`,
  },
  {
    title: "Cookies and analytics",
    body: `Our website uses a small number of cookies necessary for the site to function. These are set without consent because the site cannot operate without them.

We also use Google Analytics to understand aggregate usage patterns — which pages are read, and how visitors move between them. Google Analytics sets non-essential cookies, so it is loaded only after you accept analytics in the banner shown on your first visit. If you decline, or ignore the banner, no analytics cookie is set and no analytics data is collected.

You can change your mind at any time by clearing this site's data in your browser, which will present the banner again on your next visit. We do not use advertising cookies, and we do not use cookies to track you across other websites.`,
  },
  {
    title: "Contact and grievance redressal",
    body: `For any privacy-related queries or to exercise your rights under the DPDP Act, contact our Data Protection Officer:

Quelo Technologies Private Limited
Email: privacy@queloai.online

We will acknowledge your request within 48 hours and respond within the timelines prescribed under the DPDP Act. If you are not satisfied with our response, you may escalate your grievance to the Data Protection Board of India once it is constituted under the DPDP Act.`,
  },
];

export default function Privacy() {
  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="How ShieldX collects, uses, and protects personal data under the Digital Personal Data Protection Act, 2023."
        path="/privacy"
      />
      <section className="max-w-3xl mx-auto px-8 pt-[120px] pb-32">

        <Motion>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.15] bg-white/[0.05] text-white/60 text-xs tracking-[0.18em] mb-6">
              LEGAL
            </div>
            <h1 className="text-[40px] font-semibold mb-4">Privacy Policy</h1>
            <p className="text-white/45 text-sm">
              Effective date: 1 January 2026 · Governed by the Digital Personal Data Protection Act, 2023
            </p>
          </div>
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

      </section>
    </Layout>
  );
}
