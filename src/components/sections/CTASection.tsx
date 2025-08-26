import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  note?: string;
  backgroundGradient?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  note,
  backgroundGradient = 'from-blue-600 to-indigo-600'
}) => {
  return (
    <section className={`py-32 bg-gradient-to-r ${backgroundGradient}`}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-white mb-8">
            {title}
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              icon={ArrowRight}
              className="bg-white text-blue-600 hover:bg-blue-50 border-white"
              onClick={primaryButton.onClick}
            >
              {primaryButton.text}
            </Button>
            
            {secondaryButton && (
              <Button 
                variant="ghost" 
                size="lg"
                className="text-white border-2 border-white/30 hover:bg-white/10 hover:border-white"
                onClick={secondaryButton.onClick}
              >
                {secondaryButton.text}
              </Button>
            )}
          </div>
          
          {note && (
            <div className="mt-6 text-blue-100">
              {note}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;