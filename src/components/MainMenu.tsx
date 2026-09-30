import React, { useState } from 'react';
import {
  Play,
  Flame,
  Shirt,
  HelpCircle,
  Volume2,
  VolumeX,
  Trophy,
  ShieldAlert,
  Sparkles,
  Gift,
  Award,
  Crown,
  Search,
  Footprints,
  Briefcase,
  Lock
} from 'lucide-react';
import { CharacterSkin, Accessory } from '../types/game';
import { MiniPreviewCanvas } from './MiniPreviewCanvas';
import { LottieStickerIcon } from './LottieStickerIcon';

interface MainMenuProps {
  onStartStory: (floorId: number) => void;
  onStartEndless: () => void;
  onStartTutorial: () => void;
  onStartNightmare: (floorId: number) => void;
  onStartBossHunt: () => void;
  onOpenShop: () => void;
  onOpenMissions: () => void;
  onOpenWardrobe: () => void;
  onOpenHelp: () => void;
  onOpenLuckyWheel: () => void;
  onOpenHallOfFame: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  currentSkin: CharacterSkin;
  currentAccessory: Accessory;
  highScoreEndless: number;
  coins: number;
  hasBeatenGame?: boolean;
  unclaimedMissionsCount?: number;
  maxLevelUnlocked?: number;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartStory,
  onStartEndless,
  onStartTutorial,
  onStartNightmare,
  onStartBossHunt,
  onOpenShop,
  onOpenMissions,
  onOpenWardrobe,
  onOpenHelp,
  onOpenLuckyWheel,
  onOpenHallOfFame,
  isMuted,
  onToggleMute,
  currentSkin,
  currentAccessory,
  highScoreEndless,
  coins,
  hasBeatenGame = false,
  unclaimedMissionsCount = 0,
  maxLevelUnlocked = 1
}) => {
  const [selectedFloor, setSelectedFloor] = useState<number>(Math.min(maxLevelUnlocked, 8));
  const [isNightmareTab, setIsNightmareTab] = useState<boolean>(false);

  const floorList = [
    { id: 1, name: 'Ải 1: QA & Thực Tập', desc: 'Làm quen văn phòng, lấy Thẻ Tầng 5', icon: '🐛' },
    { id: 2, name: 'Ải 2: Dev & IT', desc: 'Né Sếp Tuấn Bug OT, lấy Chìa khóa xe', icon: '💻' },
    { id: 3, name: 'Ải 3: Marketing & HR', desc: 'Né Chị Hạnh & Em Linh HR, lấy Thẻ máy in', icon: '📢' },
    { id: 4, name: 'Ải 4: Kế Toán & Laser', desc: 'Né Camera quét laser đỏ & Chị Mai Kế Toán', icon: '📊' },
    { id: 5, name: 'Ải 5: Ban Giám Đốc VIP', desc: 'Né Phó TGĐ Hùng & 3 Camera an ninh', icon: '👔' },
    { id: 6, name: 'Ải 6: Đại Sảnh Lễ Tân', desc: 'Né Sếp Tổng & Bác Bảo Vệ', icon: '🏢' },
    { id: 7, name: 'Ải 7: Hầm Bãi Xe B1', desc: 'Bóng tối & 2 Bảo vệ tuần tra, tìm Chìa Ga', icon: '🛵' },
    { id: 8, name: 'Ải 8: Cổng Chung Kết VIP', desc: 'Đại đội Sếp bao vây - Thoát ra đường lớn!', icon: '🏆' }
  ];

  return (
    <div className="relative h-[100dvh] w-full bg-[#0B091A] text-slate-100 flex flex-col justify-between p-1.5 sm:p-3 overflow-hidden font-chibi select-none">
      {/* Ambient background office glow & scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-[#05040F] pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-20" />

      {/* Top Utility Header Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-20 gap-2 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Coins Pill */}
          <button
            onClick={onOpenShop}
            className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/60 hover:border-amber-300 text-amber-300 font-pixel text-[11px] sm:text-xs flex items-center gap-1 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <LottieStickerIcon name="coin" size={18} />
            <span className="font-bold">{coins} Xu</span>
            <span className="text-[9px] text-amber-400 opacity-80 bg-amber-500/30 px-1 rounded">+Shop</span>
          </button>

          {/* Lucky Wheel Button */}
          <button
            onClick={onOpenLuckyWheel}
            className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-900/80 to-pink-900/80 border border-pink-400/60 hover:border-pink-300 text-pink-200 font-pixel text-[11px] sm:text-xs flex items-center gap-1 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <LottieStickerIcon name="wheel" size={18} />
            <span className="hidden xs:inline">VÒNG QUAY</span>
          </button>

          {/* Tutorial Button */}
          <button
            onClick={onStartTutorial}
            className="hidden sm:flex px-2.5 py-1 rounded-full bg-sky-950/80 border border-sky-400/50 hover:border-sky-300 text-sky-300 font-pixel text-xs items-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <LottieStickerIcon name="help" size={16} />
            <span>HƯỚNG DẪN</span>
          </button>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenHallOfFame}
            className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-amber-500/60 hover:border-amber-400 text-amber-300 font-pixel text-[11px] sm:text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <LottieStickerIcon name="trophy" size={18} />
            <span className="hidden sm:inline">VINH DANH</span>
          </button>

          <button
            onClick={onOpenWardrobe}
            className="px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-400/60 text-indigo-300 font-pixel text-[11px] sm:text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <LottieStickerIcon name="wardrobe" size={18} />
            <span className="hidden sm:inline">TỦ ĐỒ</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-1 rounded-full bg-slate-900/90 border border-slate-700 hover:border-slate-500 text-slate-300 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            onClick={onOpenHelp}
            className="p-1 rounded-full bg-slate-900/90 border border-slate-700 hover:border-slate-500 text-sky-400 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Title Header Logo */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center relative z-20 shrink-0 my-0.5 sm:my-1">
        {/* Doodled Handwritten Text Annotations */}
        <div className="hidden lg:block absolute left-0 top-0 text-indigo-200/90 font-hand text-sm sm:text-base -rotate-6 max-w-[160px] leading-tight drop-shadow">
          Làm việc cả ngày...<br />chỉ mong được về! ✈️
        </div>

        <div className="hidden lg:block absolute right-0 top-0 text-indigo-200/90 font-hand text-sm sm:text-base rotate-6 max-w-[170px] text-right leading-tight drop-shadow">
          Lén lút qua góc...<br />chỉ để 💖 trốn sếp! 😠
        </div>

        {/* Center Graphic Title Logo */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {/* Left Chibi Female Running Avatar */}
          <div className="relative shrink-0 animate-bounce duration-1000 hidden xs:block">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-indigo-600/30 border-2 border-sky-400 flex items-center justify-center text-lg sm:text-2xl shadow-[0_0_12px_rgba(56,189,248,0.5)]">
              👩‍💻
            </div>
          </div>

          {/* Main Title Text Group */}
          <div className="flex flex-col items-center">
            {/* Top Row: TRỐN SẾP in 3D icy blue pixel font */}
            <div className="relative font-pixel text-2xl sm:text-4xl md:text-5xl tracking-wider text-sky-300 drop-shadow-[0_3px_0_#1E3A8A]">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-sky-200 via-sky-300 to-cyan-400">
                TRỐN SẾP
              </span>
            </div>

            {/* Bottom Row: TAN CA in 3D golden yellow pixel font */}
            <div className="relative font-pixel text-2xl sm:text-4xl md:text-5xl tracking-wider text-amber-400 drop-shadow-[0_3px_0_#78350F] -mt-1 flex items-center gap-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-500">
                TAN CA
              </span>
              <span className="text-lg sm:text-2xl animate-spin" style={{ animationDuration: '8s' }}>
                🕒
              </span>
            </div>
          </div>

          {/* Right Angry Boss Avatar */}
          <div className="relative shrink-0 hidden xs:block">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-red-900/40 border-2 border-red-500 flex items-center justify-center text-lg sm:text-2xl shadow-[0_0_12px_rgba(239,68,68,0.5)]">
              👔
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Play Console (Scaled & Optimized for Landscape 100% Screen Fit) */}
      <div className="w-full max-w-3xl mx-auto z-20 my-auto flex-1 flex flex-col justify-center max-h-[calc(100vh-140px)]">
        <div className="relative border-2 sm:border-4 border-[#8B5CF6] shadow-[0_0_25px_rgba(139,92,246,0.5)] rounded-2xl sm:rounded-[1.8rem] bg-[#110E2E]/95 overflow-hidden p-2 sm:p-3.5 flex flex-col justify-between max-h-full">
          
          {/* Tablet Inner Top Bar */}
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-indigo-900/60 shrink-0">
            {/* Top-Left Hearts */}
            <div className="flex items-center gap-1 text-red-500 text-xs sm:text-sm">
              <span>❤️</span>
              <span>❤️</span>
              <span>❤️</span>
            </div>

            {/* Center Status title */}
            <div className="font-pixel text-[10px] sm:text-xs text-amber-300 flex items-center gap-1">
              <span className="text-xs">{isNightmareTab ? '💀' : '🏢'}</span>
              <span className="truncate max-w-[180px] sm:max-w-none">{floorList[selectedFloor - 1]?.name}</span>
            </div>

            {/* Top-Right Timer & Pause */}
            <div className="flex items-center gap-1.5">
              <div className="px-1.5 py-0.5 rounded bg-slate-900 border border-amber-500/50 text-amber-300 font-pixel text-[10px] flex items-center gap-1">
                <span>🕒</span>
                <span>02:35</span>
              </div>
            </div>
          </div>

          {/* Mode Switcher Bar */}
          <div className="flex items-center justify-between mb-1.5 shrink-0">
            <span className="font-pixel text-[10px] sm:text-xs text-indigo-300">
              {isNightmareTab ? '🔥 CHẾ ĐỘ ÁC MỘNG (3X XU)' : '🏢 CHIẾN DỊCH 8 ẢI'}
            </span>

            {/* Switcher Buttons */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setIsNightmareTab(false)}
                className={`px-2 py-0.5 rounded font-pixel text-[9px] cursor-pointer ${
                  !isNightmareTab ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                Ải Thường
              </button>
              <button
                onClick={() => setIsNightmareTab(true)}
                className={`px-2 py-0.5 rounded font-pixel text-[9px] cursor-pointer flex items-center gap-0.5 ${
                  isNightmareTab ? 'bg-red-600 text-white font-bold' : 'text-red-400'
                }`}
              >
                <Flame className="w-2.5 h-2.5 fill-red-400" />
                <span>Ác Mộng</span>
              </button>
            </div>
          </div>

          {/* Floor Grid 1 - 8 */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 mb-1.5 shrink-0">
            {floorList.map((fl) => {
              const isUnlocked = fl.id <= maxLevelUnlocked;
              const isSelected = selectedFloor === fl.id;
              return (
                <button
                  key={fl.id}
                  onClick={() => setSelectedFloor(fl.id)}
                  className={`p-1 rounded-lg border text-center transition-all cursor-pointer active:scale-95 ${
                    isSelected
                      ? isNightmareTab
                        ? 'bg-red-600/40 border-red-400 text-red-200 ring-1 ring-red-400'
                        : 'bg-amber-500/30 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                      : isUnlocked
                      ? 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-950/50 border-slate-900 text-slate-600 opacity-60'
                  }`}
                >
                  <div className="text-xs mb-0.5">
                    {!isUnlocked ? '🔒' : isNightmareTab ? '💀' : fl.icon}
                  </div>
                  <div className="font-pixel text-[8px] sm:text-[9px]">ẢI {fl.id}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Level Description Box */}
          <div className="p-1.5 sm:p-2 rounded-xl bg-slate-950/90 border border-indigo-900/60 mb-1.5 text-left shrink-0">
            <div className="font-pixel text-[10px] sm:text-xs text-amber-300 font-bold mb-0.5 flex items-center justify-between">
              <span>{floorList[selectedFloor - 1]?.name}</span>
              {selectedFloor > maxLevelUnlocked && (
                <span className="text-red-400 font-pixel text-[8px]">🔒 CẦN VƯỢT ẢI {selectedFloor - 1}</span>
              )}
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300 font-chibi line-clamp-2">
              {selectedFloor > maxLevelUnlocked
                ? `Hãy hoàn thành Ải ${selectedFloor - 1} để mở khóa màn chơi này!`
                : isNightmareTab
                ? '🌙 Văn phòng tắt đèn tối đen! Bạn có đèn pin, Sếp chạy nhanh 1.3x và kỹ năng Quét Radar kích hoạt liên tục!'
                : floorList[selectedFloor - 1]?.desc}
            </p>
          </div>

          {/* BIG PLAY BUTTON */}
          <button
            onClick={() => {
              if (selectedFloor <= maxLevelUnlocked) {
                isNightmareTab ? onStartNightmare(selectedFloor) : onStartStory(selectedFloor);
              }
            }}
            disabled={selectedFloor > maxLevelUnlocked}
            className={`w-full py-2.5 sm:py-3 font-pixel text-xs sm:text-sm rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all shrink-0 ${
              selectedFloor > maxLevelUnlocked
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : isNightmareTab
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 hover:from-red-500 text-white shadow-red-600/30 active:scale-98 cursor-pointer'
                : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 text-slate-950 shadow-amber-500/30 active:scale-98 cursor-pointer'
            }`}
          >
            {selectedFloor > maxLevelUnlocked ? (
              <span>🔒 CẦN VƯỢT ẢI {selectedFloor - 1}</span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{isNightmareTab ? `BẮT ĐẦU ÁC MỘNG ẢI ${selectedFloor}` : `BẮT ĐẦU VƯỢT ẢI ${selectedFloor}`}</span>
              </>
            )}
          </button>

          {/* Quick Action Navigation Buttons */}
          <div className="grid grid-cols-4 gap-1 mt-1.5 pt-1.5 border-t border-indigo-900/60 shrink-0">
            <button
              onClick={onOpenShop}
              className="p-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[9px] sm:text-[10px] flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
            >
              <LottieStickerIcon name="shop" size={16} />
              <span>SHOP</span>
            </button>
            <button
              onClick={onOpenMissions}
              className="p-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[9px] sm:text-[10px] flex items-center justify-center gap-1 active:scale-95 cursor-pointer relative"
            >
              <LottieStickerIcon name="trophy" size={16} />
              <span>NHIỆM VỤ</span>
              {unclaimedMissionsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              )}
            </button>
            <button
              onClick={onOpenWardrobe}
              className="p-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[9px] sm:text-[10px] flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
            >
              <LottieStickerIcon name="wardrobe" size={16} />
              <span>TỦ ĐỒ</span>
            </button>
            <button
              onClick={onStartBossHunt}
              className="p-1 rounded-lg bg-gradient-to-r from-amber-600/40 to-orange-600/40 border border-amber-500/60 text-amber-300 font-pixel text-[9px] sm:text-[10px] flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
            >
              <LottieStickerIcon name="crown" size={16} />
              <span>LÀM SẾP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Notes */}
      <div className="w-full max-w-5xl mx-auto flex items-end justify-between z-10 shrink-0 pointer-events-none">
        {/* Bottom Left: Cute Anime Chibi Peeking Girl */}
        <div className="flex items-end gap-2 relative">
          <div className="w-14 sm:w-20 h-10 sm:h-14 bg-[#1E1B4B] border-t-2 border-x-2 border-indigo-400/80 rounded-t-full flex flex-col items-center justify-end pb-0.5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-2.5 h-3 bg-slate-900 rounded-full border border-sky-400" />
              <div className="w-2.5 h-3 bg-slate-900 rounded-full border border-sky-400" />
            </div>
          </div>
        </div>

        {/* Bottom Right: Sticky Note "Tan ca thôi! 🙂" */}
        <div className="px-2 py-1 bg-[#FDE047] text-slate-900 font-hand text-xs sm:text-sm font-bold rounded shadow-lg rotate-3 border border-amber-300 pointer-events-auto">
          <span>Tan ca thôi! 🙂</span>
        </div>
      </div>
    </div>
  );
};
