import { useEffect, useRef } from "react";

export default function ParticleFlow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const particles = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.3 + Math.random() * 0.7,
        size: Math.random() * 2 + 0.5,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168, 85, 247, 0.6)";
        ctx.fill();

        p.y += p.speed;

        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    });

  }, []);

  return (
    <canvas
      ref={canvasRef}
      cclassName="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0"
    />
  );
}