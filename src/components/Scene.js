// src/web-app/src/components/Scene.js
import React, { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Bvh, OrbitControls } from "@react-three/drei";
import { Selection } from "@react-three/postprocessing";
// import { Model } from "./Model"; // Ensure this path is correct for your project structure
import { Model } from "./Model/Model"; // Import Model component
import { EffectComposer, Bloom } from "@react-three/postprocessing"; // Import Bloom for visual enhancements

export function Scene({ selectedChairs, occupiedChairs }) {
  const canvasStyle = {
    width: "375px",
    height: "667px",
    margin: "0 auto",
    borderRadius: "15px",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.15)",
    background: "linear-gradient(135deg, #f5f5f5, #eaeaea)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  };

  return (
    <Canvas
      style={canvasStyle}
      flat
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 10, 0], fov: 40 }}
    >
      <ambientLight intensity={1.5 * Math.PI} />
      <Sky />
      <Bvh firstHitOnly>
        <Selection>
          <Model
            rotation={[0, 0, 0]}
            position={[-0.8, 0, 0]}
            selectedChairs={selectedChairs}
            occupiedChairs={occupiedChairs}
          />
        </Selection>
      </Bvh>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        panSpeed={1}
        zoomSpeed={1.5}
        rotateSpeed={1.2}
        screenSpacePanning={true}
        touchPan={1}
        touchRotate={2}
        touchZoom={2}
      />
    </Canvas>
  );
}

export default Scene;
