import React, { useRef, useState } from 'react';
import { Package, Zap, Footprints } from 'lucide-react';
import { Vector2D } from '../types/game';

interface MobileControlsProps {
  onMoveChange: (vector: Vector2D) => void;
  onSneakToggle: (isSneaking: boolean) => void;
  onSprintTrigger: () => void;
  sprintDuration: number;
  sprintCooldown: number;
  isSprinting: boolean;
  isSprintOnCooldown: boolean;
  onThrowDistraction: () => void;
  onToggleHide: () => void;
  isNearHidingSpot: boolean;
  isHiding: boolean;
  distractionsCount: number;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onMoveChange,
  onSneakToggle,
  onSprintTrigger,
  sprintDuration,
  sprintCooldown,
  isSprinting,
  isSprintOnCooldown,
  onThrowDistraction,
  onToggleHide,
  isNearHidingSpot,
  isHiding,
  distractionsCount
}) => {
  const joystickTouchIdRef = useRef<number | null>(null);
  const joystickCenterRef = useRef<{ x: number; y: number }>({ x: 90, y: 90 });
  const [joystickActive, setJoystickActive] = useState(false);
  const [basePos, setBasePos] = useState({ x: 80, y: 80 });
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });

  const [isSneakingActive, setIsSneakingActive] = useState(false);

  const radius = 50; // max joystick range in pixels

  const triggerHaptic = (ms: number = 15) => {
    try {
      if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
        navigator.vibrate(ms);
      }
    } catch {}
  };

  // Handle pointer on left touch surface (dynamic floating joystick)
  const handleTouchZonePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (joystickTouchIdRef.current !== null) return;

    joystickTouchIdRef.current = e.pointerId;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const rect = e.currentTarget.getBoundingClientRect();
    const touchX = e.clientX - rect.left;
    const touchY = e.clientY - rect.top;

    joystickCenterRef.current = { x: touchX, y: touchY };
    setBasePos({ x: touchX, y: touchY });
    setKnobPos({ x: 0, y: 0 });
    setJoystickActive(true);
    triggerHaptic(10);
  };

  const handleTouchZonePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (joystickTouchIdRef.current !== e.pointerId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const touchX = e.clientX - rect.left;
    const touchY = e.clientY - rect.top;

    const dx = touchX - joystickCenterRef.current.x;
    const dy = touchY - joystickCenterRef.current.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) {
      setKnobPos({ x: 0, y: 0 });
      onMoveChange({ x: 0, y: 0 });
      return;
    }

    const clampedDist = Math.min(distance, radius);
    const angle = Math.atan2(dy, dx);
    const kx = Math.cos(angle) * clampedDist;
    const ky = Math.sin(angle) * clampedDist;

    setKnobPos({ x: kx, y: ky });

    // Normalized vector -1 to 1
    const vx = kx / radius;
    const vy = ky / radius;
    onMoveChange({ x: vx, y: vy });
  };

  const handleTouchZonePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (joystickTouchIdRef.current === e.pointerId) {
      joystickTouchIdRef.current = null;
      setJoystickActive(false);
      setKnobPos({ x: 0, y: 0 });
      onMoveChange({ x: 0, y: 0 });
    }
  };

  const toggleSneak = () => {
    triggerHaptic(15);
    const next = !isSneakingActive;
    setIsSneakingActive(next);
    onSneakToggle(next);
  };

  const handleSprintPress = () => {
    if (isSprintOnCooldown || isSprinting) return;
    triggerHaptic(30);
    onSprintTrigger();
  };

  const handleThrow = () => {
    triggerHaptic(25);
    onThrowDistraction();
  };

  const handleHide = () => {
    triggerHaptic(20);
    onToggleHide();
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30 select-none touch-none overflow-hidden">
      {/* 1. Left Half: Dynamic Floating Joystick Touch Zone */}
      <div
        onPointerDown={handleTouchZonePointerDown}
        onPointerMove={handleTouchZonePointerMove}
        onPointerUp={handleTouchZonePointerUp}
        onPointerCancel={handleTouchZonePointerUp}
        className="pointer-events-auto absolute inset-y-0 left-0 w-1/2 h-full touch-none"
      >
        {/* Render Joystick Base */}
        <div
          className={`absolute rounded-full border-2 transition-opacity duration-150 flex items-center justify-center pointer-events-none shadow-2xl ${
            joystickActive
              ? 'opacity-90 border-amber-400/80 bg-slate-900/80'
              : 'opacity-50 border-slate-600/70 bg-slate-900/60'
          }`}
          style={{
            width: radius * 2 + 30,
            height: radius * 2 + 30,
            left: joystickActive ? basePos.x - (radius + 15) : 28,
            bottom: joystickActive ? undefined : 'calc(24px + env(safe-area-inset-bottom, 0px))',
            top: joystickActive ? basePos.y - (radius + 15) : undefined
          }}
        >
          {/* Directional ticks */}
          <div className="absolute top-1 text-[9px] font-pixel text-slate-400 opacity-60">▲</div>
          <div className="absolute bottom-1 text-[9px] font-pixel text-slate-400 opacity-60">▼</div>
          <div className="absolute left-1 text-[9px] font-pixel text-slate-400 opacity-60">◄</div>
          <div className="absolute right-1 text-[9px] font-pixel text-slate-400 opacity-60">►</div>

          {/* Dotted range ring */}
          <div
            className="rounded-full border border-dashed border-amber-400/30"
            style={{ width: radius * 2, height: radius * 2 }}
          />

          {/* Joystick Knob */}
          <div
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 border-2 border-amber-100 shadow-xl flex items-center justify-center transition-transform"
            style={{
              transform: `translate(${knobPos.x}px, ${knobPos.y}px)`
            }}
          >
            <div className="w-4 h-4 rounded-full bg-amber-700/50" />
          </div>
        </div>
      </div>

      {/* 2. Right Side: Large Ergonomic Action Buttons */}
      <div
        className="pointer-events-none absolute right-3.5 flex flex-col gap-2.5 items-end z-40"
        style={{
          bottom: 'calc(28px + env(safe-area-inset-bottom, 0px))'
        }}
      >
        {/* Top Action Row: Throw Distraction & Contextual Hide */}
        <div className="flex items-center gap-2">
          {/* Throw Distraction Button */}
          <button
            onClick={handleThrow}
            disabled={distractionsCount <= 0}
            className={`pointer-events-auto w-13 h-13 rounded-2xl flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-90 border-2 touch-manipulation ${
              distractionsCount > 0
                ? 'bg-amber-600/95 hover:bg-amber-500 border-amber-300 text-white shadow-amber-600/30'
                : 'bg-slate-900/80 border-slate-700 text-slate-500'
            }`}
          >
            <span className="text-base">🥤</span>
            <span className="text-[9px] font-pixel leading-tight">Ném ({distractionsCount})</span>
          </button>

          {/* Contextual Hide / Exit Button */}
          {(isNearHidingSpot || isHiding) && (
            <button
              onClick={handleHide}
              className={`pointer-events-auto w-13 h-13 rounded-2xl flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-90 border-2 touch-manipulation ${
                isHiding
                  ? 'bg-amber-500 border-amber-200 text-slate-950 animate-pulse shadow-amber-500/40'
                  : 'bg-emerald-600/95 hover:bg-emerald-500 border-emerald-300 text-white shadow-emerald-600/30'
              }`}
            >
              <Package className="w-5 h-5" />
              <span className="text-[9px] font-pixel leading-tight">
                {isHiding ? 'Chui Ra' : 'Nấp Vào'}
              </span>
            </button>
          )}
        </div>

        {/* Bottom Action Row: Sneak & Sprint Burst Toggles */}
        <div className="flex items-center gap-2">
          {/* Sneak Button */}
          <button
            onClick={toggleSneak}
            className={`pointer-events-auto h-12 px-3.5 rounded-2xl flex items-center gap-1.5 shadow-2xl transition-transform active:scale-90 border-2 touch-manipulation ${
              isSneakingActive
                ? 'bg-indigo-600 border-indigo-300 text-white shadow-indigo-600/40'
                : 'bg-slate-900/90 border-slate-700 text-slate-300'
            }`}
          >
            <Footprints className="w-4 h-4 text-indigo-300" />
            <span className="text-[10px] font-pixel">RÓN RÉN</span>
          </button>

          {/* Sprint Burst Button (3s burst, 5s lock) */}
          <button
            onClick={handleSprintPress}
            disabled={isSprintOnCooldown}
            className={`pointer-events-auto h-12 min-w-28 px-3.5 rounded-2xl flex items-center justify-center gap-1.5 shadow-2xl transition-all active:scale-90 border-2 touch-manipulation cursor-pointer ${
              isSprinting
                ? 'bg-red-600 border-red-300 text-white shadow-red-600/50 animate-pulse ring-2 ring-red-400'
                : isSprintOnCooldown
                ? 'bg-slate-900/95 border-slate-700/80 text-slate-500 cursor-not-allowed opacity-80'
                : 'bg-gradient-to-r from-amber-600 to-orange-500 border-amber-300 text-white shadow-amber-600/40'
            }`}
          >
            <Zap className={`w-4 h-4 ${isSprinting ? 'text-amber-200 animate-bounce' : 'text-amber-300'}`} />
            <span className="text-[10px] font-pixel whitespace-nowrap">
              {isSprinting
                ? `${Math.max(0.1, sprintDuration).toFixed(1)}s`
                : isSprintOnCooldown
                ? `HỒI ${Math.ceil(sprintCooldown)}s`
                : '⚡ CHẠY (3s)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
