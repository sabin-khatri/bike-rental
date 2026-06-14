import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/", icon: "⌂" },
  { name: "Bikes", path: "/bikes", icon: "◈" },
  { name: "About", path: "/about", icon: "◉" },
  { name: "Contact", path: "/contact", icon: "◎" },
];

/* ── Mobile drawer ── */
function MobileDrawer({ open, onClose, currentPath, user }) {
  const dashboardPath = user ? (user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard') : '/login';

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
              <span className="text-xl font-black text-orange-600">BikeRental.</span>
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
                      background: isActive ? "#FFF7ED" : "transparent",
                      color: isActive ? "#EA580C" : "#1F2937"
                    }}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Sign In CTA for Mobile */}
            <div className="p-6">
              <Link to={dashboardPath} onClick={onClose}>
                <button
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl shadow-lg transition-transform active:scale-95 text-sm"
                >
                  {user ? `${user.name} (Dashboard)` : "Sign In"}
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
  const { user } = useAuth(); // Connects straight to our AuthContext
  
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !mobileOpen;

  const navBg = transparent
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm";

  const dashboardPath = user ? (user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard') : '/login';

  return (
    <>
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={location.pathname}
        user={user}
      />

      <nav className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${navBg}`} style={{ height: "72px" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-full flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center font-black text-sm text-white shadow-md"
            >
              BR
            </motion.div>
            <span className="text-xl font-black transition-colors text-gray-900">
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
                      // Fixed transparent text visibility issue: Always dark text or orange if active
                      color: isActive ? "#EA580C" : "#4B5563"
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
            <Link to={dashboardPath}>
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-2.5 rounded-full font-black text-sm transition-all"
                style={{
                  background: transparent ? "white" : "linear-gradient(135deg, #f97316, #dc2626)",
                  color: transparent ? "#ea580c" : "white",
                  boxShadow: "0 4px 16px rgba(234,88,12,0.2)"
                }}
              >
                {user ? `${user.name} (Dashboard)` : "Sign In"}
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