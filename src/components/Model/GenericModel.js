// src/components/Model/GenericModel.js
import React, { useRef, useCallback, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Clock } from "three";
import SelectableItem from "./SelectableItem";
import Effects from "./Effects";
import useDebouncedHover from "../../hooks/useDebouncedHover";
import { debugManager } from "../../debug/DebugManager";

export function GenericModel({
  modelConfig,
  selectedItems,
  occupiedItems,
  onItemClicked,
  enableDebug = false,
  ...props
}) {
  const { nodes, materials } = useGLTF(modelConfig.modelPath);
  const groupRef = useRef();
  const clock = useRef(new Clock());
  const { handlePointerOver, handlePointerOut } = useDebouncedHover(30);

  useEffect(() => {
    // Update debug manager with model data
    debugManager.setModelData({ nodes, materials });

    // Only run debug validation in development or when explicitly enabled
    if (enableDebug || process.env.NODE_ENV === "development") {
      debugManager.log("🔄 Model loaded", "info", {
        modelPath: modelConfig.modelPath,
        nodesCount: Object.keys(nodes).length,
        materialsCount: Object.keys(materials).length,
      });

      // Validate configuration
      debugManager.validateModelConfig(modelConfig);

      // Validate assets
      debugManager.validateModelAssets(nodes, materials, modelConfig);
    }
  }, [nodes, materials, modelConfig, enableDebug]);

  const handleClick = useCallback(
    (itemId) => (e) => {
      e.stopPropagation();

      debugManager.log(`🖱️ Item clicked: ${itemId}`, "info");

      if (onItemClicked) {
        onItemClicked(itemId);
      }

      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: "itemClicked", id: itemId })
        );
      }
    },
    [onItemClicked]
  );

  const prepareItemGeometries = (item) => {
    if (!item.geometries) {
      return [];
    }

    const validGeometries = [];

    item.geometries.forEach((geoConfig) => {
      const geometry = nodes[geoConfig.geometryName];
      const material = materials[geoConfig.materialName];

      if (!geometry || !material) {
        return;
      }

      validGeometries.push({
        geometry: geometry.geometry,
        material: material,
        geometryName: geoConfig.geometryName,
        materialName: geoConfig.materialName,
      });
    });

    return validGeometries;
  };

  return (
    <group ref={groupRef} {...props}>
      {/* Effects */}
      <Effects
        selectedItems={selectedItems}
        occupiedItems={occupiedItems}
        selectionColor={modelConfig.selectionColor}
        occupiedColor={modelConfig.occupiedColor}
      />

      {/* Static Items */}
      {modelConfig.staticItems.map((item) => {
        const geometry = nodes[item.geometryName];
        const material = materials[item.materialName];

        if (!geometry || !material) {
          return null;
        }

        return (
          <mesh
            key={item.name}
            geometry={geometry.geometry}
            material={material}
            castShadow
            receiveShadow
          />
        );
      })}

      {/* Selectable Items */}
      {modelConfig.selectableItems.map((item) => {
        const selected = selectedItems.includes(item.id);
        const occupied = occupiedItems.includes(item.id);
        const geometries = prepareItemGeometries(item);

        if (geometries.length === 0) {
          return null;
        }

        return (
          <SelectableItem
            key={item.id}
            itemConfig={item}
            geometries={geometries}
            materials={materials}
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

export const preloadModel = (modelConfig) => {
  useGLTF.preload(modelConfig.modelPath);
};
