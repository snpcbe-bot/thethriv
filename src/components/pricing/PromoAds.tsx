import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Target, Star } from 'lucide-react';

interface PromoAd {
  name: string;
  price: number;
  period: string;
  yearlyPrice: number;
  description: string;
  features: string[];
  ctaText: string;
  icon: React.ComponentType<any>;
}

interface PromoAdsProps {
  promoPlans: PromoAd[];
}

const PromoAds: React.FC<PromoAdsProps> = ({ promoPlans }) => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Promotional Advertising
          </h2>
          <p className="text-lg text-slate-600 mb-4">
            Boost your visibility with premium advertising
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
  );
};

export default PromoAds;