import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, MessageSquare, TrendingUp, Users, Star, Globe } from 'lucide-react';

const InteractiveWindow: React.FC = () => {
  const [activeTab, setActiveTab] = useState('video');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    { user: 'Sarah Chen', message: 'Found an amazing SEO expert through Thriv!', type: 'success', avatar: 'SC' },
    { user: 'Mike Rodriguez', message: 'Our traffic increased 400% in 3 months', type: 'growth', avatar: 'MR' },
    { user: 'Emma Thompson', message: 'The verification process gives me confidence', type: 'trust', avatar: 'ET' },
    { user: 'David Kim', message: 'Global reach made finding experts so easy', type: 'global', avatar: 'DK' },
    { user: 'Lisa Park', message: 'Transparent pricing - no hidden fees!', type: 'pricing', avatar: 'LP' }
  ];

  const metrics = [
    { label: 'Active Experts', value: '10,247', change: '+12%', icon: Users },
    { label: 'Success Rate', value: '94.2%', change: '+2.1%', icon: Star },
    { label: 'Global Reach', value: '25 Countries', change: '+3', icon: Globe },
    { label: 'Growth Rate', value: '340%', change: '+15%', icon: TrendingUp }
  ];

  // Auto-rotate messages
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, messages.length]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
      >
        {/* Window Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex items-center space-x-1 bg-white rounded-lg p-1">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'video' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Demo
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'messages' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Live Feed
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'metrics' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Analytics
            </button>
          </div>
          
          <div className="w-16"></div>
        </div>

        {/* Window Content */}
        <div className="h-80 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'video' && (
              <motion.div
                key="video"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center"
              >
                <div className="text-center text-white">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">See Thriv in Action</h3>
                  <p className="text-blue-100 text-sm">Watch how businesses find experts</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                    Live Activity
                  </h3>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:bg-slate-100 rounded transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>

                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={`${msg.user}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: index === currentMessageIndex ? 1 : 0.3,
                          y: 0,
                          scale: index === currentMessageIndex ? 1 : 0.95
                        }}
                        className={`flex items-start space-x-3 p-3 rounded-lg transition-all ${
                          index === currentMessageIndex ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'
                        }`}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {msg.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-900 text-sm">{msg.user}</div>
                          <div className="text-slate-600 text-sm">{msg.message}</div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 p-6"
              >
                <h3 className="font-semibold text-slate-900 mb-6 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                  Platform Metrics
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 rounded-lg p-4"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <metric.icon className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-slate-600">{metric.label}</span>
                      </div>
                      <div className="text-lg font-bold text-slate-900">{metric.value}</div>
                      <div className="text-xs text-green-600 font-medium">{metric.change}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Live Chart Simulation */}
                <div className="mt-6">
                  <div className="text-xs font-medium text-slate-600 mb-3">Expert Connections (Live)</div>
                  <div className="flex items-end space-x-1 h-16">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm flex-1"
                        animate={{
                          height: [
                            `${Math.random() * 60 + 20}%`,
                            `${Math.random() * 60 + 20}%`,
                            `${Math.random() * 60 + 20}%`
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveWindow;