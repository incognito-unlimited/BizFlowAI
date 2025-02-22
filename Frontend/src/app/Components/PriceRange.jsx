"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function PriceRange() {
  const priceRange = "₹1,50,000 - ₹2,00,000"; // Example price range

  // Sample Data for Cost vs. Time
  const data = [
    { time: "2019", cost: 120000 },
    { time: "2020", cost: 130000 },
    { time: "2021", cost: 80000 },
    { time: "2022", cost: 150000 },
    { time: "2023", cost: 180000 }, // Highlight this point
    { time: "2024", cost: 190000 },
    { time: "2025", cost: 200000 },
  ];

  return (
    <div className="w-full p-6">
      <div className="flex flex-col space-y-4">
        {/* Best Price Range Label */}
        <h2 className="text-white/70 font-medium text-lg">Best Price Range</h2>

        {/* Price Box */}
        <div className="px-4 py-2 bg-[#6096BA] w-fit text-white/70 font-semibold rounded-lg shadow-md">
          {priceRange}
        </div>

        {/* Graph Container */}
        <div className="w-full h-64 bg-white/10 p-4 rounded-lg backdrop-blur-md">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
              <XAxis dataKey="time" stroke="white" tick={{ fontSize: 10 }} />
              <YAxis stroke="white" tick={{ fontSize: 10 }} />
              <Tooltip />

              {/* Line Graph */}
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#6096BA"
                strokeWidth={3}
                dot={(dotProps) => {
                  const { cx, cy, payload, index } = dotProps; // Add index
                  const isHighlighted = payload.time === "2025"; // Check if this point is for 2025

                  return (
                    <g key={index}> {/* Add a key here */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHighlighted ? 8 : 4} // Adjust radius based on highlight
                        fill={isHighlighted ? "#1D4ED8" : "#fff"}
                        stroke="#FFFFFF"
                        strokeWidth={isHighlighted ? 2 : 0}
                      />
                    </g>
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

