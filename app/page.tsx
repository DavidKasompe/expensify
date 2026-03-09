import SiteBanner from '@/components/landing/SiteBanner';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import LogoMarquee from '@/components/landing/LogoMarquee';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import CaseStudies from '@/components/landing/CaseStudies';
import FreeTrial from '@/components/landing/FreeTrial';
import Reviews from '@/components/landing/Reviews';
import Integrations from '@/components/landing/Integrations';
import FAQ from '@/components/landing/FAQ';
import BottomSignup from '@/components/landing/BottomSignup';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main>
      <SiteBanner />
      <div className="bg-[#002419]">
        <div className="max-w-7xl mx-auto">
          <Navbar />
        </div>
      </div>
      <HeroSection />
      <LogoMarquee />
      <FeaturesGrid />
      <CaseStudies />
      <FreeTrial />
      <Reviews />
      <Integrations />
      <FAQ />
      <BottomSignup />
      <Footer />
    </main>
  );
}
