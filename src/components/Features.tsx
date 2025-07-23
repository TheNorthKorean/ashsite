import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BarChart3, 
  Brain, 
  Users, 
  MessageSquare, 
  Bell, 
  Database 
} from 'lucide-react';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: BarChart3,
      title: 'Content That Sticks',
      description: 'Bite-sized videos and weekly exercises to make learning, application, and ongoing practice easy, effective, and consistent.',
    },
    {
      icon: Brain,
      title: 'AI Practice Sessions',
      description: 'Practice with AI patients that simulate real scenarios, objections, and personalities for unlimited training.',
    },
    {
      icon: Users,
      title: 'Expert Faculty Network',
      description: 'Access 35+ industry experts across aesthetics, business, compliance, and social media for comprehensive learning.',
    },
    {
      icon: MessageSquare,
      title: 'Product Playbooks',
      description: 'Guides designed to help you sell and speak confidently - whether it\'s a treatment you offer now or one you\'re exploring.',
    },
    {
      icon: Database,
      title: 'Content Library',
      description: 'Access extensive training modules, case studies, and resources specifically designed for aesthetic professionals.',
    },
    {
      icon: Bell,
      title: 'Progress Tracking',
      description: 'Receive personalized feedback and track your skill development with real-time performance insights.',
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
      
      {/* Section Label */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <span className="text-xs font-medium text-white/100 tracking-wider">Features</span>
        </div>
      </motion.div>
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Powerful Features for
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Maximum Results
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-0 md:px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Every feature is designed to accelerate your learning and maximize your consultation success rate.
          </motion.p>
        </div>

        {/* Features Grid - 2 rows x 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
            >
              <div className="relative bg-white/4 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 h-full hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group-hover:border-[#ff41fd]/50">
                {/* Icon */}
                <div className="mb-2 md:mb-4">
                  <div className="w-12 h-12 bg-[#ff41fd]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-[#ff41fd] group-hover:text-[#ff41fd] transition-colors duration-300" size={24} />
                  </div>
                </div>

                <h3 className="text-xl font-medium mb-2 md:mb-4 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Features;