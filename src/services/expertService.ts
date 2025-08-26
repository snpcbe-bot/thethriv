import { supabase } from '../lib/supabase'
import type { ExpertProfile, ExpertSearchFilters, SearchResult } from '../types'

export class ExpertService {
  async create(data: Partial<ExpertProfile>): Promise<ExpertProfile | null> {
    try {
      const { data: profile, error } = await supabase
        .from('expert_profiles')
        .insert(data)
        .select()
        .single()

      if (error) {
        console.error('Error creating expert profile:', error)
        return null
      }
      return profile
    } catch (error) {
      console.error('Error creating expert profile:', error)
      return null
    }
  }

  async getByUserId(userId: string): Promise<ExpertProfile | null> {
    try {
      const { data, error } = await supabase
        .from('expert_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching expert profile:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error fetching expert profile:', error)
      return null
    }
  }

  async search(filters: ExpertSearchFilters, page = 1, limit = 20): Promise<SearchResult<ExpertProfile & { user_profile: any }>> {
    try {
      let query = supabase
        .from('expert_profiles')
        .select(`
          *,
          user_profile:user_profiles!expert_profiles_user_id_fkey(*)
        `)

      // Apply filters
      if (filters.skills && filters.skills.length > 0) {
        query = query.overlaps('skills', filters.skills)
      }

      if (filters.hourly_rate_min) {
        query = query.gte('hourly_rate', filters.hourly_rate_min)
      }

      if (filters.hourly_rate_max) {
        query = query.lte('hourly_rate', filters.hourly_rate_max)
      }

      if (filters.verified_only) {
        query = query.eq('verified', true)
      }

      // Apply pagination
      const from = (page - 1) * limit
      const to = from + limit - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) {
        console.error('Error searching experts:', error)
        return { data: [], total: 0, page, limit }
      }

      return {
        data: data || [],
        total: count || 0,
        page,
        limit
      }
    } catch (error) {
      console.error('Error searching experts:', error)
      return { data: [], total: 0, page, limit }
    }
  }

  async update(id: string, updates: Partial<ExpertProfile>): Promise<ExpertProfile | null> {
    try {
      const { data, error } = await supabase
        .from('expert_profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating expert profile:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error updating expert profile:', error)
      return null
    }
  }

  async getAll(limit = 20, offset = 0): Promise<ExpertProfile[]> {
    try {
      const { data, error } = await supabase
        .from('expert_profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error fetching expert profiles:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching expert profiles:', error)
      return []
    }
  }
}

export const expertService = new ExpertService()