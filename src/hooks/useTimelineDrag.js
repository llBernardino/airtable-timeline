import { useState, useRef } from "react";
import { TIMELINE_CONFIG } from "../utils/timelineUtils.js";

export const useTimelineDrag = (items, setItems, setForcedPositions) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [draggedFromLane, setDraggedFromLane] = useState(null);
  const [dragPreview, setDragPreview] = useState(null);
  const draggedItemRef = useRef(null);

  const handleDragStart = (e, item, laneIndex) => {
    setDraggedItem(item);
    setDraggedItemId(item.id);
    setDraggedFromLane(laneIndex);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id.toString());

    // Set drag image to be invisible
    const dragImage = new Image();
    dragImage.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e, scale, timelineContainerRef) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (!draggedItem || !timelineContainerRef.current) return;

    const rect = timelineContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + timelineContainerRef.current.scrollLeft;
    const y = e.clientY - rect.top;

    // Calculate new position
    const daysOffset = Math.round(x / scale);
    const targetLane = Math.max(0, Math.floor(y / TIMELINE_CONFIG.LANE_HEIGHT));

    const newStartDate = new Date(TIMELINE_CONFIG.START_DATE);
    newStartDate.setDate(newStartDate.getDate() + Math.max(0, daysOffset));

    const duration =
      (new Date(draggedItem.end) - new Date(draggedItem.start)) /
      (1000 * 60 * 60 * 24);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + duration);

    setDragPreview({
      start: newStartDate.toISOString().split("T")[0],
      end: newEndDate.toISOString().split("T")[0],
      targetLane: targetLane,
      x: x - timelineContainerRef.current.scrollLeft,
      y: y,
    });
  };

  const handleDragEnd = (e) => {
    if (!draggedItem || !dragPreview) {
      setDraggedItem(null);
      setDraggedItemId(null);
      setDraggedFromLane(null);
      setDragPreview(null);
      return;
    }

    const newStartDate = new Date(dragPreview.start);
    const newEndDate = new Date(dragPreview.end);
    const targetLane = dragPreview.targetLane;

    // Ensure dates are within bounds
    const minDate = new Date(TIMELINE_CONFIG.START_DATE);
    const maxDate = new Date(TIMELINE_CONFIG.END_DATE);

    if (newStartDate < minDate) newStartDate.setTime(minDate.getTime());
    if (newEndDate > maxDate) newEndDate.setTime(maxDate.getTime());
    if (newStartDate > maxDate) newStartDate.setTime(maxDate.getTime());

    // Create updated item
    const updatedItem = {
      ...draggedItem,
      start: newStartDate.toISOString().split("T")[0],
      end: newEndDate.toISOString().split("T")[0],
    };

    // Update items
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === draggedItem.id ? updatedItem : item))
    );

    // Force the item to be in the target lane
    setForcedPositions((prev) => ({
      ...prev,
      [draggedItem.id]: targetLane,
    }));

    // Clean up drag state
    setDraggedItem(null);
    setDraggedItemId(null);
    setDraggedFromLane(null);
    setDragPreview(null);
  };

  return {
    draggedItem,
    draggedItemId,
    draggedFromLane,
    dragPreview,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
