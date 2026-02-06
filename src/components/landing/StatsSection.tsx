import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Scroll3DRotate } from '@/components/ParallaxEffects';

const stats = [
  { value: 10000, suffix: '+', label: 'Properties Listed' },
  { value: 500, suffix: '+', label: 'Builders & Agents' },
  { value: 50, suffix: '+', label: 'Cities Covered' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * value);
            setDisplay(current >= 1000 ? `${(current / 1000).toFixed(current >= 10000 ? 0 : 1)}K` : `${current}`);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <Scroll3DRotate>
          <div className="glass-panel p-10 md:p-14 rounded-3xl relative overflow-hidden">
            {/* Subtle interior gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald/5 pointer-events-none" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold gold-text font-display mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-muted-foreground text-sm font-sans">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Scroll3DRotate>
      </div>
    </section>
  );
}
