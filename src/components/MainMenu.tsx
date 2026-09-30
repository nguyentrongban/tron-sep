import React, { useState } from 'react';
import {
  Play,
  Flame,
  Volume2,
  VolumeX,
  Maximize2,
  HelpCircle
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

// GORGEOUS COMPANION CATS FOR FEMALE PLAYERS & PET LOVERS
const CAT_DATABASE = [
  {
    id: 'boba',
    name: 'Mèo Trà Sữa 🧋',
    emoji: '🐱🧋',
    cost: 80,
    buff: 'Tăng +15% Tốc Độ',
    description: 'Bé mèo mập thích bú trà sữa boba béo ngậy. Tiếp thêm +15% tốc độ đi bộ để sen né sếp siêu tốc!'
  },
  {
    id: 'emperor',
    name: 'Mèo Hoàng Thượng 👑',
    emoji: '🐱👑',
    cost: 150,
    buff: 'Giảm -50% Tiếng Chạy',
    description: 'Hoàng thượng bước đi rón rén quý tộc. Giúp sen giảm bớt 50% bán kính tiếng động khi chạy nhanh!'
  },
  {
    id: 'tuxedo',
    name: 'Mèo Tuxedo 🤵',
    emoji: '🐱🤵',
    cost: 220,
    buff: 'Nhân Đôi (x2) Tiền Xu',
    description: 'Bé mèo mặc vest tuxedo quý phái. Giúp nhân đôi toàn bộ giá trị vàng nhặt được trong màn chơi!'
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
  
  // Interactive Speeches for Petting
  const [catSpeech, setCatSpeech] = useState<string>('Meow! Sen ơi cứu em với, em đói meow meow... Cho em ít boba nhé! 🐾');
  const [petHearts, setPetHearts] = useState<{ id: number; x: number; y: number }[]>([]);

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

  // Adopting a Companion Cat
  const handleAdoptCat = (catId: string, cost: number) => {
    if (coins < cost) {
      setCatSpeech('Meow! Sen không đủ xu rồi, chạy kiếm thêm xu đi meow! 😿');
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

    setCatSpeech('Aaaaa! Cảm ơn sen nhiều nha meow! Em sẽ đi theo bảo vệ sen! 🥰🐾');
    soundManager.playCoffeeBoost();
  };

  // Equipping a Cat
  const handleEquipCat = (catId: string) => {
    updateSaveData((prev) => ({
      ...prev,
      activeCat: prev.activeCat === catId ? 'none' : catId
    }));
    soundManager.playPickup();
    setCatSpeech('Meow! Em đã sẵn sàng bám sát chân sen, chạy trốn sếp thôi! 🐾🏃');
  };

  // Petting a Cat
  const handlePetCat = (e: React.MouseEvent) => {
    soundManager.playCoffeeBoost();
    const meowQuotes = [
      'Meow! Lông mượt quá, sen gãi tai cho em nữa đi! 🥰',
      'Purrr... Chúc sen trốn sếp thành công hốt 1.5Mđ nhé! ❤️',
      'Có em theo sau, sếp rượt cỡ nào sen cũng né lẹ nha! ⚡',
      'Ngoan ngoan, tan ca mua cho em thêm ly trà sữa boba nha sen! 🧋',
      'Cảnh báo: Sếp Tuấn đang đi tuần ở hành lang đó, núp kĩ nha sen! 🙀',
      'Em yêu sen nhất hệ mặt trời meow meow! ✨🐾'
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
    <div className="relative min-h-screen w-full bg-[#0A0817] text-slate-100 flex flex-col justify-between p-3 sm:p-5 overflow-y-auto font-chibi select-none pb-8">
      {/* Ambient background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1E1B4B]/20 via-[#0A071B] to-[#03020A] pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-15" />

      {/* HEADER SECTION: Clean and Spacious */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-20 gap-3 shrink-0 py-2 border-b border-indigo-950/40 mb-4">
        {/* Left Stats Indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenShop}
            className="px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 hover:border-amber-400 text-amber-300 font-pixel text-[11px] sm:text-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <LottieStickerIcon name="coin" size={14} />
            <span className="font-bold">{coins} Xu</span>
          </button>

          <button
            onClick={onOpenLuckyWheel}
            className="px-2.5 py-1 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-400/40 hover:border-pink-400 text-pink-300 font-pixel text-[11px] sm:text-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <LottieStickerIcon name="wheel" size={14} />
            <span className="hidden xs:inline">VÒNG QUAY</span>
          </button>
        </div>

        {/* Center Title Logo */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="font-pixel text-base sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-300 to-cyan-400 font-black drop-shadow-[0_1.5px_2px_rgba(6,182,212,0.4)]">
              TRỐN SẾP
            </span>
            <span className="font-pixel text-base sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-500 font-black drop-shadow-[0_1.5px_2px_rgba(245,158,11,0.4)]">
              TAN CA
            </span>
          </div>
        </div>

        {/* Right Utilities */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-400 hover:text-emerald-300 text-slate-300 active:scale-95 transition-all cursor-pointer shadow-md"
            title="Toàn Màn Hình"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 cursor-pointer shadow-md"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            onClick={onOpenHelp}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-400 text-sky-400 cursor-pointer shadow-md"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TWO COLUMNS LAYOUT - Natural flex column on mobile, robust grid on desktop/tablets */}
      <div className="w-full max-w-6xl mx-auto z-20 flex flex-col md:grid md:grid-cols-12 gap-5 items-start my-auto">
        
        {/* LEFT COLUMN: Stage Selection Metadata & Paycheck Stats */}
        <div className="w-full md:col-span-5 flex flex-col gap-4">
          
          {/* Chosen Stage Metadata Box */}
          <div className="p-4 rounded-2xl bg-[#110E2E]/95 border-2 border-[#8B5CF6]/50 shadow-xl text-left flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-indigo-950 pb-2">
              <span className="font-pixel text-[10px] sm:text-xs text-amber-300 font-bold flex items-center gap-1.5">
                🎯 {isNightmareTab ? 'CHẾ ĐỘ ÁC MỘNG 💀' : 'CHẾ ĐỘ THƯỜNG'}
              </span>
              
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setIsNightmareTab(false)}
                  className={`px-2.5 py-1 rounded-lg font-pixel text-[9px] sm:text-xs cursor-pointer ${
                    !isNightmareTab ? 'bg-amber-400 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Thường
                </button>
                <button
                  onClick={() => setIsNightmareTab(true)}
                  className={`px-2.5 py-1 rounded-lg font-pixel text-[9px] sm:text-xs cursor-pointer flex items-center gap-0.5 ${
                    isNightmareTab ? 'bg-red-600 text-white font-bold shadow' : 'text-red-400 hover:text-red-300'
                  }`}
                >
                  <Flame className="w-3 h-3 fill-current" />
                  <span>Ác Mộng</span>
                </button>
              </div>
            </div>

            <div className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2 font-pixel">
              <span className="text-xl">{floorList[selectedFloor - 1]?.icon}</span>
              <span>{floorList[selectedFloor - 1]?.name}</span>
            </div>
            
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              {selectedFloor > maxLevelUnlocked
                ? `🔒 Hãy vượt Ải ${selectedFloor - 1} để mở khóa màn chơi này!`
                : isNightmareTab
                ? '🌙 Màn đêm buông xuống! Tầm nhìn sương mù cực hẹp, sếp Tuấn đi nhanh gấp x1.3 lần và rà quét radar liên tục! Nhận thưởng gấp x3 số xu vàng nhặt được!'
                : floorList[selectedFloor - 1]?.desc}
            </p>
          </div>

          {/* Paycheck VND Summary Board */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border-2 border-emerald-500/40 shadow-xl text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2 mb-3">
              <span className="font-pixel text-[10px] sm:text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                📊 BẢNG LƯƠNG & PHẠT THÁNG NÀY
              </span>
              <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-pixel font-semibold">
                PHẠT TỐM: -1Mđ
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-slate-300 text-xs">
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] text-slate-400 font-pixel uppercase tracking-wide">Thực lĩnh tháng này:</span>
                <span className={`font-pixel font-bold text-[11px] sm:text-xs mt-0.5 ${monthlySalaryVND >= 10000000 ? 'text-emerald-400 animate-pulse' : 'text-red-400'}`}>
                  {monthlySalaryVND.toLocaleString('vi-VN')}đ
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] text-slate-400 font-pixel uppercase tracking-wide">Thu nhập sự nghiệp:</span>
                <span className="font-pixel font-bold text-[11px] sm:text-xs text-amber-300 mt-0.5">
                  {cumulativeSalaryEarned.toLocaleString('vi-VN')}đ
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] text-slate-400 font-pixel uppercase tracking-wide">Vượt thoát thành công:</span>
                <span className="text-[11px] text-emerald-300 font-semibold mt-0.5 flex items-center gap-1">
                  <span>🏆</span> {totalEscapes} lần (+1.5Mđ)
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] text-slate-400 font-pixel uppercase tracking-wide">Số lần bị bắt phạt:</span>
                <span className="text-[11px] text-red-300 font-semibold mt-0.5 flex items-center gap-1">
                  <span>🚨</span> {totalCaughtTimes} lần (Trừ lương)
                </span>
              </div>
            </div>
          </div>

          {/* LARGE PLAY ACTION BUTTON */}
          <button
            onClick={() => {
              if (selectedFloor <= maxLevelUnlocked) {
                isNightmareTab ? onStartNightmare(selectedFloor) : onStartStory(selectedFloor);
              }
            }}
            disabled={selectedFloor > maxLevelUnlocked}
            className={`w-full py-3.5 font-pixel text-xs sm:text-sm rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer ${
              selectedFloor > maxLevelUnlocked
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed shadow-none'
                : isNightmareTab
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 hover:from-red-500 hover:via-rose-500 hover:to-purple-500 text-white shadow-red-900/30'
                : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {selectedFloor > maxLevelUnlocked ? (
              <span>🔒 BỊ KHÓA - CẦN VƯỢT ẢI BIỆT LẬP</span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span className="truncate tracking-wider">
                  {isNightmareTab ? `CHƠI ÁC MỘNG ẢI ${selectedFloor}` : `BẮT ĐẦU VƯỢT ẢI ${selectedFloor}`}
                </span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: Tab Switcher (Stage Select / Pet Care Lounge) */}
        <div className="w-full md:col-span-7 flex flex-col justify-between gap-4 bg-slate-900/85 border-2 border-indigo-500/30 rounded-2xl p-4">
          
          {/* Primary Tabs Header */}
          <div className="flex border-b border-indigo-950/60 pb-1.5 shrink-0">
            <button
              onClick={() => setRightPanelTab('stages')}
              className={`flex-1 py-1.5 font-pixel text-xs cursor-pointer text-center border-b-2 transition-all ${
                rightPanelTab === 'stages'
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              🎮 CHỌN ẢI (1-8)
            </button>
            <button
              onClick={() => setRightPanelTab('cats')}
              className={`flex-1 py-1.5 font-pixel text-xs cursor-pointer text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                rightPanelTab === 'cats'
                  ? 'border-pink-500 text-pink-300 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              🐈 NUÔI MÈO 🐾
            </button>
          </div>

          {/* TAB CONTENTS CONTAINER - Natural height flow */}
          {rightPanelTab === 'stages' ? (
            /* Clear Stage Select Grid with high touch target targets */
            <div className="flex-col gap-2 flex">
              <span className="text-[9px] font-pixel text-indigo-300 uppercase tracking-wider text-left block mb-1">
                CHỌN KHU VỰC VĂN PHÒNG KHÁC NHAU:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {floorList.map((fl) => {
                  const isUnlocked = fl.id <= maxLevelUnlocked;
                  const isSelected = selectedFloor === fl.id;
                  return (
                    <button
                      key={fl.id}
                      onClick={() => setSelectedFloor(fl.id)}
                      className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer active:scale-95 flex items-center gap-2.5 ${
                        isSelected
                          ? isNightmareTab
                            ? 'bg-red-950/60 border-red-400 text-red-200 ring-2 ring-red-400/30 font-bold'
                            : 'bg-amber-950/60 border-amber-400 text-amber-300 ring-2 ring-amber-400/30 font-bold'
                          : isUnlocked
                          ? 'bg-slate-900/60 border-slate-850 text-slate-200 hover:border-indigo-500/40 hover:bg-slate-900/95'
                          : 'bg-slate-950/40 border-slate-950 text-slate-600 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-xl shrink-0">
                        {!isUnlocked ? '🔒' : isNightmareTab ? '💀' : fl.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="font-pixel text-[8px] sm:text-[9px] text-indigo-300">ẢI {fl.id}</div>
                        <div className="font-sans text-[11px] text-slate-300 font-bold truncate">{fl.name.split(': ')[1]}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* COMPANION PET INTERACTIVE ADOPTION LOUNGE */
            <div className="flex flex-col gap-3.5 text-left">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[9px] text-pink-300 uppercase tracking-wider">
                  🐈 GÓC NHẬN NUÔI & NỰNG MÈO 🐾
                </span>
                <span className="text-[8px] font-pixel text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                  DẮT MÈO TRỐN CÙNG SEN!
                </span>
              </div>

              {/* Cats selection block */}
              <div className="grid grid-cols-3 gap-2">
                {CAT_DATABASE.map((cat) => {
                  const isAdopted = adoptedCatIds.includes(cat.id);
                  const isActive = currentActiveCatId === cat.id;
                  
                  return (
                    <div
                      key={cat.id}
                      className={`p-2 rounded-xl border-2 text-center transition-all flex flex-col justify-between items-center relative ${
                        isActive
                          ? 'bg-pink-950/40 border-pink-400 text-pink-100 ring-2 ring-pink-400/20'
                          : isAdopted
                          ? 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-pink-500/40'
                          : 'bg-slate-950/60 border-slate-950 text-slate-400 opacity-80'
                      }`}
                    >
                      <span className="text-2xl mb-1 filter drop-shadow">{cat.emoji}</span>
                      <div className="font-pixel text-[8px] sm:text-[9px] font-bold text-slate-200 truncate w-full">
                        {cat.name.split(' ')[0]}
                      </div>
                      <div className="text-[7px] text-pink-300 font-semibold truncate w-full mt-0.5">{cat.buff}</div>
                      
                      <div className="w-full pt-1.5 mt-1.5 border-t border-slate-800 shrink-0">
                        {!isAdopted ? (
                          <button
                            onClick={() => handleAdoptCat(cat.id, cat.cost)}
                            className="w-full py-0.5 px-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-pixel text-[8px] rounded-lg cursor-pointer"
                          >
                            {cat.cost} Xu
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEquipCat(cat.id)}
                            className={`w-full py-0.5 px-1 font-pixel text-[7px] rounded-lg cursor-pointer ${
                              isActive
                                ? 'bg-pink-500 text-white font-bold'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {isActive ? 'Đồng Hành' : 'Dắt theo'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive petting screen */}
              <div className="bg-slate-950/70 border border-indigo-950/60 rounded-2xl p-3 flex flex-row gap-3.5 items-center justify-between relative overflow-hidden">
                {/* Floating Hearts Container */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {petHearts.map((h) => (
                    <span
                      key={h.id}
                      style={{ left: h.x - 10, top: h.y - 10 }}
                      className="absolute text-lg animate-ping text-pink-500"
                    >
                      ❤️
                    </span>
                  ))}
                </div>

                {/* Left: Giant Cat Chibi */}
                <div className="flex flex-col items-center justify-center shrink-0 w-20">
                  <div
                    onClick={handlePetCat}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 border-2 border-pink-400/40 hover:border-pink-400 flex items-center justify-center text-3xl cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-inner relative group"
                  >
                    <span className="animate-bounce" style={{ animationDuration: '2.5s' }}>
                      {currentActiveCatId !== 'none'
                        ? CAT_DATABASE.find((c) => c.id === currentActiveCatId)?.emoji
                        : '🐱'}
                    </span>
                    <span className="absolute bottom-0 text-[7px] bg-pink-500 text-white font-pixel px-1 rounded border border-white opacity-0 group-hover:opacity-100 transition-opacity">
                      NỰNG
                    </span>
                  </div>
                  <span className="font-pixel text-[8px] text-pink-400 font-bold mt-1.5 uppercase truncate w-20 text-center">
                    {currentActiveCatId !== 'none'
                      ? CAT_DATABASE.find((c) => c.id === currentActiveCatId)?.name.split(' ')[0]
                      : 'CHƯA DẮT MÈO'}
                  </span>
                </div>

                {/* Right: Conversation Speech bubble */}
                <div className="flex-1 flex flex-col justify-center text-left bg-indigo-950/20 border border-indigo-950/40 rounded-xl p-2.5 h-full relative min-h-[64px]">
                  <div className="absolute left-[-6px] top-[50%] translate-y-[-50%] border-t-[6px] border-t-transparent border-r-[6px] border-r-indigo-950/40 border-b-[6px] border-b-transparent" />
                  
                  <div className="font-pixel text-[8px] text-pink-300 font-bold mb-0.5 flex items-center gap-1">
                    <span>💬</span> MEOW CHUYỆN:
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-200 leading-relaxed italic font-medium">
                    "{catSpeech}"
                  </p>
                  
                  {currentActiveCatId !== 'none' && (
                    <div className="mt-1.5 text-[8px] text-amber-300 font-sans border-t border-indigo-950/30 pt-1 flex items-center gap-1 font-semibold uppercase">
                      <span>⚡ BUFF:</span>
                      <span>{CAT_DATABASE.find((c) => c.id === currentActiveCatId)?.buff}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions Navigation Buttons */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-indigo-950/60 shrink-0">
            <button
              onClick={onOpenShop}
              className="py-2.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[11px] sm:text-xs flex items-center justify-center gap-1 active:scale-95 cursor-pointer truncate font-bold shadow-md"
            >
              <LottieStickerIcon name="shop" size={14} />
              <span>SHOP</span>
            </button>
            <button
              onClick={onOpenMissions}
              className="py-2.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[11px] sm:text-xs flex items-center justify-center gap-1 active:scale-95 cursor-pointer relative truncate font-bold shadow-md"
            >
              <LottieStickerIcon name="trophy" size={14} />
              <span>NHIỆM VỤ</span>
              {unclaimedMissionsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              )}
            </button>
            <button
              onClick={onOpenWardrobe}
              className="py-2.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 font-pixel text-[11px] sm:text-xs flex items-center justify-center gap-1 active:scale-95 cursor-pointer truncate font-bold shadow-md"
            >
              <LottieStickerIcon name="wardrobe" size={14} />
              <span>TỦ ĐỒ</span>
            </button>
            <button
              onClick={onStartBossHunt}
              className="py-2.5 rounded-xl bg-gradient-to-r from-amber-600/40 to-orange-600/40 border border-amber-500/60 hover:border-amber-500 text-amber-300 font-pixel text-[11px] sm:text-xs flex items-center justify-center gap-1 active:scale-95 cursor-pointer truncate font-bold shadow-md"
            >
              <LottieStickerIcon name="crown" size={14} />
              <span>LÀM SẾP</span>
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="w-full max-w-6xl mx-auto flex items-end justify-between z-10 shrink-0 pointer-events-none py-2 border-t border-indigo-950/40 mt-6">
        <span className="text-[10px] text-slate-500 font-mono">
          © Trốn Sếp Tan Ca v2.8.0 - Đăng ký Bản quyền Dev
        </span>
        <div className="px-3 py-1 bg-[#FDE047] text-slate-900 font-hand text-xs font-bold rounded-xl shadow-lg rotate-2 border-2 border-amber-300 pointer-events-auto active:scale-95 transition-all">
          <span>Tránh sếp, dắt mèo về thôii! 🐈💨</span>
        </div>
      </div>
    </div>
  );
};
