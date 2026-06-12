export function createAnimatedPath(svg: SVGSVGElement, steps: any[]) {
  const rawPoints = steps
    .filter((s: any) => typeof s.x === "number" && typeof s.y === "number")
    .map((s: any) => ({
      x: s.x,
      y: s.y,
    }));

  if (rawPoints.length < 2) return;

  const NS = "http://www.w3.org/2000/svg";

  let shadowPath = svg.getElementById(
    "animated-path-shadow",
  ) as SVGPathElement | null;

  if (!shadowPath) {
    shadowPath = document.createElementNS(NS, "path");

    shadowPath.setAttribute("id", "animated-path-shadow");

    shadowPath.setAttribute("fill", "none");

    shadowPath.setAttribute("stroke", "#ffffff");

    shadowPath.setAttribute("stroke-width", "12");

    shadowPath.setAttribute("stroke-linecap", "round");

    shadowPath.setAttribute("stroke-linejoin", "round");

    shadowPath.setAttribute("opacity", "0.9");

    svg.appendChild(shadowPath);
  }

  let routePath = svg.getElementById(
    "animated-path-line",
  ) as SVGPathElement | null;

  if (!routePath) {
    routePath = document.createElementNS(NS, "path");

    routePath.setAttribute("id", "animated-path-line");

    routePath.setAttribute("fill", "none");

    routePath.setAttribute("stroke", "#22c55e");

    routePath.setAttribute("stroke-width", "7");

    routePath.setAttribute("stroke-linecap", "round");

    routePath.setAttribute("stroke-linejoin", "round");

    routePath.setAttribute("opacity", "1");

    // routePath.setAttribute("stroke-dasharray", "20 10");

    // routePath.style.animation = "routeFlow 2s linear infinite";

    svg.appendChild(routePath);
  }

  let pathData = `M ${rawPoints[0].x} ${rawPoints[0].y}`;

  for (let i = 1; i < rawPoints.length; i++) {
    pathData += ` L ${rawPoints[i].x} ${rawPoints[i].y}`;
  }

  shadowPath.setAttribute("d", pathData);

  routePath.setAttribute("d", pathData);

  shadowPath.parentNode?.appendChild(shadowPath);

  routePath.parentNode?.appendChild(routePath);
}
