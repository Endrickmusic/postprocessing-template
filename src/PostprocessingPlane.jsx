import { shaderMaterial } from "@react-three/drei"
import { extend, useThree } from "@react-three/fiber"
import { vertexShader } from "./shaders/vertex.js"
import { fragmentShader } from "./shaders/fragment.js"

const PostprocessingMaterial = shaderMaterial(
  {
    tDiffuse: null,
  },
  vertexShader,
  fragmentShader
)

extend({ PostprocessingMaterial })

export default function PostprocessingPlane({ renderTarget }) {
  const { viewport } = useThree()

  return (
    <mesh position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <postprocessingMaterial tDiffuse={renderTarget.texture} transparent />
    </mesh>
  )
}
