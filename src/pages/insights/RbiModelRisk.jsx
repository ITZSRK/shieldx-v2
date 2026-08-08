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
        Source: Reserve Bank of India, Press Release 2026-2027/528, 24 June 2026.
        This analyses the draft as issued on that date, and will be updated when
        the final guidance is published.
      </p>

      <p>
        It is still worth reading carefully now, for one reason: the definitional
        change in it is larger than the compliance burden, and it lands on systems
        most institutions do not currently think of as models at all.
      </p>

      <h2>The definition is functional, not technical</h2>

      <p>
        Earlier RBI material on model risk sat inside credit risk management — the
        draft is expected to replace Chapter 3 of the 2002 Guidance Note on Credit
        Risk Management. The instinct that follows is to scope this exercise to
        credit scorecards and PD models.
      </p>

      <p>
        The draft does not permit that. It defines a model by function: broadly, any
        system that takes inputs, applies processing logic, and produces outputs
        that materially affect decisions — irrespective of what it is called
        internally. The commentary is explicit that this reaches statistical models,
        <strong> business rule engines</strong>, algorithms, AI/ML systems,
        generative AI, spreadsheet-based tools, and <strong>third-party models</strong>.
      </p>

      <blockquote>
        If it takes inputs, applies logic, and changes what happens to a borrower,
        it is a model — whatever your org chart calls it.
      </blockquote>

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
        Substantially the whole regulated perimeter: commercial banks, small finance
        banks, payments banks, regional rural banks, urban and rural cooperative
        banks, NBFCs across all layers, all-India financial institutions, asset
        reconstruction companies, and credit information companies.
      </p>

      <p>
        Notably for collections, ARCs are named. So is every NBFC layer, not only
        the upper ones.
      </p>

      <h2>What it asks for</h2>

      <ul>
        <li>
          A <strong>board-approved Model Risk Management Framework</strong> covering
          the full model lifecycle, with higher-risk models escalated to the Risk
          Management Committee of the Board.
        </li>
        <li>
          A <strong>living model inventory</strong> — not a one-off stocktake, but a
          maintained record of what is running, who owns it, and what it does.
        </li>
        <li>
          <strong>Independent validation</strong>, performed by the regulated entity
          itself.
        </li>
        <li>
          <strong>Retention of decommissioned models</strong> and their lifecycle
          documentation for at least ten years (para 23), to support later
          regulatory review, audit, and investigation.
        </li>
      </ul>

      <p>
        The inventory is the item most likely to be underestimated, because the
        draft does not treat it as a register kept for the auditor's benefit.{" "}
        <strong>
          No model is to be deployed unless it has been entered in the inventory.
        </strong>{" "}
        That makes it a gate on production rather than a record of it — and a gate
        is a materially different thing to build. It implies someone owns the
        entry, someone approves it, and a deployment that skips it is a control
        failure rather than a documentation gap.
      </p>

      <p>
        The retention requirement deserves a second look too. Ten years of
        lifecycle documentation for models you have already retired is an archival
        problem most institutions are not currently solving — and it is far cheaper
        to start capturing now than to reconstruct later from memory and email.
      </p>

      <h2>The clause that matters if you buy software</h2>

      <p>
        Third-party models are in scope, and the draft is direct about where
        responsibility sits. The principle, as the commentary puts it: outsourcing
        the model does not outsource the risk.
      </p>

      <p>Concretely, a regulated entity is expected to:</p>

      <ul>
        <li>
          <strong>Independently validate</strong> the vendor's model — vendor
          certification or assurance does not substitute for the institution's own
          validation.
        </li>
        <li>
          Conduct <strong>vendor due diligence</strong> before and during the
          engagement.
        </li>
        <li>
          Obtain <strong>technical documentation</strong> sufficient to understand
          and challenge the model.
        </li>
        <li>
          Hold <strong>contractual audit rights</strong> over the vendor.
        </li>
        <li>
          Maintain <strong>ongoing monitoring</strong> rather than a point-in-time
          sign-off.
        </li>
      </ul>

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
        customers, the draft adds a further set of expectations: human-in-the-loop
        or on-the-loop arrangements, kill-switch and override mechanisms, disclosure
        to customers that they are interacting with an AI system, an option to be
        transferred to a human on request, controls against hallucination and prompt
        injection, structured red-teaming, and periodic human review of AI-driven
        decisions with explicit attention to automation bias.
      </p>

      <p>
        For anyone running or planning voice AI in collections, that list is the
        specification. It is worth designing against now rather than retrofitting,
        because several of those items — override paths, disclosure, transfer to
        human — are architectural rather than cosmetic.
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
          Will you commit contractually to technical documentation and audit access?
        </li>
      </ul>

      <p>
        A vendor that can answer those has the evidence base an independent
        validation needs. A vendor that cannot will make that validation your
        problem to solve without them.
      </p>
    </InsightLayout>
  );
}
