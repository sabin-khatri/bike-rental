/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
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

      // Determine membership tier based on bookings count
      let membershipTier = "Standard Explorer";
      if (totalRides >= 5) {
        membershipTier = "Elite Rider (10% Discount Active)";
      } else if (totalRides >= 2) {
        membershipTier = "Himalayan Voyager";
      }

      setStats({ totalRides, totalSpent, membershipTier });

      // Find first non-completed, non-cancelled booking (Active, Confirmed, Pending)
      const current = userBookings.find(b => 
        b.status === "Active" || b.status === "Confirmed" || b.status === "Pending" || !b.status
      );

      // Fallback to last booking if none active
      setActiveBooking(current || userBookings[userBookings.length - 1] || null);
    }
  }, [user]);

  // Status badge styling helper
  const getStatusStyle = (status = "Pending") => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-150 text-green-700 border border-green-200";
      case "confirmed":
        return "bg-blue-150 text-blue-700 border border-blue-200";
      case "completed":
        return "bg-emerald-150 text-emerald-700 border border-emerald-200";
      case "cancelled":
        return "bg-red-150 text-red-750 border border-red-200";
      case "pending":
      default:
        return "bg-yellow-150 text-yellow-750 border border-yellow-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-650 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">Welcome back, {user?.name || "Rider"}! 👋</h2>
          <p className="text-orange-100 mb-6 max-w-md">Ready for your next adventure? Check out our fleet or extend your current active rides.</p>
          <Link to="/bikes" className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-md inline-block text-sm">
            Explore Bikes
          </Link>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-20">
          <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dynamic Booking Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 col-span-1 md:col-span-2">
          {activeBooking ? (
            <>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-black text-gray-800">Latest Rental Details</h3>
                <span className={`px-3 py-1 text-xs font-black rounded-full uppercase tracking-wider ${getStatusStyle(activeBooking.status)}`}>
                  {activeBooking.status || "Pending"}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/3 h-32 bg-purple-50/50 rounded-2xl flex flex-col items-center justify-center border border-purple-100/20">
                  <span className="text-4xl mb-1">🏍️</span>
                  <span className="text-[10px] font-black text-purple-650 uppercase tracking-widest">Rental Active</span>
                </div>
                <div className="flex-1 space-y-3">
                  <h4 className="text-xl font-black text-gray-900">{activeBooking.bikeName}</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs font-bold text-gray-500">
                    <div>
                      <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Pickup Point</p>
                      <p className="text-gray-700 mt-0.5">{activeBooking.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Total Price</p>
                      <p className="text-gray-700 mt-0.5">Rs {activeBooking.totalPrice?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Start Date</p>
                      <p className="text-gray-700 mt-0.5">{activeBooking.pickupDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">Return Date</p>
                      <p className="text-gray-700 mt-0.5">{activeBooking.returnDate}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                    <p className="text-gray-450 font-semibold">Payment: <span className="uppercase text-purple-600 font-black">{activeBooking.paymentMethod}</span></p>
                    <Link to="/user/bookings" className="font-extrabold text-orange-600 hover:text-orange-700 transition-colors">
                      View All Bookings &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <span className="text-5xl mb-4">🏔️</span>
              <h4 className="text-lg font-black text-gray-700">No Rental Bookings Yet</h4>
              <p className="text-gray-550 text-sm mt-1 max-w-sm">You haven't rented any bikes yet. Head over to the catalogue to book your first bike!</p>
              <Link to="/bikes" className="mt-4 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow transition-colors">
                Book a Ride Now
              </Link>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
              🛣️
            </div>
            <div>
              <p className="text-xs text-gray-400 font-black uppercase tracking-wider">Total Bookings</p>
              <p className="text-2xl font-black text-gray-800">{stats.totalRides} Rides</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-xl shrink-0">
              💸
            </div>
            <div>
              <p className="text-xs text-gray-400 font-black uppercase tracking-wider">Total Expenses</p>
              <p className="text-2xl font-black text-gray-800">Rs {stats.totalSpent?.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-xl shrink-0">
              🎖️
            </div>
            <div>
              <p className="text-xs text-gray-400 font-black uppercase tracking-wider">Loyalty Rank</p>
              <p className="text-sm font-black text-gray-800 leading-tight">{stats.membershipTier}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;


