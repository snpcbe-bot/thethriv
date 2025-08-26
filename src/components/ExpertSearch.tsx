import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Star, MessageSquare, Eye } from 'lucide-react'
import { expertService } from '../services/expertService'
import { messagingService } from '../services/messagingService'
import { useAuth } from '../contexts/AuthContext'
import type { ExpertProfile, UserProfile, ExpertSearchFilters } from '../types'

type ExpertWithProfile = ExpertProfile & { user_profile: UserProfile }

const ExpertSearch = () => {
  const { user, profile } = useAuth()
  const [experts, setExperts] = useState<ExpertWithProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [skillFilter, setSkillFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchExperts()
  }, [])

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setPage(1)
      fetchExperts()
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [searchTerm, locationFilter, skillFilter])

  const fetchExperts = async () => {
    try {
      setLoading(true)
      
      const filters: ExpertSearchFilters = {
        query: searchTerm,
        location: locationFilter,
        verified_only: true
      }

      if (skillFilter) {
        filters.skills = [skillFilter]
      }

      const result = await expertService.search(filters, page, 20)
      
      if (page === 1) {
        setExperts(result.data)
      } else {
        setExperts(prev => [...prev, ...result.data])
      }
      
      setHasMore(result.data.length === 20)
    } catch (error) {
      console.error('Error fetching experts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (expert: ExpertWithProfile) => {
    if (!user || !profile) {
      alert('Please sign in to connect with experts')
      return
    }

    if (profile.role !== 'business') {
      alert('Only business users can connect with experts')
      return
    }

    try {
      await messagingService.createOrGetConversation(
        user.id,
        expert.user_id,
        `Connection request from ${profile.full_name}`
      )
      alert('Connection request sent!')
    } catch (error) {
      console.error('Error creating connection:', error)
      alert('Failed to send connection request')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Expert</h1>
          <p className="text-xl text-gray-600">Connect with verified professionals worldwide</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skill</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                  >
                    <option value="">All Skills</option>
                    <option value="SEO">SEO</option>
                    <option value="Social Media">Social Media Marketing</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Content Marketing">Content Marketing</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {expert.user_profile.full_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{expert.user_profile.full_name}</h3>
                      <p className="text-blue-600 font-medium">{expert.skills?.[0] || 'Expert'}</p>
                    </div>
                  </div>
                  {expert.verified && (
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      Verified
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-gray-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{expert.user_profile.location}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{expert.bio || 'Professional expert ready to help your business grow'}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-sm text-gray-500">(23)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span>${expert.hourly_rate || 50}/hr</span>
                    <div className="text-sm text-gray-500">per hour</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </button>
                  <button
                    onClick={() => handleConnect(expert)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Connect
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {experts.length === 0 && !loading && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No experts found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpertSearch