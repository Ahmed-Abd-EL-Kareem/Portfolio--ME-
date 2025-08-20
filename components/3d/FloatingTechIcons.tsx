"use client";

import { Float, Trail, Box, Center, Sphere, Text3D } from "@react-three/drei";

interface FloatingTechIconsProps {
  language: "en" | "ar";
}

export function FloatingTechIcons({ language }: FloatingTechIconsProps) {
  const techs = [
    {
      name: "React",
      color: "#00D2FF",
      position: [-4, 3, 0] as [number, number, number],
      shape: "box",
    },
    {
      name: "Express",
      color: "#F9CA24",
      position: [4, 2, 0] as [number, number, number],
      shape: "box",
    },
    {
      name: "JavaScript",
      color: "#FD79A8",
      position: [2, 3, 2] as [number, number, number],
      shape: "box",
    },
    {
      name: "CSS",
      color: "#00B894",
      position: [-2, 2, -2] as [number, number, number],
      shape: "box",
    },
    {
      name: "Tailwind",
      color: "#6C5CE7",
      position: [-5, 0, 1] as [number, number, number],
      shape: "box",
    },
    {
      name: "Node.js",
      color: "#4ECDC4",
      position: [-3, -1, 2] as [number, number, number],
      shape: "box",
    },
    {
      name: "MongoDB",
      color: "#45B7D1",
      position: [3, -2, -1] as [number, number, number],
      shape: "sphere",
    },
    {
      name: "SQL",
      color: "#E17055",
      position: [5, -1, 1] as [number, number, number],
      shape: "box",
    },
  ];

  return (
    <>
      {techs.map((tech, index) => (
        <Float
          key={tech.name}
          speed={1.5 + index * 0.2}
          rotationIntensity={0.8}
          floatIntensity={1.5}
          position={tech.position}
        >
          <Trail
            width={3}
            length={8}
            color={tech.color}
            attenuation={(t) => t * t}
          >
            {tech.shape === "sphere" ? (
              <Sphere args={[0.6, 16, 16]}>
                <meshStandardMaterial
                  color={tech.color}
                  transparent
                  opacity={0.9}
                  emissive={tech.color}
                  emissiveIntensity={0.4}
                  roughness={0.1}
                  metalness={0.8}
                />
              </Sphere>
            ) : (
              <Box args={[0.9, 0.9, 0.9]}>
                <meshStandardMaterial
                  color={tech.color}
                  transparent
                  opacity={0.9}
                  emissive={tech.color}
                  emissiveIntensity={0.4}
                  roughness={0.1}
                  metalness={0.8}
                />
              </Box>
            )}
          </Trail>

          {/* Tech Name Label - 3D Text */}
          <Center position={[0, -1.4, 0]}>
            <Text3D
              font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
              size={language === "ar" ? 0.2 : 0.3}
              height={0.05}
              curveSegments={8}
              bevelEnabled
              bevelThickness={0.01}
              bevelSize={0.01}
              bevelOffset={0}
              bevelSegments={3}
            >
              {tech.name}
              <meshStandardMaterial
                color={tech.color}
                emissive={tech.color}
                emissiveIntensity={0.6}
                roughness={0.2}
                metalness={0.6}
                transparent
                opacity={0.9}
              />
            </Text3D>
          </Center>
        </Float>
      ))}
    </>
  );
}
