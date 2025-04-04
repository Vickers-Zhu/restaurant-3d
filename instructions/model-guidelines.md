# 3D Model Creation Guidelines

This document provides guidelines for creating compatible 3D models for the Restaurant Visualization System.

## General Requirements

- **File Format**: Use glTF/GLB format (preferred for web) 
- **File Size**: Keep model size under 5MB for optimal loading times
- **Polygon Count**: Aim for 100k-150k triangles maximum for the entire scene
- **Textures**: Use compressed formats (WebP, compressed JPG) with sizes no larger than 2048×2048px

## Model Structure

### Naming Conventions

All objects in your 3D model should follow consistent naming conventions:

- **Selectable Items**: Must have unique, consistent names
  - Examples: `chair_table1_1`, `chair_table1_2`, `barstool_1`
  - For multi-part objects: `chair_table1_1_frame`, `chair_table1_1_cushion`
  
- **Static Items**: Should have descriptive names
  - Examples: `floor`, `walls`, `bar_counter`, `decorative_lights`

### Material Organization

- Use consistent material names across models
- Group similar materials (e.g., all wood materials should follow the same naming pattern)
- Common material names:
  - `wood_dark`, `wood_medium`, `wood_light`
  - `fabric_[color]`, `leather_[color]`
  - `metal_[type]` (e.g., `metal_chrome`, `metal_gold`)
  - `floor`, `walls`, `ceiling`

## Designing Selectable Items

### Chairs and Seating

For optimal visual effects, design seats with two parts:

1. **Outer Structure** (frame):
   - Usually the main structure/frame of the chair
   - Will receive an outline effect when selected/occupied

2. **Inner Structure** (cushion/seat):
   - Usually the seating surface 
   - Will also receive the glow effect when selected/occupied

Example geometry naming for a chair:
```
chair_t1_c1_frame   // Table 1, Chair 1 - Frame part
chair_t1_c1_cushion // Table 1, Chair 1 - Cushion part
```

### Single-Part Items

For items that don't naturally have two parts (like bar stools):
- Still use descriptive naming
- Only provide the outer geometry name in the configuration

Example:
```
stool_bar_1  // A single-part bar stool
```

## Optimizing for Performance

### Level of Detail (LOD)

For complex objects, consider providing multiple detail levels:
- High detail for items close to the camera
- Medium detail for mid-range objects
- Low detail for distant objects

### Geometry Optimization

- Remove invisible faces
- Optimize geometry using decimation tools
- Merge small objects that don't need individual selection

### Material Optimization

- Reuse materials wherever possible
- Use texture atlases to combine multiple textures
- Keep the total number of unique materials under 20

## Testing and Validation

Before implementation, verify:

1. All selectable items are properly named
2. All material references are correct
3. Model loads and renders correctly in a Three.js viewer
4. Model size and performance meet requirements

## Example Blender Setup

When creating models in Blender:

1. Organize your objects into collections:
   - `Selectable_Items` collection
   - `Static_Items` collection

2. Name all objects according to the conventions above

3. Export settings for GLB:
   - Format: glTF 2.0 (.glb)
   - Include:
     - ✓ Selected Objects
     - ✓ Apply Modifiers
     - ✓ Custom Properties
     - ✓ Materials
     - ✓ Texture Images
   - Transform:
     - ✓ +Y Up
   - Geometry:
     - ✓ UVs
     - ✓ Normals
     - ✓ Tangents
     - ✓ Vertex Colors
     - ✓ Compressed floats (for smaller file size)

## Implementation Checklist

After creating your 3D model:

1. Place the GLB file in the `public` directory of the web app
2. Create a configuration in `src/configs/ModelConfig.js` with:
   - Correct path to your model
   - List of all selectable items with proper geometry/material references
   - List of all static items 
3. Add your model to the `modelRegistry`
4. Test model loading, selection and occupied states
