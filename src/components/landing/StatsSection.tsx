import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Scroll3DRotate } from '@/components/ParallaxEffects';
import TiltCard from '@/components/TiltCard';
import { TrendingUp, Building, Globe2, Star } from 'lucide-react';

const stats = [
  { value: 10000, suffix: '+', label: 'Properties Listed', icon: Building, color: 'primary' },
  { value: 500, suffix: '+', label: 'Builders & Agents', icon: TrendingUp, color: 'primary' },
  { value: 50, suffix: '+', label: 'Cities Covered', icon: Globe2, color: 'accent' },
  { value: 95, suffix: '%', label: 'Client Satisfaction', icon: Star, color: 'primary' },
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
          const duration = 2500;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-4">
      {/* Ambient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(43 72% 55% / 0.04), transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div style={{ scale, opacity }}>
          <div className="glass-panel p-8 md:p-12 lg:p-16 rounded-3xl relative overflow-hidden">
            {/* Animated corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20">
              <motion.div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/40 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary/40 to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20">
              <motion.div
                className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-primary/40 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-primary/40 to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>

            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.02] pointer-events-none" />

            {/* Title */}
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Trusted by <span className="gold-text">Industry Leaders</span>
              </h3>
              <p className="text-muted-foreground text-sm font-sans">Numbers that speak for themselves</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
              {stats.map((stat, i) => (
                <TiltCard key={stat.label} tiltAmount={8}>
                  <motion.div
                    className="text-center p-5 rounded-xl group cursor-pointer relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      <stat.icon className="w-4.5 h-4.5 text-primary" />
                    </motion.div>

                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold gold-text text-glow font-display mb-2">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-muted-foreground text-xs sm:text-sm font-sans">{stat.label}</div>

                    {/* Hover line */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                      initial={{ width: 0 }}
                      whileHover={{ width: '80%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
