let startNode = "Entrance";

export function renderMap(
  container: HTMLDivElement,
  data: any,
  filename: string,
  updateCallback: Function
) {
  if (!container) return;

  container.innerHTML = "";

  const stage = document.createElement("div");
  stage.className =
    "w-full h-full relative bg-slate-100 cursor-grab overflow-hidden";
  container.appendChild(stage);

  stage.innerHTML = data.svg;

  const svg = stage.querySelector("svg") as SVGSVGElement;
  if (!svg) return;

  // =========================
  // RESPONSIVE FIX (IMPORTANT)
  // =========================
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.maxWidth = "100%";
  svg.style.maxHeight = "100%";
  svg.style.objectFit = "contain";
  svg.style.transformOrigin = "0 0";

  // =========================
  // CAMERA STATE
  // =========================
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };
  let translate = { x: 0, y: 0 };
  let scale = 1;
  let userInteracting = false;
  let autoFollowTimer: any = null;

  function applyTransform() {
    svg.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`;
  }

  // =========================
  // TOUCH SUPPORT (MOBILE FIX)
  // =========================
  let lastTouch = { x: 0, y: 0 };

  stage.addEventListener("touchstart", (e: TouchEvent) => {
    const t = e.touches[0];
    lastTouch = { x: t.clientX, y: t.clientY };
    userInteracting = true;
  });

  stage.addEventListener("touchmove", (e: TouchEvent) => {
    const t = e.touches[0];
    const dx = t.clientX - lastTouch.x;
    const dy = t.clientY - lastTouch.y;

    translate.x += dx;
    translate.y += dy;

    lastTouch = { x: t.clientX, y: t.clientY };
    applyTransform();
  });

  // =========================
  // DESKTOP DRAG
  // =========================
  stage.addEventListener("mousedown", (e) => {
    isDragging = true;
    userInteracting = true;

    dragStart.x = e.clientX - translate.x;
    dragStart.y = e.clientY - translate.y;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    translate.x = e.clientX - dragStart.x;
    translate.y = e.clientY - dragStart.y;
    applyTransform();
  });

  // =========================
  // ZOOM (mouse + pinch ready)
  // =========================
  stage.addEventListener("wheel", (e) => {
    e.preventDefault();

    const zoom = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = scale * zoom;

    if (newScale < 0.3 || newScale > 4) return;

    const rect = stage.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    translate.x = mx - (mx - translate.x) * zoom;
    translate.y = my - (my - translate.y) * zoom;

    scale = newScale;
    applyTransform();
  });

  // =========================
  // NODE SELECTION
  // =========================
  function applyNodeStyles() {
    const nodes = svg.querySelectorAll("[id^='Room'], [id^='Entrance']");

    nodes.forEach((el: any) => {
      el.style.cursor = "pointer";

      el.onclick = async () => {
        await updateCallback(filename, startNode, el.id);
      };
    });
  }

  applyNodeStyles();

  // =========================
  // SAFE CLEANUP
  // =========================
  return () => {
    stage.remove();
  };
}