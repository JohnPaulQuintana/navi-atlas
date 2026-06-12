import type { Dispatch, SetStateAction } from "react";
const COLORS = {
  ROUTE: "#10b981", // Green
  DOOR: "#8b5cf6", // Purple
  DEFAULT: "#8d99ae", // Light Gray
  HOVER: "#94a3b8", // Hover Gray
  DESTINATION: "#ef4444", // Red
};

interface ApplyNodeStylesProps {
  svg: SVGSVGElement;
  startNode: string;
  endNode: string | null;
  filename: string;
  isCalculating: boolean;

  onUpdatePath: (
    svgName: string,
    startNode: string,
    endNode: string,
  ) => Promise<any> | any;

  setEndNode: Dispatch<SetStateAction<string | null>>;

  setIsCalculating: Dispatch<SetStateAction<boolean>>;

  showPopup: (
    message: string,
    type?: "info" | "loading" | "success" | "error",
    description?: string,
  ) => void;
}

export function applyNodeStyles({
  svg,
  startNode,
  endNode,
  filename,
  isCalculating,
  onUpdatePath,
  setEndNode,
  setIsCalculating,
  showPopup,
}: ApplyNodeStylesProps) {
  const nodes = svg.querySelectorAll<SVGElement>(
    "[id^='Room'], [id^='Entrance'], [id^='POI']",
  );

  nodes.forEach((node) => {
    // console.log(startNode);
    // console.log(node);
    node.style.cursor = "pointer";
    node.style.transition = "all 0.2s ease-in-out";
    // const title = node.id

    const isStartNode = node.id === startNode;

    const isEndNode = endNode !== null && node.id === endNode;
    // if(!title.includes(startNode)) {
    //   console.log(node)
    //   node.style.fill = COLORS.DOOR; // Start
    // }
    const isText = node.tagName.toLowerCase() === "text";

    if ((isStartNode || node?.id?.includes(startNode)) && !isText) {
      node.style.fill = COLORS.ROUTE; // Start
      node.style.stroke = COLORS.ROUTE;
      node.style.strokeWidth = "3";
    } else if (
      (isEndNode || (endNode && node.id.includes(endNode))) &&
      !isText
    ) {
      node.style.fill = COLORS.DESTINATION; // Destination
      node.style.stroke = COLORS.DESTINATION;
      node.style.strokeWidth = "3";
    } else {
      // node.style.fill = COLORS.DEFAULT; // Default
      // node.style.stroke = "none";
      node.style.strokeWidth = "0";
    }

    node.style.pointerEvents = "all";

    if (!isStartNode && !isEndNode) {
      const defaultFill = node.style.fill;

      node.onmouseenter = () => {
        if (!isCalculating) {
          node.style.fill = COLORS.HOVER;
        }
      };

      node.onmouseleave = () => {
        node.style.fill = defaultFill;
      };
    }

    node.onclick = async (e: MouseEvent) => {
      e.stopPropagation();

      if (isCalculating) {
        showPopup("Please Wait", "info", "Route calculation in progress...");
        return;
      }

      if (node.id === startNode) {
        showPopup(
          "Current Location",
          "info",
          `You are already at ${startNode}`,
        );
        return;
      }

      if (endNode && node.id === endNode) {
        showPopup(
          "Destination Selected",
          "info",
          `Already navigating to ${endNode
            .replace(/^Room_/, "")
            .replace(/_/g, " ")}`,
        );
        return;
      }

      const roomName = node.id.replace(/^Room_/, "").replace(/_/g, " ");

      setIsCalculating(true);

      showPopup(
        "Calculating Route",
        "loading",
        `Finding the best path from ${startNode} to ${roomName}...`,
      );

      try {
        setEndNode(node.id);

        await onUpdatePath(filename, startNode, node.id);

        showPopup(
          "Route Found Successfully",
          "success",
          `Path discovered from ${startNode} to ${roomName}`,
        );
      } catch (error) {
        console.error("Route calculation error:", error);

        showPopup(
          "Route Calculation Failed",
          "error",
          `Unable to find a path from ${startNode} to ${roomName}. Please try another destination.`,
        );

        setEndNode(null);
      } finally {
        setIsCalculating(false);
      }
    };
  });
}
