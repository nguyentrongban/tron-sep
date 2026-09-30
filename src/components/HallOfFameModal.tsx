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
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="pixel-box bg-slate-900 border-2 border-amber-500 max-w-lg w-full p-5 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-pixel text-xs sm:text-sm text-amber-300">
              BẢNG KỶ LỤC & VINH DANH CÔNG SỞ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Career Card */}
        <div className="my-4 p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-lg">
              {badgeIcon}
            </div>
            <div>
              <div className="text-[10px] font-pixel text-slate-400 uppercase">DANH HIỆU HIỆN TẠI:</div>
              <div className="font-pixel text-xs sm:text-sm text-amber-300 font-bold mt-0.5">
                {title}
              </div>
              <div className="text-[11px] text-slate-300 font-chibi mt-0.5">
                {hasBeatenGame ? 'Đã phá đảo cả 8 Ải chiến dịch!' : 'Đang trên con đường giải phóng 17:30'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-xl mb-1">🚪</div>
            <div className="text-[10px] text-slate-400 font-pixel">TỔNG ĐÀO TẨU</div>
            <div className="font-pixel text-sm sm:text-base text-emerald-400 font-bold mt-0.5">
              {totalEscapes} Lần
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-xl mb-1">🔥</div>
            <div className="text-[10px] text-slate-400 font-pixel">KỶ LỤC SINH TỒN</div>
            <div className="font-pixel text-sm sm:text-base text-orange-400 font-bold mt-0.5">
              {highScoreEndless > 0 ? `Tầng ${highScoreEndless}` : 'Chưa thử'}
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-xl mb-1">⭐</div>
            <div className="text-[10px] text-slate-400 font-pixel">THÀNH TỰU</div>
            <div className="font-pixel text-sm sm:text-base text-amber-300 font-bold mt-0.5">
              {completedCount}/{achievements.length}
            </div>
          </div>
        </div>

        {/* Hall of Fame Perks */}
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 mb-4 space-y-2 text-xs">
          <div className="font-pixel text-[10px] text-amber-400 uppercase tracking-wider mb-1">
            ĐẶC QUYỀN KHI PHÁ ĐẢO 8 ẢI:
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400">✓</span>
            <span>Mở khóa <b>Skin Chủ Tịch Giả Nghèo</b> mạ vàng & hiệu ứng tiền rơi</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400">✓</span>
            <span>Mở khóa <b>Vương Miện Trốn OT Mạ Vàng</b> trong tủ đồ</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400">✓</span>
            <span>Mở khóa <b>Chế độ Ác Mộng Cúp Điện</b> (Nightmare OT Mode)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400">✓</span>
            <span>Mở khóa <b>Chế độ Đảo Ngược: Làm Sếp Săn Nhân Viên</b></span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-pixel text-xs rounded-xl font-bold transition-all cursor-pointer shadow-lg"
        >
          TIẾP TỤC HÀNH TRÌNH
        </button>
      </div>
    </div>
  );
};
