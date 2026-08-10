// The argument of "Who scores the agencies?" drawn rather than echoed: the
// allocation layer is a box with nothing in it. Built in SVG rather than
// generated, so the labels are real and the emerald marks the same thing it
// marks everywhere else in the series — the element that governs the rest,
// which here is conspicuously absent.
const PARTNERS = [
  { x: 10,  name: "Agency North" },
  { x: 180, name: "Agency West" },
  { x: 350, name: "Vendor platform" },
  { x: 520, name: "In-house team" },
];

export default function VacantLayerDiagram() {
  return (
    <figure className="insight-diagram">
      {/* Wide content scrolls in its own container, same as the tables — the
          page body never scrolls sideways. */}
      <div className="insight-diagram-scroll">
        <svg viewBox="0 0 680 336" role="img"
          aria-label="The book sits above four collection partners. Between them is an empty dashed box labelled cross-agency allocation — the layer almost nobody holds. Each partner optimises only its own slice.">

          {/* the book */}
          <rect x="190" y="12" width="300" height="46" rx="5"
            fill="none" stroke="var(--doc-ink)" strokeWidth="1.25" />
          <text x="340" y="34" textAnchor="middle" className="d-title">The book</text>
          <text x="340" y="48" textAnchor="middle" className="d-sub">every account in collections</text>

          <line x1="340" y1="58" x2="340" y2="96" stroke="var(--doc-rule)" strokeWidth="1.25" />

          {/* the vacancy */}
          <rect x="110" y="100" width="460" height="84" rx="6"
            fill="none" stroke="var(--doc-accent)" strokeWidth="1.5" strokeDasharray="7 6" />
          <text x="340" y="132" textAnchor="middle" className="d-title accent">Cross-agency allocation</text>
          <text x="340" y="150" textAnchor="middle" className="d-sub accent">which accounts go where, on comparable terms</text>
          <text x="340" y="169" textAnchor="middle" className="d-vacant">— the layer almost nobody holds —</text>

          {/* bus down to the partners */}
          <line x1="340" y1="184" x2="340" y2="212" stroke="var(--doc-rule)" strokeWidth="1.25" />
          <line x1="85" y1="212" x2="595" y2="212" stroke="var(--doc-rule)" strokeWidth="1.25" />

          {PARTNERS.map((p) => {
            const cx = p.x + 75;
            return (
              <g key={p.name}>
                <line x1={cx} y1="212" x2={cx} y2="240" stroke="var(--doc-rule)" strokeWidth="1.25" />
                <rect x={p.x} y="240" width="150" height="64" rx="5"
                  fill="none" stroke="var(--doc-ink)" strokeWidth="1.25" opacity="0.55" />
                <text x={cx} y="266" textAnchor="middle" className="d-title">{p.name}</text>
                <text x={cx} y="284" textAnchor="middle" className="d-sub">optimises its</text>
                <text x={cx} y="296" textAnchor="middle" className="d-sub">own slice only</text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption>
        Every partner optimises inside the slice it was handed. None can see the
        others. The comparison that would decide allocation is the one nobody is
        positioned to make.
      </figcaption>
    </figure>
  );
}
