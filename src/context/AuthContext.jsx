/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { authService } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem("bikeRentalUser");
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
      localStorage.setItem("bikeRentalUser", JSON.stringify(loggedInUser));
      Swal.fire({ icon: "success", title: "Logged in successfully!", text: `Welcome back, ${loggedInUser.name}.` });
      return true;
    } catch (error) {
      Swal.fire({ icon: "error", title: "Login Failed", text: error.message });
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const newUser = await authService.register(name, email, password);
      setUser(newUser);
      localStorage.setItem("bikeRentalUser", JSON.stringify(newUser));
      Swal.fire({ icon: "success", title: "Registered successfully!", text: "Welcome to BikeRental." });
      return true;
    } catch (error) {
      Swal.fire({ icon: "error", title: "Registration Failed", text: error.message });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bikeRentalUser");
    Swal.fire({ icon: "info", title: "Logged Out", text: "You have been successfully logged out." });
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
