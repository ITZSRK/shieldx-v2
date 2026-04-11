import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-[100vh] w-full relative overflow-hidden">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* RADIAL LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)] pointer-events-none"></div>

      {/* NAV */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 min-h-[100vh]">
        <Outlet />
      </main>

    </div>
  );
}