import { useState, useEffect } from "react";

export const useTimelinePan = (timelineContainerRef, headerScaleRef) => {
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, scrollLeft: 0 });

  const handleMouseDown = (e) => {
    const isClickingOnItem = e.target.closest(".timeline-item");
    const isClickingOnControl = e.target.closest(".timeline-controls");
    const isClickingOnHeader = e.target.closest(".timeline-header");

    if (!isClickingOnItem && !isClickingOnControl && !isClickingOnHeader) {
      setIsPanning(true);
      setPanStart({
        x: e.clientX,
        scrollLeft: timelineContainerRef.current?.scrollLeft || 0,
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;

    const timelineContainer = timelineContainerRef.current;
    const headerScale = headerScaleRef.current;

    if (timelineContainer) {
      const dx = e.clientX - panStart.x;
      const newScrollLeft = Math.max(0, panStart.scrollLeft - dx);

      timelineContainer.scrollLeft = newScrollLeft;

      if (headerScale) {
        headerScale.scrollLeft = newScrollLeft;
      }
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Pan event listeners
  useEffect(() => {
    if (isPanning) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();

      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }
  }, [isPanning, panStart]);

  return {
    isPanning,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
