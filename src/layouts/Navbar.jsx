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
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);

  const isSolutions = ["/solutions", "/collections", "/lending", "/servicing"].includes(location.pathname);

  return (
    <div
      className="
        fixed top-0 w-full z-[100]
        backdrop-blur-md
        bg-black/30
        border-b border-white/10
        shadow-[0_0_40px_rgba(59,130,246,0.08)]
      "
    >
      <div className="max-w-7xl mx-auto px-8 h-[80px] flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ShieldX" className="h-9 w-auto object-contain" />
        </Link>

        {/* NAV */}
        <div className="flex gap-8 text-sm text-white/70 items-center">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/platform" className="hover:text-white transition">Platform</Link>

          {/* SOLUTIONS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              className={`flex items-center gap-1 hover:text-white transition ${
                isSolutions ? "text-white" : ""
              }`}
            >
              Solutions
              <svg
                className={`w-3 h-3 mt-[1px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* DROPDOWN PANEL — pt-3 bridges the gap so hover doesn't break */}
            <div className={`
              absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[300px]
              transition-all duration-200
              ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}
            `}>
              <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(59,130,246,0.1)] p-2">
                {SOLUTIONS_ITEMS.map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`
                      flex flex-col px-4 py-3 rounded-lg transition-all duration-150
                      hover:bg-white/[0.05]
                      ${i === 0 ? "border-b border-white/[0.06] mb-1 pb-4" : ""}
                      ${location.pathname === item.to ? "bg-white/[0.04]" : ""}
                    `}
                  >
                    <span className={`text-sm font-medium transition-colors ${
                      location.pathname === item.to ? "text-blue-300" : "text-white/80 hover:text-white"
                    }`}>
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

        {/* CTA */}
        <button
          onClick={() => navigate("/demo")}
          className="
            bg-white text-black px-4 py-2 rounded-md text-sm
            hover:opacity-90 transition
          "
        >
          Request a walkthrough
        </button>

      </div>
    </div>
  );
}
