import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          {/* Header */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
              <div className="flex justify-between">
                <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="flex space-x-2 mb-4">
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-14"></div>
          </div>

          {/* Bio */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-4"></div>

          {/* Actions */}
          <div className="flex space-x-3">
            <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;