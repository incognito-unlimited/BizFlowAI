"use client";

export default function ApplicantCard() {
  const applicant = {
    name: "John Doe",
    experience: {
      React: { years: 2, months: 7 },
      "Next.js": { years: 1, months: 4 },
      Node: { years: 0, months: 8 },
      MongoDB: { years: 3, months: 2 },
      GraphQL: { years: 1, months: 6 },
    },
    salaryExpectation: "₹80,000/month",
    matchPercentage: 85, // Percentage value (0 to 100)
  };

  // Function to format experience correctly
  const formatExperience = ({ years, months }) => {
    if (years >= 1) {
      if (months > 6) return `${years}.5 years`; // Round to .5
      return `${years} years`; // Keep whole number
    }
    return `${months} months`; // Less than 1 year, show months
  };

  // Circle progress settings
  const radius = 40; // Increased radius for better padding
  const circumference = 2 * Math.PI * radius;
  const progress = (applicant.matchPercentage / 100) * circumference;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl flex justify-between items-center mt-10">
      {/* Left Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{applicant.name}</h2>

        {/* Experience Section - Styled Like Tech Stack */}
        <h3 className="text-gray-600 font-semibold mb-2">Experience:</h3>
        <div className="flex flex-wrap gap-3 mb-3">
          {Object.entries(applicant.experience).map(([tech, duration], index) => (
            <div key={index} className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-lg shadow-md">
              {tech}: {formatExperience(duration)}
            </div>
          ))}
        </div>

        {/* Salary Expectation */}
        <p className="text-gray-600 font-semibold mb-3">
          Salary Expectation: <span className="text-gray-800 font-bold">{applicant.salaryExpectation}</span>
        </p>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            View Resume
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Book Interview
          </button>
        </div>
      </div>

      {/* Right Section - Full Circular Progress Bar with More Padding */}
      <div className="relative w-28 h-28"> {/* Increased width & height for padding */}
        <svg className="w-full h-full" viewBox="0 0 120 120"> {/* Increased viewBox for better spacing */}
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="blue"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
        {/* Percentage Text in the Center */}
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-blue-800">
          {applicant.matchPercentage}%
        </span>
      </div>
    </div>
  );
}
