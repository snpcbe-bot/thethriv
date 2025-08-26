import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { userService } from '../services/userService';
import { businessService } from '../services/businessService';
import { expertService } from '../services/expertService';
import { subscriptionService } from '../services/subscriptionService';
import type { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (signUpData: any) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const userProfile = await userService.getByUserId(userId);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Update online status
      if (data.user) {
        await userService.updateOnlineStatus(data.user.id, true);
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (signUpData: any) => {
    setLoading(true);
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
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user account');

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
      });

      if (!userProfile) throw new Error('Failed to create user profile');

      // 3. Create role-specific profile
      if (signUpData.role === 'business' && signUpData.company_name) {
        await businessService.create({
          user_id: authData.user.id,
          company_name: signUpData.company_name,
          industry: signUpData.industry,
          company_size: signUpData.company_size,
          website: signUpData.website
        });
      } else if (signUpData.role === 'expert' && signUpData.expertise) {
        await expertService.create({
          user_id: authData.user.id,
          skills: [signUpData.expertise],
          bio: signUpData.bio,
          hourly_rate: signUpData.hourly_rate,
          portfolio_url: signUpData.portfolio_url,
          verified: false
        });
      }

      // 4. Create subscription if not free plan
      if (signUpData.plan !== 'free') {
        const periodEnd = new Date();
        if (signUpData.plan === 'weekly') {
          periodEnd.setDate(periodEnd.getDate() + 7);
        } else if (signUpData.plan === 'monthly') {
          periodEnd.setMonth(periodEnd.getMonth() + 1);
        } else if (signUpData.plan === 'yearly') {
          periodEnd.setFullYear(periodEnd.getFullYear() + 1);
        }

        await subscriptionService.create({
          user_id: authData.user.id,
          plan: signUpData.plan,
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: periodEnd.toISOString()
        });
      }

      return { data: authData, error: null };
    } catch (error) {
      setLoading(false);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Update online status before signing out
      if (user) {
        await userService.updateOnlineStatus(user.id, false);
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const updatedProfile = await userService.updateProfile(user.id, updates);
      setProfile(updatedProfile);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };