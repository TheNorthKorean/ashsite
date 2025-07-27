import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import PriceObjectionsPopup from './PriceObjectionsPopup';

const FloatingPriceGuide: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // Listen for auto-show popup event
  useEffect(() => {
    const handleAutoShow = () => {
      if (!hasShownPopup) {
        setIsPopupOpen(true);
      }
    };

    window.addEventListener('openPriceObjectionsPopup', handleAutoShow);
    
    return () => {
      window.removeEventListener('openPriceObjectionsPopup', handleAutoShow);
    };
  }, [hasShownPopup]);

  return (
    <>
      {/* Floating Price Objections Guide Button */}
      <motion.button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Gift className="w-6 h-6" />
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Free Price Objections Guide!
        </div>
      </motion.button>

      {/* Price Objections Popup */}
      <PriceObjectionsPopup 
        isOpen={isPopupOpen} 
        onClose={() => {
          setIsPopupOpen(false);
          setHasShownPopup(true);
        }}
        autoShow={!hasShownPopup}
        delay={3000}
      />
    </>
  );
};

export default FloatingPriceGuide; 