import { Text } from "@react-three/drei";
import { useState } from "react";

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

  const isEntrance =
    room.id?.toLowerCase() === "entrance";

  const roomLabel = room.id
    ?.replace(/^Room_/, "")
    .replace(/_/g, " ");

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

  return (
    <group>
      {/* Selected Highlight */}
      {selected && (
        <mesh
          position={[centerX, 0.2, centerZ]}
        >
          <boxGeometry
            args={[
              room.width + 8,
              1,
              room.height + 8,
            ]}
          />

          <meshBasicMaterial
            color="#10b981"
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Floor */}
      <mesh
        position={[
          centerX,
          active ? 2 : 0.5,
          centerZ,
        ]}
        onClick={handleClick}
        onPointerOver={handleHover}
        onPointerOut={handleLeave}
      >
        <boxGeometry
          args={[
            room.width,
            active
              ? isEntrance
                ? 6
                : 3
              : 1,
            room.height,
          ]}
        />

        <meshStandardMaterial
          color={
            isEntrance
              ? "#22c55e"
              : active
                ? "#dcfce7"
                : "#f8fafc"
          }
          emissive={
            isEntrance
              ? "#16a34a"
              : "#000000"
          }
          emissiveIntensity={
            isEntrance ? 0.4 : 0
          }
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Walls */}
      {!isEntrance && (
        <>
          <mesh
            position={[
              centerX,
              WALL_HEIGHT / 2,
              room.y,
            ]}
          >
            <boxGeometry
              args={[
                room.width,
                WALL_HEIGHT,
                WALL_THICKNESS,
              ]}
            />

            <meshStandardMaterial
              color={
                active
                  ? "#10b981"
                  : "#cbd5e1"
              }
              roughness={1}
            />
          </mesh>

          <mesh
            position={[
              centerX,
              WALL_HEIGHT / 2,
              room.y + room.height,
            ]}
          >
            <boxGeometry
              args={[
                room.width,
                WALL_HEIGHT,
                WALL_THICKNESS,
              ]}
            />

            <meshStandardMaterial
              color={
                active
                  ? "#10b981"
                  : "#cbd5e1"
              }
              roughness={1}
            />
          </mesh>

          <mesh
            position={[
              room.x,
              WALL_HEIGHT / 2,
              centerZ,
            ]}
          >
            <boxGeometry
              args={[
                WALL_THICKNESS,
                WALL_HEIGHT,
                room.height,
              ]}
            />

            <meshStandardMaterial
              color={
                active
                  ? "#10b981"
                  : "#cbd5e1"
              }
              roughness={1}
            />
          </mesh>

          <mesh
            position={[
              room.x + room.width,
              WALL_HEIGHT / 2,
              centerZ,
            ]}
          >
            <boxGeometry
              args={[
                WALL_THICKNESS,
                WALL_HEIGHT,
                room.height,
              ]}
            />

            <meshStandardMaterial
              color={
                active
                  ? "#10b981"
                  : "#cbd5e1"
              }
              roughness={1}
            />
          </mesh>
        </>
      )}

      {/* Label */}
      <group
        position={[
          centerX,
          WALL_HEIGHT + 14,
          centerZ,
        ]}
      >
        <mesh>
          <planeGeometry
            args={[
              Math.max(
                roomLabel.length * 4,
                isEntrance ? 70 : 90,
              ),
              18,
            ]}
          />

          <meshBasicMaterial
            color={
              selected
                ? "#10b981"
                : "#ffffff"
            }
            transparent
            opacity={0.95}
          />
        </mesh>

        <Text
          position={[0, 0, 0.5]}
          fontSize={12}
          color={
            selected
              ? "#ffffff"
              : "#0f172a"
          }
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.4}
          outlineColor={
            selected
              ? "#10b981"
              : "#ffffff"
          }
        >
          {isEntrance
            ? "Entrance"
            : roomLabel}
        </Text>
      </group>
    </group>
  );
}