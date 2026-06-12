import React from "react";

export function animateRoute(
  svg: SVGSVGElement,
  steps: any[],
  animationRef: React.MutableRefObject<number | null>,
) {
  const rawPoints = steps
    .filter(
      (s: any) =>
        typeof s.x === "number" &&
        typeof s.y === "number",
    )
    .map((s: any) => ({
      x: s.x,
      y: s.y,
    }));

  if (rawPoints.length < 2) return;

  const segments: any[] = [];
  let totalLength = 0;

  for (let i = 0; i < rawPoints.length - 1; i++) {
    const a = rawPoints[i];
    const b = rawPoints[i + 1];

    const dx = b.x - a.x;
    const dy = b.y - a.y;

    const len = Math.hypot(dx, dy);

    if (!Number.isFinite(len) || len <= 0) continue;

    segments.push({
      a,
      b,
      len,
    });

    totalLength += len;
  }

  if (segments.length === 0) return;

  const NS = "http://www.w3.org/2000/svg";

  const group = document.createElementNS(NS, "g");

  const dot = document.createElementNS(NS, "circle");
  dot.setAttribute("r", "8");
  dot.setAttribute("fill", "#10b981");
  dot.setAttribute("stroke", "#ffffff");
  dot.setAttribute("stroke-width", "2");

  const pulse = document.createElementNS(NS, "circle");
  pulse.setAttribute("r", "16");
  pulse.setAttribute("fill", "none");
  pulse.setAttribute("stroke", "#10b981");
  pulse.setAttribute("stroke-width", "3");
  pulse.style.opacity = "0.6";

  group.appendChild(pulse);
  group.appendChild(dot);

  svg.appendChild(group);

  let dist = 0;
  let lastTime = performance.now();

  let pulseScale = 1;
  let growing = true;

  function animate(now: number) {
    const dt = Math.min(now - lastTime, 50);

    lastTime = now;

    dist += dt * 0.15;

    if (dist > totalLength) {
      dist = 0;
    }

    let acc = 0;
    let seg = segments[0];

    for (let i = 0; i < segments.length; i++) {
      if (acc + segments[i].len >= dist) {
        seg = segments[i];
        break;
      }

      acc += segments[i].len;
    }

    const segLen = Math.max(seg.len, 0.000001);

    const t = (dist - acc) / segLen;

    const x =
      seg.a.x + (seg.b.x - seg.a.x) * t;

    const y =
      seg.a.y + (seg.b.y - seg.a.y) * t;

    if (
      Number.isFinite(x) &&
      Number.isFinite(y)
    ) {
      group.setAttribute(
        "transform",
        `translate(${x},${y})`,
      );
    }

    pulseScale += growing ? 0.025 : -0.025;

    if (pulseScale > 2.2) {
      growing = false;
    }

    if (pulseScale < 1) {
      growing = true;
    }

    pulse.setAttribute(
      "transform",
      `scale(${pulseScale})`,
    );

    pulse.style.opacity = String(
      Math.max(
        0,
        Math.min(
          0.8,
          0.6 - (pulseScale - 1) * 0.15,
        ),
      ),
    );

    animationRef.current =
      requestAnimationFrame(animate);
  }

  animationRef.current =
    requestAnimationFrame(animate);
}