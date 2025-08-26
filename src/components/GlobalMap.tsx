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
        <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none">
          {/* North America */}
          <path
            d="M50,150 Q80,120 120,130 Q160,140 200,160 Q220,180 210,220 Q190,250 170,280 Q140,300 110,290 Q80,270 60,240 Q40,200 50,150 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          
          {/* South America */}
          <path
            d="M180,320 Q200,300 220,320 Q240,350 250,400 Q260,450 250,480 Q230,500 210,490 Q190,470 180,440 Q170,400 175,360 Q175,340 180,320 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          
          {/* Europe */}
          <path
            d="M450,120 Q480,110 520,120 Q550,130 570,150 Q580,170 570,190 Q550,210 520,200 Q490,190 470,170 Q450,150 450,120 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          
          {/* Africa */}
          <path
            d="M480,220 Q520,210 560,230 Q580,260 570,300 Q560,340 550,380 Q540,420 520,440 Q500,450 480,440 Q460,420 450,380 Q440,340 450,300 Q460,260 480,220 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          
          {/* Asia */}
          <path
            d="M580,100 Q620,90 680,100 Q740,110 800,130 Q820,150 810,180 Q800,210 780,240 Q750,260 720,250 Q690,240 660,220 Q630,200 610,170 Q590,140 580,100 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          
          {/* Australia */}
          <path
            d="M820,350 Q860,340 900,350 Q920,370 910,390 Q900,410 880,420 Q860,425 840,420 Q820,410 815,390 Q815,370 820,350 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          
          {/* Greenland */}
          <path
            d="M350,50 Q380,40 400,50 Q420,60 415,80 Q410,100 390,110 Q370,115 350,110 Q330,100 325,80 Q325,60 350,50 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          
          {/* Antarctica */}
          <path
            d="M100,450 Q300,440 500,445 Q700,450 900,455 Q900,480 700,485 Q500,490 300,485 Q100,480 100,450 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="2"
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