import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { conversationService, messageService, userProfileService } from '../lib/database';
import { supabase } from '../lib/supabase';
import type { Conversation, Message } from '../types';

export const useMessaging = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    if (!user) return;

    try {
      const convs = await conversationService.getByUserId(user.id);
      setConversations(convs);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch messages for active conversation
  const fetchMessages = useCallback(async (conversationId: string) => {
    try {
      const msgs = await messageService.getByConversationId(conversationId);
      setMessages(msgs);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Send message
  const sendMessage = async (content: string, messageType: 'text' | 'file' | 'image' = 'text') => {
    if (!user || !activeConversation || !content.trim()) return;

    setSending(true);
    try {
      const message = await messageService.create(
        activeConversation.id,
        user.id,
        content.trim(),
        messageType
      );

      if (message) {
        setMessages(prev => [...prev, message]);
        // Update conversation in list
        setConversations(prev => 
          prev.map(conv => 
            conv.id === activeConversation.id 
              ? { ...conv, last_message_at: message.created_at }
              : conv
          )
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  // Create new conversation
  const createConversation = async (businessUserId: string, expertUserId: string, subject?: string) => {
    if (!user) return null;

    try {
      const conversation = await conversationService.create(businessUserId, expertUserId, subject);
      if (conversation) {
        setConversations(prev => [conversation, ...prev]);
        setActiveConversation(conversation);
        setMessages([]);
      }
      return conversation;
    } catch (error) {
      console.error('Error creating conversation:', error);
      return null;
    }
  };

  // Mark messages as read
  const markAsRead = async (messageIds: string[]) => {
    if (!user) return;

    try {
      await Promise.all(
        messageIds.map(messageId => messageService.markAsRead(messageId, user.id))
      );
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Set active conversation and fetch its messages
  const selectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    fetchMessages(conversation.id);
  };

  // Real-time subscriptions
  useEffect(() => {
    if (!user) return;

    // Subscribe to new conversations
    const conversationSubscription = supabase
      .channel('conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `business_user_id=eq.${user.id},expert_user_id=eq.${user.id}`
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    // Subscribe to new messages in active conversation
    let messageSubscription: any = null;
    if (activeConversation) {
      messageSubscription = supabase
        .channel(`messages:${activeConversation.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${activeConversation.id}`
          },
          async (payload) => {
            // Fetch the complete message with sender profile
            const { data } = await supabase
              .from('messages')
              .select(`
                *,
                sender_profile:user_profiles!messages_sender_id_fkey(*)
              `)
              .eq('id', payload.new.id)
              .single();

            if (data && data.sender_id !== user.id) {
              setMessages(prev => [...prev, data]);
            }
          }
        )
        .subscribe();
    }

    return () => {
      conversationSubscription.unsubscribe();
      if (messageSubscription) {
        messageSubscription.unsubscribe();
      }
    };
  }, [user, activeConversation, fetchConversations]);

  // Initial load
  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user, fetchConversations]);

  // Update online status
  useEffect(() => {
    if (!user) return;

    const updateOnlineStatus = (online: boolean) => {
      userProfileService.updateOnlineStatus(user.id, online);
    };

    updateOnlineStatus(true);

    const handleBeforeUnload = () => updateOnlineStatus(false);
    const handleVisibilityChange = () => {
      updateOnlineStatus(!document.hidden);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      updateOnlineStatus(false);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  return {
    conversations,
    activeConversation,
    messages,
    loading,
    sending,
    sendMessage,
    createConversation,
    selectConversation,
    markAsRead,
    refreshConversations: fetchConversations
  };
};