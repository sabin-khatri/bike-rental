/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Welcome to BikeRental support. How can we help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const triggerRef = useRef(null);

  const options = [
    { key: "how", text: "How to Rent? 🏍️", reply: "Simply browse our catalog, choose a bike, set your pickup/return dates, and submit your booking. You can complete verification in your profile." },
    { key: "docs", text: "Required Documents? 📄", reply: "You need a valid motorcycle driver's license. For international tourists, a valid International Driving Permit (IDP) is required." },
    { key: "delivery", text: "Is Delivery Free? 📍", reply: "Yes! Doorstep delivery and pick-up are completely free within Biratnagar and Belbari rental limits." },
    { key: "hotline", text: "Call Support Hotline 📞", reply: "You can reach our support team directly at +977 9812345678 between 7:00 AM and 9:00 PM." }
  ];

  // Auto-scroll to the latest message whenever messages or typing indicator change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isTyping, isOpen]);

  // Close on Escape, and return focus to the trigger button
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleOptionClick = (option) => {
    // Add user message
    const userMsg = { sender: "user", text: option.text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg = { sender: "bot", text: option.reply };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      {/* Trigger Button */}
      <motion.button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
        aria-expanded={isOpen}
        className="w-14 h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
      >
        {isOpen ? (
          <span className="text-xl font-bold" aria-hidden="true">✕</span>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-label="Rider support chat"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[400px] md:h-[450px]"
          >
            {/* Header */}
            <div className="bg-orange-600 p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full border border-white animate-pulse" aria-hidden="true" />
                <div>
                  <h4 className="text-sm font-bold leading-tight">Rider Support Chat</h4>
                  <p className="text-[10px] text-orange-100">Usually replies instantly</p>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs" aria-live="polite">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-orange-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-2.5 rounded-2xl rounded-bl-none text-gray-400 italic">
                    Support bot is typing...
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Panel */}
            <div className="p-3 border-t border-gray-200 bg-white shrink-0">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">Click query to ask:</p>
              <div className="flex flex-wrap gap-1.5">
                {options.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleOptionClick(opt)}
                    disabled={isTyping}
                    className="px-2.5 py-1.5 bg-slate-50 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-orange-600 text-[10px] font-semibold rounded-lg text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}