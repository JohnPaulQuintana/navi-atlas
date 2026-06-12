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
  return (
    <>
      {popup.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <div
            className={`
            relative rounded-2xl p-8 flex flex-col items-center gap-4 min-w-[380px] max-w-md mx-4 
            backdrop-blur-xl bg-gray-800/60 shadow-2xl animate-scale-up
            border ${popup.type === "success" ? "border-gray-100/50" : ""}
            ${popup.type === "error" ? "border-gray-100/50" : ""}
            ${popup.type === "info" ? "border-gray-100/50" : ""}
            ${popup.type === "loading" ? "border-gray-100/50" : ""}
          `}
          >
            {/* Animated gradient background for loading */}
            {popup.type === "loading" && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 animate-shimmer" />
            )}

            {/* Icon with glass effect */}
            <div
              className={`
              relative z-10 p-4 rounded-full backdrop-blur-md
              ${popup.type === "success" ? "bg-green-500/20 text-white" : ""}
              ${popup.type === "error" ? "bg-red-500/20 text-white" : ""}
              ${popup.type === "info" ? "bg-blue-500/20 text-white" : ""}
              ${popup.type === "loading" ? "bg-green-500/20 text-white" : ""}
            `}
            >
              {popup.type === "loading" && (
                <svg
                  className="w-12 h-12 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {popup.type === "success" && (
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {popup.type === "error" && (
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {popup.type === "info" && (
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>

            {/* Title and Message */}
            <div className="relative z-10 text-center">
              <h3 className={`text-xl font-bold mb-2 text-white`}>
                {popup.message}
              </h3>
              {popup.description && (
                <p className="text-gray-200 text-sm">{popup.description}</p>
              )}
            </div>

            {/* Loading Progress Bar */}
            {popup.type === "loading" && (
              <div className="relative z-10 w-full mt-2">
                <div className="w-full bg-gray-200/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                  <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-loading-bar" />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Please wait while we find the best route...
                </p>
              </div>
            )}

            {/* Close Button for non-loading states */}
            {popup.type !== "loading" && (
              <button
                onClick={hidePopup}
                className="relative z-10 mt-2 px-6 py-2 bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm text-gray-800 rounded-lg transition-all font-medium"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
