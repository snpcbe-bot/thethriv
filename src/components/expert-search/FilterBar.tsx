import React from 'react';
import { X, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface FilterBarProps {
  filters: {
    country?: string;
    city?: string;
    price?: 'budget' | 'mid' | 'premium';
    verified?: boolean;
    min_followers?: number;
    languages?: string[];
  };
  availableFilters: {
    countries: string[];
    cities: string[];
    priceRanges: string[];
    languages: string[];
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  availableFilters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters
}) => {
  const priceLabels = {
    budget: '$ Budget',
    mid: '$$ Mid-range',
    premium: '$$$ Premium'
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 border border-slate-200">
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Filter Label */}
        <div className="flex items-center space-x-3 text-slate-700">
          <Filter className="w-5 h-5" />
          <span className="font-semibold">Filters:</span>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 flex-1">
          {/* Country Filter */}
          <select
            value={filters.country || ''}
            onChange={(e) => onFiltersChange({ 
              country: e.target.value || undefined,
              city: undefined // Clear city when country changes
            })}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm min-w-[140px]"
          >
            <option value="">All Countries</option>
            {availableFilters.countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          {/* City Filter - only show if country is selected */}
          {filters.country && availableFilters.cities.length > 0 && (
            <motion.select
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              value={filters.city || ''}
              onChange={(e) => onFiltersChange({ city: e.target.value || undefined })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm min-w-[120px]"
            >
              <option value="">All Cities</option>
              {availableFilters.cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </motion.select>
          )}

          {/* Price Range Filter */}
          <select
            value={filters.price || ''}
            onChange={(e) => onFiltersChange({ price: e.target.value || undefined })}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm min-w-[130px]"
          >
            <option value="">All Prices</option>
            {availableFilters.priceRanges.map(range => (
              <option key={range} value={range}>
                {priceLabels[range as keyof typeof priceLabels] || range}
              </option>
            ))}
          </select>

          {/* Verified Filter */}
          <label className="flex items-center space-x-3 cursor-pointer bg-slate-50 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
            <input
              type="checkbox"
              checked={filters.verified || false}
              onChange={(e) => onFiltersChange({ verified: e.target.checked || undefined })}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <span className="text-slate-700 font-medium whitespace-nowrap">Verified only</span>
          </label>

          {/* Minimum Followers Filter */}
          <select
            value={filters.min_followers || ''}
            onChange={(e) => onFiltersChange({ 
              min_followers: e.target.value ? parseInt(e.target.value) : undefined 
            })}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm min-w-[140px]"
          >
            <option value="">Any Followers</option>
            <option value="1000">1K+ Followers</option>
            <option value="10000">10K+ Followers</option>
            <option value="100000">100K+ Followers</option>
            <option value="1000000">1M+ Followers</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClearFilters}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 bg-red-50/50"
          >
            <X className="w-4 h-4" />
            <span className="font-medium">Clear Filters</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;