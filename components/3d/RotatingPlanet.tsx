"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";

export function RotatingPlanet() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.015;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.8}
      position={[7, -3, -4]}
    >
      <Sphere ref={meshRef} args={[1.2, 64, 64]}>
        <meshStandardMaterial
          color="#FF6B6B"
          transparent
          opacity={0.8}
          emissive="#FF6B6B"
          emissiveIntensity={0.4}
          wireframe
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}
