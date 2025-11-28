// src/components/Navbar.jsx 
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import React from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  const navLinks = ["Home", "Bikes", "About", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHome && !scrolled
          ? "bg-transparent text-white"
          : "bg-white/95 backdrop-blur-md shadow-lg text-gray-900 border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
       
        <Link to="/" className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl transition-all ${
            isHome && !scrolled 
              ? "bg-white/20 text-white border border-white/30" 
              : "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
          }`}>
            BR
          </div>
          <span className="text-2xl font-bold">
            BikeRental<span className="text-cyan-500">.</span>
          </span>
        </Link>

    
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={item}
                to={path}
                className={`relative font-semibold text-lg transition-all ${
                  isActive ? "text-cyan-500" : ""
                } after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-1 after:bg-cyan-500 after:transition-all hover:after:w-full ${
                  isActive ? "after:w-full" : ""
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        
        <Link
          to="/bikes"
          className={`hidden md:block px-7 py-3 rounded-full font-bold text-lg transition-all hover:scale-105 ${
            isHome && !scrolled
              ? "bg-white text-blue-900"
              : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
          }`}
        >
          Book Now
        </Link>

       
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <span className={`w-full h-0.5 bg-current rounded-full transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`w-full h-0.5 bg-current rounded-full transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-full h-0.5 bg-current rounded-full transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </div>

      
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${mobileMenuOpen ? "max-h-96" : "max-h-0"}`}>
        <div className={`px-6 py-6 space-y-5 border-t ${isHome && !scrolled ? "bg-black/30 backdrop-blur-md border-white/20" : "bg-white border-gray-200"}`}>
          {navLinks.map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            return (
              <Link
                key={item}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xl font-semibold transition-all hover:translate-x-2 ${
                  location.pathname === path ? "text-cyan-500" : ""
                }`}
              >
                {item}
              </Link>
            );
          })}
          <Link
            to="/bikes"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/50"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;