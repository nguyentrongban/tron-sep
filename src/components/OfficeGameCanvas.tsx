import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Player,
  Boss,
  FloorLevel,
  NoiseDistraction,
  ParticleEffect,
  Vector2D,
  PlayerUpgrades,
  GameMode
} from '../types/game';
import {
  drawOfficeFloor,
  drawObstacles,
  drawHidingSpots,
  drawCollectibles,
  drawVisionCones,
  drawCameras,
  drawPlayerChibi,
  drawBossChibi,
  drawNoiseDistractions,
  drawParticles,
  drawExitZone,
  castRayAgainstWalls,
  drawRadarPointers,
  drawTutorialGuide
} from '../utils/pixelRenderer';
import { soundManager } from '../utils/audio';
import { sanitizeFloorItems } from '../utils/levels';

interface OfficeGameCanvasProps {
  level: FloorLevel;
  gameMode?: GameMode;
  playerSkin: Player['skin'];
  playerAccessory: Player['accessory'];
  upgrades?: PlayerUpgrades;
  isPaused: boolean;
  onFloorVictory: (escapeTime: number) => void;
  onPlayerCaught: () => void;
  onAlertChange: (alert: number) => void;
  onPlayerUpdate: (player: Player) => void;
  onCollectCoin?: (amount: number) => void;
  onMissionProgress?: (missionId: string, amount: number) => void;
  onBossSkillUpdate?: (isActive: boolean, duration: number, nextInSeconds: number) => void;
  onTimeRemainingUpdate?: (timeRemaining: number) => void;
  mobileMoveVector: Vector2D;
  mobileSneak: boolean;
  mobileSprintSignal: number;
  throwSignal: number;
  hideSignal: number;
  onNearHidingSpotChange: (isNear: boolean) => void;
}

export const OfficeGameCanvas: React.FC<OfficeGameCanvasProps> = ({
  level,
  gameMode = 'story',
  playerSkin,
  playerAccessory,
  upgrades = { sneakersLevel: 0, staminaLevel: 0, distractionsLevel: 0, camoBoxLevel: 0, radarLevel: 0 },
  isPaused,
  onFloorVictory,
  onPlayerCaught,
  onAlertChange,
  onPlayerUpdate,
  onCollectCoin,
  onMissionProgress,
  onBossSkillUpdate,
  onTimeRemainingUpdate,
  mobileMoveVector,
  mobileSneak,
  mobileSprintSignal,
  throwSignal,
  hideSignal,
  onNearHidingSpotChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initialMaxStamina = 100 + (upgrades.staminaLevel || 0) * 20;
  const initialDistractions = 3 + (upgrades.distractionsLevel || 0);

  // Sanitize level so items are guaranteed not trapped inside furniture or walls
  const cleanLevel = sanitizeFloorItems(level);
  const baseInterval = Math.max(35, 60 - cleanLevel.id * 3);
  const floorSkillInterval = gameMode === 'nightmare' ? Math.max(22, Math.floor(baseInterval * 0.55)) : baseInterval;

  // Game internal state
  const stateRef = useRef<{
    player: Player;
    bosses: Boss[];
    level: FloorLevel;
    distractions: NoiseDistraction[];
    particles: ParticleEffect[];
    screenShake: number;
    gameStartTime: number;
    lastFrameTime: number;
    frame: number;
    keysDown: Record<string, boolean>;
    isNearHidingSpot: boolean;
    hasWon: boolean;
    hasLost: boolean;
    tutorialStep: number;
    bossSkillTimer: number;
    isBossSkillActive: boolean;
    bossSkillDuration: number;
    timeRemaining: number;
  }>({
    player: {
      x: cleanLevel.playerStart.x,
      y: cleanLevel.playerStart.y,
      width: 32,
      height: 32,
      speed: 3.2,
      vx: 0,
      vy: 0,
      facingAngle: 0,
      isSneaking: false,
      isSprinting: false,
      isHiding: false,
      currentHidingSpotId: null,
      stamina: initialMaxStamina,
      maxStamina: initialMaxStamina,
      sprintDuration: 0,
      sprintCooldown: 0,
      isSprintOnCooldown: false,
      inventory: {
        hasCard: false,
        hasKey: false,
        hasBackpack: false,
        distractionsCount: initialDistractions,
        coffeeBoostTime: 0,
        collectedCoins: 0
      },
      stepTimer: 0,
      footprintTrail: [],
      skin: playerSkin,
      accessory: playerAccessory
    },
    bosses: JSON.parse(JSON.stringify(cleanLevel.bosses)),
    level: JSON.parse(JSON.stringify(cleanLevel)),
    distractions: [],
    particles: [],
    screenShake: 0,
    gameStartTime: Date.now(),
    lastFrameTime: performance.now(),
    frame: 0,
    keysDown: {},
    isNearHidingSpot: false,
    hasWon: false,
    hasLost: false,
    tutorialStep: 1,
    bossSkillTimer: floorSkillInterval,
    isBossSkillActive: false,
    bossSkillDuration: 0,
    timeRemaining: cleanLevel.timeLimit || 60
  });

  // Keep player skin & accessory updated
  useEffect(() => {
    stateRef.current.player.skin = playerSkin;
    stateRef.current.player.accessory = playerAccessory;
  }, [playerSkin, playerAccessory]);

  // Sprint Trigger (3s duration burst, then 5s lock)
  const triggerSprint = useCallback(() => {
    const s = stateRef.current;
    if (s.player.isHiding || s.hasWon || s.hasLost) return;

    // Can sprint even when boss is chasing!
    if (s.player.sprintCooldown <= 0 && !s.player.isSprinting) {
      s.player.isSprinting = true;
      s.player.sprintDuration = 3.0; // 3 seconds of high speed
      s.player.isSneaking = false;
      soundManager.playSprintBurst();

      // Dash burst particles
      for (let i = 0; i < 8; i++) {
        s.particles.push({
          x: s.player.x + 16,
          y: s.player.y + 24,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          color: '#f97316',
          size: 4,
          alpha: 1,
          life: 22,
          maxLife: 22,
          text: '⚡'
        });
      }
    }
  }, []);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      stateRef.current.keysDown[e.code] = true;

      // Quick actions
      if (e.code === 'KeyE') {
        toggleHide();
      }
      if (e.code === 'KeyQ' || e.code === 'KeyF') {
        throwDistraction();
      }
      if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !e.repeat) {
        triggerSprint();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      stateRef.current.keysDown[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerSprint]);

  // Mobile Sprint Signal
  useEffect(() => {
    if (mobileSprintSignal > 0) {
      triggerSprint();
    }
  }, [mobileSprintSignal, triggerSprint]);

  // Handle mobile action signals
  useEffect(() => {
    if (throwSignal > 0) {
      throwDistraction();
    }
  }, [throwSignal]);

  useEffect(() => {
    if (hideSignal > 0) {
      toggleHide();
    }
  }, [hideSignal]);

  // Throw distraction item
  const throwDistraction = useCallback(() => {
    const s = stateRef.current;
    if (s.player.isHiding || s.player.inventory.distractionsCount <= 0) return;

    s.player.inventory.distractionsCount--;
    soundManager.playThrow();

    const throwDist = 180;
    const targetX = Math.max(40, Math.min(s.level.mapWidth - 40, s.player.x + Math.cos(s.player.facingAngle) * throwDist));
    const targetY = Math.max(40, Math.min(s.level.mapHeight - 40, s.player.y + Math.sin(s.player.facingAngle) * throwDist));

    // Create distraction sound ripple
    s.distractions.push({
      x: targetX,
      y: targetY,
      radius: 10,
      maxRadius: 180,
      duration: 1800,
      elapsed: 0
    });

    // Alert all bosses within hearing radius of distraction
    s.bosses.forEach((boss) => {
      const dist = Math.hypot(boss.x - targetX, boss.y - targetY);
      if (dist < 320) {
        boss.state = 'investigate';
        boss.investigateTarget = { x: targetX, y: targetY };
        boss.investigateTimer = 220; // frames to check
        boss.facingAngle = Math.atan2(targetY - boss.y, targetX - boss.x);
        boss.yellText = 'Ủa tiếng gì vậy?';
        boss.yellTimer = 60;
        soundManager.playQuestion();
      }
    });

    if (onMissionProgress) {
      onMissionProgress('daily_throw_3', 1);
    }

    // Particles at throw landing
    for (let i = 0; i < 6; i++) {
      s.particles.push({
        x: targetX,
        y: targetY,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        color: '#f59e0b',
        size: 3,
        alpha: 1,
        life: 30,
        maxLife: 30
      });
    }
  }, [onMissionProgress]);

  // Toggle hiding in nearby box / plant / desk
  const toggleHide = useCallback(() => {
    const s = stateRef.current;
    const playerCenter = {
      x: s.player.x + s.player.width / 2,
      y: s.player.y + s.player.height / 2
    };

    if (s.player.isHiding) {
      // Exit hiding spot
      s.player.isHiding = false;
      if (s.player.currentHidingSpotId) {
        const spot = s.level.hidingSpots.find((sp) => sp.id === s.player.currentHidingSpotId);
        if (spot) spot.isOccupied = false;
      }
      s.player.currentHidingSpotId = null;
      soundManager.playHide();
      return;
    }

    // Check if player is close to any hiding spot
    for (const spot of s.level.hidingSpots) {
      const spotCenter = {
        x: spot.x + spot.width / 2,
        y: spot.y + spot.height / 2
      };
      const dist = Math.hypot(playerCenter.x - spotCenter.x, playerCenter.y - spotCenter.y);

      if (dist < 50 && !spot.isOccupied) {
        s.player.isHiding = true;
        s.player.currentHidingSpotId = spot.id;
        s.player.x = spotCenter.x - s.player.width / 2;
        s.player.y = spotCenter.y - s.player.height / 2;
        spot.isOccupied = true;
        soundManager.playHide();

        // Little puff particle
        for (let i = 0; i < 8; i++) {
          s.particles.push({
            x: spotCenter.x,
            y: spotCenter.y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            color: '#e2e8f0',
            size: 4,
            alpha: 1,
            life: 25,
            maxLife: 25
          });
        }
        break;
      }
    }
  }, []);

  // Main 60FPS Game Loop
  useEffect(() => {
    let animId: number;

    const gameLoop = (currentTime: number) => {
      animId = requestAnimationFrame(gameLoop);
      if (isPaused) return;

      const s = stateRef.current;
      const dt = Math.min((currentTime - s.lastFrameTime) / 1000, 0.1);
      s.lastFrameTime = currentTime;
      s.frame++;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Handle screen resize with DPR (capped at 2 for performance)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = canvas.clientWidth;
      const displayH = canvas.clientHeight;
      const bufferW = Math.round(displayW * dpr);
      const bufferH = Math.round(displayH * dpr);

      if (canvas.width !== bufferW || canvas.height !== bufferH) {
        canvas.width = bufferW;
        canvas.height = bufferH;
      }

      // --- ESCAPE LEVEL TIME LIMIT CHECK ---
      const totalElapsed = (Date.now() - s.gameStartTime) / 1000;
      const floorLimit = s.level.timeLimit || 60;
      const timeRemaining = Math.max(0, floorLimit - totalElapsed);
      s.timeRemaining = timeRemaining;

      if (onTimeRemainingUpdate) {
        onTimeRemainingUpdate(timeRemaining);
      }

      // If time runs out -> Lockdown Curfew (Permanent Chase!)
      if (timeRemaining === 0 && !s.hasWon && !s.hasLost) {
        s.bosses.forEach((b) => {
          b.state = 'chase';
          b.alertLevel = 100;
          b.yellText = 'HẾT GIỜ TAN CA! BẮT Ở LẠI OT!';
          b.yellTimer = 60;
        });
      }

      // --- PERIODIC BOSS RAGE SKILL (MEGA SCAN) ---
      if (!s.isBossSkillActive) {
        s.bossSkillTimer -= dt;
        if (s.bossSkillTimer <= 0) {
          // Trigger skill!
          s.isBossSkillActive = true;
          s.bossSkillDuration = 8.0; // 8s active
          s.bossSkillTimer = floorSkillInterval;
          soundManager.playSiren();
          s.screenShake = 14;

          const skillLines = [
            '⚡ SẾP: "KỸ NĂNG QUÉT TẬP TRUNG! AI CÒN CHƯA VỀ BƯỚC RA!"',
            '⚡ SẾP: "RA-ĐA TỐC ĐỘ CAO KHỞI ĐỘNG! KHÔNG AI THOÁT ĐƯỢC!"',
            '⚡ SẾP: "QUÉT TOÀN BỘ VĂN PHÒNG! ĐỨNG LẠI OT VỚI TÔI!"'
          ];
          const yell = skillLines[Math.floor(Math.random() * skillLines.length)];

          s.bosses.forEach((b) => {
            b.isSkillActive = true;
            b.yellText = yell;
            b.yellTimer = 180;
          });
        }
      } else {
        s.bossSkillDuration -= dt;
        if (s.bossSkillDuration <= 0) {
          s.isBossSkillActive = false;
          s.bossSkillDuration = 0;
          s.bosses.forEach((b) => {
            b.isSkillActive = false;
          });
        }
      }

      if (onBossSkillUpdate) {
        onBossSkillUpdate(s.isBossSkillActive, s.bossSkillDuration, Math.max(0, s.bossSkillTimer));
      }

      // Check if near hiding spot
      let nearSpot = false;
      const pCenter = { x: s.player.x + s.player.width / 2, y: s.player.y + s.player.height / 2 };
      for (const spot of s.level.hidingSpots) {
        const sc = { x: spot.x + spot.width / 2, y: spot.y + spot.height / 2 };
        if (Math.hypot(pCenter.x - sc.x, pCenter.y - sc.y) < 50) {
          nearSpot = true;
          break;
        }
      }
      if (nearSpot !== s.isNearHidingSpot) {
        s.isNearHidingSpot = nearSpot;
        onNearHidingSpotChange(nearSpot);
      }

      // --- SPRINT TIMER & COOLDOWN LOGIC (3s burst, 5s cooldown) ---
      if (s.player.isSprinting) {
        s.player.sprintDuration -= dt;
        if (s.player.sprintDuration <= 0) {
          s.player.isSprinting = false;
          s.player.sprintDuration = 0;
          s.player.sprintCooldown = 5.0; // Locked 5s cooldown
          s.player.isSprintOnCooldown = true;
        }
      } else if (s.player.sprintCooldown > 0) {
        s.player.sprintCooldown -= dt;
        if (s.player.sprintCooldown <= 0) {
          s.player.sprintCooldown = 0;
          s.player.isSprintOnCooldown = false;
        }
      }

      // --- PLAYER MOVEMENT & CONTROLS ---
      let moveX = 0;
      let moveY = 0;

      if (!s.player.isHiding && !s.hasWon && !s.hasLost) {
        if (s.keysDown['ArrowUp'] || s.keysDown['KeyW']) moveY -= 1;
        if (s.keysDown['ArrowDown'] || s.keysDown['KeyS']) moveY += 1;
        if (s.keysDown['ArrowLeft'] || s.keysDown['KeyA']) moveX -= 1;
        if (s.keysDown['ArrowRight'] || s.keysDown['KeyD']) moveX += 1;

        // Mobile joystick override
        if (Math.hypot(mobileMoveVector.x, mobileMoveVector.y) > 0.1) {
          moveX = mobileMoveVector.x;
          moveY = mobileMoveVector.y;
        }

        // Sneak state
        s.player.isSneaking = !!(s.keysDown['Space'] || mobileSneak);

        // Coffee boost countdown
        if (s.player.inventory.coffeeBoostTime > 0) {
          s.player.inventory.coffeeBoostTime -= dt;
        }

        // Calculate velocity
        const len = Math.hypot(moveX, moveY);
        if (len > 0) {
          const normX = moveX / len;
          const normY = moveY / len;
          s.player.facingAngle = Math.atan2(normY, normX);

          let currentSpeed = s.player.speed;
          const sneakBonus = (upgrades.sneakersLevel || 0) * 0.12;

          if (s.player.isSneaking) currentSpeed *= (0.55 + sneakBonus);
          if (s.player.isSprinting) currentSpeed *= 1.85; // Massive sprint burst!
          if (s.player.inventory.coffeeBoostTime > 0) currentSpeed *= 1.35;

          s.player.vx = normX * currentSpeed;
          s.player.vy = normY * currentSpeed;

          // Footstep audio & noise wave
          s.player.stepTimer += dt;
          const stepInterval = s.player.isSprinting ? 0.18 : s.player.isSneaking ? 0.55 : 0.35;
          if (s.player.stepTimer >= stepInterval) {
            s.player.stepTimer = 0;
            soundManager.playFootstep(s.player.isSneaking);

            // Sprinting makes loud footstep sound that bosses can hear!
            if (s.player.isSprinting) {
              const noiseRadius = 140 * Math.max(0.4, 1 - (upgrades.sneakersLevel || 0) * 0.2);
              s.distractions.push({
                x: pCenter.x,
                y: pCenter.y,
                radius: 5,
                maxRadius: noiseRadius,
                duration: 600,
                elapsed: 0
              });

              // Alert nearby bosses to investigate footstep
              s.bosses.forEach((boss) => {
                if (boss.state === 'patrol') {
                  const dist = Math.hypot(boss.x - pCenter.x, boss.y - pCenter.y);
                  if (dist < noiseRadius + 10) {
                    boss.state = 'investigate';
                    boss.investigateTarget = { x: pCenter.x, y: pCenter.y };
                    boss.investigateTimer = 100;
                    boss.yellText = 'Ủa tiếng chạy gấp gáp ai đấy?!';
                    boss.yellTimer = 40;
                    soundManager.playQuestion();
                  }
                }
              });
            }
          }
        } else {
          s.player.vx = 0;
          s.player.vy = 0;
        }

        // Apply movement with wall collisions (sliding)
        const newX = s.player.x + s.player.vx;
        const newY = s.player.y + s.player.vy;

        // Check horizontal collision
        let collideX = false;
        for (const wall of s.level.walls) {
          if (
            newX < wall.x + wall.width &&
            newX + s.player.width > wall.x &&
            s.player.y < wall.y + wall.height &&
            s.player.y + s.player.height > wall.y
          ) {
            collideX = true;
            break;
          }
        }
        if (!collideX) s.player.x = Math.max(30, Math.min(s.level.mapWidth - 30 - s.player.width, newX));

        // Check vertical collision
        let collideY = false;
        for (const wall of s.level.walls) {
          if (
            s.player.x < wall.x + wall.width &&
            s.player.x + s.player.width > wall.x &&
            newY < wall.y + wall.height &&
            newY + s.player.height > wall.y
          ) {
            collideY = true;
            break;
          }
        }
        if (!collideY) s.player.y = Math.max(30, Math.min(s.level.mapHeight - 30 - s.player.height, newY));

        // --- CHECK COLLECTIBLES (MAGNETIC PULL & GENEROUS 46px RADIUS) ---
        for (const item of s.level.collectibles) {
          if (item.isCollected) continue;
          const dist = Math.hypot(pCenter.x - item.x, pCenter.y - item.y);

          // Magnetic attraction when near (65px) so player never gets blocked by desk corners
          if (dist < 65 && !s.player.isHiding) {
            const pullRate = 5.5 * dt;
            item.x += (pCenter.x - item.x) * pullRate;
            item.y += (pCenter.y - item.y) * pullRate;
          }

          // Pickup interaction
          if (dist < 46) {
            item.isCollected = true;
            if (item.type === 'card') {
              s.player.inventory.hasCard = true;
              soundManager.playPickup();
            } else if (item.type === 'key') {
              s.player.inventory.hasKey = true;
              soundManager.playPickup();
            } else if (item.type === 'backpack') {
              s.player.inventory.hasBackpack = true;
              soundManager.playPickup();
            } else if (item.type === 'coffee') {
              s.player.inventory.coffeeBoostTime = 7;
              soundManager.playCoffeeBoost();
            } else if (item.type === 'paper_distraction') {
              s.player.inventory.distractionsCount++;
              soundManager.playPickup();
            } else if (item.type === 'bonus_cash') {
              const val = item.value || 50;
              s.player.inventory.collectedCoins += val;
              if (onCollectCoin) onCollectCoin(val);
              if (onMissionProgress) onMissionProgress('daily_collect_cash', 1);
              soundManager.playPickup();
            } else if (item.type === 'boba') {
              const val = item.value || 40;
              s.player.inventory.collectedCoins += val;
              s.player.stamina = s.player.maxStamina; // instantly refresh stamina!
              if (onCollectCoin) onCollectCoin(val);
              if (onMissionProgress) onMissionProgress('daily_collect_cash', 1);
              soundManager.playCoffeeBoost();
            }

            // Pickup particles
            for (let i = 0; i < 10; i++) {
              s.particles.push({
                x: item.x,
                y: item.y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                color: item.type === 'bonus_cash' ? '#ef4444' : item.type === 'boba' ? '#f472b6' : '#facc15',
                size: 3,
                alpha: 1,
                life: 30,
                maxLife: 30,
                text: item.type === 'bonus_cash' ? `+${item.value || 50} Xu` : item.type === 'boba' ? '+Trà Sữa!' : '+1'
              });
            }
          }
        }

        // Tutorial Step Progression
        if (s.level.isTutorial) {
          if (s.tutorialStep === 1 && pCenter.x > 180) {
            s.tutorialStep = 2;
          } else if (s.tutorialStep === 2 && pCenter.x > 320 && s.player.isSneaking) {
            s.tutorialStep = 3;
          } else if (s.tutorialStep === 3 && s.player.isHiding) {
            s.tutorialStep = 4;
          }
        }

        // Check Exit Door collision
        const exit = s.level.exitPoint;
        const requiredItems = s.level.collectibles.filter((c) => c.requiredForExit);
        const hasAllRequired = requiredItems.length > 0
          ? requiredItems.every((c) => c.isCollected)
          : (exit.requiredItemType === 'card' ? s.player.inventory.hasCard : exit.requiredItemType === 'key' ? s.player.inventory.hasKey : true);

        if (
          s.player.x + s.player.width > exit.x &&
          s.player.x < exit.x + exit.width &&
          s.player.y + s.player.height > exit.y &&
          s.player.y < exit.y + exit.height
        ) {
          if (hasAllRequired && !s.hasWon) {
            s.hasWon = true;
            soundManager.playVictory();
            const elapsed = (Date.now() - s.gameStartTime) / 1000;
            if (onMissionProgress) onMissionProgress('daily_escape_3', 1);
            onFloorVictory(elapsed);
          }
        }
      }

      // --- CAMERAS UPDATE & DETECTION ---
      for (const cam of s.level.cameras) {
        if (!cam.isActive) continue;
        cam.currentAngle += cam.rotationSpeed * cam.sweepDir;
        if (Math.abs(cam.currentAngle - cam.baseAngle) > cam.sweepAngle) {
          cam.sweepDir *= -1;
        }

        // Check if player is detected by camera
        if (!s.player.isHiding && !s.hasWon && !s.hasLost) {
          const dx = pCenter.x - cam.x;
          const dy = pCenter.y - cam.y;
          const dist = Math.hypot(dx, dy);

          if (dist < cam.visionDistance) {
            const angleToPlayer = Math.atan2(dy, dx);
            let diff = Math.abs(angleToPlayer - cam.currentAngle);
            while (diff > Math.PI) diff = Math.abs(diff - Math.PI * 2);

            if (diff < cam.fieldOfView / 2) {
              // Line of sight raycast
              const hit = castRayAgainstWalls(cam.x, cam.y, angleToPlayer, dist, s.level.walls);
              if (hit.dist >= dist - 15) {
                // Detected by Camera! Alert closest boss!
                s.screenShake = 6;
                s.bosses.forEach((b) => {
                  b.state = 'chase';
                  b.alertLevel = 100;
                  b.investigateTarget = { x: pCenter.x, y: pCenter.y };
                  b.yellText = 'CAMERA BÁO ĐỘNG!';
                  b.yellTimer = 60;
                });
                soundManager.playAlert();
              }
            }
          }
        }
      }

      // --- BOSS AI & DETECTION ---
      let highestAlert = 0;
      let anyBossChasing = false;

      for (const boss of s.bosses) {
        const bCenter = { x: boss.x + boss.width / 2, y: boss.y + boss.height / 2 };

        if (boss.yellTimer && boss.yellTimer > 0) {
          boss.yellTimer--;
        }

        // Apply Boss Skill Buffs if skill active
        const speedMultiplier = (s.isBossSkillActive ? 1.65 : 1.0) * (gameMode === 'nightmare' ? 1.25 : 1.0);
        const currentBossSpeed = boss.speed * speedMultiplier;
        const visionDistanceMultiplier = (s.isBossSkillActive ? 1.7 : 1.0) * (gameMode === 'nightmare' ? 1.2 : 1.0);
        const currentVisionDistance = boss.visionDistance * visionDistanceMultiplier;
        const currentFOV = s.isBossSkillActive ? Math.min(Math.PI * 0.75, boss.fieldOfView * 1.5) : boss.fieldOfView;

        // Check if player is in boss vision cone
        let canSeePlayer = false;
        if (!s.player.isHiding && !s.hasWon && !s.hasLost) {
          const dx = pCenter.x - bCenter.x;
          const dy = pCenter.y - bCenter.y;
          const dist = Math.hypot(dx, dy);

          if (dist < currentVisionDistance) {
            const angleToPlayer = Math.atan2(dy, dx);
            let diff = Math.abs(angleToPlayer - boss.facingAngle);
            while (diff > Math.PI) diff = Math.abs(diff - Math.PI * 2);

            if (diff < currentFOV / 2) {
              const hit = castRayAgainstWalls(bCenter.x, bCenter.y, angleToPlayer, dist, s.level.walls);
              if (hit.dist >= dist - 15) {
                canSeePlayer = true;
              }
            }
          }
        }

        // State Machine
        if (canSeePlayer) {
          // Increase alert rapidly
          const alertRate = s.isBossSkillActive ? 240 : 160;
          boss.alertLevel = Math.min(100, boss.alertLevel + alertRate * dt);

          if (boss.alertLevel >= 75) {
            if (boss.state !== 'chase') {
              soundManager.playAlert();
              boss.yellText = ['OT ĐÊ!', 'AI CHO VỀ?!', 'SLIDE CHƯA XONG!', 'HỌP ĐỘT XUẤT!'][
                Math.floor(Math.random() * 4)
              ];
              boss.yellTimer = 90;
              s.screenShake = 8;
            }
            boss.state = 'chase';
            boss.investigateTarget = { x: pCenter.x, y: pCenter.y };
          } else if (boss.state === 'patrol') {
            boss.state = 'investigate';
            boss.investigateTarget = { x: pCenter.x, y: pCenter.y };
            boss.investigateTimer = 60;
          }
        } else {
          // Player is not in direct sight
          if (boss.state === 'chase') {
            boss.alertLevel = Math.max(0, boss.alertLevel - 20 * dt);
            if (boss.alertLevel < 30) {
              boss.state = 'investigate';
              boss.investigateTimer = 120;
            }
          } else {
            boss.alertLevel = Math.max(0, boss.alertLevel - 30 * dt);
          }
        }

        if (boss.state === 'chase') anyBossChasing = true;
        if (boss.alertLevel > highestAlert) highestAlert = boss.alertLevel;

        // Boss movement based on state
        if (boss.state === 'chase' && boss.investigateTarget) {
          const target = canSeePlayer ? pCenter : boss.investigateTarget;
          const dx = target.x - bCenter.x;
          const dy = target.y - bCenter.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 10) {
            boss.facingAngle = Math.atan2(dy, dx);
            const chaseSpeed = currentBossSpeed * 1.35;
            boss.x += (dx / dist) * chaseSpeed;
            boss.y += (dy / dist) * chaseSpeed;
          }

          // Caught check! (36px)
          if (canSeePlayer && dist < 36 && !s.hasLost && !s.hasWon) {
            s.hasLost = true;
            soundManager.playCaught();
            onPlayerCaught();
          }
        } else if (boss.state === 'investigate' && boss.investigateTarget) {
          const dx = boss.investigateTarget.x - bCenter.x;
          const dy = boss.investigateTarget.y - bCenter.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 15) {
            boss.facingAngle = Math.atan2(dy, dx);
            boss.x += (dx / dist) * currentBossSpeed;
            boss.y += (dy / dist) * currentBossSpeed;
          } else {
            // Reached suspect spot, look around
            boss.investigateTimer--;
            boss.facingAngle += Math.sin(s.frame * 0.08) * 0.04;
            if (boss.investigateTimer <= 0) {
              boss.state = 'patrol';
              boss.investigateTarget = undefined;
            }
          }
        } else {
          // --- UNPREDICTABLE RANDOM PATROL PATH (ALL CORRIDORS) ---
          if (boss.patrolPoints && boss.patrolPoints.length > 0) {
            // Check if boss is briefly pausing at a waypoint to inspect
            if (boss.patrolWaitTimer && boss.patrolWaitTimer > 0) {
              boss.patrolWaitTimer--;
              // Look around naturally (rotate cone angle)
              boss.facingAngle += Math.sin(s.frame * 0.12) * 0.05;
            } else {
              // Ensure valid currentPointIndex
              if (boss.currentPointIndex >= boss.patrolPoints.length) {
                boss.currentPointIndex = 0;
              }
              const targetPoint = boss.patrolPoints[boss.currentPointIndex];
              const dx = targetPoint.x - bCenter.x;
              const dy = targetPoint.y - bCenter.y;
              const dist = Math.hypot(dx, dy);

              if (dist > 18) {
                boss.facingAngle = Math.atan2(dy, dx);
                boss.x += (dx / dist) * currentBossSpeed;
                boss.y += (dy / dist) * currentBossSpeed;
              } else {
                // Arrived at waypoint! Pause 20-40 frames (~0.4s-0.8s) to scan
                boss.patrolWaitTimer = 20 + Math.floor(Math.random() * 25);

                // Choose a random NEXT waypoint index that is NOT the same as current or immediately previous point
                if (boss.patrolPoints.length > 1) {
                  const currentIdx = boss.currentPointIndex;
                  const lastIdx = boss.lastPointIndex ?? -1;

                  // Filter available candidate indices
                  const candidates: number[] = [];
                  for (let i = 0; i < boss.patrolPoints.length; i++) {
                    if (i !== currentIdx && (boss.patrolPoints.length <= 2 || i !== lastIdx)) {
                      candidates.push(i);
                    }
                  }

                  const chosenIndex = candidates.length > 0
                    ? candidates[Math.floor(Math.random() * candidates.length)]
                    : (currentIdx + 1) % boss.patrolPoints.length;

                  boss.lastPointIndex = currentIdx;
                  boss.currentPointIndex = chosenIndex;
                }

                // 10% chance to express boss thought bubble showing unpredictable routing
                if (Math.random() < 0.10 && (!boss.yellTimer || boss.yellTimer <= 0)) {
                  const thoughts = [
                    'Rà soát đường ngẫu nhiên!',
                    'Đổi lộ trình tuần tra xem sao!',
                    'Soi kỹ từng hẻm hành lang!',
                    'Lẻn sang lối này bắt quả tang!',
                    'Đi đường ngẫu nhiên chống trốn!'
                  ];
                  boss.yellText = thoughts[Math.floor(Math.random() * thoughts.length)];
                  boss.yellTimer = 60;
                }
              }
            }
          }
        }
      }

      // Update background chase music
      soundManager.setChaseBGM(anyBossChasing);
      onAlertChange(highestAlert);
      onPlayerUpdate({ ...s.player });

      // Update Noise Distractions
      s.distractions.forEach((d) => (d.elapsed += dt * 1000));
      s.distractions = s.distractions.filter((d) => d.elapsed < d.duration);

      // Update Particles
      s.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
      });
      s.particles = s.particles.filter((p) => p.life > 0);

      // --- RENDERING CANVAS ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      // Screen shake offset
      if (s.screenShake > 0) {
        ctx.translate((Math.random() - 0.5) * s.screenShake, (Math.random() - 0.5) * s.screenShake);
        s.screenShake = Math.max(0, s.screenShake - 0.5);
      }

      // Responsive Camera Scale: 1.15x - 1.25x on mobile screens
      const isMobile = displayW < 768;
      const zoom = isMobile ? 1.2 : 1.0;
      const viewW = displayW / zoom;
      const viewH = displayH / zoom;
      const cameraX = Math.max(0, Math.min(s.level.mapWidth - viewW, pCenter.x - viewW / 2));
      const cameraY = Math.max(0, Math.min(s.level.mapHeight - viewH, pCenter.y - viewH / 2));

      ctx.save();
      ctx.scale(zoom, zoom);
      ctx.translate(-cameraX, -cameraY);

      // 1. Floor & tiles
      drawOfficeFloor(ctx, s.level.mapWidth, s.level.mapHeight, s.frame);

      // 2. Exit door
      const reqItems = s.level.collectibles.filter((c) => c.requiredForExit);
      const isExitUnlocked = reqItems.length > 0
        ? reqItems.every((c) => c.isCollected)
        : (s.level.exitPoint.requiredItemType === 'card' ? s.player.inventory.hasCard : s.level.exitPoint.requiredItemType === 'key' ? s.player.inventory.hasKey : true);

      drawExitZone(ctx, s.level.exitPoint, isExitUnlocked, s.frame);

      // 3. Walls & Office Furniture
      drawObstacles(ctx, s.level.walls, s.frame);

      // 4. Hiding spots (Boxes, Plants, Desks)
      drawHidingSpots(ctx, s.level.hidingSpots, s.frame);

      // 5. Collectibles
      drawCollectibles(ctx, s.level.collectibles, s.frame);

      // 6. Security Cameras
      drawCameras(ctx, s.level.cameras, s.level.walls, s.frame);

      // 7. Boss Vision Cones (raycasted)
      drawVisionCones(ctx, s.bosses, s.level.walls, s.frame);

      // 8. Distraction noise ripples
      drawNoiseDistractions(ctx, s.distractions);

      // 9. Player Chibi
      drawPlayerChibi(ctx, s.player, s.frame);

      // 10. Boss Chibi Characters
      for (const boss of s.bosses) {
        drawBossChibi(ctx, boss, s.frame);
      }

      // 11. Particles & floating texts
      drawParticles(ctx, s.particles);

      // 12. Directional Arrow Beacon to Exit Gate when all required items are ready!
      if (isExitUnlocked && !s.hasWon) {
        const exitCenter = {
          x: s.level.exitPoint.x + s.level.exitPoint.width / 2,
          y: s.level.exitPoint.y + s.level.exitPoint.height / 2
        };
        const angleToExit = Math.atan2(exitCenter.y - pCenter.y, exitCenter.x - pCenter.x);

        ctx.save();
        ctx.translate(pCenter.x + Math.cos(angleToExit) * 50, pCenter.y + Math.sin(angleToExit) * 50);
        ctx.rotate(angleToExit);

        const pulse = Math.sin(s.frame * 0.15) * 5;
        ctx.fillStyle = '#22c55e';
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.moveTo(14 + pulse, 0);
        ctx.lineTo(-10, -10);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-10, 10);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // 13. Interactive Tutorial Objective Beacon
      if (s.level.isTutorial) {
        if (s.tutorialStep === 1) {
          drawTutorialGuide(ctx, '1. Di chuyển tới bàn làm việc này', 130, 240, s.frame);
        } else if (s.tutorialStep === 2) {
          drawTutorialGuide(ctx, '2. Giữ [Rón Rén] đi qua sếp', 360, 200, s.frame);
        } else if (s.tutorialStep === 3) {
          drawTutorialGuide(ctx, '3. Nhấn [E] nấp vào thùng carton!', 405, 125, s.frame);
        } else if (s.tutorialStep === 4) {
          drawTutorialGuide(ctx, '4. Nhấn [Q] ném cốc dụ sếp quay đi!', 320, 360, s.frame);
        } else {
          drawTutorialGuide(ctx, '5. Lấy Thẻ & Phi ra Cổng Thoát!', 760, 470, s.frame);
        }
      }

      // 14. Nightmare Mode Darkness & Flashlight Beam
      if (gameMode === 'nightmare') {
        ctx.save();
        // Darkness mask around player
        const darkGrad = ctx.createRadialGradient(
          pCenter.x, pCenter.y, 40,
          pCenter.x, pCenter.y, 240
        );
        darkGrad.addColorStop(0, 'rgba(2, 6, 23, 0.05)');
        darkGrad.addColorStop(0.45, 'rgba(2, 6, 23, 0.55)');
        darkGrad.addColorStop(0.85, 'rgba(2, 6, 23, 0.93)');
        darkGrad.addColorStop(1, 'rgba(2, 6, 23, 0.98)');
        ctx.fillStyle = darkGrad;
        ctx.fillRect(-200, -200, cleanLevel.mapWidth + 400, cleanLevel.mapHeight + 400);

        // Flashlight beam projecting forward
        ctx.save();
        ctx.translate(pCenter.x, pCenter.y);
        ctx.rotate(s.player.facingAngle);
        const beamGrad = ctx.createRadialGradient(0, 0, 15, 140, 0, 260);
        beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.32)');
        beamGrad.addColorStop(0.7, 'rgba(254, 240, 138, 0.12)');
        beamGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 270, -Math.PI / 4.8, Math.PI / 4.8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.restore();
      }

      ctx.restore(); // restore zoom & camera offset

      // 14. Radar Directional Pointers (in Screen space)
      if (upgrades.radarLevel && upgrades.radarLevel > 0) {
        drawRadarPointers(ctx, s.player, s.bosses, displayW, displayH, cameraX, cameraY);
      }

      // 15. Pulsing Screen Red Vignette during Boss Rage Skill
      if (s.isBossSkillActive) {
        ctx.save();
        const pulse = 0.35 + Math.sin(s.frame * 0.18) * 0.15;
        const grad = ctx.createRadialGradient(
          displayW / 2, displayH / 2, Math.min(displayW, displayH) * 0.35,
          displayW / 2, displayH / 2, Math.max(displayW, displayH) * 0.72
        );
        grad.addColorStop(0, 'rgba(239, 68, 68, 0)');
        grad.addColorStop(1, `rgba(239, 68, 68, ${pulse})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, displayW, displayH);
        ctx.restore();
      }

      ctx.restore(); // restore DPR
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [
    isPaused,
    onFloorVictory,
    onPlayerCaught,
    onAlertChange,
    onPlayerUpdate,
    onBossSkillUpdate,
    onTimeRemainingUpdate,
    mobileMoveVector,
    mobileSneak,
    floorSkillInterval,
    onNearHidingSpotChange,
    upgrades
  ]);

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block pixel-art" />
      {/* Scanline CRT overlay for arcade vibe */}
      <div className="scanlines absolute inset-0 pointer-events-none opacity-40" />
    </div>
  );
};
