/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import { useApp } from "../context/AppContext";
import { bikes } from "../data/bikes";

/* ─── Static Mappings ─── */
const FEATURE_KEYS = [
  { titleKey: "insuredTitle", descKey: "insuredDesc", icon: "shield", accent: "from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-blue-500/5", border: "border-cyan-200/50 dark:border-cyan-900/30", iconBg: "bg-cyan-50 dark:bg-cyan-950/30", iconColor: "text-cyan-600 dark:text-cyan-400" },
  { titleKey: "supportTitle", descKey: "supportDesc", icon: "clock", accent: "from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5", border: "border-purple-200/50 dark:border-purple-900/30", iconBg: "bg-purple-50 dark:bg-purple-950/30", iconColor: "text-purple-600 dark:text-purple-400" },
  { titleKey: "modelsTitle", descKey: "modelsDesc", icon: "zap", accent: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5", border: "border-amber-200/50 dark:border-amber-900/30", iconBg: "bg-amber-50 dark:bg-amber-950/30", iconColor: "text-amber-600 dark:text-amber-400" },
  { titleKey: "deliveryTitle", descKey: "deliveryDesc", icon: "map", accent: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5", border: "border-emerald-200/50 dark:border-emerald-900/30", iconBg: "bg-emerald-50 dark:bg-emerald-950/30", iconColor: "text-emerald-600 dark:text-emerald-400" },
];

const STATS_KEYS = [
  { num: 500, suffix: "+", labelKey: "happyRiders" },
  { num: 50, suffix: "+", labelKey: "premiumBikes" },
  { num: 100, suffix: "%", labelKey: "insuranceCover" },
  { num: 24, suffix: "/7", labelKey: "roadSupport" },
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
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ─── Reveal Wrapper ─── */
function Reveal({ children, variants = fadeUp, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
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
    const step = end / (1000 / 16);
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
  const { t } = useApp();
  const items = [
    t("whyModernRiders"),
    t("insuredTitle"),
    t("supportTitle"),
    t("modelsTitle"),
    t("deliveryTitle"),
    t("happyRiders"),
    t("premiumBikes")
  ];
  return (
    <div className="bg-purple-600 dark:bg-purple-800 py-3.5 overflow-hidden select-none transition-colors duration-300">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 text-white/90 text-xs font-black tracking-[3px] uppercase">
            {item} <span className="text-purple-300 text-[8px]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Parallax Hero ─── */
function Hero() {
  const { t, theme } = useApp();
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-slate-950/90 dark:to-slate-990/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_30%,rgba(139,92,246,0.18),transparent_65%)]" />
      </motion.div>

      {/* Floating orbs */}
      {[
        { w: 320, top: "12%", left: "5%", color: "rgba(108,58,235,0.1)", d: 9 },
        { w: 220, top: "55%", right: "8%", color: "rgba(139,92,246,0.08)", d: 12 },
        { w: 160, top: "35%", left: "72%", color: "rgba(168,85,247,0.06)", d: 7 },
      ].map((o, i) => (
        <motion.div key={i}
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut", delay: i * 1.8 }}
          className="absolute rounded-full blur-3xl pointer-events-none z-[1]"
          style={{ width: o.w, height: o.w, top: o.top, left: o.left, right: o.right, background: o.color }}
        />
      ))}

      <motion.div style={{ y: textY, opacity }} className="relative z-10 text-center px-5 max-w-5xl mx-auto text-white">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 mb-7 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-purple-200 text-xs sm:text-sm font-bold tracking-[3px] uppercase"
        >
          <span>🏔️</span> Nepal on Two Wheels
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-6"
        >
          {t("heroTitlePrefix")}{" "}
          <br className="hidden sm:block" />
          <span className="relative inline-block mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">
              {t("heroTitleSuffix")}
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light mb-10 leading-relaxed"
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/bikes"
              className="flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-base rounded-full shadow-xl shadow-purple-900/30 transition-all duration-300">
              {t("findBike")}
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <IconArrowRight />
              </motion.span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact"
              className="flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-base rounded-full hover:bg-white/25 transition-all duration-300">
              <IconPhone /> {t("contactUs")}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/40 text-[9px] tracking-[4px] uppercase">{t("scroll")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ─── Floating Stats Card ─── */
function StatsCard() {
  const { t } = useApp();
  return (
    <div className="relative -mt-16 sm:-mt-24 z-20 px-5 sm:px-6">
      <Reveal>
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 dark:border-slate-800 transition-colors duration-300">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS_KEYS.map((s, i) => (
              <div key={i} className="group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-purple-600 dark:text-purple-400">
                  <Counter end={s.num} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-xs sm:text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  {t(s.labelKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ─── Featured Bikes ─── */
function FeaturedBike({ bike, index }) {
  const { t } = useApp();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative h-80 rounded-3xl overflow-hidden shadow-lg cursor-pointer"
    >
      <img src={bike.image} alt={bike.name}
        className="w-full h-full object-cover transition-transform duration-75 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Category badge */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
          {bike.category}
        </span>
      </div>

      {/* Info Content */}
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-xl sm:text-2xl font-black text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
          {bike.name}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-black text-purple-400">Rs {bike.price?.toLocaleString()}</span>
            <span className="text-gray-400 text-xs ml-1">/{t("day")}</span>
          </div>
          <Link to="/bikes"
            className="flex items-center gap-1 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl font-bold text-xs transition-colors shadow">
            {t("bookNow")}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({ t, i }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-md transition-colors duration-300 flex flex-col justify-between">
      <div>
        <div className="flex gap-0.5 mb-4 text-amber-500">
          {[...Array(5)].map((_, j) => <IconStar key={j} filled={j < t.rating} />)}
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6 italic">"{t.text}"</p>
      </div>
      <div className="flex items-center gap-3 border-t border-gray-50 dark:border-slate-800/60 pt-4">
        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-black text-xs">
          {t.name[0]}
        </div>
        <div>
          <p className="font-extrabold text-gray-900 dark:text-white text-xs">{t.name}</p>
          <p className="text-gray-400 dark:text-gray-500 text-[10px] uppercase font-bold tracking-wider">{t.loc}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Home() {
  const { t } = useApp();
  const featuredBikes = bikes.slice(0, 3);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
      {/* Hero */}
      <Hero />

      {/* Marquee banner */}
      <Marquee />

      {/* Stats overlay */}
      <StatsCard />

      {/* Why Us Section */}
      <section className="py-20 sm:py-28 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-black tracking-[4px] uppercase text-purple-600 dark:text-purple-400">
              {t("whyUsSubtitle")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-2 tracking-tight">
              {t("whyUsTitle")}
            </h2>
            <div className="w-12 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mt-4 rounded-full" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURE_KEYS.map((f, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${f.accent} border ${f.border} p-6 sm:p-8 rounded-3xl hover:shadow-lg transition-all duration-400 cursor-default flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-14 h-14 ${f.iconBg} ${f.iconColor} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                    {getIcon(f.icon)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black mb-2">{t(f.titleKey)}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{t(f.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured fleet */}
      <section className="py-20 sm:py-24 bg-gray-900 dark:bg-slate-900 text-white px-5 sm:px-6 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal className="text-center mb-12">
            <span className="text-purple-400 font-extrabold text-xs tracking-[4px] uppercase">{t("topBikesSubtitle")}</span>
            <h2 className="text-3xl sm:text-5xl font-black mt-2 tracking-tight">{t("topBikes")}</h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-lg mx-auto">
              {t("topBikesDesc")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredBikes.map((bike, i) => <FeaturedBike key={bike.id} bike={bike} index={i} />)}
          </div>

          <Reveal className="text-center mt-12" delay={0.2}>
            <Link to="/bikes"
              className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm rounded-full shadow-lg transition-transform active:scale-95">
              {t("viewAllBikes")}
              <IconArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 sm:px-6 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-black tracking-[4px] uppercase text-purple-600 dark:text-purple-400">
              {t("riderStories")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2">
              {t("lovedByRiders")}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} i={i} />)}
          </div>
        </div>
      </section>

      {/* Final Promo CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_65%)] pointer-events-none" />

        <Reveal className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-black tracking-[4px] uppercase text-purple-400 mb-3 block">
            {t("limitedOffer")}
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
            {t("readyToRide")}
          </h2>
          <p className="mt-6 text-sm sm:text-base text-purple-100/80 max-w-lg mx-auto leading-relaxed">
            {t("discountText")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/bikes"
              className="px-8 py-4.5 bg-white text-purple-950 font-black text-sm rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform">
              {t("bookNowBtn")}
            </Link>
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4.5 border border-white/20 text-white font-bold text-sm rounded-full hover:bg-white/10 transition-colors">
              <IconPhone /> {t("talkToUs")}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}