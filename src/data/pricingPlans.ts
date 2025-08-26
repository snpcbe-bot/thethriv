export interface Plan {
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

export const businessPlans: Plan[] = [
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

export const expertPlans: Plan[] = [
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
    ctaText: 'Go Monthly',
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

export interface PromoAd {
  name: string;
  price: number;
  period: string;
  yearlyPrice: number;
  description: string;
  features: string[];
  ctaText: string;
  icon: React.ComponentType<any>;
}

export const promoPlans: PromoAd[] = [
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
    icon: require('lucide-react').Globe
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
    icon: require('lucide-react').Target
  }
];