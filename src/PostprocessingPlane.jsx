import { shaderMaterial } from "@react-three/drei"
import { extend, useThree } from "@react-three/fiber"
import { vertexShader } from "./shaders/vertex.js"
import { fragmentShader } from "./shaders/fragment.js"

const PostprocessingMaterial = shaderMaterial(
  {
    tDiffuse: null,
    sobelIntensity: 0.0,
    uTexelSize: [1, 1],
  },
  vertexShader,
  fragmentShader
)

extend({ PostprocessingMaterial })

export default function PostprocessingPlane({ renderTarget, sobelIntensity }) {
  const { viewport } = useThree()
  const texelSize = [1 / viewport.width, 1 / viewport.height]
  return (
    <mesh position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <postprocessingMaterial
        tDiffuse={renderTarget.texture}
        sobelIntensity={sobelIntensity}
        uTexelSize={texelSize}
        transparent
      />
    </mesh>
  )
}
