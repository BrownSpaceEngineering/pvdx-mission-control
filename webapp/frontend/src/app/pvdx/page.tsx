import Navbar from "@/components/Navbar";
import React from "react"; 

const BatteryCircle = ({ voltage, label }: { voltage: string, label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-20 h-20 rounded-full bg-green-600/80 border-2 border-green-400 flex items-center justify-center shadow-lg">
      <span className="font-bold text-xl text-white">{voltage}V</span>
    </div>
    <span className="text-sm text-gray-400">{label}</span>
  </div>
);

export default function Home() {
  return (
    // Main page container
    <div className="min-h-screen flex flex-col bg-[#0f1c35] text-white">
      <Navbar />

      {/* Main content area, scrolls independently of Navbar */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        
        {/* Main grid layout for the cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Card 1: Last Transmission (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-[#1a2d4a] rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between">
              {/* Left Side */}
              <div>
                {/* TODO: Add Clock Icon here */}
                <h3 className="text-2xl font-semibold mb-4">Last Transmission</h3>
                <div className="space-y-1 text-gray-300">
                  <p>
                    <span className="font-medium text-gray-400">Received: </span>
                    8 months
                  </p>
                  <p>
                    <span className="font-medium text-gray-400">FH WN #: </span>
                    3339908
                  </p>
                  <p>
                    <span className="font-medium text-gray-400">Current State: </span>
                    <span className="font-bold text-red-400">LOW POWER</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-400">Message Type: </span>
                    LOW POWER
                  </p>
                  <p>
                    <span className="font-medium text-gray-400">Boot Count: </span>
                    8
                  </p>
                </div>
              </div>
              {/* Right Side */}
              <div className="mt-4 md:mt-0">
                <p className="text-gray-500 italic">
                    
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Battery Info */}
          <div className="bg-[#1a2d4a] rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Battery Info</h3>
            
            {/* Li-ion Section */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-300 mb-4">Li-ion</h4>
              <div className="flex flex-wrap gap-4">
                <BatteryCircle voltage="4.08" label="1" />
                <BatteryCircle voltage="4.08" label="2" />
              </div>
            </div>

            {/* LifePO4 Section */}
            <div>
              <h4 className="text-lg font-medium text-gray-300 mb-4">LifePO4</h4>
              <div className="flex flex-wrap gap-4">
                <BatteryCircle voltage="4.08" label="1" />
                <BatteryCircle voltage="4.08" label="2" />
                <BatteryCircle voltage="4.08" label="3" />
                <BatteryCircle voltage="4.08" label="4" />
              </div>
            </div>
          </div>

          {/* Card 3: Ambient Temperatures */}
          <div className="bg-[#1a2d4a] rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Ambient Temperatures</h3>
            <div className="flex flex-col md:flex-row justify-around items-center gap-6 mt-8">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-yellow-500">124 C</span>
                <span className="text-sm text-gray-400 mt-2">Radio</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-yellow-500">24.38 C</span>
                <span className="text-sm text-gray-400 mt-2">Radio</span>
              </div>
            </div>
          </div>

          {/* Card 4: IMU (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-[#1a2d4a] rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">IMU</h3>
            
            {/* IMU Data Grid */}
            <div className="grid grid-cols-3 gap-6 text-center md:text-left">
              {/* Acc */}
              <div>
                <h4 className="text-lg font-medium text-gray-300 mb-4 border-b border-gray-600 pb-2">Acc</h4>
                <div className="space-y-1 text-gray-300">
                  <p><span className="text-gray-400">X: </span>10g</p>
                  <p><span className="text-gray-400">Y: </span>10g</p>
                  <p><span className="text-gray-400">Z: </span>10g</p>
                </div>
              </div>
              {/* Gyro */}
              <div>
                <h4 className="text-lg font-medium text-gray-300 mb-4 border-b border-gray-600 pb-2">Gyro</h4>
                <div className="space-y-1 text-gray-300">
                  <p><span className="text-gray-400">X: </span>10 d/s</p>
                  <p><span className="text-gray-400">Y: </span>10 d/s</p>
                  <p><span className="text-gray-400">Z: </span>10 d/s</p>
                </div>
              </div>
              {/* Mag */}
              <div>
                <h4 className="text-lg font-medium text-gray-300 mb-4 border-b border-gray-600 pb-2">Mag</h4>
                <div className="space-y-1 text-gray-300">
                  <p><span className="text-gray-400">X: </span>10 mG</p>
                  <p><span className="text-gray-400">Y: </span>10 mG</p>
                  <p><span className="text-gray-400">Z: </span>10 mG</p>
                </div>
              </div>
            </div>

            {/* Placeholder text at bottom */}
            <div className="mt-8 flex flex-col md:flex-row justify-between text-gray-600 italic gap-4">
              <span>put a vector here</span>
              <span>put a vector here</span>
              <span>put a vector here</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}