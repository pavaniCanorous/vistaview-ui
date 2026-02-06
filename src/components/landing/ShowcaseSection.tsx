import { motion } from 'framer-motion';
import { CinematicReveal, ParallaxImage, ScrollScale } from '@/components/ParallaxEffects';
import TiltCard from '@/components/TiltCard';
import interiorImg from '@/assets/interior-design.jpg';
import realEstateImg from '@/assets/real-estate.jpg';

const stats = [
  { value: '10K+', label: 'Properties Listed' },
  { value: '500+', label: 'Builders & Agents' },
  { value: '50+', label: 'Cities Covered' },
  { value: '95%', label: 'Client Satisfaction' },
];

export default function ShowcaseSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Divider line */}
      <div className="light-line mb-24" />

      <div className="max-w-7xl mx-auto">
        {/* ──── Row 1: Real Estate ──── */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <CinematicReveal direction="left">
            <div>
              <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">Virtual Experience</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Immersive <span className="gold-text">3D Property</span> Tours
              </h2>
              <p className="text-muted-foreground text-lg mb-10 font-sans leading-relaxed">
                Walk through your dream home before it&apos;s even built. Our cutting-edge virtual reality technology
                lets you experience properties like never before.
              </p>
              <div className="flex gap-4">
                {stats.slice(0, 2).map((stat) => (
                  <TiltCard key={stat.label} tiltAmount={6}>
                    <div className="glass-panel px-6 py-5 rounded-xl">
                      <div className="text-2xl font-bold gold-text font-display">{stat.value}</div>
                      <div className="text-muted-foreground text-sm font-sans mt-1">{stat.label}</div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </CinematicReveal>

          <CinematicReveal direction="right">
            <ScrollScale>
              <ParallaxImage
                src={realEstateImg}
                alt="Luxury Property"
                className="rounded-2xl h-[400px] md:h-[450px] glow"
              />
            </ScrollScale>
          </CinematicReveal>
        </div>

        {/* Spacer with divider */}
        <div className="section-divider my-8" />

        {/* ──── Row 2: Interior Design ──── */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <CinematicReveal direction="left" className="order-2 md:order-1">
            <ScrollScale>
              <ParallaxImage
                src={interiorImg}
                alt="Interior Design"
                className="rounded-2xl h-[400px] md:h-[450px] glow-emerald"
              />
            </ScrollScale>
          </CinematicReveal>

          <CinematicReveal direction="right" className="order-1 md:order-2">
            <div>
              <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">AI Powered</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Smart <span className="gold-text">Interior Design</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 font-sans leading-relaxed">
                Let AI transform your space. Upload your room and see it redesigned in any style —
                modern, classical, minimalist, and more.
              </p>
              <div className="flex gap-4">
                {stats.slice(2).map((stat) => (
                  <TiltCard key={stat.label} tiltAmount={6}>
                    <div className="glass-panel px-6 py-5 rounded-xl">
                      <div className="text-2xl font-bold gold-text font-display">{stat.value}</div>
                      <div className="text-muted-foreground text-sm font-sans mt-1">{stat.label}</div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </CinematicReveal>
        </div>
      </div>
    </section>
  );
}
