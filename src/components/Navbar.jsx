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
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const isHome = location.pathname === "/";
  const navLinks = ["Home", "Bikes", "About", "Contact"];

  
  const menuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { 
      opacity: 1, 
      height: "100vh", 
      transition: { duration: 0.3, staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };


  const navBackground = isHome && !scrolled && !mobileMenuOpen
    ? "bg-transparent py-6"
    : "bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 py-4";

  const textColor = isHome && !scrolled && !mobileMenuOpen
    ? "text-white"
    : "text-gray-900";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        
        <Link to="/" className="flex items-center gap-3 z-50">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-md transition-colors ${
              isHome && !scrolled && !mobileMenuOpen
                ? "bg-white/20 text-white border border-white/30" 
                : "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
            }`}
          >
            BR
          </motion.div>
          <span className={`text-2xl font-bold tracking-tight ${textColor}`}>
            BikeRental<span className="text-cyan-500">.</span>
          </span>
        </Link>


        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = location.pathname === path;

            return (
              <Link key={item} to={path} className="relative group">
                <span className={`font-semibold text-base transition-colors duration-300 ${
                  isActive 
                    ? "text-cyan-500" 
                    : isHome && !scrolled ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-blue-600"
                }`}>
                  {item}
                </span>
              
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            );
          })}
        </div>

        
        <Link to="/bikes" className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2.5 rounded-full font-bold text-sm shadow-lg transition-all ${
              isHome && !scrolled
                ? "bg-white text-blue-900 hover:bg-gray-100"
                : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-cyan-500/30"
            }`}
          >
            Book Now
          </motion.button>
        </Link>

        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden z-50 p-2 rounded-full transition-colors ${
            isHome && !scrolled && !mobileMenuOpen ? "hover:bg-white/20 text-white" : "hover:bg-gray-100 text-gray-900"
          }`}
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <motion.span 
              animate={mobileMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current rounded-full origin-center"
            />
            <motion.span 
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-current rounded-full"
            />
            <motion.span 
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current rounded-full origin-center"
            />
          </div>
        </button>
      </div>

    
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 top-0 left-0 w-full bg-white z-40 flex flex-col justify-center items-center md:hidden"
          >
            <div className="space-y-6 text-center">
              {navLinks.map((item) => {
                 const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                 const isActive = location.pathname === path;
                 return (
                  <motion.div key={item} variants={linkVariants}>
                    <Link
                      to={path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-3xl font-bold transition-colors ${
                        isActive ? "text-cyan-500" : "text-gray-800 hover:text-blue-600"
                      }`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                 )
              })}
              
              <motion.div variants={linkVariants} className="pt-8">
                <Link
                  to="/bikes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all"
                >
                  Start Booking
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;