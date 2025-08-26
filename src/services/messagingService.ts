import { supabase } from '../lib/supabase'
import { userService } from './userService'
import type { Conversation, Message, MessageStatus } from '../types'

export class MessagingService {
  // Get current user profile
  async getCurrentUserProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    return await userService.getByUserId(user.id)
  }

  // Get all conversations for current user
  async getConversations(): Promise<Conversation[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          business_profile:user_profiles!conversations_business_user_id_fkey(*),
          expert_profile:user_profiles!conversations_expert_user_id_fkey(*)
        `)
        .or(`business_user_id.eq.${user.id},expert_user_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false })

      if (error) {
        console.error('Error fetching conversations:', error)
        return []
      }

      // Calculate unread count for each conversation
      const conversationsWithUnread = await Promise.all(
        (data || []).map(async (conv) => {
          const unreadCount = await this.getUnreadMessageCount(conv.id)
          return { ...conv, unread_count: unreadCount }
        })
      )

      return conversationsWithUnread
    } catch (error) {
      console.error('Error fetching conversations:', error)
      return []
    }
  }

  // Get messages for a conversation
  async getMessages(conversationId: string, limit = 50, offset = 0): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender_profile:user_profiles!messages_sender_id_fkey(*)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error fetching messages:', error)
        return []
      }

      // Get read status for each message
      const messagesWithReadStatus = await Promise.all(
        (data || []).map(async (message) => {
          const readBy = await this.getMessageReadBy(message.id)
          return { ...message, read_by: readBy }
        })
      )

      return messagesWithReadStatus
    } catch (error) {
      console.error('Error fetching messages:', error)
      return []
    }
  }

  // Send a message
  async sendMessage(conversationId: string, content: string, messageType: 'text' | 'file' | 'image' = 'text'): Promise<Message | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

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
        .single()

      if (error) {
        console.error('Error sending message:', error)
        return null
      }

      // Mark as delivered for sender
      await this.updateMessageStatus(data.id, user.id, 'delivered')

      // Update conversation last message time
      await this.updateConversationLastMessage(conversationId)

      return data
    } catch (error) {
      console.error('Error sending message:', error)
      return null
    }
  }

  // Create or get conversation between business and expert
  async createOrGetConversation(businessUserId: string, expertUserId: string, subject?: string): Promise<Conversation | null> {
    try {
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
        .single()

      if (existing) return existing

      // Create new conversation
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
        .single()

      if (error) {
        console.error('Error creating conversation:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error creating conversation:', error)
      return null
    }
  }

  // Mark message as read
  async markMessageAsRead(messageId: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await this.updateMessageStatus(messageId, user.id, 'read')
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  // Mark all messages in conversation as read
  async markConversationAsRead(conversationId: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: messages } = await supabase
        .from('messages')
        .select('id')
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id)

      if (messages) {
        await Promise.all(
          messages.map(msg => this.updateMessageStatus(msg.id, user.id, 'read'))
        )
      }
    } catch (error) {
      console.error('Error marking conversation as read:', error)
    }
  }

  // Update message status
  private async updateMessageStatus(messageId: string, userId: string, status: 'sent' | 'delivered' | 'read'): Promise<void> {
    try {
      await supabase
        .from('message_status')
        .upsert({
          message_id: messageId,
          user_id: userId,
          status,
          timestamp: new Date().toISOString()
        }, {
          onConflict: 'message_id,user_id'
        })
    } catch (error) {
      console.error('Error updating message status:', error)
    }
  }

  // Get unread message count for conversation
  private async getUnreadMessageCount(conversationId: string): Promise<number> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return 0

      const { count } = await supabase
        .from('messages')
        .select('id', { count: 'exact' })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id)
        .not('id', 'in', `(
          SELECT message_id FROM message_status 
          WHERE user_id = '${user.id}' AND status = 'read'
        )`)

      return count || 0
    } catch (error) {
      console.error('Error getting unread count:', error)
      return 0
    }
  }

  // Get users who have read a message
  private async getMessageReadBy(messageId: string): Promise<string[]> {
    try {
      const { data } = await supabase
        .from('message_status')
        .select('user_id')
        .eq('message_id', messageId)
        .eq('status', 'read')

      return data?.map(status => status.user_id) || []
    } catch (error) {
      console.error('Error getting message read by:', error)
      return []
    }
  }

  // Update conversation last message time
  private async updateConversationLastMessage(conversationId: string): Promise<void> {
    try {
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId)
    } catch (error) {
      console.error('Error updating conversation last message:', error)
    }
  }

  // Subscribe to conversation updates
  subscribeToConversation(conversationId: string, onMessage: (message: Message) => void, onStatusUpdate: (status: MessageStatus) => void) {
    const channel = supabase
      .channel(`conversation:${conversationId}`)
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
            .single()

          if (data) {
            onMessage(data)
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
          onStatusUpdate(payload.new as MessageStatus)
        }
      )
      .subscribe()

    return () => channel.unsubscribe()
  }

  // Subscribe to conversations list updates
  subscribeToConversations(onUpdate: () => void) {
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
      .subscribe()

    return () => channel.unsubscribe()
  }

  // Update user online status
  async updateOnlineStatus(online: boolean): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await userService.updateOnlineStatus(user.id, online)
    } catch (error) {
      console.error('Error updating online status:', error)
    }
  }
}

export const messagingService = new MessagingService()