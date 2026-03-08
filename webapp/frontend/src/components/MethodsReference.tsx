"use client";

import { useState } from "react";
import { METHOD_REFERENCE, Category } from "@/lib/p5AllowedMethods";

export default function MethodsReference() {
  const [activeTab, setActiveTab] = useState(0);
  const category: Category = METHOD_REFERENCE[activeTab];

  return (
    <div className="bg-[#1a3a5c] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#2F3F60]">
        <h2 className="text-white font-bold text-lg tracking-wide">p5.js Method Reference</h2>
        <p className="text-[#41afaa] text-sm mt-0.5">All methods must be called with <span className="font-mono">p.</span> prefix — e.g. <span className="font-mono">p.ellipse()</span></p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 pt-3 flex-wrap">
        {METHOD_REFERENCE.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => setActiveTab(i)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              backgroundColor: activeTab === i ? cat.color : "#2F3F60",
              color: activeTab === i ? "#fff" : "#a0b4c8",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Method cards */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {category.methods.map((method) => (
          <div
            key={method.name}
            className="bg-[#2F3F60] rounded-lg p-3 flex flex-col gap-1"
          >
            <div className="font-mono text-sm font-semibold leading-tight" style={{ color: category.color }}>
              {method.name}()
            </div>
            <div className="font-mono text-xs text-[#6b8aaa]">
              {method.params || "no params"}
            </div>
            <div className="text-xs text-[#a0b4c8] leading-snug mt-1">{method.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
