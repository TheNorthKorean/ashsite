import { supabase, isSupabaseConfigured, AssessmentSubmission, CoachingResult } from '../lib/supabase';

export class AssessmentService {
  // Submit a new assessment
  static async submitAssessment(assessmentData: Omit<AssessmentSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<{ id: string; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { id: '', error: 'Supabase is not configured. Please set up your environment variables.' };
    }

    try {
      const { data, error } = await supabase!
        .from('assessment_submissions')
        .insert([assessmentData])
        .select('id')
        .single();

      if (error) {
        console.error('Error submitting assessment:', error);
        return { id: '', error: error.message };
      }

      return { id: data.id };
    } catch (error) {
      console.error('Error submitting assessment:', error);
      return { id: '', error: 'Failed to submit assessment' };
    }
  }

  // Get assessment by ID
  static async getAssessment(id: string): Promise<{ data: AssessmentSubmission | null; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured. Please set up your environment variables.' };
    }

    try {
      const { data, error } = await supabase!
        .from('assessment_submissions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching assessment:', error);
        return { data: null, error: error.message };
      }

      return { data };
    } catch (error) {
      console.error('Error fetching assessment:', error);
      return { data: null, error: 'Failed to fetch assessment' };
    }
  }

  // Get assessment by email
  static async getAssessmentByEmail(email: string): Promise<{ data: AssessmentSubmission | null; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured. Please set up your environment variables.' };
    }

    try {
      const { data, error } = await supabase!
        .from('assessment_submissions')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching assessment by email:', error);
        return { data: null, error: error.message };
      }

      return { data };
    } catch (error) {
      console.error('Error fetching assessment by email:', error);
      return { data: null, error: 'Failed to fetch assessment' };
    }
  }

  // Submit coaching results
  static async submitResults(resultsData: Omit<CoachingResult, 'id' | 'created_at'>): Promise<{ id: string; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { id: '', error: 'Supabase is not configured. Please set up your environment variables.' };
    }

    try {
      const { data, error } = await supabase!
        .from('coaching_results')
        .insert([resultsData])
        .select('id')
        .single();

      if (error) {
        console.error('Error submitting results:', error);
        return { id: '', error: error.message };
      }

      return { id: data.id };
    } catch (error) {
      console.error('Error submitting results:', error);
      return { id: '', error: 'Failed to submit results' };
    }
  }

  // Get coaching results by assessment ID
  static async getResults(assessmentId: string): Promise<{ data: CoachingResult | null; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured. Please set up your environment variables.' };
    }

    try {
      const { data, error } = await supabase!
        .from('coaching_results')
        .select('*')
        .eq('assessment_id', assessmentId)
        .single();

      if (error) {
        console.error('Error fetching results:', error);
        return { data: null, error: error.message };
      }

      return { data };
    } catch (error) {
      console.error('Error fetching results:', error);
      return { data: null, error: 'Failed to fetch results' };
    }
  }

  // Get all assessments (for admin purposes)
  static async getAllAssessments(): Promise<{ data: AssessmentSubmission[] | null; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured. Please set up your environment variables.' };
    }

    try {
      const { data, error } = await supabase!
        .from('assessment_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all assessments:', error);
        return { data: null, error: error.message };
      }

      return { data };
    } catch (error) {
      console.error('Error fetching all assessments:', error);
      return { data: null, error: 'Failed to fetch assessments' };
    }
  }

  // Update assessment
  static async updateAssessment(id: string, updates: Partial<AssessmentSubmission>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase is not configured. Please set up your environment variables.' };
    }

    try {
      const { error } = await supabase!
        .from('assessment_submissions')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating assessment:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating assessment:', error);
      return { success: false, error: 'Failed to update assessment' };
    }
  }

  // Submit progress update
  static async submitProgressUpdate(progressData: {
    assessment_id: string;
    week_number: number;
    sales_confidence_after: number;
    kpi_updates: any[];
    revenue_forecast_confidence?: string;
    job_descriptions_clarity?: string;
    new_improvements: string[];
    new_achievements: string[];
    notes: string;
    current_score: number;
    updated_at: string;
  }): Promise<{ id: string; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { id: '', error: 'Supabase is not configured. Please set up your environment variables.' };
    }

    try {
      const { data, error } = await supabase!
        .from('progress_updates')
        .insert([progressData])
        .select('id')
        .single();

      if (error) {
        console.error('Error submitting progress update:', error);
        return { id: '', error: error.message };
      }

      return { id: data.id };
    } catch (error) {
      console.error('Error submitting progress update:', error);
      return { id: '', error: 'Failed to submit progress update' };
    }
  }

  // Get progress updates for an assessment
  static async getProgressUpdates(assessmentId: string): Promise<{ data: any[] | null; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured. Please set up your environment variables.' };
    }

    try {
      const { data, error } = await supabase!
        .from('progress_updates')
        .select('*')
        .eq('assessment_id', assessmentId)
        .order('week_number', { ascending: true });

      if (error) {
        console.error('Error fetching progress updates:', error);
        return { data: null, error: error.message };
      }

      return { data };
    } catch (error) {
      console.error('Error fetching progress updates:', error);
      return { data: null, error: 'Failed to fetch progress updates' };
    }
  }

  // Get latest progress update for an assessment
  static async getLatestProgressUpdate(assessmentId: string): Promise<{ data: any | null; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured. Please set up your environment variables.' };
    }

    try {
      const { data, error } = await supabase!
        .from('progress_updates')
        .select('*')
        .eq('assessment_id', assessmentId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching latest progress update:', error);
        return { data: null, error: error.message };
      }

      return { data };
    } catch (error) {
      console.error('Error fetching latest progress update:', error);
      return { data: null, error: 'Failed to fetch latest progress update' };
    }
  }
} 