/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { bikes } from "../data/bikes";

const FEATURES = [
  {
    title: "Fully Insured",
    desc: "Every rental includes comprehensive insurance – ride worry-free.",
    icon: "shield",
  },
  {
    title: "24/7 Support",
    desc: "Mechanical help anytime, anywhere in Nepal.",
    icon: "clock",
  },
  {
    title: "Latest Models",
    desc: "2023–2025 fleet, serviced after every ride.",
    icon: "zap",
  },
  {
    title: "Free Delivery",
    desc: "Delivered to your hotel in Biratnagar and Belbari – free of cost.",
    icon: "map",
  },
];

const STATS = [
  { num: "500+", label: "Happy Riders" },
  { num: "50+", label: "Premium Bikes" },
  { num: "100%", label: "Insurance Cover" },
  { num: "24/7", label: "Road Support" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
};

const IconArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"
    />
  </svg>
);

const IconChevronDown = () => (
  <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m6 9 6 6 6-6" />
  </svg>
);

const IconShield = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconClock = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconZap = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconMapPin = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function Home() {
  const getFeatureIcon = (icon) => {
    switch (icon) {
      case "shield": return <IconShield />;
      case "clock":  return <IconClock />;
      case "zap":    return <IconZap />;
      case "map":    return <IconMapPin />;
      default:       return <IconShield />;
    }
  };

  const featuredBikes = bikes.slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative h-[85vh] sm:h-[90vh] md:h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop"
            alt="Rider in Nepal Himalayas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-5 sm:px-6 max-w-5xl mx-auto text-white">
          <motion.span
            variants={fadeInUp}
            className="inline-block px-5 py-1.5 mb-6 sm:mb-8 rounded-full bg-cyan-900/70 backdrop-blur-md border border-cyan-400/30 text-cyan-200 text-xs sm:text-sm font-bold tracking-widest"
          >
            NEPAL ON TWO WHEELS
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
          >
            Ride Beyond{" "}
            <br className="hidden sm:block" />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Boundaries
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light"
          >
            Premium bikes • Full insurance • 24/7 support • Delivered to your hotel in Biratnagar and Belbari
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/bikes"
                className="px-8 sm:px-10 py-4 sm:py-5 bg-cyan-500 text-black font-bold text-lg sm:text-xl rounded-full shadow-xl hover:shadow-cyan-500/40 hover:bg-cyan-400 transition-all block"
              >
                Find Your Bike
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/contact"
                className="px-8 sm:px-10 py-4 sm:py-5 border border-white/40 bg-white/10 backdrop-blur-md text-white font-medium text-lg sm:text-xl rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2.5"
              >
                <IconPhone /> Contact Us
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-white/70"
          >
            
          </motion.div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative -mt-16 sm:-mt-20 z-20 px-5 sm:px-6"
      >
        <div className="max-w-6xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-8 sm:p-12 md:p-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 text-center">
            {STATS.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.08 }}>
                <motion.h3
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800"
                >
                  {stat.num}
                </motion.h3>
                <p className="mt-2 text-xs sm:text-sm md:text-base font-bold text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Why Ride With Us */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 sm:py-20 md:py-24 px-5 sm:px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900"
          >
            Why Ride With Us?
          </motion.h2>
          <div className="w-20 h-1.5 bg-cyan-500 mx-auto mt-5 rounded-full" />

          <motion.div
            variants={staggerContainer}
            className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(6,182,212,0.2)" }}
                className="group bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 hover:border-cyan-400 shadow-lg hover:shadow-xl transition-all"
              >
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center"
                  whileHover={{ rotate: [0, -8, 8, -8, 0], scale: 1.08 }}
                >
                  {getFeatureIcon(f.icon)}
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Bikes */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 sm:py-20 md:py-24 bg-gray-900 text-white px-5 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            <span className="text-cyan-400 font-bold text-xs sm:text-sm tracking-widest">
              OUR FLEET
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-3">
              Top Rated Bikes
            </h2>
            <p className="text-gray-400 mt-3 sm:mt-4 text-base sm:text-lg max-w-2xl mx-auto">
              Well-maintained machines ready for the Himalayas.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          >
            {featuredBikes.map((bike, index) => (
              <motion.div
                key={bike.id}
                variants={scaleIn}
                whileHover={{ y: -12, boxShadow: "0 25px 50px -12px rgba(6,182,212,0.35)" }}
                className="group relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl cursor-pointer"
              >
                <motion.img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />

                <motion.div
                  className="absolute top-4 left-4"
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-bold uppercase tracking-wide">
                    {bike.category}
                  </span>
                </motion.div>

                <motion.div
                  className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors">
                    {bike.name}
                  </h3>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-2xl sm:text-3xl md:text-4xl font-black text-cyan-400">
                        Rs {bike.price}
                      </span>
                      <span className="text-gray-300 text-sm ml-1.5">/day</span>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Link
                        to="/bikes"
                        className="bg-cyan-500 text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 hover:bg-cyan-400 transition-colors"
                      >
                        Book <IconArrowRight />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center mt-12 sm:mt-16">
            <Link
              to="/bikes"
              className="inline-block px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg sm:text-xl rounded-full shadow-xl hover:shadow-cyan-500/40 transition-all"
            >
              View All Bikes
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 text-center px-5 sm:px-6 relative overflow-hidden"
      >
        <div className="relative z-10">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white"
          >
            Ready to Ride?
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl text-cyan-100">
            Get{" "}
            <strong className="text-white">10% OFF</strong> on bookings over 5 days
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8 sm:mt-10">
            <Link
              to="/bikes"
              className="inline-block px-10 sm:px-14 py-4 sm:py-6 bg-white text-blue-900 font-bold text-lg sm:text-xl md:text-2xl rounded-full shadow-2xl hover:shadow-cyan-300/40 transition-all"
            >
              Book Your Bike Now
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;