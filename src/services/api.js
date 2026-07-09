/**
 * Simulated Backend API Service
 * 
 * This file acts as the bridge between your frontend and backend.
 * Currently, it simulates a database using localStorage and setTimeout to mimic network delays.
 * When a real backend (e.g., Node.js, Django) is ready, replace these functions with `fetch` or `axios` calls.
 */

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  // Login API
  login: async (email, password) => {
    await delay(500); // simulate 500ms network latency
    
    // Hardcoded Admin
    if (email === "admin@gmail.com" && password === "admin123") {
      return { id: 1, name: "Admin User", email, role: "admin" };
    } 
    // Hardcoded User
    else if (email === "user@test.com" && password === "user123") {
      return { id: 2, name: "Regular User", email, role: "user" };
    }
    
    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Don't send password back to client state
      const { password: _, ...userWithoutPassword } = foundUser;
      return userWithoutPassword;
    }

    throw new Error("Invalid credentials");
  },

  // Register API
  register: async (name, email, password) => {
    await delay(500);
    
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    if (users.find(u => u.email === email)) {
      throw new Error("Email already registered");
    }

    const newUser = { id: Date.now(), name, email, role: "user", password };
    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
};

// You can add more services here later, like:
export const bikeService = {
  getBikes: async () => {
    // await delay(500);
    // return fetch('/api/bikes').then(res => res.json());
    return [];
  }
};
