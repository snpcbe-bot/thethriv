import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Globe, DollarSign, CheckCircle, Users, Target, Zap, Star, TrendingUp } from 'lucide-react';
import HeroVideo from '../components/HeroVideo';
import ValueCard from '../components/ValueCard';
import StatsCard from '../components/StatsCard';

const Homepage = () => {
  const values = [
    {
      icon: DollarSign,
      title: 'Affordable',
      description: 'Quality expertise without the premium price tag',
      gradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: Shield,
      title: 'Trusted & Verified',
      description: 'Every expert is vetted and verified for quality assurance',
      gradient: 'from-blue-50 to-indigo-50'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with experts from around the world',
      gradient: 'from-purple-50 to-pink-50'
    },
    {
      icon: CheckCircle,
      title: 'Simple & Transparent',
      description: 'Clear pricing, easy discovery, seamless connections',
      gradient: 'from-orange-50 to-red-50'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Verified Experts', gradient: 'from-blue-600 to-indigo-600' },
    { number: '50+', label: 'Countries', gradient: 'from-green-600 to-emerald-600' },
    { number: '94%', label: 'Satisfaction Rate', gradient: 'from-purple-600 to-pink-600' },
    { number: '48h', label: 'Avg Response', gradient: 'from-orange-600 to-red-600' }
  ];

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                About Thriv
                  <Star className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-900">Quality expertise made accessible</span>
                Join thousands of small businesses discovering trusted expertise on Thriv
                
                <h1 className="text-6xl lg:text-8xl font-bold text-slate-900 leading-none tracking-tight">
                  Quality expertise made{' '}
                  <span className="text-blue-600">accessible</span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                  SEO Experts, Influencers, AI Agents & more — trusted and curated for small businesses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/join-business"
                  className="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Join as Business
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/join-expert"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white text-blue-600 font-semibold border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-lg"
                >
                  Join as Expert
                </Link>
              </div>

              <div className="text-sm text-slate-500">
                Free access until September 2025 • No credit card required
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
                {stats.map((stat, index) => (
                  <StatsCard
                    key={index}
                    number={stat.number}
                    label={stat.label}
                    gradient={stat.gradient}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Right Column */}
            <HeroVideo />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Why choose Thethriv?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We help small businesses grow and expand into new markets by connecting them with trusted experts to grow smartly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
                gradient={value.gradient}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Global Coverage Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Global Coverage
            </h2>
            <p className="text-xl text-slate-600 mb-12">
              Connecting expertise across continents
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mt-20">
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
      <section className="py-32 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-slate-900 mb-8">
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
      <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-white mb-8">
              Ready to grow your business?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of small businesses discovering trusted expertise on Thethriv
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/join-business"
                className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Started Free
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/join-expert"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-200"
              >
                Join as Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;