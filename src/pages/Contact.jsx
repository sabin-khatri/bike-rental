import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

// Icons
const IconPhone = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconMail = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconMapPin = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconWhatsapp = () => (
  <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.044h-.004c-1.56 0-3.092-.416-4.437-1.206l-.313-.187-4.054 1.062 1.081-3.938-.255-.405c-.841-1.336-1.286-2.882-1.285-4.462 0-4.606 3.76-8.337 8.398-8.337 2.24 0 4.348 1.038 5.756 2.784 1.406 1.746 2.09 4.065 2.088 6.683-.004 4.606-3.764 8.337-8.395 8.337z" />
  </svg>
);

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Thank you!");
    reset();
  };

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-hidden font-sans">
     
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="src/assets/bikes/contact.webp"
            alt="Contact Us - Nepal Bike Rental"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-slate-50/10" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto text-white">
          <motion.span
            variants={fadeInUp}
            className="inline-block px-6 py-2 mb-8 rounded-full bg-cyan-900/70 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-sm font-bold tracking-widest"
          >
            24/7 SUPPORT • ALWAYS HERE
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
          >
            Get In Touch <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              With Us
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Call • WhatsApp • Email — we reply in under 5 minutes, any time!
          </motion.p>
        </div>
      </motion.section>

    
      <section className="py-24 px-6 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-gray-900 mb-12">
              We're Here to Help
            </motion.h2>

            <div className="space-y-8">
              {[
                { icon: IconPhone, title: "Phone / WhatsApp", info: "+977 984-XXXXXXX", color: "cyan" },
                { icon: IconMail, title: "Email Us", info: "contact@nepalbikerental.com", color: "purple" },
                { icon: IconMapPin, title: "Visit Us", info: "Main Road, Biratnagar\nThamel, Kathmandu\nLakeside, Pokhara", color: "blue" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <item.icon />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 whitespace-pre-line text-lg font-medium">{item.info}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

        
            <motion.div variants={fadeInUp} className="mt-12 flex flex-col sm:flex-row gap-6">
              <a
                href="tel:+977984XXXXXX"
                className="px-10 py-5 bg-cyan-500 text-black font-bold text-xl rounded-full shadow-2xl hover:shadow-cyan-500/50 hover:bg-cyan-400 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <IconPhone /> Call Now
              </a>
              <a
                href="https://wa.me/977984XXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-green-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-green-600/50 hover:bg-green-500 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <IconWhatsapp /> WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 border border-gray-100"
          >
            <h3 className="text-4xl font-black text-gray-900 mb-4">Send us a Message</h3>
            <p className="text-gray-600 mb-10 text-lg">We reply within 2 hours — guaranteed!</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              <div className="grid md:grid-cols-2 gap-7">
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Name"
                  className="px-6 py-5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all text-lg"
                />
                <input
                  {...register("phone", { required: "Phone is required" })}
                  placeholder="Your Phone (+977...)"
                  className="px-6 py-5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all text-lg"
                />
              </div>

              <input
                {...register("email", { required: "Email required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all text-lg"
              />

              <textarea
                {...register("message", { required: "Message is required" })}
                rows="6"
                placeholder="Tell us about your trip..."
                className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all resize-none text-lg"
              />

              {(errors.name || errors.email || errors.phone || errors.message) && (
                <p className="text-red-500 font-medium">Please fill all fields correctly</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

  
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 px-6 bg-gray-900"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-white mb-12">
            Find Us in Biratnagar
          </motion.h2>
          <motion.div variants={scaleIn} className="rounded-3xl overflow-hidden shadow-2xl h-96 md:h-[550px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57112.51268383808!2d87.24354747432098!3d26.45233157501757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef744704331cc5%3A0x6d9a852652399d94!2sBiratnagar!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location in Biratnagar"
            ></iframe>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}