import { type RefObject, useCallback, useRef } from "react";

export function useMapPanZoom(
  svgRef: RefObject<SVGSVGElement | null>,
  stageRef: RefObject<HTMLDivElement | null>,
) {
  const transformRef = useRef({
    translate: { x: 0, y: 0 },
    scale: 1,
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    lastTouch: { x: 0, y: 0 },
    lastPinchDistance: undefined as number | undefined,
  });

  const applyTransform = useCallback(() => {
    if (!svgRef.current) return;

    const { translate, scale } = transformRef.current;

    svgRef.current.style.transform = `
      translate3d(${translate.x}px, ${translate.y}px, 0)
      scale(${scale})
    `;

    svgRef.current.style.transformOrigin = "0 0";
  }, [svgRef]);

  const applyInitialCamera = useCallback(() => {
    if (!stageRef.current || !svgRef.current) return;

    const svg = svgRef.current;
    const stage = stageRef.current;

    const updateCamera = () => {
      const bbox = svg.getBBox();
      const rect = stage.getBoundingClientRect();

      if (!bbox.width || !bbox.height || !rect.width || !rect.height) {
        requestAnimationFrame(updateCamera);
        return;
      }

      const isMobile = window.innerWidth < 768;

      const targetScale =
        Math.min(rect.width / bbox.width, rect.height / bbox.height) *
        (isMobile ? 1.2 : 1.1);

      transformRef.current.scale = Math.max(
        0.5,
        Math.min(targetScale, 5),
      );

      transformRef.current.translate.x =
        (rect.width - bbox.width * transformRef.current.scale) / 2 -
        bbox.x * transformRef.current.scale;

      transformRef.current.translate.y =
        (rect.height - bbox.height * transformRef.current.scale) / 2 -
        bbox.y * transformRef.current.scale;

      applyTransform();
    };

    setTimeout(updateCamera, 50);
  }, [svgRef, stageRef, applyTransform]);

  const attachEvents = useCallback(() => {
    if (!stageRef.current) return () => {};

    const stage = stageRef.current;
    const transform = transformRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      transform.isDragging = true;
      transform.dragStart.x = e.clientX - transform.translate.x;
      transform.dragStart.y = e.clientY - transform.translate.y;
      stage.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!transform.isDragging) return;

      transform.translate.x = e.clientX - transform.dragStart.x;
      transform.translate.y = e.clientY - transform.dragStart.y;

      applyTransform();
    };

    const handleMouseUp = () => {
      transform.isDragging = false;
      stage.style.cursor = "grab";
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();

      const t = e.touches[0];

      transform.lastTouch = {
        x: t.clientX,
        y: t.clientY,
      };

      if (e.touches.length === 2) {
        transform.isDragging = false;

        const touch1 = e.touches[0];
        const touch2 = e.touches[1];

        transform.lastPinchDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY,
        );
      } else {
        transform.isDragging = true;

        transform.dragStart.x =
          t.clientX - transform.translate.x;

        transform.dragStart.y =
          t.clientY - transform.translate.y;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      if (
        e.touches.length === 2 &&
        transform.lastPinchDistance
      ) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];

        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY,
        );

        const delta =
          distance - transform.lastPinchDistance;

        const zoom = delta > 0 ? 1.05 : 0.95;
        const newScale = transform.scale * zoom;

        if (newScale >= 0.5 && newScale <= 6) {
          const rect = stage.getBoundingClientRect();

          const mx =
            (touch1.clientX + touch2.clientX) / 2 -
            rect.left;

          const my =
            (touch1.clientY + touch2.clientY) / 2 -
            rect.top;

          transform.translate.x =
            mx -
            (mx - transform.translate.x) * zoom;

          transform.translate.y =
            my -
            (my - transform.translate.y) * zoom;

          transform.scale = newScale;

          applyTransform();
        }

        transform.lastPinchDistance = distance;
      } else if (
        transform.isDragging &&
        e.touches.length === 1
      ) {
        const t = e.touches[0];

        const dx =
          t.clientX - transform.lastTouch.x;

        const dy =
          t.clientY - transform.lastTouch.y;

        transform.translate.x += dx;
        transform.translate.y += dy;

        transform.lastTouch = {
          x: t.clientX,
          y: t.clientY,
        };

        applyTransform();
      }
    };

    const handleTouchEnd = () => {
      transform.isDragging = false;
      transform.lastPinchDistance = undefined;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = transform.scale * delta;

      if (newScale < 0.3 || newScale > 8) return;

      const rect = stage.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      transform.translate.x =
        mouseX -
        (mouseX - transform.translate.x) * delta;

      transform.translate.y =
        mouseY -
        (mouseY - transform.translate.y) * delta;

      transform.scale = newScale;

      applyTransform();
    };

    stage.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    stage.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    stage.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    stage.addEventListener("touchend", handleTouchEnd);

    stage.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      stage.removeEventListener(
        "mousedown",
        handleMouseDown,
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp,
      );

      stage.removeEventListener(
        "touchstart",
        handleTouchStart,
      );

      stage.removeEventListener(
        "touchmove",
        handleTouchMove,
      );

      stage.removeEventListener(
        "touchend",
        handleTouchEnd,
      );

      stage.removeEventListener(
        "wheel",
        handleWheel,
      );
    };
  }, [applyTransform, stageRef]);

  return {
    applyTransform,
    applyInitialCamera,
    attachEvents,
    transformRef,
  };
}