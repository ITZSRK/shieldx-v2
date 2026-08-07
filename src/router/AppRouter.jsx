import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
import Home from "../pages/Home";
import Platform from "../pages/Platform";
import PlatformDecision from "../pages/platform/Decision";
import PlatformEngage from "../pages/platform/Engage";
import PlatformAssist from "../pages/platform/Assist";
import PlatformIntelligence from "../pages/platform/Intelligence";
import Deploy from "../pages/Deploy";
import Governance from "../pages/Governance";
import Neutrality from "../pages/Neutrality";
import Company from "../pages/Company";
import Demo from "../pages/Demo";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Security from "../pages/Security";
import Outsourcing from "../pages/Outsourcing";
import Integration from "../pages/Integration";
import InsightsIndex from "../pages/insights/Index";
import WhoScoresTheAgencies from "../pages/insights/WhoScoresTheAgencies";
import NotFound from "../pages/NotFound";
import CookieConsent from "../components/CookieConsent";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Sits outside <Routes> so it covers every page, including Home,
          which builds its own chrome instead of using Layout. */}
      <CookieConsent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/platform/decision" element={<PlatformDecision />} />
        <Route path="/platform/engage" element={<PlatformEngage />} />
        <Route path="/platform/assist" element={<PlatformAssist />} />
        <Route path="/platform/intelligence" element={<PlatformIntelligence />} />
        <Route path="/deploy" element={<Deploy />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/neutrality" element={<Neutrality />} />
        <Route path="/company" element={<Company />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/security" element={<Security />} />
        <Route path="/outsourcing" element={<Outsourcing />} />
        <Route path="/integration" element={<Integration />} />
        <Route path="/insights" element={<InsightsIndex />} />
        <Route path="/insights/who-scores-the-agencies" element={<WhoScoresTheAgencies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
