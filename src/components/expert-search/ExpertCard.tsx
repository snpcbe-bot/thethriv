import React from 'react';
import { MapPin, Star, Users, Briefcase, Clock, CheckCircle, ExternalLink, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Expert } from '../../types/expert';

interface ExpertCardProps {
  expert: Expert;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPriceDisplay = (range?: string, hourlyRate?: number) => {
    if (hourlyRate) return `$${hourlyRate}/hr`;
    
    switch (range) {
      case 'budget': return '$';
      case 'mid': return '$$';
      case 'premium': return '$$$';
      default: return 'Contact for pricing';
    }
  };

  const getPriceColor = (range?: string) => {
    switch (range) {
      case 'budget': return 'text-green-600 bg-green-50 border-green-200';
      case 'mid': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'premium': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 p-8 border border-slate-100 group"
    >
      {/* Header */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <img
            src={expert.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=3b82f6&color=fff&size=80`}
            alt={expert.name}
            className="w-20 h-20 rounded-2xl object-cover shadow-medium"
            loading="lazy"
          />
          {expert.verified && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-medium">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
              {expert.name}
            </h3>
            {expert.verified && (
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                Verified
              </span>
            )}
          </div>
          
          <div className="flex items-center text-slate-600 mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {expert.city ? `${expert.city}, ${expert.country}` : expert.country}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getPriceColor(expert.price_range)}`}>
              {getPriceDisplay(expert.price_range, expert.hourly_rate)}
            </span>
            <span className="text-sm text-slate-500 font-medium capitalize bg-slate-100 px-3 py-1 rounded-lg">
              {expert.expert_type === 'seo' ? 'SEO Expert' : 'Influencer'}
            </span>
          </div>
        </div>
      </div>

      {/* Skills */}
      {expert.skills.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {expert.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg font-medium border border-slate-200"
              >
                {skill}
              </span>
            ))}
            {expert.skills.length > 4 && (
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-sm rounded-lg font-medium border border-slate-200">
                +{expert.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bio */}
      {expert.bio && (
        <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
          {expert.bio}
        </p>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {expert.expert_type === 'influencer' ? (
          <>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">
                  {formatNumber(expert.follower_count)}
                </div>
                <div className="text-slate-500 text-sm">Followers</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">
                  {expert.engagement_rate}%
                </div>
                <div className="text-slate-500 text-sm">Engagement</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">
                  {expert.years_experience}
                </div>
                <div className="text-slate-500 text-sm">Years Exp.</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">
                  {expert.client_count}
                </div>
                <div className="text-slate-500 text-sm">Clients</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Response Time */}
      <div className="flex items-center space-x-2 text-sm text-slate-500 mb-8 bg-slate-50 px-4 py-2 rounded-lg">
        <Clock className="w-4 h-4" />
        <span>Responds within {expert.response_time_hours}h</span>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-semibold shadow-sm hover:shadow-md">
          View Profile
        </button>
        <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-medium hover:shadow-large flex items-center justify-center group">
          <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Contact
        </button>
        {expert.website_url && (
          <a
            href={expert.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ExpertCard;