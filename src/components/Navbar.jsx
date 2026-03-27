/* eslint-disable react-hooks/purity */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bikeTransition, setBikeTransition] = useState(false);
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

  const handleNavClick = (path) => {
    if (path !== location.pathname) {
      setBikeTransition(true);
      setTimeout(() => setBikeTransition(false), 1200);
    }
  };

  const isHome = location.pathname === "/";
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Bikes", path: "/bikes" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: 50, scale: 0.9 },
    open: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const navBackground =
    isHome && !scrolled && !mobileMenuOpen
      ? "bg-transparent"
      : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100";

  const textColor =
    isHome && !scrolled && !mobileMenuOpen ? "text-white" : "text-gray-900";

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link
              to="/"
              className="flex items-center gap-2 lg:gap-3 z-50 group"
              onClick={() => handleNavClick("/")}
            >
              <motion.div
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.6 },
                }}
                whileTap={{ scale: 0.9 }}
                className={`relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center font-black text-lg lg:text-xl shadow-lg transition-all duration-300 overflow-hidden ${
                  isHome && !scrolled && !mobileMenuOpen
                    ? "bg-white/10 backdrop-blur-sm text-white border-2 border-white/30"
                    : "bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white"
                }`}
              >
                <span className="drop-shadow-lg relative z-10">BR</span>

                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-400 to-blue-500 opacity-0 blur-md"
                  whileHover={{ opacity: 0.8, scale: 1.4 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-cyan-400/60"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </motion.div>

              <motion.span
                whileHover={{ x: 3 }}
                className={`text-xl lg:text-2xl font-bold tracking-tight ${textColor} transition-colors duration-300`}
              >
                BikeRental
                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
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
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => handleNavClick(item.path)}
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className="relative px-5 py-2.5 group"
                    >
                      <span
                        className={`relative font-semibold text-sm transition-colors duration-200 ${
                          isActive
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500"
                            : isHome && !scrolled
                            ? "text-white/90 group-hover:text-white"
                            : "text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-cyan-500"
                        }`}
                      >
                        {item.name}

                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          initial={{ x: "-100%", opacity: 0 }}
                          whileHover={{ x: "100%", opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </span>

                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                        <motion.span
                          className={`block h-0.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 rounded-full transition-all duration-300 ${
                            isActive ? "w-12" : "w-0 group-hover:w-12"
                          }`}
                        />
                        {isActive && (
                          <>
                            <motion.span
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 rounded-full blur-md"
                            />
                            <motion.span
                              animate={{
                                scaleX: [0, 1, 0],
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
                            />
                          </>
                        )}
                      </div>

                      <motion.div
                        className={`absolute inset-0 rounded-lg ${
                          isHome && !scrolled
                            ? "bg-white/10"
                            : "bg-gradient-to-r from-purple-50 to-cyan-50"
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ zIndex: -1 }}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            <Link
              to="/bikes"
              className="hidden lg:block"
              onClick={() => handleNavClick("/bikes")}
            >
              <motion.button
                whileHover={{
                  scale: 1.1,
                  y: -4,
                  boxShadow: "0 20px 50px rgba(139, 92, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`relative px-8 py-3 rounded-full font-bold text-sm overflow-hidden transition-all duration-300 ${
                  isHome && !scrolled
                    ? "bg-white text-purple-600 shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white shadow-md"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-blue-600 opacity-0"
                  initial={{ x: "-100%" }}
                  whileHover={{
                    x: "100%",
                    opacity: isHome && !scrolled ? 0 : 0.8,
                  }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 blur-xl"
                  whileHover={{ opacity: 0.7 }}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)",
                  }}
                />

                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{ x: "50%", y: "50%", opacity: 0 }}
                    whileHover={{
                      x: `${50 + (i - 2) * 35}%`,
                      y: `${50 + (i % 2 ? -25 : 25)}%`,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </motion.button>
            </Link>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden z-50 p-2 rounded-lg transition-all duration-300 ${
                isHome && !scrolled && !mobileMenuOpen
                  ? "hover:bg-white/10 text-white"
                  : "hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 text-gray-900"
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={
                    mobileMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { opacity: 0, x: -10 }
                      : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: -45, y: -10 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {bikeTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent origin-left"
              style={{ transform: "translateY(-50%)" }}
            />

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-left"
              style={{ transform: "translateY(-50%) translateY(5px)" }}
            />

            <motion.div
              initial={{ x: "-10%", opacity: 0 }}
              animate={{
                x: "110%",
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96],
                opacity: {
                  times: [0, 0.1, 0.8, 1],
                  duration: 1.2,
                },
              }}
              className="absolute top-1/2 -translate-y-1/2 text-5xl drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.8))",
              }}
            >
              🏍️
            </motion.div>

            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "0%", opacity: 0, scaleX: 0 }}
                animate={{
                  x: "100%",
                  opacity: [0, 0.7, 0],
                  scaleX: [0, 1, 0.5, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.06,
                  ease: "easeOut",
                }}
                className={`absolute h-0.5 rounded-full ${
                  i % 2 === 0 ? "bg-purple-400/60" : "bg-cyan-400/60"
                }`}
                style={{
                  top: `calc(50% + ${(i - 3) * 18}px)`,
                  left: 0,
                  width: `${120 + i * 25}px`,
                }}
              />
            ))}

            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                initial={{
                  x: "20%",
                  y: "50%",
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: "80%",
                  y: `${50 + (Math.random() - 0.5) * 50}%`,
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
                className={`absolute w-2 h-2 rounded-full blur-sm ${
                  i % 3 === 0
                    ? "bg-purple-400"
                    : i % 3 === 1
                    ? "bg-cyan-400"
                    : "bg-blue-400"
                }`}
              />
            ))}

            <motion.div
              initial={{ x: "-20%", opacity: 0 }}
              animate={{
                x: "120%",
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 -translate-y-1/2 w-80 h-40 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
            />

            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                initial={{ x: "50%", scale: 0, opacity: 0 }}
                animate={{
                  x: "50%",
                  scale: [0, 2, 4],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
                className="absolute top-1/2 -translate-y-1/2 w-32 h-32 border-2 border-purple-400/50 rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black/40 to-cyan-900/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-gradient-to-br from-white via-purple-50/30 to-cyan-50/30 shadow-2xl z-40 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                <div className="flex flex-col gap-2">
                  {navLinks.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.name}
                        variants={linkVariants}
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => {
                            handleNavClick(item.path);
                            setMobileMenuOpen(false);
                          }}
                          className={`relative block px-5 py-4 rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden ${
                            isActive
                              ? "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30"
                              : "text-gray-700 hover:bg-white hover:shadow-md"
                          }`}
                        >
                          <span className="relative z-10 flex items-center justify-between">
                            {item.name}
                            {isActive && (
                              <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                →
                              </motion.span>
                            )}
                          </span>

                          {!isActive && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100 to-transparent"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                            />
                          )}

                          {isActive && (
                            <>
                              <motion.div
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                              />
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-xl"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  variants={linkVariants}
                  className="mt-auto space-y-4"
                >
                  <Link
                    to="/bikes"
                    onClick={() => {
                      handleNavClick("/bikes");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      className="relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white text-lg font-bold rounded-xl shadow-lg overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Start Booking
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />


                      <motion.div
                        className="absolute inset-0 blur-xl opacity-50"
                        animate={{
                          background: [
                            "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)",
                            "radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, transparent 70%)",
                            "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </motion.button>
                  </Link>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-sm bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent font-semibold"
                  >
                    Ride Beyond Boundaries 🏍️
                  </motion.p>
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
