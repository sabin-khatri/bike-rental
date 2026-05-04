import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/", icon: "⌂" },
  { name: "Bikes", path: "/bikes", icon: "◈" },
  { name: "About", path: "/about", icon: "◉" },
  { name: "Contact", path: "/contact", icon: "◎" },
];

/* ── Page-transition overlay ── */
function RideTransition({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* sweeping line */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #6C3AEB 40%, #00D4FF 60%, transparent)",
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* bike emoji */}
          <motion.span
            className="absolute top-1/2 -translate-y-1/2 text-5xl select-none"
            style={{ filter: "drop-shadow(0 0 12px rgba(108,58,235,0.8))" }}
            initial={{ x: "-8vw", opacity: 0 }}
            animate={{ x: "108vw", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.1,
              ease: [0.43, 0.13, 0.23, 0.96],
              opacity: { times: [0, 0.08, 0.85, 1] },
            }}
          >
            🏍️
          </motion.span>

          {/* speed streaks */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px rounded-full"
              style={{
                top: `calc(50% + ${(i - 2.5) * 20}px)`,
                left: 0,
                width: `${80 + i * 30}px`,
                background: i % 2 ? "#6C3AEB88" : "#00D4FF88",
              }}
              initial={{ scaleX: 0, originX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Mobile drawer ── */
function MobileDrawer({ open, onClose, currentPath, onNavClick }) {
  const itemVariants = {
    closed: { opacity: 0, x: 32, scale: 0.95 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 320, damping: 26, delay: i * 0.07 },
    }),
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(13,13,26,0.55)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 lg:hidden w-full sm:w-[340px] flex flex-col"
            style={{
              background:
                "linear-gradient(160deg, #ffffff 0%, #f6f3ff 50%, #f0faff 100%)",
              boxShadow: "-8px 0 40px rgba(108,58,235,0.15)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            {/* close button */}
            <motion.button
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(108,58,235,0.08)" }}
              whileHover={{ scale: 1.1, background: "rgba(108,58,235,0.15)" }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="#6C3AEB" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.button>

            {/* brand */}
            <div className="pt-16 pb-8 px-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                  style={{
                    background: "linear-gradient(135deg, #6C3AEB, #00D4FF)",
                    fontFamily: "'Clash Display', sans-serif",
                    letterSpacing: "0.5px",
                  }}
                >
                  BR
                </div>
                <span
                  className="text-xl font-bold"
                  style={{ color: "#0D0D1A", fontFamily: "'Clash Display', sans-serif" }}
                >
                  BikeRental<span style={{ color: "#00D4FF" }}>.</span>
                </span>
              </div>
              <p className="mt-3 text-sm" style={{ color: "#6B6B80" }}>
                Ride beyond boundaries 🏍️
              </p>
            </div>

            {/* links */}
            <nav className="flex-1 px-6 space-y-1">
              {navLinks.map((item, i) => {
                const isActive = currentPath === item.path;
                return (
                  <motion.div key={item.name} custom={i} variants={itemVariants} initial="closed" animate="open" exit="closed">
                    <Link
                      to={item.path}
                      onClick={() => { onNavClick(item.path); onClose(); }}
                      className="relative flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-200 group overflow-hidden"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, #6C3AEB, #4B28B5)"
                          : "transparent",
                        color: isActive ? "white" : "#0D0D1A",
                      }}
                    >
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{ background: "rgba(108,58,235,0.06)" }}
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                      )}
                      <span
                        className="relative font-semibold text-base"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item.name}
                      </span>
                      {isActive && (
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="text-sm"
                        >
                          →
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA */}
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link to="/bikes" onClick={() => { onNavClick("/bikes"); onClose(); }}>
                <motion.button
                  className="relative w-full py-4 rounded-2xl font-bold text-base text-white overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #6C3AEB 0%, #4B28B5 50%, #00D4FF 100%)",
                    backgroundSize: "200% auto",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 8px 24px rgba(108,58,235,0.35)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(108,58,235,0.45)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* shimmer */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Start Booking
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
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
  const [rideTransition, setRideTransition] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (path) => {
    if (path !== location.pathname) {
      setRideTransition(true);
      setTimeout(() => setRideTransition(false), 1300);
    }
  };

  /* nav appearance states */
  const transparent = isHome && !scrolled && !mobileOpen;

  const navBg = transparent
    ? "bg-transparent"
    : "bg-white/97 backdrop-blur-xl border-b border-purple-100/60";

  const navShadow = transparent ? "" : "shadow-[0_4px_24px_rgba(108,58,235,0.08)]";

  return (
    <>
      <RideTransition active={rideTransition} />
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={location.pathname}
        onNavClick={handleNavClick}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${navBg} ${navShadow}`}
        style={{ height: "72px" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-full flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => handleNavClick("/")}
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: [-3, 3, -3, 0] }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm overflow-hidden"
              style={{
                background: transparent
                  ? "rgba(255,255,255,0.12)"
                  : "linear-gradient(135deg, #6C3AEB, #00D4FF)",
                border: transparent
                  ? "1.5px solid rgba(255,255,255,0.25)"
                  : "none",
                fontFamily: "'Clash Display', sans-serif",
                letterSpacing: "0.5px",
                boxShadow: transparent ? "none" : "0 4px 16px rgba(108,58,235,0.3)",
              }}
            >
              BR
              {/* glow ring on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)" }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>

            <motion.span
              whileHover={{ x: 2 }}
              className="text-xl font-bold tracking-tight transition-colors duration-300"
              style={{
                color: transparent ? "white" : "#0D0D1A",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              BikeRental
              <motion.span
                animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
                className="inline-block"
                style={{ color: "#00D4FF" }}
              >
                .
              </motion.span>
            </motion.span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path} onClick={() => handleNavClick(item.path)}>
                  <motion.div
                    className="relative px-4 py-2.5 rounded-xl cursor-pointer group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 420, damping: 20 }}
                  >
                    {/* hover bg */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: transparent
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(108,58,235,0.06)",
                      }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />

                    <span
                      className="relative text-sm font-semibold transition-all duration-200"
                      style={{
                        color: isActive
                          ? transparent
                            ? "white"
                            : "#6C3AEB"
                          : transparent
                          ? "rgba(255,255,255,0.75)"
                          : "#6B6B80",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {item.name}
                    </span>

                    {/* active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                        style={{
                          width: "20px",
                          background: "linear-gradient(90deg, #6C3AEB, #00D4FF)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block">
            <Link to="/bikes" onClick={() => handleNavClick("/bikes")}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 32px rgba(108,58,235,0.4)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="relative px-7 py-2.5 rounded-full font-semibold text-sm overflow-hidden"
                style={{
                  background: transparent
                    ? "white"
                    : "linear-gradient(135deg, #6C3AEB, #4B28B5)",
                  color: transparent ? "#6C3AEB" : "white",
                  boxShadow: transparent
                    ? "0 4px 16px rgba(0,0,0,0.15)"
                    : "0 4px 20px rgba(108,58,235,0.3)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {/* shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative flex items-center gap-2">
                  Book Now
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <motion.button
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl"
            style={{
              background: transparent ? "rgba(255,255,255,0.1)" : "rgba(108,58,235,0.06)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-[2px] rounded-full"
                style={{
                  background: transparent ? "white" : "#0D0D1A",
                  width: i === 1 ? "14px" : "20px",
                  transformOrigin: "center",
                }}
                animate={
                  mobileOpen
                    ? i === 0
                      ? { rotate: 45, y: 7, width: "20px" }
                      : i === 1
                      ? { opacity: 0, x: -8 }
                      : { rotate: -45, y: -7, width: "20px" }
                    : { rotate: 0, y: 0, opacity: 1, x: 0 }
                }
                transition={{ duration: 0.28 }}
              />
            ))}
          </motion.button>
        </div>

        {/* ── Progress bar (scroll indicator) ── */}
        <ScrollProgress />
      </motion.nav>
    </>
  );
}

/* ── Scroll progress thin bar at bottom of nav ── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, #6C3AEB, #00D4FF)",
        }}
      />
    </div>
  );
}