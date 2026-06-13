import { FiUpload } from "react-icons/fi";
import ProgressBar from "./ProgressBar";
import LoaderMessages from "./LoaderMessages";

interface UploadBoxProps {
  file: File | null;
  previewUrl: string | null;

  sampleMaps: {
    id: string;
    name: string;
    url: string;
  }[];

  selectedSample: string;
  onSelectSample: (id: string) => void;

  onFileChange: (f: File) => void;
  onUpload: () => void;

  uploading: boolean;
  progress: number;
  currentMessage: string | null;
  error: string | null;
  serverReady: boolean;
}

export default function UploadBox({
  file,
  // previewUrl,
  sampleMaps,
  selectedSample,
  onSelectSample,
  onFileChange,
  onUpload,
  uploading,
  progress,
  currentMessage,
  error,
  serverReady,
}: UploadBoxProps) {
  return (
    <div className="mt-10 max-w-2xl mx-auto border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center text-center space-y-6">
      {/* Upload Icon */}
      <div className="flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full">
        <span className="text-green-400">
          <FiUpload size={40} />
        </span>
      </div>

      {/* Title */}
      <div>
        <p className="text-white text-lg font-medium">Choose an SVG source</p>

        <p className="text-white/60 text-sm mt-1">
          Upload your own SVG or use a sample map
        </p>
      </div>

      {/* Sample Maps */}
      <div className="w-full">
        <p className="text-sm text-white/60 mb-3">Choose a sample map</p>

        <div className="grid grid-cols-2 gap-3">
          {sampleMaps.map((map) => {
            const active = selectedSample === map.id;

            return (
              <button
                key={map.id}
                type="button"
                disabled={uploading}
                onClick={() => onSelectSample(map.id)}
                className={`
            p-4 rounded-xl border transition-all text-left
            ${
              active
                ? "border-green-400 bg-green-500/10"
                : "border-white/10 bg-white/5 hover:border-white/30"
            }
          `}
              >
                <div className="font-medium text-white">{map.name}</div>

                <div className="text-xs text-white/50 mt-1">Sample SVG</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center w-full">
        <div className="flex-1 h-px bg-white/10" />
        <span className="px-4 text-white/40 text-sm">OR</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Upload File */}
      <label className="w-full">
        <input
          type="file"
          accept=".svg"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onFileChange(e.target.files[0]);
            }
          }}
          disabled={uploading || !serverReady}
        />

        <div
          className={`px-4 py-5 border-2 border-dashed rounded-xl transition ${
            !serverReady
              ? "border-white/10 opacity-50 cursor-not-allowed"
              : "border-white/20 hover:border-green-400 cursor-pointer"
          }`}
        >
          {file ? (
            <>
              <p className="text-white font-medium truncate">{file.name}</p>

              <p className="text-white/50 text-sm mt-1">Ready for processing</p>
            </>
          ) : (
            <>
              <p className="text-white/80">Click to select SVG</p>

              <p className="text-white/50 text-sm mt-1">
                Supported format: .svg
              </p>
            </>
          )}
        </div>
      </label>

      {/* {previewUrl && (
        <div className="w-full h-80 rounded-2xl border border-white/10 bg-white p-4 flex items-center justify-center overflow-hidden">
          <img
            src={previewUrl}
            alt="SVG Preview"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )} */}

      {/* Server Status */}
      {!serverReady && (
        <div className="w-full rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-yellow-300 text-sm">
          Waking up the server... Free hosting services put inactive servers to
          sleep, so the first visit may take a minute or two.
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={onUpload}
        disabled={uploading || !file || !serverReady}
        className={`w-full px-6 py-3 bg-green-500 text-black font-semibold rounded-xl transition ${
          uploading || !file || !serverReady
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-green-400"
        }`}
      >
        {!serverReady
          ? "Starting Server..."
          : uploading
            ? "Processing..."
            : "Process SVG"}
      </button>

      {/* Progress */}
      {uploading && <ProgressBar progress={progress} />}

      {/* Loader Message */}
      <LoaderMessages message={currentMessage} />

      {/* Error */}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
    </div>
  );
}
