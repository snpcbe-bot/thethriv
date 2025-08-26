import { supabase } from '../lib/supabase'
import type { UserSubscription } from '../types'

export class SubscriptionService {
  async create(data: Partial<UserSubscription>): Promise<UserSubscription | null> {
    try {
      const { data: subscription, error } = await supabase
        .from('user_subscriptions')
        .insert(data)
        .select()
        .single()

      if (error) {
        console.error('Error creating subscription:', error)
        return null
      }
      return subscription
    } catch (error) {
      console.error('Error creating subscription:', error)
      return null
    }
  }

  async getByUserId(userId: string): Promise<UserSubscription | null> {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()

      if (error) {
        console.error('Error fetching subscription:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error fetching subscription:', error)
      return null
    }
  }

  async update(id: string, updates: Partial<UserSubscription>): Promise<UserSubscription | null> {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating subscription:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error updating subscription:', error)
      return null
    }
  }

  async cancel(subscriptionId: string): Promise<UserSubscription | null> {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', subscriptionId)
        .select()
        .single()

      if (error) {
        console.error('Error cancelling subscription:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      return null
    }
  }

  async reactivate(subscriptionId: string, newPeriodEnd: string): Promise<UserSubscription | null> {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .update({ 
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: newPeriodEnd,
          updated_at: new Date().toISOString()
        })
        .eq('id', subscriptionId)
        .select()
        .single()

      if (error) {
        console.error('Error reactivating subscription:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error reactivating subscription:', error)
      return null
    }
  }
}

export const subscriptionService = new SubscriptionService()