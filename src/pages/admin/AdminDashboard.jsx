import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between"
  >
    <div>
      <p className="text-xs font-semibold text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${color}`}>
      {icon}
    </div>
  </motion.div>
);

/* ─── Advanced SVG Chart Component ─── */
function RevenueTrendChart({ bookings }) {
  // Mock trend data if no bookings exist
  const dataPoints = bookings.length >= 2 
    ? bookings.slice(-5).map((b, i) => ({ x: i * 60 + 20, y: Math.max(20, 100 - (Number(b.totalPrice) / 40)) }))
    : [
        { x: 20, y: 80 },
        { x: 80, y: 70 },
        { x: 140, y: 40 },
        { x: 200, y: 60 },
        { x: 260, y: 20 }
      ];

  // Formulate path coordinates string
  const pathString = dataPoints.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, "");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-250">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase">Gross Revenue Trend</h3>
          <p className="text-[10px] text-gray-450 font-semibold mt-0.5">Real-time booking revenue progression curve</p>
        </div>
        <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded border border-green-200">
          Live Sync
        </span>
      </div>

      <div className="relative h-32 w-full bg-slate-50 rounded-xl border border-gray-150 p-2 flex items-center justify-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="80" x2="300" y2="80" stroke="#f1f5f9" strokeWidth="1" />

          {/* Trend Line */}
          <motion.path
            d={pathString}
            fill="none"
            stroke="#ea580c"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Scatter dots */}
          {dataPoints.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="4.5"
              fill="#ffffff"
              stroke="#ea580c"
              strokeWidth="2.5"
            />
          ))}
        </svg>
      </div>
      <div className="flex justify-between text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-2.5 px-2">
        <span>Prev Period</span>
        <span>Peak Sales</span>
        <span>Latest Cycle</span>
      </div>
    </div>
  );
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBikes: 0,
    totalBookings: 0,
    revenue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [rawBookings, setRawBookings] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setRawBookings(bookings);

    const rev = bookings
      .filter(b => b.status !== "Cancelled")
      .reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);

    const customBikes = JSON.parse(localStorage.getItem("customBikes") || "[]");
    const totalBikes = 5 + customBikes.length;

    setStats({
      totalUsers: users.length || 2,
      totalBikes,
      totalBookings: bookings.length,
      revenue: rev
    });

    setRecentBookings(bookings.slice(-3).reverse());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-950">Overview Dashboard</h2>
        <p className="text-xs text-gray-500 mt-1">Live administration metrics and system controls</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Registered Riders" value={stats.totalUsers} icon="👥" color="bg-orange-50 text-orange-600" />
        <StatCard title="Active Fleet Size" value={stats.totalBikes} icon="🏍️" color="bg-orange-50 text-orange-600" />
        <StatCard title="Total Bookings" value={stats.totalBookings} icon="📅" color="bg-orange-50 text-orange-600" />
        <StatCard title="Total Revenue" value={`Rs ${stats.revenue.toLocaleString()}`} icon="💰" color="bg-orange-50 text-orange-600" />
      </div>

      {/* Interactive Line Chart Integration */}
      <RevenueTrendChart bookings={rawBookings} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings Mini List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-250">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase">Recent Booking Requests</h3>
            <Link to="/admin/bookings" className="text-xs text-orange-600 font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentBookings.length > 0 ? (
              recentBookings.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs">
                  <div className="space-y-0.5">
                    <p className="font-bold text-gray-900">{b.bikeName}</p>
                    <p className="text-[10px] text-gray-400 font-semibold">{b.email} • {b.pickupLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">Rs {b.totalPrice}</p>
                    <span className="text-[9px] text-gray-400 font-semibold">{b.status || "Pending"}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-450 text-xs font-semibold">
                No bookings registered yet.
              </div>
            )}
          </div>
        </div>

        {/* System Warnings / Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-250">
          <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 pb-2 border-b border-gray-100">Active System alerts</h3>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50/50 text-orange-850 rounded-xl flex items-start space-x-3 text-xs border border-orange-200/50">
              <span className="text-lg">📢</span>
              <div>
                <p className="font-bold">License Verification Pending</p>
                <p className="text-gray-500 mt-0.5 leading-relaxed">Rider licenses have been uploaded. Review profiles to verify document credentials.</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 text-gray-800 rounded-xl flex items-start space-x-3 text-xs border border-gray-200">
              <span className="text-lg">⚙️</span>
              <div>
                <p className="font-bold">Automated Database Backups</p>
                <p className="text-gray-500 mt-0.5 leading-relaxed">Scheduled local storage updates completed successfully.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
