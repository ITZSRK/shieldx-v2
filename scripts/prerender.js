// Post-build step: serves the freshly-built dist/ folder, visits every real
// route with a headless browser, and overwrites each route's output with the
// fully-rendered HTML (React content included) instead of the bare SPA
// shell. main.jsx detects this pre-rendered markup at runtime and hydrates
// onto it rather than re-rendering from scratch.
//
// This does NOT make the site server-rendered — it's a build-time snapshot.
// Pages with real per-visit state (none currently) would need SSR/Next.js
// instead; this app is pure static content, so a snapshot is the right tool.
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const DIST = path.resolve(import.meta.dirname, "..", "dist");

// Keep in sync with src/router/AppRouter.jsx's real routes (the "*" 404
// catch-all is intentionally excluded — it has no fixed URL to prerender).
const ROUTES = [
  "/",
  "/platform",
  "/platform/decision",
  "/platform/engage",
  "/platform/assist",
  "/platform/intelligence",
  "/deploy",
  "/governance",
  "/neutrality",
  "/company",
  "/demo",
  "/privacy",
  "/terms",
  "/security",
];

function outputPathFor(route) {
  if (route === "/") return path.join(DIST, "index.html");
  return path.join(DIST, route.slice(1), "index.html");
}

function waitForServer(url, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    (async function poll() {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        // server not up yet
      }
      if (Date.now() > deadline) return reject(new Error(`Timed out waiting for ${url}`));
      setTimeout(poll, 300);
    })();
  });
}

async function main() {
  console.log("Starting vite preview server...");
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "pipe",
  });
  server.stderr.on("data", (d) => process.stderr.write(d));

  try {
    await waitForServer(BASE);
    console.log("Preview server ready. Launching browser...");

    // --no-sandbox is required on GitHub Actions' ubuntu-latest runners,
    // which ship with unprivileged user namespaces restricted (AppArmor),
    // breaking Chrome's default sandbox. Safe here: this browser only ever
    // renders our own built site, never untrusted third-party input.
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    page.on("pageerror", (err) => console.error(`  [page error] ${err.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") console.error(`  [console.error] ${msg.text()}`);
    });

    // Block everything off-localhost (Google Tag Manager, fonts, etc.) during
    // the crawl. We only need our own rendered markup, not third-party
    // analytics — and a slow/hanging external request (GA/GTM's beacon
    // connections in particular don't reliably go idle) was the likely cause
    // of a real CI hang: "npm run build" sat stuck on this step for 10+
    // minutes on GitHub Actions with no error, blocking a deploy.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (new URL(req.url()).hostname === "localhost") req.continue();
      else req.abort();
    });

    // Several components (SystemLoop, GovernedDecisionView, DeploymentSwitchboard,
    // LiveDecisionTrace, EngineArchitecture, ObservabilitySection,
    // ModelGovernanceTiers, ChannelSwitchboard, MoatLoop...) auto-advance their
    // displayed state via setInterval. Left alone, whatever moment the crawl
    // happens to capture would get baked into the static HTML, and hydration
    // would then find that baked-in state doesn't match a real client's true
    // first render (which always starts from each component's initial
    // useState value, before any interval has fired) — a real, reproducible
    // hydration mismatch. Disabling setInterval before the app boots forces
    // every capture to reflect true initial-mount state, which is exactly
    // what hydration expects, for every current and future component that
    // follows this pattern — no per-component patching required.
    await page.evaluateOnNewDocument(() => {
      window.setInterval = () => 0;
    });
    // Deliberately NOT stubbing IntersectionObserver: Framer Motion's
    // whileInView checks real viewport intersection synchronously on mount,
    // so a section already in the viewport (the hero, above the fold) at
    // capture time animates in during the crawl exactly like it would on a
    // real page load for a real visitor scrolled to the top — and a real
    // hydration pass makes that same "already in view" determination
    // independently and renders the same animated state. Forcing every
    // section to its pre-animation `initial` style during capture (an
    // earlier version of this script did that) fought against this and
    // produced a genuine style mismatch on every above-the-fold section.

    // Capture everything in memory first, write to disk only after the whole
    // crawl finishes. Writing per-route as we go would let an earlier route's
    // output (e.g. "/" -> dist/index.html) get served as the SPA fallback for
    // a *later* route that has no file yet — the browser would then hydrate
    // route B's URL on top of route A's markup and throw a real mismatch.
    const captured = [];
    for (const route of ROUTES) {
      const url = `${BASE}${route}`;
      // domcontentloaded, not networkidle0: with all cross-origin requests
      // now blocked above there's minimal network activity either way, but
      // networkidle0 waits for zero in-flight connections for 500ms
      // straight — one lingering/retrying connection is enough to make it
      // never resolve. waitForSelector("footer") below is the real "app has
      // rendered" signal regardless of which load event we wait for first.
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      // Layout's <Footer/> is present on every real page once React has
      // fully mounted and rendered — a reliable "the app is done" signal
      // that doesn't depend on any single page's specific content.
      await page.waitForSelector("footer", { timeout: 10000 });

      // Below-the-fold Motion sections are still genuinely at their
      // pre-animation opacity:0/translated state at this point (correct —
      // they haven't scrolled into view during the crawl). Left as-is,
      // that's a large fraction of every page's real copy sitting in the
      // static HTML at opacity:0, which is exactly what hidden-text/cloaking
      // detection looks for, even though the actual intent is just a scroll
      // reveal. Force everything to its fully-visible end state in *this
      // captured snapshot only* — a real browser's live hydration pass reads
      // viewport position fresh on its own and animates normally regardless
      // of what was baked into the static file, so this only affects what
      // crawlers/curl see, not what real visitors experience.
      await page.evaluate(() => {
        document.querySelectorAll('[style*="opacity"]').forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      });

      const html = await page.content();
      captured.push({ route, html });
      console.log(`Captured ${route}`);
    }

    await browser.close();

    for (const { route, html } of captured) {
      const outPath = outputPathFor(route);
      await mkdir(path.dirname(outPath), { recursive: true });
      await writeFile(outPath, html, "utf-8");
      console.log(`Wrote ${route} -> ${path.relative(DIST, outPath)}`);
    }

    console.log(`Done. Prerendered ${ROUTES.length} routes.`);
  } finally {
    server.kill();
  }

  // npx spawns vite preview as a process tree (npx -> sh -> vite), and
  // server.kill() above only signals the immediate npx process — it doesn't
  // reliably reach that whole tree. On GitHub Actions specifically, an
  // orphaned vite-preview process was staying alive with its stdio pipes
  // still open, which kept Node's event loop alive indefinitely even
  // though every await in this function had already resolved: the CI job
  // sat on this step for 34 minutes after printing "Done." above, with
  // GitHub Actions later force-killing leftover sh/node processes when the
  // run was cancelled. Didn't reproduce locally on macOS. Forcing exit here
  // sidesteps the question of why entirely — once our own work is done,
  // stop, regardless of what child processes may still be lingering.
  process.exit(0);
}

// Hard ceiling so a future hang (this exact class of bug already happened
// once in CI — see the request-interception comment above) fails the build
// loudly within minutes instead of leaving a GitHub Actions job stuck
// indefinitely with no error and no deploy going out.
const WATCHDOG_MS = 5 * 60 * 1000;
const watchdog = setTimeout(() => {
  console.error(`Prerender watchdog: exceeded ${WATCHDOG_MS / 1000}s, aborting.`);
  process.exit(1);
}, WATCHDOG_MS);
watchdog.unref();

main()
  .then(() => clearTimeout(watchdog))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
