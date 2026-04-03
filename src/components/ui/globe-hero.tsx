"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Sphere } from "@react-three/drei";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface DotGlobeHeroProps {
  rotationSpeed?: number;
  globeRadius?: number;
  className?: string;
  children?: React.ReactNode;
}

const Globe: React.FC<{
  rotationSpeed: number;
  radius: number;
}> = ({ rotationSpeed, radius }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x += rotationSpeed * 0.3;
      groupRef.current.rotation.z += rotationSpeed * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          color="#7B2FF7"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </group>
  );
};



const DotGlobeHero = React.forwardRef<
  HTMLDivElement,
  DotGlobeHeroProps
>(({
  rotationSpeed = 0.005,
  globeRadius = 1.3,
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center",
        className
      )}
      {...props}
    >
      {/* Background gradients removed to allow custom background integration */}
      
      
      {/* Globe Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={75} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <Globe
            rotationSpeed={rotationSpeed}
            radius={globeRadius}
          />
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-[37px] flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
});

DotGlobeHero.displayName = "DotGlobeHero";

export { DotGlobeHero, type DotGlobeHeroProps };
