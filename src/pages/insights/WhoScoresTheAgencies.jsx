import InsightLayout from "../../components/InsightLayout";

// Framing matters here. The argument is NOT "incumbent vendors are conflicted"
// — they aren't, structurally: they optimise inside the slice they're given and
// never allocate across agencies. The argument is that whole-book allocation is
// a role nobody currently holds, and that the role carries a constraint on who
// can credibly hold it. That's accurate, non-adversarial, and explains why the
// category exists at all.
export default function WhoScoresTheAgencies() {
  return (
    <InsightLayout
      kicker="NEUTRALITY"
      title="Who scores the agencies?"
      dek="Every collections vendor optimises the slice it was given. None of them can see the whole book. That leaves the most consequential decision in collections — which accounts go where — sitting with the bank, made on less information than any single vendor has about its own portion."
      description="Cross-agency allocation is a role almost nobody occupies in Indian collections today. Why the gap exists, and why whoever fills it cannot also be competing to receive allocation."
      path="/insights/who-scores-the-agencies"
      date="August 2026"
    >
      <p>
        Ask a lender how it decides which accounts go to which agency, and the
        answer is usually some combination of historical relationship, stated
        capacity, and a spreadsheet. Slices get cut. Each agency or vendor receives
        its allocation and gets to work.
      </p>

      <p>
        What happens next is often genuinely sophisticated. A vendor receiving an
        allocation will score it, segment it, decide channel and timing, design
        campaigns, and iterate on what works. Some of the best applied modelling in
        Indian financial services happens inside those operations.
      </p>

      <p>
        But all of it is bounded by the allocation. A vendor optimises within the
        slice it was handed. It cannot compare its own performance against the
        agency working the desk next door on a similar cohort, because it never sees
        that cohort. It cannot tell the lender that a particular set of accounts
        would recover better somewhere else entirely. It is not being withholding —
        it simply has no line of sight beyond its own portion of the book.
      </p>

      <h2>The decision nobody is positioned to make</h2>

      <p>
        Which leaves the most consequential decision in the whole arrangement — who
        gets which accounts — sitting with the lender, made at a level of resolution
        far below what any individual vendor has about its own slice.
      </p>

      <p>
        The lender knows aggregate recovery by agency. It rarely knows whether
        agency A outperformed agency B <em>on comparable accounts</em>, because
        the two were never given comparable accounts. It cannot see that a cohort
        underperforming with one partner has a profile that another partner
        consistently resolves. Those comparisons require a view across the whole
        book, held by someone with no stake in the answer.
      </p>

      <blockquote>
        Allocation is the highest-leverage decision in collections, and it is
        routinely made with the least information.
      </blockquote>

      <h2>Why this layer doesn't already exist</h2>

      <p>
        Part of the reason is technical: comparing partners fairly needs one
        taxonomy, one set of outcome definitions, and outcome data flowing back from
        every channel in a consistent shape. That is real work and most institutions
        have not done it.
      </p>

      <p>
        But the larger reason is structural. The organisations with the data,
        modelling capability and domain knowledge to do this well are, almost
        without exception, also organisations that receive allocation. And the
        moment a party that receives allocation starts recommending allocation, its
        recommendations acquire a second possible reading that nobody can rule out
        by looking at them.
      </p>

      <p>
        If the recommendation says shift volume toward a particular channel, is that
        because the channel performed, or because the channel belongs to whoever
        produced the recommendation? Both hypotheses generate the same output. The
        lender cannot separate them by inspecting the result.
      </p>

      <p>
        This is not an accusation about how anyone operates today. It is a
        constraint on who can credibly hold a role that is mostly still vacant.
      </p>

      <h2>Why "we would never do that" isn't sufficient</h2>

      <p>
        The natural response is assurance: we would never weight our own channels.
        In most cases that would be entirely sincere. It is also
        <strong> unfalsifiable</strong>, and unfalsifiable assurances carry little
        weight inside a regulated institution.
      </p>

      <p>
        A bank's risk function accepts "trust us" nowhere else — not for model
        validation, not for access control, not for data handling, not for
        outsourcing. Each of those must be evidenced rather than promised. There is
        no principled reason allocation should be the exception, least of all when
        allocation sits closer to the money than any of them.
      </p>

      <h2>The party nobody asks</h2>

      <p>
        There is a second constituency here, and it is routinely overlooked: the
        agency being measured.
      </p>

      <p>
        Cross-agency allocation only works if outcome data flows back from every
        partner in a consistent, timely, structured form. Which means asking each
        agency to submit its contact attempts, dispositions, outcomes and costs into
        a shared system.
      </p>

      <p>
        If that system is operated by a party the agency competes with for
        allocation, the agency has an obvious incentive to submit the minimum, as
        late as it can, in the least usable format it can defend. That is not
        obstruction; it is a rational response to being asked to arm a competitor.
      </p>

      <p>
        So the conflict does not only risk distorted allocation. It starves the
        layer of the data it needs to function at all. A scorecard the agencies will
        not feed honestly measures nothing — and the institution ends up allocating
        on partial information while believing it is allocating on evidence.
      </p>

      <h2>Structural, not aspirational</h2>

      <p>
        Neutrality asserted in a sales meeting is a statement of intent. Intent
        moves with quarterly targets, with a new head of revenue, with an
        acquisition. What an institution needs is neutrality it does not have to
        take on faith — a constraint the vendor cannot quietly exit.
      </p>

      <p>That means committing to things that are costly and checkable:</p>

      <ul>
        <li>
          Never operating human collections. No tele-calling floor, no field force,
          no collection agents — for any client, at any scale, permanently. A party
          that cannot receive allocation has nothing to bias allocation toward.
        </li>
        <li>
          Scoring every channel on one methodology, including our own, in the same
          tables, through the same code path, with the same outcome definitions —
          not a parallel process that happens to produce similar numbers.
        </li>
        <li>
          Leaving the objective function with the institution. The platform reports
          performance and recommends against the priorities the institution states.
          It does not move volume on its own initiative.
        </li>
      </ul>

      <p>
        Each of those is checkable. An institution can inspect whether a separate
        code path exists for our own channels. It can ask whether volume has ever
        moved without its approval. It can require, in a contract, that we have not
        reserved the right to enter human collections later.
      </p>

      <h2>What the commitment costs</h2>

      <p>
        It would be dishonest to present this as costless positioning. Human
        collections is the largest revenue line in this industry by a wide margin.
        Committing never to operate it means permanently forgoing the biggest single
        business available in the category we work in.
      </p>

      <p>
        That is what makes it a commitment. A promise that costs nothing to keep
        tells an institution nothing about what a vendor will do under pressure. The
        question worth putting to any collections technology partner is not whether
        they intend to be fair. It is what their neutrality would cost them to
        abandon — and whether they have written that answer down somewhere an
        institution can hold them to it.
      </p>

      <p>
        I spent eighteen years in this industry, including at companies whose
        primary business was collections, before building ShieldX. Nothing here is
        aimed at them. The allocation layer simply wasn't a job anyone was positioned
        to take — and working inside those operations is where it became obvious
        both that the gap was real and what would have to be true of whoever filled
        it.
      </p>
    </InsightLayout>
  );
}
