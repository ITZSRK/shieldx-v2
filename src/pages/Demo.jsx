import Navbar from "../layouts/Navbar";
import { useState } from "react";

export default function Demo() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
    useCase: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.company || !form.role || !form.useCase) {
      alert("Please complete all fields");
      return;
    }

    setLoading(true);

    try {
      await fetch("https://hook.eu1.make.com/jht5ea6j4ei340baklxwylydcpk87uu9", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: form.name,
          company: form.company,
          email: form.email,
          role: form.role,
          useCase: form.useCase,
          source: "Website",
          status: "New"
        })
      });

      setSubmitted(true);

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#050507] text-white min-h-screen relative">

      <Navbar />

      {/* GLOBAL GLOW */}
      <div className="
        absolute inset-0 pointer-events-none
        bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.12),transparent_60%)]
      " />

      <div className="pt-32 px-8 max-w-xl mx-auto text-center">

        {!submitted ? (
          <>
            {/* HEADER */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs tracking-[0.18em] mb-7"
              style={{boxShadow:"0 0 18px rgba(59,130,246,0.22)"}}>
              REQUEST A WALKTHROUGH
            </div>
            <h1 className="text-[40px] font-semibold leading-tight mb-4 tracking-tight">
              Watch ShieldX govern<br />a live decision.
            </h1>
            <p className="text-white/48 mb-10 max-w-md mx-auto text-[15px] leading-relaxed">
              20 minutes. Your use case — Collections, Lending, or Servicing.
              Every compliance check, every decision, live.
            </p>

            {/* FORM CARD */}
            <div className="
              border border-white/10 rounded-xl p-6
              bg-black/50 backdrop-blur-sm
              shadow-[0_0_40px_rgba(59,130,246,0.08)]
            ">

              <form onSubmit={handleSubmit} className="space-y-4 text-left">

                <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="input" />

                <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required className="input" />

                <input name="email" placeholder="Work Email" type="email" value={form.email} onChange={handleChange} required className="input" />

                <select name="role" value={form.role} onChange={handleChange} required className="input">
                  <option value="">Your Role</option>
                  <option>CXO / Founder</option>
                  <option>Head of Collections</option>
                  <option>Head of Lending</option>
                  <option>Operations</option>
                  <option>Compliance / Risk</option>
                  <option>Other</option>
                </select>

                <select name="useCase" value={form.useCase} onChange={handleChange} required className="input">
                  <option value="">Primary use case</option>
                  <option>Collections</option>
                  <option>Lending</option>
                  <option>Customer Servicing</option>
                  <option>Compliance / Risk</option>
                </select>

                {/* CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full mt-2
                    bg-white text-black py-3 rounded-md
                    text-sm font-medium
                    hover:opacity-90 transition
                    disabled:opacity-50
                  "
                >
                  {loading ? "Submitting..." : "Request a walkthrough"}
                </button>

              </form>
            </div>

            {/* TRUST LAYER */}
            <div className="flex justify-center gap-3 mt-6 flex-wrap">
              {[
                "Built for BFSI",
                "Enterprise-grade security",
                "DPDPA 2025 aligned"
              ].map((item, i) => (
                <div
                  key={i}
                  className="
                    px-3 py-1 text-xs rounded-full
                    border border-white/10
                    bg-white/5 text-white/70
                    backdrop-blur-sm
                    hover:border-blue-400/30 hover:text-white transition
                  "
                >
                  {item}
                </div>
              ))}
            </div>

          </>
        ) : (
          /* SUCCESS STATE (UPGRADED) */
          <div className="
            border border-white/10 rounded-xl p-10 bg-black/50
            backdrop-blur-sm
            shadow-[0_0_40px_rgba(59,130,246,0.08)]
          ">
            <div className="w-10 h-10 rounded-full border border-blue-400/30 bg-blue-500/10 flex items-center justify-center mx-auto mb-5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">
              Walkthrough requested.
            </h2>

            <p className="text-white/50 mb-6 text-sm leading-relaxed">
              We’ve received your request. Our team will reach out within one business day.
            </p>

            {/* OPTIONAL: ADD CALENDLY LATER */}
            {/* <a href="https://calendly.com/YOUR_LINK" target="_blank">Schedule instantly</a> */}

            <div className="flex justify-center gap-3 flex-wrap mt-6">
              {[
                "Built for BFSI",
                "Enterprise-grade security"
              ].map((item, i) => (
                <div
                  key={i}
                  className="
                    px-3 py-1 text-xs rounded-full
                    border border-white/10
                    bg-white/5 text-white/70
                  "
                >
                  {item}
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* INPUT STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          outline: none;
          transition: all 0.2s ease;
        }

        .input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .input:focus {
          border-color: rgba(59,130,246,0.4);
          box-shadow: 0 0 0 1px rgba(59,130,246,0.2);
        }
      `}</style>

    </div>
  );
}