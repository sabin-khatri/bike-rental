// eslint-disable-next-line no-unused-vars
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const BikeDetailsModal = ({ isOpen, onClose, bike, onProceedToBook }) => {
  if (!isOpen || !bike) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative border border-gray-150 dark:border-slate-800 transition-colors duration-300"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors z-10 font-bold"
          >
            ✕
          </button>

          <div className="flex flex-col md:flex-row h-full">
            {/* Left: Bike Image (Hero Area) */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-100 dark:bg-slate-800">
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r" />
              {bike.popular && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-black rounded-full shadow-md uppercase tracking-wider">
                  Popular
                </span>
              )}
            </div>

            {/* Right: Detailed Info */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 text-[10px] font-black rounded-full uppercase tracking-widest">
                  {bike.category}
                </span>

                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mt-3 mb-2 leading-tight">
                  {bike.name}
                </h2>

                {/* Rating & Location */}
                <div className="flex items-center gap-4 text-xs font-bold text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span>★</span>
                    <span className="text-gray-600 dark:text-gray-300 font-extrabold">{bike.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{bike.location}</span>
                  </div>
                </div>

                {/* Specs Grid */}
                <h4 className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-3">Specifications</h4>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-gray-50 dark:bg-slate-800/60 p-2.5 rounded-2xl text-center border border-gray-100 dark:border-slate-800/40">
                    <span className="block text-[9px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-wider">Engine</span>
                    <span className="font-extrabold text-xs text-gray-800 dark:text-gray-200">{bike.specs?.engine || "N/A"}</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/60 p-2.5 rounded-2xl text-center border border-gray-100 dark:border-slate-800/40">
                    <span className="block text-[9px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-wider">Mileage</span>
                    <span className="font-extrabold text-xs text-gray-800 dark:text-gray-200">{bike.specs?.mileage || "N/A"}</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/60 p-2.5 rounded-2xl text-center border border-gray-100 dark:border-slate-800/40">
                    <span className="block text-[9px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-wider">Weight</span>
                    <span className="font-extrabold text-xs text-gray-800 dark:text-gray-200">{bike.specs?.weight || "N/A"}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-purple-50/50 dark:bg-purple-950/10 p-4 rounded-2xl border border-purple-100/30 dark:border-purple-900/10 mb-6 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Rate</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-purple-600 dark:text-purple-450">
                      Rs {bike.price}
                    </span>
                    <span className="text-gray-550 dark:text-gray-400 text-xs font-semibold ml-1">/day</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 mt-4">
                <button 
                  onClick={() => onProceedToBook(bike)} 
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-2xl font-extrabold text-sm transition-all shadow shadow-purple-500/20 active:scale-98"
                >
                  Book This Ride Now
                </button>
                <button 
                  onClick={onClose} 
                  className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 py-3.5 rounded-2xl font-extrabold text-xs transition-all active:scale-98"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BikeDetailsModal;
