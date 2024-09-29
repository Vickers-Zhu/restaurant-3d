// src/components/Model/Model.js
import React, { useRef, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import { Clock } from "three";
import Chair from "./Chair";
import Effects from "./Effects";
import useDebouncedHover from "../../hooks/useDebouncedHover";
import {
  createEmissiveMaterial,
  emissiveColorSelected,
  emissiveColorOccupied,
} from "./Materials";

/**
 * Model component representing the entire 3D scene.
 *
 * @param {object} props - Component props.
 * @returns {JSX.Element} - Rendered 3D model.
 */
export function Model({ selectedChairs, occupiedChairs, ...props }) {
  const { nodes, materials } = useGLTF("/kitchen.glb");
  const groupRef = useRef();
  const clock = useRef(new Clock());

  const { hovered, handlePointerOver, handlePointerOut } =
    useDebouncedHover(30);

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

  return (
    <group ref={groupRef} {...props}>
      <Effects
        selectedChairs={selectedChairs}
        occupiedChairs={occupiedChairs}
        emissiveColorSelected={emissiveColorSelected}
        emissiveColorOccupied={emissiveColorOccupied}
      />

      {/* Static meshes */}
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

      {/* Chairs with selection and occupied effects */}
      {Array.from({ length: 6 }, (_, i) => {
        const chairName = `CHAIR${i + 1}`;
        const selected = selectedChairs.includes(chairName);
        const occupied = occupiedChairs.includes(chairName);
        return (
          <Chair
            key={chairName}
            chairName={chairName}
            geometryOuter={nodes[`chairs00${i + 1}_1`].geometry}
            geometryInner={nodes[`chairs00${i + 1}_2`].geometry}
            materialWalls={materials.walls}
            materialPlastic={materials.plastic}
            selected={selected}
            occupied={occupied}
            onPointerOver={() => handlePointerOver(chairName, occupiedChairs)}
            onPointerOut={handlePointerOut}
            onClick={handleClick(chairName)}
            clock={clock.current}
          />
        );
      })}
    </group>
  );
}

useGLTF.preload("/kitchen.glb");
