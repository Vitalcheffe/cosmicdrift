'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Node Component ─── */
function HubNode({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.08);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.6 + Math.sin(clock.elapsedTime * 1.5 + position[2]) * 0.15);
    }
  });

  return (
    <group position={position}>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/* ─── Connection Line — use primitive to avoid JSX line/SVG conflict ─── */
function ConnectionLine({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const objRef = useRef<THREE.Line | null>(null);

  const lineObj = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      pts.push(
        new THREE.Vector3(
          start[0] + (end[0] - start[0]) * t,
          start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 0.15,
          start[2] + (end[2] - start[2]) * t
        )
      );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(pts);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 });
    return new THREE.Line(geometry, material);
  }, [start, end, color]);

  return <primitive ref={objRef} object={lineObj} />;
}

/* ─── Flowing Particle ─── */
function FlowingParticle({ start, end, color, speed = 0.3 }: { start: [number, number, number]; end: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = ((clock.elapsedTime * speed + offset) % 1);
    const x = start[0] + (end[0] - start[0]) * t;
    const y = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 0.15;
    const z = start[2] + (end[2] - start[2]) * t;
    meshRef.current.position.set(x, y, z);
    meshRef.current.scale.setScalar(0.5 + Math.sin(t * Math.PI) * 0.5);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

/* ─── Scene ─── */
function GPUMeshScene() {
  // Pentagon layout for 5 hubs
  const hubs = useMemo(() => {
    const nodes: [number, number, number][] = [];
    const colors = ['#F59E0B', '#38BDF8', '#FBBF24', '#67E8F9', '#94A3B8'];
    const radius = 2.2;
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      nodes.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]);
    }
    return { nodes, colors };
  }, []);

  // Create connections (each node to its neighbors + cross connections)
  const connections = useMemo(() => {
    const conns: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    for (let i = 0; i < 5; i++) {
      conns.push({
        start: hubs.nodes[i],
        end: hubs.nodes[(i + 1) % 5],
        color: hubs.colors[i],
      });
    }
    // Cross connections
    conns.push({ start: hubs.nodes[0], end: hubs.nodes[2], color: '#8B9DAF' });
    conns.push({ start: hubs.nodes[1], end: hubs.nodes[3], color: '#8B9DAF' });
    return conns;
  }, [hubs]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {hubs.nodes.map((pos, i) => (
        <HubNode key={i} position={pos} color={hubs.colors[i]} />
      ))}
      {connections.map((conn, i) => (
        <ConnectionLine key={i} start={conn.start} end={conn.end} color={conn.color} />
      ))}
      {connections.map((conn, i) => (
        <FlowingParticle key={`p1-${i}`} start={conn.start} end={conn.end} color={conn.color} speed={0.2 + i * 0.03} />
      ))}
      {connections.map((conn, i) => (
        <FlowingParticle key={`p2-${i}`} start={conn.end} end={conn.start} color={conn.color} speed={0.15 + i * 0.02} />
      ))}
    </group>
  );
}

/* ─── Canvas Wrapper ─── */
function GPUMeshCanvasInner() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <GPUMeshScene />
      </Suspense>
    </Canvas>
  );
}

/* ─── Main Export with SSR Guard ─── */
export default function GPUMeshCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B9DAF]/5 via-transparent to-[#34D399]/5" />
        }
      >
        <GPUMeshCanvasInner />
      </Suspense>
    </div>
  );
}
