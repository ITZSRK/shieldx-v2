import InsightLayout from "../../components/InsightLayout";

// Argues the structure, never a named competitor. "Vendor X is conflicted" is
// both legally risky and rhetorically weaker than a structural claim the
// reader resolves to specific companies themselves.
export default function WhoScoresTheAgencies() {
  return (
    <InsightLayout
      kicker="NEUTRALITY"
      title="Who scores the agencies?"
      dek="In most collections stacks, the system recommending where accounts go is operated by a company that also wants to receive them. That isn't an ethics problem. It's a structural one, and it can't be fixed with an assurance."
      description="Why collections technology operated by a company that also performs collections cannot produce neutral allocation recommendations — and what structural neutrality would have to mean instead."
      path="/insights/who-scores-the-agencies"
      date="August 2026"
    >
      <p>
        A lender running a collections book of any size works with several agencies
        and several channels at once. Someone has to decide which accounts go where,
        in what order, at what cost. That decision is worth more than any other
        component in the stack, because it determines where recovery actually
        happens — and where it doesn't.
      </p>

      <p>
        The question that rarely gets asked in a vendor evaluation is who is making
        that recommendation, and what else that party does for a living.
      </p>

      <h2>Two readings of the same number</h2>

      <p>
        A large share of collections technology sold in India is built by companies
        that also perform collections. Often the platform began as internal tooling
        for their own recovery operation and was productised later. That history is
        not a scandal. It is how a lot of good software gets made.
      </p>

      <p>
        But it creates a specific problem, and the problem is not about anyone's
        integrity. When the system that recommends allocation is operated by a party
        that also receives allocation, every recommendation carries two possible
        readings. If the scorecard says shift volume toward a particular channel, is
        that because the channel is performing, or because the channel belongs to
        the party keeping the scorecard?
      </p>

      <p>
        Both produce an identical output. The institution cannot separate them by
        inspecting the recommendation, because the recommendation looks the same
        either way.
      </p>

      <h2>Why "we would never do that" fails</h2>

      <p>
        The standard answer to this is an assurance: we would never weight our own
        channels. In most cases that is entirely sincere. It is also
        <strong> unfalsifiable</strong>, and an unfalsifiable assurance is worth
        very little inside a regulated institution.
      </p>

      <p>
        A bank's risk function does not accept "trust us" anywhere else. Not for
        model validation, not for access control, not for data handling, not for
        outsourcing. Every one of those is required to be evidenced rather than
        promised. There is no principled reason allocation should be the single
        exception — particularly when allocation sits closer to the money than any
        of them.
      </p>

      <blockquote>
        A conflict that depends on the vendor's goodwill to stay dormant is not
        managed. It is merely quiet.
      </blockquote>

      <h2>The party nobody asks</h2>

      <p>
        There is a second constituency in this arrangement, and it is routinely
        overlooked: the agency being measured.
      </p>

      <p>
        Consider what an agency is being asked to do. Submit its contact attempts,
        its dispositions, its outcomes and its costs — in structured, timely,
        machine-readable form — into a platform operated by a company that competes
        with it for the same allocation.
      </p>

      <p>
        An agency in that position has an obvious incentive to submit the minimum,
        as late as possible, in the least usable format it can defend. That is not
        obstruction. It is a rational response to being asked to arm a competitor.
      </p>

      <p>
        Which means the conflict does not only risk distorted allocation. It
        degrades the data the entire system depends on. A scorecard the agencies
        will not feed honestly is a scorecard that measures nothing — and the
        institution ends up allocating on partial information while believing it is
        allocating on evidence.
      </p>

      <h2>Structural, not aspirational</h2>

      <p>
        Neutrality asserted in a sales meeting is a statement of intent. Intent
        changes with quarterly targets, with a new head of revenue, with an
        acquisition. What an institution needs is neutrality it does not have to
        take on faith — a constraint the vendor cannot quietly exit.
      </p>

      <p>That means committing to things that are costly and checkable:</p>

      <ul>
        <li>
          Never operating human collections. No tele-calling floor, no field force,
          no collection agents — for any client, at any scale, permanently. An
          allocator that cannot receive allocation has nothing to bias toward.
        </li>
        <li>
          Scoring every channel on one methodology, including the vendor's own, in
          the same tables, through the same code path, with the same outcome
          definitions. Not a parallel process that happens to produce similar
          numbers.
        </li>
        <li>
          Leaving the objective function with the institution. The platform reports
          performance and recommends against the institution's stated priorities. It
          does not move volume on its own initiative.
        </li>
      </ul>

      <p>
        Each of those is verifiable. An institution can inspect whether a separate
        code path exists for the vendor's own channels. It can ask whether volume
        has ever moved without its approval. It can check, in a contract, whether
        the vendor has reserved the right to enter human collections later.
      </p>

      <h2>What the commitment costs</h2>

      <p>
        It would be dishonest to present this as costless positioning. Human
        collections is the largest revenue line in this industry by a wide margin.
        Committing never to operate it means permanently forgoing the biggest
        single business available in the category we work in.
      </p>

      <p>
        That is precisely what makes it a commitment. A promise that costs nothing
        to keep tells an institution nothing about what the vendor will do under
        pressure. The question worth asking any collections technology partner is
        not whether they intend to be fair. It is what their neutrality would cost
        them to abandon — and whether they have written that answer down anywhere an
        institution can hold them to.
      </p>

      <p>
        I spent eighteen years inside this industry, including at companies whose
        primary business was collections, before building ShieldX. This argument is
        not an accusation aimed at any of them. It is a description of a structure I
        watched from the inside, and a conclusion about what would have to be true
        for the allocation layer to be trusted by the institutions relying on it and
        by the agencies being measured by it.
      </p>
    </InsightLayout>
  );
}
