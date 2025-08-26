import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import type { Conversation } from '../../types';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  currentUserId: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversation,
  onSelectConversation,
  currentUserId
}) => {
  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500 text-sm">No conversations yet</p>
          <p className="text-gray-400 text-xs mt-1">
            Start connecting with experts or businesses
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation, index) => {
        const isActive = activeConversation?.id === conversation.id;
        const otherUser = conversation.business_user_id === currentUserId 
          ? conversation.expert_profile 
          : conversation.business_profile;

        return (
          <motion.button
            key={conversation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectConversation(conversation)}
            className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 ${
              isActive ? 'bg-blue-50 border-blue-100' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">
                    {otherUser?.full_name?.charAt(0) || '?'}
                  </span>
                </div>
                {otherUser?.online_status && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {otherUser?.full_name || 'Unknown User'}
                  </h4>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 truncate">
                  {conversation.subject || 'New conversation'}
                </p>
                
                {conversation.unread_count && conversation.unread_count > 0 && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {conversation.unread_count} new
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ConversationList;