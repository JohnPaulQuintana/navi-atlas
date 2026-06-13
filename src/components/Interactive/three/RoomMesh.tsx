import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
export default function RoomMesh({
  room,
  selected,
  onSelect,
}: {
  room: any;
  selected?: boolean;
  onSelect?: (room: any) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || selected;

  const centerX = room.x + room.width / 2;
  const centerZ = room.y + room.height / 2;

  const WALL_HEIGHT = 60;
  const WALL_THICKNESS = 4;

  const isEntrance = room.id?.toLowerCase() === "entrance";
  const labelRef = useRef<any>(null);
  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect?.(room);
  };

  const handleHover = () => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handleLeave = () => {
    setHovered(false);
    document.body.style.cursor = "default";
  };

  useFrame((state) => {
    if (!labelRef.current || !active) return;

    labelRef.current.position.y =
      85 + Math.sin(state.clock.elapsedTime * 3) * 2;
  });
  // =========================
  // ENTRANCE
  // =========================
  if (isEntrance) {
    return (
      <group>
        <mesh
          position={[centerX, active ? 2 : 1, centerZ]}
          onClick={handleClick}
          onPointerOver={handleHover}
          onPointerOut={handleLeave}
        >
          <boxGeometry args={[room.width, active ? 6 : 3, room.height]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={active ? 2 : 1}
          />
        </mesh>

        <group ref={labelRef} position={[centerX, active ? 35 : 8, centerZ]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[Math.max(room.width * 0.7, 140), 40]} />

            <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
          </mesh>

          <Text
            position={[0, 1, 0]}
            fontSize={20}
            color="#0f172a"
            anchorX="center"
            anchorY="middle"
            rotation={[-Math.PI / 2, 0, 0]}
          >
            Entrance
          </Text>
        </group>
      </group>
    );
  }

  // =========================
  // NORMAL ROOM
  // =========================
  return (
    <group>
      {/* Floor */}
      <mesh
        position={[centerX, active ? 2 : 0.5, centerZ]}
        onClick={handleClick}
        onPointerOver={handleHover}
        onPointerOut={handleLeave}
      >
        <boxGeometry args={[room.width, active ? 4 : 1, room.height]} />
        <meshStandardMaterial
          color={active ? "#10b981" : "#f8fafc"}
          roughness={0.8}
        />
      </mesh>

      {/* Top Wall */}
      <mesh position={[centerX, WALL_HEIGHT / 2, room.y]}>
        <boxGeometry args={[room.width, WALL_HEIGHT, WALL_THICKNESS]} />

        <meshStandardMaterial color={active ? "#10b981" : "#94a3b8"} />
      </mesh>

      {/* Bottom Wall */}
      <mesh position={[centerX, WALL_HEIGHT / 2, room.y + room.height]}>
        <boxGeometry args={[room.width, WALL_HEIGHT, WALL_THICKNESS]} />

        <meshStandardMaterial color={active ? "#10b981" : "#94a3b8"} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[room.x, WALL_HEIGHT / 2, centerZ]}>
        <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, room.height]} />

        <meshStandardMaterial color={active ? "#10b981" : "#94a3b8"} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[room.x + room.width, WALL_HEIGHT / 2, centerZ]}>
        <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, room.height]} />

        <meshStandardMaterial color={active ? "#10b981" : "#94a3b8"} />
      </mesh>

      {/* Label Background */}
      <group ref={labelRef} position={[centerX, active ? 85 : 5, centerZ]}>
        {/* Floating Card */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[Math.max(room.width * 0.7, 140), 35]} />

          <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
        </mesh>

        {/* Label */}
        <Text
          position={[0, 1, 0]}
          fontSize={20}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {room.id}
        </Text>
      </group>
    </group>
  );
}
