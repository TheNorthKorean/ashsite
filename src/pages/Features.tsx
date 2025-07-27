import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, Users, Target, Trophy, Brain, BarChart3, Shield, Smartphone, Zap, Clock, Award, TrendingUp } from 'lucide-react';
import FloatingPriceGuide from '../components/FloatingPriceGuide';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: MessageSquare,
      title: 'AI Conversation Practice',
      description: 'Practice consultations with AI patients that simulate real scenarios, objections, and personalities with unlimited practice sessions.',
      color: 'indigo',
      layout: '1/3',
    },
    {
      icon: Brain,
      title: 'Psychology-Based Training',
      description: 'Learn the psychological principles behind effective aesthetic consultations and patient decision-making with science-backed methods.',
      color: 'purple',
      layout: '2/3',
      visual: 'psychology',
    },
    {
      icon: Users,
      title: 'Expert Faculty Resources',
      description: 'Unlock access to 35+ industry experts across aesthetics, business, social media, and more.',
      color: 'blue',
      layout: '2/3',
      visual: 'community',
    },
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'Customized training modules based on your experience level and specific improvement areas.',
      color: 'cyan',
      layout: '1/3',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track your progress with comprehensive reporting on all aspects of your consultation performance.',
      color: 'emerald',
      layout: '1/3',
    },
    {
      icon: Trophy,
      title: 'Performance Tracking',
      description: 'Monitor your improvement with detailed analytics and personalized feedback from industry experts with real-time insights.',
      color: 'fuchsia',
      layout: '2/3',
      visual: 'performance',
    },
    {
      icon: Shield,
      title: 'Ethical Framework',
      description: 'Built-in ethical guidelines ensure your sales approach always prioritizes patient well-being with our patient-first approach.',
      color: 'rose',
      layout: '2/3',
      visual: 'ethics',
    },
    {
      icon: Smartphone,
      title: 'Mobile Learning',
      description: 'Access your training anywhere, anytime with our fully responsive mobile platform.',
      color: 'amber',
      layout: '1/3',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      indigo: {
        bg: 'from-indigo-900/20 to-black',
        border: 'border-indigo-800/30',
        hoverBorder: 'hover:border-indigo-600/50',
        iconBg: 'bg-indigo-800/20',
        iconColor: 'text-indigo-400',
        visualBg: 'from-indigo-900/40 to-black/60',
        visualBorder: 'border-indigo-500/30',
        visualBlur: 'bg-indigo-500/20',
        cardBg: 'from-indigo-900/30 to-black/50',
        cardBorder: 'border-indigo-800/30',
        textColor: 'text-indigo-300',
        dotColor: 'bg-indigo-400',
        lineColor: 'bg-indigo-800/50',
      },
      purple: {
        bg: 'from-purple-900/20 to-black',
        border: 'border-purple-800/30',
        hoverBorder: 'hover:border-purple-600/50',
        iconBg: 'bg-purple-800/20',
        iconColor: 'text-purple-400',
        visualBg: 'from-purple-900/40 to-black/60',
        visualBorder: 'border-purple-500/30',
        visualBlur: 'bg-purple-500/20',
        cardBg: 'from-purple-900/30 to-black/50',
        cardBorder: 'border-purple-800/30',
        textColor: 'text-purple-300',
        dotColor: 'bg-purple-400',
        lineColor: 'bg-purple-800/50',
      },
      blue: {
        bg: 'from-blue-900/20 to-black',
        border: 'border-blue-800/30',
        hoverBorder: 'hover:border-blue-600/50',
        iconBg: 'bg-blue-800/20',
        iconColor: 'text-blue-400',
        visualBg: 'from-blue-900/40 to-black/60',
        visualBorder: 'border-blue-500/30',
        visualBlur: 'bg-blue-500/20',
        cardBg: 'from-blue-900/30 to-black/50',
        cardBorder: 'border-blue-800/30',
        textColor: 'text-blue-300',
        dotColor: 'bg-blue-400',
        lineColor: 'bg-blue-800/50',
      },
      cyan: {
        bg: 'from-cyan-900/20 to-black',
        border: 'border-cyan-800/30',
        hoverBorder: 'hover:border-cyan-600/50',
        iconBg: 'bg-cyan-800/20',
        iconColor: 'text-cyan-400',
        visualBg: 'from-cyan-900/40 to-black/60',
        visualBorder: 'border-cyan-500/30',
        visualBlur: 'bg-cyan-500/20',
        cardBg: 'from-cyan-900/30 to-black/50',
        cardBorder: 'border-cyan-800/30',
        textColor: 'text-cyan-300',
        dotColor: 'bg-cyan-400',
        lineColor: 'bg-cyan-800/50',
      },
      emerald: {
        bg: 'from-emerald-900/20 to-black',
        border: 'border-emerald-800/30',
        hoverBorder: 'hover:border-emerald-600/50',
        iconBg: 'bg-emerald-800/20',
        iconColor: 'text-emerald-400',
        visualBg: 'from-emerald-900/40 to-black/60',
        visualBorder: 'border-emerald-500/30',
        visualBlur: 'bg-emerald-500/20',
        cardBg: 'from-emerald-900/30 to-black/50',
        cardBorder: 'border-emerald-800/30',
        textColor: 'text-emerald-300',
        dotColor: 'bg-emerald-400',
        lineColor: 'bg-emerald-800/50',
      },
      fuchsia: {
        bg: 'from-fuchsia-900/20 to-black',
        border: 'border-fuchsia-800/30',
        hoverBorder: 'hover:border-fuchsia-600/50',
        iconBg: 'bg-fuchsia-800/20',
        iconColor: 'text-fuchsia-400',
        visualBg: 'from-fuchsia-900/40 to-black/60',
        visualBorder: 'border-fuchsia-500/30',
        visualBlur: 'bg-fuchsia-500/20',
        cardBg: 'from-fuchsia-900/30 to-black/50',
        cardBorder: 'border-fuchsia-800/30',
        textColor: 'text-fuchsia-300',
        dotColor: 'bg-fuchsia-400',
        lineColor: 'bg-fuchsia-800/50',
      },
      rose: {
        bg: 'from-rose-900/20 to-black',
        border: 'border-rose-800/30',
        hoverBorder: 'hover:border-rose-600/50',
        iconBg: 'bg-rose-800/20',
        iconColor: 'text-rose-400',
        visualBg: 'from-rose-900/40 to-black/60',
        visualBorder: 'border-rose-500/30',
        visualBlur: 'bg-rose-500/20',
        cardBg: 'from-rose-900/30 to-black/50',
        cardBorder: 'border-rose-800/30',
        textColor: 'text-rose-300',
        dotColor: 'bg-rose-400',
        lineColor: 'bg-rose-800/50',
      },
      amber: {
        bg: 'from-amber-900/20 to-black',
        border: 'border-amber-800/30',
        hoverBorder: 'hover:border-amber-600/50',
        iconBg: 'bg-amber-800/20',
        iconColor: 'text-amber-400',
        visualBg: 'from-amber-900/40 to-black/60',
        visualBorder: 'border-amber-500/30',
        visualBlur: 'bg-amber-500/20',
        cardBg: 'from-amber-900/30 to-black/50',
        cardBorder: 'border-amber-800/30',
        textColor: 'text-amber-300',
        dotColor: 'bg-amber-400',
        lineColor: 'bg-amber-800/50',
      },
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const renderVisual = (visual: string, color: string) => {
    const colors = getColorClasses(color);
    
    switch (visual) {
      case 'psychology':
        return (
          <div className="relative">
            <div className={`absolute inset-0 ${colors.visualBlur} blur-2xl rounded-full`}></div>
            <div className={`relative z-10 bg-gradient-to-br ${colors.visualBg} p-4 rounded-xl border ${colors.visualBorder}`}>
              <div className="w-full h-32 flex items-center justify-center">
                <Brain className={`w-20 h-20 ${colors.iconColor}/80`} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        );
      case 'community':
        return (
          <div className="space-y-3">
            <div className={`bg-gradient-to-r ${colors.cardBg} p-3 rounded-lg border ${colors.cardBorder}`}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600/40 flex items-center justify-center mr-3">
                  <span className="text-xs">MR</span>
                </div>
                <div className="text-sm text-gray-300">Just shared new Social Media trends</div>
              </div>
            </div>
            <div className={`bg-gradient-to-r ${colors.cardBg} p-3 rounded-lg border ${colors.cardBorder}`}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600/40 flex items-center justify-center mr-3">
                  <span className="text-xs">JC</span>
                </div>
                <div className="text-sm text-gray-300">New guide on updated Compliance</div>
              </div>
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="grid grid-cols-2 gap-3">
            <div className={`bg-gradient-to-r ${colors.cardBg} p-3 rounded-lg border ${colors.cardBorder} flex flex-col items-center`}>
              <div className="text-xs text-gray-400 mb-1">Conversion</div>
              <div className={`${colors.textColor} text-lg font-medium`}>89%</div>
            </div>
            <div className={`bg-gradient-to-r ${colors.cardBg} p-3 rounded-lg border ${colors.cardBorder} flex flex-col items-center`}>
              <div className="text-xs text-gray-400 mb-1">Revenue</div>
              <div className={`${colors.textColor} text-lg font-medium`}>+45%</div>
            </div>
            <div className={`bg-gradient-to-r ${colors.cardBg} p-3 rounded-lg border ${colors.cardBorder} flex flex-col items-center`}>
              <div className="text-xs text-gray-400 mb-1">Sessions</div>
              <div className={`${colors.textColor} text-lg font-medium`}>1.2K</div>
            </div>
            <div className={`bg-gradient-to-r ${colors.cardBg} p-3 rounded-lg border ${colors.cardBorder} flex flex-col items-center`}>
              <div className="text-xs text-gray-400 mb-1">Score</div>
              <div className={`${colors.textColor} text-lg font-medium`}>94%</div>
            </div>
          </div>
        );
      case 'ethics':
        return (
          <div className="relative">
            <div className={`absolute inset-0 ${colors.visualBlur} blur-2xl rounded-full`}></div>
            <div className={`relative z-10 bg-gradient-to-br ${colors.visualBg} p-4 rounded-xl border ${colors.visualBorder}`}>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${colors.dotColor}`}></div>
                  <div className={`h-1 flex-grow ${colors.lineColor} rounded`}></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="h-1 flex-grow bg-green-800/50 rounded"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <div className="h-1 flex-grow bg-blue-800/50 rounded"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Group features into rows with alternating layouts
  const createRows = () => {
    const rows = [];
    let currentRow = [];
    let expectedLayout = '1/3'; // Start with 1/3 - 2/3 pattern

    for (const feature of features) {
      if (currentRow.length === 0) {
        currentRow.push(feature);
        if (feature.layout === '2/3') {
          // If we start with 2/3, we need a 1/3 to complete the row
          expectedLayout = '1/3';
        } else {
          // If we start with 1/3, we need a 2/3 to complete the row
          expectedLayout = '2/3';
        }
      } else if (currentRow.length === 1) {
        if (feature.layout === expectedLayout) {
          currentRow.push(feature);
          rows.push([...currentRow]);
          currentRow = [];
          expectedLayout = expectedLayout === '1/3' ? '2/3' : '1/3'; // Alternate for next row
        } else {
          // If layout doesn't match, start a new row
          rows.push([...currentRow]);
          currentRow = [feature];
          expectedLayout = feature.layout === '1/3' ? '2/3' : '1/3';
        }
      }
    }

    // Add any remaining features
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const rows = createRows();

  return (
    <div className="pt-16 bg-black text-white font-light">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-black" />
        

        
        <motion.div
          ref={ref}
          className="relative z-10 max-w-3xl mx-auto px-6 text-center mb-2 md:mb-14"
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
            Powerful Features
            <span className="block">
              <span className="text-white">for</span>
              <span className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
                {' '}Maximum Results
              </span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Every feature is designed to accelerate your learning and maximize your consultation success rate.
          </motion.p>
        </motion.div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="pb-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {rows.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * rowIndex }}
                viewport={{ once: true }}
              >
                {row.map((feature, featureIndex) => {
                  const colors = getColorClasses(feature.color);
                  
                  return (
                    <motion.div
                      key={feature.title}
                      className={`group ${feature.layout === '2/3' ? 'md:col-span-2' : ''} bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl p-8 ${colors.hoverBorder} hover:scale-[1.02] transition-all duration-300`}
                    >
                      {feature.layout === '2/3' ? (
                        // Large feature card with visual
                        <div className="flex flex-col md:flex-row md:items-center">
                          <div className="md:w-1/2 mb-6 md:mb-0">
                            <div className={`p-2 ${colors.iconBg} rounded-xl w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                              <feature.icon className={`w-6 h-6 ${colors.iconColor} group-hover:text-white transition-colors duration-300`} />
                            </div>
                            <h3 className="text-xl mb-3 font-medium group-hover:text-[#00d9ff] transition-colors duration-300">
                              {feature.title}
                            </h3>
                            <p className="text-gray-400 font-extralight">
                              {feature.description}
                            </p>
                          </div>
                          <div className="md:w-1/2 md:pl-8 flex justify-center">
                            {renderVisual(feature.visual!, feature.color)}
                          </div>
                        </div>
                      ) : (
                        // Small feature card
                        <div>
                          <div className={`p-2 ${colors.iconBg} rounded-xl w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className={`w-6 h-6 ${colors.iconColor} group-hover:text-white transition-colors duration-300`} />
                          </div>
                          <h3 className="text-xl mb-3 font-medium group-hover:text-[#00d9ff] transition-colors duration-300">
                            {feature.title}
                          </h3>
                          <p className="text-gray-400 font-extralight">
                            {feature.description}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-16"></div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d9ff] to-[#ff41fd]">transform</span> your practice?
            </h2>
            <p className="text-gray-400 font-extralight max-w-2xl mx-auto mb-8">
              Join thousands of aesthetic professionals already using our platform to accelerate their consultation success.
            </p>
            <div className="flex justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-bold text-lg shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://platform.aestheticsaleshero.com/offers/rsare8xU/checkout', '_blank')}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      <FloatingPriceGuide />
    </div>
  );
};

export default Features;