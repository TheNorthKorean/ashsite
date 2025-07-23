import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star, Crown, Zap } from 'lucide-react';

const PricingCards = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: 'Membership',
      subtitle: 'For individual practitioners',
      monthlyPrice: 29,
      annualPrice: 29 * 12 * 0.7, // 30% discount
      icon: Star,
      recommended: true,
      features: [
        'Complete consultation training system',
        'AI conversation practice sessions',
        'Comprehensive guidebooks & scripts',
        'Expert faculty content',
        'Certification upon completion',
        'Email support',
      ],
      highlight: 'Most Popular',
    },
    {
      name: 'Enterprise',
      subtitle: 'For practices and teams',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      icon: Crown,
      recommended: false,
      features: [
        'Everything in Membership',
        'Custom training modules',
        'Advanced analytics & reporting',
        'Priority support',
        'Dedicated success manager',
        'White-label options',
      ],
      highlight: 'Best Value for Teams',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
      
      {/* Section Label */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <span className="text-xs font-medium text-white/100 tracking-wider">Pricing</span>
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
            Choose Your{' '}
            <span className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Success Path
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-8 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your consultation skills and boost your revenue with our proven training system.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="flex items-center gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className={`font-semibold ${!isAnnual ? 'text-[#00d9ff]' : 'text-white/60'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-gradient-to-r from-[#00d9ff] to-[#ff41fd]' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform duration-300 ${
                  isAnnual ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-semibold ${isAnnual ? 'text-[#00d9ff]' : 'text-white/60'}`}>
              Annual
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
              Save 30%
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`group relative ${plan.recommended ? 'lg:scale-105' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.3 * index }}
            >
              <div className={`relative bg-white/5 backdrop-blur-xl border rounded-3xl p-8 h-full hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 ${
                plan.recommended 
                  ? 'border-[#00d9ff]/60 hover:border-[#00d9ff]' 
                  : 'border-white/20 hover:border-[#ff41fd]/50'
              }`}>
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-6 py-1.5 bg-gradient-to-r from-[#00d9ff]/90 to-[#ff41fd]/90 rounded-full text-sm font-bold">
                      {plan.highlight}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${
                    plan.recommended 
                      ? 'bg-[#00d9ff]/10' 
                      : 'bg-[#ff41fd]/10'
                  }`}>
                    <plan.icon className={`${plan.recommended ? 'text-[#00d9ff]' : 'text-[#ff41fd]'} group-hover:text-white transition-colors duration-300`} size={26} />
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.recommended ? 'group-hover:text-[#00d9ff]' : 'group-hover:text-[#ff41fd]'} transition-colors duration-300`}>
                    {plan.name}
                  </h3>
                  
                  <p className="text-white/70 mb-4 md:mb-6">
                    {plan.subtitle}
                  </p>

                  <div className="mb-2">
                    {typeof plan.monthlyPrice === 'number' ? (
                      <>
                        <span className="text-5xl font-bold bg-white bg-clip-text text-transparent">
                          ${isAnnual && typeof plan.annualPrice === 'number' ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice}
                        </span>
                        <span className="text-white/70 ml-2">/month</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold bg-white bg-clip-text text-transparent">
                        Custom pricing
                      </span>
                    )}
                  </div>
                  
                  {isAnnual && typeof plan.annualPrice === 'number' && (
                    <p className="text-sm text-green-400">
                      Billed annually (${Math.round(plan.annualPrice)})
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className={`${plan.recommended ? 'text-[#00d9ff]' : 'text-[#ff41fd]'} mt-1 flex-shrink-0`} size={16} />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-4 rounded-xl font-bold text-medium transition-all duration-300 ${
                    plan.recommended
                      ? 'bg-[#00d9ff]/100 text-black hover:shadow-[#00d9ff]/25 shadow-lg'
                      : 'border-2 border-[#ff41fd] text-[#ff41fd] hover:bg-[#ff41fd] hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (plan.recommended) {
                      window.open('https://platform.aestheticsaleshero.com/offers/rsare8xU/checkout', '_blank');
                    } else {
                      window.location.href = '/enterprise';
                    }
                  }}
                >
                  {plan.recommended ? 'Start Your Journey' : 'Contact Sales'}
                </motion.button>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl transition-all duration-300 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-3 bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-3xl">
            <Zap className="text-green-400" size={24} />
            <span className="text-medium font-medium text-green-400">
              30-Day Money-Back Guarantee
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PricingCards;