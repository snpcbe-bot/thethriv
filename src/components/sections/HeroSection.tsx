import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  note?: string;
  backgroundGradient?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  badge,
  note,
  backgroundGradient = 'from-slate-50 to-blue-50'
}) => {
  return (
    <section className={`min-h-screen flex items-center bg-gradient-to-br ${backgroundGradient}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {badge && (
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur rounded-full">
                {badge.icon}
                <span className="text-sm font-medium text-gray-900">{badge.text}</span>
              </div>
            )}
            
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-none tracking-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-2xl text-gray-700 font-medium">
                {subtitle}
              </p>
            )}
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                {primaryButton.text}
              </Button>
              
              {secondaryButton && (
                <Button variant="outline" size="lg">
                  {secondaryButton.text}
                </Button>
              )}
            </div>
            
            {note && (
              <div className="text-sm text-gray-500">
                {note}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;