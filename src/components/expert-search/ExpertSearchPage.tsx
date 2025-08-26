import React from 'react';
import { motion } from 'framer-motion';
import { useExpertSearch } from '../../hooks/useExpertSearch';
import SearchHeader from './SearchHeader';
import FilterBar from './FilterBar';
import ExpertGrid from './ExpertGrid';
import Pagination from './Pagination';
import LoadingSkeleton from './LoadingSkeleton';

const ExpertSearchPage: React.FC = () => {
  const {
    experts,
    loading,
    total,
    page,
    totalPages,
    query,
    filters,
    availableFilters,
    error,
    updateQuery,
    updateFilters,
    clearFilters,
    setPage,
    hasActiveFilters
  } = useExpertSearch();

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <SearchHeader
          query={query}
          onQueryChange={updateQuery}
          expertCounts={availableFilters.expertCounts}
          activeType={filters.type}
          onTypeChange={(type) => updateFilters({ type })}
        />

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          availableFilters={availableFilters}
          onFiltersChange={updateFilters}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Results Section */}
        <div className="py-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? 'Searching...' : `${total.toLocaleString()} experts found`}
              </h2>
              {query && (
                <span className="text-gray-500">
                  for "{query}"
                </span>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={filters.sort}
                onChange={(e) => updateFilters({ sort: e.target.value as any })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="followers">Most Followers</option>
                <option value="experience">Most Experience</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700">Error: {error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && <LoadingSkeleton />}

          {/* Results Grid */}
          {!loading && !error && (
            <>
              {experts.length > 0 ? (
                <ExpertGrid experts={experts} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No experts found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or clearing some filters
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertSearchPage;