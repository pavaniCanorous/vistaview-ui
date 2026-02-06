import Navbar from '@/components/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ShowcaseSection from '@/components/landing/ShowcaseSection';
import StatsSection from '@/components/landing/StatsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import CursorEffect from '@/components/CursorEffect';
import AIVoiceWidget from '@/components/AIVoiceWidget';

export default function Index() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden cinematic-gradient cursor-none">
      <CursorEffect />
      <AIVoiceWidget />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
