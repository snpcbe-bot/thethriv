import React from 'react';
import { motion } from 'framer-motion';
import ExpertCard from './ExpertCard';
import type { Expert } from '../../types/expert';

interface ExpertGridProps {
  experts: Expert[];
}

const ExpertGrid: React.FC<ExpertGridProps> = ({ experts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {experts.map((expert, index) => (
        <motion.div
          key={expert.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <ExpertCard expert={expert} />
        </motion.div>
      ))}
    </div>
  );
};

export default ExpertGrid;