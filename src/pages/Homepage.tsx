import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Globe, DollarSign, CheckCircle } from 'lucide-react';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import CTASection from '../components/sections/CTASection';
import { siteContent } from '../data/siteContent';

const Homepage = () => {
  const features = [
    {
      icon: DollarSign,
      title: 'Affordable',
      description: 'Quality expertise without the premium price tag'
    },
    {
      icon: Shield,
      title: 'Trusted & Verified',
      description: 'Every expert is vetted and verified for quality assurance'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with experts from around the world'
    },
    {
      icon: CheckCircle,
      title: 'Simple & Transparent',
      description: 'Clear pricing, easy discovery, seamless connections'
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <HeroSection
        title={siteContent.homepage.hero.title}
        subtitle={siteContent.homepage.hero.subtitle}
        description={`${siteContent.homepage.hero.highlight} ${siteContent.homepage.hero.description}`}
        primaryButton={siteContent.homepage.hero.primaryButton}
        secondaryButton={siteContent.homepage.hero.secondaryButton}
        backgroundGradient="from-slate-50 via-white to-blue-50"
      />

      {/* Stats Section */}
      <StatsSection stats={siteContent.homepage.stats} />

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-8">
              Discover curated, verified, and affordable expertise designed to help your business grow and thrive globally.
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              We help small businesses grow and expand into new markets by connecting them with trusted experts. 
              Our platform ensures quality expertise is accessible regardless of your location or budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Thriv Section */}
      <FeaturesSection
        title="Why choose Thriv?"
        features={features}
        backgroundColor="bg-white"
      />

      {/* Global Coverage Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Global Coverage
            </h2>
            <p className="text-xl text-slate-600 mb-12">
              Connecting expertise across continents
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Launch Regions</h3>
              <div className="grid grid-cols-2 gap-4">
                {['USA', 'Canada', 'UK', 'Australia', 'New Zealand', 'Germany', 'France', 'Spain', 'Italy', 'India'].map((country) => (
                  <div key={country} className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700 font-medium">{country}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Coming Soon</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Brazil', 'Argentina', 'Mexico', 'Chile', 'Singapore', 'Vietnam', 'Thailand', 'Taiwan', 'Cambodia', 'China'].map((country) => (
                  <div key={country} className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                    <span className="text-slate-600 font-medium">{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-8">
              Founder-led platform
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Designed to help SMBs access expertise without borders. We believe that quality 
              expertise shouldn't be limited by geography or budget. Our mission is to democratize 
              access to professional services and help small businesses compete on a global scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to grow your business?"
        description="Join thousands of small businesses discovering trusted expertise on Thriv"
        primaryButton={{ text: "Get Started Free" }}
        secondaryButton={{ text: "Join as Expert" }}
        backgroundGradient="from-slate-900 via-blue-900 to-indigo-900"
      />
    </div>
  );
};

export default Homepage;