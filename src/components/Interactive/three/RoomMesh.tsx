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

  const WALL_HEIGHT = 40;
  const WALL_THICKNESS = 3;
  const ROOF_THICKNESS = 1;

  const isEntrance = room.id?.toLowerCase() === "entrance";

  const roomLabel = room.id?.replace(/^Room_/, "").replace(/_/g, " ");

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

  function getRoomColor(roomId: string) {
    const colors = [
      "#FDE68A", // amber
      "#BFDBFE", // blue
      "#C7D2FE", // indigo
      "#FBCFE8", // pink
      "#A7F3D0", // emerald
      "#DDD6FE", // violet
      "#FECACA", // red
      "#FED7AA", // orange
      "#BAE6FD", // sky
      "#D9F99D", // lime
    ];

    let hash = 0;

    for (let i = 0; i < roomId.length; i++) {
      hash = roomId.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  }

  function isLightColor(hex: string) {
    const color = hex.replace("#", "");

    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 180;
  }

  function getRoomIcon(roomId: string) {
    const id = roomId.toLowerCase();
    // console.log(id)

    // court
    if (id.includes("court")) return "⚽"

    // Access
    if (id.includes("entrance")) return "🚪";
    if (id.includes("exit")) return "🚶";
    if (id.includes("lobby")) return "🏛️";
    if (id.includes("reception")) return "🛎️";
    if (id.includes("information")) return "ℹ️";

    // Vertical Transport
    if (id.includes("elevator")) return "🛗";
    if (id.includes("lift")) return "🛗";
    if (id.includes("stairs")) return "🪜";
    if (id.includes("escalator")) return "⬆️";

    // Restrooms
    if (id.includes("restroom")) return "🚻";
    if (id.includes("toilet")) return "🚻";
    if (id.includes("cr")) return "🚻";
    if (id.includes("male")) return "🚹";
    if (id.includes("female")) return "🚺";
    if (id.includes("pwd")) return "♿";

    // Food
    if (id.includes("canteen")) return "🥘";
    if (id.includes("restaurant")) return "🍽️";
    if (id.includes("cafe")) return "☕";
    if (id.includes("coffee")) return "☕";
    if (id.includes("bakery")) return "🥐";
    if (id.includes("milk tea")) return "🧋";

    // Finance
    if (id.includes("atm")) return "🏧";
    if (id.includes("bank")) return "🏦";
    if (id.includes("cashier")) return "💳";

    // Healthcare
    if (id.includes("clinic")) return "🏥";
    if (id.includes("medical")) return "🏥";
    if (id.includes("pharmacy")) return "💊";
    if (id.includes("nurse")) return "🩺";

    // Security
    if (id.includes("security")) return "🛡️";
    if (id.includes("guard")) return "🛡️";
    if (id.includes("police")) return "👮";

    // Utilities
    if (id.includes("electrical")) return "⚡";
    if (id.includes("generator")) return "🔋";
    if (id.includes("server")) return "🖥️";
    if (id.includes("it")) return "💻";
    if (id.includes("maintenance")) return "🔧";

    // Retail
    if (id.includes("store")) return "🛍️";
    if (id.includes("shop")) return "🛍️";
    if (id.includes("boutique")) return "👕";
    if (id.includes("grocery")) return "🛒";
    if (id.includes("market")) return "🛒";

    // Education
    if (id.includes("library")) return "📚";
    if (id.includes("classroom")) return "🎓";
    if (id.includes("lecture")) return "🎓";
    if (id.includes("laboratory")) return "🧪";

    // Office
    if (id.includes("office")) return "🏢";
    if (id.includes("admin")) return "📋";
    if (id.includes("hr")) return "👥";
    if (id.includes("meeting")) return "🤝";
    if (id.includes("conference")) return "📊";

    // Entertainment
    if (id.includes("cinema")) return "🎬";
    if (id.includes("movie")) return "🎬";
    if (id.includes("arcade")) return "🎮";
    if (id.includes("play")) return "🧸";

    // Fitness
    if (id.includes("gym")) return "💪";
    if (id.includes("fitness")) return "🏋️";
    if (id.includes("sports")) return "⚽";

    // Parking & Transport
    if (id.includes("parking")) return "🅿️";
    if (id.includes("terminal")) return "🚌";
    if (id.includes("transport")) return "🚍";

    // Storage
    if (id.includes("warehouse")) return "📦";
    if (id.includes("storage")) return "📦";
    if (id.includes("stock")) return "📦";

    // Hallways & Navigation
    if (id.includes("hallway")) return "➡️";
    if (id.includes("corridor")) return "➡️";
    if (id.includes("junction")) return "🔀";

    // Special Rooms
    if (id.includes("vip")) return "⭐";
    if (id.includes("executive")) return "👔";
    if (id.includes("lounge")) return "🛋️";

    // Default
    return "🏢";
  }

  const roomColor = getRoomColor(room.id || "");
  const labelColor = isLightColor(roomColor) ? "#273338" : "#ffffff";

  const labelOutline = isLightColor(roomColor) ? "#ffffff" : "#2B5748";
  const ICON_OFFSET = Math.min(room.height * 0.15, 12);

  return (
    <group>
      {/* Selected Highlight */}
      {selected && (
        <mesh position={[centerX, 0.2, centerZ]}>
          <boxGeometry args={[room.width + 8, 1, room.height + 8]} />

          <meshBasicMaterial color="#10b981" transparent opacity={0.8} />
        </mesh>
      )}

      {/* Floor */}
      <mesh
        position={[centerX, active ? 2 : 0.5, centerZ]}
        onClick={handleClick}
        onPointerOver={handleHover}
        onPointerOut={handleLeave}
      >
        <boxGeometry
          args={[room.width, active ? (isEntrance ? 6 : 3) : 1, room.height]}
        />

        <meshStandardMaterial
          color={isEntrance ? "#22c55e" : active ? "#dcfce7" : "#f8fafc"}
          emissive={isEntrance ? "#16a34a" : "#000000"}
          emissiveIntensity={isEntrance ? 0.4 : 0}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Walls + Roof */}
      {!isEntrance && (
        <>
          {/* Front Wall */}
          <mesh position={[centerX, WALL_HEIGHT / 2, room.y]}>
            <boxGeometry args={[room.width, WALL_HEIGHT, WALL_THICKNESS]} />

            <meshStandardMaterial
              color={active ? "#10b981" : roomColor}
              roughness={1}
            />
          </mesh>

          {/* Back Wall */}
          <mesh position={[centerX, WALL_HEIGHT / 2, room.y + room.height]}>
            <boxGeometry args={[room.width, WALL_HEIGHT, WALL_THICKNESS]} />

            <meshStandardMaterial
              color={active ? "#10b981" : roomColor}
              roughness={1}
            />
          </mesh>

          {/* Left Wall */}
          <mesh position={[room.x, WALL_HEIGHT / 2, centerZ]}>
            <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, room.height]} />

            <meshStandardMaterial
              color={active ? "#10b981" : roomColor}
              roughness={1}
            />
          </mesh>

          {/* Right Wall */}
          <mesh position={[room.x + room.width, WALL_HEIGHT / 2, centerZ]}>
            <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, room.height]} />

            <meshStandardMaterial
              color={active ? "#10b981" : roomColor}
              roughness={1}
            />
          </mesh>

          {/* Roof */}
          <mesh
            position={[centerX, WALL_HEIGHT + ROOF_THICKNESS / 2, centerZ]}
            onClick={handleClick}
            onPointerOver={handleHover}
            onPointerOut={handleLeave}
          >
            <boxGeometry args={[room.width, ROOF_THICKNESS, room.height]} />

            <meshStandardMaterial
              color={active ? "#10b981" : roomColor}
              roughness={1}
              metalness={0}
            />
          </mesh>

          {/* Roof Label */}

          {/* Icon */}
          <Text
            position={[
              centerX,
              WALL_HEIGHT + ROOF_THICKNESS + 0.5,
              centerZ - ICON_OFFSET,
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={24}
            color={selected ? "#ffffff" : labelColor}
            anchorX="center"
            anchorY="middle"
            outlineWidth={2}
            outlineColor={selected ? "#2B5748" : labelOutline}
          >
            {getRoomIcon(room.id)}
          </Text>

          {/* Label */}
          <Text
            position={[
              centerX,
              WALL_HEIGHT + ROOF_THICKNESS + 0.5,
              centerZ + ICON_OFFSET,
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={14}
            maxWidth={Math.max(room.width - 10, 20)}
            color={selected ? "#ffffff" : labelColor}
            anchorX="center"
            anchorY="middle"
            outlineWidth={2}
            outlineColor={selected ? "#2B5748" : labelOutline}
          >
            {roomLabel}
          </Text>
        </>
      )}

      {/* Entrance Label */}
      {isEntrance && (
        <Text
          position={[centerX, 8, centerZ]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={10}
          color={labelColor}
          anchorX="center"
          anchorY="middle"
        >
          Entrance
        </Text>
      )}
    </group>
  );
}
