

export function highlightPath(
  svg: SVGSVGElement,
  steps: any[],
  pathLineId?: string,
) {
  svg
    .querySelectorAll<SVGElement>("rect, circle, line, polyline, polygon")
    .forEach((el) => {
      el.style.stroke = "";
      el.style.strokeWidth = "";
      el.style.fill = "";
      el.style.opacity = "";
    });

  steps.forEach((step) => {
    if (!step.svgId) return;

    const el = svg.getElementById(step.svgId) as SVGElement | null;

    if (!el) return;
    console.log(step)
    const type = (step.svgType || "").toLowerCase();

    console.log(type)
    // if (type.includes("line") || type === "corridor") {
    //   el.style.stroke = COLORS.ROUTE;
    //   el.style.strokeWidth = "6";
    //   el.style.opacity = "1";
    // }

    // if (type === "door") {
    //   el.style.stroke = COLORS.DOOR;
    //   el.style.strokeWidth = "5";
    //   el.style.opacity = "1";
    // }

    // if (type === "intersection" || type === "node") {
    //   console.log("mathce", el)
    //   // el.style.fill = COLORS.DOOR;
    //   // el.style.stroke = COLORS.ROUTE;
    //   el.style.strokeWidth = "2";
    //   el.setAttribute("fill", COLORS.DOOR);
    //   el.setAttribute("stroke", COLORS.ROUTE);
    // }
  });

  if (!pathLineId) return;

  const pathLine = svg.getElementById(pathLineId) as SVGElement | null;

  if (!pathLine) return;

  // pathLine.style.stroke = "#10b981"; // Green - Route node
  // pathLine.style.strokeWidth = "6";
  // pathLine.style.opacity = "0.8";
  // pathLine.style.strokeDasharray = "10, 5";
}
