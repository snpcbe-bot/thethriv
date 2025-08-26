import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Globe, DollarSign, CheckCircle, Users, Target, Zap, Star, TrendingUp } from 'lucide-react';
import HeroVideo from '../components/HeroVideo';
import ValueCard from '../components/ValueCard';
import StatsCard from '../components/StatsCard';

const Homepage = () => {
  const stats = [
    { number: '1000+', label: 'Verified Experts', gradient: 'from-blue-600 to-indigo-600' },
    { number: '20+', label: 'Countries Covered', gradient: 'from-green-600 to-emerald-600' },
    { number: '24h', label: 'Average Response Time', gradient: 'from-purple-600 to-pink-600' }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
                Thriv – Your Trusted Partner for Business Growth
              </h1>
              
              <div className="space-y-4 mb-8">
                <p className="text-2xl text-slate-700 font-medium">
                  Connecting thousands of small businesses with verified experts worldwide.
                </p>
                <p className="text-xl text-blue-600 font-semibold">
                  Quality expertise made accessible.
                </p>
                <p className="text-lg text-slate-600">
                  SEO Experts, Influencers, AI Agents & more — trusted and curated for small businesses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/join-business"
                  className="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                  </div>
                  <div className="text-lg font-bold text-slate-900 mb-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Why choose Thriv?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 group-hover:scale-110 transition-all duration-300">
                <DollarSign className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Affordable</h3>
              <p className="text-slate-600 leading-relaxed">Quality expertise without the premium price tag</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <Shield className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Trusted & Verified</h3>
              <p className="text-slate-600 leading-relaxed">Every expert is vetted and verified for quality assurance</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300">
                <Globe className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Global Reach</h3>
              <p className="text-slate-600 leading-relaxed">Connect with experts from around the world</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-300">
                <CheckCircle className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Simple & Transparent</h3>
              <p className="text-slate-600 leading-relaxed">Clear pricing, easy discovery, seamless connections</p>
            </motion.div>
          </div>
        </div>
      </section>

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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to grow your business?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of small businesses discovering trusted expertise on Thriv
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