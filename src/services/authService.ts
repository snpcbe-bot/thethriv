import { supabase } from '../lib/supabase'
import { userService } from './userService'
import { businessService } from './businessService'
import { expertService } from './expertService'
import { subscriptionService } from './subscriptionService'
import type { SignUpData } from '../types'

export class AuthService {
  // Sign up new user with complete profile setup
  async signUp(signUpData: SignUpData) {
    try {
      // 1. Create user account with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            full_name: signUpData.full_name,
            role: signUpData.role
          }
        }
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Failed to create user account')

      // 2. Create user profile
      const userProfile = await userService.create({
        user_id: authData.user.id,
        full_name: signUpData.full_name,
        email: signUpData.email,
        role: signUpData.role,
        plan: signUpData.plan,
        location: signUpData.location,
        verified: false,
        online_status: true,
        last_seen: new Date().toISOString()
      })

      if (!userProfile) throw new Error('Failed to create user profile')

      // 3. Create role-specific profile
      if (signUpData.role === 'business' && signUpData.company_name) {
        await businessService.create({
          user_id: authData.user.id,
          company_name: signUpData.company_name,
          industry: signUpData.industry,
          company_size: signUpData.company_size,
          website: signUpData.website
        })
      } else if (signUpData.role === 'expert' && signUpData.expertise) {
        await expertService.create({
          user_id: authData.user.id,
          skills: [signUpData.expertise],
          bio: signUpData.bio,
          hourly_rate: signUpData.hourly_rate,
          portfolio_url: signUpData.portfolio_url,
          verified: false
        })
      }

      // 4. Create subscription if not free plan
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
          user_id: authData.user.id,
          plan: signUpData.plan,
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: periodEnd.toISOString()
        })
      }

      return { data: authData, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { data: null, error }
    }
  }

  // Sign in existing user
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Update online status
      if (data.user) {
        await userService.updateOnlineStatus(data.user.id, true)
      }

      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error }
    }
  }

  // Sign out user
  async signOut() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Update online status before signing out
      if (user) {
        await userService.updateOnlineStatus(user.id, false)
      }

      const { error } = await supabase.auth.signOut()
      if (error) throw error

      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error }
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  }

  // Get current session
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error) {
      console.error('Get current session error:', error)
      return null
    }
  }

  // Reset password
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      return { error }
    }
  }

  // Update password
  async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Update password error:', error)
      return { error }
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

export const authService = new AuthService()