// src/configs/CafeModelConfig.js
import { RestaurantModelConfig } from "./ModelConfig";
import * as THREE from "three";

export const cafeModelConfig = new RestaurantModelConfig({
  modelPath: "/Cafe.gltf",
  cameraTarget: [-5, 10, 0],
  initialCameraPosition: [-5, 10, 20],
  cameraFov: 50,
  selectionColor: new THREE.Color(0x00ff00),
  occupiedColor: new THREE.Color(0xff0000),
  emissiveIntensity: 10.0,
  animationSpeed: 3,
  selectableItems: [
    {
      type: "sofa",
      id: "SOFA01_TABLE01",
      geometries: [
        {
          geometryName: "SOFA01_TABLE01",
          materialName: "meridienne_001___mat_tissus078_bissg",
        },
      ],
    },
    {
      type: "sofa",
      id: "SOFA01_TABLE02",
      geometries: [
        {
          geometryName: "SOFA01_TABLE02",
          materialName: "meridienne_001___mat_tissus078_bissg",
        },
      ],
    },
    {
      type: "sofa",
      id: "SOFA01_TABLE03",
      geometries: [
        {
          geometryName: "SOFA01_TABLE03",
          materialName: "meridienne_001___mat_tissus078_bissg",
        },
      ],
    },
    {
      type: "sofa",
      id: "SOFA02_TABLE02",
      geometries: [
        {
          geometryName: "SOFA02_TABLE02",
          materialName: "meridienne_001___mat_tissus078_bissg",
        },
      ],
    },
    {
      type: "sofa",
      id: "SOFA02_TABLE03",
      geometries: [
        {
          geometryName: "SOFA02_TABLE03",
          materialName: "meridienne_001___mat_tissus078_bissg",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR01_COUNTER",
      geometries: [
        {
          geometryName: "CHAIR01_COUNTER_1",
          materialName: "pack_004_cuisine_001_chaise___pied",
        },
        {
          geometryName: "CHAIR01_COUNTER_2",
          materialName: "pack_004_cuisine_001_chaise___rond",
        },
        {
          geometryName: "CHAIR01_COUNTER_3",
          materialName: "pack_004_cuisine_001_chaise___tour",
        },
        {
          geometryName: "CHAIR01_COUNTER_4",
          materialName: "pack_004_cuisine_001_chaise___tubes",
        },
        {
          geometryName: "CHAIR01_COUNTER_5",
          materialName: "bois_046",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR01_TABLE01",
      geometries: [
        {
          geometryName: "CHAIR01_TABLE01_1",
          materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
        },
        {
          geometryName: "CHAIR01_TABLE01_2",
          materialName: "bleu_002",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR01_TABLE05",
      geometries: [
        {
          geometryName: "CHAIR01_TABLE05_1",
          materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
        },
        {
          geometryName: "CHAIR01_TABLE05_2",
          materialName: "bleu_002",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR01_TABLE06",
      geometries: [
        {
          geometryName: "CHAIR01_TABLE06_1",
          materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
        },
        {
          geometryName: "CHAIR01_TABLE06_2",
          materialName: "bleu_012",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR02_COUNTER",
      geometries: [
        {
          geometryName: "CHAIR02_COUNTER_1",
          materialName: "pack_004_cuisine_001_chaise___tour",
        },
        {
          geometryName: "CHAIR02_COUNTER_2",
          materialName: "bois_046",
        },
        {
          geometryName: "CHAIR02_COUNTER_3",
          materialName: "pack_004_cuisine_001_chaise___tubes",
        },
        {
          geometryName: "CHAIR02_COUNTER_4",
          materialName: "pack_004_cuisine_001_chaise___pied",
        },
        {
          geometryName: "CHAIR02_COUNTER_5",
          materialName: "pack_004_cuisine_001_chaise___rond",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR02_TABLE01",
      geometries: [
        {
          geometryName: "CHAIR02_TABLE01_1",
          materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
        },
        {
          geometryName: "CHAIR02_TABLE01_2",
          materialName: "bleu_012",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR02_TABLE05",
      geometries: [
        {
          geometryName: "CHAIR02_TABLE05_1",
          materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
        },
        {
          geometryName: "CHAIR02_TABLE05_2",
          materialName: "bleu_004",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR02_TABLE06",
      geometries: [
        {
          geometryName: "CHAIR02_TABLE06_1",
          materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
        },
        {
          geometryName: "CHAIR02_TABLE06_2",
          materialName: "bleu_004",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR03_TABLE05",
      geometries: [
        {
          geometryName: "CHAIR03_TABLE05_1",
          materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
        },
        {
          geometryName: "CHAIR03_TABLE05_2",
          materialName: "bleu_012",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR03_TABLE06",
      geometries: [
        {
          geometryName: "CHAIR03_TABLE06_1",
          materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
        },
        {
          geometryName: "CHAIR03_TABLE06_2",
          materialName: "bleu_002",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR04_TABLE05",
      geometries: [
        {
          geometryName: "CHAIR04_TABLE05_1",
          materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
        },
        {
          geometryName: "CHAIR04_TABLE05_2",
          materialName: "bleu_002",
        },
      ],
    },
    {
      type: "chair",
      id: "CHAIR04_TABLE06",
      geometries: [
        {
          geometryName: "CHAIR04_TABLE06_1",
          materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
        },
        {
          geometryName: "CHAIR04_TABLE06_2",
          materialName: "bleu_004",
        },
      ],
    },
    {
      type: "sofa",
      id: "SOFA01_TABLE04",
      geometries: [
        {
          geometryName: "SOFA01_TABLE04_1",
          materialName: "tissus_078",
        },
        {
          geometryName: "SOFA01_TABLE04_2",
          materialName: "meridienne_001___mat_tissus078_bissg",
        },
      ],
    },
    {
      type: "sofa",
      id: "SOFA02_TABLE04",
      geometries: [
        {
          geometryName: "SOFA02_TABLE04_1",
          materialName: "tissus_096",
        },
        {
          geometryName: "SOFA02_TABLE04_2",
          materialName: "meridienne_001___mat_tissus078_bissg",
        },
      ],
    },
  ],
  staticItems: [
    // Wood floor items
    {
      name: "wood_floor_1",
      geometryName: "Object_11",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_2",
      geometryName: "Object_11001",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_3",
      geometryName: "Object_11002",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_4",
      geometryName: "Object_11003",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_5",
      geometryName: "Object_11004",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_6",
      geometryName: "Object_11005",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_7",
      geometryName: "Object_11006",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_8",
      geometryName: "Object_11007",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_9",
      geometryName: "Object_11008",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_10",
      geometryName: "Object_11009",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_11",
      geometryName: "Object_11010",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_12",
      geometryName: "Object_11011",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_13",
      geometryName: "Object_11012",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_14",
      geometryName: "Object_11013",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_15",
      geometryName: "Object_11014",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_16",
      geometryName: "Object_11015",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_17",
      geometryName: "Object_11016",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_18",
      geometryName: "Object_11017",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_19",
      geometryName: "Object_11018",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_20",
      geometryName: "Object_11019",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_21",
      geometryName: "Object_11020",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_22",
      geometryName: "Object_11021",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_23",
      geometryName: "Object_11022",
      materialName: "bois_046",
    },
    {
      name: "wood_floor_24",
      geometryName: "Object_11023",
      materialName: "bois_046",
    },

    // Wood surfaces
    {
      name: "wood_surface_1",
      geometryName: "Object_12",
      materialName: "bois_054",
    },
    {
      name: "wood_surface_2",
      geometryName: "Object_13",
      materialName: "bois_055",
    },
    {
      name: "wood_surface_3",
      geometryName: "Object_14",
      materialName: "bois_089_Room_Entity_Material",
    },
    {
      name: "wood_surface_4",
      geometryName: "Object_15",
      materialName: "bois_110_Room_Entity_Material",
    },

    // Structural elements
    {
      name: "wooden_elements",
      geometryName: "Object_16",
      materialName: "d671effe7f2cd3fb8e0c119e09825243",
    },
    {
      name: "chair_metal_base",
      geometryName: "Object_17",
      materialName: "eames_chair_dining_2____eames_chair_dinning_bmetal",
    },
    {
      name: "chair_wood_base",
      geometryName: "Object_18",
      materialName: "eames_chair_dining_2____eames_chair_dinning_bwood",
    },
    {
      name: "main_floor",
      geometryName: "Object_19",
      materialName: "enduit_004_Room_Entity_Material",
    },

    // Walls
    {
      name: "wall_material_1",
      geometryName: "Object_2",
      materialName: "700-nw_ovcol81592bcolpic05contpic10",
    },
    {
      name: "walls",
      geometryName: "Object_20",
      materialName: "enduit_004_Wall_Entity_Material",
    },
    {
      name: "tiled_area",
      geometryName: "Object_21",
      materialName:
        "faience_041_ovcol999999colpic12contpic01_Room_Entity_Material",
    },
    {
      name: "gray_surface_1",
      geometryName: "Object_22",
      materialName: "gris_004",
    },
    {
      name: "gray_wall",
      geometryName: "Object_23",
      materialName: "gris_004_Wall_Entity_Material",
    },
    {
      name: "beige_wall_1",
      geometryName: "Object_3",
      materialName: "beige_004",
    },
    {
      name: "beige_wall_2",
      geometryName: "Object_4",
      materialName: "beige_004_Wall_Entity_Material",
    },
    {
      name: "beige_wall_3",
      geometryName: "Object_5",
      materialName: "beige_005_Wall_Entity_Material",
    },
    {
      name: "beige_wall_4",
      geometryName: "Object_6",
      materialName: "beige_006_Wall_Entity_Material",
    },
    {
      name: "ocre_wall",
      geometryName: "Object_52",
      materialName: "ocre_001_Wall_Entity_Material",
    },

    // Kitchen equipment
    {
      name: "hood_element_1",
      geometryName: "Object_24",
      materialName: "hotte_001___material__177",
    },
    {
      name: "hood_element_2",
      geometryName: "Object_25",
      materialName: "hotte_001___material__178",
    },
    {
      name: "hood_element_3",
      geometryName: "Object_26",
      materialName: "hotte_001___material__179",
    },
    {
      name: "pizza_decoration",
      geometryName: "Object_27",
      materialName:
        "kisspng-pizza-knight-italian-cuisine-vegetarian-cuisine-fo-food",
    },
    {
      name: "kitchen_cabinet_1",
      geometryName: "Object_28",
      materialName: "kitchen_classic_style_base_cabinet_007___phong2sg",
    },
    {
      name: "kitchen_cabinet_2",
      geometryName: "Object_29",
      materialName: "kitchen_classic_style_base_cabinet_007___phong8sg",
    },
    {
      name: "kitchen_corner_1",
      geometryName: "Object_30",
      materialName: "kitchen_classic_style_base_corner_001___phong2sg",
    },
    {
      name: "kitchen_corner_2",
      geometryName: "Object_31",
      materialName: "kitchen_classic_style_base_corner_001___phong8sg",
    },
    {
      name: "dishwasher",
      geometryName: "Object_32",
      materialName: "kitchen_classic_style_dishwasher_000___phong5sg",
    },
    {
      name: "dishwasher_panel",
      geometryName: "Object_33",
      materialName: "kitchen_classic_style_dishwasher_000___phong8sg",
    },
    {
      name: "dishwasher_front",
      geometryName: "Object_34",
      materialName: "kitchen_classic_style_dishwasher_000___phong9sg",
    },
    {
      name: "oven_body",
      geometryName: "Object_35",
      materialName: "kitchen_classic_style_double_oven_000___phong4sg",
    },
    {
      name: "oven_panel",
      geometryName: "Object_36",
      materialName: "kitchen_classic_style_double_oven_000___phong5sg",
    },
    {
      name: "oven_knobs",
      geometryName: "Object_37",
      materialName: "kitchen_classic_style_double_oven_000___phong6sg",
    },
    {
      name: "oven_handle",
      geometryName: "Object_38",
      materialName: "kitchen_classic_style_double_oven_000___phong7sg",
    },
    {
      name: "oven_glass",
      geometryName: "Object_39",
      materialName: "kitchen_classic_style_double_oven_000___vitre",
    },
    {
      name: "sink_basin",
      geometryName: "Object_42",
      materialName: "lavabo_004___lambert3sg",
    },
    {
      name: "sink_faucet",
      geometryName: "Object_43",
      materialName: "lavabo_004___phong1sg",
    },

    // Exterior elements
    {
      name: "exterior_wall",
      geometryName: "Object_40",
      materialName: "lambris_ext_003",
    },
    {
      name: "exterior_wall_2",
      geometryName: "Object_41",
      materialName: "lambris_ext_004",
    },

    // Food and decorative items
    {
      name: "food_pasta",
      geometryName: "Object_44",
      materialName: "makaroniiztverdixsortovpshenitsikakievib_7ff8e298",
    },
    {
      name: "sofa_metal_frame",
      geometryName: "Object_45",
      materialName: "meridienne_001___bis_mat_metalbasique004sg",
    },
    {
      name: "sofa_fabric_base",
      geometryName: "Object_46",
      materialName: "meridienne_001___mat_tissus078_bissg",
    },
    {
      name: "rusty_metal",
      geometryName: "Object_47",
      materialName: "metal_rouille",
    },

    // Plants and vegetation
    {
      name: "plant_wall_1",
      geometryName: "Object_48",
      materialName: "mur_vegetal_off___phong150",
    },
    {
      name: "plant_wall_2",
      geometryName: "Object_49",
      materialName: "mur_vegetal_off___phong151",
    },
    {
      name: "plant_wall_3",
      geometryName: "Object_50",
      materialName: "mur_vegetal_off___phong30",
    },
    {
      name: "plant_wall_4",
      geometryName: "Object_51",
      materialName: "mur_vegetal_off___phong31",
    },
    {
      name: "plant_trunk",
      geometryName: "Object_65",
      materialName: "plante_interieur_off___bis_palmier_tronc2",
    },
    {
      name: "plant_1",
      geometryName: "Object_66",
      materialName: "plante_interieur_off___phong56",
    },
    {
      name: "plant_2",
      geometryName: "Object_67",
      materialName: "plante_interieur_off___phong57",
    },
    {
      name: "plant_3",
      geometryName: "Object_68",
      materialName: "plante_interieur_off___phong80",
    },

    // Miscellaneous
    {
      name: "orange_accent",
      geometryName: "Object_53",
      materialName: "orange_003",
    },
    {
      name: "paper_towel_1",
      geometryName: "Object_54",
      materialName: "pack_002_sdb_deroule_papier___01___defaulta",
    },
    {
      name: "paper_towel_2",
      geometryName: "Object_55",
      materialName: "pack_002_sdb_deroule_papier___01___defaulte",
    },
    {
      name: "paper_towel_3",
      geometryName: "Object_56",
      materialName: "pack_002_sdb_deroule_papier___01___defaultz",
    },
    {
      name: "counter_table",
      geometryName: "Object_57",
      materialName:
        "pack_003_cuisine_001_table___mat_pack_003_cuisine_001_table_tab",
    },
    {
      name: "wall_art",
      geometryName: "Object_62",
      materialName: "pack_004_salon_002_tableau___enduit1",
    },
    {
      name: "bottles",
      geometryName: "Object_63",
      materialName: "pack_005_salle_a_manger_armoire___nopaint_bouteilles",
    },
    {
      name: "cabinet_handles",
      geometryName: "Object_64",
      materialName: "pack_005_salle_a_manger_armoire___poignees",
    },

    // Doors
    {
      name: "door_frame",
      geometryName: "Object_69",
      materialName: "porte_009___d",
    },
    {
      name: "white_surface",
      geometryName: "Object_7",
      materialName: "blanc_001",
    },
    {
      name: "door_panel",
      geometryName: "Object_70",
      materialName: "porte_009___p",
    },
    {
      name: "glass_door",
      geometryName: "Object_71",
      materialName: "porte_022___mat_vitresg",
    },

    // Waste and utilities
    {
      name: "trash_can_metal",
      geometryName: "Object_72",
      materialName: "poubelle_002___phong1sg",
    },
    {
      name: "trash_can_body",
      geometryName: "Object_73",
      materialName: "poubelle_002___poubelle",
    },
    {
      name: "digital_signage",
      geometryName: "Object_74",
      materialName: "s1200_3",
    },

    // Fabric elements
    {
      name: "blue_fabric_static_1",
      geometryName: "Object_76",
      materialName: "tissus_089",
    },
    {
      name: "blue_fabric_static_2",
      geometryName: "Object_77",
      materialName: "tissus_089_ovcola0a3cccolpic00contpic03",
    },
    {
      name: "vase_flowers",
      geometryName: "Object_79",
      materialName: "vase_fleur_off___phong94",
    },

    // Blue fabric items (many repetitive items)
    {
      name: "blue_fabric_1",
      geometryName: "Object_8",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_2",
      geometryName: "Object_8001",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_3",
      geometryName: "Object_8002",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_4",
      geometryName: "Object_8003",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_5",
      geometryName: "Object_8008",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_6",
      geometryName: "Object_8009",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_7",
      geometryName: "Object_8010",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_8",
      geometryName: "Object_8011",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_9",
      geometryName: "Object_8012",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_10",
      geometryName: "Object_8013",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_11",
      geometryName: "Object_8014",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_12",
      geometryName: "Object_8015",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_13",
      geometryName: "Object_8016",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_14",
      geometryName: "Object_8017",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_15",
      geometryName: "Object_8018",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_16",
      geometryName: "Object_8019",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_17",
      geometryName: "Object_8020",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_18",
      geometryName: "Object_8021",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_19",
      geometryName: "Object_8022",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_20",
      geometryName: "Object_8023",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_21",
      geometryName: "Object_8024",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_22",
      geometryName: "Object_8025",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_23",
      geometryName: "Object_8026",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_24",
      geometryName: "Object_8027",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_25",
      geometryName: "Object_8028",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_26",
      geometryName: "Object_8029",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_27",
      geometryName: "Object_8030",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_28",
      geometryName: "Object_8031",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_29",
      geometryName: "Object_8032",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_30",
      geometryName: "Object_8033",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_31",
      geometryName: "Object_8038",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_32",
      geometryName: "Object_8039",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_33",
      geometryName: "Object_8040",
      materialName: "bleu_002",
    },
    {
      name: "blue_fabric_34",
      geometryName: "Object_8041",
      materialName: "bleu_002",
    },

    // Glass and utilities
    {
      name: "display_case_glass",
      geometryName: "Object_80",
      materialName: "vitrine_000___mat_vitrine_verre",
    },
    {
      name: "toilet_bowl",
      geometryName: "Object_81",
      materialName: "wc_004___wc_004_blinn1sg",
    },
    {
      name: "toilet_tank",
      geometryName: "Object_82",
      materialName: "wc_004___wc_004_blinn3sg",
    },
    {
      name: "wood_slats",
      geometryName: "Object_83",
      materialName: "ws13d0020",
    },
    {
      name: "beige_element",
      geometryName: "Object_84",
      materialName: "--_ovcol6b5a2ecolpic06contpic09",
    },
    {
      name: "floor_pattern",
      geometryName: "Object_85",
      materialName: "-------76810378",
    },

    // Blue fabric alt colors
    {
      name: "blue_fabric_alt_1",
      geometryName: "Object_9",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_2",
      geometryName: "Object_9001",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_3",
      geometryName: "Object_9002",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_4",
      geometryName: "Object_9003",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_5",
      geometryName: "Object_9004",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_6",
      geometryName: "Object_9005",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_7",
      geometryName: "Object_9006",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_8",
      geometryName: "Object_9007",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_9",
      geometryName: "Object_9008",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_10",
      geometryName: "Object_9009",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_11",
      geometryName: "Object_9010",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_12",
      geometryName: "Object_9011",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_13",
      geometryName: "Object_9012",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_14",
      geometryName: "Object_9013",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_15",
      geometryName: "Object_9014",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_16",
      geometryName: "Object_9015",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_17",
      geometryName: "Object_9016",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_18",
      geometryName: "Object_9017",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_19",
      geometryName: "Object_9018",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_20",
      geometryName: "Object_9019",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_21",
      geometryName: "Object_9020",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_22",
      geometryName: "Object_9021",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_23",
      geometryName: "Object_9022",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_24",
      geometryName: "Object_9023",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_25",
      geometryName: "Object_9024",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_26",
      geometryName: "Object_9025",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_27",
      geometryName: "Object_9026",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_28",
      geometryName: "Object_9027",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_29",
      geometryName: "Object_9028",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_30",
      geometryName: "Object_9029",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_31",
      geometryName: "Object_9030",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_32",
      geometryName: "Object_9031",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_33",
      geometryName: "Object_9032",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_34",
      geometryName: "Object_9033",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_35",
      geometryName: "Object_9042",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_36",
      geometryName: "Object_9043",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_37",
      geometryName: "Object_9044",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_38",
      geometryName: "Object_9045",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_39",
      geometryName: "Object_9046",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_40",
      geometryName: "Object_9047",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_41",
      geometryName: "Object_9048",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_42",
      geometryName: "Object_9049",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_43",
      geometryName: "Object_9054",
      materialName: "bleu_004",
    },
    {
      name: "blue_fabric_alt_44",
      geometryName: "Object_9055",
      materialName: "bleu_004",
    },
  ],
});
