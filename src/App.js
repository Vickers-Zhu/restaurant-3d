// src/App.js
import React, { useState } from "react";
import { Scene } from "./components/Scene";
import { useReactNativeMessaging } from "./hooks/useReactNativeMessaging";
import { useContentHeight } from "./hooks/useContentHeight";

function App() {
  const [selectedChairs, setSelectedChairs] = useState([]);

  // Custom hook to handle messaging with React Native
  const { notifyInteractionStart, notifyInteractionEnd } =
    useReactNativeMessaging(setSelectedChairs);

  // Custom hook to send content height to React Native
  useContentHeight();

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
