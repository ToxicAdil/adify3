"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const Globe: React.FC<{ rotationSpeed: number; radius: number; paused: boolean }> = ({ rotationSpeed, radius, paused }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const segments = isMobile ? 32 : 64;

  useFrame(() => {
    if (groupRef.current && !paused) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x += rotationSpeed * 0.3;
      groupRef.current.rotation.z += rotationSpeed * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.25} wireframe />
      </mesh>
    </group>
  );
};

export const ThreeGlobeInner: React.FC<{ radius: number; speed: number }> = ({ radius, speed }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '100px 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        frameloop={isVisible ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={75} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Globe rotationSpeed={speed} radius={radius} paused={!isVisible} />
      </Canvas>
    </div>
  );
};
