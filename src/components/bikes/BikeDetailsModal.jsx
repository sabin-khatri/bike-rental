import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BikeDetailsModal = ({ isOpen, onClose, bike, onProceedToBook }) => {
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    if (bike?.id) {
      const defaultReviews = [
        { name: "Biraj M.", text: "Super smooth engine. The suspension is great for off-road routes.", rating: 5, date: "2026-08-01" },
        { name: "Kiran S.", text: "Comfortable riding posture. Good value for money.", rating: 4, date: "2026-08-03" }
      ];
      const savedReviews = JSON.parse(localStorage.getItem(`reviews_bike_${bike.id}`) || "null");
      if (savedReviews) {
        setReviews(savedReviews);
      } else {
        setReviews(defaultReviews);
        localStorage.setItem(`reviews_bike_${bike.id}`, JSON.stringify(defaultReviews));
      }
    }
  }, [bike]);

  if (!isOpen || !bike) return null;

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newReviewItem = {
      name: "You (Rider)",
      text: newReviewText,
      rating: Number(newReviewRating),
      date: new Date().toISOString().split("T")[0]
    };

    const updatedReviews = [newReviewItem, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_bike_${bike.id}`, JSON.stringify(updatedReviews));

    setNewReviewText("");
    setNewReviewRating(5);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-xl relative border border-gray-200 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors z-10 font-bold"
          >
            ✕
          </button>

          {/* Left Panel: Bike Image & Reviews */}
          <div className="w-full md:w-1/2 flex flex-col border-r border-gray-150 overflow-y-auto p-6 space-y-6">
            <div className="relative h-48 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-gray-150">
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-full object-contain p-2"
              />
              {bike.popular && (
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-orange-600 text-white text-[9px] font-bold rounded shadow uppercase tracking-wider">
                  Popular
                </span>
              )}
            </div>

            {/* Rider Reviews Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-950 uppercase tracking-wider">Rider Reviews</h3>
              
              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="space-y-2 border border-gray-200 p-3 rounded-lg bg-slate-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Write a Review</p>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Share your ride experience..."
                    className="flex-1 px-2.5 py-1.5 bg-white border border-gray-250 rounded text-xs outline-none focus:border-orange-500"
                  />
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="px-1.5 py-1.5 bg-white border border-gray-250 rounded text-xs outline-none focus:border-orange-500 font-bold text-amber-500"
                  >
                    <option value="5">★ 5</option>
                    <option value="4">★ 4</option>
                    <option value="3">★ 3</option>
                    <option value="2">★ 2</option>
                    <option value="1">★ 1</option>
                  </select>
                </div>
                <button type="submit" className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded text-[10px] font-bold uppercase transition-all">
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {reviews.map((r, index) => (
                  <div key={index} className="p-2 border-b border-gray-100 text-xs">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-gray-950">{r.name}</span>
                      <span className="text-amber-500 font-bold">{"★".repeat(r.rating)}</span>
                    </div>
                    <p className="text-gray-500 mt-1 leading-relaxed">{r.text}</p>
                    <span className="text-[9px] text-gray-400 block mt-0.5">{r.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Detailed Info & Booking */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
            <div className="space-y-4">
              <span className="px-2.5 py-1 bg-orange-50 text-orange-600 text-[9px] font-bold rounded uppercase tracking-wider border border-orange-100/50">
                {bike.category}
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-950 mt-1">
                {bike.name}
              </h2>

              {/* Rating & Location */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1 text-yellow-500">
                  <span>★</span>
                  <span className="text-gray-700 font-bold">{bike.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>{bike.location}</span>
                </div>
              </div>

              {/* Specs Grid */}
              <h4 className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2 pt-2 border-t border-gray-100">Specifications</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 p-2.5 rounded-lg text-center border border-gray-200">
                  <span className="block text-[9px] text-gray-400 uppercase font-semibold">Engine</span>
                  <span className="font-bold text-xs text-gray-700">{bike.specs?.engine || "N/A"}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg text-center border border-gray-200">
                  <span className="block text-[9px] text-gray-400 uppercase font-semibold">Mileage</span>
                  <span className="font-bold text-xs text-gray-700">{bike.specs?.mileage || "N/A"}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg text-center border border-gray-200">
                  <span className="block text-[9px] text-gray-400 uppercase font-semibold">Weight</span>
                  <span className="font-bold text-xs text-gray-700">{bike.specs?.weight || "N/A"}</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex items-center justify-between mt-4">
                <span className="text-xs font-bold text-orange-650 uppercase">Daily Rate</span>
                <div>
                  <span className="text-xl font-black text-orange-600">
                    Rs {bike.price}
                  </span>
                  <span className="text-gray-550 text-xs font-semibold ml-1">/day</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button 
                onClick={() => onProceedToBook(bike)} 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold text-sm transition-all shadow shadow-orange-500/10 active:scale-98"
              >
                Book This Ride Now
              </button>
              <button 
                onClick={onClose} 
                className="w-full bg-gray-105 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold text-xs transition-all active:scale-98 border border-gray-200"
              >
                Go Back
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BikeDetailsModal;
