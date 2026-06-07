/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useApp } from "../context/AppContext";
import Swal from "sweetalert2";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: "easeOut" } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

// Icons
const IconPhone = () => (
  <svg className="w-8 h-8 text-purple-650" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconMail = () => (
  <svg className="w-8 h-8 text-purple-650" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconMapPin = () => (
  <svg className="w-8 h-8 text-purple-650" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconWhatsapp = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.044h-.004c-1.56 0-3.092-.416-4.437-1.206l-.313-.187-4.054 1.062 1.081-3.938-.255-.405c-.841-1.336-1.286-2.882-1.285-4.462 0-4.606 3.76-8.337 8.398-8.337 2.24 0 4.348 1.038 5.756 2.784 1.406 1.746 2.09 4.065 2.088 6.683-.004 4.606-3.764 8.337-8.395 8.337z" />
  </svg>
);

export default function Contact() {
  const { t, theme } = useApp();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you! We will get back to you within 2 hours.",
      confirmButtonColor: "#8B5CF6"
    });
    reset();
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop"
            alt="Contact Us - Nepal Bike Rental"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-slate-950/90 dark:to-slate-950" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 px-6 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-purple-200 text-xs font-semibold tracking-[3px]"
          >
            24/7 • INSTANT REPLY
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl md:text-7xl font-black leading-none tracking-tighter"
          >
            Let's Ride Together
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Reach out anytime. We're just a message away from your next Himalayan adventure.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16 px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <div>
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl sm:text-5xl font-black leading-none"
                >
                  We're Here <br />For You
                </motion.h2>
                <motion.p 
                  variants={fadeInUp}
                  className="mt-4 text-gray-500 dark:text-gray-400 text-base"
                >
                  Fast response guaranteed. Real humans. Real riders.
                </motion.p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: IconPhone,
                    title: "Call or WhatsApp",
                    info: "+977 9812345678",
                    link: "https://wa.me/9779812345678",
                    color: "purple",
                  },
                  {
                    icon: IconMail,
                    title: "Email Us",
                    info: "info@bikerental.com",
                    link: "mailto:info@bikerental.com",
                    color: "purple",
                  },
                  {
                    icon: IconMapPin,
                    title: "Our Locations",
                    info: "Biratnagar Stations • Belbari Hub, Nepal",
                    color: "purple",
                  },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    target={item.link?.startsWith('http') ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    variants={scaleIn}
                    whileHover={{ scale: 1.01 }}
                    className="group flex items-start gap-5 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <item.icon />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-550 dark:text-gray-400 text-sm font-semibold mt-1 leading-relaxed">
                        {item.info}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Action Buttons */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="tel:+9779812345678"
                  className="flex-1 flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm py-4 rounded-2xl shadow shadow-purple-500/20 transition-all active:scale-95"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/9779812345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#22c35e] text-white font-extrabold text-sm py-4 rounded-2xl shadow transition-all active:scale-95"
                >
                  <IconWhatsapp /> WhatsApp
                </a>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-slate-800 transition-colors"
            >
              <h3 className="text-2xl md:text-3xl font-black mb-1">
                Send a Message
              </h3>
              <p className="text-gray-400 dark:text-gray-500 text-xs mb-8">
                We usually reply within <span className="font-bold text-emerald-600 dark:text-emerald-400">2 hours</span>
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Your Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl outline-none text-sm focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Phone</label>
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl outline-none text-sm focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Email Address</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                    })}
                    type="email"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl outline-none text-sm focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Message Details</label>
                  <textarea
                    {...register("message", { required: "Please tell us about your trip" })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-2xl outline-none text-sm focus:border-purple-500 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-colors cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}