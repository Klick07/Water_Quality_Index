import React, { useRef } from 'react'
import { useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three';
import { useGLTF, useScroll, ScrollControls } from '@react-three/drei'

function RotatingModel({ rotationProgress }) {
  const { scene } = useGLTF('/model_01.glb')
  const modelRef = useRef()
  const scroll = useScroll()
  useLayoutEffect(() => {
    // Traverse the model to find meshes and apply the water material
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: '#82ccdd',       // Light blue water tint
          metalness: 0,           // Water isn't metallic
          roughness: 0.1,         // Smooth surface for reflections
// Crucial: makes it see-through like glass/water
          thickness: 1.5,         // Adds volume to the transparency
          ior: 1.33,              // Index of Refraction for water
          transparent: true,
          opacity: 0.6,           // Base transparency
          envMapIntensity: 1,     // How much it reflects the sky/environment
        });
      }
    });
  }, [scene]);

  // useFrame runs 60 times per second
  useFrame(() => {
    if (modelRef.current) {
      // Assuming rotationProgress is a value from 0 to 1
      const targetRotation = scroll.offset * (Math.PI / 2);
      
      // Direct assignment (snappy)
      modelRef.current.rotation.z = targetRotation;

      // Optional: If you want it to feel "smooth" like ScrollControls damping:
      // modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, targetRotation, 0.1);
    }
  })

  return <primitive ref={modelRef} object={scene} scale={0.5} rotation={[Math.PI / 2, 0, Math.PI / 2]} position={[0, 3, 0]} />
}


export default function ModelViewer({rotationProgress}) {
  return (
    <div className=" sticky top-0 z-5" style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        
        {/* pages={3} makes the scrollable area 3 screens long */}
        <ScrollControls pages={0.5} damping={0.1}>

          <RotatingModel  />

          {/* Optional: Add HTML text that moves with the scroll */}
        </ScrollControls>
      </Canvas>
    </div>
  )
}



