import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Star, MessageSquare, Eye } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface Expert {
  id: string
  full_name: string
  expertise: string
  location: string
  rating: number
  reviews: number
  hourly_rate: number
  avatar_url?: string
  bio?: string
  verified: boolean
}

const ExpertSearch = () => {
  const [experts, setExperts] = useState<Expert[]>([])
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [skillFilter, setSkillFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchExperts()
  }, [])

  useEffect(() => {
    filterExperts()
  }, [experts, searchTerm, locationFilter, skillFilter])

  const fetchExperts = async () => {
    try {
      // Mock data for now - replace with actual Supabase query
      const mockExperts: Expert[] = [
        {
          id: '1',
          full_name: 'Sarah Johnson',
          expertise: 'SEO & Content Marketing',
          location: 'New York, USA',
          rating: 4.9,
          reviews: 127,
          hourly_rate: 85,
          bio: 'SEO specialist with 8+ years helping businesses grow organic traffic',
          verified: true
        },
        {
          id: '2',
          full_name: 'Marcus Chen',
          expertise: 'Social Media Marketing',
          location: 'London, UK',
          rating: 4.8,
          reviews: 89,
          hourly_rate: 75,
          bio: 'Social media strategist specializing in B2B growth',
          verified: true
        },
        {
          id: '3',
          full_name: 'Elena Rodriguez',
          expertise: 'Web Development',
          location: 'Barcelona, Spain',
          rating: 4.9,
          reviews: 156,
          hourly_rate: 95,
          bio: 'Full-stack developer with expertise in React and Node.js',
          verified: true
        }
      ]
      
      setExperts(mockExperts)
    } catch (error) {
      console.error('Error fetching experts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterExperts = () => {
    let filtered = experts

    if (searchTerm) {
      filtered = filtered.filter(expert =>
        expert.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.expertise.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (locationFilter) {
      filtered = filtered.filter(expert =>
        expert.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    if (skillFilter) {
      filtered = filtered.filter(expert =>
        expert.expertise.toLowerCase().includes(skillFilter.toLowerCase())
      )
    }

    setFilteredExperts(filtered)
  }

  const handleConnect = (expertId: string) => {
    // Open messaging interface
    console.log('Connecting to expert:', expertId)
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
          {filteredExperts.map((expert, index) => (
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
                        {expert.full_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{expert.full_name}</h3>
                      <p className="text-blue-600 font-medium">{expert.expertise}</p>
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
                  <span className="text-sm">{expert.location}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{expert.bio}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{expert.rating}</span>
                      <span className="text-sm text-gray-500">({expert.reviews})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${expert.hourly_rate}</div>
                    <div className="text-sm text-gray-500">per hour</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </button>
                  <button
                    onClick={() => handleConnect(expert.id)}
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

        {filteredExperts.length === 0 && (
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