// src/components/Scene.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Bvh, OrbitControls, Environment } from "@react-three/drei";
import { Selection } from "@react-three/postprocessing";
import { GenericModel } from "./Model/GenericModel";
import * as THREE from "three";

export function Scene({
  modelConfig,
  selectedItems,
  occupiedItems,
  onItemClicked,
  sceneStyle,
  enableDebug = false, // Add debug prop
}) {
  const defaultStyle = {
    width: "375px",
    height: "667px",
    margin: "0 auto",
    borderRadius: "15px",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.15)",
    background: "linear-gradient(135deg, #f5f5f5, #eaeaea)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  };

  const canvasStyle = { ...defaultStyle, ...sceneStyle };

  return (
    <Canvas
      style={canvasStyle}
      flat={false} // Enable tone mapping for better colors
      dpr={[1, 1.5]}
      gl={{
        antialias: true, // Enable antialiasing for better quality
        toneMapping: THREE.ACESFilmicToneMapping, // Better tone mapping
        toneMappingExposure: 1.0,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{
        position: modelConfig.initialCameraPosition,
        fov: modelConfig.cameraFov,
      }}
      shadows // Enable shadows
    >
      {/* Improved lighting setup */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Key light - main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Fill light - softer light from the opposite side */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        color="#ffffff"
      />

      {/* Rim light - for edge definition */}
      <directionalLight
        position={[0, 5, -10]}
        intensity={0.2}
        color="#f0f8ff"
      />

      {/* Environment for realistic reflections */}
      <Environment preset="apartment" background={false} />

      {/* Sky for background */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />

      <Bvh firstHitOnly>
        <Selection>
          <GenericModel
            rotation={[0, 0, 0]}
            position={[-0.8, 0, 0]}
            modelConfig={modelConfig}
            selectedItems={selectedItems}
            occupiedItems={occupiedItems}
            onItemClicked={onItemClicked}
            enableDebug={enableDebug} // Pass debug flag
          />
        </Selection>
      </Bvh>

      <OrbitControls
        target={modelConfig.cameraTarget}
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
        minDistance={5} // Minimum zoom distance
        maxDistance={50} // Maximum zoom distance
      />
    </Canvas>
  );
}

export default Scene;
