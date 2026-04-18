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
    title: "Agreement",
    body: `These Terms of Use ("Terms") govern your access to and use of the ShieldX website (shieldx.in) and any product demonstrations or materials made available by Quelo Technologies Private Limited ("we", "us", "our").

By accessing this website or engaging with our product, you agree to these Terms. If you do not agree, please do not use this website.`,
  },
  {
    title: "ShieldX is a B2B product",
    body: `ShieldX is a decision infrastructure platform sold exclusively to financial institutions — banks, non-banking financial companies (NBFCs), and insurance companies regulated by the Reserve Bank of India (RBI), Insurance Regulatory and Development Authority of India (IRDAI), and other applicable Indian regulatory bodies.

This website is intended for institutional decision-makers evaluating enterprise software. It is not a consumer-facing product or service.`,
  },
  {
    title: "Website use",
    body: `You may access and use this website for informational purposes and to evaluate whether ShieldX is suitable for your institution. You may not:

• Use the website for any unlawful purpose under Indian law.
• Attempt to gain unauthorised access to any system or data.
• Reproduce, distribute, or exploit any content from this website without our prior written consent.
• Use automated tools to scrape, crawl, or extract data from this website.`,
  },
  {
    title: "Intellectual property",
    body: `All content on this website — including product descriptions, graphics, code, and documentation — is the intellectual property of Quelo Technologies Private Limited and is protected under applicable Indian intellectual property law.

"ShieldX" and related product names and marks are proprietary to Quelo Technologies Private Limited. Nothing on this website grants you any licence to use our marks or intellectual property.`,
  },
  {
    title: "Product terms",
    body: `Use of the ShieldX platform by financial institutions is governed by a separate Master Services Agreement (MSA) and Order Form executed between your institution and Quelo Technologies Private Limited. These Terms of Use do not govern your use of the product itself — that is governed exclusively by your executed agreement with us.`,
  },
  {
    title: "No warranties",
    body: `This website and its content are provided on an "as is" basis. We make no warranties, express or implied, regarding the accuracy, completeness, or fitness for purpose of any content on this website.

Nothing on this website constitutes legal, regulatory, or compliance advice. Financial institutions must conduct their own assessment of applicable regulatory requirements.`,
  },
  {
    title: "Limitation of liability",
    body: `To the fullest extent permitted by applicable Indian law, Quelo Technologies Private Limited shall not be liable for any indirect, incidental, or consequential loss arising from your use of this website.

Our total liability for any direct claims arising from use of this website shall not exceed INR 1,000.`,
  },
  {
    title: "Governing law and jurisdiction",
    body: `These Terms are governed by the laws of India. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, India.`,
  },
  {
    title: "Changes to these Terms",
    body: `We may update these Terms from time to time. Material changes will be noted with a revised effective date at the top of this page. Continued use of the website after changes constitutes acceptance of the updated Terms.`,
  },
  {
    title: "Contact",
    body: `For any queries about these Terms, contact us at:

Quelo Technologies Private Limited
Email: legal@queloai.online`,
  },
];

export default function Terms() {
  return (
    <Layout>
      <section className="max-w-3xl mx-auto px-8 pt-[120px] pb-32">

        <Motion>
          <div className="mb-12">
            <div className="text-[10px] text-white/40 tracking-[0.2em] mb-4">LEGAL</div>
            <h1 className="text-[40px] font-semibold mb-4">Terms of Use</h1>
            <p className="text-white/45 text-sm">
              Effective date: 1 January 2026 · Governed by the laws of India
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
