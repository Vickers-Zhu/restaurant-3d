// src/components/Model/Effects.js
import React from "react";
import {
  EffectComposer,
  Outline,
  ToneMapping,
} from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Effects component to apply post-processing effects like outlines and tone mapping.
 *
 * @param {object} props - Component props.
 * @returns {JSX.Element} - Rendered effects.
 */
const Effects = ({
  selectedChairs,
  occupiedChairs,
  emissiveColorSelected,
  emissiveColorOccupied,
}) => {
  const isSelected = (name) => selectedChairs.includes(name);
  const isOccupied = (name) => occupiedChairs.includes(name);

  return (
    <EffectComposer>
      <Outline
        selection={[...selectedChairs, ...occupiedChairs]}
        edgeStrength={10}
        visibleEdgeColor={(obj) => {
          const name = obj.name;
          if (isSelected(name)) {
            return emissiveColorSelected;
          } else if (isOccupied(name)) {
            return emissiveColorOccupied;
          }
          return new THREE.Color(0x000000);
        }}
        hiddenEdgeColor={(obj) => {
          const name = obj.name;
          if (isSelected(name)) {
            return emissiveColorSelected;
          } else if (isOccupied(name)) {
            return emissiveColorOccupied;
          }
          return new THREE.Color(0x000000);
        }}
      />
      <ToneMapping />
    </EffectComposer>
  );
};

export default Effects;
