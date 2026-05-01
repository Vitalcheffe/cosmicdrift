'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 400 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
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

      if (Math.abs(posArray[i * 3]) > 12) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 7) velocities[i * 3 + 1] *= -1;
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
        size={0.035}
        color="#101820"
        transparent
        opacity={0.2}
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
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.004;
    const mx = state.pointer.x * 0.15;
    const my = state.pointer.y * 0.15;
    meshRef.current.rotation.x += my * 0.008;
    meshRef.current.rotation.y += mx * 0.008;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <Icosahedron ref={meshRef} args={[1.5, 1]}>
        <meshStandardMaterial
          color="#101820"
          emissive="#101820"
          emissiveIntensity={0.05}
          wireframe
          transparent
          opacity={0.12}
        />
      </Icosahedron>
    </Float>
  );
}

function InnerGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x -= 0.001;
    meshRef.current.rotation.y -= 0.003;
    const mx = state.pointer.x * 0.1;
    const my = state.pointer.y * 0.1;
    meshRef.current.rotation.x -= my * 0.005;
    meshRef.current.rotation.y -= mx * 0.005;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <Icosahedron ref={meshRef} args={[0.8, 2]}>
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.1}
          wireframe
          transparent
          opacity={0.08}
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
      intensity={0.8}
      distance={20}
      position={[0, 0, 4]}
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
        <ambientLight intensity={0.6} color="#FFFFFF" />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#FFFFFF" />
        <MouseLight />
        <Particles count={400} />
        <CentralGeometry />
        <InnerGeometry />
      </Canvas>
    </div>
  );
}
