/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { bikes } from "../data/bikes";

/* ─── Data ─── */
const FEATURES = [
  { title: "Fully Insured", desc: "Every rental includes comprehensive insurance – ride worry-free.", icon: "shield", accent: "from-cyan-500/15 to-blue-500/15", border: "border-cyan-200", iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
  { title: "24/7 Support", desc: "Mechanical help anytime, anywhere in Nepal. One call away.", icon: "clock", accent: "from-violet-500/15 to-purple-500/15", border: "border-violet-200", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
  { title: "Latest Models", desc: "2023–2025 fleet, meticulously serviced after every ride.", icon: "zap", accent: "from-amber-500/15 to-orange-500/15", border: "border-amber-200", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  { title: "Free Delivery", desc: "Delivered to your hotel in Biratnagar and Belbari – free.", icon: "map", accent: "from-emerald-500/15 to-teal-500/15", border: "border-emerald-200", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
];

const STATS = [
  { num: 500, suffix: "+", label: "Happy Riders" },
  { num: 50, suffix: "+", label: "Premium Bikes" },
  { num: 100, suffix: "%", label: "Insurance Cover" },
  { num: 24, suffix: "/7", label: "Road Support" },
];

const TESTIMONIALS = [
  { name: "Alex M.", loc: "Germany", text: "Absolute dream service. Bike was perfect, the team went above and beyond. Best Himalayan experience!", rating: 5 },
  { name: "Sita R.", loc: "India", text: "Booked for 7 days, got the 10% discount. Bike was new, clean and powerful. Will come back!", rating: 5 },
  { name: "Tom W.", loc: "Australia", text: "Rode from Biratnagar to Everest base camp. The GPS tracking gave my family peace of mind. Incredible.", rating: 5 },
];

/* ─── Icons ─── */
const IconArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const IconPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.57A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconShield = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconClock = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconZap = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconMapPin = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconStar = ({ filled }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const getIcon = (key) => ({ shield: <IconShield />, clock: <IconClock />, zap: <IconZap />, map: <IconMapPin /> }[key] ?? <IconShield />);

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const popIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (d = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.65, delay: d, ease: [0.34, 1.3, 0.64, 1] } }),
};

/* ─── Reveal Wrapper ─── */
function Reveal({ children, variants = fadeUp, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={variants} custom={delay}
      initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = end / (1600 / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [inView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Marquee ─── */
function Marquee() {
  const items = ["Nepal's #1 Rental", "Premium Fleet", "Free Delivery", "Fully Insured", "24/7 Support", "GPS Tracking", "Instant Booking", "Expert Guidance"];
  return (
    <div className="bg-cyan-600 py-3 overflow-hidden select-none">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 text-white/90 text-xs font-bold tracking-[3px] uppercase">
            {item} <span className="text-cyan-300 text-[8px]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Parallax Hero ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[620px] flex items-center justify-center overflow-hidden">
      {/* Parallax bg */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110 z-0">
        <img
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop"
          alt="Rider in Nepal Himalayas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-slate-950/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_30%,rgba(6,182,212,0.18),transparent_65%)]" />
      </motion.div>

      {/* Grain */}
      <div className="absolute inset-0 z-[1] opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Floating orbs */}
      {[
        { w: 320, top: "12%", left: "5%", color: "rgba(6,182,212,0.12)", d: 9 },
        { w: 220, top: "55%", right: "8%", color: "rgba(139,92,246,0.1)", d: 12 },
        { w: 160, top: "35%", left: "72%", color: "rgba(34,211,238,0.08)", d: 7 },
      ].map((o, i) => (
        <motion.div key={i}
          animate={{ y: [0, -28, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut", delay: i * 1.8 }}
          className="absolute rounded-full blur-3xl pointer-events-none z-[1]"
          style={{ width: o.w, height: o.w, top: o.top, left: o.left, right: o.right, background: o.color }}
        />
      ))}

      <motion.div style={{ y: textY, opacity }} className="relative z-10 text-center px-5 max-w-5xl mx-auto text-white">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 mb-7 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-cyan-200 text-xs sm:text-sm font-bold tracking-[3px] uppercase"
        >
          <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }}>🏔️</motion.span>
          Nepal on Two Wheels
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-5"
        >
          Ride Beyond{" "}
          <br className="hidden sm:block" />
          <span className="relative inline-block">
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "300% 300%" }}
            >
              Boundaries
            </motion.span>
            <motion.span
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full origin-left"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light mb-10 leading-relaxed"
        >
          Premium bikes • Full insurance • 24/7 support • Delivered to your hotel in Biratnagar & Belbari
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.04, boxShadow: "0 20px 50px rgba(6,182,212,0.4)" }} whileTap={{ scale: 0.97 }}>
            <Link to="/bikes"
              className="flex items-center justify-center gap-3 px-8 sm:px-11 py-4 sm:py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-base sm:text-lg rounded-full shadow-xl transition-all duration-300">
              Find Your Bike
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <IconArrowRight />
              </motion.span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact"
              className="flex items-center justify-center gap-2.5 px-8 sm:px-11 py-4 sm:py-5 border border-white/30 bg-white/10 backdrop-blur-md text-white font-bold text-base sm:text-lg rounded-full hover:bg-white/20 transition-all duration-300">
              <IconPhone /> Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/40 text-[10px] tracking-[4px] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ─── Floating Stats Card ─── */
function StatsCard() {
  return (
    <div className="relative -mt-14 sm:-mt-20 z-20 px-5 sm:px-6">
      <Reveal>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-7 sm:p-10 md:p-14 border border-gray-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 text-center">
            {STATS.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.06 }}
                className="group cursor-default"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-cyan-700 group-hover:from-cyan-600 group-hover:to-blue-700 transition-all duration-500">
                  <Counter end={s.num} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
                <div className="w-8 h-0.5 bg-cyan-500 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ─── Featured Bikes ─── */
function FeaturedBike({ bike, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className="group relative h-72 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl cursor-pointer"
    >
      <img src={bike.image} alt={bike.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Category badge */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3 }}
        className="absolute top-4 left-4"
      >
        <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white uppercase tracking-wider">
          {bike.category}
        </span>
      </motion.div>

      {/* Content */}
      <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 right-5 sm:right-7">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
          {bike.name}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">Rs {bike.price?.toLocaleString()}</span>
            <span className="text-gray-400 text-sm ml-1">/day</span>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 0 }}
            className="group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
          >
            <Link to="/bikes"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-sm transition-colors">
              Book <IconArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({ t, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.13 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:border-cyan-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex gap-1 mb-4 text-amber-400">
        {[...Array(5)].map((_, j) => <IconStar key={j} filled={j < t.rating} />)}
      </div>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 italic">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-sm shrink-0">
          {t.name[0]}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">{t.name}</p>
          <p className="text-gray-400 text-xs">{t.loc}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function Home() {
  const featuredBikes = bikes.slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">

      {/* ── Hero ── */}
      <Hero />

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Floating Stats ── */}
      <StatsCard />

      {/* ── Why Ride With Us ── */}
      <section className="py-20 sm:py-28 md:py-32 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14 sm:mb-18">
            <span className="text-xs font-bold tracking-[4px] uppercase text-cyan-600">Our Promise</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mt-2 tracking-tight">
              Why Ride With Us?
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-5 rounded-full" />
          </Reveal>

          <motion.div
            variants={stagger} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.08}
                whileHover={{ y: -10, transition: { duration: 0.25 } }}
                className={`group bg-gradient-to-br ${f.accent} border ${f.border} p-7 sm:p-8 rounded-2xl sm:rounded-3xl hover:shadow-xl transition-all duration-400 cursor-default`}
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, -5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 ${f.iconBg} ${f.iconColor} rounded-2xl flex items-center justify-center mb-5 shadow-sm`}
                >
                  {getIcon(f.icon)}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Bikes ── */}
      <section className="py-20 sm:py-28 bg-gray-900 text-white px-5 sm:px-6 relative overflow-hidden">
        {/* BG glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/8 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal className="text-center mb-12 sm:mb-16">
            <span className="text-cyan-400 font-bold text-xs tracking-[4px] uppercase">Our Fleet</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mt-2 tracking-tight">Top Rated Bikes</h2>
            <p className="text-gray-400 mt-3 text-base sm:text-lg max-w-xl mx-auto">
              Well-maintained machines ready for the Himalayas.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {featuredBikes.map((bike, i) => <FeaturedBike key={bike.id} bike={bike} index={i} />)}
          </div>

          <Reveal className="text-center mt-12 sm:mt-16" delay={0.2}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/bikes"
                className="inline-flex items-center gap-3 px-10 sm:px-14 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-base sm:text-lg rounded-full shadow-xl hover:shadow-cyan-500/40 transition-all duration-300">
                View All Bikes
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <IconArrowRight />
                </motion.span>
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 sm:mb-14">
            <span className="text-xs font-bold tracking-[4px] uppercase text-cyan-600">Rider Stories</span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mt-2">Loved by Riders</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 text-white px-5 sm:px-6 relative overflow-hidden">
        {/* Animated rings */}
        {[250, 450, 650].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/8 pointer-events-none"
            style={{ width: size, height: size, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
            animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.1, 0.5] }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i }}
          />
        ))}

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_65%)] pointer-events-none" />

        <Reveal className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-[5px] uppercase text-cyan-300 mb-5 block">Limited Time Offer</span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none">
            Ready to Ride?
          </h2>
          <p className="mt-5 sm:mt-6 text-lg sm:text-xl text-cyan-100/80 max-w-xl mx-auto">
            Get <strong className="text-white font-black">10% OFF</strong> on bookings over 5 days.
            Your Himalayan journey starts here.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 25px 60px rgba(255,255,255,0.18)" }} whileTap={{ scale: 0.97 }}>
              <Link to="/bikes"
                className="inline-block px-10 sm:px-14 py-5 bg-white text-blue-900 font-black text-lg sm:text-xl rounded-full shadow-2xl transition-all duration-300">
                Book Your Bike Now →
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-10 sm:px-12 py-5 border-2 border-white/30 text-white font-bold text-lg sm:text-xl rounded-full hover:bg-white/10 transition-all duration-300">
                <IconPhone /> Talk to Us
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}