import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, User, Building, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'signin' | 'signup'
  defaultRole?: 'business' | 'expert'
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'signin',
  defaultRole = 'business'
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [role, setRole] = useState(defaultRole)
  const [plan, setPlan] = useState('free')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    expertise: '',
    location: ''
  })

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (activeTab === 'signin') {
        const { error } = await signIn(formData.email, formData.password)
        if (error) throw error
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }

        const userData = {
          full_name: formData.fullName,
          role,
          plan,
          company_name: role === 'business' ? formData.companyName : null,
          expertise: role === 'expert' ? formData.expertise : null,
          location: formData.location
        }

        const { error } = await signUp(formData.email, formData.password, userData)
        if (error) throw error
      }
      
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const plans = [
    { id: 'free', name: 'Free Plan', price: 0, period: 'forever' },
    { id: 'weekly', name: 'Weekly Plan', price: 4, period: 'per week' },
    { id: 'monthly', name: 'Monthly Plan', price: 7, period: 'per month' },
    { id: 'yearly', name: 'Yearly Plan', price: 63, period: 'per year' }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {activeTab === 'signin' ? 'Welcome back' : 'Join Thethriv'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'signin'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'signup'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Role Selection (Signup only) */}
          {activeTab === 'signup' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === 'business'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setRole('business')}
                >
                  <Building className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Business</div>
                </button>
                <button
                  type="button"
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === 'expert'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setRole('expert')}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Expert</div>
                </button>
              </div>
            </div>
          )}

          {/* Plan Selection (Signup only) */}
          {activeTab === 'signup' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose your plan:
              </label>
              <div className="space-y-2">
                {plans.map((planOption) => (
                  <button
                    key={planOption.id}
                    type="button"
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                      plan === planOption.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPlan(planOption.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{planOption.name}</div>
                        <div className="text-sm text-gray-500">
                          ${planOption.price} {planOption.period}
                        </div>
                      </div>
                      {plan === planOption.id && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            )}

            {activeTab === 'signup' && role === 'business' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
            )}

            {activeTab === 'signup' && role === 'expert' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expertise Area
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., SEO, Social Media Marketing"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                />
              </div>
            )}

            {activeTab === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="City, Country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {activeTab === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Please wait...' : activeTab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            {activeTab === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setActiveTab('signup')}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setActiveTab('signin')}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthModal