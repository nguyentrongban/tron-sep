import React from 'react';
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
  Moon,
  Crown
} from 'lucide-react';
import { CharacterSkin, Accessory } from '../types/game';

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
  const [selectedFloor, setSelectedFloor] = React.useState<number>(Math.min(maxLevelUnlocked, 8));
  const [isNightmareTab, setIsNightmareTab] = React.useState<boolean>(false);

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
    <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-between p-3 sm:p-5 overflow-y-auto overflow-x-hidden">
      {/* Background office ambience effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />

      {/* Top Bar with Coins, Lucky Wheel, Hall of Fame, Audio */}
      <div className="w-full max-w-2xl flex items-center justify-between z-10 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* Coins Pill */}
          <button
            onClick={onOpenShop}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 hover:border-amber-400 text-amber-300 font-pixel text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer"
            title="Mở Shop Kỹ Năng"
          >
            <span>💰</span>
            <span className="font-bold">{coins}</span>
            <span className="text-[10px] text-amber-400 opacity-80">+Shop</span>
          </button>

          {/* Lucky Wheel Button */}
          <button
            onClick={onOpenLuckyWheel}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-pink-500/50 hover:border-pink-400 text-pink-300 font-pixel text-[10px] sm:text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer animate-pulse"
            title="Vòng Quay May Mắn Phúc Lợi"
          >
            <span>🎡</span>
            <span>VÒNG QUAY</span>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5">
          {/* Hall of Fame / Trophies Button */}
          <button
            onClick={onOpenHallOfFame}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-amber-500/60 hover:border-amber-400 text-amber-300 font-pixel text-[10px] sm:text-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            title="Bảng Vinh Danh Kỷ Lục"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">VINH DANH</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={onOpenHelp}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Hướng dẫn chơi"
          >
            <HelpCircle className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>

      {/* Center: Title Logo & Modes */}
      <div className="w-full max-w-xl flex flex-col items-center text-center my-auto z-10 py-3">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 font-pixel text-[10px] mb-2 shadow-lg shadow-red-950/50 animate-pulse">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>BÁO ĐỘNG: SẾP ĐANG ĐI TÌM NGƯỜI LÀM OT!</span>
        </div>

        {/* Main Title */}
        <h1 className="font-pixel text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)] tracking-wider mb-1">
          TRỐN SẾP TAN CA
        </h1>

        <p className="font-chibi text-xs text-slate-300 font-medium max-w-md mx-auto mb-3">
          17:30 rồi! Lẻn né sếp, nấp vào thùng giấy và chuồn về trước khi bị dúi thêm 50 task!
        </p>

        {/* Quick Nav: Tutorial & Shop & Missions Bar */}
        <div className="w-full grid grid-cols-3 gap-2 mb-3">
          <button
            onClick={onStartTutorial}
            className="p-2 rounded-xl bg-gradient-to-b from-sky-900/60 to-slate-900 border border-sky-500/40 hover:border-sky-400 text-sky-300 flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <span className="text-lg">🎓</span>
            <span className="font-pixel text-[10px] font-bold">HƯỚNG DẪN</span>
            <span className="text-[9px] text-sky-400 font-chibi">Tập sự +100 Xu</span>
          </button>

          <button
            onClick={onOpenShop}
            className="p-2 rounded-xl bg-gradient-to-b from-amber-900/60 to-slate-900 border border-amber-500/40 hover:border-amber-400 text-amber-300 flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <span className="text-lg">🛒</span>
            <span className="font-pixel text-[10px] font-bold">SHOP KỸ NĂNG</span>
            <span className="text-[9px] text-amber-400 font-chibi">Nâng cấp & Skins</span>
          </button>

          <button
            onClick={onOpenMissions}
            className="p-2 rounded-xl bg-gradient-to-b from-indigo-900/60 to-slate-900 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-lg cursor-pointer relative"
          >
            <span className="text-lg">🏆</span>
            <span className="font-pixel text-[10px] font-bold">NHIỆM VỤ</span>
            <span className="text-[9px] text-indigo-400 font-chibi">Cúp & Thưởng</span>
            {unclaimedMissionsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            )}
          </button>
        </div>

        {/* Character Mini Banner with Wardrobe button */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-3 mb-3 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 flex items-center justify-center text-xl">
              {currentSkin === 'ceo_gold'
                ? '👑'
                : currentSkin === 'coder'
                ? '💻'
                : currentSkin === 'designer'
                ? '🎨'
                : currentSkin === 'sales'
                ? '💼'
                : currentSkin === 'boba_lover'
                ? '🧋'
                : currentSkin === 'intern_vip'
                ? '✨'
                : '🥷'}
            </div>
            <div className="text-left">
              <div className="text-[9px] font-pixel text-slate-400">NHÂN VẬT:</div>
              <div className="text-xs font-bold text-amber-300 font-pixel">
                {currentSkin === 'ceo_gold'
                  ? 'Chủ Tịch Giả Nghèo'
                  : currentSkin === 'coder'
                  ? 'Nam Lập Trình'
                  : currentSkin === 'designer'
                  ? 'Vy Thiết Kế'
                  : currentSkin === 'sales'
                  ? 'Hoàng Chốt Đơn'
                  : currentSkin === 'boba_lover'
                  ? 'Thánh Trà Sữa'
                  : currentSkin === 'intern_vip'
                  ? 'Thực Tập Sinh VIP'
                  : 'Ninja Công Sở'}
              </div>
              <div className="text-[10px] text-slate-400 font-chibi">
                {currentAccessory !== 'none' ? `Phụ kiện: ${currentAccessory}` : 'Trang phục chuẩn'}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenWardrobe}
            className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/40 border border-indigo-500/50 text-indigo-300 font-pixel text-[10px] flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>TỦ ĐỒ</span>
          </button>
        </div>

        {/* Play Modes Selection */}
        <div className="w-full space-y-2.5">
          {/* Story Campaign (8 Floors) */}
          <div className={`border rounded-2xl p-3.5 shadow-xl transition-all ${
            isNightmareTab
              ? 'bg-gradient-to-b from-purple-950/70 via-slate-900 to-red-950/50 border-red-500/60 shadow-red-950/50'
              : 'bg-slate-900/90 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-base">{isNightmareTab ? '🔥' : '🏢'}</span>
                <span className="font-pixel text-xs text-slate-200">
                  {isNightmareTab ? 'CHIẾN DỊCH: ÁC MỘNG OT (THƯỞNG X3)' : 'CHIẾN DỊCH: 8 ẢI THỬ THÁCH'}
                </span>
              </div>

              {/* Mode Toggle Switch */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setIsNightmareTab(false)}
                  className={`px-2.5 py-1 rounded-lg font-pixel text-[9px] transition-all cursor-pointer ${
                    !isNightmareTab
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Ải Thường
                </button>
                <button
                  onClick={() => setIsNightmareTab(true)}
                  className={`px-2.5 py-1 rounded-lg font-pixel text-[9px] transition-all cursor-pointer flex items-center gap-1 ${
                    isNightmareTab
                      ? 'bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold shadow-md shadow-red-600/30'
                      : 'text-red-400 hover:text-red-300'
                  }`}
                >
                  <Flame className="w-3 h-3 fill-red-400" />
                  <span>Ác Mộng</span>
                </button>
              </div>
            </div>

            {/* Floor selector tabs */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-2.5">
              {floorList.map((fl) => {
                const isUnlocked = fl.id <= maxLevelUnlocked;
                const isSelected = selectedFloor === fl.id;
                return (
                  <button
                    key={fl.id}
                    onClick={() => setSelectedFloor(fl.id)}
                    className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer active:scale-95 relative ${
                      isSelected
                        ? isNightmareTab
                          ? 'bg-red-600/30 border-red-400 text-red-200 shadow-md shadow-red-600/30 ring-1 ring-red-400'
                          : 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                        : isUnlocked
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-950/60 border-slate-900 text-slate-600 opacity-60'
                    }`}
                    title={isUnlocked ? `${fl.name}: ${fl.desc}` : `Ải ${fl.id} chưa mở khóa!`}
                  >
                    <div className="text-base mb-0.5">
                      {!isUnlocked ? '🔒' : isNightmareTab ? '💀' : fl.icon}
                    </div>
                    <div className="font-pixel text-[9px] truncate">
                      {isUnlocked ? `ẢI ${fl.id}` : `KHÓA`}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={`border rounded-xl px-2.5 py-2 mb-2.5 text-left transition-all ${
              isNightmareTab
                ? 'bg-red-950/40 border-red-500/40'
                : 'bg-slate-950/80 border-slate-800/80'
            }`}>
              <div className={`font-pixel text-[10px] font-bold mb-0.5 flex items-center justify-between ${
                selectedFloor > maxLevelUnlocked
                  ? 'text-slate-500'
                  : isNightmareTab
                  ? 'text-red-300'
                  : 'text-amber-300'
              }`}>
                <span>
                  {floorList[selectedFloor - 1]?.name}
                  {selectedFloor > maxLevelUnlocked && ' (CHƯA MỞ KHÓA 🔒)'}
                </span>
                {isNightmareTab && selectedFloor <= maxLevelUnlocked && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-600/40 border border-red-500 text-red-300 font-pixel">
                    3X TIỀN LƯƠNG
                  </span>
                )}
              </div>
              <div className="font-chibi text-[11px] text-slate-300">
                {selectedFloor > maxLevelUnlocked ? (
                  <span className="text-red-400 font-medium">
                    🔒 Ải này chưa mở khóa! Hãy vượt qua thành công Ải {selectedFloor - 1} để mở khóa Ải tiếp theo!
                  </span>
                ) : isNightmareTab ? (
                  '🌙 Văn phòng tắt đèn tối đen! Bạn chỉ có đèn pin, Sếp chạy nhanh 1.3x và kỹ năng Quét Radar kích hoạt liên tục mỗi 25 giây!'
                ) : (
                  floorList[selectedFloor - 1]?.desc
                )}
              </div>
            </div>

            <button
              onClick={() => {
                if (selectedFloor <= maxLevelUnlocked) {
                  isNightmareTab ? onStartNightmare(selectedFloor) : onStartStory(selectedFloor);
                }
              }}
              disabled={selectedFloor > maxLevelUnlocked}
              className={`w-full py-3 font-pixel text-xs rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                selectedFloor > maxLevelUnlocked
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : isNightmareTab
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white shadow-red-600/30 active:scale-98 cursor-pointer'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/25 active:scale-98 cursor-pointer'
              }`}
            >
              {selectedFloor > maxLevelUnlocked ? (
                <span>🔒 CẦN THẮNG ẢI {selectedFloor - 1} ĐỂ MỞ KHÓA</span>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>
                    {isNightmareTab ? `BẮT ĐẦU ÁC MỘNG ẢI ${selectedFloor}` : `BẮT ĐẦU VƯỢT ẢI ${selectedFloor}`}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Grand Champion Badge if beaten 8 floors */}
          {hasBeatenGame && (
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-2 border-amber-400/80 shadow-lg shadow-amber-500/10 flex items-center justify-between text-left">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl animate-bounce">👑</span>
                <div>
                  <div className="font-pixel text-[10px] text-amber-300 font-bold">
                    BẬC THẦY HUYỀN THOẠI ĐÃ PHÁ ĐẢO 8 ẢI!
                  </div>
                  <div className="font-chibi text-[10px] text-amber-200/80">
                    Đã mở khóa: Skin Chủ Tịch Dát Vàng, Vương Miện Vàng & Chế Độ Làm Sếp!
                  </div>
                </div>
              </div>
              <button
                onClick={onOpenWardrobe}
                className="px-2.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-pixel text-[9px] font-bold active:scale-95 cursor-pointer shrink-0"
              >
                MẶC ĐỒ
              </button>
            </div>
          )}

          {/* REVERSE ROLE: BOSS HUNT MODE (LÀM SẾP SĂN NHÂN VIÊN!) */}
          <div className="bg-gradient-to-r from-slate-900 to-amber-950/50 border border-amber-500/40 rounded-2xl p-3 shadow-xl flex items-center justify-between">
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="font-pixel text-xs text-amber-300">LÀM SẾP SĂN NHÂN VIÊN (MỚI!)</span>
              </div>
              <p className="text-[11px] text-slate-300 font-chibi mt-0.5">
                Đảo ngược vai trò: Điều khiển Sếp Tổng, lùng bắt 5 nhân viên lén về sớm!
              </p>
            </div>

            <button
              onClick={onStartBossHunt}
              className="px-3.5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-pixel text-[10px] rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer"
            >
              LÀM SẾP
            </button>
          </div>

          {/* Endless Survival Mode */}
          <div className="bg-gradient-to-r from-slate-900 to-red-950/40 border border-slate-800 rounded-2xl p-3 shadow-xl flex items-center justify-between">
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-pixel text-xs text-orange-300">SINH TỒN VÔ TẬN (ENDLESS)</span>
              </div>
              <p className="text-[11px] text-slate-400 font-chibi mt-0.5">
                Trốn qua các tầng ngẫu nhiên, sếp ngày càng đông và hung hãn!
              </p>
              {highScoreEndless > 0 && (
                <div className="text-[9px] font-pixel text-amber-400 mt-1 flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  <span>Kỷ lục: Vượt qua Tầng {highScoreEndless}</span>
                </div>
              )}
            </div>

            <button
              onClick={onStartEndless}
              className="px-3.5 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-pixel text-[10px] rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-orange-600/20 shrink-0 cursor-pointer"
            >
              THỬ THÁCH
            </button>
          </div>
        </div>
      </div>

      {/* Footer credits & humor quote */}
      <div className="w-full max-w-xl text-center z-10 pt-2">
        <p className="text-[10px] text-slate-400 font-chibi italic">
          "Lương trả 8 tiếng, tan ca đúng giờ là đạo đức công sở!" - Triết lý dân văn phòng
        </p>
      </div>
    </div>
  );
};
