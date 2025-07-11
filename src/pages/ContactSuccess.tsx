import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const ContactSuccess: React.FC = () => (
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

export default ContactSuccess; 