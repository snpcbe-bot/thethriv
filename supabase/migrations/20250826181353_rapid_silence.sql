/*
  # Create experts table for search system

  1. New Tables
    - `experts`
      - Basic information: name, email, phone, profile_image_url
      - Professional details: expert_type, bio, skills, years_experience
      - Location: city, country
      - Pricing: price_range, hourly_rate
      - Social proof: follower_count, engagement_rate, client_count
      - Platform URLs: website_url, linkedin_url, social_media_urls
      - Status: verified, active, languages, response_time_hours
      - Search: search_vector for full-text search
      - Metadata: import_batch_id, created_at, updated_at

  2. Security
    - Enable RLS on `experts` table
    - Add policy for public read access to active experts
    - Add policy for admin management

  3. Indexes
    - Full-text search index on search_vector
    - Indexes on commonly filtered fields
*/

CREATE TABLE IF NOT EXISTS experts (
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

-- Enable RLS
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view active experts"
  ON experts
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated users can manage experts"
  ON experts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Search Indexes
CREATE INDEX IF NOT EXISTS idx_experts_search 
  ON experts USING gin(search_vector);

CREATE INDEX IF NOT EXISTS idx_experts_type 
  ON experts (expert_type);

CREATE INDEX IF NOT EXISTS idx_experts_country 
  ON experts (country);

CREATE INDEX IF NOT EXISTS idx_experts_verified 
  ON experts (verified);

CREATE INDEX IF NOT EXISTS idx_experts_price 
  ON experts (price_range);

CREATE INDEX IF NOT EXISTS idx_experts_active 
  ON experts (active) WHERE active = true;

CREATE INDEX IF NOT EXISTS idx_experts_follower_count 
  ON experts (follower_count DESC);

-- Update search vector function
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

-- Trigger to update search vector
CREATE TRIGGER experts_search_vector_update
  BEFORE INSERT OR UPDATE ON experts
  FOR EACH ROW EXECUTE FUNCTION update_experts_search_vector();