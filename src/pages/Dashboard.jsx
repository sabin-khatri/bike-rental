import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const tabs = [
  { id: "overview",  label: "Overview",    icon: "📊" },
  { id: "bookings",  label: "My Rides",    icon: "🏍️" },
  { id: "profile",   label: "Profile",     icon: "👤" },
  { id: "support",   label: "Support",     icon: "🚨" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.07 } },
};

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab]     = useState("overview");
  const [isLoginView, setIsLoginView] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [name,     setName]     = useState("");
  const [phone,    setPhone]    = useState("");

  const [bookings,      setBookings]      = useState([]);
  const [editName,      setEditName]      = useState("");
  const [editPhone,     setEditPhone]     = useState("");
  const [editPassword,  setEditPassword]  = useState("");
  const [supportMessage,setSupportMessage]= useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
    if (user) {
      setEditName(user.name);
      setEditPhone(user.phone || "");
      setEditPassword(user.password || "");
      // eslint-disable-next-line react-hooks/immutability
      loadUserBookings(user.email);
    }
  }, []);

  const loadUserBookings = (userEmail) => {
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(all.filter(b => b.email.toLowerCase() === userEmail.toLowerCase()));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email || !password) return showError("Please enter email and password.");
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    let matched = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!matched) {
      const n = email.split("@")[0];
      matched = { name: n.charAt(0).toUpperCase() + n.slice(1), email: email.trim(), phone: "", password };
      allUsers.push(matched);
      localStorage.setItem("users", JSON.stringify(allUsers));
    }
    localStorage.setItem("currentUser", JSON.stringify(matched));
    setCurrentUser(matched);
    setEditName(matched.name); setEditPhone(matched.phone || ""); setEditPassword(matched.password);
    loadUserBookings(matched.email);
    Swal.fire({ icon: "success", title: "Welcome back!", timer: 1400, showConfirmButton: false });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !phone) return showError("Please fill all fields.");
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (allUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) return showError("Email already registered.");
    const newUser = { name, email: email.trim(), password, phone };
    allUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(allUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setCurrentUser(newUser);
    setEditName(newUser.name); setEditPhone(newUser.phone); setEditPassword(newUser.password);
    setBookings([]);
    Swal.fire({ icon: "success", title: "Account created!", timer: 1400, showConfirmButton: false });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null); setActiveTab("overview");
    setEmail(""); setPassword(""); setName(""); setPhone("");
    Swal.fire({ icon: "info", title: "See you on the road! 🏔️", timer: 1400, showConfirmButton: false });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!editName) return showError("Name cannot be empty.");
    const updated = { ...currentUser, name: editName, phone: editPhone, password: editPassword };
    localStorage.setItem("currentUser", JSON.stringify(updated));
    setCurrentUser(updated);
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify(allUsers.map(u => u.email.toLowerCase() === currentUser.email.toLowerCase() ? updated : u)));
    Swal.fire({ icon: "success", title: "Profile saved!", timer: 1400, showConfirmButton: false });
  };

  const handleSupport = (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    Swal.fire({ icon: "success", title: "Ticket raised!", text: "Our crew will call you within 10 minutes.", confirmButtonColor: "#6C3AEB" });
    setSupportMessage("");
  };

  const showError = (msg) => Swal.fire({ icon: "error", title: "Oops", text: msg, confirmButtonColor: "#6C3AEB" });

  const today = new Date().toISOString().split("T")[0];
  const totalSpent    = bookings.reduce((s, b) => s + b.totalPrice, 0);
  const activeCount   = bookings.filter(b => b.returnDate >= today).length;
  const loyaltyPoints = bookings.length * 120;

  /* ── INPUT STYLES ── */
  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all duration-200";
  const labelCls = "block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5";

  /* ══════════════════════════════════════════
     AUTH PANEL
  ══════════════════════════════════════════ */
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 flex items-center justify-center px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-purple-200/40 overflow-hidden border border-purple-100/60">

            {/* Brand strip */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center font-black text-white text-sm backdrop-blur-sm">BR</div>
                <div>
                  <h1 className="font-black text-white text-lg leading-none">BikeRental</h1>
                  <p className="text-purple-200 text-[11px] mt-0.5">Rider Console</p>
                </div>
              </div>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-gray-100">
              {["Sign In", "Register"].map((t, i) => {
                const active = i === 0 ? isLoginView : !isLoginView;
                return (
                  <button
                    key={t}
                    onClick={() => setIsLoginView(i === 0)}
                    className={`flex-1 py-3.5 text-xs font-black uppercase tracking-widest transition-all relative ${active ? "text-purple-600" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    {t}
                    {active && (
                      <motion.div layoutId="auth-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
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
                      <h2 className="text-2xl font-black text-gray-900">Welcome back 👋</h2>
                      <p className="text-gray-400 text-xs mt-1.5">Sign in to your rider account.</p>
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
                      className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-purple-300/40 mt-1">
                      Open Console →
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.form key="register" variants={fadeUp} initial="hidden" animate="show" exit="hidden" onSubmit={handleSignUp} className="space-y-3.5">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Create Account</h2>
                      <p className="text-gray-400 text-xs mt-1.5">Join BikeRental and start riding.</p>
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
                      className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-purple-300/40 mt-1">
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
     MAIN DASHBOARD
  ══════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-50 pt-[72px] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[80vh]">

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
              initial={false}
              animate={{ x: sidebarOpen ? 0 : undefined }}
              className={`
                fixed lg:static inset-y-0 left-0 z-40 lg:z-auto
                w-[260px] lg:w-64 shrink-0
                bg-gradient-to-b from-gray-950 via-gray-900 to-purple-950
                text-white flex flex-col
                transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
              `}
            >
              {/* Brand */}
              <div className="px-6 pt-7 pb-6 flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center font-black text-sm shrink-0">BR</div>
                <div>
                  <p className="font-extrabold text-[15px] leading-none">Rider Center</p>
                  <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Console v2</p>
                </div>
                {/* close on mobile */}
                <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-white text-xl">✕</button>
              </div>

              {/* Nav */}
              <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider text-left transition-all duration-200 relative
                        ${active ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                    >
                      <span className="text-base">{tab.icon}</span>
                      <span>{tab.label}</span>
                      {active && <motion.div layoutId="sidebar-pill" className="absolute inset-0 rounded-xl bg-purple-600 -z-10" />}
                    </button>
                  );
                })}
              </nav>

              {/* User footer */}
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
                <motion.button whileTap={{ scale: 0.96 }} onClick={handleLogout}
                  className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 font-extrabold text-[11px] uppercase tracking-wider rounded-xl transition-all">
                  Sign Out
                </motion.button>
              </div>
            </motion.aside>
          </>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* Mobile header */}
            <div className="lg:hidden flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <button onClick={() => setSidebarOpen(true)}
                className="w-9 h-9 flex flex-col items-center justify-center gap-1 bg-gray-50 rounded-lg">
                <span className="w-4 h-0.5 bg-gray-700 block" />
                <span className="w-4 h-0.5 bg-gray-700 block" />
                <span className="w-4 h-0.5 bg-gray-700 block" />
              </button>
              <p className="font-extrabold text-sm text-gray-900">{tabs.find(t => t.id === activeTab)?.label}</p>
            </div>

            {/* Tab content */}
            <div className="flex-1 p-5 sm:p-8 overflow-y-auto">
              <AnimatePresence mode="wait">

                {/* ── OVERVIEW ── */}
                {activeTab === "overview" && (
                  <motion.div key="overview" variants={stagger} initial="hidden" animate="show" exit="hidden" className="space-y-8">
                    <motion.div variants={fadeUp}>
                      <h2 className="text-2xl font-black text-gray-900">Console Overview</h2>
                      <p className="text-gray-400 text-xs mt-1.5">Hey, {currentUser.name}! Here's your riding summary.</p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div variants={stagger} className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                      {[
                        { label: "Total Rides",    value: bookings.length,                     icon: "🏍️", bg: "bg-purple-50  border-purple-100",  val: "text-purple-700" },
                        { label: "Active Rides",   value: activeCount,                          icon: "⚡",  bg: "bg-emerald-50 border-emerald-100", val: "text-emerald-700" },
                        { label: "Total Spent",    value: `Rs ${totalSpent.toLocaleString()}`,  icon: "💳", bg: "bg-blue-50    border-blue-100",    val: "text-blue-700" },
                        { label: "Loyalty Pts",    value: loyaltyPoints,                        icon: "⭐", bg: "bg-amber-50   border-amber-100",   val: "text-amber-700" },
                      ].map((card, i) => (
                        <motion.div key={i} variants={fadeUp}
                          className={`${card.bg} border rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-200`}>
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">{card.label}</span>
                            <span className="text-lg">{card.icon}</span>
                          </div>
                          <p className={`text-2xl font-black mt-3 ${card.val}`}>{card.value}</p>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Active rides list */}
                    <motion.div variants={fadeUp} className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                      <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-4">Active Rides</h3>
                      {activeCount > 0 ? (
                        <div className="space-y-3">
                          {bookings.filter(b => b.returnDate >= today).map((ride, i) => (
                            <motion.div key={i} variants={fadeUp}
                              className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div>
                                <p className="font-extrabold text-sm text-gray-900">{ride.bikeName}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{ride.pickupLocation} · {ride.pickupDate} → {ride.returnDate}</p>
                              </div>
                              <span className="font-black text-sm text-purple-600 shrink-0">Rs {ride.totalPrice.toLocaleString()}</span>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-gray-400 text-xs">No active rentals right now.</p>
                          <Link to="/bikes" className="inline-block mt-2 text-purple-600 text-xs font-bold hover:underline">Browse available bikes →</Link>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}

                {/* ── BOOKINGS ── */}
                {activeTab === "bookings" && (
                  <motion.div key="bookings" variants={stagger} initial="hidden" animate="show" exit="hidden" className="space-y-6">
                    <motion.div variants={fadeUp}>
                      <h2 className="text-2xl font-black text-gray-900">My Rides</h2>
                      <p className="text-gray-400 text-xs mt-1.5">All your past and upcoming trips.</p>
                    </motion.div>

                    {bookings.length > 0 ? (
                      <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
                        {bookings.map((b, i) => {
                          const isActive = b.returnDate >= today;
                          return (
                            <motion.div key={i} variants={fadeUp}
                              className={`bg-white rounded-2xl border p-5 space-y-3 hover:shadow-md transition-shadow duration-200 ${isActive ? "border-purple-200" : "border-gray-100"}`}>
                              <div className="flex items-start justify-between">
                                <p className="font-extrabold text-sm text-gray-900">{b.bikeName}</p>
                                <span className={`px-2 py-0.5 text-[10px] font-black rounded-full uppercase ${isActive ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-500"}`}>
                                  {isActive ? "Active" : "Done"}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 space-y-1">
                                <p>📍 {b.pickupLocation}</p>
                                <p>📅 {b.pickupDate} → {b.returnDate}</p>
                                {b.notes && <p className="italic text-gray-400 truncate">"{b.notes}"</p>}
                              </div>
                              <div className="pt-2 border-t border-gray-100 flex justify-between">
                                <span className="text-xs text-gray-400">Amount</span>
                                <span className="text-xs font-black text-purple-600">Rs {b.totalPrice.toLocaleString()}</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    ) : (
                      <motion.div variants={fadeUp} className="text-center py-16 border border-dashed border-gray-200 rounded-2xl">
                        <p className="text-4xl mb-3">🏍️</p>
                        <p className="text-gray-400 text-sm">No bookings yet.</p>
                        <Link to="/bikes" className="inline-block mt-2 text-purple-600 text-xs font-bold hover:underline">Rent a bike →</Link>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* ── PROFILE ── */}
                {activeTab === "profile" && (
                  <motion.div key="profile" variants={stagger} initial="hidden" animate="show" exit="hidden" className="space-y-6">
                    <motion.div variants={fadeUp}>
                      <h2 className="text-2xl font-black text-gray-900">Profile Settings</h2>
                      <p className="text-gray-400 text-xs mt-1.5">Update your rider credentials.</p>
                    </motion.div>

                    <motion.form variants={fadeUp} onSubmit={handleUpdateProfile}
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-6 max-w-lg space-y-4">
                      <div>
                        <label className={labelCls}>Email (locked)</label>
                        <input type="email" value={currentUser.email} disabled
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-200/50 text-gray-500 text-sm cursor-not-allowed outline-none" />
                      </div>
                      {[
                        { label: "Full Name",    type: "text",     val: editName,     set: setEditName },
                        { label: "Phone Number", type: "tel",      val: editPhone,    set: setEditPhone },
                        { label: "Password",     type: "password", val: editPassword, set: setEditPassword },
                      ].map(f => (
                        <div key={f.label}>
                          <label className={labelCls}>{f.label}</label>
                          <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} className={inputCls} />
                        </div>
                      ))}
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                        className="px-7 py-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-purple-200 transition-colors">
                        Save Changes
                      </motion.button>
                    </motion.form>
                  </motion.div>
                )}

                {/* ── SUPPORT ── */}
                {activeTab === "support" && (
                  <motion.div key="support" variants={stagger} initial="hidden" animate="show" exit="hidden" className="space-y-6">
                    <motion.div variants={fadeUp}>
                      <h2 className="text-2xl font-black text-gray-900">Roadside Support</h2>
                      <p className="text-gray-400 text-xs mt-1.5">Breakdowns, punctures, or route help — we've got you.</p>
                    </motion.div>

                    <motion.div variants={stagger} className="grid md:grid-cols-2 gap-5">
                      <motion.div variants={fadeUp} className="bg-purple-50 border border-purple-100 rounded-2xl p-6 space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-wider text-purple-700">Emergency Hotlines</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">Call our dispatch directly for on-site mechanics anywhere in Nepal.</p>
                        <div className="space-y-3 text-sm">
                          {[
                            { label: "Biratnagar Dispatch", num: "+977 9841234560" },
                            { label: "Belbari Hub",         num: "+977 9801234567" },
                          ].map(h => (
                            <div key={h.label} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-purple-100">
                              <span className="text-xs text-gray-500 font-medium">{h.label}</span>
                              <a href={`tel:${h.num.replace(/\s/g,"")}`} className="text-xs font-black text-purple-600 hover:underline">{h.num}</a>
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.form variants={fadeUp} onSubmit={handleSupport}
                        className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-wider text-gray-700">File a Ticket</h3>
                        <textarea
                          value={supportMessage}
                          onChange={e => setSupportMessage(e.target.value)}
                          rows={4}
                          placeholder="Describe your issue or location..."
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-xs resize-none transition-all"
                        />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                          className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors">
                          Notify Crew
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
    </div>
  );
}