"use client";

export default function PriceRange() {
  const priceRange = "₹5,000 - ₹10,000"; // Example price range

  return (
    <div className="w-full p-6">
      <div className="flex items-center space-x-4">
      <h2 className="w-1/4 text-[#274C77] font-medium text-lg">Best Price Range</h2>
      <div className="w-3/4 p-2 rounded-md  placeholder-gray-400">
      <div className="px-4 py-2 bg-[#6096BA] w-fit text-white font-semibold rounded-lg shadow-md">
        {priceRange}
        </div>
      </div>
      </div>
    </div>
  );
}
