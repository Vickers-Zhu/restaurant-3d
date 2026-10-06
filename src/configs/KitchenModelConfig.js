// src/configs/KitchenModelConfig.js
import { RestaurantModelConfig } from "./ModelConfig.js";

export const kitchenModelConfig = new RestaurantModelConfig({
  modelPath: "/kitchen.glb",
  cameraFov: 40,
  selectableItems: [
    {
      type: "chair",
      id: "CHAIR1",
      geometries: [
        {
          geometryName: "chairs001_1",
          materialName: "walls",
        },
        {
          geometryName: "chairs001_2",
          materialName: "plastic",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR2",
      geometries: [
        {
          geometryName: "chairs002_1",
          materialName: "walls",
        },
        {
          geometryName: "chairs002_2",
          materialName: "plastic",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR3",
      geometries: [
        {
          geometryName: "chairs003_1",
          materialName: "walls",
        },
        {
          geometryName: "chairs003_2",
          materialName: "plastic",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR4",
      geometries: [
        {
          geometryName: "chairs004_1",
          materialName: "walls",
        },
        {
          geometryName: "chairs004_2",
          materialName: "plastic",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR5",
      geometries: [
        {
          geometryName: "chairs005_1",
          materialName: "walls",
        },
        {
          geometryName: "chairs005_2",
          materialName: "plastic",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR6",
      geometries: [
        {
          geometryName: "chairs006_1",
          materialName: "walls",
        },
        {
          geometryName: "chairs006_2",
          materialName: "plastic",
        },
      ],
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
