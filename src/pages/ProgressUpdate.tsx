import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  CheckCircle, 
  Calendar,
  Target,
  BarChart3,
  Users,
  Award,
  Star,
  Plus
} from 'lucide-react';
import { AssessmentService, calculateComprehensiveScore } from '../services/assessmentService';

interface ProgressData {
  practiceName: string;
  email: string;
  weekNumber: number;
  salesConfidenceAfter: number;
  kpiUpdates: Array<{
    kpi: string;
    currentValue: string;
    goalValue: string;
  }>;
  nonFinancialKpiUpdates: Array<{
    kpi: string;
    currentValue: string;
    goalValue: string;
  }>;
  revenueForecastConfidence: string;
  jobDescriptionsClarity: string;
  newImprovements: string[];
  newAchievements: string[];
  notes: string;
}

const ProgressUpdate = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<'lookup' | 'options' | 'input' | 'results'>('lookup');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingAssessment, setExistingAssessment] = useState<any>(null);
  
  // Custom popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'improvement' | 'achievement'>('improvement');
  const [popupInput, setPopupInput] = useState('');
  
  // Form validation state
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  
  // Scroll to top when component mounts and check for step parameter
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if we should start at a specific step
    const stepParam = searchParams.get('step');
    const assessmentId = searchParams.get('assessmentId');
    
    if (stepParam === 'options' && assessmentId) {
      // Load assessment data and show options step
      loadAssessmentData(assessmentId);
    } else if (stepParam === 'options') {
      setCurrentStep('options');
    }
  }, [searchParams]);
  
  // Function to load assessment data by ID
  const loadAssessmentData = async (assessmentId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: assessment, error } = await AssessmentService.getAssessment(assessmentId);
      
      if (error || !assessment) {
        setError('Unable to load assessment data. Please try again.');
        setCurrentStep('lookup');
        return;
      }
      
      setExistingAssessment(assessment);
      setProgressData(prev => ({
        ...prev,
        practiceName: assessment.practice_name,
        email: assessment.email,
        salesConfidenceAfter: assessment.sales_confidence_before
      }));
      setCurrentStep('options');
    } catch (error) {
      setError('An error occurred while loading your assessment data.');
      setCurrentStep('lookup');
    } finally {
      setIsLoading(false);
    }
  };
  
  const [progressData, setProgressData] = useState<ProgressData>({
    practiceName: '',
    email: '',
    weekNumber: 1,
    salesConfidenceAfter: 3,
    kpiUpdates: [],
    nonFinancialKpiUpdates: [],
    revenueForecastConfidence: '',
    jobDescriptionsClarity: '',
    newImprovements: [],
    newAchievements: [],
    notes: ''
  });

  const kpiOptions = [
    { value: 'monthly_revenue', label: 'Monthly Revenue' },
    { value: 'conversion_rate', label: 'Conversion Rate' },
    { value: 'average_transaction', label: 'Average Transaction' },
    { value: 'new_clients', label: 'New Client Acquisition' },
    { value: 'client_retention', label: 'Client Retention Rate' },
    { value: 'appointment_show_rate', label: 'Appointment Show Rate' },
    { value: 'treatment_frequency', label: 'Treatment Frequency' },
    { value: 'referral_rate', label: 'Referral Rate' },
    { value: 'profit_margin', label: 'Profit Margin' },
    { value: 'consultation_bookings', label: 'Consultation Bookings' }
  ];

  const improvementSuggestions = [
    'Increased team confidence in sales conversations',
    'Enhanced patient consultation experience',
    'Improved treatment recommendation clarity',
    'Better objection handling techniques',
    'Strengthened patient-provider relationships',
    'More effective follow-up processes',
    'Improved team communication',
    'Enhanced treatment planning process',
    'Better patient education materials',
    'Streamlined appointment scheduling'
  ];

  const achievementSuggestions = [
    'Exceeded monthly revenue goal',
    'Achieved highest conversion rate in practice history',
    'Implemented systematic sales process',
    'Trained entire team on new consultation framework',
    'Established KPI tracking system',
    'Improved patient satisfaction scores',
    'Reduced no-show rates',
    'Increased average transaction value',
    'Launched successful marketing campaign',
    'Expanded service offerings'
  ];



  // Handle lookup form submission
  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: assessment, error } = await AssessmentService.getAssessmentByEmail(progressData.email);
      
      if (error) {
        setError('No assessment found with that email address. Please check your email or complete a new assessment.');
        return;
      }

      if (assessment && assessment.practice_name.toLowerCase() === progressData.practiceName.toLowerCase()) {
        console.log('Assessment found:', assessment);
        setExistingAssessment(assessment);
        setProgressData(prev => ({
          ...prev,
          practiceName: assessment.practice_name,
          email: assessment.email,
          salesConfidenceAfter: assessment.sales_confidence_before // Start with baseline
        }));
        setCurrentStep('options');
      } else {
        setError('Practice name does not match our records. Please check your practice name.');
      }
    } catch (error) {
      setError('An error occurred while looking up your assessment.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle progress submission
  const handleProgressSubmit = async () => {
    console.log('handleProgressSubmit called');
    console.log('progressData:', progressData);
    console.log('existingAssessment:', existingAssessment);
    
    // Set flag to show validation messages
    setHasAttemptedSubmit(true);
    
    // Validate required fields
    if (!progressData.revenueForecastConfidence) {
      setError('Please select your revenue forecast confidence level.');
      return;
    }
    
    if (!progressData.jobDescriptionsClarity) {
      setError('Please select your job descriptions clarity level.');
      return;
    }
    
    // Validate KPI updates if they exist
    if (existingAssessment.selected_kpis && existingAssessment.selected_kpis.length > 0) {
      const missingKPIs = existingAssessment.selected_kpis.filter((kpi: any) => {
        const update = progressData.kpiUpdates.find(u => u.kpi === kpi.kpi);
        return !update || !update.currentValue;
      });
      
      if (missingKPIs.length > 0) {
        setError(`Please fill in current values for all KPI updates: ${missingKPIs.map((kpi: any) => kpi.kpi.replace(/_/g, ' ')).join(', ')}`);
        return;
      }
    }

    // Validate Non-Financial KPI updates if they exist
    if (existingAssessment.selected_non_financial_kpis && existingAssessment.selected_non_financial_kpis.length > 0) {
      try {
        const nonFinancialKPIs = existingAssessment.selected_non_financial_kpis;
        if (nonFinancialKPIs && nonFinancialKPIs.length > 0) {
          const missingNonFinancialKPIs = nonFinancialKPIs.filter((kpi: any) => {
            const update = progressData.nonFinancialKpiUpdates.find(u => u.kpi === kpi.kpi);
            return !update || !update.currentValue;
          });
          
          if (missingNonFinancialKPIs.length > 0) {
            setError(`Please fill in current values for all Non-Financial KPI updates: ${missingNonFinancialKPIs.map((kpi: any) => {
              const nonFinancialKpiLabels: { [key: string]: string } = {
                'team_confidence': 'Team Sales Confidence',
                'patient_satisfaction': 'Patient Satisfaction Score',
                'consultation_quality': 'Consultation Quality Score',
                'treatment_adherence': 'Treatment Plan Adherence',
                'staff_productivity': 'Staff Productivity Score',
                'response_time': 'Inquiry Response Time',
                'online_reviews': 'Online Review Rating',
                'social_engagement': 'Social Media Engagement Rate',
                'staff_retention': 'Staff Retention Rate',
                'training_completion': 'Training Completion Rate',
                'customer_complaints': 'Customer Complaint Rate',
                'custom_nf': kpi.customKpiName || 'Custom Non-Financial KPI'
              };
              return nonFinancialKpiLabels[kpi.kpi] || kpi.kpi;
            }).join(', ')}`);
            return;
          }
        }
      } catch (e) {
        console.error('Error parsing non-financial metrics:', e);
      }
    }
    
    setIsLoading(true);
    setError(null);

    try {
      // Fetch all previous progress updates to accumulate improvements and achievements
      const { data: allProgress, error: progressError } = await AssessmentService.getProgressUpdates(existingAssessment.id);
      
      let allImprovements: string[] = [];
      let allAchievements: string[] = [];

      // Accumulate all previous improvements and achievements
      if (allProgress && !progressError) {
        allProgress.forEach(progress => {
          if (progress.new_improvements && Array.isArray(progress.new_improvements)) {
            allImprovements = [...allImprovements, ...progress.new_improvements];
          }
          if (progress.new_achievements && Array.isArray(progress.new_achievements)) {
            allAchievements = [...allAchievements, ...progress.new_achievements];
          }
        });
      }

      // Add new improvements and achievements
      allImprovements = [...allImprovements, ...progressData.newImprovements];
      allAchievements = [...allAchievements, ...progressData.newAchievements];

      // Remove duplicates while preserving order
      allImprovements = [...new Set(allImprovements)];
      allAchievements = [...new Set(allAchievements)];

      // Calculate current score using comprehensive scoring system
      const currentScore = calculateComprehensiveScore(
        existingAssessment.sales_confidence_before,
        progressData.salesConfidenceAfter,
        existingAssessment.selected_kpis || [],
        progressData.kpiUpdates,
        existingAssessment.selected_non_financial_kpis || [],
        progressData.nonFinancialKpiUpdates,
        progressData.revenueForecastConfidence,
        progressData.jobDescriptionsClarity,
        allImprovements,
        allAchievements
      );

      // Prepare progress data
      const progressUpdate = {
        assessment_id: existingAssessment.id,
        week_number: progressData.weekNumber,
        sales_confidence_after: progressData.salesConfidenceAfter,
        kpi_updates: progressData.kpiUpdates,
        non_financial_kpi_updates: progressData.nonFinancialKpiUpdates,
        revenue_forecast_confidence: progressData.revenueForecastConfidence,
        job_descriptions_clarity: progressData.jobDescriptionsClarity,
        new_improvements: progressData.newImprovements, // Only save new ones for this week
        new_achievements: progressData.newAchievements, // Only save new ones for this week
        notes: progressData.notes,
        current_score: currentScore,
        updated_at: new Date().toISOString()
      };

      console.log('Saving progress update:', progressUpdate);
      console.log('KPI updates being saved:', progressData.kpiUpdates);

      // Submit progress update
      const { id: progressId, error } = await AssessmentService.submitProgressUpdate(progressUpdate);
      
      console.log('Progress update submitted. ID:', progressId, 'Error:', error);
      
      if (error) {
        console.error('Database error details:', error);
        setError(`Failed to save progress: ${error}`);
        return;
      }

      // Prepare notes data
      const notesData = progressData.notes ? [{
        text: progressData.notes,
        date: new Date().toISOString()
      }] : [];

      console.log('Notes data being prepared:', notesData);
      console.log('Notes JSON string:', JSON.stringify(notesData));

      // Navigate to updated results with accumulated data
      const params = new URLSearchParams({
        view: 'results',
        assessmentId: existingAssessment.id,
        progressId: progressId,
        participantName: existingAssessment.participant_name,
        practiceName: existingAssessment.practice_name,
        salesConfidenceBefore: existingAssessment.sales_confidence_before.toString(),
        salesConfidenceAfter: progressData.salesConfidenceAfter.toString(),
        currentScore: currentScore.toString(),
        weekNumber: progressData.weekNumber.toString(),
        lastUpdated: new Date().toISOString(),
        // Add accumulated progress data
        newImprovements: JSON.stringify(allImprovements),
        newAchievements: JSON.stringify(allAchievements),
        kpiUpdates: JSON.stringify(progressData.kpiUpdates),
        nonFinancialKpiUpdates: JSON.stringify(progressData.nonFinancialKpiUpdates),
        notes: JSON.stringify(notesData)
      });

      console.log('About to navigate to:', `/coaching-demo?${params.toString()}`);
      console.log('Full URL length:', `/coaching-demo?${params.toString()}`.length);
      console.log('Notes parameter in URL:', params.get('notes'));
      navigate(`/coaching-demo?${params.toString()}`);
    } catch (error) {
      console.error('Error in handleProgressSubmit:', error);
      setError('An error occurred while saving your progress.');
    } finally {
      setIsLoading(false);
    }
  };

  const addImprovement = () => {
    setPopupType('improvement');
    setPopupInput('');
    setShowPopup(true);
  };

  const addAchievement = () => {
    setPopupType('achievement');
    setPopupInput('');
    setShowPopup(true);
  };

  const handlePopupSubmit = () => {
    if (popupInput && popupInput.trim()) {
      if (popupType === 'improvement') {
        setProgressData(prev => ({
          ...prev,
          newImprovements: [...prev.newImprovements, popupInput.trim()]
        }));
      } else {
        setProgressData(prev => ({
          ...prev,
          newAchievements: [...prev.newAchievements, popupInput.trim()]
        }));
      }
    }
    setShowPopup(false);
    setPopupInput('');
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
    setPopupInput('');
  };

  const removeImprovement = (index: number) => {
    setProgressData(prev => ({
      ...prev,
      newImprovements: prev.newImprovements.filter((_, i) => i !== index)
    }));
  };

  const removeAchievement = (index: number) => {
    setProgressData(prev => ({
      ...prev,
      newAchievements: prev.newAchievements.filter((_, i) => i !== index)
    }));
  };

  // Handle viewing current results
  const handleViewResults = async () => {
    console.log('handleViewResults called');
    setIsLoading(true);
    setError(null);

    try {
      // Fetch all progress updates to accumulate improvements and achievements
      const { data: allProgress, error: progressError } = await AssessmentService.getProgressUpdates(existingAssessment.id);
      
      console.log('All progress updates:', allProgress);
      console.log('Progress error:', progressError);
      
      let currentScore = 60; // Default baseline score
      let salesConfidenceAfter = existingAssessment.sales_confidence_before;
      let allImprovements: string[] = [];
      let allAchievements: string[] = [];
      let lastUpdated = existingAssessment.created_at;
      let latestKpiUpdates: any[] = [];
      let latestNonFinancialKpiUpdates: any[] = [];
      let latestProgressId = '';
      let weekNumber = 0;

      if (allProgress && !progressError && allProgress.length > 0) {
        // Get the latest progress for score and confidence
        const latestProgress = allProgress[allProgress.length - 1];
        console.log('Latest progress:', latestProgress);
        
        currentScore = latestProgress.current_score;
        salesConfidenceAfter = latestProgress.sales_confidence_after;
        lastUpdated = latestProgress.updated_at;
        latestKpiUpdates = latestProgress.kpi_updates || [];
        latestNonFinancialKpiUpdates = latestProgress.non_financial_kpi_updates || [];
        latestProgressId = latestProgress.id || '';
        weekNumber = latestProgress.week_number || 0;

        // Accumulate all improvements and achievements from all progress updates
        allProgress.forEach(progress => {
          if (progress.new_improvements && Array.isArray(progress.new_improvements)) {
            allImprovements = [...allImprovements, ...progress.new_improvements];
          }
          if (progress.new_achievements && Array.isArray(progress.new_achievements)) {
            allAchievements = [...allAchievements, ...progress.new_achievements];
          }
        });

        // Remove duplicates while preserving order
        allImprovements = [...new Set(allImprovements)];
        allAchievements = [...new Set(allAchievements)];
      }

      // Prepare notes data from all progress updates
      const allNotes: Array<{ text: string; date: string }> = [];
      if (allProgress && !progressError) {
        allProgress.forEach(progress => {
          if (progress.notes && progress.notes.trim()) {
            allNotes.push({
              text: progress.notes,
              date: progress.updated_at
            });
          }
        });
      }
      
      console.log('All progress updates:', allProgress);
      console.log('All notes collected:', allNotes);
      console.log('Notes being passed to results:', JSON.stringify(allNotes));
      console.log('Latest KPI updates:', latestKpiUpdates);
      console.log('Latest Non-Financial KPI updates:', latestNonFinancialKpiUpdates);

      // Get previous progress for proper before/after comparison
      let previousKpiUpdates: any[] = [];
      let previousNonFinancialKpiUpdates: any[] = [];
      
      if (allProgress && allProgress.length > 1) {
        // Get the second-to-last progress update for "before" values
        const previousProgress = allProgress[allProgress.length - 2];
        previousKpiUpdates = previousProgress.kpi_updates || [];
        previousNonFinancialKpiUpdates = previousProgress.non_financial_kpi_updates || [];
      } else {
        // If this is the first progress update, use baseline values as "before"
        previousKpiUpdates = (existingAssessment.selected_kpis || []).map((kpi: any) => ({
          kpi: kpi.kpi,
          currentValue: kpi.currentValue
        }));
        previousNonFinancialKpiUpdates = (existingAssessment.selected_non_financial_kpis || []).map((kpi: any) => ({
          kpi: kpi.kpi,
          currentValue: kpi.currentValue
        }));
      }

      // Format KPI updates to show proper progression
      const formattedKpiUpdates = latestKpiUpdates.map((kpiUpdate: any) => {
        const previousUpdate = previousKpiUpdates.find(prev => prev.kpi === kpiUpdate.kpi);
        const baselineKpi = (existingAssessment.selected_kpis || []).find((kpi: any) => kpi.kpi === kpiUpdate.kpi);
        
        return {
          kpi: kpiUpdate.kpi,
          currentValue: kpiUpdate.currentValue,
          goalValue: kpiUpdate.goalValue || baselineKpi?.goalValue || kpiUpdate.currentValue,
          // Use previous progress value as "before", or baseline if first update
          beforeValue: previousUpdate?.currentValue || baselineKpi?.currentValue || kpiUpdate.currentValue
        };
      });

      // Format Non-Financial KPI updates with proper previousValue for comparison
      const formattedNonFinancialKpiUpdates = latestNonFinancialKpiUpdates.map((kpiUpdate: any) => {
        const previousUpdate = previousNonFinancialKpiUpdates.find(prev => prev.kpi === kpiUpdate.kpi);
        const baselineKpi = (existingAssessment.selected_non_financial_kpis || []).find((kpi: any) => kpi.kpi === kpiUpdate.kpi);
        
        return {
          kpi: kpiUpdate.kpi,
          currentValue: kpiUpdate.currentValue,
          goalValue: kpiUpdate.goalValue || baselineKpi?.goalValue || kpiUpdate.currentValue,
          // Use previous progress value as "before", or baseline if first update
          previousValue: previousUpdate?.currentValue || baselineKpi?.currentValue || kpiUpdate.currentValue
        };
      });

      // Navigate to results with accumulated data
      const params = new URLSearchParams({
        view: 'results',
        assessmentId: existingAssessment.id,
        progressId: latestProgressId, // Add progress ID to indicate this is a progress update
        participantName: existingAssessment.participant_name,
        practiceName: existingAssessment.practice_name,
        salesConfidenceBefore: existingAssessment.sales_confidence_before.toString(),
        salesConfidenceAfter: salesConfidenceAfter.toString(),
        currentScore: currentScore.toString(),
        weekNumber: weekNumber.toString(),
        lastUpdated: lastUpdated,
        // Add accumulated progress data
        newImprovements: JSON.stringify(allImprovements),
        newAchievements: JSON.stringify(allAchievements),
        kpiUpdates: JSON.stringify(formattedKpiUpdates),
        nonFinancialKpiUpdates: JSON.stringify(formattedNonFinancialKpiUpdates),
        notes: JSON.stringify(allNotes)
      });

      console.log('Navigating to:', `/coaching-demo?${params.toString()}`);
      navigate(`/coaching-demo?${params.toString()}`);
    } catch (error) {
      console.error('Error in handleViewResults:', error);
      setError('An error occurred while loading your results.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 pt-12">
      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mt-10 text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight py-2">
            <span className="bg-white bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              Weekly Progress Update
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-4xl mx-auto">
            Track your weekly progress and see how your coaching journey is transforming your practice.
          </p>
        </motion.div>

        {/* Lookup Form */}
        {currentStep === 'lookup' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Find Your Assessment</h3>
            <p className="text-white/70 mb-6">Enter your practice name and email to access your progress tracking.</p>
            
            <form onSubmit={handleLookup} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Practice Name *</label>
                <input
                  type="text"
                  value={progressData.practiceName}
                  onChange={(e) => setProgressData(prev => ({ ...prev, practiceName: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-white/50"
                  placeholder="Enter your practice name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Email Address *</label>
                <input
                  type="email"
                  value={progressData.email}
                  onChange={(e) => setProgressData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-white/50"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isLoading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:shadow-lg hover:shadow-blue-400/25'
                }`}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Looking up...</span>
                  </>
                ) : (
                  <>
                    <span>Find My Assessment</span>
                    <TrendingUp size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Options Step */}
        {currentStep === 'options' && existingAssessment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 mb-10"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">Welcome back, {existingAssessment.participant_name}!</h3>
              <p className="text-white/70">What would you like to do today?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* View Results Option */}
              <motion.button
                onClick={() => {
                  console.log('View Results clicked');
                  console.log('existingAssessment:', existingAssessment);
                  handleViewResults();
                }}
                disabled={isLoading}
                className={`p-8 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center space-y-4 ${
                  isLoading
                    ? 'border-gray-600 bg-gray-800/50 cursor-not-allowed'
                    : 'border-blue-400/30 bg-white/5 hover:border-blue-400 hover:bg-white/10 cursor-pointer'
                }`}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-400/50 rounded-full flex items-center justify-center">
                  <BarChart3 size={32} className="text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">View Current Results</h4>
                  <p className="text-white/60 text-sm">See your latest progress and achievements</p>
                </div>
                {isLoading && (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                )}
              </motion.button>

              {/* Add Progress Update Option */}
              <motion.button
                onClick={() => {
                  console.log('Add Progress clicked');
                  console.log('existingAssessment:', existingAssessment);
                  setCurrentStep('input');
                }}
                className="p-8 rounded-2xl border-2 border-dashed border-purple-400/30 bg-white/5 hover:border-purple-400 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center space-y-4 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-400/50 rounded-full flex items-center justify-center">
                  <Plus size={32} className="text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Add Weekly Progress</h4>
                  <p className="text-white/60 text-sm">Update your progress and add new achievements</p>
                </div>
              </motion.button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Progress Input Form */}
        {currentStep === 'input' && existingAssessment && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 mb-10"
          >
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4 items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center">
                    <Target size={28} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-1">Week {progressData.weekNumber} Progress Update</h3>
                    <p className="text-white/70">Welcome back, {existingAssessment.participant_name}!</p>
                  </div>
                </div>
                
                {/* Back Button - Top Right Corner */}
                <motion.button
                  onClick={() => setCurrentStep('options')}
                    className="flex items-center space-x-2 px-4 py-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white/80 hover:text-white text-sm"
                    whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={20} />
                </motion.button>
              </div>
            </div>

            <div className="space-y-8">
              {/* Week Selection */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Week Number</label>
                <select
                  value={progressData.weekNumber}
                  onChange={(e) => setProgressData(prev => ({ ...prev, weekNumber: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-white"
                >
                  {[1, 2, 3, 4, 5, 6].map(week => (
                    <option key={week} value={week}>Week {week}</option>
                  ))}
                  <option value={7}>Final Review</option>
                </select>
              </div>

              {/* Sales Confidence Update */}
              <div>
                <label className="block text-sm font-semibold mb-4 text-white">
                  Current Sales Confidence Rating (1-5)
                </label>
                <div className="flex items-center space-x-4 mb-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                      key={rating}
                      type="button"
                      onClick={() => setProgressData(prev => ({ ...prev, salesConfidenceAfter: rating }))}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        progressData.salesConfidenceAfter === rating
                          ? 'bg-blue-400/20 border-blue-400 text-white scale-110'
                          : 'border-white/30 text-white/70 hover:border-blue-400/90 hover:scale-105'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {rating}
                    </motion.button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-white/60">
                  <span>Not confident at all</span>
                  <span>Extremely confident</span>
                </div>
              </div>

              {/* KPI Updates */}
              {existingAssessment.selected_kpis && existingAssessment.selected_kpis.length > 0 && (
                <div className="space-y-5">
                  <h4 className="text-lg font-semibold text-blue-400">KPI Updates</h4>
                  <p className="text-white/70 text-sm">Update your current KPI values for this week.</p>
                  
                  {existingAssessment.selected_kpis.map((baselineKPI: any, index: number) => {
                    const currentUpdate = progressData.kpiUpdates.find(u => u.kpi === baselineKPI.kpi);
                    return (
                      <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h5 className="text-white font-semibold mb-3">
                          {baselineKPI.kpi.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-white/70 mb-1">Baseline (Current)</label>
                            <div className="text-white font-medium">{baselineKPI.currentValue}</div>
                          </div>
                          <div>
                            <label className="block text-sm text-white/70 mb-1">Goal</label>
                            <div className="text-white font-medium">{baselineKPI.goalValue}</div>
                          </div>
                          <div>
                            <label className="block text-sm text-white/70 mb-1">Current Week Value *</label>
                            <input
                              type="text"
                              value={currentUpdate?.currentValue || ''}
                              onChange={(e) => {
                                const updatedKPIs = [...progressData.kpiUpdates];
                                const existingIndex = updatedKPIs.findIndex(u => u.kpi === baselineKPI.kpi);
                                if (existingIndex >= 0) {
                                  updatedKPIs[existingIndex] = {
                                    ...updatedKPIs[existingIndex],
                                    currentValue: e.target.value
                                  };
                                } else {
                                  updatedKPIs.push({
                                    kpi: baselineKPI.kpi,
                                    currentValue: e.target.value,
                                    goalValue: baselineKPI.goalValue
                                  });
                                }
                                setProgressData(prev => ({ ...prev, kpiUpdates: updatedKPIs }));
                              }}
                              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-white/50"
                              placeholder="Enter current value"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Non-Financial KPI Updates */}
              {existingAssessment.selected_non_financial_kpis && existingAssessment.selected_non_financial_kpis.length > 0 && (
                <div className="space-y-5">
                  <h4 className="text-lg font-semibold text-purple-400">Non-Financial KPI Updates</h4>
                  <p className="text-white/70 text-sm">Update your current non-financial KPI values for this week.</p>
                  
                  {existingAssessment.selected_non_financial_kpis.map((baselineKPI: any, index: number) => {
                        const currentUpdate = progressData.nonFinancialKpiUpdates.find(u => u.kpi === baselineKPI.kpi);
                        
                        const nonFinancialKpiLabels: { [key: string]: string } = {
                          'team_confidence': 'Team Sales Confidence',
                          'patient_satisfaction': 'Patient Satisfaction Score',
                          'consultation_quality': 'Consultation Quality Score',
                          'treatment_adherence': 'Treatment Plan Adherence',
                          'staff_productivity': 'Staff Productivity Score',
                          'response_time': 'Inquiry Response Time',
                          'online_reviews': 'Online Review Rating',
                          'social_engagement': 'Social Media Engagement Rate',
                          'staff_retention': 'Staff Retention Rate',
                          'training_completion': 'Training Completion Rate',
                          'customer_complaints': 'Customer Complaint Rate',
                          'custom_nf': baselineKPI.customKpiName || 'Custom Non-Financial KPI'
                        };

                        const kpiLabel = nonFinancialKpiLabels[baselineKPI.kpi] || baselineKPI.kpi;

                        return (
                          <div key={index} className="bg-gradient-to-br from-purple-400/10 to-purple-400/5 rounded-xl p-4 border border-purple-400/20">
                            <h5 className="text-white font-semibold mb-3">{kpiLabel}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm text-white/70 mb-1">Baseline (Current)</label>
                                <div className="text-white font-medium">{baselineKPI.currentValue}</div>
                              </div>
                              <div>
                                <label className="block text-sm text-white/70 mb-1">Goal</label>
                                <div className="text-white font-medium">{baselineKPI.goalValue}</div>
                              </div>
                              <div>
                                <label className="block text-sm text-white/70 mb-1">Current Week Value *</label>
                                <input
                                  type="text"
                                  value={currentUpdate?.currentValue || ''}
                                  onChange={(e) => {
                                    const updatedKPIs = [...progressData.nonFinancialKpiUpdates];
                                    const existingIndex = updatedKPIs.findIndex(u => u.kpi === baselineKPI.kpi);
                                    if (existingIndex >= 0) {
                                      updatedKPIs[existingIndex] = {
                                        ...updatedKPIs[existingIndex],
                                        currentValue: e.target.value
                                      };
                                    } else {
                                      updatedKPIs.push({
                                        kpi: baselineKPI.kpi,
                                        currentValue: e.target.value,
                                        goalValue: baselineKPI.goalValue
                                      });
                                    }
                                    setProgressData(prev => ({ ...prev, nonFinancialKpiUpdates: updatedKPIs }));
                                  }}
                                  className="w-full px-3 py-2 bg-white/5 border border-purple-400/20 rounded-lg focus:border-purple-400 focus:outline-none transition-colors text-white placeholder-white/50"
                                  placeholder="Enter current value"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>
              )}

              {/* Team & Operations Questions */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-blue-400">Team & Operations Update *</h4>
                <p className="text-white/70 text-sm">Please answer both questions below (required).</p>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">
                    Are you highly confident that you will meet your overall revenue and profit forecasts for this year? *
                  </label>
                  <select
                    value={progressData.revenueForecastConfidence}
                    onChange={(e) => setProgressData(prev => ({ ...prev, revenueForecastConfidence: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white"
                  >
                    <option value="">Select your confidence level...</option>
                    <option value="very-confident">Very confident - on track to exceed forecasts</option>
                    <option value="somewhat-confident">Somewhat confident - likely to meet forecasts</option>
                    <option value="uncertain">Uncertain - could go either way</option>
                    <option value="concerned">Concerned - may fall short of forecasts</option>
                    <option value="very-concerned">Very concerned - significantly behind forecasts</option>
                  </select>
                  {hasAttemptedSubmit && !progressData.revenueForecastConfidence && (
                    <p className="text-red-400 text-sm mt-2">Please select your revenue forecast confidence level.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">
                    Does every patient-facing team member have a formal job description, and a clear understanding of their role and responsibilities? *
                  </label>
                  <select
                    value={progressData.jobDescriptionsClarity}
                    onChange={(e) => setProgressData(prev => ({ ...prev, jobDescriptionsClarity: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white"
                  >
                    <option value="">Select your clarity level...</option>
                    <option value="yes-completely">Yes, completely - everyone has clear, documented roles</option>
                    <option value="mostly-yes">Mostly yes - most roles are documented and clear</option>
                    <option value="partially">Partially - some roles are clear, others need work</option>
                    <option value="mostly-no">Mostly no - roles exist but lack clarity</option>
                    <option value="no-completely">No, completely - roles are unclear or undocumented</option>
                  </select>
                  {hasAttemptedSubmit && !progressData.jobDescriptionsClarity && (
                    <p className="text-red-400 text-sm mt-2">Please select your job descriptions clarity level.</p>
                  )}
                </div>
              </div>

              {/* New Improvements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-white">New Improvements This Week</label>
                  <motion.button
                    type="button"
                    onClick={addImprovement}
                    className="px-3 py-1 bg-green-400/20 text-green-400 rounded-lg text-sm hover:bg-green-400/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    + Add
                  </motion.button>
                </div>
                <div className="space-y-2">
                  {progressData.newImprovements.map((improvement, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg">
                      <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                      <span className="text-white/90 text-sm flex-1">{improvement}</span>
                      <button
                        onClick={() => removeImprovement(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {progressData.newImprovements.length === 0 && (
                    <p className="text-white/50 text-sm italic">No improvements added yet. Click "Add" to add your first improvement.</p>
                  )}
                </div>
              </div>

              {/* New Achievements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-white">New Achievements This Week</label>
                  <motion.button
                    type="button"
                    onClick={addAchievement}
                    className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-lg text-sm hover:bg-yellow-400/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    + Add
                  </motion.button>
                </div>
                <div className="space-y-2">
                  {progressData.newAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg">
                      <Award className="text-yellow-400 flex-shrink-0" size={16} />
                      <span className="text-white/90 text-sm flex-1">{achievement}</span>
                      <button
                        onClick={() => removeAchievement(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {progressData.newAchievements.length === 0 && (
                    <p className="text-white/50 text-sm italic">No achievements added yet. Click "Add" to add your first achievement.</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Additional Notes</label>
                <textarea
                  value={progressData.notes}
                  onChange={(e) => setProgressData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-white/50 focus:outline-none transition-colors text-white placeholder-white/50 resize-none"
                  placeholder="Any additional notes about your progress this week..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleProgressSubmit}
                disabled={isLoading}
                className={`w-full px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isLoading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:shadow-lg hover:shadow-blue-400/25'
                }`}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Updating Progress...</span>
                  </>
                ) : (
                  <>
                    <span>Update Progress & View Results</span>
                    <TrendingUp size={20} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Custom Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Add New {popupType === 'improvement' ? 'Improvement' : 'Achievement'}
            </h3>
            <p className="text-white/70 mb-6">
              Enter the {popupType === 'improvement' ? 'improvement' : 'achievement'} you achieved this week.
            </p>
            
            <input
              type="text"
              value={popupInput}
              onChange={(e) => setPopupInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePopupSubmit();
                } else if (e.key === 'Escape') {
                  handlePopupCancel();
                }
              }}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-white/50 focus:outline-none transition-colors text-white placeholder-white/50 mb-8"
              placeholder={`Enter your ${popupType}...`}
              autoFocus
            />

            <div className="flex justify-end space-x-4">
              <motion.button
                onClick={handlePopupCancel}
                className="px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 text-white/80 hover:text-white border border-white/20 hover:border-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handlePopupSubmit}
                disabled={!popupInput.trim()}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  popupInput.trim()
                    ? popupType === 'improvement'
                      ? 'bg-green-400/20 text-green-400 hover:bg-green-400/30'
                      : 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={popupInput.trim() ? { scale: 1.02 } : {}}
                whileTap={popupInput.trim() ? { scale: 0.98 } : {}}
              >
                Add {popupType === 'improvement' ? 'Improvement' : 'Achievement'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProgressUpdate; 