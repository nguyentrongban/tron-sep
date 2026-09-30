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
    <div className="relative min-h-screen w-full bg-[#0B091A] text-slate-100 flex flex-col justify-between p-2 sm:p-4 overflow-x-hidden overflow-y-auto font-chibi">
      {/* Ambient background office glow & scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-[#05040F] pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-20" />

      {/* Top Utility Header Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 gap-2 mb-1">
        <div className="flex items-center gap-2">
          {/* Coins Pill */}
          <button
            onClick={onOpenShop}
            className="px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/60 hover:border-amber-300 text-amber-300 font-pixel text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <LottieStickerIcon name="coin" size={20} />
            <span className="font-bold">{coins} Xu</span>
            <span className="text-[10px] text-amber-400 opacity-80 bg-amber-500/30 px-1.5 py-0.2 rounded-full">+Shop</span>
          </button>

          {/* Lucky Wheel Button */}
          <button
            onClick={onOpenLuckyWheel}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-900/80 to-pink-900/80 border border-pink-400/60 hover:border-pink-300 text-pink-200 font-pixel text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <LottieStickerIcon name="wheel" size={20} />
            <span>VÒNG QUAY</span>
          </button>

          {/* Tutorial Button */}
          <button
            onClick={onStartTutorial}
            className="hidden sm:flex px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-400/50 hover:border-sky-300 text-sky-300 font-pixel text-xs items-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <LottieStickerIcon name="help" size={18} />
            <span>HƯỚNG DẪN</span>
          </button>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHallOfFame}
            className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/60 hover:border-amber-400 text-amber-300 font-pixel text-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <LottieStickerIcon name="trophy" size={20} />
            <span className="hidden sm:inline">VINH DANH</span>
          </button>

          <button
            onClick={onOpenWardrobe}
            className="px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-400/60 text-indigo-300 font-pixel text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <LottieStickerIcon name="wardrobe" size={20} />
            <span className="hidden sm:inline">TỦ ĐỒ</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-full bg-slate-900/90 border border-slate-700 hover:border-slate-500 text-slate-300 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={onOpenHelp}
            className="p-1.5 rounded-full bg-slate-900/90 border border-slate-700 hover:border-slate-500 text-sky-400 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Visual Header (Matching Screenshot Header Logo 99%) */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center relative z-20 my-1">
        {/* Doodled Handwritten Text Annotations */}
        <div className="hidden md:block absolute left-2 top-0 text-indigo-200/90 font-hand text-lg sm:text-xl -rotate-6 max-w-[200px] leading-tight drop-shadow">
          Làm việc cả ngày...<br />chỉ mong được về nhà! ✈️
        </div>

        <div className="hidden md:block absolute right-2 top-0 text-indigo-200/90 font-hand text-lg sm:text-xl rotate-6 max-w-[210px] text-right leading-tight drop-shadow">
          Lén lút qua từng góc<br />văn phòng... chỉ để 💖<br />trốn sếp! 😠💫
        </div>

        {/* Center Graphic Title Logo */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-1">
          {/* Left Chibi Female Running Avatar */}
          <div className="relative shrink-0 animate-bounce duration-1000">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-600/30 border-2 border-sky-400 flex items-center justify-center text-2xl sm:text-3xl shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              👩‍💻
            </div>
            {/* Speed motion trail */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-80">
              <span className="w-3 h-0.5 bg-white rounded-full"></span>
              <span className="w-4 h-0.5 bg-sky-300 rounded-full"></span>
              <span className="w-2 h-0.5 bg-white rounded-full"></span>
            </div>
          </div>

          {/* Main Title Text Group */}
          <div className="flex flex-col items-center">
            {/* Top Row: TRỐN SẾP in 3D icy blue pixel font */}
            <div className="relative font-pixel text-3xl sm:text-5xl md:text-6xl tracking-wider text-sky-300 drop-shadow-[0_4px_0_#1E3A8A] border-text stroke-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-sky-200 via-sky-300 to-cyan-400 drop-shadow-[0_2px_8px_rgba(56,189,248,0.8)]">
                TRỐN SẾP
              </span>
            </div>

            {/* Bottom Row: TAN CA in 3D golden yellow pixel font */}
            <div className="relative font-pixel text-3xl sm:text-5xl md:text-6xl tracking-wider text-amber-400 drop-shadow-[0_4px_0_#78350F] -mt-1 sm:-mt-2 flex items-center gap-1.5">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)]">
                TAN CA
              </span>
              <span className="text-2xl sm:text-4xl animate-spin" style={{ animationDuration: '8s' }}>
                🕒
              </span>
            </div>

            {/* Subtitle Pill Badge: Pixel Chibi Stealth */}
            <div className="mt-1.5 px-4 py-0.5 rounded-full bg-purple-900/80 border border-purple-400/60 shadow-lg text-purple-200 font-pixel text-[10px] sm:text-xs tracking-widest uppercase">
              Pixel Chibi Stealth
            </div>
          </div>

          {/* Right Angry Boss Avatar */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-900/40 border-2 border-red-500 flex items-center justify-center text-2xl sm:text-3xl shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              👔
            </div>
            {/* Red alert exclamation badge */}
            <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-red-600 border border-white text-white font-bold flex items-center justify-center text-xs animate-pulse">
              !
            </div>
          </div>
        </div>
      </div>

      {/* Main Section Grid: 2 Left Cards + Center Console Screen + 2 Right Cards (Matches Screenshot Layout 99%) */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 items-center z-20 my-auto">
        
        {/* LEFT COLUMN: 2 Feature Cards */}
        <div className="lg:col-span-3 flex flex-col gap-3 order-2 lg:order-1">
          {/* Card 1: Di chuyển & né sếp */}
          <div
            onClick={() => onStartStory(1)}
            className="group relative bg-[#131131]/90 border-2 border-indigo-500/70 hover:border-cyan-400 rounded-2xl p-2.5 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all cursor-pointer overflow-hidden flex flex-col active:scale-98"
          >
            <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden mb-2 relative">
              <MiniPreviewCanvas type="movement" />
              <div className="absolute top-2 left-2 bg-indigo-950/80 border border-indigo-400/60 px-2 py-0.5 rounded-md text-[10px] font-pixel text-sky-300">
                ẢI 1 - 2
              </div>
            </div>
            <div className="flex items-center gap-2 px-1">
              <div className="p-1 rounded-lg bg-indigo-600/30 text-sky-300">
                <LottieStickerIcon name="runner" size={24} />
              </div>
              <div>
                <h3 className="font-pixel text-xs sm:text-sm text-sky-200 group-hover:text-cyan-300 font-bold">
                  Di chuyển & né sếp
                </h3>
                <p className="text-[10px] text-slate-400 font-chibi">Rón rén vượt tầm mắt sếp</p>
              </div>
            </div>
          </div>

          {/* Card 2: Ẩn nấp đúng lúc */}
          <div
            onClick={onOpenWardrobe}
            className="group relative bg-[#131131]/90 border-2 border-indigo-500/70 hover:border-amber-400 rounded-2xl p-2.5 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer overflow-hidden flex flex-col active:scale-98"
          >
            <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden mb-2 relative">
              <MiniPreviewCanvas type="hiding" />
              <div className="absolute top-2 left-2 bg-amber-950/80 border border-amber-400/60 px-2 py-0.5 rounded-md text-[10px] font-pixel text-amber-300">
                THÙNG CARTON
              </div>
            </div>
            <div className="flex items-center gap-2 px-1">
              <div className="p-1 rounded-lg bg-amber-600/30 text-amber-300">
                <LottieStickerIcon name="hiding" size={24} />
              </div>
              <div>
                <h3 className="font-pixel text-xs sm:text-sm text-amber-200 group-hover:text-amber-300 font-bold">
                  Ẩn nấp đúng lúc
                </h3>
                <p className="text-[10px] text-slate-400 font-chibi">Nấp thùng carton & gầm bàn</p>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Tablet Console Screen Frame (Main Interactive Play Console) */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative border-4 border-[#8B5CF6] shadow-[0_0_35px_rgba(139,92,246,0.6)] rounded-[2.2rem] bg-[#110E2E] overflow-hidden p-3 sm:p-4">
            
            {/* Tablet Inner Top Bar (Matching HUD from screenshot) */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-indigo-900/60">
              {/* Top-Left Hearts */}
              <div className="flex items-center gap-1 text-red-500 text-sm sm:text-base">
                <span>❤️</span>
                <span>❤️</span>
                <span>❤️</span>
              </div>

              {/* Center Status title */}
              <div className="font-pixel text-[11px] sm:text-xs text-amber-300 flex items-center gap-1.5">
                <span className="text-sm">{isNightmareTab ? '💀' : '🏢'}</span>
                <span>{floorList[selectedFloor - 1]?.name}</span>
              </div>

              {/* Top-Right Timer & Pause */}
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 rounded bg-slate-900 border border-amber-500/50 text-amber-300 font-pixel text-[11px] flex items-center gap-1">
                  <span>🕒</span>
                  <span>02:35</span>
                </div>
                <div className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-xs">
                  ⏸️
                </div>
              </div>
            </div>

            {/* Campaign Level Selector Tabs */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-pixel text-[11px] text-indigo-300">
                {isNightmareTab ? '🔥 CHẾ ĐỘ ÁC MỘNG (3X XU)' : '🏢 CHIẾN DỊCH 8 ẢI'}
              </span>

              {/* Mode Switcher */}
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
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 mb-3">
              {floorList.map((fl) => {
                const isUnlocked = fl.id <= maxLevelUnlocked;
                const isSelected = selectedFloor === fl.id;
                return (
                  <button
                    key={fl.id}
                    onClick={() => setSelectedFloor(fl.id)}
                    className={`p-1 rounded-xl border text-center transition-all cursor-pointer active:scale-95 ${
                      isSelected
                        ? isNightmareTab
                          ? 'bg-red-600/40 border-red-400 text-red-200 ring-1 ring-red-400'
                          : 'bg-amber-500/30 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                        : isUnlocked
                        ? 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-950/50 border-slate-900 text-slate-600 opacity-60'
                    }`}
                  >
                    <div className="text-sm mb-0.5">
                      {!isUnlocked ? '🔒' : isNightmareTab ? '💀' : fl.icon}
                    </div>
                    <div className="font-pixel text-[9px]">ẢI {fl.id}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Level Description Box */}
            <div className="p-2.5 rounded-xl bg-slate-950/90 border border-indigo-900/60 mb-3 text-left">
              <div className="font-pixel text-xs text-amber-300 font-bold mb-0.5 flex items-center justify-between">
                <span>{floorList[selectedFloor - 1]?.name}</span>
                {selectedFloor > maxLevelUnlocked && (
                  <span className="text-red-400 font-pixel text-[9px]">🔒 CẦN THẮNG ẢI {selectedFloor - 1}</span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 font-chibi">
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
              className={`w-full py-3.5 font-pixel text-sm rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 transition-all ${
                selectedFloor > maxLevelUnlocked
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : isNightmareTab
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white shadow-red-600/40 active:scale-98 cursor-pointer'
                  : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/30 active:scale-98 cursor-pointer'
              }`}
            >
              {selectedFloor > maxLevelUnlocked ? (
                <span>🔒 CẦN VƯỢT ẢI {selectedFloor - 1} ĐỂ MỞ KHÓA</span>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>{isNightmareTab ? `BẮT ĐẦU ÁC MỘNG ẢI ${selectedFloor}` : `BẮT ĐẦU VƯỢT ẢI ${selectedFloor}`}</span>
                </>
              )}
            </button>

            {/* Quick Action Navigation Buttons */}
            <div className="grid grid-cols-4 gap-1.5 mt-3 pt-2 border-t border-indigo-900/60">
              <button
                onClick={onOpenShop}
                className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[10px] flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
              >
                <LottieStickerIcon name="shop" size={20} />
                <span>SHOP</span>
              </button>
              <button
                onClick={onOpenMissions}
                className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[10px] flex items-center justify-center gap-1 active:scale-95 cursor-pointer relative"
              >
                <LottieStickerIcon name="trophy" size={20} />
                <span>NHIỆM VỤ</span>
                {unclaimedMissionsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                )}
              </button>
              <button
                onClick={onOpenWardrobe}
                className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[10px] flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
              >
                <LottieStickerIcon name="wardrobe" size={20} />
                <span>TỦ ĐỒ</span>
              </button>
              <button
                onClick={onStartBossHunt}
                className="p-1.5 rounded-lg bg-gradient-to-r from-amber-600/40 to-orange-600/40 border border-amber-500/60 text-amber-300 font-pixel text-[10px] flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
              >
                <LottieStickerIcon name="crown" size={20} />
                <span>LÀM SẾP</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 2 Feature Cards */}
        <div className="lg:col-span-3 flex flex-col gap-3 order-3">
          {/* Card 3: Khám phá văn phòng */}
          <div
            onClick={onOpenShop}
            className="group relative bg-[#131131]/90 border-2 border-indigo-500/70 hover:border-sky-400 rounded-2xl p-2.5 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all cursor-pointer overflow-hidden flex flex-col active:scale-98"
          >
            <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden mb-2 relative">
              <MiniPreviewCanvas type="explore" />
              <div className="absolute top-2 left-2 bg-sky-950/80 border border-sky-400/60 px-2 py-0.5 rounded-md text-[10px] font-pixel text-sky-300">
                THIẾT BỊ IT
              </div>
            </div>
            <div className="flex items-center gap-2 px-1">
              <div className="p-1 rounded-lg bg-sky-600/30 text-sky-300">
                <LottieStickerIcon name="search" size={24} />
              </div>
              <div>
                <h3 className="font-pixel text-xs sm:text-sm text-sky-200 group-hover:text-cyan-300 font-bold">
                  Khám phá văn phòng
                </h3>
                <p className="text-[10px] text-slate-400 font-chibi">Tìm chìa khóa & thẻ chấm công</p>
              </div>
            </div>
          </div>

          {/* Card 4: Tìm đường tan ca */}
          <div
            onClick={() => onStartStory(selectedFloor)}
            className="group relative bg-[#131131]/90 border-2 border-indigo-500/70 hover:border-emerald-400 rounded-2xl p-2.5 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all cursor-pointer overflow-hidden flex flex-col active:scale-98"
          >
            <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden mb-2 relative">
              <MiniPreviewCanvas type="exit" />
              <div className="absolute top-2 left-2 bg-emerald-950/80 border border-emerald-400/60 px-2 py-0.5 rounded-md text-[10px] font-pixel text-emerald-300">
                THOÁT HIỂM
              </div>
            </div>
            <div className="flex items-center gap-2 px-1">
              <div className="p-1 rounded-lg bg-emerald-600/30 text-emerald-300">
                <LottieStickerIcon name="exit" size={24} />
              </div>
              <div>
                <h3 className="font-pixel text-xs sm:text-sm text-emerald-200 group-hover:text-emerald-300 font-bold">
                  Tìm đường tan ca
                </h3>
                <p className="text-[10px] text-slate-400 font-chibi">Cửa EXIT dẫn ra tự do</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Scene (Matching Bottom Details from Screenshot) */}
      <div className="w-full max-w-7xl mx-auto flex items-end justify-between z-10 pt-2 pointer-events-none">
        {/* Bottom Left: Cute Anime Chibi Peeking Girl */}
        <div className="flex items-end gap-2 relative">
          <div className="relative z-10">
            {/* Peeking Chibi Girl illustration */}
            <div className="w-20 sm:w-28 h-16 sm:h-20 bg-[#1E1B4B] border-t-2 border-x-2 border-indigo-400/80 rounded-t-full flex flex-col items-center justify-end pb-1 shadow-2xl relative overflow-hidden">
              {/* Hair clip & eyes */}
              <div className="absolute top-2 left-3 text-pink-400 text-xs animate-pulse">✨</div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-3 h-3.5 bg-slate-900 rounded-full border border-sky-400 flex items-center justify-center">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                </div>
                <div className="w-3 h-3.5 bg-slate-900 rounded-full border border-sky-400 flex items-center justify-center">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                </div>
              </div>
              {/* Blush cheeks */}
              <div className="flex items-center gap-6 mb-1">
                <span className="w-2 h-1 bg-pink-400/80 rounded-full"></span>
                <span className="w-2 h-1 bg-pink-400/80 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right: Documents, Laptop & Sticky Note "Tan ca thôi! 🙂" */}
        <div className="flex items-end gap-3 relative pointer-events-auto">
          {/* Laptop & Documents stack */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="w-24 h-2 bg-slate-800 rounded border border-slate-700"></div>
            <div className="w-20 h-2 bg-slate-800 rounded border border-slate-700"></div>
          </div>

          {/* Yellow Sticky Note (Matching Screenshot Note) */}
          <div className="p-2.5 bg-[#FDE047] text-slate-900 font-hand text-base sm:text-lg font-bold rounded-lg shadow-xl rotate-6 border border-amber-300 leading-tight">
            <span>Tan ca<br />thôi! 🙂</span>
          </div>
        </div>
      </div>
    </div>
  );
};
