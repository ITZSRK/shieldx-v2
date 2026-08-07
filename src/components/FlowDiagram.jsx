import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

function curvePath(x1, y1, x2, y2, bend) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const cx = mx + nx * bend, cy = my + ny * bend;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/**
 * nodes: [{ id, label, x, y, big? }]  x/y in percent (0-100)
 * path:  [{ from, to, dashed?, note? }]  ordered sequence the pulse travels
 */
export default function FlowDiagram({ nodes, path, color, height = 320 }) {
  const uid = useId().replace(/:/g, "");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setStep(s => (s + 1) % path.length), 1600);
    return () => clearInterval(i);
  }, [path.length]);

  const getNode = id => nodes.find(n => n.id === id);
  const edge = path[step];

  const isNodeActive = id => id === edge.from || id === edge.to;

  return (
    <div className="relative rounded-2xl border border-white/[0.10] overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05), rgba(0,0,0,0.55) 65%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.5)",
      }}>

      {/* subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 45%, ${color}14, transparent 60%)` }} />

      <div className="relative" style={{ height }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id={`glow-${uid}`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id={`edgeGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={color} stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {path.map((e, i) => {
            const f = getNode(e.from), t = getNode(e.to);
            const isActive = i === step;
            const bend = (i % 2 === 0 ? 1 : -1) * 9;
            const d = curvePath(f.x, f.y, t.x, t.y, bend);
            return (
              <path key={i} d={d} fill="none"
                stroke={isActive ? `url(#edgeGrad-${uid})` : "rgba(255,255,255,0.10)"}
                strokeWidth={isActive ? 0.55 : 0.25}
                strokeDasharray={e.dashed ? "2 2" : "none"}
                strokeLinecap="round"
                filter={isActive ? `url(#glow-${uid})` : undefined}
                style={{ transition: "stroke 0.5s, stroke-width 0.5s" }}
              />
            );
          })}

          {/* animated pulse riding the active curve */}
          <g key={step}>
            <circle r="1.6" fill={color} filter={`url(#glow-${uid})`}>
              <animateMotion
                dur="1.5s"
                begin="0s"
                fill="freeze"
                path={curvePath(getNode(edge.from).x, getNode(edge.from).y, getNode(edge.to).x, getNode(edge.to).y, (step % 2 === 0 ? 1 : -1) * 9)}
              />
            </circle>
            <circle r="3.2" fill={color} opacity="0.35">
              <animateMotion
                dur="1.5s"
                begin="0s"
                fill="freeze"
                path={curvePath(getNode(edge.from).x, getNode(edge.from).y, getNode(edge.to).x, getNode(edge.to).y, (step % 2 === 0 ? 1 : -1) * 9)}
              />
            </circle>
          </g>
        </svg>

        {nodes.map(n => {
          const active = isNodeActive(n.id);
          return (
            <div key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}>
              <div className={`rounded-xl border whitespace-nowrap font-medium transition-all duration-500 backdrop-blur-sm ${n.big ? "px-6 py-4 text-[14px]" : "px-3.5 py-2.5 text-[11px]"}`}
                style={{
                  borderColor: active ? `${color}` : n.big ? `${color}55` : "rgba(255,255,255,0.14)",
                  background: n.big
                    ? `linear-gradient(135deg, ${color}2e, ${color}10)`
                    : active ? `${color}20` : "rgba(255,255,255,0.03)",
                  color: active ? color : n.big ? color : "rgba(255,255,255,0.58)",
                  boxShadow: active
                    ? `0 0 0 1px ${color}40, 0 0 28px ${color}55, 0 8px 24px rgba(0,0,0,0.4)`
                    : n.big ? `0 0 24px ${color}22, 0 8px 20px rgba(0,0,0,0.35)` : "0 4px 12px rgba(0,0,0,0.3)",
                  transform: active ? "scale(1.06)" : "scale(1)",
                }}>
                {n.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative border-t border-white/[0.08] px-8 py-6 min-h-[64px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p key={step}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/62 text-sm text-center leading-relaxed max-w-xl">
            {edge.note}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
