import React from 'react';
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

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Medical Director, Elite Aesthetics',
      image: '👩‍⚕️',
      quote: 'My conversion rate went from 62% to 89% in just 3 months. The AI practice sessions completely transformed how I handle consultations.',
      result: '+45% conversion rate'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Practice Owner, Beverly Hills Wellness',
      image: '👨‍💼',
      quote: 'This system taught me how to overcome objections ethically while genuinely caring for my patients. Incredible ROI.',
      result: '$120K additional revenue'
    },
    {
      name: 'Dr. Amanda Foster',
      role: 'Aesthetic Physician, Rejuvenation Center',
      image: '👩‍⚕️',
      quote: 'Training new staff used to take months. Now they\'re consultation-ready in weeks with consistent results.',
      result: '3x faster onboarding'
    }
  ];

  return (
    <div className="pt-24 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Trust Badge */}
      <section className="py-12 relative">
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full">
            <Shield className="text-green-400 mr-2" size={16} />
            <span className="text-sm font-normal text-green-400">
              Trusted by 200+ aesthetic practices • $90M+ revenue generated
            </span>
          </div>
        </motion.div>
      </section>

      {/* Hero Section - Centered */}
      <section className="py-0 relative overflow-hidden">
        <motion.div
          ref={ref}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
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
            className="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join 200+ aesthetic professionals who've increased their revenue by an average of 27% 
            using our proven framework and AI-powered training system.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            className="flex flex-col-2 xs:flex-cols-3 flex-row gap-4 justify-center mb-12 max-w-12xl mx-auto text-s"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { text: 'Increase conversion rates by 27% in 90 days', icon: TrendingUp, color: 'text-green-400' },
              { text: 'Master ethical sales that patients trust', icon: GraduationCap, color: 'text-blue-400' },
              { text: 'Quick setup', icon: Clock, color: 'text-purple-400' }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
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
                <div className="text-2xl font-bold text-[#00d9ff] mb-1">{indicator.metric}</div>
                <div className="text-sm text-white/70">{indicator.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center mb-8 px-0 md:px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              className="group px-6 py-4 md:px-8 md:py-4 bg-[#00d9ff] rounded-xl font-medium text-sm md:text-base shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
            
            <motion.button
              className="group px-6 py-3 md:px-8 md:py-4 border-2 border-white/20 rounded-xl font-medium text-sm md:text-base hover:border-[#00d9ff] transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} />
              Learn More
            </motion.button>
          </motion.div>

          {/* Reference-style benefits under CTAs */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 text-sm text-white/60"
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
            className="text-2xl lg:text-2xl font-medium mb-6 text-white/70"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Trusted by leaders in the industry
          </motion.h2>

          <div className="relative max-w-6xl mx-auto">
            <div className="flex overflow-hidden">
              <motion.div
                className="flex items-center gap-16"
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
                      className="h-21 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-200 ease-out"
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
      <section className="py-20 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Aesthetic Professionals Choose Us</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our proven system addresses the unique challenges of aesthetic consultations with industry-specific solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
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
                    <h3 className="text-xl font-medium mb-3 group-hover:text-[#00d9ff] transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
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
      <section className="py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Real Results from Real Practices</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              See how aesthetic professionals are transforming their consultation success with our platform.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#00d9ff] transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-white/80 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-full border border-[#00d9ff]/30">
                  <span className="text-[#00d9ff] font-semibold text-sm">
                    {testimonial.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Practice?</h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Join 200+ aesthetic professionals who've already increased their revenue by 27% on average. 
              Start your 14-day free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                className="px-8 py-3.5 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-semibold text-medium shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                className="px-8 py-3.5 border-2 border-white/20 rounded-xl font-semibold text-medium hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-400" />
                30-day money-back guarantee
              </div>
              <div className="flex items-center gap-1">
                <Shield size={14} className="text-green-400" />
                No setup fees
              </div>
              <div className="flex items-center gap-1">
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