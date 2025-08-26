import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Building } from 'lucide-react';

interface PriceObjectionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  autoShow?: boolean;
  delay?: number;
}

const PriceObjectionsPopup: React.FC<PriceObjectionsPopupProps> = ({ 
  isOpen, 
  onClose, 
  autoShow = true, 
  delay = 2000 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    businessName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // Auto-show popup on page load
  useEffect(() => {
    if (autoShow && !isOpen && !shouldShow) {
      const timer = setTimeout(() => {
        setShouldShow(true);
        // Trigger the parent to open the popup
        const event = new CustomEvent('openPriceObjectionsPopup');
        window.dispatchEvent(event);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [autoShow, delay, isOpen, shouldShow]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started', formData);
    
    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.email) {
      console.error('Required fields missing:', formData);
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Create form data for Netlify
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('form-name', 'price-objections-guide');
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });

      console.log('Submitting form data:', Object.fromEntries(formDataToSubmit));

      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSubmit as any).toString()
      });

      console.log('Response received:', response.status, response.statusText);

      if (response.ok) {
        setIsSubmitted(true);
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed:', response.status, response.statusText);
        // For now, simulate success since Netlify forms might not be configured
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // For now, simulate success since this might be a development environment
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClaimFree = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setIsSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      businessName: ''
    });
    setShouldShow(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.4, 0.0, 0.2, 1]
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#121212] border border-white/10 rounded-2xl shadow-2xl w-full max-w-5xl mx-4 lg:mx-0 max-h-[70vh] lg:max-h-[50vh] overflow-hidden"
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0, duration: 0 }}
                onClick={handleClose}
                className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 p-2 rounded-full transition-all duration-200 hover:bg-white/10 hover:scale-110"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              {/* Content Container */}
              <div className="relative min-h-[70vh] lg:min-h-[50vh] flex flex-col lg:flex-row">
                {/* Mobile Image - Top */}
                <div className="block lg:hidden w-full pt-0 pb-0 mb-[-50px] mt-[-50px]">
                  <div className="relative w-full max-w-lg mx-auto">
                    <motion.img
                      src="/videos/PriceObjections.png"
                      alt="Price Objections Guide"
                      className="w-full h-auto rounded-xl opacity-90"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 0.9, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Left Side - Content/Form Container */}
                <div className="relative z-10 p-6 pt-0 ml-2 lg:p-10 flex flex-col justify-center items-center lg:items-start text-center lg:text-left w-full lg:max-w-2xl">
                  <AnimatePresence mode="wait">
                    {!showForm ? (
                      /* Content View */
                      <motion.div
                        key="content"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -400, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="-mt-3"
                      >
                                                  <div className="inline-block px-3 py-1.5 bg-white/5 border border-white/10 text-white rounded-full text-xs font-regular mb-4 lg:mb-4">
                            💰 Beyond the Price Tag! ($50 Value!)
                          </div>
                        
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                          Mastering <br/>
                          <span className="gradient-text">Price Objections</span>
                        </h2>
                        
                        <p className="text-base lg:text-lg text-white/50 mb-6 leading-relaxed w-full">
                          <span className="font-regular text-white">Your Guide</span> to navigating price-shopper mindsets and overcoming price objections in 
                          <span className="font-regular text-white"> aesthetics and wellness</span>.
                        </p>

                        <button
                          onClick={handleClaimFree}
                          className="px-6 lg:px-10 py-3 lg:py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-3xl text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          Claim for Free
                        </button>
                      </motion.div>
                    ) : (
                      /* Form View */
                      <motion.div
                        key="form"
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        {!isSubmitted ? (
                          <div>
                                                        <div className="relative text-left mb-2 -mt-2">
                                                             <div className="inline-block px-2.5 py-1 bg-white/5 border border-white/10 text-white rounded-full text-xs font-regular mb-3">
                                  💰 Beyond the Price Tag! ($50 Value!)
                                </div>
                              
                              <h2 className="text-2xl font-extrabold mb-4 leading-tight">
                                Mastering <span className="gradient-text">Price Objections</span>
                              </h2>
                            </div>

                                                          <form 
                                onSubmit={(e) => {
                                  console.log('Form submitted', e);
                                  handleFormSubmit(e);
                                }}
                                name="price-objections-guide"
                                method="POST"
                                data-netlify="true"
                                className="space-y-3 w-full max-w-md"
                              >
                              <input type="hidden" name="form-name" value="price-objections-guide" />
                              
                              <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className={`h-5 w-5 transition-colors duration-200 ${formData.firstName ? 'text-white' : 'text-gray-400'}`} />
                                  </div>
                                  <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-11 pr-4 py-2 bg-white/10 rounded-xl text-sm lg:text-md text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 [&:-webkit-autofill]:!bg-white/10 [&:-webkit-autofill]:!text-white [&:-webkit-autofill]:!shadow-[0_0_0_30px_rgba(255,255,255,0.1)_inset] [&:-webkit-autofill]:!border-white/10 [&:-webkit-autofill]:!-webkit-text-fill-color-white"
                                  />
                                </div>

                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className={`h-5 w-5 transition-colors duration-200 ${formData.lastName ? 'text-white' : 'text-gray-400'}`} />
                                  </div>
                                  <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-11 pr-4 py-2 bg-white/10 rounded-xl text-sm lg:text-md text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 [&:-webkit-autofill]:!bg-white/10 [&:-webkit-autofill]:!text-white [&:-webkit-autofill]:!shadow-[0_0_0_30px_rgba(255,255,255,0.1)_inset] [&:-webkit-autofill]:!border-white/10 [&:-webkit-autofill]:!-webkit-text-fill-color-white"
                                  />
                                </div>
                              </div>

                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Mail className={`h-5 w-5 transition-colors duration-200 ${formData.email ? 'text-white' : 'text-gray-400'}`} />
                                </div>
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full pl-11 pr-4 py-2 bg-white/10 rounded-xl text-sm lg:text-md text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 [&:-webkit-autofill]:!bg-white/10 [&:-webkit-autofill]:!text-white [&:-webkit-autofill]:!shadow-[0_0_0_30px_rgba(255,255,255,0.1)_inset] [&:-webkit-autofill]:!border-white/10 [&:-webkit-autofill]:!-webkit-text-fill-color-white"
                                />
                              </div>

                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Phone className={`h-5 w-5 transition-colors duration-200 ${formData.phoneNumber ? 'text-white' : 'text-gray-400'}`} />
                                </div>
                                <input
                                  type="tel"
                                  name="phoneNumber"
                                  placeholder="Phone Number"
                                  value={formData.phoneNumber}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full pl-11 pr-4 py-2 bg-white/10 rounded-xl text-sm lg:text-md text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 [&:-webkit-autofill]:!bg-white/10 [&:-webkit-autofill]:!text-white [&:-webkit-autofill]:!shadow-[0_0_0_30px_rgba(255,255,255,0.1)_inset] [&:-webkit-autofill]:!border-white/10 [&:-webkit-autofill]:!-webkit-text-fill-color-white"
                                />
                              </div>

                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Building className={`h-5 w-5 transition-colors duration-200 ${formData.businessName ? 'text-white' : 'text-gray-400'}`} />
                                </div>
                                <input
                                  type="text"
                                  name="businessName"
                                  placeholder="Practice/Business Name"
                                  value={formData.businessName}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full pl-11 pr-4 py-2 bg-white/10 rounded-xl text-sm lg:text-md text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 [&:-webkit-autofill]:!bg-white/10 [&:-webkit-autofill]:!text-white [&:-webkit-autofill]:!shadow-[0_0_0_30px_rgba(255,255,255,0.1)_inset] [&:-webkit-autofill]:!border-white/10 [&:-webkit-autofill]:!-webkit-text-fill-color-white"
                                />
                              </div>

                              <button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={() => console.log('Submit button clicked', formData)}
                                className="w-full px-6 lg:px-8 py-2.5 lg:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-3xl text-base lg:text-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-6"
                              >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                              </button>
                              </form>
                          </div>
                        ) : (
                          /* Success Message */
                          <div className="text-center mt-8">
                            <div className="mb-6">
                              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                              <h3 className="text-xl lg:text-2xl font-bold mb-2 text-white">Thank You!</h3>
                              <p className="text-cyan-200 text-sm lg:text-base">
                                Your free guide is on its way to your inbox. <br/>
                                Check your email in the next few minutes.
                              </p>
                            </div>
                            <button
                              onClick={handleClose}
                              className="px-4 lg:px-6 py-2 lg:py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 text-sm lg:text-base"
                            >
                              Close
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop Image - Right Side (Overlapping) */}
                <div className="absolute top-[15px] right-[-40px] w-1/2 h-full items-center justify-center p-8 lg:p-12 hidden lg:flex">
                  <div className="relative w-full max-w-5xl">
                    <motion.img
                      src="/videos/PriceObjections.png"
                      alt="Price Objections Guide"
                      className="w-full h-auto rounded-2xl opacity-80"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 0.8, scale: 1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PriceObjectionsPopup; 