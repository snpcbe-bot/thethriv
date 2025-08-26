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
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center space-x-4 flex-wrap gap-4">
        {/* Filter Icon */}
        <div className="flex items-center space-x-2 text-gray-700">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters:</span>
        </div>

        {/* Country Filter */}
        <select
          value={filters.country || ''}
          onChange={(e) => onFiltersChange({ 
            country: e.target.value || undefined,
            city: undefined // Clear city when country changes
          })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Countries</option>
          {availableFilters.countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {/* City Filter - only show if country is selected */}
        {filters.country && (
          <select
            value={filters.city || ''}
            onChange={(e) => onFiltersChange({ city: e.target.value || undefined })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Cities</option>
            {availableFilters.cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        )}

        {/* Price Range Filter */}
        <select
          value={filters.price || ''}
          onChange={(e) => onFiltersChange({ price: e.target.value || undefined })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Prices</option>
          {availableFilters.priceRanges.map(range => (
            <option key={range} value={range}>
              {priceLabels[range as keyof typeof priceLabels] || range}
            </option>
          ))}
        </select>

        {/* Verified Filter */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.verified || false}
            onChange={(e) => onFiltersChange({ verified: e.target.checked || undefined })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">Verified only</span>
        </label>

        {/* Minimum Followers Filter */}
        <select
          value={filters.min_followers || ''}
          onChange={(e) => onFiltersChange({ 
            min_followers: e.target.value ? parseInt(e.target.value) : undefined 
          })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Any Followers</option>
          <option value="1000">1K+ Followers</option>
          <option value="10000">10K+ Followers</option>
          <option value="100000">100K+ Followers</option>
          <option value="1000000">1M+ Followers</option>
        </select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClearFilters}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear Filters</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;