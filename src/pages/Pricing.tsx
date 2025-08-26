import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Globe, Crown, Target } from 'lucide-react';
import PricingCard from '../components/PricingCard';

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('customers');

  const [activeTab, setActiveTab] = useState('business');

  const businessPlans = [
    {
      name: 'Free Plan',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '5 expert profiles per month',
        'Access to resources library',
        'Basic search filters',
        'Community support'
      ],
      highlighted: false,
      ctaText: 'Get Started Free',
      badge: null,
      popular: false
    },
    {
      name: 'Weekly Plan',
      price: 4,
      period: 'per week',
      description: 'For active searchers',
      features: [
        'Full access to all experts',
        '20 expert profiles',
        '20 direct connections',
        'Advanced search filters',
        'Basic analytics',
        'Email support'
      ],
      highlighted: false,
      ctaText: 'Start Weekly',
      badge: null,
      popular: false
    },
    {
      name: 'Monthly Plan',
      price: 10,
      originalPrice: 10,
      offerPrice: 7,
      period: 'per month',
      description: 'Most popular choice',
      features: [
        'Full access to all experts',
        '20 expert profiles',
        '20 direct connections',
        'Advanced analytics',
        'Priority support',
        'Expert recommendations'
      ],
      highlighted: true,
      ctaText: 'Start Monthly',
      badge: 'Most Popular',
      popular: true
    },
    {
      name: 'Yearly Plan',
      price: 90,
      originalPrice: 90,
      offerPrice: 63,
      period: 'per year',
      description: 'Best value for serious businesses',
      features: [
        'Unlimited expert profiles',
        'Unlimited connections',
        'Advanced analytics & insights',
        'Annual business consultation',
        'Premium support',
        'Early access to new features'
      ],
      highlighted: false,
      ctaText: 'Go Yearly',
      badge: 'Best Value',
      popular: false
    }
  ];

  const expertPlans = [
    {
      name: 'Free Plan',
      price: 0,
      period: 'forever',
      description: 'Start building your presence',
      features: [
        'Basic listing',
        'Verified badge',
        'Profile creation',
        'Basic messaging',
        'Community access'
      ],
      highlighted: false,
      ctaText: 'List for Free',
      badge: null,
      popular: false
    },
    {
      name: 'Monthly Plan',
      price: 10,
      originalPrice: 10,
      offerPrice: 7,
      period: 'per month',
      description: 'Enhanced visibility',
      features: [
        'Verified premium listing',
        'Premium placement',
        'Profile analytics',
        'Direct messaging',
        'Priority support',
        'Featured badge'
      ],
      highlighted: true,
      ctaText: 'Go Premium',
      badge: 'Most Popular',
      popular: true
    },
    {
      name: 'Yearly Plan',
      price: 90,
      originalPrice: 90,
      offerPrice: 63,
      period: 'per year',
      description: 'Maximum exposure',
      features: [
        'Premium listing benefits',
        'Advanced analytics',
        'Featured in newsletters',
        'Resource guide mentions',
        'Priority placement',
        'Dedicated account manager'
      ],
      highlighted: false,
      ctaText: 'Go Yearly',
      badge: 'Best Value',
      popular: false
    }
  ];

  const promoPlans = [
    {
      name: 'Global Promo Ad',
      price: 80,
      period: 'per month',
      yearlyPrice: 500,
      description: 'Maximum visibility worldwide',
      features: [
        'Featured across all regions',
        'Homepage placement',
        'Newsletter mentions',
        'Social media features',
        'Priority in all searches'
      ],
      ctaText: 'Get Global Exposure',
      icon: Globe
    },
    {
      name: 'Regional Promo Ad',
      price: 50,
      period: 'per month',
      yearlyPrice: 300,
      description: 'Targeted regional focus',
      features: [
        'Featured in selected regions',
        'Regional homepage placement',
        'Local newsletter mentions',
        'Geographic priority',
        'Regional social features'
      ],
      ctaText: 'Choose Regions',
      icon: Target
    }
  ];

  const currentPlans = activeTab === 'business' ? businessPlans : expertPlans;

  return (
    <div className="pt-32">
      {/* Header */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our core features.
          </p>
          
          {/* Tab Switcher */}
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl text-sm ml-auto mr-4 mb-8">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'business'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('business')}
            >
              Business
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'experts'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('experts')}
            >
              Experts
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {currentPlans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                originalPrice={plan.originalPrice}
                offerPrice={plan.offerPrice}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                highlighted={plan.highlighted}
                ctaText={plan.ctaText}
                badge={plan.badge}
                popular={plan.popular}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Ads Section - Only for Experts */}
      {activeTab === 'experts' && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Promotional Advertising
              </h2>
              <p className="text-xl text-slate-600 mb-4">
                Join thousands of {activeTab === 'business' ? 'businesses' : 'experts'} already using Thriv
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full">
                <Globe className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-sm font-semibold text-red-900">Only 2 slots available per region</span>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {promoPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl border-2 border-yellow-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-semibold">
                      <plan.icon className="w-4 h-4 mr-1" />
                      Premium Ad
                    </div>
                  </div>
                  
                  <div className="text-center mb-8 pt-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-slate-900 mb-2">
                        ${plan.price}
                      </div>
                      <div className="text-slate-500">/{plan.period}</div>
                      <div className="text-sm text-slate-600 mt-2">
                        or ${plan.yearlyPrice}/year (save ${(plan.price * 12) - plan.yearlyPrice})
                      </div>
                    </div>
                    <p className="text-slate-600">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full py-4 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                    {plan.ctaText}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Frequently asked questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                q: "What happens after September 2025?",
                a: "All free plans will transition to paid plans. You'll receive 30 days advance notice and can choose to upgrade or cancel."
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes, all plans can be cancelled anytime. No long-term commitments or cancellation fees."
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer full refunds within 30 days of purchase, no questions asked."
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees, ever. You only pay for your chosen plan."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                q: "Do you offer discounts for non-profits?",
                a: "Yes, we offer 50% discounts for registered non-profit organizations. Contact us for details."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 rounded-3xl p-8"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of {activeTab === 'business' ? 'businesses' : 'experts'} already using Thriv
            </p>
            <button className="inline-flex items-center justify-center px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Free Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;