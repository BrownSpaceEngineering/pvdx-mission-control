import Navbar from "./components/Navbar";
import CodingEnv from "./pages/codingEnv";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <CodingEnv />
    </div>
  );
}
