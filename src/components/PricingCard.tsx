import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  offerPrice?: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  badge?: string;
  popular?: boolean;
  index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  originalPrice,
  offerPrice,
  period,
  description,
  features,
  highlighted = false,
  ctaText,
  badge,
  popular = false,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative bg-white rounded-3xl p-8 transition-all duration-300 ${
        highlighted
          ? 'border-2 border-blue-500 shadow-xl scale-105 z-10'
          : 'border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-2'
      } flex flex-col h-full`}
    >
      {badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
            popular
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
          }`}>
            {popular && <Star className="w-4 h-4 mr-1" />}
            {!popular && <Crown className="w-4 h-4 mr-1" />}
            {badge}
          </div>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-3">{name}</h3>
        
        <div className="mb-4">
          {offerPrice ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-5xl font-bold text-slate-900">
                  ${offerPrice}
                </span>
                <span className="text-xl text-slate-400 line-through">
                  ${originalPrice}
                </span>
              </div>
              <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                Save ${(originalPrice || 0) - offerPrice}
              </div>
            </div>
          ) : (
            <div className="text-4xl font-bold text-slate-900">
              {price === 0 ? 'Free' : `$${price}`}
            </div>
          )}
          <div className="text-sm text-slate-500 mt-1">/{period}</div>
        </div>
        
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
            <span className="text-sm text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={onSelect}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
          highlighted
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
        } mt-auto`}
      >
        {ctaText}
      </button>
    </motion.div>
  );
};

export default PricingCard;