// src/context/ModelProvider.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useGLTF } from "@react-three/drei";
import { modelRegistry } from "../configs/ModelConfig";

// Create a context for model data
const ModelContext = createContext(null);

/**
 * Provider component that manages restaurant model loading and state
 */
export const ModelProvider = ({ children, initialModelKey = "kitchen" }) => {
  // Current model configuration
  const [currentModelKey, setCurrentModelKey] = useState(initialModelKey);
  const [modelConfig, setModelConfig] = useState(
    modelRegistry[initialModelKey]
  );

  // Selection state
  const [selectedItems, setSelectedItems] = useState([]);
  const [occupiedItems, setOccupiedItems] = useState(["CHAIR1", "CHAIR3"]);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Preload the model
  useGLTF.preload(modelConfig?.modelPath);

  // Update model config when model key changes
  useEffect(() => {
    const config = modelRegistry[currentModelKey];
    if (config) {
      setModelConfig(config);
      setIsLoading(true);

      // Preload the new model
      useGLTF.preload(config.modelPath, () => {
        setIsLoading(false);
      });

      // Reset selection state
      setSelectedItems([]);
    } else {
      console.error(`Model configuration for "${currentModelKey}" not found`);
    }
  }, [currentModelKey]);

  // Method to change the current model
  const changeModel = useCallback((modelKey) => {
    if (modelRegistry[modelKey]) {
      setCurrentModelKey(modelKey);
    } else {
      console.error(`Model "${modelKey}" not found in registry`);
    }
  }, []);

  // Method to toggle item selection
  const toggleItemSelection = useCallback(
    (itemId) => {
      if (occupiedItems.includes(itemId)) {
        return; // Can't select occupied items
      }

      setSelectedItems((prev) => {
        if (prev.includes(itemId)) {
          return prev.filter((id) => id !== itemId);
        } else {
          return [...prev, itemId];
        }
      });
    },
    [occupiedItems]
  );

  // Method to set items as occupied (e.g., after reservation)
  const setItemsAsOccupied = useCallback((itemIds) => {
    if (!Array.isArray(itemIds)) {
      itemIds = [itemIds];
    }

    // Remove these items from selection if they're selected
    setSelectedItems((prev) => prev.filter((id) => !itemIds.includes(id)));

    // Add to occupied items
    setOccupiedItems((prev) => {
      const newOccupied = [...prev];
      itemIds.forEach((id) => {
        if (!newOccupied.includes(id)) {
          newOccupied.push(id);
        }
      });
      return newOccupied;
    });
  }, []);

  // Method to clear occupancy (e.g., when customer leaves)
  const clearOccupancy = useCallback((itemIds) => {
    if (!Array.isArray(itemIds)) {
      itemIds = [itemIds];
    }

    setOccupiedItems((prev) => prev.filter((id) => !itemIds.includes(id)));
  }, []);

  // Get all available items from current model config
  const availableItems =
    modelConfig?.selectableItems.map((item) => item.id) || [];

  // Create the context value
  const contextValue = {
    currentModelKey,
    modelConfig,
    isLoading,
    selectedItems,
    occupiedItems,
    availableItems,
    changeModel,
    toggleItemSelection,
    setSelectedItems,
    setOccupiedItems,
    setItemsAsOccupied,
    clearOccupancy,
  };

  return (
    <ModelContext.Provider value={contextValue}>
      {children}
    </ModelContext.Provider>
  );
};

/**
 * Hook to use the model context
 */
export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
};
