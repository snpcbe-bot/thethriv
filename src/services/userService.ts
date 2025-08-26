import { supabase } from '../lib/supabase'
import type { UserProfile } from '../types'

export class UserService {
  async create(data: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .insert(data)
        .select()
        .single()

      if (error) {
        console.error('Error creating user profile:', error)
        return null
      }
      return profile
    } catch (error) {
      console.error('Error creating user profile:', error)
      return null
    }
  }

  async getById(id: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  async getByUserId(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile by user_id:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error fetching user profile by user_id:', error)
      return null
    }
  }

  async update(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating user profile:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error updating user profile:', error)
      return null
    }
  }

  async updateOnlineStatus(userId: string, online: boolean): Promise<void> {
    try {
      await supabase
        .from('user_profiles')
        .update({
          online_status: online,
          last_seen: new Date().toISOString()
        })
        .eq('user_id', userId)
    } catch (error) {
      console.error('Error updating online status:', error)
    }
  }

  async searchUsers(query: string, role?: 'business' | 'expert'): Promise<UserProfile[]> {
    try {
      let queryBuilder = supabase
        .from('user_profiles')
        .select('*')
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)

      if (role) {
        queryBuilder = queryBuilder.eq('role', role)
      }

      const { data, error } = await queryBuilder.limit(20)

      if (error) {
        console.error('Error searching users:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error searching users:', error)
      return []
    }
  }
}

export const userService = new UserService()