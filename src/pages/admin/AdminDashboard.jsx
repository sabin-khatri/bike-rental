import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, trend, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
  >
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      <p className={`text-sm mt-2 font-medium ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend} from last month
      </p>
    </div>
    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${color}`}>
      {icon}
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
        <p className="text-gray-500">Welcome to your admin dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1,248" icon="👥" trend="+12%" color="bg-blue-100 text-blue-600" />
        <StatCard title="Active Bikes" value="142" icon="🚲" trend="+5%" color="bg-green-100 text-green-600" />
        <StatCard title="Total Bookings" value="8,405" icon="📅" trend="+18%" color="bg-purple-100 text-purple-600" />
        <StatCard title="Revenue" value="$42.5k" icon="💰" trend="+8%" color="bg-orange-100 text-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">John Doe {i}</p>
                    <p className="text-sm text-gray-500">Mountain Bike X-{i}00</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">Active</p>
                  <p className="text-sm text-gray-500">Today, 10:00 AM</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-4">System Alerts</h3>
           <div className="space-y-4">
             <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-start space-x-3">
               <span className="text-xl">⚠️</span>
               <div>
                 <p className="font-bold">Low inventory: Electric Bikes</p>
                 <p className="text-sm mt-1">Only 2 electric bikes available in downtown location.</p>
               </div>
             </div>
             <div className="p-4 bg-blue-50 text-blue-700 rounded-xl flex items-start space-x-3">
               <span className="text-xl">ℹ️</span>
               <div>
                 <p className="font-bold">System Maintenance</p>
                 <p className="text-sm mt-1">Scheduled maintenance at 2:00 AM tonight.</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
