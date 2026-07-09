import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/", icon: "⌂" },
  { name: "Bikes", path: "/bikes", icon: "◈" },
  { name: "About", path: "/about", icon: "◉" },
  { name: "Contact", path: "/contact", icon: "◎" },
];

// Soft, buttery spring for the active-link indicator — glides smoothly
// between links on navigation, never snaps, never chases the cursor.
const indicatorTransition = { type: "spring", stiffness: 220, damping: 26, mass: 1 };

/* ── Mobile drawer ── */
function MobileDrawer({ open, onClose, currentPath, user }) {
  const dashboardPath = user ? (user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard') : '/login';
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 lg:hidden w-full sm:w-[320px] flex flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 34, mass: 0.9 }}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-800 text-lg hover:bg-gray-100 active:scale-90 transition-all"
              onClick={onClose}
              aria-label="Close menu"
            >
              ✕
            </button>

            <div className="pt-16 pb-8 px-8">
              <span className="text-xl font-black text-orange-600">BikeRental.</span>
              <p className="text-gray-400 text-xs mt-1">Ride beyond boundaries 🏍️</p>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 px-6 space-y-1.5">
              {navLinks.map((item, i) => {
                const isActive = currentPath === item.path;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm transition-colors duration-200 active:scale-[0.98]"
                      style={{
                        background: isActive ? "#FFF7ED" : "transparent",
                        color: isActive ? "#EA580C" : "#1F2937"
                      }}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Sign In CTA for Mobile */}
            <div className="p-6">
              <Link to={dashboardPath} onClick={onClose}>
                <button
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl shadow-lg transition-all active:scale-95 text-sm"
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
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu automatically if the viewport grows past the
  // breakpoint where the drawer is used
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
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

      <nav
        className="fixed top-0 left-0 right-0 z-[200] transition-[background-color,border-color,box-shadow] duration-300 ease-in-out"
        style={{ height: "72px" }}
      >
        <div className={`absolute inset-0 -z-10 ${navBg}`} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.06, rotate: -3 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center font-black text-sm text-white shadow-md flex-shrink-0"
            >
              BR
            </motion.div>
            <span className="text-lg sm:text-xl font-black transition-colors text-gray-900 truncate">
              BikeRental
            </span>
          </Link>

          {/* Desktop Nav Links — smooth sliding active indicator, no hover-chase */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 relative">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path} className="relative">
                  <motion.div
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.15 }}
                    className="relative px-4 py-2.5 rounded-xl text-sm font-extrabold transition-colors duration-200 hover:bg-gray-100/60"
                    style={{ color: isActive ? "#EA580C" : "#4B5563" }}
                  >
                    <span className="relative z-10">{item.name}</span>

                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-xl -z-0"
                        style={{ background: "#FFF7ED" }}
                        transition={indicatorTransition}
                      >
                        <motion.div
                          className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full"
                          style={{ background: "linear-gradient(90deg, #f97316, #dc2626)" }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Dynamic Login / Dashboard Button */}
          <div className="hidden lg:block flex-shrink-0">
            <Link to={dashboardPath}>
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="px-5 xl:px-6 py-2.5 rounded-full font-black text-sm transition-colors duration-300 whitespace-nowrap"
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
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1 bg-gray-50 rounded-xl flex-shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <motion.span
              className="block w-5 h-0.5 bg-gray-900 rounded-full"
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-gray-900 rounded-full"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-gray-900 rounded-full"
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>

        </div>
      </nav>
    </>
  );
}