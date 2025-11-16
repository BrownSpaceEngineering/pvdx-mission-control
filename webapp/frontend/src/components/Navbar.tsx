import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full bg-[#2F3F60] px-8 py-4 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <Link href="https://brownspace.io">
                    <Image
                        src="/bse-logo-light.png"
                        alt="BSE Logo"
                        width={140}
                        height={140}
                        className="cursor-pointer"
                    />
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-12">
                <a href="#" className="text-white hover:text-gray-300 transition-colors font-semibold text-xl">
                    Home
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors font-semibold text-xl">
                    PVDX
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors font-semibold text-xl">
                    Learn
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors font-semibold text-xl">
                    About
                </a>
            </div>
        </nav>
    );
}
