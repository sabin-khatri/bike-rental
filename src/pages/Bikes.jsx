/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import BikeCard from "./../components/BikeCard";
import BikeDetailsModal from "./../components/bikes/BikeDetailsModal";
import { bikes } from "../data/bikes";
import { useAuth } from "../context/AuthContext";

const IconClose = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const IconSearch = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
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
  const { user } = useAuth();
  const wizardRef = useRef(null);

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
      setPickupDate(today);
      setReturnDate(tomorrow);
      setCurrentStep(1);
      setValidationError("");
      setPaymentMethod("cod");
      setIsProcessingPayment(false);

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

  // Lock body scroll while wizard is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // Escape to close + basic focus trap
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && wizardRef.current) {
        const focusables = wizardRef.current.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const totalDays = getRentalDays(pickupDate, returnDate);
  const baseCost = (bike?.price || 0) * totalDays;

  const helmetCost = hasExtraHelmet ? 200 * totalDays : 0;
  const jacketCost = hasPremiumJacket ? 300 * totalDays : 0;
  const mountCost = hasGoproMount ? 100 * totalDays : 0;
  const totalAddons = helmetCost + jacketCost + mountCost;

  const discountRate = totalDays >= 5 ? 0.1 : 0.0;
  const discountAmount = Math.round(baseCost * discountRate);

  const grandTotal = baseCost + totalAddons - discountAmount;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateAndNext = () => {
    setValidationError("");

    if (currentStep === 1) {
      if (!pickupDate || !returnDate) {
        setValidationError("Pickup and return dates are required.");
        return;
      }
      if (new Date(returnDate) < new Date(pickupDate)) {
        setValidationError("Return date cannot be earlier than pickup date.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!riderName.trim() || !riderPhone.trim() || !riderEmail.trim()) {
        setValidationError("Please fill out all rider contact fields.");
        return;
      }
      if (!isValidEmail(riderEmail.trim())) {
        setValidationError("Please enter a valid email address.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setValidationError("");

    if (paymentMethod !== "cod") {
      setIsProcessingPayment(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsProcessingPayment(false);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    // Save to localStorage
    const newBooking = {
      id: "BK-" + Math.floor(100000 + Math.random() * 900000),
      email: riderEmail || user?.email,
      bikeName: bike.name,
      pickupLocation,
      totalPrice: grandTotal,
      pickupDate,
      returnDate,
      paymentMethod,
      status: "Confirmed",
      date: new Date().toISOString().split("T")[0],
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, newBooking]));

    setIsSubmitting(false);
    onClose();

    Swal.fire({
      icon: "success",
      title: "Booking Requested!",
      text: `Your ride ${bike.name} has been reserved. Total: Rs ${grandTotal}. We will contact you shortly.`,
      confirmButtonColor: "#EA580C",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && bike && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={wizardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wizard-title"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-xl border border-gray-200"
          >
            {/* Header */}
            <div className="bg-slate-50 border-b border-gray-200 p-5 flex justify-between items-center">
              <div>
                <h3 id="wizard-title" className="text-base font-bold text-gray-950">
                  Book {bike.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Step {currentStep} of 4</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close booking wizard"
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
              >
                <IconClose />
              </button>
            </div>

            {/* Steps Progress bar */}
            <div className="w-full bg-gray-100 h-1" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={4}>
              <motion.div
                className="bg-orange-500 h-full"
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {validationError && (
                <div className="p-3 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-lg">
                  ⚠️ {validationError}
                </div>
              )}

              {/* STEP 1: Dates & Location */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-orange-600">Dates & Handover</h4>
                  <div>
                    <label htmlFor="pickup-location" className="block text-xs font-medium text-gray-500 mb-1">
                      Handover Location
                    </label>
                    <select
                      id="pickup-location"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                    >
                      <option value="Biratnagar">Biratnagar Main Station</option>
                      <option value="Belbari">Belbari Delivery Point</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pickup-date" className="block text-xs font-medium text-gray-500 mb-1">
                        Pickup Date
                      </label>
                      <input
                        id="pickup-date"
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="return-date" className="block text-xs font-medium text-gray-500 mb-1">
                        Return Date
                      </label>
                      <input
                        id="return-date"
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 pt-2 text-center">
                    Rental Duration: <span className="font-bold text-gray-700">{totalDays} days</span>
                  </p>
                </div>
              )}

              {/* STEP 2: Rider Contact Info */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-orange-600">Rider Information</h4>
                  <div>
                    <label htmlFor="rider-name" className="block text-xs font-medium text-gray-500 mb-1">
                      Full Name
                    </label>
                    <input
                      id="rider-name"
                      type="text"
                      value={riderName}
                      onChange={(e) => setRiderName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rider-phone" className="block text-xs font-medium text-gray-500 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="rider-phone"
                        type="tel"
                        value={riderPhone}
                        onChange={(e) => setRiderPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="rider-email" className="block text-xs font-medium text-gray-500 mb-1">
                        Email Address
                      </label>
                      <input
                        id="rider-email"
                        type="email"
                        value={riderEmail}
                        onChange={(e) => setRiderEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="rider-notes" className="block text-xs font-medium text-gray-500 mb-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="rider-notes"
                      value={riderNotes}
                      onChange={(e) => setRiderNotes(e.target.value)}
                      rows={2}
                      placeholder="E.g. flight arrival times, height for helmet size..."
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Add-ons selection */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-orange-600">Select Add-ons</h4>
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-gray-200 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={hasExtraHelmet}
                        onChange={(e) => setHasExtraHelmet(e.target.checked)}
                        className="w-4 h-4 accent-orange-600"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-800">Second Safety Helmet</p>
                        <p className="text-[10px] text-gray-400">Rs 200 / day</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-gray-200 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={hasPremiumJacket}
                        onChange={(e) => setHasPremiumJacket(e.target.checked)}
                        className="w-4 h-4 accent-orange-600"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-800">Premium Riding Jacket</p>
                        <p className="text-[10px] text-gray-400">Rs 300 / day</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-gray-200 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={hasGoproMount}
                        onChange={(e) => setHasGoproMount(e.target.checked)}
                        className="w-4 h-4 accent-orange-600"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-800">Action Camera Handlebar Mount</p>
                        <p className="text-[10px] text-gray-400">Rs 100 / day</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 4: Review Summary & Payment simulation */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <h4 className="text-xs font-bold uppercase text-orange-600">Booking Summary</h4>

                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bike Model</span>
                      <span className="font-bold text-gray-800">{bike.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pickup Date</span>
                      <span className="font-bold text-gray-800">{pickupDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Return Date</span>
                      <span className="font-bold text-gray-800">{returnDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location</span>
                      <span className="font-bold text-gray-800">{pickupLocation}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                      <span className="text-gray-600">Base Cost ({totalDays} days)</span>
                      <span className="text-gray-800">Rs {baseCost}</span>
                    </div>
                    {totalAddons > 0 && (
                      <div className="flex justify-between font-bold text-gray-600">
                        <span>Add-ons Total</span>
                        <span>Rs {totalAddons}</span>
                      </div>
                    )}
                    {discountAmount > 0 && (
                      <div className="flex justify-between font-bold text-green-600">
                        <span>Discount (10% Weekly)</span>
                        <span>- Rs {discountAmount}</span>
                      </div>
                    )}
                    <div className="border-t-2 border-gray-200 pt-2 flex justify-between font-black text-sm text-orange-600">
                      <span>Grand Total</span>
                      <span>Rs {grandTotal}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-500">Select Payment Option</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`py-2 px-1 border rounded-lg text-xs font-bold transition-all ${
                          paymentMethod === "cod" ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-slate-50 border-gray-200 text-gray-600"
                        }`}
                      >
                        Cash / COD
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("esewa")}
                        className={`py-2 px-1 border rounded-lg text-xs font-bold transition-all ${
                          paymentMethod === "esewa" ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-slate-50 border-gray-200 text-gray-600"
                        }`}
                      >
                        eSewa
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("khalti")}
                        className={`py-2 px-1 border rounded-lg text-xs font-bold transition-all ${
                          paymentMethod === "khalti" ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-slate-50 border-gray-200 text-gray-600"
                        }`}
                      >
                        Khalti
                      </button>
                    </div>
                  </div>

                  {isProcessingPayment && (
                    <div className="p-3 bg-orange-50 border border-orange-200 text-xs font-medium text-orange-600 text-center rounded-lg animate-pulse">
                      Connecting to digital payment portal...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Controls */}
            <div className="bg-slate-50 border-t border-gray-200 p-4 flex justify-between items-center">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg transition-all hover:bg-gray-50"
                >
                  Back
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  onClick={validateAndNext}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                >
                  Continue <IconArrowRight />
                </button>
              ) : (
                <button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg transition-all shadow-sm disabled:opacity-70 active:scale-95"
                >
                  {isSubmitting ? "Processing..." : paymentMethod === "cod" ? "Book Ride Now" : "Pay & Book"}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Collection Page ─── */
export default function Bikes() {
  const [selectedBike, setSelectedBike] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const fleetRef = useRef(null);

  // Filtering States
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLocation, setActiveLocation] = useState("All");
  const [priceLimit, setPriceLimit] = useState(2000);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Trigger state refresh for localStorage changes
  const [wishlistVersion, setWishlistVersion] = useState(0);

  const categories = ["All", "Cruiser", "Street", "Adventure", "Sport"];

  const handleCardClick = (bike) => {
    setSelectedBike(bike);
    setIsDetailsOpen(true);
  };

  const handleProceedToBook = () => {
    setIsDetailsOpen(false);
    setTimeout(() => {
      setIsWizardOpen(true);
    }, 200);
  };

  // React to wishlist updates: cross-tab via "storage", same-tab via a custom event
  // (BikeCard should dispatch: window.dispatchEvent(new Event("wishlist-updated")) after writing to localStorage)
  useEffect(() => {
    const handleWishlistChange = () => setWishlistVersion((v) => v + 1);
    window.addEventListener("storage", handleWishlistChange);
    window.addEventListener("wishlist-updated", handleWishlistChange);
    return () => {
      window.removeEventListener("storage", handleWishlistChange);
      window.removeEventListener("wishlist-updated", handleWishlistChange);
    };
  }, []);

  const getCategoryCount = (cat) => {
    let list = bikes;
    if (activeLocation !== "All") {
      list = list.filter((b) => b.location.toLowerCase().includes(activeLocation.toLowerCase()));
    }
    if (cat === "All") return list.length;
    return list.filter((b) => b.category === cat).length;
  };

  const filteredBikes = bikes.filter((bike) => {
    const matchesSearch =
      bike.name.toLowerCase().includes(searchText.toLowerCase()) ||
      bike.category.toLowerCase().includes(searchText.toLowerCase()) ||
      bike.location.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory = activeCategory === "All" || bike.category === activeCategory;
    const matchesLocation = activeLocation === "All" || bike.location.toLowerCase().includes(activeLocation.toLowerCase());
    const matchesPrice = bike.price <= priceLimit;

    if (showSavedOnly) {
      const saved = JSON.parse(localStorage.getItem("savedBikes") || "[]");
      // eslint-disable-next-line no-unused-expressions
      wishlistVersion; // read to keep this computation reactive to wishlist changes
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && saved.includes(bike.id);
    }

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  return (
    <div className="bg-slate-50 text-gray-800 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 md:pt-32 md:pb-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 px-3 py-1.5 bg-orange-50 rounded-full">
            Our Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">Explore Our Rental Fleet</h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Select from our range of cruiser, adventure, sport, and street motorcycles for your next ride.
          </p>
        </div>
      </section>

      {/* Fleet Catalog & Filters */}
      <section ref={fleetRef} className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Search Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch />
              </div>
              <label htmlFor="bike-search" className="sr-only">Search bikes</label>
              <input
                id="bike-search"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search bike name, type..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-lg outline-none text-sm focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>

            {/* Location Selector */}
            <div>
              <label htmlFor="location-filter" className="sr-only">Filter by location</label>
              <select
                id="location-filter"
                value={activeLocation}
                onChange={(e) => setActiveLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
              >
                <option value="All">All Locations</option>
                <option value="biratnagar">Biratnagar Only</option>
                <option value="belbari">Belbari Only</option>
              </select>
            </div>

            {/* Price Slider */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase">
                <span>Max Price Limit</span>
                <span className="text-orange-600 font-bold">Rs {priceLimit} / day</span>
              </div>
              <input
                type="range"
                min="900"
                max="2000"
                step="50"
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
                aria-label="Maximum daily price"
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
            </div>
          </div>

          {/* Filter Categories and Wishlist Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setShowSavedOnly(false);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                    activeCategory === category && !showSavedOnly
                      ? "bg-orange-600 border-orange-600 text-white shadow-sm"
                      : "bg-slate-50 border-gray-200 text-gray-500 hover:bg-slate-100"
                  }`}
                >
                  {category} ({getCategoryCount(category)})
                </button>
              ))}
            </div>

            {/* Wishlist Toggle Button */}
            <button
              onClick={() => {
                setShowSavedOnly(!showSavedOnly);
                setActiveCategory("All");
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border flex items-center gap-1.5 self-start sm:self-auto ${
                showSavedOnly
                  ? "bg-red-500 border-red-500 text-white shadow-sm"
                  : "bg-slate-50 border-gray-200 text-gray-600 hover:text-red-500 hover:bg-red-50"
              }`}
            >
              ❤️ Saved Rides
            </button>
          </div>
        </div>

        {/* Catalog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => <BikeCard key={bike.id} bike={bike} onBook={handleCardClick} />)
          ) : (
            <div className="col-span-full py-16 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200 p-8">
              <p className="text-base font-semibold">No bikes found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchText("");
                  setActiveCategory("All");
                  setActiveLocation("All");
                  setPriceLimit(2000);
                  setShowSavedOnly(false);
                }}
                className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-all active:scale-95"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bike details modal */}
      <BikeDetailsModal
        bike={selectedBike}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedBike(null);
        }}
        onProceedToBook={handleProceedToBook}
      />

      {/* Booking Wizard Modal */}
      <BookingWizard
        bike={selectedBike}
        isOpen={isWizardOpen}
        onClose={() => {
          setIsWizardOpen(false);
          setSelectedBike(null);
        }}
      />
    </div>
  );
}