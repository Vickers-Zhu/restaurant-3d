// src/hooks/useContentHeight.js
import { useEffect } from "react";

export const useContentHeight = () => {
  useEffect(() => {
    const postMessageToRN = (message) => {
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      }
    };

    const sendHeight = () => {
      const height = document.body.scrollHeight;
      postMessageToRN({ type: "contentHeight", height });
    };

    // Send initial height on mount
    sendHeight();

    // Update height on window resize
    window.addEventListener("resize", sendHeight);

    // Observe DOM mutations for dynamic content changes
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", sendHeight);
      observer.disconnect();
    };
  }, []);
};
