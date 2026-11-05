"use client";
/* eslint-disable react-hooks/immutability -- Three.js scene and mesh objects are intentionally mutable inside R3F effects and frame callbacks. */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  ExtrudeGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  Path,
  PMREMGenerator,
  Points,
  Shape,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";

const ringRotations = [
  [1.15, 0.18, 0.24],
  [0.1, 1.4, -0.25],
  [0.87, -0.74, -0.4],
];
const ringColors = ["#7ce9f5", "#b899ff", "#e0a0ff"];

function Sculpture({
  onReady,
  onFailure,
}: {
  onReady: () => void;
  onFailure: () => void;
}) {
  const group = useRef<Group>(null);
  const rings = useRef<(Group | null)[]>([]);
  const photons = useRef<(Group | null)[]>([]);
  const core = useRef<Mesh>(null);
  const coreMaterial = useRef<MeshPhysicalMaterial>(null);
  const stars = useRef<Points>(null);
  const elapsed = useRef(0);
  const { gl, scene } = useThree();
  const starPositions = useMemo(() => {
    const positions = new Float32Array(72 * 3);
    for (let i = 0; i < 72; i++) {
      const angle = i * 2.399963;
      const radius = 1.55 + (((i * 37) % 100) / 100) * 1.25;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = -0.8 - ((i * 13) % 20) / 10;
    }
    return positions;
  }, []);
  const ribbon = useMemo(() => {
    const shape = new Shape();
    shape.absarc(0, 0, 2.14, 0, Math.PI * 2, false);
    const hole = new Path();
    hole.absarc(0, 0, 2.045, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const geometry = new ExtrudeGeometry(shape, {
      depth: 0.065,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 3,
      steps: 1,
      curveSegments: 160,
    });
    geometry.center();
    geometry.deleteAttribute("normal");
    const smooth = mergeVertices(geometry);
    smooth.computeVertexNormals();
    geometry.dispose();
    return smooth;
  }, []);
  useEffect(() => () => ribbon.dispose(), [ribbon]);
  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);
    scene.environment = target.texture;
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    onReady();
    return () => {
      gl.domElement.removeEventListener("webglcontextlost", lost);
      scene.environment = null;
      target.dispose();
      room.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, onReady, onFailure]);
  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    const step = Math.min(delta, 0.05);
    elapsed.current += step;
    const time = elapsed.current;
    const entrance = 1 - Math.pow(1 - Math.min(time / 2.4, 1), 3);
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      -0.23 + pointer.x * 0.27,
      3,
      step,
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      0.12 + pointer.y * 0.18,
      3,
      step,
    );
    group.current.rotation.z = Math.sin(time * 0.2) * 0.08;
    group.current.position.y = Math.sin(time * 0.65) * 0.085;
    group.current.scale.setScalar(0.88 + entrance * 0.12);
    rings.current.forEach((ring, index) => {
      if (!ring) return;
      const [x, y, z] = ringRotations[index];
      ring.rotation.set(
        x + Math.sin(time * 0.3 + index) * 0.22 + (1 - entrance) * 0.75,
        y + time * [0.18, -0.14, 0.12][index],
        z + Math.sin(time * 0.18 + index * 1.7) * 0.12,
      );
      ring.position.z = (1 - entrance) * (index - 1) * 0.8;
      const size = 0.72 + entrance * 0.28;
      ring.scale.set(size, size * 0.94, size);
      const photon = photons.current[index];
      if (photon)
        photon.rotation.z = time * [0.95, -0.8, 0.7][index] + index * 2.1;
    });
    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(time * 1.6) * 0.055);
      core.current.rotation.y = time * 0.16;
    }
    if (coreMaterial.current)
      coreMaterial.current.emissiveIntensity = 0.3 + Math.sin(time * 1.6) * 0.1;
    if (stars.current) stars.current.rotation.z = time * 0.025;
  });
  return (
    <group ref={group} rotation={[0.12, -0.23, 0]}>
      {ringRotations.map((rotation, index) => (
        <group
          key={index}
          ref={(node) => {
            rings.current[index] = node;
          }}
          rotation={rotation as [number, number, number]}
          scale={[1, 0.94, 1]}
        >
          <mesh geometry={ribbon}>
            <meshPhysicalMaterial
              color="#a6b4cb"
              metalness={1}
              roughness={0.2}
              clearcoat={1}
              envMapIntensity={1.4}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[2.045, 0.008, 8, 160]} />
            <meshStandardMaterial
              color={ringColors[index]}
              emissive={ringColors[index]}
              emissiveIntensity={1.25}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
          <group
            ref={(node) => {
              photons.current[index] = node;
            }}
          >
            {[0.65, 0.35, 0.12].map((arc, trailIndex) => (
              <mesh
                key={arc}
                rotation={[0, 0, index === 1 ? 0 : -arc]}
                position={[0, 0, 0.045]}
              >
                <torusGeometry args={[2.14, 0.012, 6, 36, arc]} />
                <meshBasicMaterial
                  color={ringColors[index]}
                  transparent
                  opacity={[0.15, 0.35, 0.8][trailIndex]}
                  toneMapped={false}
                  depthWrite={false}
                />
              </mesh>
            ))}
            <mesh position={[2.14, 0, 0.045]}>
              <sphereGeometry args={[0.047, 12, 8]} />
              <meshBasicMaterial color="#e0ffff" toneMapped={false} />
            </mesh>
          </group>
        </group>
      ))}
      <mesh ref={core}>
        <sphereGeometry args={[0.4, 48, 32]} />
        <meshPhysicalMaterial
          ref={coreMaterial}
          color="#b8d6ff"
          metalness={0.38}
          roughness={0.13}
          clearcoat={1}
          emissive="#335aaf"
          emissiveIntensity={0.3}
        />
      </mesh>
      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#a3e4ff"
          size={0.018}
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </points>
      <pointLight color="#739dff" intensity={8} distance={5} />
    </group>
  );
}
export default function OrbitalScene({
  active,
  onReady,
  onFailure,
}: {
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.6], fov: 43 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={null}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={3} color="#e7faff" />
      <directionalLight position={[-4, 0, 2]} intensity={2.2} color="#9863ff" />
      <directionalLight position={[2, -3, 2]} intensity={1.6} color="#62dbea" />
      <Sculpture onReady={onReady} onFailure={onFailure} />
    </Canvas>
  );
}
