import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { userProfileService, businessProfileService, expertProfileService, subscriptionService } from '../lib/database'
import type { SignUpData, UserProfile } from '../types'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  signUp: (data: SignUpData) => Promise<{ data?: any; error?: any }>
  signIn: (email: string, password: string) => Promise<{ data?: any; error?: any }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null)
      return
    }

    try {
      const userProfile = await userProfileService.getByUserId(user.id)
      setProfile(userProfile)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (session?.user) {
          await refreshProfile()
          // Update online status when user signs in
          await userProfileService.updateOnlineStatus(session.user.id, true)
        } else {
          setProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Load profile when user is available
  useEffect(() => {
    if (user && !profile) {
      refreshProfile()
    }
  }, [user, profile])

  const signUp = async (signUpData: SignUpData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
        full_name: signUpData.full_name,
        role: signUpData.role
          }
        }
      })

      if (error) return { error }
      if (!data.user) return { error: { message: 'Failed to create user' } }

      // Create user profile
      const userProfile = await userProfileService.create({
        user_id: data.user.id,
        full_name: signUpData.full_name,
        email: signUpData.email,
        role: signUpData.role,
        plan: signUpData.plan,
        location: signUpData.location,
        verified: false,
        online_status: true,
        last_seen: new Date().toISOString()
      })

      if (!userProfile) {
        return { error: { message: 'Failed to create user profile' } }
      }

      // Create role-specific profile
      if (signUpData.role === 'business' && signUpData.company_name) {
        await businessProfileService.create({
          user_id: data.user.id,
          company_name: signUpData.company_name
        })
      } else if (signUpData.role === 'expert' && signUpData.expertise) {
        await expertProfileService.create({
          user_id: data.user.id,
          skills: [signUpData.expertise],
          verified: false
        })
      }

      // Create subscription
      if (signUpData.plan !== 'free') {
        const periodEnd = new Date()
        if (signUpData.plan === 'weekly') {
          periodEnd.setDate(periodEnd.getDate() + 7)
        } else if (signUpData.plan === 'monthly') {
          periodEnd.setMonth(periodEnd.getMonth() + 1)
        } else if (signUpData.plan === 'yearly') {
          periodEnd.setFullYear(periodEnd.getFullYear() + 1)
        }

        await subscriptionService.create({
          user_id: data.user.id,
          plan: signUpData.plan,
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: periodEnd.toISOString()
        })
      }

      return { data }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signOut = async () => {
    if (user) {
      // Update online status before signing out
      await userProfileService.updateOnlineStatus(user.id, false)
    }
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}