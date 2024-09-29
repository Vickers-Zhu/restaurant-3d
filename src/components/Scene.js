// src/web-app/src/components/Scene.js
import React, { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Bvh, OrbitControls } from "@react-three/drei";
import { Selection } from "@react-three/postprocessing";
import { Model } from "./Model"; // Ensure this path is correct for your project structure
import { EffectComposer, Bloom } from "@react-three/postprocessing"; // Import Bloom for visual enhancements

export function Scene({ selectedChairs, onSelectChair }) {
  const canvasStyle = {
    width: "375px",
    height: "667px",
    margin: "0 auto", // Center the canvas horizontally
    borderRadius: "15px", // Rounded corners for a modern look
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.15)", // Shadow for elevation effect
    background: "linear-gradient(135deg, #f5f5f5, #eaeaea)", // Subtle gradient for depth
    border: "1px solid rgba(0, 0, 0, 0.1)", // Light border to accentuate the edges
  };

  /* 
    === Local Testing: Start ===
    The following local state and handler are used for testing chair selection.
    === To remove for production, delete the entire block below ===
  */
  const [localSelectedChairs, setLocalSelectedChairs] = useState([]); // Local state for selected chairs

  // Handler to toggle chair selection
  const handleChairSelection = useCallback((chairName) => {
    setLocalSelectedChairs((prevSelected) => {
      if (prevSelected.includes(chairName)) {
        return prevSelected.filter((name) => name !== chairName);
      } else {
        return [...prevSelected, chairName];
      }
    });
  }, []);
  /* 
    === Local Testing: End ===
  */

  return (
    <Canvas
      style={canvasStyle}
      flat
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 10, 0], fov: 40 }} // Camera positioned above the scene
    >
      <ambientLight intensity={1.5 * Math.PI} />
      <Sky />
      <Bvh firstHitOnly>
        <Selection>
          {/* 
            === Local Testing: Start ===
            Pass localSelectedChairs and handleChairSelection to Model for testing.
            === To remove for production, remove the selectedChairs and onSelectChair props ===
          */}
          <Model
            rotation={[0, 0, 0]}
            position={[-0.8, 0, 0]}
            selectedChairs={localSelectedChairs} // Pass local state
            onSelectChair={handleChairSelection} // Pass handler function
          />
          {/* 
            === Local Testing: End ===
          */}
        </Selection>
      </Bvh>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        panSpeed={1} // Adjust the speed of panning
        zoomSpeed={1.5} // Adjust the speed of zooming
        rotateSpeed={1.2} // Adjust the speed of rotation
        screenSpacePanning={true} // Enable screen space panning
        touchPan={1} // Enable touch panning with two-finger drag
        touchRotate={2} // Enable touch rotation with two-finger rotate
        touchZoom={2} // Enable touch zoom with pinch gesture
      />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
          intensity={1.5} // Adjust for desired glow intensity
        />
      </EffectComposer>
    </Canvas>
  );
}
