/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import BikeCard from "../components/BikeCard";
import { bikes } from "../data/bikes";

// Simple SVG Icon
const IconX = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Booking Modal Component
function BookingModal({ bike, isOpen, onClose }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Booking data:", { ...data, bike: bike.name });
    
    Swal.fire({
      icon: 'success',
      title: 'Booking Successful!',
      html: `
        <div class="text-left">
          <p class="text-lg mb-2"><strong>Bike:</strong> ${bike.name}</p>
          <p class="text-lg mb-2"><strong>Name:</strong> ${data.name}</p>
          <p class="text-lg mb-2"><strong>Phone:</strong> ${data.phone}</p>
          <p class="text-lg mb-2"><strong>Duration:</strong> ${data.pickupDate} to ${data.returnDate}</p>
          <p class="text-green-600 font-bold mt-4">We'll contact you within 30 minutes!</p>
        </div>
      `,
      confirmButtonColor: '#06b6d4',
      confirmButtonText: 'Awesome!',
    });

    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-white">Book Your Ride</h2>
            <p className="text-blue-100 mt-1">{bike.name} - Rs {bike.price}/day</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <IconX />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
              <input
                {...register("phone", { required: "Phone is required" })}
                placeholder="+977 98X-XXXXXXX"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Pickup Date *</label>
              <input
                {...register("pickupDate", { required: "Pickup date is required" })}
                type="date"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
              />
              {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Return Date *</label>
              <input
                {...register("returnDate", { required: "Return date is required" })}
                type="date"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
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
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Confirm Booking
            </button>
          </div>
        </div>
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

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-hidden font-sans">
     
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1920&q=80"
            alt="Our Bikes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-slate-50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto text-white">
          <motion.span
            variants={fadeInUp}
            className="inline-block px-6 py-2 mb-6 rounded-full bg-cyan-900/70 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-sm font-bold tracking-widest"
          >
            PREMIUM FLEET • READY TO RIDE
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight"
          >
            Choose Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Perfect Ride
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            {bikes.length} premium bikes available • Fully insured • 24/7 support
          </motion.p>
        </div>
      </motion.section>

    
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {bikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} onBook={handleBooking} />
            ))}
          </motion.div>
        </div>
      </section>

      
      {selectedBike && (
        <BookingModal
          bike={selectedBike}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}