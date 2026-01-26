import React, { useRef } from 'react'
import { useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three';
import { useGLTF, useScroll, ScrollControls, Scroll } from '@react-three/drei'

function RotatingModel() {
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
    // scroll.offset goes from 0 to 1 as you scroll
    // Multiply by Math.PI * 2 for one full 360-degree rotation
    const rotationAmount = scroll.offset * Math.PI * 2
    modelRef.current.rotation.z = rotationAmount
  })

  return <primitive ref={modelRef} object={scene} scale={0.5} rotation={[Math.PI / 2, 0, Math.PI / 2]} position={[0, 3, 0]} />
}

export default function ModelViewer() {
  return (
    <div className="absolute top-0 z-5" style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        
        {/* pages={3} makes the scrollable area 3 screens long */}
        <ScrollControls pages={1} damping={0.1}>
          
          {/* The 3D Model that rotates */}
          <RotatingModel />

          {/* Optional: Add HTML text that moves with the scroll */}

        </ScrollControls>
      </Canvas>
    </div>
  )
}

