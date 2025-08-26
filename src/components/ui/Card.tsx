import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  gradient = false,
  padding = 'md'
}) => {
  const baseClasses = 'bg-white rounded-3xl shadow-sm border border-gray-100';
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-2 transition-all duration-300' : '';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : '';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${paddingClasses[padding]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;