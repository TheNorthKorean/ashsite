import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Star } from 'lucide-react';

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 relative overflow-hidden bg-gray-900">
      {/* Section Label */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <span className="text-xs font-medium text-white/100 tracking-wider">Get Started</span>
        </div>
      </motion.div>
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        {/* Dark transparent container with solid border and single continuous trace */}
        <motion.div
          className="relative p-6 md:p-8 lg:p-12 rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Static solid border */}
          <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none"></div>
          
          {/* Single continuous animated trace */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-50" 
            style={{ borderRadius: '1.5rem' }}
          >
            <defs>
              {/* Enhanced gradient for the moving light trace with longer trail */}
              <linearGradient id="movingTraceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="20%" stopColor="#00d9ff" stopOpacity="0.2" />
                <stop offset="40%" stopColor="#00d9ff" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#00d9ff" stopOpacity="1" />
                <stop offset="60%" stopColor="#ff41fd" stopOpacity="1" />
                <stop offset="80%" stopColor="#ff41fd" stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              
              {/* Enhanced glow effect for better visibility */}
              <filter id="traceGlow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Single continuous trace that travels around the entire border - slower and more visible */}
            <motion.rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              rx="22"
              ry="22"
              fill="none"
              stroke="url(#movingTraceGradient)"
              strokeWidth="3"
              filter="url(#traceGlow)"
              pathLength="1"
              strokeDasharray="0.25 0.75"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 0 }}
              animate={inView ? {
                strokeDashoffset: [0, -1],
              } : { strokeDashoffset: 0 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>

          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mb-6 tracking-tight relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Consultation Success?
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto relative z-10 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Join thousands of aesthetic professionals who have already transformed their practices. 
            Start your journey to higher conversion rates and increased revenue today.
          </motion.p>

          {/* Social Proof */}
          <motion.div
            className="flex items-center justify-center gap-4 md:gap-8 mb-8 flex-wrap relative z-10 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#ff41fd]" size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-white/80 font-semibold text-sm md:text-base">4.9/5 rating</span>
            </div>
            <div className="text-white/80 font-semibold text-sm md:text-base">200+ practitioners trained</div>
            <div className="text-white/80 font-semibold text-sm md:text-base">$90M+ revenue generated</div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://platform.aestheticsaleshero.com/offers/rsare8xU/checkout', '_blank')}
            >
              Start Your 14-Day Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
            
            <motion.button
              className="group px-8 py-4 border-2 border-white/20 rounded-xl font-bold text-base md:text-lg hover:border-[#00d9ff] transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
            >
              Schedule a Demo
            </motion.button>
          </motion.div>

          {/* Guarantee */}
          <motion.p
            className="text-sm text-white/60 mt-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            14-day money-back guarantee • No setup fees • Cancel anytime
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTA;