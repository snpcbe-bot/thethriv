import React from 'react';
import PricingCard from '../PricingCard';

interface Plan {
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
}

interface PricingGridProps {
  plans: Plan[];
}

const PricingGrid: React.FC<PricingGridProps> = ({ plans }) => {
  return (
    <div className="grid lg:grid-cols-4 gap-4">
      {plans.map((plan, index) => (
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
  );
};

export default PricingGrid;