import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/shieldx-logo.png";

const SOLUTIONS_ITEMS = [
  { to: "/solutions",   label: "Overview",    desc: "How ShieldX works across use cases" },
  { to: "/collections", label: "Collections", desc: "Contact strategy and compliance" },
  { to: "/lending",     label: "Lending",     desc: "Application decision pipeline" },
  { to: "/servicing",   label: "Servicing",   desc: "Intent routing and SLA governance" },
];

export default function Navbar() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [open,       setOpen]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isSolutions = ["/solutions", "/collections", "/lending", "/servicing"].includes(location.pathname);

  return (
    <div className="fixed top-0 w-full z-[100] backdrop-blur-md bg-black/30 border-b border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[68px] md:h-[80px] flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="ShieldX" className="h-8 md:h-9 w-auto object-contain" />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-8 text-sm text-white/70 items-center">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/platform" className="hover:text-white transition">Platform</Link>

          {/* SOLUTIONS DROPDOWN */}
          <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button className={`flex items-center gap-1 hover:text-white transition ${isSolutions ? "text-white" : ""}`}>
              Solutions
              <svg className={`w-3 h-3 mt-[1px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[300px] transition-all duration-200 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
              <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(59,130,246,0.1)] p-2">
                {SOLUTIONS_ITEMS.map((item, i) => (
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

          <Link to="/company" className="hover:text-white transition">Company</Link>
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
          <Link to="/platform" onClick={() => setMobileOpen(false)}
            className={`text-sm py-3.5 border-b border-white/[0.07] transition-colors ${location.pathname === "/platform" ? "text-white" : "text-white/60 hover:text-white"}`}>
            Platform
          </Link>

          <div className="py-3.5 border-b border-white/[0.07]">
            <div className="text-[10px] text-white/28 tracking-[0.2em] mb-3">SOLUTIONS</div>
            <div className="flex flex-col gap-0.5">
              {SOLUTIONS_ITEMS.map((item, i) => (
                <Link key={i} to={item.to} onClick={() => setMobileOpen(false)}
                  className={`text-sm py-2 pl-4 border-l transition-colors ${location.pathname === item.to ? "text-blue-300 border-blue-400/40" : "text-white/55 hover:text-white border-white/10"}`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/company" onClick={() => setMobileOpen(false)}
            className={`text-sm py-3.5 border-b border-white/[0.07] transition-colors ${location.pathname === "/company" ? "text-white" : "text-white/60 hover:text-white"}`}>
            Company
          </Link>

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
