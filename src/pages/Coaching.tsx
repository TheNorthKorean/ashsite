import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Video, Users, Calendar, Award, MessageCircle, TrendingUp, CheckCircle, User, Clock } from 'lucide-react';

const Coaching = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    practiceName: '',
    coachingType: '',
    goals: '',
    bestTime: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const encode = (data: Record<string, any>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'coaching-inquiry', ...formData }),
      });
      console.log('Form submitted successfully');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const coachingFeatures = [
    {
      icon: Video,
      title: '1-on-1 Coaching Sessions',
      description: 'Personalized coaching sessions with industry experts to address your specific challenges and goals.',
    },
    {
      icon: Users,
      title: 'Group Coaching',
      description: 'Learn alongside peers in small group sessions focused on specific aspects of aesthetic sales.',
    },
    {
      icon: Calendar,
      title: 'Weekly Live Sessions',
      description: 'Join our weekly live coaching calls covering trending topics and common challenges.',
    },
    {
      icon: Award,
      title: 'Certification Program',
      description: 'Complete our comprehensive certification program and join our elite community of professionals.',
    },
    {
      icon: MessageCircle,
      title: 'Community Support',
      description: 'Access our private community forum for ongoing support and networking opportunities.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics and personalized feedback from coaches.',
    },
  ];

  return (
    <div className="pt-16 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <motion.div
          ref={ref}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
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
            Expert
            <span className="block">
              <span className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
                Coaching Program
              </span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get personalized guidance from industry-leading aesthetic sales professionals 
            who have generated millions in revenue through proven consultation techniques.
          </motion.p>
        </motion.div>
      </section>

      {/* Founder/Coach Profile Section */}
      <section className="py-6 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-14">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full max-w-md mx-auto">
                  {/* Simplified glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00d9ff]/10 to-[#ff41fd]/10 blur-xl rounded-2xl"></div>
                  
                  {/* Profile image */}
                  <div className="relative z-10 w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                    <img
                      src="/headshot/Marco.png"
                      alt="Marco Emilio Valle - Founder & Lead Coach"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Profile Content */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent mb-6">
                  Marco Emilio Valle
                </h3>
                
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    Personally led by Marco Emilio Valle, your sales and marketing expert with 15 years of aesthetic industry experience!
                  </p>
                  
                  <p>
                    Since 2010, Marco has served in sales, marketing, training, operations, and consulting roles for leading medical aesthetic manufacturers including Allergan, Galderma, and Merz. Marco has also served as sales director at dynamic med spa chains like Orange Twist, It’s A Secret, and Vitalyc. During his tenure at Galderma, he created national curricula as U.S. Sales Training Manager and served on the brand advisory boards for Dysport, Restylane, and Sculptra.
                  </p>
                </div>

                {/* Achievements */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { number: '4,000+', label: 'Professionals Trained' },
                    { number: '$90M+', label: 'Revenue Generated' },
                    { number: '15+', label: 'Years Experience' },
                    { number: '95%', label: 'Success Rate' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-[#00d9ff] mb-1">{stat.number}</div>
                      <div className="text-sm text-white/100">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coaching Features */}
      <section className="py-20 relative">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Coaching Options and Features</h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive training and support designed to accelerate your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coachingFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 h-full hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group-hover:border-[#ff41fd]/50">
                  {/* Icon */}
                  <div className="flex justify-center mb-2 md:mb-6">
                    <div className="w-14 h-14 bg-[#ff41fd]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="text-[#ff41fd] group-hover:text-white transition-colors duration-300" size={26} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 md:mb-4 text-center transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Inquiry Form */}
      <section id="coaching-form" className="py-12 md:py-24 relative">
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {!isSubmitted ? (
              <>
                <div className="text-center mb-4">
                  <h2 className="text-4xl font-bold mb-4 mt-4 md:mt-0">Start Your Coaching Journey</h2>
                  <p className="text-l text-white/70 max-w-2xl mx-auto">
                    Ready to transform your practice? Let's discuss how personalized coaching can accelerate your success.
                  </p>
                </div>

                <form 
                  name="coaching-inquiry"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="coaching-inquiry" />
                  <p style={{ display: 'none' }}>
                    <label>
                      Don't fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  {/* First Name and Last Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-regular mb-2">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-regular mb-2">
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* Email and Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-regular mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-regular mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Practice Name Row */}
                  <div>
                    <label className="block text-sm font-regular mb-2">
                      Practice Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="practiceName"
                      value={formData.practiceName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                      placeholder="Enter your practice name"
                    />
                  </div>

                  {/* Coaching Type */}
                  <div>
                    <label className="block text-sm font-regular mb-2">
                      Preferred Coaching Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="coachingType"
                      value={formData.coachingType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                    >
                      <option value="">Select coaching type</option>
                      <option value="1:1">1-on-1 Coaching</option>
                      <option value="group">Group Coaching</option>
                      <option value="corporate">Corporate Training</option>
                    </select>
                  </div>

                  {/* Goals/Challenges */}
                  <div>
                    <label className="block text-sm font-regular mb-2">
                      Goals & Challenges <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your current challenges and what you hope to achieve through coaching..."
                    />
                  </div>



                  {/* Best Time to Contact */}
                  <div>
                    <label className="block text-sm font-regular mb-2">Best Time to Contact</label>
                    <select
                      name="bestTime"
                      value={formData.bestTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                    >
                      <option value="">Select preferred time</option>
                      <option value="morning">Morning (9AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="evening">Evening (5PM - 8PM)</option>
                      <option value="anytime">Anytime</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <motion.button
                      type="submit"
                      className="px-8 py-3 md:py-3 mb-4 md:mb-0 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-semibold text-base md:text-base shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start My Coaching Journey
                    </motion.button>
                  </div>
                </form>
              </>
            ) : (
              /* Success Message */
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-400" size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-green-400">Thank You!</h3>
                <p className="text-xl text-white/80 mb-6">
                  Your coaching inquiry has been submitted successfully.
                </p>
                <p className="text-white/90 max-w-2xl mx-auto">
                  Marco and our team will personally review your submission and reach out within 24 hours to discuss 
                  how our coaching program can help you achieve your goals. We're excited to be part of 
                  your success journey!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Coaching;