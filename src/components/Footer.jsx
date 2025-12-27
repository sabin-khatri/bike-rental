/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Our Bikes", path: "/bikes" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: "Phone",
      content: "+977 9812345678",
      href: "tel:+9779812345678"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: "Email",
      content: "info@bikerental.com",
      href: "mailto:info@bikerental.com"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      title: "Location",
      content: "Biratnagar, Nepal",
      href: null
    }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      
      {/* Animated background gradients */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div 
        className="max-w-7xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/20"
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-black text-white text-xl">BR</span>
              </motion.div>
              <h3 className="text-2xl font-black text-white">
                BikeRental<span className="text-cyan-400">.</span>
              </h3>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Nepal's most trusted bike rental service. From city streets to Himalayan trails, we provide the ride of your life.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-6 text-white">Explore</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <motion.span 
                      className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors"
                      whileHover={{ scale: 1.5 }}
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-6 text-white">Contact</h4>
            <div className="space-y-5">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="flex items-start gap-4 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 text-cyan-400"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "rgba(6, 182, 212, 0.2)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-400">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-6 text-white">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-6">
              Subscribe to get latest offers and seasonal discounts directly in your inbox.
            </p>
            <form className="relative group">
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: "rgba(6, 182, 212, 0.5)"
                }}
              />
              <motion.button
                type="submit"
                className="absolute right-2 top-2 bottom-2 w-10 bg-cyan-500 hover:bg-cyan-400 rounded-lg flex items-center justify-center text-black transition-colors"
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </motion.svg>
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-slate-500 text-sm">
            © 2025 BikeRental Nepal. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer; 