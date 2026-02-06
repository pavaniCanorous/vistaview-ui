import { motion } from 'framer-motion';
import { Building2, BookOpen, Armchair, HeartHandshake } from 'lucide-react';
import { Scroll3DRotate, StaggerContainer, StaggerItem } from '@/components/ParallaxEffects';
import TiltCard from '@/components/TiltCard';

const features = [
  {
    icon: Building2,
    label: 'Real Estate',
    desc: 'Explore premium properties with immersive 3D tours and virtual walkthroughs.',
  },
  {
    icon: BookOpen,
    label: 'Product Catalogue',
    desc: 'Browse curated building materials, fixtures, and design products.',
  },
  {
    icon: Armchair,
    label: 'Interior Design',
    desc: 'AI-powered interior design visualization and room transformation.',
  },
  {
    icon: HeartHandshake,
    label: 'Services',
    desc: 'Professional construction and design services at your fingertips.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background Orbs */}
      <div className="orb orb-emerald w-[400px] h-[400px] top-20 right-0 opacity-10" />
      <div className="orb orb-gold w-[300px] h-[300px] bottom-20 left-10 opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Scroll3DRotate>
          <div className="text-center mb-20">
            <motion.p
              className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Platform
            </motion.p>
            <h2 className="font-display text-4xl md:text-6xl font-bold gold-text mb-6">
              Everything You Need
            </h2>
            <div className="light-line max-w-xs mx-auto mt-6 mb-8" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto font-sans">
              One platform for all your real estate needs — from property discovery to interior design
            </p>
          </div>
        </Scroll3DRotate>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <StaggerItem key={feature.label}>
              <TiltCard className="h-full">
                <motion.div
                  className="glass-panel p-8 h-full flex flex-col items-center text-center group"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-xl border border-primary/40 bg-accent/30 flex items-center justify-center group-hover:border-primary/70 group-hover:glow transition-all duration-500">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{feature.label}</h3>
                  <p className="text-muted-foreground text-sm font-sans leading-relaxed">{feature.desc}</p>
                </motion.div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
