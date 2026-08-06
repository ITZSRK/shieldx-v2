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
import Deploy from "../pages/Deploy";
import Governance from "../pages/Governance";
import Neutrality from "../pages/Neutrality";
import Company from "../pages/Company";
import Demo from "../pages/Demo";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Security from "../pages/Security";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/deploy" element={<Deploy />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/neutrality" element={<Neutrality />} />
        <Route path="/company" element={<Company />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </BrowserRouter>
  );
}
