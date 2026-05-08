"use client";

import { useMemo, useRef } from "react";
import type { Mesh } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls } from "@react-three/drei";

const advantages = [
  {
    imageNumber: 1,
    title: "Multiplica tu productividad hasta 3x",
    description:
      "Automatizamos procesos repetitivos para que tu equipo se enfoque en lo que realmente importa",
    benefit: "Implementación orientada a cuellos de botella reales",
  },
  {
    imageNumber: 2,
    title: "Ahorra hasta 32% en costos operativos",
    description:
      "Eliminamos gastos innecesarios y optimizamos recursos existentes",
    benefit: "Ahorro medible por proceso automatizado",
  },
  {
    imageNumber: 3,
    title: "Maximiza tus recursos",
    description:
      "Tecnología que te permite escalar sin contratar más personal",
    benefit: "Crecimiento sostenible y rentable",
  },
  {
    imageNumber: 5,
    title: "Agentes de IA que trabajan 24/7",
    description:
      "Delegamos tareas administrativas a inteligencia artificial avanzada",
    benefit: "Automatización gradual con foco en retorno",
  },
  {
    imageNumber: 6,
    title: "Administra tu negocio sin estrés",
    description:
      "Sistemas intuitivos que hacen la gestión empresarial increíblemente fácil",
    benefit: "Más tiempo para estrategia y crecimiento",
  },
];

function FlowNode({
  position,
  phase,
}: {
  position: [number, number, number];
  phase: number;
}) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2 + phase) * 0.12;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0ea5b9" emissiveIntensity={0.75} />
      </mesh>
    </Float>
  );
}

function Scene() {
  const coreRef = useRef<Mesh>(null);
  const ringOneRef = useRef<Mesh>(null);
  const ringTwoRef = useRef<Mesh>(null);

  const nodes = useMemo<[number, number, number][]>(
    () => [
      [2.2, 1.1, 0.3],
      [-2.4, 1.2, -0.4],
      [2.1, -1.3, -0.2],
      [-2.2, -1.2, 0.2],
      [0.3, 2.1, -0.5],
      [-0.2, -2.2, 0.4],
    ],
    []
  );

  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.rotation.x = clock.elapsedTime * 0.2;
      coreRef.current.rotation.y = clock.elapsedTime * 0.45;
    }

    if (ringOneRef.current) {
      ringOneRef.current.rotation.z = clock.elapsedTime * 0.32;
      ringOneRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.2;
    }

    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.y = clock.elapsedTime * -0.28;
      ringTwoRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.25) * 0.2;
    }
  });

  return (
    <>
      <color attach="background" args={["#09090b"]} />
      <fog attach="fog" args={["#09090b", 5, 14]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={2.4} color="#22d3ee" />
      <pointLight position={[-4, -3, 2]} intensity={1.2} color="#818cf8" />

      <group>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial color="#67e8f9" emissive="#0f172a" roughness={0.2} metalness={0.85} />
        </mesh>

        <mesh ref={ringOneRef}>
          <torusGeometry args={[1.45, 0.025, 20, 200]} />
          <meshStandardMaterial color="#22d3ee" emissive="#0f172a" />
        </mesh>
        <mesh ref={ringTwoRef} rotation={[0.8, 0.4, 0]}>
          <torusGeometry args={[2, 0.02, 20, 200]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#0f172a" />
        </mesh>

        {nodes.map((position, idx) => (
          <FlowNode key={`${position.join("-")}-${idx}`} position={position} phase={idx * 0.8} />
        ))}

        {nodes.map((position) => (
          <Line
            key={`line-${position.join("-")}`}
            points={[[0, 0, 0], position]}
            color="#38bdf8"
            lineWidth={0.8}
            transparent
            opacity={0.55}
          />
        ))}
      </group>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.6}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 1.6}
      />
    </>
  );
}

export default function AIAutomationShowcase() {
  return (
    <div className="hp-ai-flow-hero">
      <div className="hp-ai-flow-canvas" aria-hidden>
        <Canvas camera={{ position: [0, 0, 6], fov: 52 }}>
          <Scene />
        </Canvas>
      </div>

      <div className="hp-ai-flow-overlay mx-auto grid max-w-7xl grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-2 sm:justify-items-center sm:gap-6 lg:grid-cols-3">
        {advantages.map((item) => (
          <article key={item.title} className="hp-ventaja-card">
            <img
              src={`/ventajas/${item.imageNumber}.jpg`}
              alt=""
              className="hp-ventaja-image"
              loading="lazy"
            />
            <div className="hp-ventaja-media" />
            <div className="hp-ventaja-content">
              <span className="hp-ventaja-badge">Automatización IA</span>
              <h3 className="hp-h3 hp-ventaja-title">{item.title}</h3>
              <p className="hp-body-sm hp-ventaja-description">{item.description}</p>
              <p className="hp-ventaja-benefit">{item.benefit}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
