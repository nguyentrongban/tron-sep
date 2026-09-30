import React from 'react';
import { Play, Flame, Shirt, HelpCircle, Volume2, VolumeX, Trophy, ShieldAlert, Sparkles } from 'lucide-react';
import { CharacterSkin, Accessory } from '../types/game';

interface MainMenuProps {
  onStartStory: (floorId: number) => void;
  onStartEndless: () => void;
  onStartTutorial: () => void;
  onOpenShop: () => void;
  onOpenMissions: () => void;
  onOpenWardrobe: () => void;
  onOpenHelp: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  currentSkin: CharacterSkin;
  currentAccessory: Accessory;
  highScoreEndless: number;
  coins: number;
  unclaimedMissionsCount?: number;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartStory,
  onStartEndless,
  onStartTutorial,
  onOpenShop,
  onOpenMissions,
  onOpenWardrobe,
  onOpenHelp,
  isMuted,
  onToggleMute,
  currentSkin,
  currentAccessory,
  highScoreEndless,
  coins,
  unclaimedMissionsCount = 0
}) => {
  const [selectedFloor, setSelectedFloor] = React.useState<number>(1);

  const floorList = [
    { id: 1, name: 'Tầng 4: Phòng IT & Dev', desc: 'Né Sếp Bug Hunter, lấy Chìa khóa xe', icon: '💻' },
    { id: 2, name: 'Tầng 3: Marketing & MKT', desc: 'Né Chị Hạnh & HR mách lẻo, lấy Thẻ chấm công', icon: '📢' },
    { id: 3, name: 'Tầng 2: Ban Giám Đốc', desc: 'Né Camera an ninh 360 & Phó TGĐ Hùng', icon: '👔' },
    { id: 4, name: 'Tầng 1: Cổng Đại Sảnh', desc: 'Vượt qua Bảo vệ & Sếp Tổng để THOÁT THÂN!', icon: '🚪' }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden">
      {/* Background office ambience effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />

      {/* Top Bar with Coins, Sound, Missions, Shop */}
      <div className="w-full max-w-2xl flex items-center justify-between z-10 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* Coins Pill */}
          <button
            onClick={onOpenShop}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 hover:border-amber-400 text-amber-300 font-pixel text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer"
            title="Mở Shop Kỹ Năng"
          >
            <span className="text-sm">💰</span>
            <span className="font-bold">{coins} Xu</span>
            <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1 rounded ml-1">+SHOP</span>
          </button>

          <span className="text-[11px] font-pixel text-amber-400 hidden sm:inline">17:30 TAN CA!</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Missions button with alert badge */}
          <button
            onClick={onOpenMissions}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Nhiệm vụ hàng ngày & Cúp danh hiệu"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            {unclaimedMissionsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            )}
          </button>

          <button
            onClick={onToggleMute}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            onClick={onOpenHelp}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Hướng dẫn chơi"
          >
            <HelpCircle className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>

      {/* Center: Title Logo & Modes */}
      <div className="w-full max-w-xl flex flex-col items-center text-center my-auto z-10 py-4">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 font-pixel text-[10px] mb-3 shadow-lg shadow-red-950/50 animate-pulse">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>BÁO ĐỘNG: SẾP ĐANG ĐI TÌM NGƯỜI LÀM OT!</span>
        </div>

        {/* Main Title */}
        <h1 className="font-pixel text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)] tracking-wider mb-2">
          TRỐN SẾP TAN CA
        </h1>

        <p className="font-chibi text-xs sm:text-sm text-slate-300 font-medium max-w-md mx-auto mb-4">
          Hết giờ rồi! Hãy lén lút né tầm nhìn của sếp, nấp vào thùng giấy và trốn về trước khi bị dúi thêm 50 task!
        </p>

        {/* Quick Nav: Tutorial & Shop & Missions Bar */}
        <div className="w-full grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={onStartTutorial}
            className="p-2.5 rounded-xl bg-gradient-to-b from-sky-900/60 to-slate-900 border border-sky-500/40 hover:border-sky-400 text-sky-300 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <span className="text-xl">🎓</span>
            <span className="font-pixel text-[10px] font-bold">HƯỚNG DẪN</span>
            <span className="text-[9px] text-sky-400 font-chibi">Tập sự +100 Xu</span>
          </button>

          <button
            onClick={onOpenShop}
            className="p-2.5 rounded-xl bg-gradient-to-b from-amber-900/60 to-slate-900 border border-amber-500/40 hover:border-amber-400 text-amber-300 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <span className="text-xl">🛒</span>
            <span className="font-pixel text-[10px] font-bold">SHOP KỸ NĂNG</span>
            <span className="text-[9px] text-amber-400 font-chibi">Nâng cấp & Skins</span>
          </button>

          <button
            onClick={onOpenMissions}
            className="p-2.5 rounded-xl bg-gradient-to-b from-indigo-900/60 to-slate-900 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-lg cursor-pointer relative"
          >
            <span className="text-xl">🏆</span>
            <span className="font-pixel text-[10px] font-bold">NHIỆM VỤ</span>
            <span className="text-[9px] text-indigo-400 font-chibi">Cúp & Thưởng</span>
            {unclaimedMissionsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            )}
          </button>
        </div>

        {/* Character Mini Banner with Wardrobe button */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 mb-4 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 flex items-center justify-center text-2xl">
              {currentSkin === 'coder'
                ? '💻'
                : currentSkin === 'designer'
                ? '🎨'
                : currentSkin === 'sales'
                ? '💼'
                : currentSkin === 'boba_lover'
                ? '🧋'
                : currentSkin === 'intern_vip'
                ? '👑'
                : '🥷'}
            </div>
            <div className="text-left">
              <div className="text-[9px] font-pixel text-slate-400">NHÂN VẬT:</div>
              <div className="text-xs font-bold text-amber-300 font-pixel">
                {currentSkin === 'coder'
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
              <div className="text-[11px] text-slate-400 font-chibi">
                {currentAccessory !== 'none' ? `Phụ kiện: ${currentAccessory}` : 'Trang phục chuẩn'}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenWardrobe}
            className="px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/40 border border-indigo-500/50 text-indigo-300 font-pixel text-[10px] flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>TỦ ĐỒ</span>
          </button>
        </div>

        {/* Play Modes Selection */}
        <div className="w-full space-y-3">
          {/* Story Mode */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏢</span>
                <span className="font-pixel text-xs sm:text-sm text-slate-200">CHIẾN DỊCH: 4 TẦNG LẦU</span>
              </div>
              <span className="text-[10px] font-pixel text-amber-400">CỐT TRUYỆN</span>
            </div>

            {/* Floor selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {floorList.map((fl) => (
                <button
                  key={fl.id}
                  onClick={() => setSelectedFloor(fl.id)}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer active:scale-95 ${
                    selectedFloor === fl.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-lg mb-0.5">{fl.icon}</div>
                  <div className="font-pixel text-[10px] truncate">TẦNG {5 - fl.id}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => onStartStory(selectedFloor)}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-pixel text-xs sm:text-sm rounded-xl font-bold shadow-lg shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>LẺN VỀ NGAY (TẦNG {5 - selectedFloor})</span>
            </button>
          </div>

          {/* Endless Survival Mode */}
          <div className="bg-gradient-to-r from-slate-900 to-red-950/40 border border-slate-800 rounded-2xl p-3.5 shadow-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-pixel text-xs text-orange-300">SINH TỒN VÔ TẬN (ENDLESS)</span>
              </div>
              <p className="text-xs text-slate-400 font-chibi mt-0.5">
                Trốn qua các tầng ngẫu nhiên, sếp ngày càng đông!
              </p>
              {highScoreEndless > 0 && (
                <div className="text-[10px] font-pixel text-amber-400 mt-1 flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  <span>Kỷ lục: Vượt qua Tầng {highScoreEndless}</span>
                </div>
              )}
            </div>

            <button
              onClick={onStartEndless}
              className="px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-pixel text-xs rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-orange-600/20 shrink-0 cursor-pointer"
            >
              THỬ THÁCH
            </button>
          </div>
        </div>
      </div>

      {/* Footer credits & humor quote */}
      <div className="w-full max-w-xl text-center z-10 pt-2">
        <p className="text-[11px] text-slate-400 font-chibi italic">
          "Lương trả 8 tiếng, tan ca đúng giờ là đạo đức công sở!" - Triết lý dân văn phòng
        </p>
      </div>
    </div>
  );
};
