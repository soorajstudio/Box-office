'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Sparkles } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

const GOLD = '#d4af37'
const GOLD_LIGHT = '#f5d57a'

/** A stylised golden film reel built from primitives. */
function FilmReel() {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.z += delta * 0.18
    }
  })

  const holes = useMemo(() => {
    const items: { x: number; y: number }[] = []
    const count = 6
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      items.push({ x: Math.cos(a) * 0.95, y: Math.sin(a) * 0.95 })
    }
    return items
  }, [])

  return (
    <group ref={group} rotation={[Math.PI / 2.6, 0, 0]}>
      {/* outer ring */}
      <mesh>
        <torusGeometry args={[1.6, 0.18, 24, 80]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.18} />
      </mesh>
      {/* reel face */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.55, 1.55, 0.12, 64]} />
        <meshStandardMaterial color={'#1a1505'} metalness={0.9} roughness={0.35} />
      </mesh>
      {/* center hub */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 0.22, 48]} />
        <meshStandardMaterial color={GOLD_LIGHT} metalness={1} roughness={0.15} />
      </mesh>
      {/* spoke holes */}
      {holes.map((h, i) => (
        <mesh key={i} position={[h.x, h.y, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.3, 32]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function FloatingShape({
  position,
  scale,
  kind,
  speed,
}: {
  position: [number, number, number]
  scale: number
  kind: 'ico' | 'dodec' | 'octa'
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed
      ref.current.rotation.y += delta * speed * 0.7
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        {kind === 'ico' && <icosahedronGeometry args={[1, 0]} />}
        {kind === 'dodec' && <dodecahedronGeometry args={[1, 0]} />}
        {kind === 'octa' && <octahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0.22}
          emissive={'#3a2a00'}
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  )
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.35,
        0.04,
      )
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -pointer.y * 0.25,
        0.04,
      )
    }
  })
  return <group ref={group}>{children}</group>
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#0a0a08']} />
      <fog attach="fog" args={['#0a0a08', 8, 18]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} color={GOLD_LIGHT} />
      <pointLight position={[-6, -3, 2]} intensity={30} color={'#ff8a3d'} />
      <pointLight position={[6, 4, 6]} intensity={20} color={'#ffd98a'} />

      <Rig>
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
          <FilmReel />
        </Float>
        <FloatingShape position={[-3.3, 1.4, -1]} scale={0.5} kind="ico" speed={0.5} />
        <FloatingShape position={[3.4, -1.2, -0.5]} scale={0.42} kind="dodec" speed={0.4} />
        <FloatingShape position={[2.8, 1.8, -2]} scale={0.34} kind="octa" speed={0.6} />
        <FloatingShape position={[-2.9, -1.7, -1.5]} scale={0.38} kind="dodec" speed={0.45} />
      </Rig>

      <Sparkles count={120} scale={12} size={3} speed={0.3} color={GOLD_LIGHT} opacity={0.7} />
      <Environment preset="sunset" environmentIntensity={0.5} />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: false }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
