import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
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
    sendMessage,
    selectConversation
  } = useMessaging();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[600px] flex">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Messages
          </h3>
        </div>
        <ConversationList
          conversations={conversations}
          activeConversation={activeConversation}
          onSelectConversation={selectConversation}
          currentUserId={profile?.user_id || ''}
        />
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {profile?.role === 'business' 
                      ? activeConversation.expert_profile?.full_name?.charAt(0)
                      : activeConversation.business_profile?.full_name?.charAt(0)
                    }
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {profile?.role === 'business' 
                      ? activeConversation.expert_profile?.full_name
                      : activeConversation.business_profile?.full_name
                    }
                  </h4>
                  <p className="text-sm text-gray-500">
                    {profile?.role === 'business' ? 'Expert' : 'Business'}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <MessageList
              messages={messages}
              currentUserId={profile?.user_id || ''}
            />

            {/* Message Input */}
            <MessageInput
              onSendMessage={sendMessage}
              sending={sending}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;