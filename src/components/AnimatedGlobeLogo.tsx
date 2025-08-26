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
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Wireframe Globe Container */}
        <div className="w-full h-full relative">
          {/* Main Globe Circle */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-slate-300"
            animate={{ 
              borderColor: ['#cbd5e1', '#3b82f6', '#6366f1', '#8b5cf6', '#cbd5e1']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Latitude Lines */}
          <div className="absolute inset-0">
            {/* Equator */}
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-0.5 rounded-full transform -translate-y-px"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #3b82f6 20%, #6366f1 50%, #8b5cf6 80%, transparent 100%)'
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Upper latitude */}
            <motion.div 
              className="absolute top-1/4 left-1/8 right-1/8 h-0.5 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #64748b 50%, transparent 100%)',
                transform: 'perspective(100px) rotateX(60deg)'
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Lower latitude */}
            <motion.div 
              className="absolute bottom-1/4 left-1/8 right-1/8 h-0.5 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #64748b 50%, transparent 100%)',
                transform: 'perspective(100px) rotateX(-60deg)'
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
          
          {/* Longitude Lines */}
          <div className="absolute inset-0">
            {/* Central meridian */}
            <motion.div 
              className="absolute top-0 bottom-0 left-1/2 w-0.5 rounded-full transform -translate-x-px"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, #3b82f6 20%, #6366f1 50%, #8b5cf6 80%, transparent 100%)'
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Side meridians */}
            <motion.div 
              className="absolute top-1/8 bottom-1/8 left-1/4 w-0.5 rounded-full"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, #64748b 50%, transparent 100%)',
                transform: 'perspective(100px) rotateY(45deg)'
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            <motion.div 
              className="absolute top-1/8 bottom-1/8 right-1/4 w-0.5 rounded-full"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, #64748b 50%, transparent 100%)',
                transform: 'perspective(100px) rotateY(-45deg)'
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
          </div>
          
          {/* Orbital Rings */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-blue-400/30"
            style={{ transform: 'rotateX(75deg) scale(1.1)' }}
            animate={{
              rotateZ: 360
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div 
            className="absolute inset-0 rounded-full border border-purple-400/20"
            style={{ transform: 'rotateY(75deg) scale(1.05)' }}
            animate={{
              rotateZ: -360
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Soft Glow Effect */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'
            }}
            animate={{
              background: [
                'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Connection Points */}
          <motion.div 
            className="absolute top-1/4 left-1/3 w-1 h-1 bg-blue-500 rounded-full shadow-sm"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full shadow-sm"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-indigo-500 rounded-full shadow-sm transform -translate-x-1/2"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        {/* Outer Glow */}
        <motion.div 
          className="absolute inset-0 rounded-full blur-md scale-150 opacity-20"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedGlobeLogo;