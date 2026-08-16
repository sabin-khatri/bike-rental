import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      if (email === "admin@gmail.com") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: "Please verify your email and password credentials.",
        confirmButtonColor: "#EA580C"
      });
    }
  };

  const handleFillDemo = (role) => {
    if (role === "user") {
      setEmail("user@gmail.com");
      setPassword("user123");
    } else {
      setEmail("admin@gmail.com");
      setPassword("admin123");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-950">
            Welcome Back Rider
          </h2>
          <p className="text-xs text-gray-500">
            Or{" "}
            <Link to="/register" className="font-semibold text-orange-600 hover:underline">
              create a new rider account
            </Link>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 focus:bg-white transition-all text-gray-800"
                placeholder="rider@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500 focus:bg-white transition-all text-gray-800"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition-all shadow-sm shadow-orange-500/10 cursor-pointer"
          >
            Sign In
          </motion.button>
        </form>

        {/* Demo Accounts Helper */}
        <div className="pt-4 border-t border-gray-150 space-y-2.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase text-center tracking-wider">Quick Demo Access Credentials</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleFillDemo("user")}
              className="flex-1 py-1.5 px-2 bg-slate-50 border border-gray-200 rounded-md text-[10px] font-semibold text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-all"
            >
              Fill Demo Rider
            </button>
            <button
              onClick={() => handleFillDemo("admin")}
              className="flex-1 py-1.5 px-2 bg-slate-50 border border-gray-200 rounded-md text-[10px] font-semibold text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-all"
            >
              Fill Demo Admin
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
