import { supabase } from '../lib/supabase';
import type { ExpertImportData, ImportResult } from '../types/expert';

export class ExpertImportService {
  async importExperts(data: ExpertImportData[], batchId?: string): Promise<ImportResult> {
    const result: ImportResult = {
      imported: 0,
      skipped: 0,
      errors: [],
      batchId: batchId || `import_${Date.now()}`
    };

    try {
      console.log(`Starting import of ${data.length} experts...`);

      for (const expertData of data) {
        try {
          // Check if expert already exists by email
          const { data: existing } = await supabase
            .from('experts')
            .select('id')
            .eq('email', expertData.email)
            .single();

          if (existing) {
            console.log(`Skipping existing expert: ${expertData.email}`);
            result.skipped++;
            continue;
          }

          // Prepare data for insertion
          const insertData = {
            name: expertData.name,
            email: expertData.email,
            phone: expertData.phone || null,
            profile_image_url: expertData.profile_image_url || null,
            expert_type: expertData.expert_type,
            bio: expertData.bio || null,
            skills: expertData.skills || [],
            years_experience: expertData.years_experience || 0,
            city: expertData.city || null,
            country: expertData.country,
            price_range: expertData.price_range || null,
            hourly_rate: expertData.hourly_rate || null,
            follower_count: expertData.follower_count || 0,
            engagement_rate: expertData.engagement_rate || 0,
            client_count: expertData.client_count || 0,
            website_url: expertData.website_url || null,
            linkedin_url: expertData.linkedin_url || null,
            social_media_urls: expertData.social_media_urls || {},
            verified: expertData.verified || false,
            active: true,
            languages: expertData.languages || ['English'],
            response_time_hours: expertData.response_time_hours || 24,
            import_batch_id: result.batchId
          };

          // Insert expert
          const { error } = await supabase
            .from('experts')
            .insert(insertData);

          if (error) {
            console.error(`Error importing ${expertData.email}:`, error);
            result.errors.push(`${expertData.email}: ${error.message}`);
          } else {
            console.log(`Successfully imported: ${expertData.email}`);
            result.imported++;
          }
        } catch (error: any) {
          console.error(`Error processing ${expertData.email}:`, error);
          result.errors.push(`${expertData.email}: ${error.message}`);
        }
      }

      console.log(`Import completed: ${result.imported} imported, ${result.skipped} skipped, ${result.errors.length} errors`);
    } catch (error: any) {
      console.error('Import failed:', error);
      result.errors.push(`Import failed: ${error.message}`);
    }

    return result;
  }

  async importFromCSV(csvContent: string): Promise<ImportResult> {
    try {
      const lines = csvContent.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const data: ExpertImportData[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length < headers.length) continue;

        const expertData: any = {};
        headers.forEach((header, index) => {
          expertData[header] = values[index];
        });

        // Convert string arrays and numbers
        if (expertData.skills) {
          expertData.skills = expertData.skills.split(';').map((s: string) => s.trim());
        }
        if (expertData.languages) {
          expertData.languages = expertData.languages.split(';').map((l: string) => l.trim());
        }
        if (expertData.years_experience) {
          expertData.years_experience = parseInt(expertData.years_experience);
        }
        if (expertData.hourly_rate) {
          expertData.hourly_rate = parseFloat(expertData.hourly_rate);
        }
        if (expertData.follower_count) {
          expertData.follower_count = parseInt(expertData.follower_count);
        }
        if (expertData.engagement_rate) {
          expertData.engagement_rate = parseFloat(expertData.engagement_rate);
        }
        if (expertData.client_count) {
          expertData.client_count = parseInt(expertData.client_count);
        }
        if (expertData.response_time_hours) {
          expertData.response_time_hours = parseInt(expertData.response_time_hours);
        }
        if (expertData.verified) {
          expertData.verified = expertData.verified.toLowerCase() === 'true';
        }

        data.push(expertData);
      }

      return await this.importExperts(data);
    } catch (error: any) {
      return {
        imported: 0,
        skipped: 0,
        errors: [`CSV parsing failed: ${error.message}`],
        batchId: `failed_${Date.now()}`
      };
    }
  }

  async clearAllExperts(): Promise<{ deleted: number; error?: string }> {
    try {
      const { count, error } = await supabase
        .from('experts')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (error) {
        return { deleted: 0, error: error.message };
      }

      return { deleted: count || 0 };
    } catch (error: any) {
      return { deleted: 0, error: error.message };
    }
  }

  async getImportStats(): Promise<{
    total: number;
    seo: number;
    influencer: number;
    verified: number;
    countries: string[];
  }> {
    try {
      const { data, error } = await supabase
        .from('experts')
        .select('expert_type, verified, country')
        .eq('active', true);

      if (error) throw error;

      const stats = {
        total: data?.length || 0,
        seo: data?.filter(e => e.expert_type === 'seo').length || 0,
        influencer: data?.filter(e => e.expert_type === 'influencer').length || 0,
        verified: data?.filter(e => e.verified).length || 0,
        countries: [...new Set(data?.map(e => e.country) || [])].sort()
      };

      return stats;
    } catch (error) {
      console.error('Error getting import stats:', error);
      return {
        total: 0,
        seo: 0,
        influencer: 0,
        verified: 0,
        countries: []
      };
    }
  }
}

export const expertImportService = new ExpertImportService();