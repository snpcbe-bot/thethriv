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
    <div className="min-h-screen bg-slate-50 pt-32">
      <div className="container-width">
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
        <div className="py-12">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-slate-900">
                {loading ? 'Searching...' : `${total.toLocaleString()} experts found`}
              </h2>
              {query && (
                <span className="text-slate-500">
                  for "{query}"
                </span>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-slate-700 whitespace-nowrap">Sort by:</label>
              <select
                value={filters.sort}
                onChange={(e) => updateFilters({ sort: e.target.value as any })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
            >
              <p className="text-red-700 font-medium">Error: {error}</p>
            </motion.div>
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
                  className="text-center py-20"
                >
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">No experts found</h3>
                  <p className="text-large text-slate-600 mb-8 max-w-md mx-auto">
                    Try adjusting your search criteria or clearing some filters to see more results
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="btn-primary"
                    >
                      Clear All Filters
                    </button>
                  )}
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertSearchPage;