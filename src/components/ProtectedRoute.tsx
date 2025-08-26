import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './auth/AuthModal'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'business' | 'expert'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()
  const [showAuthModal, setShowAuthModal] = React.useState(false)

  React.useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true)
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access this page</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultRole={requiredRole}
        />
      </>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute