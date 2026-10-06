import React, { useEffect } from "react";
import { Scene } from "./components/Scene";
import { useReactNativeMessaging } from "./hooks/useReactNativeMessaging";
import { useContentHeight } from "./hooks/useContentHeight";
import { ModelProvider, useModel } from "./context/ModelProvider";
import { debugManager } from "./debug/DebugManager";
import DebugPanel from "./debug/DebugPanel";

function App() {
  // Get initialModelKey from URL parameters
  const getInitialModelKey = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("initialModel") || "cafe"; // default to 'cafe' if not specified
  };

  return (
    <ModelProvider initialModelKey={getInitialModelKey()}>
      <RestaurantApp />
      {process.env.NODE_ENV === "development" && <DebugPanel />}
    </ModelProvider>
  );
}

function RestaurantApp() {
  const {
    currentModelKey,
    modelConfig,
    selectedItems,
    occupiedItems,
    setSelectedItems,
    setOccupiedItems,
    toggleItemSelection,
    changeModel,
  } = useModel();

  const { notifyInteractionStart, notifyInteractionEnd, postMessageToRN } =
    useReactNativeMessaging(setSelectedItems, setOccupiedItems);

  useContentHeight();

  useEffect(() => {
    debugManager.setModelContext({
      currentModelKey,
      modelConfig,
      selectedItems,
      occupiedItems,
      availableItems:
        modelConfig?.selectableItems?.map((item) => item.id) || [],
    });
  }, [currentModelKey, modelConfig, selectedItems, occupiedItems]);

  const handleItemClicked = (itemId) => {
    debugManager.log(`🎯 Item selection toggled: ${itemId}`, "info");
    toggleItemSelection(itemId);
  };

  useEffect(() => {
    window.changeRestaurantModel = (modelKey) => {
      debugManager.log(`🔄 Model changed to: ${modelKey}`, "info");
      changeModel(modelKey);
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
