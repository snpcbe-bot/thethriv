import React from 'react';
import { MapPin, Star, Users, Briefcase, Clock, CheckCircle, ExternalLink } from 'lucide-react';
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
      case 'budget': return 'text-green-600 bg-green-50';
      case 'mid': return 'text-blue-600 bg-blue-50';
      case 'premium': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <img
            src={expert.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=3b82f6&color=fff&size=64`}
            alt={expert.name}
            className="w-16 h-16 rounded-full object-cover"
            loading="lazy"
          />
          {expert.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-bold text-lg text-gray-900 truncate">{expert.name}</h3>
            {expert.verified && (
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Verified
              </span>
            )}
          </div>
          
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">
              {expert.city ? `${expert.city}, ${expert.country}` : expert.country}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriceColor(expert.price_range)}`}>
              {getPriceDisplay(expert.price_range, expert.hourly_rate)}
            </span>
            <span className="text-sm text-gray-500 capitalize">
              {expert.expert_type === 'seo' ? 'SEO Expert' : 'Influencer'}
            </span>
          </div>
        </div>
      </div>

      {/* Skills */}
      {expert.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {expert.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {expert.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                +{expert.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bio */}
      {expert.bio && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {expert.bio}
        </p>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        {expert.expert_type === 'influencer' ? (
          <>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <div>
                <div className="font-semibold text-gray-900">
                  {formatNumber(expert.follower_count)}
                </div>
                <div className="text-gray-500">Followers</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-gray-400" />
              <div>
                <div className="font-semibold text-gray-900">
                  {expert.engagement_rate}%
                </div>
                <div className="text-gray-500">Engagement</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <div>
                <div className="font-semibold text-gray-900">
                  {expert.years_experience}
                </div>
                <div className="text-gray-500">Years Exp.</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <div>
                <div className="font-semibold text-gray-900">
                  {expert.client_count}
                </div>
                <div className="text-gray-500">Clients</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Response Time */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Clock className="w-4 h-4" />
        <span>Responds within {expert.response_time_hours}h</span>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          View Profile
        </button>
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Contact
        </button>
        {expert.website_url && (
          <a
            href={expert.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ExpertCard;