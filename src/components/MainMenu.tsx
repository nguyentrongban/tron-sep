import React, { useState } from 'react';
import {
  Play,
  Flame,
  Volume2,
  VolumeX,
  HelpCircle,
  Maximize2
} from 'lucide-react';
import { CharacterSkin, Accessory } from '../types/game';
import { LottieStickerIcon } from './LottieStickerIcon';
import { toggleFullscreen } from '../utils/fullscreen';

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
  monthlySalaryVND: number;
  cumulativeSalaryEarned: number;
  totalCaughtTimes: number;
  totalEscapes: number;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartStory,
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
  coins,
  unclaimedMissionsCount = 0,
  maxLevelUnlocked = 1,
  monthlySalaryVND,
  cumulativeSalaryEarned,
  totalCaughtTimes,
  totalEscapes
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
    <div className="relative h-[100dvh] w-full bg-[#0B091A] text-slate-100 flex flex-col justify-between p-1 sm:p-2 overflow-hidden font-chibi select-none">
      {/* Ambient background office glow & scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-[#05040F] pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-20" />

      {/* ULTRA-COMPACT TOP HEADER ROW */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-20 gap-1.5 shrink-0 py-0.5">
        {/* Left Utilities */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={onOpenShop}
            className="px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/60 hover:border-amber-300 text-amber-300 font-pixel text-[9px] sm:text-xs flex items-center gap-1 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <LottieStickerIcon name="coin" size={14} />
            <span className="font-bold">{coins} Xu</span>
          </button>

          <button
            onClick={onOpenLuckyWheel}
            className="px-1.5 sm:px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-900/80 to-pink-900/80 border border-pink-400/60 hover:border-pink-300 text-pink-200 font-pixel text-[9px] sm:text-xs flex items-center gap-1 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <LottieStickerIcon name="wheel" size={14} />
            <span className="hidden xs:inline">VÒNG QUAY</span>
          </button>

          <button
            onClick={onStartTutorial}
            className="hidden md:flex px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-400/50 text-sky-300 font-pixel text-[9px] items-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <LottieStickerIcon name="help" size={12} />
            <span>HƯỚNG DẪN</span>
          </button>
        </div>

        {/* Center Compact Title Logo */}
        <div className="flex items-center gap-1">
          <div className="font-pixel text-base sm:text-2xl md:text-3xl tracking-wider text-sky-300 drop-shadow-[0_2px_0_#1E3A8A]">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-sky-200 via-sky-300 to-cyan-400">
              TRỐN SẾP
            </span>
          </div>
          <div className="font-pixel text-base sm:text-2xl md:text-3xl tracking-wider text-amber-400 drop-shadow-[0_2px_0_#78350F] flex items-center gap-0.5">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-500">
              TAN CA
            </span>
            <span className="text-xs sm:text-base animate-spin" style={{ animationDuration: '8s' }}>
              🕒
            </span>
          </div>
        </div>

        {/* Right Utilities */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={toggleFullscreen}
            className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-400/60 text-emerald-300 font-pixel text-[9px] sm:text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer shadow-md"
            title="Bật/Tắt Toàn Màn Hình"
          >
            <Maximize2 className="w-3 h-3 text-emerald-400" />
            <span className="hidden xs:inline">FULL MÀN HÌNH</span>
          </button>

          <button
            onClick={onOpenHallOfFame}
            className="px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-900/90 border border-amber-500/60 text-amber-300 font-pixel text-[9px] sm:text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <LottieStickerIcon name="trophy" size={14} />
            <span className="hidden sm:inline">VINH DANH</span>
          </button>

          <button
            onClick={onOpenWardrobe}
            className="px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-400/60 text-indigo-300 font-pixel text-[9px] sm:text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <LottieStickerIcon name="wardrobe" size={14} />
            <span className="hidden sm:inline">TỦ ĐỒ</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
          </button>

          <button
            onClick={onOpenHelp}
            className="p-1 rounded-full bg-slate-900/90 border border-slate-700 text-sky-400 cursor-pointer"
          >
            <HelpCircle className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* MAIN CONSOLE FRAME: FLEX FIT NO CUTOFF */}
      <div className="w-full max-w-5xl mx-auto z-20 my-auto flex-1 min-h-0 flex flex-col justify-center overflow-hidden py-1">
        <div className="relative border-2 border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.4)] rounded-2xl bg-[#110E2E]/95 overflow-hidden p-1.5 sm:p-2.5 flex flex-row gap-2 sm:gap-3 items-stretch justify-between h-full min-h-0 max-h-full">
          
          {/* LEFT PANEL: MODE SWITCHER + LEVEL INFO + BIG PLAY BUTTON */}
          <div className="flex-1 min-h-0 flex flex-col justify-between gap-1 p-1 sm:p-1.5 bg-slate-950/60 rounded-xl border border-indigo-900/50 overflow-hidden">
            {/* Top Status & Mode Bar */}
            <div className="flex items-center justify-between gap-1 border-b border-indigo-900/60 pb-1 shrink-0">
              <div className="font-pixel text-[9px] sm:text-xs text-amber-300 flex items-center gap-1 truncate">
                <span>❤️3</span>
                <span className="truncate">| {floorList[selectedFloor - 1]?.name}</span>
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 shrink-0">
                <button
                  onClick={() => setIsNightmareTab(false)}
                  className={`px-1.5 py-0.5 rounded font-pixel text-[8px] sm:text-[9px] cursor-pointer ${
                    !isNightmareTab ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  Thường
                </button>
                <button
                  onClick={() => setIsNightmareTab(true)}
                  className={`px-1.5 py-0.5 rounded font-pixel text-[8px] sm:text-[9px] cursor-pointer flex items-center gap-0.5 ${
                    isNightmareTab ? 'bg-red-600 text-white font-bold' : 'text-red-400'
                  }`}
                >
                  <Flame className="w-2.5 h-2.5 fill-red-400" />
                  <span>Ác Mộng</span>
                </button>
              </div>
            </div>

            {/* Selected Level Description Box */}
            <div className="p-1.5 sm:p-2 rounded-lg bg-slate-900/90 border border-indigo-900/80 text-left flex-1 min-h-0 flex flex-col justify-center overflow-y-auto">
              <div className="font-pixel text-[10px] sm:text-xs text-amber-300 font-bold mb-0.5 flex items-center justify-between">
                <span>{floorList[selectedFloor - 1]?.name}</span>
                {selectedFloor > maxLevelUnlocked && (
                  <span className="text-red-400 font-pixel text-[8px]">🔒 CẦN VƯỢT ẢI {selectedFloor - 1}</span>
                )}
              </div>
              <p className="text-[9px] sm:text-[11px] text-slate-300 font-chibi leading-tight">
                {selectedFloor > maxLevelUnlocked
                  ? `Hãy hoàn thành Ải ${selectedFloor - 1} để mở khóa màn chơi này!`
                  : isNightmareTab
                  ? '🌙 Văn phòng tắt đèn tối đen! Bạn có đèn pin, Sếp chạy nhanh 1.3x và kỹ năng Quét Radar kích hoạt liên tục!'
                  : floorList[selectedFloor - 1]?.desc}
              </p>
            </div>

            {/* GORGEOUS PERSONAL SALARY & OT PENALTY DASHBOARD */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-left shrink-0 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-emerald-500/15 pb-1 mb-1.5 shrink-0">
                <span className="font-pixel text-[9px] sm:text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  📊 THÀNH TÍCH & BẢNG LƯƠNG THÁNG NÀY
                </span>
                <span className="text-[8px] bg-red-500/20 text-red-400 border border-red-500/30 px-1 py-0.5 rounded font-pixel">
                  PHẠT BỊ BẮT: -1.000.000đ
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-300 text-[10px] sm:text-xs">
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-pixel uppercase">Thực lĩnh tháng này:</span>
                  <span className={`font-pixel font-bold text-[11px] sm:text-xs ${monthlySalaryVND >= 10000000 ? 'text-emerald-400 animate-pulse' : 'text-red-400'}`}>
                    {monthlySalaryVND.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-pixel uppercase">Tổng thu sự nghiệp:</span>
                  <span className="font-pixel font-bold text-[11px] sm:text-xs text-amber-300">
                    {cumulativeSalaryEarned.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-pixel uppercase">Trốn thoát thành công:</span>
                  <span className="font-pixel font-bold text-[10px] text-emerald-300">
                    {totalEscapes} lần (+1.5Mđ / lần)
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-pixel uppercase">Số lần bị sếp tóm:</span>
                  <span className="font-pixel font-bold text-[10px] text-red-400">
                    {totalCaughtTimes} lần (Phạt trừ lương)
                  </span>
                </div>
              </div>
            </div>

            {/* BIG PLAY BUTTON */}
            <button
              onClick={() => {
                if (selectedFloor <= maxLevelUnlocked) {
                  isNightmareTab ? onStartNightmare(selectedFloor) : onStartStory(selectedFloor);
                }
              }}
              disabled={selectedFloor > maxLevelUnlocked}
              className={`w-full py-2 sm:py-2.5 font-pixel text-xs sm:text-sm rounded-xl font-bold shadow-lg flex items-center justify-center gap-1.5 transition-all shrink-0 ${
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
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="truncate">{isNightmareTab ? `BẮT ĐẦU ÁC MỘNG ẢI ${selectedFloor}` : `BẮT ĐẦU VƯỢT ẢI ${selectedFloor}`}</span>
                </>
              )}
            </button>
          </div>

          {/* RIGHT PANEL: LEVEL PILLS GRID 1-8 + QUICK ACTIONS */}
          <div className="flex-1 min-h-0 flex flex-col justify-between gap-1 p-1 sm:p-1.5 bg-slate-950/60 rounded-xl border border-indigo-900/50 overflow-hidden">
            {/* Floor Grid 1 - 8 (2 Rows of 4 Buttons) */}
            <div className="flex-1 min-h-0 flex flex-col justify-center">
              <div className="font-pixel text-[9px] sm:text-[10px] text-indigo-300 mb-1 text-left shrink-0">CHỌN ẢI (1 - 8):</div>
              <div className="grid grid-cols-4 gap-1">
                {floorList.map((fl) => {
                  const isUnlocked = fl.id <= maxLevelUnlocked;
                  const isSelected = selectedFloor === fl.id;
                  return (
                    <button
                      key={fl.id}
                      onClick={() => setSelectedFloor(fl.id)}
                      className={`p-1 sm:p-1.5 rounded-lg border text-center transition-all cursor-pointer active:scale-95 ${
                        isSelected
                          ? isNightmareTab
                            ? 'bg-red-600/40 border-red-400 text-red-200 ring-1 ring-red-400 font-bold'
                            : 'bg-amber-500/30 border-amber-400 text-amber-300 ring-1 ring-amber-400 font-bold'
                          : isUnlocked
                          ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-900/40 border-slate-900 text-slate-600 opacity-60'
                      }`}
                    >
                      <div className="text-[11px] sm:text-xs mb-0.5">
                        {!isUnlocked ? '🔒' : isNightmareTab ? '💀' : fl.icon}
                      </div>
                      <div className="font-pixel text-[8px] sm:text-[9px]">ẢI {fl.id}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="grid grid-cols-4 gap-1 pt-1 border-t border-indigo-900/60 shrink-0">
              <button
                onClick={onOpenShop}
                className="p-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[8px] sm:text-[9px] flex items-center justify-center gap-0.5 active:scale-95 cursor-pointer truncate"
              >
                <LottieStickerIcon name="shop" size={12} />
                <span>SHOP</span>
              </button>
              <button
                onClick={onOpenMissions}
                className="p-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[8px] sm:text-[9px] flex items-center justify-center gap-0.5 active:scale-95 cursor-pointer relative truncate"
              >
                <LottieStickerIcon name="trophy" size={12} />
                <span>N.VỤ</span>
                {unclaimedMissionsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                )}
              </button>
              <button
                onClick={onOpenWardrobe}
                className="p-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[8px] sm:text-[9px] flex items-center justify-center gap-0.5 active:scale-95 cursor-pointer truncate"
              >
                <LottieStickerIcon name="wardrobe" size={12} />
                <span>TỦ ĐỒ</span>
              </button>
              <button
                onClick={onStartBossHunt}
                className="p-1 rounded-lg bg-gradient-to-r from-amber-600/40 to-orange-600/40 border border-amber-500/60 text-amber-300 font-pixel text-[8px] sm:text-[9px] flex items-center justify-center gap-0.5 active:scale-95 cursor-pointer truncate"
              >
                <LottieStickerIcon name="crown" size={12} />
                <span>LÀM SẾP</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Note Annotation */}
      <div className="w-full max-w-5xl mx-auto flex items-end justify-between z-10 shrink-0 pointer-events-none py-0.5">
        <div className="text-[9px] sm:text-[10px] text-slate-400 font-pixel">
          © Trốn Sếp Tan Ca - 2D Pixel Chibi Stealth
        </div>
        <div className="px-1.5 py-0.5 bg-[#FDE047] text-slate-900 font-hand text-[10px] sm:text-xs font-bold rounded shadow rotate-2 border border-amber-300 pointer-events-auto">
          <span>Tan ca thôi! 🙂</span>
        </div>
      </div>
    </div>
  );
};
