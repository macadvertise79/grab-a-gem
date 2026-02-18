import { useEffect, useRef } from "react";

const STAR_COUNT = 25;

interface Star {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  size: number;
}

const ShootingStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 40 + Math.random() * 80,
      speed: 2 + Math.random() * 4,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.5,
      opacity: 0.3 + Math.random() * 0.7,
      size: 0.5 + Math.random() * 1.5,
    });

    const stars: Star[] = Array.from({ length: STAR_COUNT }, createStar);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `hsla(38, 75%, 55%, 0)`);
        gradient.addColorStop(0.5, `hsla(38, 75%, 55%, ${star.opacity})`);
        gradient.addColorStop(1, `hsla(43, 80%, 70%, ${star.opacity})`);

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.size;
        ctx.lineCap = "round";
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(endX, endY, star.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 80%, 70%, ${star.opacity})`;
        ctx.fill();

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        if (star.x > canvas.width + 100 || star.y > canvas.height + 100 || star.x < -100 || star.y < -100) {
          Object.assign(star, createStar());
          // Reset to edge
          if (Math.random() > 0.5) {
            star.x = -50;
            star.y = Math.random() * canvas.height;
          } else {
            star.x = Math.random() * canvas.width;
            star.y = -50;
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    />
  );
};

export default ShootingStars;
