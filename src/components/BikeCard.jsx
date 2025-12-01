
import { Link } from "react-router-dom";
import { MapPin, Star, ArrowRight } from "lucide-react";

export default function BikeCard({ bike }) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
     
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
            <MapPin className="w-4 h-4 text-cyan-600" />
            <span>{bike.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-semibold">{bike.rating}</span>
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

      
        <Link
          to="/bikes"
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg hover:shadow-cyan-500/50"
        >
          Book This Bike
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Link>

        <div className="w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl text-center group-hover:opacity-0 transition-opacity duration-300">
          View Details
        </div>
      </div>
    </div>
  );
}