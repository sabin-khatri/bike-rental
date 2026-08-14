import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you! We will get back to you within 2 hours.",
      confirmButtonColor: "#EA580C"
    });
    reset();
  };

  return (
    <div className="bg-slate-50 text-gray-800 min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 md:pt-32 md:pb-20 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 px-3 py-1.5 bg-orange-50 rounded-full">
            Contact Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            Get In Touch With Us
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Have questions about our fleet, rates, or rental policies? Drop us a message, and our team will get back to you within 2 hours.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="md:col-span-5 bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Our Office Locations</h2>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-orange-600">Primary Hub</h4>
                <p className="text-sm font-semibold text-gray-800">Biratnagar Main Station</p>
                <p className="text-xs text-gray-500">Traffic Chowk, Biratnagar, Nepal</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-orange-600">Secondary Hub</h4>
                <p className="text-sm font-semibold text-gray-800">Belbari Delivery Point</p>
                <p className="text-xs text-gray-500">Mahendra Highway, Belbari, Nepal</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase text-orange-600">Call Support</h4>
                <p className="text-sm font-semibold text-gray-800">+977 9812345678</p>
                <p className="text-xs text-gray-500">Available 7:00 AM - 9:00 PM</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-orange-600">Email Address</h4>
                <p className="text-sm font-semibold text-gray-800">info@bikerental.com</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="tel:+9779812345678"
                className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-all"
              >
                Call Support
              </a>
              <a
                href="https://wa.me/9779812345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#25D366] hover:bg-[#22c35e] text-white font-semibold text-sm py-2.5 rounded-lg transition-all"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="md:col-span-7 bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send A Message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Your Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className="w-full px-3 py-2 bg-slate-50 border border-gray-200 text-gray-800 rounded-lg outline-none text-sm focus:border-orange-500 focus:bg-white transition-all"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
                  <input
                    {...register("phone", { required: "Phone is required" })}
                    type="text"
                    className="w-full px-3 py-2 bg-slate-50 border border-gray-200 text-gray-800 rounded-lg outline-none text-sm focus:border-orange-500 focus:bg-white transition-all"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                  })}
                  type="email"
                  className="w-full px-3 py-2 bg-slate-50 border border-gray-200 text-gray-800 rounded-lg outline-none text-sm focus:border-orange-500 focus:bg-white transition-all"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Message</label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-50 border border-gray-200 text-gray-800 rounded-lg outline-none text-sm focus:border-orange-500 focus:bg-white transition-all resize-none"
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold text-sm rounded-lg transition-all cursor-pointer shadow-sm"
              >
                {isSubmitting ? "Sending message..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}