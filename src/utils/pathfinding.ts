import { Vector2D, WallObstacle } from '../types/game';

interface PathNode {
  x: number; // grid col
  y: number; // grid row
  g: number;
  h: number;
  f: number;
  parent: PathNode | null;
}

/**
 * A* Pathfinding in continuous 2D space with a grid representation.
 * Checks against the level's WallObstacles with a buffer for agent size.
 */
export function findPath(
  start: Vector2D,
  end: Vector2D,
  walls: WallObstacle[],
  mapWidth: number,
  mapHeight: number,
  agentSize: number = 36
): Vector2D[] {
  const cellSize = 32;
  const cols = Math.ceil(mapWidth / cellSize);
  const rows = Math.ceil(mapHeight / cellSize);

  // Convert start/end points to grid coords
  const startCol = Math.max(0, Math.min(cols - 1, Math.floor(start.x / cellSize)));
  const startRow = Math.max(0, Math.min(rows - 1, Math.floor(start.y / cellSize)));
  const endCol = Math.max(0, Math.min(cols - 1, Math.floor(end.x / cellSize)));
  const endRow = Math.max(0, Math.min(rows - 1, Math.floor(end.y / cellSize)));

  // If start is the same as end, return end point directly
  if (startCol === endCol && startRow === endRow) {
    return [end];
  }

  // Safe check if a grid cell overlaps any walls
  const isWalkable = (col: number, row: number): boolean => {
    const x = col * cellSize;
    const y = row * cellSize;

    // Check map boundary collisions
    if (x < 15 || x + cellSize > mapWidth - 15 || y < 15 || y + cellSize > mapHeight - 15) {
      return false;
    }

    // A lighter buffer (8px) allows sếp to easily find paths through narrow doorways and corridors,
    // while the physical collision sliding loop handles the outer body boundaries.
    const buffer = 8;

    for (const wall of walls) {
      if (
        x + cellSize - buffer > wall.x &&
        x + buffer < wall.x + wall.width &&
        y + cellSize - buffer > wall.y &&
        y + buffer < wall.y + wall.height
      ) {
        return false;
      }
    }
    return true;
  };

  // Keep track of visited nodes using coordinates key
  const nodeKey = (col: number, row: number) => `${col},${row}`;
  const openSet: PathNode[] = [];
  const closedSet = new Set<string>();

  // Ensure end point is walkable or find nearest walkable cell
  let targetCol = endCol;
  let targetRow = endRow;
  if (!isWalkable(targetCol, targetRow)) {
    // Search in concentric squares around the target for the nearest walkable cell
    let found = false;
    for (let r = 1; r < 5 && !found; r++) {
      for (let dc = -r; dc <= r && !found; dc++) {
        for (let dr = -r; dr <= r && !found; dr++) {
          if (Math.abs(dc) !== r && Math.abs(dr) !== r) continue;
          const cc = endCol + dc;
          const cr = endRow + dr;
          if (cc >= 0 && cc < cols && cr >= 0 && cr < rows && isWalkable(cc, cr)) {
            targetCol = cc;
            targetRow = cr;
            found = true;
          }
        }
      }
    }
  }

  const startNode: PathNode = {
    x: startCol,
    y: startRow,
    g: 0,
    h: Math.hypot(startCol - targetCol, startRow - targetRow),
    f: 0,
    parent: null
  };
  startNode.f = startNode.g + startNode.h;
  openSet.push(startNode);

  let iterations = 0;
  const maxIterations = 800; // performance safety cap

  while (openSet.length > 0 && iterations < maxIterations) {
    iterations++;

    // Find node in openSet with the lowest f value
    let bestIdx = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].f < openSet[bestIdx].f) {
        bestIdx = i;
      }
    }

    const current = openSet[bestIdx];

    // Reached the grid target cell! Reconstruct path.
    if (current.x === targetCol && current.y === targetRow) {
      const pathPoints: Vector2D[] = [];
      let temp: PathNode | null = current;
      while (temp !== null) {
        pathPoints.push({
          x: temp.x * cellSize + cellSize / 2,
          y: temp.y * cellSize + cellSize / 2
        });
        temp = temp.parent;
      }
      pathPoints.reverse();
      // Ensure the exact end position is the final node of the path
      pathPoints.push(end);
      return pathPoints;
    }

    openSet.splice(bestIdx, 1);
    closedSet.add(nodeKey(current.x, current.y));

    // 8-directional neighbors (up, down, left, right, and diagonals)
    const movements = [
      { dx: 0, dy: -1, cost: 1 },
      { dx: 0, dy: 1, cost: 1 },
      { dx: -1, dy: 0, cost: 1 },
      { dx: 1, dy: 0, cost: 1 },
      { dx: -1, dy: -1, cost: 1.414 },
      { dx: 1, dy: -1, cost: 1.414 },
      { dx: -1, dy: 1, cost: 1.414 },
      { dx: 1, dy: 1, cost: 1.414 }
    ];

    for (const move of movements) {
      const col = current.x + move.dx;
      const row = current.y + move.dy;

      // Ensure index is valid
      if (col < 0 || col >= cols || row < 0 || row >= rows) continue;
      // Skip if already evaluated
      if (closedSet.has(nodeKey(col, row))) continue;
      // Skip if contains solid wall
      if (!isWalkable(col, row)) continue;

      const newG = current.g + move.cost;
      let neighborNode = openSet.find((node) => node.x === col && node.y === row);

      if (!neighborNode) {
        neighborNode = {
          x: col,
          y: row,
          g: newG,
          h: Math.hypot(col - targetCol, row - targetRow),
          f: 0,
          parent: current
        };
        neighborNode.f = neighborNode.g + neighborNode.h;
        openSet.push(neighborNode);
      } else if (newG < neighborNode.g) {
        neighborNode.g = newG;
        neighborNode.f = neighborNode.g + neighborNode.h;
        neighborNode.parent = current;
      }
    }
  }

  // If A* fails due to safety iteration cap or blocks, fallback to a direct path
  return [end];
}
