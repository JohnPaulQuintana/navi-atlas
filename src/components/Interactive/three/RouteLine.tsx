import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Walker from "./Walker";

export default function RouteLine({ steps }: { steps: any[] }) {
  const points = useMemo(
    () =>
      steps
        .filter((s) => s.x != null && s.y != null)
        .map((s) => [s.x, 5, s.y] as [number, number, number]),
    [steps],
  );

  const walkerRef = useRef<THREE.Group>(null);

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

  const distanceRef = useRef(0);

  useFrame((_, delta) => {
    if (!walkerRef.current) return;

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

    const localDistance = currentDistance - segment.accumulated;

    const t = localDistance / segment.length;

    const x = segment.start[0] + (segment.end[0] - segment.start[0]) * t;

    const y = segment.start[1] + (segment.end[1] - segment.start[1]) * t;

    const z = segment.start[2] + (segment.end[2] - segment.start[2]) * t;

    walkerRef.current.position.set(x, y, z);

    const angle = Math.atan2(
      segment.end[2] - segment.start[2],
      segment.end[0] - segment.start[0],
    );

    walkerRef.current.rotation.y = -angle + Math.PI / 2;
  });

  if (points.length < 2) return null;

  return (
    <>
      <Line
        points={points}
        color="#34d399"
        lineWidth={14}
        transparent
        opacity={0.2}
      />

      <Line points={points} color="#10b981" lineWidth={6} />

      <group ref={walkerRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, 0]}>
          <ringGeometry args={[12, 18, 32]} />

          <meshBasicMaterial color="#22c55e" side={THREE.DoubleSide} />
        </mesh>

        {/* Walker Name */}
        {/* <Text
          position={[0, 120, 0]}
          fontSize={20}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={1}
          outlineColor="#111827"
        >
          Hello
        </Text> */}

        <Walker position={[0, 0, 0]} />
      </group>
    </>
  );
}
