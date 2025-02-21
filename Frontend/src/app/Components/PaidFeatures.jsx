"use client";

import { useState } from "react";

export default function PaidFeature() {
  const [featureText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit."
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-center text-2xl font-bold mb-4">Product Features</h2>
      <div className="p-4 border border-gray-300 rounded-lg bg-gray-100">
        <p className="text-gray-700">{featureText}</p>
      </div>
    </div>
  );
}
