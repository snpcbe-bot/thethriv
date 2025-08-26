// Expert-specific types for the search system

export interface Expert {
  id: string;
  
  // Basic Information
  name: string;
  email: string;
  phone?: string;
  profile_image_url?: string;
  
  // Professional Details
  expert_type: 'seo' | 'influencer';
  bio?: string;
  skills: string[];
  years_experience: number;
  
  // Location
  city?: string;
  country: string;
  
  // Pricing
  price_range?: 'budget' | 'mid' | 'premium';
  hourly_rate?: number;
  
  // Social Proof
  follower_count: number;
  engagement_rate: number;
  client_count: number;
  
  // Platform URLs
  website_url?: string;
  linkedin_url?: string;
  social_media_urls: Record<string, string>;
  
  // Status & Metadata
  verified: boolean;
  active: boolean;
  languages: string[];
  response_time_hours: number;
  
  // Metadata
  import_batch_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpertSearchQuery {
  q?: string;                    // Text search
  type?: 'seo' | 'influencer';  // Expert type
  country?: string;              // Location filter
  city?: string;
  price?: 'budget' | 'mid' | 'premium';
  verified?: boolean;
  min_followers?: number;
  languages?: string[];
  sort?: 'relevance' | 'price_asc' | 'price_desc' | 'followers' | 'experience' | 'newest';
  page?: number;
  limit?: number;
}

export interface ExpertSearchResult {
  experts: Expert[];
  total: number;
  page: number;
  totalPages: number;
  filters: {
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
}

export interface ExpertImportData {
  name: string;
  email: string;
  phone?: string;
  expert_type: 'seo' | 'influencer';
  bio?: string;
  skills?: string[];
  years_experience?: number;
  city?: string;
  country: string;
  price_range?: 'budget' | 'mid' | 'premium';
  hourly_rate?: number;
  follower_count?: number;
  engagement_rate?: number;
  client_count?: number;
  website_url?: string;
  linkedin_url?: string;
  social_media_urls?: Record<string, string>;
  verified?: boolean;
  languages?: string[];
  response_time_hours?: number;
}

export interface ImportResult {
  imported: number;
  skipped: number;
  errors: string[];
  batchId: string;
}