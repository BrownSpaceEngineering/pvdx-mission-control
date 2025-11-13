import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    // Ensure the overall container is at least the height of the screen
    <div className="min-h-screen flex flex-col bg-[#0f1c35] text-white">
      <Navbar />

      {/* Main Content: Increased vertical padding and gap */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-16 px-12 py-20 flex-grow">

        {/* Left Section */}
        <div className="flex flex-col gap-10 flex-1">
          {/* Satellite Image: Increased height and changed object-cover to object-contain */}
          <div className="bg-[#1a2d4a] rounded-2xl overflow-hidden shadow-lg h-[400px]">
            <Image
              src="/PVDX_screen.png"
              alt="Satellite Display"
              width={800} // Increased width for better resolution on larger screens
              height={400} // Matches the container height
              className="w-full h-full object-contain p-4" // Use object-contain and added padding
            />
          </div>

          {/* Mission Statement */}
          <div>
            <h2 className="text-4xl font-extrabold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
              Our primary mission is to prove the accessibility of space to
              people of all backgrounds, making satellite technology and data available to everyone.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-8 flex-1">
          {/* Last Transmission Card: Changed max-w-lg to max-w-full */}
          {/* Adjusted self-end to full width, the gap on the bottom row will provide the right spacing */}
          <div className="bg-[#2f3f60] rounded-2xl p-8 shadow-2xl w-full max-w-full"> {/* max-w-full for full width */}
            <h3 className="text-2xl font-bold">Last Transmission Status</h3>
            <p className="text-sm text-gray-300 mt-2">Received: 8 months ago</p>
            <p className="text-lg text-red-400 font-semibold mt-1">
              Current State:{" "}
              <span className="font-extrabold text-red-200">LOW POWER MODE</span>
            </p>

            {/* Telemetry Data */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {/* Solar Panel */}
              <div className="bg-[#415a8a] rounded-xl p-4 flex flex-col items-center">
                <p className="font-medium text-lg mb-2">Solar Panel Array</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {/* Increased circle size and adjusted font */}
                  <div className="w-20 h-20 bg-[#e6a532] rounded-full flex items-center justify-center text-white text-md font-bold shadow-lg">
                    3.09 V
                  </div>
                  <div className="w-20 h-20 bg-[#e6a532] rounded-full flex items-center justify-center text-white text-md font-bold shadow-lg">
                    3.09 V
                  </div>
                </div>
              </div>

              {/* Batteries */}
              <div className="bg-[#415a8a] rounded-xl p-4 flex flex-col items-center">
                <p className="font-medium text-lg mb-2">LifePO₄ Batteries</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {/* Increased circle size and adjusted font */}
                  <div className="w-20 h-20 bg-[#7b5ae0] rounded-full flex items-center justify-center text-white text-md font-bold shadow-lg">
                    3.09 V
                  </div>
                  <div className="w-20 h-20 bg-[#7b5ae0] rounded-full flex items-center justify-center text-white text-md font-bold shadow-lg">
                    3.09 V
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map & CAD: Adjusted flex-basis to fill space better and allow the top card to be full width */}
          <div className="flex gap-6 flex-wrap justify-center w-full"> {/* Changed lg:justify-end to w-full to align with top card */}
            {/* Map */}
            <div className="bg-[#1a2d4a] rounded-xl overflow-hidden shadow-xl flex-1 basis-0 min-w-[200px] max-w-xs md:max-w-none"> {/* Added basis-0 and adjusted max-w for responsiveness */}
              <div className="text-md font-semibold text-gray-400 p-3 border-b border-[#2f3f60] text-center">Global Map</div>
              <div className="p-4 flex justify-center items-center h-40"> {/* Explicit height for consistent image area */}
                <Image
                  src="/Map.png"
                  alt="Map"
                  width={300}
                  height={200}
                  className="w-full h-full object-contain" // Changed to object-contain for centering
                />
              </div>
            </div>

            {/* CAD */}
            <div className="bg-[#1a2d4a] rounded-xl overflow-hidden shadow-xl flex-1 basis-0 min-w-[200px] max-w-xs md:max-w-none"> {/* Added basis-0 and adjusted max-w for responsiveness */}
              <div className="text-md font-semibold text-gray-400 p-3 border-b border-[#2f3f60] text-center">CAD Model</div>
              <div className="p-4 flex justify-center items-center h-40"> {/* Explicit height for consistent image area */}
                <Image
                  src="/CAD.png"
                  alt="CAD Model"
                  width={300}
                  height={200}
                  className="w-full h-full object-contain" // Changed to object-contain for centering
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
