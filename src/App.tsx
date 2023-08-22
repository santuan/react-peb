import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Edges,
  MeshPortalMaterial,
  CameraControls,
  Environment,
  PivotControls,
  Stars,
  OrbitControls,
} from "@react-three/drei";
// import Bananas from "./Bananas";

import { Suspense, lazy, useState } from "react";
import Overlay from "./layout/Overlay";
import { FadeIn } from "./layout/styles";

// Comment the above and uncomment the following to import the WebGL BG lazily for faster loading times
const Bananas = lazy(() => import("./Bananas"));

export default function App() {
  const [speed, set] = useState(1);
  return (
    <>
      <Suspense fallback={null}>
        <FadeIn />
      </Suspense>
      <Overlay />
      <Canvas shadows camera={{ position: [0, -2, 3] }}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <mesh castShadow receiveShadow scale={0.8}>
          <boxGeometry args={[2, 2, 2]} />
          <Edges />
          <Side rotation={[0, 0, 0]} bg="#cdc8c1" index={0}>
            <torusGeometry args={[0.65, 0.3, 64]} />
          </Side>
          <Side rotation={[0, Math.PI, 0]} bg="#b1a2a0" index={1}>
            <torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
          </Side>
          <Side rotation={[0, Math.PI / 2, Math.PI / 2]} bg="#386257" index={2}>
            <boxGeometry args={[1.15, 1.15, 1.15]} />
          </Side>
          <Side
            rotation={[0, Math.PI / 2, -Math.PI / 2]}
            bg="#b0a85e"
            index={3}
          >
            <octahedronGeometry />
          </Side>
          <Side rotation={[0, -Math.PI / 2, 0]} bg="#7d9f94" index={4}>
            <icosahedronGeometry />
          </Side>
          <Side rotation={[0, Math.PI / 2, 0]} bg="#fff" index={5}>
            <dodecahedronGeometry />
          </Side>
        </mesh>
        <OrbitControls autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </>
  );
}

function Side({ rotation = [0, 0, 0], bg = "#f0f0f0", children, index }) {
  const mesh = useRef();
  const { nodes } = useGLTF("/aobox-transformed.glb");
  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += delta;
  });
  return (
    <MeshPortalMaterial attach={`material-${index}`}>
      {/** Everything in here is inside the portal and isolated from the canvas */}
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      {/** A box with baked AO */}
      <mesh
        castShadow
        receiveShadow
        rotation={rotation}
        geometry={nodes.Cube.geometry}
      >
        <meshStandardMaterial
          aoMapIntensity={1}
          aoMap={nodes.Cube.material.aoMap}
          color={bg}
        />
        <spotLight
          castShadow
          color={bg}
          intensity={2}
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          shadow-normalBias={0.05}
          shadow-bias={0.0001}
        />
      </mesh>
      {/** The shape */}
      <mesh castShadow receiveShadow ref={mesh}>
        {children}
        <meshLambertMaterial color={bg} />
      </mesh>
    </MeshPortalMaterial>
  );
}
