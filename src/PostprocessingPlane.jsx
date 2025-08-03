import { shaderMaterial } from "@react-three/drei"
import { extend, useThree } from "@react-three/fiber"
import { vertexShader } from "./shaders/vertex.js"
import { fragmentShader } from "./shaders/fragment.js"

const PostprocessingMaterial = shaderMaterial(
  {
    tDiffuse: null,
    uTexelSize: [1, 1],
    threshold: 0.2,
  },
  vertexShader,
  fragmentShader
)

extend({ PostprocessingMaterial })

export default function PostprocessingPlane({ renderTarget, threshold }) {
  const { viewport } = useThree()
  const texelSize = [1 / renderTarget.width, 1 / renderTarget.height]
  return (
    <mesh position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <postprocessingMaterial
        tDiffuse={renderTarget.texture}
        uTexelSize={texelSize}
        threshold={threshold}
        transparent
      />
    </mesh>
  )
}
