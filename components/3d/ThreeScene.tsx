'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { AnimatedParticles } from './AnimatedParticles'
import { FloatingTechIcons } from './FloatingTechIcons'
import { AnimatedName } from './AnimatedName'
import { RotatingPlanet } from './RotatingPlanet'
import { Suspense } from 'react'

interface ThreeSceneProps {
  isDark: boolean
  language: 'en' | 'ar'
  name: string
}

export function ThreeScene({ isDark, language, name }: ThreeSceneProps) {
  return (
    <div className='absolute inset-0'>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 45 }}
        performance={{ min: 0.5 }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.0} color='#00D2FF' />

        <Suspense fallback={null}>
          <Environment preset='night' />
        </Suspense>

        <Stars
          radius={200}
          depth={30}
          count={100}
          factor={2}
          saturation={0}
          fade
        />

        <Suspense fallback={null}>
          <AnimatedName isDark={isDark} language={language} name={name} />
        </Suspense>

        <Suspense fallback={null}>
          <FloatingTechIcons language={language} />
        </Suspense>

        <Suspense fallback={null}>
          <RotatingPlanet />
        </Suspense>

        <Suspense fallback={null}>
          <AnimatedParticles count={15} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}
