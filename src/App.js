// src/App.js
import React, { useEffect, useState } from "react";
import { Scene } from "./components/Scene";
import { useReactNativeMessaging } from "./hooks/useReactNativeMessaging";
import { useContentHeight } from "./hooks/useContentHeight";
import { ModelProvider, useModel } from "./context/ModelProvider";

/**
 * Main application wrapper with ModelProvider context
 */
function App() {
  return (
    <ModelProvider initialModelKey="cafe">
      <RestaurantApp />
    </ModelProvider>
  );
}

/**
 * Inner component that uses the model context
 */
function RestaurantApp() {
  // Get model state and methods from context
  const {
    modelConfig,
    selectedItems,
    occupiedItems,
    setSelectedItems,
    setOccupiedItems,
    toggleItemSelection,
    changeModel,
  } = useModel();

  const [debugMode, setDebugMode] = useState(false); // Add debug state

  // Setup React Native communication
  const { notifyInteractionStart, notifyInteractionEnd, postMessageToRN } =
    useReactNativeMessaging(setSelectedItems, setOccupiedItems);

  // Track content height for React Native WebView
  useContentHeight();

  // Handle item clicks in the 3D scene
  const handleItemClicked = (itemId) => {
    toggleItemSelection(itemId);
  };

  // Setup message listener for model switching from React Native
  useEffect(() => {
    // Allow changing the restaurant model from React Native
    window.changeRestaurantModel = (modelKey) => {
      changeModel(modelKey);
      // Notify React Native that model was changed
      postMessageToRN({
        type: "modelChanged",
        modelKey,
        availableItems: modelConfig.selectableItems.map((item) => item.id),
      });
    };

    // Add debug mode toggle function
    window.toggleDebugMode = () => {
      setDebugMode((prev) => !prev);
      console.log(`Debug mode ${!debugMode ? "enabled" : "disabled"}`);
    };

    // Add function to log current state
    window.logModelState = () => {
      console.log("Current Model State:", {
        modelKey: modelConfig.modelPath,
        selectedItems,
        occupiedItems,
        availableItems: modelConfig.selectableItems.map((item) => item.id),
      });
    };

    return () => {
      delete window.changeRestaurantModel;
      delete window.toggleDebugMode;
      delete window.logModelState;
    };
  }, [
    changeModel,
    modelConfig,
    postMessageToRN,
    debugMode,
    selectedItems,
    occupiedItems,
  ]);

  return (
    <div
      style={{ width: "100%" }}
      onTouchStart={notifyInteractionStart}
      onTouchEnd={notifyInteractionEnd}
      onMouseDown={notifyInteractionStart}
      onMouseUp={notifyInteractionEnd}
    >
      {/* Debug controls */}
      {debugMode && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1000,
            background: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "12px",
          }}
        >
          <div>Debug Mode Active</div>
          <div>Selected: {selectedItems.join(", ") || "None"}</div>
          <div>Occupied: {occupiedItems.join(", ") || "None"}</div>
          <button
            onClick={() => window.logModelState()}
            style={{ marginTop: "5px", fontSize: "10px" }}
          >
            Log State
          </button>
        </div>
      )}
      <Scene
        modelConfig={modelConfig}
        selectedItems={selectedItems}
        occupiedItems={occupiedItems}
        onItemClicked={handleItemClicked}
      />
    </div>
  );
}

export default App;
