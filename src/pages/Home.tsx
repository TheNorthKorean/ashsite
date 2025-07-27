import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import HowItWorks from '../components/HowItWorks';
import CompetitiveAnalysis from '../components/CompetitiveAnalysis';
import AestheticDifference from '../components/AestheticDifference';
import Features from '../components/Features';
import Credibility from '../components/Credibility';
import Mission from '../components/Mission';
import PricingCards from '../components/PricingCards';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import FloatingPriceGuide from '../components/FloatingPriceGuide';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // This ensures animation triggers every time
    threshold: 0.3, // Trigger when 30% of the element is visible
  });

  return (
    <>
      <Hero />
      <TrustedBy />
      <HowItWorks />
      
      {/* Wrapper for CompetitiveAnalysis and AestheticDifference with Hero 2 */}
      <div className="relative" ref={ref}>
        <CompetitiveAnalysis />
        <AestheticDifference />

        {/* Hero 2 Image - positioned between sections */}
        <motion.div
          className="absolute hidden xl:block z-20"
          style={{
            top: 'calc(50% + -50px)', // Adjust this value to fine-tune vertical placement
            right: '100px', // Position it at the right edge to avoid horizontal clipping
            transform: 'translateY(-50%)',
          }}
          initial={{ opacity: 0, x: 100, scale: 0.8, rotate: -6 }}
          animate={inView ? { 
            opacity: 1, 
            x: 0, 
            scale: 1, 
            rotate: 0 
          } : { 
            opacity: 0, 
            x: 100, 
            scale: 0.8, 
            rotate: 15 
          }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Subtle glow effect behind image - same as Hero 1 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00d9ff]/20 to-[#ff41fd]/20 blur-2xl rounded-full transform scale-110"></div>

            {/* Hero 2 Image */}
            <motion.div
              className="relative z-10"
              style={{
                filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 20px rgba(0, 217, 255, 0.3)) drop-shadow(0 0 40px rgba(255, 65, 253, 0.2))',
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                filter: 'drop-shadow(0 12px 35px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 30px rgba(0, 217, 255, 0.5)) drop-shadow(0 0 60px rgba(255, 65, 253, 0.4))',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero 2 Image */}
              <img
                src="/heros/Hero 2.png"
                alt="Aesthetic Sales Training"
                className="w-72 h-auto object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <Features />
      <Credibility />
      <Mission />
      <PricingCards />
      <Testimonials />
      <FAQ />
      <CTA />
      <FloatingPriceGuide />
    </>
  );
};

export default Home;