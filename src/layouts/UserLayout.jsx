import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const UserLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "My Dashboard", path: "/user/dashboard", icon: "📊" },
    { name: "My Bookings", path: "/user/bookings", icon: "📅" },
    { name: "Saved Bikes", path: "/user/saved", icon: "❤️" },
    { name: "Profile", path: "/user/profile", icon: "👤" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        className="w-64 bg-white shadow-xl flex flex-col z-20"
      >
        <div className="p-6 flex items-center justify-center border-b border-gray-100">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent cursor-pointer">
            Bike Rental
          </Link>
        </div>
        
        <div className="px-6 py-8 text-center border-b border-gray-100">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 shadow-md flex items-center justify-center text-white text-3xl font-bold mb-3">
            {user?.name?.charAt(0) || "U"}
          </div>
          <h3 className="font-semibold text-gray-800">{user?.name || "User"}</h3>
          <p className="text-xs text-gray-500">{user?.email}</p>
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
          <h1 className="text-xl font-semibold text-gray-800">User Area</h1>
          <div className="flex items-center space-x-4">
             <Link to="/bikes" className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors font-medium text-sm">
                Rent a Bike
             </Link>
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

export default UserLayout;
