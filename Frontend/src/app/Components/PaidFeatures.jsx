"use client";

import { useState } from "react";

export default function PaidFeature() {
  const [featureText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. v Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit."
  );

  return (
    <div className="w-full p-6">
      <div className="flex space-x-4">
        {/* Left: Product Features Label */}
        <h2 className="w-1/4 mt-[10px] text-[#274C77] font-medium text-lg">
          Product Features
        </h2>

        {/* Right: Feature Text Box */}
        <div className="w-3/4 p-2 bg-[#F0F6FC] py-4 px-6 text-justify rounded-md text-[#274C77] placeholder-gray-400">
          <p>{featureText}</p>
        </div>
      </div>
    </div>
  );
}
