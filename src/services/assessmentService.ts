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
    non_financial_kpi_updates?: any[];
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

// Comprehensive scoring function for baseline assessments and progress updates
export const calculateComprehensiveScore = (
  salesConfidenceBefore: number,
  salesConfidenceAfter: number,
  selectedKPIs: any[],
  kpiUpdates: any[],
  selectedNonFinancialKPIs: any[],
  nonFinancialKpiUpdates: any[],
  revenueForecastConfidence: string,
  jobDescriptionsClarity: string,
  improvements: string[],
  achievements: string[]
): number => {
  let score = 0;
  
  // Sales Confidence (35% of total score) - Highest weight
  const confidenceImprovement = salesConfidenceAfter - salesConfidenceBefore;
  const confidenceScore = Math.max(0, Math.min(35, 35 + (confidenceImprovement * 7)));
  score += confidenceScore;
  
  // Financial KPI Progress (30% of total score) - Second highest weight
  let financialKpiScore = 0;
  if (selectedKPIs.length > 0 && kpiUpdates.length > 0) {
    const kpiProgress = selectedKPIs.map((baselineKPI) => {
      const update = kpiUpdates.find(u => u.kpi === baselineKPI.kpi);
      if (update) {
        const baselineValue = parseFloat(baselineKPI.currentValue.replace(/[^0-9.]/g, ''));
        const currentValue = parseFloat(update.currentValue.replace(/[^0-9.]/g, ''));
        const goalValue = parseFloat(baselineKPI.goalValue.replace(/[^0-9.]/g, ''));
        
        if (baselineValue > 0 && goalValue > 0) {
          const progressTowardGoal = Math.min(1, (currentValue - baselineValue) / (goalValue - baselineValue));
          return Math.max(0, progressTowardGoal);
        }
      }
      return 0;
    });
    
    const averageKPIProgress = kpiProgress.reduce((sum, val) => sum + val, 0) / kpiProgress.length;
    financialKpiScore = averageKPIProgress * 30;
  }
  score += financialKpiScore;
  
  // Non-Financial KPI Progress (20% of total score) - Third weight
  let nonFinancialKpiScore = 0;
  if (selectedNonFinancialKPIs && selectedNonFinancialKPIs.length > 0 && nonFinancialKpiUpdates && nonFinancialKpiUpdates.length > 0) {
    const nonFinancialKpiProgress = selectedNonFinancialKPIs.map((baselineKPI) => {
      const update = nonFinancialKpiUpdates.find(u => u.kpi === baselineKPI.kpi);
      if (update) {
        const baselineValue = parseFloat(baselineKPI.currentValue.replace(/[^0-9.]/g, ''));
        const currentValue = parseFloat(update.currentValue.replace(/[^0-9.]/g, ''));
        const goalValue = parseFloat(baselineKPI.goalValue.replace(/[^0-9.]/g, ''));
        
        if (baselineValue > 0 && goalValue > 0) {
          const progressTowardGoal = Math.min(1, (currentValue - baselineValue) / (goalValue - baselineValue));
          return Math.max(0, progressTowardGoal);
        }
      }
      return 0;
    });
    
    const averageNonFinancialKpiProgress = nonFinancialKpiProgress.reduce((sum, val) => sum + val, 0) / nonFinancialKpiProgress.length;
    nonFinancialKpiScore = averageNonFinancialKpiProgress * 20;
  } else if (selectedNonFinancialKPIs && selectedNonFinancialKPIs.length > 0) {
    // Base score for having non-financial KPIs but no updates yet
    nonFinancialKpiScore = 5;
  }
  score += nonFinancialKpiScore;
  
  // Team & Operations (15% of total score) - Lowest weight
  let teamScore = 0;
  
  // Revenue Forecast Confidence (7.5%)
  const forecastScores: { [key: string]: number } = {
    'very-concerned': 0,
    'concerned': 3.75,
    'uncertain': 7.5,
    'somewhat-confident': 11.25,
    'very-confident': 15
  };
  teamScore += forecastScores[revenueForecastConfidence] || 0;
  
  // Job Descriptions Clarity (7.5%)
  const clarityScores: { [key: string]: number } = {
    'no-completely': 0,
    'mostly-no': 3.75,
    'partially': 7.5,
    'mostly-yes': 11.25,
    'yes-completely': 15
  };
  teamScore += clarityScores[jobDescriptionsClarity] || 0;
  
  score += teamScore;
  
  return Math.round(Math.min(100, Math.max(0, score)));
};

// Baseline assessment scoring function
export const calculateBaselineScore = (
  salesConfidence: number,
  selectedKPIs: any[],
  selectedNonFinancialKPIs: any[],
  revenueForecastConfidence: string,
  jobDescriptionsClarity: string
): number => {
  // For baseline, we use the same scoring system but with current values as both baseline and current
  const kpiUpdates = selectedKPIs.map(kpi => ({
    kpi: kpi.kpi,
    currentValue: kpi.currentValue,
    goalValue: kpi.goalValue
  }));
  
  const nonFinancialKpiUpdates = selectedNonFinancialKPIs.map(kpi => ({
    kpi: kpi.kpi,
    currentValue: kpi.currentValue,
    goalValue: kpi.goalValue
  }));
  
  return calculateComprehensiveScore(
    salesConfidence,
    salesConfidence, // Same as before for baseline
    selectedKPIs,
    kpiUpdates,
    selectedNonFinancialKPIs,
    nonFinancialKpiUpdates,
    revenueForecastConfidence,
    jobDescriptionsClarity,
    [], // No improvements for baseline
    []  // No achievements for baseline
  );
}; 