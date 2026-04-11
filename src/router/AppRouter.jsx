import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Home from "../pages/Home";
import Platform from "../pages/Platform";
import Solutions from "../pages/Solutions";
import Company from "../pages/Company";
import Demo from "../pages/Demo";
import Collections from "../pages/Collections";
import Lending from "../pages/Lending";
import Servicing from "../pages/Servicing";
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
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/company" element={<Company />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/lending" element={<Lending />} />
        <Route path="/servicing" element={<Servicing />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </BrowserRouter>
  );
}