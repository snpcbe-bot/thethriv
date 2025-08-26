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
    <div className="bg-white rounded-3xl shadow-soft p-12 mb-8 border border-slate-200">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-section-title text-slate-900 mb-6">
          Find Your Perfect Expert
        </h1>
        <p className="text-large text-slate-600 max-w-2xl mx-auto">
          Connect with verified SEO experts and influencers from around the world
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-12">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, skills, or expertise..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full pl-16 pr-8 py-5 text-lg border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white"
          style={{ fontSize: '16px' }} // Prevent iOS zoom
        />
      </div>

      {/* Expert Type Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex bg-slate-100 rounded-2xl p-2 shadow-sm">
          <button
            onClick={() => onTypeChange(undefined)}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
              !activeType
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Experts
            <span className="ml-3 text-sm opacity-75 bg-slate-200 px-2 py-1 rounded-full">
              {expertCounts.all.toLocaleString()}
            </span>
          </button>
          <button
            onClick={() => onTypeChange('seo')}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
              activeType === 'seo'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SEO Experts
            <span className="ml-3 text-sm opacity-75 bg-slate-200 px-2 py-1 rounded-full">
              {expertCounts.seo.toLocaleString()}
            </span>
          </button>
          <button
            onClick={() => onTypeChange('influencer')}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
              activeType === 'influencer'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Influencers
            <span className="ml-3 text-sm opacity-75 bg-slate-200 px-2 py-1 rounded-full">
              {expertCounts.influencer.toLocaleString()}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;