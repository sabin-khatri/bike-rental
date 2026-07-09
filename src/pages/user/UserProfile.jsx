// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-6 pb-6 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 shadow-md flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
            <p className="text-gray-500">{user?.role === 'admin' ? 'Administrator' : 'Rider'}</p>
          </div>
        </div>

        <form className="space-y-4 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" disabled value={user?.name || ""} className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" disabled value={user?.email || ""} className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-500" />
          </div>
          <button type="button" className="mt-4 px-6 py-2 bg-gray-100 text-gray-400 cursor-not-allowed rounded-lg font-medium text-sm">
            Update Profile (Disabled)
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default UserProfile;
