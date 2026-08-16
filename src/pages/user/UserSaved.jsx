/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { bikes } from "../../data/bikes";

const UserSaved = () => {
  const [savedList, setSavedList] = useState([]);

  const loadSaved = () => {
    const savedIds = JSON.parse(localStorage.getItem("savedBikes") || "[]");
    const matchedBikes = bikes.filter((bike) => savedIds.includes(bike.id));
    setSavedList(matchedBikes);
  };

  useEffect(() => {
    loadSaved();

    // Keep this list in sync if the wishlist changes elsewhere (e.g. Bikes catalog page)
    const handleWishlistChange = () => loadSaved();
    window.addEventListener("storage", handleWishlistChange);
    window.addEventListener("wishlist-updated", handleWishlistChange);
    return () => {
      window.removeEventListener("storage", handleWishlistChange);
      window.removeEventListener("wishlist-updated", handleWishlistChange);
    };
  }, []);

  const handleRemove = (bikeId) => {
    const savedIds = JSON.parse(localStorage.getItem("savedBikes") || "[]");
    const updated = savedIds.filter((id) => id !== bikeId);
    localStorage.setItem("savedBikes", JSON.stringify(updated));
    setSavedList((prev) => prev.filter((b) => b.id !== bikeId));

    // Notify other mounted components (e.g. Bikes catalog "Saved Rides" filter) in the same tab
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-950">Saved Bikes</h2>
        <span className="text-xs font-semibold text-gray-500">{savedList.length} bookmarked</span>
      </div>

      {savedList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AnimatePresence>
            {savedList.map((bike) => (
              <motion.div
                key={bike.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between bg-slate-50"
              >
                <div className="relative h-40 bg-white flex items-center justify-center p-4 border-b border-gray-200">
                  <img src={bike.image} alt={bike.name} className="h-full object-contain" />
                  <button
                    onClick={() => handleRemove(bike.id)}
                    aria-label={`Remove ${bike.name} from saved bikes`}
                    title="Remove from Saved"
                    className="absolute top-2 right-2 w-7 h-7 bg-red-50 hover:bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight">{bike.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">📍 {bike.location} • Rate: Rs {bike.price}/day</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/bikes"
                      className="flex-1 text-center py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-all active:scale-95"
                    >
                      Rent Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">❤️</span>
          <h3 className="text-base font-bold text-gray-700">No saved bikes yet</h3>
          <p className="text-gray-500 text-sm mt-1 mb-6">Explore our catalog and bookmark bikes to easily book them later.</p>
          <Link
            to="/bikes"
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all font-semibold text-xs shadow-sm active:scale-95"
          >
            Browse Catalogue
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default UserSaved;