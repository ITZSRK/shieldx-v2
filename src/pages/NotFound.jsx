import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="max-w-2xl mx-auto px-8 pt-[160px] pb-32 text-center">
        <div className="text-[13px] text-white/35 font-mono tracking-widest mb-6">404</div>
        <h1 className="text-[32px] md:text-[42px] font-semibold mb-4">This page doesn't exist.</h1>
        <p className="text-white/58 text-[16px] leading-relaxed mb-10 max-w-md mx-auto">
          The link you followed may be outdated, or the address was mistyped.
        </p>
        <Link to="/"
          className="inline-block bg-white text-black px-8 py-3 rounded-lg text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
          Back to homepage
        </Link>
      </section>
    </Layout>
  );
}
