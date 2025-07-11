import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };
  
  const prevTestimonials = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const testimonials = [
    {
      name: 'Paulina Riedler, RN',
      role: 'CEO & Co-Founder',
      company: 'SpaKinect',
      profileImage: '/testimonials/paulina-riedler.png',
      companyLogo: '/companylogos/spakinect.png',
      rating: 5,
      testimonial: 'Aesthetic Sales Hero is the most comprehensive and affordable sales training out there for people in aesthetics. There\'s truly nothing else like it. BIANCA, their AI sales agent is incredibly helpful, like having a coach available 24/7… The best part is the platform keeps getting better!',
    },
    {
      name: 'Mary Robb',
      role: 'Founder & CEO',
      company: 'Social Practice',
      profileImage: '/testimonials/mary-robb.png',
      companyLogo: '/companylogos/socialpractice.png',
      rating: 5,
      testimonial: 'The sales framework taught through Aesthetic Sales Hero is one of the most effective I\'ve seen. It equips aesthetic providers and patient coordinators with the tools, confidence, and language needed to convert consultations into booked treatments — all while maintaining authenticity and trust with the patient.',
    },
    {
      name: 'Sonya Ellis, RN, MSN, CANS, CPSN',
      role: 'Co-Founder',
      company: 'The LAB Med Spa',
      profileImage: '/testimonials/sonya-ellis.png',
      companyLogo: '/companylogos/labmedspa.png',
      rating: 5,
      testimonial: 'I can\'t say enough great things about Aesthetic Sales Hero! I\'ve been in the aesthetics industry for 25 years now and I am actually really good at sales. However, I learned tons of great information from this course. In healthcare, we\'re not always the best at sales, but this platform makes it so easy to sell authentically and organically to your patients – all while increasing your profit margins! Well worth your time and money.',
    },
    {
      name: 'Hailey Layton',
      role: 'Financial Consultant',
      company: 'Maven Financial Partners',
      profileImage: '/testimonials/hailey-layton.jpeg',
      companyLogo: '/companylogos/mavenfinancial.png',
      rating: 5,
      testimonial: 'Aesthetic Sales Hero is a robust training program that helps everyone in the practice no matter what role you play to truly excel in their role!',
    },
    {
      name: 'Danice Richardson',
      role: 'Practice Manager',
      company: 'Genesis Med Spa',
      profileImage: '/testimonials/danice-richardson.jpeg',
      companyLogo: '/companylogos/genesismedspa.png',
      rating: 5,
      testimonial: 'Our providers are now significantly more confident in their approach to selling. They\'ve developed the skills to navigate challenging client interactions with ease and authenticity, without coming across pushy. As a result, we have noticed positive feedback from clients. The most valuable takeaway from this experience has been the transformation in how our team approaches client interactions.',
    },
    {
      name: 'Gary Bufalo',
      role: 'Chief Operating Officer',
      company: 'Princeton Medspa Partners',
      profileImage: '/testimonials/gary-bufalo.jpeg',
      companyLogo: '/companylogos/princeton-medspa.png',
      rating: 5,
      testimonial: 'As a company that acquires and partners with best in market med spas across the country, we\'re always looking for partners who can elevate our teams and help us continue to be best-in-class. Aesthetic Sales Hero has been exactly that. The coaching and consulting provided by Marco has been exceptional—our teams consistently share how interactive, encouraging, and hands-on his sessions are. The impact has been immediate, and we\'re grateful to have him as part of our growth journey.',
    },
    {
      name: 'Sheldon Larson',
      role: 'Vice President of Marketing',
      company: 'Sinclair North America',
      profileImage: '/testimonials/sheldon-larson.jpeg',
      companyLogo: '/companylogos/sinclair.png',
      rating: 5,
      testimonial: 'Aesthetic Sales Hero isn\'t just a program or platform, it\'s a mindset. The platform fills a long-standing gap in our industry by equipping not just providers, but the entire practice team, with the tools and mindset to drive meaningful, measurable impact.',
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change testimonial every 4 seconds
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

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

        {/* Testimonials Carousel with Arrow Navigation */}
        <div className="relative">
          {/* Left Arrow */}
          <motion.button
            onClick={prevTestimonials}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="text-white" size={24} />
          </motion.button>

          {/* Right Arrow */}
          <motion.button
            onClick={nextTestimonials}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="text-white" size={24} />
          </motion.button>

          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="relative overflow-hidden py-8"
          >
            <motion.div
              className="flex gap-6"
              animate={{
                x: `${-currentIndex * 380}px`
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="group flex-shrink-0 w-[320px] md:w-[360px]"
                  whileHover={{ scale: 1.02 }}
                >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 h-auto min-h-[280px] hover:bg-white/10 transition-all duration-300 group-hover:border-[#00d9ff]/50 flex flex-col">
                  {/* Stars - Top Left */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-white" size={14} fill="currentColor" />
                    ))}
                  </div>

                  {/* Testimonial - Flexible content area */}
                  <div className="flex-grow mb-4">
                    <p className="text-white/80 leading-relaxed italic text-sm md:text-base">
                      "{testimonial.testimonial}"
                    </p>
                  </div>

                  {/* Author - Fixed at bottom */}
                  <div className="flex items-center gap-3 mt-auto pb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden flex-shrink-0">
                      <img
                        src={testimonial.profileImage}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to a placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#00d9ff]/20 to-[#ff41fd]/20 flex items-center justify-center text-white font-semibold text-xs">' + testimonial.name.charAt(0) + '</div>';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white group-hover:text-[#00d9ff] transition-colors duration-300 text-sm truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/70 text-xs truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-[#ff41fd] text-xs font-semibold truncate">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Company Logo - Bottom Right */}
                  <div className="absolute bottom-4 right-4">
                    <img
                      src={testimonial.companyLogo}
                      alt={`${testimonial.company} logo`}
                      className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        // Hide the logo if it fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00d9ff]/0 to-[#ff41fd]/0 group-hover:from-[#00d9ff]/5 group-hover:to-[#ff41fd]/5 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
            </motion.div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 3000);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#00d9ff] w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;