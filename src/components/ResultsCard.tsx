import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Award, 
  BarChart3,
  Users,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Star,
  Calendar,
  Zap,
  Trophy,
  PieChart,
  Activity,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface KPIProgress {
  kpi: string;
  label: string;
  beforeValue: string;
  afterValue: string;
  unit: string;
  percentageChange: number;
  trend: 'up' | 'down' | 'stable';
  isPositive: boolean;
}

interface ResultsCardProps {
  participantName: string;
  practiceName: string;
  programDuration: string;
  completionDate: string;
  salesConfidenceBefore: number;
  salesConfidenceAfter: number;
  kpiProgress: KPIProgress[];
  nonFinancialImprovements: string[];
  successAchievements: string[];
  coachingScore: number;
  weekNumber?: number;
  lastUpdated?: string;
  notes?: Array<{
    text: string;
    date: string;
  }>;
  userData?: {
    email?: string;
    selectedKPIs?: any[];
    selectedNonFinancialKPIs?: any[];
    revenueForecastConfidence?: string;
    jobDescriptionsClarity?: string;
    successDefinition?: string;
  };
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  participantName,
  practiceName,
  programDuration,
  completionDate,
  salesConfidenceBefore,
  salesConfidenceAfter,
  kpiProgress,
  nonFinancialImprovements,
  successAchievements,
  coachingScore,
  weekNumber,
  lastUpdated,
  notes,
  userData
}) => {
  
  // Debug logging for notes
  console.log('ResultsCard received notes prop:', notes);
  console.log('Notes type:', typeof notes);
  console.log('Notes length:', notes?.length);
  console.log('Notes is array:', Array.isArray(notes));
  
  // Debug logging for nonfinancial KPIs
  console.log('ResultsCard userData:', userData);
  console.log('ResultsCard selectedNonFinancialKPIs:', userData?.selectedNonFinancialKPIs);
  console.log('ResultsCard selectedNonFinancialKPIs length:', userData?.selectedNonFinancialKPIs?.length);
  console.log('ResultsCard selectedNonFinancialKPIs type:', typeof userData?.selectedNonFinancialKPIs);
  
  // Debug logging for KPI progress
  console.log('ResultsCard kpiProgress:', kpiProgress);
  console.log('ResultsCard kpiProgress length:', kpiProgress?.length);
  kpiProgress?.forEach((kpi, index) => {
    console.log(`ResultsCard KPI ${index}:`, {
      label: kpi.label,
      beforeValue: kpi.beforeValue,
      afterValue: kpi.afterValue,
      percentageChange: kpi.percentageChange,
      trend: kpi.trend
    });
  });
  
  // Notes slider state
  const [currentNotesPage, setCurrentNotesPage] = useState(0);
  const notesPerPage = 3;
  const totalNotesPages = notes ? Math.ceil(notes.length / notesPerPage) : 0;
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const handleBackNavigation = () => {
    // Check if this is from progress update (has progressId parameter)
    const progressId = searchParams.get('progressId');
    const assessmentId = searchParams.get('assessmentId');
    
    if (progressId || assessmentId) {
      // If from progress update, go back to progress update page with options step and assessment data
      const params = new URLSearchParams();
      params.set('step', 'options');
      if (assessmentId) {
        params.set('assessmentId', assessmentId);
      }
      navigate(`/progress-update?${params.toString()}`);
    } else {
      // If from baseline assessment, go back to coaching demo main page (which shows options)
      navigate('/coaching-demo');
    }
  };
  
  const nextNotesPage = () => {
    if (currentNotesPage < totalNotesPages - 1) {
      setCurrentNotesPage(currentNotesPage + 1);
    }
  };
  
  const prevNotesPage = () => {
    if (currentNotesPage > 0) {
      setCurrentNotesPage(currentNotesPage - 1);
    }
  };
  
  const getCurrentNotes = () => {
    if (!notes || notes.length === 0) return [];
    const startIndex = currentNotesPage * notesPerPage;
    return notes.slice(startIndex, startIndex + notesPerPage);
  };
  const getProgressColor = (trend: 'up' | 'down' | 'stable', isPositive: boolean) => {
    if (trend === 'stable') return 'text-yellow-400';
    if (isPositive) return 'text-green-400';
    return 'text-red-400';
  };

  const getProgressIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <ArrowUp size={16} />;
    if (trend === 'down') return <ArrowDown size={16} />;
    return <span className="w-4 h-0.5 bg-yellow-400 rounded" />;
  };

  // Helper function to format values with proper title case
  const formatValue = (value: string) => {
    return value.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
  };

  const confidenceImprovement = salesConfidenceAfter - salesConfidenceBefore;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
    <div className="min-h-screen bg-transparent p-4 relative">
      {/* Back Button */}
      <motion.button
        onClick={handleBackNavigation}
        className="fixed top-6 right-6 z-50 p-3 
        initial={{ opacity: 0, x: 20 }}bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 group"
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0, duration: 0 }}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft className="text-white group-hover:text-[#ff41fd] transition-colors duration-300" size={20} />
      </motion.button>

      {/* Spline 3D Background */}
      <div className="spline-container fixed top-0 left-0 w-full h-screen z-0">
        <iframe 
          src="https://my.spline.design/aidatamodelinteraction-mdTL3FktFVHgDvFr5TKtnYDV" 
          frameBorder="0" 
          width="100%" 
          height="100%" 
          id="aura-spline"
          title="3D Background Animation"
        />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-20 pt-8">

        {/* Digital Report Card */}
        <motion.div
          className="bg-neutral-900/90 backdrop-blur ring-1 ring-white/10 border border-white/10 rounded-2xl p-16 pt-10 pb-10 relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0, ease: "easeOut" }}
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#00d9ff]/20 to-transparent rounded-full blur-3xl"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-[#ff41fd]/20 to-transparent rounded-full blur-3xl"
              animate={{ rotate: -360, scale: [1, 1.3, 1] }}
              transition={{ duration: 0, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Header Section */}
          <motion.div
            className="text-center mb-8 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <Trophy className="text-[#ff41fd] mr-3" size={36} />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold bg-white/90 bg-clip-text text-transparent">
                Transformation Results
              </h1>
            </div>
            <p className="text-white/70 text-md">6-Week Transformation Program • Achievement Report</p>
          </motion.div>

          {/* Participant Info & Scores Row */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Participant Info */}
            <div className="lg:col-span-2 bg-white/5 rounded-2xl p-5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">{participantName}</h2>
              <p className="text-[#00d9ff] text-lg font-semibold mb-1">{practiceName}</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <span>Duration: {programDuration}</span>
                <span>•</span>
                <span>{lastUpdated ? `Last Updated: ${new Date(lastUpdated).toLocaleDateString()}` : `Completed: ${completionDate}`}</span>
              </div>
            </div>

            {/* Overall Score */}
            <div className="bg-gradient-to-br from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-2xl p-6 text-center border border-[#00d9ff]/30">
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {coachingScore}
              </motion.div>
              <p className="text-white/70 text-sm">Overall Score</p>
              <motion.div 
                className="w-full bg-white/10 rounded-full h-2 mt-3"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${coachingScore}%` }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Sales Confidence Transformation */}
          <motion.div
            className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10 relative z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <TrendingUp className="text-[#00d9ff] mr-3" size={24} />
              <h3 className="text-xl font-bold text-white">Sales Confidence</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-white/70 text-sm mb-2">Before</p>
                <motion.div 
                  className="flex justify-center space-x-1 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0, staggerChildren: 0.1 }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0 + star * 0.1 }}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= salesConfidenceBefore ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`}
                      />
                    </motion.div>
                  ))}
                </motion.div>
                <p className="text-2xl font-bold text-white">{salesConfidenceBefore}/5</p>
              </div>
              
              <div>
                <p className="text-white/70 text-sm mb-2">Progress</p>
                <motion.div 
                  className="flex items-center justify-center space-x-2 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowUp className="text-green-400" size={20} />
                  <span className="text-xl font-bold text-green-400">
                    +{confidenceImprovement}
                  </span>
                </motion.div>
                <p className="text-green-400 font-semibold text-sm">
                  {((confidenceImprovement / salesConfidenceBefore) * 100).toFixed(0)}% Increase
                </p>
              </div>
              
              <div>
                <p className="text-white/70 text-sm mb-2">After</p>
                <motion.div 
                  className="flex justify-center space-x-1 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0, staggerChildren: 0.1 }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0 + star * 0.1 }}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= salesConfidenceAfter ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`}
                      />
                    </motion.div>
                  ))}
                </motion.div>
                <p className="text-2xl font-bold text-[#00d9ff]">{salesConfidenceAfter}/5</p>
              </div>
            </div>
          </motion.div>

          {/* KPI Progress - Compact Row */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {kpiProgress.map((kpi, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">{kpi.label}</h4>
                  <div className={`flex items-center space-x-1 ${getProgressColor(kpi.trend, kpi.isPositive)}`}>
                    {getProgressIcon(kpi.trend)}
                    <span className="font-bold text-xs">{kpi.percentageChange > 0 ? '+' : ''}{kpi.percentageChange}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-white/70 text-xs">Before</p>
                    <p className="text-lg font-bold text-white">{kpi.beforeValue}{kpi.unit}</p>
                  </div>
                  <ArrowRight className="text-white/40" size={16} />
                  <div>
                    <p className="text-white/70 text-xs">After</p>
                    <p className="text-lg font-bold text-[#00d9ff]">{kpi.afterValue}{kpi.unit}</p>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-full h-1.5">
                  <motion.div 
                    className={`h-1.5 rounded-full ${kpi.isPositive ? 'bg-green-400' : 'bg-red-400'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.abs(kpi.percentageChange), 100)}%` }}
                    transition={{ delay: 0, duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Non-Financial KPI Boxes */}
          {(() => {
            console.log('Checking nonfinancial KPIs condition:');
            console.log('userData?.selectedNonFinancialKPIs:', userData?.selectedNonFinancialKPIs);
            console.log('userData?.selectedNonFinancialKPIs?.length:', userData?.selectedNonFinancialKPIs?.length);
            console.log('Condition result:', userData?.selectedNonFinancialKPIs && userData?.selectedNonFinancialKPIs.length > 0);
            return userData?.selectedNonFinancialKPIs && userData?.selectedNonFinancialKPIs.length > 0;
          })() && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {userData?.selectedNonFinancialKPIs?.map((kpi: any, index: number) => {
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

                const kpiLabel = nonFinancialKpiLabels[kpi.kpi] || kpi.kpi;

                // Calculate progress percentage
                // For baseline assessments (no progressId), show 0% progress
                // For progress updates, calculate actual progress
                const isBaselineAssessment = !weekNumber || weekNumber === 0;
                
                console.log(`Non-financial KPI ${kpi.kpi}:`, {
                  isBaselineAssessment,
                  weekNumber,
                  currentValue: kpi.currentValue,
                  goalValue: kpi.goalValue
                });
                
                let progressPercentage = 0;
                if (!isBaselineAssessment) {
                  const currentNum = parseFloat(kpi.currentValue.replace(/[^0-9.]/g, ''));
                  const goalNum = parseFloat(kpi.goalValue.replace(/[^0-9.]/g, ''));
                  progressPercentage = goalNum > 0 ? Math.min(100, Math.max(0, (currentNum / goalNum) * 100)) : 0;
                }
                
                console.log(`Non-financial KPI ${kpi.kpi} progress percentage:`, progressPercentage);

                return (
                  <motion.div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white">{kpiLabel}</h4>
                      <div className="flex items-center space-x-1 text-[#ff41fd]">
                        <span className="font-bold text-xs">{Math.round(progressPercentage)}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-white/70 text-xs">Before</p>
                        <p className="text-lg font-bold text-white">{kpi.currentValue}</p>
                      </div>
                      <ArrowRight className="text-white/40" size={16} />
                      <div>
                        <p className="text-white/70 text-xs">After</p>
                        <p className="text-lg font-bold text-[#ff41fd]">{kpi.currentValue}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-full h-1.5">
                      <motion.div 
                        className="h-1.5 rounded-full bg-[#ff41fd]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ delay: 0, duration: 0.6 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Bottom Section: Improvements & Achievements */}
          <motion.div
            className={`grid gap-6 relative z-10 mb-6 ${
              nonFinancialImprovements.length > 0 && successAchievements.length > 0 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.6 }}
          >
            {/* Non-Financial Improvements */}
            {nonFinancialImprovements.length > 0 && (
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center mb-4">
                  <Users className="text-[#00d9ff] mr-3" size={20} />
                  <h3 className="text-lg font-bold text-white">Improvements</h3>
                </div>
                <div className="space-y-3">
                  {nonFinancialImprovements.slice(0, 4).map((improvement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0, type: "spring" }}
                      >
                        <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                      </motion.div>
                      <p className="text-white/90 text-sm">{improvement}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Achievements */}
            {successAchievements.length > 0 && (
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center mb-4">
                  <Trophy className="text-[#ff41fd] mr-3" size={20} />
                  <h3 className="text-lg font-bold text-white">Achievements</h3>
                </div>
                <div className="space-y-3">
                  {successAchievements.slice(0, 4).map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 p-2 bg-gradient-to-r from-[#ff41fd]/10 to-[#00d9ff]/10 rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        initial={{ rotate: -90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                      >
                        <Award className="text-[#ff41fd] mt-0.5 flex-shrink-0" size={16} />
                      </motion.div>
                      <p className="text-white/90 font-medium text-sm">{achievement}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* User's Custom Data Section */}
          {userData && (
            <motion.div
              className="mt-0 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <Target className="text-[#00d9ff] mr-3" size={20} />
                  <h3 className="text-lg font-bold text-white">Your Assessment Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Selected KPIs */}
                  {userData?.selectedKPIs && userData?.selectedKPIs.length > 0 && (
                    <div>
                      <h4 className="text-[#00d9ff] font-semibold mb-3">Your Selected KPIs</h4>
                      <div className="space-y-2">
                        {userData?.selectedKPIs?.map((kpi: any, index: number) => (
                          <div key={index} className="bg-white/5 rounded-lg p-3">
                            <p className="text-white font-medium text-sm">{kpi.kpi.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</p>
                            <p className="text-white/70 text-xs">Current: {kpi.currentValue} → Goal: {kpi.goalValue}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selected Non-Financial KPIs */}
                  {userData?.selectedNonFinancialKPIs && userData?.selectedNonFinancialKPIs.length > 0 && (
                    <div>
                      <h4 className="text-[#ff41fd] font-semibold mb-3">Your Non-Financial KPIs</h4>
                      <div className="space-y-2">
                        {userData?.selectedNonFinancialKPIs?.map((kpi: any, index: number) => {
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
                          const kpiLabel = nonFinancialKpiLabels[kpi.kpi] || kpi.kpi;
                          return (
                            <div key={index} className="bg-white/5 rounded-lg p-3">
                              <p className="text-white font-medium text-sm">{kpiLabel}</p>
                              <p className="text-white/70 text-xs">Current: {kpi.currentValue} → Goal: {kpi.goalValue}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {userData?.revenueForecastConfidence && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-[#00d9ff] text-xs font-medium">Revenue Forecast Confidence</p>
                      <p className="text-white text-sm">{formatValue(userData.revenueForecastConfidence)}</p>
                    </div>
                  )}
                  {userData?.jobDescriptionsClarity && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-[#00d9ff] text-xs font-medium">Job Descriptions Clarity</p>
                      <p className="text-white text-sm">{formatValue(userData.jobDescriptionsClarity)}</p>
                    </div>
                  )}


                  {/* Success Definition - moved to bottom */}
                  {userData?.successDefinition && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="text-[#ff41fd] font-semibold mb-3">Your Success Vision</h4>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-white/90 text-sm italic">"{userData.successDefinition}"</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Notes Section */}
          {notes && notes.length > 0 && (
            <motion.div
              className="mt-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Calendar className="text-[#ff41fd] mr-3" size={20} />
                    <h3 className="text-lg font-bold text-white">Progress Notes</h3>
                    <span className="text-white/60 text-sm ml-2">
                      ({notes.length} total)
                    </span>
                  </div>
                  
                  {/* Navigation Controls */}
                  {totalNotesPages > 1 && (
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={prevNotesPage}
                        disabled={currentNotesPage === 0}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          currentNotesPage === 0
                            ? 'text-white/30 cursor-not-allowed'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                        whileHover={currentNotesPage > 0 ? { scale: 1.1 } : {}}
                        whileTap={currentNotesPage > 0 ? { scale: 0.95 } : {}}
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      
                      <span className="text-white/60 text-sm">
                        {currentNotesPage + 1} of {totalNotesPages}
                      </span>
                      
                      <motion.button
                        onClick={nextNotesPage}
                        disabled={currentNotesPage === totalNotesPages - 1}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          currentNotesPage === totalNotesPages - 1
                            ? 'text-white/30 cursor-not-allowed'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                        whileHover={currentNotesPage < totalNotesPages - 1 ? { scale: 1.1 } : {}}
                        whileTap={currentNotesPage < totalNotesPages - 1 ? { scale: 0.95 } : {}}
                      >
                        <ChevronRight size={20} />
                      </motion.button>
                    </div>
                  )}
                </div>
                
                <motion.div 
                  className="space-y-4"
                  key={currentNotesPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {getCurrentNotes().map((note, index) => (
                    <div key={`${currentNotesPage}-${index}`} className="bg-white/5 rounded-lg p-4 border-l-4 border-[#ff41fd]">
                      <p className="text-white/90 text-sm mb-2">{note.text}</p>
                      <p className="text-[#ff41fd] text-xs font-medium">
                        {new Date(note.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
          
          

          {/* Completion Badge */}
          <motion.div
            className="text-center mt-8 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-8 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 border border-[#00d9ff]/30 rounded-2xl px-6 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <CheckCircle className="text-[#00d9ff]" size={24} />
              </motion.div>
              <div>
                <p className="text-[#00d9ff] font-semibold">
                  {weekNumber === 7 ? 'Program Completed' : 'Ongoing'}
                </p>
                <p className="text-white/70 text-sm">
                  {weekNumber === 7 ? 'Aesthetic Sales Hero Certified' : 'Transformation in Progress'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsCard; 