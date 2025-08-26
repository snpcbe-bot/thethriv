import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGlobeLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AnimatedGlobeLogo: React.FC<AnimatedGlobeLogoProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Globe Base */}
        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-full shadow-lg relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full" />
          
          {/* Continents - More realistic shapes */}
          <div className="absolute inset-0">
            {/* North America */}
            <div className="absolute top-2 left-1.5 w-2.5 h-2 bg-emerald-400/70 rounded-sm transform rotate-12" />
            
            {/* Europe */}
            <div className="absolute top-1.5 left-1/2 w-1.5 h-1 bg-emerald-400/70 rounded-sm transform -translate-x-1/2" />
            
            {/* Asia */}
            <div className="absolute top-1 right-1.5 w-3 h-2.5 bg-emerald-400/70 rounded-sm transform -rotate-6" />
            
            {/* Africa */}
            <div className="absolute top-1/2 left-1/2 w-1.5 h-2.5 bg-emerald-400/70 rounded-sm transform -translate-x-1/2 -translate-y-1/2" />
            
            {/* South America */}
            <div className="absolute bottom-2.5 left-2.5 w-1 h-2.5 bg-emerald-400/70 rounded-sm transform rotate-12" />
            
            {/* Australia */}
            <div className="absolute bottom-2 right-2.5 w-1.5 h-1 bg-emerald-400/70 rounded-sm" />
          </div>
          
          {/* Subtle grid lines */}
          <div className="absolute inset-0 opacity-30">
            {/* Latitude lines */}
            <div className="absolute top-1/4 left-0 right-0 h-px bg-white/40" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/50" />
            <div className="absolute top-3/4 left-0 right-0 h-px bg-white/40" />
            
            {/* Longitude lines */}
            <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/40" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/50" />
            <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white/40" />
          </div>
          
          {/* Professional highlight */}
          <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-white/40 rounded-full blur-sm" />
        </div>
        
        {/* Subtle outer glow */}
        <motion.div 
          className="absolute inset-0 bg-blue-400/10 rounded-full blur-lg scale-125"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedGlobeLogo;