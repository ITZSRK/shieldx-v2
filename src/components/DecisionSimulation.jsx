import { useEffect, useRef } from "react";

export default function DecisionSimulationV2() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    let w, h, raf;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const signals = [
      { label: "CRM", y: 0.2 },
      { label: "LOS", y: 0.35 },
      { label: "Risk", y: 0.5 },
      { label: "Campaign", y: 0.65 }
    ];

    let particles = [];

    const spawn = () => {
      signals.forEach((s) => {
        particles.push({
          x: 0,
          y: s.y * h,
          vx: 2 + Math.random(),
          state: "moving"
        });
      });
    };

    let lastSpawn = 0;

    const decisionX = () => w * 0.4;
    const complianceX = () => w * 0.6;
    const outputX = () => w * 0.85;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // ==== LABELS ====
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "12px sans-serif";
      ctx.fillText("Signals", 20, 30);
      ctx.fillText("Decision", decisionX() - 30, 30);
      ctx.fillText("Compliance", complianceX() - 40, 30);
      ctx.fillText("Execution", outputX() - 30, 30);

      // ==== FLOW LINES ====
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // ==== SPAWN ====
      if (Date.now() - lastSpawn > 1200) {
        spawn();
        lastSpawn = Date.now();
      }

      // ==== PARTICLES ====
      particles.forEach((p) => {
        if (p.state === "moving") {
          p.x += p.vx;

          if (p.x >= decisionX()) {
            p.state = "decision";
          }
        }

        if (p.state === "decision") {
          p.x += p.vx;

          if (p.x >= complianceX()) {
            const approved = Math.random() > 0.3;
            p.state = approved ? "approved" : "rejected";
          }
        }

        if (p.state === "approved") {
          p.x += 2;
        }

        if (p.state === "rejected") {
          p.x += 1;
          p.opacity = (p.opacity ?? 1) - 0.03;
        }

        // DRAW PARTICLE
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);

        if (p.state === "rejected") {
          ctx.fillStyle = `rgba(255,80,80,${p.opacity ?? 1})`;
        } else if (p.state === "approved") {
          ctx.fillStyle = "#A78BFA";
        } else {
          ctx.fillStyle = "#C4B5FD";
        }

        ctx.fill();

        // ==== BRANCH VISUAL ====
        if (p.state === "approved" && p.x > complianceX()) {
          ctx.strokeStyle = "rgba(167,139,250,0.5)";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(outputX(), p.y - 20);
          ctx.stroke();
        }
      });

      particles = particles.filter(
        (p) => p.x < w && (p.opacity === undefined || p.opacity > 0)
      );

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="px-8 py-28 max-w-6xl mx-auto">

      <div className="text-center mb-14">
        <div className="text-xs text-white/30 tracking-widest mb-3">
          SYSTEM SIMULATION
        </div>

        <h2 className="text-4xl">
          Multi-signal decisioning in real time
        </h2>

        <p className="text-white/50 mt-4 max-w-xl mx-auto">
          Signals from multiple systems are evaluated, validated, and routed —
          before execution.
        </p>
      </div>

      <div className="h-[320px] border border-white/10 rounded-2xl bg-black/40">
        <canvas ref={ref} className="w-full h-full" />
      </div>

    </section>
  );
}