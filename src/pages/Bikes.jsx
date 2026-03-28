/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import BikeCard from "../components/BikeCard";
import { bikes } from "../data/bikes";

// Icons
const IconX = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconShield = () => (
  <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconStar = () => (
  <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, duration: 1.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
};

// Booking Modal (Improved)
function BookingModal({ bike, isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Booking data:", { ...data, bike: bike?.name });

    Swal.fire({
      icon: "success",
      title: "Booking Request Sent!",
      html: `
        <div class="text-left space-y-3 text-lg">
          <p><strong>Bike:</strong> ${bike?.name}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Period:</strong> ${data.pickupDate} → ${data.returnDate}</p>
          <p class="text-emerald-600 font-semibold mt-6">We'll confirm your booking within 30 minutes!</p>
        </div>
      `,
      confirmButtonColor: "#06b6d4",
      confirmButtonText: "Got it!",
      customClass: { popup: "rounded-3xl" },
    });

    reset();
    onClose();
  };

  if (!isOpen || !bike) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[96vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-8 rounded-t-3xl flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black text-white">Book Your Adventure</h2>
            <p className="text-cyan-100 mt-2 text-xl">{bike.name} — Rs {bike.price}/day</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:rotate-90"
            aria-label="Close"
          >
            <IconX />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-7">
          {/* Form fields remain same but with improved styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/20 outline-none transition-all"
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1.5">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <input
                {...register("phone", { required: "Phone is required" })}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/20 outline-none transition-all"
                placeholder="+977 98XXXXXXXX"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1.5">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              type="email"
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/20 outline-none transition-all"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Date *</label>
              <input
                {...register("pickupDate", { required: true })}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Return Date *</label>
              <input
                {...register("returnDate", { required: true })}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes (Optional)</label>
            <textarea
              {...register("message")}
              rows="4"
              className="w-full px-5 py-4 rounded-3xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/20 outline-none resize-none transition-all"
              placeholder="Any special requests?"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-5 bg-gray-100 hover:bg-gray-200 font-bold rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Main Component
export default function Bikes() {
  const [selectedBike, setSelectedBike] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = (bike) => {
    setSelectedBike(bike);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBike(null);
  };

  const scrollToFleet = () => {
    document.getElementById("fleet-section")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section - Improved */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 25, ease: "linear" }}
            src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1920&q=85"
            alt="Motorcycle Adventure in Nepal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(34,211,238,0.25),transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto text-white pt-10">
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 px-8 py-3 mb-8 rounded-full bg-white/10 backdrop-blur-2xl border border-white/30 text-cyan-200 text-sm font-semibold tracking-widest"
          >
            🏍️ PREMIUM BIKE RENTAL • NEPAL
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tighter mb-6"
          >
            Conquer the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">Himalayas</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 font-light"
          >
            Handpicked premium motorcycles for the ultimate Nepal adventure
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-8 md:gap-12 mb-14"
          >
            {[
              { value: `${bikes.length}+`, label: "Premium Bikes" },
              { value: "24/7", label: "Roadside Support" },
              { value: "100%", label: "Fully Insured" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-5xl font-black text-cyan-300 tracking-tighter">{stat.value}</div>
                <div className="text-sm uppercase tracking-widest text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToFleet}
            className="group px-12 py-6 bg-white text-gray-900 font-bold text-xl rounded-full shadow-2xl hover:shadow-cyan-400/40 transition-all flex items-center gap-4 mx-auto"
          >
            Explore Our Fleet
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </motion.button>
        </div>
      </motion.section>

      {/* Fleet Section */}
      <section id="fleet-section" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900">Our Premium Fleet</h2>
            <p className="mt-4 text-gray-600 text-xl">Choose your perfect ride for the mountains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {bikes.map((bike, index) => (
              <motion.div
                key={bike.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <BikeCard bike={bike} onBook={handleBooking} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Modern Cards */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900">Why Riders Choose Us</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: <IconShield />, title: "Fully Insured", desc: "Comprehensive coverage for peace of mind on every journey" },
              { icon: <IconPhone />, title: "24/7 Support", desc: "Real-time assistance anywhere in Nepal" },
              { icon: <IconStar />, title: "Premium Quality", desc: "Well-maintained, regularly serviced premium motorcycles" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="bg-white border border-gray-100 rounded-3xl p-10 text-center hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="inline-flex w-24 h-24 items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl text-cyan-600 mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-600">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl text-cyan-100 mb-10">Book your bike today and create unforgettable memories in Nepal</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToFleet}
            className="px-14 py-6 bg-white text-blue-700 font-bold text-2xl rounded-full shadow-xl hover:bg-gray-100 transition-all"
          >
            Browse All Bikes →
          </motion.button>
        </motion.div>
      </section>

      {/* Booking Modal */}
      <BookingModal bike={selectedBike} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}