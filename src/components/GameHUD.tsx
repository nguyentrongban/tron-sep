import React from 'react';
import { Volume2, VolumeX, Pause, Play, ShieldAlert, Key, Coffee, Package, HelpCircle } from 'lucide-react';
import { Player, FloorLevel } from '../types/game';

interface GameHUDProps {
  player: Player;
  level: FloorLevel;
  maxAlert: number;
  gameTimeSeconds: number;
  isMuted: boolean;
  isPaused: boolean;
  onToggleMute: () => void;
  onTogglePause: () => void;
  onOpenHelp: () => void;
  onThrowDistraction: () => void;
  onToggleHide: () => void;
  onSkipTutorial?: () => void;
  isNearHidingSpot: boolean;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  player,
  level,
  maxAlert,
  gameTimeSeconds,
  isMuted,
  isPaused,
  onToggleMute,
  onTogglePause,
  onOpenHelp,
  onThrowDistraction,
  onToggleHide,
  onSkipTutorial,
  isNearHidingSpot
}) => {
  // Format office clock: 17:30 + elapsed seconds
  const startMinutes = 30;
  const totalSeconds = startMinutes * 60 + Math.floor(gameTimeSeconds);
  const hours = 17 + Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const isAlarm = maxAlert >= 70;
  const isSuspicious = maxAlert >= 25 && maxAlert < 70;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 select-none">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Left: Department & Floor Info */}
        <div className="flex items-center gap-2">
          <div className="pixel-box pointer-events-auto bg-slate-900/90 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-amber-400 font-pixel text-xs tracking-wider">
              {level.title.split(':')[0]}
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">|</span>
            <span className="text-slate-200 text-xs font-semibold hidden sm:inline">
              {level.deptName}
            </span>
          </div>

          {/* Clock: 17:30 OT Count */}
          <div className="pixel-box pointer-events-auto bg-slate-900/90 backdrop-blur border border-amber-500/40 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-xs">⏰</span>
            <span className="font-pixel text-xs text-amber-300 font-bold tracking-widest">
              {timeString}
            </span>
            <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-1 rounded font-pixel animate-pulse">
              HẾT GIỜ!
            </span>
          </div>

          {/* Collected coins in floor */}
          {player.inventory.collectedCoins > 0 && (
            <div className="pixel-box pointer-events-auto bg-amber-950/80 backdrop-blur border border-amber-500/50 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 animate-bounce">
              <span>💰</span>
              <span className="font-pixel text-xs text-amber-300 font-bold">
                +{player.inventory.collectedCoins} Xu
              </span>
            </div>
          )}
        </div>

        {/* Center: Suspicion / Alert Meter */}
        <div className="pixel-box pointer-events-auto bg-slate-900/90 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <ShieldAlert
              className={`w-4 h-4 ${
                isAlarm ? 'text-red-500 animate-bounce' : isSuspicious ? 'text-amber-400' : 'text-emerald-400'
              }`}
            />
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-tech">
              Cảnh giác:
            </span>
          </div>

          <div className="w-24 sm:w-36 h-3.5 bg-slate-950 rounded-full border border-slate-700 overflow-hidden relative p-0.5">
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
            className={`font-pixel text-[10px] ${
              isAlarm ? 'text-red-400 font-bold' : isSuspicious ? 'text-amber-300' : 'text-emerald-400'
            }`}
          >
            {Math.round(maxAlert)}%
          </span>
        </div>

        {/* Right: Audio & Settings Controls */}
        <div className="flex items-center gap-1.5">
          {level.isTutorial && onSkipTutorial && (
            <button
              onClick={onSkipTutorial}
              className="pointer-events-auto px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-pixel text-[10px] rounded-lg active:scale-95 transition-transform cursor-pointer"
            >
              BỎ QUA HƯỚNG DẪN ➔
            </button>
          )}
          <button
            onClick={onOpenHelp}
            className="pointer-events-auto p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg active:scale-95 transition-transform cursor-pointer"
            title="Hướng dẫn chơi"
          >
            <HelpCircle className="w-4 h-4 text-sky-400" />
          </button>
          <button
            onClick={onToggleMute}
            className="pointer-events-auto p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg active:scale-95 transition-transform cursor-pointer"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            onClick={onTogglePause}
            className="pointer-events-auto p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg active:scale-95 transition-transform cursor-pointer"
            title="Tạm dừng"
          >
            {isPaused ? <Play className="w-4 h-4 text-amber-400" /> : <Pause className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </div>

      {/* Center Toast notification if player is hiding */}
      {player.isHiding && (
        <div className="self-center bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-lg border-2 border-slate-900 animate-pulse flex items-center gap-2">
          <span>📦</span>
          <span>Đang ẩn nấp! Sếp không nhìn thấy bạn (Nhấn E hoặc nút Nấp để ra)</span>
        </div>
      )}

      {/* Near hiding spot prompt */}
      {!player.isHiding && isNearHidingSpot && (
        <div className="self-center bg-slate-900/90 backdrop-blur text-amber-400 font-pixel text-[11px] px-3 py-1.5 rounded-lg border border-amber-500/50 shadow-lg animate-bounce flex items-center gap-2">
          <Package className="w-4 h-4 text-amber-400" />
          <span>Nhấn [E] để chui vào Nấp!</span>
        </div>
      )}

      {/* Bottom Inventory & Quick Action Bar */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        {/* Objectives / Required Key status */}
        <div className="pixel-box pointer-events-auto bg-slate-900/90 backdrop-blur border border-slate-700 p-2.5 rounded-xl flex flex-col gap-1 text-xs">
          <div className="text-[10px] font-pixel text-slate-400 uppercase tracking-wider mb-0.5">
            Mục tiêu trốn về:
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold ${
                player.inventory.hasCard || player.inventory.hasKey
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              {level.exitPoint.requiredItemType === 'card'
                ? 'Thẻ Ra Cổng'
                : 'Chìa Khóa Xe/Thang'}
              {player.inventory.hasCard || player.inventory.hasKey ? ' (ĐÃ LẤY ✓)' : ' (CHƯA CÓ)'}
            </span>

            {player.inventory.hasBackpack && (
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

        {/* Action buttons on desktop */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2">
          {/* Stamina bar */}
          <div className="bg-slate-900/90 border border-slate-700 p-2 rounded-xl flex items-center gap-2">
            <span className="text-[10px] font-pixel text-slate-400">THỂ LỰC:</span>
            <div className="w-24 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-cyan-400 transition-all duration-75"
                style={{ width: `${(player.stamina / player.maxStamina) * 100}%` }}
              />
            </div>
          </div>

          {/* Distraction button */}
          <button
            onClick={onThrowDistraction}
            disabled={player.inventory.distractionsCount <= 0}
            className={`px-3 py-2 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all active:scale-95 ${
              player.inventory.distractionsCount > 0
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40 cursor-pointer'
                : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
            }`}
            title="Ném cốc giấy đánh lạc hướng Sếp (Phím Q)"
          >
            <span>🥤</span>
            <span>Ném Cốc Lạc Hướng ({player.inventory.distractionsCount}) [Q]</span>
          </button>

          {/* Hide button */}
          {isNearHidingSpot && (
            <button
              onClick={onToggleHide}
              className="px-3 py-2 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/50 rounded-xl flex items-center gap-2 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
            >
              <Package className="w-4 h-4" />
              <span>{player.isHiding ? 'Chui Ra' : 'Chui Nấp [E]'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
