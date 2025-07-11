import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, BookOpen, Users, FileText, MessageSquare } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Coaching', href: '/coaching' },
    { 
      label: 'Resources', 
      href: '#',
      dropdown: [
        { label: 'About', href: '/about', icon: BookOpen },
        { label: 'Faculty & Ambassadors', href: '/faculty', icon: Users },
        { label: 'Case Studies', href: '/case-studies', icon: FileText },
        { label: 'Blog', href: '/blog', icon: MessageSquare },
      ]
    },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black backdrop-blur-md' 
            : 'bg-black/40 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                style={{
                  clipPath: 'circle(50%)',
                }}
              >
                <img 
                  src="/AMG (40).png" 
                  alt="Aesthetic Sales Hero Logo" 
                  className="w-10 h-10 md:w-10 md:h-10 object-contain rounded-full"
                />
              </motion.div>
              <motion.div
                className="text-base md:text-lg font-bold tracking-tight"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white">Aesthetic</span>
                <span className="text-white"> Sales Hero</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <div key={item.label} className="relative">
                    {item.dropdown ? (
                      <div
                        className="relative"
                        onMouseEnter={() => setIsResourcesOpen(true)}
                        onMouseLeave={() => setIsResourcesOpen(false)}
                      >
                        <button className="flex items-center gap-1 text-white hover:text-gray-400 font-light text-sm tracking-tight transition-colors">
                          {item.label}
                          <ChevronDown size={16} />
                        </button>
                        <AnimatePresence>
                          {isResourcesOpen && (
                            <motion.div
                              className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-md border border-gray-800/50 rounded-xl shadow-xl"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.label}
                                  to={dropdownItem.href}
                                  className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-gray-400 hover:bg-white/5 transition-colors first:rounded-t-xl last:rounded-b-xl font-light text-sm"
                                >
                                  <dropdownItem.icon size={16} />
                                  {dropdownItem.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`text-white hover:text-gray-400 font-light text-sm tracking-tight transition-colors ${
                          location.pathname === item.href ? 'text-[#00d9ff]' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                className="px-4 py-2 text-white/80 hover:text-gray-400 font-light text-sm tracking-tight transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://platform.aestheticsaleshero.com/login', '_blank')}
              >
                Log In
              </motion.button>
              <Link to="/getstarted">
                <motion.button
                  className="group px-6 py-2.5 bg-white text-black hover:bg-gray-100 rounded-xl font-light text-sm tracking-tight shadow-lg transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-3 mr-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 h-full w-full max-w-sm bg-black/95 backdrop-blur-md border-l border-gray-800/50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="p-6 pt-20 h-full overflow-y-auto">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.dropdown ? (
                        <div>
                          <div className="text-lg font-semibold text-white/80 mb-0 py-1">
                            {item.label}
                          </div>
                          <div className="pl-4 space-y-0">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                to={dropdownItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 py-1.5 text-sm md:text-base text-white/70 hover:text-gray-400 transition-colors"
                              >
                                <dropdownItem.icon size={16} />
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-1.5 text-lg font-semibold text-white/80 hover:text-gray-400 transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="pt-2 space-y-4 mt-auto">
                    <motion.button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.open('https://platform.aestheticsaleshero.com/login', '_blank');
                      }}
                      className="w-full px-6 py-4 border-2 border-white/20 rounded-xl font-semibold text-base hover:border-gray-400 transition-all duration-300 mb-4"
                      whileTap={{ scale: 0.95 }}
                    >
                      Log In
                    </motion.button>
                    <Link to="/getstarted" onClick={() => setIsMobileMenuOpen(false)}>
                      <motion.button
                        className="w-full px-6 py-4 bg-white text-black hover:bg-gray-100 rounded-xl font-semibold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        whileTap={{ scale: 0.95 }}
                      >
                        Get Started
                        <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;