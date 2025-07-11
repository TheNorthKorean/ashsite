import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Check } from 'lucide-react';

interface SuccessPageProps {
  track: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ track }) => (
  <div className="pt-20 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center">
    <motion.div
      className="max-w-2xl mx-auto px-6 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-400" size={40} />
        </div>
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
          Application Submitted!
        </h1>
        <p className="text-xl text-white/80 mb-6">
          Thank you for your interest in joining our {track} program.
        </p>
        <p className="text-white/70 mb-8 leading-relaxed">
          We've received your application and will review it within 5-7 business days. 
          You'll receive a confirmation email shortly with next steps and timeline information.
        </p>
        <div className="bg-gradient-to-r from-[#00d9ff]/10 to-[#ff41fd]/10 backdrop-blur-sm border border-[#00d9ff]/30 rounded-xl p-6">
          <p className="text-white/90 font-semibold mb-4">What happens next?</p>
          <ul className="text-white/70 text-left space-y-2">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-400" />
              Application review (5-7 business days)
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-400" />
              Initial screening call (if selected)
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-400" />
              Final interview and onboarding
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  </div>
);

export default SuccessPage; 