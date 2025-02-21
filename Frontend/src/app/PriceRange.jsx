"use client";

export default function PriceRange() {
  const priceRange = "₹5,000 - ₹10,000"; // Example price range

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 flex items-center">
      <h2 className="text-lg font-semibold text-gray-700 mr-4">Best Price Range</h2>
      <div className="px-4 py-2 bg-green-100 text-green-800 font-bold rounded-lg shadow-md">
        {priceRange}
      </div>
    </div>
  );
}
