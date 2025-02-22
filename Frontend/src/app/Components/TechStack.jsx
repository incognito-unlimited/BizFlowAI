"use client";

export default function TechStack() {
  const techs = ["React", "Next.js", "Node.js", "MongoDB", "GraphQL",];

  return (
    <div className="w-full p-6">
      <div className="flex flex-col space-y-2">
        {/* Tech Stack Label */}
        <h2 className="text-white font-medium text-base">Tech Stack</h2>

        {/* Tech Stack Container */}
        <div className="p-2 rounded-md flex flex-wrap gap-2">
          {techs.map((tech, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-[#6096BA] text-white/70 font-medium rounded-lg shadow-md"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

