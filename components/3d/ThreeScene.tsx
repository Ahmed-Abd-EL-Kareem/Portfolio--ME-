"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { AnimatedParticles } from "./AnimatedParticles";
import { FloatingTechIcons } from "./FloatingTechIcons";
import { AnimatedName } from "./AnimatedName";
import { RotatingPlanet } from "./RotatingPlanet";

interface ThreeSceneProps {
  isDark: boolean;
  language: "en" | "ar";
  name: string;
}

export function ThreeScene({ isDark, language, name }: ThreeSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#00D2FF" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={2.0}
          color="#FF6B6B"
        />
        <spotLight
          position={[0, 20, 0]}
          angle={0.3}
          penumbra={1}
          intensity={2.0}
          color="#6C5CE7"
        />
        <Environment preset="night" />
        <Stars
          radius={400}
          depth={80}
          count={2000}
          factor={8}
          saturation={0}
          fade
        />

        <AnimatedName isDark={isDark} language={language} name={name} />
        <FloatingTechIcons language={language} />
        <RotatingPlanet />
        <AnimatedParticles count={200} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
