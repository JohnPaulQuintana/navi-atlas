import { useFBX } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Walker(props: any) {
  const model = useFBX("/models/person.fbx");

  const mixer = useMemo(() => new THREE.AnimationMixer(model), [model]);

  useEffect(() => {
    console.log("MODEL", model);
    console.log("ANIMATIONS", model.animations);

    if (model.animations?.length) {
      const action = mixer.clipAction(model.animations[0]);

      action.reset();
      action.play();
    }
  }, [model, mixer]);

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  return <primitive object={model} scale={0.5} {...props} />;
}
