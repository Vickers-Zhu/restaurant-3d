/* eslint-disable no-unused-vars */
// src/components/Model/GenericModel.js
import React, { useRef, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import { Clock } from "three";
import SelectableItem from "./SelectableItem";
import Effects from "./Effects";
import useDebouncedHover from "../../hooks/useDebouncedHover";

/**
 * Generic restaurant model component that works with any model configuration
 */
export function GenericModel({
  modelConfig,
  selectedItems,
  occupiedItems,
  onItemClicked,
  ...props
}) {
  // Load the 3D model specified in the configuration
  const { nodes, materials } = useGLTF(modelConfig.modelPath);
  const groupRef = useRef();
  const clock = useRef(new Clock());

  const { hovered, handlePointerOver, handlePointerOut } =
    useDebouncedHover(30);

  // Handle click events on selectable items
  const handleClick = useCallback(
    (itemId) => (e) => {
      e.stopPropagation();
      // Notify parent component
      if (onItemClicked) {
        onItemClicked(itemId);
      }

      // Communicate with React Native if available
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: "itemClicked", id: itemId })
        );
      }
    },
    [onItemClicked]
  );

  return (
    <group ref={groupRef} {...props}>
      {/* Visual effects for selected and occupied items */}
      <Effects
        selectedItems={selectedItems}
        occupiedItems={occupiedItems}
        selectionColor={modelConfig.selectionColor}
        occupiedColor={modelConfig.occupiedColor}
      />

      {/* Render static (non-selectable) items */}
      {modelConfig.staticItems.map((item) => (
        <mesh
          key={item.name}
          geometry={nodes[item.geometryName].geometry}
          material={materials[item.materialName]}
        />
      ))}

      {/* Render selectable items */}
      {modelConfig.selectableItems.map((item) => {
        const selected = selectedItems.includes(item.id);
        const occupied = occupiedItems.includes(item.id);

        return (
          <SelectableItem
            key={item.id}
            itemConfig={item}
            geometryOuter={nodes[item.outerGeometryName].geometry}
            geometryInner={
              item.innerGeometryName
                ? nodes[item.innerGeometryName].geometry
                : null
            }
            materialOuter={materials[item.outerMaterialName]}
            materialInner={
              item.innerMaterialName ? materials[item.innerMaterialName] : null
            }
            modelConfig={modelConfig}
            selected={selected}
            occupied={occupied}
            onPointerOver={() => handlePointerOver(item.id, occupiedItems)}
            onPointerOut={handlePointerOut}
            onClick={handleClick(item.id)}
            clock={clock.current}
          />
        );
      })}
    </group>
  );
}

// Function to preload a model based on configuration
export const preloadModel = (modelConfig) => {
  useGLTF.preload(modelConfig.modelPath);
};
