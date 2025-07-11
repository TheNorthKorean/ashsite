import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, DollarSign, Users, Award } from 'lucide-react';

const CaseStudies = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const caseStudies = [
    {
      title: 'Case Study #1: $424,000 in 6 Weeks',
      practice: 'Aesthetics Medical Spa',
      location: 'Colorado, CO',
      challenge: 'Struggling to hit revenue goals for 10 consecutive months and lacked a structured sales strategy to convert.',
      solution: 'Implemented comprehensive training program and weekly coaching.',
      results: [
        { metric: 'Revenue Generated', before: '$0', after: '$424K', improvement: '6 weeks' },
        { metric: 'YOY Growth', before: 'Declining', after: '29% increase', improvement: 'Record breaking' },
        { metric: 'ROI Achievement', before: 'No system', after: '41:1 ROI', improvement: '41X return' },
      ],
      testimonial: 'We achieved our monthly revenue goal for the first time in 10 months. The 41:1 ROI speaks for itself - this system transformed our entire practice.',
      author: 'Practice Manager',
      timeframe: '6 weeks',
    },
    {
      title: 'Case Study #2: $825,000 in Just One Quarter',
      practice: 'Luxury Med Spa',
      location: '---',
      challenge: 'Despite previous growth, a thriving med spa faced the all-too-common challenge of plateauing performance.',
      solution: 'Comprehensive program to ethically increase conversions and build long-term client relationships.',
      results: [
        { metric: 'Quarterly Revenue', before: '$731K Q1 YTD', after: '$825K Q1', improvement: '+12.9% YOY' },
        { metric: 'Average Ticket Size', before: 'Baseline', after: '12.4% increase', improvement: 'Higher value' },
        { metric: 'Membership Sales', before: 'Previous level', after: '32% growth', improvement: 'Recurring revenue' },
      ],
      testimonial: 'We generated $825K in one quarter compared to $731K the previous year. The 12.9% year-over-year growth and 32% membership increase transformed our business model.',
      author: 'Practice Manager',
      timeframe: '3 months',
    },
    {
      title: 'Case Study #3: Revenue Transformation',
      practice: 'Plastic Surgery Practice',
      location: 'New York, NY',
      challenge: 'Plateau in practice growth and difficulty scaling consultation quality.',
      solution: 'Enterprise-level training with advanced role-play and custom coaching programs.',
      results: [
        { metric: 'Monthly Revenue', before: '$320K', after: '$485K', improvement: '+52%' },
        { metric: 'Patient Satisfaction', before: '8.2/10', after: '9.6/10', improvement: '+17%' },
        { metric: 'Referral Rate', before: '25%', after: '42%', improvement: '+68%' },
      ],
      testimonial: 'The ethical sales framework gave me confidence to recommend treatments I truly believe in. My monthly revenue increased by $165K.',
      author: 'Practice Owner',
      timeframe: '2 months',
    },
  ];

  return (
    <div className="pt-16 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          ref={ref}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Success</span>
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Case Studies
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-medium md:text-xl text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Real results from aesthetic practices that have transformed their consultation 
            success using our training platform.
          </motion.p>
        </motion.div>
      </section>

      {/* Case Studies */}
      <section className="py-0 md:py-10 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-12 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group-hover:border-[#00d9ff]/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                    {/* Study Info */}
                    <div className="lg:col-span-1">
                      <h2 className="text-3xl font-bold mb-4 mt-2 md:mt-0 group-hover:text-[#00d9ff] transition-colors duration-300">
                        {study.title}
                      </h2>
                      
                      <div className="space-y-2 mb-6">
                        <p className="text-[#ff41fd] font-semibold">{study.practice}</p>
                        <p className="text-white/70">{study.location}</p>
                        <p className="text-white/60 text-sm">Timeframe: {study.timeframe}</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-[#00d9ff]">Challenge</h4>
                          <p className="text-white/70 text-sm leading-relaxed">{study.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-[#00d9ff]">Solution</h4>
                          <p className="text-white/70 text-sm leading-relaxed">{study.solution}</p>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-2">
                      <h3 className="text-xl md:text-2xl font-bold mb-6">Results</h3>
                      
                      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                        {study.results.map((result, i) => (
                          <motion.div 
                            key={i} 
                            className="group/result bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 text-center text-sm md:text-lg hover:bg-white/10 hover:scale-[1.05] transition-all duration-300 hover:border-[#00d9ff]/50"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 * i }}
                            viewport={{ once: true }}
                          >
                            <div className="flex justify-center mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-xl flex items-center justify-center group-hover/result:scale-110 transition-transform duration-300">
                                {i === 0 && <TrendingUp className="text-[#00d9ff] group-hover/result:text-white transition-colors duration-300" size={24} />}
                                {i === 1 && <DollarSign className="text-[#00d9ff] group-hover/result:text-white transition-colors duration-300" size={24} />}
                                {i === 2 && <Users className="text-[#00d9ff] group-hover/result:text-white transition-colors duration-300" size={24} />}
                              </div>
                            </div>
                            
                            <h4 className="font-semibold mb-2 group-hover/result:text-[#00d9ff] transition-colors duration-300">{result.metric}</h4>
                            
                            <div className="space-y-1 text-xs md:text-sm">
                              <div className="text-white/60">Before: {result.before}</div>
                              <div className="text-white/80">After: {result.after}</div>
                              <div className="text-green-400 font-bold">{result.improvement}</div>
                            </div>

                            {/* Result Box Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00d9ff]/0 to-[#ff41fd]/0 group-hover/result:from-[#00d9ff]/5 group-hover/result:to-[#ff41fd]/5 transition-all duration-300 pointer-events-none" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Testimonial Quote Box */}
                      <motion.div 
                        className="group/quote bg-gradient-to-r from-[#00d9ff]/10 to-[#ff41fd]/10 backdrop-blur-sm border border-[#00d9ff]/30 rounded-xl p-6 hover:bg-gradient-to-r hover:from-[#00d9ff]/15 hover:to-[#ff41fd]/15 hover:scale-[1.02] transition-all duration-300 hover:border-[#00d9ff]/50"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-white/90 italic mb-4 leading-relaxed group-hover/quote:text-white transition-colors duration-300">
                          "{study.testimonial}"
                        </p>
                        <p className="text-[#00d9ff] font-semibold group-hover/quote:text-white transition-colors duration-300">— {study.author}</p>

                        {/* Quote Box Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00d9ff]/0 to-[#ff41fd]/0 group-hover/quote:from-[#00d9ff]/5 group-hover/quote:to-[#ff41fd]/5 transition-all duration-300 pointer-events-none" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Main Card Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00d9ff]/0 to-[#ff41fd]/0 group-hover:from-[#00d9ff]/5 group-hover:to-[#ff41fd]/5 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
              Join hundreds of aesthetic practices that have transformed their consultation success. 
              Start your journey today and see measurable results within 30 days.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-bold text-lg shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Transformation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;