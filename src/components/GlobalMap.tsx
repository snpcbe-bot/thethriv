import React from 'react';
import { motion } from 'framer-motion';

const GlobalMap = () => {
  const launchRegions = [
    { name: 'USA', x: '20%', y: '45%', active: true },
    { name: 'Canada', x: '18%', y: '30%', active: true },
    { name: 'UK', x: '48%', y: '35%', active: true },
    { name: 'Germany', x: '52%', y: '38%', active: true },
    { name: 'France', x: '50%', y: '42%', active: true },
    { name: 'Spain', x: '48%', y: '48%', active: true },
    { name: 'Italy', x: '54%', y: '46%', active: true },
    { name: 'Australia', x: '85%', y: '75%', active: true },
    { name: 'New Zealand', x: '88%', y: '82%', active: true },
    { name: 'India', x: '72%', y: '55%', active: true },
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
      {/* World Map Container */}
      <div className="relative h-96 bg-white rounded-2xl overflow-hidden shadow-inner">
        {/* Real World Map SVG */}
        <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* North America */}
          <path
            d="M50 200 L80 180 L120 170 L160 175 L200 180 L220 200 L240 220 L230 250 L210 280 L180 300 L150 310 L120 305 L90 290 L70 270 L50 240 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Greenland */}
          <path
            d="M280 100 L320 95 L350 105 L360 130 L355 155 L340 170 L315 175 L290 170 L275 150 L270 125 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* South America */}
          <path
            d="M200 320 L220 315 L240 325 L260 340 L280 370 L290 400 L295 430 L290 460 L280 485 L260 495 L240 490 L220 480 L200 460 L185 430 L180 400 L185 370 L190 340 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Europe */}
          <path
            d="M450 180 L480 175 L510 180 L540 185 L560 195 L570 210 L565 225 L550 235 L530 240 L510 235 L490 230 L470 220 L455 205 L445 190 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Africa */}
          <path
            d="M480 250 L510 245 L540 255 L560 270 L575 295 L580 325 L575 355 L570 385 L560 410 L545 430 L525 445 L505 450 L485 445 L470 430 L460 410 L455 385 L460 355 L465 325 L470 295 L475 270 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Asia */}
          <path
            d="M580 150 L620 145 L660 150 L700 160 L740 175 L780 190 L810 210 L830 235 L840 260 L835 285 L820 305 L800 320 L775 330 L750 325 L725 315 L700 300 L675 285 L650 270 L625 250 L600 230 L585 210 L575 185 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Australia */}
          <path
            d="M820 370 L850 365 L880 375 L900 390 L910 410 L905 430 L890 445 L870 450 L850 445 L830 435 L815 420 L810 400 L815 385 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Russia/Northern Asia */}
          <path
            d="M580 100 L650 95 L720 100 L790 110 L860 125 L900 140 L920 160 L925 180 L915 195 L895 205 L870 210 L845 205 L820 195 L795 185 L770 175 L745 165 L720 155 L695 145 L670 135 L645 125 L620 115 L595 105 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
        </svg>
        
        {/* Launch Regions Pins */}
        {launchRegions.map((region, index) => (
          <motion.div
            key={region.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
            style={{ left: region.x, top: region.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300">
                <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-30"></div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="bg-white px-3 py-1 rounded-lg shadow-lg text-sm font-semibold text-gray-900 whitespace-nowrap border">
                  {region.name}
                  <div className="text-xs text-green-600">Active</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Future Regions Pins */}
        {futureRegions.map((region, index) => (
          <motion.div
            key={region.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
            style={{ left: region.x, top: region.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: (index + launchRegions.length) * 0.1, duration: 0.5, type: "spring" }}
          >
            <div className="relative">
              <div className="w-3 h-3 bg-gray-400 rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300">
                <div className="absolute inset-0 bg-gray-400 rounded-full animate-pulse opacity-40"></div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
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