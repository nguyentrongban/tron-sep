import { Player, Boss, SecurityCamera, HidingSpot, ItemCollectible, WallObstacle, NoiseDistraction, ParticleEffect } from '../types/game';
import mapBgAsset from '../assets/images/pixel_office_map_1600x896_1790746436914.jpg';

// Preload Map Image
const cachedOfficeMapImg = new Image();
cachedOfficeMapImg.src = mapBgAsset;
let isOfficeMapImgLoaded = false;
cachedOfficeMapImg.onload = () => {
  isOfficeMapImgLoaded = true;
};

// Check if a line segment intersects another line segment
export function getLineIntersection(
  p0_x: number, p0_y: number, p1_x: number, p1_y: number,
  p2_x: number, p2_y: number, p3_x: number, p3_y: number
): { x: number; y: number; dist: number } | null {
  const s1_x = p1_x - p0_x;
  const s1_y = p1_y - p0_y;
  const s2_x = p3_x - p2_x;
  const s2_y = p3_y - p2_y;

  const s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
  const t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    const ix = p0_x + (t * s1_x);
    const iy = p0_y + (t * s1_y);
    const dist = Math.hypot(ix - p0_x, iy - p0_y);
    return { x: ix, y: iy, dist };
  }
  return null;
}

// Raycast to find the closest hit on any wall
export function castRayAgainstWalls(
  originX: number,
  originY: number,
  angle: number,
  maxDistance: number,
  walls: WallObstacle[]
): { x: number; y: number; dist: number } {
  const targetX = originX + Math.cos(angle) * maxDistance;
  const targetY = originY + Math.sin(angle) * maxDistance;

  let closestHit = { x: targetX, y: targetY, dist: maxDistance };

  for (const wall of walls) {
    // Fast AABB bounding box check before ray-segment testing
    if (
      wall.x + wall.width < originX - maxDistance ||
      wall.x > originX + maxDistance ||
      wall.y + wall.height < originY - maxDistance ||
      wall.y > originY + maxDistance
    ) {
      continue;
    }

    // Only solid obstacles block vision (walls, tall cubicles, servers, printers)
    const segments = [
      // Top edge
      [wall.x, wall.y, wall.x + wall.width, wall.y],
      // Bottom edge
      [wall.x, wall.y + wall.height, wall.x + wall.width, wall.y + wall.height],
      // Left edge
      [wall.x, wall.y, wall.x, wall.y + wall.height],
      // Right edge
      [wall.x + wall.width, wall.y, wall.x + wall.width, wall.y + wall.height]
    ];

    for (const [x1, y1, x2, y2] of segments) {
      const hit = getLineIntersection(originX, originY, targetX, targetY, x1, y1, x2, y2);
      if (hit && hit.dist < closestHit.dist) {
        closestHit = hit;
      }
    }
  }

  return closestHit;
}

/**
 * Draw the office background grid tiles, carpets, and decals
 */
export function drawOfficeFloor(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frame: number
) {
  ctx.save();

  // If the 1600x896 map image is loaded, render it directly as the background map
  if (width === 1600 && height === 896 && isOfficeMapImgLoaded) {
    ctx.drawImage(cachedOfficeMapImg, 0, 0, width, height);

    // Subtle ambient lighting overlay
    ctx.fillStyle = 'rgba(11, 9, 26, 0.15)';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    return;
  }

  const tileSize = (width === 1600 || width % 32 === 0) ? 32 : 40;

  // Dark purple/indigo base carpet color matching "Trốn Sếp Tan Ca"
  ctx.fillStyle = '#0B091A';
  ctx.fillRect(0, 0, width, height);

  // 32x32 Checkerboard & carpet pattern
  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {
      const col = Math.floor(x / tileSize);
      const row = Math.floor(y / tileSize);

      // Boundary wall tile background shadow
      if (col === 0 || row === 0 || col === Math.floor(width / tileSize) - 1 || row === Math.floor(height / tileSize) - 1) {
        ctx.fillStyle = '#05040F';
      } else if ((col + row) % 2 === 0) {
        ctx.fillStyle = '#13102C'; // Main office floor tile A
      } else {
        ctx.fillStyle = '#1A163B'; // Main office floor tile B
      }
      ctx.fillRect(x, y, tileSize, tileSize);

      // Corridor / Highway Carpet Runners (wide aisles)
      const isMainAisleHorizontal = (row >= 15 && row <= 17);
      const isMainAisleVertical = (col >= 12 && col <= 14) || (col >= 25 && col <= 27) || (col >= 38 && col <= 40);

      if (isMainAisleHorizontal || isMainAisleVertical) {
        ctx.fillStyle = '#231F4D'; // Carpet runner
        ctx.fillRect(x, y, tileSize, tileSize);

        // Subtle carpet inner stitch line
        if ((col + row) % 2 === 0) {
          ctx.fillStyle = '#2D2862';
          ctx.fillRect(x + 4, y + 4, tileSize - 8, tileSize - 8);
        }
      }

      // Executive room carpet (cols 36..48, rows 1..18)
      if (col >= 36 && col <= 48 && row >= 1 && row <= 18) {
        ctx.fillStyle = '#2A1F52';
        ctx.fillRect(x, y, tileSize, tileSize);
        if ((col + row) % 2 === 0) {
          ctx.fillStyle = '#342663';
          ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);
        }
      }
    }
  }

  // 32x32 Pixel tile grid lines
  ctx.strokeStyle = '#181432';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x < width; x += tileSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += tileSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();

  ctx.restore();
}

/**
 * Draw Exit Door with glowing neon sign
 */
export function drawExitZone(
  ctx: CanvasRenderingContext2D,
  exit: { x: number; y: number; width: number; height: number; requiredItemType?: string },
  isUnlocked: boolean,
  frame: number
) {
  ctx.save();
  const { x, y, width, height } = exit;

  // Door floor threshold
  const glow = 0.5 + 0.3 * Math.sin(frame * 0.08);
  ctx.fillStyle = isUnlocked ? `rgba(34, 197, 94, ${glow * 0.4})` : `rgba(239, 68, 68, 0.2)`;
  ctx.fillRect(x - 10, y - 10, width + 20, height + 20);

  // Door frame
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = isUnlocked ? '#22c55e' : '#ef4444';
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, width, height);

  // Door glass
  ctx.fillStyle = isUnlocked ? '#14532d' : '#450a0a';
  ctx.fillRect(x + 4, y + 4, width - 8, height - 8);

  // Exit Sign on top
  ctx.fillStyle = isUnlocked ? '#22c55e' : '#ef4444';
  ctx.fillRect(x + width / 2 - 28, y - 14, 56, 16);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(isUnlocked ? 'EXIT ➔' : 'LOCKED', x + width / 2, y - 3);

  // Running man icon
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px sans-serif';
  ctx.fillText(isUnlocked ? '🏃' : '🔒', x + width / 2, y + height / 2 + 5);

  ctx.restore();
}

/**
 * Draw Wall Obstacles and Furniture
 */
export function drawObstacles(ctx: CanvasRenderingContext2D, walls: WallObstacle[], frame: number) {
  ctx.save();

  for (const wall of walls) {
    if (wall.type === 'wall') {
      // Solid concrete boundary wall
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(wall.x + 2, wall.y + 2, wall.width - 4, wall.height - 4);

      // Top wall trim
      ctx.fillStyle = '#334155';
      ctx.fillRect(wall.x, wall.y, wall.width, 4);
    } else if (wall.type === 'cubicle') {
      // Office cubicle desk with wood top and divider
      ctx.fillStyle = '#475569';
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

      // Tabletop wood grain
      ctx.fillStyle = '#78350f';
      ctx.fillRect(wall.x + 2, wall.y + 4, wall.width - 4, wall.height - 8);

      ctx.fillStyle = '#b45309';
      ctx.fillRect(wall.x + 4, wall.y + 6, wall.width - 8, wall.height - 12);

      // Computer monitor on desk
      const monCount = Math.max(1, Math.floor(wall.width / 70));
      for (let m = 0; m < monCount; m++) {
        const mx = wall.x + 20 + m * 60;
        const my = wall.y + 8;
        // Monitor stand
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(mx + 6, my + 14, 8, 4);
        // Monitor screen
        ctx.fillStyle = '#020617';
        ctx.fillRect(mx, my, 20, 14);
        // Blinking screen content (code or chart)
        const screenColor = (frame + m * 15) % 40 < 20 ? '#22c55e' : '#38bdf8';
        ctx.fillStyle = screenColor;
        ctx.fillRect(mx + 2, my + 2, 16, 10);
        // Code lines
        ctx.fillStyle = '#000000';
        ctx.fillRect(mx + 4, my + 4, 12, 1);
        ctx.fillRect(mx + 4, my + 7, 8, 1);
      }

      // Keyboard
      ctx.fillStyle = '#334155';
      ctx.fillRect(wall.x + 18, wall.y + wall.height - 10, 24, 6);

      // Coffee mug on desk
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(wall.x + wall.width - 20, wall.y + 10, 6, 8);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(wall.x + wall.width - 15, wall.y + 12, 2, 4);

    } else if (wall.type === 'server') {
      // IT Server Rack
      ctx.fillStyle = '#090d16';
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
      ctx.strokeStyle = '#1e293b';
      ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);

      // Server slots with blinking green/yellow LEDs
      const slots = Math.floor(wall.height / 10);
      for (let s = 0; s < slots; s++) {
        const sy = wall.y + 4 + s * 10;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(wall.x + 4, sy, wall.width - 8, 7);

        // Blinking LEDs
        const isBlinking = ((frame + s * 7) % 30) < 15;
        ctx.fillStyle = isBlinking ? '#22c55e' : '#eab308';
        ctx.fillRect(wall.x + 8, sy + 2, 3, 3);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(wall.x + 14, sy + 2, 3, 3);
      }
    } else if (wall.type === 'printer') {
      // Large photocopy printer
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(wall.x + 4, wall.y + 4, wall.width - 8, 16);
      // Paper tray
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(wall.x + 10, wall.y + 8, wall.width - 20, 8);
      // Status light
      ctx.fillStyle = (frame % 40 < 20) ? '#22c55e' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(wall.x + wall.width - 12, wall.y + 12, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (wall.type === 'water_cooler') {
      // Water dispenser with bubbly bottle
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(wall.x + 5, wall.y + 20, wall.width - 10, wall.height - 20);
      // Blue bottle
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(wall.x + 8, wall.y, wall.width - 16, 22, 6);
      ctx.fill();
      // Bubble animation inside
      if (frame % 20 < 10) {
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.arc(wall.x + wall.width / 2, wall.y + 10, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.restore();
}

/**
 * Draw Hiding Spots (Cardboard Box, Plant, Desk)
 */
export function drawHidingSpots(ctx: CanvasRenderingContext2D, spots: HidingSpot[], frame: number) {
  ctx.save();

  for (const spot of spots) {
    if (spot.type === 'box') {
      // Metal Gear Solid style Cardboard Box!
      const { x, y, width, height, isOccupied } = spot;
      const wobble = isOccupied ? Math.sin(frame * 0.15) * 1.5 : 0;

      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(wobble * 0.03);

      // Box Body
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-width / 2, -height / 2, width, height);

      ctx.fillStyle = '#d97706';
      ctx.fillRect(-width / 2 + 3, -height / 2 + 3, width - 6, height - 6);

      // Packing tape down center
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(-6, -height / 2, 12, height);

      // "FRAGILE" or Cute Box Text
      ctx.fillStyle = '#78350f';
      ctx.font = 'bold 7px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('THIS SIDE UP', 0, -6);
      ctx.fillText('📦 THE BOX', 0, 14);

      // If occupied by player, draw cute chibi eyes peeking out through holes!
      if (isOccupied) {
        const eyeWink = (frame % 120 > 110);
        ctx.fillStyle = '#000000';
        ctx.fillRect(-12, 1, 8, 7);
        ctx.fillRect(4, 1, 8, 7);

        if (!eyeWink) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-10, 2, 4, 5);
          ctx.fillRect(6, 2, 4, 5);
          ctx.fillStyle = '#000000';
          ctx.fillRect(-9, 3, 2, 3);
          ctx.fillRect(7, 3, 2, 3);
        } else {
          // Closed eye slit
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-10, 5); ctx.lineTo(-6, 5);
          ctx.moveTo(6, 5); ctx.lineTo(10, 5);
          ctx.stroke();
        }
      }

      ctx.restore();

    } else if (spot.type === 'plant') {
      // Large Potted Office Plant (Monstera)
      const { x, y, width, height, isOccupied } = spot;
      const rustle = isOccupied ? Math.sin(frame * 0.2) * 2 : 0;

      // Pot
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.moveTo(x + 8, y + height - 20);
      ctx.lineTo(x + width - 8, y + height - 20);
      ctx.lineTo(x + width - 12, y + height);
      ctx.lineTo(x + 12, y + height);
      ctx.closePath();
      ctx.fill();

      // Leaves with lush green layers
      ctx.save();
      ctx.translate(x + width / 2, y + 16);
      ctx.rotate(rustle * 0.02);

      const leafColors = ['#15803d', '#16a34a', '#22c55e', '#4ade80'];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.fillStyle = leafColors[i % leafColors.length];
        ctx.beginPath();
        ctx.ellipse(
          Math.cos(angle) * 14,
          Math.sin(angle) * 12,
          14,
          8,
          angle,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      if (isOccupied) {
        // Cute chibi eyes hidden among leaves
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-5, -2, 3, 0, Math.PI * 2);
        ctx.arc(5, -2, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(-5, -2, 1.5, 0, Math.PI * 2);
        ctx.arc(5, -2, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

    } else if (spot.type === 'desk') {
      // Empty Desk with space under
      const { x, y, width, height, isOccupied } = spot;
      ctx.fillStyle = '#334155';
      ctx.fillRect(x, y, width, height);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 6, y + 14, width - 12, height - 14);

      if (isOccupied) {
        // Two glowing cute eyes in shadow
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(x + width / 2 - 6, y + height / 2 + 2, 3, 0, Math.PI * 2);
        ctx.arc(x + width / 2 + 6, y + height / 2 + 2, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.restore();
}

/**
 * Draw Collectible Items (ID card, Key, Coffee, Paper distraction)
 */
export function drawCollectibles(
  ctx: CanvasRenderingContext2D,
  items: ItemCollectible[],
  frame: number
) {
  ctx.save();

  for (const item of items) {
    if (item.isCollected) continue;

    const bobbing = Math.sin(frame * 0.1 + item.x) * 3;
    const ix = item.x;
    const iy = item.y + bobbing;

    // Golden glow circle
    const glowRadius = 14 + Math.sin(frame * 0.15) * 2;
    const grad = ctx.createRadialGradient(ix, iy, 2, ix, iy, glowRadius);
    grad.addColorStop(0, 'rgba(250, 204, 21, 0.4)');
    grad.addColorStop(1, 'rgba(250, 204, 21, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(ix, iy, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    if (item.type === 'card') {
      // Employee Badge Card
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ix - 10, iy - 14, 20, 26);
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(ix - 8, iy - 12, 16, 8); // photo/header
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(ix - 8, iy - 1, 16, 2);
      ctx.fillRect(ix - 8, iy + 3, 10, 2);
      // Lanyard hole
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(ix, iy - 11, 2, 0, Math.PI * 2);
      ctx.fill();

    } else if (item.type === 'key') {
      // Golden Key
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(ix - 4, iy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#713f12';
      ctx.beginPath();
      ctx.arc(ix - 4, iy, 3, 0, Math.PI * 2);
      ctx.fill();
      // Key shaft & teeth
      ctx.fillStyle = '#eab308';
      ctx.fillRect(ix + 2, iy - 2, 12, 4);
      ctx.fillRect(ix + 10, iy + 2, 3, 4);
      ctx.fillRect(ix + 6, iy + 2, 2, 3);

    } else if (item.type === 'coffee') {
      // Coffee Cup Takeaway with steam
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(ix - 7, iy - 6, 14, 16);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ix - 8, iy - 9, 16, 4);
      // Steam
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ix - 2, iy - 12);
      ctx.quadraticCurveTo(ix - 5, iy - 16, ix - 2, iy - 20);
      ctx.stroke();

    } else if (item.type === 'paper_distraction') {
      // Paper ball / throw item
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(ix, iy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.stroke();

    } else if (item.type === 'backpack') {
      // Back bag
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(ix - 10, iy - 12, 20, 24, 6);
      ctx.fill();
      ctx.fillStyle = '#0369a1';
      ctx.fillRect(ix - 7, iy + 2, 14, 8);

    } else if (item.type === 'bonus_cash') {
      // Red & Gold Lucky Project Bonus Envelope (Lì xì / Phong bì dự án)
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.roundRect(ix - 9, iy - 12, 18, 24, 3);
      ctx.fill();
      // Gold flap and seal
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.moveTo(ix - 9, iy - 12);
      ctx.lineTo(ix, iy - 4);
      ctx.lineTo(ix + 9, iy - 12);
      ctx.closePath();
      ctx.fill();
      // Gold emblem "₫"
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('₫', ix, iy + 6);

    } else if (item.type === 'boba') {
      // Cup of Bubble Milk Tea
      ctx.fillStyle = '#fed7aa'; // milk tea drink
      ctx.beginPath();
      ctx.roundRect(ix - 7, iy - 8, 14, 18, 3);
      ctx.fill();
      // Cup lid & straw
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ix - 8, iy - 11, 16, 3);
      ctx.fillStyle = '#ec4899'; // pink straw
      ctx.fillRect(ix + 1, iy - 17, 3, 7);
      // Boba pearls
      ctx.fillStyle = '#18181b';
      ctx.beginPath();
      ctx.arc(ix - 3, iy + 5, 2, 0, Math.PI * 2);
      ctx.arc(ix + 2, iy + 6, 2, 0, Math.PI * 2);
      ctx.arc(ix - 1, iy + 2, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

/**
 * Draw Vision Cones with smooth raycasted boundary
 */
export function drawVisionCones(
  ctx: CanvasRenderingContext2D,
  bosses: Boss[],
  walls: WallObstacle[],
  frame: number
) {
  ctx.save();

  for (const boss of bosses) {
    const originX = boss.x + boss.width / 2;
    const originY = boss.y + boss.height / 2;
    const halfFov = boss.fieldOfView / 2;
    const numRays = 32;

    // Raycast polygon
    const points: { x: number; y: number }[] = [];
    points.push({ x: originX, y: originY });

    for (let i = 0; i <= numRays; i++) {
      const rayAngle = boss.facingAngle - halfFov + (i / numRays) * boss.fieldOfView;
      const hit = castRayAgainstWalls(originX, originY, rayAngle, boss.visionDistance, walls);
      points.push({ x: hit.x, y: hit.y });
    }

    // Determine color based on state
    let coneColorInner = 'rgba(34, 197, 94, 0.35)'; // calm green
    let coneColorOuter = 'rgba(34, 197, 94, 0.02)';

    if (boss.state === 'investigate') {
      coneColorInner = 'rgba(245, 158, 11, 0.45)'; // suspicious orange
      coneColorOuter = 'rgba(245, 158, 11, 0.05)';
    } else if (boss.state === 'chase' || boss.state === 'rage') {
      const pulse = 0.5 + 0.3 * Math.sin(frame * 0.3);
      coneColorInner = `rgba(239, 68, 68, ${pulse})`; // alarm red!
      coneColorOuter = 'rgba(239, 68, 68, 0.1)';
    }

    // Create radial gradient for light beam falloff
    const grad = ctx.createRadialGradient(
      originX, originY, 10,
      originX, originY, boss.visionDistance
    );
    grad.addColorStop(0, coneColorInner);
    grad.addColorStop(1, coneColorOuter);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.fill();

    // Subtle edge highlight for vision cone boundary
    ctx.strokeStyle = (boss.state === 'chase') ? '#ef4444' : (boss.state === 'investigate') ? '#f59e0b' : 'rgba(74, 222, 128, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 1; i < points.length; i++) {
      if (i === 1) ctx.moveTo(points[i].x, points[i].y);
      else ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Draw Security Cameras with sweeping laser beam
 */
export function drawCameras(
  ctx: CanvasRenderingContext2D,
  cameras: SecurityCamera[],
  walls: WallObstacle[],
  frame: number
) {
  ctx.save();

  for (const cam of cameras) {
    if (!cam.isActive) continue;

    // Draw camera vision beam
    const halfFov = cam.fieldOfView / 2;
    const numRays = 24;
    const points: { x: number; y: number }[] = [{ x: cam.x, y: cam.y }];

    for (let i = 0; i <= numRays; i++) {
      const rayAngle = cam.currentAngle - halfFov + (i / numRays) * cam.fieldOfView;
      const hit = castRayAgainstWalls(cam.x, cam.y, rayAngle, cam.visionDistance, walls);
      points.push({ x: hit.x, y: hit.y });
    }

    const grad = ctx.createRadialGradient(cam.x, cam.y, 5, cam.x, cam.y, cam.visionDistance);
    grad.addColorStop(0, 'rgba(239, 68, 68, 0.45)');
    grad.addColorStop(1, 'rgba(239, 68, 68, 0.05)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.fill();

    // Camera hardware base
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(cam.x, cam.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Camera barrel pointing in currentAngle
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cam.x, cam.y);
    ctx.lineTo(cam.x + Math.cos(cam.currentAngle) * 12, cam.y + Math.sin(cam.currentAngle) * 12);
    ctx.stroke();

    // Blinking red recording LED
    const isLedOn = frame % 30 < 15;
    ctx.fillStyle = isLedOn ? '#ef4444' : '#7f1d1d';
    ctx.beginPath();
    ctx.arc(cam.x, cam.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Draw Procedural Pixel Chibi Player Character
 */
export function drawPlayerChibi(
  ctx: CanvasRenderingContext2D,
  player: Player,
  frame: number
) {
  // If hiding in box, it's drawn via drawHidingSpots
  if (player.isHiding) return;

  ctx.save();
  const px = player.x + player.width / 2;
  const py = player.y + player.height / 2;

  // Walk bounce & leg swing
  const isMoving = Math.hypot(player.vx, player.vy) > 0.1;
  const bounceSpeed = player.isSprinting ? 0.35 : 0.2;
  const bounce = isMoving ? Math.abs(Math.sin(frame * bounceSpeed)) * (player.isSneaking ? 2 : 4) : 0;
  const legSwing = isMoving ? Math.sin(frame * bounceSpeed) * 6 : 0;

  ctx.translate(px, py - bounce);

  // Shadow on floor
  ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
  ctx.beginPath();
  ctx.ellipse(0, player.height / 2 + bounce - 2, 12, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Crouch posture when sneaking
  if (player.isSneaking) {
    ctx.scale(1, 0.85);
  }

  // --- Legs ---
  ctx.fillStyle = '#1e293b'; // dark pants
  // Left leg
  ctx.fillRect(-7, 8 + (isMoving ? legSwing : 0), 5, 9);
  // Right leg
  ctx.fillRect(2, 8 + (isMoving ? -legSwing : 0), 5, 9);
  // Shoes (white sneakers)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-8, 15 + (isMoving ? legSwing : 0), 7, 4);
  ctx.fillRect(1, 15 + (isMoving ? -legSwing : 0), 7, 4);

  // --- Torso / Clothes ---
  let shirtColor = '#3b82f6'; // default coder blue
  if (player.skin === 'designer') shirtColor = '#ec4899';
  if (player.skin === 'sales') shirtColor = '#ffffff';
  if (player.skin === 'ninja') shirtColor = '#18181b';
  if (player.skin === 'boba_lover') shirtColor = '#d97706'; // milk tea sweater
  if (player.skin === 'intern_vip') shirtColor = '#f8fafc'; // crisp suit
  if (player.skin === 'ceo_gold') shirtColor = '#eab308'; // royal gold suit

  ctx.fillStyle = shirtColor;
  ctx.beginPath();
  ctx.roundRect(-10, -4, 20, 14, 3);
  ctx.fill();

  // Golden sparkles aura for ceo_gold skin
  if (player.skin === 'ceo_gold') {
    ctx.fillStyle = '#fef08a';
    const sa = Math.sin(frame * 0.15) * 6;
    ctx.fillRect(-12 + sa, -8, 3, 3);
    ctx.fillRect(10 - sa, -6, 2, 2);
    ctx.fillRect(8, 12 + sa * 0.5, 3, 3);
  }

  // Tie for sales / intern_vip / ceo_gold skin
  if (player.skin === 'sales' || player.skin === 'intern_vip' || player.skin === 'ceo_gold') {
    ctx.fillStyle = player.skin === 'ceo_gold' ? '#7e22ce' : player.skin === 'intern_vip' ? '#eab308' : '#ef4444';
    ctx.beginPath();
    ctx.moveTo(-2, -4);
    ctx.lineTo(2, -4);
    ctx.lineTo(3, 4);
    ctx.lineTo(0, 8);
    ctx.lineTo(-3, 4);
    ctx.closePath();
    ctx.fill();
  }

  // Backpack on back if collected
  if (player.inventory.hasBackpack) {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-12, -2, 4, 10);
  }

  // Arms swinging
  ctx.fillStyle = shirtColor;
  ctx.fillRect(-12, -2 + (isMoving ? -legSwing * 0.8 : 0), 4, 9);
  ctx.fillRect(8, -2 + (isMoving ? legSwing * 0.8 : 0), 4, 9);

  // Chibi Hands
  ctx.fillStyle = '#fbcfe8'; // skin tone
  ctx.fillRect(-12, 6 + (isMoving ? -legSwing * 0.8 : 0), 4, 3);
  ctx.fillRect(8, 6 + (isMoving ? legSwing * 0.8 : 0), 4, 3);

  // --- Big Cute Chibi Head ---
  const headY = -18;
  // Face skin
  ctx.fillStyle = '#fde047'; // sunny cute skin tone or warm tone
  ctx.fillStyle = '#fcd34d';
  ctx.beginPath();
  ctx.roundRect(-13, headY, 26, 20, 8);
  ctx.fill();

  // Cute rosy blush cheeks!
  ctx.fillStyle = 'rgba(244, 63, 94, 0.45)';
  ctx.beginPath();
  ctx.ellipse(-8, headY + 12, 3, 2, 0, 0, Math.PI * 2);
  ctx.ellipse(8, headY + 12, 3, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair style based on skin
  let hairColor = '#3e2723';
  if (player.skin === 'designer') hairColor = '#06b6d4'; // bright teal hair
  if (player.skin === 'ninja') hairColor = '#1e1b4b';
  if (player.skin === 'boba_lover') hairColor = '#92400e';
  if (player.skin === 'intern_vip') hairColor = '#ca8a04'; // golden blond hair

  ctx.fillStyle = hairColor;
  // Hair base
  ctx.beginPath();
  ctx.roundRect(-14, headY - 4, 28, 11, 6);
  ctx.fill();
  // Bangs / hair tufts
  ctx.beginPath();
  ctx.moveTo(-14, headY + 4);
  ctx.lineTo(-9, headY + 7);
  ctx.lineTo(-4, headY + 5);
  ctx.lineTo(2, headY + 8);
  ctx.lineTo(8, headY + 5);
  ctx.lineTo(14, headY + 4);
  ctx.lineTo(14, headY - 2);
  ctx.lineTo(-14, headY - 2);
  ctx.closePath();
  ctx.fill();

  // Big Expressive Chibi Eyes
  const lookDir = Math.cos(player.facingAngle);
  const eyeOffset = Math.sign(lookDir) * 1.5;

  ctx.fillStyle = '#1e293b';
  // Left eye
  ctx.fillRect(-7 + eyeOffset, headY + 7, 4, 6);
  // Right eye
  ctx.fillRect(3 + eyeOffset, headY + 7, 4, 6);

  // Eye highlights (sparkle)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-6 + eyeOffset, headY + 8, 2, 2);
  ctx.fillRect(4 + eyeOffset, headY + 8, 2, 2);

  // Accessories
  if (player.accessory === 'sunglasses') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-10, headY + 6, 9, 6);
    ctx.fillRect(1, headY + 6, 9, 6);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.strokeRect(-1, headY + 7, 2, 1);
  } else if (player.accessory === 'ninja_band') {
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-14, headY - 1, 28, 4);
    // Flapping ribbon
    ctx.beginPath();
    ctx.moveTo(14, headY);
    ctx.lineTo(22 + Math.sin(frame * 0.2) * 3, headY + 3);
    ctx.lineTo(24 + Math.sin(frame * 0.2) * 3, headY + 6);
    ctx.lineTo(14, headY + 3);
    ctx.fill();
  } else if (player.accessory === 'box_hat') {
    ctx.fillStyle = '#d97706';
    ctx.fillRect(-8, headY - 12, 16, 10);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-4, headY - 8, 8, 4);
  } else if (player.accessory === 'golden_crown') {
    // Royal Golden Crown
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.moveTo(-10, headY - 4);
    ctx.lineTo(-12, headY - 14);
    ctx.lineTo(-5, headY - 8);
    ctx.lineTo(0, headY - 16);
    ctx.lineTo(5, headY - 8);
    ctx.lineTo(12, headY - 14);
    ctx.lineTo(10, headY - 4);
    ctx.closePath();
    ctx.fill();
    // Ruby in center
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, headY - 7, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sweat drop when sprinting or sneaking near a boss
  if (player.isSprinting || player.isSneaking) {
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(12, headY + 3, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Draw Procedural Boss / Chibi Boss Character
 */
export function drawBossChibi(
  ctx: CanvasRenderingContext2D,
  boss: Boss,
  frame: number
) {
  ctx.save();
  const bx = boss.x + boss.width / 2;
  const by = boss.y + boss.height / 2;

  const isMoving = boss.state !== 'investigate';
  const walkSpeed = boss.state === 'chase' ? 0.35 : 0.18;
  const bounce = isMoving ? Math.abs(Math.sin(frame * walkSpeed)) * (boss.state === 'chase' ? 4 : 2) : 0;
  const legSwing = isMoving ? Math.sin(frame * walkSpeed) * (boss.state === 'chase' ? 8 : 4) : 0;

  ctx.translate(bx, by - bounce);

  // Floor shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, boss.height / 2 + bounce - 2, 14, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Boss Legs
  ctx.fillStyle = boss.skin === 'guard' ? '#1e3a8a' : '#0f172a';
  ctx.fillRect(-8, 9 + legSwing, 6, 10);
  ctx.fillRect(2, 9 - legSwing, 6, 10);
  // Shiny leather shoes
  ctx.fillStyle = '#020617';
  ctx.fillRect(-9, 17 + legSwing, 8, 4);
  ctx.fillRect(1, 17 - legSwing, 8, 4);

  // Boss Body / Clothes
  if (boss.skin === 'boss_male') {
    // Sharp Black/Dark Navy Suit + Red Tie
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(-12, -4, 24, 16, 3);
    ctx.fill();
    // White shirt collar
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-5, -4);
    ctx.lineTo(5, -4);
    ctx.lineTo(0, 4);
    ctx.closePath();
    ctx.fill();
    // Red OT Tie
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-2, -2, 4, 10);
  } else if (boss.skin === 'boss_female') {
    // Elegant Purple/Maroon Blazer
    ctx.fillStyle = '#701a75';
    ctx.beginPath();
    ctx.roundRect(-12, -4, 24, 16, 3);
    ctx.fill();
    // Golden brooch
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(6, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (boss.skin === 'hr_snitch') {
    // HR pastel blouse with lanyard badge
    ctx.fillStyle = '#0d9488';
    ctx.beginPath();
    ctx.roundRect(-11, -4, 22, 15, 3);
    ctx.fill();
    // HR ID badge hanging
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-3, 3, 6, 8);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-3, 3, 6, 2);
  } else if (boss.skin === 'guard') {
    // Security Guard Uniform
    ctx.fillStyle = '#1d4ed8';
    ctx.beginPath();
    ctx.roundRect(-12, -4, 24, 16, 3);
    ctx.fill();
    // Security shoulder pads
    ctx.fillStyle = '#facc15';
    ctx.fillRect(-13, -4, 4, 2);
    ctx.fillRect(9, -4, 4, 2);
  }

  // Clipboard / Stack of OT documents in boss hand!
  ctx.fillStyle = '#78350f'; // clipboard wood
  ctx.fillRect(9, 2, 8, 12);
  ctx.fillStyle = '#ffffff'; // papers
  ctx.fillRect(10, 4, 6, 9);
  ctx.fillStyle = '#ef4444'; // red text "OT!"
  ctx.fillRect(11, 6, 4, 1);
  ctx.fillRect(11, 8, 4, 1);

  // Boss Head
  const headY = -20;
  ctx.fillStyle = '#fcd34d';
  ctx.beginPath();
  ctx.roundRect(-14, headY, 28, 20, 8);
  ctx.fill();

  // Hair / Cap
  if (boss.skin === 'guard') {
    // Security Cap
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(-15, headY - 4, 30, 8);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-16, headY + 1, 32, 3); // visor
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(0, headY - 1, 3, 0, Math.PI * 2); // gold badge
    ctx.fill();
  } else if (boss.skin === 'boss_female') {
    // Sharp hairstyle
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.roundRect(-15, headY - 5, 30, 12, 6);
    ctx.fill();
  } else {
    // Receding or combed boss hair
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.roundRect(-15, headY - 4, 30, 10, 6);
    ctx.fill();
  }

  // Boss Eyes & Expression
  const isChasing = boss.state === 'chase' || boss.state === 'rage';
  const isSuspicious = boss.state === 'investigate';

  if (isChasing) {
    // Angry blazing red eyes!
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-8, headY + 7, 5, 6);
    ctx.fillRect(3, headY + 7, 5, 6);

    // Angry angled eyebrows
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-9, headY + 4); ctx.lineTo(-3, headY + 7);
    ctx.moveTo(8, headY + 4); ctx.lineTo(2, headY + 7);
    ctx.stroke();

    // Angry shouting mouth
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(0, headY + 16, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-2, headY + 15, 4, 2);

    // Steam puffs from ears!
    const steam = Math.sin(frame * 0.4) * 3;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(-18 - steam, headY + 5, 3, 0, Math.PI * 2);
    ctx.arc(18 + steam, headY + 5, 3, 0, Math.PI * 2);
    ctx.fill();

  } else if (isSuspicious) {
    // Squinting curious eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(-7, headY + 8, 4, 4);
    ctx.fillRect(3, headY + 8, 4, 4);

    // Raised one eyebrow
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-8, headY + 4); ctx.lineTo(-3, headY + 4);
    ctx.moveTo(2, headY + 6); ctx.lineTo(7, headY + 6);
    ctx.stroke();

  } else {
    // Normal stern boss eyes
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-7, headY + 7, 4, 5);
    ctx.fillRect(3, headY + 7, 4, 5);
    // Glasses for boss
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.strokeRect(-9, headY + 6, 7, 6);
    ctx.strokeRect(2, headY + 6, 7, 6);
    ctx.beginPath();
    ctx.moveTo(-2, headY + 9); ctx.lineTo(2, headY + 9);
    ctx.stroke();
  }

  // --- Alert Icons Over Head ---
  if (isChasing) {
    // Metal Gear Solid style big red '!'
    const alertPulse = 1 + 0.2 * Math.sin(frame * 0.4);
    ctx.save();
    ctx.translate(0, headY - 18);
    ctx.scale(alertPulse, alertPulse);

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(-5, -12, 10, 16, 3);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('!', 0, 2);

    ctx.restore();

  } else if (isSuspicious) {
    // Big yellow '?'
    const bob = Math.sin(frame * 0.2) * 2;
    ctx.save();
    ctx.translate(0, headY - 16 + bob);

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(-6, -10, 12, 14, 3);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('?', 0, 1);

    ctx.restore();
  }

  // --- Speech bubble when shouting funny VN quotes ---
  if (boss.yellText && boss.yellTimer && boss.yellTimer > 0) {
    ctx.save();
    ctx.translate(0, headY - 32);

    ctx.font = 'bold 11px system-ui, sans-serif';
    const textWidth = ctx.measureText(boss.yellText).width;
    const bubbleWidth = textWidth + 16;
    const bubbleHeight = 22;

    // Speech bubble background
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-bubbleWidth / 2, -bubbleHeight, bubbleWidth, bubbleHeight, 6);
    ctx.fill();
    ctx.stroke();

    // Bubble pointer down
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(0, 4);
    ctx.lineTo(4, 0);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Speech text
    ctx.fillStyle = '#dc2626';
    ctx.textAlign = 'center';
    ctx.fillText(boss.yellText, 0, -6);

    ctx.restore();
  }

  ctx.restore();
}

/**
 * Draw Footstep noise rings and distraction effects
 */
export function drawNoiseDistractions(
  ctx: CanvasRenderingContext2D,
  distractions: NoiseDistraction[]
) {
  ctx.save();

  for (const n of distractions) {
    const progress = n.elapsed / n.duration;
    const currentRadius = n.radius + (n.maxRadius - n.radius) * progress;
    const alpha = Math.max(0, 1 - progress);

    ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 0.8})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Secondary ripple
    if (progress > 0.3) {
      ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, currentRadius * 0.65, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.restore();
}

/**
 * Draw Particles (sweat, dust, stars, confetti)
 */
export function drawParticles(ctx: CanvasRenderingContext2D, particles: ParticleEffect[]) {
  ctx.save();

  for (const p of particles) {
    const alpha = Math.max(0, p.life / p.maxLife);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = alpha;

    if (p.text) {
      ctx.font = 'bold 11px monospace';
      ctx.fillText(p.text, p.x, p.y);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

/**
 * Draw Boss Radar indicators along screen boundaries when player has Radar upgrade
 */
export function drawRadarPointers(
  ctx: CanvasRenderingContext2D,
  player: Player,
  bosses: Boss[],
  canvasWidth: number,
  canvasHeight: number,
  cameraX: number,
  cameraY: number
) {
  ctx.save();
  const px = player.x + player.width / 2;
  const py = player.y + player.height / 2;

  for (const boss of bosses) {
    const bx = boss.x + boss.width / 2;
    const by = boss.y + boss.height / 2;
    const screenBx = bx - cameraX;
    const screenBy = by - cameraY;

    // Check if boss is off-screen
    const isOffScreen = screenBx < 20 || screenBx > canvasWidth - 20 || screenBy < 20 || screenBy > canvasHeight - 20;
    if (isOffScreen) {
      const angle = Math.atan2(by - py, bx - px);
      const edgeMargin = 30;
      const cx = canvasWidth / 2;
      const cy = canvasHeight / 2;

      // Project onto screen edge
      const halfW = canvasWidth / 2 - edgeMargin;
      const halfH = canvasHeight / 2 - edgeMargin;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      let targetX = cx + (cos > 0 ? halfW : -halfW);
      let targetY = cy + Math.tan(angle) * (cos > 0 ? halfW : -halfW);

      if (targetY < edgeMargin || targetY > canvasHeight - edgeMargin) {
        targetY = cy + (sin > 0 ? halfH : -halfH);
        targetX = cx + (1 / Math.tan(angle)) * (sin > 0 ? halfH : -halfH);
      }

      // Draw radar icon on edge
      const color = boss.state === 'chase' ? '#ef4444' : boss.state === 'investigate' ? '#f59e0b' : '#38bdf8';
      const distMeters = Math.round(Math.hypot(bx - px, by - py) / 20);

      ctx.save();
      ctx.translate(targetX, targetY);

      // Arrow
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-6, -6);
      ctx.lineTo(-3, 0);
      ctx.lineTo(-6, 6);
      ctx.closePath();
      ctx.fill();

      // Text distance
      ctx.rotate(-angle);
      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.fillText(`${distMeters}m`, 0, 16);

      ctx.restore();
    }
  }

  ctx.restore();
}

/**
 * Draw Interactive Tutorial guidance rings and hints
 */
export function drawTutorialGuide(
  ctx: CanvasRenderingContext2D,
  stepText: string,
  targetX: number,
  targetY: number,
  frame: number
) {
  ctx.save();
  const bob = Math.sin(frame * 0.15) * 6;

  // Pulsing gold beacon ring around target
  const pulse = 16 + Math.sin(frame * 0.2) * 5;
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(targetX, targetY, pulse, 0, Math.PI * 2);
  ctx.stroke();

  // Floating Arrow pointing down
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.moveTo(targetX, targetY - 25 + bob);
  ctx.lineTo(targetX - 8, targetY - 37 + bob);
  ctx.lineTo(targetX + 8, targetY - 37 + bob);
  ctx.closePath();
  ctx.fill();

  // Text label
  ctx.font = 'bold 11px system-ui, sans-serif';
  const width = ctx.measureText(stepText).width + 16;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(targetX - width / 2, targetY - 60 + bob, width, 20, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fde047';
  ctx.textAlign = 'center';
  ctx.fillText(stepText, targetX, targetY - 46 + bob);

  ctx.restore();
}

