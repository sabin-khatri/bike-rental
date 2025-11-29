/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


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


const IconArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
);
const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const IconZap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const IconMapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"/></svg>
);
const IconStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const IconChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="m6 9 6 6 6-6"/></svg>
);

function Home() {
  return (
    <div className="bg-slate-50 overflow-x-hidden font-sans">
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
   
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop" 
            alt="Nepal Bike Ride" 
            className="w-full h-full object-cover" 
          />
       \
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-50" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
              <span className="px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-900/30 backdrop-blur-md text-cyan-300 text-sm font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                Explore Nepal on Two Wheels
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
              Ride Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                Boundaries
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
              Experience the Himalayas with premium bikes, full insurance, and 24/7 support. From Thamel streets to Mustang peaks.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link
                to="/bikes"
                className="group relative px-10 py-4 bg-cyan-500 text-slate-900 font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Find Your Bike <span className="group-hover:translate-x-1 transition-transform"><IconArrowRight /></span>
                </span>
                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/contact"
                className="px-10 py-4 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-semibold text-lg rounded-full hover:bg-white/10 hover:border-white/50 transition-all flex items-center gap-2"
              >
                <IconPhone /> Contact Us
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
          <IconChevronDown />
        </motion.div>
      </section>

   \
      <div className="relative px-4">
        <div className="bg-white border-b border-slate-200 relative z-20 -mt-20 mx-auto max-w-6xl rounded-3xl shadow-2xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-slate-100">
          {[
            { num: "500+", label: "Happy Riders" },
            { num: "50+", label: "Premium Bikes" },
            { num: "100%", label: "Insurance Cover" },
            { num: "24/7", label: "Road Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center group hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-4xl md:text-5xl font-black text-slate-800 bg-clip-text text-transparent bg-gradient-to-b from-slate-800 to-slate-600">{stat.num}</h3>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

     
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Why Ride With Us?</h2>
            <div className="w-24 h-1.5 bg-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">We provide everything you need for a safe and memorable journey.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Fully Insured", desc: "Ride with peace of mind. Every bike comes with comprehensive insurance included.", icon: <IconShield /> },
              { title: "24/7 Support", desc: "Stuck in the mountains? Our mechanical support team is just one call away.", icon: <IconClock /> },
              { title: "Latest Models", desc: "We update our fleet annually. Ride the newest 2023-2024 perfectly maintained models.", icon: <IconZap /> },
              { title: "Free Delivery", desc: "We deliver to your hotel in Thamel or Lakeside Pokhara for absolutely free.", icon: <IconMapPin /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-cyan-500/30 shadow-lg hover:shadow-2xl hover:shadow-cyan-100/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        
         <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/20 skew-x-12 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-cyan-400 font-bold tracking-wider uppercase mb-2 block">Our Collection</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4">Most Loved Machines</h2>
              <p className="text-slate-400 max-w-xl text-lg">Choose from our curated selection of bikes perfect for Nepal's challenging terrain.</p>
            </div>
            <Link to="/bikes" className="px-6 py-3 border border-slate-700 rounded-full hover:bg-slate-800 hover:border-cyan-400 text-cyan-400 font-bold transition-all flex items-center gap-2">
              View Full Fleet <span className="w-4 h-4"><IconArrowRight /></span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Royal Enfield 350", 
                price: "Rs 800", 
                unit:"/day", 
                tag: "Cruiser", 
                // image 1
                img: "./assets/bikes/royal-enfield.webp"
              },
              { 
                name: "Honda XR 190", 
                price: "Rs 1200", 
                unit:"/day", 
                tag: "Off-Road", 
                // image 2
                img: "./assets/bikes/hondaxr190.webp"
              },
              { 
                name: "Bajaj Pulsar 220", 
                price: "Rs 700", 
                unit:"/day", 
                tag: "Street", 
                // image 3
                img: "./assets/bikes/bajaj-pulsar-220.webp"
              }
            ].map((bike, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
             
                className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer bg-slate-800 shadow-2xl"
              >
           
                <img 
                  src={bike.img} 
                  alt={bike.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 text-white">
                    {bike.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{bike.name}</h3>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-cyan-400">{bike.price}</span>
                      <span className="text-xs text-slate-400 font-medium">{bike.unit}</span>
                    </div>
                  </div>
                  
                
                  <div className="h-0 group-hover:h-14 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                     <Link to="/bikes" className="mt-2 w-full py-3 bg-cyan-500 text-slate-900 font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-cyan-400 transition-colors">
                        Book Now <span className="w-4 h-4"><IconArrowRight /></span>
                     </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-24 bg-cyan-50 relative overflow-hidden">
      
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-200 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-6 flex justify-center"><IconStar /></div>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-10 leading-snug italic font-serif">
            "The best way to see Nepal! The bikes were brand new and the team delivered them right to our hotel in Pokhara. Highly recommended."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
               <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" 
                alt="User" 
                className="w-full h-full object-cover"
               />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-900 text-lg">Alex Thompson</p>
              <p className="text-sm text-slate-500 font-medium">Adventure Traveler, UK</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900" />
          <img 
            src="https://images.unsplash.com/photo-1605218427368-35b85a3c617e?q=80&w=2070&auto=format&fit=crop" 
            alt="Texture" 
            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
          >
            Ready to Start Your Engine?
          </motion.h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Don't just visit Nepal. Ride it. Book your bike today and get <strong>10% off</strong> for bookings over 5 days.
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