import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Users, 
  CheckCircle, 
  BarChart3,
  Clock,
  Award,
  Star,
  ArrowLeft
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AssessmentService, calculateBaselineScore } from '../services/assessmentService';


interface AssessmentData {
  salesConfidence: number;
  selectedKPIs: Array<{
    kpi: string;
    currentValue: string;
    goalValue: string;
    customKpiName?: string;
  }>;
  selectedNonFinancialKPIs: Array<{
    kpi: string;
    currentValue: string;
    goalValue: string;
    customKpiName?: string;
  }>;
  revenueForecastConfidence: string;
  jobDescriptionsClarity: string;
  successDefinition: string;
  participantName: string;
  practiceType: string;
  email: string;
}

interface BaselineAssessmentProps {
  onBack?: () => void;
}

const BaselineAssessment: React.FC<BaselineAssessmentProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [formData, setFormData] = useState<AssessmentData>({
    salesConfidence: 3,
    selectedKPIs: [
      { kpi: '', currentValue: '', goalValue: '' },
      { kpi: '', currentValue: '', goalValue: '' },
      { kpi: '', currentValue: '', goalValue: '' }
    ],
    selectedNonFinancialKPIs: [
      { kpi: '', currentValue: '', goalValue: '' },
      { kpi: '', currentValue: '', goalValue: '' },
      { kpi: '', currentValue: '', goalValue: '' }
    ],
    revenueForecastConfidence: '',
    jobDescriptionsClarity: '',
    successDefinition: '',
    participantName: '',
    practiceType: '',
    email: ''
  });

  const kpiOptions = [
    { value: 'revenue_per_appointment', label: 'Revenue per Appointment', formula: 'Total Revenue ÷ Number of Appointments', example: '$400-$650' },
    { value: 'revenue_per_hour', label: 'Revenue per Hour', formula: 'Total Revenue ÷ Number of Hours', example: '$400-$700/hour' },
    { value: 'inquiry_to_appointment', label: 'Conversion Rate: Inquiry to Appointment', formula: '(Appointments Booked ÷ Inquiries) × 100', example: '30%-60%' },
    { value: 'consult_to_treatment', label: 'Conversion Rate: Consult to Treatment', formula: '(Treatments Sold ÷ Consultations) × 100', example: '40%-70%' },
    { value: 'retail_attach_rate', label: 'Retail/Skincare Attach Rate', formula: '(Retail Sales ÷ Total Sales) × 100', example: '10%-25%' },
    { value: 'prebooking_rate', label: 'Prebooking Rate', formula: '(Prebooked Appointments ÷ Total Appointments) × 100', example: '30%-60%' },
    { value: 'package_conversion', label: 'Package Conversion Rate', formula: '(Packages Sold ÷ Total Sales) × 100', example: '20%-40%' },
    { value: 'average_order_value', label: 'Average Order Value (AOV)', formula: 'Total Revenue ÷ Number of Orders', example: '$300-$600' },
    { value: 'new_patient_growth', label: 'New Patient Monthly Growth Rate', formula: '(New Patients This Month - New Patients Last Month) ÷ New Patients Last Month) × 100', example: '5%-10%' },
    { value: 'client_retention', label: 'Client Retention Rate', formula: '(Returning Clients ÷ Total Clients) × 100', example: '70%-85%' },
    { value: 'appointment_show_rate', label: 'Appointment Show Rate', formula: '(Appointments Attended ÷ Appointments Scheduled) × 100', example: '85%-95%' },
    { value: 'referral_rate', label: 'Referral Rate', formula: '(Referred Clients ÷ Total Clients) × 100', example: '15%-30%' },
    { value: 'profit_margin', label: 'Profit Margin', formula: '(Revenue - Costs) ÷ Revenue) × 100', example: '25%-40%' },
    { value: 'custom', label: 'Custom KPI (Define your own metric)', formula: 'Track your own metric', example: 'Define your range' }
  ];

  const nonFinancialKpiOptions = [
    { value: 'team_confidence', label: 'Team Sales Confidence', formula: 'Team Self-Assessment Score (1-10)', example: '6-9' },
    { value: 'patient_satisfaction', label: 'Patient Satisfaction Score', formula: 'Average Rating from Patient Surveys', example: '4.2-4.8/5' },
    { value: 'consultation_quality', label: 'Consultation Quality Score', formula: 'Internal Quality Assessment (1-10)', example: '7-9' },
    { value: 'treatment_adherence', label: 'Treatment Plan Adherence', formula: '(Patients Following Plan ÷ Total Patients) × 100', example: '70%-85%' },
    { value: 'staff_productivity', label: 'Staff Productivity Score', formula: 'Tasks Completed per Hour', example: '8-12 tasks/hour' },
    { value: 'response_time', label: 'Inquiry Response Time', formula: 'Average Hours to Respond to Inquiries', example: '2-6 hours' },
    { value: 'online_reviews', label: 'Online Review Rating', formula: 'Average Rating Across All Platforms', example: '4.5-5.0/5' },
    { value: 'social_engagement', label: 'Social Media Engagement Rate', formula: '(Likes + Comments + Shares) ÷ Followers × 100', example: '3%-8%' },
    { value: 'staff_retention', label: 'Staff Retention Rate', formula: '(Staff Retained ÷ Total Staff) × 100', example: '85%-95%' },
    { value: 'training_completion', label: 'Training Completion Rate', formula: '(Completed Training Modules ÷ Assigned Modules) × 100', example: '80%-95%' },
    { value: 'customer_complaints', label: 'Customer Complaint Rate', formula: '(Complaints ÷ Total Patients) × 100', example: '1%-5%' },
    { value: 'custom_nf', label: 'Custom Non-Financial KPI', formula: 'Track your own metric', example: 'Define your range' }
  ];

  const steps = [
    { title: 'Personal Information', icon: Users },
    { title: 'Sales Confidence', icon: TrendingUp },
    { title: 'Key Performance Indicators', icon: BarChart3 },
    { title: 'Team & Operations', icon: Users },
    { title: 'Success Definition', icon: Target }
  ];

  const handleInputChange = (field: keyof AssessmentData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleKPIChange = (index: number, field: string, value: string) => {
    const updatedKPIs = [...formData.selectedKPIs];
    updatedKPIs[index] = { ...updatedKPIs[index], [field]: value };
    setFormData(prev => ({ ...prev, selectedKPIs: updatedKPIs }));
  };

  const handleNonFinancialKPIChange = (index: number, field: string, value: string) => {
    const updatedKPIs = [...formData.selectedNonFinancialKPIs];
    updatedKPIs[index] = { ...updatedKPIs[index], [field]: value };
    setFormData(prev => ({ ...prev, selectedNonFinancialKPIs: updatedKPIs }));
  };

  const handleSubmit = async () => {
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Prepare assessment data for database
      const assessmentData = {
        participant_name: formData.participantName,
        practice_name: formData.practiceType,
        email: formData.email,
        sales_confidence_before: formData.salesConfidence,
        selected_kpis: formData.selectedKPIs,
        selected_non_financial_kpis: formData.selectedNonFinancialKPIs,
        revenue_forecast_confidence: formData.revenueForecastConfidence,
        job_descriptions_clarity: formData.jobDescriptionsClarity,
        success_definition: formData.successDefinition,
      };

      // Submit to database
      console.log('Submitting assessment data:', assessmentData);
      const { id: assessmentId, error } = await AssessmentService.submitAssessment(assessmentData);
      console.log('Assessment submission result:', { assessmentId, error });
      
      if (error) {
        console.error('Failed to submit assessment:', error);
        
        // Check if it's a Supabase configuration error
        if (error.includes('Supabase is not configured')) {
          setSubmitError('Database not configured. Using demo mode - your data will not be saved.');
          
          // Navigate to results in demo mode immediately
          const params = { 
            view: 'results',
            participantName: formData.participantName,
            practiceName: formData.practiceType,
            salesConfidenceBefore: formData.salesConfidence.toString(),
            // Add all form data to URL params for results card
            email: formData.email,
            selectedKPIs: JSON.stringify(formData.selectedKPIs),
            selectedNonFinancialKPIs: JSON.stringify(formData.selectedNonFinancialKPIs),
            revenueForecastConfidence: formData.revenueForecastConfidence,
            jobDescriptionsClarity: formData.jobDescriptionsClarity,
            successDefinition: formData.successDefinition,
          };
          console.log('Navigating to results with params:', params);
          setSearchParams(params);
          return;
        } else {
          setSubmitError('Failed to submit assessment. Please try again.');
          return;
        }
      }

      // Calculate baseline score using the new scoring system
      const baselineScore = calculateBaselineScore(
        formData.salesConfidence,
        formData.selectedKPIs,
        formData.selectedNonFinancialKPIs,
        formData.revenueForecastConfidence,
        formData.jobDescriptionsClarity
      );

      // Navigate to results page with assessment ID
      const params = { 
        view: 'results',
        assessmentId: assessmentId,
        participantName: formData.participantName,
        practiceName: formData.practiceType,
        salesConfidenceBefore: formData.salesConfidence.toString(),
        currentScore: baselineScore.toString(),
        // Add all form data to URL params for results card
        email: formData.email,
        selectedKPIs: JSON.stringify(formData.selectedKPIs),
        selectedNonFinancialKPIs: JSON.stringify(formData.selectedNonFinancialKPIs),
        revenueForecastConfidence: formData.revenueForecastConfidence,
        jobDescriptionsClarity: formData.jobDescriptionsClarity,
        successDefinition: formData.successDefinition,
      };
      console.log('Navigating to results with params:', params);
      setSearchParams(params);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Scroll to top when moving to next step
      window.scrollTo({ top: 315, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Scroll to top when moving to previous step
      window.scrollTo({ top: 315, behavior: 'smooth' });
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 pt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 pt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <div className="flex justify-start mb-6">
            <motion.button
              onClick={onBack || (() => navigate('/tracker'))}
              className="flex items-center space-x-2 px-3 py-3 bg-white/0 hover:bg-white/10 border-2 border-white/50 rounded-full transition-all duration-300 text-sm text-white/80 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
            </motion.button>
          </div>
          
          <h1 className="mt-10 py-2 text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            6-Week Transformation Program
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
            Baseline Assessment
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Help us understand your current situation so we can create a personalized transformation plan for measurable growth and lasting impact.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-gradient-to-r from-blue-400/80 to-purple-400/80 border-white/50 text-[#ffffff]' 
                    : 'border-white/30 text-white/50'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle size={20} />
                  ) : (
                    <step.icon size={20} />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-32 h-0.5 mx-4 transition-all duration-300 ${
                    index < currentStep ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-white/80">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </p>
          </div>
        </div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-24"
        >
          <div>
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">Tell us about yourself</h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Full Name *</label>
                  <input
                    type="text"
                    value={formData.participantName}
                    onChange={(e) => handleInputChange('participantName', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-white/50"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-white/50"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Practice Name *</label>
                  <input
                    type="text"
                    value={formData.practiceType}
                    onChange={(e) => handleInputChange('practiceType', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-white/50"
                    placeholder="Enter your practice name"
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">Sales Confidence Assessment</h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-4 text-white">
                    On a scale of 1-5, how would you rate your Sales Confidence? 
                    <span className="text-white/70 block mt-1 font-normal">
                      (i.e., your ability to convert a lead into an appointment and/or an appointment to a purchase)
                    </span>
                  </label>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        type="button"
                        onClick={() => handleInputChange('salesConfidence', rating)}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          formData.salesConfidence === rating
                            ? 'bg-blue-400 border-blue-400 text-white scale-110'
                            : 'border-white/30 text-white/70 hover:border-blue-400/50 hover:scale-105'
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

                <div className="bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold mb-3 text-blue-400">Rating Guide</h4>
                  <div className="space-y-2 text-white/80 text-sm">
                    <div><span className="font-medium">1 - Not Confident:</span> Struggle with sales conversations</div>
                    <div><span className="font-medium">2 - Somewhat Confident:</span> Can handle basic sales but avoid difficult conversations</div>
                    <div><span className="font-medium">3 - Moderately Confident:</span> Comfortable with most sales situations</div>
                    <div><span className="font-medium">4 - Very Confident:</span> Strong sales skills with consistent results</div>
                    <div><span className="font-medium">5 - Extremely Confident:</span> Expert-level sales abilities with high conversion rates</div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">Key Performance Indicators</h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-4 text-white">
                    Select your top 3 KPIs to focus on throughout this bootcamp:
                  </label>
                  
                  {formData.selectedKPIs.map((kpiData, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-semibold mb-4 text-blue-400">KPI #{index + 1}</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Select KPI</label>
                          <select
                            value={kpiData.kpi}
                            onChange={(e) => handleKPIChange(index, 'kpi', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white"
                          >
                            <option value="">Choose a KPI</option>
                            {kpiOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {kpiData.kpi === 'custom' && (
                          <div>
                            <label className="block text-sm font-medium mb-2 text-white">Custom KPI Name</label>
                            <input
                              type="text"
                              value={kpiData.customKpiName || ''}
                              onChange={(e) => handleKPIChange(index, 'customKpiName', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-white/50"
                              placeholder="Enter your custom KPI name (e.g., Social Media Engagement Rate, Patient Satisfaction Score)"
                            />
                          </div>
                        )}

                        {kpiData.kpi && (
                          <div className="bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <p className="text-sm text-white/80">
                                <span className="font-medium">Formula:</span> {kpiOptions.find(opt => opt.value === kpiData.kpi)?.formula}
                              </p>
                              <p className="text-sm text-blue-400 font-medium ml-4">
                                Example: {kpiOptions.find(opt => opt.value === kpiData.kpi)?.example}
                              </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2 text-white">Current Value</label>
                                <input
                                  type="text"
                                  value={kpiData.currentValue}
                                  onChange={(e) => handleKPIChange(index, 'currentValue', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-white/50"
                                  placeholder="Enter current value"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium mb-2 text-white">Goal Value</label>
                                <input
                                  type="text"
                                  value={kpiData.goalValue}
                                  onChange={(e) => handleKPIChange(index, 'goalValue', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-white/50"
                                  placeholder="Enter goal value"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-bold text-purple-400 mb-6">Non-Financial KPIs</h4>
                  <label className="block text-sm font-semibold mb-4 text-white">
                    Select your top 3 Non-Financial KPIs to track:
                  </label>
                  
                  {formData.selectedNonFinancialKPIs.map((kpiData, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                      <h5 className="text-lg font-semibold mb-4 text-purple-400">Non-Financial KPI #{index + 1}</h5>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">Select Non-Financial KPI</label>
                          <select
                            value={kpiData.kpi}
                            onChange={(e) => handleNonFinancialKPIChange(index, 'kpi', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-white"
                          >
                            <option value="">Choose a Non-Financial KPI</option>
                            {nonFinancialKpiOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {kpiData.kpi === 'custom_nf' && (
                          <div>
                            <label className="block text-sm font-medium mb-2 text-white">Custom Non-Financial KPI Name</label>
                            <input
                              type="text"
                              value={kpiData.customKpiName || ''}
                              onChange={(e) => handleNonFinancialKPIChange(index, 'customKpiName', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-white placeholder-white/50"
                              placeholder="Enter your custom non-financial KPI name (e.g., Team Morale Score, Patient Wait Time)"
                            />
                          </div>
                        )}

                        {kpiData.kpi && (
                          <div className="bg-gradient-to-r from-purple-400/5 to-blue-400/5 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <p className="text-sm text-white/80">
                                <span className="font-medium">Measurement:</span> {nonFinancialKpiOptions.find(opt => opt.value === kpiData.kpi)?.formula}
                              </p>
                              <p className="text-sm text-purple-400 font-medium ml-4">
                                Example: {nonFinancialKpiOptions.find(opt => opt.value === kpiData.kpi)?.example}
                              </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2 text-white">Current Value</label>
                                <input
                                  type="text"
                                  value={kpiData.currentValue}
                                  onChange={(e) => handleNonFinancialKPIChange(index, 'currentValue', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-white placeholder-white/50"
                                  placeholder="Enter current value"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium mb-2 text-white">Goal Value</label>
                                <input
                                  type="text"
                                  value={kpiData.goalValue}
                                  onChange={(e) => handleNonFinancialKPIChange(index, 'goalValue', e.target.value)}
                                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-white placeholder-white/50"
                                  placeholder="Enter goal value"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">Team & Operations</h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-4 text-white">
                    Are you highly confident that you will meet your overall revenue and profit forecasts for this year?
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'very-confident', label: 'Very confident - on track to exceed forecasts' },
                      { value: 'somewhat-confident', label: 'Somewhat confident - likely to meet forecasts' },
                      { value: 'uncertain', label: 'Uncertain - could go either way' },
                      { value: 'concerned', label: 'Concerned - may fall short of forecasts' },
                      { value: 'very-concerned', label: 'Very concerned - significantly behind forecasts' }
                    ].map((option) => (
                      <motion.label
                        key={option.value}
                        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.revenueForecastConfidence === option.value
                            ? 'border-blue-400 bg-blue-400/10'
                            : 'border-white/20 hover:border-blue-400/50 hover:bg-white/5'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <input
                          type="radio"
                          name="revenueForecastConfidence"
                          value={option.value}
                          checked={formData.revenueForecastConfidence === option.value}
                          onChange={(e) => handleInputChange('revenueForecastConfidence', e.target.value)}
                          className="mr-3 text-blue-400 focus:ring-blue-400"
                        />
                        <span className="text-white">{option.label}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-4 text-white">
                    Does every patient-facing team member have a formal job description, and a clear understanding of their role and responsibilities?
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'yes-completely', label: 'Yes, completely - everyone has clear, documented roles' },
                      { value: 'mostly-yes', label: 'Mostly yes - most roles are documented and clear' },
                      { value: 'partially', label: 'Partially - some roles are clear, others need work' },
                      { value: 'mostly-no', label: 'Mostly no - roles exist but lack clarity' },
                      { value: 'no-completely', label: 'No, completely - roles are unclear or undocumented' }
                    ].map((option) => (
                      <motion.label
                        key={option.value}
                        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.jobDescriptionsClarity === option.value
                            ? 'border-blue-400 bg-blue-400/10'
                            : 'border-white/20 hover:border-blue-400/50 hover:bg-white/5'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <input
                          type="radio"
                          name="jobDescriptionsClarity"
                          value={option.value}
                          checked={formData.jobDescriptionsClarity === option.value}
                          onChange={(e) => handleInputChange('jobDescriptionsClarity', e.target.value)}
                          className="mr-3 text-blue-400 focus:ring-blue-400"
                        />
                        <span className="text-white">{option.label}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">Success Definition</h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-4 text-white">
                    What will success look like for you after completing this 6-week transformation coaching program?
                  </label>
                  <textarea
                    value={formData.successDefinition}
                    onChange={(e) => handleInputChange('successDefinition', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-white/50 resize-none"
                    placeholder="Describe your vision of success... Consider both quantitative goals (revenue, conversion rates, etc.) and qualitative improvements (team confidence, patient satisfaction, operational efficiency, etc.)"
                    rows={6}
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold mb-3 text-white">Consider Including:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80 text-sm">
                    <div>
                      <p className="font-medium mb-2">Quantitative Goals:</p>
                      <ul className="space-y-1">
                        <li>• Revenue increases</li>
                        <li>• Conversion rate improvements</li>
                        <li>• Client retention goals</li>
                        <li>• Treatment frequency targets</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Qualitative Improvements:</p>
                      <ul className="space-y-1">
                        <li>• Team confidence levels</li>
                        <li>• Patient satisfaction</li>
                        <li>• Operational efficiency</li>
                        <li>• Leadership effectiveness</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center"
              >
                {submitError}
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <motion.button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                disabled={currentStep === 0 || isSubmitting}
                whileHover={currentStep > 0 && !isSubmitting ? { scale: 1.05 } : {}}
                whileTap={currentStep > 0 && !isSubmitting ? { scale: 0.95 } : {}}
              >
                Previous
              </motion.button>

              {currentStep < steps.length - 1 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-400/0 border border-blue-400 text-white rounded-xl font-semibold hover:bg-blue-400/30 transition-all duration-300 flex items-center space-x-2"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  <span>Next</span>
                  <ArrowRight size={20} />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:shadow-lg hover:shadow-blue-400/25'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Assessment</span>
                      <CheckCircle size={20} />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BaselineAssessment; 