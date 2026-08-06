import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

const navLinks = [
  { name: "Home", path: "/", icon: "⌂" },
  { name: "Bikes", path: "/bikes", icon: "◈" },
  { name: "About", path: "/about", icon: "◉" },
  { name: "Contact", path: "/contact", icon: "◎" },
];

const indicatorTransition = { type: "spring", stiffness: 250, damping: 28, mass: 0.8 };

/* ── Mobile drawer ── */
function MobileDrawer({ open, onClose, currentPath, user, theme, toggleTheme, language, changeLanguage, t }) {
  const dashboardPath = user ? (user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard') : '/login';
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[240] bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[250] w-full sm:w-[340px] flex flex-col bg-white dark:bg-[#0A0A0F] text-gray-900 dark:text-gray-100 shadow-2xl border-l border-gray-100 dark:border-white/5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5">
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">BR.</span>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">Ride Nepal 🏍️</p>
              </div>
              <button
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 active:scale-90 transition-all"
                onClick={onClose}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 px-6 py-6 space-y-2 overflow-y-auto">
              {navLinks.map((item, i) => {
                const isActive = currentPath === item.path;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-[0.98]"
                      style={{
                        background: isActive ? "rgba(255, 90, 0, 0.08)" : "transparent",
                        color: isActive ? "#FF5A00" : "inherit"
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <span className="opacity-50 text-base">{item.icon}</span>
                        {item.name}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Controls & CTA in Mobile */}
            <div className="p-6 space-y-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
              {/* Language & Theme Selectors */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={toggleTheme}
                  className="flex-1 py-3 px-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 font-bold text-xs"
                >
                  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
                <button
                  onClick={() => changeLanguage(language === "en" ? "ne" : "en")}
                  className="flex-1 py-3 px-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 font-bold text-xs"
                >
                  🌐 {language === "en" ? "नेपाली" : "English"}
                </button>
              </div>

              <Link to={dashboardPath} onClick={onClose} className="block">
                <button
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 text-sm"
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
  const { user } = useAuth();
  const { theme, toggleTheme, language, changeLanguage, t } = useApp();

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const transparent = isHome && !scrolled && !mobileOpen;

  const navBg = transparent
    ? "bg-transparent border-transparent"
    : "glass-navbar shadow-lg shadow-black/5 dark:shadow-black/20";

  const dashboardPath = user ? (user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard') : '/login';

  return (
    <>
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={location.pathname}
        user={user}
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        changeLanguage={changeLanguage}
        t={t}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ease-in-out ${navBg}`}
        style={{ height: "72px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-red-600 flex items-center justify-center font-black text-sm text-white shadow-lg shadow-orange-500/20 flex-shrink-0"
            >
              BR
            </motion.div>
            <span className={`text-lg sm:text-xl font-black tracking-tight truncate ${transparent ? "text-white" : "text-gray-900 dark:text-white"}`}>
              BikeRental
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1.5 relative">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path} className="relative">
                  <motion.div
                    whileHover={{ y: -1 }}
                    className="relative px-4 py-2 rounded-xl text-sm font-extrabold transition-all duration-200"
                    style={{ color: isActive ? "#FF5A00" : (transparent ? "rgba(255,255,255,0.85)" : "inherit") }}
                  >
                    <span className="relative z-10">{item.name}</span>

                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-xl -z-0"
                        style={{ background: transparent ? "rgba(255,255,255,0.15)" : "rgba(255, 90, 0, 0.08)" }}
                        transition={indicatorTransition}
                      >
                        <motion.div
                          className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-orange-500"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Action buttons (Theme + Language + Booking CTA) */}
          <div className="hidden lg:flex items-center gap-3.5">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${transparent ? "bg-white/10 hover:bg-white/20 text-white border border-white/10" : "bg-gray-150 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 border border-transparent"}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeLanguage(language === "en" ? "ne" : "en")}
              className={`px-3 py-1.5 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all border ${transparent ? "bg-white/10 hover:bg-white/20 text-white border-white/10" : "bg-gray-150 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 border-transparent"}`}
            >
              {language === "en" ? "नेपाली" : "EN"}
            </motion.button>

            {/* CTA Auth Button */}
            <Link to={dashboardPath}>
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className={`px-5 py-2.5 rounded-full font-black text-sm transition-all shadow-md`}
                style={{
                  background: transparent ? "white" : "linear-gradient(135deg, #FF5E00, #FF8900)",
                  color: transparent ? "#FF5E00" : "white",
                  boxShadow: transparent ? "0 4px 12px rgba(255,255,255,0.15)" : "0 4px 16px rgba(255,90,0,0.25)"
                }}
              >
                {user ? `${user.name} (Dashboard)` : "Sign In"}
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme Toggle (Mobile Quick Access) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${transparent ? "bg-white/10 text-white" : "bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200"}`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`w-9 h-9 flex flex-col items-center justify-center gap-1 rounded-xl transition-all ${transparent ? "bg-white/10" : "bg-gray-50 dark:bg-white/5"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className={`block w-4 h-0.5 rounded-full ${transparent ? "bg-white" : "bg-gray-900 dark:bg-white"}`}
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={`block w-4 h-0.5 rounded-full ${transparent ? "bg-white" : "bg-gray-900 dark:bg-white"}`}
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className={`block w-4 h-0.5 rounded-full ${transparent ? "bg-white" : "bg-gray-900 dark:bg-white"}`}
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>

        </div>
      </nav>
    </>
  );
}