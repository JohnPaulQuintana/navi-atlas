import { useState, useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import UploadBox from "../components/Upload/UploadBox";
import { useSVGUpload } from "../hook/useSVGClient";
import InteractiveMap from "../components/Interactive/InteractiveMap";
import { wakeServer } from "../api/client";
import GroundFloor from "../assets/maps/GROUND.svg?url";
import SecondFloor from "../assets/maps/Ground Floor.svg?url";

const PRESET_MAPS = [
  {
    id: "ground-floor",
    name: "Ground Floor",
    url: GroundFloor,
  },
  {
    id: "second-floor",
    name: "Second Floor",
    url: SecondFloor,
  },
];

export default function UploadSVG() {
  const [file, setFile] = useState<File | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [serverReady, setServerReady] = useState(false);
  const [serverMessage, setServerMessage] = useState("Starting server...");
  // const [sourceType, setSourceType] = useState<"upload" | "preset">("upload");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState("");
  console.log(serverMessage)
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

  const handleFileChange = (file: File) => {
    setFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpload = () => {
    if (!serverReady) return;
    if (!file) return;

    startUpload(file);
  };

  const handlePresetSelect = async (id: string) => {
    setSelectedPreset(id);

    const preset = PRESET_MAPS.find((x) => x.id === id);

    if (!preset) return;

    setPreviewUrl(preset.url);

    const blob = await fetch(preset.url).then((r) => r.blob());

    const svgFile = new File([blob], `${preset.name}.svg`, {
      type: "image/svg+xml",
    });

    setFile(svgFile);
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

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // const handleReset = () => {
  //   reset();
  //   setFile(null);
  // };

  return (
    <div className="mt-12 md:mt-40 w-full h-screen text-white relative flex items-center justify-center px-6">
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
          <h1 className="text-3xl md:text-5xl font-bold uppercase">
            Upload <span className="text-green-400">SVG Map</span>
          </h1>

          <p className="mt-4 text-white/70">
            Upload a structured SVG exported from Figma.
          </p>

          {/* {!serverReady && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
              <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
              {serverMessage}
            </div>
          )} */}

          <UploadBox
            file={file}
            previewUrl={previewUrl}
            sampleMaps={PRESET_MAPS}
            selectedSample={selectedPreset}
            onSelectSample={handlePresetSelect}
            onFileChange={handleFileChange}
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
