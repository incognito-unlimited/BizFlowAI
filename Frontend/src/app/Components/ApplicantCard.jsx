"use client";

export default function ApplicantCard({ applicant }) {
  const formatExperience = ({ years, months }) => {
    if (years >= 1) {
      if (months > 6) return `${years}.5 years`;
      return `${years} years`;
    }
    return `${months} months`;
  };

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (applicant.matchPercentage / 100) * circumference;

  return (
    <div className="w-full bg-[#C0D1E4] mb-10 border border-[#C0D1E4] shadow-lg rounded-2xl p-6 flex justify-between items-center">
      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-semibold text-[#1C2B4B] mb-3">{applicant.name}</h2>

        <h3 className="text-[#336699] font-medium mb-2">Experience:</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(applicant.experience).map(([tech, duration], index) => (
            <div key={index} className="px-3 py-1 bg-[#4A81C4] text-white font-medium rounded-md">
              {tech}: {formatExperience(duration)}
            </div>
          ))}
        </div>

        <p className="text-gray-600 font-medium mb-3">
          Salary Expectation: <span className="text-[#1C2B4B] font-semibold">{applicant.salaryExpectation}</span>
        </p>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button className="bg-[#4A81C4] text-white px-4 py-2 rounded-lg hover:bg-[#3B6CA8] transition">
            View Resume
          </button>
          <button className="bg-[#3BAA66] text-white px-4 py-2 rounded-lg hover:bg-[#2F8A52] transition">
            Book Interview
          </button>
        </div>
      </div>

      {/* Right Section - Circular Progress */}
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} stroke="#A6B8CC" strokeWidth="8" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#4A81C4"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-[#4A81C4]">
          {applicant.matchPercentage}%
        </span>
      </div>
    </div>
  );
}

