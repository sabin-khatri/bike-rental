/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { bikes } from "../data/bikes";

/* ─── Static Mappings ─── */
const FEATURES = [
  { 
    title: "100% Insured Rides", 
    desc: "Ride with peace of mind. Every motorcycle in our fleet is fully covered by comprehensive insurance.", 
    iconBg: "bg-orange-50", 
    iconColor: "text-orange-600" 
  },
  { 
    title: "24/7 Roadside Assistance", 
    desc: "Stuck in the middle of nowhere? Our emergency dispatch is just a phone call away.", 
    iconBg: "bg-orange-50", 
    iconColor: "text-orange-600" 
  },
  { 
    title: "Verified Fleet Quality", 
    desc: "We inspect and service every bike before handover so you get a smooth, breakdown-free experience.", 
    iconBg: "bg-orange-50", 
    iconColor: "text-orange-600" 
  },
  { 
    title: "Doorstep Handover", 
    desc: "We deliver the bike straight to your home, hotel, or station for maximum convenience.", 
    iconBg: "bg-orange-50", 
    iconColor: "text-orange-600" 
  },
];

const STATS = [
  { num: "500+", label: "Happy Riders" },
  { num: "50+", label: "Premium Bikes" },
  { num: "100%", label: "Fully Insured" },
  { num: "24/7", label: "Road Support" },
];

const STEPS = [
  { step: "01", title: "Select Your Ride", desc: "Choose from our adventure, cruiser, sports, or commuter fleet." },
  { step: "02", title: "Check Estimate Fares", desc: "Use the rental calculator to get clear estimations instantly." },
  { step: "03", title: "Verify Your License", desc: "Upload your driver's license photo in your account profile." },
  { step: "04", title: "Pick Up & Start Riding", desc: "Get keys at the nearest station or request doorstep handover." }
];

const TESTIMONIALS = [
  { name: "Suresh K.", loc: "Kathmandu", text: "Amazing service! The Royal Enfield Classic was in pristine condition, and delivery was right on time." },
  { name: "Priya S.", loc: "Biratnagar", text: "Very easy to book and super friendly staff. I got 10% discount for my weekly trip. Highly recommended!" },
  { name: "John D.", loc: "USA", text: "Rented an adventure XR190 for my ride to Dharan. Smooth transaction, well maintained bike, and absolute peace of mind." },
];

const IconArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

/* ─── Price Calculator Widget ─── */
function PriceCalculator() {
  const [selectedBikeId, setSelectedBikeId] = useState(bikes[0]?.id || "");
  const [days, setDays] = useState(3);
  const [extraHelmet, setExtraHelmet] = useState(false);
  const [premiumJacket, setPremiumJacket] = useState(false);
  const [goproMount, setGoproMount] = useState(false);

  const selectedBike = bikes.find(b => b.id === Number(selectedBikeId)) || bikes[0];
  
  if (!selectedBike) return null;

  const baseCost = selectedBike.price * days;
  const helmetCost = extraHelmet ? 200 * days : 0;
  const jacketCost = premiumJacket ? 300 * days : 0;
  const mountCost = goproMount ? 100 * days : 0;
  const totalAddons = helmetCost + jacketCost + mountCost;

  const discountRate = days >= 5 ? 0.10 : 0.0;
  const discountAmount = Math.round(baseCost * discountRate);
  const grandTotal = baseCost + totalAddons - discountAmount;

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-6 max-w-xl mx-auto">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Instant Rate Estimator</h3>
        <p className="text-xs text-gray-500 mt-1">Estimate your trip pricing details instantly on the fly</p>
      </div>

      <div className="space-y-4">
        {/* Select Bike */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Choose Bike Model</label>
          <select 
            value={selectedBikeId} 
            onChange={(e) => setSelectedBikeId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
          >
            {bikes.map(b => (
              <option key={b.id} value={b.id}>{b.name} (Rs {b.price}/day)</option>
            ))}
          </select>
        </div>

        {/* Days Slider */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
            <span>Rental Duration</span>
            <span className="text-orange-600 font-bold">{days} days</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="30" 
            value={days} 
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
        </div>

        {/* Addons Selection */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-semibold text-gray-500">Optional Add-ons</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-slate-50 text-xs cursor-pointer select-none">
              <input type="checkbox" checked={extraHelmet} onChange={(e) => setExtraHelmet(e.target.checked)} className="accent-orange-600" />
              <span>Helmet (+Rs200)</span>
            </label>
            <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-slate-50 text-xs cursor-pointer select-none">
              <input type="checkbox" checked={premiumJacket} onChange={(e) => setPremiumJacket(e.target.checked)} className="accent-orange-600" />
              <span>Jacket (+Rs300)</span>
            </label>
            <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-slate-50 text-xs cursor-pointer select-none">
              <input type="checkbox" checked={goproMount} onChange={(e) => setGoproMount(e.target.checked)} className="accent-orange-600" />
              <span>GoPro Mount (+Rs100)</span>
            </label>
          </div>
        </div>

        {/* Dynamic Summary Panel */}
        <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-gray-500">Base Fare ({days} days)</span>
            <span className="font-bold text-gray-800">Rs {baseCost}</span>
          </div>
          {totalAddons > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Add-ons Cost</span>
              <span className="font-bold text-gray-800">Rs {totalAddons}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div className="flex justify-between font-bold text-green-600">
              <span>Weekly Discount (10%)</span>
              <span>- Rs {discountAmount}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 flex justify-between font-black text-sm text-orange-600">
            <span>Estimated Price</span>
            <span>Rs {grandTotal}</span>
          </div>
        </div>

        <Link to="/bikes" className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2">
          Proceed to Catalog <IconArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const featuredBikes = bikes.slice(0, 3);

  return (
    <div className="bg-slate-50 text-gray-800 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Hero Text */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 px-3 py-1.5 bg-orange-50 rounded-full">
              🏍️ Nepal's Premier Bike Rental
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 leading-tight">
              Rent The Best <span className="text-orange-600">Rides in Nepal</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg">
              Premium motorcycle rental service in Biratnagar & Belbari. Start your journey today with verified, well-maintained bikes. Cruiser, Adventure, Sport, and Street options available.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/bikes" className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center gap-2">
                Find Your Ride <IconArrowRight />
              </Link>
              <Link to="/contact" className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-sm rounded-lg transition-all">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop"
              alt="Nepal Bike Rental"
              className="w-full h-80 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-10 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-orange-600">{stat.num}</p>
                <p className="text-xs sm:text-sm font-medium text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Price Calculator Section */}
      <section className="py-16 bg-slate-100/50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Rental Fee Calculator</h2>
            <p className="text-sm text-gray-500 mt-2">Get quick estimates for base rates, weekly discounts, and optional add-ons</p>
          </div>
          <PriceCalculator />
        </div>
      </section>

      {/* Why Rent From Us Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Modern Riders Choose Us</h2>
            <p className="text-sm text-gray-500 mt-2">The Ultimate Motorcycle Experience in Nepal</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white border border-gray-150 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
                <div className={`w-10 h-10 ${f.iconBg} ${f.iconColor} rounded-lg flex items-center justify-center font-bold`}>
                  ✓
                </div>
                <h3 className="text-base font-bold text-gray-900">{f.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-slate-100/30 border-y border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">How It Works</h2>
            <p className="text-sm text-gray-500 mt-1">Get on the road in 4 easy steps</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 relative shadow-sm">
                <span className="absolute top-4 right-4 text-2xl font-black text-orange-200">{step.step}</span>
                <h4 className="text-base font-bold text-gray-900 pr-8">{step.title}</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Rental Models</h2>
              <p className="text-sm text-gray-500 mt-1">Handpicked favorites loved by our riders</p>
            </div>
            <Link to="/bikes" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700">
              View All Fleet <IconArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBikes.map((bike) => (
              <div key={bike.id} className="bg-slate-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="relative h-48 bg-white border-b border-gray-150">
                  <img src={bike.image} alt={bike.name} className="w-full h-full object-contain p-3" />
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                    {bike.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{bike.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">📍 Available in {bike.location}</p>
                  </div>

                  {bike.specs && (
                    <div className="grid grid-cols-3 gap-2 text-center py-2 px-1 bg-white border border-gray-100 rounded-lg">
                      <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">Engine</p>
                        <p className="text-xs font-bold text-gray-700">{bike.specs.engine}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">Mileage</p>
                        <p className="text-xs font-bold text-gray-700">{bike.specs.mileage}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">Weight</p>
                        <p className="text-xs font-bold text-gray-700">{bike.specs.weight}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Daily Rate</p>
                      <p className="text-lg font-black text-orange-600">Rs {bike.price}</p>
                    </div>
                    <Link to="/bikes" className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Loved By Thousands of Riders</h2>
            <p className="text-sm text-gray-500 mt-2">What our clients say about their experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">{t.name}</p>
                    <p className="text-gray-400 text-[10px] uppercase font-bold">{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Call To Action */}
      <section className="py-16 bg-gray-900 text-white text-center border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Limited Time Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            Book now and get up to 10% off on weekly rentals with free delivery inside Biratnagar.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link to="/bikes" className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-lg transition-all shadow-md shadow-orange-500/10">
              Book Your Ride
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-gray-700 hover:bg-gray-800 text-white font-semibold text-sm rounded-lg transition-all">
              Talk to Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}