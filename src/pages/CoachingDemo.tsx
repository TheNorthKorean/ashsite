import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Trophy, Users, Target, Shield } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import BaselineAssessment from '../components/BaselineAssessment';
import ResultsCard from '../components/ResultsCard';
import { AssessmentService, calculateBaselineScore, calculateComprehensiveScore } from '../services/assessmentService';

const CoachingDemo = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState<'demo' | 'assessment' | 'results'>('demo');

  // Intersection Observer refs for scroll-triggered animations
  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  const [demoActionsRef, demoActionsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  const [roiRef, roiInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Check URL params on mount and when they change
  useEffect(() => {
    const viewParam = searchParams.get('view');
    console.log('CoachingDemo: URL params changed, viewParam:', viewParam);
    
    if (viewParam === 'assessment' || viewParam === 'results') {
      console.log('CoachingDemo: Setting currentView to:', viewParam);
      setCurrentView(viewParam);
    } else {
      console.log('CoachingDemo: Setting currentView to demo');
      setCurrentView('demo');
    }
    
    // Fetch assessment data if we have an assessment ID
    const assessmentId = searchParams.get('assessmentId');
    if (assessmentId && viewParam === 'results') {
      console.log('CoachingDemo: Fetching assessment data for ID:', assessmentId);
      getAssessmentResults();
    }
  }, [searchParams]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Get assessment data from URL params or database
  const getAssessmentResults = async () => {
    const assessmentId = searchParams.get('assessmentId');
    
    if (assessmentId) {
      setLoading(true);
      try {
        // Fetch real assessment data from database
        const { data: assessment, error } = await AssessmentService.getAssessment(assessmentId);
        
        if (error) {
          console.error('Error fetching assessment:', error);
          setAssessmentData(getFallbackData());
          setLoading(false);
          return;
        }

        if (assessment) {
          console.log('Assessment data received:', assessment);
          console.log('URL params:', Object.fromEntries(searchParams.entries()));
          
          
          // Check if this is from baseline assessment or progress update
          // Look for progressId parameter which indicates a progress update
          const progressId = searchParams.get('progressId');
          const isFromBaseline = !progressId;
          
          console.log('Is from baseline:', isFromBaseline);
          console.log('progressId:', progressId);
          console.log('newImprovements param:', searchParams.get('newImprovements'));
          console.log('newAchievements param:', searchParams.get('newAchievements'));
          
          let processedData;
          
          if (isFromBaseline) {
            console.log('Processing as baseline assessment');
            // Baseline assessment results - show baseline data only
            const baselineScore = calculateBaselineScore(
              assessment.sales_confidence_before,
              assessment.selected_kpis || [],
              assessment.selected_non_financial_kpis || [],
              assessment.revenue_forecast_confidence,
              assessment.job_descriptions_clarity
            );
            
            const kpiProgress = (assessment.selected_kpis || []).map((kpi: any) => {
              console.log('Baseline KPI:', kpi);
              return {
                kpi: kpi.kpi,
                label: kpi.kpi.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
                beforeValue: kpi.currentValue,
                afterValue: kpi.currentValue, // Same as before for baseline - no progress yet
                unit: kpi.kpi.includes('rate') || kpi.kpi.includes('percentage') ? '%' : '',
                percentageChange: 0, // No change yet
                trend: 'stable' as const,
                isPositive: false
              };
            });
            
            console.log('Baseline KPI progress:', kpiProgress);
            
            processedData = {
              ...sampleResultsData,
              participantName: assessment.participant_name,
              practiceName: assessment.practice_name,
              salesConfidenceBefore: assessment.sales_confidence_before,
              salesConfidenceAfter: assessment.sales_confidence_before, // Same as before for baseline
              coachingScore: baselineScore,
              // No improvements or achievements for baseline
              nonFinancialImprovements: [],
              successAchievements: [],
              // Create KPI progress from baseline data
              kpiProgress: kpiProgress,
              // Include baseline assessment data
              userData: {
                email: assessment.email,
                selectedKPIs: assessment.selected_kpis || [],
                selectedNonFinancialKPIs: (assessment.selected_non_financial_kpis || []).map((kpi: any) => ({
                  ...kpi,
                  previousValue: kpi.currentValue // For baseline, previous = current
                })),
                revenueForecastConfidence: assessment.revenue_forecast_confidence,
                jobDescriptionsClarity: assessment.job_descriptions_clarity,
                successDefinition: assessment.success_definition
              }
            };
          } else {
            console.log('Processing as progress update');
            // Progress update results - show accumulated data
            const newImprovementsParam = searchParams.get('newImprovements');
            const newAchievementsParam = searchParams.get('newAchievements');
            const notesParam = searchParams.get('notes');
            const salesConfidenceAfter = parseInt(searchParams.get('salesConfidenceAfter') || assessment.sales_confidence_before.toString());
            const currentScore = parseInt(searchParams.get('currentScore') || '60');
            
            // Parse progress data
            let newImprovements: string[] = [];
            let newAchievements: string[] = [];
            let notes: Array<{ text: string; date: string }> = [];
            
            if (newImprovementsParam) {
              try {
                newImprovements = JSON.parse(newImprovementsParam);
              } catch (e) {
                console.error('Error parsing newImprovements:', e);
              }
            }
            
            if (newAchievementsParam) {
              try {
                newAchievements = JSON.parse(newAchievementsParam);
              } catch (e) {
                console.error('Error parsing newAchievements:', e);
              }
            }
            
            // Get notes from URL parameters (current week)
            if (notesParam) {
              try {
                notes = JSON.parse(notesParam);
                console.log('Notes from URL params:', notes);
              } catch (e) {
                console.error('Error parsing notes from URL:', e);
              }
            }
            
            // Fetch all cumulative notes from database
            try {
              const { data: allProgress, error: progressError } = await AssessmentService.getProgressUpdates(assessmentId);
              
              if (!progressError && allProgress) {
                const allNotes: Array<{ text: string; date: string }> = [];
                
                allProgress.forEach(progress => {
                  if (progress.notes && progress.notes.trim()) {
                    allNotes.push({
                      text: progress.notes,
                      date: progress.updated_at
                    });
                  }
                });
                
                console.log('All notes from database:', allNotes);
                
                // Use cumulative notes from database instead of just current week
                notes = allNotes;
              }
            } catch (error) {
              console.error('Error fetching notes from database:', error);
            }

            // Get KPI updates from URL params
            const kpiUpdatesParam = searchParams.get('kpiUpdates');
            let kpiUpdates: any[] = [];
            if (kpiUpdatesParam) {
              try {
                kpiUpdates = JSON.parse(kpiUpdatesParam);
                console.log('Parsed kpiUpdates:', kpiUpdates);
              } catch (e) {
                console.error('Error parsing kpiUpdates:', e);
              }
            }

            // Get Non-Financial KPI updates from URL params
            const nonFinancialKpiUpdatesParam = searchParams.get('nonFinancialKpiUpdates');
            let nonFinancialKpiUpdates: any[] = [];

            if (nonFinancialKpiUpdatesParam) {
              try {
                nonFinancialKpiUpdates = JSON.parse(nonFinancialKpiUpdatesParam);

              } catch (e) {
                console.error('CoachingDemo: Error parsing nonFinancialKpiUpdates:', e);
              }
                          } else {
                // No nonFinancialKpiUpdates parameter found in URL
              }

            // Fetch previous progress updates to get "before" values
            let previousKpiUpdates: any[] = [];
            let previousNonFinancialKpiUpdates: any[] = [];
            try {
              const { data: allProgress, error: progressError } = await AssessmentService.getProgressUpdates(assessmentId);
              
              if (!progressError && allProgress && allProgress.length > 1) {
                // Get the second-to-last progress update (previous to current)
                const previousProgress = allProgress[allProgress.length - 2];
                previousKpiUpdates = previousProgress.kpi_updates || [];
                previousNonFinancialKpiUpdates = previousProgress.non_financial_kpi_updates || [];
                console.log('Previous KPI updates:', previousKpiUpdates);
                console.log('Previous Non-Financial KPI updates:', previousNonFinancialKpiUpdates);

              } else {
                // If this is the first progress update, use baseline values as "before"
                console.log('First progress update - using baseline values as "before"');
                previousKpiUpdates = (assessment.selected_kpis || []).map(kpi => ({
                  kpi: kpi.kpi,
                  currentValue: kpi.currentValue
                }));
                previousNonFinancialKpiUpdates = (assessment.selected_non_financial_kpis || []).map(kpi => ({
                  kpi: kpi.kpi,
                  currentValue: kpi.currentValue
                }));
              }
            } catch (error) {
              console.error('Error fetching previous progress updates:', error);
              // Fallback to baseline values
              previousKpiUpdates = (assessment.selected_kpis || []).map(kpi => ({
                kpi: kpi.kpi,
                currentValue: kpi.currentValue
              }));
              previousNonFinancialKpiUpdates = (assessment.selected_non_financial_kpis || []).map(kpi => ({
                kpi: kpi.kpi,
                currentValue: kpi.currentValue
              }));
            }

            console.log('Baseline KPIs:', assessment.selected_kpis);

            // Create KPI progress comparing previous to current updates
            const kpiProgress = (assessment.selected_kpis || []).map((baselineKPI: any) => {
              const currentUpdate = kpiUpdates.find(u => u.kpi === baselineKPI.kpi);
              const previousUpdate = previousKpiUpdates.find(u => u.kpi === baselineKPI.kpi);
              
              // For immediate results after submission, use baseline as "before" and current as "after"
              // For "view current results", use previous update as "before" and current as "after"
              const isImmediateResult = progressId === searchParams.get('progressId');
              const beforeValue = isImmediateResult 
                ? baselineKPI.currentValue  // Use baseline for immediate results
                : (previousUpdate?.currentValue || baselineKPI.currentValue);  // Use previous update for view results
              const afterValue = currentUpdate?.currentValue || baselineKPI.currentValue;
              const goalValue = baselineKPI.goalValue;
              

              
              console.log(`KPI ${baselineKPI.kpi}:`, {
                baseline: baselineKPI.currentValue,
                previous: beforeValue,
                current: afterValue,
                goal: goalValue,
                currentUpdate: currentUpdate,
                previousUpdate: previousUpdate,
                hasCurrentUpdate: !!currentUpdate,
                hasPreviousUpdate: !!previousUpdate
              });
              
              const beforeNum = parseFloat(beforeValue.replace(/[^0-9.]/g, ''));
              const afterNum = parseFloat(afterValue.replace(/[^0-9.]/g, ''));
              
              const percentageChange = beforeNum > 0 ? Math.round(((afterNum - beforeNum) / beforeNum) * 100) : 0;
              
              const result = {
                kpi: baselineKPI.kpi,
                label: baselineKPI.kpi.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
                beforeValue: beforeValue,
                afterValue: afterValue,
                unit: baselineKPI.kpi.includes('rate') || baselineKPI.kpi.includes('percentage') ? '%' : '',
                percentageChange: Math.abs(percentageChange),
                trend: percentageChange > 0 ? 'up' as const : percentageChange < 0 ? 'down' as const : 'stable' as const,
                isPositive: percentageChange > 0
              };
              
              console.log(`KPI Result for ${baselineKPI.kpi}:`, result);
              console.log(`KPI ${baselineKPI.kpi} - Before: ${result.beforeValue}, After: ${result.afterValue}`);
              return result;
            });

            console.log('Final kpiProgress:', kpiProgress);
            console.log('KPI Progress details:');
            kpiProgress.forEach((kpi, index) => {
              console.log(`KPI ${index}:`, {
                label: kpi.label,
                beforeValue: kpi.beforeValue,
                afterValue: kpi.afterValue,
                percentageChange: kpi.percentageChange,
                trend: kpi.trend
              });
            });

            // Debug: Log the final result object
            const result = {
              ...sampleResultsData,
              participantName: assessment.participant_name,
              practiceName: assessment.practice_name,
              salesConfidenceBefore: assessment.sales_confidence_before,
              salesConfidenceAfter: salesConfidenceAfter,
              coachingScore: currentScore,
              kpiProgress: kpiProgress,
              // Use accumulated progress data
              nonFinancialImprovements: newImprovements,
              successAchievements: newAchievements,
              notes: notes,
              // Include baseline assessment data with updated nonfinancial KPIs
              userData: {
                email: assessment.email,
                selectedKPIs: assessment.selected_kpis || [],
                selectedNonFinancialKPIs: (() => {
                  try {
                    const baselineNonFinancialKPIs = assessment.selected_non_financial_kpis || [];
                    console.log('Processing non-financial KPIs:');
                    console.log('Baseline non-financial KPIs:', baselineNonFinancialKPIs);
                    console.log('Current non-financial KPI updates:', nonFinancialKpiUpdates);
                    console.log('Previous non-financial KPI updates:', previousNonFinancialKpiUpdates);
                    
                    // Update baseline KPIs with progress updates, including previous values for comparison
                    const processedKPIs = baselineNonFinancialKPIs.map((baselineKPI: any, index: number) => {
                      const currentUpdate = nonFinancialKpiUpdates.find(u => u.kpi === baselineKPI.kpi);
                      const previousUpdate = previousNonFinancialKpiUpdates.find(u => u.kpi === baselineKPI.kpi);
                      

                      
                      // For immediate results after submission, use baseline as "before" and current as "after"
                      // For "view current results", use previous update as "before" and current as "after"
                      const isImmediateResult = progressId === searchParams.get('progressId');
                      const result = {
                        ...baselineKPI,
                        currentValue: currentUpdate?.currentValue || baselineKPI.currentValue,
                        previousValue: isImmediateResult 
                          ? baselineKPI.currentValue  // Use baseline for immediate results
                          : (previousUpdate?.currentValue || baselineKPI.currentValue)  // Use previous update for view results
                      };
                      

                      
                      console.log(`CoachingDemo: Non-financial KPI ${baselineKPI.kpi} result:`, {
                        baselineValue: baselineKPI.currentValue,
                        currentUpdate: currentUpdate,
                        previousUpdate: previousUpdate,
                        finalCurrentValue: result.currentValue,
                        finalPreviousValue: result.previousValue
                      });
                      
                      return result;
                    });
                    
                    console.log('Final processed non-financial KPIs:', processedKPIs);
                    return processedKPIs;
                  } catch (e) {
                    console.error('Error parsing non-financial metrics:', e);
                    return [];
                  }
                })(),
                revenueForecastConfidence: assessment.revenue_forecast_confidence,
                jobDescriptionsClarity: assessment.job_descriptions_clarity,
                successDefinition: assessment.success_definition
              }
            };
            
            console.log('Final result object:', result);
            processedData = result;
          }
          
          setAssessmentData(processedData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in getAssessmentResults:', error);
        setAssessmentData(getFallbackData());
        setLoading(false);
      }
    }
  };

  const getFallbackData = () => {
    const participantName = searchParams.get('participantName') || sampleResultsData.participantName;
    const practiceName = searchParams.get('practiceName') || sampleResultsData.practiceName;
    const salesConfidenceBefore = parseInt(searchParams.get('salesConfidenceBefore') || '2');
    const salesConfidenceAfter = parseInt(searchParams.get('salesConfidenceAfter') || sampleResultsData.salesConfidenceAfter.toString());
    const currentScore = parseInt(searchParams.get('currentScore') || sampleResultsData.coachingScore.toString());
    
    // Get additional form data from URL params
    const email = searchParams.get('email');
    const selectedKPIsParam = searchParams.get('selectedKPIs');
    const selectedNonFinancialKPIsParam = searchParams.get('selectedNonFinancialKPIs');
    const revenueForecastConfidence = searchParams.get('revenueForecastConfidence');
    const jobDescriptionsClarity = searchParams.get('jobDescriptionsClarity');
    const successDefinition = searchParams.get('successDefinition');
    
    // Get progress update data
    const newImprovementsParam = searchParams.get('newImprovements');
    const newAchievementsParam = searchParams.get('newAchievements');
    const notesParam = searchParams.get('notes');
    
    console.log('URL parameters received:');
    console.log('newImprovementsParam:', newImprovementsParam);
    console.log('newAchievementsParam:', newAchievementsParam);
    console.log('notesParam:', notesParam);
    console.log('notesParam length:', notesParam?.length);
    
    // Parse selected KPIs if available
    let selectedKPIs = [];
    if (selectedKPIsParam) {
      try {
        selectedKPIs = JSON.parse(selectedKPIsParam);
      } catch (e) {
        console.error('Error parsing selectedKPIs:', e);
      }
    }

    // Parse selected Non-Financial KPIs if available
    let selectedNonFinancialKPIs = [];
    if (selectedNonFinancialKPIsParam) {
      try {
        selectedNonFinancialKPIs = JSON.parse(selectedNonFinancialKPIsParam);
      } catch (e) {
        console.error('Error parsing selectedNonFinancialKPIs:', e);
      }
    }
    
    // Add sample nonfinancial KPIs for testing if none are provided
    if (selectedNonFinancialKPIs.length === 0) {
      selectedNonFinancialKPIs = [
        {
          kpi: 'team_confidence',
          currentValue: '3.2',
          goalValue: '4.5',
          previousValue: '3.2'
        },
        {
          kpi: 'patient_satisfaction',
          currentValue: '4.1',
          goalValue: '4.8',
          previousValue: '4.1'
        },
        {
          kpi: 'consultation_quality',
          currentValue: '3.8',
          goalValue: '4.6',
          previousValue: '3.8'
        }
      ];
    } else {
      // Add previousValue to existing non-financial KPIs
      selectedNonFinancialKPIs = selectedNonFinancialKPIs.map((kpi: any) => ({
        ...kpi,
        previousValue: kpi.previousValue || kpi.currentValue
      }));
    }
    
    // Create custom KPI progress based on user's selected KPIs
    const customKpiProgress = selectedKPIs.length > 0 ? selectedKPIs.map((kpi: any, index: number) => {
      const kpiLabels: { [key: string]: string } = {
        'monthly_revenue': 'Monthly Revenue',
        'conversion_rate': 'Conversion Rate',
        'average_transaction': 'Average Transaction',
        'new_clients': 'New Client Acquisition',
        'client_retention': 'Client Retention Rate',
        'appointment_show_rate': 'Appointment Show Rate',
        'treatment_frequency': 'Treatment Frequency',
        'referral_rate': 'Referral Rate',
        'profit_margin': 'Profit Margin',
        'consultation_bookings': 'Consultation Bookings'
      };
      
      const currentValue = kpi.currentValue || '0';
      const goalValue = kpi.goalValue || '0';
      const currentNum = parseFloat(currentValue.replace(/[^0-9.]/g, ''));
      const goalNum = parseFloat(goalValue.replace(/[^0-9.]/g, ''));
      const percentageChange = goalNum > 0 ? Math.round(((goalNum - currentNum) / currentNum) * 100) : 0;
      
      return {
        kpi: kpi.kpi,
        label: kpiLabels[kpi.kpi] || kpi.kpi,
        beforeValue: currentValue,
        afterValue: goalValue,
        unit: kpi.kpi.includes('rate') || kpi.kpi.includes('percentage') ? '%' : '',
        percentageChange: Math.abs(percentageChange),
        trend: percentageChange > 0 ? 'up' as const : 'stable' as const,
        isPositive: percentageChange > 0
      };
    }) : sampleResultsData.kpiProgress;
    
    // Parse progress data
    let newImprovements: string[] = [];
    let newAchievements: string[] = [];
    let notes: Array<{ text: string; date: string }> = [];
    
    if (newImprovementsParam) {
      try {
        newImprovements = JSON.parse(newImprovementsParam);
      } catch (e) {
        console.error('Error parsing newImprovements:', e);
      }
    }
    
    if (newAchievementsParam) {
      try {
        newAchievements = JSON.parse(newAchievementsParam);
      } catch (e) {
        console.error('Error parsing newAchievements:', e);
      }
    }

    if (notesParam) {
      try {
        notes = JSON.parse(notesParam);
        console.log('Notes param received:', notesParam);
        console.log('Notes parsed successfully:', notes);
        console.log('Notes type after parsing:', typeof notes);
        console.log('Notes length after parsing:', notes?.length);
      } catch (e) {
        console.error('Error parsing notes:', e);
        console.error('Notes param that failed to parse:', notesParam);
      }
    } else {
      console.log('No notes param received');
    }

    // Calculate score using the new scoring system
    const calculatedScore = calculateBaselineScore(
      salesConfidenceBefore,
      selectedKPIs,
      selectedNonFinancialKPIs,
      revenueForecastConfidence || '',
      jobDescriptionsClarity || ''
    );

    const resultsData = {
      ...sampleResultsData,
      participantName,
      practiceName,
      salesConfidenceBefore,
      salesConfidenceAfter,
      coachingScore: calculatedScore,
      kpiProgress: customKpiProgress,
      // Combine baseline improvements with new progress updates
      nonFinancialImprovements: newImprovements.length > 0 ? newImprovements : sampleResultsData.nonFinancialImprovements,
      successAchievements: newAchievements.length > 0 ? newAchievements : sampleResultsData.successAchievements,
      notes: notes,
      // Add user's custom data to the results
      userData: {
        email: email || undefined,
        selectedKPIs,
        selectedNonFinancialKPIs,
        revenueForecastConfidence: revenueForecastConfidence || undefined,
        jobDescriptionsClarity: jobDescriptionsClarity || undefined,
        successDefinition: successDefinition || undefined
      }
    };
    
    console.log('Final results data being passed to ResultsCard:');
    console.log('Notes in results data:', resultsData.notes);
    console.log('Notes type:', typeof resultsData.notes);
    console.log('Notes length:', resultsData.notes?.length);
    
    return resultsData;
  };

  // Sample data for the results card
  const sampleResultsData = {
    participantName: "Dr. Sarah Johnson",
    practiceName: "Radiant Aesthetics Med Spa",
    programDuration: "6 Weeks",
    completionDate: "March 15, 2024",
    salesConfidenceBefore: 2,
    salesConfidenceAfter: 5,
    coachingScore: 94,
    kpiProgress: [
      {
        kpi: "monthly_revenue",
        label: "Monthly Revenue",
        beforeValue: "65,000",
        afterValue: "89,000",
        unit: "",
        percentageChange: 37,
        trend: "up" as const,
        isPositive: true
      },
      {
        kpi: "conversion_rate",
        label: "Conversion Rate",
        beforeValue: "32",
        afterValue: "57",
        unit: "%",
        percentageChange: 78,
        trend: "up" as const,
        isPositive: true
      },
      {
        kpi: "average_transaction",
        label: "Average Transaction",
        beforeValue: "850",
        afterValue: "1,240",
        unit: "",
        percentageChange: 46,
        trend: "up" as const,
        isPositive: true
      }
    ],
    nonFinancialImprovements: [
      "Increased team confidence in sales conversations",
      "Enhanced patient consultation experience",
      "Improved treatment recommendation clarity",
      "Better objection handling techniques",
      "Strengthened patient-provider relationships",
      "More effective follow-up processes"
    ],
    successAchievements: [
      "Exceeded monthly revenue goal by 15%",
      "Achieved highest conversion rate in practice history",
      "Implemented systematic sales process",
      "Trained entire team on new consultation framework",
      "Established KPI tracking system",
      "Created patient retention program"
    ]
  };

  if (currentView === 'assessment') {
    return <BaselineAssessment onBack={() => setCurrentView('demo')} />;
  }

  if (currentView === 'results') {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00d9ff] mx-auto mb-4"></div>
            <p className="text-white/70">Loading your results...</p>
          </div>
        </div>
      );
    }
    
    // Use real assessment data if available, otherwise fallback to demo data
    const resultsData = assessmentData || getFallbackData();
    const weekNumber = parseInt(searchParams.get('weekNumber') || '0');
    const lastUpdated = searchParams.get('lastUpdated');
    
    console.log('ResultsCard being called with data:');
    console.log('resultsData.kpiProgress:', resultsData.kpiProgress);
    console.log('resultsData.kpiProgress length:', resultsData.kpiProgress?.length);
    resultsData.kpiProgress?.forEach((kpi: any, index: number) => {
      console.log(`ResultsCard KPI ${index}:`, {
        label: kpi.label,
        beforeValue: kpi.beforeValue,
        afterValue: kpi.afterValue,
        percentageChange: kpi.percentageChange
      });
    });
    
    return <ResultsCard 
      {...resultsData} 
      userData={resultsData.userData}
      weekNumber={weekNumber || undefined}
      lastUpdated={lastUpdated || undefined}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10 pt-10 leading-tight py-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Coaching Badge */}
          <motion.div
            className="mb-2 pt-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full">
              <Shield className="text-green-400 mr-2" size={16} />
              <span className="text-xs md:text-sm font-normal text-green-400">
                Professional Coaching • 6-Week Program
              </span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="mt-8 text-4xl md:text-5xl lg:text-7xl max-w-4xl mx-auto font-bold mb-8 py-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span 
              className="text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              6-Week{' '}
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" 
              style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              Transformation
            </motion.span>
            <motion.span 
              className="text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {' '}Program
            </motion.span>
          </motion.h1>
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8 text-sm md:text-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="flex items-center gap-2" variants={itemVariants}>
              <BarChart3 className="text-green-400" size={20} />
              <span className="text-white/90">Measurable Growth</span>
            </motion.div>
            <motion.div className="flex items-center gap-2" variants={itemVariants}>
              <Users className="text-blue-400" size={20} />
              <span className="text-white/90">Personal Alignment</span>
            </motion.div>
            <motion.div className="flex items-center gap-2" variants={itemVariants}>
              <Target className="text-purple-500" size={20} />
              <span className="text-white/90">Long-term Impact</span>
            </motion.div>
          </motion.div>
          <motion.div 
            className="max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-white/70 text-lg leading-relaxed">
              A structured, repeatable system that ensures every coaching engagement delivers measurable growth, 
              personal alignment, and long-term impact. This process supports individual accountability, 
              team momentum, and leadership clarity on ROI.
            </p>
          </motion.div>
        </motion.div>

        {/* Process Overview */}
        <motion.div
          ref={processRef}
          className="mb-16 pt-12"
          initial="hidden"
          animate={processInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-8 text-center"
            variants={itemVariants}
          >
            Our Process
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            <motion.div className="text-center" variants={cardVariants}>
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <BarChart3 className="text-blue-400" size={24} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">1. Baseline Assessment</h3>
              <p className="text-white/70">
                Comprehensive evaluation of current sales confidence, KPIs, and operational metrics
              </p>
            </motion.div>
            
            <motion.div className="text-center" variants={cardVariants}>
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Users className="text-blue-400" size={24} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">2. Personalized Coaching</h3>
              <p className="text-white/70">
                6-week intensive program tailored to your specific challenges and goals
              </p>
            </motion.div>
            
            <motion.div className="text-center" variants={cardVariants}>
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Trophy className="text-blue-400" size={24} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">3. Results & Growth</h3>
              <p className="text-white/70">
                Measurable improvements in confidence, KPIs, and overall practice performance
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          ref={featuresRef}
          className="mb-20 max-w-5xl mx-auto pt-12"
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-8 text-center pt-12"
            variants={itemVariants}
          >
            What Makes It Different
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <Target className="text-purple-400 mb-4" size={24} />
              <h3 className="text-xl font-bold text-white mb-3">Structured & Repeatable</h3>
              <p className="text-white/70">
                Every coaching engagement follows a proven framework that ensures consistent, measurable results across all participants.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <BarChart3 className="text-purple-400 mb-4" size={24} />
              <h3 className="text-xl font-bold text-white mb-3">Data-Driven Approach</h3>
              <p className="text-white/70">
                Track specific KPIs and metrics to ensure tangible improvements and clear ROI for leadership.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <Users className="text-purple-400 mb-4" size={24} />
              <h3 className="text-xl font-bold text-white mb-3">Individual Accountability</h3>
              <p className="text-white/70">
                Personal baseline assessments and progress tracking ensure each participant stays accountable to their goals.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <Trophy className="text-purple-400 mb-4" size={24} />
              <h3 className="text-xl font-bold text-white mb-3">Long-term Impact</h3>
              <p className="text-white/70">
                Beyond immediate results, participants develop sustainable skills and systems for continued growth.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Demo Actions */}
        <motion.div
          ref={demoActionsRef}
          className="text-center mb-32 pt-12"
          initial="hidden"
          animate={demoActionsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-8"
            variants={itemVariants}
          >
            Experience the System
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-blue-400/20 to-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <BarChart3 className="text-blue-400" size={24} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4">Try the Assessment</h3>
              <p className="text-white/70 mb-6">
                Experience our comprehensive baseline assessment that captures current state, goals, and success metrics.
              </p>
              <motion.button
                onClick={() => setCurrentView('assessment')}
                className="w-full px-6 py-3 bg-blue-400/20 text-white rounded-xl font-semibold hover:bg-blue-400/80 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Assessment</span>
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-purple-400/20 to-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Trophy className="text-purple-400" size={24} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4">Track Your Progress</h3>
              <p className="text-white/70 mb-6">
                Enter your practice name and email to view your current results and update your weekly progress.
              </p>
              <motion.button
                onClick={() => navigate('/progress-update')}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Results</span>
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ROI Benefits */}
        <motion.div
          ref={roiRef}
          className="bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-3xl p-8 text-center mb-16 pt-10 max-w-5xl mx-auto"
          initial="hidden"
          animate={roiInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Leadership ROI Clarity
          </motion.h2>
          <motion.p 
            className="text-white/80 text-lg mb-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            Our structured assessment and results system provides leadership with clear visibility into coaching investment returns, 
            team momentum, and individual accountability metrics.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-xl mx-auto"
            variants={containerVariants}
          >
            <motion.div 
              className="bg-white/5 rounded-3xl p-6"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-blue-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={roiInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                37%
              </motion.div>
              <p className="text-white/70 text-sm">Average Revenue Increase</p>
            </motion.div>
            <motion.div 
              className="bg-white/5 rounded-3xl p-6"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-blue-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={roiInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                78%
              </motion.div>
              <p className="text-white/70 text-sm">Conversion Rate Improvement</p>
            </motion.div>
            <motion.div 
              className="bg-white/5 rounded-3xl p-6"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-blue-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={roiInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                94%
              </motion.div>
              <p className="text-white/70 text-sm">Average Completion Score</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoachingDemo; 