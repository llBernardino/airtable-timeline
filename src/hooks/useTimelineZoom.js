import { useState, useEffect } from "react";
import {
  TIMELINE_CONFIG,
  calculateZoomFactor,
  clampScale,
} from "../utils/timelineUtils.js";

export const useTimelineZoom = (timelineContainerRef, headerScaleRef) => {
  const [scale, setScale] = useState(20);

  const calculateOptimalScale = () => {
    const containerWidth = timelineContainerRef.current?.clientWidth || 1200;
    const startDate = new Date(TIMELINE_CONFIG.START_DATE);
    const endDate = new Date(TIMELINE_CONFIG.END_DATE);
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    return Math.max(TIMELINE_CONFIG.MIN_SCALE, containerWidth / totalDays);
  };

  const handleZoomToFit = () => {
    const optimalScale = calculateOptimalScale();
    setScale(optimalScale);

    if (timelineContainerRef.current) {
      timelineContainerRef.current.scrollLeft = 0;
    }
  };

  // Handle mouse wheel zoom
  useEffect(() => {
    const timelineContainer = timelineContainerRef.current;

    if (timelineContainer) {
      const handleWheel = (e) => {
        e.preventDefault();

        const rect = timelineContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const scrollLeft = timelineContainer.scrollLeft;

        const isFineZoom = e.ctrlKey || e.metaKey;
        const zoomFactor = calculateZoomFactor(e.deltaY, isFineZoom);
        const newScale = clampScale(scale * zoomFactor);
        const zoomRatio = newScale / scale;
        const newScrollLeft = mouseX * zoomRatio - mouseX + scrollLeft;

        setScale(newScale);

        setTimeout(() => {
          if (timelineContainer) {
            timelineContainer.scrollLeft = newScrollLeft;
          }
        }, 0);
      };

      const handleDoubleClick = (e) => {
        if (e.target === timelineContainer) {
          handleZoomToFit();
        }
      };

      timelineContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      timelineContainer.addEventListener("dblclick", handleDoubleClick);

      return () => {
        timelineContainer.removeEventListener("wheel", handleWheel);
        timelineContainer.removeEventListener("dblclick", handleDoubleClick);
      };
    }
  }, [scale]);

  return {
    scale,
    setScale,
    handleZoomToFit,
    calculateOptimalScale,
  };
};
