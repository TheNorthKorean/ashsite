import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  Info, 
  Crown, 
  Star, 
  Save,
  Send,
  Globe,
  User,
  Mail,
  Building,
  Award,
  Target,
  MessageSquare,
  Shield,
  CheckCircle
} from 'lucide-react';
import SuccessPage from './SuccessPage';

const Application = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    // Step 1: Track Selection & Basic Info
    track: '',
    fullName: '',
    email: '',
    professionalTitle: '',
    organization: '',
    country: '',
    linkedinUrl: '',
    
    // Step 2: Experience & Expertise
    yearsExperience: '',
    briefBio: '',
    areasOfExpertise: [] as string[],
    
    // Step 3: Motivation & Achievements
    motivationStatement: '',
    achievements: '',
    howDidYouHear: '',
    
    // Step 4: Privacy & Consent
    gdprConsent: false,
    marketingConsent: false,
    termsAccepted: false,
  });

  const steps = [
    {
      title: 'Track & Basic Info',
      description: 'Choose your track and provide basic information',
      icon: User,
      fields: ['track', 'fullName', 'email', 'professionalTitle', 'organization', 'country', 'linkedinUrl']
    },
    {
      title: 'Experience & Expertise',
      description: 'Tell us about your background and skills',
      icon: Award,
      fields: ['yearsExperience', 'briefBio', 'areasOfExpertise']
    },
    {
      title: 'Motivation & Achievements',
      description: 'Share your goals and accomplishments',
      icon: Target,
      fields: ['motivationStatement', 'achievements', 'howDidYouHear']
    },
    {
      title: 'Privacy & Consent',
      description: 'Review and accept our terms',
      icon: Shield,
      fields: ['gdprConsent', 'termsAccepted']
    }
  ];

  const expertiseAreas = [
    'Sales Training', 'Business Development', 'Marketing', 'Social Media',
    'Finance & Accounting', 'Operations Management', 'Compliance & Legal',
    'Clinical Practice', 'Product Knowledge', 'Team Leadership',
    'Customer Service', 'Technology Integration', 'Practice Management',
    'Mergers & Acquisitions', 'Career Development', 'Training & Education'
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway',
    'Denmark', 'Switzerland', 'Austria', 'Belgium', 'Other'
  ];

  const hearAboutOptions = [
    'Google Search', 'Social Media', 'Industry Conference', 'Colleague Referral',
    'Professional Network', 'Email Newsletter', 'Webinar', 'Podcast',
    'Industry Publication', 'Partner Organization', 'Other'
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      setIsAutoSaving(true);
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('applicationFormData', JSON.stringify(formData));
        setIsAutoSaving(false);
        setLastSaved(new Date());
      }, 1000);
    };

    const timeoutId = setTimeout(autoSave, 2000);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('applicationFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (stepIndex: number) => {
    const stepFields = steps[stepIndex].fields;
    const newErrors: Record<string, string> = {};

    stepFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      
      switch (field) {
        case 'track':
          if (!value) newErrors[field] = 'Please select a track';
          break;
        case 'fullName':
          if (!value || (value as string).length < 2) newErrors[field] = 'Full name is required';
          break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value || !emailRegex.test(value as string)) newErrors[field] = 'Valid email is required';
          break;
        case 'professionalTitle':
          if (!value) newErrors[field] = 'Professional title is required';
          break;
        case 'organization':
          if (!value) newErrors[field] = 'Organization is required';
          break;
        case 'country':
          if (!value) newErrors[field] = 'Country is required';
          break;
        case 'linkedinUrl':
          const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
          if (!value || !linkedinRegex.test(value as string)) newErrors[field] = 'Valid LinkedIn URL is required';
          break;
        case 'yearsExperience':
          if (!value || parseInt(value as string) < 1) newErrors[field] = 'Years of experience is required';
          break;
        case 'briefBio':
          const bioLength = (value as string)?.length || 0;
          if (bioLength < 150 || bioLength > 500) newErrors[field] = 'Bio must be 150-500 characters';
          break;
        case 'areasOfExpertise':
          if (!Array.isArray(value) || value.length === 0) newErrors[field] = 'Select at least one area of expertise';
          break;
        case 'motivationStatement':
          if (!value || (value as string).length < 100) newErrors[field] = 'Motivation statement must be at least 100 characters';
          break;
        case 'achievements':
          if (!value || (value as string).length < 50) newErrors[field] = 'Please describe your achievements (min 50 characters)';
          break;
        case 'howDidYouHear':
          if (!value) newErrors[field] = 'Please tell us how you heard about us';
          break;
        case 'gdprConsent':
          if (!value) newErrors[field] = 'GDPR consent is required';
          break;
        case 'termsAccepted':
          if (!value) newErrors[field] = 'You must accept the terms and conditions';
          break;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Add this helper for encoding form data for Netlify
  const encode = (data: Record<string, any>) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  // Update handleSubmit to POST to Netlify
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validateStep(currentStep)) {
      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "application",
            ...formData,
          }),
        });
        localStorage.removeItem('applicationFormData');
        setIsSubmitted(true);
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
  };

  const getStepProgress = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  const renderTooltip = (text: string) => (
    <div className="group relative inline-block ml-2">
      <Info size={16} className="text-white/50 hover:text-[#00d9ff] cursor-help" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );

  if (isSubmitted) {
    return <SuccessPage track={formData.track} />;
  }

  return (
    <div className="pt-24 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      <section className="py-12 relative overflow-hidden">
        <motion.div
          ref={ref}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join Our
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Expert Network
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/70 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Apply to become a Faculty member or Ambassador and help shape the future of aesthetic sales training.
          </motion.p>

          {/* Progress Indicator */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-[#00d9ff] border-[#00d9ff] text-black' 
                      : 'border-white/30 text-white/50'
                  }`}>
                    {index < currentStep ? (
                      <Check size={20} />
                    ) : (
                      <step.icon size={20} />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      index < currentStep ? 'bg-[#00d9ff]' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getStepProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-white/60 mb-0">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(getStepProgress())}% Complete</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="pb-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <form
            name="application"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="application" />
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" onChange={() => {}} />
              </label>
            </p>
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Auto-save indicator */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
                  <p className="text-white/70">{steps[currentStep].description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  {isAutoSaving ? (
                    <>
                      <Save size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : lastSaved ? (
                    <>
                      <Check size={16} className="text-green-400" />
                      <span>Saved {lastSaved.toLocaleTimeString()}</span>
                    </>
                  ) : null}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Track Selection & Basic Info */}
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      {/* Track Selection */}
                      <div>
                        <label className="block text-lg font-semibold mb-4">
                          Select Your Track <span className="text-red-400">*</span>
                          {renderTooltip('Choose between Faculty (content creation) or Ambassador (promotion) track')}
                        </label>
                        <div className="grid md:grid-cols-2 gap-4">
                          <label className="cursor-pointer">
                            <input
                              type="radio"
                              name="track"
                              value="Faculty"
                              checked={formData.track === 'Faculty'}
                              onChange={(e) => handleInputChange('track', e.target.value)}
                              className="sr-only"
                            />
                            <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                              formData.track === 'Faculty'
                                ? 'border-[#00d9ff] bg-[#00d9ff]/10'
                                : 'border-white/20 hover:border-white/40'
                            }`}>
                              <div className="flex items-center gap-3 mb-3">
                                <Crown className={`${formData.track === 'Faculty' ? 'text-[#00d9ff]' : 'text-white/70'}`} size={24} />
                                <h3 className="text-xl font-bold">Faculty Track</h3>
                              </div>
                              <p className="text-white/70 text-sm">Create content, lead training sessions, and share your expertise</p>
                            </div>
                          </label>
                          
                          <label className="cursor-pointer">
                            <input
                              type="radio"
                              name="track"
                              value="Ambassador"
                              checked={formData.track === 'Ambassador'}
                              onChange={(e) => handleInputChange('track', e.target.value)}
                              className="sr-only"
                            />
                            <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                              formData.track === 'Ambassador'
                                ? 'border-[#ff41fd] bg-[#ff41fd]/10'
                                : 'border-white/20 hover:border-white/40'
                            }`}>
                              <div className="flex items-center gap-3 mb-3">
                                <Star className={`${formData.track === 'Ambassador' ? 'text-[#ff41fd]' : 'text-white/70'}`} size={24} />
                                <h3 className="text-xl font-bold">Ambassador Track</h3>
                              </div>
                              <p className="text-white/70 text-sm">Promote our platform and earn commissions through referrals</p>
                            </div>
                          </label>
                        </div>
                        {errors.track && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                            <AlertCircle size={16} />
                            {errors.track}
                          </p>
                        )}
                      </div>

                      {/* Basic Information */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                            placeholder="Enter your full name"
                            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                          />
                          {errors.fullName && (
                            <p id="fullName-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                              <AlertCircle size={14} />
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                            placeholder="Enter your email address"
                            aria-describedby={errors.email ? 'email-error' : undefined}
                          />
                          {errors.email && (
                            <p id="email-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                              <AlertCircle size={14} />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Professional Title/Role <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="professionalTitle"
                            value={formData.professionalTitle}
                            onChange={(e) => handleInputChange('professionalTitle', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                            placeholder="e.g., Medical Director, Sales Manager"
                            aria-describedby={errors.professionalTitle ? 'professionalTitle-error' : undefined}
                          />
                          {errors.professionalTitle && (
                            <p id="professionalTitle-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                              <AlertCircle size={14} />
                              {errors.professionalTitle}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Organization/Institution <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={(e) => handleInputChange('organization', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                            placeholder="Enter your organization name"
                            aria-describedby={errors.organization ? 'organization-error' : undefined}
                          />
                          {errors.organization && (
                            <p id="organization-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                              <AlertCircle size={14} />
                              {errors.organization}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Country <span className="text-red-400">*</span>
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                            aria-describedby={errors.country ? 'country-error' : undefined}
                          >
                            <option value="">Select your country</option>
                            {countries.map(country => (
                              <option key={country} value={country} className="bg-gray-900">
                                {country}
                              </option>
                            ))}
                          </select>
                          {errors.country && (
                            <p id="country-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                              <AlertCircle size={14} />
                              {errors.country}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            LinkedIn Profile URL <span className="text-red-400">*</span>
                            {renderTooltip('Must be a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourname)')}
                          </label>
                          <input
                            type="url"
                            name="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                            placeholder="https://linkedin.com/in/yourname"
                            aria-describedby={errors.linkedinUrl ? 'linkedinUrl-error' : undefined}
                          />
                          {errors.linkedinUrl && (
                            <p id="linkedinUrl-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                              <AlertCircle size={14} />
                              {errors.linkedinUrl}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Experience & Expertise */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Years of Relevant Experience <span className="text-red-400">*</span>
                          {renderTooltip('Years of experience in aesthetic medicine, sales, or related field')}
                        </label>
                        <select
                          name="yearsExperience"
                          value={formData.yearsExperience}
                          onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                          aria-describedby={errors.yearsExperience ? 'yearsExperience-error' : undefined}
                        >
                          <option value="">Select years of experience</option>
                          <option value="1-2" className="bg-gray-900">1-2 years</option>
                          <option value="3-5" className="bg-gray-900">3-5 years</option>
                          <option value="6-10" className="bg-gray-900">6-10 years</option>
                          <option value="11-15" className="bg-gray-900">11-15 years</option>
                          <option value="16+" className="bg-gray-900">16+ years</option>
                        </select>
                        {errors.yearsExperience && (
                          <p id="yearsExperience-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                            <AlertCircle size={14} />
                            {errors.yearsExperience}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Brief Bio <span className="text-red-400">*</span>
                          {renderTooltip('150-500 characters describing your background and expertise')}
                        </label>
                        <textarea
                          name="briefBio"
                          value={formData.briefBio}
                          onChange={(e) => handleInputChange('briefBio', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors resize-none"
                          placeholder="Tell us about your background, expertise, and what makes you unique in the aesthetic industry..."
                          aria-describedby={errors.briefBio ? 'briefBio-error' : undefined}
                        />
                        <div className="flex justify-between items-center mt-2">
                          <span className={`text-sm ${
                            formData.briefBio.length < 150 ? 'text-red-400' : 
                            formData.briefBio.length > 500 ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {formData.briefBio.length}/500 characters
                          </span>
                          <span className="text-sm text-white/60">
                            {150 - formData.briefBio.length > 0 ? `${150 - formData.briefBio.length} more needed` : 'Minimum reached'}
                          </span>
                        </div>
                        {errors.briefBio && (
                          <p id="briefBio-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                            <AlertCircle size={14} />
                            {errors.briefBio}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-4">
                          Areas of Expertise <span className="text-red-400">*</span>
                          {renderTooltip('Select all areas where you have significant experience')}
                        </label>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {expertiseAreas.map(area => (
                            <label key={area} className="cursor-pointer">
                              <input
                                type="checkbox"
                                name="areasOfExpertise"
                                value={area}
                                checked={formData.areasOfExpertise.includes(area)}
                                onChange={(e) => {
                                  const newAreas = e.target.checked
                                    ? [...formData.areasOfExpertise, area]
                                    : formData.areasOfExpertise.filter(a => a !== area);
                                  handleInputChange('areasOfExpertise', newAreas);
                                }}
                                className="sr-only"
                              />
                              <div className={`p-3 rounded-lg border transition-all duration-300 ${
                                formData.areasOfExpertise.includes(area)
                                  ? 'border-[#00d9ff] bg-[#00d9ff]/10 text-[#00d9ff]'
                                  : 'border-white/20 hover:border-white/40'
                              }`}>
                                <span className="text-sm font-medium">{area}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.areasOfExpertise && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                            <AlertCircle size={14} />
                            {errors.areasOfExpertise}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Motivation & Achievements */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Motivation Statement <span className="text-red-400">*</span>
                          {renderTooltip('Why are you interested in this role? What do you hope to achieve?')}
                        </label>
                        <textarea
                          name="motivationStatement"
                          value={formData.motivationStatement}
                          onChange={(e) => handleInputChange('motivationStatement', e.target.value)}
                          rows={5}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors resize-none"
                          placeholder="Tell us why you're interested in joining our network and what you hope to contribute..."
                          aria-describedby={errors.motivationStatement ? 'motivationStatement-error' : undefined}
                        />
                        <div className="flex justify-between items-center mt-2">
                          <span className={`text-sm ${
                            formData.motivationStatement.length < 100 ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {formData.motivationStatement.length} characters
                          </span>
                          <span className="text-sm text-white/60">
                            {100 - formData.motivationStatement.length > 0 ? `${100 - formData.motivationStatement.length} more needed` : 'Minimum reached'}
                          </span>
                        </div>
                        {errors.motivationStatement && (
                          <p id="motivationStatement-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                            <AlertCircle size={14} />
                            {errors.motivationStatement}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Relevant Achievements/Experience <span className="text-red-400">*</span>
                          {renderTooltip('Highlight your key accomplishments, awards, or notable experiences')}
                        </label>
                        <textarea
                          name="achievements"
                          value={formData.achievements}
                          onChange={(e) => handleInputChange('achievements', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors resize-none"
                          placeholder="List your key achievements, awards, publications, speaking engagements, or other relevant accomplishments..."
                          aria-describedby={errors.achievements ? 'achievements-error' : undefined}
                        />
                        <div className="mt-2">
                          <span className={`text-sm ${
                            formData.achievements.length < 50 ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {formData.achievements.length} characters
                          </span>
                        </div>
                        {errors.achievements && (
                          <p id="achievements-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                            <AlertCircle size={14} />
                            {errors.achievements}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          How did you hear about us? <span className="text-red-400">*</span>
                        </label>
                        <select
                          name="howDidYouHear"
                          value={formData.howDidYouHear}
                          onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                          aria-describedby={errors.howDidYouHear ? 'howDidYouHear-error' : undefined}
                        >
                          <option value="">Select how you heard about us</option>
                          {hearAboutOptions.map(option => (
                            <option key={option} value={option} className="bg-gray-900">
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.howDidYouHear && (
                          <p id="howDidYouHear-error" className="text-red-400 text-sm mt-1 flex items-center gap-2">
                            <AlertCircle size={14} />
                            {errors.howDidYouHear}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Privacy & Consent */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-[#00d9ff]/10 to-[#ff41fd]/10 backdrop-blur-sm border border-[#00d9ff]/30 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <Shield className="text-[#00d9ff]" size={24} />
                          Privacy & Data Protection
                        </h3>
                        <p className="text-white/80 mb-4">
                          We take your privacy seriously. Please review and accept our terms to complete your application.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="gdprConsent"
                            checked={formData.gdprConsent}
                            onChange={(e) => handleInputChange('gdprConsent', e.target.checked)}
                            className="mt-1 w-5 h-5 text-[#00d9ff] bg-white/5 border-white/20 rounded focus:ring-[#00d9ff] focus:ring-2"
                          />
                          <div>
                            <span className="text-white font-medium">
                              GDPR Consent <span className="text-red-400">*</span>
                            </span>
                            <p className="text-white/70 text-sm mt-1">
                              I consent to the processing of my personal data in accordance with the 
                              <a href="#" className="text-[#00d9ff] hover:underline ml-1">Privacy Policy</a>. 
                              You can withdraw this consent at any time.
                            </p>
                          </div>
                        </label>
                        {errors.gdprConsent && (
                          <p className="text-red-400 text-sm flex items-center gap-2 ml-8">
                            <AlertCircle size={14} />
                            {errors.gdprConsent}
                          </p>
                        )}

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="marketingConsent"
                            checked={formData.marketingConsent}
                            onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                            className="mt-1 w-5 h-5 text-[#00d9ff] bg-white/5 border-white/20 rounded focus:ring-[#00d9ff] focus:ring-2"
                          />
                          <div>
                            <span className="text-white font-medium">Marketing Communications</span>
                            <p className="text-white/70 text-sm mt-1">
                              I would like to receive updates about new features, training opportunities, 
                              and industry insights via email. You can unsubscribe at any time.
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                            className="mt-1 w-5 h-5 text-[#00d9ff] bg-white/5 border-white/20 rounded focus:ring-[#00d9ff] focus:ring-2"
                          />
                          <div>
                            <span className="text-white font-medium">
                              Terms and Conditions <span className="text-red-400">*</span>
                            </span>
                            <p className="text-white/70 text-sm mt-1">
                              I have read and agree to the 
                              <a href="#" className="text-[#00d9ff] hover:underline mx-1">Terms of Service.</a>
                            </p>
                          </div>
                        </label>
                        {errors.termsAccepted && (
                          <p className="text-red-400 text-sm flex items-center gap-2 ml-8">
                            <AlertCircle size={14} />
                            {errors.termsAccepted}
                          </p>
                        )}
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h4 className="font-semibold mb-3">Application Review Process</h4>
                        <ul className="space-y-2 text-white/70 text-sm">
                          <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-400" />
                            Application submitted and acknowledged
                          </li>
                          <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-400" />
                            Initial review by our team (5-7 business days)
                          </li>
                          <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-400" />
                            Screening call with selected candidates
                          </li>
                          <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-400" />
                            Final interview and onboarding process
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 0
                      ? 'bg-white/5 text-white/40 cursor-not-allowed'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>
                <div className="flex items-center gap-4">
                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                      Next Step
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                      Submit Application
                      <Send size={20} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Application;