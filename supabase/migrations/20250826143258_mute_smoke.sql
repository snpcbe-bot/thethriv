/*
  # User Authentication & Subscription System

  1. New Tables
    - `user_subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `plan` (text) - free, weekly, monthly, yearly
      - `status` (text) - active, cancelled, expired
      - `current_period_start` (timestamptz)
      - `current_period_end` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `expert_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `skills` (text[])
      - `portfolio_url` (text)
      - `hourly_rate` (decimal)
      - `bio` (text)
      - `verified` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `business_profiles`
      - `id` (uuid, primary key) 
      - `user_id` (uuid, references auth.users)
      - `company_name` (text)
      - `industry` (text)
      - `company_size` (text)
      - `website` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `connections`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references business_profiles)
      - `expert_id` (uuid, references expert_profiles)
      - `status` (text) - pending, accepted, declined
      - `created_at` (timestamptz)
    
    - `messages`
      - `id` (uuid, primary key)
      - `connection_id` (uuid, references connections)
      - `sender_id` (uuid, references auth.users)
      - `content` (text)
      - `read` (boolean)
      - `created_at` (timestamptz)
    
    - `projects`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references business_profiles)
      - `title` (text)
      - `description` (text)
      - `budget_min` (decimal)
      - `budget_max` (decimal)
      - `deadline` (date)
      - `status` (text) - open, in_progress, completed
      - `created_at` (timestamptz)
    
    - `ad_campaigns`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `type` (text) - dashboard, regional, global
      - `title` (text)
      - `content` (text)
      - `budget` (decimal)
      - `start_date` (date)
      - `end_date` (date)
      - `status` (text) - draft, active, paused, completed
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for user access control
    - Role-based access policies
*/

-- User Subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  plan text NOT NULL CHECK (plan IN ('free', 'weekly', 'monthly', 'yearly')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON user_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON user_subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Expert Profiles
CREATE TABLE IF NOT EXISTS expert_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  skills text[],
  portfolio_url text,
  hourly_rate decimal(10,2),
  bio text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE expert_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Expert profiles are viewable by everyone"
  ON expert_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own expert profile"
  ON expert_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expert profile"
  ON expert_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Business Profiles
CREATE TABLE IF NOT EXISTS business_profiles_new (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text,
  industry text,
  company_size text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE business_profiles_new ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business profiles are viewable by everyone"
  ON business_profiles_new
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own business profile"
  ON business_profiles_new
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own business profile"
  ON business_profiles_new
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Connections
CREATE TABLE IF NOT EXISTS connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES business_profiles_new(id) ON DELETE CASCADE,
  expert_id uuid REFERENCES expert_profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view connections they're part of"
  ON connections
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles_new bp WHERE bp.id = business_id AND bp.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM expert_profiles ep WHERE ep.id = expert_id AND ep.user_id = auth.uid()
    )
  );

CREATE POLICY "Business users can create connections"
  ON connections
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM business_profiles_new bp WHERE bp.id = business_id AND bp.user_id = auth.uid()
    )
  );

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id uuid REFERENCES connections(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their connections"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM connections c
      JOIN business_profiles_new bp ON c.business_id = bp.id
      JOIN expert_profiles ep ON c.expert_id = ep.id
      WHERE c.id = connection_id 
      AND (bp.user_id = auth.uid() OR ep.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their connections"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM connections c
      JOIN business_profiles_new bp ON c.business_id = bp.id
      JOIN expert_profiles ep ON c.expert_id = ep.id
      WHERE c.id = connection_id 
      AND (bp.user_id = auth.uid() OR ep.user_id = auth.uid())
    )
  );

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES business_profiles_new(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  budget_min decimal(10,2),
  budget_max decimal(10,2),
  deadline date,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Business users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM business_profiles_new bp WHERE bp.id = business_id AND bp.user_id = auth.uid()
    )
  );

CREATE POLICY "Business users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles_new bp WHERE bp.id = business_id AND bp.user_id = auth.uid()
    )
  );

-- Ad Campaigns
CREATE TABLE IF NOT EXISTS ad_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('dashboard', 'regional', 'global')),
  title text NOT NULL,
  content text,
  budget decimal(10,2),
  start_date date,
  end_date date,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ad campaigns"
  ON ad_campaigns
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create ad campaigns"
  ON ad_campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ad campaigns"
  ON ad_campaigns
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_expert_profiles_user_id ON expert_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_business_profiles_user_id ON business_profiles_new(user_id);
CREATE INDEX IF NOT EXISTS idx_connections_business_id ON connections(business_id);
CREATE INDEX IF NOT EXISTS idx_connections_expert_id ON connections(expert_id);
CREATE INDEX IF NOT EXISTS idx_messages_connection_id ON messages(connection_id);
CREATE INDEX IF NOT EXISTS idx_projects_business_id ON projects(business_id);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_user_id ON ad_campaigns(user_id);

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create user subscription with free plan
  INSERT INTO user_subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active');
  
  -- Create appropriate profile based on user metadata
  IF NEW.raw_user_meta_data->>'role' = 'expert' THEN
    INSERT INTO expert_profiles (user_id, bio, skills)
    VALUES (
      NEW.id, 
      'New expert on Thethriv',
      ARRAY[NEW.raw_user_meta_data->>'expertise']
    );
  ELSIF NEW.raw_user_meta_data->>'role' = 'business' THEN
    INSERT INTO business_profiles_new (user_id, company_name)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'company_name'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();