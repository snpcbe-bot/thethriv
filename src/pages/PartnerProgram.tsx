import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building, Handshake, TrendingUp, CheckCircle, Star, Globe, Target } from 'lucide-react';

const PartnerProgram = () => {
  const partnerTypes = [
    {
      icon: Building,
      title: 'Chambers of Commerce',
      description: 'Partner with us to provide your members with access to verified expertise and growth resources.',
      benefits: ['Member discounts', 'Co-branded resources', 'Revenue sharing', 'Priority support']
    },
    {
      icon: Users,
      title: 'Co-working Spaces',
      description: 'Enhance your community by connecting members with experts who can help them scale their businesses.',
      benefits: ['Exclusive workshops', 'Expert networking events', 'Member perks', 'Brand visibility']
    },
    {
      icon: Handshake,
      title: 'Business Associations',
      description: 'Strengthen your value proposition by offering members curated access to business expertise.',
      benefits: ['Custom programs', 'Educational content', 'Member benefits', 'Partnership marketing']
    },
    {
      icon: Globe,
      title: 'Regional Partners',
      description: 'Help us expand into new markets while providing local businesses with global expertise.',
      benefits: ['Territory exclusivity', 'Local marketing support', 'Revenue opportunities', 'Growth incentives']
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Revenue Sharing',
      description: 'Earn commission on successful referrals and ongoing partnerships with attractive revenue splits.'
    },
    {
      icon: Star,
      title: 'Exclusive Resources',
      description: 'Access to partner-only content, training materials, and marketing resources.'
    },
    {
      icon: Target,
      title: 'Co-Marketing',
      description: 'Joint marketing initiatives to promote both brands and maximize reach.'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Personal account manager and priority support for all partner needs.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Apply',
      description: 'Submit your partnership application with details about your organization and goals.'
    },
    {
      number: '02',
      title: 'Review',
      description: 'Our team reviews your application and schedules a partnership discussion call.'
    },
    {
      number: '03',
      title: 'Onboard',
      description: 'Complete the onboarding process and receive your partner resources and training.'
    },
    {
      number: '04',
      title: 'Launch',
      description: 'Start promoting Thethriv to your community and begin earning revenue.'
    }
  ];

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Handshake className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">Partner Page</span>
            </div>
            <h1 className="text-6xl font-bold text-slate-900 mb-8">
              Partner with Thethriv
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Join our partner network and help small businesses in your community access 
              world-class expertise while building a new revenue stream for your organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Who Can Partner With Us?
            </h2>
            <p className="text-xl text-slate-600">
              We work with organizations that support small business growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <partner.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{partner.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{partner.description}</p>
                <div className="space-y-3">
                  {partner.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Partnership Benefits
            </h2>
            <p className="text-xl text-slate-600">
              What you get when you partner with Thethriv
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
                className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple steps to become a Thethriv partner
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white text-2xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full">
                    <div className="flex justify-center">
                      <div className="w-16 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300"></div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-32 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              Partner Success Stories
            </h2>
            <p className="text-xl text-blue-100">
              See how our partners are making a difference
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                organization: "Downtown Business Chamber",
                location: "Austin, TX",
                result: "40% increase in member engagement",
                quote: "Thethriv has become one of our most valuable member benefits. The quality of experts and ease of connection has exceeded our expectations."
              },
              {
                organization: "TechHub Co-working",
                location: "Berlin, Germany",
                result: "€50k additional revenue in 6 months",
                quote: "Our members love having access to verified experts. It's helped us differentiate from other co-working spaces in the city."
              },
              {
                organization: "Regional SMB Association",
                location: "Melbourne, Australia",
                result: "200+ successful expert connections",
                quote: "The partnership with Thethriv has allowed us to offer world-class expertise to our regional members who previously had limited access."
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur rounded-3xl p-8"
              >
                <div className="text-2xl font-bold text-blue-200 mb-2">{story.result}</div>
                <div className="text-lg font-semibold mb-2">{story.organization}</div>
                <div className="text-blue-200 text-sm mb-6">{story.location}</div>
                <blockquote className="text-blue-50 italic leading-relaxed">
                  "{story.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-slate-900 mb-8">
              Ready to Partner?
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
              Join our growing network of partners and help small businesses in your 
              community access the expertise they need to thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
                Apply Now
              </button>
              <button className="inline-flex items-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnerProgram;