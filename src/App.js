// src/App.js
import React, { useEffect } from "react";
import { Scene } from "./components/Scene";
import { useReactNativeMessaging } from "./hooks/useReactNativeMessaging";
import { useContentHeight } from "./hooks/useContentHeight";
import { ModelProvider, useModel } from "./context/ModelProvider";

/**
 * Main application wrapper with ModelProvider context
 */
function App() {
  return (
    <ModelProvider initialModelKey="kitchen">
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

    return () => {
      delete window.changeRestaurantModel;
    };
  }, [changeModel, modelConfig, postMessageToRN]);

  return (
    <div
      style={{ width: "100%" }}
      onTouchStart={notifyInteractionStart}
      onTouchEnd={notifyInteractionEnd}
      onMouseDown={notifyInteractionStart}
      onMouseUp={notifyInteractionEnd}
    >
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
