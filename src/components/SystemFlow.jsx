import { useEffect, useRef } from "react";

export default function SystemFlow({ progress = 0 }) {
  const canvasRef = useRef(null);
  const progressRef = useRef(progress);

  // keep progress updated without restarting animation
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const nodes = {
      top: { x: 0.5, y: 0.1 },
      d1: { x: 0.25, y: 0.45 },
      d2: { x: 0.5, y: 0.45 },
      d3: { x: 0.75, y: 0.45 },
      bottom: { x: 0.5, y: 0.85 }
    };

    let t = 0;

    const ease = (x) => x * x * (3 - 2 * x);

    const weight = (i) => {
      const dist = Math.abs(progressRef.current - i);
      return Math.max(0, 1 - dist);
    };

    const drawCurve = (from, to, w) => {
      ctx.beginPath();
      ctx.moveTo(from.x * width, from.y * height);

      ctx.bezierCurveTo(
        from.x * width,
        (from.y + 0.2) * height,
        to.x * width,
        (to.y - 0.2) * height,
        to.x * width,
        to.y * height
      );

      ctx.strokeStyle = `rgba(168,85,247,${0.08 + 0.5 * w})`;
      ctx.lineWidth = 1 + 1.5 * w;
      ctx.stroke();
    };

    const drawPacket = (from, to, offset, w) => {
      if (w < 0.05) return;

      const p = (t + offset) % 1;

      const x = from.x + (to.x - from.x) * p;
      const y = from.y + (to.y - from.y) * p;

      const px = x * width;
      const py = y * height;

      ctx.beginPath();
      ctx.fillStyle = `rgba(168,85,247,${0.6 * w})`;
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const w1 = ease(weight(0));
      const w2 = ease(weight(1));
      const w3 = ease(weight(2));

      drawCurve(nodes.top, nodes.d1, w1);
      drawCurve(nodes.top, nodes.d2, w2);
      drawCurve(nodes.top, nodes.d3, w3);

      drawCurve(nodes.d1, nodes.bottom, w1);
      drawCurve(nodes.d2, nodes.bottom, w2);
      drawCurve(nodes.d3, nodes.bottom, w3);

      drawPacket(nodes.top, nodes.d1, 0, w1);
      drawPacket(nodes.top, nodes.d2, 0.3, w2);
      drawPacket(nodes.top, nodes.d3, 0.6, w3);

      drawPacket(nodes.d1, nodes.bottom, 0.2, w1);
      drawPacket(nodes.d2, nodes.bottom, 0.5, w2);
      drawPacket(nodes.d3, nodes.bottom, 0.8, w3);

      t += 0.008; // slower = more premium
      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}