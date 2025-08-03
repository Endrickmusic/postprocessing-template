import { Environment, useTexture } from "@react-three/drei"

export default function Portal() {
  const normalMap = useTexture("./textures/waternormals.jpeg")

  return (
    <>
      <Environment files="./textures/envmap.hdr" />
      <color attach="background" args={["#eeeeee"]} />

      {/* This will contain the scene to be rendered to FBO */}
      <mesh
        rotation={[Math.PI / 4, Math.PI / 4, Math.PI / 2]}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          metalness={1}
          roughness={0.12}
          normalMap={normalMap}
          normalScale={[0.2, 0.2]}
        />
      </mesh>
    </>
  )
}
