import { supabase } from '../lib/supabase'
import type { BusinessProfile } from '../types'

export class BusinessService {
  async create(data: Partial<BusinessProfile>): Promise<BusinessProfile | null> {
    try {
      const { data: profile, error } = await supabase
        .from('business_profiles_new')
        .insert(data)
        .select()
        .single()

      if (error) {
        console.error('Error creating business profile:', error)
        return null
      }
      return profile
    } catch (error) {
      console.error('Error creating business profile:', error)
      return null
    }
  }

  async getByUserId(userId: string): Promise<BusinessProfile | null> {
    try {
      const { data, error } = await supabase
        .from('business_profiles_new')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching business profile:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error fetching business profile:', error)
      return null
    }
  }

  async update(id: string, updates: Partial<BusinessProfile>): Promise<BusinessProfile | null> {
    try {
      const { data, error } = await supabase
        .from('business_profiles_new')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating business profile:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error updating business profile:', error)
      return null
    }
  }

  async getAll(limit = 20, offset = 0): Promise<BusinessProfile[]> {
    try {
      const { data, error } = await supabase
        .from('business_profiles_new')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error fetching business profiles:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching business profiles:', error)
      return []
    }
  }
}

export const businessService = new BusinessService()