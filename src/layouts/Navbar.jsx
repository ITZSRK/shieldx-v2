import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/shieldx-logo.png";

const NAV_ITEMS = [
  { to: "/platform",    label: "Platform" },
  { to: "/deploy",      label: "How we deploy" },
  { to: "/governance",  label: "Governance" },
  { to: "/neutrality",  label: "Neutrality" },
  { to: "/company",     label: "Company" },
];

export default function Navbar() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full z-[100] backdrop-blur-md bg-black/30 border-b border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[68px] md:h-[80px] flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="ShieldX" className="h-8 md:h-9 w-auto object-contain" />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-8 text-sm text-white/70 items-center">
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to}
              className={`hover:text-white transition pb-0.5 ${location.pathname === item.to ? "text-white border-b border-white/35" : ""}`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* DESKTOP CTA */}
        <button
          onClick={() => navigate("/demo")}
          className="hidden md:block bg-white text-black px-4 py-2 rounded-md text-sm hover:opacity-90 transition flex-shrink-0"
        >
          Request a walkthrough
        </button>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden flex flex-col justify-center items-end gap-[5px] w-9 h-9 flex-shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"}`} />
          <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-200 ${mobileOpen ? "opacity-0 w-0" : "w-3.5"}`} />
          <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"}`} />
        </button>

      </div>

      {/* MOBILE MENU DRAWER */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[560px]" : "max-h-0"}`}>
        <div className="bg-[#050507]/98 backdrop-blur-xl border-t border-white/[0.08] px-5 pt-5 pb-8 flex flex-col">

          <Link to="/" onClick={() => setMobileOpen(false)}
            className={`text-sm py-3.5 border-b border-white/[0.07] transition-colors ${location.pathname === "/" ? "text-white" : "text-white/60 hover:text-white"}`}>
            Home
          </Link>

          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
              className={`text-sm py-3.5 border-b border-white/[0.07] transition-colors ${location.pathname === item.to ? "text-white" : "text-white/60 hover:text-white"}`}>
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => { navigate("/demo"); setMobileOpen(false); }}
            className="mt-6 w-full bg-white text-black py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition">
            Request a walkthrough
          </button>

        </div>
      </div>

    </div>
  );
}
