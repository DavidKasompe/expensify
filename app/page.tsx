import SiteBanner from '@/components/SiteBanner';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LogoMarquee from '@/components/LogoMarquee';
import FeaturesGrid from '@/components/FeaturesGrid';
import CaseStudies from '@/components/CaseStudies';
import FreeTrial from '@/components/FreeTrial';
import Reviews from '@/components/Reviews';
import Integrations from '@/components/Integrations';
import FAQ from '@/components/FAQ';
import BottomSignup from '@/components/BottomSignup';
import Footer from '@/components/Footer';

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
