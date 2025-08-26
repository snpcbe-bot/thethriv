// Core user types
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: 'business' | 'expert' | 'admin';
  avatar_url?: string;
  location?: string;
  verified: boolean;
  online_status: boolean;
  last_seen: string;
  plan: 'free' | 'weekly' | 'monthly' | 'yearly';
  created_at: string;
  updated_at: string;
}

export interface BusinessProfile {
  id: string;
  user_id: string;
  company_name: string;
  industry?: string;
  company_size?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpertProfile {
  id: string;
  user_id: string;
  skills: string[];
  portfolio_url?: string;
  hourly_rate?: number;
  bio?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

// Messaging types
export interface Conversation {
  id: string;
  business_user_id: string;
  expert_user_id: string;
  subject?: string;
  status: 'active' | 'archived' | 'blocked';
  last_message_at: string;
  created_at: string;
  business_profile?: UserProfile;
  expert_profile?: UserProfile;
  unread_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'file' | 'image' | 'system';
  reply_to_id?: string;
  edited: boolean;
  edited_at?: string;
  created_at: string;
  sender_profile?: UserProfile;
  read_by?: string[];
}

export interface MessageStatus {
  id: string;
  message_id: string;
  user_id: string;
  status: 'sent' | 'delivered' | 'read';
  timestamp: string;
}

// Connection types
export interface Connection {
  id: string;
  business_id: string;
  expert_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

// Project types
export interface Project {
  id: string;
  business_id: string;
  title: string;
  description?: string;
  budget_min?: number;
  budget_max?: number;
  deadline?: string;
  status: 'open' | 'in_progress' | 'completed';
  created_at: string;
}

// Subscription types
export interface UserSubscription {
  id: string;
  user_id: string;
  plan: 'free' | 'weekly' | 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'expired';
  current_period_start: string;
  current_period_end?: string;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  role: 'business' | 'expert';
  plan: 'free' | 'weekly' | 'monthly' | 'yearly';
  company_name?: string;
  expertise?: string;
  location: string;
  industry?: string;
  company_size?: string;
  website?: string;
  bio?: string;
  hourly_rate?: number;
  portfolio_url?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Search and filter types
export interface ExpertSearchFilters {
  query?: string;
  skills?: string[];
  location?: string;
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  verified_only?: boolean;
}

export interface SearchResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}