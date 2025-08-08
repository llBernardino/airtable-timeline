import React from "react";
import { formatZoomLevel, TIMELINE_CONFIG } from "../utils/timelineUtils.js";

const TimelineHeader = ({
  scale,
  onScaleChange,
  headerScaleRef,
  onZoomToFit,
  isDarkMode,
}) => {
  const startDate = new Date(TIMELINE_CONFIG.START_DATE);
  const endDate = new Date(TIMELINE_CONFIG.END_DATE);
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const timelineWidth = totalDays * scale;

  const months = [];
  // Generate all 12 months of 2021
  for (let month = 0; month < 12; month++) {
    const date = new Date(2021, month, 1);
    const daysFromStart = (date - startDate) / (1000 * 60 * 60 * 24);
    months.push({
      date: date,
      left: Math.max(20, daysFromStart * scale), // Add minimum padding for first month
    });
  }

  const handleZoomIn = () => {
    onScaleChange(Math.min(TIMELINE_CONFIG.MAX_SCALE, scale * 1.5));
  };

  const handleZoomOut = () => {
    onScaleChange(Math.max(TIMELINE_CONFIG.MIN_SCALE, scale / 1.5));
  };

  return (
    <div
      className={`timeline-header ${isDarkMode ? "dark-mode" : ""}`}
      style={{
        background: isDarkMode ? "#2d3748" : "#fafbfc",
        borderBottom: `1px solid ${isDarkMode ? "#4a5568" : "#e1e5e9"}`,
        transition: "all 0.3s ease",
      }}
    >
      <div className={`timeline-controls ${isDarkMode ? "dark-mode" : ""}`}>
        <button onClick={handleZoomOut} title="Zoom Out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13H5v-2h14v2z" />
          </svg>
        </button>
        <span className="zoom-level">{formatZoomLevel(scale)}</span>
        <button onClick={handleZoomIn} title="Zoom In">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
        <button
          onClick={onZoomToFit}
          title="Fit to Screen"
          className="fit-button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L21 15v6h-6z" />
          </svg>
        </button>
      </div>
      <div className="timeline-scale-container" ref={headerScaleRef}>
        <div className="timeline-scale" style={{ width: `${timelineWidth}px` }}>
          {months.map((month, index) => (
            <div
              key={index}
              className={`timeline-month ${isDarkMode ? "dark-mode" : ""}`}
              style={{ left: `${month.left}px` }}
            >
              {month.date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineHeader;
