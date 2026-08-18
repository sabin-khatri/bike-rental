import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(all.reverse());
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = (booking, newStatus) => {
    const todayStr = new Date().toISOString().split("T")[0];

    // Restrict early completion check
    if (newStatus === "Completed" && booking.returnDate > todayStr) {
      Swal.fire({
        icon: "error",
        title: "Rental Period Active",
        text: `You cannot mark this booking as Completed early. The rental period is active until ${booking.returnDate}.`,
        confirmButtonColor: "#EA580C"
      });
      return;
    }

    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updated = all.map(b => {
      if (b.id === booking.id) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    localStorage.setItem("bookings", JSON.stringify(updated));
    fetchBookings();

    Swal.fire({
      icon: "success",
      title: "Status Updated!",
      text: `Booking status changed to ${newStatus}.`,
      confirmButtonColor: "#EA580C"
    });
  };

  const getStatusBadge = (status = "Pending") => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-blue-105 text-blue-800 border-blue-200";
      case "confirmed":
        return "bg-green-105 text-green-800 border-green-200";
      case "completed":
        return "bg-slate-100 text-slate-800 border-gray-250";
      case "cancelled":
        return "bg-red-105 text-red-800 border-red-200";
      case "pending":
      default:
        return "bg-yellow-105 text-yellow-800 border-yellow-250";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-950">Manage Rental Reservations</h2>
        <span className="text-xs font-semibold text-gray-500">{bookings.length} total orders</span>
      </div>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-gray-500">
            <thead className="bg-slate-50 text-xs uppercase font-bold text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3 border-b border-gray-150">Order ID</th>
                <th scope="col" className="px-4 py-3 border-b border-gray-150">Rider Contact</th>
                <th scope="col" className="px-4 py-3 border-b border-gray-150">Bike Model</th>
                <th scope="col" className="px-4 py-3 border-b border-gray-150">Rental Dates</th>
                <th scope="col" className="px-4 py-3 border-b border-gray-150">Rate</th>
                <th scope="col" className="px-4 py-3 border-b border-gray-150">Status</th>
                <th scope="col" className="px-4 py-3 border-b border-gray-150 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-4 font-bold text-gray-900 border-b border-gray-100">{b.id}</td>
                  <td className="px-4 py-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">{b.email}</p>
                    <p className="text-[10px] text-gray-400">📍 {b.pickupLocation}</p>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900 border-b border-gray-100">{b.bikeName}</td>
                  <td className="px-4 py-4 border-b border-gray-100 text-xs">
                    <div>{b.pickupDate}</div>
                    <div className="text-gray-400">to {b.returnDate}</div>
                  </td>
                  <td className="px-4 py-4 font-bold text-orange-600 border-b border-gray-100">Rs {b.totalPrice}</td>
                  <td className="px-4 py-4 border-b border-gray-100">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(b.status)}`}>
                      {b.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-100 text-right space-x-1.5 whitespace-nowrap">
                    {b.status !== "Completed" && b.status !== "Cancelled" && (
                      <>
                        {b.status !== "Active" && (
                          <button
                            onClick={() => handleUpdateStatus(b, "Active")}
                            className="px-2.5 py-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-all font-semibold"
                          >
                            Mark Active
                          </button>
                        )}
                        {b.status === "Active" && (
                          <button
                            onClick={() => handleUpdateStatus(b, "Completed")}
                            className="px-2.5 py-1 text-xs bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-all font-semibold"
                          >
                            Mark Returned
                          </button>
                        )}
                        <button
                          onClick={() => handleUpdateStatus(b, "Cancelled")}
                          className="px-2.5 py-1 text-xs border border-red-200 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          Cancel
                        </button>
                      </>
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
          <h3 className="text-base font-bold text-gray-700">No Reservations Found</h3>
          <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">When riders book motorcycles through the catalog, their reservation history will be listed here.</p>
        </div>
      )}
    </motion.div>
  );
};

export default AdminBookings;
