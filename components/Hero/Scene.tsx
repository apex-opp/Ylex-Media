"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import LiquidOrb from "@/components/Hero/LiquidOrb";

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 3.25], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#070511"]} />
      <Suspense fallback={null}>
        {/* Backdrop plane to refract */}
        <mesh position={[0, 0, -2.2]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial
            color="#070511"
            transparent
            opacity={0.0}
          />
        </mesh>

        {/* Lighting tuned for glass transmission */}
        <ambientLight intensity={0.35} />
        <pointLight position={[2.5, 2.0, 3.0]} intensity={1.4} color={"#00E5FF"} />
        <pointLight position={[-2.3, -1.2, 2.2]} intensity={1.25} color={"#FF2BD6"} />
        <pointLight position={[0.0, 2.4, 1.0]} intensity={0.75} color={"#B400FF"} />

        <LiquidOrb />
      </Suspense>
    </Canvas>
  );
}
