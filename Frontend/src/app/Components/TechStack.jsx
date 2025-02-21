"use client";

export default function TechStack() {
  const techs = ["React", "Next.js", "Tailwind", "Node.js", "MongoDB", "Firebase", "AWS", "GraphQL", "Docker"];

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-center text-2xl font-bold mb-4">Tech Stack</h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {techs.map((tech, index) => (
          <div key={index} className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-lg shadow-md">
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
