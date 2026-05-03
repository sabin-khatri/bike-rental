import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (d = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.65, delay: d, ease: [0.34, 1.4, 0.64, 1] },
  }),
};

/* ─── Reusable Animated Section Wrapper ─── */
function Reveal({ children, variants = fadeUp, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
function Counter({ end, suffix = "", duration = 2 }) {
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
    <Reveal delay={i * 0.07}>
      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open ? "border-cyan-400 shadow-lg shadow-cyan-500/10" : "border-gray-200 hover:border-gray-300"}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-7 py-6 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
          aria-expanded={open}
        >
          <span className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">{faq.q}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="shrink-0 w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center text-sm font-bold"
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
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="px-7 pb-6 pt-1 text-gray-600 leading-relaxed border-t border-gray-100 text-[15px] sm:text-base">
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group text-center"
    >
      <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden mb-5 shadow-xl">
        <img
          src={person.img}
          alt={person.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-400" />
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-400 opacity-0 group-hover:opacity-100">
          <div className="w-10 h-0.5 bg-cyan-400 mx-auto mb-2 rounded-full" />
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white">{person.name}</h3>
      <p className="text-cyan-400 font-medium tracking-widest text-xs mt-1 uppercase">{person.role}</p>
    </motion.div>
  );
}

/* ─── Parallax Hero ─── */
function ParallaxHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Parallax BG */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110 z-0">
        <img
          src="/bikes/about.png"
          alt="Riding in Nepal Himalayas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-gray-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_25%,rgba(34,211,238,0.22),transparent_65%)]" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/20 backdrop-blur-sm"
          style={{
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <motion.div style={{ opacity }} className="relative z-10 text-center px-5 max-w-5xl mx-auto text-white">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block px-6 sm:px-8 py-2.5 mb-7 rounded-full bg-white/10 backdrop-blur-2xl border border-white/25 text-cyan-200 text-xs sm:text-sm font-semibold tracking-[3px] uppercase"
        >
          Established 2020 • Biratnagar, Nepal
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-black leading-none tracking-tighter mb-7"
        >
          We Don't Rent Bikes.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400">
            We Create Adventures.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Premium motorcycles. Unforgettable Himalayan journeys. Real rider support.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/bikes"
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1 active:scale-95"
          >
            Explore Our Fleet →
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold rounded-full text-base sm:text-lg border border-white/30 transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const stats = [
    { end: 100, suffix: "+", label: "Premium Bikes" },
    { end: 5000, suffix: "+", label: "Happy Riders" },
    { end: 3, suffix: "", label: "Cities Covered" },
    { end: 4, suffix: "", label: "Years of Trust" },
  ];
  return (
    <section className="bg-gray-900 py-10 sm:py-14 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1} className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              <Counter end={s.end} suffix={s.suffix} />
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 tracking-widest uppercase">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Main Component ─── */
export default function About() {
  const safetyItems = [
    { icon: "🛠️", title: "Daily Maintenance", text: "Every bike goes through a strict 21-point safety inspection before handover." },
    { icon: "⛑️", title: "Premium Safety Gear", text: "DOT-approved helmets, riding jackets & gloves provided free of cost." },
    { icon: "🆘", title: "24/7 Roadside Support", text: "Our team is always ready to assist you, no matter where you are in Nepal." },
    { icon: "📄", title: "Comprehensive Insurance", text: "Full coverage including damage, theft, and third-party liability." },
    { icon: "📍", title: "GPS Tracking", text: "Real-time tracking for your safety in remote Himalayan areas." },
    { icon: "🗺️", title: "Expert Route Planning", text: "Personalized guidance on road conditions and best riding routes." },
  ];

  const team = [
    { name: "Ramesh Thapa", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    { name: "Anita Gurung", role: "Operations Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
    { name: "Suresh Lama", role: "Master Mechanic", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&q=80" },
    { name: "Priya Shrestha", role: "Customer Support", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80" },
  ];

  const faqs = [
    { q: "Do I need an International Driver's Permit (IDP)?", a: "Yes for most tourists. If your license is in English, it is often accepted, but we strongly recommend carrying an IDP." },
    { q: "What happens if the bike breaks down?", a: "We provide 24/7 roadside assistance. Minor issues are fixed on spot or guided. For major problems, we replace the bike immediately." },
    { q: "Is fuel included in the rental price?", a: "No. Bikes are delivered with a full tank and must be returned full. We can help arrange fuel if needed." },
    { q: "Can I ride to Upper Mustang?", a: "Yes! We assist with all required permits including ACAP and TIMS for restricted areas." },
    { q: "What is your cancellation policy?", a: "Free cancellation up to 48 hours before pickup. 10% fee applies if cancelled within 24 hours." },
  ];

  const visionItems = [
    { num: "01", title: "200+ Premium Bikes", desc: "Expanding our fleet with the latest adventure motorcycles" },
    { num: "02", title: "Go Green Initiative", desc: "40% of our fleet will be electric by 2027" },
    { num: "03", title: "Global Rider Community", desc: "Building Nepal's largest network of passionate riders" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans overflow-x-hidden">

      {/* ── Hero ── */}
      <ParallaxHero />

      {/* ── Stats ── */}
      <StatsBar />

      {/* ── Our Story ── */}
      <section className="py-20 md:py-32 px-5 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8 order-2 lg:order-1"
          >
            <motion.div variants={fadeUp}>
              <span className="text-xs font-bold tracking-[4px] uppercase text-cyan-600">Our Origin</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight mt-2">
                Our Story
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="space-y-5 text-base sm:text-lg text-gray-600 leading-relaxed">
              <motion.p variants={fadeUp}>
                Born in the bustling streets of <strong className="text-gray-900">Biratnagar in 2020</strong>,
                we began with just 5 bikes and one big dream — to make Nepal's majestic landscapes
                accessible to every passionate rider.
              </motion.p>
              <motion.p variants={fadeUp}>
                Today, we proudly maintain a premium fleet of{" "}
                <strong className="text-gray-900">100+ motorcycles</strong> across Kathmandu, Pokhara,
                and Biratnagar. From the rugged roads of Mustang to the scenic highways of Sindhuli —
                our bikes have carried thousands of unforgettable stories.
              </motion.p>
              <motion.blockquote
                variants={fadeUp}
                className="border-l-4 border-cyan-500 pl-6 italic text-gray-700 text-lg sm:text-xl leading-relaxed bg-cyan-50/50 py-4 rounded-r-xl"
              >
                "We are riders first, entrepreneurs second. We understand your needs because we've lived them on these roads."
              </motion.blockquote>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gray-900 hover:bg-cyan-600 text-white font-bold rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
              >
                Start Your Journey
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >→</motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <Reveal variants={fadeRight} className="relative order-1 lg:order-2">
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[2rem] sm:rounded-[2.75rem] blur-2xl opacity-20 pointer-events-none" />
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
              <img
                src="/bikes/story.webp"
                alt="Our Journey in Nepal"
                className="w-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Since</p>
                <p className="text-2xl font-black text-gray-900">2020</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vision 2030 ── */}
      <section className="py-20 md:py-32 px-5 bg-gray-900 text-white relative overflow-hidden">
        {/* BG decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <Reveal variants={fadeLeft} className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
            <img
              src="/bikes/vision.png"
              alt="Our Vision"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                />
              </div>
              <p className="text-white/60 text-xs mt-2">75% towards Vision 2030</p>
            </div>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-10"
          >
            <div>
              <motion.span variants={fadeUp} className="text-xs font-bold tracking-[4px] uppercase text-cyan-400">
                Where We're Headed
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mt-2">
                Vision 2030
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-400 mt-4 leading-relaxed">
                To become Nepal's most trusted adventure mobility partner, pioneering sustainable and unforgettable journeys.
              </motion.p>
            </div>

            <div className="space-y-6">
              {visionItems.map((item) => (
                <motion.div
                  key={item.num}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="flex gap-5 group cursor-default"
                >
                  <div className="text-3xl sm:text-4xl font-black text-cyan-400 pt-1 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {item.num}
                  </div>
                  <div className="border-l border-gray-700 pl-5">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400 mt-1 text-sm sm:text-base">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Safety First ── */}
      <section className="py-20 md:py-32 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14 sm:mb-20">
            <span className="uppercase tracking-[4px] text-cyan-600 font-bold text-xs sm:text-sm">Safety is Non-Negotiable</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mt-3">Safety First, Always</h2>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
          >
            {safetyItems.map((item, i) => (
              <motion.div
                key={i}
                variants={popIn}
                custom={i * 0.07}
                whileHover={{ y: -10, transition: { duration: 0.25 } }}
                className="bg-white border border-gray-100 p-7 sm:p-9 rounded-2xl sm:rounded-3xl hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-200 transition-all duration-300 group"
              >
                <div className="text-4xl sm:text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{item.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Meet The Crew ── */}
      <section className="py-20 md:py-28 px-5 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-[4px] uppercase text-cyan-400">The People Behind It</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mt-2">Meet The Crew</h2>
            <p className="text-gray-400 text-base sm:text-lg mt-3">The passionate riders behind every journey</p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {team.map((person, i) => (
              <TeamCard key={i} person={person} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-[4px] uppercase text-cyan-600">Got Questions?</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mt-2">
              FAQs
            </h2>
          </Reveal>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 sm:py-32 px-5 bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-600 text-white text-center relative overflow-hidden">
        {/* Animated rings */}
        {[1, 2, 3].map((n) => (
          <motion.div
            key={n}
            className="absolute inset-0 rounded-full border border-white/10 m-auto"
            style={{ width: `${n * 300}px`, height: `${n * 300}px` }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4 + n, repeat: Infinity, ease: "easeInOut", delay: n * 0.5 }}
          />
        ))}

        <Reveal className="max-w-3xl mx-auto space-y-6 relative z-10">
          <p className="text-xs font-bold tracking-[5px] uppercase text-cyan-200">Your Next Adventure</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Ready for the Ride<br className="hidden sm:block" /> of a Lifetime?
          </h2>
          <p className="text-xl sm:text-2xl text-cyan-100 font-light">Your Himalayan adventure awaits.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/bikes"
              className="inline-block bg-white text-blue-700 px-10 sm:px-14 py-5 sm:py-6 rounded-full font-black text-lg sm:text-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-white/30"
            >
              Explore Our Fleet →
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-transparent border-2 border-white/50 text-white px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-lg sm:text-xl hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}