import { useNavigate } from "react-router-dom";
import { FiUpload, FiBookOpen, FiMapPin, FiZap, FiCpu } from "react-icons/fi";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 pt-24 md:pt-32">
      <div className="text-center max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-sm mb-6">
          <FiMapPin size={14} />
          Interactive SVG Indoor Navigation
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Test Your <span className="text-green-400">Custom SVG Maps</span>{" "}
          Instantly
        </h1>

        {/* Description */}
        <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
          Upload SVG maps exported from Figma following the official structure
          guide. The system parses nodes and paths, then builds an interactive
          indoor navigation graph powered by A* pathfinding and SVG extraction.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-400 transition"
          >
            <FiUpload size={18} />
            Upload SVG
          </button>

          <button
            onClick={() => navigate("/guide")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
          >
            <FiBookOpen size={18} />
            View Guide
          </button>
        </div>

        {/* Feature points */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-3">
              <FiMapPin
                className="text-green-400 flex-shrink-0 mt-1"
                size={20}
              />

              <div className="text-start">
                <h3 className="font-semibold text-white">Custom SVG Maps</h3>
                <p className="mt-1 text-sm text-white/60">
                  Upload and navigate interactive floor plans.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-3">
              <FiZap className="text-green-400 flex-shrink-0 mt-1" size={20} />

              <div className="text-start">
                <h3 className="font-semibold text-white">Path Extraction</h3>
                <p className="mt-1 text-sm text-white/60">
                  Detects routes and connections automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-3">
              <FiCpu className="text-green-400 flex-shrink-0 mt-1" size={20} />

              <div className="text-start">
                <h3 className="font-semibold text-white">A* Pathfinding</h3>
                <p className="mt-1 text-sm text-white/60">
                  Finds the shortest route in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
