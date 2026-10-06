// src/debug/DebugManager.js
class DebugManager {
  constructor() {
    this.isEnabled = false;
    this.logs = [];
    this.maxLogs = 100;
    this.listeners = new Set();

    // Initialize in development mode only
    if (process.env.NODE_ENV === "development") {
      this.setupGlobalMethods();
    }
  }

  setupGlobalMethods() {
    // Global debug controls
    window.__debug = {
      enable: () => this.enable(),
      disable: () => this.disable(),
      toggle: () => this.toggle(),
      clear: () => this.clearLogs(),
      logs: () => this.getLogs(),
      modelState: () => this.logModelState(),
      geometries: () => this.logGeometries(),
      materials: () => this.logMaterials(),
    };
  }

  enable() {
    this.isEnabled = true;
    this.log("🐛 Debug mode enabled");
    this.notifyListeners();
  }

  disable() {
    this.isEnabled = false;
    this.log("🐛 Debug mode disabled");
    this.notifyListeners();
  }

  toggle() {
    this.isEnabled ? this.disable() : this.enable();
    return this.isEnabled;
  }

  log(message, type = "info", data = null) {
    if (!this.isEnabled) return;

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      type,
      message,
      data,
    };

    this.logs.push(logEntry);

    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output with styling
    const styles = {
      info: "color: #2196F3",
      warn: "color: #FF9800",
      error: "color: #F44336",
      success: "color: #4CAF50",
    };

    console.log(
      `%c[DEBUG ${type.toUpperCase()}] ${message}`,
      styles[type] || styles.info,
      data || ""
    );

    this.notifyListeners();
  }

  logModelState() {
    if (!this.modelContext) return;

    const state = {
      currentModel: this.modelContext.currentModelKey,
      modelPath: this.modelContext.modelConfig?.modelPath,
      selectedItems: this.modelContext.selectedItems,
      occupiedItems: this.modelContext.occupiedItems,
      availableItems: this.modelContext.availableItems,
      isLoading: this.modelContext.isLoading,
    };

    this.log("Model State", "info", state);
    return state;
  }

  logGeometries() {
    if (!this.modelData?.nodes) return;

    const geometries = Object.keys(this.modelData.nodes).map((key) => ({
      name: key,
      type: this.modelData.nodes[key].type,
      geometry: !!this.modelData.nodes[key].geometry,
    }));

    this.log("Available Geometries", "info", geometries);
    return geometries;
  }

  logMaterials() {
    if (!this.modelData?.materials) return;

    const materials = Object.keys(this.modelData.materials).map((key) => ({
      name: key,
      type: this.modelData.materials[key].type,
      color: this.modelData.materials[key].color?.getHexString?.(),
    }));

    this.log("Available Materials", "info", materials);
    return materials;
  }

  setModelContext(context) {
    this.modelContext = context;
    this.notifyListeners(); // Notify listeners when context changes
  }

  setModelData(data) {
    this.modelData = data;
  }

  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach((callback) => {
      try {
        callback({
          isEnabled: this.isEnabled,
          logs: this.logs,
          modelContext: this.modelContext,
        });
      } catch (error) {
        console.error("Debug listener error:", error);
      }
    });
  }

  clearLogs() {
    this.logs = [];
    this.notifyListeners();
  }

  getLogs() {
    return [...this.logs];
  }

  // Model-specific debug methods
  validateModelConfig(config) {
    const issues = [];

    if (!config.selectableItems?.length) {
      issues.push("No selectable items defined");
    }

    if (!config.staticItems?.length) {
      issues.push("No static items defined");
    }

    config.selectableItems?.forEach((item, index) => {
      if (!item.id) issues.push(`Selectable item ${index} missing ID`);
      if (!item.geometries?.length)
        issues.push(`Item ${item.id} has no geometries`);
    });

    if (issues.length > 0) {
      this.log("Model Config Issues", "warn", issues);
    } else {
      this.log("Model Config Valid", "success");
    }

    return issues;
  }

  validateModelAssets(nodes, materials, config) {
    const missing = {
      geometries: [],
      materials: [],
    };

    // Check static items
    config.staticItems?.forEach((item) => {
      if (!nodes[item.geometryName]) {
        missing.geometries.push(`${item.name} -> ${item.geometryName}`);
      }
      if (!materials[item.materialName]) {
        missing.materials.push(`${item.name} -> ${item.materialName}`);
      }
    });

    // Check selectable items
    config.selectableItems?.forEach((item) => {
      item.geometries?.forEach((geo) => {
        if (!nodes[geo.geometryName]) {
          missing.geometries.push(`${item.id} -> ${geo.geometryName}`);
        }
        if (!materials[geo.materialName]) {
          missing.materials.push(`${item.id} -> ${geo.materialName}`);
        }
      });
    });

    if (missing.geometries.length || missing.materials.length) {
      this.log("Missing Assets", "error", missing);
    } else {
      this.log("All Assets Valid", "success");
    }

    return missing;
  }
}

// Create singleton instance
export const debugManager = new DebugManager();

export default debugManager;
