import { FiUpload } from "react-icons/fi";
import ProgressBar from "./ProgressBar";
import LoaderMessages from "./LoaderMessages";

interface UploadBoxProps {
  file: File | null;
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
  onFileChange,
  onUpload,
  uploading,
  progress,
  currentMessage,
  error,
  serverReady,
}: UploadBoxProps) {
  return (
    <div className="mt-10 max-w-md mx-auto border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-10 flex flex-col items-center text-center space-y-6">
      {/* Upload Icon */}
      <div className="flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full">
        <span className="text-green-400">
          <FiUpload size={40} />
        </span>
      </div>

      {/* Instruction */}
      <p className="text-white/80 text-lg font-medium">
        Drag & drop or select your{" "}
        <span className="font-semibold">SVG file</span>
      </p>

      {/* File Input */}
      <label className="w-full">
        <input
          type="file"
          accept=".svg"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) onFileChange(e.target.files[0]);
          }}
          disabled={uploading || !serverReady}
        />
        <div
          className={`mt-2 px-4 py-3 border-2 border-dashed rounded-xl transition ${
            !serverReady
              ? "border-white/10 opacity-50 cursor-not-allowed"
              : "border-white/20 hover:border-green-400 cursor-pointer"
          }`}
        >
          {file ? (
            <p className="text-white/80 truncate">{file.name}</p>
          ) : (
            <p className="text-white/50">Click to select a file</p>
          )}
        </div>
      </label>

      {!serverReady && (
        <div className="w-full rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-yellow-300 text-sm">
          Warming up server... This may take up to 60 seconds on first visit.
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={onUpload}
        disabled={uploading || !file}
        className={`w-full mt-2 px-6 py-3 bg-green-500 text-black font-semibold rounded-xl transition ${
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

      {/* Progress & Loader */}
      {uploading && <ProgressBar progress={progress} />}
      <LoaderMessages message={currentMessage} />

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
    </div>
  );
}
