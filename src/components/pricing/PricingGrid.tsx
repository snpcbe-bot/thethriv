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
  const navigate = useNavigate();

  const handlePlanSelect = (plan: Plan) => {
    // Navigate to appropriate onboarding based on current page context
    const currentPath = window.location.pathname;
    const isExpertContext = currentPath.includes('expert') || currentPath.includes('join-expert');
    
    if (isExpertContext) {
      navigate('/onboarding/expert', { state: { selectedPlan: plan } });
    } else {
      navigate('/onboarding/business', { state: { selectedPlan: plan } });
    }
  };

  return (
    <div className="grid lg:grid-cols-4 gap-4">
      {plans.map((plan, index) => (
        <PricingCard
          key={plan.name}
          onSelect={() => handlePlanSelect(plan)}
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