"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [showPvdxPanel, setShowPvdxPanel] = useState(false);
    
    return (
        <nav className="w-full bg-[#2F3F60] px-8 py-4 flex items-center justify-between relative">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <a
                    href="https://brownspace.io"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/bse-logo-light.png"
                        alt="BSE Logo"
                        width={140}
                        height={140}
                        className="cursor-pointer"
                    />
                </a>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center gap-12">
                <a className="text-white hover:text-gray-300 font-semibold text-xl">Home</a>
                {/* PVDX Trigger */}
                <button
                    onClick={() => setShowPvdxPanel(true)}
                    className="text-white hover:text-gray-300 font-semibold text-xl"
                >
                    PVDX
                </button>
                <a className="text-white hover:text-gray-300 font-semibold text-xl">Learn</a>
                <a className="text-white hover:text-gray-300 font-semibold text-xl">About</a>
            </div>
            
            {/* Click-outside overlay */}
            <div
                onClick={() => setShowPvdxPanel(false)}
                className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
                    showPvdxPanel ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />
            
            {/* Sliding PANEL (Right Side Drawer) */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl p-6 z-50 rounded-l-lg transition-all duration-300 ease-in-out ${
                    showPvdxPanel ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setShowPvdxPanel(false)}
                    className="text-black text-2xl absolute top-4 right-4 hover:text-gray-600"
                >
                    ✕
                </button>
                <h3 className="text-xl font-bold text-black mb-4">PVDX Info</h3>
                <Image
                    src="/bse-logo-light.png"
                    alt="Example"
                    width={300}
                    height={200}
                    className="rounded-md mb-4"
                />
                <p className="text-black text-sm">
                    This sliding window can hold images, descriptions, and any content you want.
                </p>
            </div>
        </nav>
    );
}