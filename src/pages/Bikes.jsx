/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import BikeCard from "./../components/BikeCard";
import BikeDetailsModal from "./../components/bikes/BikeDetailsModal";
import { bikes } from "../data/bikes";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

/* ─── SVG Icons ─── */

const IconClose = () => (
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

const IconArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const IconSearch = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

/* Helper to count booking days naturally */
const getRentalDays = (start, end) => {
  if (!start || !end) return 1;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays || 1;
};

/* ─── Multi-step Booking Wizard ─── */
function BookingWizard({ bike, isOpen, onClose }) {
  const { t, theme } = useApp();
  const { user } = useAuth();
  
  // Step indicator state
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 Form fields
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("Biratnagar");

  // Step 2 Form fields
  const [riderName, setRiderName] = useState("");
  const [riderPhone, setRiderPhone] = useState("");
  const [riderEmail, setRiderEmail] = useState("");
  const [riderNotes, setRiderNotes] = useState("");

  // Step 3 Form fields (Add-ons)
  const [hasExtraHelmet, setHasExtraHelmet] = useState(false);
  const [hasPremiumJacket, setHasPremiumJacket] = useState(false);
  const [hasGoproMount, setHasGoproMount] = useState(false);

  // Step 4 - Payment Method Sim
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" | "esewa" | "khalti"
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Error validation states
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default dates when opening
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split("T")[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPickupDate(today);
      setReturnDate(tomorrow);
      setCurrentStep(1);
      setValidationError("");
      setPaymentMethod("cod");
      setIsProcessingPayment(false);

      // Pre-fill fields if rider is logged in
      if (user) {
        setRiderName(user.name);
        setRiderPhone(user.phone || "");
        setRiderEmail(user.email || "");
      } else {
        setRiderName("");
        setRiderPhone("");
        setRiderEmail("");
      }
    }
  }, [isOpen, user]);

  if (!isOpen || !bike) return null;

  // Pricing calculations
  const totalDays = getRentalDays(pickupDate, returnDate);
  const baseCost = bike.price * totalDays;
  
  // Add-on calculations
  const helmetCost = hasExtraHelmet ? 200 * totalDays : 0;
  const jacketCost = hasPremiumJacket ? 300 * totalDays : 0;
  const mountCost = hasGoproMount ? 100 * totalDays : 0;
  const totalAddons = helmetCost + jacketCost + mountCost;

  // Discount calculation (10% off for bookings longer than 5 days)
  const discountRate = totalDays >= 5 ? 0.10 : 0.0;
  const discountAmount = Math.round(baseCost * discountRate);

  // Grand total
  const grandTotal = baseCost + totalAddons - discountAmount;

  // Step validation
  const validateAndNext = () => {
    setValidationError("");

    if (currentStep === 1) {
      if (!pickupDate || !returnDate) {
        setValidationError(t("pickupDate"));
        return;
      }
      if (new Date(returnDate) < new Date(pickupDate)) {
        setValidationError("Return date cannot be earlier than pickup date.");
        return;
      }
      setCurrentStep(2);
    } 
    else if (currentStep === 2) {
      if (!riderName.trim()) {
        setValidationError("Rider Name is required.");
        return;
      }
      if (!riderPhone.trim() || riderPhone.length < 10) {
        setValidationError("A valid phone number is required (min 10 digits).");
        return;
      }
      if (!riderEmail.trim() || !riderEmail.includes("@")) {
        setValidationError("A valid email address is required.");
        return;
      }
      setCurrentStep(3);
    }
    else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handlePreviousStep = () => {
    setValidationError("");
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If online payment is simulated
    if (paymentMethod !== "cod") {
      setIsProcessingPayment(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsProcessingPayment(false);
      
      // Sweet alert success checkmark for simulation
      await Swal.fire({
        icon: "success",
        title: t("paymentSuccess"),
        text: `Simulated transaction success via ${paymentMethod.toUpperCase()}`,
        confirmButtonColor: "#8B5CF6",
        timer: 1500,
        showConfirmButton: false
      });
    }
    
    // Smooth delay simulating booking processing
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Save booking to localStorage list
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      bikeId: bike.id,
      bikeName: bike.name,
      pickupDate,
      returnDate,
      pickupLocation,
      name: riderName,
      email: riderEmail,
      phone: riderPhone,
      notes: riderNotes,
      totalPrice: grandTotal,
      paymentMethod,
      timestamp: Date.now()
    };
    allBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(allBookings));
    
    setIsSubmitting(false);
    onClose();

    // SweetAlert display
    Swal.fire({
      icon: "success",
      title: "🏍️ Let's Ride, " + riderName.split(" ")[0] + "!",
      html: `
        <div class="text-left leading-relaxed text-sm space-y-2 mt-4 px-2 dark:text-gray-300">
          <p><b>Bike Choice:</b> ${bike.name}</p>
          <p><b>Rental Duration:</b> ${totalDays} ${t("days")} (${pickupDate} to ${returnDate})</p>
          <p><b>Pickup Station:</b> ${pickupLocation}</p>
          <p><b>Payment Type:</b> ${paymentMethod.toUpperCase()}</p>
          <p><b>Total Amount:</b> Rs ${grandTotal.toLocaleString()}</p>
          <hr class="my-3 border-gray-100 dark:border-slate-800" />
          <p class="text-emerald-600 dark:text-emerald-400 font-bold text-center">We will confirm your ride within 30 minutes! 🏔️</p>
        </div>
      `,
      confirmButtonColor: "#8B5CF6",
      confirmButtonText: "Awesome!",
      customClass: {
        popup: "rounded-3xl dark:bg-slate-900 dark:text-gray-100",
      }
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        {/* Animated Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300"
        >
          {/* Processing overlay for mock payment */}
          {isProcessingPayment && (
            <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 z-50 flex flex-col items-center justify-center p-8 text-center">
              <span className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6" />
              <h4 className="text-lg font-black text-purple-600 dark:text-purple-400">{t("simPaymentTitle")}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("processingPayment", { method: paymentMethod.toUpperCase() })}</p>
            </div>
          )}

          {/* Top Banner & Header */}
          <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-900 text-white p-6 relative shrink-0">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-transform hover:rotate-90 duration-300"
            >
              <IconClose />
            </button>
            <span className="text-purple-400 text-xs font-bold uppercase tracking-[2px] block mb-1">
              {t("stepOf", { current: currentStep })}
            </span>
            <h3 className="text-xl sm:text-2xl font-black">{bike.name}</h3>
            
            {/* Elegant Steps Progress Indicators */}
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3, 4].map((stepIdx) => (
                <div key={stepIdx} className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                  <div 
                    className={`h-full bg-purple-500 transition-all duration-300 ${
                      currentStep >= stepIdx ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 px-6 py-3 text-xs font-semibold border-b border-red-100 dark:border-red-950/30 flex items-center gap-2 shrink-0">
              <span className="text-lg">⚠</span> {validationError}
            </div>
          )}

          {/* Step Form Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* STEP 1: Dates & Location */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="bg-purple-500/10 dark:bg-purple-950/20 p-4 rounded-2xl border border-purple-200/50 dark:border-purple-800/30 mb-2">
                  <p className="text-xs text-purple-800 dark:text-purple-300 font-medium leading-relaxed">
                    💡 <b>Himalayan Special Deal:</b> Book for 5 days or more to receive a sweet 10% discount on the base rental rate!
                  </p>
                </div>
                
                <div>
                  <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    {t("pickupStation")}
                  </label>
                  <select 
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none transition-all text-sm font-semibold mb-3"
                  >
                    <option value="Biratnagar">Biratnagar Main Station</option>
                    <option value="Belbari">Belbari Pick-up Spot</option>
                    <option value="Biratnagar Airport">Biratnagar Airport Terminal</option>
                  </select>
                  
                  {/* Map Placeholder */}
                  <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden relative group border border-gray-200 dark:border-slate-700">
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=200&fit=crop" 
                      alt="Map Location" 
                      className="w-full h-full object-cover opacity-50 dark:opacity-40 group-hover:opacity-70 transition-opacity duration-300 filter grayscale"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-purple-600 text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                        <span>📍</span> {pickupLocation}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                      {t("pickupDate")}
                    </label>
                    <input 
                      type="date"
                      value={pickupDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                      {t("returnDate")}
                    </label>
                    <input 
                      type="date"
                      value={returnDate}
                      min={pickupDate || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-sm"
                    />
                  </div>
                </div>

                {totalDays > 0 && (
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                    <span className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{t("duration")}</span>
                    <span className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-lg">
                      {totalDays} {totalDays === 1 ? t("day") : t("days")}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Rider Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    {t("riderName")}
                  </label>
                  <input 
                    type="text"
                    value={riderName}
                    onChange={(e) => setRiderName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                      {t("riderPhone")}
                    </label>
                    <input 
                      type="tel"
                      value={riderPhone}
                      onChange={(e) => setRiderPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                      {t("riderEmail")}
                    </label>
                    <input 
                      type="email"
                      value={riderEmail}
                      onChange={(e) => setRiderEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    {t("notes")}
                  </label>
                  <textarea 
                    value={riderNotes}
                    onChange={(e) => setRiderNotes(e.target.value)}
                    placeholder="Any requests, gear size preferences or delivery notes..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none resize-none text-sm"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Gear & Add-ons */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                  {t("addonsDesc")}
                </p>

                {/* Addon 1 */}
                <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                  hasExtraHelmet ? "border-purple-500 bg-purple-50/20 dark:bg-purple-950/20" : "border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={hasExtraHelmet}
                      onChange={() => setHasExtraHelmet(!hasExtraHelmet)}
                      className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-sm">{t("addonHelmet")}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{t("addonHelmetDesc")}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Rs 200/day</span>
                </label>

                {/* Addon 2 */}
                <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                  hasPremiumJacket ? "border-purple-500 bg-purple-50/20 dark:bg-purple-950/20" : "border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={hasPremiumJacket}
                      onChange={() => setHasPremiumJacket(!hasPremiumJacket)}
                      className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-sm">{t("addonJacket")}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{t("addonJacketDesc")}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Rs 300/day</span>
                </label>

                {/* Addon 3 */}
                <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                  hasGoproMount ? "border-purple-500 bg-purple-50/20 dark:bg-purple-950/20" : "border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={hasGoproMount}
                      onChange={() => setHasGoproMount(!hasGoproMount)}
                      className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-sm">{t("addonGoPro")}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{t("addonGoProDesc")}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Rs 100/day</span>
                </label>
              </div>
            )}

            {/* STEP 4: Review Booking Summary & Simulated Payment */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-gray-100 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">{t("summaryTitle")}</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">{t("navBikes")}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{bike.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">{t("pickupStation")}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{pickupLocation}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">{t("duration")}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{totalDays} {totalDays === 1 ? t("day") : t("days")}</span>
                  </div>
                </div>

                {/* Simulated Payment Method Selection */}
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-gray-100 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                    {t("choosePayment")}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "cod", label: "Cash / Station", color: "border-purple-600 bg-purple-500/10" },
                      { id: "esewa", label: "eSewa Sim", color: "border-green-600 bg-green-500/10" },
                      { id: "khalti", label: "Khalti Sim", color: "border-violet-700 bg-violet-700/10" },
                    ].map((method) => {
                      const selected = paymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`py-2 px-1 text-[10px] font-black uppercase tracking-wider rounded-xl border-2 transition-all ${
                            selected ? `${method.color} text-purple-700 dark:text-purple-400 scale-[1.03]` : "border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          {method.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-gray-100 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">{t("summaryPrice")}</h4>
                  
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>{t("baseRent")} ({bike.price} × {totalDays} {t("days")})</span>
                    <span>Rs {baseCost.toLocaleString()}</span>
                  </div>

                  {totalAddons > 0 && (
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>{t("addonsCost")}</span>
                      <span>+ Rs {totalAddons.toLocaleString()}</span>
                    </div>
                  )}

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <span>{t("discountCost")}</span>
                      <span>- Rs {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <hr className="border-gray-200 dark:border-slate-700 my-1" />

                  <div className="flex justify-between text-sm font-black text-gray-900 dark:text-white">
                    <span>{t("totalDue")}</span>
                    <span className="text-purple-600 dark:text-purple-400">Rs {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {paymentMethod === "cod" && (
                  <div className="flex items-start gap-2.5 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100/50 dark:border-emerald-950/30">
                    <span className="text-emerald-600 text-base">🛡️</span>
                    <p className="text-emerald-800 dark:text-emerald-300 text-[10px] leading-relaxed">
                      {t("noUpfront")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-6 bg-gray-50 dark:bg-slate-900/60 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between shrink-0">
            {currentStep > 1 ? (
              <button 
                onClick={handlePreviousStep}
                className="px-5 py-3.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl text-xs transition-all hover:bg-gray-100 active:scale-95"
              >
                {t("backBtn")}
              </button>
            ) : (
              <button 
                onClick={onClose}
                className="px-5 py-3.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 font-bold rounded-xl text-xs transition-all hover:bg-gray-100 active:scale-95"
              >
                {t("cancelBtn")}
              </button>
            )}

            {currentStep < 4 ? (
              <button 
                onClick={validateAndNext}
                className="px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-xl text-xs transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                {t("continueBtn")} <IconArrowRight />
              </button>
            ) : (
              <button 
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs transition-all shadow-lg active:scale-95 flex items-center gap-2 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>{paymentMethod === "cod" ? "Book Ride! 🏍️" : `Pay & Book 💳`}</>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ─── Fleet Feature Card ─── */
function FleetFeatureCard({ icon, title, desc, index }) {
  const colors = [
    { bg: "from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5", border: "border-purple-200 dark:border-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
    { bg: "from-violet-500/10 to-purple-500/10 dark:from-violet-500/5 dark:to-purple-500/5", border: "border-violet-200 dark:border-violet-900/30", text: "text-violet-600 dark:text-violet-400" },
    { bg: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5", border: "border-emerald-200 dark:border-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
  ];
  const colorScheme = colors[index % colors.length];

  return (
    <div className={`group bg-gradient-to-br ${colorScheme.bg} border ${colorScheme.border} rounded-3xl p-8 hover:shadow-xl transition-all duration-400`}>
      <div className={`inline-flex w-14 h-14 items-center justify-center bg-white dark:bg-slate-900 rounded-2xl ${colorScheme.text} mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-black mb-3">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── Main Collection Page ─── */
export default function Bikes() {
  const { t, theme, language } = useApp();
  const [selectedBike, setSelectedBike] = useState(null);
  
  // Modal Triggers
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  
  const fleetRef = useRef(null);

  // Advanced Filtering States
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceLimit, setPriceLimit] = useState(2000);

  // List of unique categories derived naturally
  const categories = ["All", "Cruiser", "Street", "Adventure", "Sport"];

  const handleCardClick = (bike) => {
    setSelectedBike(bike);
    setIsDetailsOpen(true);
  };

  const handleProceedToBook = (bike) => {
    setIsDetailsOpen(false);
    // Add small delay to let details modal close smoothly
    setTimeout(() => {
      setIsWizardOpen(true);
    }, 200);
  };

  const handleScrollToFleet = () => {
    fleetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Filter bikes based on search queries and slider selections
  const filteredBikes = bikes.filter((bike) => {
    const matchesSearch = bike.name.toLowerCase().includes(searchText.toLowerCase()) || 
                           bike.category.toLowerCase().includes(searchText.toLowerCase()) ||
                           bike.location.toLowerCase().includes(searchText.toLowerCase());
                           
    const matchesCategory = activeCategory === "All" || bike.category === activeCategory;
    const matchesPrice = bike.price <= priceLimit;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const features = [
    { icon: <IconShield />, title: t("insuredTitle"), desc: t("insuredDesc") },
    { icon: <IconPhone />, title: t("supportTitle"), desc: t("supportDesc") },
    { icon: <IconStar />, title: t("modelsTitle"), desc: t("modelsDesc") },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
      
      {/* Dynamic Parallax Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1920&q=85"
            alt="Motorcycle Adventure Nepal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-slate-950/90 dark:to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(139,92,246,0.22),transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto text-white">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-purple-200 text-xs font-semibold uppercase tracking-[3px]">
            🏍️ Premium Motorcycle Rentals • Nepal
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-none tracking-tight mb-6">
            Conquer The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              Highlands
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            {t("heroSubtitle")}
          </p>

          <button
            onClick={handleScrollToFleet}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm rounded-full shadow-lg transition-transform active:scale-95"
          >
            Explore Catalog
          </button>
        </div>
      </section>

      {/* Fleet Catalog & Interactive Filters */}
      <section ref={fleetRef} className="py-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold tracking-[4px] uppercase text-purple-600 dark:text-purple-400 block mb-2">
              {t("bikesCollection")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black">{t("exploreFleet")}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-lg mx-auto">
              {t("exploreFleetDesc")}
            </p>
          </div>

          {/* Interactive Filters Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-gray-100 dark:border-slate-800 mb-12 space-y-6 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Search Box */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <IconSearch />
                </div>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl outline-none text-sm transition-all"
                />
              </div>

              {/* Price Slider */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span>{t("priceLimitLabel")}</span>
                  <span className="text-purple-600 dark:text-purple-400 font-extrabold">Rs {priceLimit} / {t("day")}</span>
                </div>
                <input
                  type="range"
                  min="900"
                  max="2000"
                  step="50"
                  value={priceLimit}
                  onChange={(e) => setPriceLimit(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-650"
                />
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-slate-800/80">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all ${
                    activeCategory === category
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-slate-850"
                  }`}
                >
                  {category === "All" ? (language === "ne" ? "सबै" : "All") : category}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredBikes.length > 0 ? (
                filteredBikes.map((bike, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={bike.id} 
                    className="transition-all"
                  >
                    <BikeCard bike={bike} onBook={handleCardClick} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="col-span-full py-16 text-center text-gray-400 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 p-8"
                >
                  <p className="text-lg font-bold">{t("noBikesFound")}</p>
                  <button
                    onClick={() => {
                      setSearchText("");
                      setActiveCategory("All");
                      setPriceLimit(2000);
                    }}
                    className="mt-4 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg"
                  >
                    {t("resetFilters")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 sm:py-24 px-5 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold tracking-[4px] uppercase text-purple-600 dark:text-purple-400 block mb-2">
              {t("whyUsSubtitle")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black">{t("whyModernRiders")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((f, i) => (
              <FleetFeatureCard key={i} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bike details modal */}
      <BikeDetailsModal 
        bike={selectedBike} 
        isOpen={isDetailsOpen} 
        onClose={() => { setIsDetailsOpen(false); setSelectedBike(null); }} 
        onProceedToBook={handleProceedToBook}
      />

      {/* Multi-step Booking Wizard Modal */}
      <BookingWizard 
        bike={selectedBike} 
        isOpen={isWizardOpen} 
        onClose={() => { setIsWizardOpen(false); setSelectedBike(null); }} 
      />
    </div>
  );
}