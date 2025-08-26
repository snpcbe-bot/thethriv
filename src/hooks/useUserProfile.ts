import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { userProfileService, businessProfileService, expertProfileService } from '../lib/database';
import type { UserProfile, BusinessProfile, ExpertProfile } from '../types';

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [expertProfile, setExpertProfile] = useState<ExpertProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setBusinessProfile(null);
      setExpertProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user profile
        const userProfile = await userProfileService.getByUserId(user.id);
        setProfile(userProfile);

        if (userProfile) {
          // Fetch role-specific profile
          if (userProfile.role === 'business') {
            const bizProfile = await businessProfileService.getByUserId(user.id);
            setBusinessProfile(bizProfile);
          } else if (userProfile.role === 'expert') {
            const expProfile = await expertProfileService.getByUserId(user.id);
            setExpertProfile(expProfile);
          }
        }
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return null;

    try {
      const updated = await userProfileService.update(profile.id, updates);
      if (updated) {
        setProfile(updated);
      }
      return updated;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      return null;
    }
  };

  const updateBusinessProfile = async (updates: Partial<BusinessProfile>) => {
    if (!businessProfile) return null;

    try {
      const updated = await businessProfileService.update(businessProfile.id, updates);
      if (updated) {
        setBusinessProfile(updated);
      }
      return updated;
    } catch (err) {
      console.error('Error updating business profile:', err);
      setError('Failed to update business profile');
      return null;
    }
  };

  const updateExpertProfile = async (updates: Partial<ExpertProfile>) => {
    if (!expertProfile) return null;

    try {
      const updated = await expertProfileService.update(expertProfile.id, updates);
      if (updated) {
        setExpertProfile(updated);
      }
      return updated;
    } catch (err) {
      console.error('Error updating expert profile:', err);
      setError('Failed to update expert profile');
      return null;
    }
  };

  return {
    profile,
    businessProfile,
    expertProfile,
    loading,
    error,
    updateProfile,
    updateBusinessProfile,
    updateExpertProfile,
    isBusinessUser: profile?.role === 'business',
    isExpertUser: profile?.role === 'expert',
    isVerified: profile?.verified || false
  };
};