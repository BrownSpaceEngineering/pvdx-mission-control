import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins', // This is a CSS variable you'll use in Tailwind
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] // Include all weights you'll use
});

export const metadata: Metadata = {
    title: "PVDX Mission Control",
    description: "Block-based coding environment for PVDX",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.variable} font-sans antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
