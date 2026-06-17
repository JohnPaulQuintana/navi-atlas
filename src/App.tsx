import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import UploadSVG from "./pages/UploadSVG";
import ViewGuide from "./pages/Guide";
import Footer from "./components/Footer";
import Documentation from "./pages/Documentation";
import useAnalytics from "./hook/analytics/useAnalytics";

function App() {
  useAnalytics();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#050805] overflow-hidden">
      {/* Grid Background */}
      <div
        className="
    fixed inset-0
    pointer-events-none
    bg-[linear-gradient(to_right,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.05)_1px,transparent_1px)]
    bg-[size:40px_40px]
  "
      />
      {/* Main Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-green-500/15 blur-[140px] rounded-full pointer-events-none" />

      {/* Left Accent */}
      <div className="fixed top-1/3 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Right Accent */}
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-green-400/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Content */}
      <Header />
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/upload" element={<UploadSVG />} />
            <Route path="/guide" element={<ViewGuide />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
