// src/web-app/src/components/Model.js
import React, { useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Outline, ToneMapping } from "@react-three/postprocessing";

export function Model({ selectedChairs, onSelectChair, ...props }) {
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
      debouncedHover(name); // Set the name of the hovered chair
    },
    [debouncedHover]
  );

  const handlePointerOut = useCallback(() => {
    debouncedHover(null);
  }, [debouncedHover]);

  const handleClick = useCallback(
    (chairName) => (e) => {
      e.stopPropagation();
      // Invoke the passed callback to update selected chairs
      if (onSelectChair) {
        onSelectChair(chairName);
      }
    },
    [onSelectChair]
  );

  // For breathing effect
  const clock = useRef(new THREE.Clock());

  // Define a ref for each chair to animate
  const chairRefs = useRef({});

  // Predefine emissive materials to avoid creating them every frame
  const emissiveColor = new THREE.Color(0x00ff00); // Green color

  const emissiveMaterialWalls = new THREE.MeshStandardMaterial({
    ...materials.walls,
    emissive: emissiveColor,
    emissiveIntensity: 0.5,
  });

  const emissiveMaterialPlastic = new THREE.MeshStandardMaterial({
    ...materials.plastic,
    emissive: emissiveColor,
    emissiveIntensity: 0.5,
  });

  useFrame(() => {
    const elapsed = clock.current.getElapsedTime();
    selectedChairs.forEach((chairName) => {
      const mesh = chairRefs.current[chairName];
      if (mesh) {
        // Breathing scale between 1 and 1.05
        const scale = 1 + 0.05 * Math.sin(elapsed * 2); // Adjust speed as needed
        mesh.scale.set(scale, scale, scale);
      }
    });
  });

  const isSelected = (chairName) => selectedChairs.includes(chairName);

  return (
    <group ref={groupRef} {...props}>
      <EffectComposer>
        <Outline
          selection={[...selectedChairs]}
          edgeStrength={10}
          visibleEdgeColor={emissiveColor}
          hiddenEdgeColor={emissiveColor}
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

      {/* Chairs with interaction, selection, and effects */}
      {Array.from({ length: 6 }, (_, i) => {
        const chairName = `CHAIR${i + 1}`;
        return (
          <mesh
            key={chairName}
            geometry={nodes[`chairs00${i + 1}_1`].geometry}
            material={
              isSelected(chairName)
                ? emissiveMaterialWalls
                : materials.walls
            }
            onPointerOver={handlePointerOver(chairName)}
            onPointerOut={handlePointerOut}
            onClick={handleClick(chairName)}
            ref={(mesh) => (chairRefs.current[chairName] = mesh)} // Assign ref
          >
            {/* Inner mesh */}
            <mesh
              geometry={nodes[`chairs00${i + 1}_2`].geometry}
              material={
                isSelected(chairName)
                  ? emissiveMaterialPlastic
                  : materials.plastic
              }
            />
          </mesh>
        );
      })}
    </group>
  );
}

useGLTF.preload("/kitchen.glb");