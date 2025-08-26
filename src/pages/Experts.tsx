import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Badge, Globe, TrendingUp, CheckCircle, Star, Zap, Target } from 'lucide-react';

const Experts = () => {
  const categories = [
    { name: 'SEO Experts', icon: TrendingUp, description: 'Help businesses improve search rankings and organic traffic' },
    { name: 'Influencers', icon: Users, description: 'Grow brand awareness and engagement through social media' },
    { name: 'AI Agents', icon: Zap, description: 'Coming soon - Automated expertise and intelligent solutions' },
    { name: 'E-commerce', icon: Globe, description: 'Online store optimization and growth strategies' },
    { name: 'Web Development', icon: Badge, description: 'Custom solutions and technical expertise for digital growth' }
  ];

  const features = [
    {
      icon: Badge,
      title: 'Verified Badge',
      description: 'Stand out with our trust badge that shows you\'re verified and trusted by the platform'
    },
    {
      icon: Star,
      title: 'Free Listing',
      description: 'List your services completely free until September 2025 with full platform access'
    },
    {
      icon: Target,
      title: 'Premium Placement',
      description: 'Get featured placement in search results and increase your visibility to potential clients'
    }
  ];

  const steps = [
    {
      number: '01',
      icon: Users,
      title: 'Sign Up',
      description: 'Create your comprehensive expert profile showcasing your skills, experience, and expertise areas'
    },
    {
      number: '02',
      icon: Badge,
      title: 'Get Verified',
      description: 'Complete our thorough verification process to build trust and credibility with potential clients'
    },
    {
      number: '03',
      icon: Globe,
      title: 'Connect with SMBs',
      description: 'Start receiving inquiries from businesses worldwide looking for your specific expertise'
    }
  ];

  const benefits = [
    'Access to thousands of small businesses worldwide',
    'Verified badge builds trust and credibility',
    'Premium placement increases your visibility',
    'Profile analytics to track your performance',
    'Featured in newsletters and resource guides',
    'Direct messaging with potential clients'
  ];

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full">
                <Badge className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-900">For Experts & Professionals</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-none tracking-tight">
                Expand your reach.{' '}
                <span className="text-purple-600">Get discovered</span>{' '}
                by businesses worldwide.
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Join our curated network of trusted experts and connect with small businesses 
                Join our network of trusted experts on Thriv and start connecting with businesses today
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/pricing"
                  className="group inline-flex items-center justify-center px-10 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Join Free for 3 Months
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="text-sm text-gray-500">
                Free listings until September 2025
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Expert Categories
            </h2>
            <p className="text-xl text-gray-600">
              We're looking for expertise in these key areas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300">
                  <category.icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.name}</h3>
                <p className="text-gray-600 leading-relaxed">{category.description}</p>
                {category.name === 'AI Agents' && (
                  <span className="inline-block mt-4 px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                    Coming Soon
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why experts choose Thriv
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to grow your expert business
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <feature.icon className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to start connecting with clients
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center group"
              >
                <div className="relative inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg mb-8 group-hover:shadow-xl transition-all duration-300">
                  <span className="text-2xl font-bold text-purple-600">{step.number}</span>
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full">
                    <div className="flex justify-center">
                      <ArrowRight className="w-8 h-8 text-gray-300" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Grow your expert business globally
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-3xl p-12 text-white shadow-2xl"
            >
              <div className="text-center space-y-8">
                <div>
                  <div className="text-5xl font-bold mb-3">15,000+</div>
                  <div className="text-purple-100 text-lg">Expert Applications</div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <div className="text-3xl font-bold mb-2">92%</div>
                    <div className="text-purple-100">Client Satisfaction</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <div className="text-3xl font-bold mb-2">$2.3M</div>
                    <div className="text-purple-100">Expert Earnings</div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                  <blockquote className="text-purple-50 italic text-lg mb-3">
                    "Thriv connected me with 50+ new clients in my first 6 months. Best decision for my consulting business."
                  </blockquote>
                  <div className="text-purple-200">- Marcus L., SEO Expert</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-white mb-8">
              Ready to expand your reach?
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto">
              Join our network of trusted experts and start connecting with businesses today
            </p>
            <Link
              to="/pricing"
              className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Get Started Free
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="mt-6 text-purple-100">
              Free for 3 months • No setup fees • Cancel anytime
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Experts;