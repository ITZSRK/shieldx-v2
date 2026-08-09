// Generates per-article Open Graph cards into public/og/<slug>.png.
//
// Run manually (`npm run og`) rather than as part of the build, and commit the
// PNGs. Two reasons: the cards only change when an article title changes, and
// the site's type stack falls back to system-ui — so rendering on a CI runner
// would produce different glyphs from rendering here. Committed artifacts keep
// the cards stable across deploys, which matters because social platforms
// cache link previews by URL.
//
// Adding an article: add an entry to CARDS, run `npm run og`, commit the PNG.

import puppeteer from "puppeteer";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/og"
);

// The real mark, inlined as a data URI. page.setContent() runs with no server
// and no base URL, so a file path or /src reference silently renders nothing —
// which is how the first version of these cards shipped with a typed-out
// "ShieldX" wordmark instead of the logo.
const LOGO = await readFile(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/assets/shieldx-logo.png")
);
const LOGO_URI = `data:image/png;base64,${LOGO.toString("base64")}`;

// The site-wide card, used for every non-insight page. It previously was a
// screenshot of the product dashboard: no wordmark anywhere, and an internal
// admin email plus a portfolio figure legible in it — shown on every link
// preview of the home page.
const CARDS = [
  {
    out: "../public/og-image.png",
    kicker: "DECISIONING INFRASTRUCTURE",
    title: "The layer between your systems and your borrowers.",
    footer: "queloshieldx.in",
    date: null,
  },
  {
    slug: "who-scores-the-agencies",
    kicker: "NEUTRALITY",
    title: "Who scores the agencies?",
  },
  {
    slug: "rbi-model-risk-management",
    kicker: "REGULATION",
    title: "Your rules engine is a model now",
  },
  {
    slug: "dpdp-collections",
    kicker: "REGULATION",
    title: "Collections inherits its consent",
  },
];

// Mirrors the site: near-black ground, emerald accent, generous left rule.
// Title sizing steps down for longer headlines so nothing wraps to four lines.
const html = ({ kicker, title, footer, date = "August 2026" }) => `
<!doctype html>
<html>
<head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #07090c;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #fff;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 78px 86px;
    position: relative; overflow: hidden;
  }
  .glow {
    position: absolute; top: -280px; right: -220px;
    width: 780px; height: 780px; border-radius: 50%;
    background: radial-gradient(circle, rgba(52,211,153,0.13) 0%, rgba(52,211,153,0) 68%);
  }
  .top { display: flex; align-items: center; gap: 14px; position: relative; }
  .kicker {
    font-size: 17px; letter-spacing: 0.22em; color: rgba(52,211,153,0.85);
    font-weight: 500;
  }
  .dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.22); }
  .date { font-size: 16px; color: rgba(255,255,255,0.34); }
  .mid { position: relative; padding-left: 30px; border-left: 3px solid rgba(52,211,153,0.55); }
  h1 {
    font-size: ${title.length > 30 ? "62px" : "72px"};
    font-weight: 600; line-height: 1.12; letter-spacing: -0.022em;
    max-width: 940px; text-wrap: balance;
  }
  .bot {
    display: flex; align-items: center; justify-content: space-between;
    position: relative;
  }
  .brand img { height: 30px; width: auto; display: block; }
  .role { font-size: 16px; color: rgba(255,255,255,0.38); }
</style></head>
<body>
  <div class="glow"></div>
  <div class="top">
    <div class="kicker">${kicker}</div>
    ${date ? `<div class="dot"></div><div class="date">${date}</div>` : ""}
  </div>
  <div class="mid"><h1>${title}</h1></div>
  <div class="bot">
    <div class="brand"><img src="${LOGO_URI}" alt=""></div>
    <div class="role">${footer || "Sudarson Radhakrishnan · Founder &amp; CEO"}</div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

await mkdir(OUT_DIR, { recursive: true });

for (const card of CARDS) {
  await page.setContent(html(card), { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  const out = card.out
    ? path.resolve(path.dirname(fileURLToPath(import.meta.url)), card.out)
    : path.join(OUT_DIR, `${card.slug}.png`);
  await page.screenshot({ path: out });
  console.log(`Wrote ${path.basename(out)} — ${card.title}`);
}

await browser.close();
console.log(`Done. ${CARDS.length} cards.`);
process.exit(0);
