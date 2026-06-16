// import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Walker from "./Walker";
import { useEffect } from "react";

export default function RouteLine({ steps }: { steps: any[] }) {
  const ROUTE_HEIGHT = 3;

  const points = useMemo(
    () =>
      steps
        .filter((s) => s.x != null && s.y != null)
        .map((s) => [s.x, ROUTE_HEIGHT, s.y] as [number, number, number]),
    [steps],
  );

  const walkerRef = useRef<THREE.Group>(null);
  const distanceRef = useRef(0);

  useEffect(() => {
    if (!walkerRef.current || points.length === 0) {
      return;
    }

    distanceRef.current = 0;

    const start = points[0];

    walkerRef.current.position.set(start[0], start[1] + 4, start[2]);
  }, [points]);

  const segments = useMemo(() => {
    let total = 0;
    const segs = [];

    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];

      const dx = end[0] - start[0];
      const dz = end[2] - start[2];

      const length = Math.sqrt(dx * dx + dz * dz);

      segs.push({
        start,
        end,
        length,
        accumulated: total,
      });

      total += length;
    }

    return {
      segments: segs,
      totalLength: total,
    };
  }, [points]);

  useFrame((_, delta) => {
    if (!walkerRef.current || segments.totalLength === 0) {
      return;
    }

    const WALK_SPEED = 120;

    distanceRef.current += delta * WALK_SPEED;

    if (distanceRef.current >= segments.totalLength) {
      distanceRef.current = 0;
    }

    const currentDistance = distanceRef.current;

    const segment = segments.segments.find(
      (s) =>
        currentDistance >= s.accumulated &&
        currentDistance <= s.accumulated + s.length,
    );

    if (!segment) return;

    const t = (currentDistance - segment.accumulated) / segment.length;

    const x = segment.start[0] + (segment.end[0] - segment.start[0]) * t;

    const y = segment.start[1] + (segment.end[1] - segment.start[1]) * t;

    const z = segment.start[2] + (segment.end[2] - segment.start[2]) * t;

    walkerRef.current.position.set(x, y + 4, z);

    const angle = Math.atan2(
      segment.end[2] - segment.start[2],
      segment.end[0] - segment.start[0],
    );

    walkerRef.current.rotation.y = -angle + Math.PI / 2;
  });

  if (points.length < 2) {
    return null;
  }

  return (
    <>
      {/* Route Segments */}
      {segments.segments.map((segment, index) => {
        const dx = segment.end[0] - segment.start[0];

        const dz = segment.end[2] - segment.start[2];

        const length = Math.sqrt(dx * dx + dz * dz) + 10; // overlap

        const centerX = (segment.start[0] + segment.end[0]) / 2;

        const centerZ = (segment.start[2] + segment.end[2]) / 2;

        const rotationY = Math.atan2(dx, dz);

        return (
          <mesh
            key={`segment-${index}`}
            position={[centerX, ROUTE_HEIGHT, centerZ]}
            rotation={[0, rotationY, 0]}
            renderOrder={9999}
          >
            <boxGeometry
              args={[
                18, // width
                0.8, // thickness
                length,
              ]}
            />

            <meshBasicMaterial
              color="#10b981"
              depthTest={false}
              depthWrite={false}
            />
          </mesh>
        );
      })}

      {/* Route Joints */}
      {points.map((point, index) => (
        <mesh
          key={`joint-${index}`}
          position={[point[0], ROUTE_HEIGHT, point[2]]}
          rotation={[Math.PI / 2, 0, 0]}
          renderOrder={10000}
        >
          <circleGeometry args={[9, 24]} />

          <meshBasicMaterial
            color="#10b981"
            depthTest={false}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Walker */}
      <group ref={walkerRef} renderOrder={10001}>
        <mesh
          position={[0, 1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          renderOrder={10002}
        >
          <ringGeometry args={[12, 18, 32]} />

          <meshBasicMaterial
            color="#22c55e"
            side={THREE.DoubleSide}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        <Walker position={[0, 0, 0]} />
      </group>
    </>
  );
}
