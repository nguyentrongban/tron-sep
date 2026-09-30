export type GameMode = 'story' | 'endless' | 'tutorial';

export type GameStatus = 'menu' | 'playing' | 'paused' | 'caught' | 'victory' | 'floor_cleared';

export type CharacterSkin = 'coder' | 'designer' | 'sales' | 'ninja' | 'boba_lover' | 'intern_vip';

export type Accessory = 'none' | 'box_hat' | 'ninja_band' | 'coffee_cup' | 'sunglasses' | 'golden_crown';

export interface Vector2D {
  x: number;
  y: number;
}

export type BossState = 'patrol' | 'investigate' | 'chase' | 'rage';

export interface Boss {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  facingAngle: number; // in radians
  state: BossState;
  patrolPoints: Vector2D[];
  currentPointIndex: number;
  investigateTarget?: Vector2D;
  investigateTimer: number;
  fieldOfView: number; // in radians
  visionDistance: number;
  alertLevel: number; // 0 to 100
  yellText?: string;
  yellTimer?: number;
  skin: 'boss_male' | 'boss_female' | 'hr_snitch' | 'guard';
}

export interface SecurityCamera {
  id: string;
  x: number;
  y: number;
  baseAngle: number;
  sweepAngle: number; // how far it rotates
  currentAngle: number;
  rotationSpeed: number;
  sweepDir: number;
  visionDistance: number;
  fieldOfView: number;
  isActive: boolean;
}

export interface HidingSpot {
  id: string;
  type: 'box' | 'desk' | 'plant' | 'locker';
  x: number;
  y: number;
  width: number;
  height: number;
  isOccupied: boolean;
}

export interface ItemCollectible {
  id: string;
  type: 'card' | 'key' | 'coffee' | 'paper_distraction' | 'backpack' | 'bonus_cash' | 'boba';
  name: string;
  x: number;
  y: number;
  isCollected: boolean;
  requiredForExit?: boolean;
  value?: number;
}

export interface WallObstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'wall' | 'cubicle' | 'printer' | 'server' | 'water_cooler' | 'door_locked' | 'exit_gate';
  label?: string;
}

export interface NoiseDistraction {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  duration: number; // in ms
  elapsed: number;
}

export interface FloorLevel {
  id: number;
  title: string;
  subtitle: string;
  deptName: string;
  mapWidth: number;
  mapHeight: number;
  playerStart: Vector2D;
  exitPoint: { x: number; y: number; width: number; height: number; requiredItemType?: string };
  walls: WallObstacle[];
  hidingSpots: HidingSpot[];
  bosses: Boss[];
  cameras: SecurityCamera[];
  collectibles: ItemCollectible[];
  dialogueIntro: string[];
  dialogueCaught: string[];
  isTutorial?: boolean;
}

export interface PlayerUpgrades {
  sneakersLevel: number;     // 0-3 (Quiet running & faster sneak)
  staminaLevel: number;      // 0-3 (Max stamina 100 -> 160)
  distractionsLevel: number; // 0-3 (Start with 3, 4, 5, 6 distractions)
  camoBoxLevel: number;      // 0-3 (Stealth box camo)
  radarLevel: number;        // 0-1 (Boss directional tracker)
}

export interface DailyMission {
  id: string;
  title: string;
  desc: string;
  rewardCoins: number;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  rewardCoins: number;
  isCompleted: boolean;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  vx: number;
  vy: number;
  facingAngle: number;
  isSneaking: boolean;
  isSprinting: boolean;
  isHiding: boolean;
  currentHidingSpotId: string | null;
  stamina: number;
  maxStamina: number;
  inventory: {
    hasCard: boolean;
    hasKey: boolean;
    hasBackpack: boolean;
    distractionsCount: number;
    coffeeBoostTime: number;
    collectedCoins: number;
  };
  stepTimer: number;
  footprintTrail: { x: number; y: number; alpha: number }[];
  skin: CharacterSkin;
  accessory: Accessory;
}

export interface ParticleEffect {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  text?: string;
}

