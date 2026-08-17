import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeBooking, setActiveBooking] = useState(null);
  const [stats, setStats] = useState({
    totalRides: 0,
    totalSpent: 0,
    membershipTier: "Standard Explorer"
  });

  useEffect(() => {
    if (user?.email) {
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const userBookings = allBookings.filter(b => b.email === user.email);
      
      const totalRides = userBookings.length;
      const totalSpent = userBookings
        .filter(b => b.status !== "Cancelled")
        .reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);

      let membershipTier = "Standard Explorer";
      if (totalRides >= 5) {
        membershipTier = "Elite Rider (10% Discount Active)";
      } else if (totalRides >= 2) {
        membershipTier = "Himalayan Voyager";
      }

      setStats({ totalRides, totalSpent, membershipTier });

      // Find first active/confirmed booking
      const current = userBookings.find(b => 
        b.status === "Active" || b.status === "Confirmed" || b.status === "Pending" || !b.status
      );

      setActiveBooking(current || userBookings[userBookings.length - 1] || null);
    }
  }, [user]);

  const getStatusStyle = (status = "Pending") => {
    switch (status.toLowerCase()) {
      case "active":
      case "confirmed":
        return "bg-green-100 text-green-800 border border-green-200";
      case "completed":
        return "bg-slate-100 text-slate-700 border border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border border-red-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    }
  };

  // Loyalty goals helper
  const getLoyaltyProgress = () => {
    if (stats.totalRides >= 5) return { pct: 100, next: "Max Level Reached 🎉", needed: 0 };
    if (stats.totalRides >= 2) {
      const needed = 5 - stats.totalRides;
      const pct = Math.round((stats.totalRides / 5) * 100);
      return { pct, next: "Elite Rider Status", needed };
    }
    const needed = 2 - stats.totalRides;
    const pct = Math.round((stats.totalRides / 2) * 100);
    return { pct, next: "Himalayan Voyager Status", needed };
  };

  const loyalty = getLoyaltyProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Welcome back, {user?.name || "Rider"}! 👋</h2>
          <p className="text-orange-100 text-xs sm:text-sm max-w-md">Ready for your next adventure? Check out our fleet or extend your current active rides.</p>
          <div className="pt-2">
            <Link to="/bikes" className="bg-white text-orange-600 px-5 py-2.5 rounded-lg font-bold hover:bg-orange-50 transition-colors shadow-sm inline-block text-xs">
              Explore Fleet
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dynamic Booking Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 col-span-1 md:col-span-2 space-y-6">
          {activeBooking ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">Latest Rental Details</h3>
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${getStatusStyle(activeBooking.status)}`}>
                  {activeBooking.status || "Pending"}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-full sm:w-1/3 h-28 bg-orange-50 rounded-xl flex flex-col items-center justify-center border border-orange-100">
                  <span className="text-3xl mb-1">🏍️</span>
                  <span className="text-[9px] font-bold text-orange-605 uppercase tracking-wider">Ride Info</span>
                </div>
                <div className="flex-1 space-y-3">
                  <h4 className="text-lg font-bold text-gray-900">{activeBooking.bikeName}</h4>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
                    <div>
                      <p className="text-gray-400 font-semibold text-[9px] uppercase tracking-wider">Pickup Point</p>
                      <p className="text-gray-700 font-semibold mt-0.5">{activeBooking.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-semibold text-[9px] uppercase tracking-wider">Total Price</p>
                      <p className="text-gray-700 font-semibold mt-0.5">Rs {activeBooking.totalPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-semibold text-[9px] uppercase tracking-wider">Start Date</p>
                      <p className="text-gray-700 font-semibold mt-0.5">{activeBooking.pickupDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-semibold text-[9px] uppercase tracking-wider">Return Date</p>
                      <p className="text-gray-700 font-semibold mt-0.5">{activeBooking.returnDate}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                    <p className="text-gray-455">Payment: <span className="uppercase text-orange-600 font-bold">{activeBooking.paymentMethod}</span></p>
                    <Link to="/user/bookings" className="font-bold text-orange-655 hover:text-orange-700 transition-colors">
                      View Booking History &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <span className="text-4xl mb-3">🏔️</span>
              <h4 className="text-base font-bold text-gray-800">No Rental Bookings Yet</h4>
              <p className="text-gray-500 text-xs mt-1 max-w-xs">You haven't rented any bikes yet. Head over to the catalogue to book your first bike!</p>
              <Link to="/bikes" className="mt-4 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors">
                Book a Ride
              </Link>
            </div>
          )}

          {/* Loyalty progress tracker */}
          <div className="border-t border-gray-100 pt-5 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-gray-500">
              <span>Loyalty Club Milestone</span>
              <span className="text-orange-600 font-bold">{loyalty.next}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-orange-600 h-full transition-all duration-500"
                style={{ width: `${loyalty.pct}%` }}
              />
            </div>
            {loyalty.needed > 0 && (
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                🔥 Complete {loyalty.needed} more rental{loyalty.needed > 1 ? "s" : ""} to unlock higher discount bonuses!
              </p>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-lg shrink-0">
              🛣️
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Bookings</p>
              <p className="text-lg font-bold text-gray-800">{stats.totalRides} Rides</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-lg shrink-0">
              💸
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Expenses</p>
              <p className="text-lg font-bold text-gray-800">Rs {stats.totalSpent?.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-lg shrink-0">
              🎖️
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Loyalty Rank</p>
              <p className="text-xs font-bold text-gray-850 leading-tight mt-0.5">{stats.membershipTier}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
