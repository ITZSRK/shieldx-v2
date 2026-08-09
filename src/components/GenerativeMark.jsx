import { useEffect, useRef } from "react";

// A slowly rotating globe of points, tinted by whichever layer is active.
//
// The site carries no photography — deliberately, since stock imagery of people
// pointing at laptops would undercut everything else on it. This is the
// alternative: one figure, generated rather than sourced. A sphere earns its
// place better than an abstract pattern would, because the thing being
// described is a whole book of accounts, held and turned.
//
// Points are laid out with a Fibonacci spiral, which distributes them evenly
// over a sphere instead of bunching them at the poles the way naive lat/long
// stepping does. Depth drives size and opacity, so the far side reads as far
// without needing a z-buffer.
//
// The colour eases between layers rather than snapping, so switching layer
// feels like the same object being relit rather than a different image.
export default function GenerativeMark({
  color = "#60a5fa",
  size = 280,
  points = 460,
  speed = 0.0032,
  className = "",
}) {
  const ref = useRef(null);
  // Held across renders so a colour change animates from wherever it currently
  // is, including mid-transition.
  const shown = useRef(null);
  const target = useRef(null);

  useEffect(() => {
    const hex = color.replace("#", "");
    const rgb = {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
    target.current = rgb;
    if (!shown.current) shown.current = { ...rgb };
  }, [color]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    // Fibonacci sphere.
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = [];
    for (let i = 0; i < points; i++) {
      const y = 1 - (i / (points - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      pts.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        // A little variation so it reads as drawn rather than plotted.
        s: 0.75 + ((i * 37) % 100) / 100,
      });
    }

    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.38;
    const focal = 2.6;

    let angle = 0;
    let raf;
    // requestAnimationFrame keeps firing while the section is scrolled out of
    // view — it only stops when the whole tab is hidden. Without this the
    // busiest page on the site would redraw 460 points at 60fps for the entire
    // time someone is reading something else.
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting;
        if (visible && !wasVisible) raf = requestAnimationFrame(frame);
      },
      { rootMargin: "80px" }
    );

    const frame = () => {
      // Ease the displayed colour toward the target.
      const t = target.current;
      const s = shown.current;
      if (t && s) {
        s.r += (t.r - s.r) * 0.08;
        s.g += (t.g - s.g) * 0.08;
        s.b += (t.b - s.b) * 0.08;
      }
      const cr = Math.round(s?.r ?? 96);
      const cg = Math.round(s?.g ?? 165);
      const cb = Math.round(s?.b ?? 250);

      g.clearRect(0, 0, size, size);
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      for (const p of pts) {
        // Rotate about the vertical axis.
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;

        // Perspective: nearer points sit further from centre and read larger.
        const depth = focal / (focal + z);
        const px = cx + x * radius * depth;
        const py = cy + p.y * radius * depth;

        // z runs -1 (far) to 1 (near).
        const near = (z + 1) / 2;
        const alpha = 0.1 + near * 0.62;
        const dot = (0.6 + near * 1.5) * p.s;

        g.beginPath();
        g.arc(px, py, dot, 0, Math.PI * 2);
        g.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`;
        g.fill();
      }

      if (!reduced) angle += speed;
      if (visible) raf = requestAnimationFrame(frame);
    };

    io.observe(canvas);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [size, points, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
