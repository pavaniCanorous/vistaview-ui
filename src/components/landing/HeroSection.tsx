import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Search, Building2, BookOpen, Sofa, HandshakeIcon, Sparkles, ChevronDown } from 'lucide-react';
import Scene3D from '@/components/Scene3D';
import heroBg from '@/assets/hero-bg.jpg';

const services = [
  { icon: Building2, label: 'Real Estate', delay: 0.1 },
  { icon: BookOpen, label: 'Product Catalogue', delay: 0.2 },
  { icon: Sofa, label: 'Interior Design', delay: 0.3 },
  { icon: HandshakeIcon, label: 'Services', delay: 0.4 },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
        <img src={heroBg} alt="Skyline" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </motion.div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {/* Large gold gradient orb */}
        <motion.div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, hsl(43 72% 55%), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Emerald gradient orb */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.1]"
          style={{
            background: 'radial-gradient(circle, hsl(160 60% 30%), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Mid accent orb */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, hsl(43 80% 70%), transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* 3D Scene */}
      <Scene3D />

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-[10%] w-3 h-3 rounded-full bg-primary/30 pointer-events-none z-[2]"
        animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[30%] right-[15%] w-2 h-2 rounded-full bg-primary/20 pointer-events-none z-[2]"
        animate={{ y: [0, 20, 0], x: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[20%] w-4 h-4 rounded-full bg-accent/20 pointer-events-none z-[2]"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-[50%] right-[8%] w-1.5 h-1.5 rounded-full bg-primary/40 pointer-events-none z-[2]"
        animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Content with Parallax */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ y: textY, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 glass-panel px-5 py-2.5 rounded-full mb-8 text-sm font-sans">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary/90 tracking-[0.2em] uppercase">AI-Powered Platform</span>
          </span>
        </motion.div>

        {/* Main Heading with staggered animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-[0.95]">
            <motion.span
              className="gold-text text-glow inline-block"
              initial={{ opacity: 0, y: 60, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              The Amazon
            </motion.span>
            <br />
            <motion.span
              className="text-foreground inline-block"
              initial={{ opacity: 0, y: 60, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              of Real Estate
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle with reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-foreground/60 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-sans leading-relaxed">
            World&apos;s #1 Real Estate Intelligence &amp; Virtual Experience Platform
          </p>
        </motion.div>

        {/* Service Cards with Stagger */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12"
          style={{ y: cardsY }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 1 + service.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.div
                className="glass-panel relative group cursor-pointer px-6 py-4 sm:px-8 sm:py-5 rounded-2xl flex flex-col items-center gap-3 min-w-[120px]"
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: '0 20px 60px hsl(43 72% 55% / 0.15)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                <span className="relative z-10 text-foreground/80 text-sm font-sans font-medium group-hover:text-foreground transition-colors duration-300">
                  {service.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search Bar with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative group">
            {/* Animated border glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

            <div className="relative glass-panel rounded-2xl px-5 py-3.5 flex items-center gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xl">🤖</span>
                <span className="text-foreground/40 text-sm font-sans hidden sm:inline">AI Search</span>
              </div>

              <input
                type="text"
                placeholder="Ask AI to find your dream property..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-foreground/30 font-sans text-sm sm:text-base"
              />

              <motion.button
                className="gold-gradient text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold font-sans flex items-center gap-2 shrink-0"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsl(43 72% 55% / 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs font-sans tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border border-primary/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2.5 bg-primary/50 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
