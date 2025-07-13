import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = [
    'Practices', 'Injectors', 'Entrepreneurs', 'Clinics', 'Estheticians', 
    'Founders', 'Teams', 'Manufacturers', 'Investors', 'GPOs', 'MSOs'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-0 md:pt-24 lg:pt-40 pb-20 md:pb-40 lg:pb-60">
      {/* Background Gradient - seamless transition to TrustedBy section */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-1400 via-gray-1400 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00d9ff]/10 via-transparent to-[#ff41fd]/10" />
      
      {/* Animated Background Elements - keep these eye-catching */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00d9ff]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff41fd]/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <div className="grid lg:grid-cols-1 gap-12 items-center relative">
          {/* Content */}
          <motion.div
            className="space-y-8 mt-0 lg:mt-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Beta Badge - with proper spacing */}
            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="inline-flex items-center px-4 py-1 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-full text-sm font-normal text-white/80 hover:bg-gray-800/80 transition-all duration-300">
                <span className="w-2 h-2 bg-[#00ff21] rounded-full mr-2 animate-pulse"></span>
                Now in Beta v1.2
              </div>
            </motion.div>

            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-white">
                The Sales System
              </span>
              <br />
              <span className="text-white">
                for Aesthetics & Wellness
              </span>
              <br />
              <div className="flex items-baseline justify-center text-2xl md:text-3xl lg:text-4xl xl:text-6xl mt-2 leading-none pb-0 md:pb-4">
                <div className="relative w-full flex justify-center">
                  <motion.div 
                    className="flex items-baseline gap-2 md:gap-4 text-center"
                    key={`container-${currentWord}`}
                    animate={{
                      x: (() => {
                      const wordLengths = {
                        'Practices': 0,
                        'Injectors': 5,
                        'Entrepreneurs': -7,
                        'Clinics': 3,
                        'Estheticians': -5,
                        'Founders': 5,
                        'Teams': 0,
                        'Manufacturers': -10,
                        'Investors': -7,
                        'GPOs': 0,
                        'MSOs': 0
                      };
                      return wordLengths[words[currentWord] as keyof typeof wordLengths] || 0;
                    })()
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "tween"
                    }}
                  >
                    <span className="text-white font-normal">Built for</span>
                    <div className="relative">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentWord}
                          className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent inline-block leading-tight font-normal"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: 1, 
                            scale: [0.8, 1, 1.02, 1]
                          }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ 
                            opacity: { duration: 0.3 },
                            scale: {
                              duration: 0.6,
                              times: [0, 0.4, 0.8, 1],
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }
                          }}
                        >
                          {words[currentWord]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-lg lg:text-xl text-white/60 max-w-4xl mx-auto leading-relaxed text-center font-light px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Transform your aesthetic practice with our revolutionary sales training system. 
              Close more consultations, increase revenue, and build lasting patient relationships.
            </motion.p>

            <motion.div 
              className="flex flex-col-2 sm:flex-row gap-2 md:gap-4 justify-center pt-0 md:pt-5 px-0 md:px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/getstarted">
                <motion.button
                  className="group relative px-6 py-4 md:px-8 md:py-4 bg-gradient-to-r from-[#00d9ff] to-[#00bfff] rounded-xl font-medium text-sm md:text-base overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Animated border light that follows the button border */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-50"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['-200% 0%', '200% 0%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    Get Started
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </span>
                </motion.button>
              </Link>
              
              <motion.button
                className="group px-6 py-3 md:px-8 md:py-3.5 bg-gray-800/60 backdrop-blur-sm border-2 border-gray-700/50 rounded-xl font-medium text-sm md:text-base hover:bg-gray-800/80 hover:border-[#00d9ff]/50 transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('how-it-works');
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

          {/* Mockup Image - positioned in bottom right */}
          <motion.div
            className="absolute bottom-[-100px] right-[-300px] hidden xl:block"
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="relative">
              {/* Subtle glow effect behind image - same as Hero 1 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00d9ff]/20 to-[#ff41fd]/20 blur-2xl rounded-full transform scale-110"></div>
              
              {/* Mockup Image */}
              <motion.div
                className="relative z-10 w-[330px] h-[215px] overflow-hidden rounded-lg"
                initial={{ rotate: 6 }}
                style={{
                  filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 20px rgba(0, 217, 255, 0.3)) drop-shadow(0 0 40px rgba(255, 65, 253, 0.2))',
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotate: 0,
                  filter: 'drop-shadow(0 12px 35px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 30px rgba(0, 217, 255, 0.5)) drop-shadow(0 0 60px rgba(255, 65, 253, 0.4))',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Mockup Image */}
                <img
                  src="/Mockup.png"
                  alt="Platform Mockup"
                  className="w-full h-full object-cover rounded-lg"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Image - positioned in top left */}
          <motion.div
            className="absolute top-[-70px] left-[-290px] hidden xl:block"
            initial={{ opacity: 0, x: -50, y: -30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="relative">
              {/* Subtle glow effect behind image - same as Mockup */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00d9ff]/20 to-[#ff41fd]/20 blur-2xl rounded-full transform scale-110"></div>
              
              {/* Hero Image */}
              <motion.div
                className="relative z-10"
                initial={{ rotate: 3 }}
                style={{
                  filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4))',
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotate: 0,
                  filter: 'drop-shadow(0 12px 35px rgba(255, 65, 253, 0.15))',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Hero Image */}
                <img
                  src="/heros/Hero 1.png"
                  alt="Aesthetic Sales Hero"
                  className="w-72 h-auto object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;