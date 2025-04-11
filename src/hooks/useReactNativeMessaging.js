// src/hooks/useReactNativeMessaging.js
import { useEffect, useCallback } from "react";

/**
 * Hook for handling communication with React Native WebView
 */
export const useReactNativeMessaging = (setSelectedItems, setOccupiedItems) => {
  // Function to post messages to React Native WebView
  const postMessageToRN = useCallback((message) => {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
  }, []);

  // Notify React Native when user starts interacting with 3D scene
  const notifyInteractionStart = useCallback(() => {
    postMessageToRN({ type: "interactionStart" });
  }, [postMessageToRN]);

  // Notify React Native when user stops interacting with 3D scene
  const notifyInteractionEnd = useCallback(() => {
    postMessageToRN({ type: "interactionEnd" });
  }, [postMessageToRN]);

  // Setup global method for React Native to update selected/occupied items
  useEffect(() => {
    // Method for React Native to update selected and occupied items
    window.updateItems = ({
      selectedItems: selected,
      occupiedItems: occupied,
    }) => {
      if (Array.isArray(selected)) {
        setSelectedItems(selected);
      }
      if (Array.isArray(occupied)) {
        setOccupiedItems(occupied);
      }
    };
    postMessageToRN({
      type: "webViewReady",
    });
    return () => {
      delete window.updateItems;
    };
  }, [setSelectedItems, setOccupiedItems, postMessageToRN]);

  return {
    postMessageToRN,
    notifyInteractionStart,
    notifyInteractionEnd,
  };
};
