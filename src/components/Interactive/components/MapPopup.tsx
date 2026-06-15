import {
  FiNavigation,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  // FiX,
} from "react-icons/fi";

interface MapPopupProps {
  popup: {
    show: boolean;
    message: string;
    description?: string;
    type: "info" | "loading" | "success" | "error";
  };
  hidePopup: () => void;
}

export default function MapPopup({ popup, hidePopup }: MapPopupProps) {
  if (!popup.show) return null;

  const icon = {
    loading: (
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 border-2 border-green-500/20 rounded-full" />

        <div className="absolute inset-0 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />

        <FiNavigation size={24} className="text-green-400" />
      </div>
    ),
    success: <FiCheckCircle size={42} />,
    error: <FiAlertCircle size={42} />,
    info: <FiInfo size={42} />,
  }[popup.type];

  const destination =
    popup.description?.match(/to\s(.+?)(?:\.|$)/i)?.[1] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
      <div
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-black/40
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(0,0,0,0.6)]
          animate-scale-up
        "
      >
        {/* Accent Bar */}
        {/* <div
          className={`absolute top-0 left-0 right-0 h-1 ${accent}`}
        /> */}

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 via-transparent to-green-500/10 pointer-events-none" />

        <div className="relative z-10 p-8">
          {/* Icon */}
          <div
            className={`
              mx-auto flex h-20 w-20 items-center justify-center
              rounded-full border border-white/10
              backdrop-blur-md
              ${
                popup.type === "success" ? "bg-green-500/10 text-green-400" : ""
              }
              ${popup.type === "error" ? "bg-red-500/10 text-red-400" : ""}
              ${popup.type === "info" ? "bg-blue-500/10 text-blue-400" : ""}
              ${
                popup.type === "loading" ? "bg-green-500/10 text-green-400" : ""
              }
            `}
          >
            {popup.type === "loading" ? (
              <div className="animate-spin">{icon}</div>
            ) : (
              icon
            )}
          </div>

          {/* Title */}
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-white">{popup.message}</h3>
          </div>

          {/* Destination Highlight */}
          {destination && (
            <div className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-green-400">
                Destination
              </p>

              <h4 className="mt-1 text-xl font-bold text-white">
                {destination}
              </h4>
            </div>
          )}

          {/* Description */}
          {popup.description && (
            <p className="mt-4 text-center text-sm text-white/70 leading-relaxed">
              {popup.description}
            </p>
          )}

          {/* Loading State */}
          {popup.type === "loading" && (
            <div className="mt-6">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full animate-loading-bar rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-white/60">
                  Generating optimal route...
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Analyzing walkable paths and intersections
                </p>
              </div>
            </div>
          )}

          {/* Close */}
          {popup.type !== "loading" && (
            <button
              onClick={hidePopup}
              className="
                mt-6
                w-full
                rounded-xl
                bg-green-500
                px-4
                py-3
                font-semibold
                text-black
                transition-all
                hover:bg-green-400
                active:scale-[0.98]
              "
            >
              Close
            </button>
          )}

          {/* Loading Hint */}
          {popup.type === "loading" && (
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/40">
              <FiNavigation />
              <span>NaviAtlas Route Engine</span>
            </div>
          )}
        </div>

        {/* Close Icon */}
        {/* {popup.type !== "loading" && (
          <button
            onClick={hidePopup}
            className="
              absolute
              right-4
              top-4
              text-white/40
              transition
              hover:text-white
            "
          >
            <FiX size={18} />
          </button>
        )} */}
      </div>
    </div>
  );
}
