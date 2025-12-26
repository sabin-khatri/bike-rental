import { Link } from "react-router-dom";
import React from "react";

// Simple SVG Icons
const IconMapPin = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconStar = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
  </svg>
);

export default function BikeCard({ bike, onBook }) {
  return (
    <div 
      onClick={() => onBook && onBook(bike)}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 cursor-pointer"
    >
     
      {bike.popular && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg">
            MOST POPULAR
          </span>
        </div>
      )}

      
      <div className="relative h-64 overflow-hidden">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black text-gray-900 mb-2">{bike.name}</h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <IconMapPin />
            <span>{bike.location}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <IconStar />
            <span className="font-semibold text-gray-600">{bike.rating}</span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Rs {bike.price}
            </span>
            <span className="text-gray-500 text-sm ml-1">/day</span>
          </div>
        </div>

      
        <div className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg hover:shadow-cyan-500/50">
          Book This Bike
          <IconArrowRight />
        </div>

        <div className="w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl text-center group-hover:opacity-0 transition-opacity duration-300">
          Click to Book
        </div>
      </div>
    </div>
  );
}