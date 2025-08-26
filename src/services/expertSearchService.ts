import { supabase } from '../lib/supabase';
import type { Expert, ExpertSearchQuery, ExpertSearchResult, ExpertImportData, ImportResult } from '../types/expert';

export class ExpertSearchService {
  async search(query: ExpertSearchQuery): Promise<ExpertSearchResult> {
    try {
      const {
        q,
        type,
        country,
        city,
        price,
        verified,
        min_followers,
        languages,
        sort = 'relevance',
        page = 1,
        limit = 20
      } = query;

      let supabaseQuery = supabase
        .from('experts')
        .select('*', { count: 'exact' })
        .eq('active', true);

      // Text search
      if (q && q.trim()) {
        supabaseQuery = supabaseQuery.textSearch('search_vector', q.trim());
      }

      // Type filter
      if (type) {
        supabaseQuery = supabaseQuery.eq('expert_type', type);
      }

      // Location filters
      if (country) {
        supabaseQuery = supabaseQuery.eq('country', country);
      }
      if (city) {
        supabaseQuery = supabaseQuery.eq('city', city);
      }

      // Price filter
      if (price) {
        supabaseQuery = supabaseQuery.eq('price_range', price);
      }

      // Verified filter
      if (verified !== undefined) {
        supabaseQuery = supabaseQuery.eq('verified', verified);
      }

      // Minimum followers filter
      if (min_followers && min_followers > 0) {
        supabaseQuery = supabaseQuery.gte('follower_count', min_followers);
      }

      // Languages filter
      if (languages && languages.length > 0) {
        supabaseQuery = supabaseQuery.overlaps('languages', languages);
      }

      // Sorting
      switch (sort) {
        case 'price_asc':
          supabaseQuery = supabaseQuery.order('hourly_rate', { ascending: true, nullsLast: true });
          break;
        case 'price_desc':
          supabaseQuery = supabaseQuery.order('hourly_rate', { ascending: false, nullsFirst: true });
          break;
        case 'followers':
          supabaseQuery = supabaseQuery.order('follower_count', { ascending: false });
          break;
        case 'experience':
          supabaseQuery = supabaseQuery.order('years_experience', { ascending: false });
          break;
        case 'newest':
          supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
          break;
        case 'relevance':
        default:
          if (q && q.trim()) {
            // For text search, PostgreSQL handles relevance ranking
            supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
          } else {
            // Default sort: verified first, then by follower count
            supabaseQuery = supabaseQuery
              .order('verified', { ascending: false })
              .order('follower_count', { ascending: false });
          }
          break;
      }

      // Pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      supabaseQuery = supabaseQuery.range(from, to);

      const { data: experts, error, count } = await supabaseQuery;

      if (error) {
        console.error('Search error:', error);
        throw error;
      }

      // Get filter options
      const filters = await this.getFilterOptions();

      return {
        experts: experts || [],
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit),
        filters
      };
    } catch (error) {
      console.error('Expert search error:', error);
      return {
        experts: [],
        total: 0,
        page: 1,
        totalPages: 0,
        filters: {
          countries: [],
          cities: [],
          priceRanges: [],
          languages: [],
          expertCounts: { all: 0, seo: 0, influencer: 0 }
        }
      };
    }
  }

  async getFilterOptions() {
    try {
      // Get unique countries
      const { data: countryData } = await supabase
        .from('experts')
        .select('country')
        .eq('active', true)
        .not('country', 'is', null);

      // Get unique cities
      const { data: cityData } = await supabase
        .from('experts')
        .select('city')
        .eq('active', true)
        .not('city', 'is', null);

      // Get price ranges
      const { data: priceData } = await supabase
        .from('experts')
        .select('price_range')
        .eq('active', true)
        .not('price_range', 'is', null);

      // Get languages
      const { data: languageData } = await supabase
        .from('experts')
        .select('languages')
        .eq('active', true);

      // Get expert counts
      const { data: countData } = await supabase
        .from('experts')
        .select('expert_type')
        .eq('active', true);

      const countries = [...new Set(countryData?.map(item => item.country) || [])].sort();
      const cities = [...new Set(cityData?.map(item => item.city) || [])].sort();
      const priceRanges = [...new Set(priceData?.map(item => item.price_range) || [])];
      
      // Flatten languages arrays and get unique values
      const allLanguages = languageData?.flatMap(item => item.languages || []) || [];
      const languages = [...new Set(allLanguages)].sort();

      // Count experts by type
      const expertCounts = {
        all: countData?.length || 0,
        seo: countData?.filter(item => item.expert_type === 'seo').length || 0,
        influencer: countData?.filter(item => item.expert_type === 'influencer').length || 0
      };

      return {
        countries,
        cities,
        priceRanges,
        languages,
        expertCounts
      };
    } catch (error) {
      console.error('Error getting filter options:', error);
      return {
        countries: [],
        cities: [],
        priceRanges: [],
        languages: [],
        expertCounts: { all: 0, seo: 0, influencer: 0 }
      };
    }
  }

  async importExperts(data: ExpertImportData[], batchId?: string): Promise<ImportResult> {
    const result: ImportResult = {
      imported: 0,
      skipped: 0,
      errors: [],
      batchId: batchId || `import_${Date.now()}`
    };

    try {
      for (const expertData of data) {
        try {
          // Check if expert already exists by email
          const { data: existing } = await supabase
            .from('experts')
            .select('id')
            .eq('email', expertData.email)
            .single();

          if (existing) {
            result.skipped++;
            continue;
          }

          // Insert new expert
          const { error } = await supabase
            .from('experts')
            .insert({
              ...expertData,
              import_batch_id: result.batchId,
              skills: expertData.skills || [],
              social_media_urls: expertData.social_media_urls || {},
              languages: expertData.languages || ['English'],
              years_experience: expertData.years_experience || 0,
              follower_count: expertData.follower_count || 0,
              engagement_rate: expertData.engagement_rate || 0,
              client_count: expertData.client_count || 0,
              response_time_hours: expertData.response_time_hours || 24,
              verified: expertData.verified || false
            });

          if (error) {
            result.errors.push(`${expertData.email}: ${error.message}`);
          } else {
            result.imported++;
          }
        } catch (error: any) {
          result.errors.push(`${expertData.email}: ${error.message}`);
        }
      }
    } catch (error: any) {
      result.errors.push(`Import failed: ${error.message}`);
    }

    return result;
  }

  async getExpertById(id: string): Promise<Expert | null> {
    try {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .eq('id', id)
        .eq('active', true)
        .single();

      if (error) {
        console.error('Error fetching expert:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching expert:', error);
      return null;
    }
  }
}

export const expertSearchService = new ExpertSearchService();