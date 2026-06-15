import { useEffect, useRef, useState } from "react";
import MapHeader from "./components/MapHeader";
import MapPopup from "./components/MapPopup";
import { useMapPanZoom } from "./hooks/useMapPanZoom";
import { createAnimatedPath } from "./utils/createAnimatedPath";
import { animateRoute } from "./utils/animateRoute";
import { applyNodeStyles } from "./utils/applyNodeStyles";
import MallScene from "./three/MallScene";
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

  const { applyInitialCamera, attachEvents } = useMapPanZoom(svgRef, stageRef);

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

    // Center only when NEW svg is loaded
    requestAnimationFrame(() => {
      applyInitialCamera();
    });

    const cleanupPanZoom = attachEvents();

    const steps = data?.path?.debug?.steps || [];

    createAnimatedPath(svg, steps);

    animateRoute(svg, steps, animationRef);

    const handleResize = () => {
      applyInitialCamera();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      window.removeEventListener("resize", handleResize);

      cleanupPanZoom();
    };
  }, [data, applyInitialCamera, attachEvents]);

  useEffect(() => {
    if (!svgRef.current) return;

    applyNodeStyles({
      svg: svgRef.current,
      startNode,
      endNode,
      filename,
      isCalculating,
      onUpdatePath,
      setEndNode,
      setIsCalculating,
      showPopup,
    });
  }, [startNode, endNode, isCalculating, filename, onUpdatePath]);

  const rooms = Object.values(data?.roomNodes || {});
  const steps = data?.path?.debug?.steps || [];
  // console.log(steps);

  const handleRoomClick = async (room: any) => {
    if (isCalculating) return;

    const roomName = room.id.replace(/^Room_/, "").replace(/_/g, " ");

    if (room.id === startNode) {
      showPopup(
        "Current Location",
        "info",
        `${roomName} is your current location. Select another destination to begin navigation.`,
      );
      return;
    }

    try {
      setIsCalculating(true);

      showPopup(
        "Generating Route",
        "loading",
        `Analyzing walkable paths and preparing navigation to ${roomName}.`,
      );

      setEndNode(room.id);

      await onUpdatePath(filename, startNode, room.id);

      showPopup(
        "Navigation Ready",
        "success",
        `The optimal route to ${roomName} is now available.`,
      );
    } catch (err) {
      console.error("Navigation error:", err);

      showPopup(
        "Route Unavailable",
        "error",
        `NaviAtlas was unable to generate a route to ${roomName}. Please select another destination and try again.`,
      );

      setEndNode(null);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="mt-20">
      {/* HERO HEADER */}
      <MapHeader filename={filename} />
      {/* Centered Glassmorphism Popup with Overlay */}
      <MapPopup popup={popup} hidePopup={hidePopup} />

      <div className="w-full h-[80vh]">
        <MallScene
          rooms={rooms}
          steps={steps}
          onRoomClick={handleRoomClick}
          selectedRoom={endNode}
        />
      </div>

      {/* <div
        ref={containerRef}
        className="w-full h-[70vh] rounded-md"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      /> */}
    </div>
  );
}
