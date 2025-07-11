import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
    {
      question: 'How quickly will I see results?',
      answer: 'Most practitioners see improvements in their consultation confidence within the first week. Measurable results in conversion rates typically appear within 2-4 weeks of consistent practice. Our average user sees a 27% increase in close rates within 90 days.',
    },
    {
      question: 'Is this suitable for new practitioners?',
      answer: 'Absolutely! Our system is designed for practitioners at all levels. New professionals often see the fastest improvement because they\'re building good habits from the start. We have dedicated onboarding modules specifically for those new to aesthetic consultations.',
    },
    {
      question: 'How does the AI practice feature work?',
      answer: 'Our AI simulates real patient conversations with various personalities, concerns, and objections. You can practice different scenarios, receive instant feedback on your responses, and track your improvement over time. It\'s like having unlimited consultation practice without real patients.',
    },
    {
      question: 'Can I use this for my entire team?',
      answer: 'Yes! Our Enterprise plan is specifically designed for teams. Volume discounts are available for larger practices.',
    },
    {
      question: 'What if I\'m not satisfied with the results?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied with your progress, we\'ll refund your payment, no questions asked. We\'re confident in our system because we see consistent results across thousands of users.',
    },
    {
      question: 'How much time do I need to dedicate to training?',
      answer: 'The beauty of our system is flexibility. You can see results with just 15-20 minutes per day. Our micro-learning modules fit into busy schedules, and you can access training on your phone between patients or during downtime.',
    },
    {
      question: 'Is the training specific to aesthetic medicine?',
      answer: 'Yes, every module is specifically designed for aesthetic and wellness consultations. We cover industry-specific objections, treatment explanations, pricing discussions, and ethical considerations unique to aesthetic medicine. This isn\'t generic sales training adapted for healthcare.',
    },
    {
      question: 'Do you offer ongoing support?',
      answer: 'Absolutely! All members get access to our community forum, monthly live Q&A sessions, and email support. Enterprise customers also receive dedicated success managers and priority support channels.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
      
      {/* Section Label */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <span className="text-xs font-medium text-white/60 tracking-wider">FAQ</span>
        </div>
      </motion.div>
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto px-6"
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
            Frequently Asked
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get answers to the most common questions about our training system.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group-hover:border-[#00d9ff]/50">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between group-hover:text-[#00d9ff] transition-colors duration-300"
                >
                  <h3 className="text-lg font-bold pr-8">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="text-[#00d9ff]" size={24} />
                    ) : (
                      <ChevronDown className="text-white/70 group-hover:text-[#ff41fd]" size={24} />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-white/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ;