import { useRef, useMemo, forwardRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Icosahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// ──────── Animated Gold Sphere ────────
function GoldSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={groupRef} position={position} scale={scale}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#c9a84c"
            metalness={0.95}
            roughness={0.05}
            distort={0.25}
            speed={1.5}
          />
        </Sphere>
      </group>
    </Float>
  );
}

// ──────── Glass Icosahedron ────────
function GlassIcosahedron({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.8}>
      <group ref={groupRef} position={position} scale={scale}>
        <Icosahedron args={[1, 1]}>
          <meshPhysicalMaterial
            color="#0d6b4f"
            metalness={0.15}
            roughness={0}
            transparent
            opacity={0.45}
            transmission={0.85}
            thickness={0.8}
            ior={2.4}
          />
        </Icosahedron>
      </group>
    </Float>
  );
}

// ──────── Glass Box ────────
function GlassBox({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
      <group ref={groupRef} position={position} scale={scale}>
        <Box args={[1, 1, 1]}>
          <meshPhysicalMaterial
            color="#0d4a3a"
            metalness={0.1}
            roughness={0}
            transparent
            opacity={0.5}
            transmission={0.8}
            thickness={0.5}
          />
        </Box>
      </group>
    </Float>
  );
}

// ──────── Gold Ring ────────
function GoldRing({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={1}>
      <group ref={groupRef} position={position} scale={scale}>
        <Torus args={[1, 0.12, 32, 64]}>
          <meshStandardMaterial
            color="#d4a843"
            metalness={0.95}
            roughness={0.05}
            emissive="#8b7025"
            emissiveIntensity={0.2}
          />
        </Torus>
      </group>
    </Float>
  );
}

// ──────── Floating Octahedron ────────
function FloatingOctahedron({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={groupRef} position={position} scale={scale}>
        <Octahedron args={[1]}>
          <meshStandardMaterial
            color="#c9a84c"
            metalness={0.9}
            roughness={0.1}
            emissive="#8b7025"
            emissiveIntensity={0.1}
            wireframe
          />
        </Octahedron>
      </group>
    </Float>
  );
}

// ──────── Particle Field ────────
function Particles() {
  const count = 350;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 25;
      pos[i + 1] = (Math.random() - 0.5) * 25;
      pos[i + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#c9a84c"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// ──────── Camera Rig ────────
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.05) * 0.3;
    camera.position.y = Math.cos(t * 0.08) * 0.15;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ──────── Main Scene ────────
export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <CameraRig />
        
        {/* Volumetric Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#c9a84c" />
        <directionalLight position={[-6, -4, -5]} intensity={0.25} color="#0d6b4f" />
        <pointLight position={[0, 4, 4]} intensity={0.9} color="#d4a843" distance={15} decay={2} />
        <pointLight position={[-4, -2, 3]} intensity={0.4} color="#0d6b4f" distance={12} decay={2} />
        <spotLight position={[3, 6, 5]} angle={0.3} penumbra={0.8} intensity={0.6} color="#c9a84c" />

        {/* Primary Objects */}
        <GoldSphere position={[-4.5, 2.5, -3]} scale={0.55} />
        <GoldSphere position={[5, -2, -4]} scale={0.35} />
        <GlassIcosahedron position={[3.5, 3, -2]} scale={0.7} />
        <GlassIcosahedron position={[-2.5, -2.5, -3]} scale={0.5} />
        <GlassBox position={[-5, 0.5, -2]} scale={0.55} />
        <GoldRing position={[0, 3.5, -5]} scale={1.3} />
        <GoldRing position={[-5.5, -1, -4]} scale={0.6} />
        <GoldRing position={[5.5, 1.5, -3]} scale={0.45} />
        <FloatingOctahedron position={[2, -3, -2]} scale={0.6} />
        <FloatingOctahedron position={[-3, 3.5, -5]} scale={0.8} />

        <Particles />
      </Canvas>
    </div>
  );
}
