'use client'

import { useRef, useState, useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AnimatedParticlesProps {
  count?: number
}

export function AnimatedParticles({ count = 100 }: AnimatedParticlesProps) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const [dummy] = useState(() => new THREE.Object3D())
  const lastUpdate = useRef(0)

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        speed: 0.005 + Math.random() * 0.015,
        color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.6),
      })
    }
    return temp
  }, [count])

  const updateParticles = useCallback(
    (state: any) => {
      const now = state.clock.getElapsedTime()
      // Throttle updates to reduce main thread blocking
      if (now - lastUpdate.current < 0.016) return // ~60fps
      lastUpdate.current = now

      particles.forEach((particle, i) => {
        const t = now
        particle.position[1] += Math.sin(t * particle.speed + i) * 0.008
        particle.position[0] += Math.cos(t * particle.speed + i) * 0.005
        particle.rotation[0] += particle.speed
        particle.rotation[1] += particle.speed * 0.7
        particle.rotation[2] += particle.speed * 0.3

        dummy.position.set(
          particle.position[0],
          particle.position[1],
          particle.position[2]
        )
        dummy.rotation.set(
          particle.rotation[0],
          particle.rotation[1],
          particle.rotation[2]
        )
        dummy.updateMatrix()

        if (mesh.current) {
          mesh.current.setMatrixAt(i, dummy.matrix)
          mesh.current.setColorAt(i, particle.color)
        }
      })

      if (mesh.current) {
        mesh.current.instanceMatrix.needsUpdate = true
        if (mesh.current.instanceColor) {
          mesh.current.instanceColor.needsUpdate = true
        }
      }
    },
    [particles, dummy]
  )

  useFrame(updateParticles)

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.015]} />
      <meshStandardMaterial transparent opacity={0.8} />
    </instancedMesh>
  )
}
