import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


import royalEnfield from "../assets/bikes/royal-enfield.webp";
import hondaXr from "../assets/bikes/hondaxr190.webp";
import bajajPulsar from "../assets/bikes/bajaj220.webp";

const BIKES = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    price: "Rs 800",
    tag: "Cruiser",
    img: royalEnfield,
  },
  {
    id: 2,
    name: "Honda XR 190",
    price: "Rs 1200",
    tag: "Off-Road",
    img: hondaXr,
  },
  {
    id: 3,
    name: "Bajaj Pulsar 220",
    price: "Rs 700",
    tag: "Street",
    img: bajajPulsar,
  },
];

const FEATURES = [
  {
    title: "Fully Insured",
    desc: "Every rental includes comprehensive insurance – ride worry-free.",
    icon: "shield",
  },
  {
    title: "24/7 Support",
    desc: "Mechanical help anytime, anywhere in Nepal.",
    icon: "clock",
  },
  {
    title: "Latest Models",
    desc: "2023–2025 fleet, serviced after every ride.",
    icon: "zap",
  },
  {
    title: "Free Delivery",
    desc: "Delivered to your hotel in Thamel or Pokhara – free of cost.",
    icon: "map",
  },
];

const STATS = [
  { num: "500+", label: "Happy Riders" },
  { num: "50+", label: "Premium Bikes" },
  { num: "100%", label: "Insurance Cover" },
  { num: "24/7", label: "Road Support" }
];

// --- ICONS ---
const IconArrowRight = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" /></svg>);
const IconShield = () => (<svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
const IconClock = () => (<svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
const IconZap = () => (<svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>);
const IconMapPin = () => (<svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>);
const IconPhone = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.57A2 2 0 0 1 22 16.92z" /></svg>);
const IconChevronDown = () => (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m6 9 6 6 6-6" /></svg>);
const IconStar = () => (<svg className="w-10 h-10 md:w-14 md:h-14 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};
function Home() {
  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'shield': return <IconShield />;
      case 'clock': return <IconClock />;
      case 'zap': return <IconZap />;
      case 'map': return <IconMapPin />;
      default: return <IconShield />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      
     
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop"
            alt="Rider in Nepal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-slate-50/10" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 md:px-6 md:py-2 mb-6 rounded-full bg-cyan-900/50 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-xs md:text-sm font-bold tracking-widest">
              NEPAL ON TWO WHEELS
            </motion.span>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
              Ride Beyond <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Boundaries
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="mt-6 text-base sm:text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Premium bikes • Full insurance • 24/7 support <br className="hidden sm:block" /> Delivered to your hotel
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
              <Link to="/bikes" className="w-full sm:w-auto px-8 py-4 bg-cyan-500 text-black font-bold text-lg rounded-full shadow-xl hover:shadow-cyan-500/40 hover:bg-cyan-400 transition-all transform hover:-translate-y-1 text-center">
                Find Your Bike
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 border border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <IconPhone /> Contact Us
              </Link>
            </motion.div>
          </motion.div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hidden md:block">
            <IconChevronDown />
          </motion.div>
        </div>
      </section>

      <div className="relative -mt-16 md:-mt-20 z-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 md:gap-8 divide-x-0 lg:divide-x divide-gray-100">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800">{stat.num}</h3>
                <p className="mt-1 text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl md:text-5xl font-black text-gray-900">
            Why Ride With Us?
          </motion.h2>
          <div className="w-20 h-1.5 bg-cyan-500 mx-auto mt-4 rounded-full" />

          <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-cyan-500/30 shadow-lg hover:shadow-xl transition-all duration-300 text-left sm:text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-5 sm:mx-auto">
                  {getFeatureIcon(f.icon)}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 space-y-6 md:space-y-0">
            <div>
              <span className="text-cyan-400 font-bold text-sm tracking-widest">OUR FLEET</span>
              <h2 className="text-3xl md:text-5xl font-black mt-2">Top Rated Bikes</h2>
              <p className="text-gray-400 mt-3 text-sm md:text-base max-w-md">
                Well-maintained machines ready for the Himalayas.
              </p>
            </div>
            <Link to="/bikes" className="px-6 py-3 border border-gray-700 rounded-full hover:bg-cyan-500 hover:text-black hover:border-cyan-500 text-cyan-400 font-bold transition-all text-sm flex items-center gap-2">
              View All <IconArrowRight />
            </Link>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {BIKES.map((bike, i) => (
              <motion.div
                key={bike.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
               
                className="group relative h-[340px] sm:h-[380px] lg:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden bg-gray-800 shadow-xl cursor-pointer"
              >
                <img
                  src={bike.img}
                  alt={bike.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
               
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider text-white">
                    {bike.tag}
                  </span>
                </div>

               
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {bike.name}
                  </h3>
                  
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-baseline">
                      <span className="text-2xl md:text-3xl font-black text-cyan-400">{bike.price}</span>
                      <span className="text-xs text-gray-300 ml-1 font-medium">/day</span>
                    </div>
                 
                    <div className="md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                       <span className="bg-cyan-500 text-black p-2 md:px-5 md:py-2 rounded-full font-bold text-xs md:text-sm flex items-center gap-1 hover:bg-cyan-400">
                         <span className="hidden md:inline">Book</span> <IconArrowRight />
                       </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-16 md:py-24 bg-cyan-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <div className="flex justify-center mb-6"><IconStar /></div>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 italic leading-snug">
            “The best way to experience Nepal. Brand new bikes, delivered to our hotel in Pokhara. 10/10 would ride again!”
          </h2>
          <div className="mt-8 md:mt-10 flex items-center justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Alex" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-4 border-white shadow-md" />
            <div className="text-left">
              <p className="font-bold text-gray-900 text-sm md:text-base">Narendra 
                Chapagain
              </p>
              <p className="text-xs md:text-sm text-gray-500">Adventure Rider, Khadbari</p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1605218427368-35b85a3c617e?q=80&w=2070&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight">
            Ready to Ride?
          </motion.h2>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-cyan-100">
            Get <strong>10% OFF</strong> on bookings over 5 days
          </p>
          <Link to="/bikes" className="mt-8 md:mt-12 inline-block px-10 py-4 md:px-12 md:py-6 bg-white text-blue-900 font-bold text-lg md:text-xl rounded-full shadow-2xl hover:shadow-cyan-300/50 hover:scale-105 transition-all duration-300">
            Book Your Bike Now
          </Link>
        </div>
      </section>
    </div>
  );
}
export default Home;