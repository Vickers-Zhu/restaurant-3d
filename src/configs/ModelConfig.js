// src/configs/ModelConfig.js
import * as THREE from "three";

export class RestaurantModelConfig {
  constructor({
    modelPath,
    initialCameraPosition = [0, 10, 0],
    cameraFov = 40,
    cameraTarget = [0, 0, 0],
    selectableItems = [],
    staticItems = [],
    selectionColor = new THREE.Color(0x00ff00),
    occupiedColor = new THREE.Color(0xff0000),
    emissiveIntensity = 0.5,
    animationSpeed = 8,
    animationScale = 0.05,
  }) {
    this.modelPath = modelPath;
    this.initialCameraPosition = initialCameraPosition;
    this.cameraFov = cameraFov;
    this.cameraTarget = cameraTarget;
    this.selectableItems = selectableItems;
    this.staticItems = staticItems;
    this.selectionColor = selectionColor;
    this.occupiedColor = occupiedColor;
    this.emissiveIntensity = emissiveIntensity;
    this.animationSpeed = animationSpeed;
    this.animationScale = animationScale;
  }

  createEmissiveMaterial(baseMaterial, emissiveColor) {
    if (!baseMaterial) return null;

    // Clone the material properly to avoid copying internal properties
    const clonedMaterial = baseMaterial.clone();
    clonedMaterial.emissive = emissiveColor;
    clonedMaterial.emissiveIntensity = this.emissiveIntensity;
    clonedMaterial.toneMapped = false;

    return clonedMaterial;
  }
}
