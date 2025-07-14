import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Background animated elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00d9ff]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff41fd]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo Container */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Glowing ring around logo */}
          <motion.div
            className="absolute inset-0 w-32 h-32 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #00d9ff, #ff41fd, #00d9ff)',
              padding: '3px',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full bg-black rounded-full" />
          </motion.div>

          {/* Logo with enhanced effects */}
          <motion.div
            className="relative w-32 h-32 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1), rgba(255, 65, 253, 0.1))',
              boxShadow: '0 0 50px rgba(0, 217, 255, 0.3), inset 0 0 30px rgba(255, 65, 253, 0.2)',
            }}
            animate={{
              boxShadow: [
                '0 0 50px rgba(0, 217, 255, 0.3), inset 0 0 30px rgba(255, 65, 253, 0.2)',
                '0 0 80px rgba(0, 217, 255, 0.5), inset 0 0 50px rgba(255, 65, 253, 0.4)',
                '0 0 50px rgba(0, 217, 255, 0.3), inset 0 0 30px rgba(255, 65, 253, 0.2)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.img 
              src="/ashlogo.png" 
              alt="Logo" 
              className="w-20 h-20 object-contain relative z-10"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(0, 217, 255, 0.6)) brightness(1.2)',
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(0, 217, 255, 0.6)) brightness(1.2)',
                  'drop-shadow(0 0 30px rgba(255, 65, 253, 0.8)) brightness(1.4)',
                  'drop-shadow(0 0 20px rgba(0, 217, 255, 0.6)) brightness(1.2)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Floating particles around logo */}
          {[...Array(8)].map((_, index) => {
            const angle = (index * 45) * (Math.PI / 180);
            const radius = 80;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={index}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: index % 2 === 0 ? '#00d9ff' : '#ff41fd',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </motion.div>

        {/* Enhanced loading animation with smaller white dots */}
        <motion.div
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Loading text with typewriter effect */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.p
            className="text-white/70 text-sm"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading...
          </motion.p>
        </motion.div>

        {/* Progress bar with better left-to-right animation */}
        <motion.div
          className="w-64 h-1 bg-white/10 rounded-full mt-6 overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-full"
            initial={{ width: '0%', x: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 3, 
              ease: "easeOut",
              delay: 0.5
            }}
          />
        </motion.div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default LoadingScreen;