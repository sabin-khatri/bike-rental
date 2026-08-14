/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Bikes", path: "/bikes" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

/* ── Mobile drawer ── */
function MobileDrawer({ open, onClose, currentPath, user }) {
  const dashboardPath = user ? (user.role === "admin" ? "/admin/dashboard" : "/user/dashboard") : "/login";
  const drawerRef = useRef(null);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // Close on Escape + basic focus trap
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Move focus into the drawer on open
    const firstFocusable = drawerRef.current?.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[240] bg-slate-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed top-0 right-0 bottom-0 z-[250] w-72 flex flex-col bg-white text-gray-800 shadow-2xl border-l border-gray-200"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-gray-950">
                  Bike<span className="text-orange-600">Rental</span>
                </span>
              </div>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                onClick={onClose}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navLinks.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className="flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    style={{
                      background: isActive ? "#FFF7ED" : "transparent",
                      color: isActive ? "#EA580C" : "#4B5563",
                    }}
                  >
                    <span>{item.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-100">
              <Link to={dashboardPath} onClick={onClose} className="block">
                <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm transition-all shadow-sm shadow-orange-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2">
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
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer automatically on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const dashboardPath = user ? (user.role === "admin" ? "/admin/dashboard" : "/user/dashboard") : "/login";

  return (
    <>
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={location.pathname}
        user={user}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-white/80 backdrop-blur-sm border-b border-gray-100"
        }`}
        style={{ height: "64px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo with Bike Icon */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <span className="text-base font-bold text-gray-900 tracking-tight group-hover:text-orange-600 transition-colors">
              Bike<span className="text-orange-600">Rental</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                    isActive ? "text-orange-600 bg-orange-50/50" : "text-gray-600 hover:text-orange-600 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-border"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-orange-500 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action button */}
          <div className="hidden md:block">
            <Link to={dashboardPath}>
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg shadow-sm shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2">
                {user ? "Rider Panel" : "Rider Sign In"}
              </button>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 relative"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              className="block w-4 h-0.5 bg-gray-700 rounded-full absolute"
              animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-4 h-0.5 bg-gray-700 rounded-full absolute"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-4 h-0.5 bg-gray-700 rounded-full absolute"
              animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </nav>
    </>
  );
}