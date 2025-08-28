/*
  # Complete Messaging System Implementation

  1. New Tables
    - `conversations` - Manages conversation threads between businesses and experts
    - `messages` - Stores individual messages with encryption support
    - `message_status` - Tracks read/delivery status
    - `user_profiles` - Enhanced user profiles for messaging
    
  2. Security
    - Enable RLS on all tables
    - Add policies for secure message access
    - Message encryption support
    
  3. Real-time Features
    - Supabase realtime subscriptions enabled
    - Presence tracking for online status
    
  4. Admin Features
    - Admin access policies for message monitoring
    - Audit logging for compliance
*/

-- Create enhanced user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('business', 'expert', 'admin')),
  avatar_url text,
  company_name text,
  expertise text[],
  location text,
  verified boolean DEFAULT false,
  online_status boolean DEFAULT false,
  last_seen timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expert_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'archived', 'blocked')),
  last_message_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(business_user_id, expert_user_id)
);

-- Create messages table with encryption support
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'image', 'system')),
  encrypted boolean DEFAULT false,
  encryption_key_id text,
  reply_to_id uuid REFERENCES messages(id),
  edited boolean DEFAULT false,
  edited_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create message status table for read receipts
CREATE TABLE IF NOT EXISTS message_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('sent', 'delivered', 'read')),
  timestamp timestamptz DEFAULT now(),
  UNIQUE(message_id, user_id)
);

-- Create message audit log for admin access
CREATE TABLE IF NOT EXISTS message_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES messages(id) ON DELETE SET NULL,
  conversation_id uuid REFERENCES conversations(id) ON DELETE SET NULL,
  action text NOT NULL CHECK (action IN ('created', 'edited', 'deleted', 'reported')),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_conversations_business_user ON conversations(business_user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_expert_user ON conversations(expert_user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message ON conversations(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_message_status_message ON message_status(message_id);
CREATE INDEX IF NOT EXISTS idx_message_status_user ON message_status(user_id);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for conversations
CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = business_user_id OR auth.uid() = expert_user_id);

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = business_user_id OR auth.uid() = expert_user_id);

CREATE POLICY "Users can update own conversations"
  ON conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = business_user_id OR auth.uid() = expert_user_id);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
      AND (c.business_user_id = auth.uid() OR c.expert_user_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
      AND (c.business_user_id = auth.uid() OR c.expert_user_id = auth.uid())
    )
  );

CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = sender_id);

-- RLS Policies for message_status
CREATE POLICY "Users can view message status for their messages"
  ON message_status FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM messages m
      JOIN conversations c ON c.id = m.conversation_id
      WHERE m.id = message_status.message_id
      AND (c.business_user_id = auth.uid() OR c.expert_user_id = auth.uid())
    )
  );

CREATE POLICY "Users can insert message status"
  ON message_status FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own message status"
  ON message_status FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin policies for audit log
CREATE POLICY "Admins can view all audit logs"
  ON message_audit_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can insert audit logs"
  ON message_audit_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updating timestamps
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update conversation last_message_at
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET last_message_at = NEW.created_at
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update conversation timestamp on new message
CREATE TRIGGER update_conversation_on_message
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION update_conversation_last_message();

-- Function to create audit log entries
CREATE OR REPLACE FUNCTION create_message_audit_log()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO message_audit_log (message_id, conversation_id, action, actor_id, metadata)
    VALUES (NEW.id, NEW.conversation_id, 'created', NEW.sender_id, '{}');
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO message_audit_log (message_id, conversation_id, action, actor_id, metadata)
    VALUES (NEW.id, NEW.conversation_id, 'edited', NEW.sender_id, jsonb_build_object('edited_at', NEW.edited_at));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO message_audit_log (message_id, conversation_id, action, actor_id, metadata)
    VALUES (OLD.id, OLD.conversation_id, 'deleted', auth.uid(), '{}');
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

-- Triggers for audit logging
CREATE TRIGGER message_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON messages
  FOR EACH ROW EXECUTE FUNCTION create_message_audit_log();

-- Enable realtime for tables
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE message_status;
ALTER PUBLICATION supabase_realtime ADD TABLE user_profiles;

-- Insert dummy data for testing
INSERT INTO user_profiles (user_id, full_name, email, role, company_name, location, verified) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Sarah Johnson', 'sarah@techstartup.com', 'business', 'TechStartup Inc', 'San Francisco, CA', true),
  ('00000000-0000-0000-0000-000000000002', 'Marcus Chen', 'marcus@seoexpert.com', 'expert', null, 'London, UK', true),
  ('00000000-0000-0000-0000-000000000003', 'Elena Rodriguez', 'elena@webdev.com', 'expert', null, 'Barcelona, Spain', true),
  ('00000000-0000-0000-0000-000000000004', 'Admin User', 'admin@thriv.com', 'admin', 'Thriv', 'Global', true);

-- Update expert profiles with expertise
UPDATE user_profiles SET expertise = ARRAY['SEO', 'Content Marketing', 'Analytics'] WHERE email = 'marcus@seoexpert.com';
UPDATE user_profiles SET expertise = ARRAY['Web Development', 'React', 'Node.js'] WHERE email = 'elena@webdev.com';

-- Create a test conversation
INSERT INTO conversations (business_user_id, expert_user_id, subject) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'SEO Consultation for TechStartup');

-- Insert test messages
INSERT INTO messages (conversation_id, sender_id, content) VALUES
  ((SELECT id FROM conversations LIMIT 1), '00000000-0000-0000-0000-000000000001', 'Hi Marcus, I found your profile and would love to discuss SEO strategies for our startup.'),
  ((SELECT id FROM conversations LIMIT 1), '00000000-0000-0000-0000-000000000002', 'Hello Sarah! I''d be happy to help. What''s your current website traffic situation?'),
  ((SELECT id FROM conversations LIMIT 1), '00000000-0000-0000-0000-000000000001', 'We''re getting about 1000 visitors per month, but our conversion rate is quite low.');