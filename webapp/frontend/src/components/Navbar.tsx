import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full bg-[#2F3F60] px-8 py-4 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <Image
                    src="/bse-logo-light.png"
                    alt="BSE Logo"
                    width={140}
                    height={140}
                />
                <div className="w-10 h-10"></div>
                <span className="text-white font-bold text-2xl"></span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-12">
                <Link
                    href="/"
                    className="text-white hover:text-gray-300 transition-colors font-semibold text-xl"
                >
                    Home
                </Link>
                <Link
                    href="/pvdx"
                    className="text-white hover:text-gray-300 transition-colors font-semibold text-xl"
                >
                    PVDX
                </Link>
                <Link
                    href="/learn"
                    className="text-white hover:text-gray-300 transition-colors font-semibold text-xl"
                >
                    Learn
                </Link>
                <Link
                    href="/about"
                    className="text-white hover:text-gray-300 transition-colors font-semibold text-xl"
                >
                    About
                </Link>
            </div>
        </nav>
    );
}