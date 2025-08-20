"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Center, Text3D } from "@react-three/drei";

interface AnimatedNameProps {
  isDark: boolean;
  language: "en" | "ar";
  name: string;
}

export function AnimatedName({ isDark }: AnimatedNameProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <Center position={[0, 0, 0]}>
        <Text3D
          ref={meshRef}
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={1.2}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Ahmed Abd EL Kareem
          <meshStandardMaterial
            color={isDark ? "#FFFFFF" : "#1E293B"}
            emissive={isDark ? "#3B82F6" : "#6366F1"}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </Text3D>
      </Center>
    </Float>
  );
}
