'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    velocitiesRef.current = vel;
    return pos;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const posAttr = mesh.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const velocities = velocitiesRef.current;
    if (!velocities) return;
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(posArray[i * 3]) > 14) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 8) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 6) velocities[i * 3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#FFFFFF" transparent opacity={0.15} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function OuterSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.003;
    const mx = state.pointer.x * 0.12;
    const my = state.pointer.y * 0.12;
    meshRef.current.rotation.x += my * 0.006;
    meshRef.current.rotation.y += mx * 0.006;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <Icosahedron ref={meshRef} args={[2.0, 1]}>
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.02} wireframe transparent opacity={0.04} />
      </Icosahedron>
    </Float>
  );
}

function InnerSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x -= 0.002;
    meshRef.current.rotation.y -= 0.004;
    const mx = state.pointer.x * 0.08;
    const my = state.pointer.y * 0.08;
    meshRef.current.rotation.x -= my * 0.004;
    meshRef.current.rotation.y -= mx * 0.004;
  });

  return (
    <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.25}>
      <Icosahedron ref={meshRef} args={[1.2, 2]}>
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.08} wireframe transparent opacity={0.06} />
      </Icosahedron>
    </Float>
  );
}

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.006;
    meshRef.current.rotation.z += 0.002;
  });

  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.15}>
      <Icosahedron ref={meshRef} args={[0.5, 0]}>
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.2} wireframe transparent opacity={0.2} />
      </Icosahedron>
    </Float>
  );
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!lightRef.current) return;
    lightRef.current.position.x = state.pointer.x * 4;
    lightRef.current.position.y = state.pointer.y * 3;
  });
  return <pointLight ref={lightRef} color="#C9A84C" intensity={0.8} distance={18} position={[0, 0, 4]} />;
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} color="#FFFFFF" />
        <directionalLight position={[3, 3, 5]} intensity={0.1} color="#FFFFFF" />
        <MouseLight />
        <Particles count={500} />
        <OuterSphere />
        <InnerSphere />
        <CoreSphere />
      </Canvas>
    </div>
  );
}
