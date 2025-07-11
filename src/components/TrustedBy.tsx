import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TrustedBy = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Create array of logo paths - all available logos (1-27, excluding 15)
  const companies = Array.from({ length: 27 }, (_, index) => {
    const companyNumber = index + 1;
    // Skip company 15
    if (companyNumber === 15) return null;
    return {
      name: `Company ${companyNumber}`,
      logo: `/logos/${companyNumber}.png`
    };
  }).filter((company): company is { name: string; logo: string } => company !== null); // Remove null entries

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Perfect transition from Hero - starts black, stays black */}
      <div className="absolute inset-0 bg-black" />
      
      <motion.div
        ref={ref}
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-xl md:text-2xl lg:text-3xl font-medium mb-12 text-white/90 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Trusted by leaders in the industry
        </motion.h2>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex items-center gap-8 md:gap-16"
              animate={{
                x: [0, -100 * companies.length - 100],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60, // Faster animation
                  ease: "linear",
                },
              }}
            >
              {[...companies, ...companies].map((company, index) => (
                <motion.div
                  key={`${company.name}-${index}`}
                  className="flex items-center justify-center min-w-max group"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-24 md:h-28 lg:h-28 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-200 ease-out"
                    style={{
                      maxWidth: '100px',
                      minWidth: '60px'
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-28 h-full bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 w-28 h-full bg-gradient-to-l from-black to-transparent z-10" />
        </div>
      </motion.div>
    </section>
  );
};

export default TrustedBy;