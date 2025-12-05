"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [showHomePanel, setShowHomePanel] = useState(false);
    const [showPvdxPanel, setShowPvdxPanel] = useState(false);
    const [showReviewPanel, setShowReviewPanel] = useState(false);
    
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
                {/* Home Trigger */}
                <button
                    onClick={() => setShowHomePanel(true)}
                    className="text-white hover:text-gray-300 font-semibold text-xl"
                >
                    About PVDX
                </button>
                {/* PVDX Trigger */}
                <button
                    onClick={() => setShowPvdxPanel(true)}
                    className="text-white hover:text-gray-300 font-semibold text-xl"
                >
                    FAQ
                </button>
                {/* Review/Submit Trigger */}
                <button
                    onClick={() => setShowReviewPanel(true)}
                    className="text-white hover:text-gray-300 font-semibold text-xl"
                >
                    Review / Submit
                </button>
            </div>
            

            {/* Click-outside overlay */}
            <div
                onClick={() => setShowHomePanel(false)}
                className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
                    showHomePanel ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />
            {/* PVDX PANEL (Right Side Drawer) */}
            <div
            className={`fixed top-0 right-0 h-full w-100 bg-[#3B4F7A] shadow-2xl p-6 z-50 rounded-l-lg transition-all duration-300 ease-in-out ${
                showHomePanel ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            } flex flex-col`}
            >
            {/* Close Button */}
            <button
                onClick={() => setShowHomePanel(false)}
                className="text-white text-2xl absolute top-4 right-4 hover:text-gray-600"
            >
                ✕
            </button>

            <h3 className="text-[28px] font-bold text-white mb-4 text-center">About PVDX</h3>

            <div className="flex justify-center mb-6">
            <Image
                src="/pvdx-space.jpg"
                alt="Example"
                width={360}
                height={240}
                className="rounded-md"
            />
            </div>

            {/* Scrollable Text */}
            <div className="overflow-y-auto h-[70%] text-left no-scrollbar">
                <p className="text-white text-sm font-bold leading-relaxed tracking-widest mb-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                The primary mission of PVDX (Perovskite Visuals and Degradation eXperiment)
                is to test the performance of next-generation perovskite solar cells in the harsh orbital 
                environment. Perovskites are emerging as a low-cost challenger to silicon for making highly 
                efficient solar cells. A research team led by Brown professor Nitin Padture has made key 
                contributions to the development of perovskites, and the BSE team is working with Padture’s 
                group to develop perovskite cells for PVDX. The team aims to find out how this type of solar 
                cell, which has never flown in space, performs in an environment where temperatures can swing 
                by as much a 500 degrees Fahrenheit. 
                </p>
                <p className="text-white text-sm font-bold leading-relaxed tracking-widest mb-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                PVDX’s secondary mission is to engage K-12 students in space exploration. 
                The plan is to allow students to send short messages to the satellite, which is displayed on an LED screen
                on one side of the spacecraft. A camera attached to a small robotic arm on PVDX snaps a picture of the 
                display — with an orbital view of the Earth providing the backdrop — and transmits that picture back to the students from space. 
                The idea is that space is accessible, and getting there isn’t as difficult as you may think.
                </p>
            </div>
            </div>


            {/* Click-outside overlay */}
            <div
                onClick={() => setShowPvdxPanel(false)}
                className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
                    showPvdxPanel ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />
            {/* PVDX PANEL (Right Side Drawer) */}
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

            <h3 className="text-[28px] font-bold text-white mb-4 text-center">About PVDX</h3>

            <div className="flex justify-center mb-6">
            <Image
                src="/pvdx-space.jpg"
                alt="Example"
                width={360}
                height={240}
                className="rounded-md"
            />
            </div>

            {/* Scrollable Text */}
            <div className="overflow-y-auto h-[70%] text-left no-scrollbar">
                <p className="text-white text-sm font-bold leading-relaxed tracking-widest mb-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                The primary mission of PVDX (Perovskite Visuals and Degradation eXperiment)
                is to test the performance of next-generation perovskite solar cells in the harsh orbital 
                environment. Perovskites are emerging as a low-cost challenger to silicon for making highly 
                efficient solar cells. A research team led by Brown professor Nitin Padture has made key 
                contributions to the development of perovskites, and the BSE team is working with Padture’s 
                group to develop perovskite cells for PVDX. The team aims to find out how this type of solar 
                cell, which has never flown in space, performs in an environment where temperatures can swing 
                by as much a 500 degrees Fahrenheit. 
                </p>
                <p className="text-white text-sm font-bold leading-relaxed tracking-widest mb-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                PVDX’s secondary mission is to engage K-12 students in space exploration. 
                The plan is to allow students to send short messages to the satellite, which is displayed on an LED screen
                on one side of the spacecraft. A camera attached to a small robotic arm on PVDX snaps a picture of the 
                display — with an orbital view of the Earth providing the backdrop — and transmits that picture back to the students from space. 
                The idea is that space is accessible, and getting there isn’t as difficult as you may think.
                </p>
            </div>
            </div>


            {/* Click-outside overlay */}
            <div
                onClick={() => setShowReviewPanel(false)}
                className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
                    showReviewPanel ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />
            {/* Review PANEL (Right Side Drawer) */}
            <div
            className={`fixed top-0 right-0 h-full w-100 bg-[#3B4F7A] shadow-2xl p-6 z-50 rounded-l-lg transition-all duration-300 ease-in-out ${
                showReviewPanel ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            } flex flex-col`}
            >
            {/* Close Button */}
            <button
                onClick={() => setShowReviewPanel(false)}
                className="text-white text-2xl absolute top-4 right-4 hover:text-gray-600"
            >
                ✕
            </button>

            <h3 className="text-[28px] font-bold text-white mb-4 text-center">Ready to Launch?</h3>

            <div className="flex flex-col items-center mb-6">
            <Image
                src="/rocket-orion-spacecraft.jpg"
                alt="Example"
                width={360}
                height={240}
                className="rounded-md"
            />
            <p className="text-[10px] text-gray-300 mt-1 font-bold">
                Artist concept of SLS rocket and Orion spacecraft. 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Credit: NASA
            </p>
            </div>

            {/* Scrollable Text */}
            <div className="overflow-y-auto h-[70%] text-left no-scrollbar">
                <p className="text-white text-sm font-bold leading-relaxed tracking-widest mb-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                To send us your work &lt; ADD MORE TEXT &gt;
                </p>
            </div>
            </div>

        </nav>
    );
}