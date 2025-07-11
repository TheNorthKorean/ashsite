import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Target, Lightbulb } from 'lucide-react';

const Mission = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
      
      {/* Section Label */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <span className="text-xs font-medium text-white/100 tracking-wider">Our Mission</span>
        </div>
      </motion.div>
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d9ff]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff41fd]/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-18"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-0">
          <motion.h2 
            className="text-4xl lg:text-6xl font-bold mb-0 tracking-tight flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-2xl flex items-center justify-center">
              <Heart className="text-[#00d9ff]" size={32} fill="currentColor" />
            </div>
            Our
            <span className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              {' '}Mission
            </span>
          </motion.h2>
        </div>

        {/* Mission Container with enhanced gradient background - increased height */}
        <motion.div
          className="relative rounded-3xl p-12 text-center overflow-hidden"
          style={{
            background: `linear-gradient(to top, 
              #00d9ff60 0%, 
              #0ea5e970 20%, 
              #1e40af50 40%, 
              #1e3a8a40 60%, 
              #1e293b20 80%, 
              transparent 100%
            )`
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Additional color blend overlay for more richness */}
          <div 
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `linear-gradient(to top, 
                rgba(0, 217, 255, 0.4) 0%, 
                rgba(14, 165, 233, 0.35) 25%, 
                rgba(59, 130, 246, 0.3) 50%, 
                rgba(99, 102, 241, 0.2) 75%, 
                transparent 100%
              )`
            }}
          />
          
          {/* Third layer for even more color depth */}
          <div 
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `linear-gradient(to top, 
                rgba(6, 182, 212, 0.3) 0%, 
                rgba(8, 145, 178, 0.25) 30%, 
                rgba(30, 64, 175, 0.2) 60%, 
                transparent 90%
              )`
            }}
          />
          
          <div className="relative z-10">
            <motion.p 
              className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We believe that every patient deserves authentic, ethical consultation experiences 
              that help them make informed decisions about their aesthetic journey.
            </motion.p>

            <motion.p 
              className="text-lg text-white/70 leading-relaxed mb-15 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              That's why we built the ultimate sales training system for aesthetics and wellness—
              to empower practitioners with the skills, confidence, and ethical framework needed 
              to guide patients toward treatments that truly serve their goals and well-being.
            </motion.p>

            {/* Mission Points */}
            <div className="grid lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: Target,
                  title: 'Ethical Excellence',
                  description: 'Training that prioritizes patient well-being over profit margins',
                },
                {
                  icon: Lightbulb,
                  title: 'Continuous Innovation',
                  description: 'Constantly evolving our methods based on industry best practices',
                },
                {
                  icon: Heart,
                  title: 'Authentic Connections',
                  description: 'Building genuine relationships between practitioners and patients',
                },
              ].map((point, index) => (
                <motion.div
                  key={point.title}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 1 + 0.2 * index }}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group-hover:border-[#00d9ff]/50">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <point.icon className="text-[#00d9ff] group-hover:text-[#ff41fd] transition-colors duration-300" size={24} />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#00d9ff] transition-colors duration-300">
                      {point.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Mission;