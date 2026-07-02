import { createContext, useContext, useState } from "react";
import React from "react";

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  // Dummy translation function
  const t = (key) => {
    return key.split('.').pop(); // Just return the key for now
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const value = {
    theme,
    toggleTheme,
    language,
    changeLanguage,
    t
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
