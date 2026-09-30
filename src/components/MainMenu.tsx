import React, { useState } from 'react';
import {
  Play,
  Flame,
  Volume2,
  VolumeX,
  Maximize2,
  HelpCircle,
  Coins,
  Sparkles,
  Trophy,
  Briefcase,
  User,
  Crown
} from 'lucide-react';
import { CharacterSkin, Accessory } from '../types/game';
import { LottieStickerIcon } from './LottieStickerIcon';
import { toggleFullscreen } from '../utils/fullscreen';
import { soundManager } from '../utils/audio';

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
  saveData: any;
  updateSaveData: (updater: (prev: any) => any) => void;
}

const CAT_DATABASE = [
  {
    id: 'boba',
    name: 'Trà Sữa 🧋',
    emoji: '🐱🧋',
    cost: 80,
    buff: '+15% Tốc Độ',
    description: 'Mèo mập ú. Tăng cho sen +15% tốc chạy rón rén né sếp!'
  },
  {
    id: 'emperor',
    name: 'Hoàng Thượng 👑',
    emoji: '🐱👑',
    cost: 150,
    buff: '-50% Tiếng Chạy',
    description: 'Rón rén quý tộc. Giảm 50% tiếng phát ra khi sếp đi tuần!'
  },
  {
    id: 'tuxedo',
    name: 'Tuxedo 🤵',
    emoji: '🐱🤵',
    cost: 220,
    buff: 'Nhân Đôi x2 Xu',
    description: 'Mèo mặc vest tuxedo. Nhân đôi toàn bộ số tiền vàng nhặt được!'
  }
];

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
  totalEscapes,
  saveData,
  updateSaveData
}) => {
  const [selectedFloor, setSelectedFloor] = useState<number>(Math.min(maxLevelUnlocked, 8));
  const [isNightmareTab, setIsNightmareTab] = useState<boolean>(false);
  const [rightPanelTab, setRightPanelTab] = useState<'stages' | 'cats'>('stages');
  
  const [catSpeech, setCatSpeech] = useState<string>('Meow! Cứu em, em đói quá sen ơi... 🐾');
  const [petHearts, setPetHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const floorList = [
    { id: 1, name: 'Ải 1: QA & Thực Tập', icon: '🐛' },
    { id: 2, name: 'Ải 2: Dev & IT', icon: '💻' },
    { id: 3, name: 'Ải 3: Marketing & HR', icon: '📢' },
    { id: 4, name: 'Ải 4: Kế Toán & Laser', icon: '📊' },
    { id: 5, name: 'Ải 5: Ban Giám Đốc', icon: '👔' },
    { id: 6, name: 'Ải 6: Lễ Tân Sảnh', icon: '🏢' },
    { id: 7, name: 'Ải 7: Hầm Xe B1', icon: '🛵' },
    { id: 8, name: 'Ải 8: Thoát Cổng Exit', icon: '🏆' }
  ];

  const handleAdoptCat = (catId: string, cost: number) => {
    if (coins < cost) {
      setCatSpeech('Meow! Sen không đủ xu, chạy kiếm thêm xu đi! 😿');
      soundManager.playCaught();
      return;
    }
    updateSaveData((prev) => {
      const alreadyAdopted = prev.adoptedCats || [];
      if (alreadyAdopted.includes(catId)) return prev;
      return {
        ...prev,
        coins: Math.max(0, prev.coins - cost),
        adoptedCats: [...alreadyAdopted, catId],
        activeCat: catId
      };
    });
    setCatSpeech('Cảm ơn sen nhiều nha! Em đi theo hộ mệnh sen đây! 🥰🐾');
    soundManager.playCoffeeBoost();
  };

  const handleEquipCat = (catId: string) => {
    updateSaveData((prev) => ({
      ...prev,
      activeCat: prev.activeCat === catId ? 'none' : catId
    }));
    soundManager.playPickup();
    setCatSpeech('Em đã sẵn sàng bám sát sen, chạy thôi! 🐾🏃');
  };

  const handlePetCat = (e: React.MouseEvent) => {
    soundManager.playCoffeeBoost();
    const meowQuotes = [
      'Meow! Lông mượt ghê, gãi tai em đi sen! 🥰',
      'Purrr... Chúc sen trốn sếp hốt ngay 1.5Mđ! ❤️',
      'Có em theo, sếp rượt cỡ nào sen cũng né lẹ! ⚡',
      'Tan ca nhớ mua boba trà sữa cho em nha! 🧋',
      'Sếp Tuấn đang đi tuần sảnh đó, né kỹ sen nhé! 🙀',
      'Em thương sen nhất quả đất meow meow! 🐾'
    ];
    setCatSpeech(meowQuotes[Math.floor(Math.random() * meowQuotes.length)]);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newHeart = { id: Date.now(), x, y };
    setPetHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setPetHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  const currentActiveCatId = saveData?.activeCat || 'none';
  const adoptedCatIds = saveData?.adoptedCats || [];

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0A0817] text-slate-100 flex flex-col justify-between p-2 sm:p-3 overflow-hidden font-chibi select-none">
      {/* Background glow and scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1E1B4B]/15 via-[#0A071B] to-[#03020A] pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-10" />

      {/* COMPACT HEADER: Merge all action buttons into a single line */}
      <div className="w-full flex items-center justify-between z-20 gap-2 shrink-0 border-b border-indigo-950/40 pb-1.5">
        {/* Left Side: Coins & Lucky Wheel */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenShop}
            className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 font-pixel text-[10px] flex items-center gap-1 cursor-pointer active:scale-95"
          >
            <LottieStickerIcon name="coin" size={12} />
            <span className="font-bold">{coins} Xu</span>
          </button>

          <button
            onClick={onOpenLuckyWheel}
            className="px-2 py-1 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 border border-pink-400/40 text-pink-300 font-pixel text-[10px] flex items-center gap-1 cursor-pointer active:scale-95"
          >
            <LottieStickerIcon name="wheel" size={12} />
            <span>VÒNG QUAY</span>
          </button>
        </div>

        {/* Center: Simplified Clean Title */}
        <div className="flex items-center gap-1 text-xs sm:text-base font-pixel font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-400">TRỐN SẾP</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">TAN CA</span>
          <span className="text-[10px] text-pink-400">🐾</span>
        </div>

        {/* Right Side: Quick navigation merged icons */}
        <div className="flex items-center gap-1.5">
          {/* Shop */}
          <button onClick={onOpenShop} className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-400 text-indigo-300 cursor-pointer" title="Cửa hàng">
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          
          {/* Missions */}
          <button onClick={onOpenMissions} className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400 text-amber-300 cursor-pointer relative" title="Nhiệm vụ">
            <Trophy className="w-3.5 h-3.5" />
            {unclaimedMissionsCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
          </button>

          {/* Wardrobe */}
          <button onClick={onOpenWardrobe} className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-400 text-emerald-300 cursor-pointer" title="Tủ đồ skin">
            <User className="w-3.5 h-3.5" />
          </button>

          {/* Play as Boss Hunt */}
          <button onClick={onStartBossHunt} className="p-1 rounded-lg bg-gradient-to-tr from-amber-600/30 to-orange-600/30 border border-amber-500/40 hover:border-amber-500 text-amber-300 cursor-pointer" title="Làm sếp bắt nhân viên">
            <Crown className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen, Mute */}
          <div className="w-[1px] h-4 bg-slate-800 mx-0.5" />

          <button onClick={toggleFullscreen} className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 cursor-pointer">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button onClick={onToggleMute} className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 cursor-pointer">
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* SINGLE SCREEN GRID: Ultra space-saving, fits exactly 100% viewport */}
      <div className="w-full flex-1 min-h-0 grid grid-cols-12 gap-3 py-2 items-stretch">
        
        {/* LEFT COLUMN: Simplified Play Panel & Paycheck (Consolidated to use minimum height) */}
        <div className="col-span-5 flex flex-col justify-between gap-2.5">
          
          {/* Main Action Hub: Merge selected stage + Mode switcher + Play button */}
          <div className="flex-1 bg-[#110E2E]/90 border border-indigo-500/30 rounded-xl p-2.5 flex flex-col justify-between text-left gap-2">
            
            {/* Mode & Stage name */}
            <div className="flex flex-col gap-1 shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[9px] text-amber-300 font-bold flex items-center gap-1">
                  🎯 {isNightmareTab ? 'ÁC MỘNG 💀' : 'CHẾ ĐỘ THƯỜNG'}
                </span>
                <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setIsNightmareTab(false)}
                    className={`px-1.5 py-0.5 rounded font-pixel text-[8px] cursor-pointer ${!isNightmareTab ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Thường
                  </button>
                  <button
                    onClick={() => setIsNightmareTab(true)}
                    className={`px-1.5 py-0.5 rounded font-pixel text-[8px] cursor-pointer flex items-center gap-0.5 ${isNightmareTab ? 'bg-red-600 text-white font-bold' : 'text-red-400'}`}
                  >
                    <Flame className="w-2 h-2 fill-current" />
                    <span>Ác Mộng</span>
                  </button>
                </div>
              </div>
              
              <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mt-0.5 font-pixel border-t border-indigo-950/60 pt-1">
                <span>{floorList[selectedFloor - 1]?.icon}</span>
                <span>{floorList[selectedFloor - 1]?.name}</span>
              </div>
            </div>

            {/* Active cat power indication */}
            {currentActiveCatId !== 'none' && (
              <div className="bg-pink-500/10 border border-pink-500/20 text-[9px] text-pink-300 rounded px-1.5 py-0.5 flex items-center gap-1 font-semibold">
                <span>🐈</span> Buff: {CAT_DATABASE.find((c) => c.id === currentActiveCatId)?.buff}
              </div>
            )}

            {/* BIG PLAY ACTION BUTTON */}
            <button
              onClick={() => {
                if (selectedFloor <= maxLevelUnlocked) {
                  isNightmareTab ? onStartNightmare(selectedFloor) : onStartStory(selectedFloor);
                }
              }}
              disabled={selectedFloor > maxLevelUnlocked}
              className={`w-full py-2.5 font-pixel text-xs rounded-xl font-bold shadow flex items-center justify-center gap-1.5 transition-all active:scale-97 cursor-pointer shrink-0 ${
                selectedFloor > maxLevelUnlocked
                  ? 'bg-slate-850 text-slate-500 border border-slate-800 cursor-not-allowed shadow-none'
                  : isNightmareTab
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-red-950/20'
                  : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 shadow-amber-500/10'
              }`}
            >
              {selectedFloor > maxLevelUnlocked ? (
                <span>🔒 CẦN VƯỢT ẢI {selectedFloor - 1}</span>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span className="truncate tracking-wider">
                    {isNightmareTab ? `ÁC MỘNG ẢI ${selectedFloor}` : `CHƠI ẢI ${selectedFloor}`}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Consolidated Mini Paycheck Board (Extremely thin & space saving) */}
          <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-2 text-left relative overflow-hidden shrink-0">
            <div className="flex items-center justify-between border-b border-emerald-500/10 pb-1 mb-1 shrink-0">
              <span className="font-pixel text-[8px] sm:text-[9px] text-emerald-400 font-bold">
                📊 THÀNH TÍCH & LƯƠNG THỰC LĨNH
              </span>
              <span className="text-[7px] text-emerald-300 font-mono font-bold">
                +1.5Mđ/Thắng
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-300 text-[9px] sm:text-xs">
              <div className="flex flex-col">
                <span className="text-[7px] text-slate-500 font-pixel uppercase">Lương thực lĩnh:</span>
                <span className="font-pixel font-bold text-emerald-400">
                  {monthlySalaryVND.toLocaleString('vi-VN')}đ
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[7px] text-slate-500 font-pixel uppercase">Thu nhập sự nghiệp:</span>
                <span className="font-pixel font-bold text-amber-300">
                  {cumulativeSalaryEarned.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[7px] text-slate-500 font-pixel uppercase">Vượt ải thành công:</span>
                <span className="font-sans font-bold text-emerald-300 text-[10px]">
                  🏆 {totalEscapes} lần
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[7px] text-slate-500 font-pixel uppercase">Số lần bị phạt tóm:</span>
                <span className="font-sans font-bold text-red-400 text-[10px]">
                  🚨 {totalCaughtTimes} lần
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Tab Switcher (Stage Grid vs Cat Adoption) */}
        <div className="col-span-7 flex flex-col justify-between bg-slate-900/80 border border-indigo-500/20 rounded-xl p-2.5 overflow-hidden">
          
          {/* Micro Tab selector */}
          <div className="flex border-b border-indigo-950/50 pb-1.5 shrink-0 mb-1.5">
            <button
              onClick={() => setRightPanelTab('stages')}
              className={`flex-1 py-0.5 font-pixel text-[10px] sm:text-xs cursor-pointer text-center border-b-2 transition-all ${
                rightPanelTab === 'stages'
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              🎮 CHỌN ẢI (1-8)
            </button>
            <button
              onClick={() => setRightPanelTab('cats')}
              className={`flex-1 py-0.5 font-pixel text-[10px] sm:text-xs cursor-pointer text-center border-b-2 transition-all flex items-center justify-center gap-1 ${
                rightPanelTab === 'cats'
                  ? 'border-pink-500 text-pink-300 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              🐈 NUÔI MÈO 🐾
            </button>
          </div>

          {/* TAB CONTENT: Fits exactly within remaining flex layout */}
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            {rightPanelTab === 'stages' ? (
              /* Ultra-compact stage select grid (4x2 small buttons, no scrolling!) */
              <div className="grid grid-cols-4 gap-1.5 my-auto">
                {floorList.map((fl) => {
                  const isUnlocked = fl.id <= maxLevelUnlocked;
                  const isSelected = selectedFloor === fl.id;
                  return (
                    <button
                      key={fl.id}
                      onClick={() => setSelectedFloor(fl.id)}
                      className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
                        isSelected
                          ? isNightmareTab
                            ? 'bg-red-950/50 border-red-500 text-red-200'
                            : 'bg-amber-950/50 border-amber-400 text-amber-300'
                          : isUnlocked
                          ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-950/30 border-slate-950 text-slate-600 opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-base">
                        {!isUnlocked ? '🔒' : isNightmareTab ? '💀' : fl.icon}
                      </div>
                      <div className="font-pixel text-[8px] font-bold">ẢI {fl.id}</div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Ultra-compact Cat Adoption Room */
              <div className="flex flex-col gap-2 flex-1 min-h-0 justify-center">
                {/* Selection row */}
                <div className="grid grid-cols-3 gap-1.5 shrink-0">
                  {CAT_DATABASE.map((cat) => {
                    const isAdopted = adoptedCatIds.includes(cat.id);
                    const isActive = currentActiveCatId === cat.id;
                    
                    return (
                      <div
                        key={cat.id}
                        className={`p-1 rounded-lg border text-center transition-all flex flex-col justify-between items-center relative ${
                          isActive
                            ? 'bg-pink-950/30 border-pink-400 text-pink-100'
                            : isAdopted
                            ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                            : 'bg-slate-950/60 border-slate-950 text-slate-500 opacity-90'
                        }`}
                      >
                        <span className="text-xl filter drop-shadow">{cat.emoji}</span>
                        <div className="font-pixel text-[7px] font-bold text-slate-200 truncate w-full mt-0.5">
                          {cat.name.split(' ')[0]}
                        </div>
                        
                        <div className="w-full pt-1 mt-1 border-t border-slate-850 shrink-0">
                          {!isAdopted ? (
                            <button
                              onClick={() => handleAdoptCat(cat.id, cat.cost)}
                              className="w-full py-0.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-pixel text-[7px] rounded cursor-pointer"
                            >
                              {cat.cost} Xu
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEquipCat(cat.id)}
                              className={`w-full py-0.5 font-pixel text-[7px] rounded cursor-pointer ${
                                isActive ? 'bg-pink-500 text-white font-bold' : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {isActive ? 'Companion' : 'Theo sau'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Micro Petting Console */}
                <div className="bg-slate-950/70 border border-indigo-950/60 rounded-xl p-2 flex flex-row gap-2.5 items-center justify-between relative overflow-hidden flex-1 min-h-0">
                  <div className="absolute inset-0 pointer-events-none z-10">
                    {petHearts.map((h) => (
                      <span key={h.id} style={{ left: h.x - 6, top: h.y - 6 }} className="absolute text-sm animate-ping text-pink-500">
                        ❤️
                      </span>
                    ))}
                  </div>

                  {/* Cat representation */}
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <div
                      onClick={handlePetCat}
                      className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 border border-pink-400/40 flex items-center justify-center text-xl cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-inner relative group"
                    >
                      <span className="animate-bounce" style={{ animationDuration: '3s' }}>
                        {currentActiveCatId !== 'none'
                          ? CAT_DATABASE.find((c) => c.id === currentActiveCatId)?.emoji
                          : '🐱'}
                      </span>
                    </div>
                  </div>

                  {/* Dialogue bubble */}
                  <div className="flex-1 flex flex-col justify-center text-left bg-indigo-950/10 border border-indigo-950/30 rounded-lg p-1.5 h-full relative min-h-[44px]">
                    <div className="absolute left-[-4px] top-[50%] translate-y-[-50%] border-t-[4px] border-t-transparent border-r-[4px] border-r-indigo-950/30 border-b-[4px] border-b-transparent" />
                    <p className="text-[9px] sm:text-[10px] text-slate-200 leading-tight italic font-medium">
                      "{catSpeech}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* COMPACT STICKY BOTTOM ROW */}
      <div className="w-full flex items-center justify-between z-10 shrink-0 pointer-events-none border-t border-indigo-950/30 pt-1">
        <span className="text-[8px] text-slate-600 font-mono">
          Trốn Sếp Tan Ca v2.8.0 🕒
        </span>
        <div className="px-2 py-0.5 bg-[#FDE047] text-slate-900 font-hand text-[9px] font-bold rounded-lg shadow rotate-1 border border-amber-300 pointer-events-auto active:scale-95 transition-all">
          <span>Dắt mèo về thôii! 🐈💨</span>
        </div>
      </div>
    </div>
  );
};
