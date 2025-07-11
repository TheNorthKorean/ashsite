import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Smartphone, Brain, BarChart3, Shield, TrendingUp, Zap, Users, Target } from 'lucide-react';

const AestheticDifference = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [currentCard, setCurrentCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const differences = useMemo(() => [
    {
      icon: Smartphone,
      title: 'Digital-First Platform',
      description: 'Access training anywhere, anytime on any device. No more scheduling conflicts or travel expenses.',
      benefit: 'Learn at your own pace',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
      stats: { companies: '200+', rate: '24/7', metric: 'Members' },
      rateLabel: 'Access',
      topLeftIcon: Smartphone,
      topLeftIconColor: 'text-blue-400',
    },
    {
      icon: Brain,
      title: 'AI-Powered Practice',
      description: 'Practice conversations with AI patients that adapt to your skill level and provide instant feedback.',
      benefit: 'Safe practice environment',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      stats: { companies: '10K+', rate: '95%', metric: 'Patient Scenarios' },
      rateLabel: 'AI Accuracy',
      topLeftIcon: Brain,
      topLeftIconColor: 'text-purple-400',
    },
    {
      icon: BarChart3,
      title: 'Expert Faculty Library',
      description: 'Unlock access to 35+ industry experts across aesthetics, business, social media, and more.',
      benefit: 'Data-driven improvement',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-400',
      stats: { companies: '50+', rate: '96%', metric: 'Resources' },
      rateLabel: 'Insights Rate',
      topLeftIcon: BarChart3,
      topLeftIconColor: 'text-green-400',
    },
    {
      icon: Shield,
      title: 'Industry-Specific Content',
      description: 'Training built specifically for aesthetic medicine, not generic sales tactics adapted for healthcare.',
      benefit: 'Relevant and effective',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-400',
      stats: { companies: '100%', rate: '92%', metric: 'Relevance' },
      rateLabel: 'Relevance Score',
      topLeftIcon: Shield,
      topLeftIconColor: 'text-orange-400',
    },
  ], []);

  const setActiveCard = useCallback((cardNumber: number) => {
    if (isAnimating || cardNumber === currentCard) return;
    
    setIsAnimating(true);
    setCurrentCard(cardNumber);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  }, [isAnimating, currentCard]);

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && inView) {
        const nextCard = (currentCard + 1) % differences.length;
        setActiveCard(nextCard);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentCard, isAnimating, inView, differences.length, setActiveCard]);

  // Card positioning with progressive partial blur for all cards behind
  const getCardStyle = useCallback((index: number) => {
    const isActive = index === currentCard;
    const position = (index - currentCard + differences.length) % differences.length;
    
    if (isActive) {
      return {
        zIndex: 40,
        x: 0,
        scale: 1,
        opacity: 2,
        order: 4,
        blurIntensity: 0,
        clipOffset: 0,
      };
    }
    
    const offsetSteps = 64;
    const scaleSteps = 0.12;
    
    switch (position) {
      case 1:
        return {
          zIndex: 30,
          x: -offsetSteps,
          scale: 1 - scaleSteps,
          opacity: 0.8,
          order: 3,
          blurIntensity: 7,
          clipOffset: 45, 
        };
      case 2:
        return {
          zIndex: 20,
          x: -offsetSteps * 2,
          scale: 1 - scaleSteps * 2,
          opacity: 0.7,
          order: 2,
          blurIntensity: 12,
          clipOffset: 55,
        };
      default:
        return {
          zIndex: 10,
          x: -offsetSteps * 3,
          scale: 1 - scaleSteps * 3,
          opacity: 0.6,
          order: 1,
          blurIntensity: 14,
          clipOffset: 55,
        };
    }
  }, [currentCard, differences.length]);

  // Optimized transition configuration
  const cardTransition = useMemo(() => ({
    duration: 0.4,
    ease: [0.25, 0.46, 0.45, 0.94],
  }), []);

  const hoverTransition = useMemo(() => ({
    duration: 0.2,
  }), []);

  return (
    <section className="py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
      
      {/* Optimized Background Elements */}
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-10 md:px-12"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          
          {/* Left Content */}
          <div className="flex-1 max-w-xl lg:pr-6">
            {/* Solution Label - moved here */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <span className="text-xs font-medium text-white/100 tracking-wider">The Solution</span>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-center space-x-2 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-[#00d9ff] rounded-full animate-pulse"></div>
              <p className="text-xs md:text-sm lg:text-sm uppercase tracking-widest text-white/60 font-medium">
                Aesthetic Sales Hero • Sales Training System 
              </p>
            </motion.div>
            
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] py-2 mb-2 md:mb-6" style={{ lineHeight: '1.2' }}>
                <span className="block text-white">
                  The Future of
                </span>
                <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
                  Aesthetic Sales Training
                </span>
              </h2>
              <p className="text-base md:text-lg lg:text-lg text-white/70 leading-relaxed">
                Experience revolutionary training technology designed specifically for aesthetic professionals. 
                Our platform combines AI, analytics, and industry expertise to transform your consultation success.
              </p>
            </motion.div>

            {/* Features List */}
            <motion.div
              className="space-y-5 text-sm text-white/90"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#00d9ff] rounded-full"></div>
                <span>AI-powered role-play with unlimited scenarios, zero risk</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Expert faculty resources with regularly updated content</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#ff41fd] rounded-full"></div>
                <span>Industry-specific content, no recycled sales tactics </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Mobile-first platform for learning anywhere, anytime</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Card Stack */}
          <div className="flex flex-col space-y-2 items-center">
            {/* Card Container with progressive partial blur effect */}
            <motion.div
              className="relative w-[400px] h-[520px]"
              style={{ 
                display: 'grid',
                gridTemplateAreas: '"stack"',
                perspective: '1000px',
                transform: 'translateZ(0)',
                willChange: 'transform',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {differences.map((difference, index) => {
                const cardStyle = getCardStyle(index);
                const IconComponent = difference.icon;
                const TopLeftIconComponent = difference.topLeftIcon;
                const isActive = index === currentCard;

                return (
                  <motion.div
                    key={index}
                    className="cursor-pointer"
                    style={{
                      gridArea: 'stack',
                      zIndex: cardStyle.zIndex,
                      order: cardStyle.order,
                      transform: 'translateZ(0)',
                      willChange: 'transform, opacity',
                    }}
                    initial={false}
                    animate={{
                      x: cardStyle.x,
                      scale: cardStyle.scale,
                      opacity: cardStyle.opacity,
                    }}
                    transition={cardTransition}
                    onClick={() => setActiveCard(index)}
                    whileHover={isActive ? { 
                      y: -10, 
                      scale: 1.02,
                      transition: hoverTransition
                    } : {}}
                  >
                    {/* Card background with consistent structure */}
                    <div className={`h-[520px] ${
                      isActive ? 'bg-gray-900/85' : 'bg-gray-900/95'
                    } backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 ${
                      isActive ? 'hover:bg-gray-900/90 hover:border-[#00d9ff]/50' : ''
                    } relative overflow-hidden`}>
                      
                      {/* Base content layer - ALWAYS present and positioned consistently */}
                      <div className="absolute inset-0 h-full flex flex-col p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-2">
                            <TopLeftIconComponent className={`w-5 h-5 ${difference.topLeftIconColor}`} />
                            <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                              Revolutionary
                            </span>
                          </div>
                          <span className="text-sm font-bold text-green-400">
                            {difference.stats.companies}
                          </span>
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center items-center text-center">
                          <motion.div
                            className={`w-20 h-20 bg-gradient-to-br ${difference.bgGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
                            animate={isActive ? {
                              scale: [1, 1.1, 1],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: isActive ? Infinity : 0,
                              ease: "easeInOut"
                            }}
                          >
                            {isActive && (
                              <motion.div
                                className={`absolute inset-0 bg-gradient-to-r ${difference.bgGradient} rounded-2xl blur-lg`}
                                animate={{
                                  opacity: [2, 2, 2],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                            )}
                            <IconComponent className={`w-10 h-10 ${difference.iconColor} relative z-10`} />
                          </motion.div>
                          
                          <h3 className="text-2xl font-bold tracking-tight mb-2 text-white">
                            {difference.title}
                          </h3>
                          
                          {/* Conditional content that only shows for active card */}
                          {isActive && (
                            <motion.div
                              key={`active-content-${index}`} // Unique key to prevent content jumping
                              initial={{ opacity: 2, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              <p className="text-sm text-white/70 mb-8 leading-relaxed">
                                {difference.description}
                              </p>
                              
                              <div className="space-y-4 mb-8 w-full max-w-xs">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-white/60">{difference.rateLabel}</span>
                                  <span className="font-semibold text-green-400">{difference.stats.rate}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-white/60">{difference.stats.metric}</span>
                                  <span className="font-semibold text-white">{difference.stats.companies}</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                  <motion.div
                                    className={`bg-gradient-to-r ${difference.gradient} h-2 rounded-full`}
                                    initial={{ width: 0 }}
                                    animate={{ width: '95%' }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="flex justify-center">
                          <div className={`px-4 py-2 bg-gradient-to-r ${difference.bgGradient} rounded-full border border-[#00d9ff]/30`}>
                            <span className="text-[#00d9ff] font-semibold text-xs">
                              {difference.benefit}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progressive blur overlay for non-active cards */}
                      {!isActive && (
                        <div 
                          className="absolute inset-0 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl"
                          style={{
                            filter: `blur(${cardStyle.blurIntensity}px)`,
                            clipPath: `polygon(${cardStyle.clipOffset}px 0%, 100% 0%, 100% 100%, ${cardStyle.clipOffset}px 100%)`,
                          }}
                        >
                          <div className="h-full flex flex-col p-8">
                            <div className="flex items-center justify-between mb-0">
                              <div className="flex items-center space-x-2">
                                <TopLeftIconComponent className={`w-5 h-5 ${difference.topLeftIconColor}`} />
                                <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                                  Revolutionary
                                </span>
                              </div>
                              <span className="text-sm font-bold text-green-400">
                                {difference.stats.companies}
                              </span>
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-center items-center text-center">
                              <div className={`w-20 h-20 bg-gradient-to-br ${difference.bgGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}>
                                <IconComponent className={`w-10 h-10 ${difference.iconColor} relative z-10`} />
                              </div>
                              
                              <h3 className="text-2xl font-bold tracking-tight mb-2 text-white">
                                {difference.title}
                              </h3>
                            </div>
                            
                            <div className="flex justify-center">
                              <div className={`px-4 py-2 bg-gradient-to-r ${difference.bgGradient} rounded-full border border-[#00d9ff]/30`}>
                                <span className="text-[#00d9ff] font-semibold text-xs">
                                  {difference.benefit}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Navigation Dots */}
            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {differences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCard(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentCard === index
                      ? 'bg-[#00d9ff] scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Highlight */}
        <motion.div
          className="text-center mt-20 md:mt-40"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex items-center gap-4 px-4 py-2 md:px-8 md:py-4 bg-gradient-to-r from-[#00d9ff]/10 to-[#ff41fd]/10 backdrop-blur-xl border border-[#00d9ff]/30 rounded-2xl">
            <Shield className="text-[#00d9ff]" size={24} />
            <span className="text-xs md:text-lg font-semibold">
              Built by aesthetic professionals, for aesthetic professionals
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AestheticDifference;