import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap } from "three";
import { TextureLoader } from "three";

function Globe() {
  const meshRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> | null>(null);
  const earthMap = useLoader(TextureLoader, "/map.jpg");

  useFrame(() => {
    // フレームごとの処理をここに記述
    if (meshRef.current) {
      // 例: 球を回転させる
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} castShadow position={[0, 0, 0]}>
      <sphereGeometry args={[30, 128, 64]} />
      <meshPhysicalMaterial map={earthMap} />
    </mesh>
  );
}

export default function BaseGL() {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={3} />
        <OrbitControls minDistance={101} maxDistance={200} rotateSpeed={0.4} zoomSpeed={0.5} />
        <Globe />
      </Canvas>
    </main>
  );
}
