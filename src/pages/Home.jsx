/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Zap, MapPin, Phone, Star, ChevronDown } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function Home() {
  return (
    <div className="bg-slate-50 overflow-x-hidden">
      
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
     
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop" 
            alt="Nepal Bike Ride" 
            className="w-full h-full object-cover scale-105"
          />
       
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-50" />
        </div>

   
        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <span className="px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-cyan-300 text-sm font-semibold tracking-wider uppercase">
                Explore Nepal on Two Wheels
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
              Ride Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Boundaries
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Experience the Himalayas with premium bikes, full insurance, and 24/7 support. From Thamel to Mustang.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/bikes"
                className="group relative px-8 py-4 bg-cyan-500 text-slate-900 font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Find Your Bike <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/contact"
                className="px-8 py-4 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

       
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1, y: [0, 10, 0] }} 
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      <div className="bg-white border-b border-slate-200 relative z-20 -mt-20 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { num: "500+", label: "Happy Riders" },
          { num: "50+", label: "Premium Bikes" },
          { num: "100%", label: "Insurance Cover" },
          { num: "24/7", label: "Road Support" },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <h3 className="text-3xl md:text-4xl font-black text-slate-800">{stat.num}</h3>
            <p className="text-slate-500 font-medium text-sm uppercase tracking-wide mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Why Ride With Us?</h2>
            <div className="w-24 h-1.5 bg-cyan-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Fully Insured", desc: "Ride with peace of mind. Every bike comes with comprehensive insurance.", icon: <Shield className="w-8 h-8" /> },
              { title: "24/7 Support", desc: "Stuck in the mountains? Our support team is just one call away.", icon: <Clock className="w-8 h-8" /> },
              { title: "Latest Models", desc: "We update our fleet annually. Ride the newest 2023-2024 models.", icon: <Zap className="w-8 h-8" /> },
              { title: "Free Delivery", desc: "We deliver to your hotel in Thamel or Lakeside Pokhara for free.", icon: <MapPin className="w-8 h-8" /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-cyan-500/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

 
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">Most Loved Machines</h2>
              <p className="text-slate-400 max-w-xl">Choose from our curated selection of bikes perfect for Nepal's terrain.</p>
            </div>
            <Link to="/bikes" className="text-cyan-400 font-bold hover:text-white transition-colors flex items-center gap-2">
              View Fleet <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Royal Enfield 350", price: "Rs 800", unit:"/day", tag: "Cruiser", img: "src/assets/bikes/royal-enfield.webp"},
              { name: "Honda XR 190", price: "Rs 1200", unit:"/day", tag: "Off-Road", img: "src/assets/bikes/hondaxr190.webp" },
              { name: "Bajaj Pulsar 220", price: "Rs 700", unit:"/day", tag: "Street", img: "src/assets/bikes/bajaj220.webp" }
            ].map((bike, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={bike.img} 
                  alt={bike.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                    {bike.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-2xl font-bold">{bike.name}</h3>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-cyan-400">{bike.price}</span>
                      <span className="text-xs text-slate-400">{bike.unit}</span>
                    </div>
                  </div>
                  
                  <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-300">
                     <Link to="/bikes" className="mt-4 w-full py-3 bg-white text-slate-900 font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-cyan-500 transition-colors">
                        Book Now <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-cyan-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Star className="w-12 h-12 text-yellow-400 mx-auto mb-6 fill-yellow-400" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            "The best way to see Nepal! The bikes were brand new and the team delivered them right to our hotel in Pokhara. Highly recommended."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-slate-300 rounded-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-900">Alex Thompson</p>
              <p className="text-sm text-slate-500">Adventure Traveler, UK</p>
            </div>
          </div>
        </div>
      </section>


      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900" />
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Ready to Start Your Engine?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Don't just visit Nepal. Ride it. Book your bike today and get 10% off for bookings over 5 days.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/bikes"
              className="px-12 py-5 bg-white text-blue-900 font-bold text-xl rounded-full shadow-2xl hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300"
            >
              Book Your Ride
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;