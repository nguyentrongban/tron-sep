import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Pause,
  Play,
  ShieldAlert,
  Key,
  Coffee,
  Package,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Footprints,
  Clock,
  Sparkles
} from 'lucide-react';
import { Player, FloorLevel } from '../types/game';

interface GameHUDProps {
  player: Player;
  level: FloorLevel;
  maxAlert: number;
  gameTimeSeconds: number;
  timeRemaining?: number;
  isBossSkillActive?: boolean;
  bossSkillDuration?: number;
  bossSkillNextInSeconds?: number;
  isMuted: boolean;
  isPaused: boolean;
  onToggleMute: () => void;
  onTogglePause: () => void;
  onOpenHelp: () => void;
  onThrowDistraction: () => void;
  onToggleHide: () => void;
  onTriggerSprint?: () => void;
  onSkipTutorial?: () => void;
  isNearHidingSpot: boolean;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  player,
  level,
  maxAlert,
  gameTimeSeconds,
  timeRemaining = 60,
  isBossSkillActive = false,
  bossSkillDuration = 0,
  bossSkillNextInSeconds = 45,
  isMuted,
  isPaused,
  onToggleMute,
  onTogglePause,
  onOpenHelp,
  onThrowDistraction,
  onToggleHide,
  onTriggerSprint,
  onSkipTutorial,
  isNearHidingSpot
}) => {
  const [showObjectivesDetail, setShowObjectivesDetail] = useState(false);

  // Office clock (17:30 + elapsed)
  const startMinutes = 30;
  const totalSeconds = startMinutes * 60 + Math.floor(gameTimeSeconds);
  const hours = 17 + Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Countdown timer before curfew / lockdown
  const remMinutes = Math.floor(timeRemaining / 60);
  const remSeconds = Math.floor(timeRemaining % 60);
  const countdownString = `${remMinutes.toString().padStart(2, '0')}:${remSeconds.toString().padStart(2, '0')}`;
  const isTimeCritical = timeRemaining <= 15;

  const isAlarm = maxAlert >= 70;
  const isSuspicious = maxAlert >= 25 && maxAlert < 70;

  // Check required items for exiting
  const reqItems = level.collectibles.filter((c) => c.requiredForExit);
  const hasCard = player.inventory.hasCard;
  const hasKey = player.inventory.hasKey;
  const hasBackpack = player.inventory.hasBackpack;

  const isExitUnlocked = reqItems.length > 0
    ? reqItems.every((c) => c.isCollected)
    : (level.exitPoint.requiredItemType === 'card' ? hasCard : level.exitPoint.requiredItemType === 'key' ? hasKey : true);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-2 sm:p-3 select-none">
      {/* 1. TOP HEADER BAR */}
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-center justify-between gap-1.5 w-full">
          {/* Left: Floor Badge & Escape Timer */}
          <div className="flex items-center gap-1.5">
            {/* Floor Name */}
            <div className="pixel-box pointer-events-auto bg-slate-900/90 backdrop-blur border border-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
              <span className="text-amber-400 font-pixel text-[10px] sm:text-xs tracking-wider">
                {level.title.split(':')[0]}
              </span>
              <span className="text-slate-500 text-xs hidden md:inline">|</span>
              <span className="text-slate-300 text-xs font-semibold hidden md:inline truncate max-w-[140px]">
                {level.deptName}
              </span>
            </div>

            {/* Countdown Curfew Timer */}
            <div
              className={`pixel-box pointer-events-auto backdrop-blur px-2.5 py-1 rounded-lg flex items-center gap-1.5 border transition-all ${
                isTimeCritical
                  ? 'bg-red-950/90 border-red-500 text-red-300 animate-pulse ring-2 ring-red-500/50'
                  : 'bg-slate-900/90 border-amber-500/50 text-amber-300'
              }`}
              title="Thời gian còn lại trước khi tòa nhà giới nghiêm khóa cửa!"
            >
              <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-red-400 animate-spin' : 'text-amber-400'}`} />
              <span className="font-pixel text-[10px] sm:text-xs font-bold tracking-widest">
                {countdownString}
              </span>
            </div>

            {/* Bonus Coins collected */}
            {player.inventory.collectedCoins > 0 && (
              <div className="pixel-box pointer-events-auto bg-amber-950/80 backdrop-blur border border-amber-500/50 px-2 py-1 rounded-lg hidden sm:flex items-center gap-1">
                <span className="text-xs">💰</span>
                <span className="font-pixel text-[10px] sm:text-xs text-amber-300 font-bold">
                  +{player.inventory.collectedCoins}
                </span>
              </div>
            )}
          </div>

          {/* Center / Right: Suspicion Meter & Controls */}
          <div className="flex items-center gap-1.5">
            {/* Suspicion / Alert Gauge */}
            <div className="pixel-box pointer-events-auto bg-slate-900/90 backdrop-blur border border-slate-700 px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
              <ShieldAlert
                className={`w-3.5 h-3.5 ${
                  isAlarm ? 'text-red-500 animate-bounce' : isSuspicious ? 'text-amber-400' : 'text-emerald-400'
                }`}
              />
              <div className="w-14 sm:w-24 h-2.5 bg-slate-950 rounded-full border border-slate-700 overflow-hidden relative p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-150 ${
                    isAlarm
                      ? 'bg-red-500 alert-pulse'
                      : isSuspicious
                      ? 'bg-amber-400'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, maxAlert))}%` }}
                />
              </div>
              <span
                className={`font-pixel text-[9px] ${
                  isAlarm ? 'text-red-400 font-bold' : isSuspicious ? 'text-amber-300' : 'text-emerald-400'
                }`}
              >
                {Math.round(maxAlert)}%
              </span>
            </div>

            {/* Checklist Toggle Button */}
            <button
              onClick={() => setShowObjectivesDetail(!showObjectivesDetail)}
              className={`pointer-events-auto px-2 py-1 rounded-lg border font-pixel text-[9px] sm:text-[10px] flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
                isExitUnlocked
                  ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 animate-bounce'
                  : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
              title="Xem danh sách vật phẩm cần tìm để mở cửa"
            >
              <span>{isExitUnlocked ? '🚪 CỬA MỞ' : '📋 ĐỒ CẦN TÌM'}</span>
              {showObjectivesDetail ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Skip Tutorial if applicable */}
            {level.isTutorial && onSkipTutorial && (
              <button
                onClick={onSkipTutorial}
                className="pointer-events-auto px-2 py-1 bg-slate-800 text-amber-300 border border-amber-500/40 font-pixel text-[9px] rounded-lg active:scale-95 cursor-pointer"
              >
                BỎ QUA ➔
              </button>
            )}

            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              className="pointer-events-auto p-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg active:scale-95 cursor-pointer"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            {/* Pause Toggle */}
            <button
              onClick={onTogglePause}
              className="pointer-events-auto p-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg active:scale-95 cursor-pointer"
              title="Tạm dừng"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5 text-slate-300" />}
            </button>

            {/* Help */}
            <button
              onClick={onOpenHelp}
              className="pointer-events-auto p-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg active:scale-95 cursor-pointer hidden sm:flex"
              title="Hướng dẫn"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>
        </div>

        {/* 2. BOSS SKILL NOTIFICATION BANNER / COUNTDOWN */}
        {isBossSkillActive ? (
          <div className="self-center bg-red-600/95 border-2 border-red-300 text-white font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-2xl animate-pulse flex items-center gap-2">
            <span className="text-base animate-spin">⚡</span>
            <span>KỸ NĂNG SẾP ĐANG KÍCH HOẠT! QUÉT CỰC NHANH - HÃY NẤP KỸ ({Math.max(0.1, bossSkillDuration).toFixed(1)}s)!</span>
          </div>
        ) : (
          <div className="self-center flex items-center gap-2">
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700/80 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] text-slate-400 flex items-center gap-1.5">
              <span>⚡ Kỹ năng sếp kế tiếp:</span>
              <span className="font-pixel text-amber-400 font-bold">{Math.ceil(bossSkillNextInSeconds)}s</span>
            </div>
            {isExitUnlocked && (
              <div className="bg-emerald-900/90 border border-emerald-500 text-emerald-200 font-pixel text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full animate-bounce flex items-center gap-1">
                <span>🚪 ĐÃ ĐỦ ĐỒ! CHẠY RA CỬA EXIT NGAY! ➔</span>
              </div>
            )}
          </div>
        )}

        {/* 3. EXPANDED CHECKLIST DRAWER (COMPACT & NEVER COVERS WHOLE SCREEN) */}
        {showObjectivesDetail && (
          <div className="pointer-events-auto self-end max-w-sm w-full bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-2xl flex flex-col gap-2 mt-1 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="text-xs font-bold text-amber-400 font-tech uppercase tracking-wider flex items-center gap-1.5">
                <span>📋</span>
                <span>Vật phẩm cần tìm để mở cửa:</span>
              </span>
              <button
                onClick={() => setShowObjectivesDetail(false)}
                className="text-slate-400 hover:text-slate-200 text-xs p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              {/* Card Requirement */}
              {(level.exitPoint.requiredItemType === 'card' || reqItems.some((i) => i.type === 'card')) && (
                <div
                  className={`flex items-center justify-between p-1.5 rounded-lg border ${
                    hasCard
                      ? 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5" />
                    <span>Thẻ Chấm Công / Thẻ Từ</span>
                  </span>
                  <span className="font-pixel text-[9px] font-bold">
                    {hasCard ? '✓ ĐÃ LẤY' : '0/1 CẦN TÌM'}
                  </span>
                </div>
              )}

              {/* Key Requirement */}
              {(level.exitPoint.requiredItemType === 'key' || reqItems.some((i) => i.type === 'key')) && (
                <div
                  className={`flex items-center justify-between p-1.5 rounded-lg border ${
                    hasKey
                      ? 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5" />
                    <span>Chìa Khóa Xe Máy / Cửa VIP</span>
                  </span>
                  <span className="font-pixel text-[9px] font-bold">
                    {hasKey ? '✓ ĐÃ LẤY' : '0/1 CẦN TÌM'}
                  </span>
                </div>
              )}

              {/* Backpack Requirement if level needs it */}
              {reqItems.some((i) => i.type === 'backpack') && (
                <div
                  className={`flex items-center justify-between p-1.5 rounded-lg border ${
                    hasBackpack
                      ? 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>🎒</span>
                    <span>Ba Lô Cá Nhân Laptop</span>
                  </span>
                  <span className="font-pixel text-[9px] font-bold">
                    {hasBackpack ? '✓ ĐÃ LẤY' : '0/1 CẦN TÌM'}
                  </span>
                </div>
              )}

              {/* Exit Door Status */}
              <div
                className={`p-2 rounded-lg border text-center font-bold text-xs flex items-center justify-center gap-2 ${
                  isExitUnlocked
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 animate-pulse'
                    : 'bg-amber-950/30 border-amber-600/40 text-amber-300'
                }`}
              >
                {isExitUnlocked ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>CỬA THOÁT HIỂM ĐÃ MỞ! CHẠY RA CỔNG NGAY!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-amber-400" />
                    <span>CỬA ĐANG KHÓA (Cần nhặt đủ vật phẩm trên)</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. CENTER HIDING OR NEAR-SPOT PROMPTS (COMPACT TOP PLACEMENT, NEVER COVERS PLAYER) */}
      <div className="self-center flex flex-col items-center gap-1 pointer-events-none mt-2">
        {player.isHiding && (
          <div className="bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-lg border-2 border-slate-900 animate-pulse flex items-center gap-2">
            <span>📦</span>
            <span>Đang ẩn nấp! Sếp không nhìn thấy bạn (Nhấn [E] hoặc nút Nấp để chui ra)</span>
          </div>
        )}

        {!player.isHiding && isNearHidingSpot && (
          <div className="bg-slate-900/90 backdrop-blur text-amber-400 font-pixel text-[10px] sm:text-[11px] px-3 py-1.5 rounded-lg border border-amber-500/50 shadow-lg animate-bounce flex items-center gap-1.5">
            <Package className="w-4 h-4 text-amber-400" />
            <span>Nhấn [E] hoặc nút [Nấp] để chui vào!</span>
          </div>
        )}
      </div>

      {/* 5. BOTTOM BAR (DESKTOP ONLY - KEEP BOTTOM COMPLETELY FREE ON MOBILE!) */}
      <div className="hidden md:flex items-end justify-between gap-3 w-full">
        {/* Objectives Summary on Desktop */}
        <div className="pixel-box pointer-events-auto bg-slate-900/90 backdrop-blur border border-slate-700 p-2 rounded-xl flex items-center gap-3 text-xs">
          <div className="text-[10px] font-pixel text-slate-400 uppercase tracking-wider">
            Mục tiêu:
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold ${
                isExitUnlocked
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              {isExitUnlocked ? 'CỬA ĐÃ MỞ (CHẠY RA EXIT) ✓' : 'CHƯA ĐỦ ĐỒ MỞ CỬA'}
            </span>

            {hasBackpack && (
              <span className="bg-sky-950 text-sky-300 border border-sky-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                🎒 Ba Lô ✓
              </span>
            )}

            {player.inventory.coffeeBoostTime > 0 && (
              <span className="bg-amber-950 text-amber-300 border border-amber-700 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 animate-pulse">
                <Coffee className="w-3.5 h-3.5" />
                Tăng tốc ({Math.ceil(player.inventory.coffeeBoostTime)}s)
              </span>
            )}
          </div>
        </div>

        {/* Desktop Action Shortcuts */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Sprint status button on desktop */}
          <button
            onClick={onTriggerSprint}
            disabled={player.isSprintOnCooldown}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all active:scale-95 ${
              player.isSprinting
                ? 'bg-red-600 border-red-300 text-white shadow-red-600/40 animate-pulse'
                : player.isSprintOnCooldown
                ? 'bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40 cursor-pointer'
            }`}
            title="Chạy nhanh 3s rồi khóa 5s [Phím Shift]"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {player.isSprinting
                ? `Chạy! (${player.sprintDuration.toFixed(1)}s)`
                : player.isSprintOnCooldown
                ? `Hồi (${Math.ceil(player.sprintCooldown)}s)`
                : 'Chạy Nhanh [Shift]'}
            </span>
          </button>

          {/* Distraction button */}
          <button
            onClick={onThrowDistraction}
            disabled={player.inventory.distractionsCount <= 0}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all active:scale-95 ${
              player.inventory.distractionsCount > 0
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40 cursor-pointer'
                : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
            }`}
            title="Ném cốc giấy đánh lạc hướng Sếp (Phím Q)"
          >
            <span>🥤</span>
            <span>Ném Cốc ({player.inventory.distractionsCount}) [Q]</span>
          </button>

          {/* Hide button */}
          {isNearHidingSpot && (
            <button
              onClick={onToggleHide}
              className="px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/50 rounded-xl flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
            >
              <Package className="w-3.5 h-3.5" />
              <span>{player.isHiding ? 'Chui Ra [E]' : 'Chui Nấp [E]'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
