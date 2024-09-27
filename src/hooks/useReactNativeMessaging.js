// src/hooks/useReactNativeMessaging.js
import { useEffect, useCallback } from "react";

export const useReactNativeMessaging = (setSelectedChairs) => {
  // Function to send messages to React Native
  const postMessageToRN = useCallback((message) => {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
  }, []);

  // Notify React Native about interaction start
  const notifyInteractionStart = useCallback(() => {
    postMessageToRN({ type: "interactionStart" });
  }, [postMessageToRN]);

  // Notify React Native about interaction end
  const notifyInteractionEnd = useCallback(() => {
    postMessageToRN({ type: "interactionEnd" });
  }, [postMessageToRN]);

  useEffect(() => {
    // Function to receive selected chairs from React Native
    window.updateSelectedChairs = (selectedChairsFromRN) => {
      setSelectedChairs(selectedChairsFromRN);
    };

    // Cleanup
    return () => {
      delete window.updateSelectedChairs;
    };
  }, [setSelectedChairs]);

  return {
    notifyInteractionStart,
    notifyInteractionEnd,
  };
};
