// src/components/Model/materials.js
import * as THREE from "three";

export const emissiveColorSelected = new THREE.Color(0x00ff00);
export const emissiveColorOccupied = new THREE.Color(0xff0000);

/**
 * Creates an emissive material based on the base material and emissive color.
 *
 * @param {THREE.Material} baseMaterial - The original material.
 * @param {THREE.Color} emissiveColor - The emissive color to apply.
 * @returns {THREE.MeshStandardMaterial} - The new emissive material.
 */
export const createEmissiveMaterial = (baseMaterial, emissiveColor) => {
  return new THREE.MeshStandardMaterial({
    ...baseMaterial,
    emissive: emissiveColor,
    emissiveIntensity: 0.5,
  });
};
