import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchHeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
  expertCounts: {
    all: number;
    seo: number;
    influencer: number;
  };
  activeType?: 'seo' | 'influencer';
  onTypeChange: (type?: 'seo' | 'influencer') => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  query,
  onQueryChange,
  expertCounts,
  activeType,
  onTypeChange
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Expert
        </h1>
        <p className="text-xl text-gray-600">
          Connect with verified SEO experts and influencers worldwide
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, skills, or expertise..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full pl-14 pr-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ fontSize: '16px' }} // Prevent iOS zoom
        />
      </div>

      {/* Expert Type Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => onTypeChange(undefined)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              !activeType
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Experts
            <span className="ml-2 text-sm opacity-75">
              ({expertCounts.all.toLocaleString()})
            </span>
          </button>
          <button
            onClick={() => onTypeChange('seo')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeType === 'seo'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            SEO Experts
            <span className="ml-2 text-sm opacity-75">
              ({expertCounts.seo.toLocaleString()})
            </span>
          </button>
          <button
            onClick={() => onTypeChange('influencer')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeType === 'influencer'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Influencers
            <span className="ml-2 text-sm opacity-75">
              ({expertCounts.influencer.toLocaleString()})
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;