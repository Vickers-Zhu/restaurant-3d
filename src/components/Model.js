// web-app/src/components/Model.js
import React, { useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { useGLTF } from "@react-three/drei";
import {
  Select,
  EffectComposer,
  Outline,
  ToneMapping,
} from "@react-three/postprocessing";
import { useThree } from "@react-three/fiber";

export function Model({ selectedChairs, ...props }) {
  const { nodes, materials } = useGLTF("/kitchen.glb");
  const groupRef = useRef();

  const [hovered, setHovered] = useState(null);

  const debouncedHover = useCallback(
    debounce((name) => {
      setHovered(name);
    }, 30),
    []
  );

  const handlePointerOver = useCallback(
    (name) => (e) => {
      e.stopPropagation();
      debouncedHover(name); // Set the name of the hovered chair
    },
    [debouncedHover]
  );

  const handlePointerOut = useCallback(() => {
    debouncedHover(null);
  }, [debouncedHover]);

  const handleClick = useCallback(
    (name) => (e) => {
      e.stopPropagation();
      // Toggle chair selection and send message to React Native
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: "chairClicked", name })
        );
      }
    },
    []
  );

  const { size } = useThree();

  // Determine the color of the outline based on the hover and selected states
  const getOutlineColor = (name) => {
    if (hovered === name) return "white"; // White outline if hovered
    if (selectedChairs.includes(name)) return "red"; // Red outline if selected
    return null; // No outline if not hovered or selected
  };

  return (
    <group ref={groupRef} {...props}>
      <EffectComposer
        stencilBuffer
        disableNormalPass
        autoClear={false}
        multisampling={2}
      >
        {Array.from({ length: 6 }, (_, i) => {
          const chairName = `CHAIR${i + 1}`;
          const outlineColor = getOutlineColor(chairName);

          return (
            outlineColor && (
              <Outline
                key={chairName}
                visibleEdgeColor={outlineColor}
                hiddenEdgeColor={outlineColor}
                blur
                edgeStrength={20}
                width={size.width * 1.25}
              />
            )
          );
        })}
        <ToneMapping />
      </EffectComposer>

      {/* Other meshes */}
      <mesh geometry={nodes.vase1.geometry} material={materials.gray} />
      <mesh geometry={nodes.bottle.geometry} material={materials.gray} />
      <mesh geometry={nodes.walls_1.geometry} material={materials.floor} />
      <mesh
        geometry={nodes.plant_1.geometry}
        material={materials.potted_plant_01_leaves}
      />
      <mesh
        geometry={nodes.plant_2.geometry}
        material={materials.potted_plant_01_pot}
      />
      <mesh geometry={nodes.cuttingboard.geometry} material={materials.walls} />
      <mesh geometry={nodes.bowl.geometry} material={materials.walls} />
      <mesh geometry={nodes.carpet.geometry} material={materials.carpet} />
      <mesh geometry={nodes.table.geometry} material={materials.walls} />
      <mesh geometry={nodes.vase.geometry} material={materials.gray} />
      <mesh geometry={nodes.kitchen.geometry} material={materials.walls} />
      <mesh geometry={nodes.sink.geometry} material={materials.chrome} />

      {/* Chairs with interaction and selection */}
      {Array.from({ length: 6 }, (_, i) => {
        const chairName = `CHAIR${i + 1}`;
        return (
          <Select
            key={chairName}
            enabled={
              hovered === chairName || selectedChairs.includes(chairName)
            }
            onPointerOver={handlePointerOver(chairName)}
            onPointerOut={handlePointerOut}
            onClick={handleClick(chairName)}
          >
            <mesh
              geometry={nodes[`chairs00${i + 1}_1`].geometry}
              material={materials.walls}
            />
            <mesh
              geometry={nodes[`chairs00${i + 1}_2`].geometry}
              material={materials.plastic}
            />
          </Select>
        );
      })}
    </group>
  );
}

useGLTF.preload("/kitchen.glb");
