import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Globe, DollarSign, CheckCircle, Users, Target, Zap, Star } from 'lucide-react';
import GlobalMap from '../components/GlobalMap';

const Homepage = () => {
  const values = [
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

  const stats = [
    { number: '10,000+', label: 'Verified Experts' },
    { number: '50+', label: 'Countries' },
    { number: '94%', label: 'Satisfaction Rate' },
    { number: '48h', label: 'Avg Response' }
  ];

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-white">
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
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
                  <Star className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-900">Quality expertise made accessible</span>
                </div>
                
                <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-none tracking-tight">
                  Quality expertise made{' '}
                  <span className="text-blue-600">accessible</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  SEO Experts, Influencers, AI Agents & more — trusted and curated for small businesses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/customers"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Find Experts
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/experts"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200"
                >
                  Join as Expert
                </Link>
              </div>

              <div className="text-sm text-gray-500">
                Free access until September 2025 • No credit card required
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-12 text-white shadow-2xl">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold">Expert Connection</div>
                      <div className="text-blue-100">Live Platform Demo</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-lg">SEO Expert matched</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-lg">Instant connection</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-lg">Growth strategy delivered</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">10,000+</div>
                      <div className="text-blue-100">Verified Experts Ready</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-400 rounded-full opacity-10 animate-pulse"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why choose Thethriv?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We help small businesses grow and expand into new markets by connecting them with trusted experts to grow smartly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Coverage Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Global Coverage
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Connecting expertise across continents
            </p>
          </div>
          
          <GlobalMap />
          
          <div className="grid md:grid-cols-2 gap-12 mt-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Launch Regions</h3>
              <div className="grid grid-cols-2 gap-4">
                {['USA', 'Canada', 'UK', 'Australia', 'New Zealand', 'Germany', 'France', 'Spain', 'Italy', 'India'].map((country) => (
                  <div key={country} className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{country}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Brazil', 'Argentina', 'Mexico', 'Chile', 'Singapore', 'Vietnam', 'Thailand', 'Taiwan', 'Cambodia', 'China'].map((country) => (
                  <div key={country} className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-600 font-medium">{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              Founder-led platform
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Designed to help SMBs access expertise without borders. We believe that quality 
              expertise shouldn't be limited by geography or budget. Our mission is to democratize 
              access to professional services and help small businesses compete on a global scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-purple-700">
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
                to="/customers"
                className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Started Free
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/experts"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-200"
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