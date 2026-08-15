/* eslint-disable no-unused-vars */

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

const getRentalDays = (start, end) => {
  if (!start || !end) return 1;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays || 1;
};

/* ─── Multi-step Booking Wizard with Promo Codes ─── */
function BookingWizard({ bike, isOpen, onClose }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("Biratnagar");

  const [riderName, setRiderName] = useState("");
  const [riderPhone, setRiderPhone] = useState("");
  const [riderEmail, setRiderEmail] = useState("");
  const [riderNotes, setRiderNotes] = useState("");

  const [hasExtraHelmet, setHasExtraHelmet] = useState(false);
  const [hasPremiumJacket, setHasPremiumJacket] = useState(false);
  const [hasGoproMount, setHasGoproMount] = useState(false);

  // Promo Code Engine
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setPromoInput("");
      setAppliedPromo("");
      setPromoMessage("");

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

  const totalDays = getRentalDays(pickupDate, returnDate);
  const baseCost = bike.price * totalDays;
  
  const helmetCost = hasExtraHelmet ? 200 * totalDays : 0;
  const jacketCost = hasPremiumJacket ? 300 * totalDays : 0;
  const mountCost = hasGoproMount ? 100 * totalDays : 0;
  const totalAddons = helmetCost + jacketCost + mountCost;

  const discountRate = totalDays >= 5 ? 0.10 : 0.0;
  const discountAmount = Math.round(baseCost * discountRate);

  // Calculate promo discount
  let promoDiscount = 0;
  if (appliedPromo === "RIDE10") {
    promoDiscount = Math.round((baseCost + totalAddons) * 0.10);
  } else if (appliedPromo === "HELLONEPAL") {
    promoDiscount = 500;
  }

  const grandTotal = Math.max(0, baseCost + totalAddons - discountAmount - promoDiscount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.toUpperCase().trim();
    if (code === "RIDE10") {
      setAppliedPromo("RIDE10");
      setPromoMessage("✓ RIDE10 Applied: Extra 10% Off!");
    } else if (code === "HELLONEPAL") {
      setAppliedPromo("HELLONEPAL");
      setPromoMessage("✓ HELLONEPAL Applied: Rs 500 Discount!");
    } else {
      setPromoMessage("❌ Invalid Promo Code");
    }
  };

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
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsProcessingPayment(false);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

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
      date: new Date().toISOString().split("T")[0]
    };
    
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, newBooking]));

    setIsSubmitting(false);
    onClose();

    Swal.fire({
      icon: "success",
      title: "Booking Confirmed!",
      text: `Reserved successfully. Total Paid: Rs ${grandTotal}.`,
      confirmButtonColor: "#EA580C",
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-xl border border-gray-200"
        >
          {/* Header */}
          <div className="bg-slate-50 border-b border-gray-150 p-5 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-gray-950">Book {bike.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">Step {currentStep} of 4</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <IconClose />
            </button>
          </div>

          <div className="w-full bg-gray-100 h-1">
            <div 
              className="bg-orange-500 h-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {validationError && (
              <div className="p-3 bg-red-50 text-red-650 border border-red-200 text-xs font-semibold rounded-lg">
                ⚠️ {validationError}
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-orange-600">Dates & Handover</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Handover Location</label>
                  <select 
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
                    <label className="block text-xs font-medium text-gray-500 mb-1">Pickup Date</label>
                    <input 
                      type="date" 
                      value={pickupDate} 
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Return Date</label>
                    <input 
                      type="date" 
                      value={returnDate} 
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 pt-2 text-center">Duration: <span className="font-bold text-gray-700">{totalDays} days</span></p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-orange-600">Rider Details</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={riderName} 
                    onChange={(e) => setRiderName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={riderPhone} 
                      onChange={(e) => setRiderPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={riderEmail} 
                      onChange={(e) => setRiderEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Notes</label>
                  <textarea 
                    value={riderNotes} 
                    onChange={(e) => setRiderNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 resize-none"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-orange-600">Select Add-ons</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-gray-200 cursor-pointer">
                    <input type="checkbox" checked={hasExtraHelmet} onChange={(e) => setHasExtraHelmet(e.target.checked)} className="accent-orange-600" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Safety Helmet (+Rs 200/day)</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-gray-200 cursor-pointer">
                    <input type="checkbox" checked={hasPremiumJacket} onChange={(e) => setHasPremiumJacket(e.target.checked)} className="accent-orange-600" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Riding Jacket (+Rs 300/day)</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-gray-200 cursor-pointer">
                    <input type="checkbox" checked={hasGoproMount} onChange={(e) => setHasGoproMount(e.target.checked)} className="accent-orange-600" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Action Camera Mount (+Rs 100/day)</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-5">
                <h4 className="text-xs font-bold uppercase text-orange-600">Summary & Checkout</h4>
                
                {/* Promo Code Input */}
                <div className="bg-slate-50 border border-gray-200 p-3 rounded-lg flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Apply Promo Code (Try RIDE10 or HELLONEPAL)</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={promoInput} 
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-1.5 bg-white border border-gray-250 rounded text-xs outline-none focus:border-orange-500 uppercase font-semibold"
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded text-xs font-bold transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[10px] font-bold ${promoMessage.startsWith("❌") ? "text-red-500" : "text-green-600"}`}>
                      {promoMessage}
                    </p>
                  )}
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bike Model</span>
                    <span className="font-bold text-gray-850">{bike.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dates</span>
                    <span className="font-bold text-gray-850">{pickupDate} to {returnDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pickup location</span>
                    <span className="font-bold text-gray-850">{pickupLocation}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="text-gray-500">Base Fare ({totalDays} days)</span>
                    <span className="font-bold text-gray-855">Rs {baseCost}</span>
                  </div>
                  {totalAddons > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Add-ons total</span>
                      <span className="font-bold text-gray-855">Rs {totalAddons}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between font-bold text-green-600">
                      <span>Weekly Discount (10%)</span>
                      <span>- Rs {discountAmount}</span>
                    </div>
                  )}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between font-bold text-green-600">
                      <span>Promo Discount</span>
                      <span>- Rs {promoDiscount}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-black text-sm text-orange-600">
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
                      className={`py-2 px-1 border rounded-lg text-xs font-bold transition-all ${paymentMethod === "cod" ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-slate-50 border-gray-200 text-gray-600"}`}
                    >
                      Cash / COD
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod("esewa")}
                      className={`py-2 px-1 border rounded-lg text-xs font-bold transition-all ${paymentMethod === "esewa" ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-slate-50 border-gray-200 text-gray-600"}`}
                    >
                      eSewa
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod("khalti")}
                      className={`py-2 px-1 border rounded-lg text-xs font-bold transition-all ${paymentMethod === "khalti" ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-slate-50 border-gray-200 text-gray-600"}`}
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
          <div className="bg-slate-50 border-t border-gray-150 p-4 flex justify-between items-center">
            {currentStep > 1 ? (
              <button onClick={() => setCurrentStep(currentStep - 1)} className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg">
                Back
              </button>
            ) : (
              <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg">
                Cancel
              </button>
            )}

            {currentStep < 4 ? (
              <button onClick={validateAndNext} className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5">
                Continue <IconArrowRight />
              </button>
            ) : (
              <button onClick={handleFinalSubmit} disabled={isSubmitting} className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg transition-all shadow-sm">
                {isSubmitting ? "Processing..." : paymentMethod === "cod" ? "Book Ride Now" : "Pay & Book"}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ─── Main Collection Page ─── */
export default function Bikes() {
  const [selectedBike, setSelectedBike] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const fleetRef = useRef(null);

  // Filtering & Sorting States
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLocation, setActiveLocation] = useState("All");
  const [priceLimit, setPriceLimit] = useState(2000);
  const [sortOption, setSortOption] = useState("default");
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const [wishlistVersion, setWishlistVersion] = useState(0);

  const categories = ["All", "Cruiser", "Street", "Adventure", "Sport"];

  const handleCardClick = (bike) => {
    setSelectedBike(bike);
    setIsDetailsOpen(true);
  };

  const handleProceedToBook = (bike) => {
    setIsDetailsOpen(false);
    setTimeout(() => {
      setIsWizardOpen(true);
    }, 200);
  };

  useEffect(() => {
    const handleStorageChange = () => setWishlistVersion((v) => v + 1);
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getCategoryCount = (cat) => {
    let list = bikes;
    if (activeLocation !== "All") {
      list = list.filter(b => b.location.toLowerCase().includes(activeLocation.toLowerCase()));
    }
    if (cat === "All") return list.length;
    return list.filter(b => b.category === cat).length;
  };

  const filteredBikes = bikes.filter((bike) => {
    const matchesSearch = bike.name.toLowerCase().includes(searchText.toLowerCase()) || 
                           bike.category.toLowerCase().includes(searchText.toLowerCase()) ||
                           bike.location.toLowerCase().includes(searchText.toLowerCase());
                            
    const matchesCategory = activeCategory === "All" || bike.category === activeCategory;
    const matchesLocation = activeLocation === "All" || bike.location.toLowerCase().includes(activeLocation.toLowerCase());
    const matchesPrice = bike.price <= priceLimit;

    if (showSavedOnly) {
      const saved = JSON.parse(localStorage.getItem("savedBikes") || "[]");
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && saved.includes(bike.id);
    }

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  // Apply Sorting Options
  const sortedBikes = [...filteredBikes].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "rating") return b.rating - a.rating;
    return 0; // default
  });

  return (
    <div className="bg-slate-50 text-gray-800 min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 md:pt-32 md:pb-20 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 px-3 py-1.5 bg-orange-50 rounded-full">
            Our Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            Explore Our Rental Fleet
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Select from our range of cruiser, adventure, sport, and street motorcycles for your next ride.
          </p>
        </div>
      </section>

      {/* Fleet Catalog & Filters */}
      <section ref={fleetRef} className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filters Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            
            {/* Search Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch />
              </div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search name..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-lg outline-none text-sm focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>

            {/* Location Selector */}
            <div>
              <select 
                value={activeLocation}
                onChange={(e) => setActiveLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
              >
                <option value="All">All Locations</option>
                <option value="biratnagar">Biratnagar</option>
                <option value="belbari">Belbari</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 font-semibold text-gray-700"
              >
                <option value="default">Sort by Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated (★)</option>
              </select>
            </div>

            {/* Price Limit Slider */}
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
                  : "bg-slate-50 border-gray-200 text-gray-655 hover:text-red-500 hover:bg-red-50/20"
              }`}
            >
              ❤️ Saved Rides
            </button>
          </div>
        </div>

        {/* Catalog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBikes.length > 0 ? (
            sortedBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} onBook={handleCardClick} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200 p-8">
              <p className="text-base font-semibold">No bikes found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchText("");
                  setActiveCategory("All");
                  setActiveLocation("All");
                  setSortOption("default");
                  setPriceLimit(2000);
                  setShowSavedOnly(false);
                }}
                className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg"
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
        onClose={() => { setIsDetailsOpen(false); setSelectedBike(null); }} 
        onProceedToBook={handleProceedToBook}
      />

      {/* Booking Wizard Modal */}
      <BookingWizard 
        bike={selectedBike} 
        isOpen={isWizardOpen} 
        onClose={() => { setIsWizardOpen(false); setSelectedBike(null); }} 
      />
    </div>
  );
}