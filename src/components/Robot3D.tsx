import React, { useRef, useMemo, useEffect } from 'react';
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
  const pupilRef = useRef<THREE.Group>(null!);
  const glowRef  = useRef<THREE.Mesh>(null!);

  useFrame((_, dt) => {
    if (pupilRef.current) {
      const tx = THREE.MathUtils.clamp(mouse.sx * 0.022, -0.028, 0.028);
      const ty = THREE.MathUtils.clamp(mouse.sy * 0.022, -0.022, 0.022);
      pupilRef.current.position.x = dampLerp(pupilRef.current.position.x, tx, 4, dt);
      pupilRef.current.position.y = dampLerp(pupilRef.current.position.y, ty, 4, dt);
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.7 + Math.sin(Date.now() * 0.0019) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Outer soft glow halo */}
      <mesh>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial
          color="#9333EA"
          emissive="#A855F7"
          emissiveIntensity={0.5}
          transparent
          opacity={0.28}
          toneMapped={false}
        />
      </mesh>

      {/* Main glowing eye sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.075, 32, 32]} />
        <meshStandardMaterial
          color="#9333EA"
          emissive="#C084FC"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>

      {/* Pupil — tracks cursor */}
      <group ref={pupilRef}>
        <mesh position={[0, 0, 0.065]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#08041A" />
        </mesh>
        {/* Sparkle */}
        <mesh position={[0.025, 0.025, 0.08]}>
          <sphereGeometry args={[0.013, 8, 8]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} toneMapped={false} />
        </mesh>
      </group>

    </group>
  );
}

/* ═══════════════════ Shared speaking state ═════════════════════ */

const robotState = { isSpeaking: false };

/* ═══════════════════ Mouth (lip‑sync) ════════════════════════ */

function Mouth() {
  const fillRef = useRef<THREE.Mesh>(null!);
  const openAmt = useRef(0.5);

  useEffect(() => {
    const handler = (e: Event) => {
      robotState.isSpeaking = (e as CustomEvent<{ active: boolean }>).detail.active;
    };
    window.addEventListener('robot-speaking', handler);
    return () => window.removeEventListener('robot-speaking', handler);
  }, []);

  useFrame((_, dt) => {
    // Resting = 50% open. Speaking = fast oscillation 0.1 -> 1.1 to simulate syllables.
    if (robotState.isSpeaking) {
      // Direct assignment instead of dampLerp so the fast sine wave isn't smoothed out
      openAmt.current = 0.15 + 0.95 * Math.abs(Math.sin(Date.now() * 0.012));
    } else {
      // Smooth return to resting state
      openAmt.current = dampLerp(openAmt.current, 0.50, 15, dt);
    }
    
    if (fillRef.current) fillRef.current.scale.y = openAmt.current;

  });

  return (
    /*
     * CircleGeometry(r, segs, thetaStart=PI, thetaLength=PI):
     *   Draws vertices from angle PI (left) → through bottom (−Y) → angle 2PI (right).
     *   Result: filled D-shape with flat edge at y=0 (top) and curve going DOWN.
     *   scale.y animates Y-height, making it open/close like a real mouth.
     */
    <group position={[0, -0.155, 0.515]}>
      {/* Filled glowing semicircle — matches eye glow exactly */}
      <mesh ref={fillRef} scale={[1, 0.50, 1]}>
        <circleGeometry args={[0.068, 60, Math.PI, Math.PI]} />
        <meshStandardMaterial
          color="#C4B5FD"
          emissive="#C084FC"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}



/* ═══════════════════ Robot ═══════════════════ */

function CuteBot() {
  const headRef  = useRef<THREE.Group>(null!);
  const bodyRef  = useRef<THREE.Group>(null!);
  const waveRef  = useRef<THREE.Mesh>(null!);   // left arm (waving)
  const armRRef  = useRef<THREE.Mesh>(null!);   // right arm (idle)

  // Pre-build LatheGeometry for the bell-shaped body (narrow top → wide middle → round bottom)
  const bodyGeom = useMemo(() => new THREE.LatheGeometry([
    new THREE.Vector2(0.000, -0.265),  // bottom centre
    new THREE.Vector2(0.090, -0.240),  // bottom curve
    new THREE.Vector2(0.185, -0.150),  // lower side
    new THREE.Vector2(0.245, -0.040),  // widest
    new THREE.Vector2(0.230,  0.070),  // narrowing up
    new THREE.Vector2(0.175,  0.160),  // upper side
    new THREE.Vector2(0.095,  0.225),  // top (connects to neck)
  ], 48), []);

  useFrame((_, dt) => {
    if (headRef.current) {
      const tY = THREE.MathUtils.clamp(mouse.sx * 0.085, -0.18, 0.18);
      const tX = THREE.MathUtils.clamp(-mouse.sy * 0.05, -0.10, 0.10);
      headRef.current.rotation.y = dampLerp(headRef.current.rotation.y, tY, 3, dt);
      headRef.current.rotation.x = dampLerp(headRef.current.rotation.x, tX, 3, dt);
      headRef.current.rotation.z = dampLerp(headRef.current.rotation.z, -tY * 0.05, 2, dt);
    }
    if (bodyRef.current) {
      bodyRef.current.rotation.y = dampLerp(
        bodyRef.current.rotation.y,
        THREE.MathUtils.clamp(mouse.sx * 0.01, -0.03, 0.03),
        1.5, dt,
      );
    }
    // Left arm — active wave
    if (waveRef.current) {
      waveRef.current.rotation.z = 1.05 + Math.sin(Date.now() * 0.0025) * 0.20;
    }
    // Right arm — gentle idle sway
    if (armRRef.current) {
      armRRef.current.rotation.z = -0.95 - Math.sin(Date.now() * 0.0018 + 1.2) * 0.10;
    }
  });

  // Shared white material
  const W = { color: '#EDEEFF', metalness: 0.08, roughness: 0.07 } as const;

  return (
    <Float speed={1.0} rotationIntensity={0.03} floatIntensity={0.38} floatingRange={[-0.05, 0.05]}>
      <group scale={1.52}>

        {/* ══════════════════ BODY ══════════════════ */}
        <group ref={bodyRef} position={[0, -0.712, 0]}>

          {/* Bell / triangular body — narrow top, wide middle, rounded bottom */}
          <mesh geometry={bodyGeom}>
            <meshStandardMaterial {...W} side={THREE.FrontSide} />
          </mesh>

          {/* Left arm — raised, waving (viewer's left = robot's right) */}
          <mesh
            ref={waveRef}
            position={[-0.26, 0.06, 0.06]}
            rotation={[0.18, 0.10, 1.08]}
          >
            <capsuleGeometry args={[0.055, 0.22, 8, 20]} />
            <meshStandardMaterial {...W} />
          </mesh>

          {/* Right arm — relaxed, idle sway (viewer's right = robot's left) */}
          <mesh
            ref={armRRef}
            position={[0.26, 0.02, 0.06]}
            rotation={[0.18, -0.10, -0.95]}
          >
            <capsuleGeometry args={[0.055, 0.20, 8, 20]} />
            <meshStandardMaterial {...W} />
          </mesh>

        </group>

        {/* ══════════════════ NECK ══════════════════ */}
        <mesh position={[0, -0.508, 0]}>
          <cylinderGeometry args={[0.085, 0.09, 0.06, 24]} />
          <meshStandardMaterial color="#2A2340" metalness={0.65} roughness={0.2} />
        </mesh>

        {/* ══════════════════ HEAD ══════════════════ */}
        <group ref={headRef} position={[0, 0.08, 0]}>

          {/* ── White outer sphere ── */}
          {/* scaleZ=0.92 → front tip at z = 0.5*0.92 = 0.46 */}
          <mesh scale={[1, 1.06, 0.92]}>
            <sphereGeometry args={[0.50, 64, 64]} />
            <meshStandardMaterial {...W} />
          </mesh>

          {/*
           * ── Dark face visor ──
           * Sits at z=0.462, right at the sphere's scaled front surface.
           * At the visor-edge radius 0.27, sphere surface z = sqrt(0.5²-0.27²)*0.92 = 0.404
           * So the visor disk protrudes only ~0.06 at edges → barely visible.
           * Effect: the white sphere naturally "frames" the dark circle.
           */}
          <mesh position={[0, 0.00, 0.463]}>
            <circleGeometry args={[0.275, 64]} />
            <meshStandardMaterial color="#0B0820" metalness={0.5} roughness={0.08} />
          </mesh>

          {/* ── Eyes — 3-D glowing purple spheres on visor ── */}
          <Eye position={[-0.115, 0.035, 0.515]} />
          <Eye position={[ 0.115, 0.035, 0.515]} />

          {/* ── Mouth with lip-sync ── */}
          <Mouth />

        </group>

      </group>
    </Float>
  );
}

/* ═══════════════════ Particles ═══════════════ */

function Particles() {
  const count = 12;
  const ref   = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data  = useMemo(() =>
    Array.from({ length: count }, () => ({
      p: [(Math.random() - 0.5) * 4.5, (Math.random() - 0.5) * 4, -1.5 + (Math.random() - 0.5) * 1.5],
      s: 0.08 + Math.random() * 0.28,
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
      <meshStandardMaterial
        color="#C4B5FD"
        emissive="#A855F7"
        emissiveIntensity={0.5}
        toneMapped={false}
        transparent
        opacity={0.22}
      />
    </instancedMesh>
  );
}

/* ═══════════════════ Export ═══════════════════ */

export default function Robot3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 340, position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 24,
        background: 'radial-gradient(ellipse at 50% 48%, rgba(168,85,247,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <Canvas
        camera={{ position: [0, 0.12, 3.3], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ background: 'transparent' }}
      >
        <MouseTracker />
        {/* Lighting tuned for white glossy materials */}
        <ambientLight intensity={0.7}  color="#F8F6FF" />
        <directionalLight position={[0,  5,  6]}  intensity={2.0} color="#FFFFFF" castShadow />
        <directionalLight position={[-4, 2,  3]}  intensity={0.55} color="#EDE9FE" />
        <directionalLight position={[4, -1,  2]}  intensity={0.3}  color="#F5F3FF" />
        {/* Purple rim/fill for the glow atmosphere */}
        <pointLight position={[0, 0.5, 3.5]} intensity={0.8} color="#9333EA" distance={7} decay={2} />
        <CuteBot />
        <ContactShadows
          position={[0, -1.82, 0]}
          opacity={0.1}
          scale={3}
          blur={3.5}
          far={4}
          color="#5B21B6"
        />
        <Particles />
      </Canvas>
    </div>
  );
}
