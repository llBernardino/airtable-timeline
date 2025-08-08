/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * Uses a greedy algorithm to minimize the number of lanes needed.
 *
 * Algorithm:
 * 1. Sort items by start date (ascending)
 * 2. For each item, find the first lane where it doesn't overlap with any item
 * 3. If no suitable lane found, create a new lane
 *
 * @param {Array} items - Array of timeline items with start and end dates
 * @returns {Array} Array of arrays, where each inner array represents a lane
 */
function assignLanes(items) {
  // Sort items by start date to process them in chronological order
  const sortedItems = items.sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  const lanes = [];

  /**
   * Checks if an item can fit in a specific lane
   * @param {Object} item - The item to check
   * @param {Array} lane - The lane to check
   * @returns {boolean} True if item can fit in the lane
   */
  function canItemFitInLane(item, lane) {
    const itemStart = new Date(item.start);
    const itemEnd = new Date(item.end);

    for (const laneItem of lane) {
      const laneItemStart = new Date(laneItem.start);
      const laneItemEnd = new Date(laneItem.end);

      // Check for overlap
      if (itemStart < laneItemEnd && itemEnd > laneItemStart) {
        return false;
      }
    }
    return true;
  }

  /**
   * Tries to assign an item to an existing lane
   * @param {Object} item - The item to assign
   * @returns {boolean} True if assigned, false if new lane needed
   */
  function assignItemToLane(item) {
    for (const lane of lanes) {
      if (canItemFitInLane(item, lane)) {
        lane.push(item);
        return true;
      }
    }
    return false;
  }

  // Process each item
  for (const item of sortedItems) {
    // Try to assign to existing lane, if not possible create new lane
    if (!assignItemToLane(item)) {
      lanes.push([item]);
    }
  }

  return lanes;
}

export default assignLanes;
