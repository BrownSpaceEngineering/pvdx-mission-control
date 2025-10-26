"use client";

import { useState } from "react";

export default function CodingEnv() {
  const [selectedCategory, setSelectedCategory] = useState("basic");

  const categories = [
    { name: "Basic", id: "basic", color: "bg-[#41afaa]" },
    { name: "Input", id: "input", color: "bg-[#466eb4]" },
    { name: "Loops", id: "loops", color: "bg-[#00a0e1]" },
    { name: "Logic", id: "logic", color: "bg-[#e6a532]" },
    { name: "Variables", id: "variables", color: "bg-[#d7642c]" },
    { name: "Math", id: "math", color: "bg-[#af4b91]" },
  ];

  return (
    <div className="h-screen bg-[#e8eef5] flex overflow-hidden">
      {/* Left Sidebar with Category Buttons */}
      <div className="bg-[#1a3a5c] p-4 flex flex-col gap-3 relative">
        {/* Dotted pattern background */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          opacity: 0.5
        }}></div>
        <div className="relative z-10 flex flex-col gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`${category.color} text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity ${
                selectedCategory === category.id ? "underline" : ""
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="bg-gray-300 rounded-xl h-full p-6 flex gap-6">
          {/* Central Block Area */}
          <div className="flex-1 flex flex-col">
            {/* Empty workspace */}
          </div>

          {/* Right Panel - Display and Controls */}
          <div className="w-80 bg-[#1a3a5c] rounded-lg p-6 flex flex-col gap-6">
            {/* Display Screen */}
            <div className="bg-white rounded-lg flex-1 p-4 shadow-inner">
              <div className="text-gray-600 text-center h-full flex items-center justify-center">
                <p className="text-gray-400">Display Output</p>
              </div>
            </div>

            {/* Media Controls */}
            <div className="flex gap-4 justify-center">
              {/* Stop Button */}
              <button className="w-16 h-16 bg-[#2F3F60] rounded-full flex items-center justify-center hover:opacity-90 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <rect x="8" y="8" width="8" height="8" />
                </svg>
              </button>
              
              {/* Play Button */}
              <button className="w-16 h-16 bg-[#41afaa] rounded-full flex items-center justify-center hover:bg-[#359e9a] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              
              {/* Record Button */}
              <button className="w-16 h-16 bg-[#2F3F60] rounded-full flex items-center justify-center hover:opacity-90 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <circle cx="12" cy="12" r="6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

