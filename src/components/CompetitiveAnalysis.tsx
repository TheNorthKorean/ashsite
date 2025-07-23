import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, AlertCircle, Clock, BookX, Check, Users, ChevronDown } from 'lucide-react';

const CompetitiveAnalysis = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const oldMethods = [
    {
      icon: AlertCircle,
      title: 'No Scalable System',
      description: 'Lack of structured, repeatable processes that can grow with your practice',
      problems: ['Inconsistent results', 'Hard to train new staff', 'Limited growth potential'],
    },
    {
      icon: Clock,
      title: 'Time-Consuming Talks',
      description: 'Expensive, time-consuming workshops with minimal follow-up support',
      problems: ['High time investment', 'No ongoing support', 'Information overload'],
    },
    {
      icon: X,
      title: 'Outdated Scripts',
      description: '2010-era sales scripts that modern patients see right through',
      problems: ['Feels inauthentic', 'Low conversion rates', 'Damages trust'],
    },
    {
      icon: Users,
      title: 'One-Size-Fits-All Training',
      description: 'Generic coaching programs that ignore individual practice and patient needs',
      problems: ['Ignores practice specifics', 'No personalization', 'Poor ROI'],
    },
  ];

  return (
    <section className="pb-16 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
      
      {/* Section Label */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <span className="text-xs font-medium text-white/100 tracking-wider">The Problem</span>
        </div>
      </motion.div>
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-red-400">Traditional training is static.</span>
            <span className="block mt-2">Your market isn't.</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            While others rely on outdated methods, we've built an adaptive aesthetic sales training system that updates with every pricing shift and patient trends.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - 5 Boxes */}
          <div className="lg:col-span-3 space-y-4">
            {oldMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="group relative"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
              >
                <div className="relative bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 hover:bg-red-500/10 hover:scale-[1.02] transition-all duration-300 group-hover:border-red-500/40">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <method.icon className="text-red-400 group-hover:text-red-300 transition-colors duration-300" size={24} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-red-400 group-hover:text-red-300 transition-colors duration-300">
                        {method.title}
                      </h3>
                      
                      <p className="text-white/70 leading-relaxed mb-4">
                        {method.description}
                      </p>

                      {/* Problems List */}
                      <div className="flex flex-wrap gap-4">
                        {method.problems.map((problem, problemIndex) => (
                          <div key={problemIndex} className="flex items-center gap-2 text-white/60">
                            <X size={14} className="text-red-400 flex-shrink-0" />
                            <span className="text-sm">{problem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Overlay Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-red-500/5 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Single Comparison Table */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 h-full">
                <h3 className="text-2xl font-bold mb-6 mt-2 md:mt-0 text-center bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
                  Traditional vs Modern
                </h3>
                
                <div className="space-y-4">
                  {[
                    { traditional: 'Generic content', modern: 'Industry-specific content' },
                    { traditional: 'Time-consuming talks', modern: 'Bite-sized modules' },
                    { traditional: 'Limited practice', modern: 'AI-powered practice' },
                    { traditional: 'One-size-fits-all', modern: 'Personalized paths' },
                    { traditional: 'High time investment', modern: 'Flexible learning' },
                    { traditional: 'No ongoing support', modern: 'Community & coaching' },
                  ].map((comparison, index) => (
                    <motion.div
                      key={index}
                      className="grid grid-cols-2 gap-4 items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.8 + 0.1 * index }}
                    >
                      <motion.div 
                        className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 hover:bg-red-500/15 hover:scale-[1.02] transition-all duration-300 min-h-[60px]"
                      >
                        <X size={14} className="text-red-400 flex-shrink-0" />
                        <span className="text-red-400 text-sm font-medium">{comparison.traditional}</span>
                      </motion.div>
                      <motion.div 
                        className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-center gap-2 hover:bg-green-500/15 hover:scale-[1.02] transition-all duration-300 min-h-[60px]"
                      >
                        <Check size={14} className="text-green-400 flex-shrink-0" />
                        <span className="text-green-400 text-sm font-medium">{comparison.modern}</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom highlight */}
                <div className="mt-8 p-4 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-xl border border-[#00d9ff]/30">
                  <p className="text-center text-white/90 font-semibold">
                    The future of aesthetic sales training is here
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-48 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-2xl font-bold mb-8">
            <span className="text-white/100">It's time for a </span>
            <span className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              modern approach
            </span>
          </p>
        </motion.div>

        {/* Simple Downward Arrow with gentle bounce */}
        <motion.div
          className="flex justify-center mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown 
              className="text-[#00d9ff]" 
              size={45}
              strokeWidth={2}
              style={{
                filter: 'drop-shadow(0 0 8px #00d9ff) drop-shadow(0 0 16px #00d9ff)',
                transform: 'rotate(0deg)', // Ensure it points down
              }}
            />
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default CompetitiveAnalysis;