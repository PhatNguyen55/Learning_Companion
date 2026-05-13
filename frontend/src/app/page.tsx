import Navbar from '../components/landing/navbar'
import HeroSection from '../components/landing/hero-section'
import FeaturesSection from '../components/landing/features-section'
import HowItWorksSection from '../components/landing/how-it-works-section'
import TestimonialsSection from '../components/landing/testimonials-section'
import CTASection from '../components/landing/cta-section'
import FooterSection from '../components/landing/footer-section'

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}