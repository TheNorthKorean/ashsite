import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Building, 
  Users, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Target,
  BarChart3,
  Award
} from 'lucide-react';

const Enterprise = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    practiceSize: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'form-name': 'enterprise-contact',
          ...formData
        }).toString()
      });

      if (response.ok) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          practiceSize: '',
          message: ''
        });
        alert('Thank you for your inquiry! We\'ll be in touch within 24 hours.');
      } else {
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const enterpriseFeatures = [
    {
      icon: Building,
      title: 'Multi-Location Support',
      description: 'Manage training across all your practice locations with centralized reporting and analytics.'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Advanced user roles, permissions, and team progress tracking for practices of any size.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Deep insights into consultation performance, ROI tracking, and custom reporting dashboards.'
    },
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Enterprise-grade security, compliance features, and dedicated support for your organization.'
    },
    {
      icon: Target,
      title: 'Custom Training Programs',
      description: 'Tailored content and training programs designed specifically for your practice needs.'
    },
    {
      icon: Award,
      title: 'Dedicated Success Manager',
      description: 'Personal account manager to ensure maximum ROI and ongoing optimization of your training.'
    }
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
            <span className="text-white">Enterprise</span>
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/70 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Scale your aesthetic practice with enterprise-grade training solutions. 
            Custom programs, advanced analytics, and dedicated support for multi-location practices.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById('enterprise-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-bold text-lg shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => window.open('tel:+18558123456', '_self')}
              className="px-8 py-4 border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Call Sales
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Enterprise Features</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Advanced capabilities designed for large practices, multi-location operations, and enterprise organizations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-[#00d9ff] group-hover:text-white transition-colors duration-300" size={24} />
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-[#00d9ff] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="enterprise-form" className="py-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Contact Sales</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Ready to transform your practice? Get in touch with our enterprise sales team to discuss your specific needs.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form 
              name="enterprise-contact" 
              method="POST" 
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="enterprise-contact" />
              <p hidden>
                <label>
                  Don't fill this out: <input name="bot-field" onChange={() => {}} />
                </label>
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company/Practice Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Practice Size <span className="text-red-400">*</span>
                </label>
                <select
                  name="practiceSize"
                  value={formData.practiceSize}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors duration-300"
                >
                  <option value="">Select practice size</option>
                  <option value="1-5 employees">1-5 employees</option>
                  <option value="6-20 employees">6-20 employees</option>
                  <option value="21-50 employees">21-50 employees</option>
                  <option value="51+ employees">51+ employees</option>
                  <option value="Multi-location">Multi-location</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors duration-300"
                  placeholder="Tell us about your training needs and goals..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-bold text-lg shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <ArrowRight size={20} />}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="text-[#00d9ff]" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Phone</h3>
              <p className="text-white/70">(855) 812-3456</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="text-[#00d9ff]" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <p className="text-white/70">sales@aestheticsaleshero.com</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="text-[#00d9ff]" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Available</h3>
              <p className="text-white/70">Mon-Fri 9AM-6PM PST</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enterprise; 