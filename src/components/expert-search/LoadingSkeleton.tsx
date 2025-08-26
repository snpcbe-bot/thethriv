import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-soft p-8 border border-slate-100">
          {/* Header */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-20 h-20 bg-slate-200 rounded-2xl animate-pulse"></div>
            <div className="flex-1">
              <div className="h-6 bg-slate-200 rounded-lg animate-pulse mb-3"></div>
              <div className="h-4 bg-slate-200 rounded-lg animate-pulse w-3/4 mb-3"></div>
              <div className="flex justify-between">
                <div className="h-8 bg-slate-200 rounded-xl animate-pulse w-20"></div>
                <div className="h-6 bg-slate-200 rounded-lg animate-pulse w-24"></div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="flex space-x-2 mb-6">
            <div className="h-7 bg-slate-200 rounded-lg animate-pulse w-20"></div>
            <div className="h-7 bg-slate-200 rounded-lg animate-pulse w-24"></div>
            <div className="h-7 bg-slate-200 rounded-lg animate-pulse w-16"></div>
          </div>

          {/* Bio */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse w-4/5"></div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
              <div>
                <div className="h-5 bg-slate-200 rounded animate-pulse w-12 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
              <div>
                <div className="h-5 bg-slate-200 rounded animate-pulse w-12 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="h-8 bg-slate-200 rounded-lg animate-pulse w-40 mb-8"></div>

          {/* Actions */}
          <div className="flex space-x-3">
            <div className="flex-1 h-12 bg-slate-200 rounded-xl animate-pulse"></div>
            <div className="flex-1 h-12 bg-slate-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;