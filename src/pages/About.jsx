import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 70 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.7, ease: "easeOut" } 
  },
};

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section - Cinematic */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/bikes/about.png"
            alt="Riding in Nepal Himalayas"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-gray-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(34,211,238,0.25),transparent_70%)]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-8 py-3 mb-8 rounded-full bg-white/10 backdrop-blur-2xl border border-white/30 text-cyan-200 text-sm font-semibold tracking-[3px]"
          >
            ESTABLISHED 2020 • BIRATNAGAR, NEPAL
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black leading-none tracking-tighter mb-8"
          >
            We Don't Rent Bikes.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400">
              We Create Adventures.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Premium motorcycles. Unforgettable Himalayan journeys. Real rider support.
          </motion.p>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 text-sm flex flex-col items-center"
        >
          Scroll to discover our story
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/50 to-transparent mt-3" />
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-10"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight"
            >
              Our Story
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              className="space-y-7 text-lg text-gray-600 leading-relaxed"
            >
              <motion.p variants={fadeInUp}>
                Born in the bustling streets of <strong>Biratnagar in 2020</strong>, 
                we began with just 5 bikes and one big dream — to make Nepal’s majestic landscapes 
                accessible to every passionate rider.
              </motion.p>

              <motion.p variants={fadeInUp}>
                Today, we proudly maintain a premium fleet of <strong>100+ motorcycles</strong> 
                across Kathmandu, Pokhara, and Biratnagar. From the rugged roads of Mustang to 
                the scenic highways of Sindhuli — our bikes have carried thousands of unforgettable stories.
              </motion.p>

              <motion.blockquote 
                variants={fadeInUp}
                className="border-l-4 border-cyan-500 pl-6 italic text-gray-700 text-xl leading-relaxed"
              >
                "We are riders first, entrepreneurs second. We understand your needs because we’ve lived them on these roads."
              </motion.blockquote>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 px-10 py-5 bg-gray-900 hover:bg-cyan-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                Start Your Journey
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Story Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[2.75rem] blur-2xl opacity-20" />
            <img
              src="/bikes/story.webp"
              alt="Our Journey in Nepal"
              className="relative rounded-3xl shadow-2xl w-full object-cover hover:scale-[1.015] transition-transform duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* Vision 2030 Section */}
      <section className="py-24 md:py-32 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
          >
            <img
              src="/bikes/vision.png"
              alt="Our Vision"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <div>
              <motion.h2
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-black tracking-tight"
              >
                Vision 2030
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-2xl text-gray-400 mt-6 leading-tight"
              >
                To become Nepal’s most trusted adventure mobility partner, pioneering sustainable and unforgettable journeys.
              </motion.p>
            </div>

            <div className="space-y-8">
              {[
                { num: "01", title: "200+ Premium Bikes", desc: "Expanding our fleet with the latest adventure motorcycles" },
                { num: "02", title: "Go Green Initiative", desc: "40% of our fleet will be electric by 2027" },
                { num: "03", title: "Global Rider Community", desc: "Building Nepal’s largest network of passionate riders" },
              ].map((item) => (
                <motion.div
                  key={item.num}
                  variants={fadeInUp}
                  className="flex gap-6 group"
                >
                  <div className="text-cyan-400 text-4xl font-black pt-1 group-hover:scale-110 transition-transform">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400 mt-2 text-lg">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Safety First Section */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <span className="uppercase tracking-[4px] text-cyan-600 font-bold text-sm">Safety is Non-Negotiable</span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mt-4">Safety First, Always</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: "🛠️", title: "Daily Maintenance", text: "Every bike goes through a strict 21-point safety inspection before handover." },
              { icon: "⛑️", title: "Premium Safety Gear", text: "DOT-approved helmets, riding jackets & gloves provided free of cost." },
              { icon: "🆘", title: "24/7 Roadside Support", text: "Our team is always ready to assist you, no matter where you are in Nepal." },
              { icon: "📄", title: "Comprehensive Insurance", text: "Full coverage including damage, theft, and third-party liability." },
              { icon: "📍", title: "GPS Tracking", text: "Real-time tracking for your safety in remote Himalayan areas." },
              { icon: "🗺️", title: "Expert Route Planning", text: "Personalized guidance on road conditions and best riding routes." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -12 }}
                className="bg-white border border-gray-100 p-9 rounded-3xl hover:shadow-2xl transition-all group"
              >
                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-[17px] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet The Crew */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black">Meet The Crew</h2>
            <p className="text-gray-400 text-xl mt-4">The passionate riders behind every journey</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Ramesh Thapa", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
              { name: "Anita Gurung", role: "Operations Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
              { name: "Suresh Lama", role: "Master Mechanic", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39" },
              { name: "Priya Shrestha", role: "Customer Support Head", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" },
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group text-center"
              >
                <div className="relative aspect-[4/4.5] rounded-3xl overflow-hidden mb-6 shadow-2xl">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-all" />
                </div>
                <h3 className="text-2xl font-bold">{person.name}</h3>
                <p className="text-cyan-400 font-medium tracking-wider text-sm mt-1">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-center mb-16 text-gray-900"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {[
              { q: "Do I need an International Driver's Permit (IDP)?", a: "Yes for most tourists. If your license is in English, it is often accepted, but we strongly recommend carrying an IDP." },
              { q: "What happens if the bike breaks down?", a: "We provide 24/7 roadside assistance. Minor issues are fixed on spot or guided. For major problems, we replace the bike immediately." },
              { q: "Is fuel included in the rental price?", a: "No. Bikes are delivered with a full tank and must be returned full. We can help arrange fuel if needed." },
              { q: "Can I ride to Upper Mustang?", a: "Yes! We assist with all required permits including ACAP and TIMS for restricted areas." },
              { q: "What is your cancellation policy?", a: "Free cancellation up to 48 hours before pickup. 10% fee applies if cancelled within 24 hours." },
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-md transition-all"
              >
                <summary className="px-8 py-7 text-lg font-semibold cursor-pointer flex justify-between items-center hover:bg-gray-50">
                  {faq.q}
                  <span className="text-cyan-600 group-open:rotate-180 transition-transform duration-300">
                    ↓
                  </span>
                </summary>
                <div className="px-8 pb-8 text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6 bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">Ready for the Ride of a Lifetime?</h2>
          <p className="text-2xl text-cyan-100 font-light">Your Himalayan adventure awaits.</p>
          
          <Link
            to="/bikes"
            className="inline-block mt-6 bg-white text-blue-700 px-14 py-6 rounded-full font-bold text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            Explore Our Fleet →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}