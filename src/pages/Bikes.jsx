/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import BikeCard from "../components/BikeCard";
import { bikes } from "../data/bikes";

// Simple SVG Icons
const IconX = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconShield = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const IconPhone = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const IconStar = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, duration: 1 },
  },
};

// Booking Modal Component
function BookingModal({ bike, isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Booking data:", { ...data, bike: bike.name });

    Swal.fire({
      icon: "success",
      title: "Booking Successful!",
      html: `
        <div class="text-left space-y-2">
          <p class="text-lg"><strong>Bike:</strong> ${bike.name}</p>
          <p class="text-lg"><strong>Name:</strong> ${data.name}</p>
          <p class="text-lg"><strong>Phone:</strong> ${data.phone}</p>
          <p class="text-lg"><strong>Email:</strong> ${data.email}</p>
          <p class="text-lg"><strong>Duration:</strong> ${data.pickupDate} to ${data.returnDate}</p>
          <p class="text-green-600 font-bold mt-6">We'll contact you within 30 minutes!</p>
        </div>
      `,
      confirmButtonColor: "#06b6d4",
      confirmButtonText: "Awesome!",
      customClass: {
        popup: "rounded-2xl",
      },
    });

    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-500 p-6 rounded-t-3xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Book Your Ride</h2>
            <p className="text-blue-100 mt-1 text-lg">{bike.name} - Rs {bike.price}/day</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            aria-label="Close modal"
          >
            <IconX />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
              <input
                {...register("phone", { required: "Phone is required" })}
                placeholder="+977 98X-XXXXXXX"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Pickup Date *</label>
              <input
                {...register("pickupDate", { required: "Pickup date is required" })}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all"
              />
              {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Return Date *</label>
              <input
                {...register("returnDate", { required: "Return date is required" })}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all"
              />
              {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Additional Message (Optional)</label>
            <textarea
              {...register("message")}
              rows="4"
              placeholder="Any special requests or questions?"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-0.5"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Main Bikes Page
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
    document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1920&q=80"
            alt="Motorcycle Adventure in Nepal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-slate-50" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.4),transparent_60%)]"
          />
        </div>

        <div className="relative z-10 text-center px-6 sm:px-8 sm-pt-5 max-w-5xl mx-auto text-white">
          <motion.span
            variants={fadeInUp}
            className="inline-block px-6 py-3 mb-6 rounded-full bg-cyan-900/80 backdrop-blur-md border border-cyan-400/50 text-cyan-200 text-sm font-bold tracking-wider"
          >
            🏍️ PREMIUM FLEET • EXPLORE NEPAL
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
          >
            Ride Through the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400">
              Himalayas
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Experience Nepal's breathtaking landscapes on two wheels <br />
            <br className="hidden md:block" />
            <span className="text-cyan-300 font-bold">{bikes.length} Premium Bikes</span> • Fully Insured • 24/7 Support
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-12"
          >
            {[
              { value: `${bikes.length}+`, label: "Premium Bikes" },
              { value: "24/7", label: "Support" },
              { value: "100%", label: "Insured" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
              >
                <div className="text-3xl md:text-4xl font-black text-cyan-300">{stat.value}</div>
                <div className="text-sm text-gray-300 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToFleet}
            className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full text-lg md:text-xl shadow-2xl hover:shadow-cyan-500/60 transition-all"
          >
            Explore Our Fleet →
          </motion.button>
        </div>
      </motion.section>

      {/* Bikes Grid */}
      <section id="fleet-section" className="py-20 md:py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {bikes.map((bike, index) => (
              <motion.div
                key={bike.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BikeCard bike={bike} onBook={handleBooking} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Ride With Us?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the freedom of the road with our premium bike rental service
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              { icon: <IconShield />, title: "Full Insurance", color: "from-cyan-50 to-blue-50", bg: "bg-cyan-500" },
              { icon: <IconPhone />, title: "24/7 Support", color: "from-purple-50 to-pink-50", bg: "bg-purple-500" },
              { icon: <IconStar />, title: "Top Quality", color: "from-orange-50 to-yellow-50", bg: "bg-orange-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className={`text-center p-10 rounded-3xl bg-gradient-to-br ${item.color} hover:shadow-2xl transition-all duration-500`}
              >
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${item.bg} text-white mb-8 shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {i === 0 && "All our bikes come with comprehensive insurance coverage for your peace of mind"}
                  {i === 1 && "Round-the-clock assistance whenever you need help during your rental period"}
                  {i === 2 && "Well-maintained premium bikes regularly serviced for optimal performance"}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-6 bg-gradient-to-r from-blue-600 to-cyan-500">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-4xl md:text-4xl font-black mb-8">Ready to Hit the Road?</h2>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed">
            Book your perfect bike today and start your Himalayan adventure
          </p>
          <button
            onClick={scrollToFleet}
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-cyan-300/50 transform hover:scale-105"
          >
            View All Bikes
          </button>
        </motion.div>
      </section>

      {/* Booking Modal */}
      <BookingModal bike={selectedBike} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}