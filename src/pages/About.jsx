/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Motion presets (matches Home.jsx) ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const Reveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeUp}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

export default function About() {
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-slate-50 text-gray-800 min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-16 md:pt-32 md:pb-20 border-b border-gray-200 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-orange-600 px-3 py-1.5 bg-orange-50 rounded-full">
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            We Don't Just Rent Bikes. We Create Adventures.
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Founded in Biratnagar in 2020, we started with one dream — to make Nepal's majestic landscapes accessible on two wheels. Today, we proudly maintain a premium fleet of 100+ motorcycles.
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <Reveal className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-950">Our Origin Story</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We began our journey with just 5 bikes, serving local riders in Biratnagar. Through absolute focus on bike maintenance, safety, and client happiness, we expanded our hubs. Today, we are trusted by thousands of local and international travelers exploring the beauty of Nepal.
            </p>
            <Link
              to="/bikes"
              className="inline-block px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg transition-all active:scale-95"
            >
              Browse Rental Catalog
            </Link>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden shadow-sm border border-gray-100"
          >
            <img
              src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80"
              alt="Bike Rental Journey"
              className="w-full h-64 sm:h-80 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Safety is Non-Negotiable */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Safety is Non-Negotiable</h2>
            <p className="text-sm text-gray-500 mt-2">How we ensure a smooth, worry-free journey</p>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {safetyItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet Team */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Meet Our Team</h2>
            <p className="text-sm text-gray-500 mt-2">The experts keeping your rides safe and smooth</p>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {team.map((person, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center space-y-3 group">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-200 ring-4 ring-transparent group-hover:ring-orange-100 transition-all">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{person.name}</h3>
                  <p className="text-orange-600 text-xs font-semibold">{person.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ accordion with Real-time Search */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Frequently Asked Questions</h2>

            {/* FAQ Search Box */}
            <div className="max-w-md mx-auto pt-2">
              <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
              <input
                id="faq-search"
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search queries (e.g. license, breakdown...)"
                className="w-full px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm outline-none focus:border-orange-500 transition-all text-center"
              />
            </div>
          </Reveal>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <motion.div
                    key={faq.q}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-inset"
                    >
                      <h4 className="text-sm sm:text-base font-bold text-gray-900">{faq.q}</h4>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-orange-50 text-orange-600 text-xs font-bold"
                        aria-hidden="true"
                      >
                        ▾
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-5 pb-5">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
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