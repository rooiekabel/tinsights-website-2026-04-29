"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function EnergyShape() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.15;
    mesh.current.rotation.y = t * 0.25;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.4}>
      <mesh ref={mesh} scale={2.1}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#1e1b4b"
          emissiveIntensity={0.35}
          metalness={0.85}
          roughness={0.18}
          distort={0.4}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} color="#e0e7ff" />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[3, -1, 1]} intensity={0.45} color="#7c3aed" />
      <EnergyShape />
      <ContactShadows
        position={[0, -2.35, 0]}
        opacity={0.45}
        scale={7}
        blur={2.4}
        far={3.2}
        color="#000"
      />
    </>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="h-[min(52vh,420px)] w-full min-h-[280px] sm:h-[440px] lg:min-h-[400px]">
      <Canvas
        className="!h-full !w-full"
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ fov: 40, position: [0, 0.1, 6.2] }}
        aria-label="3D vorm, decoratief"
        role="img"
      >
        <Scene />
      </Canvas>
    </div>
  );
}
