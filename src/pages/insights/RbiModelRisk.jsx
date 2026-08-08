import { Link } from "react-router-dom";
import InsightLayout from "../../components/InsightLayout";

// Every factual claim here was verified against multiple independent
// summaries in Aug 2026 before drafting: title, issue date (24 Jun 2026),
// press release number (2026-2027/528), comment deadline (24 Jul 2026), draft
// status, scope, the functional model definition, third-party obligations,
// 10-year retention (para 23), the inventory-as-deployment-gate, the Chapter 3
// (2002 Credit Risk Guidance Note) replacement, and the AI-specific controls.
// Two things are stated repeatedly and deliberately: it is a DRAFT, and no
// implementation timeline has been announced. Nothing here tells a reader to
// treat it as in force. The standing note near the top commits us to updating
// this when the final guidance lands — that promise needs honouring.
//
// Aug 2026: re-verified claim-by-claim against the primary text at
// rbi.org.in/Scripts/bs_viewcontent.aspx?Id=5089 (the full draft, not secondary
// coverage), and every paragraph cite in the piece was read in the source before
// being printed. Cited by press release number because the DoR document
// reference on the draft is still a placeholder (DoR.ORG.REC.XXXX/... June xx).
//
// One deliberate wording choice: para 64 says the FINAL Guidance "would
// supersede" Chapter 3 of the 2002 Credit Risk Guidance Note. So the supersession
// is stated by the draft but conditional on the final text — "the draft says
// plainly that the final Guidance ... would supersede" is firm about the source
// and honest about the conditionality. Do not flatten this to "replaces".
//
// The DPDP cross-reference near para 25 is now a live link — that piece
// published 2026-08-08. If it is ever pulled, unlink this too.
export default function RbiModelRisk() {
  return (
    <InsightLayout
      kicker="REGULATION"
      title="Your rules engine is a model now"
      dek="RBI's draft model risk guidance defines a model by what it does, not what it's called. On that definition, the spreadsheet your collections team scores on is in scope — and so is every vendor system making decisions on your book."
      description="What RBI's draft Guidance on Regulatory Principles for Model Risk Management, 2026 covers, who it applies to, what it asks of third-party models, and what is reasonable to do while it remains in draft."
      path="/insights/rbi-model-risk-management"
      date="August 2026"
      datePublished="2026-08-08"
      closing={
        <>
          ShieldX is decisioning infrastructure for collections, built so every
          one of the five questions above has an answer — which model version
          produced a decision, what changed at the last retrain, how inputs have
          drifted, what logic fired on a given account — with documentation and
          audit access contracted upfront. The standing commitments behind that
          are published as the Neutrality Charter.
        </>
      }
    >
      <p>
        On 24 June 2026 the Reserve Bank issued a draft{" "}
        <em>Guidance on Regulatory Principles for Model Risk Management, 2026</em>{" "}
        (Press Release 2026-2027/528), with public comments invited until 24 July.
        It remains in draft at the time of writing, and{" "}
        <strong>no implementation timeline has been announced</strong> — that is
        expected to arrive with the final guidance. Nothing below should be read
        as describing an obligation currently in force.
      </p>

      <p className="insight-note">
        Source:{" "}
        <a
          href="https://www.rbi.org.in/Scripts/bs_viewcontent.aspx?Id=5089"
          target="_blank"
          rel="noopener noreferrer"
        >
          the full text of the draft Guidance
        </a>
        , Reserve Bank of India, Press Release 2026-2027/528, 24 June 2026.
        Paragraph references below are to that text. It is cited by press release
        number because the document reference on the draft is still a placeholder.
        This analyses the draft as issued, and will be updated when the final
        guidance is published.
      </p>

      <p>
        It is still worth reading carefully now, for one reason: the definitional
        change in it is larger than the compliance burden, and it lands on systems
        most institutions do not currently think of as models at all.
      </p>

      <h2>The definition is functional, not technical</h2>

      <p>
        Earlier RBI material on model risk sat inside credit risk management, and
        the draft says plainly that the final Guidance, after public consultation,
        would supersede Chapter 3 on Credit Risk Models of the 2002 Guidance Note
        on Credit Risk Management (para 64). The instinct that follows is to scope
        this exercise to credit scorecards and PD models.
      </p>

      <p>
        The draft does not permit that. Para 7(3) defines a model by function: a
        system that takes inputs, applies processing logic, and produces results
        used for decision-making. It expressly includes algorithms, analytics,
        interfaces, applications and <strong>decision-based rules</strong> which,
        by virtue of their use, materially affect decisions —{" "}
        <em>
          irrespective of whether such tools are recognised as models by the RE
        </em>
        . Third-party models are inside the same definition.
      </p>

      <blockquote>
        If it takes inputs, applies logic, and changes what happens to a borrower,
        it is a model — whatever your org chart calls it.
      </blockquote>

      <p>
        The draft makes the point with its own illustration, and it is a
        spreadsheet: a loan-pricing calculator is, in isolation, a basic
        mathematical tool — but where an institution uses it to derive lending
        rates, customer margins or credit terms, taking in borrower type, tenor,
        credit score and collateral value, it is a model. The distinction being
        drawn is not about sophistication. It is about consequence.
      </p>

      <p>
        For a collections function specifically, that is a wider net than it first
        appears. The DPD bucketing logic. The rules deciding who gets a call versus
        a message. The allocation sheet that assigns accounts across agencies. The
        propensity score a vendor supplies. Each takes inputs, applies logic, and
        materially changes what happens to a borrower. Each is in scope on this
        reading.
      </p>

      <h2>Who it applies to</h2>

      <p>
        Substantially the whole regulated perimeter (para 4): commercial banks
        including foreign banks, small finance banks, payments banks, local area
        banks, regional rural banks, urban and rural cooperative banks, NBFCs
        across all layers, all-India financial institutions, asset reconstruction
        companies, and credit information companies.
      </p>

      <p>
        Notably for collections, ARCs are named. So is every NBFC layer, not only
        the upper ones.
      </p>

      <h2>What it asks for</h2>

      <ul>
        <li>
          A <strong>board-approved Model Risk Management Framework</strong> covering
          all models, internal or third-party (para 9), with high-risk models
          approved by the Risk Management Committee of the Board (paras 12(1) and
          18(ii)).
        </li>
        <li>
          A <strong>living model inventory</strong> covering active, inactive and
          decommissioned models (para 21) — not a one-off stocktake, but a
          maintained record of what is running, who owns it, and what it does.
        </li>
        <li>
          <strong>Independent validation by the institution itself</strong>,
          expressly notwithstanding any validation, certification or assurance the
          vendor provides (paras 29 and 46(i)).
        </li>
        <li>
          <strong>Retention of decommissioned models</strong> in the inventory for
          at least ten years (para 23).
        </li>
      </ul>

      <p>
        The inventory is the item most likely to be underestimated, because the
        draft does not treat it as a register kept for the auditor's benefit. Para
        21 requires an institution to ensure that{" "}
        <strong>
          no model is used, relied upon, or deployed unless it is part of inventory
        </strong>
        . That is a gate on production rather than a record of it — and a gate is a
        materially different thing to build. It implies someone owns the entry,
        someone approves it, and a deployment that skips it is a control failure
        rather than a documentation gap.
      </p>

      <p>
        The retention clock is subtler than it first reads, and the detail matters.
        The ten years run from the date of decommissioning{" "}
        <em>
          or the date the model ceases to serve as a backup or benchmark reference,
          whichever is later
        </em>
        . A model you retired two years ago but still run as a challenger benchmark
        has not started its clock at all. Institutions that keep old scorecards
        around for comparison — which is most of them, and is good practice — are
        holding models whose retention period has not yet begun.
      </p>

      <h2>The clause that matters if you buy software</h2>

      <p>
        Third-party models are in scope, and the draft is direct about where
        responsibility sits. Para 45 states that an institution acquiring, using or
        relying upon a third-party model, at any stage of its lifecycle, is
        accountable for its outcomes. The principle underneath that is simple:
        outsourcing the model does not outsource the risk.
      </p>

      <p>Concretely, a regulated entity is expected to:</p>

      <ul>
        <li>
          <strong>Independently validate</strong> the vendor's model, notwithstanding
          any validation, certification or assurance the vendor provides (para 46(i)).
        </li>
        <li>
          Conduct <strong>due diligence before acquisition or use</strong> — the
          provider's credibility, the model's methodological soundness and its
          limitations, and the suitability and quality of the data behind it
          (para 47).
        </li>
        <li>
          Contract for <strong>technical documentation</strong> sufficient to
          understand the model's design, configuration, assumptions and operation —
          and sufficient to validate it (para 48).
        </li>
        <li>
          Contract for <strong>audit rights for the institution and its supervisory
          authority</strong>, directly or through external experts, together with{" "}
          <strong>continuity and exit arrangements</strong> (para 48).
        </li>
        <li>
          Put the model under <strong>enhanced oversight by the Risk Management
          Committee of the Board</strong>, irrespective of its risk tier
          (para 46(ii)) — a vendor model does not get to be low-risk enough to
          escape board-committee attention.
        </li>
      </ul>

      <p>
        That fourth item is stronger than the phrase "audit rights" usually implies
        in a software contract. The draft asks for audit access not only for the
        institution but for its regulator. It is a fair thing to raise in a first
        commercial conversation, and a revealing one: a vendor comfortable with
        institutional audit but uneasy about regulator audit has told you something
        about what an audit would find.
      </p>

      <p>
        This is the part worth raising with vendors early, because it is the part
        most likely to be unanswerable late. A vendor that cannot tell you which
        model version produced a given decision, what changed at the last retrain,
        or how its inputs have drifted since deployment, is a vendor whose model you
        cannot independently validate — and the obligation to validate is yours, not
        theirs.
      </p>

      <h2>The AI-specific controls</h2>

      <p>
        Where models are AI or ML systems, and particularly where they face
        customers, the draft adds a further set of expectations: explainability and
        transparency thresholds and behaviour testing under adversarial and edge
        conditions (para 54), structured challenge including red-teaming (para 55),
        controls against prompt injection and adversarial inputs, disclosure to
        users that they are interacting with an AI system and its limitations
        (para 59), human-in-command arrangements, override, suspension and
        kill-switch mechanisms, and periodic human review of model-driven decisions
        (para 60) — with explicit attention to automation bias, over-reliance on
        model outputs, and decision fatigue (para 61).
      </p>

      <p>
        For anyone running or planning voice AI in collections, that list is the
        specification. It is worth designing against now rather than retrofitting,
        because several of those items — override paths, disclosure, transfer to
        human — are architectural rather than cosmetic.
      </p>

      <h2>The clause collections should read twice</h2>

      <p>
        Para 25 is two sentences long and easy to skim past. An institution should
        not use any model that harms consumers, and its grievance redressal
        mechanism should also address grievances arising from consumer-facing
        models.
      </p>

      <p>
        In a collections context that is more demanding than it sounds. Answering a
        borrower's complaint about a contact they should not have received means
        tracing that contact back through whichever logic selected them, at
        whichever agency or channel made it, on the day it happened. Most
        institutions cannot currently do that — the allocation sheet, the dialer,
        the agency's own record and the complaint all live in different places, and
        nothing joins them.
      </p>

      <p>
        Worth noting that{" "}
        <Link to="/insights/dpdp-collections">
          the DPDP Rules land on the same requirement from the other direction
        </Link>
        : grievance redressal has to work even where the interaction was conducted
        by an agency rather than the lender. Two regimes, arriving separately, both
        asking an institution to trace a borrower complaint back to the decision
        and the channel that produced it.
      </p>

      <h2>What is reasonable to do while it is still draft</h2>

      <p>
        Not much, and that is a considered answer. Building a control framework
        against a draft that may change is how institutions end up with expensive
        machinery aimed at the wrong target.
      </p>

      <p>
        The exception is the inventory. Knowing which systems in your collections
        stack take inputs, apply logic, and change borrower outcomes is useful
        whatever the final text says. It is a prerequisite for every other
        requirement — and, if the deployment gate survives into the final text,
        the thing every future release has to pass through. It takes real calendar
        time to assemble across business units and vendors, and it has independent
        value: most institutions discover during this exercise that several
        consequential decisions are being made by logic nobody currently owns.
      </p>

      <p>
        The second no-regret move is contractual. If you are signing or renewing a
        vendor agreement now, the technical-documentation and audit-rights clauses
        are much easier to insert at signature than to negotiate afterwards under
        regulatory pressure.
      </p>

      <h2>The question to put to any vendor</h2>

      <p>
        Not "are you MRM compliant" — nobody is, and nobody can be, while the
        guidance is in draft and no timeline exists. Any vendor claiming otherwise
        is telling you something about their diligence rather than their controls.
      </p>

      <p>The useful questions are narrower and answerable today:</p>

      <ul>
        <li>Which version of your model produced this specific decision?</li>
        <li>What changed at the last retrain, and when was it?</li>
        <li>How have the input distributions moved since deployment?</li>
        <li>
          Can I see the logic that fired on a given account — not just the output?
        </li>
        <li>
          Will you commit contractually to technical documentation, audit access for
          us and our regulator, and exit arrangements?
        </li>
      </ul>

      <p>
        A vendor that can answer those has the evidence base an independent
        validation needs. A vendor that cannot will make that validation your
        problem to solve without them.
      </p>

      <p>
        One last thing worth holding in view. Para 2 notes, referring to Utkarsh
        2029, that further requirements applicable to AI models may be issued later.
        Whatever the final text of this guidance says, it is unlikely to be the last
        word — which argues for building the evidence base rather than the specific
        control, because the evidence base is what every version of this will ask
        for.
      </p>
    </InsightLayout>
  );
}
