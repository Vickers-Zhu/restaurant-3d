// App.js
// Removed React import assuming React version ≥ 17
import { useEffect } from "react";
import { Scene } from "./Scene"; // Import the Scene component

function App() {
  // Function to send the content's height to React Native
  const sendHeight = () => {
    const height = document.body.scrollHeight;
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "contentHeight", height })
    );
  };

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

  return (
    <div style={{ width: "100%" }}>
      {" "}
      {/* Removed height: '100vh' */}
      <Scene />
    </div>
  );
}

export default App;
