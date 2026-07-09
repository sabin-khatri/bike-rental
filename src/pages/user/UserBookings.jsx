/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const UserBookings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
      <div className="text-center py-12">
        <span className="text-5xl mb-4 block">📅</span>
        <h3 className="text-lg font-semibold text-gray-700">No past bookings found</h3>
        <p className="text-gray-500 mt-2">You don't have any past rental history yet.</p>
      </div>
    </motion.div>
  );
};

export default UserBookings;
