import { useState } from "react";
import { uploadSVG as apiUploadSVG, getTestPath } from "../api/client";

interface UseSVGUploadReturn {
  uploading: boolean;
  progress: number;
  currentMessage: string | null;
  error: string | null;
  success: boolean;
  mapData: any | null;
  startUpload: (file: File, onComplete?: (data: any) => void) => void;
  reset: () => void;
  updatePath: (svgName: string, start: string, end: string) => Promise<void>;
  svgName: string | null;
}

export function useSVGUpload(): UseSVGUploadReturn {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mapData, setMapData] = useState<any | null>(null);
  const [svgName, setSvgName] = useState<string | null>(null);
  const loaderMessages = [
    "Uploading SVG...",
    "Validating structure...",
    "Parsing nodes...",
    "Extracting paths...",
    "Building navigation graph...",
  ];

  const startUpload = async (file: File, onComplete?: (data: any) => void) => {
    setUploading(true);
    setProgress(0);
    setError(null);
    setSuccess(false);
    setMapData(null);

    let msgIndex = 0;
    setCurrentMessage(loaderMessages[msgIndex]);

    // ===============================
    // STEP 1: UI MESSAGE SEQUENCE
    // ===============================
    const showMessagesSequentially = () => {
      return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          msgIndex++;

          if (msgIndex < loaderMessages.length) {
            setCurrentMessage(loaderMessages[msgIndex]);
            setProgress(
              Math.round(((msgIndex + 1) / loaderMessages.length) * 70),
            );
          } else {
            clearInterval(interval);
            resolve();
          }
        }, 1200);
      });
    };

    try {
      // run loader + upload
      const messagePromise = showMessagesSequentially();
      const uploadResult = await apiUploadSVG(file);

      await messagePromise;

      // ===============================
      // STEP 2: UPLOAD VALIDATION
      // ===============================
      if (!uploadResult.success) {
        throw new Error(uploadResult.message || "Upload failed");
      }

      const filename = uploadResult.data?.filename;
      setSvgName(filename);
      // ===============================
      // STEP 3: PATH GENERATION
      // ===============================
      setProgress(85);
      setCurrentMessage("Calculating navigation path...");

      const pathResult = await getTestPath(filename);

      if (!pathResult) {
        throw new Error("Path generation failed");
      }

      // SAVE MAP DATA (IMPORTANT)
      setMapData(pathResult);
      onComplete?.(pathResult);

      // ===============================
      // STEP 4: SUCCESS STATE
      // ===============================
      setProgress(100);
      setCurrentMessage("Map ready!");

      setTimeout(() => {
        setSuccess(true);
        setUploading(false);
      }, 800);
    } catch (err: any) {
      console.error(err);

      setError(err.message || "Unexpected error");

      setUploading(false);
      setProgress(0);
      setCurrentMessage(null);
    }
  };

  const reset = () => {
    setUploading(false);
    setProgress(0);
    setCurrentMessage(null);
    setError(null);
    setSuccess(false);
    setMapData(null);
  };

  // useSVGUpload
  const updatePath = async (svgName: string, start: string, end: string) => {
    if (!mapData) return;

    //call API or compute path locally
    const newPath = await getTestPath(svgName, start, end);

    setMapData(newPath);
  };

  return {
    uploading,
    progress,
    currentMessage,
    error,
    success,
    mapData,
    startUpload,
    reset,
    updatePath,
    svgName,
  };
}
