import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Users, TrendingUp, CheckCircle, DollarSign, Globe, Shield, Star, Building } from 'lucide-react';

const JoinBusiness = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Affordable Access',
      description: 'Get premium expertise at small business prices with transparent, fair pricing'
    },
    {
      icon: Shield,
      title: 'Verified Experts',
      description: 'All experts are thoroughly vetted and verified for quality and reliability'
    },
    {
      icon: Search,
      title: 'Easy Discovery',
      description: 'Find the perfect expert for your needs with our advanced search and matching'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access expertise from around the world, breaking geographical barriers'
    }
  ];

  const steps = [
    {
      number: '01',
      icon: Building,
      title: 'Create Your Profile',
      description: 'Set up your business profile with your industry, goals, and specific needs'
    },
    {
      number: '02',
      icon: Search,
      title: 'Browse & Connect',
      description: 'Search through verified experts and connect with those who match your requirements'
    },
    {
      number: '03',
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Work with experts to implement strategies and achieve your growth objectives'
    }
  ];

  const features = [
    'Access to 10,000+ verified experts worldwide',
    'Direct messaging and project collaboration tools',
    'Transparent pricing with no hidden fees',
    'Expert ratings and reviews from real businesses',
    'Secure payment processing and dispute resolution',
    '24/7 customer support in multiple languages',
    'Advanced search filters by expertise and location',
    'Project management tools and milestone tracking'
  ];

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
                <Building className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-900">Join as Business</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-none tracking-tight">
                Find the perfect{' '}
                <span className="text-green-600">expert</span>{' '}
                for your business
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Connect with verified SEO experts, influencers, developers, and more. 
                Get the expertise you need to grow your business globally.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/pricing"
                  className="group inline-flex items-center justify-center px-10 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Free Today
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/customers"
                  className="inline-flex items-center justify-center px-10 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
              
              <div className="text-sm text-gray-500">
                Free access • No credit card required • Cancel anytime
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why businesses choose Thethriv
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to find and work with the right expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="w-10 h-10 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to connect with expertise
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
                  <span className="text-2xl font-bold text-green-600">{step.number}</span>
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
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

      {/* Features Section */}
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
                Everything you need to succeed
              </h2>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-green-600 to-blue-700 rounded-3xl p-12 text-white shadow-2xl"
            >
              <div className="text-center space-y-8">
                <div>
                  <div className="text-5xl font-bold mb-3">94%</div>
                  <div className="text-green-100 text-lg">Business Satisfaction Rate</div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <div className="text-3xl font-bold mb-2">48h</div>
                    <div className="text-green-100">Avg. Response Time</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <div className="text-3xl font-bold mb-2">3.2x</div>
                    <div className="text-green-100">Growth Increase</div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                  <blockquote className="text-green-50 italic text-lg mb-3">
                    "Thethriv helped us find the perfect SEO expert who increased our traffic by 300% in just 3 months."
                  </blockquote>
                  <div className="text-green-200">- Sarah K., E-commerce Business</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-green-600 to-blue-600">
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
            <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
              Join thousands of small businesses finding success with Thethriv
            </p>
            <Link
              to="/pricing"
              className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold bg-white text-green-600 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Start Free Today
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="mt-6 text-green-100">
              No commitment • Cancel anytime • Free forever plan available
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default JoinBusiness;