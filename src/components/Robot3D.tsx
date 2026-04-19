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
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [viewport]);
  useFrame((_, dt) => {
    mouse.sx = dampLerp(mouse.sx, mouse.x, 5, dt);
    mouse.sy = dampLerp(mouse.sy, mouse.y, 5, dt);
  });
  return null;
}

/* ═══════════════════ Eye ══════════════════════ */

function Eye({ position }: { position: [number, number, number] }) {
  const pupilRef  = useRef<THREE.Group>(null!);
  const outerRef  = useRef<THREE.Mesh>(null!);
  const [blink, setBlink] = useState(false);
  const lidRef    = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const go = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 110);
        go();
      }, 3000 + Math.random() * 2500);
    };
    go();
    return () => clearTimeout(t);
  }, []);

  useFrame((_, dt) => {
    // Cursor tracking
    if (pupilRef.current) {
      const tx = THREE.MathUtils.clamp(mouse.sx * 0.025, -0.03, 0.03);
      const ty = THREE.MathUtils.clamp(mouse.sy * 0.025, -0.02, 0.02);
      pupilRef.current.position.x = dampLerp(pupilRef.current.position.x, tx, 4, dt);
      pupilRef.current.position.y = dampLerp(pupilRef.current.position.y, ty, 4, dt);
    }
    // Pulsing glow
    if (outerRef.current) {
      const mat = outerRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.6 + Math.sin(Date.now() * 0.002) * 0.3;
    }
    // Blink
    if (lidRef.current) {
      lidRef.current.scale.y = dampLerp(lidRef.current.scale.y, blink ? 1 : 0.0001, 24, dt);
    }
  });

  return (
    <group position={position}>
      {/* Outer glow halo */}
      <mesh position={[0, 0, -0.01]}>
        <sphereGeometry args={[0.098, 24, 24]} />
        <meshStandardMaterial
          color="#9333EA"
          emissive="#A855F7"
          emissiveIntensity={0.4}
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>

      {/* Main glowing eye sphere */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.073, 32, 32]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#C084FC"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>

      {/* Pupil group — cursor tracking */}
      <group ref={pupilRef}>
        <mesh position={[0, 0, 0.062]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#0A0518" />
        </mesh>
        {/* Sparkle highlight */}
        <mesh position={[0.024, 0.024, 0.076]}>
          <sphereGeometry args={[0.013, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={5} toneMapped={false} />
        </mesh>
      </group>

      {/* Blink lid — circular, slides down */}
      <mesh ref={lidRef} position={[0, 0.073, 0.05]} scale={[1, 0.0001, 1]}>
        <circleGeometry args={[0.073, 32]} />
        <meshStandardMaterial color="#0C0820" />
      </mesh>
    </group>
  );
}

/* ═══════════════════ Shared Speaking State ═════════════════════ */

const robotState = { isSpeaking: false };

/* ═══════════════════ Mouth (lip‑sync) ════════════════════════ */

function Mouth() {
  const gapRef  = useRef<THREE.Mesh>(null!);
  const openAmt = useRef(0);

  useEffect(() => {
    const handler = (e: Event) => {
      robotState.isSpeaking = (e as CustomEvent<{ active: boolean }>).detail.active;
    };
    window.addEventListener('robot-speaking', handler);
    return () => window.removeEventListener('robot-speaking', handler);
  }, []);

  useFrame((_, dt) => {
    const target = robotState.isSpeaking
      ? 0.1 + 0.7 * Math.abs(Math.sin(Date.now() * 0.007))
      : 0;
    openAmt.current = dampLerp(openAmt.current, target, 14, dt);
    if (gapRef.current) {
      gapRef.current.scale.y = Math.max(0.0001, openAmt.current);
    }
  });

  const upperLip = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.09, 0, 0),
      new THREE.Vector3(0, -0.042, 0),
      new THREE.Vector3(0.09, 0, 0),
    );
    const geom = new THREE.TubeGeometry(curve, 28, 0.012, 10, false);
    const mat  = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      emissive: '#FFFFFF',
      emissiveIntensity: 0.35,
      toneMapped: false,
    });
    return new THREE.Mesh(geom, mat);
  }, []);

  return (
    <group position={[0, -0.19, 0.44]}>
      <primitive object={upperLip} />
      {/* Mouth gap — wide ellipse that opens when speaking */}
      <mesh ref={gapRef} position={[0, -0.026, 0.004]} scale={[1.85, 0.0001, 1]}>
        <circleGeometry args={[0.046, 32]} />
        <meshStandardMaterial color="#080416" />
      </mesh>
    </group>
  );
}

/* ═══════════════════ Robot ═══════════════════ */

function CuteBot() {
  const headRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);
  const waveRef = useRef<THREE.Group>(null!);

  useFrame((_, dt) => {
    if (headRef.current) {
      const tY = THREE.MathUtils.clamp(mouse.sx * 0.09, -0.2, 0.2);
      const tX = THREE.MathUtils.clamp(-mouse.sy * 0.055, -0.12, 0.12);
      headRef.current.rotation.y = dampLerp(headRef.current.rotation.y, tY, 3, dt);
      headRef.current.rotation.x = dampLerp(headRef.current.rotation.x, tX, 3, dt);
      headRef.current.rotation.z = dampLerp(headRef.current.rotation.z, -tY * 0.06, 2, dt);
    }
    if (bodyRef.current) {
      bodyRef.current.rotation.y = dampLerp(
        bodyRef.current.rotation.y,
        THREE.MathUtils.clamp(mouse.sx * 0.015, -0.04, 0.04),
        1.5, dt,
      );
    }
    // Waving arm animation
    if (waveRef.current) {
      waveRef.current.rotation.z = -0.55 + Math.sin(Date.now() * 0.0028) * 0.22;
    }
  });

  /* Shared white material props */
  const whiteMat = { color: '#EDECF8', metalness: 0.12, roughness: 0.07 } as const;
  const visorColor = '#0B0719';

  return (
    <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.4} floatingRange={[-0.05, 0.05]}>
      <group scale={1.45}>

        {/* ══════════════════ BODY ══════════════════ */}
        <group ref={bodyRef} position={[0, -0.66, 0]}>

          {/* Main torso — white egg / capsule */}
          <mesh>
            <capsuleGeometry args={[0.21, 0.13, 16, 32]} />
            <meshStandardMaterial {...whiteMat} />
          </mesh>

          {/* Right arm — waving */}
          <group ref={waveRef} position={[0.27, 0.06, 0.02]}>
            {/* Shoulder */}
            <mesh>
              <sphereGeometry args={[0.056, 16, 16]} />
              <meshStandardMaterial {...whiteMat} />
            </mesh>
            {/* Upper arm */}
            <mesh position={[0.09, 0.12, 0]} rotation={[0, 0, -1.0]}>
              <capsuleGeometry args={[0.046, 0.14, 8, 16]} />
              <meshStandardMaterial {...whiteMat} />
            </mesh>
            {/* Hand blob */}
            <mesh position={[0.17, 0.24, 0]}>
              <sphereGeometry args={[0.065, 20, 20]} />
              <meshStandardMaterial {...whiteMat} />
            </mesh>
          </group>

          {/* Left arm — relaxed, slightly out */}
          <group position={[-0.27, -0.03, 0.01]} rotation={[0.1, 0, 0.25]}>
            {/* Shoulder */}
            <mesh>
              <sphereGeometry args={[0.054, 16, 16]} />
              <meshStandardMaterial {...whiteMat} />
            </mesh>
            {/* Lower arm */}
            <mesh position={[-0.06, -0.13, 0]} rotation={[0, 0, 0.25]}>
              <capsuleGeometry args={[0.044, 0.11, 8, 16]} />
              <meshStandardMaterial {...whiteMat} />
            </mesh>
            {/* Hand blob */}
            <mesh position={[-0.1, -0.24, 0]}>
              <sphereGeometry args={[0.06, 20, 20]} />
              <meshStandardMaterial {...whiteMat} />
            </mesh>
          </group>
        </group>

        {/* ══════════════════ HEAD ══════════════════ */}
        <group ref={headRef} position={[0, 0.1, 0]}>

          {/* Main head — white glossy rounded dome */}
          <mesh scale={[1, 1.07, 0.94]}>
            <sphereGeometry args={[0.48, 64, 64]} />
            <meshStandardMaterial {...whiteMat} />
          </mesh>

          {/* Dark face visor — circular black screen area */}
          <mesh position={[0, -0.01, 0.438]}>
            <circleGeometry args={[0.305, 64]} />
            <meshStandardMaterial color={visorColor} metalness={0.6} roughness={0.1} />
          </mesh>

          {/* Eyes — 3D glowing purple spheres */}
          <Eye position={[-0.128, 0.08, 0.5]} />
          <Eye position={[ 0.128, 0.08, 0.5]} />

          {/* Mouth with lip‑sync */}
          <Mouth />

        </group>
      </group>
    </Float>
  );
}

/* ═══════════════════ Particles ═══════════════ */

function Particles() {
  const count = 14;
  const ref   = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data  = useMemo(() =>
    Array.from({ length: count }, () => ({
      p: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, -1.5 + (Math.random() - 0.5) * 2],
      s: 0.1 + Math.random() * 0.3,
      o: Math.random() * Math.PI * 2,
      sz: 0.004 + Math.random() * 0.005,
    })), []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const d = data[i];
      dummy.position.set(
        d.p[0] + Math.sin(t * d.s + d.o) * 0.18,
        d.p[1] + Math.cos(t * d.s * 0.7 + d.o) * 0.22,
        d.p[2],
      );
      dummy.scale.setScalar(d.sz + Math.sin(t * d.s + d.o) * d.sz * 0.3);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#C4B5FD" emissive="#A855F7" emissiveIntensity={0.5} toneMapped={false} transparent opacity={0.25} />
    </instancedMesh>
  );
}

/* ═══════════════════ Export ═══════════════════ */

export default function Robot3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 320, position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 24,
        background: 'radial-gradient(ellipse at 50% 45%, rgba(168,85,247,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true, alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        style={{ background: 'transparent' }}
      >
        <MouseTracker />
        {/* Warm key light from front-top — gives white body its glossy polish */}
        <ambientLight intensity={0.65} color="#F8F5FF" />
        <directionalLight position={[0, 4, 5]}   intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[-3, 2, 3]}  intensity={0.5} color="#EDE9FE" />
        <directionalLight position={[3, -1, 2]}  intensity={0.3} color="#F5F3FF" />
        {/* Purple rim light for the glow feel */}
        <pointLight position={[0, 1, 3]} intensity={0.6} color="#A855F7" distance={6} decay={2} />
        <CuteBot />
        <ContactShadows position={[0, -1.85, 0]} opacity={0.12} scale={3} blur={3} far={4} color="#6D28D9" />
        <Particles />
      </Canvas>
    </div>
  );
}
