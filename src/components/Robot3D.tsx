import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════ Helpers ═══════════════════ */

function dampLerp(a: number, b: number, s: number, dt: number) {
  return a + (b - a) * (1 - Math.exp(-s * dt));
}

/* ═══════════════════ Mouse ════════════════════ */

const mouse = { x: 0, y: 0, sx: 0, sy: 0 };

function MouseTracker() {
  const { viewport } = useThree();
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = ((e.clientX / window.innerWidth) * 2 - 1) * viewport.width * 0.5;
      mouse.y = (-(e.clientY / window.innerHeight) * 2 + 1) * viewport.height * 0.5;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = ((e.touches[0].clientX / window.innerWidth) * 2 - 1) * viewport.width * 0.5;
        mouse.y = (-(e.touches[0].clientY / window.innerHeight) * 2 + 1) * viewport.height * 0.5;
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onTouch); };
  }, [viewport]);
  useFrame((_, dt) => {
    mouse.sx = dampLerp(mouse.sx, mouse.x, 5, dt);
    mouse.sy = dampLerp(mouse.sy, mouse.y, 5, dt);
  });
  return null;
}

/* ═══════════════════ Flat Eye ═════════════════ */

function FlatEye({ position }: { position: [number, number, number] }) {
  const pupilRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const [blink, setBlink] = useState(false);
  const lidRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const go = () => {
      t = setTimeout(() => { setBlink(true); setTimeout(() => setBlink(false), 110); go(); }, 3000 + Math.random() * 2500);
    };
    go();
    return () => clearTimeout(t);
  }, []);

  useFrame((_, dt) => {
    if (pupilRef.current) {
      const tx = THREE.MathUtils.clamp(mouse.sx * 0.035, -0.04, 0.04);
      const ty = THREE.MathUtils.clamp(mouse.sy * 0.035, -0.03, 0.03);
      pupilRef.current.position.x = dampLerp(pupilRef.current.position.x, tx, 4, dt);
      pupilRef.current.position.y = dampLerp(pupilRef.current.position.y, ty, 4, dt);
    }
    if (lidRef.current) {
      lidRef.current.scale.y = dampLerp(lidRef.current.scale.y, blink ? 1 : 0, 24, dt);
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.6 + Math.sin(Date.now() * 0.0015) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Outer glow — soft halo */}
      <mesh ref={glowRef} position={[0, 0, -0.005]}>
        <circleGeometry args={[0.17, 64]} />
        <meshStandardMaterial
          color="#C4B5FD"
          emissive="#A855F7"
          emissiveIntensity={0.7}
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>

      {/* Eye white — flat circle, embedded in head */}
      <mesh>
        <circleGeometry args={[0.13, 64]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#F5F3FF" emissiveIntensity={0.4} toneMapped={false} />
      </mesh>

      {/* Pupil group — follows cursor */}
      <group ref={pupilRef}>
        {/* Dark pupil */}
        <mesh position={[0, 0, 0.003]}>
          <circleGeometry args={[0.07, 64]} />
          <meshStandardMaterial color="#1E1030" />
        </mesh>
        {/* Iris ring */}
        <mesh position={[0, 0, 0.002]}>
          <ringGeometry args={[0.068, 0.075, 64]} />
          <meshStandardMaterial color="#7C3AED" emissive="#A855F7" emissiveIntensity={0.5} toneMapped={false} />
        </mesh>
        {/* Big sparkle */}
        <mesh position={[0.028, 0.028, 0.005]}>
          <circleGeometry args={[0.024, 16]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2.5} toneMapped={false} />
        </mesh>
        {/* Small sparkle */}
        <mesh position={[-0.018, -0.018, 0.005]}>
          <circleGeometry args={[0.012, 12]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1.5} toneMapped={false} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Eyelid — circular disk that slides down on blink */}
      <mesh ref={lidRef} position={[0, 0.13, 0.009]} scale={[1, 0, 1]}>
        <circleGeometry args={[0.13, 64]} />
        <meshStandardMaterial color="#2D1B4E" />
      </mesh>
    </group>
  );
}

/* ═══════════════════ Antenna ═════════════════ */

function Antenna({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const tipRef = useRef<THREE.Mesh>(null!);
  const t = useRef(delay);
  useFrame((_, dt) => {
    t.current += dt;
    if (tipRef.current) tipRef.current.position.y = 0.18 + Math.sin(t.current * 2.5) * 0.025;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.012, 0.018, 0.16, 8]} />
        <meshStandardMaterial color="#7C3AED" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh ref={tipRef} position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#E9D5FF" emissive="#A855F7" emissiveIntensity={0.35} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ═══════════════════ Smile ═══════════════════ */

function Smile() {
  const obj = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.07, 0, 0),
      new THREE.Vector3(0, -0.04, 0),
      new THREE.Vector3(0.07, 0, 0)
    );
    const geom = new THREE.TubeGeometry(curve, 20, 0.008, 8, false);
    const mat = new THREE.MeshStandardMaterial({ color: '#E9D5FF', emissive: '#A855F7', emissiveIntensity: 0.35, toneMapped: false });
    return new THREE.Mesh(geom, mat);
  }, []);
  return <group position={[0, -0.15, 0.475]}><primitive object={obj} /></group>;
}

/* ═══════════════════ Robot ═══════════════════ */

function CuteBot() {
  const headRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);

  useFrame((_, dt) => {
    if (headRef.current) {
      const tY = THREE.MathUtils.clamp(mouse.sx * 0.1, -0.22, 0.22);
      const tX = THREE.MathUtils.clamp(-mouse.sy * 0.06, -0.12, 0.12);
      headRef.current.rotation.y = dampLerp(headRef.current.rotation.y, tY, 3, dt);
      headRef.current.rotation.x = dampLerp(headRef.current.rotation.x, tX, 3, dt);
      headRef.current.rotation.z = dampLerp(headRef.current.rotation.z, -tY * 0.08, 2, dt);
    }
    if (bodyRef.current) {
      bodyRef.current.rotation.y = dampLerp(bodyRef.current.rotation.y, THREE.MathUtils.clamp(mouse.sx * 0.02, -0.04, 0.04), 1.5, dt);
    }
  });

  const bodyColor = '#4C1D95';
  const headColor = '#3B0764';
  const accentColor = '#6D28D9';

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.45} floatingRange={[-0.06, 0.06]}>
      <group scale={1.55}>

        {/* ═══ BODY ═══ */}
        <group ref={bodyRef} position={[0, -0.6, 0]}>
          {/* Torso — rounded capsule */}
          <mesh>
            <capsuleGeometry args={[0.2, 0.18, 16, 32]} />
            <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.25} />
          </mesh>

          {/* Chest light */}
          <mesh position={[0, 0.02, 0.201]}>
            <circleGeometry args={[0.04, 16]} />
            <meshStandardMaterial color="#E9D5FF" emissive="#A855F7" emissiveIntensity={0.5} toneMapped={false} />
          </mesh>
          {/* Chest ring */}
          <mesh position={[0, 0.02, 0.2]}>
            <ringGeometry args={[0.045, 0.055, 24]} />
            <meshStandardMaterial color="#7C3AED" emissive="#A855F7" emissiveIntensity={0.2} toneMapped={false} transparent opacity={0.6} />
          </mesh>

          {/* Neck */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.09, 0.1, 0.06, 16]} />
            <meshStandardMaterial color={accentColor} metalness={0.6} roughness={0.2} />
          </mesh>

          {/* Arms */}
          {([-1, 1] as const).map((s) => (
            <group key={s} position={[s * 0.26, 0.04, 0]}>
              <mesh>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.25} />
              </mesh>
              <mesh position={[s * 0.02, -0.12, 0]} rotation={[0.1, 0, s * 0.2]}>
                <capsuleGeometry args={[0.035, 0.1, 8, 16]} />
                <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.25} />
              </mesh>
              <mesh position={[s * 0.04, -0.2, 0.01]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshStandardMaterial color={accentColor} metalness={0.4} roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>

        {/* ═══ HEAD ═══ */}
        <group ref={headRef} position={[0, 0.08, 0]}>
          {/* Main head — big sphere */}
          <mesh>
            <sphereGeometry args={[0.48, 32, 32]} />
            <meshStandardMaterial color={headColor} metalness={0.45} roughness={0.22} />
          </mesh>



          {/* Eyes — flat, glowing, on the visor */}
          <FlatEye position={[-0.12, 0.05, 0.46]} />
          <FlatEye position={[0.12, 0.05, 0.46]} />

          {/* Smile — on visor */}
          <Smile />

          {/* Antennas */}
          <Antenna position={[-0.1, 0.44, 0]} delay={0} />
          <Antenna position={[0.1, 0.44, 0]} delay={1.2} />

          {/* Ears — small cylindrical */}
          {([-1, 1] as const).map((s) => (
            <group key={`ear-${s}`} position={[s * 0.48, 0, 0]}>
              <mesh rotation={[0, 0, s * Math.PI / 2]}>
                <cylinderGeometry args={[0.04, 0.04, 0.06, 12]} />
                <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.25} />
              </mesh>
            </group>
          ))}

          {/* Top highlight strip */}
          <mesh position={[0, 0.32, 0.3]}>
            <circleGeometry args={[0.03, 12]} />
            <meshStandardMaterial color="#E9D5FF" emissive="#A855F7" emissiveIntensity={0.3} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/* ═══════════════════ Particles ═══════════════ */

function Particles() {
  const count = 18;
  const ref = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => Array.from({ length: count }, () => ({
    p: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, -1.5 + (Math.random() - 0.5) * 2],
    s: 0.1 + Math.random() * 0.3,
    o: Math.random() * Math.PI * 2,
    sz: 0.004 + Math.random() * 0.006,
  })), []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const d = data[i];
      dummy.position.set(d.p[0] + Math.sin(t * d.s + d.o) * 0.2, d.p[1] + Math.cos(t * d.s * 0.7 + d.o) * 0.25, d.p[2]);
      dummy.scale.setScalar(d.sz + Math.sin(t * d.s + d.o) * d.sz * 0.3);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#C4B5FD" emissive="#A855F7" emissiveIntensity={0.5} toneMapped={false} transparent opacity={0.3} />
    </instancedMesh>
  );
}

/* ═══════════════════ Export ═══════════════════ */

export default function Robot3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 320, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 24, background: 'radial-gradient(ellipse at 50% 45%, rgba(168,85,247,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        style={{ background: 'transparent' }}
      >
        <MouseTracker />
        <ambientLight intensity={0.5} color="#F5F3FF" />
        <directionalLight position={[-2, 4, 5]} intensity={1.1} color="#FEFCE8" />
        <directionalLight position={[3, 1, 3]} intensity={0.4} color="#EDE9FE" />
        <pointLight position={[0, 0, 4]} intensity={0.3} color="#DDD6FE" distance={8} decay={2} />
        <CuteBot />
        <ContactShadows position={[0, -1.85, 0]} opacity={0.15} scale={3} blur={3} far={4} color="#4C1D95" />
        <Particles />
      </Canvas>
    </div>
  );
}
