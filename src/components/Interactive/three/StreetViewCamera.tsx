import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function StreetViewCamera({
  enabled,
  target,
}: {
  enabled: boolean;
  target: THREE.Object3D | null;
}) {
  const { camera } = useThree();

  useFrame(() => {
    if (!enabled || !target) return;

    const pos = target.position;

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(target.quaternion);

    const EYE_HEIGHT = 18;

    camera.position.lerp(
      new THREE.Vector3(
        pos.x,
        pos.y + EYE_HEIGHT,
        pos.z,
      ),
      0.25,
    );

    camera.lookAt(
      pos.x + forward.x * 100,
      pos.y + EYE_HEIGHT,
      pos.z + forward.z * 100,
    );
  });

  return null;
}