# Restaurant 3D Visualization - Architecture Overview

## Core Design Principles

The restaurant 3D visualization system has been redesigned with these key principles:

1. **Configuration-Driven**: All model-specific details are defined in configuration files instead of hardcoding
2. **Component Abstraction**: Generic components that work with any properly configured model
3. **Separation of Concerns**: Clear separation between model data, visual representation, and business logic
4. **Context-Based State Management**: Centralized state management using React Context
5. **Extensible Communication**: Structured communication with React Native or other host applications

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      React Application                       │
│                                                             │
│  ┌───────────────┐       ┌──────────────────────────────┐   │
│  │ ModelProvider │◄─────►│ Configuration (ModelConfig)  │   │
│  └───────┬───────┘       └──────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│  ┌───────────────┐       ┌──────────────────────────────┐   │
│  │ RestaurantApp │◄─────►│ React Native Communication   │   │
│  └───────┬───────┘       └──────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│  ┌───────────────┐       ┌──────────────────────────────┐   │
│  │ Scene         │◄─────►│ Three.js Canvas & Controls   │   │
│  └───────┬───────┘       └──────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│  ┌───────────────┐       ┌──────────────────────────────┐   │
│  │ GenericModel  │◄─────►│ 3D Model (.glb file)         │   │
│  └───────┬───────┘       └──────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│  ┌───────────────┐       ┌──────────────────────────────┐   │
│  │ SelectableItem│◄─────►│ Effects & Materials          │   │
│  └───────────────┘       └──────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
            ▲                           │
            │                           ▼
┌───────────────────────┐    ┌────────────────────────┐
│ React Native WebView  │◄───┤ External Applications  │
└───────────────────────┘    └────────────────────────┘
```

## Key Components

### Configuration Layer

- `ModelConfig.js`: Defines the `RestaurantModelConfig` class and model registry
- `ExampleRestaurantConfig.js`: Shows how to create configurations for new restaurant models

### Component Layer

- `GenericModel.js`: Renders any 3D model based on its configuration
- `SelectableItem.js`: Generic component for any selectable item (replaces Chair-specific component)
- `Effects.js`: Visual effects for highlighting selected/occupied items
- `Scene.js`: Configurable scene that renders the 3D environment

### State Management

- `ModelProvider.js`: React Context provider for managing model state
- `useModel()`: Custom hook for accessing model state and methods

### Communication Layer

- `useReactNativeMessaging.js`: Hook for communication with React Native
- `useContentHeight.js`: Hook for WebView size management
- Global window methods for external control (updateItems, changeRestaurantModel)

## Extensibility Benefits

### Adding New Restaurant Models

Adding a new restaurant model requires:

1. Creating a 3D model file (GLB/glTF)
2. Creating a configuration object in `ModelConfig.js`
3. Registering the model in the `modelRegistry`

No code changes are necessary to the core components.

### Supporting New Selectable Item Types

To add support for new types of selectable items (beyond chairs):

1. Add the new item type in your model configuration
2. `SelectableItem` component handles all selectable items regardless of type
3. Type information is available for conditional rendering if needed

### Customizing Visual Appearance

The system provides multiple ways to customize appearance:

1. **Model-Level Customization**:
   - Custom selection/occupied colors per model
   - Custom animation parameters

2. **Scene-Level Customization**:
   - Custom camera positioning and field of view
   - Custom lighting and environment

3. **Item-Level Customization**:
   - Different materials for different states
   - Type-specific rendering behavior

## Performance Considerations

The architecture is designed with performance in mind:

1. **Model Loading Optimization**:
   - Models are preloaded with `useGLTF.preload`
   - Loading state is tracked for showing loading indicators

2. **Rendering Optimization**:
   - BVH (Bounding Volume Hierarchy) for efficient raycasting
   - Material reuse to minimize GPU state changes

3. **State Management Optimization**:
   - Context API for efficient state updates
   - Selection changes only affect relevant components

## Migration Guide

To migrate your existing application to this new architecture:

1. **Create Configurations**:
   - Move hardcoded references to chair names into configuration objects
   - Create a config for your existing kitchen model

2. **Replace Components**:
   - Replace `Chair.js` with the generic `SelectableItem.js`
   - Update `Effects.js` to use the new item selection approach
   - Update `Scene.js` to use the configuration-driven approach

3. **Update App Component**:
   - Wrap your application with the `ModelProvider`
   - Update references from `selectedChairs` to `selectedItems`

4. **Update React Native Integration**:
   - Update messages to use the new item terminology
   - Update JavaScript injection to use the new global methods

## Future Extension Points

This architecture can be extended in several ways:

1. **Real-time Occupancy Updates**:
   - Add WebSocket integration for live updates from a reservation system
   - Show real-time availability of seats

2. **Interactive Table Assignment**:
   - Add support for dragging parties to tables
   - Implement automatic table suggestion based on party size

3. **Time-Based Visualization**:
   - Show different occupancy states based on time of day
   - Visualize reservations across a timeline

4. **Advanced Visual Effects**:
   - Add custom particle effects for selected items
   - Implement path-finding for waitstaff movement visualization

5. **Integration with Floor Planning Tools**:
   - Import restaurant layouts from CAD software
   - Allow real-time editing of the floor plan

## Data Flow

1. **Model Configuration**:
   - Each restaurant model has a configuration object
   - Configurations define selectable items, static items, materials, etc.
   - Models are registered in a central registry

2. **Model Loading**:
   - `ModelProvider` manages loading the selected model
   - `useGLTF` loads the 3D model file (GLB/glTF)
   - Configuration maps model parts to their roles in the application

3. **Rendering Pipeline**:
   - `Scene` sets up the 3D environment
   - `GenericModel` renders the restaurant based on configuration
   - `SelectableItem` renders each interactive element with proper materials and effects
   - `Effects` applies visual highlights for selected/occupied items

4. **Interaction Flow**:
   - User interacts with selectable items in the 3D scene
   - `SelectableItem` captures pointer events and triggers callbacks
   - `ModelProvider` updates selection state
   - Visual changes reflect the new state (glow effects, outlines)
   - Events are communicated to the host application (React Native WebView)

5. **React Native Integration**:
   - WebView loads the React app
   - Two-way communication via postMessage/injectJavaScript
   - Global window methods provide an API for React Native
   - Selection state is synchronized between web and native components
   