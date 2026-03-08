import Navbar from "@/components/Navbar";
import CodingEnv from "@/components/CodingEnv"

export default function Home() {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto min-h-0">
                <CodingEnv />
            </main>
        </div>
    );
}