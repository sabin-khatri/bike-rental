/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [faqSearch, setFaqSearch] = useState("");

  const safetyItems = [
    { icon: "🛠️", title: "Daily Maintenance", text: "Every bike goes through a strict 21-point safety inspection before handover." },
    { icon: "⛑️", title: "Premium Safety Gear", text: "DOT-approved helmets, riding jackets & gloves provided free of cost." },
    { icon: "🆘", title: "24/7 Roadside Support", text: "Our team is always ready to assist you, no matter where you are in Nepal." },
    { icon: "📄", title: "Comprehensive Insurance", text: "Full coverage including damage, theft, and third-party liability." },
    { icon: "📍", title: "GPS Tracking", text: "Real-time tracking for your safety in remote Himalayan areas." },
    { icon: "🗺️", title: "Route Planning", text: "Personalized guidance on road conditions and best riding routes." },
  ];

  const team = [
    { name: "Ramesh Thapa", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    { name: "Anita Gurung", role: "Operations Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
    { name: "Suresh Lama", role: "Master Mechanic", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&q=80" },
  ];

  const faqs = [
    { q: "Do I need a license to rent a motorcycle?", a: "Yes, a valid driver's license for motorcycles is strictly required. International tourists must hold an IDP (International Driving Permit)." },
    { q: "What happens if the bike breaks down?", a: "We offer roadside rescue mechanics. If the issue is severe, we replace the bike promptly." },
    { q: "Is fuel included in the price?", a: "No, fuel costs are paid by the rider. We deliver the bike with some fuel, and you pay for what you use." },
    { q: "What is the minimum age to rent a bike?", a: "Riders must be at least 18 years old and hold a valid motorcycle driver's license." },
    { q: "Are there limit restrictions on distance?", a: "No, we offer unlimited mileage on all of our rental fleet so you can explore Nepal fully." },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-50 text-gray-800 min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 md:pt-32 md:pb-20 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 px-3 py-1.5 bg-orange-50 rounded-full">
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            We Don't Just Rent Bikes. We Create Adventures.
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Founded in Biratnagar in 2020, we started with one dream — to make Nepal's majestic landscapes accessible on two wheels. Today, we proudly maintain a premium fleet of 100+ motorcycles.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-950">Our Origin Story</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We began our journey with just 5 bikes, serving local riders in Biratnagar. Through absolute focus on bike maintenance, safety, and client happiness, we expanded our hubs. Today, we are trusted by thousands of local and international travelers exploring the beauty of Nepal.
            </p>
            <Link to="/bikes" className="inline-block px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg transition-all">
              Browse Rental Catalog
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80"
              alt="Bike Rental Journey"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Safety is Non-Negotiable */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Safety is Non-Negotiable</h2>
            <p className="text-sm text-gray-500 mt-2">How we ensure a smooth, worry-free journey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyItems.map((item, i) => (
              <div key={i} className="bg-white border border-gray-150 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Team */}
      <section className="py-16 bg-white border-y border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Meet Our Team</h2>
            <p className="text-sm text-gray-500 mt-2">The experts keeping your rides safe and smooth</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((person, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-200">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{person.name}</h3>
                  <p className="text-orange-600 text-xs font-semibold">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ accordion with Real-time Search */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Frequently Asked Questions</h2>
            
            {/* FAQ Search Box */}
            <div className="max-w-md mx-auto pt-2">
              <input 
                type="text" 
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search queries (e.g. license, breakdown...)"
                className="w-full px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm outline-none focus:border-orange-500 transition-all text-center"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <div key={i} className="bg-white border border-gray-150 p-5 rounded-xl">
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">{faq.q}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2">{faq.a}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-white border border-dashed border-gray-200 rounded-xl">
                <p className="text-sm text-gray-500 font-semibold">No questions found matching your query.</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}