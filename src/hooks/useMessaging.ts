import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { messagingService } from '../services/messagingService';
import { userService } from '../services/userService';
import { supabase } from '../lib/supabase';
import type { Conversation, Message } from '../types';

export const useMessaging = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    if (!user) return;

    try {
      const convs = await messagingService.getConversations();
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
      const msgs = await messagingService.getMessages(conversationId);
      setMessages(msgs);
      
      // Mark messages as read
      const unreadMessages = msgs.filter(msg => 
        msg.sender_id !== user?.id && 
        !msg.read_by?.includes(user?.id || '')
      );
      
      if (unreadMessages.length > 0 && user) {
        await Promise.all(
          unreadMessages.map(msg => messagingService.markMessageAsRead(msg.id))
        );
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Send message
  const sendMessage = async (content: string, messageType: 'text' | 'file' | 'image' = 'text') => {
    if (!user || !activeConversation || !content.trim()) return;

    setSending(true);
    try {
      // Optimistic update
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        conversation_id: activeConversation.id,
        sender_id: user.id,
        content: content.trim(),
        message_type: messageType,
        edited: false,
        created_at: new Date().toISOString(),
        sender_profile: {
          id: user.id,
          user_id: user.id,
          full_name: user.user_metadata?.full_name || 'You',
          email: user.email || '',
          role: 'business',
          verified: false,
          online_status: true,
          last_seen: new Date().toISOString(),
          plan: 'free',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      
      setMessages(prev => [...prev, optimisticMessage]);

      const message = await messagingService.sendMessage(
        activeConversation.id,
        content.trim(),
        messageType
      );

      if (message) {
        // Replace optimistic message with real message
        setMessages(prev => 
          prev.map(msg => 
            msg.id === optimisticMessage.id ? message : msg
          )
        );
        
        // Update conversation in list
        setConversations(prev => 
          prev.map(conv => 
            conv.id === activeConversation.id 
              ? { ...conv, last_message_at: message.created_at }
              : conv
          )
        );
      } else {
        // Remove optimistic message on failure
        setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id.startsWith('temp-')));
    } finally {
      setSending(false);
    }
  };

  // Create new conversation
  const createConversation = async (businessUserId: string, expertUserId: string, subject?: string) => {
    if (!user) return null;

    try {
      const conversation = await messagingService.createOrGetConversation(businessUserId, expertUserId, subject);
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
        messageIds.map(messageId => messagingService.markMessageAsRead(messageId))
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

  // Get unread message count
  const getUnreadCount = useCallback(() => {
    return conversations.reduce((total, conv) => total + (conv.unread_count || 0), 0);
  }, [conversations]);
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
          filter: `or(business_user_id.eq.${user.id},expert_user_id.eq.${user.id})`
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
              
              // Update conversation list
              setConversations(prev => 
                prev.map(conv => 
                  conv.id === activeConversation.id 
                    ? { ...conv, last_message_at: data.created_at }
                    : conv
                )
              );
            }
          }
        )
        .subscribe();
    }

    // Subscribe to online presence
    const presenceSubscription = supabase
      .channel('online-users')
      .on('presence', { event: 'sync' }, () => {
        const state = supabase.getChannels()[0].presenceState();
        const online = new Set(Object.keys(state));
        setOnlineUsers(online);
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        setOnlineUsers(prev => new Set([...prev, key]));
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        setOnlineUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(key);
          return newSet;
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await supabase.channel('online-users').track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });
    return () => {
      conversationSubscription.unsubscribe();
      if (messageSubscription) {
        messageSubscription.unsubscribe();
      }
      presenceSubscription.unsubscribe();
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
      userService.updateOnlineStatus(user.id, online);
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
    onlineUsers,
    unreadCount: getUnreadCount(),
    sendMessage,
    createConversation,
    selectConversation,
    markAsRead,
    refreshConversations: fetchConversations
  };
};