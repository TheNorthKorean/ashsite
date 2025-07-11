import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Zap } from 'lucide-react';

const Credibility = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Updated platform data with actual system logos
  const platforms = [
    {
      name: 'EMR System',
      logo: '/system/System 1.png',
      category: 'EMR',
      scale: 1.5, // Zoom in 20%
    },
    {
      name: 'CRM Platform',
      logo: '/system/System 2.png',
      category: 'CRM',
      scale: 1.0, // Zoom out 10%
    },
    {
      name: 'Analytics Dashboard',
      logo: '/system/System 3.png',
      category: 'Reporting & Analytics',
      scale: 1.1, // Zoom in 10%
    },
    {
      name: 'Scheduling System',
      logo: '/system/System 4.jpeg',
      category: 'Booking & Scheduling',
      scale: 1.2, // No zoom (default)
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
      
      {/* Section Label */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <span className="text-xs font-medium text-white/100 tracking-wider">The Missing Piece</span>
        </div>
      </motion.div>
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Headline */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight max-w-2xl mx-auto">
            <span className="text-white">You'd never run a med-spa without an </span>
            <span className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">EMR</span>
            <span className="text-white">.</span>
            <br />
            <span className="text-white">Stop running one without a </span>
            <span className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">Sales System</span>
            <span className="text-white">.</span>
          </h2>
        </motion.div>

        {/* Platform Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Existing Platforms */}
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              className="group relative flex flex-col items-center"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0, delay: 0 + (index * 0) }}
            >
              {/* Circular Platform Container */}
              <div className="relative mb-4">
                <motion.div
                  className="w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 hover:border-[#00d9ff]/50 overflow-hidden"
                >
                  {/* Platform Logo */}
                  <img
                    src={platform.logo}
                    alt={`${platform.name} logo`}
                    className="w-full h-full object-cover opacity-100 group-hover:opacity-100 transition-all duration-300"
                    style={{ 
                      transform: `scale(${platform.scale})`,
                    }}
                  />
                </motion.div>
                
                {/* Status Indicator - Integrated */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Platform Info Below Circle */}
              <div className="text-center">
                <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-300 mb-1">
                  {platform.category}
                </div>
                <div className="text-xs text-white/50 mb-2">
                  {platform.description}
                </div>
                <div className="text-xs text-green-400 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  Integrated
                </div>
              </div>
            </motion.div>
          ))}

          {/* Missing Sales System Slot */}
          <motion.div
            className="group relative lg:col-span-1 flex flex-col items-center"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Floating Animation Container */}
            <motion.div
              className="mb-4"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Circular Missing System Container */}
              <motion.div
                className="relative w-24 h-24 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-full flex items-center justify-center overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 0 2px rgba(0, 217, 255, 0.3)',
                    '0 0 0 4px rgba(0, 217, 255, 0.6)',
                    '0 0 0 2px rgba(0, 217, 255, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  animate={{
                    borderColor: [
                      'rgba(0, 217, 255, 0.5)',
                      'rgba(255, 65, 253, 0.5)',
                      'rgba(0, 217, 255, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Plus Icon with Pulse */}
                <motion.div
                  className="flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Plus className="w-8 h-8 text-[#00d9ff]" strokeWidth={2} />
                </motion.div>

                {/* Background Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-[#00d9ff]/10 rounded-full"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Status Indicator - Missing */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </motion.div>
            
            {/* Missing System Info Below Circle */}
            <div className="text-center">
              <motion.div
                className="text-sm font-semibold bg-[#00d9ff] bg-clip-text text-transparent mb-1"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Sales System
              </motion.div>
              <div className="text-xs text-red-400 flex items-center justify-center gap-1">
                <motion.span 
                  className="w-1.5 h-1.5 bg-red-500 rounded-full"
                  animate={{
                    opacity: [1, 0.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                Missing
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Message */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-[#00d9ff]/5 backdrop-blur-xl border border-[#00d9ff]/30 rounded-2xl">
            <Zap className="text-[#00d9ff]" size={24} />
            <span className="text-lg font-medium">
              Complete your operational toolkit with our Sales System
            </span>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-center group">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 hover:border-[#00d9ff]/50">
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
                200+
              </div>
              <div className="text-white/80 font-semibold mb-1">Active Users</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 hover:border-[#00d9ff]/50">
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
                +27%
              </div>
              <div className="text-white/80 font-semibold mb-1">Close-Rate Lift</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 hover:border-[#00d9ff]/50">
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
                $90M+
              </div>
              <div className="text-white/80 font-semibold mb-1">Revenue Growth</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Credibility;