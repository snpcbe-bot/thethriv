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
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Globe Base */}
        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-full shadow-lg relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full animate-pulse" />
          
          {/* Continents - Simplified shapes */}
          <div className="absolute inset-0">
            {/* North America */}
            <div className="absolute top-3 left-2 w-2 h-2 bg-green-400/80 rounded-sm transform rotate-12" />
            
            {/* Europe */}
            <div className="absolute top-2 left-1/2 w-1 h-1 bg-green-400/80 rounded-full" />
            
            {/* Asia */}
            <div className="absolute top-1 right-2 w-3 h-2 bg-green-400/80 rounded-sm transform -rotate-12" />
            
            {/* Africa */}
            <div className="absolute top-1/2 left-1/2 w-1.5 h-2 bg-green-400/80 rounded-sm transform -translate-x-1/2" />
            
            {/* South America */}
            <div className="absolute bottom-3 left-3 w-1 h-2 bg-green-400/80 rounded-sm" />
            
            {/* Australia */}
            <div className="absolute bottom-2 right-3 w-1 h-1 bg-green-400/80 rounded-full" />
          </div>
          
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {/* Latitude lines */}
            <div className="absolute top-1/4 left-0 right-0 h-px bg-white/20" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30" />
            <div className="absolute top-3/4 left-0 right-0 h-px bg-white/20" />
            
            {/* Longitude lines */}
            <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/20" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/30" />
            <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white/20" />
          </div>
          
          {/* Highlight */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm" />
        </div>
        
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md scale-110 animate-pulse" />
      </motion.div>
    </div>
  );
};

export default AnimatedGlobeLogo;