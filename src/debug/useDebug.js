// src/debug/useDebug.js
import { useState, useEffect } from "react";
import { debugManager } from "./DebugManager";

export const useDebug = () => {
  const [debugState, setDebugState] = useState({
    isEnabled: debugManager.isEnabled,
    logs: debugManager.getLogs(),
    modelContext: debugManager.modelContext,
  });

  useEffect(() => {
    const unsubscribe = debugManager.addListener(setDebugState);
    return unsubscribe;
  }, []);

  return {
    ...debugState,
    enable: () => debugManager.enable(),
    disable: () => debugManager.disable(),
    toggle: () => debugManager.toggle(),
    log: (message, type, data) => debugManager.log(message, type, data),
    clear: () => debugManager.clearLogs(),
  };
};
