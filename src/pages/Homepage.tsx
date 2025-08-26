import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Globe, DollarSign, CheckCircle, ArrowRight, Users, TrendingUp, Star } from 'lucide-react';
import InteractiveWindow from '../components/InteractiveWindow';

const Homepage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Experts',
      description: 'Every expert is thoroughly vetted and verified for quality assurance'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with top-tier experts from around the world'
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'Clear, upfront pricing with no hidden fees or commissions'
    },
    {
      icon: CheckCircle,
      title: 'Quality Guaranteed',
      description: 'Curated network ensures you work with the best professionals'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Verified Experts', icon: Users },
    { number: '25+', label: 'Countries', icon: Globe },
    { number: '24h', label: 'Avg Response', icon: TrendingUp }
  ];

  const testimonials = [
    {
      quote: "Thriv connected us with an SEO expert who increased our organic traffic by 400% in just 4 months.",
      author: "Sarah Chen",
      role: "Founder, EcoTech Solutions",
      avatar: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      quote: "The quality of experts on Thriv is exceptional. Found the perfect influencer for our brand campaign.",
      author: "Marcus Rodriguez",
      role: "Marketing Director, FreshStart",
      avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      quote: "Simple, transparent, and effective. Thriv made finding expertise effortless for our growing business.",
      author: "Emma Thompson",
      role: "CEO, Digital Dynamics",
      avatar: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Quality expertise made{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    accessible
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed">
                  Connect with verified SEO experts, influencers, and specialists worldwide. 
                  Transparent pricing, guaranteed quality, global reach.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/search"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  Find Experts
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/join-expert"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
                >
                  Join as Expert
                </Link>
              </div>
              
              <div className="text-sm text-slate-500">
                Free access until September 2025 • No credit card required
              </div>
            </motion.div>

            {/* Right Interactive Window */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <InteractiveWindow />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-lg font-medium text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Why choose Thriv?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We've built the most trusted platform for connecting businesses with verified expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Trusted by growing businesses
            </h2>
            <p className="text-xl text-slate-600">
              See what our customers say about their experience
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to grow your business?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Join thousands of businesses finding success with verified experts on Thriv
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/search"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Start Free Today
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/join-expert"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                Join as Expert
              </Link>
            </div>
            <div className="mt-8 text-blue-200">
              No commitment • Cancel anytime • Free until September 2025
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;