// src/components/Model/SelectableItem.js
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const SelectableItem = ({
  itemConfig,
  geometries,
  materials,
  modelConfig,
  selected,
  occupied,
  onPointerOver,
  onPointerOut,
  onClick,
  clock,
}) => {
  const groupRef = useRef();
  const meshRefs = useRef([]);
  const { id } = itemConfig;

  // Create emissive materials for each geometry part
  const emissiveMaterials = geometries.map(({ materialName }) => {
    const baseMaterial = materials[materialName];
    return {
      selected: modelConfig.createEmissiveMaterial(
        baseMaterial,
        modelConfig.selectionColor
      ),
      occupied: modelConfig.createEmissiveMaterial(
        baseMaterial,
        modelConfig.occupiedColor
      ),
      original: baseMaterial,
    };
  });

  // Update materials based on state
  useEffect(() => {
    meshRefs.current.forEach((meshRef, index) => {
      if (!meshRef.current) return;

      const materialSet = emissiveMaterials[index];
      if (!materialSet) return;

      if (selected) {
        meshRef.current.material = materialSet.selected;
      } else if (occupied) {
        meshRef.current.material = materialSet.occupied;
      } else {
        meshRef.current.material = materialSet.original;
        if (meshRef.current) {
          meshRef.current.scale.set(1, 1, 1);
        }
      }
    });
  }, [selected, occupied, emissiveMaterials]);

  // Animation frame updates
  useFrame(() => {
    if (selected && groupRef.current) {
      const elapsed = clock.getElapsedTime();
      const intensity =
        modelConfig.emissiveIntensity *
        (0.8 + 0.2 * Math.sin(elapsed * modelConfig.animationSpeed));

      meshRefs.current.forEach((meshRef) => {
        if (meshRef.current && meshRef.current.material.emissive) {
          meshRef.current.material.emissiveIntensity = intensity;
        }
      });
    } else if (occupied && groupRef.current) {
      // Occupied items have static emissive intensity (no breathing animation)
      meshRefs.current.forEach((meshRef) => {
        if (meshRef.current && meshRef.current.material.emissive) {
          meshRef.current.material.emissiveIntensity =
            modelConfig.emissiveIntensity * 0.7;
        }
      });
    }
  });

  // Ensure we have enough refs for all geometries
  useEffect(() => {
    meshRefs.current = meshRefs.current.slice(0, geometries.length);
    while (meshRefs.current.length < geometries.length) {
      meshRefs.current.push(React.createRef());
    }
  }, [geometries.length]);

  return (
    <group
      ref={groupRef}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      name={id}
    >
      {geometries.map((geometryConfig, index) => {
        if (!geometryConfig.geometry || !geometryConfig.material) {
          return null;
        }

        return (
          <mesh
            key={`${id}-${index}`}
            ref={meshRefs.current[index]}
            geometry={geometryConfig.geometry}
            material={geometryConfig.material}
            name={`${id}-part-${index}`}
            castShadow
            receiveShadow
          />
        );
      })}
    </group>
  );
};

export default SelectableItem;
