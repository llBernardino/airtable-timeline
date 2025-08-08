// Constants
export const TIMELINE_CONFIG = {
  START_DATE: "2021-01-01",
  END_DATE: "2021-12-31",
  MIN_SCALE: 3.7,
  MAX_SCALE: 32,
  LANE_HEIGHT: 60,
  MIN_ITEM_WIDTH: 80,
  BASE_DATE: new Date("2021-01-01"),
};

// Date utilities
export const calculateDaysFromStart = (date) => {
  return (new Date(date) - TIMELINE_CONFIG.BASE_DATE) / (1000 * 60 * 60 * 24);
};

export const calculateItemPosition = (item, scale) => {
  const startDate = new Date(item.start);
  const endDate = new Date(item.end);
  const duration = Math.max(
    1,
    (endDate - startDate) / (1000 * 60 * 60 * 24) + 1
  );

  const left = calculateDaysFromStart(item.start) * scale;
  const width = duration * scale;

  return {
    left: `${left}px`,
    width: `${Math.max(width, TIMELINE_CONFIG.MIN_ITEM_WIDTH)}px`,
  };
};

export const generateItemColor = (itemId) => {
  return `hsl(${(itemId * 137.5) % 360}, 70%, 60%)`;
};

// Format date for display (YYYY-MM-DD to YYYY/MM/DD)
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return "";

  return dateString.replace(/-/g, "/");
};

// Format date range for display
export const formatDateRangeForDisplay = (startDate, endDate) => {
  const formattedStart = formatDateForDisplay(startDate);
  const formattedEnd = formatDateForDisplay(endDate);
  return `${formattedStart} - ${formattedEnd}`;
};

// Lane assignment utilities
export const assignLanes = (items, forcedPositions = {}) => {
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  const lanes = [];
  const itemLaneMap = new Map();

  const itemsOverlap = (item1, item2) => {
    const start1 = new Date(item1.start);
    const end1 = new Date(item1.end);
    const start2 = new Date(item2.start);
    const end2 = new Date(item2.end);

    return start1 < end2 && end1 > start2;
  };

  const findBestLane = (item) => {
    if (forcedPositions[item.id] !== undefined) {
      const forcedLane = forcedPositions[item.id];

      while (lanes.length <= forcedLane) {
        lanes.push([]);
      }

      const canFit = lanes[forcedLane].every(
        (laneItem) => !itemsOverlap(item, laneItem)
      );

      if (canFit) {
        return forcedLane;
      }
    }

    for (let i = 0; i < lanes.length; i++) {
      const canFit = lanes[i].every(
        (laneItem) => !itemsOverlap(item, laneItem)
      );
      if (canFit) {
        return i;
      }
    }

    return lanes.length;
  };

  for (const item of sortedItems) {
    const laneIndex = findBestLane(item);

    while (lanes.length <= laneIndex) {
      lanes.push([]);
    }

    lanes[laneIndex].push(item);
    itemLaneMap.set(item.id, laneIndex);
  }

  return { lanes, itemLaneMap };
};

// Zoom utilities
export const formatZoomLevel = (scale) => {
  if (scale < 10) {
    return `${Math.round(scale * 10) / 10}x`;
  } else if (scale < 100) {
    return `${Math.round(scale)}x`;
  } else {
    return `${Math.round(scale / 10)}0x`;
  }
};

export const calculateZoomFactor = (deltaY, isFineZoom) => {
  if (isFineZoom) {
    return deltaY > 0 ? 0.95 : 1.05;
  } else {
    return deltaY > 0 ? 0.85 : 1.15;
  }
};

export const clampScale = (scale) => {
  return Math.max(
    TIMELINE_CONFIG.MIN_SCALE,
    Math.min(TIMELINE_CONFIG.MAX_SCALE, scale)
  );
};
