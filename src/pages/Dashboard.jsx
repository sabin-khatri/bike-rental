/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Swal from "sweetalert2";
import { useApp } from "../context/AppContext";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.05 } },
};

/* ── Star Review Modal ── */
function ReviewModal({ bike, isOpen, onClose, userName }) {
  const { t } = useApp();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  if (!isOpen || !bike) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      Swal.fire({ icon: "error", title: "Oops", text: "Please write a review comment." });
      return;
    }

    const allReviews = JSON.parse(localStorage.getItem("bike_reviews") || "[]");
    const newReview = {
      bikeId: bike.bikeId,
      bikeName: bike.bikeName,
      userName: userName || "Rider",
      rating,
      text,
      timestamp: Date.now()
    };
    allReviews.push(newReview);
    localStorage.setItem("bike_reviews", JSON.stringify(allReviews));

    Swal.fire({
      icon: "success",
      title: "Review Submitted!",
      text: "Thank you for sharing your experience.",
      timer: 1500,
      showConfirmButton: false
    });
    
    setText("");
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-slate-800"
      >
        <h3 className="text-lg font-black mb-1">{t("reviewModalTitle", { bike: bike.bikeName })}</h3>
        <p className="text-xs text-gray-400 mb-4">Your review helps other riders make better choices.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Rating</label>
            <div className="flex gap-1.5 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition-colors ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Your review</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder={t("reviewTextPlaceholder")}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl outline-none text-xs resize-none"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl text-xs font-extrabold text-gray-500 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-extrabold shadow-md shadow-purple-500/20"
            >
              {t("submitReview")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function Dashboard() {
  const { t, theme } = useApp();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab]     = useState("overview");
  const [isLoginView, setIsLoginView] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authentication Fields
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [name,     setName]     = useState("");
  const [phone,    setPhone]    = useState("");

  // Edit profile states
  const [editName,      setEditName]      = useState("");
  const [editPhone,     setEditPhone]     = useState("");
  const [editPassword,  setEditPassword]  = useState("");
  const [editLicense,   setEditLicense]   = useState(""); // Drivers license number
  
  // Rides and Support
  const [bookings,      setBookings]      = useState([]);
  const [supportMessage,setSupportMessage]= useState("");

  // Review Modal state
  const [activeReviewBike, setActiveReviewBike] = useState(null);

  const tabs = [
    { id: "overview",  label: t("overviewTab"),    icon: "📊" },
    { id: "bookings",  label: t("myRidesTab"),    icon: "🏍️" },
    { id: "profile",   label: t("profileTab"),     icon: "👤" },
    { id: "support",   label: t("supportTab"),     icon: "🚨" },
  ];

  const loadUserBookings = (userEmail) => {
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(all.filter(b => b.email.toLowerCase() === userEmail.toLowerCase()));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
    if (user) {
      setEditName(user.name);
      setEditPhone(user.phone || "");
      setEditPassword(user.password || "");
      setEditLicense(user.licenseNo || "");
      loadUserBookings(user.email);
    }
  }, []);


  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email || !password) return showError("Please enter email and password.");
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    let matched = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!matched) {
      const n = email.split("@")[0];
      matched = { name: n.charAt(0).toUpperCase() + n.slice(1), email: email.trim(), phone: "", password, licenseNo: "" };
      allUsers.push(matched);
      localStorage.setItem("users", JSON.stringify(allUsers));
    }
    localStorage.setItem("currentUser", JSON.stringify(matched));
    setCurrentUser(matched);
    setEditName(matched.name); 
    setEditPhone(matched.phone || ""); 
    setEditPassword(matched.password);
    setEditLicense(matched.licenseNo || "");
    loadUserBookings(matched.email);
    Swal.fire({ icon: "success", title: "Welcome back!", timer: 1400, showConfirmButton: false });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !phone) return showError("Please fill all fields.");
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (allUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) return showError("Email already registered.");
    const newUser = { name, email: email.trim(), password, phone, licenseNo: "" };
    allUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(allUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setCurrentUser(newUser);
    setEditName(newUser.name); 
    setEditPhone(newUser.phone); 
    setEditPassword(newUser.password);
    setEditLicense("");
    setBookings([]);
    Swal.fire({ icon: "success", title: "Account created!", timer: 1400, showConfirmButton: false });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null); 
    setActiveTab("overview");
    setEmail(""); setPassword(""); setName(""); setPhone("");
    Swal.fire({ icon: "info", title: "See you on the road! 🏔️", timer: 1400, showConfirmButton: false });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!editName) return showError("Name cannot be empty.");
    const updated = { ...currentUser, name: editName, phone: editPhone, password: editPassword, licenseNo: editLicense };
    localStorage.setItem("currentUser", JSON.stringify(updated));
    setCurrentUser(updated);
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify(allUsers.map(u => u.email.toLowerCase() === currentUser.email.toLowerCase() ? updated : u)));
    Swal.fire({ icon: "success", title: "Profile saved!", timer: 1400, showConfirmButton: false });
  };

  const handleSupport = (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    Swal.fire({ icon: "success", title: "Ticket raised!", text: "Our crew will call you within 10 minutes.", confirmButtonColor: "#8B5CF6" });
    setSupportMessage("");
  };

  const showError = (msg) => Swal.fire({ icon: "error", title: "Oops", text: msg, confirmButtonColor: "#8B5CF6" });

  const today = new Date().toISOString().split("T")[0];
  const totalSpent    = bookings.reduce((s, b) => s + b.totalPrice, 0);
  const activeCount   = bookings.filter(b => b.returnDate >= today).length;
  const loyaltyPoints = bookings.length * 120;

  /* ── INPUT STYLES ── */
  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:border-purple-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all duration-200";
  const labelCls = "block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5";

  /* ══════════════════════════════════════════
     AUTH PANEL (Logged Out)
  ══════════════════════════════════════════ */
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 pt-24 pb-12 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Card Container */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* Brand strip */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center font-black text-sm backdrop-blur-sm">BR</div>
                <div>
                  <h1 className="font-black text-lg leading-none">BikeRental</h1>
                  <p className="text-purple-200 text-[10px] uppercase font-bold tracking-widest mt-1">{t("riderConsole")}</p>
                </div>
              </div>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-gray-100 dark:border-slate-850">
              {["Sign In", "Register"].map((tItem, i) => {
                const active = i === 0 ? isLoginView : !isLoginView;
                return (
                  <button
                    key={tItem}
                    onClick={() => setIsLoginView(i === 0)}
                    className={`flex-1 py-3.5 text-xs font-black uppercase tracking-widest transition-all relative ${active ? "text-purple-600 dark:text-purple-400 font-extrabold" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    {tItem === "Sign In" ? t("signIn") : "Register"}
                    {active && (
                      <motion.div layoutId="auth-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {isLoginView ? (
                  <motion.form key="login" variants={fadeUp} initial="hidden" animate="show" exit="hidden" onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white">Welcome back 👋</h2>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1.5">Sign in to your rider account.</p>
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="rider@example.com" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Password</label>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={inputCls} />
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm rounded-xl shadow-lg mt-2 cursor-pointer">
                      Open Console →
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.form key="register" variants={fadeUp} initial="hidden" animate="show" exit="hidden" onSubmit={handleSignUp} className="space-y-3.5">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white">Create Account</h2>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1.5">Join BikeRental and start riding.</p>
                    </div>
                    {[
                      { label: "Full Name",    type: "text",     val: name,     set: setName,     ph: "Your full name" },
                      { label: "Email",        type: "email",    val: email,    set: setEmail,    ph: "rider@example.com" },
                      { label: "Phone",        type: "tel",      val: phone,    set: setPhone,    ph: "98XXXXXXXX" },
                      { label: "Password",     type: "password", val: password, set: setPassword, ph: "••••••••" },
                    ].map(f => (
                      <div key={f.label}>
                        <label className={labelCls}>{f.label}</label>
                        <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} className={inputCls} />
                      </div>
                    ))}
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm rounded-xl shadow-lg mt-2 cursor-pointer">
                      Register Profile →
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ══════════════════════════════════════════
     MAIN CONSOLE (Logged In)
  ══════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-950 dark:text-gray-100 pt-[72px] font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col lg:flex-row min-h-[80vh]">

          {/* ── SIDEBAR ── */}
          <>
            {/* Mobile overlay */}
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
            </AnimatePresence>

            <motion.aside
              className={`
                fixed lg:static inset-y-0 left-0 z-40 lg:z-auto
                w-[260px] lg:w-64 shrink-0
                bg-gradient-to-b from-gray-950 via-gray-900 to-purple-950
                text-white flex flex-col
                transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
              `}
            >
              {/* Brand logo header */}
              <div className="px-6 pt-7 pb-6 flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center font-black text-sm shrink-0">BR</div>
                <div>
                  <p className="font-extrabold text-[15px] leading-none">Rider Center</p>
                  <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">Console v3</p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-white text-xl">✕</button>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider text-left transition-all duration-200 relative
                        ${active ? "bg-purple-600 text-white shadow" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                    >
                      <span className="text-base">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logged in User panel footer */}
              <div className="px-4 pb-6 pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-700/50 rounded-xl flex items-center justify-center font-black text-sm uppercase shrink-0">
                    {currentUser.name[0]}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-[13px] truncate leading-tight">{currentUser.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{currentUser.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout}
                  className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 font-extrabold text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer">
                  {t("signOut")}
                </button>
              </div>
            </motion.aside>
          </>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* Mobile Navbar Header */}
            <div className="lg:hidden flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-slate-800">
              <button onClick={() => setSidebarOpen(true)}
                className="w-9 h-9 flex flex-col items-center justify-center gap-1 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <span className="w-4 h-0.5 bg-gray-700 dark:bg-white block" />
                <span className="w-4 h-0.5 bg-gray-700 dark:bg-white block" />
                <span className="w-4 h-0.5 bg-gray-700 dark:bg-white block" />
              </button>
              <p className="font-extrabold text-sm text-gray-900 dark:text-white">{tabs.find(t => t.id === activeTab)?.label}</p>
            </div>

            {/* Content Switcher */}
            <div className="flex-1 p-5 sm:p-8 overflow-y-auto">
              <AnimatePresence mode="wait">

                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                  <motion.div key="overview" variants={stagger} initial="hidden" animate="show" exit="hidden" className="space-y-8">
                    <motion.div variants={fadeUp}>
                      <h2 className="text-2xl font-black">{t("riderConsole")}</h2>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1.5">Hey, {currentUser.name}! Here's your riding summary.</p>
                    </motion.div>

                    {/* Dashboard Metrics grid */}
                    <motion.div variants={stagger} className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                      {[
                        { label: t("myRidesTab"),    value: bookings.length,                     icon: "🏍️", bg: "bg-purple-500/10 border-purple-200/50 dark:border-purple-800/30",  val: "text-purple-700 dark:text-purple-400" },
                        { label: t("activeRides"),   value: activeCount,                          icon: "⚡",  bg: "bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-800/30", val: "text-emerald-700 dark:text-emerald-400" },
                        { label: t("totalSpent"),    value: `Rs ${totalSpent.toLocaleString()}`,  icon: "💳", bg: "bg-blue-500/10 border-blue-200/50 dark:border-blue-800/30",    val: "text-blue-700 dark:text-blue-400" },
                        { label: t("loyaltyPoints"),    value: loyaltyPoints,                        icon: "⭐", bg: "bg-amber-500/10 border-amber-200/50 dark:border-amber-800/30",   val: "text-amber-700 dark:text-amber-400" },
                      ].map((card, i) => (
                        <motion.div key={i} variants={fadeUp}
                          className={`${card.bg} border rounded-2xl p-5 hover:scale-[1.01] transition-transform duration-200`}>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">{card.label}</span>
                            <span className="text-lg">{card.icon}</span>
                          </div>
                          <p className={`text-2xl font-black mt-3 ${card.val}`}>{card.value}</p>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Active Rides list overview */}
                    <motion.div variants={fadeUp} className="bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-gray-100 dark:border-slate-800 p-6">
                      <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-4">{t("activeRides")}</h3>
                      {activeCount > 0 ? (
                        <div className="space-y-3">
                          {bookings.filter(b => b.returnDate >= today).map((ride, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div>
                                <p className="font-extrabold text-sm text-gray-900 dark:text-white">{ride.bikeName}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{ride.pickupLocation} · {ride.pickupDate} → {ride.returnDate}</p>
                              </div>
                              <span className="font-black text-sm text-purple-600 dark:text-purple-400 shrink-0">Rs {ride.totalPrice.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-gray-400 dark:text-gray-500 text-xs">{t("noActiveRides")}</p>
                          <Link to="/bikes" className="inline-block mt-2 text-purple-600 dark:text-purple-400 text-xs font-bold hover:underline">
                            {t("browseBikesLink")}
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}

                {/* BOOKINGS TAB */}
                {activeTab === "bookings" && (
                  <motion.div key="bookings" variants={stagger} initial="hidden" animate="show" exit="hidden" className="space-y-6">
                    <motion.div variants={fadeUp}>
                      <h2 className="text-2xl font-black">{t("myRidesTab")}</h2>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1.5">All your past and upcoming trips.</p>
                    </motion.div>

                    {bookings.length > 0 ? (
                      <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
                        {bookings.map((b, i) => {
                          const isActive = b.returnDate >= today;
                          return (
                            <motion.div key={i} variants={fadeUp}
                              className={`bg-white dark:bg-slate-900 rounded-2xl border p-5 space-y-3 hover:shadow-md transition-shadow duration-200 ${isActive ? "border-purple-200 dark:border-purple-800" : "border-gray-100 dark:border-slate-800"}`}>
                              <div className="flex items-start justify-between">
                                <p className="font-extrabold text-sm text-gray-900 dark:text-white">{b.bikeName}</p>
                                <span className={`px-2 py-0.5 text-[9px] font-black rounded-full uppercase ${isActive ? "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400" : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400"}`}>
                                  {isActive ? t("activeStatus") : t("doneStatus")}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                                <p>📍 {b.pickupLocation}</p>
                                <p>📅 {b.pickupDate} → {b.returnDate}</p>
                                {b.notes && <p className="italic text-gray-400 dark:text-gray-500 truncate">"{b.notes}"</p>}
                              </div>
                              <div className="pt-3 border-t border-gray-100 dark:border-slate-800/80 flex justify-between items-center">
                                <div>
                                  <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Amount</span>
                                  <span className="text-xs font-black text-purple-600 dark:text-purple-400">Rs {b.totalPrice.toLocaleString()}</span>
                                </div>
                                
                                {/* Review button for past/completed rides */}
                                {!isActive && (
                                  <button
                                    onClick={() => setActiveReviewBike(b)}
                                    className="px-3.5 py-1.5 bg-purple-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-slate-700 text-purple-700 dark:text-purple-400 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                                  >
                                    {t("writeReviewBtn")}
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    ) : (
                      <motion.div variants={fadeUp} className="text-center py-16 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl">
                        <p className="text-4xl mb-3">🏍️</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">{t("noBookings")}</p>
                        <Link to="/bikes" className="inline-block mt-2 text-purple-600 dark:text-purple-400 text-xs font-bold hover:underline">{t("rentBikeLink")}</Link>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* PROFILE TAB */}
                {activeTab === "profile" && (
                  <motion.div key="profile" variants={stagger} initial="hidden" animate="show" exit="hidden" className="space-y-6">
                    <motion.div variants={fadeUp}>
                      <h2 className="text-2xl font-black">{t("profileSettings")}</h2>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1.5">{t("profileSettingsDesc")}</p>
                    </motion.div>

                    <motion.form variants={fadeUp} onSubmit={handleUpdateProfile}
                      className="bg-gray-50 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 max-w-lg space-y-4">
                      <div>
                        <label className={labelCls}>Email (locked)</label>
                        <input type="email" value={currentUser.email} disabled
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-250/50 dark:bg-slate-800/40 text-gray-400 dark:text-gray-500 text-sm cursor-not-allowed outline-none font-semibold" />
                      </div>
                      
                      {/* Standard edits */}
                      <div>
                        <label className={labelCls}>Full Name</label>
                        <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Phone Number</label>
                        <input type="tel" value={editPhone} onChange={e => setEditPhone(e.target.value)} className={inputCls} />
                      </div>

                      {/* Driver's license number field */}
                      <div>
                        <label className={labelCls}>{t("licenseLabel")}</label>
                        <input
                          type="text"
                          value={editLicense}
                          onChange={e => setEditLicense(e.target.value)}
                          placeholder={t("licensePlaceholder")}
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className={labelCls}>Password</label>
                        <input type="password" value={editPassword} onChange={e => setEditPassword(e.target.value)} className={inputCls} />
                      </div>

                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                        className="px-7 py-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer transition-colors">
                        {t("saveChanges")}
                      </motion.button>
                    </motion.form>
                  </motion.div>
                )}

                {/* SUPPORT TAB */}
                {activeTab === "support" && (
                  <motion.div key="support" variants={stagger} initial="hidden" animate="show" exit="hidden" className="space-y-6">
                    <motion.div variants={fadeUp}>
                      <h2 className="text-2xl font-black">{t("roadsideSupport")}</h2>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1.5">{t("supportDescText")}</p>
                    </motion.div>

                    <motion.div variants={stagger} className="grid md:grid-cols-2 gap-5">
                      <motion.div variants={fadeUp} className="bg-purple-500/10 border border-purple-200/50 dark:border-purple-800/30 rounded-2xl p-6 space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">{t("emergencyHotlines")}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t("emergencyDesc")}</p>
                        <div className="space-y-3 text-sm">
                          {[
                            { label: "Biratnagar Dispatch", num: "+977 9841234560" },
                            { label: "Belbari Hub",         num: "+977 9801234567" },
                          ].map(h => (
                            <div key={h.label} className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl px-4 py-3 border border-purple-100/50 dark:border-slate-800/80">
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{h.label}</span>
                              <a href={`tel:${h.num.replace(/\s/g,"")}`} className="text-xs font-black text-purple-600 dark:text-purple-400 hover:underline">{h.num}</a>
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.form variants={fadeUp} onSubmit={handleSupport}
                        className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">{t("fileTicket")}</h3>
                        <textarea
                          value={supportMessage}
                          onChange={e => setSupportMessage(e.target.value)}
                          rows={4}
                          placeholder={t("ticketPlaceholder")}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:border-purple-400 outline-none text-xs resize-none transition-all"
                        />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                          className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer">
                          {t("notifyCrew")}
                        </motion.button>
                      </motion.form>
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Review Modal popup */}
      <ReviewModal
        bike={activeReviewBike}
        isOpen={!!activeReviewBike}
        onClose={() => setActiveReviewBike(null)}
        userName={currentUser?.name}
      />
    </div>
  );
}