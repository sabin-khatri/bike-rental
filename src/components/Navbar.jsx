import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"; 

const navLinks = [
  { name: "Home", path: "/", icon: "⌂" },
  { name: "Bikes", path: "/bikes", icon: "◈" },
  { name: "About", path: "/about", icon: "◉" },
  { name: "Contact", path: "/contact", icon: "◎" },
];

/* ── Mobile drawer ── */
function MobileDrawer({ open, onClose, currentPath, currentUser }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 lg:hidden w-full sm:w-[320px] flex flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-800 text-lg hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              ✕
            </button>

            <div className="pt-16 pb-8 px-8">
              <span className="text-xl font-black text-purple-600">BikeRental.</span>
              <p className="text-gray-400 text-xs mt-1">Ride beyond boundaries 🏍️</p>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 px-6 space-y-1.5">
              {navLinks.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm transition-all"
                    style={{
                      background: isActive ? "#F3E8FF" : "transparent",
                      color: isActive ? "#6C3AEB" : "#1F2937"
                    }}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Sign In CTA for Mobile */}
            <div className="p-6">
              <Link to="/dashboard" onClick={onClose}>
                <button
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl shadow-lg transition-transform active:scale-95 text-sm"
                >
                  {currentUser ? `${currentUser.name} (Dashboard)` : "Sign In"}
                </button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Check login state
  useEffect(() => {
    const checkUser = () => {
      const user = JSON.parse(localStorage.getItem("currentUser") || "null");
      setCurrentUser(user);
    };
    checkUser();
    const interval = setInterval(checkUser, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !mobileOpen;

  const navBg = transparent
    ? "bg-transparent"
    : "bg-white/97 backdrop-blur-xl border-b border-purple-100/60 shadow-sm";

  return (
    <>
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={location.pathname}
        currentUser={currentUser}
      />

      <nav className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${navBg}`} style={{ height: "72px" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-full flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center font-black text-sm text-white shadow-md shadow-purple-500/20"
            >
              BR
            </motion.div>
            <span className="text-xl font-black transition-colors" style={{ color: transparent ? "white" : "#111827" }}>
              BikeRental
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path}>
                  <motion.div 
                    whileHover={{ y: -1 }}
                    className="px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all hover:bg-gray-100/40"
                    style={{
                      color: isActive ? "#6C3AEB" : (transparent ? "rgba(255, 255, 255, 0.8)" : "#4B5563")
                    }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Dynamic Login / Dashboard Button */}
          <div className="hidden lg:block">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-2.5 rounded-full font-black text-sm transition-all"
                style={{
                  background: transparent ? "white" : "linear-gradient(135deg, #6C3AEB, #4B28B5)",
                  color: transparent ? "#6C3AEB" : "white",
                  boxShadow: "0 4px 16px rgba(108,58,235,0.2)"
                }}
              >
                {currentUser ? `${currentUser.name} (Dashboard)` : "Sign In"}
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1 bg-gray-50 rounded-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="block w-5 h-0.5 bg-gray-900" />
            <span className="block w-5 h-0.5 bg-gray-900" />
            <span className="block w-5 h-0.5 bg-gray-900" />
          </button>

        </div>
      </nav>
    </>
  );
}