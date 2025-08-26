import { useState, useEffect, useCallback } from 'react';
import { expertSearchService } from '../services/expertSearchService';
import type { Expert, ExpertSearchQuery, ExpertSearchResult } from '../types/expert';

interface SearchState {
  experts: Expert[];
  loading: boolean;
  total: number;
  page: number;
  totalPages: number;
  query: string;
  filters: {
    type?: 'seo' | 'influencer';
    country?: string;
    city?: string;
    price?: 'budget' | 'mid' | 'premium';
    verified?: boolean;
    min_followers?: number;
    languages?: string[];
    sort: 'relevance' | 'price_asc' | 'price_desc' | 'followers' | 'experience' | 'newest';
  };
  availableFilters: {
    countries: string[];
    cities: string[];
    priceRanges: string[];
    languages: string[];
    expertCounts: {
      all: number;
      seo: number;
      influencer: number;
    };
  };
  error: string | null;
}

const defaultFilters = {
  sort: 'relevance' as const
};

const defaultAvailableFilters = {
  countries: [],
  cities: [],
  priceRanges: [],
  languages: [],
  expertCounts: { all: 0, seo: 0, influencer: 0 }
};

export const useExpertSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    experts: [],
    loading: false,
    total: 0,
    page: 1,
    totalPages: 0,
    query: '',
    filters: defaultFilters,
    availableFilters: defaultAvailableFilters,
    error: null
  });

  // Debounce search query
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchState.query);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchState.query]);

  const search = useCallback(async () => {
    setSearchState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const searchQuery: ExpertSearchQuery = {
        q: debouncedQuery,
        ...searchState.filters,
        page: searchState.page,
        limit: 20
      };

      const result = await expertSearchService.search(searchQuery);

      setSearchState(prev => ({
        ...prev,
        experts: result.experts,
        total: result.total,
        totalPages: result.totalPages,
        availableFilters: result.filters,
        loading: false
      }));
    } catch (error: any) {
      setSearchState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Search failed'
      }));
    }
  }, [debouncedQuery, searchState.filters, searchState.page]);

  useEffect(() => {
    search();
  }, [search]);

  const updateQuery = useCallback((query: string) => {
    setSearchState(prev => ({ ...prev, query, page: 1 }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<SearchState['filters']>) => {
    setSearchState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters },
      page: 1
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      filters: defaultFilters,
      page: 1
    }));
  }, []);

  const setPage = useCallback((page: number) => {
    setSearchState(prev => ({ ...prev, page }));
  }, []);

  const hasActiveFilters = useCallback(() => {
    const { sort, ...otherFilters } = searchState.filters;
    return Object.values(otherFilters).some(value => 
      value !== undefined && value !== null && 
      (Array.isArray(value) ? value.length > 0 : true)
    );
  }, [searchState.filters]);

  return {
    experts: searchState.experts,
    loading: searchState.loading,
    total: searchState.total,
    page: searchState.page,
    totalPages: searchState.totalPages,
    query: searchState.query,
    filters: searchState.filters,
    availableFilters: searchState.availableFilters,
    error: searchState.error,
    updateQuery,
    updateFilters,
    clearFilters,
    setPage,
    hasActiveFilters: hasActiveFilters(),
    refresh: search
  };
};