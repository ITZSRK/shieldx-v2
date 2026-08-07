// React 19 hoists <title>/<meta>/<link> rendered anywhere in the tree into
// <head> automatically (dedup'd by tag+key) — no react-helmet needed. Each
// page renders this once near the top so prerendered HTML carries distinct
// per-route title/description/OG tags instead of every route sharing
// index.html's generic defaults.
export default function SEO({ title, description, path = "/" }) {
  const fullTitle = `${title} — ShieldX`;
  const url = `https://queloshieldx.in${path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ShieldX" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
