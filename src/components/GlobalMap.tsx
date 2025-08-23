import React from 'react';
import { motion } from 'framer-motion';

const GlobalMap = () => {
  const launchRegions = [
    { name: 'North America', x: '25%', y: '35%', countries: ['USA', 'Canada'] },
    { name: 'Europe', x: '52%', y: '30%', countries: ['UK', 'Germany', 'France', 'Spain', 'Italy'] },
    { name: 'Oceania', x: '82%', y: '75%', countries: ['Australia', 'New Zealand'] },
    { name: 'Asia', x: '72%', y: '45%', countries: ['India'] },
  ];

  const comingSoon = [
    { name: 'South America', x: '32%', y: '70%' },
    { name: 'Southeast Asia', x: '78%', y: '55%' },
    { name: 'East Asia', x: '82%', y: '40%' },
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 overflow-hidden">
      {/* World Map Background */}
      <div className="relative h-96 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-2xl overflow-hidden">
        {/* Simplified world map visualization */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 60" fill="none">
            {/* Continents as simplified shapes */}
            <path
              d="M15,25 Q25,20 35,25 Q45,30 55,25 Q65,20 75,25 Q85,30 90,25"
              stroke="#3B82F6"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M20,40 Q30,35 40,40 Q50,45 60,40 Q70,35 80,40"
              stroke="#3B82F6"
              strokeWidth="1"
              fill="none"
            />
            <ellipse cx="25" cy="30" rx="8" ry="5" fill="#3B82F6" opacity="0.3" />
            <ellipse cx="52" cy="28" rx="12" ry="8" fill="#3B82F6" opacity="0.3" />
            <ellipse cx="72" cy="42" rx="6" ry="4" fill="#3B82F6" opacity="0.3" />
            <ellipse cx="82" cy="72" rx="5" ry="3" fill="#3B82F6" opacity="0.3" />
          </svg>
        </div>
        
        {/* Launch Regions */}
        {launchRegions.map((region, index) => (
          <motion.div
            key={region.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: region.x, top: region.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.3, duration: 0.6, type: "spring" }}
          >
            <div className="relative">
              <div className="w-6 h-6 bg-blue-600 rounded-full shadow-xl group-hover:scale-125 transition-transform duration-300">
                <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-30"></div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white px-4 py-2 rounded-xl shadow-lg text-sm font-semibold text-gray-900 whitespace-nowrap border">
                  {region.name}
                  <div className="text-xs text-gray-500 mt-1">
                    {region.countries.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Coming Soon Regions */}
        {comingSoon.map((region, index) => (
          <motion.div
            key={region.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: region.x, top: region.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: (index + launchRegions.length) * 0.3, duration: 0.6, type: "spring" }}
          >
            <div className="relative">
              <div className="w-5 h-5 bg-gray-400 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300">
                <div className="absolute inset-0 bg-gray-400 rounded-full animate-pulse opacity-40"></div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white px-4 py-2 rounded-xl shadow-lg text-sm font-semibold text-gray-600 whitespace-nowrap border">
                  {region.name}
                  <div className="text-xs text-gray-400 mt-1">Coming Soon</div>
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
          <div className="w-4 h-4 bg-gray-400 rounded-full shadow-sm"></div>
          <span className="font-semibold text-gray-700">Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;