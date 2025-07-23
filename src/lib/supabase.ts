import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client only if environment variables are available
export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  console.log('Checking Supabase configuration:');
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing');
  console.log('Supabase client:', supabase ? 'Created' : 'Not created');
  return supabase !== null;
};

// Database types for TypeScript
export interface AssessmentSubmission {
  id?: string;
  participant_name: string;
  practice_name: string;
  email: string;
  sales_confidence_before: number;
  selected_kpis: Array<{
    kpi: string;
    currentValue: string;
    goalValue: string;
  }>;
  selected_non_financial_kpis?: Array<{
    kpi: string;
    currentValue: string;
    goalValue: string;
    customKpiName?: string;
  }>;
  non_financial_metrics: string;
  revenue_forecast_confidence: string;
  job_descriptions_clarity: string;
  success_definition: string;
  created_at?: string;
  updated_at?: string;
}

export interface CoachingResult {
  id?: string;
  assessment_id: string;
  sales_confidence_after: number;
  kpi_progress: Array<{
    kpi: string;
    label: string;
    beforeValue: string;
    afterValue: string;
    unit: string;
    percentageChange: number;
    trend: 'up' | 'down' | 'stable';
    isPositive: boolean;
  }>;
  non_financial_improvements: string[];
  success_achievements: string[];
  coaching_score: number;
  completion_date: string;
  created_at?: string;
} 