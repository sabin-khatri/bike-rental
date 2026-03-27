import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};



// Icons (Improved with better stroke and size)
const IconPhone = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconMail = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconMapPin = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconWhatsapp = () => (
  <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.044h-.004c-1.56 0-3.092-.416-4.437-1.206l-.313-.187-4.054 1.062 1.081-3.938-.255-.405c-.841-1.336-1.286-2.882-1.285-4.462 0-4.606 3.76-8.337 8.398-8.337 2.24 0 4.348 1.038 5.756 2.784 1.406 1.746 2.09 4.065 2.088 6.683-.004 4.606-3.764 8.337-8.395 8.337z" />
  </svg>
);

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    alert("Thank you! We'll get back to you within 2 hours.");
    reset();
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/bikes/contact.webp"
            alt="Contact Us - Nepal Bike Rental"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-slate-900/30" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 px-8 py-3 mb-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-cyan-300 text-sm font-semibold tracking-[3px]"
          >
            24/7 • INSTANT REPLY
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter"
          >
            Let's Ride Together
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light"
          >
            Reach out anytime. We're just a message away from your next Himalayan adventure.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/60 to-transparent" />
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <section className="py-20 md:py-28 px-6 -mt-16 md:-mt-24 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-10"
            >
              <div>
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl font-black text-gray-900 leading-none"
                >
                  We're Here <br />For You
                </motion.h2>
                <motion.p 
                  variants={fadeInUp}
                  className="mt-4 text-gray-600 text-lg"
                >
                  Fast response guaranteed. Real humans. Real riders.
                </motion.p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: IconPhone,
                    title: "Call or WhatsApp",
                    info: "+977 984-XXXXXXX",
                    link: "https://wa.me/977984XXXXXX",
                    color: "emerald",
                  },
                  {
                    icon: IconMail,
                    title: "Email Us",
                    info: "contact@nepalbikerental.com",
                    link: "mailto:contact@nepalbikerental.com",
                    color: "violet",
                  },
                  {
                    icon: IconMapPin,
                    title: "Our Locations",
                    info: "Biratnagar • Thamel, Kathmandu • Lakeside, Pokhara",
                    color: "sky",
                  },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    target={item.link?.startsWith('http') ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    variants={scaleIn}
                    whileHover={{ scale: 1.02 }}
                    className="group flex items-start gap-6 bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                      <item.icon />
                    </div>
                    <div className="pt-2">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 text-lg font-medium mt-2 whitespace-pre-line leading-relaxed">
                        {item.info}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Action Buttons */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <a
                  href="tel:+977984XXXXXX"
                  className="flex-1 flex items-center justify-center gap-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg py-6 rounded-3xl shadow-xl hover:shadow-cyan-600/50 transition-all active:scale-95"
                >
                  <IconPhone className="w-6 h-6" /> Call Now
                </a>
                <a
                  href="https://wa.me/977984XXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-lg py-6 rounded-3xl shadow-xl hover:shadow-green-600/50 transition-all active:scale-95"
                >
                  <IconWhatsapp /> WhatsApp
                </a>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
            >
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                Send a Message
              </h3>
              <p className="text-gray-600 mb-10">
                We usually reply within <span className="font-semibold text-emerald-600">2 hours</span>
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="peer w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none text-lg transition-all"
                      placeholder=" "
                    />
                    <label className="absolute left-6 top-5 text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 transition-all pointer-events-none">
                      Your Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      className="peer w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none text-lg transition-all"
                      placeholder=" "
                    />
                    <label className="absolute left-6 top-5 text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 transition-all pointer-events-none">
                      Phone (+977...)
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                    })}
                    type="email"
                    className="peer w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none text-lg transition-all"
                    placeholder=" "
                  />
                  <label className="absolute left-6 top-5 text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 transition-all pointer-events-none">
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    {...register("message", { required: "Please tell us about your trip" })}
                    rows={6}
                    className="peer w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-3xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none text-lg resize-none transition-all"
                    placeholder=" "
                  />
                  <label className="absolute left-6 top-5 text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 transition-all pointer-events-none">
                    Message / Trip Details
                  </label>
                </div>

                {Object.keys(errors).length > 0 && (
                  <p className="text-red-500 text-sm font-medium">
                    Please fill all fields correctly
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-7 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-purple-500/40 disabled:opacity-70 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 px-6 bg-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Visit Us in Biratnagar
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-md mx-auto mb-12">
            Our main office is located in Biratnagar
          </motion.p>

          <motion.div
            variants={scaleIn}
            className="rounded-3xl overflow-hidden shadow-2xl border border-gray-800 h-[420px] md:h-[620px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57112.51268383808!2d87.24354747432098!3d26.45233157501757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef744704331cc5%3A0x6d9a852652399d94!2sBiratnagar!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nepal Bike Rental - Biratnagar Location"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}