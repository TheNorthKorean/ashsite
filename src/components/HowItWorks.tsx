import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Users, Award, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: BookOpen,
      title: 'Learn the System',
      description: 'Master our proven 5-step consultation framework used by top aesthetic practices.',
    },
    {
      icon: Users,
      title: 'Practice with AI',
      description: 'Role-play consultations and objections 24/7 with BIANCA, your on-demand AI coach.',
    },
    {
      icon: Award,
      title: 'Get Certified',
      description: 'Earn your Socially Responsible Selling certification and join our elite community.',
    },
    {
      icon: BarChart3,
      title: 'Apply & Embed',
      description: 'Turn your insights into repeatable routines that fire on every consult, every shift.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
      
      {/* Section Label */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <span className="text-xs font-medium text-white/100 tracking-wider">How It Works</span>
        </div>
      </motion.div>
      
      {/* Beautiful soft round glow background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[10%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-[#00d9ff]/15 via-[#00d9ff]/8 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[10%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#ff41fd]/10 via-[#ff41fd]/5 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[10%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-white/5 via-white/2 to-transparent rounded-full blur-xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-20">
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold tracking-tight leading-[1.3] py-0 mb-4"
            style={{ lineHeight: '1.2' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Complete
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Sales System
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed px-4 md:px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Learn, practice, certify—then lock in a sales system that drives revenue every single day.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 pb-16 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="group relative z-20"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 h-full hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group-hover:border-[#00d9ff]/50 flex flex-col">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold border border-gray-600">
                  <span className="text-[#00d9ff]">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-300">
                    <step.icon className="text-[#00d9ff] group-hover:text-[#ff41fd] transition-colors duration-300" size={32} />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-center group-hover:text-[#00d9ff] transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-white/70 text-center leading-relaxed md:leading-snug mb-6 flex-grow">
                  {step.description}
                </p>

                {/* Training Image - Aligned to bottom */}
                <div className="w-full h-32 rounded-lg border border-white/10 group-hover:border-[#00d9ff]/30 transition-colors duration-300 overflow-hidden">
                  {index === 0 ? (
                    <img 
                      src="/training/Training 1.png" 
                      alt="Learn the System Training Module"
                      className="w-full h-full object-cover"
                    />
                  ) : index === 1 ? (
                    <img 
                      src="/training/Training 2.png" 
                      alt="Practice with AI Training Module"
                      className="w-full h-full object-cover"
                    />
                  ) : index === 2 ? (
                    <img 
                      src="/training/Training 3.png" 
                      alt="Get Certified Training Module"
                      className="w-full h-full object-cover"
                    />
                  ) : index === 3 ? (
                    <img 
                      src="/training/Training 4.png" 
                      alt="Apply & Embed Training Module"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 flex items-center justify-center">
                      <span className="text-white/50 text-sm">Training Module</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;