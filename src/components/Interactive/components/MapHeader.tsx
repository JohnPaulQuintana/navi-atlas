interface Props {
  filename: string;
}

export default function MapHeader({ filename }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center px-8 py-16 bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-md text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
        Interactive Map <span className="text-green-400">{filename}</span>
      </h1>
      <p className="text-gray-300 text-base md:text-lg mb-8">
        Explore and manage your SVG maps with ease
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-8 py-3 rounded-lg bg-green-500/25 hover:bg-green-500/40 text-white font-semibold border border-green-400/50 shadow-md transition-all duration-300 hover:scale-105"
      >
        Upload New Map
      </button>
    </div>
  );
}
