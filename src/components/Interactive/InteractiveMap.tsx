import { useEffect, useRef, useState } from "react";
import MapHeader from "./components/MapHeader";
import MapPopup from "./components/MapPopup";
import { useMapPanZoom } from "./hooks/useMapPanZoom";
import { highlightPath } from "./utils/highlightPath";
import { createAnimatedPath } from "./utils/createAnimatedPath";
import { animateRoute } from "./utils/animateRoute";
import { applyNodeStyles } from "./utils/applyNodeStyles";
interface InteractiveMapProps {
  data: any;
  filename?: string;
  onUpdatePath: (svgName: string, startNode: string, endNode: string) => void;
}

const startNodeDefault = "Entrance";

export default function InteractiveMap({
  data,
  filename = "map",
  onUpdatePath,
}: InteractiveMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [startNode] = useState<string>(startNodeDefault);
  const [endNode, setEndNode] = useState<string | null>(null);
  const popupTimeoutRef = useRef<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const [popup, setPopup] = useState<{
    show: boolean;
    message: string;
    description?: string;
    type: "info" | "loading" | "success" | "error";
  }>({
    show: false,
    message: "",
    description: "",
    type: "info",
  });

  const { applyTransform, applyInitialCamera, attachEvents } = useMapPanZoom(
    svgRef,
    stageRef,
  );

  const showPopup = (
    message: string,
    type: "info" | "loading" | "success" | "error" = "info",
    description: string = "",
    duration: number = 3000,
  ) => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }

    setPopup({
      show: true,
      message,
      description,
      type,
    });

    if (type !== "loading") {
      popupTimeoutRef.current = window.setTimeout(() => {
        setPopup({
          show: false,
          message: "",
          description: "",
          type: "info",
        });
      }, duration);
    }
  };

  const hidePopup = () => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }

    setPopup({
      show: false,
      message: "",
      description: "",
      type: "info",
    });
  };

  useEffect(() => {
    if (!containerRef.current || !data) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const stage = document.createElement("div");
    stage.className =
      "w-full h-full relative rounded-md backdrop-blur-xl bg-gray-800/60 overflow-hidden";
    stage.style.touchAction = "none";
    stage.style.cursor = "grab";
    container.appendChild(stage);
    stageRef.current = stage;

    stage.innerHTML = data.svg;

    const svg = stage.querySelector("svg") as SVGSVGElement;
    if (!svg) {
      console.error("No SVG element found");
      return;
    }

    svgRef.current = svg;

    const originalWidth = svg.getAttribute("width");
    const originalHeight = svg.getAttribute("height");
    const viewBox = svg.getAttribute("viewBox");

    if (!viewBox && originalWidth && originalHeight) {
      svg.setAttribute("viewBox", `0 0 ${originalWidth} ${originalHeight}`);
    }

    svg.style.width = "auto";
    svg.style.height = "auto";
    svg.style.display = "block";
    svg.style.transformOrigin = "0 0";
    svg.style.willChange = "transform";
    svg.style.imageRendering = "crisp-edges";

    stage.style.overflow = "hidden";
    stage.style.position = "relative";

    setTimeout(() => applyInitialCamera(), 100);

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(() => applyInitialCamera(), 50);
    });
    resizeObserver.observe(stage);
    window.addEventListener("resize", () =>
      setTimeout(applyInitialCamera, 100),
    );

    const cleanupPanZoom = attachEvents();
    // Path highlighting
    const steps = data?.path?.debug?.steps || [];

    // highlightPath(svg, steps, data?.path?.debug?.pathLine);

    createAnimatedPath(svg, steps);

    // Function to apply node styles
    applyNodeStyles({
      svg,
      startNode,
      endNode,
      filename,
      isCalculating,
      onUpdatePath,
      setEndNode,
      setIsCalculating,
      showPopup,
    });

    // Watch for endNode changes to reapply styles
    const interval = setInterval(() => {
      if (endNode) {
        applyNodeStyles({
          svg,
          startNode,
          endNode,
          filename,
          isCalculating,
          onUpdatePath,
          setEndNode,
          setIsCalculating,
          showPopup,
        });

        clearInterval(interval);
      }
    }, 100);

    // Path animation
    animateRoute(svg, steps, animationRef);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(interval);
      resizeObserver.disconnect();
      cleanupPanZoom();
    };
  }, [
    data,
    startNode,
    endNode,
    onUpdatePath,
    applyInitialCamera,
    applyTransform,
    isCalculating,
  ]);

  return (
    <div className="mt-20">
      {/* HERO HEADER */}
      <MapHeader filename={filename} />
      {/* Centered Glassmorphism Popup with Overlay */}
      <MapPopup popup={popup} hidePopup={hidePopup} />

      <div
        ref={containerRef}
        className="w-full h-[70vh] rounded-md"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
