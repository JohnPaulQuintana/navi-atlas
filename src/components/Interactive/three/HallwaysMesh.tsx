export default function HallwaysMesh({
  walkables,
}: {
  walkables: any[];
}) {
  const HALLWAY_WIDTH = 50;
  const HALLWAY_THICKNESS = 0.5;

  return (
    <>
      {walkables.map((line, index) => {
        const dx = line.x2 - line.x1;
        const dz = line.y2 - line.y1;

        const length = Math.sqrt(
          dx * dx + dz * dz
        );

        const centerX =
          (line.x1 + line.x2) / 2;

        const centerZ =
          (line.y1 + line.y2) / 2;

        const rotationY = Math.atan2(
          dx,
          dz
        );

        return (
          <mesh
            key={index}
            position={[
              centerX,
              2,
              centerZ,
            ]}
            rotation={[
              0,
              rotationY,
              0,
            ]}
            receiveShadow
            renderOrder={1}
          >
            <boxGeometry
              args={[
                HALLWAY_WIDTH,
                HALLWAY_THICKNESS,
                length,
              ]}
            />

            <meshStandardMaterial
              color="#FFF0E4"
              roughness={1}
              metalness={0}
              polygonOffset
              polygonOffsetFactor={-2}
              polygonOffsetUnits={-2}
            />
          </mesh>
        );
      })}
    </>
  );
}