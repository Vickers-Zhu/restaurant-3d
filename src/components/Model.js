// src/components/Model.js
import React, { useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  EffectComposer,
  Outline,
  ToneMapping,
} from "@react-three/postprocessing";

export function Model({ selectedChairs, occupiedChairs, ...props }) {
  const { nodes, materials } = useGLTF("/kitchen.glb");
  const groupRef = useRef();

  const [hovered, setHovered] = useState(null);

  const debouncedHover = useCallback(
    debounce((name) => {
      setHovered(name);
    }, 30),
    []
  );

  const handlePointerOver = useCallback(
    (name) => (e) => {
      e.stopPropagation();
      if (occupiedChairs.includes(name)) {
        return;
      }
      debouncedHover(name);
    },
    [debouncedHover, occupiedChairs]
  );

  const handlePointerOut = useCallback(() => {
    debouncedHover(null);
  }, [debouncedHover]);

  const handleClick = useCallback(
    (name) => (e) => {
      e.stopPropagation();
      // Toggle chair selection and send message to React Native
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: "chairClicked", name })
        );
      }
    },
    []
  );

  const clock = useRef(new THREE.Clock());

  const chairRefs = useRef({});

  const emissiveColorSelected = new THREE.Color(0x00ff00);
  const emissiveColorOccupied = new THREE.Color(0xff0000);

  const emissiveMaterialWallsSelected = new THREE.MeshStandardMaterial({
    ...materials.walls,
    emissive: emissiveColorSelected,
    emissiveIntensity: 0.5,
  });

  const emissiveMaterialPlasticSelected = new THREE.MeshStandardMaterial({
    ...materials.plastic,
    emissive: emissiveColorSelected,
    emissiveIntensity: 0.5,
  });

  const emissiveMaterialWallsOccupied = new THREE.MeshStandardMaterial({
    ...materials.walls,
    emissive: emissiveColorOccupied,
    emissiveIntensity: 0.5,
  });

  const emissiveMaterialPlasticOccupied = new THREE.MeshStandardMaterial({
    ...materials.plastic,
    emissive: emissiveColorOccupied,
    emissiveIntensity: 0.5,
  });

  useFrame(() => {
    const elapsed = clock.current.getElapsedTime();
    selectedChairs.forEach((chairName) => {
      const mesh = chairRefs.current[chairName];
      if (mesh) {
        const scale = 1 + 0.05 * Math.sin(elapsed * 2);
        mesh.scale.set(scale, scale, scale);
      }
    });
  });

  const isSelected = (chairName) => selectedChairs.includes(chairName);
  const isOccupied = (chairName) => occupiedChairs.includes(chairName);

  return (
    <group ref={groupRef} {...props}>
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

      {/* Static meshes */}
      <mesh geometry={nodes.vase1.geometry} material={materials.gray} />
      <mesh geometry={nodes.bottle.geometry} material={materials.gray} />
      <mesh geometry={nodes.walls_1.geometry} material={materials.floor} />
      <mesh
        geometry={nodes.plant_1.geometry}
        material={materials.potted_plant_01_leaves}
      />
      <mesh
        geometry={nodes.plant_2.geometry}
        material={materials.potted_plant_01_pot}
      />
      <mesh geometry={nodes.cuttingboard.geometry} material={materials.walls} />
      <mesh geometry={nodes.bowl.geometry} material={materials.walls} />
      <mesh geometry={nodes.carpet.geometry} material={materials.carpet} />
      <mesh geometry={nodes.table.geometry} material={materials.walls} />
      <mesh geometry={nodes.vase.geometry} material={materials.gray} />
      <mesh geometry={nodes.kitchen.geometry} material={materials.walls} />
      <mesh geometry={nodes.sink.geometry} material={materials.chrome} />

      {/* Chairs with selection and occupied effects */}
      {Array.from({ length: 6 }, (_, i) => {
        const chairName = `CHAIR${i + 1}`;
        const selected = isSelected(chairName);
        const occupied = isOccupied(chairName);
        return (
          <mesh
            key={chairName}
            geometry={nodes[`chairs00${i + 1}_1`].geometry}
            material={
              selected
                ? emissiveMaterialWallsSelected
                : occupied
                ? emissiveMaterialWallsOccupied
                : materials.walls
            }
            onPointerOver={handlePointerOver(chairName)}
            onPointerOut={handlePointerOut}
            onClick={handleClick(chairName)}
            ref={(mesh) => (chairRefs.current[chairName] = mesh)}
            name={chairName}
          >
            {/* Inner mesh */}
            <mesh
              geometry={nodes[`chairs00${i + 1}_2`].geometry}
              material={
                selected
                  ? emissiveMaterialPlasticSelected
                  : occupied
                  ? emissiveMaterialPlasticOccupied
                  : materials.plastic
              }
              name={chairName}
            />
          </mesh>
        );
      })}
    </group>
  );
}

useGLTF.preload("/kitchen.glb");
