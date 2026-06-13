import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import RoomMesh from "./RoomMesh";
// import * as THREE from "three";
import RouteLine from "./RouteLine";

interface MallSceneProps {
  rooms: any[];
  steps: any[];
  selectedRoom?: string | null;
  onRoomClick?: (room: any) => void;
}

export default function MallScene({
  rooms,
  steps,
  onRoomClick,
  selectedRoom,
}: MallSceneProps) {
  return (
    <Canvas
      camera={{
        position: [600, 2200, 1600],
        fov: 35,
        near: 0.1,
        far: 20000,
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={2} />

      <directionalLight position={[1000, 1500, 1000]} intensity={2} />

      {/* Board */}
      <mesh receiveShadow position={[600, -15, 400]}>
        <boxGeometry
          args={[
            1200, // width
            30, // thickness
            800, // depth
          ]}
        />

        <meshStandardMaterial color="#b7b7a4" />
      </mesh>

      {/* Grid Overlay */}
      <Grid
        position={[600, 0.05, 400]}
        args={[1200, 800]}
        cellSize={25}
        sectionSize={100}
        cellThickness={0.15}
        sectionThickness={0.2}
        fadeDistance={5000}
        fadeStrength={0}
        infiniteGrid={false}
      />

      {/* Rooms */}
      {rooms
        .filter((room) => room.id)
        .map((room) => (
          <RoomMesh
            key={room.id}
            room={room}
            onSelect={onRoomClick}
            selected={selectedRoom === room.id}
          />
        ))}

      {/* Navigation Route */}
      <RouteLine steps={steps} />

      <OrbitControls
        target={[600, 0, 400]}
        enablePan
        minDistance={500}
        maxDistance={10000}
      />
    </Canvas>
  );
}
