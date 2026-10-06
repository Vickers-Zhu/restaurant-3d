// src/debug/DebugPanel.js
import React, { useState } from "react";
import { useDebug } from "./useDebug";
const DebugPanel = () => {
  const { isEnabled, logs, modelContext } = useDebug();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("logs");

  if (!isEnabled) return null;

  const panelStyles = {
    position: "fixed",
    top: isExpanded ? "10px" : "auto",
    bottom: isExpanded ? "10px" : "10px",
    right: "10px",
    width: isExpanded ? "400px" : "60px",
    height: isExpanded ? "calc(100vh - 20px)" : "40px",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    color: "white",
    borderRadius: "8px",
    zIndex: 10000,
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "monospace",
    fontSize: "12px",
  };

  const headerStyles = {
    padding: "8px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottom: isExpanded ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "24px",
  };

  const contentStyles = {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const tabBarStyles = {
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const tabStyles = (isActive) => ({
    padding: "6px 12px",
    cursor: "pointer",
    backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
    borderBottom: isActive ? "2px solid #2196F3" : "2px solid transparent",
    fontSize: "11px",
  });

  const logContainerStyles = {
    flex: 1,
    overflow: "auto",
    padding: "8px",
  };

  const logEntryStyles = (type) => {
    const colors = {
      info: "#2196F3",
      warn: "#FF9800",
      error: "#F44336",
      success: "#4CAF50",
    };

    return {
      marginBottom: "4px",
      padding: "4px 6px",
      borderLeft: `3px solid ${colors[type] || colors.info}`,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "0 4px 4px 0",
      fontSize: "11px",
      lineHeight: "1.4",
    };
  };

  const buttonStyles = {
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "10px",
    margin: "2px",
  };

  const renderLogs = () => (
    <div style={logContainerStyles}>
      {logs.length === 0 ? (
        <div style={{ color: "#666", fontStyle: "italic" }}>No logs yet...</div>
      ) : (
        logs.slice(-50).map((log, index) => (
          <div key={index} style={logEntryStyles(log.type)}>
            <div style={{ opacity: 0.7, fontSize: "10px" }}>
              {new Date(log.timestamp).toLocaleTimeString()}
            </div>
            <div>{log.message}</div>
            {log.data && (
              <details style={{ marginTop: "4px" }}>
                <summary style={{ cursor: "pointer", opacity: 0.8 }}>
                  View Data
                </summary>
                <pre
                  style={{
                    marginTop: "4px",
                    fontSize: "10px",
                    overflow: "auto",
                    maxHeight: "100px",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    padding: "4px",
                    borderRadius: "2px",
                  }}
                >
                  {JSON.stringify(log.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))
      )}
    </div>
  );

  const renderControls = () => (
    <div style={logContainerStyles}>
      <div style={{ marginBottom: "12px" }}>
        <h4 style={{ margin: "0 0 8px 0", color: "#2196F3" }}>
          Model Controls
        </h4>
        <button
          style={buttonStyles}
          onClick={() => window.__debug?.modelState?.()}
        >
          Log Model State
        </button>
        <button
          style={buttonStyles}
          onClick={() => window.__debug?.geometries?.()}
        >
          Log Geometries
        </button>
        <button
          style={buttonStyles}
          onClick={() => window.__debug?.materials?.()}
        >
          Log Materials
        </button>
      </div>

      {modelContext && (
        <div style={{ marginBottom: "12px" }}>
          <h4 style={{ margin: "0 0 8px 0", color: "#4CAF50" }}>
            Current State
          </h4>

          <div style={{ marginBottom: "8px" }}>
            <div
              style={{ fontSize: "10px", color: "#ccc", marginBottom: "4px" }}
            >
              Selected Items ({modelContext.selectedItems?.length || 0}):
            </div>
            <div
              style={{
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                border: "1px solid rgba(76, 175, 80, 0.3)",
                borderRadius: "4px",
                padding: "4px 6px",
                fontSize: "10px",
                minHeight: "20px",
                color: "#4CAF50",
              }}
            >
              {modelContext.selectedItems?.length > 0
                ? modelContext.selectedItems.join(", ")
                : "None"}
            </div>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <div
              style={{ fontSize: "10px", color: "#ccc", marginBottom: "4px" }}
            >
              Occupied Items ({modelContext.occupiedItems?.length || 0}):
            </div>
            <div
              style={{
                backgroundColor: "rgba(244, 67, 54, 0.1)",
                border: "1px solid rgba(244, 67, 54, 0.3)",
                borderRadius: "4px",
                padding: "4px 6px",
                fontSize: "10px",
                minHeight: "20px",
                color: "#F44336",
              }}
            >
              {modelContext.occupiedItems?.length > 0
                ? modelContext.occupiedItems.join(", ")
                : "None"}
            </div>
          </div>

          <div>
            <div
              style={{ fontSize: "10px", color: "#ccc", marginBottom: "4px" }}
            >
              Available Items ({modelContext.availableItems?.length || 0}):
            </div>
            <div
              style={{
                backgroundColor: "rgba(33, 150, 243, 0.1)",
                border: "1px solid rgba(33, 150, 243, 0.3)",
                borderRadius: "4px",
                padding: "4px 6px",
                fontSize: "10px",
                maxHeight: "60px",
                overflow: "auto",
                color: "#2196F3",
              }}
            >
              {modelContext.availableItems?.length > 0
                ? modelContext.availableItems.join(", ")
                : "None"}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: "12px" }}>
        <h4 style={{ margin: "0 0 8px 0", color: "#FF9800" }}>
          Debug Controls
        </h4>
        <button style={buttonStyles} onClick={() => window.__debug?.clear?.()}>
          Clear Logs
        </button>
        <button
          style={buttonStyles}
          onClick={() => window.__debug?.disable?.()}
        >
          Disable Debug
        </button>
      </div>

      <div>
        <h4 style={{ margin: "0 0 8px 0", color: "#4CAF50" }}>
          Console Commands
        </h4>
        <div style={{ fontSize: "10px", color: "#ccc", lineHeight: "1.4" }}>
          <div>
            <code>__debug.toggle()</code> - Toggle debug mode
          </div>
          <div>
            <code>__debug.modelState()</code> - Log current state
          </div>
          <div>
            <code>__debug.logs()</code> - Get all logs
          </div>
          <div>
            <code>__debug.clear()</code> - Clear logs
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={panelStyles}>
      <div style={headerStyles} onClick={() => setIsExpanded(!isExpanded)}>
        <span>{isExpanded ? "Debug Panel" : "🐛"}</span>
        <span
          style={{
            transform: `rotate(${isExpanded ? 180 : 0}deg)`,
            transition: "transform 0.3s",
          }}
        >
          ▼
        </span>
      </div>

      {isExpanded && (
        <div style={contentStyles}>
          <div style={tabBarStyles}>
            <div
              style={tabStyles(activeTab === "logs")}
              onClick={() => setActiveTab("logs")}
            >
              Logs ({logs.length})
            </div>
            <div
              style={tabStyles(activeTab === "controls")}
              onClick={() => setActiveTab("controls")}
            >
              Controls
            </div>
          </div>

          {activeTab === "logs" && renderLogs()}
          {activeTab === "controls" && renderControls()}
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
