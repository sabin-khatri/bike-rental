import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const IconMapPin = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconStar = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-7-7l7 7-7 7" />
  </svg>
);

const IconHeart = ({ filled }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export default function BikeCard({ bike, onBook }) {
  const [isSaved, setIsSaved] = useState(false);

  // Sync saved state with localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedBikes") || "[]");
    setIsSaved(saved.includes(bike.id));
  }, [bike.id]);

  const toggleSave = (e) => {
    e.stopPropagation(); // Avoid triggering card click
    const saved = JSON.parse(localStorage.getItem("savedBikes") || "[]");
    let updated;
    if (saved.includes(bike.id)) {
      updated = saved.filter(id => id !== bike.id);
    } else {
      updated = [...saved, bike.id];
    }
    localStorage.setItem("savedBikes", JSON.stringify(updated));
    setIsSaved(!isSaved);
  };

  return (
    <motion.div
      onClick={() => onBook && onBook(bike)}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-250 bg-white p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
        {bike.popular && (
          <span className="px-2.5 py-1 bg-orange-600 text-white text-[9px] font-bold rounded uppercase tracking-wider shadow">
            Popular
          </span>
        )}
        <span className="px-2.5 py-1 bg-slate-900 text-white text-[9px] font-bold rounded uppercase tracking-wider">
          {bike.category}
        </span>
      </div>

      {/* Save Button */}
      <button
        onClick={toggleSave}
        className={`absolute top-6 right-6 z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
          isSaved ? "bg-red-50 border-red-200 text-red-500" : "bg-white/80 backdrop-blur-sm border-gray-200 text-gray-500 hover:text-red-500"
        }`}
      >
        <IconHeart filled={isSaved} />
      </button>

      {/* Image Container - Adjusted to prevent cropping (object-contain with white bg) */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center border border-gray-100">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Info Details */}
      <div className="pt-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-base font-bold text-gray-900 leading-tight">
              {bike.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-amber-500">
              <IconStar />
              <span className="font-bold text-xs text-gray-700">{bike.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <IconMapPin />
            <span>{bike.location}</span>
          </div>

          {/* Specs tags */}
          {bike.specs && (
            <div className="grid grid-cols-3 gap-1.5 py-2 px-2 bg-slate-50 rounded-lg mb-4 text-center border border-gray-100">
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-semibold">Engine</p>
                <p className="text-xs font-bold text-gray-700">{bike.specs.engine}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-semibold">Mileage</p>
                <p className="text-xs font-bold text-gray-700">{bike.specs.mileage}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-semibold">Weight</p>
                <p className="text-xs font-bold text-gray-700">{bike.specs.weight}</p>
              </div>
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase">Rate</p>
            <p className="text-base font-black text-orange-650">Rs {bike.price}/day</p>
          </div>
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1 shadow-sm">
            <span>Book</span>
            <IconArrowRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
