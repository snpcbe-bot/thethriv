import { supabase } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: 'business' | 'expert' | 'admin';
  avatar_url?: string;
  company_name?: string;
  expertise?: string[];
  location?: string;
  verified: boolean;
  online_status: boolean;
  last_seen: string;
}

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

class MessagingService {
  private channels: Map<string, RealtimeChannel> = new Map();

  // Get current user profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  }

  // Get all conversations for current user
  async getConversations(): Promise<Conversation[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        business_profile:user_profiles!conversations_business_user_id_fkey(*),
        expert_profile:user_profiles!conversations_expert_user_id_fkey(*)
      `)
      .or(`business_user_id.eq.${user.id},expert_user_id.eq.${user.id}`)
      .order('last_message_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }

    // Calculate unread count for each conversation
    const conversationsWithUnread = await Promise.all(
      data.map(async (conv) => {
        const unreadCount = await this.getUnreadMessageCount(conv.id);
        return { ...conv, unread_count: unreadCount };
      })
    );

    return conversationsWithUnread;
  }

  // Get messages for a conversation
  async getMessages(conversationId: string, limit = 50, offset = 0): Promise<Message[]> {
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

    // Get read status for each message
    const messagesWithReadStatus = await Promise.all(
      data.map(async (message) => {
        const readBy = await this.getMessageReadBy(message.id);
        return { ...message, read_by: readBy };
      })
    );

    return messagesWithReadStatus;
  }

  // Send a message
  async sendMessage(conversationId: string, content: string, messageType: 'text' | 'file' | 'image' = 'text'): Promise<Message | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content,
        message_type: messageType
      })
      .select(`
        *,
        sender_profile:user_profiles!messages_sender_id_fkey(*)
      `)
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return null;
    }

    // Mark as delivered for sender
    await this.updateMessageStatus(data.id, user.id, 'delivered');

    return data;
  }

  // Create or get conversation between business and expert
  async createOrGetConversation(businessUserId: string, expertUserId: string, subject?: string): Promise<Conversation | null> {
    // First try to get existing conversation
    const { data: existing } = await supabase
      .from('conversations')
      .select(`
        *,
        business_profile:user_profiles!conversations_business_user_id_fkey(*),
        expert_profile:user_profiles!conversations_expert_user_id_fkey(*)
      `)
      .eq('business_user_id', businessUserId)
      .eq('expert_user_id', expertUserId)
      .single();

    if (existing) return existing;

    // Create new conversation
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        business_user_id: businessUserId,
        expert_user_id: expertUserId,
        subject
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
  }

  // Mark message as read
  async markMessageAsRead(messageId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await this.updateMessageStatus(messageId, user.id, 'read');
  }

  // Mark all messages in conversation as read
  async markConversationAsRead(conversationId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: messages } = await supabase
      .from('messages')
      .select('id')
      .eq('conversation_id', conversationId)
      .neq('sender_id', user.id);

    if (messages) {
      await Promise.all(
        messages.map(msg => this.updateMessageStatus(msg.id, user.id, 'read'))
      );
    }
  }

  // Update message status
  private async updateMessageStatus(messageId: string, userId: string, status: 'sent' | 'delivered' | 'read'): Promise<void> {
    await supabase
      .from('message_status')
      .upsert({
        message_id: messageId,
        user_id: userId,
        status
      }, {
        onConflict: 'message_id,user_id'
      });
  }

  // Get unread message count for conversation
  private async getUnreadMessageCount(conversationId: string): Promise<number> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { count } = await supabase
      .from('messages')
      .select('id', { count: 'exact' })
      .eq('conversation_id', conversationId)
      .neq('sender_id', user.id)
      .not('id', 'in', `(
        SELECT message_id FROM message_status 
        WHERE user_id = '${user.id}' AND status = 'read'
      )`);

    return count || 0;
  }

  // Get users who have read a message
  private async getMessageReadBy(messageId: string): Promise<string[]> {
    const { data } = await supabase
      .from('message_status')
      .select('user_id')
      .eq('message_id', messageId)
      .eq('status', 'read');

    return data?.map(status => status.user_id) || [];
  }

  // Subscribe to conversation updates
  subscribeToConversation(conversationId: string, onMessage: (message: Message) => void, onStatusUpdate: (status: MessageStatus) => void): () => void {
    const channelName = `conversation:${conversationId}`;
    
    if (this.channels.has(channelName)) {
      this.channels.get(channelName)?.unsubscribe();
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        async (payload) => {
          // Fetch complete message with sender profile
          const { data } = await supabase
            .from('messages')
            .select(`
              *,
              sender_profile:user_profiles!messages_sender_id_fkey(*)
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            onMessage(data);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message_status'
        },
        (payload) => {
          onStatusUpdate(payload.new as MessageStatus);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  // Subscribe to conversations list updates
  subscribeToConversations(onUpdate: () => void): () => void {
    const channel = supabase
      .channel('conversations-list')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations'
        },
        onUpdate
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        onUpdate
      )
      .subscribe();

    return () => channel.unsubscribe();
  }

  // Update user online status
  async updateOnlineStatus(online: boolean): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('user_profiles')
      .update({
        online_status: online,
        last_seen: new Date().toISOString()
      })
      .eq('user_id', user.id);
  }

  // Search users (for admin or finding experts/businesses)
  async searchUsers(query: string, role?: 'business' | 'expert'): Promise<UserProfile[]> {
    let queryBuilder = supabase
      .from('user_profiles')
      .select('*')
      .or(`full_name.ilike.%${query}%,email.ilike.%${query}%,company_name.ilike.%${query}%`);

    if (role) {
      queryBuilder = queryBuilder.eq('role', role);
    }

    const { data, error } = await queryBuilder.limit(20);

    if (error) {
      console.error('Error searching users:', error);
      return [];
    }

    return data || [];
  }

  // Admin: Get all conversations (for monitoring)
  async getAllConversationsForAdmin(): Promise<Conversation[]> {
    const profile = await this.getCurrentUserProfile();
    if (!profile || profile.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        business_profile:user_profiles!conversations_business_user_id_fkey(*),
        expert_profile:user_profiles!conversations_expert_user_id_fkey(*)
      `)
      .order('last_message_at', { ascending: false });

    if (error) {
      console.error('Error fetching all conversations:', error);
      return [];
    }

    return data;
  }

  // Admin: Get message audit logs
  async getMessageAuditLogs(limit = 100): Promise<any[]> {
    const profile = await this.getCurrentUserProfile();
    if (!profile || profile.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    const { data, error } = await supabase
      .from('message_audit_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }

    return data;
  }
}

export const messagingService = new MessagingService();