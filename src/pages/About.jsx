import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans overflow-x-hidden">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="src/assets/bikes/about.png"
            alt="Riding in Nepal"
            className="w-full h-full object-cover scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-gray-900/90" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block py-1 px-3 rounded-full bg-blue-600/30 border border-blue-400/50 backdrop-blur-md text-blue-200 text-sm font-semibold tracking-wider mb-6"
          >
            EST. 2020 • NEPAL
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-tight"
          >
            Ride Beyond <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              The Ordinary
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed"
          >
            We don't just rent bikes — we curate the ultimate Himalayan
            motorcycle experience.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black text-gray-900"
            >
              Our Story
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="space-y-6 text-lg text-gray-600 leading-relaxed text-justify"
            >
              <p>
                Born in the chaotic yet charming streets of{" "}
                <strong>Biratnagar in 2020</strong>, we started with just 5
                second-hand bikes and a wild dream: to make Nepal's breathtaking
                landscapes accessible to every free spirit.
              </p>
              <p>
                Fast forward to today, we operate a premium fleet of{" "}
                <strong>100+ motorcycles</strong> across Kathmandu, Pokhara, and
                Chitwan. From the rugged trails of Mustang to the winding
                highways of Sindhuli, our bikes have seen it all.
              </p>
              <p className="border-l-4 border-blue-600 pl-6 italic text-gray-800">
                "We are riders first, business owners second. We know what you
                need because we've been there."
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-full overflow-hidden transition-all hover:shadow-2xl hover:bg-blue-600"
              >
                <span>Start Your Engine</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
            <img
              src="src/assets/bikes/story.webp"
              alt="Our Story"
              className="relative rounded-3xl shadow-2xl w-full object-cover transform transition duration-500 hover:scale-[1.02]"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700"
            >
              <img
                src="src/assets/bikes/vision.png"
                alt="Vision"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-10"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-black"
              >
                Vision 2030
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-400">
                To become Nepal's #1 trusted mobility partner, leading the
                charge in sustainable adventure tourism.
              </motion.p>

              <div className="space-y-6">
                {[
                  {
                    title: "200+ Premium Bikes",
                    desc: "Expanding our fleet with top-tier adventure bikes.",
                  },
                  {
                    title: "Go Green Initiative",
                    desc: "Converting 40% of our fleet to Electric by 2027.",
                  },
                  {
                    title: "Rider Community",
                    desc: "Building the largest network of global riders in Nepal.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="text-blue-400 text-2xl font-black">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-blue-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">
              Our Priority
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mt-2">
              Safety First, Always
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "🛠️",
                title: "Daily Maintenance",
                text: "Every bike undergoes a 21-point safety check before you turn the key.",
              },
              {
                icon: "⛑️",
                title: "Premium Gear",
                text: "DOT-certified helmets and safety gloves provided at no extra cost.",
              },
              {
                icon: "🆘",
                title: "24/7 Support",
                text: "Stuck in nowhere? Our rapid response team is just a call away.",
              },
              {
                icon: "📄",
                title: "Full Insurance",
                text: "Comprehensive coverage for damage, theft, and third-party liability.",
              },
              {
                icon: "📍",
                title: "GPS Tracking",
                text: "Advanced tracking for your safety in remote Himalayan regions.",
              },
              {
                icon: "🗺️",
                title: "Route Planning",
                text: "Free expert advice on road conditions and best routes.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900">
            Meet The Crew
          </h2>
          <p className="text-gray-600 mt-4 text-xl">
            The people behind your ride
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              name: "Ramesh Thapa",
              role: "Founder & CEO",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            },
            {
              name: "Anita Gurung",
              role: "Operations Lead",
              img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            },
            {
              name: "Suresh Lama",
              role: "Master Mechanic",
              img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
            },
            {
              name: "Priya Shrestha",
              role: "Support Head",
              img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
            },
          ].map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden mb-6 shadow-xl">
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all z-10 duration-500"></div>
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {person.name}
              </h3>
              <p className="text-blue-600 font-medium uppercase tracking-wide text-sm">
                {person.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-900"
          >
            Got Questions?
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                q: "Do I need an International Driver's Permit (IDP)?",
                a: "For most tourists, yes. However, if your license is in English, it's often accepted. We recommend carrying an IDP to be safe.",
              },
              {
                q: "What happens if the bike breaks down?",
                a: "We offer 24/7 roadside assistance. If it's a minor fix, we guide you or send help. For major issues, we replace the bike immediately.",
              },
              {
                q: "Is fuel included in the rental price?",
                a: "No, bikes are provided with a full tank and must be returned full. We can arrange fuel for you upon request.",
              },
              {
                q: "Can I take the bike to Upper Mustang?",
                a: "Yes! But you need special permits. We help process all necessary ACAP and TIMS permits for your journey.",
              },
              {
                q: "Is there a cancellation fee?",
                a: "Free cancellation up to 48 hours before your booking. 10% charge if cancelled within 24 hours.",
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden open:shadow-lg open:ring-1 open:ring-blue-500 transition-all duration-300"
              >
                <summary className="px-8 py-6 text-lg font-bold text-gray-800 cursor-pointer flex justify-between items-center select-none hover:bg-gray-50">
                  {faq.q}
                  <span className="transform group-open:rotate-180 transition-transform duration-300 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-8 pb-8 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-black">Ready to Ride?</h2>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Your Himalayan adventure is just one click away.
          </p>
          <Link
            to="/bikes"
            className="inline-block bg-white text-blue-600 px-12 py-5 rounded-full font-bold text-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Book Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
