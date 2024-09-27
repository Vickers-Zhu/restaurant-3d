// web-app/src/App.js
import React, { useEffect, useState } from "react";
import { Scene } from "./Scene"; // Import the Scene component

function App() {
  // Function to send messages to React Native
  const postMessageToRN = (message) => {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
  };

  // Function to send the content's height to React Native
  const sendHeight = () => {
    const height = document.body.scrollHeight;
    postMessageToRN({ type: "contentHeight", height });
  };

  // Function to notify interaction start
  const notifyInteractionStart = () => {
    postMessageToRN({ type: "interactionStart" });
  };

  // Function to notify interaction end
  const notifyInteractionEnd = () => {
    postMessageToRN({ type: "interactionEnd" });
  };

  // State to manage selected chairs received from React Native
  const [selectedChairs, setSelectedChairs] = useState([]);

  useEffect(() => {
    // Send initial height on mount
    sendHeight();

    // Send height on window resize
    window.addEventListener("resize", sendHeight);

    // Observe DOM mutations to handle dynamic content changes
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", sendHeight);
      observer.disconnect();
    };
  }, []);

  // Define the global function to receive selected chairs from React Native
  useEffect(() => {
    window.updateSelectedChairs = (selectedChairsFromRN) => {
      setSelectedChairs(selectedChairsFromRN);
    };
  }, []);

  return (
    <div
      style={{ width: "100%" }}
      onTouchStart={notifyInteractionStart}
      onTouchEnd={notifyInteractionEnd}
      onMouseDown={notifyInteractionStart}
      onMouseUp={notifyInteractionEnd}
    >
      <Scene selectedChairs={selectedChairs} />
    </div>
  );
}

export default App;
