import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FadeInOnScroll } from '@/components/ParallaxEffects';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background Orbs */}
      <div className="orb orb-gold w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeInOnScroll>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to <span className="gold-text text-glow">Transform</span>
            <br />
            Your Experience?
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl mb-12 font-sans max-w-xl mx-auto">
            Join thousands of professionals and homebuyers already using VistaView
          </p>

          <motion.button
            onClick={() => navigate('/signin')}
            className="gold-gradient text-primary-foreground font-semibold px-12 py-5 rounded-xl text-xl glow-strong font-sans inline-flex items-center gap-3 group relative overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px hsl(43 72% 55% / 0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">Sign In Now</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
