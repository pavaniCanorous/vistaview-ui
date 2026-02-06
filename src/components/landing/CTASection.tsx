import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { FadeInOnScroll } from '@/components/ParallaxEffects';

const benefits = [
  'Immersive 3D Virtual Tours',
  'AI-Powered Property Matching',
  'Premium Builder Network',
  'Smart Interior Design Tools',
];

export default function CTASection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 px-4 overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(43 72% 55% / 0.06), transparent)',
            scale: bgScale,
            opacity: bgOpacity,
          }}
        />
        <motion.div
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(43 72% 55% / 0.04), transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(160 60% 30% / 0.04), transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="glass-panel rounded-3xl p-10 md:p-16 lg:p-20 relative overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated border lines */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          {/* Sparkle icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
          </motion.div>

          <div className="text-center">
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Ready to{' '}
              <span className="gold-text text-glow">Transform</span>
              <br className="hidden sm:block" />
              {' '}Your Experience?
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-lg sm:text-xl mb-10 font-sans max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Join thousands of professionals and homebuyers already using VistaView
            </motion.p>

            {/* Benefits list */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary/70" />
                  <span className="text-sm text-foreground/60 font-sans">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                onClick={() => navigate('/signin')}
                className="gold-gradient text-primary-foreground font-semibold px-10 sm:px-14 py-4 sm:py-5 rounded-xl text-lg glow-strong font-sans inline-flex items-center justify-center gap-3 group relative overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px hsl(43 72% 55% / 0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Get Started Now</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>

              <motion.button
                className="glass-panel px-10 py-4 sm:py-5 rounded-xl text-lg font-semibold text-foreground font-sans border border-primary/15 hover:border-primary/30 transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
