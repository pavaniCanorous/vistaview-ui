import { useEffect, useRef, useCallback } from 'react';

/**
 * Magnetic Spotlight Cursor
 * - A soft radial spotlight follows the cursor across the page
 * - Tiny sparkle particles burst on fast movement
 * - Interactive elements get a magnetic pull effect
 * - All rendered on a single canvas for max performance
 */
export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -100, y: -100, speed: 0 });
  const smoothMouse = useRef({ x: -100, y: -100 });
  const particles = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const hovered = useRef(false);

  // Hide on touch
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const spawnParticles = useCallback((x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.5 + 0.5;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: Math.random() * 0.025 + 0.015,
        size: Math.random() * 2.5 + 0.8,
        hue: Math.random() > 0.5 ? 43 : 160, // gold or emerald
      });
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let prevX = 0;
    let prevY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      mouse.current.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      prevX = e.clientX;
      prevY = e.clientY;

      // Spawn sparkles on fast movement
      if (mouse.current.speed > 8) {
        spawnParticles(e.clientX, e.clientY, Math.min(Math.floor(mouse.current.speed / 12), 4));
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hovered.current = !!(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth follow
      const lerp = 0.12;
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * lerp;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * lerp;

      const sx = smoothMouse.current.x;
      const sy = smoothMouse.current.y;

      if (sx > 0 && sy > 0) {
        // ── Spotlight glow ──
        const spotRadius = hovered.current ? 180 : 120;
        const spotAlpha = hovered.current ? 0.07 : 0.04;
        const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, spotRadius);
        gradient.addColorStop(0, `hsla(43, 72%, 55%, ${spotAlpha})`);
        gradient.addColorStop(0.5, `hsla(43, 72%, 55%, ${spotAlpha * 0.4})`);
        gradient.addColorStop(1, 'hsla(43, 72%, 55%, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(sx, sy, spotRadius, 0, Math.PI * 2);
        ctx.fill();

        // ── Inner dot ──
        const dotSize = hovered.current ? 4 : 3;
        ctx.beginPath();
        ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = 'hsl(43 72% 55%)';
        ctx.fill();

        // Dot glow
        const dotGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 12);
        dotGlow.addColorStop(0, 'hsla(43, 72%, 55%, 0.4)');
        dotGlow.addColorStop(1, 'hsla(43, 72%, 55%, 0)');
        ctx.fillStyle = dotGlow;
        ctx.beginPath();
        ctx.arc(sx, sy, 12, 0, Math.PI * 2);
        ctx.fill();

        // ── Ring (expands on hover) ──
        const ringRadius = hovered.current ? 24 : 16;
        ctx.beginPath();
        ctx.arc(sx, sy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(43, 72%, 55%, ${hovered.current ? 0.35 : 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Particles ──
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // subtle gravity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        const sat = p.hue === 43 ? '72%' : '60%';
        const light = p.hue === 43 ? '55%' : '30%';
        ctx.fillStyle = `hsla(${p.hue}, ${sat}, ${light}, ${p.life * 0.7})`;
        ctx.fill();

        // Tiny glow per particle
        if (p.size > 1.5) {
          const pGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          pGlow.addColorStop(0, `hsla(${p.hue}, ${sat}, ${light}, ${p.life * 0.15})`);
          pGlow.addColorStop(1, `hsla(${p.hue}, ${sat}, ${light}, 0)`);
          ctx.fillStyle = pGlow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [isTouchDevice, spawnParticles]);

  if (isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  hue: number;
}
