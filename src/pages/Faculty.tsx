import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  TrendingUp, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Filter,
  CheckCircle,
  ArrowRight,
  Building,
  User,
  DollarSign,
  BarChart3,
  Target,
  Zap,
  Clock,
  Mail,
  Phone,
  Globe,
  Shield,
  Crown,
  Briefcase
} from 'lucide-react';

const Faculty = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [currentStep, setCurrentStep] = useState(0);

  // Auto-advance application steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Create array of logo paths - matching Home page format
  const companies = Array.from({ length: 27 }, (_, index) => {
    const companyNumber = index + 1;
    // Skip company 15
    if (companyNumber === 15) return null;
    return {
      name: `Company ${companyNumber}`,
      logo: `/logos/${companyNumber}.png`
    };
  }).filter((company): company is { name: string; logo: string } => company !== null); // Remove null entries

  const specialties = [
    { id: 'all', name: 'All Specialties', count: 35 },
    { id: 'finance', name: 'Finance', count: 12 },
    { id: 'marketing', name: 'M&A', count: 8 },
    { id: 'operations', name: 'Operations', count: 6 },
    { id: 'compliance', name: 'Compliance & Law', count: 5 },
    { id: 'social', name: 'Social Media & Marketing', count: 4 },
    { id: 'clinical', name: 'Clinical', count: 7 },
    { id: 'manufacturers', name: 'Manufacturers', count: 9 },
    { id: 'career', name: 'Career Development', count: 3 }
  ];

  const facultyMembers = [
    {
      name: 'Dr. Sarah Chen',
      title: 'Lead Sales Trainer & Medical Director',
      specialty: 'finance',
      experience: '15+ years',
      achievements: ['Generated $50M+ in practice revenue', 'Trained 500+ professionals', 'Industry Speaker'],
      image: '👩‍⚕️',
      content: 'Advanced Consultation Psychology',
      progress: 85
    },
    {
      name: 'Michael Rodriguez',
      title: 'Senior Sales Coach',
      specialty: 'finance',
      experience: '12+ years',
      achievements: ['95% average conversion rate', 'Top performer 8 years running', 'Certification Program Developer'],
      image: '👨‍💼',
      content: 'Objection Handling Mastery',
      progress: 92
    },
    {
      name: 'Dr. Amanda Foster',
      title: 'Practice Growth Specialist',
      specialty: 'operations',
      experience: '10+ years',
      achievements: ['Built 3 multi-million practices', 'Team efficiency expert', 'Published researcher'],
      image: '👩‍⚕️',
      content: 'Team Training Systems',
      progress: 78
    },
    {
      name: 'James Thompson',
      title: 'Technology Integration Expert',
      specialty: 'marketing',
      experience: '8+ years',
      achievements: ['AI training pioneer', 'Software development lead', 'Innovation award winner'],
      image: '👨‍💻',
      content: 'Digital Sales Tools',
      progress: 88
    }
  ];

  const applicationSteps = [
    {
      title: 'Interest Form',
      description: 'Submit your initial application',
      icon: Mail,
      status: 'completed'
    },
    {
      title: 'Application Review',
      description: 'Our team evaluates your credentials',
      icon: Shield,
      status: 'current'
    },
    {
      title: 'Terms Acceptance',
      description: 'Review and accept partnership terms',
      icon: CheckCircle,
      status: 'pending'
    },
    {
      title: 'Credential Provision',
      description: 'Receive all-access credentials',
      icon: Crown,
      status: 'pending'
    },
    {
      title: 'Content Launch',
      description: 'Begin content submission and promotion',
      icon: Zap,
      status: 'pending'
    }
  ];

  const faqItems = [
    {
      question: 'What are the requirements to become a Faculty member?',
      answer: 'Faculty members must have verified business credentials, 5+ years of industry experience, and demonstrated expertise in their specialty area. We also require a proven track record of training or educating others in the aesthetic field.'
    },
    {
      question: 'How does the revenue sharing work for Faculty?',
      answer: 'Faculty members receive a percentage of revenue generated from their content and training sessions. The exact percentage varies based on content type, engagement metrics, and exclusivity agreements. Detailed terms are provided during the application process.'
    },
    {
      question: 'What support do Ambassadors receive?',
      answer: 'Ambassadors get access to promotional tools, personalized referral systems, marketing materials, and ongoing training. We also provide performance analytics and dedicated support to help maximize your success.'
    },
    {
      question: 'Can I apply for both tracks?',
      answer: 'While you can express interest in both tracks, we typically recommend starting with the track that best matches your current professional status and goals. You can always transition between tracks as your involvement grows.'
    },
    {
      question: 'How long does the application process take?',
      answer: 'The typical application process takes 2-3 weeks from initial submission to final approval. This includes credential verification, content review, and onboarding preparation.'
    }
  ];

  const filteredFaculty = selectedFilter === 'all' 
    ? facultyMembers 
    : facultyMembers.filter(member => member.specialty === selectedFilter);

  return (
    <div className="pt-10 md:pt-24 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          ref={ref}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Applications Badge */}
          <motion.div
            className="flex justify-center mb-6 md:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full"
              animate={{
                scale: [1, 1.01, 1],
                boxShadow: [
                  '0 0 0px rgba(34, 197, 94, 0.3)',
                  '0 0 20px rgba(34, 197, 94, 0.4)',
                  '0 0 0px rgba(34, 197, 94, 0.3)'
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 // Start continuous animation after intro
              }}
            >
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full mr-3"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.span 
                className="text-sm font-normal text-green-400"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { 
                  opacity: 1, 
                  x: 0,
                  color: ['#4ade80', '#22c55e', '#4ade80']
                } : { opacity: 0, x: -10 }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut",
                  delay: 0.4,
                  color: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }
                }}
              >
                Now Accepting Applications
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Faculty &
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Ambassadors
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed mb-8 md:mb-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join our elite network of industry experts and help shape the future of aesthetic sales training. 
            Share your expertise, build your brand, and generate revenue through our platform.
          </motion.p>

          <motion.div
            className="flex flex-col-2 sm:flex-row gap-2 md:gap-4 justify-center pt-0 md:pt-5 px-0 md:px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/application">
              <motion.button
                className="group relative px-10 py-4 md:px-8 md:py-4 bg-gradient-to-r from-[#00d9ff] to-[#00bfff] rounded-xl font-medium text-sm md:text-base overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
            </Link>
            <motion.button
              className="group px-6 py-2 md:px-8 md:py-4 bg-gray-800/60 backdrop-blur-sm border-2 border-gray-700/50 rounded-xl font-medium text-sm md:text-base hover:bg-gray-800/80 hover:border-[#00d9ff]/50 transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('application-process');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Play size={20} />
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Partner Showcase - Matching Home Page Format */}
      <section className="py-10 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0" />
        
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-lg md:text-xl font-medium mb-2 text-white/90"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Current Faculty Members
          </motion.h2>

          <div className="relative max-w-6xl mx-auto">
            <div className="flex overflow-hidden">
              <motion.div
                className="flex items-center gap-8 md:gap-16"
                animate={{
                  x: [0, -100 * companies.length - 100],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 60,
                    ease: "linear",
                  },
                }}
              >
                {[...companies, ...companies].map((company, index) => (
                  <motion.div
                    key={`${company.name}-${index}`}
                    className="flex items-center justify-center min-w-max group"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    transition={{ 
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-24 md:h-28 lg:h-28 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-200 ease-out"
                      style={{
                        maxWidth: '140px',
                        minWidth: '80px'
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 w-28 h-full bg-transparent z-10" />
            <div className="absolute right-0 top-0 w-28 h-full bg-transparent z-10" />
          </div>
        </motion.div>
      </section>

      {/* The Hero Academy Section */}
      <section className="py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">The Hero Academy</h2>
            <p className="text-medium md:text-xl text-white/70 max-w-2xl mx-auto">
              Each faculty member brings unique insights into a specific niche, creating a rich well-rounded learning experience.
            </p>
          </motion.div>

          {/* Dashboard Interface */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-8 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Central Focal Image */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00d9ff]/20 to-[#ff41fd]/20 blur-2xl rounded-full"></div>
                  <div className="relative z-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-3 md:p-8 border border-white/10 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-[#00d9ff]/30 to-[#ff41fd]/30 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                      <Award className="text-[#00d9ff]" size={40} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 md:mb-4">Expert Network</h3>
                    <p className="text-white/70 text-xs md:text-sm">35+ Industry Leaders</p>
                  </div>
                </div>
              </div>

              {/* Faculty Grid */}
              <div className="lg:col-span-2">
                {/* Specialty Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty.id}
                      onClick={() => setSelectedFilter(specialty.id)}
                      className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                        selectedFilter === specialty.id
                          ? 'bg-[#00d9ff] text-black'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {specialty.name} ({specialty.count})
                    </button>
                  ))}
                </div>

                {/* Faculty Cards */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <AnimatePresence mode="wait">
                    {filteredFaculty.map((member, index) => (
                      <motion.div
                        key={member.name}
                        className="group bg-white/5 border border-white/10 rounded-xl p-2 md:p-4 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        layout
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{member.image}</div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-xs md:text-sm group-hover:text-[#00d9ff] transition-colors truncate">
                              {member.name}
                            </h4>
                            <p className="text-xs md:text-sm text-white/60 mb-1 md:mb-2">{member.title}</p>
                            <div className="text-xs md:text-sm text-[#ff41fd] mb-1 md:mb-2">{member.content}</div>
                            
                            {/* Progress Bar */}
                            <div className="w-full bg-white/10 rounded-full h-1.5 mb-1 md:mb-2">
                              <motion.div
                                className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] h-1.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${member.progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                            </div>
                            <div className="text-xs md:text-sm text-white/50">{member.progress}% Complete</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Process Section */}
      <section id="application-process" className="py-6 md:py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Application Process</h2>
            <p className="text-medium md:text-xl text-white/70 max-w-2xl mx-auto">
              Join our network in 5 simple steps. The entire process typically takes 2-3 weeks from application to launch.
            </p>
          </motion.div>

          {/* Timeline Visualization - All icons colored, no animations */}
          <div className="relative max-w-2xl md:max-w-3xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#00d9ff] to-[#ff41fd] rounded-full"></div>
            
            <div className="space-y-4 md:space-y-10">
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-6 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-1 md:mb-3">
                        <div className="w-10 h-10 md:w-10 md:h-10 bg-gradient-to-r from-[#00d9ff]/30 to-[#ff41fd]/30 rounded-xl flex items-center justify-center">
                          <step.icon className="text-[#00d9ff]" size={20} />
                        </div>
                        <h3 className="text-base md:text-lg font-bold">{step.title}</h3>
                      </div>
                      <p className="text-xs md:text-base text-white/70">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 border-black bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] z-10">
                    <div className="w-full h-full rounded-full scale-50" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dual Application Paths - Side by Side */}
      <section className="py-10 md:py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Choose Your Path</h2>
            <p className="text-medium md:text-xl text-white/70 max-w-3xl mx-auto">
              Select the track that best matches your professional status and goals.
            </p>
          </motion.div>

          {/* Both Tracks Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Faculty Track */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Crown className="text-[#00d9ff]" size={32} />
                <h3 className="text-2xl font-bold">Faculty Track</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-[#00d9ff]">Target Audience</h4>
                  <p className="text-white/70">Enterprise practices, manufacturers, MSOs/GPOs and industry experts</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-[#00d9ff]">Requirements</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      Verified business credentials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      5+ years industry experience
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      Proven training/education background
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-[#00d9ff]">Benefits</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-400" />
                      Revenue sharing on content
                    </li>
                    <li className="flex items-center gap-2">
                      <Globe size={16} className="text-green-400" />
                      Content hosting platform
                    </li>
                    <li className="flex items-center gap-2">
                      <BarChart3 size={16} className="text-green-400" />
                      Custom dashboard access
                    </li>
                  </ul>
                </div>
              </div>

              {/* Faculty Dashboard Preview */}
              <div className="mt-8 bg-gradient-to-br from-[#00d9ff]/10 to-[#ff41fd]/10 backdrop-blur-xl border border-[#00d9ff]/30 rounded-2xl p-6">
                <h4 className="text-lg font-bold mb-4">Faculty Dashboard Preview</h4>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Content Performance</span>
                      <span className="text-[#00d9ff] text-sm">+23% this month</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-[#00d9ff]">$12.5K</div>
                      <div className="text-xs text-white/60">Monthly Revenue</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-[#ff41fd]">2.3K</div>
                      <div className="text-xs text-white/60">Active Students</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-6">
                <Link to="/application">
                  <button className="w-full px-6 py-3 bg-[#00d9ff] rounded-xl font-semibold text-m shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    Apply for Faculty Track
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Ambassador Track */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Star className="text-[#ff41fd]" size={32} />
                <h3 className="text-2xl font-bold">Ambassador Track</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-[#ff41fd]">Target Audience</h4>
                  <p className="text-white/70">Individual practitioners, professionals, and industry influencers</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-[#ff41fd]">Requirements</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      Active industry presence
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      Professional credentials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      Commitment to promotion
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-[#ff41fd]">Benefits</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center gap-2">
                      <Target size={16} className="text-green-400" />
                      Commission structure
                    </li>
                    <li className="flex items-center gap-2">
                      <Briefcase size={16} className="text-green-400" />
                      Promotional tools
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-green-400" />
                      Personalized referral system
                    </li>
                  </ul>
                </div>
              </div>

              {/* Ambassador Tools Preview */}
              <div className="mt-8 bg-gradient-to-br from-[#ff41fd]/10 to-[#00d9ff]/10 backdrop-blur-xl border border-[#ff41fd]/30 rounded-2xl p-6">
                <h4 className="text-lg font-bold mb-4">Ambassador Tools Preview</h4>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Referral Performance</span>
                      <span className="text-[#ff41fd] text-sm">+18% this month</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#ff41fd] to-[#00d9ff] h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-[#ff41fd]">$3.2K</div>
                      <div className="text-xs text-white/60">Monthly Commissions</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-[#00d9ff]">47</div>
                      <div className="text-xs text-white/60">Active Referrals</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-6">
                <Link to="/application">
                  <button className="w-full px-6 py-3 bg-[#ff41fd] rounded-xl font-semibold text-xs md:text-base shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-1 md:gap-2">
                    Apply for Ambassador Track
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-white/70">
              Get answers to common questions about our Faculty & Ambassador programs.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:text-[#00d9ff] transition-colors duration-300"
                >
                  <h3 className="text-lg font-bold pr-8">{item.question}</h3>
                  <div className="flex-shrink-0">
                    {expandedFAQ === index ? (
                      <ChevronUp className="text-[#00d9ff]" size={24} />
                    ) : (
                      <ChevronDown className="text-white/70" size={24} />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-white/80 leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-4 md:py-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 mt-2 md:mt-0">Ready to Join Our Network?</h2>
            <p className="text-medium md:text-xl text-white/70 mb-8 leading-relaxed">
              Take the next step in your career and become part of the most influential network 
              in aesthetic sales training. Applications are reviewed on a rolling basis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/application">
                <button className="px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-semibold text-medium md:text-base shadow-lg hover:scale-105 transition-transform">
                  Start Application
                </button>
              </Link>
              <button 
                className="px-8 py-4 border-2 border-white/20 rounded-xl font-semibold text-medium md:text-base hover:bg-white/10 transition-all duration-300"
                onClick={() => window.location.href = 'mailto:contact@aestheticsaleshero.com?subject=Schedule Consultation - Faculty Program'}
              >
                Schedule Consultation
              </button>
            </div>
            
            <p className="text-sm text-white/60 mt-6">
              Questions? Contact our team at contact@aestheticsaleshero.com
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Faculty;