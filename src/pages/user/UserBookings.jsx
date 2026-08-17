import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const UserBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = () => {
    if (user?.email) {
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const userBookings = allBookings.filter(b => b.email === user.email);
      const reversed = userBookings.reverse();
      setBookings(reversed);
      if (reversed.length > 0 && !selectedBooking) {
        setSelectedBooking(reversed[0]);
      } else if (selectedBooking) {
        const synced = reversed.find(b => b.id === selectedBooking.id);
        if (synced) setSelectedBooking(synced);
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancelBooking = (bookingId) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this motorcycle rental booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Cancel It"
    }).then((result) => {
      if (result.isConfirmed) {
        const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        const updated = allBookings.map(b => {
          if (b.id === bookingId) {
            return { ...b, status: "Cancelled" };
          }
          return b;
        });
        localStorage.setItem("bookings", JSON.stringify(updated));
        fetchBookings();
        Swal.fire({
          icon: "success",
          title: "Cancelled!",
          text: "Your reservation has been cancelled.",
          confirmButtonColor: "#EA580C"
        });
      }
    });
  };

  const getStatusBadgeColor = (status = "Pending") => {
    switch (status.toLowerCase()) {
      case "active":
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-slate-100 text-slate-800 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-250";
    }
  };

  const getStepStatus = (stepIndex, status = "Pending") => {
    if (status.toLowerCase() === "cancelled") return "cancelled";
    
    const activeSteps = {
      pending: 1,
      confirmed: 3,
      active: 5,
      completed: 6
    };
    const currentActiveStep = activeSteps[status.toLowerCase()] || 1;

    if (stepIndex < currentActiveStep) return "completed";
    if (stepIndex === currentActiveStep) return "active";
    return "upcoming";
  };

  const hasActiveOrConfirmed = bookings.some(
    b => b.status === "Active" || b.status === "Confirmed"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Simulated Email Expiry Alerts Dispatcher Panel */}
      {hasActiveOrConfirmed && (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl text-xs space-y-3 shadow-sm">
          <h4 className="font-bold text-orange-850 flex items-center gap-1.5">
            <span>✉️</span> Simulated Rider Alert Notification Center
          </h4>
          <p className="text-gray-600 leading-relaxed">
            The platform is configured to send automatic warning emails to <strong>{user?.email}</strong> exactly <strong>1 hour before</strong> the return duration expires.
          </p>
          <div className="bg-white p-3 rounded-lg border border-orange-100 flex items-start gap-2.5">
            <span className="text-green-600 font-bold">✓</span>
            <div>
              <p className="font-bold text-gray-900">Email Warning Sent: Return Deadline Approaching</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Dispatched warning alert: "Your rental duration expires in 1 hour. Please plan return."</p>
            </div>
          </div>
        </div>
      )}

      {/* Booking List card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-950">My Booking History</h2>
          <span className="text-xs font-semibold text-gray-500">{bookings.length} reservations</span>
        </div>

        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-gray-500">
              <thead className="bg-slate-50 text-xs uppercase font-bold text-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 border-b border-gray-150">Order ID</th>
                  <th scope="col" className="px-4 py-3 border-b border-gray-150">Bike Model</th>
                  <th scope="col" className="px-4 py-3 border-b border-gray-150">Dates</th>
                  <th scope="col" className="px-4 py-3 border-b border-gray-150">Price</th>
                  <th scope="col" className="px-4 py-3 border-b border-gray-150">Status</th>
                  <th scope="col" className="px-4 py-3 border-b border-gray-150 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {bookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    onClick={() => setSelectedBooking(booking)}
                    className={`hover:bg-slate-50/50 cursor-pointer transition-colors ${selectedBooking?.id === booking.id ? "bg-orange-50/20" : ""}`}
                  >
                    <td className="px-4 py-4 font-bold text-gray-900 border-b border-gray-100">{booking.id}</td>
                    <td className="px-4 py-4 font-semibold text-gray-900 border-b border-gray-100">{booking.bikeName}</td>
                    <td className="px-4 py-4 border-b border-gray-100 text-xs">
                      <div>{booking.pickupDate}</div>
                      <div className="text-gray-400">to {booking.returnDate}</div>
                    </td>
                    <td className="px-4 py-4 font-bold text-orange-600 border-b border-gray-100">Rs {booking.totalPrice}</td>
                    <td className="px-4 py-4 border-b border-gray-100">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeColor(booking.status)}`}>
                        {booking.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-b border-gray-100 text-right" onClick={(e) => e.stopPropagation()}>
                      {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-2.5 py-1 text-xs border border-red-200 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">📅</span>
            <h3 className="text-base font-bold text-gray-700">No Rental History Found</h3>
            <p className="text-gray-500 text-sm mt-1">Select and book a motorcycle to start riding!</p>
          </div>
        )}
      </div>

      {/* Live Booking Tracker Widget */}
      {selectedBooking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200"
        >
          <div className="border-b border-gray-150 pb-4 mb-6">
            <h3 className="text-base font-bold text-gray-950">Booking Tracker</h3>
            <p className="text-xs text-gray-500 mt-0.5">Tracking Order: <span className="font-bold text-gray-800">{selectedBooking.id}</span> ({selectedBooking.bikeName})</p>
          </div>

          {selectedBooking.status === "Cancelled" ? (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2">
              <span>⚠️</span> This booking has been cancelled. No tracker statistics available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative">
              {[
                { label: "Placed", desc: "Order submitted" },
                { label: "Docs Verified", desc: "License & ID checked" },
                { label: "Deposit Hold", desc: "Secured payment" },
                { label: "Bike Prepped", desc: "Inspection & wash" },
                { label: "Out on Road", desc: "Rider took handover" },
                { label: "Completed", desc: "Bike safely returned" }
              ].map((step, idx) => {
                const stepStatus = getStepStatus(idx, selectedBooking.status);
                return (
                  <div key={idx} className="flex flex-row md:flex-col items-center gap-3 md:text-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border-2 transition-all ${
                      stepStatus === "completed" 
                        ? "bg-green-600 border-green-600 text-white font-semibold" 
                        : stepStatus === "active"
                        ? "bg-orange-50 border-orange-500 text-orange-600 animate-pulse"
                        : "bg-white border-gray-200 text-gray-400"
                    }`}>
                      {stepStatus === "completed" ? "✓" : idx + 1}
                    </div>

                    <div>
                      <p className={`text-xs font-bold leading-tight ${stepStatus === "upcoming" ? "text-gray-400" : "text-gray-950"}`}>{step.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{step.desc}</p>
                    </div>
                  </div>
                );
              })}

              <div className="hidden md:block absolute top-4 left-6 right-6 h-0.5 bg-gray-100 -z-0" />
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserBookings;
