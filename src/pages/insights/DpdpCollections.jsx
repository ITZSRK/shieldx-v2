import InsightLayout from "../../components/InsightLayout";

// Verified across multiple independent sources in Aug 2026 before drafting:
// Rules notified 13 Nov 2025 (G.S.R. 846(E)); three-phase rollout with
// substantive obligations at ~18 months (May 2027); Section 7 legitimate uses;
// Rule 3 notice; Rule 6 processor security; Rule 7 two-stage breach
// notification (without delay, then 72 hours); Schedule penalties of ₹250cr
// and ₹200cr. Sources disagreed on 12 vs 13 May 2027, so the piece says
// "May 2027" rather than picking a day it can't support.
//
// The rights section (S.11/12 vs S.13/14) was corrected after reading the
// gazette text directly, rather than working from the GDPR-shaped instinct that
// data-subject rights apply universally. S.11(1) and S.12(1) both read
// "previously given consent, including consent as referred to in clause (a) of
// section 7"; S.13(1) and S.14(1) carry no equivalent condition. Both source
// PDFs linked at the top were opened and confirmed to be the gazette originals
// — a 200 on the URL is not verification, only evidence that something is there.
//
// NOT PUBLISHED: absent from the sitemap and the Insights index pending a
// lawyer's read of the rights section. Statutory claims under a named byline
// get legal review before they ship.
export default function DpdpCollections() {
  return (
    <InsightLayout
      kicker="REGULATION"
      title="Collections inherits its consent"
      dek="Under DPDP, what a recovery team is permitted to do was largely decided by the notice given at origination — often years earlier, by a different department, in a form nobody wrote with collections in mind."
      description="How the DPDP Act and the DPDP Rules, 2025 apply to debt collections in India: lawful basis, agency data sharing, borrower rights during recovery, breach obligations, and what the May 2027 deadline actually requires."
      path="/insights/dpdp-collections"
      date="August 2026"
      datePublished="2026-08-08"
      closing={
        <>
          ShieldX is decisioning infrastructure for collections — consent basis,
          version, and withdrawal are recorded at account level on every decision,
          and every agency and channel interaction flows through one auditable
          record, so the evidence this regime demands exists by design rather than
          reconstruction. Our standing commitments are published as the Neutrality
          Charter.
        </>
      }
    >
      <p className="insight-note">
        Sources:{" "}
        <a
          href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          the Digital Personal Data Protection Act, 2023
        </a>{" "}
        (No. 22 of 2023), and{" "}
        <a
          href="https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          the Digital Personal Data Protection Rules, 2025
        </a>{" "}
        (G.S.R. 846(E), notified 13 November 2025), both as published in the
        Gazette of India.
      </p>

      <p>
        The Digital Personal Data Protection Rules were notified on 13 November
        2025, and unlike most of what lands on a compliance function's desk, they
        arrived with a clock. The rollout is phased: institutional provisions and
        the Data Protection Board took effect immediately, consent manager
        registration follows at roughly the twelve-month mark, and the substantive
        obligations — notice and consent, legitimate uses, data fiduciary duties,
        data principal rights, cross-border transfer — commence at eighteen months,
        in <strong>May 2027</strong>.
      </p>

      <p>
        That is not far away, and the work collections needs to do is mostly
        contractual and upstream rather than technical. Both take longer than
        building something.
      </p>

      <h2>DPDP has no legitimate interests clause</h2>

      <p>
        Anyone reasoning from GDPR will look for a legitimate-interests basis and
        not find one. DPDP offers consent, or one of nine specified{" "}
        <em>legitimate uses</em> under Section 7. There is no general balancing
        test to fall back on.
      </p>

      <p>
        Recovery activity may sometimes be justified under that heading — servicing,
        debt recovery, enforcement of legal claims. But the basis is narrow,
        fact-specific and, on most readings, litigation-prone. It weakens precisely
        where collections gets uncomfortable: intrusive contact patterns, and broad
        disclosure of borrower data to third parties. Proportionality, purpose
        limitation and necessity continue to apply regardless of which Section 7
        category is invoked.
      </p>

      <blockquote>
        The more aggressive the collections practice, the weaker the legitimate-use
        argument supporting it.
      </blockquote>

      <h2>Which is why this is an origination problem</h2>

      <p>
        The strongest position available to a lender is not a clever reading of
        Section 7. It is a Rule 3 notice, given at origination, that specifies
        recovery as a purpose in clear language with an itemised description of the
        data involved.
      </p>

      <p>
        That has an awkward consequence. The lawful basis your collections team
        will rely on in 2027 is being created right now by the origination team, in
        a document the collections team has probably never reviewed. If the notice
        does not contemplate recovery, contacting the borrower about their own
        overdue loan rests on a narrower and less certain footing — and no amount of
        downstream process fixes a notice that was never given.
      </p>

      <p>
        For most lenders, the single highest-value DPDP exercise in collections is
        therefore to read the origination notice, for every product currently in the
        recovery book, and check whether recovery is actually in it.
      </p>

      <h2>Agencies are processors, and the paperwork usually isn't there</h2>

      <p>
        External recovery agencies generally sit as data processors, acting on the
        lender's behalf — though the classification turns on whether the agency
        independently determines purposes and means. That distinction is worth
        establishing deliberately rather than assuming.
      </p>

      <p>
        Either way, responsibility for lawful notice and consent stays with the
        lender. Outsourcing the activity does not move the obligation. What is
        required is a data processing agreement carrying the Rule 6 security
        obligations, audit rights, and a defined route for approving
        sub-processors.
      </p>

      <p>Rule 6 asks processors for real controls, not assurances:</p>

      <ul>
        <li>Encryption, tokenisation or masking of personal data</li>
        <li>Least-privilege access control</li>
        <li>Logs retained for at least one year, subject to other law</li>
        <li>Breach detection, response and remediation, with incident SLAs</li>
      </ul>

      <p>
        Most agency contracts written before November 2025 contain none of this.
        Repapering a panel of agencies is slow work, involves commercial
        negotiation, and cannot be compressed into the final quarter before the
        deadline.
      </p>

      <h2>Borrower rights land differently in recovery</h2>

      <p>
        Data principals hold rights of access, correction and erasure, grievance
        redressal, and nomination. The first two carry a condition that matters a
        great deal here. Sections 11 and 12 attach in respect of a data fiduciary
        to whom the borrower has <em>previously given consent</em> — including
        data she voluntarily provided under Section 7(a). They do not
        straightforwardly follow where the lender is relying on one of the other
        Section 7 legitimate uses. Grievance redressal under Section 13 and
        nomination under Section 14 carry no such condition.
      </p>

      <p>
        That gap is not a loophole worth planning around, because it points
        straight back at the origination notice. A lender on a consent footing
        takes on access and correction obligations and gets a defensible lawful
        basis for the whole recovery operation. A lender leaning on Section 7 to
        avoid those obligations services fewer requests and holds a narrower, more
        contestable basis for everything it does. In a book that generates
        complaints at the rate collections does, that is the wrong side of the
        trade.
      </p>

      <p>
        Assume, then, that both apply. <strong>Correction</strong> gives a borrower
        a formal route to challenge the accuracy of the record being used to pursue
        them — DPD, outstanding amount, contact history. That request has to be
        handled operationally while collection activity is live, across whichever
        agencies and channels hold that data.
      </p>

      <p>
        <strong>Grievance redressal</strong> applies whatever the lawful basis, and
        has to function even where the borrower's contact came from an agency
        rather than the lender. The
        institution has to be able to receive, trace and answer a complaint about an
        interaction it did not itself conduct — which requires the agency's contact
        record to be available to it in the first place.
      </p>

      <h2>Breach obligations are tighter than most collections stacks assume</h2>

      <p>
        Rule 7 sets a two-stage process. The Board receives an initial intimation
        without delay, describing the nature, extent, timing, location and likely
        impact of the breach. A fuller report follows{" "}
        <strong>within 72 hours</strong> of becoming aware — covering root cause,
        containment, prevention, and a summary of what affected individuals were
        told. Affected data principals are notified as soon as practicable, in plain
        language, including what happened, what data was involved, likely
        consequences, and what they can do about it.
      </p>

      <p>
        The clock starts on awareness, not on completing an investigation, and there
        is no size threshold below which the obligation lapses. The penalty ceilings
        behind this are substantial — up to ₹250 crore for failing to implement
        reasonable security safeguards where a breach follows, and up to ₹200 crore
        for failing to notify. They are ceilings set per instance, with the Board
        determining the actual figure, and they can apply to the same incident.
      </p>

      <p>
        For collections specifically, note where borrower data physically sits: on
        agency laptops, in dialer systems, in call recordings, in spreadsheets
        emailed between offices. A breach in any of those is the lender's
        notification obligation, on the lender's clock.
      </p>

      <h2>What remains genuinely unresolved</h2>

      <p>
        One question does not have a settled answer yet: what happens when a
        borrower withdraws consent while recovery is ongoing.
      </p>

      <p>
        Systems must be built to allow withdrawal and to enforce purpose limitation.
        But if recovery contact rests partly on a Section 7 legitimate use rather
        than on consent, it is not obvious that withdrawal terminates it — and the
        interaction between the two has not been tested. Anyone claiming certainty
        here is guessing.
      </p>

      <p>
        The defensible posture is to record consent state and withdrawal accurately
        at account level regardless, so that whichever way the position settles, the
        institution can evidence what it knew and when. That is cheap to do now and
        impossible to reconstruct later.
      </p>

      <h2>The order of work</h2>

      <p>
        With roughly three quarters left before the substantive obligations
        commence, sequence matters more than effort:
      </p>

      <ul>
        <li>
          Read the origination notice for every product in the recovery book, and
          establish whether recovery is a specified purpose.
        </li>
        <li>
          Repaper agency contracts with Rule 6 security obligations, audit rights
          and sub-processor approval. This is the longest pole.
        </li>
        <li>
          Establish where borrower data actually resides across agencies, dialers,
          recordings and files — you cannot notify on a breach in a system you have
          not mapped.
        </li>
        <li>
          Make correction and grievance requests operable across every channel and
          partner, not just the ones the lender runs directly.
        </li>
        <li>
          Record consent basis, version and withdrawal at account level, and retain
          it as accountability evidence.
        </li>
      </ul>

      <p>
        Collections attracts a higher density of customer complaints than most
        parts of a lending business. When the Data Protection Board begins hearing
        matters, it is a reasonable expectation that recovery practices will be
        among the earliest things it sees.
      </p>
    </InsightLayout>
  );
}
