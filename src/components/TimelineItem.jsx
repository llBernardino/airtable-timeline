import React, { useState, useRef } from "react";
import {
  calculateItemPosition,
  generateItemColor,
  formatDateRangeForDisplay,
} from "../utils/timelineUtils.js";

const TimelineItem = ({
  item,
  laneIndex,
  scale,
  onDragStart,
  onDragEnd,
  onEditName,
  isDragging,
  dragPreview,
  isDarkMode,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const itemRef = useRef(null);

  const { left, width } = calculateItemPosition(item, scale);

  const handleNameClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (name !== item.name) {
      onEditName(item.id, name);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNameBlur();
    }
  };

  const handleDragStart = (e) => {
    onDragStart(e, item, laneIndex);
  };

  const itemStyle = {
    left,
    width,
    top: `${laneIndex * 60}px`,
    backgroundColor: generateItemColor(item.id),
  };

  // Format dates for display
  const formattedDateRange = formatDateRangeForDisplay(item.start, item.end);

  // Show drag preview if this item is being dragged
  if (isDragging && dragPreview) {
    const previewDateRange = formatDateRangeForDisplay(
      dragPreview.start,
      dragPreview.end
    );

    return (
      <>
        <div
          ref={itemRef}
          className="timeline-item dragging-original"
          style={{
            ...itemStyle,
            opacity: 0.3,
          }}
        >
          <div className="timeline-item-content">
            <div className="timeline-item-name">{item.name}</div>
            <div className="timeline-item-dates">{formattedDateRange}</div>
          </div>
        </div>

        <div
          className="timeline-item drag-preview"
          style={{
            left: `${dragPreview.x}px`,
            width,
            top: `${dragPreview.targetLane * 60}px`,
            backgroundColor: generateItemColor(item.id),
            opacity: 0.8,
            transform: "scale(1.05)",
            zIndex: 1000,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <div className="timeline-item-content">
            <div className="timeline-item-name">{item.name}</div>
            <div className="timeline-item-dates">{previewDateRange}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      ref={itemRef}
      className={`timeline-item ${isDragging ? "dragging" : ""}`}
      style={itemStyle}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="timeline-item-content">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            className="timeline-item-name-input"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="timeline-item-name" onClick={handleNameClick}>
            {item.name}
          </div>
        )}
        <div className="timeline-item-dates">{formattedDateRange}</div>
      </div>
    </div>
  );
};

export default TimelineItem;
