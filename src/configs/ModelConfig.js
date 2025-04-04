// src/configs/ModelConfig.js
import * as THREE from "three";

/**
 * Base configuration for restaurant models
 * Extend this for each specific restaurant model
 */
export class RestaurantModelConfig {
  constructor({
    modelPath,
    initialCameraPosition = [0, 10, 0],
    cameraFov = 40,
    selectableItems = [],
    staticItems = [],
    selectionColor = new THREE.Color(0x00ff00),
    occupiedColor = new THREE.Color(0xff0000),
    emissiveIntensity = 0.5,
    animationSpeed = 2,
    animationScale = 0.05,
  }) {
    this.modelPath = modelPath;
    this.initialCameraPosition = initialCameraPosition;
    this.cameraFov = cameraFov;
    this.selectableItems = selectableItems;
    this.staticItems = staticItems;
    this.selectionColor = selectionColor;
    this.occupiedColor = occupiedColor;
    this.emissiveIntensity = emissiveIntensity;
    this.animationSpeed = animationSpeed;
    this.animationScale = animationScale;
  }

  // Helper method to create material with emissive properties
  createEmissiveMaterial(baseMaterial, emissiveColor) {
    return new THREE.MeshStandardMaterial({
      ...baseMaterial,
      emissive: emissiveColor,
      emissiveIntensity: this.emissiveIntensity,
    });
  }
}

/**
 * Kitchen model configuration (your original model)
 */
export const kitchenModelConfig = new RestaurantModelConfig({
  modelPath: "/kitchen.glb",
  selectableItems: [
    {
      type: "chair",
      id: "CHAIR1",
      outerGeometryName: "chairs001_1",
      innerGeometryName: "chairs001_2",
      outerMaterialName: "walls",
      innerMaterialName: "plastic",
    },
    {
      type: "chair",
      id: "CHAIR2",
      outerGeometryName: "chairs002_1",
      innerGeometryName: "chairs002_2",
      outerMaterialName: "walls",
      innerMaterialName: "plastic",
    },
    {
      type: "chair",
      id: "CHAIR3",
      outerGeometryName: "chairs003_1",
      innerGeometryName: "chairs003_2",
      outerMaterialName: "walls",
      innerMaterialName: "plastic",
    },
    {
      type: "chair",
      id: "CHAIR4",
      outerGeometryName: "chairs004_1",
      innerGeometryName: "chairs004_2",
      outerMaterialName: "walls",
      innerMaterialName: "plastic",
    },
    {
      type: "chair",
      id: "CHAIR5",
      outerGeometryName: "chairs005_1",
      innerGeometryName: "chairs005_2",
      outerMaterialName: "walls",
      innerMaterialName: "plastic",
    },
    {
      type: "chair",
      id: "CHAIR6",
      outerGeometryName: "chairs006_1",
      innerGeometryName: "chairs006_2",
      outerMaterialName: "walls",
      innerMaterialName: "plastic",
    },
  ],
  staticItems: [
    { name: "vase1", geometryName: "vase1", materialName: "gray" },
    { name: "bottle", geometryName: "bottle", materialName: "gray" },
    { name: "walls", geometryName: "walls_1", materialName: "floor" },
    {
      name: "plant_leaves",
      geometryName: "plant_1",
      materialName: "potted_plant_01_leaves",
    },
    {
      name: "plant_pot",
      geometryName: "plant_2",
      materialName: "potted_plant_01_pot",
    },
    {
      name: "cuttingboard",
      geometryName: "cuttingboard",
      materialName: "walls",
    },
    { name: "bowl", geometryName: "bowl", materialName: "walls" },
    { name: "carpet", geometryName: "carpet", materialName: "carpet" },
    { name: "table", geometryName: "table", materialName: "walls" },
    { name: "vase", geometryName: "vase", materialName: "gray" },
    { name: "kitchen", geometryName: "kitchen", materialName: "walls" },
    { name: "sink", geometryName: "sink", materialName: "chrome" },
  ],
});

/**
 * Example for another restaurant model
 * You would configure this based on the new 3D model structure
 */
export const modernRestaurantConfig = new RestaurantModelConfig({
  modelPath: "/modern-restaurant.glb",
  initialCameraPosition: [0, 8, 5],
  cameraFov: 45,
  selectableItems: [
    {
      type: "chair",
      id: "TABLE1_CHAIR1",
      outerGeometryName: "chair_1_outer",
      innerGeometryName: "chair_1_inner",
      outerMaterialName: "chair_material",
      innerMaterialName: "cushion_material",
    },
    // Add more selectable items
  ],
  staticItems: [
    // Add static items based on the model
  ],
  selectionColor: new THREE.Color(0x2196f3),
  occupiedColor: new THREE.Color(0xff5252),
});

// Registry of all available restaurant models
export const modelRegistry = {
  kitchen: kitchenModelConfig,
  modernRestaurant: modernRestaurantConfig,
  // Add more restaurant models here as they become available
};
