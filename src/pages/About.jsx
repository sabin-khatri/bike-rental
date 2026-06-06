/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useApp } from "../context/AppContext";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: d, ease: "easeOut" },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (d = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: d, ease: "easeOut" },
  }),
};

/* ─── Reusable Animated Section Wrapper ─── */
function Reveal({ children, variants = fadeUp, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      custom={delay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */
function Counter({ end, suffix = "", duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── FAQ Item ─── */
function FAQItem({ faq, i }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.05}>
      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open ? "border-purple-500 shadow-md shadow-purple-500/10" : "border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors"
          aria-expanded={open}
        >
          <span className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white leading-snug">{faq.q}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold"
          >
            ↓
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p className="px-6 pb-5 pt-1 text-gray-500 dark:text-gray-400 leading-relaxed text-xs sm:text-sm border-t border-gray-100 dark:border-slate-850">
                {faq.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/* ─── Team Card ─── */
function TeamCard({ person, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group text-center"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-md bg-slate-100 dark:bg-slate-800">
        <img
          src={person.img}
          alt={person.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{person.name}</h3>
      <p className="text-purple-600 dark:text-purple-400 font-extrabold text-[10px] tracking-widest mt-1 uppercase">{person.role}</p>
    </motion.div>
  );
}

/* ─── Parallax Hero ─── */
function ParallaxHero() {
  const { t } = useApp();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Parallax BG */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110 z-0">
        <img
          src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1920&q=85"
          alt="Riding in Nepal Himalayas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-slate-950/90 dark:to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_25%,rgba(139,92,246,0.22),transparent_65%)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-5 max-w-5xl mx-auto text-white">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block px-6 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-2xl border border-white/25 text-purple-200 text-xs font-semibold tracking-[3px] uppercase"
        >
          Established 2020 • Biratnagar, Nepal
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="text-3xl sm:text-5xl md:text-6xl font-black leading-none tracking-tighter mb-6"
        >
          We Don't Just Rent Bikes.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400">
            We Create Adventures.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto font-light leading-relaxed"
        >
          Premium motorcycles. Unforgettable Himalayan journeys. Real rider support.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const { t } = useApp();
  const stats = [
    { end: 100, suffix: "+", label: t("premiumBikes") },
    { end: 5000, suffix: "+", label: t("happyRiders") },
    { end: 3, suffix: "", label: t("locations") },
    { end: 4, suffix: "", label: t("roadSupport") },
  ];
  return (
    <section className="bg-gray-900 dark:bg-slate-900 border-b border-gray-800 dark:border-slate-800/80 py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-purple-400">
              <Counter end={s.end} suffix={s.suffix} />
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-[10px] mt-1.5 tracking-widest uppercase font-bold">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Main Component ─── */
export default function About() {
  const { t, language } = useApp();

  const safetyItems = [
    { icon: "🛠️", title: "Daily Maintenance", text: "Every bike goes through a strict 21-point safety inspection before handover." },
    { icon: "⛑️", title: "Premium Safety Gear", text: "DOT-approved helmets, riding jackets & gloves provided free of cost." },
    { icon: "🆘", title: "24/7 Roadside Support", text: "Our team is always ready to assist you, no matter where you are in Nepal." },
    { icon: "📄", title: "Comprehensive Insurance", text: "Full coverage including damage, theft, and third-party liability." },
    { icon: "📍", title: "GPS Tracking", text: "Real-time tracking for your safety in remote Himalayan areas." },
    { icon: "🗺️", title: "Route Planning", text: "Personalized guidance on road conditions and best riding routes." },
  ];

  const team = [
    { name: "Ramesh Thapa", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    { name: "Anita Gurung", role: "Operations Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
    { name: "Suresh Lama", role: "Master Mechanic", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&q=80" },
  ];

  const faqs = [
    { q: "Do I need a license to rent a motorcycle?", a: "Yes, a valid driver's license for motorcycles is strictly required. International tourists must hold an IDP." },
    { q: "What happens if the bike breaks down?", a: "We offer roadside rescue mechanics. If the issue is severe, we replace the bike promptly." },
    { q: "Is fuel included?", a: "No, fuel costs are paid by the rider. We deliver the bike with some fuel, and you pay for what you use." },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
      
      {/* Hero */}
      <ParallaxHero />

      {/* Stats */}
      <StatsBar />

      {/* Our Story */}
      <section className="py-16 sm:py-24 px-5 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <span className="text-xs font-bold tracking-[4px] uppercase text-purple-600 dark:text-purple-400">Our Origin</span>
              <h2 className="text-3xl sm:text-5xl font-black mt-2 tracking-tight">Our Story</h2>
            </motion.div>

            <motion.div variants={stagger} className="space-y-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
              <motion.p variants={fadeUp}>
                Born in the bustling streets of <strong>Biratnagar in 2020</strong>, we began with just 5 bikes and one big dream — to make Nepal's majestic landscapes accessible to every passionate rider.
              </motion.p>
              <motion.p variants={fadeUp}>
                Today, we proudly maintain a premium fleet of <strong>100+ motorcycles</strong>. From the rugged roads of Mustang to scenic highways — our bikes have carried thousands of unforgettable stories.
              </motion.p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                to="/bikes"
                className="px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow shadow-purple-500/20"
              >
                Start Journey →
              </Link>
            </motion.div>
          </motion.div>

          <Reveal variants={fadeRight} className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-xl bg-slate-100 dark:bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80"
                alt="Our Journey in Nepal"
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Safety Info */}
      <section className="py-16 sm:py-24 px-5 bg-gray-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="uppercase tracking-[4px] text-purple-600 dark:text-purple-400 font-extrabold text-xs">Safety First</span>
            <h2 className="text-3xl sm:text-5xl font-black mt-2">Safety is Non-Negotiable</h2>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {safetyItems.map((item, i) => (
              <motion.div
                key={i}
                variants={popIn}
                custom={i * 0.05}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-850 p-6 rounded-3xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-5 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-bold tracking-[4px] uppercase text-purple-600 dark:text-purple-400">The Crew</span>
            <h2 className="text-3xl sm:text-5xl font-black mt-2">Meet Our Team</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((person, i) => (
              <TeamCard key={i} person={person} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="py-16 px-5 bg-gray-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-bold tracking-[4px] uppercase text-purple-600 dark:text-purple-400">FAQs</span>
            <h2 className="text-3xl sm:text-5xl font-black mt-2">Frequently Asked Questions</h2>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} i={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}