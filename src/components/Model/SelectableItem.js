/* eslint-disable no-unused-vars */
// src/components/Model/SelectableItem.js
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Generic component for any selectable item in the restaurant
 * Supports two-part geometry (outer/inner) with material changes for selection/occupied states
 */
const SelectableItem = ({
  itemConfig,
  geometryOuter,
  geometryInner,
  materialOuter,
  materialInner,
  modelConfig,
  selected,
  occupied,
  onPointerOver,
  onPointerOut,
  onClick,
  clock,
}) => {
  const meshRef = useRef();
  const innerMeshRef = useRef();
  const { id, type } = itemConfig;

  // Create materials for different states
  const emissiveMaterialOuterSelected = modelConfig.createEmissiveMaterial(
    materialOuter,
    modelConfig.selectionColor
  );
  const emissiveMaterialOuterOccupied = modelConfig.createEmissiveMaterial(
    materialOuter,
    modelConfig.occupiedColor
  );
  const emissiveMaterialInnerSelected = modelConfig.createEmissiveMaterial(
    materialInner,
    modelConfig.selectionColor
  );
  const emissiveMaterialInnerOccupied = modelConfig.createEmissiveMaterial(
    materialInner,
    modelConfig.occupiedColor
  );

  // Update materials based on state
  useEffect(() => {
    if (selected) {
      meshRef.current.material = emissiveMaterialOuterSelected;
      if (innerMeshRef.current) {
        innerMeshRef.current.material = emissiveMaterialInnerSelected;
      }
    } else if (occupied) {
      meshRef.current.material = emissiveMaterialOuterOccupied;
      if (innerMeshRef.current) {
        innerMeshRef.current.material = emissiveMaterialInnerOccupied;
      }
    } else {
      meshRef.current.material = materialOuter;
      if (innerMeshRef.current) {
        innerMeshRef.current.material = materialInner;
      }
    }
  }, [
    selected,
    occupied,
    emissiveMaterialOuterSelected,
    emissiveMaterialOuterOccupied,
    emissiveMaterialInnerSelected,
    emissiveMaterialInnerOccupied,
    materialOuter,
    materialInner,
  ]);

  // Animate selected items
  useFrame(() => {
    if (selected && meshRef.current) {
      const elapsed = clock.getElapsedTime();
      const scale =
        1 +
        modelConfig.animationScale *
          Math.sin(elapsed * modelConfig.animationSpeed);
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometryOuter}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      name={id}
    >
      {geometryInner && (
        <mesh ref={innerMeshRef} geometry={geometryInner} name={id} />
      )}
    </mesh>
  );
};

export default SelectableItem;
