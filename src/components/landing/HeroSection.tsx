import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Search, Building2, BookOpen, Sofa, HandshakeIcon, Sparkles, ArrowRight, Play } from 'lucide-react';
import Scene3D from '@/components/Scene3D';
import heroBg from '@/assets/hero-bg.jpg';

const services = [
  { icon: Building2, label: 'Real Estate', desc: 'Buy & Sell', delay: 0 },
  { icon: BookOpen, label: 'Product Catalogue', desc: 'Browse All', delay: 0.08 },
  { icon: Sofa, label: 'Interior Design', desc: 'AI Powered', delay: 0.16 },
  { icon: HandshakeIcon, label: 'Services', desc: 'Premium', delay: 0.24 },
];

const floatingWords = ['Intelligence', 'Innovation', 'Virtual Reality', 'AI-Driven'];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWord, setActiveWord] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Multi-layer parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0.35, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const sceneScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);

  // Rotate floating words
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % floatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden"
    >
      {/* ── Layer 0: Background Image ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
        <motion.img
          src={heroBg}
          alt="Skyline"
          className="w-full h-full object-cover"
          style={{ opacity: bgOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </motion.div>

      {/* ── Layer 1: Animated Gradient Mesh ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-[20%] -right-[15%] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(43 72% 55% / 0.07), transparent 65%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[20%] -left-[15%] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(160 60% 25% / 0.08), transparent 65%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Horizontal light beam */}
        <motion.div
          className="absolute top-[45%] left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(43 72% 55% / 0.08) 30%, hsl(43 72% 55% / 0.15) 50%, hsl(43 72% 55% / 0.08) 70%, transparent 100%)',
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Layer 2: 3D Scene ── */}
      <motion.div className="absolute inset-0 z-[2]" style={{ scale: sceneScale }}>
        <Scene3D />
      </motion.div>

      {/* ── Layer 3: Floating Grid Lines ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(43 72% 55% / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(43 72% 55% / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── Layer 4: Content ── */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Badge with rotating words */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-3 glass-panel px-6 py-3 rounded-full">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-primary/80 text-xs font-sans tracking-[0.25em] uppercase">
              Powered by
            </span>
            <div className="h-4 overflow-hidden w-24">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeWord}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="block text-primary text-xs font-sans font-semibold tracking-wider uppercase"
                >
                  {floatingWords[activeWord]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Title — Split with emphasis */}
        <div className="mb-8">
          <motion.h1
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold leading-[0.9] tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.span
                className="gold-text text-glow inline-block"
                initial={{ y: '100%', rotateX: -40 }}
                animate={{ y: '0%', rotateX: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                The Amazon
              </motion.span>
            </motion.div>
            <motion.div className="overflow-hidden mt-1">
              <motion.span
                className="text-foreground inline-block"
                initial={{ y: '100%', rotateX: -40 }}
                animate={{ y: '0%', rotateX: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                of Real Estate
              </motion.span>
            </motion.div>
          </motion.h1>
        </div>

        {/* Subtitle with decorative lines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <div className="hidden sm:block h-px w-16 bg-gradient-to-r from-transparent to-primary/30" />
          <p className="text-foreground/50 text-base sm:text-lg md:text-xl max-w-xl font-sans leading-relaxed">
            World&apos;s #1 Real Estate Intelligence &amp; Virtual Experience Platform
          </p>
          <div className="hidden sm:block h-px w-16 bg-gradient-to-l from-transparent to-primary/30" />
        </motion.div>

        {/* Service Cards — Horizontal strip */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
          style={{ y: cardsY }}
        >
          {services.map((service) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 1.1 + service.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="glass-panel relative group cursor-pointer rounded-2xl overflow-hidden"
                whileHover={{
                  scale: 1.06,
                  y: -6,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {/* Top glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="px-5 py-4 sm:px-7 sm:py-5 flex flex-col items-center gap-2.5 min-w-[100px] sm:min-w-[130px]">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/35 group-hover:shadow-[0_0_20px_hsl(43_72%_55%/0.15)] transition-all duration-400">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <span className="block text-foreground/80 text-xs sm:text-sm font-sans font-medium group-hover:text-foreground transition-colors duration-300">
                      {service.label}
                    </span>
                    <span className="block text-[10px] text-muted-foreground font-sans mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {service.desc}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search Bar — Elevated design */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            className="relative"
            animate={searchFocused ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-[2px] rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, hsl(43 72% 55% / 0.2), hsl(160 60% 30% / 0.1), hsl(43 72% 55% / 0.2))',
              }}
              animate={searchFocused ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            <div className="relative glass-panel rounded-2xl px-4 sm:px-6 py-3.5 flex items-center gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Ask AI to find your dream property..."
                  className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-foreground/25 font-sans text-sm sm:text-base"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>

              <motion.button
                className="gold-gradient text-primary-foreground px-4 sm:px-6 py-2.5 rounded-xl text-sm font-semibold font-sans flex items-center gap-2 shrink-0"
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px hsl(43 72% 55% / 0.35)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground/60 text-[10px] font-sans tracking-[0.3em] uppercase">
            Explore
          </span>
          <div className="w-5 h-9 border border-primary/25 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-0.5 h-2 bg-primary/40 rounded-full"
              animate={{ y: [0, 14, 0], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
