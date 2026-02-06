import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CinematicReveal, ParallaxImage, ScrollScale } from '@/components/ParallaxEffects';
import TiltCard from '@/components/TiltCard';
import { Play, ArrowUpRight, Layers, Palette, MapPin, Users } from 'lucide-react';
import interiorImg from '@/assets/interior-design.jpg';
import realEstateImg from '@/assets/real-estate.jpg';

const badges1 = [
  { icon: MapPin, label: '50+ Cities' },
  { icon: Users, label: '500+ Agents' },
];

const badges2 = [
  { icon: Layers, label: '100+ Styles' },
  { icon: Palette, label: 'AI Design' },
];

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rotateCard = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 px-4 overflow-hidden">
      {/* Animated gradient lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(43 72% 55% / 0.04), transparent 65%)',
            filter: 'blur(60px)',
            y: parallaxY1,
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(160 60% 30% / 0.05), transparent 65%)',
            filter: 'blur(60px)',
            y: parallaxY2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ──── Row 1: Real Estate ──── */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 md:mb-44">
          <CinematicReveal direction="left">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary/80 text-[10px] tracking-[0.25em] uppercase font-sans">Virtual Experience</span>
              </motion.div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.05]">
                Immersive{' '}
                <span className="gold-text text-glow">3D Property</span>
                <br />Tours
              </h2>

              <p className="text-muted-foreground text-lg mb-10 font-sans leading-relaxed max-w-md">
                Walk through your dream home before it&apos;s even built. Our cutting-edge virtual reality technology
                lets you experience properties like never before.
              </p>

              {/* Badge row */}
              <div className="flex gap-3 mb-8">
                {badges1.map((b, i) => (
                  <motion.div
                    key={b.label}
                    className="flex items-center gap-2 glass-panel px-4 py-2.5 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <b.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-sans text-foreground/70">{b.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA link */}
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-sans font-semibold text-sm group"
                whileHover={{ x: 4 }}
              >
                Explore Properties
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </CinematicReveal>

          <CinematicReveal direction="right">
            <motion.div className="relative" style={{ rotateY: rotateCard }}>
              <ScrollScale>
                <div className="relative group">
                  <ParallaxImage
                    src={realEstateImg}
                    alt="Luxury Property"
                    className="rounded-2xl h-[400px] md:h-[500px]"
                  />
                  {/* Overlay elements */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                  {/* Play button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center glow-strong relative"
                      whileHover={{ scale: 1.15, boxShadow: '0 0 60px hsl(43 72% 55% / 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      <motion.div
                        className="absolute inset-0 rounded-full border border-primary/30"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    </motion.button>
                  </motion.div>

                  {/* Floating stat card */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl px-5 py-4 flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <div>
                      <div className="text-foreground font-sans font-semibold text-sm">Luxury Villa</div>
                      <div className="text-muted-foreground text-xs font-sans">Mumbai, India</div>
                    </div>
                    <div className="text-right">
                      <div className="gold-text font-display font-bold text-lg">$2.5M</div>
                      <div className="text-[10px] text-primary/60 font-sans">360° Tour</div>
                    </div>
                  </motion.div>

                  {/* Glow border */}
                  <div className="absolute inset-0 rounded-2xl border border-primary/10 group-hover:border-primary/25 transition-colors duration-500" />
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ boxShadow: '0 0 40px hsl(43 72% 55% / 0.1)' }}
                  />
                </div>
              </ScrollScale>
            </motion.div>
          </CinematicReveal>
        </div>

        {/* ──── Row 2: Interior Design ──── */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <CinematicReveal direction="left" className="order-2 md:order-1">
            <motion.div className="relative" style={{ rotateY: rotateCard }}>
              <ScrollScale>
                <div className="relative group">
                  <ParallaxImage
                    src={interiorImg}
                    alt="Interior Design"
                    className="rounded-2xl h-[400px] md:h-[500px]"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                  {/* Before/After slider indicator */}
                  <motion.div
                    className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-primary/40 flex items-center justify-center"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center border border-primary/30">
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-3 bg-primary/60 rounded-full" />
                        <div className="w-0.5 h-3 bg-primary/60 rounded-full" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Labels */}
                  <motion.div
                    className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-[10px] font-sans text-foreground/60 uppercase tracking-wider">Before</span>
                  </motion.div>
                  <motion.div
                    className="absolute top-4 right-4 glass-panel px-3 py-1.5 rounded-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                  >
                    <span className="text-[10px] font-sans text-primary uppercase tracking-wider">After • AI</span>
                  </motion.div>

                  <div className="absolute inset-0 rounded-2xl border border-accent/10 group-hover:border-accent/25 transition-colors duration-500" />
                </div>
              </ScrollScale>
            </motion.div>
          </CinematicReveal>

          <CinematicReveal direction="right" className="order-1 md:order-2">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-accent/80 text-[10px] tracking-[0.25em] uppercase font-sans">AI Powered</span>
              </motion.div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.05]">
                Smart{' '}
                <span className="gold-text text-glow">Interior</span>
                <br />Design
              </h2>

              <p className="text-muted-foreground text-lg mb-10 font-sans leading-relaxed max-w-md">
                Let AI transform your space. Upload your room and see it redesigned in any style —
                modern, classical, minimalist, and more.
              </p>

              <div className="flex gap-3 mb-8">
                {badges2.map((b, i) => (
                  <motion.div
                    key={b.label}
                    className="flex items-center gap-2 glass-panel px-4 py-2.5 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <b.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-sans text-foreground/70">{b.label}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-sans font-semibold text-sm group"
                whileHover={{ x: 4 }}
              >
                Try AI Design
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </CinematicReveal>
        </div>
      </div>
    </section>
  );
}
