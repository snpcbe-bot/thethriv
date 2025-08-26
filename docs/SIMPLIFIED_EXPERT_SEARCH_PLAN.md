# Simplified Expert Search Implementation Plan

## Overview
Build a simple, fast, and robust expert search system for 1000+ profiles (500 SEO experts + 500 influencers). Focus on core functionality that works reliably across all devices.

## Phase 1: Database & Core Structure

### Database Schema
Create a single `experts` table with comprehensive fields:

```sql
CREATE TABLE experts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Information
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  profile_image_url text,
  
  -- Professional Details
  expert_type text NOT NULL CHECK (expert_type IN ('seo', 'influencer')),
  bio text,
  skills text[] DEFAULT '{}',
  years_experience integer DEFAULT 0,
  
  -- Location
  city text,
  country text NOT NULL,
  
  -- Pricing
  price_range text CHECK (price_range IN ('budget', 'mid', 'premium')),
  hourly_rate numeric(10,2),
  
  -- Social Proof
  follower_count integer DEFAULT 0,
  engagement_rate numeric(5,2) DEFAULT 0,
  client_count integer DEFAULT 0,
  
  -- Platform URLs
  website_url text,
  linkedin_url text,
  social_media_urls jsonb DEFAULT '{}',
  
  -- Status & Metadata
  verified boolean DEFAULT false,
  active boolean DEFAULT true,
  languages text[] DEFAULT '{"English"}',
  response_time_hours integer DEFAULT 24,
  
  -- Search & Tracking
  search_vector tsvector,
  import_batch_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Search Indexes
CREATE INDEX idx_experts_search ON experts USING gin(search_vector);
CREATE INDEX idx_experts_type ON experts (expert_type);
CREATE INDEX idx_experts_country ON experts (country);
CREATE INDEX idx_experts_verified ON experts (verified);
CREATE INDEX idx_experts_price ON experts (price_range);
CREATE INDEX idx_experts_active ON experts (active) WHERE active = true;

-- Update search vector trigger
CREATE OR REPLACE FUNCTION update_experts_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    COALESCE(NEW.name, '') || ' ' ||
    COALESCE(NEW.bio, '') || ' ' ||
    COALESCE(array_to_string(NEW.skills, ' '), '')
  );
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER experts_search_vector_update
  BEFORE INSERT OR UPDATE ON experts
  FOR EACH ROW EXECUTE FUNCTION update_experts_search_vector();
```

## Phase 2: Backend API Implementation

### Search Service
```typescript
// src/services/expertSearchService.ts
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
  };
}

class ExpertSearchService {
  async search(query: ExpertSearchQuery): Promise<ExpertSearchResult> {
    // Implementation with PostgreSQL full-text search
  }
  
  async getFilterOptions(): Promise<FilterOptions> {
    // Get available filter values
  }
  
  async importExperts(data: ExpertImportData[]): Promise<ImportResult> {
    // Bulk import functionality
  }
}
```

### API Endpoint
```typescript
// /api/experts/search
export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams);
  
  const result = await expertSearchService.search(query);
  return Response.json(result);
}
```

## Phase 3: Frontend Components

### Component Structure
```
src/components/expert-search/
├── ExpertSearchPage.tsx          # Main container
├── SearchHeader.tsx              # Search input + tabs
├── FilterBar.tsx                 # Horizontal filters
├── ExpertGrid.tsx                # Results grid/list
├── ExpertCard.tsx                # Individual expert card
├── Pagination.tsx                # Pagination controls
└── hooks/
    ├── useExpertSearch.ts        # Search state management
    └── useDebounce.ts            # Debounced search
```

### Main Search Page
```typescript
// src/components/expert-search/ExpertSearchPage.tsx
const ExpertSearchPage = () => {
  const {
    experts,
    loading,
    total,
    filters,
    searchQuery,
    updateSearch,
    updateFilters,
    clearFilters,
    setPage
  } = useExpertSearch();

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHeader 
        query={searchQuery}
        onSearch={updateSearch}
        expertCounts={filters.expertCounts}
      />
      
      <FilterBar 
        filters={filters}
        onFiltersChange={updateFilters}
        onClear={clearFilters}
      />
      
      <ExpertGrid 
        experts={experts}
        loading={loading}
        viewMode="grid" // or "list"
      />
      
      <Pagination 
        current={filters.page}
        total={Math.ceil(total / 20)}
        onChange={setPage}
      />
    </div>
  );
};
```

### Search Hook
```typescript
// src/hooks/useExpertSearch.ts
export const useExpertSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    experts: [],
    loading: false,
    total: 0,
    query: '',
    filters: defaultFilters,
    page: 1
  });

  const debouncedSearch = useDebounce(searchState.query, 300);

  const search = useCallback(async () => {
    setSearchState(prev => ({ ...prev, loading: true }));
    
    try {
      const result = await expertSearchService.search({
        q: debouncedSearch,
        ...searchState.filters,
        page: searchState.page
      });
      
      setSearchState(prev => ({
        ...prev,
        experts: result.experts,
        total: result.total,
        loading: false
      }));
    } catch (error) {
      setSearchState(prev => ({ ...prev, loading: false }));
    }
  }, [debouncedSearch, searchState.filters, searchState.page]);

  useEffect(() => {
    search();
  }, [search]);

  return {
    ...searchState,
    updateSearch: (query: string) => 
      setSearchState(prev => ({ ...prev, query, page: 1 })),
    updateFilters: (filters: Partial<SearchFilters>) =>
      setSearchState(prev => ({ 
        ...prev, 
        filters: { ...prev.filters, ...filters },
        page: 1 
      })),
    clearFilters: () =>
      setSearchState(prev => ({ 
        ...prev, 
        filters: defaultFilters,
        page: 1 
      })),
    setPage: (page: number) =>
      setSearchState(prev => ({ ...prev, page }))
  };
};
```

### Expert Card Component
```typescript
// src/components/expert-search/ExpertCard.tsx
const ExpertCard = ({ expert }: { expert: Expert }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      {/* Profile Image */}
      <div className="flex items-start space-x-4 mb-4">
        <img 
          src={expert.profile_image_url || '/default-avatar.png'}
          alt={expert.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-lg">{expert.name}</h3>
            {expert.verified && (
              <Badge variant="success">Verified</Badge>
            )}
          </div>
          <p className="text-gray-600">{expert.city}, {expert.country}</p>
          <div className="flex items-center space-x-2 mt-1">
            <PriceIndicator range={expert.price_range} />
            <span className="text-sm text-gray-500">
              {expert.expert_type === 'seo' ? 'SEO Expert' : 'Influencer'}
            </span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {expert.skills.slice(0, 3).map(skill => (
            <Badge key={skill} variant="secondary" size="sm">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        {expert.expert_type === 'influencer' ? (
          <>
            <div>
              <span className="text-gray-500">Followers</span>
              <div className="font-semibold">{formatNumber(expert.follower_count)}</div>
            </div>
            <div>
              <span className="text-gray-500">Engagement</span>
              <div className="font-semibold">{expert.engagement_rate}%</div>
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="text-gray-500">Experience</span>
              <div className="font-semibold">{expert.years_experience} years</div>
            </div>
            <div>
              <span className="text-gray-500">Clients</span>
              <div className="font-semibold">{expert.client_count}</div>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <Button variant="outline" size="sm" className="flex-1">
          View Profile
        </Button>
        <Button variant="primary" size="sm" className="flex-1">
          Contact
        </Button>
      </div>
    </div>
  );
};
```

## Phase 4: Mobile Optimization

### Responsive Design
- Grid: 3 cols desktop → 2 cols tablet → 1 col mobile
- Touch targets: minimum 44x44px
- Font size: 16px+ for inputs (prevents iOS zoom)
- Pull-to-refresh on mobile

### Performance Features
- Lazy loading for images
- Virtual scrolling for large result sets
- 5-minute client-side caching
- Loading skeletons
- Debounced search (300ms)

## Phase 5: Data Import & Management

### Import Function
```typescript
// src/services/expertImportService.ts
export interface ImportResult {
  imported: number;
  skipped: number;
  errors: string[];
  batchId: string;
}

class ExpertImportService {
  async importFromCSV(file: File): Promise<ImportResult> {
    // Parse CSV and validate
    // Skip duplicates by email
    // Bulk insert with batch tracking
  }
  
  async importFromJSON(data: ExpertData[]): Promise<ImportResult> {
    // Validate and import JSON data
  }
}
```

## Implementation Priority

### Week 1: Core Foundation
1. Database schema and indexes
2. Basic search service
3. API endpoint
4. Simple frontend structure

### Week 2: Search & Filters
1. Full-text search implementation
2. Filter functionality
3. Sorting options
4. Pagination

### Week 3: UI Polish
1. Expert cards design
2. Mobile responsiveness
3. Loading states
4. Error handling

### Week 4: Import & Launch
1. Data import functionality
2. Performance optimization
3. Testing with real data
4. Launch preparation

## Success Metrics
- Search response time < 300ms
- Mobile page load < 2 seconds
- 95%+ uptime
- Zero critical bugs in first week

## Key Principles
1. **Simple First**: Core functionality before advanced features
2. **Performance**: Fast search and smooth mobile experience
3. **Reliability**: Robust error handling and graceful degradation
4. **Scalable**: Architecture that can grow with more experts

This plan focuses on delivering a solid, working system that can be enhanced iteratively based on user feedback.