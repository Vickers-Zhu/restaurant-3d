import { useState, useCallback } from "react"
import { debounce } from "lodash"
import { useGLTF, useEnvironment, Text } from "@react-three/drei"
import { Select } from "@react-three/postprocessing"


export function Model(props) {
  const { nodes, materials } = useGLTF("/kitchen-transformed.glb")
  console.log(nodes)
  // Load environment (using it only on the chairs, for reflections)
  const env = useEnvironment({ preset: "city" })
  // Hover state
  const [hovered, hover] = useState(null)
  // Debounce hover a bit to stop the ticker from being erratic
  const debouncedHover = useCallback(debounce(hover, 30), [])
  const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name))
  // Get the priced item
  return (
    <>
      <group {...props}>
        <mesh geometry={nodes.vase1.geometry} material={materials.gray} material-envMap={env} />
        <mesh geometry={nodes.bottle.geometry} material={materials.gray} material-envMap={env} />
        <mesh geometry={nodes.walls_1.geometry} material={materials.floor} />
        <mesh geometry={nodes.walls_2.geometry} material={materials.walls} />
        <mesh geometry={nodes.plant_1.geometry} material={materials.potted_plant_01_leaves} />
        <mesh geometry={nodes.plant_2.geometry} material={materials.potted_plant_01_pot} />
        <mesh geometry={nodes.cuttingboard.geometry} material={materials.walls} />
        <mesh geometry={nodes.bowl.geometry} material={materials.walls} />
        <Select enabled={hovered === "BRÖNDEN"} onPointerOver={over("BRÖNDEN")} onPointerOut={() => debouncedHover(null)}>
          <mesh geometry={nodes.carpet.geometry} material={materials.carpet} />
        </Select>
        <Select enabled={hovered === "VOXLÖV"} onPointerOver={over("VOXLÖV")} onPointerOut={() => debouncedHover(null)}>
          <mesh geometry={nodes.table.geometry} material={materials.walls} material-envMap={env} material-envMapIntensity={0.5} />
        </Select>
        <Select enabled={hovered === "FANBYN"} onPointerOver={over("FANBYN")} onPointerOut={() => debouncedHover(null)}>
          <mesh geometry={nodes.chairs_1.geometry} material={materials.walls} />
          <mesh geometry={nodes.chairs_2.geometry} material={materials.plastic} material-color="#1a1a1a" material-envMap={env} />
        </Select>
        <Select enabled={hovered === "LIVSVERK"} onPointerOver={over("LIVSVERK")} onPointerOut={() => debouncedHover(null)}>
          <mesh geometry={nodes.vase.geometry} material={materials.gray} material-envMap={env} />
        </Select>
        <Select enabled={hovered === "SKAFTET"} onPointerOver={over("SKAFTET")} onPointerOut={() => debouncedHover(null)}>
          <mesh geometry={nodes.lamp_socket.geometry} material={materials.gray} material-envMap={env} />
          <mesh geometry={nodes.lamp.geometry} material={materials.gray} />
          <mesh geometry={nodes.lamp_cord.geometry} material={materials.gray} material-envMap={env} />
        </Select>
        <mesh geometry={nodes.kitchen.geometry} material={materials.walls} />
        <mesh geometry={nodes.sink.geometry} material={materials.chrome} material-envMap={env} />
      </group>
      {/** Forward the price to the ticker component */}
    </>
  )
}

useGLTF.preload('/kitchen-transformed.glb')
