// The argument of "Your rules engine is a model now": the definition is wider
// than the inventory. Deliberately the same grammar as the neutrality diagram —
// an emerald dashed boundary marking the governing thing. There the box was
// empty because the layer is vacant; here it is larger than expected because
// the definition reaches further than the inventory does.
//
// The five items outside the box are the ones named in the piece, plus the
// draft's own illustration (a loan-pricing calculator, para 7(3)).
const ALREADY = ["Credit scorecard", "PD model", "Behavioural score"];
const ALSO = [
  "DPD bucketing logic",
  "The allocation spreadsheet",
  "Channel and timing rules",
  "A vendor's propensity model",
  "Loan-pricing calculator",
];

export default function ModelScopeDiagram() {
  return (
    <figure className="insight-diagram">
      <div className="insight-diagram-scroll">
        <svg viewBox="0 0 680 340" role="img"
          aria-label="A dashed boundary labelled 'what para 7(3) calls a model' encloses both a small solid box containing credit scorecard, PD model and behavioural score, and five further items outside it: DPD bucketing logic, the allocation spreadsheet, channel and timing rules, a vendor's propensity model, and a loan-pricing calculator.">

          <text x="10" y="22" className="d-title accent">What para 7(3) calls a model</text>

          <rect x="8" y="34" width="664" height="292" rx="8"
            fill="none" stroke="var(--doc-accent)" strokeWidth="1.5" strokeDasharray="7 6" />

          {/* what an inventory usually holds */}
          <rect x="30" y="66" width="286" height="206" rx="5"
            fill="none" stroke="var(--doc-ink)" strokeWidth="1.25" />
          <text x="46" y="92" className="d-title">Your model inventory today</text>
          {ALREADY.map((t, i) => (
            <g key={t}>
              <rect x={46} y={110 + i * 46} width="254" height="34" rx="4"
                fill="none" stroke="var(--doc-ink)" strokeWidth="1" opacity="0.42" />
              <text x={60} y={131 + i * 46} className="d-item">{t}</text>
            </g>
          ))}

          {/* in scope, and rarely on anyone's list */}
          {ALSO.map((t, i) => (
            <g key={t}>
              <rect x={346} y={66 + i * 42} width="310" height="34" rx="4"
                fill="none" stroke="var(--doc-accent)" strokeWidth="1.15" opacity="0.9" />
              <text x={360} y={87 + i * 42} className="d-item">{t}</text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption>
        The definition is functional — inputs, processing logic, outputs that
        materially affect decisions — <em>irrespective of whether such tools are
        recognised as models by the RE</em>. Everything in the right-hand column is
        already inside the boundary.
      </figcaption>
    </figure>
  );
}
