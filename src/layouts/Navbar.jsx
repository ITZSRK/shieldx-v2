import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/shieldx-logo.png";

const PLATFORM_ITEMS = [
  { to: "/platform",              label: "Overview",     desc: "How the whole engine works" },
  { to: "/platform/decision",     label: "Decision",     desc: "The brain — footprint, scoring, orchestration" },
  { to: "/platform/engage",       label: "Engage",       desc: "Execution channel for institutions without pipes" },
  { to: "/platform/assist",       label: "Assist",       desc: "The human channel's adapter" },
  { to: "/platform/intelligence", label: "Intelligence", desc: "The sensory system, post-call" },
];

const NAV_ITEMS = [
  { to: "/deploy",      label: "How we deploy" },
  { to: "/governance",  label: "Governance" },
  { to: "/neutrality",  label: "Neutrality" },
  { to: "/company",     label: "Company" },
];

export default function Navbar() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [open,       setOpen]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isPlatform = location.pathname === "/platform" || location.pathname.startsWith("/platform/");

  return (
    <div className="fixed top-0 w-full z-[100] backdrop-blur-md bg-black/30 border-b border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[68px] md:h-[80px] flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 opacity-100 hover:opacity-75 transition-opacity duration-200" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="ShieldX — home" className="h-8 md:h-9 w-auto object-contain" />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-8 text-sm text-white/70 items-center">

          {/* PLATFORM DROPDOWN */}
          <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <Link to="/platform" className={`flex items-center gap-1 hover:text-white transition ${isPlatform ? "text-white" : ""}`}>
              Platform
              <svg className={`w-3 h-3 mt-[1px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[300px] transition-all duration-200 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
              <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(59,130,246,0.1)] p-2">
                {PLATFORM_ITEMS.map((item, i) => (
                  <Link key={i} to={item.to} onClick={() => setOpen(false)}
                    className={`flex flex-col px-4 py-3 rounded-lg transition-all duration-150 hover:bg-white/[0.05] ${i === 0 ? "border-b border-white/[0.06] mb-1 pb-4" : ""} ${location.pathname === item.to ? "bg-white/[0.04]" : ""}`}>
                    <span className={`text-sm font-medium transition-colors ${location.pathname === item.to ? "text-blue-300" : "text-white/80 hover:text-white"}`}>
                      {item.label}
                    </span>
                    <span className="text-[11px] text-white/35 mt-0.5">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

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
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[720px]" : "max-h-0"}`}>
        <div className="bg-[#050507]/98 backdrop-blur-xl border-t border-white/[0.08] px-5 pt-5 pb-8 flex flex-col">

          <Link to="/" onClick={() => setMobileOpen(false)}
            className={`text-sm py-3.5 border-b border-white/[0.07] transition-colors ${location.pathname === "/" ? "text-white" : "text-white/60 hover:text-white"}`}>
            Home
          </Link>

          <div className="py-3.5 border-b border-white/[0.07]">
            <div className="text-[10px] text-white/28 tracking-[0.2em] mb-3">PLATFORM</div>
            <div className="flex flex-col gap-0.5">
              {PLATFORM_ITEMS.map((item, i) => (
                <Link key={i} to={item.to} onClick={() => setMobileOpen(false)}
                  className={`text-sm py-2 pl-4 border-l transition-colors ${location.pathname === item.to ? "text-blue-300 border-blue-400/40" : "text-white/55 hover:text-white border-white/10"}`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

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
