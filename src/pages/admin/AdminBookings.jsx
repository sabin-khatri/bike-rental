import { motion } from "framer-motion";

const AdminBookings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Bookings</h2>
      <div className="text-center py-12">
        <span className="text-5xl mb-4 block">📅</span>
        <h3 className="text-lg font-semibold text-gray-700">Booking History</h3>
        <p className="text-gray-500 mt-2">A comprehensive list of all bookings will appear here.</p>
      </div>
    </motion.div>
  );
};

export default AdminBookings;
