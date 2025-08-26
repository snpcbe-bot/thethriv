import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { useMessaging } from '../../hooks/useMessaging';
import { useUserProfile } from '../../hooks/useUserProfile';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const MessageCenter: React.FC = () => {
  const { profile } = useUserProfile();
  const {
    conversations,
    activeConversation,
    messages,
    loading,
    sending,
    onlineUsers,
    unreadCount,
    sendMessage,
    selectConversation
  } = useMessaging();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[600px] flex">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Messages
            </h3>
            {unreadCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {unreadCount} new
              </span>
            )}
          </div>
        </div>
        <ConversationList
          conversations={conversations}
          activeConversation={activeConversation}
          onSelectConversation={selectConversation}
          currentUserId={profile?.user_id || ''}
          onlineUsers={onlineUsers}
        />
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {profile?.role === 'business' 
                        ? activeConversation.expert_profile?.full_name?.charAt(0)
                        : activeConversation.business_profile?.full_name?.charAt(0)
                      }
                    </span>
                  </div>
                  {/* Online indicator */}
                  {onlineUsers.has(profile?.role === 'business' 
                    ? activeConversation.expert_profile?.user_id || ''
                    : activeConversation.business_profile?.user_id || ''
                  ) && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {profile?.role === 'business' 
                      ? activeConversation.expert_profile?.full_name
                      : activeConversation.business_profile?.full_name
                    }
                  </h4>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">
                      {profile?.role === 'business' ? 'Expert' : 'Business'}
                    </p>
                    {onlineUsers.has(profile?.role === 'business' 
                      ? activeConversation.expert_profile?.user_id || ''
                      : activeConversation.business_profile?.user_id || ''
                    ) && (
                      <span className="text-xs text-green-600 font-medium">Online</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Info className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <MessageList
              messages={messages}
              currentUserId={profile?.user_id || ''}
              onlineUsers={onlineUsers}
            />

            {/* Message Input */}
            <MessageInput
              onSendMessage={sendMessage}
              sending={sending}
              disabled={!activeConversation}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the sidebar to start messaging
              </p>
              {conversations.length === 0 && (
                <div className="mt-6">
                  <p className="text-sm text-gray-400 mb-4">
                    No conversations yet. Start by connecting with experts or businesses.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;