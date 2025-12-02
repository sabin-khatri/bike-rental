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



  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      
   
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/20 group-hover:scale-105 transition-transform">
                <span className="font-black text-white text-xl">BR</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                BikeRental<span className="text-cyan-400">.</span>
              </h3>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Nepal's most trusted bike rental service. From city streets to Himalayan trails, we provide the ride of your life.
            </p>
            
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Explore</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 text-cyan-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <a href="tel:+9779800000000" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">+977 9812345678</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 text-cyan-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href="mailto:info@bikerental.com" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">info@bikerental.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 text-cyan-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-sm text-slate-400">Biratnagar, Nepal</p>
                </div>
              </div>
            </div>
          </div>

          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-6">
              Subscribe to get latest offers and seasonal discounts directly in your inbox.
            </p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 w-10 bg-cyan-500 hover:bg-cyan-400 rounded-lg flex items-center justify-center text-black transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </form>
          </div>

        </div>

       
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 BikeRental Nepal. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;