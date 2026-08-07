import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-black/40 backdrop-blur-sm max-w-7xl mx-auto px-8 pt-20 pb-10 border-t border-white/15">

      {/* TOP ROW */}
      <div className="flex flex-col md:flex-row justify-between gap-12">

        {/* LEFT — BRAND BLOCK */}
        <div className="max-w-sm">
          <div className="text-white font-medium tracking-tight">
            Quelo Technologies Private Limited
          </div>
          <div className="text-white/60 text-sm mt-3 leading-relaxed">
            Building ShieldX — a decision infrastructure layer
            for India's regulated credit conversations.
          </div>
          <div className="mt-5 text-[11px] text-white/40 tracking-wide">
            BUILT IN INDIA · FOR INDIAN BFSI
          </div>
        </div>

        {/* RIGHT — LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">

          {/* PRODUCT */}
          <div>
            <div className="text-white/50 text-xs mb-3">Product</div>
            <div className="flex flex-col gap-2 text-white/65">
              <Link to="/platform"   className="hover:text-white transition">Platform</Link>
              <Link to="/deploy"     className="hover:text-white transition">How we deploy</Link>
              <Link to="/integration" className="hover:text-white transition">Integration</Link>
            </div>
          </div>

          {/* TRUST */}
          <div>
            <div className="text-white/50 text-xs mb-3">Trust</div>
            <div className="flex flex-col gap-2 text-white/65">
              <Link to="/governance"  className="hover:text-white transition">Governance</Link>
              <Link to="/neutrality"  className="hover:text-white transition">Neutrality</Link>
              <Link to="/security"    className="hover:text-white transition">Security</Link>
              <Link to="/outsourcing" className="hover:text-white transition">RBI Outsourcing</Link>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <div className="text-white/50 text-xs mb-3">Company</div>
            <div className="flex flex-col gap-2 text-white/65">
              <Link to="/company" className="hover:text-white transition">About</Link>
              <Link to="/insights" className="hover:text-white transition">Insights</Link>
              <Link to="/demo"    className="hover:text-white transition">Request Demo</Link>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <div className="text-white/50 text-xs mb-3">Legal</div>
            <div className="flex flex-col gap-2 text-white/65">
              <Link to="/privacy"  className="hover:text-white transition">Privacy Policy</Link>
              <Link to="/terms"    className="hover:text-white transition">Terms of Use</Link>
            </div>
          </div>

        </div>

      </div>

      {/* DIVIDER */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

      {/* BOTTOM STRIP */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
        <div>ShieldX · Real-Time Decisioning Infrastructure · © Quelo Technologies Private Limited</div>
        <div className="mt-2 md:mt-0 flex items-center gap-4">
          <span className="text-white/25">DPDP Act Aligned</span>
          <span className="text-white/15">·</span>
          <span className="text-white/25">ISO 27001 In Progress</span>
        </div>
      </div>

    </footer>
  );
}
