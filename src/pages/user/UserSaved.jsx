/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UserSaved = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Bikes</h2>
      <div className="text-center py-12">
        <span className="text-5xl mb-4 block">❤️</span>
        <h3 className="text-lg font-semibold text-gray-700">No bikes saved yet</h3>
        <p className="text-gray-500 mt-2 mb-6">Explore our collection and save your favorite bikes for later.</p>
        <Link to="/bikes" className="px-6 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors font-medium">
          Browse Bikes
        </Link>
      </div>
    </motion.div>
  );
};

export default UserSaved;
