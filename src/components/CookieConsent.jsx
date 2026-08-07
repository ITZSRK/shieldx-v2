import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "shieldx-cookie-consent";
const GA_ID = "GT-NBPN8RJL";

// Analytics is loaded here rather than in index.html so it only ever runs
// after the visitor has actually agreed to it. DPDP treats analytics as
// non-essential processing, and this site sells compliance discipline —
// loading a tracker before consent would contradict our own privacy policy.
function loadAnalytics() {
  if (window.__shieldxAnalyticsLoaded) return;
  window.__shieldxAnalyticsLoaded = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
}

export default function CookieConsent() {
  // Starts null so nothing renders during the prerender pass or on the first
  // hydration frame — localStorage doesn't exist at build time, and rendering
  // a banner into the static HTML that then disappears for returning visitors
  // would be a real hydration mismatch.
  const [decision, setDecision] = useState(null);

  useEffect(() => {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* storage blocked */ }
    if (stored === "accepted") loadAnalytics();
    setDecision(stored ?? "undecided");
  }, []);

  function choose(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* storage blocked */ }
    if (value === "accepted") loadAnalytics();
    setDecision(value);
  }

  if (decision !== "undecided") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div
        className="max-w-3xl mx-auto rounded-xl border border-white/[0.12] p-5 sm:p-6
                   flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
        style={{
          background: "rgba(10,11,15,0.92)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 18px 48px rgba(0,0,0,0.55)",
        }}
      >
        <p className="text-white/62 text-[13px] leading-relaxed flex-1">
          We use cookies necessary for the site to work, and — only with your
          agreement — Google Analytics to understand aggregate usage. No
          advertising or cross-site tracking.{" "}
          <Link to="/privacy" className="text-blue-300/80 hover:text-blue-300 underline underline-offset-2 transition-colors">
            Privacy Policy
          </Link>
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => choose("declined")}
            className="text-[13px] text-white/55 hover:text-white/85 px-3 py-2 rounded-lg
                       transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Decline
          </button>
          <button
            onClick={() => choose("accepted")}
            className="text-[13px] font-medium bg-white text-black px-5 py-2 rounded-lg
                       hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
