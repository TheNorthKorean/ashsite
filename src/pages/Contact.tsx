import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, MessageCircle, Calendar, Users } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    practiceType: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const encode = (data: Record<string, any>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formData }),
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center">
        <motion.div
          className="max-w-xl mx-auto px-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="text-green-400" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Message Sent!
            </h1>
            <p className="text-lg text-white/80 mb-4">
              Thank you for reaching out. Our team will get back to you within 24 hours.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Our friendly team is here to help.',
      contact: 'contact@aestheticsaleshero.com',
      action: 'Send Email',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
    },
    {
      icon: Calendar,
      title: 'Schedule Demo',
      description: 'Book a personalized platform demo',
      contact: 'Available Mon-Fri 9AM-6PM PST',
      action: 'Book Demo',
    },
  ];

  return (
    <div className="pt-20 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
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
            <span className="text-white">Get in</span>
            <span className="bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              {' '}Touch
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your aesthetic practice? We're here to help you get started 
            and answer any questions about our training platform.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form - NOW FIRST */}
      <section className="py-2 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
              <p className="text-white/70">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Don’t fill this out: <input name="bot-field" onChange={() => {}} />
                </label>
              </p>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Practice Type</label>
                <select
                  name="practiceType"
                  value={formData.practiceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
                >
                  <option value="">Select your practice type</option>
                  <option value="medical-spa">Medical Spa</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="plastic-surgery">Plastic Surgery</option>
                  <option value="wellness-center">Wellness Center</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your practice and how we can help..."
                ></textarea>
              </div>
              <div className="text-center">
                <motion.button
                  type="submit"
                  className="px-8 py-4  w-full bg-[#00d9ff] rounded-xl font-semibold text-lg shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300"
                  whileHover={{ scale: 1.01, boxShadow: '0 0 10px rgba(0, 217, 255, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods - NOW SECOND */}
      <section className="py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Other Ways to Reach Us</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Choose the contact method that works best for you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group-hover:border-[#00d9ff]/50">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <method.icon className="text-[#00d9ff] group-hover:text-white transition-colors duration-300" size={32} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-center group-hover:text-[#00d9ff] transition-colors duration-300">
                    {method.title}
                  </h3>
                  
                  <p className="text-white/70 text-center leading-relaxed mb-4">
                    {method.description}
                  </p>

                  <p className="text-white/80 text-center font-semibold mb-6">
                    {method.contact}
                  </p>

                  <div className="text-center">
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 border border-[#00d9ff]/30 rounded-xl font-semibold text-[#00d9ff] hover:bg-gradient-to-r hover:from-[#00d9ff] hover:to-[#ff41fd] hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {method.action}
                    </motion.button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00d9ff]/0 to-[#ff41fd]/0 group-hover:from-[#00d9ff]/5 group-hover:to-[#ff41fd]/5 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;