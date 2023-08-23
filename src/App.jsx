import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Edges,
  MeshPortalMaterial,
  Environment,
  Stars,
  OrbitControls,
  useProgress,
  Html,
} from "@react-three/drei";
import Overlay from "./layout/Overlay";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-2 font-mono">
        <div className="w-full h-1 bg-gray-900 rounded-full">
          <div className="h-1 bg-white/50" style={{ width: progress }}></div>
        </div>
      </div>
    </Html>
  );
}

export default function App() {
  return (
    <>
      <Overlay />
      <Canvas shadows camera={{ position: [-3, 0.5, 3] }}>
        <Suspense fallback={<Loader />}>
          <Stars
            radius={10}
            depth={50}
            count={500}
            factor={3}
            saturation={0}
            fade
            speed={2}
          />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 2, 2]} />
            <Edges />
            <Side rotation={[0, 0, 0]} bg="#d67158" index={0}>
              <torusGeometry args={[0.65, 0.3, 64]} />
            </Side>
            <Side rotation={[0, Math.PI, 0]} bg="#84b9c1" index={1}>
              <torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
            </Side>
            <Side
              rotation={[0, Math.PI / 2, Math.PI / 2]}
              bg="lightgreen"
              index={2}
            >
              <boxGeometry args={[1.15, 1.15, 1.15]} />
            </Side>
            <Side
              rotation={[0, Math.PI / 2, -Math.PI / 2]}
              bg="aquamarine"
              index={3}
            >
              <octahedronGeometry />
            </Side>
            <Side rotation={[0, -Math.PI / 2, 0]} bg="indianred" index={4}>
              <icosahedronGeometry />
            </Side>
            <Side rotation={[0, Math.PI / 2, 0]} bg="hotpink" index={5}>
              <dodecahedronGeometry />
            </Side>
          </mesh>
          <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
        </Suspense>
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
      <ambientLight intensity={12.5} />
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
