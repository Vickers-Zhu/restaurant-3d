// src/components/Scene.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Bvh, OrbitControls } from "@react-three/drei";
import { Selection } from "@react-three/postprocessing";

import { GenericModel } from "./Model/GenericModel";

/**
 * Scene component that renders the 3D environment
 * Works with any restaurant model configuration
 */
export function Scene({
  modelConfig,
  selectedItems,
  occupiedItems,
  onItemClicked,
  sceneStyle,
}) {
  // Default canvas style with sensible defaults
  const defaultStyle = {
    width: "375px",
    height: "667px",
    margin: "0 auto",
    borderRadius: "15px",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.15)",
    background: "linear-gradient(135deg, #f5f5f5, #eaeaea)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  };

  // Merge default style with any custom style properties
  const canvasStyle = { ...defaultStyle, ...sceneStyle };

  return (
    <Canvas
      style={canvasStyle}
      flat
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{
        position: modelConfig.initialCameraPosition,
        fov: modelConfig.cameraFov,
      }}
    >
      <ambientLight intensity={1.5 * Math.PI} />
      <Sky />
      <Bvh firstHitOnly>
        <Selection>
          <GenericModel
            rotation={[0, 0, 0]}
            position={[-0.8, 0, 0]}
            modelConfig={modelConfig}
            selectedItems={selectedItems}
            occupiedItems={occupiedItems}
            onItemClicked={onItemClicked}
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
