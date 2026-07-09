import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Manage Bikes", path: "/admin/bikes", icon: "🚲" },
    { name: "Manage Users", path: "/admin/users", icon: "👥" },
    { name: "Bookings", path: "/admin/bookings", icon: "📅" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        className="w-64 bg-white shadow-xl flex flex-col"
      >
        <div className="p-6 flex items-center justify-center border-b border-gray-100">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-orange-50 text-orange-600 font-medium" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-orange-500"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors duration-200"
          >
            <span>🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10 px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm text-orange-600 hover:text-orange-700 font-medium">View Site</Link>
            <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-500 flex items-center justify-center text-orange-700 font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
