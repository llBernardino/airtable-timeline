import React from "react";
import TimelineItem from "./TimelineItem.jsx";
import { TIMELINE_CONFIG } from "../utils/timelineUtils.js";

const Timeline = ({
  items,
  scale,
  onDragStart,
  onDragEnd,
  onDragOver,
  onEditName,
  draggedItemId,
  timelineContainerRef,
  onMouseDown,
  isPanning,
  dragPreview,
  itemLaneMap,
  forcedPositions,
  isDarkMode,
}) => {
  // Use the itemLaneMap passed from parent instead of recalculating
  const maxLanes =
    itemLaneMap && itemLaneMap.size > 0
      ? Math.max(4, Math.max(...Array.from(itemLaneMap.values())) + 1)
      : 4;
  const timelineHeight = maxLanes * TIMELINE_CONFIG.LANE_HEIGHT + 100;

  const startDate = new Date(TIMELINE_CONFIG.START_DATE);
  const endDate = new Date(TIMELINE_CONFIG.END_DATE);
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const timelineWidth = totalDays * scale;

  const renderLaneBackgrounds = () => {
    return Array.from({ length: maxLanes }, (_, laneIndex) => (
      <div
        key={`lane-${laneIndex}`}
        className={`timeline-lane ${isDarkMode ? "dark-mode" : ""}`}
        style={{
          width: `${timelineWidth}px`,
          minWidth: `${timelineWidth}px`,
          top: `${laneIndex * TIMELINE_CONFIG.LANE_HEIGHT}px`,
          position: "absolute",
          height: `${TIMELINE_CONFIG.LANE_HEIGHT}px`,
          borderBottom: `2px solid ${isDarkMode ? "#4a5568" : "#e5e7eb"}`,
          transition: "all 0.3s ease",
        }}
      />
    ));
  };

  const renderTimelineItems = () => {
    return items.map((item) => {
      const laneIndex =
        itemLaneMap && itemLaneMap.get ? itemLaneMap.get(item.id) : 0;
      return (
        <TimelineItem
          key={item.id}
          item={item}
          laneIndex={laneIndex}
          scale={scale}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onEditName={onEditName}
          isDragging={draggedItemId === item.id}
          dragPreview={draggedItemId === item.id ? dragPreview : null}
          isDarkMode={isDarkMode}
        />
      );
    });
  };

  return (
    <div
      ref={timelineContainerRef}
      className={`timeline-container ${isPanning ? "panning" : ""} ${
        isDarkMode ? "dark-mode" : ""
      }`}
      style={{
        height: `${timelineHeight}px`,
        background: isDarkMode ? "#1a1a1a" : "white",
        transition: "all 0.3s ease",
      }}
      onDragOver={onDragOver}
      onMouseDown={onMouseDown}
      onDrop={onDragEnd}
    >
      <div
        className="timeline-lanes"
        style={{ width: `${timelineWidth}px`, minWidth: `${timelineWidth}px` }}
      >
        {/* Render lane backgrounds */}
        {renderLaneBackgrounds()}

        {/* Render all items */}
        {renderTimelineItems()}
      </div>
    </div>
  );
};

export default Timeline;
