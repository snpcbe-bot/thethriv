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
  Megaphone,
  Upload,
  BarChart3,
  Shield
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useUserProfile } from '../hooks/useUserProfile'
import MessageCenter from './messaging/MessageCenter'
import ExpertImport from './admin/ExpertImport'

const Dashboard = () => {
  const { user, profile: authProfile } = useAuth()
  const { profile, businessProfile, expertProfile, loading: profileLoading } = useUserProfile()
  const [activeTab, setActiveTab] = useState('overview')

  const isExpert = profile?.role === 'expert'
  const isBusiness = profile?.role === 'business'

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'connections', name: 'Connections', icon: User },
    ...(isBusiness ? [{ id: 'projects', name: 'Projects', icon: Building }] : []),
    ...(isExpert ? [{ id: 'services', name: 'Services', icon: Star }] : []),
    { id: 'promote', name: 'Promote', icon: Megaphone },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32">
      <div className="container-width py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-8 border border-slate-200 sticky top-40">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-medium">
                  <span className="text-2xl font-bold text-white">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{profile?.full_name}</h3>
                <p className="text-slate-500 capitalize mb-4">{profile?.role}</p>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-semibold border border-green-200">
                  <Shield className="w-4 h-4 mr-2" />
                  {profile?.plan} Plan
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 font-medium ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-soft p-12 border border-slate-200">
              {activeTab === 'overview' && <OverviewTab profile={profile} />}
              {activeTab === 'profile' && <ProfileTab profile={profile} />}
              {activeTab === 'messages' && <MessageCenter />}
              {activeTab === 'connections' && <ConnectionsTab />}
              {activeTab === 'projects' && isBusiness && <ProjectsTab />}
              {activeTab === 'services' && isExpert && <ServicesTab />}
              {activeTab === 'import' && <ExpertImportTab />}
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
    <h2 className="text-section-title text-slate-900 mb-12">Dashboard Overview</h2>
    
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600 mb-2">Profile Views</p>
            <p className="text-4xl font-bold text-blue-900">1,234</p>
            <p className="text-sm text-blue-700 mt-1">+12% this week</p>
          </div>
          <Eye className="w-12 h-12 text-blue-500" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-green-600 mb-2">Connections</p>
            <p className="text-4xl font-bold text-green-900">56</p>
            <p className="text-sm text-green-700 mt-1">+8 this month</p>
          </div>
          <User className="w-12 h-12 text-green-500" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-purple-600 mb-2">Messages</p>
            <p className="text-4xl font-bold text-purple-900">23</p>
            <p className="text-sm text-purple-700 mt-1">3 unread</p>
          </div>
          <MessageSquare className="w-12 h-12 text-purple-500" />
        </div>
      </div>
    </div>

    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {[
          { type: 'connection', message: 'New connection request from Sarah Johnson', time: '2 hours ago', color: 'blue' },
          { type: 'view', message: 'Profile viewed by 5 new users', time: '1 day ago', color: 'green' },
          { type: 'message', message: 'Message received from Mike Chen', time: '2 days ago', color: 'purple' }
        ].map((activity, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-slate-200">
            <div className={`w-3 h-3 bg-${activity.color}-500 rounded-full`}></div>
            <p className="text-slate-700 flex-1">{activity.message}</p>
            <span className="text-sm text-slate-500 font-medium">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const ProfileTab = ({ profile }: { profile: any }) => (
  <div>
    <div className="flex items-center justify-between mb-12">
      <h2 className="text-section-title text-slate-900">Profile Settings</h2>
      <button className="btn-primary">
        <Edit className="w-4 h-4 mr-2" />
        Edit Profile
      </button>
    </div>

    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name</label>
          <input
            type="text"
            value={profile?.full_name || ''}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Email</label>
          <input
            type="email"
            value={profile?.email || ''}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            readOnly
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Bio</label>
        <textarea
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <p className="text-amber-800 leading-relaxed">
          <strong>Note:</strong> Changes to profile details require approval from our team. 
          Contact support for profile updates and verification requests.
        </p>
      </div>
    </div>
  </div>
)

const ConnectionsTab = () => (
  <div>
    <h2 className="text-section-title text-slate-900 mb-12">Connections</h2>
    <div className="text-center py-20">
      <User className="w-20 h-20 text-slate-400 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-slate-900 mb-4">No connections yet</h3>
      <p className="text-slate-500 mb-8">Connect with experts or businesses to build your network.</p>
      <button className="btn-primary">
        <Search className="w-4 h-4 mr-2" />
        Find Experts
      </button>
    </div>
  </div>
)

const ProjectsTab = () => (
  <div>
    <div className="flex items-center justify-between mb-12">
      <h2 className="text-section-title text-slate-900">Projects</h2>
      <button className="btn-primary">
        <Plus className="w-4 h-4 mr-2" />
        Post Project
      </button>
    </div>
    <div className="text-center py-20">
      <Building className="w-20 h-20 text-slate-400 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-slate-900 mb-4">No projects yet</h3>
      <p className="text-slate-500 mb-8">Post your first project to start receiving proposals from experts.</p>
    </div>
  </div>
)

const ServicesTab = () => (
  <div>
    <div className="flex items-center justify-between mb-12">
      <h2 className="text-section-title text-slate-900">Services</h2>
      <button className="btn-primary">
        <Plus className="w-4 h-4 mr-2" />
        Add Service
      </button>
    </div>
    <div className="text-center py-20">
      <Star className="w-20 h-20 text-slate-400 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-slate-900 mb-4">No services yet</h3>
      <p className="text-slate-500 mb-8">Showcase your expertise by adding your services.</p>
    </div>
  </div>
)

const ExpertImportTab = () => (
  <div>
    <h2 className="text-section-title text-slate-900 mb-8">Expert Data Management</h2>
    <ExpertImport />
  </div>
)

const PromoteTab = () => (
  <div>
    <h2 className="text-section-title text-slate-900 mb-12">Promote Your Profile</h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200 shadow-soft">
        <Megaphone className="w-16 h-16 text-yellow-600 mb-6" />
        <h3 className="text-xl font-bold text-slate-900 mb-4">Dashboard Display Ads</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">Featured placement on user dashboards for maximum visibility</p>
        <button className="w-full py-3 px-4 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors font-semibold shadow-medium">
          Create Campaign
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 shadow-soft">
        <TrendingUp className="w-16 h-16 text-blue-600 mb-6" />
        <h3 className="text-xl font-bold text-slate-900 mb-4">Regional Ads</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">Target specific geographical regions and local markets</p>
        <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-medium">
          Create Campaign
        </button>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 shadow-soft">
        <Star className="w-16 h-16 text-purple-600 mb-6" />
        <h3 className="text-xl font-bold text-slate-900 mb-4">Global Ads</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">Maximum visibility worldwide across all regions</p>
        <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold shadow-medium">
          Create Campaign
        </button>
      </div>
    </div>
  </div>
)

const SettingsTab = () => (
  <div>
    <h2 className="text-section-title text-slate-900 mb-12">Settings</h2>
    
    <div className="space-y-8">
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-8">Account Settings</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
            <div>
              <p className="font-semibold text-slate-900">Email Notifications</p>
              <p className="text-sm text-slate-500 mt-1">Receive updates about your account</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 shadow-sm">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6 shadow-sm" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
            <div>
              <p className="font-semibold text-slate-900">Profile Visibility</p>
              <p className="text-sm text-slate-500 mt-1">Make your profile visible to others</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 shadow-sm">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6 shadow-sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-red-900 mb-4">Danger Zone</h3>
        <p className="text-red-700 mb-6 leading-relaxed">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold shadow-medium">
          Delete Account
        </button>
      </div>
    </div>
  </div>
)

export default Dashboard