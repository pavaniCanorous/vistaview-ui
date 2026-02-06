import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Building2, BookOpen, Armchair, HeartHandshake, ArrowRight, Zap, Shield, Eye, Cpu } from 'lucide-react';
import { Scroll3DRotate, StaggerContainer, StaggerItem } from '@/components/ParallaxEffects';
import TiltCard from '@/components/TiltCard';

const features = [
  {
    icon: Building2,
    label: 'Real Estate',
    desc: 'Explore premium properties with immersive 3D tours and virtual walkthroughs.',
    gradient: 'from-primary/20 to-primary/5',
    accent: 'hsl(43 72% 55%)',
    stat: '10K+ Properties',
  },
  {
    icon: BookOpen,
    label: 'Product Catalogue',
    desc: 'Browse curated building materials, fixtures, and design products.',
    gradient: 'from-accent/20 to-accent/5',
    accent: 'hsl(160 60% 30%)',
    stat: '50K+ Products',
  },
  {
    icon: Armchair,
    label: 'Interior Design',
    desc: 'AI-powered interior design visualization and room transformation.',
    gradient: 'from-primary/15 to-accent/10',
    accent: 'hsl(43 72% 55%)',
    stat: 'AI Powered',
  },
  {
    icon: HeartHandshake,
    label: 'Services',
    desc: 'Professional construction and design services at your fingertips.',
    gradient: 'from-accent/15 to-primary/10',
    accent: 'hsl(160 60% 30%)',
    stat: '500+ Experts',
  },
];

const capabilities = [
  { icon: Zap, label: 'Lightning Fast', desc: 'Instant search results' },
  { icon: Shield, label: 'Verified Listings', desc: 'Every property authenticated' },
  { icon: Eye, label: 'Virtual Tours', desc: 'Immersive 3D walkthroughs' },
  { icon: Cpu, label: 'AI Intelligence', desc: 'Smart recommendations' },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(160 60% 25% / 0.06), transparent 65%)',
            filter: 'blur(80px)',
            rotate: bgRotate,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(43 72% 55% / 0.05), transparent 65%)',
            filter: 'blur(80px)',
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(43 72% 55% / 0.4) 1px, transparent 1px),
              linear-gradient(90deg, hsl(43 72% 55% / 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <Scroll3DRotate>
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary/80 text-xs tracking-[0.25em] uppercase font-sans">Our Platform</span>
            </motion.div>

            <motion.h2
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="gold-text text-glow">Everything</span>{' '}
              <span className="text-foreground">You Need</span>
            </motion.h2>

            {/* Animated divider */}
            <motion.div
              className="h-px mx-auto mt-6 mb-8 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              style={{ width: lineWidth }}
            />

            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto font-sans"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              One platform for all your real estate needs — from property discovery to interior design
            </motion.p>
          </div>
        </Scroll3DRotate>

        {/* Feature Cards — Large, immersive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {features.map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 60, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="h-full">
                <motion.div
                  className="glass-panel p-7 h-full flex flex-col group relative overflow-hidden rounded-2xl"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 right-0 h-px">
                    <motion.div
                      className="h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  </div>

                  {/* Hover gradient bg */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  {/* Icon */}
                  <div className="relative mb-5">
                    <motion.div
                      className="w-14 h-14 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-center group-hover:border-primary/60 transition-all duration-500 relative overflow-hidden"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                    >
                      <feature.icon className="w-6 h-6 text-primary relative z-10" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ boxShadow: `inset 0 0 20px ${feature.accent}33` }}
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.label}
                  </h3>
                  <p className="text-muted-foreground text-sm font-sans leading-relaxed mb-4 flex-1">
                    {feature.desc}
                  </p>

                  {/* Stat badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-primary/60 font-sans tracking-wider uppercase">
                      {feature.stat}
                    </span>
                    <motion.div
                      className="w-7 h-7 rounded-full border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.2, borderColor: 'hsl(43 72% 55% / 0.5)' }}
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    </motion.div>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Capabilities strip */}
        <motion.div
          className="glass-panel rounded-2xl p-6 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.label}
                className="flex items-center gap-3 group cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300 shrink-0">
                  <cap.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground font-sans">{cap.label}</div>
                  <div className="text-[11px] text-muted-foreground font-sans">{cap.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
