import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";
import "./app.css";

// Import components
import Timeline from "./components/Timeline.jsx";
import TimelineHeader from "./components/TimelineHeader.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";

// Import hooks
import { useTimelineDrag } from "./hooks/useTimelineDrag.js";
import { useTimelinePan } from "./hooks/useTimelinePan.js";
import { useTimelineZoom } from "./hooks/useTimelineZoom.js";

// Import utilities
import { assignLanes } from "./utils/timelineUtils.js";

const App = () => {
  // State
  const [items, setItems] = useState(timelineItems);
  const [forcedPositions, setForcedPositions] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Refs
  const timelineContainerRef = useRef(null);
  const headerScaleRef = useRef(null);

  // Custom hooks
  const { scale, setScale, handleZoomToFit } = useTimelineZoom(
    timelineContainerRef,
    headerScaleRef
  );

  const { isPanning, handleMouseDown } = useTimelinePan(
    timelineContainerRef,
    headerScaleRef
  );

  const {
    draggedItemId,
    dragPreview,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useTimelineDrag(items, setItems, setForcedPositions);

  // Calculate lane assignments
  const { itemLaneMap } = assignLanes(items, forcedPositions);

  // Dark mode initialization
  useEffect(() => {
    setIsDarkMode(false);
    document.body.classList.remove("dark-mode");
  }, []);

  // Sync scroll between header and timeline
  useEffect(() => {
    const timelineContainer = timelineContainerRef.current;
    const headerScale = headerScaleRef.current;

    if (timelineContainer && headerScale) {
      const handleScroll = () => {
        headerScale.scrollLeft = timelineContainer.scrollLeft;
      };

      timelineContainer.addEventListener("scroll", handleScroll);
      return () =>
        timelineContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Event handlers
  const handleEditName = (id, newName) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const handleDragOverWrapper = (e) => {
    handleDragOver(e, scale, timelineContainerRef);
  };

  const handleDragEndWrapper = (e) => {
    handleDragEnd(e);
  };

  // Styles
  const appStyle = {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    maxWidth: "1400px",
    margin: "0 auto",
    background: isDarkMode ? "#1a1a1a" : "white",
    borderRadius: "12px",
    boxShadow: isDarkMode
      ? "0 4px 6px rgba(255, 255, 255, 0.1)"
      : "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "all 0.3s ease",
  };

  const headerStyle = {
    margin: 0,
    padding: "24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontSize: "28px",
    fontWeight: 600,
    flex: 1,
  };

  const headerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const hintStyle = {
    padding: "12px 24px",
    background: isDarkMode ? "#2d3748" : "#f0f9ff",
    borderBottom: `1px solid ${isDarkMode ? "#4a5568" : "#e1e5e9"}`,
    textAlign: "center",
    transition: "all 0.3s ease",
  };

  const hintTextStyle = {
    color: isDarkMode ? "#90cdf4" : "#0369a1",
    fontSize: "14px",
    fontWeight: 500,
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`} style={appStyle}>
      <div style={headerContainerStyle}>
        <h1 style={headerStyle}>Your Timeline 🕒 </h1>
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
      </div>

      <div style={hintStyle}>
        <span style={hintTextStyle}>
          💡 Scroll to zoom • Ctrl+scroll to fine zoom • Drag items to move
          between tracks • Click names to edit
        </span>
      </div>

      <TimelineHeader
        scale={scale}
        onScaleChange={setScale}
        headerScaleRef={headerScaleRef}
        onZoomToFit={handleZoomToFit}
        isDarkMode={isDarkMode}
      />

      <Timeline
        items={items}
        scale={scale}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEndWrapper}
        onDragOver={handleDragOverWrapper}
        onEditName={handleEditName}
        draggedItemId={draggedItemId}
        timelineContainerRef={timelineContainerRef}
        onMouseDown={handleMouseDown}
        isPanning={isPanning}
        dragPreview={dragPreview}
        itemLaneMap={itemLaneMap}
        forcedPositions={forcedPositions}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
