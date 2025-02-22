"use client";

export default function TechStack() {
  const techs = ["React", "Next.js", "Tailwind", "Node.js", "MongoDB", "Firebase", "AWS", "GraphQL", "Docker"];

  return (
    <div className="w-full p-6">
      <div className="flex items-start gap-6">
        {/* Left: Tech Stack Label */}
        <h2 className="w-1/4 text-[#274C77] font-medium text-lg">Tech Stack</h2>

        {/* Right: Tech Stack Container */}
        <div className="w-3/4 p-2  rounded-md text-gray-400 placeholder-gray-400 flex flex-wrap gap-2">
          {techs.map((tech, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-[#6096BA] text-[#FFFFFF] font-semibold rounded-lg shadow-md"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
