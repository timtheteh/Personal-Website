"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Component to load and display the GLTF model
function PlanetModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/assets/stylized_planet/scene.gltf');

  // Auto-rotate the model around the Y-axis (vertical axis)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Slow rotation speed (0.2 radians per second)
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={1} 
      position={[0, 0, 0]}
    />
  );
}

export default function Planet3D() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only render Canvas after component is mounted on client
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] tablet:h-[500px] desktop:h-[600px] relative flex items-center justify-center">
        <div className="text-foreground/50">Loading 3D model...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] tablet:h-[500px] desktop:h-[600px] relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          preserveDrawingBuffer: false,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
        style={{ background: 'transparent' }}
        onCreated={(state) => {
          // Handle WebGL context creation
          if (!state.gl.getContext()) {
            console.error('WebGL context creation failed');
          }
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <pointLight position={[0, 10, 0]} intensity={0.8} />
        
        {/* 3D Model */}
        <PlanetModel />
        
        {/* Optional: OrbitControls for user interaction (can be disabled) */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={false} // We're handling rotation manually
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

