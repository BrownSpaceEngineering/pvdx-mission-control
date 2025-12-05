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
            className={`fixed top-0 right-0 h-full w-100 bg-[#3B4F7A] shadow-2xl p-6 z-50 rounded-l-lg transition-all duration-300 ease-in-out ${
                showPvdxPanel ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            } flex flex-col`}
            >
            {/* Close Button */}
            <button
                onClick={() => setShowPvdxPanel(false)}
                className="text-white text-2xl absolute top-4 right-4 hover:text-gray-600"
            >
                ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-4 text-center">PVDX Info</h3>

            <div className="flex justify-center mb-6">
            <Image
                src="/pvdx-space.jpg"
                alt="Example"
                width={300}
                height={200}
                className="rounded-md"
            />
            </div>

            {/* Scrollable Text */}
            <div className="overflow-y-auto h-[70%] text-left no-scrollbar">
                <p className="text-white text-sm font-bold leading-relaxed tracking-widest mb-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                The primary mission of PVDX, which stands for Perovskite Visuals and Degradation eXperiment, 
                will be to test the performance of next-generation perovskite solar cells in the harsh orbital 
                environment. Perovskites are emerging as a low-cost challenger to silicon for making highly 
                efficient solar cells. A research team led by Brown professor Nitin Padture has made key 
                contributions to the development of perovskites, and the BSE team will work with Padture’s 
                group to develop perovskite cells for PVDX. The team aims to find out how this type of solar 
                cell, which has never flown in space, performs in an environment where temperatures can swing 
                by as much a 500 degrees Fahrenheit. 
                </p>
                <p className="text-white text-sm font-bold leading-relaxed tracking-widest mb-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                PVDX’s secondary mission is to engage K-12 students in space exploration. 
                The plan is to allow students to send short messages to the satellite, which will be displayed on an LED screen
                on one side of the spacecraft. A camera attached to a small robotic arm on PVDX will snap a picture of the 
                display — with an orbital view of the Earth providing the backdrop — and transmit that picture back to the 
                students from space. The idea, the team says, is to help create excitement about space exploration, and to 
                show students that getting there isn’t as difficult as they may think.
                </p>
            </div>
            </div>

        </nav>
    );
}