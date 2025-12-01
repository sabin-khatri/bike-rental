import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Router } from "react-router-dom"
import Home from "./pages/Home";
import Footer from "./components/Footer";


function App() {
 

  return (
    <>

    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}  />
    </Routes>
    <Footer />
    </>
   
  )
}

export default App
