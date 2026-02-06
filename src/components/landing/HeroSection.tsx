import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Scene3D from '@/components/Scene3D';
import { MouseParallax } from '@/components/ParallaxEffects';
import heroBg from '@/assets/hero-bg.jpg';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Multi-layer Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="Skyline" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </div>

      {/* Ambient Orbs */}
      <div className="orb orb-gold w-[600px] h-[600px] -top-40 -right-40" />
      <div className="orb orb-emerald w-[500px] h-[500px] -bottom-32 -left-32" />

      {/* 3D Scene */}
      <Scene3D />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <MouseParallax intensity={8}>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Tagline */}
            <motion.div
              className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary/90 text-sm font-sans tracking-[0.2em] uppercase">
                Welcome to the Future
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-[0.95]">
              <span className="gold-text text-glow">The Amazon</span>
              <br />
              <span className="text-foreground">of Real Estate</span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-foreground/60 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-sans leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              World&apos;s #1 Real Estate Intelligence & Virtual Experience Platform
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                onClick={() => navigate('/signin')}
                className="gold-gradient text-primary-foreground font-semibold px-10 py-4 rounded-xl text-lg glow-strong font-sans relative overflow-hidden group"
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px hsl(43 72% 55% / 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
              <motion.button
                className="glass-panel px-10 py-4 rounded-xl text-lg font-semibold text-foreground font-sans border border-primary/20"
                whileHover={{ scale: 1.05, borderColor: 'hsl(43 72% 55% / 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Properties
              </motion.button>
            </motion.div>
          </motion.div>
        </MouseParallax>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-muted-foreground text-xs font-sans tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border border-primary/30 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2.5 bg-primary/50 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
