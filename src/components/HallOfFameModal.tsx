import React from 'react';
import { Trophy, Award, Star, Flame, Shield, X } from 'lucide-react';
import { AchievementItem } from '../types/game';

interface HallOfFameModalProps {
  totalEscapes: number;
  highScoreEndless: number;
  achievements: AchievementItem[];
  hasBeatenGame: boolean;
  onClose: () => void;
}

export const HallOfFameModal: React.FC<HallOfFameModalProps> = ({
  totalEscapes,
  highScoreEndless,
  achievements,
  hasBeatenGame,
  onClose
}) => {
  // Career Title rank based on total escapes and beaten game
  let title = 'Tân Binh Thử Việc';
  let badgeIcon = '🌱';
  if (hasBeatenGame) {
    title = 'CHIẾN THẦN TAN CA 17:30';
    badgeIcon = '👑';
  } else if (totalEscapes >= 15) {
    title = 'Trùm Né Sếp Lão Luyện';
    badgeIcon = '⚡';
  } else if (totalEscapes >= 8) {
    title = 'Chuyên Gia Chuồn Sớm';
    badgeIcon = '🏃';
  } else if (totalEscapes >= 3) {
    title = 'Nhân Viên Chính Thức';
    badgeIcon = '💼';
  }

  const completedCount = achievements.filter((a) => a.isCompleted).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-1.5 sm:p-3 select-none">
      <div className="pixel-box bg-slate-900 border-2 border-amber-500 max-w-lg w-full p-2.5 sm:p-4 rounded-2xl shadow-2xl max-h-[96dvh] overflow-y-auto my-auto animate-in zoom-in-95 duration-200 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h3 className="font-pixel text-[11px] sm:text-xs text-amber-300">
              BẢNG KỶ LỤC & VINH DANH CÔNG SỞ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Player Career Card */}
        <div className="my-2 p-2.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-xl sm:text-2xl shadow-lg shrink-0">
              {badgeIcon}
            </div>
            <div>
              <div className="text-[9px] font-pixel text-slate-400 uppercase">DANH HIỆU:</div>
              <div className="font-pixel text-xs sm:text-sm text-amber-300 font-bold mt-0.5">
                {title}
              </div>
              <div className="text-[10px] text-slate-300 font-chibi mt-0.5">
                {hasBeatenGame ? 'Đã phá đảo cả 8 Ải chiến dịch!' : 'Đang trên con đường giải phóng 17:30'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-2 shrink-0">
          <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-base sm:text-lg mb-0.5">🚪</div>
            <div className="text-[9px] text-slate-400 font-pixel">ĐÀO TẨU</div>
            <div className="font-pixel text-xs sm:text-sm text-emerald-400 font-bold mt-0.5">
              {totalEscapes} Lần
            </div>
          </div>

          <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-base sm:text-lg mb-0.5">🔥</div>
            <div className="text-[9px] text-slate-400 font-pixel">SINH TỒN</div>
            <div className="font-pixel text-xs sm:text-sm text-orange-400 font-bold mt-0.5">
              {highScoreEndless > 0 ? `Tầng ${highScoreEndless}` : 'Chưa thử'}
            </div>
          </div>

          <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-base sm:text-lg mb-0.5">⭐</div>
            <div className="text-[9px] text-slate-400 font-pixel">THÀNH TỰU</div>
            <div className="font-pixel text-xs sm:text-sm text-amber-300 font-bold mt-0.5">
              {completedCount}/{achievements.length}
            </div>
          </div>
        </div>

        {/* Hall of Fame Perks */}
        <div className="p-2 sm:p-2.5 bg-slate-950/80 rounded-xl border border-slate-800/80 mb-2 space-y-1 text-xs shrink-0">
          <div className="font-pixel text-[9px] text-amber-400 uppercase tracking-wider mb-0.5">
            ĐẶC QUYỀN KHI PHÁ ĐẢO 8 ẢI:
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Mở khóa <b>Skin Chủ Tịch Giả Nghèo</b> mạ vàng & tiền rơi</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Mở khóa <b>Vương Miện Trốn OT Mạ Vàng</b></span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Mở khóa <b>Chế độ Ác Mộng Cúp Điện</b> (Nightmare OT Mode)</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 sm:py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-pixel text-xs rounded-xl font-bold transition-all cursor-pointer shadow-lg shrink-0"
        >
          TIẾP TỤC HÀNH TRÌNH
        </button>
      </div>
    </div>
  );
};
