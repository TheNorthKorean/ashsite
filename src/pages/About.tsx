import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Target, Users, Award } from 'lucide-react';
import FloatingPriceGuide from '../components/FloatingPriceGuide';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-10 md:pt-20 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          ref={ref}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Aesthetic Sales Hero
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-medium md:text-xl text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're revolutionizing how aesthetic professionals approach sales training, 
            combining cutting-edge technology with proven methodologies to create 
            the ultimate learning experience.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-10 md:py-24 relative">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Founded by industry veterans who witnessed firsthand the gap between 
                traditional sales training and the unique needs of aesthetic medicine, 
                Aesthetic Sales Hero was born from a simple observation: aesthetic 
                professionals needed specialized training that understood their world.
              </p>
              <p className="text-white/70 leading-relaxed">
                After years of research, development, and testing with leading practices 
                worldwide, we've created the first comprehensive sales training platform 
                designed exclusively for the aesthetic industry.
              </p>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-[#00d9ff]/10 to-[#ff41fd]/10 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Users, label: '200+', desc: 'Professionals Trained' },
                    { icon: Target, label: '27%', desc: 'Average Conversion Increase' },
                    { icon: Award, label: '50+', desc: 'Industry Awards' },
                    { icon: Heart, label: '98%', desc: 'Satisfaction Rate' },
                  ].map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="group text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#00d9ff]/30 to-[#ff41fd]/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <stat.icon className="text-[#00d9ff] group-hover:text-white transition-colors duration-300" size={24} />
                        </div>
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
                        {stat.label}
                      </div>
                      <div className="text-white text-sm">{stat.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 md:py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-medium md:text-xl text-white/70 max-w-4xl mx-auto">
              Everything we do is guided by these core principles that shape our platform and community.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: 'Patient-First Approach',
                description: 'We believe ethical sales practices that prioritize patient well-being create the best outcomes for everyone.',
              },
              {
                icon: Target,
                title: 'Results-Driven',
                description: 'Our training is designed to deliver measurable improvements in consultation conversion rates and revenue.',
              },
              {
                icon: Users,
                title: 'Community Focused',
                description: 'We foster a supportive community where aesthetic professionals can learn, grow, and succeed together.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-8 hover:scale-[1.02] transition-all duration-300 hover:border-[#00d9ff]/50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 bg-[#00d9ff]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="text-[#00d9ff] group-hover:text-white transition-colors duration-300" size={26} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-[#00d9ff] transition-colors duration-300">{value.title}</h3>
                <p className="text-white/70 text-center leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <FloatingPriceGuide />
    </div>
  );
};

export default About;