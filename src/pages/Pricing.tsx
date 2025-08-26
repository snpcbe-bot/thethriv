import React, { useState } from 'react';
import PricingToggle from '../components/pricing/PricingToggle';
import PricingGrid from '../components/pricing/PricingGrid';
import PromoAds from '../components/pricing/PromoAds';
import { businessPlans, expertPlans, promoPlans } from '../data/pricingPlans';

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('business');

  const currentPlans = activeTab === 'business' ? businessPlans : expertPlans;

  return (
    <div className="pt-32">
      {/* Tab Switcher at Very Top */}
      <section className="py-2 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-end">
            {/* Tab Switcher - Very Top Right */}
            <PricingToggle 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <PricingGrid plans={currentPlans} />
        </div>
      </section>

      {/* Promo Ads Section - Only for Experts */}
      {activeTab === 'experts' && (
        <PromoAds promoPlans={promoPlans} />
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="space-y-6">
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
                className="bg-slate-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-blue-100 mb-6">
              Join thousands of {activeTab === 'business' ? 'businesses' : 'experts'} already using Thriv
            </p>
            <button className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Free Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;