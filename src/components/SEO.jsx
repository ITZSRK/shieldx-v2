// React 19 hoists <title>/<meta>/<link> rendered anywhere in the tree into
// <head> automatically (dedup'd by tag+key) — no react-helmet needed. Each
// page renders this once near the top so prerendered HTML carries distinct
// per-route title/description/OG tags instead of every route sharing
// index.html's generic defaults.
export default function SEO({
  title,
  description,
  path = "/",
  type = "website",
  // Per-page card, e.g. "/og/rbi-model-risk-management.png". Insight pieces
  // pass their own; everything else falls back to the site card.
  ogImage = "/og-image.png",
  // Only meaningful when type="article". Open Graph's article:* properties are
  // separate from the JSON-LD Article schema — the schema is what Google reads
  // for authorship, these are what the social scrapers look for, and LinkedIn's
  // inspector reports "no author found" without them.
  author,
  publishedTime,
  section,
}) {
  const fullTitle = `${title} — ShieldX`;
  const url = `https://queloshieldx.in${path}`;
  // Deliberately a stable path in public/, not the fingerprinted build asset
  // (whose hashed filename changes every deploy) — social platforms cache link
  // previews by image URL, so a stable path avoids ever pointing a cached
  // preview at a filename that no longer exists.
  const image = `https://queloshieldx.in${ogImage}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="ShieldX" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && section && (
        <meta property="article:section" content={section} />
      )}
    </>
  );
}
