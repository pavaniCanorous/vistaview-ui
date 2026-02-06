import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GoldSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color="#c9a84c"
          metalness={0.9}
          roughness={0.1}
          distort={0.3}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

function GlassBox({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale}>
        <meshPhysicalMaterial
          color="#0d4a3a"
          metalness={0.1}
          roughness={0}
          transparent
          opacity={0.6}
          transmission={0.8}
          thickness={0.5}
        />
      </Box>
    </Float>
  );
}

function GoldRing({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={1}>
      <Torus ref={meshRef} args={[1, 0.15, 32, 64]} position={position} scale={scale}>
        <meshStandardMaterial
          color="#d4a843"
          metalness={0.95}
          roughness={0.05}
          emissive="#8b7025"
          emissiveIntensity={0.15}
        />
      </Torus>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#c9a84c"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#c9a84c" />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#0d4a3a" />
        <pointLight position={[0, 3, 3]} intensity={0.8} color="#d4a843" />
        
        <GoldSphere position={[-4, 2, -2]} scale={0.6} />
        <GoldSphere position={[4.5, -1.5, -3]} scale={0.4} />
        <GlassBox position={[3, 2.5, -1]} scale={0.8} />
        <GlassBox position={[-3.5, -2, -2]} scale={0.6} />
        <GoldRing position={[0, 3, -4]} scale={1.2} />
        <GoldRing position={[-5, 0, -3]} scale={0.7} />
        <GoldRing position={[5, 1, -2]} scale={0.5} />
        
        <Particles />
      </Canvas>
    </div>
  );
}
