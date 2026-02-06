import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorEffect() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Smooth spring for the main cursor dot
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });

  // Slower spring for the outer ring
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Add to trail
      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 30) {
        trailRef.current.shift();
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hovering on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Canvas-based particle trail
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; alpha: number; size: number; vx: number; vy: number }[] = [];

    let lastX = 0;
    let lastY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = trailRef.current;
      if (trail.length > 1) {
        const last = trail[trail.length - 1];
        const dx = last.x - lastX;
        const dy = last.y - lastY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Spawn particles based on speed
        if (speed > 2) {
          for (let i = 0; i < Math.min(Math.floor(speed / 5), 3); i++) {
            particles.push({
              x: last.x + (Math.random() - 0.5) * 10,
              y: last.y + (Math.random() - 0.5) * 10,
              alpha: 0.6,
              size: Math.random() * 3 + 1,
              vx: (Math.random() - 0.5) * 1.5,
              vy: (Math.random() - 0.5) * 1.5,
            });
          }
        }

        lastX = last.x;
        lastY = last.y;
      }

      // Draw and update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;
        p.size *= 0.98;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 72%, 55%, ${p.alpha})`;
        ctx.fill();
      }

      // Draw trail line
      if (trail.length > 2) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          const xc = (trail[i].x + trail[i - 1].x) / 2;
          const yc = (trail[i].y + trail[i - 1].y) / 2;
          ctx.quadraticCurveTo(trail[i - 1].x, trail[i - 1].y, xc, yc);
        }
        const gradient = ctx.createLinearGradient(
          trail[0].x, trail[0].y,
          trail[trail.length - 1].x, trail[trail.length - 1].y
        );
        gradient.addColorStop(0, 'hsla(43, 72%, 55%, 0)');
        gradient.addColorStop(1, 'hsla(43, 72%, 55%, 0.15)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Hide on touch devices
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <>
      {/* Canvas for particle trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Main cursor dot */}
      <motion.div
        className="fixed z-[9999] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 0.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="w-2 h-2 rounded-full bg-primary"
          style={{
            boxShadow: '0 0 10px hsl(43 72% 55% / 0.6), 0 0 20px hsl(43 72% 55% / 0.3)',
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed z-[9999] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 50 : 32,
            height: isHovering ? 50 : 32,
            borderColor: isHovering ? 'hsl(43 72% 55% / 0.6)' : 'hsl(43 72% 55% / 0.3)',
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="rounded-full border"
          style={{
            boxShadow: '0 0 15px hsl(43 72% 55% / 0.1)',
          }}
        />
      </motion.div>

      {/* Ambient glow that follows cursor */}
      <motion.div
        className="fixed z-[9997] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{ opacity: isVisible ? 0.12 : 0 }}
          className="w-[200px] h-[200px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(43 72% 55%), transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>
    </>
  );
}
