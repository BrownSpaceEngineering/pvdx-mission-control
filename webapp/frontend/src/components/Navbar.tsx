export default function Navbar() {
    return (
        <nav className="w-full bg-[#2F3F60] px-8 py-4 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                {/* Placeholder for logo image */}
                <div className="w-10 h-10"></div>
                <span className="text-white font-bold text-2xl">BSE</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-12">
                <a href="#" className="text-white hover:text-gray-300 transition-colors font-semibold text-lg">
                    Home
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors font-semibold text-lg">
                    PVDX
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors font-semibold text-lg">
                    Learn
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors font-semibold text-lg">
                    About
                </a>
            </div>
        </nav>
    );
}
