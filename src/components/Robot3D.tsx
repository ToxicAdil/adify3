import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ───────────────────────── helpers ───────────────────────── */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ───────────────────────── Mouse tracker (shared state) ───── */

const mouseState = { x: 0, y: 0 };

function MouseTracker() {
  const { viewport } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseState.x = ((e.clientX / window.innerWidth) * 2 - 1) * viewport.width * 0.5;
      mouseState.y = (-(e.clientY / window.innerHeight) * 2 + 1) * viewport.height * 0.5;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseState.x = ((e.touches[0].clientX / window.innerWidth) * 2 - 1) * viewport.width * 0.5;
        mouseState.y = (-(e.touches[0].clientY / window.innerHeight) * 2 + 1) * viewport.height * 0.5;
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [viewport]);

  return null;
}

/* ───────────────────────── Eye component ──────────────────── */

function Eye({ position, baseColor }: { position: [number, number, number]; baseColor: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const pupilRef = useRef<THREE.Mesh>(null!);
  const lidRef = useRef<THREE.Mesh>(null!);
  const [blinkPhase, setBlinkPhase] = useState(0);

  // Blink timer
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 4000;
      timeout = setTimeout(() => {
        setBlinkPhase(1);
        setTimeout(() => setBlinkPhase(0), 150);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useFrame(() => {
    if (!pupilRef.current) return;
    // Pupil follows mouse
    const targetX = THREE.MathUtils.clamp(mouseState.x * 0.06, -0.08, 0.08);
    const targetY = THREE.MathUtils.clamp(mouseState.y * 0.06, -0.06, 0.06);
    pupilRef.current.position.x = lerp(pupilRef.current.position.x, targetX, 0.1);
    pupilRef.current.position.y = lerp(pupilRef.current.position.y, targetY, 0.1);

    // Blink: scale Y of lid
    if (lidRef.current) {
      const targetScale = blinkPhase === 1 ? 1 : 0;
      lidRef.current.scale.y = lerp(lidRef.current.scale.y, targetScale, 0.35);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Eye socket (slightly inset dark circle) */}
      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial color="#1a0a2e" />
      </mesh>
      {/* Eye white / glow */}
      <mesh>
        <circleGeometry args={[0.16, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#c4b5fd"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Pupil */}
      <mesh ref={pupilRef} position={[0, 0, 0.01]}>
        <circleGeometry args={[0.07, 32]} />
        <meshStandardMaterial color="#1E1B4B" emissive="#3A0F63" emissiveIntensity={0.3} />
      </mesh>
      {/* Inner pupil highlight */}
      <mesh position={[0.03, 0.03, 0.02]}>
        <circleGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      {/* Eyelid (blink) */}
      <mesh ref={lidRef} position={[0, 0.08, 0.03]} scale={[1, 0, 1]}>
        <planeGeometry args={[0.4, 0.35]} />
        <meshStandardMaterial color="#2d1054" />
      </mesh>
    </group>
  );
}

/* ───────────────────────── Antenna ────────────────────────── */

function Antenna({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const tipRef = useRef<THREE.Mesh>(null!);
  const time = useRef(delay);

  useFrame((_, dt) => {
    time.current += dt;
    if (tipRef.current) {
      tipRef.current.position.y = 0.18 + Math.sin(time.current * 3) * 0.03;
      const intensity = 0.5 + Math.sin(time.current * 2) * 0.4;
      (tipRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <group position={position}>
      {/* Stalk */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.015, 0.025, 0.16, 8]} />
        <meshStandardMaterial color="#4c1d95" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Tip (glowing orb) */}
      <mesh ref={tipRef} position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ───────────────────────── Ear panels ─────────────────────── */

function EarPanel({ position, side }: { position: [number, number, number]; side: 'left' | 'right' }) {
  const ref = useRef<THREE.Mesh>(null!);
  const time = useRef(0);

  useFrame((_, dt) => {
    time.current += dt;
    if (ref.current) {
      const glow = 0.3 + Math.sin(time.current * 1.5 + (side === 'left' ? 0 : Math.PI)) * 0.3;
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={[0, side === 'left' ? -0.3 : 0.3, 0]}>
      <boxGeometry args={[0.04, 0.22, 0.15]} />
      <meshStandardMaterial
        color="#4c1d95"
        emissive="#7c3aed"
        emissiveIntensity={0.3}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

/* ───────────────────────── Mouth ──────────────────────────── */

function Mouth() {
  const ref = useRef<THREE.Group>(null!);
  const time = useRef(0);

  // Create mouth shape
  const { dotPositions } = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.15, 0, 0),
      new THREE.Vector3(0, -0.06, 0),
      new THREE.Vector3(0.15, 0, 0)
    );
    // LED dots along the mouth
    const dots = curve.getPoints(5).map((p) => [p.x, p.y, 0.01] as [number, number, number]);
    return { dotPositions: dots };
  }, []);

  useFrame((_, dt) => {
    time.current += dt;
  });

  return (
    <group ref={ref} position={[0, -0.22, 0.42]}>
      {dotPositions.map((pos, i) => (
        <DotLED key={i} position={pos} delay={i * 0.15} />
      ))}
    </group>
  );
}

function DotLED({ position, delay }: { position: [number, number, number]; delay: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const time = useRef(delay);

  useFrame((_, dt) => {
    time.current += dt;
    if (ref.current) {
      const intensity = 0.4 + Math.sin(time.current * 2) * 0.4;
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial
        color="#c4b5fd"
        emissive="#a78bfa"
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ───────────────────────── Main Robot ─────────────────────── */

function RobotModel() {
  const headRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);
  const time = useRef(0);

  // Head tracks cursor with smooth lerp
  useFrame((_, dt) => {
    time.current += dt;

    if (headRef.current) {
      const targetRotY = THREE.MathUtils.clamp(mouseState.x * 0.15, -0.4, 0.4);
      const targetRotX = THREE.MathUtils.clamp(-mouseState.y * 0.1, -0.25, 0.25);

      headRef.current.rotation.y = lerp(headRef.current.rotation.y, targetRotY, 0.06);
      headRef.current.rotation.x = lerp(headRef.current.rotation.x, targetRotX, 0.06);
      // Subtle head tilt
      headRef.current.rotation.z = lerp(
        headRef.current.rotation.z,
        -targetRotY * 0.15,
        0.04
      );
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.1}
      floatIntensity={0.4}
      floatingRange={[-0.06, 0.06]}
    >
      <group scale={1.8}>
        {/* ─── BODY ─── */}
        <group ref={bodyRef} position={[0, -0.65, 0]}>
          {/* Torso */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.6, 0.5, 0.35]} />
            <meshStandardMaterial
              color="#2d1054"
              metalness={0.6}
              roughness={0.35}
            />
          </mesh>
          {/* Chest plate */}
          <mesh position={[0, 0.02, 0.176]}>
            <boxGeometry args={[0.42, 0.35, 0.01]} />
            <meshStandardMaterial
              color="#3A0F63"
              emissive="#7c3aed"
              emissiveIntensity={0.15}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Chest core light */}
          <mesh position={[0, 0.02, 0.185]}>
            <circleGeometry args={[0.06, 16]} />
            <meshStandardMaterial
              color="#a78bfa"
              emissive="#7c3aed"
              emissiveIntensity={1.2}
              toneMapped={false}
            />
          </mesh>
          {/* Chest arc reactor rings */}
          <mesh position={[0, 0.02, 0.186]}>
            <ringGeometry args={[0.07, 0.09, 24]} />
            <meshStandardMaterial
              color="#c4b5fd"
              emissive="#a78bfa"
              emissiveIntensity={0.6}
              toneMapped={false}
            />
          </mesh>

          {/* Neck connector */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 0.1, 12]} />
            <meshStandardMaterial color="#3A0F63" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Shoulder joints */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.38, 0.15, 0]}>
              <mesh>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#4c1d95" metalness={0.7} roughness={0.3} />
              </mesh>
              {/* Upper arm */}
              <mesh position={[side * 0.05, -0.18, 0]} rotation={[0, 0, side * 0.15]}>
                <capsuleGeometry args={[0.045, 0.2, 8, 16]} />
                <meshStandardMaterial color="#2d1054" metalness={0.5} roughness={0.4} />
              </mesh>
              {/* Forearm */}
              <mesh position={[side * 0.08, -0.42, 0.02]} rotation={[0.2, 0, side * 0.1]}>
                <capsuleGeometry args={[0.04, 0.18, 8, 16]} />
                <meshStandardMaterial color="#3A0F63" metalness={0.6} roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>

        {/* ─── HEAD ─── */}
        <group ref={headRef} position={[0, 0.05, 0]}>
          {/* Main head shell */}
          <mesh>
            <boxGeometry args={[0.7, 0.55, 0.5]} />
            <meshStandardMaterial
              color="#3A0F63"
              metalness={0.5}
              roughness={0.35}
            />
          </mesh>
          {/* Rounded top */}
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#3A0F63" metalness={0.5} roughness={0.35} />
          </mesh>

          {/* Face plate */}
          <mesh position={[0, -0.02, 0.251]}>
            <planeGeometry args={[0.58, 0.42]} />
            <meshStandardMaterial
              color="#1E1B4B"
              metalness={0.3}
              roughness={0.5}
            />
          </mesh>

          {/* Visor/screen bezel */}
          <mesh position={[0, 0.02, 0.245]}>
            <boxGeometry args={[0.62, 0.35, 0.02]} />
            <meshStandardMaterial
              color="#2d1054"
              metalness={0.8}
              roughness={0.15}
            />
          </mesh>

          {/* Eyes */}
          <Eye position={[-0.14, 0.04, 0.26]} baseColor="#7c3aed" />
          <Eye position={[0.14, 0.04, 0.26]} baseColor="#7c3aed" />

          {/* Mouth */}
          <Mouth />

          {/* Antennas */}
          <Antenna position={[-0.12, 0.32, 0]} delay={0} />
          <Antenna position={[0.12, 0.32, 0]} delay={1.5} />

          {/* Ear panels */}
          <EarPanel position={[-0.38, 0, 0]} side="left" />
          <EarPanel position={[0.38, 0, 0]} side="right" />

          {/* Forehead detail strip */}
          <mesh position={[0, 0.2, 0.252]}>
            <boxGeometry args={[0.3, 0.03, 0.01]} />
            <meshStandardMaterial
              color="#7c3aed"
              emissive="#7c3aed"
              emissiveIntensity={0.8}
              toneMapped={false}
            />
          </mesh>

          {/* Chin detail */}
          <mesh position={[0, -0.28, 0.2]}>
            <boxGeometry args={[0.25, 0.04, 0.12]} />
            <meshStandardMaterial color="#2d1054" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/* ───────────────────────── Particles ──────────────────────── */

function FloatingParticles() {
  const count = 30;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const speeds = useMemo(() => Array.from({ length: count }, () => 0.3 + Math.random() * 0.7), []);
  const offsets = useMemo(() => Array.from({ length: count }, () => Math.random() * Math.PI * 2), []);

  const positions = useMemo(() => {
    return Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 2 - 1,
    ]);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        positions[i][0] + Math.sin(t * speeds[i] + offsets[i]) * 0.3,
        positions[i][1] + Math.cos(t * speeds[i] * 0.7 + offsets[i]) * 0.4,
        positions[i][2]
      );
      const s = 0.01 + Math.sin(t * speeds[i] + offsets[i]) * 0.008;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#7c3aed"
        emissiveIntensity={1}
        toneMapped={false}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

/* ───────────────────────── Exported Component ─────────────── */

export default function Robot3D() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 320,
        position: 'relative',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <MouseTracker />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} color="#f0e6ff" />
        <directionalLight position={[-3, 2, 2]} intensity={0.4} color="#c4b5fd" />
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#a78bfa" />

        {/* Robot */}
        <RobotModel />

        {/* Ambient particles */}
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
