import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RouteLine({ steps }: { steps: any[] }) {
  const points = useMemo(
    () =>
      steps
        .filter((s) => s.x != null && s.y != null)
        .map((s) => [s.x, 5, s.y] as [number, number, number]),
    [steps],
  );

  const movingDot = useRef<THREE.Mesh>(null);

  const progressRef = useRef(0);

  useFrame(() => {
    if (!movingDot.current || points.length < 2) return;

    progressRef.current += 0.004;

    if (progressRef.current >= 1) {
      progressRef.current = 0;
    }

    const totalSegments = points.length - 1;

    const segmentFloat = progressRef.current * totalSegments;

    const segmentIndex = Math.floor(segmentFloat);

    const segmentProgress = segmentFloat - segmentIndex;

    const start = points[segmentIndex];

    const end = points[Math.min(segmentIndex + 1, points.length - 1)];

    const x = start[0] + (end[0] - start[0]) * segmentProgress;

    const y = start[1] + (end[1] - start[1]) * segmentProgress;

    const z = start[2] + (end[2] - start[2]) * segmentProgress;

    movingDot.current.position.set(x, y, z);
  });

  if (points.length < 2) return null;

  return (
    <>
      {/* Glow */}
      <Line
        points={points}
        color="#34d399"
        lineWidth={14}
        transparent
        opacity={0.2}
      />

      {/* Main Route */}
      <Line points={points} color="#10b981" lineWidth={6} />

      {/* Infinite Moving Navigator */}
      <mesh ref={movingDot}>
        <sphereGeometry args={[14]} />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#22c55e"
          emissiveIntensity={4}
        />
      </mesh>
    </>
  );
}
