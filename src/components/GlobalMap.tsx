import React from 'react';
import { motion } from 'framer-motion';

const GlobalMap = () => {
  const launchRegions = [
    { name: 'USA', x: '20%', y: '40%', active: true },
    { name: 'Canada', x: '18%', y: '25%', active: true },
    { name: 'UK', x: '48%', y: '30%', active: true },
    { name: 'Germany', x: '52%', y: '32%', active: true },
    { name: 'France', x: '50%', y: '35%', active: true },
    { name: 'Spain', x: '48%', y: '42%', active: true },
    { name: 'Italy', x: '54%', y: '40%', active: true },
    { name: 'Australia', x: '85%', y: '75%', active: true },
    { name: 'New Zealand', x: '88%', y: '82%', active: true },
    { name: 'India', x: '72%', y: '50%', active: true },
  ];

  const futureRegions = [
    { name: 'Brazil', x: '32%', y: '65%', active: false },
    { name: 'Argentina', x: '30%', y: '75%', active: false },
    { name: 'Mexico', x: '15%', y: '50%', active: false },
    { name: 'Chile', x: '28%', y: '78%', active: false },
    { name: 'Singapore', x: '78%', y: '58%', active: false },
    { name: 'Vietnam', x: '75%', y: '52%', active: false },
    { name: 'Thailand', x: '73%', y: '54%', active: false },
    { name: 'Taiwan', x: '80%', y: '48%', active: false },
    { name: 'Cambodia', x: '74%', y: '55%', active: false },
    { name: 'China', x: '78%', y: '42%', active: false },
  ];

  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12 overflow-hidden">
      {/* World Map SVG */}
      <div className="relative h-96 bg-white rounded-2xl overflow-hidden shadow-inner">
        <svg className="w-full h-full" viewBox="0 0 100 60" fill="none">
          {/* World Map Continents */}
          {/* North America */}
          <path
            d="M8,15 Q12,12 18,15 Q22,18 25,22 Q20,25 15,28 Q10,25 8,20 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="0.2"
          />
          
          {/* South America */}
          <path
            d="M25,45 Q28,42 32,48 Q35,55 32,65 Q28,75 25,78 Q22,72 20,65 Q22,55 25,45 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="0.2"
          />
          
          {/* Europe */}
          <path
            d="M45,25 Q50,22 55,25 Q58,28 55,32 Q52,35 48,32 Q45,28 45,25 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="0.2"
          />
          
          {/* Africa */}
          <path
            d="M48,35 Q52,32 56,38 Q58,45 55,55 Q52,62 48,58 Q45,50 48,42 Q46,38 48,35 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="0.2"
          />
          
          {/* Asia */}
          <path
            d="M58,20 Q65,18 75,22 Q82,28 78,35 Q75,42 70,45 Q65,42 62,38 Q58,32 58,25 Q56,22 58,20 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="0.2"
          />
          
          {/* Australia */}
          <path
            d="M82,70 Q88,68 92,72 Q90,78 85,80 Q82,78 80,75 Q82,72 82,70 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="0.2"
          />
        </svg>
        
        {/* Launch Regions */}
        {launchRegions.map((region, index) => (
          <motion.div
            key={region.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: region.x, top: region.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300">
                <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-30"></div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white px-3 py-1 rounded-lg shadow-lg text-sm font-semibold text-gray-900 whitespace-nowrap border">
                  {region.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Future Regions */}
        {futureRegions.map((region, index) => (
          <motion.div
            key={region.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: region.x, top: region.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: (index + launchRegions.length) * 0.1, duration: 0.5, type: "spring" }}
          >
            <div className="relative">
              <div className="w-3 h-3 bg-gray-400 rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300">
                <div className="absolute inset-0 bg-gray-400 rounded-full animate-pulse opacity-40"></div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white px-3 py-1 rounded-lg shadow-lg text-sm font-semibold text-gray-600 whitespace-nowrap border">
                  {region.name}
                  <div className="text-xs text-gray-400">Coming Soon</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 flex flex-wrap gap-6 justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-blue-600 rounded-full shadow-sm"></div>
          <span className="font-semibold text-gray-700">Launch Regions</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-gray-400 rounded-full shadow-sm"></div>
          <span className="font-semibold text-gray-700">Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;