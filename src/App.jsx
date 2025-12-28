import React from "react"
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Router } from "react-router-dom"
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Bikes from "./pages/Bikes";



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  return (
    <>
    <ScrollToTop />

    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/bikes" element={<Bikes />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    <Footer />
    </>
   
  )
}

export default App
