import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Local bike images imports
import royalEnfield from "../assets/bikes/royal-enfield.webp";
import hondaXr from "../assets/bikes/hondaxr190.webp";
import bajajPulsar from "../assets/bikes/bajaj220.webp";

// --- DATA CONSTANTS (कोड सफा राख्न डाटा बाहिर राखिएको) ---
const BIKES = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    price: "Rs 800",
    tag: "Cruiser",
    img: royalEnfield,
  },
  {
    id: 2,
    name: "Honda XR 190",
    price: "Rs 1200",
    tag: "Off-Road",
    img: hondaXr,
  },
  {
    id: 3,
    name: "Bajaj Pulsar 220",
    price: "Rs 700",
    tag: "Street",
    img: bajajPulsar,
  },
];

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
    desc: "Delivered to your hotel in Thamel or Pokhara – free of cost.",
    icon: "map",
  },
];

// --- ICONS COMPONENTS ---
const IconArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" /></svg>
);
const IconShield = () => (
  <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const IconClock = () => (
  <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const IconZap = () => (
  <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const IconMapPin = () => (
  <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const IconPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.57A2 2 0 0 1 22 16.92z" /></svg>
);
const IconChevronDown = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m6 9 6 6 6-6" /></svg>
);
const IconStar = () => (
  <svg className="w-14 h-14 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
);

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  // Function to get icon based on string key
  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'shield': return <IconShield />;
      case 'clock': return <IconClock />;
      case 'zap': return <IconZap />;
      case 'map': return <IconMapPin />;
      default: return <IconShield />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop"
            alt="Rider in Nepal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-50/10" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeInUp} className="inline-block px-6 py-2 mb-8 rounded-full bg-cyan-900/40 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-sm font-bold tracking-widest">
              EXPLORE NEPAL ON TWO WHEELS
            </motion.span>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
              Ride Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Boundaries
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="mt-8 text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-light">
              Premium bikes • Full insurance • 24/7 support • Delivered to your hotel
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/bikes" className="group relative px-10 py-5 bg-cyan-500 text-black font-bold text-lg rounded-full overflow-hidden shadow-xl hover:shadow-cyan-500/40 transition-all hover:scale-105">
                <span className="relative z-10 flex items-center gap-3">Find Your Bike <IconArrowRight /></span>
                <div className="absolute inset-0 bg-white/20 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link to="/contact" className="px-10 py-5 border border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                <IconPhone /> Contact Us
              </Link>
            </motion.div>
          </motion.div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60">
            <IconChevronDown />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="relative -mt-20 z-20">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {[
            { num: "500+", label: "Happy Riders" },
            { num: "50+", label: "Premium Bikes" },
            { num: "100%", label: "Insurance Cover" },
            { num: "24/7", label: "Road Support" }
          ].map((stat, i) => (
            <div key={i} className="text-center pt-4 md:pt-0">
              <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-700">{stat.num}</h3>
              <p className="mt-2 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl md:text-5xl font-black text-gray-900">
            Why Ride With Us?
          </motion.h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-8 rounded-3xl border border-gray-100 hover:border-cyan-500/30 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  {getFeatureIcon(f.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MOST LOVED BIKES (IMAGE SIZE FIXED HERE) --- */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span className="text-cyan-400 font-bold tracking-widest">OUR COLLECTION</span>
              <h2 className="text-4xl md:text-5xl font-black mt-2">Most Loved Machines</h2>
              <p className="text-gray-400 mt-4 max-w-xl">Hand-picked for Nepal’s roads – from Himalayan trails to city streets.</p>
            </div>
            <Link to="/bikes" className="mt-6 md:mt-0 px-6 py-3 border border-gray-700 rounded-full hover:bg-gray-800 hover:border-cyan-400 text-cyan-400 font-bold transition-all flex items-center gap-2">
              View All Bikes <IconArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BIKES.map((bike, i) => (
              <motion.div
                key={bike.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                // --- SIZE FIX: Reduced height from h-[520px] to h-[420px] ---
                className="group relative h-[380px] md:h-[420px] rounded-3xl overflow-hidden bg-gray-800 shadow-2xl cursor-pointer"
              >
                <img
                  src={bike.img}
                  alt={bike.name}
                  // Added object-center to keep bike focused
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    {bike.tag}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">
                    {bike.name}
                  </h3>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <span className="text-2xl md:text-3xl font-black text-cyan-400">{bike.price}</span>
                      <span className="text-xs text-gray-400 ml-1">/day</span>
                    </div>
                    <Link
                      to="/bikes"
                      className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-cyan-500 text-black px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-cyan-400"
                    >
                      Book Now <IconArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial & CTA */}
      <section className="py-24 bg-cyan-50/50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <IconStar />
          <h2 className="mt-8 text-2xl md:text-4xl font-bold text-gray-900 italic">
            “The best way to experience Nepal. Brand new bikes, delivered to our hotel in Pokhara. 10/10 would ride again!”
          </h2>
          <div className="mt-10 flex items-center justify-center gap-5">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Alex" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg" />
            <div className="text-left">
              <p className="font-bold text-gray-900">Alex Thompson</p>
              <p className="text-sm text-gray-600">Adventure Rider, UK</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1605218427368-35b85a3c617e?q=80&w=2070&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white">
            Ready to Ride Nepal?
          </motion.h2>
          <p className="mt-6 text-xl text-cyan-100">Get <strong>10% OFF</strong> on bookings over 5 days</p>
          <Link to="/bikes" className="mt-12 inline-block px-12 py-6 bg-white text-blue-900 font-bold text-xl rounded-full shadow-2xl hover:shadow-cyan-300/50 hover:scale-105 transition-all duration-300">
            Book Your Bike Now
          </Link>
        </div>
      </section>
    </div>
  );
}