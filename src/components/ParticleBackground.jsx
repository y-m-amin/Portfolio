import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Generate particle data outside component to avoid re-creation
const generateParticleData = () => {
  const particleCount = 800;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    velocities[i * 3] = (Math.random() - 0.5) * 0.015;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
  }

  return { positions, velocities, count: particleCount };
};

const particleData = generateParticleData();

const Particles = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleData.count; i++) {
        const i3 = i * 3;

        // Update positions with velocities
        positions[i3] += particleData.velocities[i3];
        positions[i3 + 1] += particleData.velocities[i3 + 1];
        positions[i3 + 2] += particleData.velocities[i3 + 2];

        // Wrap around boundaries
        if (positions[i3] > 10) positions[i3] = -10;
        if (positions[i3] < -10) positions[i3] = 10;
        if (positions[i3 + 1] > 10) positions[i3 + 1] = -10;
        if (positions[i3 + 1] < -10) positions[i3 + 1] = 10;
        if (positions[i3 + 2] > 10) positions[i3 + 2] = -10;
        if (positions[i3 + 2] < -10) positions[i3 + 2] = 10;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;

      // Slow rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          count={particleData.count}
          array={particleData.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color='#3b82f6'
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const ParticleBackground = () => {
  return (
    <div className='absolute inset-0 w-full h-full'>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#020617', 0);
        }}
      >
        <Particles />
        <ambientLight intensity={0.3} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
