import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Medical Director',
      clinic: 'Elite Aesthetics',
      image: '👩‍⚕️',
      rating: 5,
      result: '+45% conversion rate',
      testimonial: 'The AI practice sessions completely transformed how I handle consultations. My conversion rate went from 62% to 89% in just 3 months. Patients now trust me more and feel confident in their decisions.',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Aesthetic Consultant',
      clinic: 'Beverly Hills Wellness',
      image: '👨‍💼',
      rating: 5,
      result: '$120K additional revenue',
      testimonial: 'This system taught me how to overcome objections ethically while genuinely caring for my patients. The personalized learning path helped me focus on my weak spots. Incredible ROI.',
    },
    {
      name: 'Dr. Amanda Foster',
      role: 'Practice Owner',
      clinic: 'Rejuvenation Center',
      image: '👩‍⚕️',
      rating: 5,
      result: '3x faster onboarding',
      testimonial: 'Training new staff used to take months. Now they\'re consultation-ready in weeks. The analytics help me track everyone\'s progress and identify who needs additional support.',
    },
    {
      name: 'James Thompson',
      role: 'Sales Director',
      clinic: 'Modern Aesthetics Group',
      image: '👨‍💼',
      rating: 5,
      result: '92% team satisfaction',
      testimonial: 'My entire team loves this platform. The community aspect keeps them motivated, and the bite-sized modules fit perfectly into our busy schedule. Best investment we\'ve made.',
    },
    {
      name: 'Dr. Lisa Park',
      role: 'Aesthetic Physician',
      clinic: 'Park Dermatology',
      image: '👩‍⚕️',
      rating: 5,
      result: '+$85K monthly revenue',
      testimonial: 'The ethical sales framework gave me confidence to recommend treatments I truly believe in. Patients appreciate the honest approach, and my monthly revenue increased by $85K.',
    },
    {
      name: 'Carlos Martinez',
      role: 'Patient Coordinator',
      clinic: 'Luxury Med Spa',
      image: '👨‍💼',
      rating: 5,
      result: '78% to 94% close rate',
      testimonial: 'I went from struggling with objections to confidently addressing every concern. The real-time feedback from AI practice sessions helped me refine my approach perfectly.',
    },
  ];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
      
      {/* Section Label */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
          <span className="text-xs font-medium text-white/100 tracking-wider">Testimonials</span>
        </div>
      </motion.div>
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-20">
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Success
            <span className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              {' '}Stories
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            See how aesthetic professionals are transforming their practices with our training system.
          </motion.p>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative overflow-hidden py-8">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [-100, -100 * testimonials.length - 100],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                className="group min-w-[300px] md:min-w-[400px] max-w-[300px] md:max-w-[400px]"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300 group-hover:border-[#00d9ff]/50">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="text-[#00d9ff]/50" size={32} />
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-[#ff41fd]" size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <p className="text-white/80 leading-relaxed mb-6 italic">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Result Badge */}
                  <div className="mb-6">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-full border border-[#00d9ff]/30">
                      <span className="text-[#00d9ff] font-semibold text-sm">
                        {testimonial.result}
                      </span>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-[#00d9ff] transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {testimonial.role}
                      </p>
                      <p className="text-[#ff41fd] text-sm font-semibold">
                        {testimonial.clinic}
                      </p>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00d9ff]/0 to-[#ff41fd]/0 group-hover:from-[#00d9ff]/5 group-hover:to-[#ff41fd]/5 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>
          
    
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;