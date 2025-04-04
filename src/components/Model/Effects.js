// src/components/Model/Effects.js
import React from "react";
import {
  EffectComposer,
  Outline,
  ToneMapping,
} from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Visual effects for highlighting selected and occupied items
 */
const Effects = ({
  selectedItems,
  occupiedItems,
  selectionColor,
  occupiedColor,
}) => {
  const isSelected = (name) => selectedItems.includes(name);
  const isOccupied = (name) => occupiedItems.includes(name);

  return (
    <EffectComposer>
      <Outline
        selection={[...selectedItems, ...occupiedItems]}
        edgeStrength={10}
        visibleEdgeColor={(obj) => {
          const name = obj.name;
          if (isSelected(name)) {
            return selectionColor;
          } else if (isOccupied(name)) {
            return occupiedColor;
          }
          return new THREE.Color(0x000000);
        }}
        hiddenEdgeColor={(obj) => {
          const name = obj.name;
          if (isSelected(name)) {
            return selectionColor;
          } else if (isOccupied(name)) {
            return occupiedColor;
          }
          return new THREE.Color(0x000000);
        }}
      />
      <ToneMapping />
    </EffectComposer>
  );
};

export default Effects;
