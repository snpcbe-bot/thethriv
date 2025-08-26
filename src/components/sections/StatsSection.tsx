import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
  number: string;
  label: string;
  gradient?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  description?: string;
  backgroundColor?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  title,
  description,
  backgroundColor = 'bg-white'
}) => {
  return (
    <section className={`py-20 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>}
            {description && <p className="text-xl text-gray-600">{description}</p>}
          </div>
        )}
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${
                  stat.gradient || 'from-blue-600 to-indigo-600'
                } rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                </div>
                <div className="text-lg font-bold text-gray-900 mb-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;