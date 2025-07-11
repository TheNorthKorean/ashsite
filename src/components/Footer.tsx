import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <div className="relative pt-12 px-4 md:px-8 pb-16 bg-gray-900">
      <footer className="relative bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-8">
          {/* Header with Logo and Status */}
          <div className="flex items-center justify-between mb-8">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/AMG (40).png" 
                  alt="Aesthetic Sales Hero Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-sm md:text-2xl font-bold tracking-tight">
                <span className="text-white">Aesthetic Sales Hero</span>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-2 text-xs md:text-xs text-white/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="uppercase tracking-wider">Current Status</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </motion.div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-8">
            {[
              {
                title: 'Quick Links',
                links: [
                  { label: 'About', href: '/about' },
                  { label: 'Features', href: '/features' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Testimonials', href: '#testimonials' },
                ],
              },
              {
                title: 'Resources',
                links: [
                  { label: 'Blog', href: '/blog' },
                  { label: 'Case Studies', href: '/case-studies' },
                  { label: 'Faculty & Ambassadors', href: '/faculty' },
                  { label: 'Help Center', href: '#' },
                ],
              },
              {
                title: 'Support',
                links: [
                  { label: 'Contact support', href: '/contact' },
                  { label: 'Community forum', href: '#' },
                  { label: 'Live chat', href: '#' },
                  { label: 'Release notes', href: '#' },
                  { label: 'FAQs', href: '#faq' },
                ],
              },
              {
                title: 'Legal',
                links: [
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Cookie Policy', href: '#' },
                  { label: 'GDPR', href: '#' },
                ],
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <h3 className="text-medium md:text-lg font-semibold mb-1 md:mb-3 text-white">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs md:text-sm text-white/60 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-4 md:mb-6"></div>

          {/* Bottom Bar */}
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-center gap-2 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 text-xs md:text-sm">
              © 2025 Aesthetic Sales Hero. All rights reserved.
            </p>
            
            <p className="text-white/60 text-xs md:text-sm">
              Built for aesthetic & wellness professionals worldwide.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;