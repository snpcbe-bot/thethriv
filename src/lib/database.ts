import { supabase } from './supabase';
import type { 
  UserProfile, 
  BusinessProfile, 
  ExpertProfile, 
  Conversation, 
  Message, 
  Connection,
  Project,
  UserSubscription,
  SignUpData,
  ExpertSearchFilters,
  SearchResult
} from '../types';

// User Profile Operations
export const userProfileService = {
  async create(data: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
    return profile;
  },

  async getById(id: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    return data;
  },

  async getByUserId(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile by user_id:', error);
      return null;
    }
    return data;
  },

  async update(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return null;
    }
    return data;
  },

  async updateOnlineStatus(userId: string, online: boolean): Promise<void> {
    await supabase
      .from('user_profiles')
      .update({
        online_status: online,
        last_seen: new Date().toISOString()
      })
      .eq('user_id', userId);
  }
};

// Business Profile Operations
export const businessProfileService = {
  async create(data: Partial<BusinessProfile>): Promise<BusinessProfile | null> {
    const { data: profile, error } = await supabase
      .from('business_profiles_new')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error creating business profile:', error);
      return null;
    }
    return profile;
  },

  async getByUserId(userId: string): Promise<BusinessProfile | null> {
    const { data, error } = await supabase
      .from('business_profiles_new')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching business profile:', error);
      return null;
    }
    return data;
  },

  async update(id: string, updates: Partial<BusinessProfile>): Promise<BusinessProfile | null> {
    const { data, error } = await supabase
      .from('business_profiles_new')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating business profile:', error);
      return null;
    }
    return data;
  }
};

// Expert Profile Operations
export const expertProfileService = {
  async create(data: Partial<ExpertProfile>): Promise<ExpertProfile | null> {
    const { data: profile, error } = await supabase
      .from('expert_profiles')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error creating expert profile:', error);
      return null;
    }
    return profile;
  },

  async getByUserId(userId: string): Promise<ExpertProfile | null> {
    const { data, error } = await supabase
      .from('expert_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching expert profile:', error);
      return null;
    }
    return data;
  },

  async search(filters: ExpertSearchFilters, page = 1, limit = 20): Promise<SearchResult<ExpertProfile & { user_profile: UserProfile }>> {
    let query = supabase
      .from('expert_profiles')
      .select(`
        *,
        user_profile:user_profiles!expert_profiles_user_id_fkey(*)
      `);

    // Apply filters
    if (filters.skills && filters.skills.length > 0) {
      query = query.overlaps('skills', filters.skills);
    }

    if (filters.hourly_rate_min) {
      query = query.gte('hourly_rate', filters.hourly_rate_min);
    }

    if (filters.hourly_rate_max) {
      query = query.lte('hourly_rate', filters.hourly_rate_max);
    }

    if (filters.verified_only) {
      query = query.eq('verified', true);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error searching experts:', error);
      return { data: [], total: 0, page, limit };
    }

    return {
      data: data || [],
      total: count || 0,
      page,
      limit
    };
  },

  async update(id: string, updates: Partial<ExpertProfile>): Promise<ExpertProfile | null> {
    const { data, error } = await supabase
      .from('expert_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating expert profile:', error);
      return null;
    }
    return data;
  }
};

// Conversation Operations
export const conversationService = {
  async create(businessUserId: string, expertUserId: string, subject?: string): Promise<Conversation | null> {
    // Check if conversation already exists
    const { data: existing } = await supabase
      .from('conversations')
      .select('*')
      .eq('business_user_id', businessUserId)
      .eq('expert_user_id', expertUserId)
      .single();

    if (existing) return existing;

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        business_user_id: businessUserId,
        expert_user_id: expertUserId,
        subject,
        last_message_at: new Date().toISOString()
      })
      .select(`
        *,
        business_profile:user_profiles!conversations_business_user_id_fkey(*),
        expert_profile:user_profiles!conversations_expert_user_id_fkey(*)
      `)
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      return null;
    }
    return data;
  },

  async getByUserId(userId: string): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        business_profile:user_profiles!conversations_business_user_id_fkey(*),
        expert_profile:user_profiles!conversations_expert_user_id_fkey(*)
      `)
      .or(`business_user_id.eq.${userId},expert_user_id.eq.${userId}`)
      .order('last_message_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
    return data || [];
  },

  async updateLastMessage(conversationId: string): Promise<void> {
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conversationId);
  }
};

// Message Operations
export const messageService = {
  async create(conversationId: string, senderId: string, content: string, messageType: 'text' | 'file' | 'image' = 'text'): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        message_type: messageType
      })
      .select(`
        *,
        sender_profile:user_profiles!messages_sender_id_fkey(*)
      `)
      .single();

    if (error) {
      console.error('Error creating message:', error);
      return null;
    }

    // Update conversation last message time
    await conversationService.updateLastMessage(conversationId);

    return data;
  },

  async getByConversationId(conversationId: string, limit = 50, offset = 0): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender_profile:user_profiles!messages_sender_id_fkey(*)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
    return data || [];
  },

  async markAsRead(messageId: string, userId: string): Promise<void> {
    await supabase
      .from('message_status')
      .upsert({
        message_id: messageId,
        user_id: userId,
        status: 'read'
      }, {
        onConflict: 'message_id,user_id'
      });
  }
};

// Connection Operations
export const connectionService = {
  async create(businessId: string, expertId: string): Promise<Connection | null> {
    const { data, error } = await supabase
      .from('connections')
      .insert({
        business_id: businessId,
        expert_id: expertId,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating connection:', error);
      return null;
    }
    return data;
  },

  async getByUserId(userId: string): Promise<Connection[]> {
    // Get user's business or expert profile first
    const userProfile = await userProfileService.getByUserId(userId);
    if (!userProfile) return [];

    let query = supabase.from('connections').select('*');

    if (userProfile.role === 'business') {
      const businessProfile = await businessProfileService.getByUserId(userId);
      if (businessProfile) {
        query = query.eq('business_id', businessProfile.id);
      }
    } else if (userProfile.role === 'expert') {
      const expertProfile = await expertProfileService.getByUserId(userId);
      if (expertProfile) {
        query = query.eq('expert_id', expertProfile.id);
      }
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching connections:', error);
      return [];
    }
    return data || [];
  },

  async updateStatus(id: string, status: 'accepted' | 'declined'): Promise<Connection | null> {
    const { data, error } = await supabase
      .from('connections')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating connection status:', error);
      return null;
    }
    return data;
  }
};

// Project Operations
export const projectService = {
  async create(data: Partial<Project>): Promise<Project | null> {
    const { data: project, error } = await supabase
      .from('projects')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return null;
    }
    return project;
  },

  async getByBusinessId(businessId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    return data || [];
  },

  async getAll(limit = 20, offset = 0): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching all projects:', error);
      return [];
    }
    return data || [];
  }
};

// Subscription Operations
export const subscriptionService = {
  async create(data: Partial<UserSubscription>): Promise<UserSubscription | null> {
    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error creating subscription:', error);
      return null;
    }
    return subscription;
  },

  async getByUserId(userId: string): Promise<UserSubscription | null> {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }
    return data;
  },

  async update(id: string, updates: Partial<UserSubscription>): Promise<UserSubscription | null> {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating subscription:', error);
      return null;
    }
    return data;
  }
};