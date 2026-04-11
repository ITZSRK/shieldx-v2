import Navbar from "./Navbar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="relative bg-[#050507] text-white min-h-screen overflow-hidden">

      {/* GLOBAL GRID (very subtle) */}
      <div className="
        fixed inset-0 pointer-events-none opacity-[0.06]
        bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
        bg-[size:64px_64px]
      " />

      {/* GLOBAL GLOW (brand identity) — three depth layers matching Home */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_15%,rgba(59,130,246,0.12),transparent_55%)]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_60%,rgba(59,130,246,0.07),transparent_50%)]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_25%_80%,rgba(59,130,246,0.05),transparent_50%)]" />

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="relative z-10">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}