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
      {/* World Map Container */}
      <div className="relative h-96 bg-white rounded-2xl overflow-hidden shadow-inner">
        {/* World Map SVG - Proper World Map */}
        <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* North America */}
          <path
            d="M50 150 C80 120, 120 130, 160 140 C200 150, 220 180, 210 220 C200 260, 180 280, 150 290 C120 300, 90 280, 70 250 C50 220, 45 180, 50 150 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Greenland */}
          <path
            d="M300 80 C320 75, 340 80, 350 100 C355 120, 345 140, 325 145 C305 150, 285 140, 280 120 C275 100, 285 85, 300 80 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* South America */}
          <path
            d="M200 320 C220 310, 240 320, 260 350 C280 380, 285 420, 275 460 C265 490, 245 500, 225 495 C205 490, 185 470, 180 440 C175 410, 180 380, 185 350 C190 330, 195 325, 200 320 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Europe */}
          <path
            d="M450 150 C470 145, 490 150, 510 155 C530 160, 550 170, 560 185 C570 200, 565 215, 550 220 C535 225, 520 220, 505 215 C490 210, 475 200, 465 185 C455 170, 450 160, 450 150 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Africa */}
          <path
            d="M480 240 C500 235, 520 240, 540 260 C560 280, 570 310, 565 340 C560 370, 550 400, 535 420 C520 440, 500 445, 480 440 C460 435, 445 420, 440 400 C435 380, 440 360, 445 340 C450 320, 460 300, 470 280 C475 260, 477 250, 480 240 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Asia */}
          <path
            d="M580 120 C620 115, 660 120, 700 130 C740 140, 780 155, 810 175 C840 195, 850 220, 845 245 C840 270, 825 285, 800 290 C775 295, 750 285, 725 275 C700 265, 675 250, 650 235 C625 220, 600 200, 585 180 C570 160, 575 140, 580 120 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Australia */}
          <path
            d="M820 360 C840 355, 860 360, 880 370 C900 380, 910 395, 905 410 C900 425, 885 435, 870 440 C855 445, 840 440, 825 435 C810 430, 800 420, 805 405 C810 390, 815 375, 820 360 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Russia/Northern Asia */}
          <path
            d="M580 80 C650 75, 720 80, 790 90 C860 100, 900 115, 920 135 C940 155, 935 175, 920 185 C905 195, 880 190, 855 185 C830 180, 805 170, 780 160 C755 150, 730 140, 705 130 C680 120, 655 110, 630 100 C605 90, 585 85, 580 80 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
        </svg>
        
        {/* Launch Regions Pins */}
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
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
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
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
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