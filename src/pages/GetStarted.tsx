import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  TrendingUp,
  GraduationCap,
  Users, 
  Shield, 
  Clock, 
  Award,
  Play,
  Zap,
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';

const GetStarted = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Create array of logo paths - same as Home page
  const companies = Array.from({ length: 27 }, (_, index) => {
    const companyNumber = index + 1;
    // Skip company 15
    if (companyNumber === 15) return null;
    return {
      name: `Company ${companyNumber}`,
      logo: `/logos/${companyNumber}.png`
    };
  }).filter((company): company is { name: string; logo: string } => company !== null); // Remove null entries

  const trustIndicators = [
    { metric: '200+', label: 'Practices Transformed' },
    { metric: '27%', label: 'Average Revenue Increase' },
    { metric: '$90M+', label: 'Revenue Generated' },
    { metric: '95%', label: 'Success Rate' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animationOffset, setAnimationOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: 'Paulina Riedler, RN',
      role: 'CEO & Co-Founder',
      company: 'SpaKinect',
      profileImage: '/testimonials/paulina-riedler.png',
      companyLogo: '/companylogos/spakinect.png',
      rating: 5,
      testimonial: 'Aesthetic Sales Hero is the most comprehensive and affordable sales training out there for people in aesthetics. There\'s truly nothing else like it. BIANCA, their AI sales agent is incredibly helpful, like having a coach available 24/7… The best part is the platform keeps getting better!',
    },
    {
      name: 'Mary Robb',
      role: 'Founder & CEO',
      company: 'Social Practice',
      profileImage: '/testimonials/mary-robb.png',
      companyLogo: '/companylogos/socialpractice.png',
      rating: 5,
      testimonial: 'The sales framework taught through Aesthetic Sales Hero is one of the most effective I\'ve seen. It equips aesthetic providers and patient coordinators with the tools, confidence, and language needed to convert consultations into booked treatments — all while maintaining authenticity and trust with the patient.',
    },
    {
      name: 'Sonya Ellis, RN, MSN, CANS, CPSN',
      role: 'Co-Founder',
      company: 'The LAB Med Spa',
      profileImage: '/testimonials/sonya-ellis.png',
      companyLogo: '/companylogos/labmedspa.png',
      rating: 5,
      testimonial: 'I can\'t say enough great things about Aesthetic Sales Hero! I\'ve been in the aesthetics industry for 25 years now and I am actually really good at sales. However, I learned tons of great information from this course. In healthcare, we\'re not always the best at sales, but this platform makes it so easy to sell authentically and organically to your patients – all while increasing your profit margins! Well worth your time and money.',
    },
    {
      name: 'Hailey Layton',
      role: 'Financial Consultant',
      company: 'Maven Financial Partners',
      profileImage: '/testimonials/hailey-layton.jpeg',
      companyLogo: '/companylogos/mavenfinancial.png',
      rating: 5,
      testimonial: 'Aesthetic Sales Hero is a robust training program that helps everyone in the practice no matter what role you play to truly excel in their role!',
    },
    {
      name: 'Danice Richardson',
      role: 'Practice Manager',
      company: 'Genesis Med Spa',
      profileImage: '/testimonials/danice-richardson.jpeg',
      companyLogo: '/companylogos/genesismedspa.png',
      rating: 5,
      testimonial: 'Our providers are now significantly more confident in their approach to selling. They\'ve developed the skills to navigate challenging client interactions with ease and authenticity, without coming across pushy. As a result, we have noticed positive feedback from clients. The most valuable takeaway from this experience has been the transformation in how our team approaches client interactions.',
    },
    {
      name: 'Gary Bufalo',
      role: 'Chief Operating Officer',
      company: 'Princeton Medspa Partners',
      profileImage: '/testimonials/gary-bufalo.jpeg',
      companyLogo: '/companylogos/princeton-medspa.png',
      rating: 5,
      testimonial: 'As a company that acquires and partners with best in market med spas across the country, we\'re always looking for partners who can elevate our teams and help us continue to be best-in-class. Aesthetic Sales Hero has been exactly that. The coaching and consulting provided by Marco has been exceptional—our teams consistently share how interactive, encouraging, and hands-on his sessions are. The impact has been immediate, and we\'re grateful to have him as part of our growth journey.',
    },
    {
      name: 'Sheldon Larson',
      role: 'Vice President of Marketing',
      company: 'Sinclair North America',
      profileImage: '/testimonials/sheldon-larson.jpeg',
      companyLogo: '/companylogos/sinclair.png',
      rating: 5,
      testimonial: 'Aesthetic Sales Hero isn\'t just a program or platform, it\'s a mindset. The platform fills a long-standing gap in our industry by equipping not just providers, but the entire practice team, with the tools and mindset to drive meaningful, measurable impact.',
    },
    {
      name: 'Tami Thompson',
      role: 'Practice Manager',
      company: 'Princeton Medspa Partners',
      profileImage: '/testimonials/tami-thompson.jpeg',
      companyLogo: '/companylogos/princeton-medspa.png',
      rating: 5,
      testimonial: 'The comprehensive training modules and AI practice sessions have transformed how we approach patient consultations. Our team feels more confident and our patients are more satisfied with their experience.',
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increase Revenue by 27% in 90 Days',
      description: 'Our proven system helps aesthetic professionals boost consultation conversion rates and average transaction values.',
      color: 'text-green-400'
    },
    {
      icon: Target,
      title: 'Master Ethical Sales Techniques',
      description: 'Learn patient-first approaches that build trust while achieving your revenue goals through authentic consultations.',
      color: 'text-blue-400'
    },
    {
      icon: Zap,
      title: 'AI-Powered Practice Sessions',
      description: 'Practice unlimited consultations with BIANCA, receive instant feedback, and perfect your approach risk-free.',
      color: 'text-purple-400'
    },
    {
      icon: Users,
      title: 'Expert Faculty Library',
      description: 'Access 35+ industry experts and proven frameworks used by top-performing aesthetic practices worldwide.',
      color: 'text-cyan-400'
    }
  ];



  return (
    <div className="pt-28 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Trust Badge */}
      <section className="py-8 md:py-12 relative">
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full">
            <Shield className="text-green-400 mr-2" size={16} />
            <span className="text-xs md:text-sm font-normal text-green-400">
              Trusted by 200+ • $90M+ Revenue Generated
            </span>
          </div>
        </motion.div>
      </section>

      {/* Hero Section - Centered */}
      <section className="py-0 relative overflow-hidden">
        <motion.div
          ref={ref}
          className="relative z-10 max-w-10xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Transform Your</span>
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Consultation Success
            </span>
            <span className="text-white">in 90 Days.</span>
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed mb-8 max-w-3xl mx-auto px-0 md:px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join 200+ aesthetic professionals who've increased their revenue by an average of 27% 
            using our proven framework and AI-powered training system.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            className="flex flex-wrap md:flex-row items-center justify-center gap-2 md:gap-4 mb-12 max-w-12xl mx-auto text-xs md:text-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { text: 'Increase conversion rates by 27% in 90 days', icon: TrendingUp, color: 'text-green-400' },
              { text: 'Master ethical sales that patients trust', icon: GraduationCap, color: 'text-blue-400' },
              { text: 'Quick setup', icon: Clock, color: 'text-purple-400' }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 md:gap-3">
                <benefit.icon className={`${benefit.color} flex-shrink-0`} size={16} />
                <span className="text-white/90">{benefit.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-[#00d9ff] mb-0">{indicator.metric}</div>
                <div className="text-sm text-white/70">{indicator.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 px-0 md:px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              className="group px-6 py-4 md:px-8 md:py-4 bg-[#00d9ff] rounded-xl font-semibold text-sm md:text-base shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://platform.aestheticsaleshero.com/offers/rsare8xU/checkout', '_blank')}
            >
              Start Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
            
            <motion.button
              className="group px-6 py-4 md:px-8 md:py-4 border-2 border-white/20 rounded-xl font-semibold text-sm md:text-base hover:border-[#00d9ff] transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.location.href = '/#how-it-works';
              }}
            >
              <Play size={20} />
              Learn More
            </motion.button>
          </motion.div>

          {/* Reference-style benefits under CTAs */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { text: 'Cancel anytime', icon: CheckCircle, color: 'text-green-400' },
              { text: '14-day free trial', icon: Calendar, color: 'text-blue-400' },
              { text: 'Free for teams under 10', icon: Users, color: 'text-purple-400' }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <benefit.icon size={16} className={benefit.color} />
                <span>{benefit.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Company Carousel - Same as Home Page */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0" />
        
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-lg md:text-2xl font-medium mb-6 text-white/70"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Trusted by leaders in the industry
          </motion.h2>

          <div className="relative max-w-6xl mx-auto">
            <div className="flex overflow-hidden">
              <motion.div
                className="flex items-center gap-12 md:gap-16"
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
                      className="h-24 md:h-28 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-200 ease-out"
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

      {/* Benefits Section */}
      <section className="py-0 md:py-20 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Aesthetic Professionals Choose Us</h2>
            <p className="text-medium md:text-xl text-white/70 max-w-3xl mx-auto">
              Our proven system addresses the unique challenges of aesthetic consultations with industry-specific solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-8 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#00d9ff]/10 to-[#ff41fd]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className={`${benefit.color} group-hover:text-white transition-colors duration-300`} size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium mb-3 group-hover:text-[#00d9ff] transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-xs md:text-base text-white/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-28 md:py-24 relative">
        <div className="relative z-10 max-w-6xl mx-auto px-0 md:px-6">
          <motion.div
            className="text-center mb-16 max-w-2xl mx-auto px-16 md:px-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Real Results from Real Practices</h2>
            <p className="text-medium md:text-xl text-white/70 max-w-2xl mx-auto">
              See how aesthetic professionals are transforming their consultation success with our platform.
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative">
            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              className="relative overflow-hidden py-0 md:py-8"
            >
              <motion.div
                className="flex gap-4 md:gap-6"
                animate={!isPaused ? {
                  x: [0, -(testimonials.length * 386)], // 380px width + 6px gap
                } : {
                  x: animationOffset
                }}
                transition={!isPaused ? {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 70, // Smooth speed - 50 seconds for full cycle
                    ease: "linear",
                  }
                } : {
                  duration: 0.5,
                  ease: "easeInOut"
                }}
              >
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.name}-${index}`}
                    className="group flex-shrink-0 w-[300px] md:w-[360px]"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 h-auto min-h-[280px] hover:bg-white/10 transition-all duration-300 group-hover:border-[#00d9ff]/50 flex flex-col">
                      {/* Stars - Top Left */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="text-white" size={14} fill="currentColor" />
                        ))}
                      </div>

                      {/* Testimonial - Flexible content area */}
                      <div className="flex-grow mb-2 md:mb-4">
                        <p className="text-white/80 leading-relaxed italic text-sm md:text-base">
                          "{testimonial.testimonial}"
                        </p>
                      </div>

                      {/* Profile - Bottom section */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                            <img
                              src={testimonial.profileImage}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-sm group-hover:text-[#00d9ff] transition-colors duration-300">
                              {testimonial.name}
                            </h4>
                            <p className="text-white/60 text-xs">{testimonial.role}</p>
                          </div>
                        </div>
                        
                        {/* Company logo - Bottom right */}
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={testimonial.companyLogo}
                            alt={testimonial.company}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-10 md:py-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Practice?</h2>
            <p className="text-medium md:text-xl text-white/70 mb-8 leading-relaxed">
              Join 200+ aesthetic professionals who've already increased their revenue by 27% on average. 
              Start your 14-day free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5 md:mb-8">
              <motion.button
                className="px-8 py-3.5 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-semibold text-medium shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://platform.aestheticsaleshero.com/offers/rsare8xU/checkout', '_blank')}
              >
                Start Free Trial
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                className="px-8 py-3.5 border-2 border-white/20 rounded-xl font-semibold text-medium hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = '/#how-it-works';
                }}
              >
                Learn More
              </motion.button>
            </div>
            
            <div className="flex flex-wrap md:flex-row items-center justify-center gap-3 md:gap-6 text-xs md:text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-400" />
                30-day money-back guarantee
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-green-400" />
                No setup fees
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-green-400" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;