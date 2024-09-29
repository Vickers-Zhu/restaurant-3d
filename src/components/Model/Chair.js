// src/components/Model/Chair.js
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  createEmissiveMaterial,
  emissiveColorSelected,
  emissiveColorOccupied,
} from "./Materials";

/**
 * Chair component representing an individual chair in the scene.
 *
 * @param {object} props - Component props.
 * @returns {JSX.Element} - Rendered chair mesh.
 */
const Chair = ({
  chairName,
  geometryOuter,
  geometryInner,
  materialWalls,
  materialPlastic,
  selected,
  occupied,
  onPointerOver,
  onPointerOut,
  onClick,
  clock,
}) => {
  const meshRef = useRef();
  const innerMeshRef = useRef();

  // Create emissive materials
  const emissiveMaterialWallsSelected = createEmissiveMaterial(
    materialWalls,
    emissiveColorSelected
  );
  const emissiveMaterialWallsOccupied = createEmissiveMaterial(
    materialWalls,
    emissiveColorOccupied
  );
  const emissiveMaterialPlasticSelected = createEmissiveMaterial(
    materialPlastic,
    emissiveColorSelected
  );
  const emissiveMaterialPlasticOccupied = createEmissiveMaterial(
    materialPlastic,
    emissiveColorOccupied
  );

  // Update materials based on selection and occupation
  useEffect(() => {
    if (selected) {
      meshRef.current.material = emissiveMaterialWallsSelected;
      innerMeshRef.current.material = emissiveMaterialPlasticSelected;
    } else if (occupied) {
      meshRef.current.material = emissiveMaterialWallsOccupied;
      innerMeshRef.current.material = emissiveMaterialPlasticOccupied;
    } else {
      meshRef.current.material = materialWalls;
      innerMeshRef.current.material = materialPlastic;
    }
  }, [
    selected,
    occupied,
    emissiveMaterialWallsSelected,
    emissiveMaterialWallsOccupied,
    emissiveMaterialPlasticSelected,
    emissiveMaterialPlasticOccupied,
    materialWalls,
    materialPlastic,
  ]);

  // Animation for selected chairs
  useFrame(() => {
    if (selected) {
      const elapsed = clock.getElapsedTime();
      const scale = 1 + 0.05 * Math.sin(elapsed * 2);
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
      name={chairName}
    >
      <mesh ref={innerMeshRef} geometry={geometryInner} name={chairName} />
    </mesh>
  );
};

export default Chair;
