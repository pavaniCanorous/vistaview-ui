import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, BookOpen, Armchair, HeartHandshake } from 'lucide-react';
import Scene3D from '@/components/Scene3D';
import { ParallaxSection, MouseParallax, FadeInOnScroll, ParallaxImage } from '@/components/ParallaxEffects';
import Navbar from '@/components/Navbar';
import heroBg from '@/assets/hero-bg.jpg';
import interiorImg from '@/assets/interior-design.jpg';
import realEstateImg from '@/assets/real-estate.jpg';

const features = [
  { icon: Building2, label: 'Real Estate', desc: 'Explore premium properties with immersive 3D tours' },
  { icon: BookOpen, label: 'Product Catalogue', desc: 'Browse curated building materials and products' },
  { icon: Armchair, label: 'Interior Design', desc: 'AI-powered interior design visualization' },
  { icon: HeartHandshake, label: 'Services', desc: 'Professional services at your fingertips' },
];

const stats = [
  { value: '10K+', label: 'Properties Listed' },
  { value: '500+', label: 'Builders & Agents' },
  { value: '50+', label: 'Cities Covered' },
  { value: '95%', label: 'Client Satisfaction' },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </div>

        {/* 3D Scene */}
        <Scene3D />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <MouseParallax intensity={10}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.p
                className="text-primary/80 text-lg font-sans tracking-[0.3em] uppercase mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Welcome to the Future
              </motion.p>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight">
                <span className="gold-text text-shadow-gold">The Amazon</span>
                <br />
                <span className="text-foreground">of Real Estate</span>
              </h1>
              <motion.p
                className="text-foreground/70 text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                World&apos;s #1 Real Estate Intelligence & Virtual Experience Platform
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <button
                  onClick={() => navigate('/signin')}
                  className="gold-gradient text-primary-foreground font-semibold px-10 py-4 rounded-xl text-lg hover:scale-105 transition-transform duration-300 glow-strong font-sans"
                >
                  Get Started
                </button>
                <button className="glass-card px-10 py-4 rounded-xl text-lg font-semibold text-foreground hover:scale-105 transition-transform duration-300 font-sans border border-primary/30">
                  Explore Properties
                </button>
              </motion.div>
            </motion.div>
          </MouseParallax>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-20">
              <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">Our Platform</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold gold-text mb-6">
                Everything You Need
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto font-sans">
                One platform for all your real estate needs — from property discovery to interior design
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <FadeInOnScroll key={feature.label} delay={i * 0.15}>
                <ParallaxSection speed={0.1 * (i + 1)}>
                  <motion.div
                    className="flex flex-col items-center text-center group cursor-pointer"
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="feature-icon-box mb-6 group-hover:glow-strong">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">{feature.label}</h3>
                    <p className="text-muted-foreground text-sm font-sans">{feature.desc}</p>
                  </motion.div>
                </ParallaxSection>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section with Parallax Images */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInOnScroll>
              <div>
                <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">Virtual Experience</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Immersive <span className="gold-text">3D Property</span> Tours
                </h2>
                <p className="text-muted-foreground text-lg mb-8 font-sans leading-relaxed">
                  Walk through your dream home before it&apos;s even built. Our cutting-edge virtual reality technology 
                  lets you experience properties like never before.
                </p>
                <div className="flex gap-6">
                  {stats.slice(0, 2).map((stat) => (
                    <div key={stat.label} className="glass-card px-6 py-4 rounded-xl">
                      <div className="text-2xl font-bold gold-text font-display">{stat.value}</div>
                      <div className="text-muted-foreground text-sm font-sans">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={0.2}>
              <ParallaxImage
                src={realEstateImg}
                alt="Luxury Property"
                className="rounded-2xl h-[400px] glow"
              />
            </FadeInOnScroll>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-32">
            <FadeInOnScroll>
              <ParallaxImage
                src={interiorImg}
                alt="Interior Design"
                className="rounded-2xl h-[400px] glow order-2 md:order-1"
              />
            </FadeInOnScroll>
            <FadeInOnScroll delay={0.2}>
              <div className="order-1 md:order-2">
                <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">AI Powered</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Smart <span className="gold-text">Interior Design</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 font-sans leading-relaxed">
                  Let AI transform your space. Upload your room and see it redesigned in any style — 
                  modern, classical, minimalist, and more.
                </p>
                <div className="flex gap-6">
                  {stats.slice(2).map((stat) => (
                    <div key={stat.label} className="glass-card px-6 py-4 rounded-xl">
                      <div className="text-2xl font-bold gold-text font-display">{stat.value}</div>
                      <div className="text-muted-foreground text-sm font-sans">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll>
            <div className="glass-card-strong p-12 rounded-3xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold gold-text font-display mb-2">{stat.value}</div>
                    <div className="text-muted-foreground text-sm font-sans">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="gold-text">Transform</span> Your Experience?
            </h2>
            <p className="text-muted-foreground text-xl mb-10 font-sans max-w-xl mx-auto">
              Join thousands of professionals and homebuyers already using VistaView
            </p>
            <button
              onClick={() => navigate('/signin')}
              className="gold-gradient text-primary-foreground font-semibold px-12 py-5 rounded-xl text-xl hover:scale-105 transition-transform duration-300 glow-strong font-sans"
            >
              Sign In Now
            </button>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-display text-lg">V</span>
            </div>
            <span className="font-display text-xl font-bold text-foreground">Vista View</span>
          </div>
          <p className="text-muted-foreground text-sm font-sans">
            © 2026 Vista View Realty Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
