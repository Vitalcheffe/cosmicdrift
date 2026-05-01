'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 300 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    velocitiesRef.current = vel;
    return pos;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const geometry = mesh.current.geometry;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const velocities = velocitiesRef.current;
    if (!velocities) return;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around boundaries
      if (Math.abs(posArray[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 6) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#C9A84C"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CentralGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.005;
    // Subtle mouse influence
    const mx = state.pointer.x * 0.2;
    const my = state.pointer.y * 0.2;
    meshRef.current.rotation.x += my * 0.01;
    meshRef.current.rotation.y += mx * 0.01;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Icosahedron ref={meshRef} args={[1.2, 1]}>
        <meshStandardMaterial
          color="#4A90D9"
          emissive="#1a3a5c"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.4}
        />
      </Icosahedron>
    </Float>
  );
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    lightRef.current.position.x = state.pointer.x * 5;
    lightRef.current.position.y = state.pointer.y * 3;
  });

  return (
    <pointLight
      ref={lightRef}
      color="#C9A84C"
      intensity={2}
      distance={15}
      position={[0, 0, 3]}
    />
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} color="#4A90D9" />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#C9A84C" />
        <MouseLight />
        <Particles count={300} />
        <CentralGeometry />
      </Canvas>
    </div>
  );
}
