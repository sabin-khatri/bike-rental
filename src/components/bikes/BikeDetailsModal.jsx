// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const BikeDetailsModal = ({ isOpen, onClose, bike }) => {
  if (!isOpen || !bike) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            ✕
          </button>
          <div className="p-8">
             <h2 className="text-2xl font-bold mb-4">{bike.name || "Bike Details"}</h2>
             <p className="text-gray-600 mb-6">Enjoy your ride with this amazing bike!</p>
             <button onClick={onClose} className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
               Close
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BikeDetailsModal;
