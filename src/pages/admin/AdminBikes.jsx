import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { bikes as defaultBikes } from "../../data/bikes";

const AdminBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Cruiser");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("Biratnagar");
  const [engine, setEngine] = useState("");
  const [mileage, setMileage] = useState("");
  const [weight, setWeight] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchBikes = () => {
    const custom = JSON.parse(localStorage.getItem("customBikes") || "[]");
    setBikes([...defaultBikes, ...custom]);
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleAddBike = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const newBike = {
      id: Date.now(),
      name,
      category,
      price: Number(price),
      location,
      image: imageUrl.trim() || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop",
      specs: {
        engine: engine.trim() || "150cc",
        mileage: mileage.trim() || "40 km/l",
        weight: weight.trim() || "140 kg"
      },
      rating: 4.8,
      popular: false
    };

    const custom = JSON.parse(localStorage.getItem("customBikes") || "[]");
    localStorage.setItem("customBikes", JSON.stringify([...custom, newBike]));
    fetchBikes();

    setIsModalOpen(false);
    // Reset Form
    setName("");
    setCategory("Cruiser");
    setPrice("");
    setLocation("Biratnagar");
    setEngine("");
    setMileage("");
    setWeight("");
    setImageUrl("");

    Swal.fire({
      icon: "success",
      title: "Bike Added!",
      text: `${name} has been successfully added to your rental fleet.`,
      confirmButtonColor: "#EA580C"
    });
  };

  const handleRemoveBike = (bikeId) => {
    // Check if it's custom
    const custom = JSON.parse(localStorage.getItem("customBikes") || "[]");
    const isCustom = custom.some(b => b.id === bikeId);

    if (!isCustom) {
      Swal.fire({
        icon: "warning",
        title: "Standard Bike",
        text: "You can only remove custom added bikes in this prototype.",
        confirmButtonColor: "#EA580C"
      });
      return;
    }

    Swal.fire({
      title: "Remove Bike?",
      text: "Are you sure you want to remove this bike from the inventory?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Remove It"
    }).then(result => {
      if (result.isConfirmed) {
        const updated = custom.filter(b => b.id !== bikeId);
        localStorage.setItem("customBikes", JSON.stringify(updated));
        fetchBikes();

        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "The bike has been removed.",
          confirmButtonColor: "#EA580C"
        });
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-950">Bike Fleet Inventory</h2>
          <p className="text-xs text-gray-500 mt-0.5">Manage and add motorcycle options to your catalog</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-xs shadow-sm transition-all cursor-pointer"
        >
          + Add New Bike
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-slate-50 text-xs uppercase font-bold text-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3 border-b border-gray-150">Bike Model</th>
              <th scope="col" className="px-4 py-3 border-b border-gray-150">Category</th>
              <th scope="col" className="px-4 py-3 border-b border-gray-150">Location</th>
              <th scope="col" className="px-4 py-3 border-b border-gray-150">Engine</th>
              <th scope="col" className="px-4 py-3 border-b border-gray-150">Rate / Day</th>
              <th scope="col" className="px-4 py-3 border-b border-gray-150 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-150">
            {bikes.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/50">
                <td className="px-4 py-4 font-bold text-gray-900 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-8 bg-white border rounded flex items-center justify-center">
                    <img src={b.image} alt={b.name} className="h-full object-contain p-0.5" />
                  </div>
                  <span>{b.name}</span>
                </td>
                <td className="px-4 py-4 border-b border-gray-100 uppercase text-xs font-semibold">{b.category}</td>
                <td className="px-4 py-4 border-b border-gray-100">{b.location}</td>
                <td className="px-4 py-4 border-b border-gray-100 text-xs">{b.specs?.engine || "N/A"}</td>
                <td className="px-4 py-4 font-bold text-orange-600 border-b border-gray-100">Rs {b.price}</td>
                <td className="px-4 py-4 border-b border-gray-100 text-right">
                  <button
                    onClick={() => handleRemoveBike(b.id)}
                    className="px-2.5 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Bike Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl border border-gray-200"
            >
              <div className="bg-slate-50 border-b border-gray-150 p-5 flex justify-between items-center">
                <h3 className="text-sm font-bold text-gray-900 uppercase">Add New Motorcycle</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 font-bold hover:text-gray-600">✕</button>
              </div>

              <form onSubmit={handleAddBike} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Bike Model Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Royal Enfield Classic 350"
                    className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-orange-500"
                    >
                      <option value="Cruiser">Cruiser</option>
                      <option value="Street">Street</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Sport">Sport</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Daily Rate (Rs)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="1500"
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Location</label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-orange-500"
                    >
                      <option value="Biratnagar">Biratnagar</option>
                      <option value="Belbari">Belbari</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Engine Size</label>
                    <input
                      type="text"
                      value={engine}
                      onChange={(e) => setEngine(e.target.value)}
                      placeholder="350cc"
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Mileage</label>
                    <input
                      type="text"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      placeholder="35 km/l"
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Weight</label>
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="195 kg"
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Image URL (Optional)</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/bike.jpg"
                    className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-gray-150">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold shadow-sm"
                  >
                    Add Bike
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminBikes;
