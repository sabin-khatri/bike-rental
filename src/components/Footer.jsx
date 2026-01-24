/* eslint-disable react-hooks/purity */
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Our Bikes", path: "/bikes" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Terms & Conditions", path: "" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: "https://facebook.com",
      bgColor: "bg-[#1877F2]",
      hoverBg: "hover:bg-[#0C63D4]",
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: "https://instagram.com",
      bgColor: "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FD1D1D]",
      hoverBg: "hover:from-[#6A2C91] hover:via-[#C13584] hover:to-[#E4405F]",
    },
    {
      name: "YouTube",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      href: "https://youtube.com",
      bgColor: "bg-[#FF0000]",
      hoverBg: "hover:bg-[#CC0000]",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: "https://linkedin.com",
      bgColor: "bg-[#0A66C2]",
      hoverBg: "hover:bg-[#004182]",
    },
  ];

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone",
      content: "+977 9812345678",
      href: "tel:+9779812345678",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      content: "info@bikerental.com",
      href: "mailto:info@bikerental.com",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Location",
      content: "Biratnagar, Nepal",
      href: null,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const socialIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }),
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15 + 0.4,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const quickLinkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      x: 5,
      color: "#22d3ee",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.4)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      rotate: -5
    }
  };

  const inputFocusVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(6, 182, 212, 0.3)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-white/5 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.2, 1],
          x: [0, -15, 0],
          y: [0, 10, 0]
        }}
        transition={{
          duration: 5,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50
          }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
            ease: "linear"
          }}
          className={`absolute w-1 h-1 rounded-full ${
            i % 2 === 0 ? 'bg-cyan-400' : 'bg-blue-400'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description Section */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              variants={logoVariants}
              whileHover="hover"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/20"
              >
                <span className="font-black text-white text-xl">BR</span>
              </motion.div>
              <h3 className="text-2xl font-black text-white">
                BikeRental<span className="text-cyan-400">.</span>
              </h3>
            </motion.a>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-slate-400 leading-relaxed text-sm"
            >
              Nepal's most trusted bike rental service. From city streets to
              Himalayan trails, we provide the ride of your life.
            </motion.p>

            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={i}
                  variants={socialIconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-10 h-10 rounded-full ${social.bgColor} ${social.hoverBg} flex items-center justify-center text-white shadow-lg relative overflow-hidden`}
                  aria-label={social.name}
                >
                  {/* Hover shine effect */}
                  <motion.div
                    initial={{ x: "-100%", rotate: 45 }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg font-bold mb-6 text-white"
            >
              Explore
            </motion.h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  custom={i}
                  variants={quickLinkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <a
                    href={link.path}
                    className="text-slate-400 transition-colors flex items-center gap-2 group"
                  >
                    <motion.span
                      whileHover={{ scale: 1.5, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400"
                    />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg font-bold mb-6 text-white"
            >
              Contact
            </motion.h4>
            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={contactItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 text-cyan-400"
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                      >
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

          {/* Newsletter Section */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg font-bold mb-6 text-white"
            >
              Stay Updated
            </motion.h4>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-slate-400 text-sm mb-6"
            >
              Subscribe to get latest offers and seasonal discounts directly in
              your inbox.
            </motion.p>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative group"
            >
              <motion.input
                whileFocus="focus"
                variants={inputFocusVariants}
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-12 text-white placeholder-slate-500 focus:outline-none transition-all"
              />
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                type="button"
                className="absolute right-2 top-2 bottom-2 w-10 bg-cyan-500 hover:bg-cyan-400 rounded-lg flex items-center justify-center text-black transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-slate-500 text-sm"
          >
            © 2025 BikeRental Nepal. All rights reserved.
          </motion.p>
          <div className="flex gap-6 text-sm text-slate-500">
            <motion.a
              href="/"
              whileHover={{ 
                scale: 1.1,
                y: -2,
                color: "#22d3ee"
              }}
              transition={{ duration: 0.2 }}
              className="hover:text-cyan-400 transition-colors inline-block"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ 
                scale: 1.1,
                y: -2,
                color: "#22d3ee"
              }}
              transition={{ duration: 0.2 }}
              className="hover:text-cyan-400 transition-colors inline-block"
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Decorative floating line */}
      <motion.div
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
      />
    </motion.footer>
  );
};

export default Footer;