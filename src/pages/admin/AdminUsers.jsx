import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    // Read from registered users
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Add default users if none exist for representation
    if (allUsers.length === 0) {
      const defaults = [
        { id: 1, name: "Ramesh Khatri", email: "user@gmail.com", role: "rider", phone: "+977 9812345678", verified: true },
        { id: 2, name: "Sita Sharma", email: "sita@gmail.com", role: "rider", phone: "+977 9801234567", verified: false }
      ];
      localStorage.setItem("users", JSON.stringify(defaults));
      setUsers(defaults);
    } else {
      // Map extra localStorage metadata profiles
      const enriched = allUsers.map(u => {
        const profile = JSON.parse(localStorage.getItem(`profile_${u.email}`) || "{}");
        return {
          ...u,
          phone: profile.phone || u.phone || "N/A",
          license: profile.license || "Not Uploaded",
          verified: profile.verified !== undefined ? profile.verified : (u.email === "admin@gmail.com")
        };
      });
      setUsers(enriched);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleVerification = (userEmail, currentStatus) => {
    const enrichedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Update individual profile verification state
    const profile = JSON.parse(localStorage.getItem(`profile_${userEmail}`) || "{}");
    profile.verified = !currentStatus;
    localStorage.setItem(`profile_${userEmail}`, JSON.stringify(profile));

    fetchUsers();

    Swal.fire({
      icon: "success",
      title: !currentStatus ? "User Verified!" : "Verification Revoked",
      text: `Rider license status updated successfully.`,
      confirmButtonColor: "#EA580C"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-950">Manage Registered Riders</h2>
          <p className="text-xs text-gray-500 mt-0.5">Verify rider document credentials and accounts</p>
        </div>
        <span className="text-xs font-semibold text-gray-500">{users.length} total users</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-slate-50 text-xs uppercase font-bold text-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3 border-b border-gray-150">Rider Name</th>
              <th scope="col" className="px-4 py-3 border-b border-gray-150">Email</th>
              <th scope="col" className="px-4 py-3 border-b border-gray-150">Phone</th>
              <th scope="col" className="px-4 py-3 border-b border-gray-150">License Status</th>
              <th scope="col" className="px-4 py-3 border-b border-gray-150 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-150">
            {users.map((u) => (
              <tr key={u.email} className="hover:bg-slate-50/50">
                <td className="px-4 py-4 font-bold text-gray-900 border-b border-gray-100">{u.name}</td>
                <td className="px-4 py-4 border-b border-gray-100 text-xs">{u.email}</td>
                <td className="px-4 py-4 border-b border-gray-100">{u.phone}</td>
                <td className="px-4 py-4 border-b border-gray-100 text-xs font-semibold text-gray-700">{u.license || "Not Uploaded"}</td>
                <td className="px-4 py-4 border-b border-gray-100 text-right">
                  <button
                    onClick={() => handleToggleVerification(u.email, u.verified)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      u.verified
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : "bg-orange-50 text-orange-605 hover:bg-orange-100/50"
                    }`}
                  >
                    {u.verified ? "✓ Verified Rider" : "Verify Account"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminUsers;
