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

/* Illustrative rows — same three accounts as the Verdict note. */
const ROWS = [
  { acct: "****41 · Personal loan", numbers: [
      { phone: "98•• ••4820", live: true,  whose: "THE BORROWER'S · #1", conf: "0.94" },
      { phone: "91•• ••0771", live: true,  whose: "SOMEONE ELSE'S",      conf: "0.88" },
    ], verdict: "HOLD until 3 Oct", tone: "#34d399", why: "self-cured 5 of 6 · salary 1st · call 1 Oct 18:30" },
  { acct: "****10 · Two-wheeler", numbers: [
      { phone: "99•• ••3316", live: false, whose: "—",                   conf: "0.97" },
    ], verdict: "REFER now", tone: "#f87171", why: "no attributed alternate · presence needed" },
  { acct: "****77 · Credit card", numbers: [
      { phone: "70•• ••2208", live: true,  whose: "THE BORROWER'S · #1", conf: "0.91" },
      { phone: "88•• ••9145", live: true,  whose: "THE BORROWER'S · #2", conf: "0.71" },
    ], verdict: "REFER · below your hold line", tone: "#fbbf24", why: "0.71 against your 0.85 hold line" },
];

function Chip({ text, tone }) {
  return (
    <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded"
      style={{ color: tone, background: `${tone}18`, border: `1px solid ${tone}38` }}>
      {text}
    </span>
  );
}

function VerdictFile() {
  return (
    <div className="border border-white/15 rounded-xl bg-black/60 overflow-hidden font-mono text-xs">
      <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.18em] text-emerald-300/70">VERDICT FILE</span>
        <span className="text-[9px] text-white/22 tracking-widest">Illustrative</span>
      </div>
      <div className="px-4 py-2 grid grid-cols-[1.4fr_1fr_0.7fr_1.3fr_0.5fr_1.5fr] gap-2 text-[9px] text-white/30 tracking-widest border-b border-white/[0.06]">
        <span>ACCOUNT</span><span>NUMBER</span><span>LIVE?</span><span>THE BORROWER'S?</span><span>CONF.</span><span>ACCOUNT VERDICT</span>
      </div>
      {ROWS.map((r) => (
        <div key={r.acct} className="px-4 py-3 border-b border-white/[0.05] grid grid-cols-[1.4fr_1fr_0.7fr_1.3fr_0.5fr_1.5fr] gap-2 items-start">
          <span className="text-white/65 text-[11px]">{r.acct}</span>
          <div className="space-y-1.5">{r.numbers.map(n => <div key={n.phone} className="text-white/60 text-[11px]">{n.phone}</div>)}</div>
          <div className="space-y-1.5">{r.numbers.map(n => <div key={n.phone}><Chip text={n.live ? "LIVE" : "DEAD"} tone={n.live ? "#34d399" : "#8a8378"} /></div>)}</div>
          <div className="space-y-1.5">{r.numbers.map(n => <div key={n.phone}>{n.whose === "—" ? <span className="text-white/25">—</span> : <Chip text={n.whose} tone={n.whose.startsWith("THE") ? "#34d399" : "#fbbf24"} />}</div>)}</div>
          <div className="space-y-1.5">{r.numbers.map(n => <div key={n.phone} className="text-white/60 text-[11px]">{n.conf}</div>)}</div>
          <div>
            <div className="text-[12px] font-semibold" style={{ color: r.tone }}>{r.verdict}</div>
            <div className="text-[9px] text-white/32 mt-1 leading-snug">{r.why}</div>
          </div>
        </div>
      ))}
      <div className="px-4 py-2.5 text-[9px] text-white/30 leading-relaxed">
        LIVE — the number rings today. THE BORROWER'S — attributed to this customer, with a confidence score; #1 is the number to reach first.
        SOMEONE ELSE'S — live, but not the customer: a wrong-party risk, never dialled.
      </div>
    </div>
  );
}

const NUMBERS = [
  { big: "1 in 3", line: "numbers on a late-stage book is dead — or someone else's.", sub: "Every dial to it is waste; every connect is a wrong-party risk. Early books connect; late books cannot be found." },
  { big: "25 → 20", line: "of every 100 bucket-one accounts go to field. Five paid without a visit.", sub: "Field costs double the centre. The day-15 rule cannot tell which five." },
  { big: "2×", line: "the cost per resolved account in the field against the centre.", sub: "Paid on accounts that needed a call on payday, not a visit." },
];

const STEPS = [
  { n: "1", title: "Send", body: "Your allocation file, in your format — account, customer name, every number you hold. Optionally your grievance, cease and legal lists.", meta: "BY SFTP OR API" },
  { n: "2", title: "Get verdicts", body: "Per number: live, the borrower's, confidence, rank. Per account: hold with a date, or refer. Back in weeks for the Audit; before day 15, every cycle, on the module.", meta: "IN YOUR FILE FORMAT" },
  { n: "3", title: "Run", body: "Your dialler, your field, your agencies — fed the list Verdict produced. Outcomes return; the next verdict learns.", meta: "NO NEW PARTNER" },
];

export default function Verdict() {
  return (
    <Layout>
      <SEO
        title="Verdict — every number verified, every account decided, before the first call"
        description="Is the number live? Is it the borrower's? Hold or refer — decided before the campaign runs. Verdict is the reach module of ShieldX Decision."
        path="/platform/verdict"
      />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 pt-[110px] pb-20 grid md:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <Motion>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 text-xs tracking-[0.18em] mb-8"
            style={{ boxShadow: "0 0 18px rgba(52,211,153,0.22)" }}>
            VERDICT · INSIDE SHIELDX DECISION
          </div>
          <h1 className="text-[32px] md:text-[50px] leading-[1.06] font-semibold mb-6">
            Every number verified.<br />Every account decided.<br />Before the first call.
          </h1>
          <p className="text-white/62 text-[17px] leading-relaxed max-w-lg mb-8">
            Is the number live? Is it the borrower's? Hold or refer? Verdict answers
            all three on every account in the allocation — and hands you the file back
            in your own format. Nothing added to your records.
          </p>
          <Link to="/demo"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
            Request an Audit
          </Link>
          <div className="mt-4 text-[12px] text-white/35">Fixed fee · findings in weeks · you keep the Verdict File either way</div>
        </Motion>
        <Motion delay={0.15}><VerdictFile /></Motion>
      </section>

      {/* THREE NUMBERS */}
      <div className="bg-white/[0.04] border-y border-white/[0.09]">
        <section className="max-w-6xl mx-auto px-8 py-24">
          <Motion>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-white/20" />
              <span className="text-[11px] text-white/55 tracking-[0.22em]">WHAT THE ALLOCATION COSTS YOU</span>
            </div>
            <h2 className="text-[26px] md:text-[38px] font-semibold leading-tight mb-12">
              Three things are wrong with the allocation<br />before anyone dials it.
            </h2>
          </Motion>
          <div className="grid md:grid-cols-3 gap-8">
            {NUMBERS.map((n, i) => (
              <Motion key={n.big} delay={i * 0.08}>
                <div className="text-[44px] font-semibold leading-none mb-4" style={{ color: i === 1 ? "#fbbf24" : "white" }}>{n.big}</div>
                <div className="text-white/85 text-[15px] leading-snug mb-3">{n.line}</div>
                <div className="text-white/45 text-[13px] leading-relaxed">{n.sub}</div>
              </Motion>
            ))}
          </div>
          <Motion delay={0.2}>
            <p className="mt-12 text-white/40 text-[12px]">
              Ratios from the books we have analysed; rupees vary by institution. The Audit prints yours.
            </p>
          </Motion>
        </section>
      </div>

      {/* BOUNDARY */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <Motion>
          <h2 className="text-[26px] md:text-[36px] font-semibold mb-5">
            Verdict decides whether and how to reach — never what to offer.
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto leading-relaxed">
            One reach layer across the book. In bucket one it decides what stays with the centre;
            in the middle it sends field only where a phone cannot; on written-off pools it finds
            the borrower. Before the cycle ages, pre-due reminders are decided the same way.
            Refuse-to-pay and settlement offers are Decision Engine work.
          </p>
        </Motion>
      </section>

      {/* HOW IT WORKS */}
      <div className="bg-white/[0.04] border-y border-white/[0.09]">
        <section className="max-w-6xl mx-auto px-8 py-24">
          <Motion>
            <h2 className="text-[26px] md:text-[36px] font-semibold mb-12">Send the file. Get the verdicts. Run the campaign.</h2>
          </Motion>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <Motion key={s.n} delay={i * 0.08}>
                <div className="rounded-xl border border-white/[0.10] bg-white/[0.02] p-7 h-full">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-[34px] font-semibold text-emerald-300/80 leading-none">{s.n}</span>
                    <span className="text-[20px] font-semibold">{s.title}</span>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed mb-5">{s.body}</p>
                  <div className="text-[10px] tracking-[0.2em] text-white/35">{s.meta}</div>
                </div>
              </Motion>
            ))}
          </div>
          <Motion delay={0.2}>
            <div className="mt-10 rounded-xl border border-white/[0.10] bg-white/[0.03] p-6 grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-white font-medium mb-2">Start with the Audit</div>
                <p className="text-white/50 text-sm leading-relaxed">A one-time run, fixed fee: we replay six months of your referrals, or grade every number on one written-off pool. Findings and the Verdict File in weeks.</p>
              </div>
              <div>
                <div className="text-white font-medium mb-2">Then the module</div>
                <p className="text-white/50 text-sm leading-relaxed">Runs on every allocation you send, before the day-15 referral point, every cycle. Priced per number graded. Nothing else changes in how you work.</p>
              </div>
            </div>
          </Motion>
        </section>
      </div>

      {/* TRUST */}
      <section className="max-w-6xl mx-auto px-8 py-24">
        <Motion>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-white/20" />
            <span className="text-[11px] text-white/55 tracking-[0.22em]">FOR INFOSEC AND COMPLIANCE</span>
          </div>
          <h2 className="text-[26px] md:text-[36px] font-semibold mb-12">What leaves, what comes back, what is kept.</h2>
        </Motion>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
          {[
            ["Leaves", "Account reference, customer name, the numbers you hold. No PAN, Aadhaar, address or balance. SFTP or REST over TLS, India-resident."],
            ["Comes back", "Per number: live · the borrower's · confidence · rank. Per account: hold or refer, with a date and a reason. Your format. Nothing added."],
            ["Is kept", "Nothing. Inputs purged on return; verdict and confidence retained per your policy. Every file and every read in the audit log."],
            ["Roles under DPDP", "The lender is Data Fiduciary and determines the lawful basis for the processing. ShieldX acts only as a Data Processor, engaged under a valid contract — DPDP Act, 2023, s.8(2). We process what you send, for the purpose you state, and nothing else."],
          ].map(([h, b], i) => (
            <Motion key={h} delay={i * 0.06}>
              <div className="text-[18px] font-semibold mb-2">{h}</div>
              <p className="text-white/55 text-sm leading-relaxed">{b}</p>
            </Motion>
          ))}
        </div>
        <Motion delay={0.25}>
          <p className="mt-10 text-white/40 text-[12px]">No borrower OTP. No Aadhaar. No confirmation call. How the verdict is produced stays inside ShieldX; the verdict and its confidence come to you.</p>
        </Motion>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-8 pb-32 text-center">
        <Motion>
          <h2 className="text-[24px] md:text-[32px] font-semibold mb-4">Ask any collections partner three questions.</h2>
          <div className="text-white/55 leading-relaxed max-w-2xl mx-auto mb-8 space-y-2">
            <p>Which of these accounts paid without a visit?</p>
            <p>Which of my four numbers is actually the borrower's?</p>
            <p>Can you show me, per account, why it was dialled?</p>
          </div>
          <Link to="/demo"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
            Request an Audit
          </Link>
        </Motion>
      </section>
    </Layout>
  );
}
