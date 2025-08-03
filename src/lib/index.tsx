import { Bounds, TrackballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Model } from "./components/Model";

export default function MainScene() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <Model />
        </Bounds>
      </Suspense>
      <TrackballControls />
      <ambientLight intensity={0.2} />
    </Canvas>
  );
}
