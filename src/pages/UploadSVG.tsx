import { useState, useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import UploadBox from "../components/Upload/UploadBox";
import { useSVGUpload } from "../hook/useSVGClient";
import InteractiveMap from "../components/Interactive/InteractiveMap";
import { wakeServer } from "../api/client";

export default function UploadSVG() {
  const [file, setFile] = useState<File | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [serverReady, setServerReady] = useState(false);
  const [serverMessage, setServerMessage] = useState("Starting server...");

  const {
    uploading,
    progress,
    currentMessage,
    error,
    success,
    mapData,
    startUpload,
    // reset,
    updatePath,
    svgName,
  } = useSVGUpload();

  const handleUpload = () => {
    if (!serverReady) return;
    if (!file) return;

    startUpload(file);
  };

  useEffect(() => {
    const init = async () => {
      setServerReady(false);

      const result = await wakeServer();

      if (result.success) {
        setServerReady(true);
        setServerMessage("Server ready");
      } else {
        setServerMessage("Failed to start server");
      }
    };

    init();
  }, []);

  // =========================
  // SHOW POPUP WHEN SUCCESS
  // =========================
  useEffect(() => {
    if (success) {
      setShowSuccessPopup(true);

      const t = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 1500);

      return () => clearTimeout(t);
    }
  }, [success]);

  // const handleReset = () => {
  //   reset();
  //   setFile(null);
  // };

  return (
    <div className="mt-12 w-full h-screen text-white relative flex items-center justify-center px-6">
      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="animate-popIn bg-white/10 border border-white/20 rounded-3xl px-12 py-10 text-center max-w-sm w-full shadow-lg">
            <div className="flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full mx-auto mb-4">
              <span className="text-green-400">
                <FiCheckCircle size={60} />
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Upload Successful
            </h2>

            <p className="text-white/70 text-sm">
              Rendering map, please wait a moment...
            </p>
          </div>
        </div>
      )}

      {/* =========================
        RENDER MAP
    ========================= */}
      {success && mapData ? (
        <div className="absolute w-full">
          <InteractiveMap
            data={mapData}
            filename={svgName ?? undefined}
            onUpdatePath={async (svgName, start, end) => {
              await updatePath(svgName, start, end);
            }}
          />
        </div>
      ) : (
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            Upload <span className="text-green-400">SVG Map</span>
          </h1>

          <p className="mt-4 text-white/70">
            Upload a structured SVG exported from Figma.
          </p>

          {!serverReady && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
              <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
              {serverMessage}
            </div>
          )}

          <UploadBox
            file={file}
            onFileChange={setFile}
            onUpload={handleUpload}
            uploading={uploading}
            progress={progress}
            currentMessage={currentMessage}
            error={error}
            serverReady={serverReady}
          />
        </div>
      )}
    </div>
  );
}
