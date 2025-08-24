import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, TrendingUp, Globe, CheckCircle } from 'lucide-react';

const HeroVideo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      {/* Video Container */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl overflow-hidden shadow-2xl">
        {/* Sample Video - Using a placeholder for now */}
        <div className="aspect-video bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center relative">
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
            poster="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
          >
            <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
            {/* Fallback content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">Platform Demo</h3>
                <p className="text-blue-100">See how experts connect with businesses</p>
              </div>
            </div>
          </video>
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between text-white">
                <div>
                  <div className="text-sm font-medium text-blue-200 mb-1">Live Platform</div>
                  <div className="text-lg font-semibold">Expert Connection Demo</div>
                </div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900">10K+</div>
              <div className="text-sm text-slate-600">Experts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">50+</div>
              <div className="text-sm text-slate-600">Countries</div>
            </div>
          </div>
        </div>
        
        {/* Feature Pills */}
        <div className="absolute top-6 left-6 space-y-3">
          {[
            { icon: Users, text: 'Expert Matching', color: 'bg-blue-500' },
            { icon: CheckCircle, text: 'Verified Profiles', color: 'bg-green-500' },
            { icon: Globe, text: 'Global Reach', color: 'bg-purple-500' }
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              className="flex items-center space-x-2 bg-white/90 backdrop-blur rounded-full px-3 py-2"
            >
              <div className={`w-2 h-2 ${feature.color} rounded-full`}></div>
              <span className="text-sm font-medium text-slate-700">{feature.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroVideo;