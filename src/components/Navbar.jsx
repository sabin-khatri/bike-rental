/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const isHome = location.pathname === "/";
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Bikes", path: "/bikes" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const menuVariants = {
    closed: { 
      opacity: 0, 
      x: "100%",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } 
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.08, 
        delayChildren: 0.15 
      } 
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 50, scale: 0.9 },
    open: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const navBackground = isHome && !scrolled && !mobileMenuOpen
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-md shadow-sm";

  const textColor = isHome && !scrolled && !mobileMenuOpen
    ? "text-white"
    : "text-gray-900";

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 lg:gap-3 z-50 group">
              <motion.div 
                whileHover={{ 
                  scale: 1.08, 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.92 }}
                className={`relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center font-black text-lg lg:text-xl shadow-lg transition-all duration-300 ${
                  isHome && !scrolled && !mobileMenuOpen
                    ? "bg-white/10 backdrop-blur-sm text-white border-2 border-white/30" 
                    : "bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white"
                }`}
              >
                <span className="drop-shadow-lg relative z-10">BR</span>
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 opacity-0 blur-md"
                  whileHover={{ opacity: 0.6, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.span 
                whileHover={{ x: 3 }}
                className={`text-xl lg:text-2xl font-bold tracking-tight ${textColor} transition-colors duration-300`}
              >
                BikeRental<motion.span 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="inline-block text-cyan-500"
                >
                  .
                </motion.span>
              </motion.span>
            </Link>

           
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.name} to={item.path}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="relative px-4 py-2 group"
                    >
                      <span className={`relative font-medium text-sm transition-colors duration-200 ${
                        isActive 
                          ? "text-cyan-500" 
                          : isHome && !scrolled 
                            ? "text-white/90 group-hover:text-white" 
                            : "text-gray-700 group-hover:text-blue-600"
                      }`}>
                        {item.name}
                       
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%", opacity: 0 }}
                          whileHover={{ x: "100%", opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </span>
                      
                      
                      <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                        <motion.span 
                          className={`block h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 ${
                            isActive ? "w-8" : "w-0 group-hover:w-8"
                          }`}
                        />
                        {isActive && (
                          <motion.span 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-sm"
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

           
            <Link to="/bikes" className="hidden lg:block">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300 ${
                  isHome && !scrolled
                    ? "bg-white text-blue-600 shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Now
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
               
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: isHome && !scrolled ? 0 : 0.8 }}
                  transition={{ duration: 0.6 }}
                />
               
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 blur-xl"
                  whileHover={{ opacity: 0.5 }}
                  style={{
                    background: "radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)"
                  }}
                />
              </motion.button>
            </Link>

           
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden z-50 p-2 rounded-lg transition-colors duration-200 ${
                isHome && !scrolled && !mobileMenuOpen 
                  ? "hover:bg-white/10 text-white" 
                  : "hover:bg-gray-100 text-gray-900"
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span 
                  animate={mobileMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
                <motion.span 
                  animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
                <motion.span 
                  animate={mobileMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

  
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
           
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
           
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white shadow-2xl z-40 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
            
                <div className="flex flex-col gap-2">
                  {navLinks.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div key={item.name} variants={linkVariants}>
                        <Link
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${
                            isActive 
                              ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-cyan-600 shadow-sm" 
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Button - Mobile */}
                <motion.div 
                  variants={linkVariants}
                  className="mt-auto"
                >
                  <Link
                    to="/bikes"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Start Booking
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;