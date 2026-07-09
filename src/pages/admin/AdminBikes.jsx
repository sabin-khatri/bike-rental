import { motion } from "framer-motion";

const AdminBikes = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Bikes</h2>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium text-sm transition-colors">
          + Add New Bike
        </button>
      </div>
      <div className="text-center py-12">
        <span className="text-5xl mb-4 block">🚲</span>
        <h3 className="text-lg font-semibold text-gray-700">Bike Inventory</h3>
        <p className="text-gray-500 mt-2">Bike management table will appear here once connected to the backend.</p>
      </div>
    </motion.div>
  );
};

export default AdminBikes;
