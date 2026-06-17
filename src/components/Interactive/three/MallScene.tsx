import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

import RoomMesh from "./RoomMesh";
import HallwaysMesh from "./HallwaysMesh";
import RouteLine from "./RouteLine";
import StreetViewCamera from "./StreetViewCamera";

interface MallSceneProps {
  rooms: any[];
  walkables: any[];
  steps: any[];
  selectedRoom?: string | null;
  onRoomClick?: (room: any) => void;
}

export default function MallScene({
  rooms,
  walkables,
  steps,
  onRoomClick,
  selectedRoom,
}: MallSceneProps) {
  const walkerRef = useRef<THREE.Group>(null);

  const [streetView, setStreetView] = useState(false);

  return (
    <div className="relative w-full h-full">

      <Canvas
        gl={{
          antialias: true,
        }}
        camera={{
          position: [600, 2200, 1600],
          fov: 35,
          near: 10,
          far: 5000,
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={2} />

        <directionalLight position={[1000, 1500, 1000]} intensity={2} />

        {/* Board */}
        <mesh receiveShadow position={[600, -15, 400]}>
          <boxGeometry args={[1200, 30, 800]} />
          <meshStandardMaterial color="#b7b7a4" />
        </mesh>

        {/* Grid */}
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

        <HallwaysMesh walkables={walkables} />

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

        <StreetViewCamera enabled={streetView} target={walkerRef.current} />

        <RouteLine
          steps={steps}
          walkerRef={walkerRef}
          streetView={streetView}
        />

        <OrbitControls
          enabled={!streetView}
          target={[600, 0, 400]}
          enablePan
          minDistance={500}
          maxDistance={10000}
        />
      </Canvas>

      <button
        onClick={() => setStreetView(!streetView)}
        className="hidden absolute top-4 right-4 z-50 bg-white rounded-lg px-4 py-2"
      >
        {streetView ? "Map View" : "Street View"}
      </button>
    </div>
  );
}
