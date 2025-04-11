// src/hooks/useDebouncedHover.js
import { useState, useCallback } from "react";
import { debounce } from "lodash";

/**
 * Custom hook to handle debounced hover state.
 *
 * @param {number} delay - Debounce delay in milliseconds.
 * @returns {object} - Hover state and event handlers.
 */
const useDebouncedHover = (delay = 30) => {
  const [hovered, setHovered] = useState(null);

  const debouncedSetHovered = useCallback(
    (name) => {
      debounce(() => {
        setHovered(name);
      }, delay)();
    },
    [delay]
  );

  const handlePointerOver = useCallback(
    (name, occupiedChairs) => (e) => {
      e.stopPropagation();
      if (occupiedChairs.includes(name)) return;
      debouncedSetHovered(name);
    },
    [debouncedSetHovered]
  );

  const handlePointerOut = useCallback(() => {
    debouncedSetHovered(null);
  }, [debouncedSetHovered]);

  return {
    hovered,
    handlePointerOver,
    handlePointerOut,
  };
};

export default useDebouncedHover;
