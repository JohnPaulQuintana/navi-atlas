import { useNavigate } from "react-router-dom";
import {
  FiUpload,
  FiBookOpen,
  FiMapPin,
  FiZap,
  FiCpu,
  FiArrowRight,
  FiArrowDown,
  FiActivity,
  FiUsers,
  FiEye,
} from "react-icons/fi";
import demoVideo from "../assets/videos/home.mp4";
import sampleSvg from "../assets/maps/GROUND.svg";
import useAnalyticsStats from "../hook/analytics/useAnalyticsStats";

export default function Hero() {
  const navigate = useNavigate();
  const { stats } = useAnalyticsStats();

  return (
    <section className="w-full px-6 pt-24 md:pt-32 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-sm mb-6">
            <FiMapPin size={14} />
            Interactive SVG Indoor Navigation
          </div> */}

          <div>
            {stats && (
              <div className="inline-flex flex-wrap items-center justify-center gap-4 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                <div className="flex items-center gap-2 text-green-400">
                  <FiActivity className="animate-pulse" size={14} />
                  <span className="text-sm font-medium">Live Activity</span>
                </div>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-2 text-white/80">
                  <FiUsers size={14} />
                  <span className="text-sm">
                    <span className="font-semibold text-white">
                      {stats.visitors.toLocaleString()}
                    </span>{" "}
                    explorers
                  </span>
                </div>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-2 text-white/80">
                  <FiEye size={14} />
                  <span className="text-sm">
                    <span className="font-semibold text-white">
                      {stats.visits.toLocaleString()}
                    </span>{" "}
                    map views
                  </span>
                </div>
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Turn <span className="text-green-400">SVG Floor Plans</span> Into
            Interactive 3D Navigation
          </h1>

          <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Upload SVG maps exported from Figma. NaviAtlas automatically parses
            rooms, hallways, nodes, and paths to generate an interactive 3D
            navigation experience powered by A* pathfinding.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
        </div>

        {/* Features */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition">
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

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition">
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

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition">
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

        {/* Divider */}
        <div className="relative my-20">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-r from-transparent via-green-500/20 to-transparent blur-xl" />

          <div className="relative flex justify-center -translate-y-1/2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-green-500/20 text-green-400 text-xs">
              <FiArrowRight size={12} />
              SVG → 3D Generation
            </div>
          </div>
        </div>

        {/* SVG → 3D Showcase */}
        <div className="">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">
              From Blueprint to Experience
            </h2>

            <p className="mt-3 text-white/60 max-w-2xl mx-auto">
              A side-by-side look at the generated result.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            {/* Before */}
            <div>
              <div className="mb-3 text-sm uppercase tracking-wider text-white/50">
                <span className="text-green-400">SVG Floor Plan</span>
              </div>

              <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                <img
                  src={sampleSvg}
                  alt="SVG Floor Plan"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Mobile Arrow */}
            <div className="flex md:hidden justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                <span className="text-sm">Auto Generate</span>
                <FiArrowDown size={16} />
              </div>
            </div>

            {/* Desktop Arrow */}
            <div className="hidden md:flex flex-col items-center">
              <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm whitespace-nowrap">
                Auto Generate
              </div>

              <div className="h-12 w-px bg-green-500/30 my-3" />

              <FiArrowRight size={32} className="text-green-400" />
            </div>

            {/* After */}
            <div>
              <div className="mb-3 text-sm uppercase tracking-wider text-green-400">
                Generated 3D Navigation
              </div>

              <div className="aspect-video rounded-3xl overflow-hidden border border-green-500/20 bg-black">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={demoVideo} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
