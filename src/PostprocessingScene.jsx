import { OrbitControls, useFBO } from "@react-three/drei"
import { createPortal, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import Portal from "./Portal"
import PostprocessingPlane from "./PostprocessingPlane"
import { useControls } from "leva"

export default function PostprocessingScene() {
  const boxRef = useRef()
  const scene = new THREE.Scene()

  // Create FBO
  const renderTarget = useFBO({
    multisample: true,
    stencilBuffer: false,
    samples: 8,
  })

  const { sobelIntensity } = useControls({
    sobelIntensity: {
      value: 1.0,
      min: 0,
      max: 1,
      step: 0.01,
      label: "Sobel Intensity",
    },
  })

  // Rotate the box in the portal scene
  useFrame((state) => {
    const { gl, camera } = state

    // Rotate the box
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01
      boxRef.current.rotation.y += 0.01
    }

    // Render portal scene to FBO
    gl.setRenderTarget(renderTarget)
    gl.setClearColor("#eeeeee") // Match background color
    gl.clear()
    gl.render(scene, camera)
    gl.setRenderTarget(null)
  })

  return (
    <>
      <OrbitControls />

      {/* Main scene with shader effect plane */}
      <PostprocessingPlane
        renderTarget={renderTarget}
        sobelIntensity={sobelIntensity}
      />

      {/* Portal scene that will be rendered to FBO */}
      {createPortal(
        <group ref={boxRef}>
          <Portal />
        </group>,
        scene,
        {
          events: false,
          frames: 1,
        }
      )}
    </>
  )
}
