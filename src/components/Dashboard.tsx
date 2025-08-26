import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Building, 
  Search, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Settings,
  Plus,
  Eye,
  Edit,
  Megaphone
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const Dashboard = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const isExpert = profile?.role === 'expert'
  const isBusiness = profile?.role === 'business'

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'connections', name: 'Connections', icon: User },
    ...(isBusiness ? [{ id: 'projects', name: 'Projects', icon: Building }] : []),
    ...(isExpert ? [{ id: 'services', name: 'Services', icon: Star }] : []),
    { id: 'promote', name: 'Promote', icon: Megaphone },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{profile?.full_name}</h3>
                <p className="text-gray-500 capitalize">{profile?.role}</p>
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mt-2">
                  {profile?.plan} Plan
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              {activeTab === 'overview' && <OverviewTab profile={profile} />}
              {activeTab === 'profile' && <ProfileTab profile={profile} />}
              {activeTab === 'messages' && <MessagesTab />}
              {activeTab === 'connections' && <ConnectionsTab />}
              {activeTab === 'projects' && isBusiness && <ProjectsTab />}
              {activeTab === 'services' && isExpert && <ServicesTab />}
              {activeTab === 'promote' && <PromoteTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const OverviewTab = ({ profile }: { profile: any }) => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
    
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Profile Views</p>
            <p className="text-3xl font-bold text-blue-900">1,234</p>
          </div>
          <Eye className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-600">Connections</p>
            <p className="text-3xl font-bold text-green-900">56</p>
          </div>
          <User className="w-8 h-8 text-green-500" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600">Messages</p>
            <p className="text-3xl font-bold text-purple-900">23</p>
          </div>
          <MessageSquare className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>

    <div className="bg-gray-50 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <p className="text-gray-700">New connection request from Sarah Johnson</p>
          <span className="text-sm text-gray-500">2 hours ago</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p className="text-gray-700">Profile viewed by 5 new users</p>
          <span className="text-sm text-gray-500">1 day ago</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <p className="text-gray-700">Message received from Mike Chen</p>
          <span className="text-sm text-gray-500">2 days ago</span>
        </div>
      </div>
    </div>
  </div>
)

const ProfileTab = ({ profile }: { profile: any }) => (
  <div>
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-gray-900">Profile Settings</h2>
      <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
        <Edit className="w-4 h-4 mr-2" />
        Edit Profile
      </button>
    </div>

    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={profile?.full_name || ''}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={profile?.email || ''}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-yellow-800">
          <strong>Note:</strong> Changes to profile details require approval from Thethriv team. 
          Click "Connect to Thethriv" for moderated updates.
        </p>
      </div>
    </div>
  </div>
)

const MessagesTab = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Messages</h2>
    <div className="text-center py-12">
      <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
      <p className="text-gray-500">Start connecting with experts or businesses to begin conversations.</p>
    </div>
  </div>
)

const ConnectionsTab = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Connections</h2>
    <div className="text-center py-12">
      <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No connections yet</h3>
      <p className="text-gray-500">Connect with experts or businesses to build your network.</p>
    </div>
  </div>
)

const ProjectsTab = () => (
  <div>
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
      <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
        <Plus className="w-4 h-4 mr-2" />
        Post Project
      </button>
    </div>
    <div className="text-center py-12">
      <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
      <p className="text-gray-500">Post your first project to start receiving proposals from experts.</p>
    </div>
  </div>
)

const ServicesTab = () => (
  <div>
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-gray-900">Services</h2>
      <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
        <Plus className="w-4 h-4 mr-2" />
        Add Service
      </button>
    </div>
    <div className="text-center py-12">
      <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No services yet</h3>
      <p className="text-gray-500">Showcase your expertise by adding your services.</p>
    </div>
  </div>
)

const PromoteTab = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Promote Your Profile</h2>
    
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
        <Megaphone className="w-12 h-12 text-yellow-600 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Dashboard Display Ads</h3>
        <p className="text-gray-600 mb-4">Featured placement on user dashboards</p>
        <button className="w-full py-2 px-4 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors">
          Create Campaign
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
        <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Regional Ads</h3>
        <p className="text-gray-600 mb-4">Target specific geographical regions</p>
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          Create Campaign
        </button>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
        <Star className="w-12 h-12 text-purple-600 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Global Ads</h3>
        <p className="text-gray-600 mb-4">Maximum visibility worldwide</p>
        <button className="w-full py-2 px-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
          Create Campaign
        </button>
      </div>
    </div>
  </div>
)

const SettingsTab = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Settings</h2>
    
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive updates about your account</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Profile Visibility</p>
              <p className="text-sm text-gray-500">Make your profile visible to others</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-red-900 mb-4">Danger Zone</h3>
        <p className="text-red-700 mb-4">Once you delete your account, there is no going back.</p>
        <button className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  </div>
)

export default Dashboard