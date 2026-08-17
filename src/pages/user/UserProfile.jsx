import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const UserProfile = () => {
  const { user } = useAuth();
  
  // Custom user fields stored locally
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [licenseImageName, setLicenseImageName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.email) {
      const profile = JSON.parse(localStorage.getItem(`profile_${user.email}`) || "{}");
      setPhone(profile.phone || user.phone || "");
      setLicense(profile.license || "");
      setEmergencyContact(profile.emergencyContact || "");
      setLicenseImageName(profile.licenseImageName || "");
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      const updatedProfile = { phone, license, emergencyContact, licenseImageName };
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(updatedProfile));
      setSaving(false);
      
      Swal.fire({
        icon: "success",
        title: "Profile Saved!",
        text: "Your rider details and documents have been updated successfully.",
        confirmButtonColor: "#EA580C"
      });
    }, 600);
  };

  const handleFileUploadMock = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicenseImageName(file.name);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200"
    >
      <h2 className="text-xl font-bold text-gray-950 mb-6">Rider Profile Settings</h2>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-6 pb-6 border-b border-gray-150">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 shadow flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0) || "R"}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{user?.name}</h3>
            <p className="text-xs text-gray-400 font-semibold uppercase">{user?.role === 'admin' ? 'Administrator' : 'Verified Rider'}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
              <input type="text" disabled value={user?.name || ""} className="w-full px-3 py-2 border border-gray-250 rounded-lg bg-slate-50 text-gray-500 text-sm cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
              <input type="email" disabled value={user?.email || ""} className="w-full px-3 py-2 border border-gray-250 rounded-lg bg-slate-50 text-gray-500 text-sm cursor-not-allowed" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              placeholder="E.g. +977 98XXXXXXXX"
              className="w-full px-3 py-2 border border-gray-250 rounded-lg text-sm outline-none focus:border-orange-500 transition-all" 
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Driving License Number</label>
              <input 
                type="text" 
                value={license} 
                onChange={(e) => setLicense(e.target.value)}
                placeholder="E.g. 01-09-XXXXXXXX"
                className="w-full px-3 py-2 border border-gray-250 rounded-lg text-sm outline-none focus:border-orange-500 transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Emergency Contact Number</label>
              <input 
                type="text" 
                value={emergencyContact} 
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="E.g. Parent/Friend Contact"
                className="w-full px-3 py-2 border border-gray-250 rounded-lg text-sm outline-none focus:border-orange-500 transition-all" 
              />
            </div>
          </div>

          {/* Driving License File Upload Box */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Upload Driving License Document (Verification Required)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:bg-slate-50/50 transition-all relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileUploadMock}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
              <span className="text-2xl mb-1 block">📄</span>
              <p className="text-xs font-semibold text-gray-700">Click or drag license photo here</p>
              <p className="text-[10px] text-gray-400 mt-0.5">JPEG, PNG files accepted</p>

              {licenseImageName && (
                <div className="mt-3 p-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5">
                  ✓ Uploaded: {licenseImageName} (Pending Admin Review)
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={saving}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold text-xs rounded-lg transition-all shadow-sm"
            >
              {saving ? "Saving Changes..." : "Save Details & Document"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UserProfile;
