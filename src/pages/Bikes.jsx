/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import BikeCard from "../components/BikeCard";
import { bikes } from "../data/bikes";

/* ─── SVG Icons ─── */
const IconX = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const IconShield = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const IconPhone = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const IconStar = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);
const IconArrow = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 55 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (d = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: d, ease: [0.34, 1.3, 0.64, 1] },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Animated Counter ─── */
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

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

/* ─── Field Component ─── */
function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-red-500 text-xs mt-1.5 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = "w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/15 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 text-sm";

/* ─── Booking Modal ─── */
function BookingModal({ bike, isOpen, onClose }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 600)); // simulate async
    Swal.fire({
      icon: "success",
      title: "🏍️ Booking Confirmed!",
      html: `
        <div style="text-align:left;line-height:1.8;font-size:15px">
          <p><b>Bike:</b> ${bike?.name}</p>
          <p><b>Rider:</b> ${data.name}</p>
          <p><b>Phone:</b> ${data.phone}</p>
          <p><b>Trip:</b> ${data.pickupDate} → ${data.returnDate}</p>
          <p style="color:#059669;font-weight:700;margin-top:12px">We'll confirm within 30 minutes!</p>
        </div>`,
      confirmButtonColor: "#06b6d4",
      confirmButtonText: "Let's Ride! 🏔️",
      customClass: { popup: "rounded-3xl" },
    });
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && bike && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-lg z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[95vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 p-6 sm:p-8 shrink-0">
              {/* Glowing orb */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative flex justify-between items-start gap-4">
                <div>
                  <p className="text-cyan-400 text-xs font-bold tracking-[3px] uppercase mb-1">Reserve Now</p>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{bike.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-cyan-300 font-bold text-lg">Rs {bike.price?.toLocaleString()}</span>
                    <span className="text-gray-400 text-sm">/ day</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:rotate-90 duration-300 shrink-0"
                  aria-label="Close"
                >
                  <IconX />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" error={errors.name?.message}>
                  <input {...register("name", { required: "Required" })}
                    className={inputCls} placeholder="Your full name" />
                </Field>
                <Field label="Phone Number" error={errors.phone?.message}>
                  <input {...register("phone", { required: "Required" })}
                    className={inputCls} placeholder="+977 98XXXXXXXX" />
                </Field>
              </div>

              <Field label="Email Address" error={errors.email?.message}>
                <input {...register("email", {
                  required: "Required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })} type="email" className={inputCls} placeholder="your@email.com" />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Pickup Date" error={errors.pickupDate?.message}>
                  <input {...register("pickupDate", { required: "Required" })}
                    type="date" min={new Date().toISOString().split("T")[0]} className={inputCls} />
                </Field>
                <Field label="Return Date" error={errors.returnDate?.message}>
                  <input {...register("returnDate", { required: "Required" })}
                    type="date" min={new Date().toISOString().split("T")[0]} className={inputCls} />
                </Field>
              </div>

              <Field label="Notes (Optional)">
                <textarea {...register("message")} rows="3"
                  className={`${inputCls} resize-none`} placeholder="Any special requests or pickup instructions..." />
              </Field>

              {/* Info strip */}
              <div className="bg-cyan-50 border border-cyan-100 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-cyan-600 text-xl">✓</span>
                <p className="text-cyan-700 text-xs font-medium leading-snug">
                  Free cancellation up to 48hrs before pickup. Helmet & gear included.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-200 active:scale-95 text-sm">
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                  className="py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block" />
                  ) : (
                    <>Confirm Booking <IconArrow /></>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Marquee Banner ─── */
function MarqueeBanner() {
  const items = ["Premium Fleet", "24/7 Support", "GPS Tracking", "Free Helmet", "Fully Insured", "Instant Booking", "Nepal's Best"];
  return (
    <div className="bg-cyan-600 py-3 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 text-white/90 text-xs font-bold tracking-[3px] uppercase">
            {item} <span className="text-cyan-300">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Parallax Hero ─── */
function HeroSection({ onScrollToFleet }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110 z-0">
        <img
          src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1920&q=85"
          alt="Motorcycle Adventure Nepal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(34,211,238,0.2),transparent_65%)]" />
      </motion.div>

      {/* Animated grain texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Floating orbs */}
      {[
        { size: 300, top: "15%", left: "8%", color: "rgba(6,182,212,0.12)", dur: 8 },
        { size: 200, top: "60%", right: "10%", color: "rgba(99,102,241,0.1)", dur: 11 },
        { size: 150, top: "40%", left: "75%", color: "rgba(34,211,238,0.08)", dur: 7 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -30, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          className="absolute rounded-full blur-3xl pointer-events-none z-[1]"
          style={{ width: orb.size, height: orb.size, top: orb.top, left: orb.left, right: orb.right, background: orb.color }}
        />
      ))}

      <motion.div style={{ y: textY, opacity }}
        className="relative z-10 text-center px-5 max-w-6xl mx-auto text-white pt-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 sm:px-7 py-2.5 mb-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-cyan-200 text-xs sm:text-sm font-semibold tracking-[3px] uppercase"
        >
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>🏍️</motion.span>
          Premium Bike Rental • Nepal
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-6"
        >
          Conquer the{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400">
              Himalayas
            </span>
            <motion.span
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full origin-left"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Handpicked premium motorcycles for the ultimate Nepal adventure
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16 mb-12"
        >
          {[
            { value: bikes.length, suffix: "+", label: "Premium Bikes" },
            { value: 24, suffix: "/7", label: "Roadside Support" },
            { value: 100, suffix: "%", label: "Fully Insured" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 tracking-tight">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <p className="text-xs uppercase tracking-[3px] text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 20px 50px rgba(6,182,212,0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onScrollToFleet}
            className="group px-8 sm:px-12 py-4 sm:py-5 bg-white text-gray-900 font-black text-base sm:text-lg rounded-full shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto sm:mx-0"
          >
            Explore Our Fleet
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <IconArrow />
            </motion.span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onScrollToFleet}
            className="px-8 sm:px-12 py-4 sm:py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-base sm:text-lg rounded-full border border-white/25 transition-all duration-300 mx-auto sm:mx-0"
          >
            View Pricing
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/40 text-xs tracking-[4px] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ icon, title, desc, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const colors = [
    { bg: "from-cyan-500/10 to-blue-500/10", border: "border-cyan-200", icon: "text-cyan-600", glow: "shadow-cyan-500/10" },
    { bg: "from-violet-500/10 to-purple-500/10", border: "border-violet-200", icon: "text-violet-600", glow: "shadow-violet-500/10" },
    { bg: "from-emerald-500/10 to-teal-500/10", border: "border-emerald-200", icon: "text-emerald-600", glow: "shadow-emerald-500/10" },
  ];
  const c = colors[index % colors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.25 } }}
      className={`group bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl sm:rounded-3xl p-7 sm:p-10 hover:shadow-2xl ${c.glow} transition-all duration-400 cursor-default`}
    >
      <div className={`inline-flex w-16 h-16 items-center justify-center bg-white rounded-2xl ${c.icon} mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 text-sm sm:text-base leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function Bikes() {
  const [selectedBike, setSelectedBike] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fleetRef = useRef(null);

  const handleBooking = (bike) => {
    setSelectedBike(bike);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBike(null);
    document.body.style.overflow = "";
  };

  const scrollToFleet = () => {
    fleetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const features = [
    { icon: <IconShield />, title: "Fully Insured", desc: "Comprehensive coverage including damage, theft, and third-party liability for complete peace of mind." },
    { icon: <IconPhone />, title: "24/7 Support", desc: "Real-time roadside assistance anywhere in Nepal. Our team is always just one call away." },
    { icon: <IconStar />, title: "Premium Quality", desc: "Every bike is meticulously serviced with a 21-point safety inspection before each rental." },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">

      {/* ── Hero ── */}
      <HeroSection onScrollToFleet={scrollToFleet} />

      {/* ── Marquee ── */}
      <MarqueeBanner />

      {/* ── Fleet Section ── */}
      <section ref={fleetRef} id="fleet-section" className="py-20 sm:py-28 md:py-32 px-5 sm:px-6 scroll-mt-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            variants={stagger} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14 sm:mb-18"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-bold tracking-[4px] uppercase text-cyan-600 mb-3">
              Our Collection
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
              Premium Fleet
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              Choose your perfect ride for the mountains — all fully insured and ready for adventure
            </motion.p>
          </motion.div>

          {/* Bikes grid */}
          <motion.div
            variants={stagger} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
          >
            {bikes.map((bike, index) => (
              <motion.div
                key={bike.id}
                variants={fadeUp}
                custom={index * 0.06}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <BikeCard bike={bike} onBook={handleBooking} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-[4px] uppercase text-cyan-600">Our Promise</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mt-2 tracking-tight">
              Why Riders Choose Us
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section className="py-14 sm:py-18 px-5 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
            {[
              { icon: "⭐", label: "4.9/5 Rating", sub: "500+ reviews" },
              { icon: "🏔️", label: "All Nepal Routes", sub: "Including restricted zones" },
              { icon: "🪖", label: "Gear Included", sub: "Helmet, jacket, gloves" },
              { icon: "⚡", label: "Instant Booking", sub: "Confirmed in 30 mins" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1} className="text-center">
                <div className="text-3xl sm:text-4xl mb-2">{item.icon}</div>
                <p className="text-white font-bold text-sm sm:text-base">{item.label}</p>
                <p className="text-gray-400 text-xs mt-1">{item.sub}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 sm:py-32 px-5 sm:px-6 bg-gradient-to-br from-blue-800 via-cyan-700 to-teal-600 relative overflow-hidden">
        {/* Animated rings */}
        {[280, 480, 680].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10 pointer-events-none"
            style={{ width: size, height: size, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          />
        ))}

        <Reveal className="max-w-3xl mx-auto text-center text-white relative z-10">
          <p className="text-xs font-bold tracking-[5px] uppercase text-cyan-200 mb-4">Your Adventure Starts Here</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-5">
            Ready for Your<br className="hidden sm:block" /> Next Adventure?
          </h2>
          <p className="text-lg sm:text-xl text-cyan-100/80 font-light mb-10 max-w-xl mx-auto">
            Book your bike today and create unforgettable memories across Nepal's breathtaking landscapes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 25px 60px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToFleet}
              className="px-10 sm:px-14 py-5 bg-white text-blue-800 font-black text-lg sm:text-xl rounded-full shadow-2xl transition-all duration-300"
            >
              Browse All Bikes →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToFleet}
              className="px-10 sm:px-12 py-5 bg-transparent border-2 border-white/40 text-white font-bold text-lg sm:text-xl rounded-full hover:bg-white/10 transition-all duration-300"
            >
              View Pricing
            </motion.button>
          </div>
        </Reveal>
      </section>

      {/* ── Booking Modal ── */}
      <BookingModal bike={selectedBike} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}