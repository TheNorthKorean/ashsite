import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TrustedBy = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Create array of logo paths - available logos from logos3 folder (1-26)
  const availableLogos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
  
  const companies = availableLogos.map(companyNumber => ({
    name: `Company ${companyNumber}`,
    logo: `/logos3/${companyNumber}.png`
  }));

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
          className="text-xl md:text-2xl lg:text-2xl font-medium mb-2 text-white/90 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Trusted by industry leaders
        </motion.h2>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex items-center gap-8 md:gap-16"
              animate={{
                x: [0, -(companies.length * 120)], // Adjust based on gap and logo width
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
              {[...companies, ...companies, ...companies, ...companies].map((company, index) => (
                <motion.div
                  key={`${company.name}-${index}`}
                  className="flex items-center justify-center min-w-max group"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  transition={{ 
                    duration: 0,
                    ease: "easeOut"
                  }}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className={`w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-200 ease-out ${
                      company.name === 'Company 19' 
                        ? 'h-40 md:h-44 lg:h-48' 
                        : ['Company 5', 'Company 7', 'Company 8', 'Company 9', 'Company 10', 'Company 11', 'Company 12', 'Company 13', 'Company 16'].includes(company.name)
                        ? 'h-32 md:h-36 lg:h-40' 
                        : 'h-24 md:h-28 lg:h-28'
                    }`}
                                          style={{
                        maxWidth: company.name === 'Company 19'
                          ? '280px' 
                          : ['Company 5', 'Company 7', 'Company 8', 'Company 9', 'Company 16'].includes(company.name)
                          ? '180px' 
                          : '100px',
                        minWidth: company.name === 'Company 19' 
                          ? '200px' 
                          : ['Company 5', 'Company 7', 'Company 8', 'Company 9', 'Company 16'].includes(company.name)
                          ? '100px' 
                          : '60px'
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