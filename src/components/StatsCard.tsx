import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  number: string;
  label: string;
  index: number;
  gradient?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  number, 
  label, 
  index,
  gradient = "from-blue-600 to-indigo-600"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center group"
    >
      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        <div className="text-2xl font-bold text-white">{number}</div>
      </div>
      <div className="text-sm font-medium text-slate-600 uppercase tracking-wide">{label}</div>
    </motion.div>
  );
};

export default StatsCard;