import React from 'react';

interface PricingToggleProps {
  activeTab: 'business' | 'experts';
  onTabChange: (tab: 'business' | 'experts') => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg text-xs">
      <button
        className={`px-2 py-1 rounded-md font-medium transition-all duration-200 ${
          activeTab === 'business'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        onClick={() => onTabChange('business')}
      >
        Business
      </button>
      <button
        className={`px-2 py-1 rounded-md font-medium transition-all duration-200 ${
          activeTab === 'experts'
            ? 'bg-white text-purple-600 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        onClick={() => onTabChange('experts')}
      >
        Experts
      </button>
    </div>
  );
};

export default PricingToggle;