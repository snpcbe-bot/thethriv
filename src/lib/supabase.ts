import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string
          role: 'business' | 'expert' | 'admin'
          avatar_url?: string
          location?: string
          verified: boolean
          online_status: boolean
          last_seen: string
          plan: 'free' | 'weekly' | 'monthly' | 'yearly'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          email: string
          role: 'business' | 'expert' | 'admin'
          avatar_url?: string
          location?: string
          verified?: boolean
          online_status?: boolean
          last_seen?: string
          plan?: 'free' | 'weekly' | 'monthly' | 'yearly'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          email?: string
          role?: 'business' | 'expert' | 'admin'
          avatar_url?: string
          location?: string
          verified?: boolean
          online_status?: boolean
          last_seen?: string
          plan?: 'free' | 'weekly' | 'monthly' | 'yearly'
          created_at?: string
          updated_at?: string
        }
      }
      business_profiles_new: {
        Row: {
          id: string
          user_id: string
          company_name: string
          industry?: string
          company_size?: string
          website?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          industry?: string
          company_size?: string
          website?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          industry?: string
          company_size?: string
          website?: string
          created_at?: string
          updated_at?: string
        }
      }
      expert_profiles: {
        Row: {
          id: string
          user_id: string
          skills: string[]
          portfolio_url?: string
          hourly_rate?: number
          bio?: string
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skills?: string[]
          portfolio_url?: string
          hourly_rate?: number
          bio?: string
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skills?: string[]
          portfolio_url?: string
          hourly_rate?: number
          bio?: string
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          business_user_id: string
          expert_user_id: string
          subject?: string
          status: 'active' | 'archived' | 'blocked'
          last_message_at: string
          created_at: string
        }
        Insert: {
          id?: string
          business_user_id: string
          expert_user_id: string
          subject?: string
          status?: 'active' | 'archived' | 'blocked'
          last_message_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          business_user_id?: string
          expert_user_id?: string
          subject?: string
          status?: 'active' | 'archived' | 'blocked'
          last_message_at?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          message_type: 'text' | 'file' | 'image' | 'system'
          reply_to_id?: string
          edited: boolean
          edited_at?: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          message_type?: 'text' | 'file' | 'image' | 'system'
          reply_to_id?: string
          edited?: boolean
          edited_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          message_type?: 'text' | 'file' | 'image' | 'system'
          reply_to_id?: string
          edited?: boolean
          edited_at?: string
          created_at?: string
        }
      }
      message_status: {
        Row: {
          id: string
          message_id: string
          user_id: string
          status: 'sent' | 'delivered' | 'read'
          timestamp: string
        }
        Insert: {
          id?: string
          message_id: string
          user_id: string
          status: 'sent' | 'delivered' | 'read'
          timestamp?: string
        }
        Update: {
          id?: string
          message_id?: string
          user_id?: string
          status?: 'sent' | 'delivered' | 'read'
          timestamp?: string
        }
      }
      connections: {
        Row: {
          id: string
          business_id: string
          expert_id: string
          status: 'pending' | 'accepted' | 'declined'
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          expert_id: string
          status?: 'pending' | 'accepted' | 'declined'
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          expert_id?: string
          status?: 'pending' | 'accepted' | 'declined'
          created_at?: string
        }
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: 'free' | 'weekly' | 'monthly' | 'yearly'
          status: 'active' | 'cancelled' | 'expired'
          current_period_start: string
          current_period_end?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan: 'free' | 'weekly' | 'monthly' | 'yearly'
          status?: 'active' | 'cancelled' | 'expired'
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: 'free' | 'weekly' | 'monthly' | 'yearly'
          status?: 'active' | 'cancelled' | 'expired'
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}