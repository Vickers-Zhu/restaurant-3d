// src/components/Model/GenericModel.js
import React, { useRef, useCallback, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Clock } from "three";
import SelectableItem from "./SelectableItem";
import Effects from "./Effects";
import useDebouncedHover from "../../hooks/useDebouncedHover";

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

  // Debug logging
  useEffect(() => {
    if (enableDebug) {
      console.log("=== MODEL DEBUG INFO ===");
      console.log("Available nodes:", Object.keys(nodes));
      console.log("Available materials:", Object.keys(materials));
      console.log("Model config:", modelConfig);

      console.log("\n=== STATIC ITEMS CHECK ===");
      modelConfig.staticItems.forEach((item, index) => {
        const hasGeometry = nodes[item.geometryName];
        const hasMaterial = materials[item.materialName];
        console.log(`Static Item ${index}: ${item.name}`);
        console.log(
          `  Geometry '${item.geometryName}': ${
            hasGeometry ? "✓ Found" : "✗ MISSING"
          }`
        );
        console.log(
          `  Material '${item.materialName}': ${
            hasMaterial ? "✓ Found" : "✗ MISSING"
          }`
        );
        if (!hasGeometry) {
          console.warn(
            `Missing geometry for static item: ${item.name} -> ${item.geometryName}`
          );
        }
        if (!hasMaterial) {
          console.warn(
            `Missing material for static item: ${item.name} -> ${item.materialName}`
          );
        }
      });

      console.log("\n=== SELECTABLE ITEMS CHECK ===");
      modelConfig.selectableItems.forEach((item, index) => {
        console.log(`Selectable Item ${index}: ${item.id} (${item.type})`);
        console.log(`  Geometries count: ${item.geometries?.length || 0}`);

        if (item.geometries) {
          item.geometries.forEach((geo, geoIndex) => {
            const hasGeometry = nodes[geo.geometryName];
            const hasMaterial = materials[geo.materialName];
            console.log(`    Part ${geoIndex}:`);
            console.log(
              `      Geometry '${geo.geometryName}': ${
                hasGeometry ? "✓ Found" : "✗ MISSING"
              }`
            );
            console.log(
              `      Material '${geo.materialName}': ${
                hasMaterial ? "✓ Found" : "✗ MISSING"
              }`
            );
            if (!hasGeometry) {
              console.warn(
                `Missing geometry for selectable item part: ${item.id} -> ${geo.geometryName}`
              );
            }
            if (!hasMaterial) {
              console.warn(
                `Missing material for selectable item part: ${item.id} -> ${geo.materialName}`
              );
            }
          });
        }
      });

      console.log("\n=== SAMPLE AVAILABLE NODES ===");
      Object.keys(nodes)
        .slice(0, 10)
        .forEach((key) => {
          console.log(`Node: ${key}`, nodes[key]);
        });

      console.log("\n=== SAMPLE AVAILABLE MATERIALS ===");
      Object.keys(materials)
        .slice(0, 10)
        .forEach((key) => {
          console.log(`Material: ${key}`, materials[key]);
        });
    }
  }, [nodes, materials, modelConfig, enableDebug]);

  const handleClick = useCallback(
    (itemId) => (e) => {
      e.stopPropagation();
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

  // Helper function to prepare geometries for an item
  const prepareItemGeometries = (item) => {
    if (!item.geometries) {
      if (enableDebug) {
        console.warn(`Item ${item.id} has no geometries array`);
      }
      return [];
    }

    return item.geometries
      .map((geoConfig) => {
        const geometry = nodes[geoConfig.geometryName];
        const material = materials[geoConfig.materialName];

        if (!geometry || !material) {
          if (enableDebug) {
            console.warn(
              `Skipping geometry part for item ${item.id}: missing ${
                !geometry ? "geometry" : "material"
              } (${geoConfig.geometryName} -> ${geoConfig.materialName})`
            );
          }
          return null;
        }

        return {
          geometry: geometry.geometry,
          material: material,
          geometryName: geoConfig.geometryName,
          materialName: geoConfig.materialName,
        };
      })
      .filter(Boolean);
  };

  return (
    <group ref={groupRef} {...props}>
      {/* Post-processing effects */}
      <Effects
        selectedItems={selectedItems}
        occupiedItems={occupiedItems}
        selectionColor={modelConfig.selectionColor}
        occupiedColor={modelConfig.occupiedColor}
      />

      {/* Static items */}
      {modelConfig.staticItems.map((item) => {
        const geometry = nodes[item.geometryName];
        const material = materials[item.materialName];

        if (!geometry || !material) {
          if (enableDebug) {
            console.warn(
              `Skipping static item ${item.name}: missing ${
                !geometry ? "geometry" : "material"
              }`
            );
          }
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

      {/* Selectable items */}
      {modelConfig.selectableItems.map((item) => {
        const selected = selectedItems.includes(item.id);
        const occupied = occupiedItems.includes(item.id);
        const geometries = prepareItemGeometries(item);

        if (geometries.length === 0) {
          if (enableDebug) {
            console.warn(
              `Skipping selectable item ${item.id}: no valid geometries`
            );
          }
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
