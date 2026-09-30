import React from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Award, CheckCircle2, XCircle, ArrowRight, Sparkles, User, HelpCircle, Home, Volume2, VolumeX } from 'lucide-react';
import { CharacterSkin, Accessory, FloorLevel } from '../types/game';

interface IntroModalProps {
  level: FloorLevel;
  onStart: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ level, onStart }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-1.5 sm:p-3 select-none">
      <div className="pixel-box bg-slate-900 border-2 border-amber-500 max-w-md w-full p-2.5 sm:p-4 rounded-2xl shadow-2xl max-h-[96dvh] flex flex-col justify-between overflow-y-auto my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base sm:text-lg">🏃</span>
            <span className="font-pixel text-[11px] sm:text-xs text-amber-400">
              {level.title}
            </span>
          </div>
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-pixel px-1.5 py-0.5 rounded">
            17:30 TAN CA!
          </span>
        </div>

        {/* Department banner */}
        <div className="my-1.5 p-2 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-lg sm:text-xl shrink-0">
            🏢
          </div>
          <div>
            <div className="text-[9px] text-slate-400 font-pixel">ĐỊA ĐIỂM:</div>
            <div className="text-xs font-bold text-slate-200 font-chibi">
              {level.deptName}
            </div>
            <div className="text-[10px] sm:text-[11px] text-amber-300 font-medium">
              {level.subtitle}
            </div>
          </div>
        </div>

        {/* Humorous Story Dialogues */}
        <div className="space-y-1 mb-2 bg-slate-950/50 p-2 sm:p-2.5 rounded-xl border border-slate-800/80 flex-1 min-h-0 overflow-y-auto">
          {level.dialogueIntro.map((text, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-300">
              <span className="text-amber-400 font-pixel text-[8px] mt-0.5">▶</span>
              <p className="leading-snug font-chibi">{text}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-pixel text-xs sm:text-sm rounded-xl font-bold shadow-lg shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>BẮT ĐẦU LẺN VỀ!</span>
        </button>
      </div>
    </div>
  );
};

const INFRACTIONS = [
  "Ném vỡ tách trà gốm sứ Bát Tràng của Sếp để tạo tiếng động đánh lạc hướng.",
  "Chạy thục mạng hành lang IT tốc độ bàn thờ làm sập tủ điện chính của phòng máy chủ.",
  "Trốn vào sọt rác/thùng carton để lướt TikTok bị Sếp đi qua nhìn thấy chân lòi ra ngoài.",
  "Định lẻn về lúc 17:31 khi chưa gửi báo cáo ngày làm sếp kích hoạt chế độ tầm nhiệt quét.",
  "Uống trộm ly trà sữa boba Full Topping của đồng nghiệp phòng Nhân Sự trong tủ lạnh công ty.",
  "Xếp giấy báo cáo doanh thu quý thành máy bay phóng thẳng vào trán HR Snitch.",
  "Gửi nhầm sticker meme bôi nhọ sếp vào group chat Viber tổng của toàn công ty.",
  "Ngủ gật há mồm ngay tại bàn làm việc ngáy khò khò phát ra tiếng động lôi kéo sếp đến."
];

interface CaughtModalProps {
  level: FloorLevel;
  onRetry: () => void;
  onGoToMenu: () => void;
}

export const CaughtModal: React.FC<CaughtModalProps> = ({ level, onRetry, onGoToMenu }) => {
  const [infraction] = React.useState(() => {
    // Generate a funny random infraction on mount
    const idx = Math.floor(Math.random() * INFRACTIONS.length);
    return INFRACTIONS[idx];
  });

  const empId = React.useMemo(() => {
    return `NV-${1000 + Math.floor(Math.random() * 9000)}`;
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-red-950/80 backdrop-blur-md flex items-center justify-center p-1.5 sm:p-3 select-none">
      <div className="pixel-box bg-slate-900 border-2 border-red-500 max-w-md w-full p-2.5 sm:p-4 rounded-2xl shadow-2xl max-h-[96dvh] flex flex-col justify-between overflow-y-auto my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="text-center pb-1.5 border-b border-red-950 shrink-0">
          <div className="inline-block p-1.5 bg-red-500/20 rounded-full border border-red-500/40 mb-0.5">
            <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 animate-pulse" />
          </div>
          <h2 className="font-pixel text-xs sm:text-sm text-red-400 tracking-wider">
            BỊ SẾP BẮT QUẢ TANG!
          </h2>
          <p className="text-[9px] text-red-300/80 mt-0.5 font-pixel">
            HẬU QUẢ: TĂNG CA (OT) ĐẾN SÁNG!
          </p>
        </div>

        {/* Hilarious Official Disciplinary Report */}
        <div className="my-2 p-3 bg-red-950/30 border border-red-500/20 rounded-xl space-y-2 text-left text-xs font-chibi shrink-0">
          <div className="text-center font-pixel text-[9px] sm:text-[10px] text-red-400 font-bold border-b border-red-500/10 pb-1.5 flex items-center justify-center gap-1.5">
            <span>📋</span> BIÊN BẢN KỶ LUẬT LAO ĐỘNG SỐ #{Math.floor(Math.random() * 900 + 100)}
          </div>
          <div className="grid grid-cols-3 gap-y-2 text-slate-300 py-1">
            <span className="text-slate-400 font-medium text-[10px] font-pixel">NHÂN VIÊN:</span>
            <span className="col-span-2 font-mono text-[11px] text-red-300 font-bold">{empId} (Bộ Phận Lẻn Về)</span>
            
            <span className="text-slate-400 font-medium text-[10px] font-pixel">LỖI VI PHẠM:</span>
            <span className="col-span-2 text-red-200 font-semibold leading-relaxed text-[11px] sm:text-xs">{infraction}</span>
            
            <span className="text-slate-400 font-medium text-[10px] font-pixel">HÌNH PHẠT:</span>
            <span className="col-span-2 text-amber-400 font-bold text-[11px] sm:text-xs">Tăng ca (OT) 72 tiếng không lương + Chép phạt KPI!</span>
          </div>
        </div>

        {/* Chibi Caught Scene & Dialogue */}
        <div className="mb-2 p-2 bg-slate-950 rounded-xl border border-red-900/40 flex flex-col gap-1 shrink-0">
          <div className="flex items-center gap-1 text-red-400 font-pixel text-[9px]">
            <span>🤬</span>
            <span>SẾP LA LỚN:</span>
          </div>
          <div className="space-y-0.5 text-[11px] sm:text-xs text-slate-300 italic font-chibi">
            {level.dialogueCaught.map((text, idx) => (
              <p key={idx} className="leading-tight">
                "{text}"
              </p>
            ))}
          </div>
          <div className="mt-1 pt-1 border-t border-slate-800 text-[9px] sm:text-[10px] text-amber-400 flex items-center gap-1 font-chibi">
            <span>💡 Mẹo:</span>
            <span>Nấp Thùng Giấy [Nấp] hoặc Ném Cốc [Ném Cốc] để dụ Sếp đi hướng khác!</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 shrink-0 pt-1">
          <button
            onClick={onRetry}
            className="flex-1 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-pixel text-xs rounded-xl font-bold shadow-lg shadow-red-600/30 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>THỬ LẺN LẠI</span>
          </button>
          <button
            onClick={onGoToMenu}
            className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-pixel text-xs rounded-xl border border-slate-700 active:scale-98 transition-all cursor-pointer"
          >
            VỀ MENU
          </button>
        </div>
      </div>
    </div>
  );
};

interface VictoryModalProps {
  level: FloorLevel;
  escapeTime: number;
  isAllCompleted: boolean;
  coinsEarned?: number;
  lootCoins?: number;
  onNextFloor: () => void;
  onReplay: () => void;
  onGoToMenu: () => void;
  onStartBossHunt?: () => void;
  onStartNightmare?: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  level,
  escapeTime,
  isAllCompleted,
  coinsEarned = 80,
  lootCoins = 0,
  onNextFloor,
  onReplay,
  onGoToMenu,
  onStartBossHunt,
  onStartNightmare
}) => {
  React.useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-md flex items-center justify-center p-1.5 sm:p-3 select-none">
      <div className="pixel-box bg-slate-900 border-2 border-emerald-500 max-w-md w-full p-2.5 sm:p-4 rounded-2xl shadow-2xl max-h-[96dvh] flex flex-col justify-between overflow-y-auto my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="text-center pb-1 border-b border-emerald-900/60 shrink-0">
          <div className="inline-block p-1 bg-emerald-500/20 rounded-full border border-emerald-500/40 mb-0.5">
            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
          </div>
          <h2 className="font-pixel text-xs sm:text-sm text-emerald-400 tracking-wider">
            {isAllCompleted ? '🎉 TRỐN THOÁT THÀNH CÔNG!' : 'TRỐN THOÁT KHỎI TẦNG!'}
          </h2>
          <p className="text-[9px] text-emerald-300/80 mt-0.5 font-pixel">
            {isAllCompleted
              ? 'BẠN ĐÃ RA KHỎI TÒA NHÀ - TỰ DO RỒI!'
              : 'SẾP KHÔNG KỊP GIAO TASK THÊM!'}
          </p>
        </div>

        {/* Stats & Score & Rewards */}
        <div className="my-1.5 p-2 bg-slate-950 rounded-xl border border-emerald-900/40 space-y-1.5 shrink-0">
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-slate-400 font-pixel text-[9px] sm:text-[10px]">Thời gian lẻn:</span>
            <span className="font-pixel text-amber-400">{escapeTime.toFixed(1)} giây</span>
          </div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-slate-400 font-pixel text-[9px] sm:text-[10px]">Đánh giá kỹ năng:</span>
            <span className="text-amber-400 tracking-widest text-xs sm:text-sm">⭐⭐⭐</span>
          </div>

          {/* Coins Reward Breakdown */}
          <div className="p-1.5 bg-amber-950/30 rounded-lg border border-amber-500/40 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-base">💰</span>
              <div>
                <div className="font-pixel text-[10px] text-amber-300 font-bold">
                  TIỀN LƯƠNG & THƯỞNG:
                </div>
                <div className="text-[9px] text-slate-400 font-chibi">
                  {lootCoins > 0 ? `Lương + ${lootCoins} Xu lượm` : 'Lương tan ca đúng giờ'}
                </div>
              </div>
            </div>
            <div className="font-pixel text-xs sm:text-sm text-amber-300 font-bold animate-pulse">
              +{coinsEarned} Xu
            </div>
          </div>
        </div>

        {/* Buttons */}
        {isAllCompleted ? (
          <div className="space-y-1 shrink-0 pt-1">
            <div className="grid grid-cols-2 gap-1.5">
              {onStartBossHunt && (
                <button
                  onClick={onStartBossHunt}
                  className="py-1.5 px-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-pixel text-[9px] rounded-xl font-bold shadow-md cursor-pointer truncate"
                >
                  👑 LÀM SẾP
                </button>
              )}
              {onStartNightmare && (
                <button
                  onClick={onStartNightmare}
                  className="py-1.5 px-2 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 text-white font-pixel text-[9px] rounded-xl font-bold shadow-md cursor-pointer truncate"
                >
                  🔥 ÁC MỘNG ẢI 1
                </button>
              )}
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={onGoToMenu}
                className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-pixel text-[10px] rounded-xl border border-amber-500/40 cursor-pointer"
              >
                MENU CHÍNH
              </button>
              <button
                onClick={onReplay}
                className="py-1.5 px-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 font-pixel text-[10px] rounded-xl border border-slate-800 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Chơi lại</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-2 shrink-0 pt-1">
            <button
              onClick={onNextFloor}
              className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-pixel text-xs rounded-xl font-bold shadow-lg shadow-emerald-500/25 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>XUỐNG TẦNG TIẾP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onReplay}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-pixel text-xs rounded-xl border border-slate-700 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi lại</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface WardrobeModalProps {
  currentSkin: CharacterSkin;
  currentAccessory: Accessory;
  onSelectSkin: (skin: CharacterSkin) => void;
  onSelectAccessory: (acc: Accessory) => void;
  onClose: () => void;
}

export const WardrobeModal: React.FC<WardrobeModalProps> = ({
  currentSkin,
  currentAccessory,
  onSelectSkin,
  onSelectAccessory,
  onClose
}) => {
  const skins: { id: CharacterSkin; name: string; desc: string; icon: string }[] = [
    { id: 'coder', name: 'Nam Lập Trình', desc: 'Áo xanh hoodie, chuyên gia né bug và né sếp IT', icon: '💻' },
    { id: 'designer', name: 'Vy Thiết Kế', desc: 'Tóc highlight xanh ngọc, dị ứng với "làm logo to lên"', icon: '🎨' },
    { id: 'sales', name: 'Hoàng Chốt Đơn', desc: 'Sơ mi cà vạt bảnh bao, lẻn về đi date với khách', icon: '💼' },
    { id: 'ninja', name: 'Ninja Công Sở', desc: 'Cao thủ lén lút, trốn về không để lại dấu vết', icon: '🥷' },
    { id: 'boba_lover', name: 'Thánh Trà Sữa', desc: 'Tay cầm ly trà sữa full topping, chạy siêu bền', icon: '🧋' },
    { id: 'intern_vip', name: 'Thực Tập VIP', desc: 'Vest bảnh bao, con cưng của tập đoàn', icon: '✨' },
    { id: 'ceo_gold', name: 'Chủ Tịch Giả Nghèo', desc: 'Suit hoàng kim dát vàng (Mở khi thắng Ải 8)', icon: '👑' }
  ];

  const accessories: { id: Accessory; name: string; icon: string }[] = [
    { id: 'none', name: 'Không có', icon: '❌' },
    { id: 'box_hat', name: 'Mũ Hộp Giấy', icon: '📦' },
    { id: 'sunglasses', name: 'Kính Râm Ngầu', icon: '🕶️' },
    { id: 'ninja_band', name: 'Băng Đô Đỏ', icon: '🧣' },
    { id: 'golden_crown', name: 'Vương Miện Vàng', icon: '👑' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-1.5 sm:p-3 select-none">
      <div className="pixel-box bg-slate-900 border-2 border-indigo-500 max-w-md w-full p-2.5 sm:p-4 rounded-2xl shadow-2xl max-h-[96dvh] flex flex-col justify-between overflow-y-auto my-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <h3 className="font-pixel text-[11px] sm:text-xs text-indigo-300">
              TỦ ĐỒ & TÙY BIẾN CHIBI
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-pixel text-xs cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        {/* Skins list */}
        <div className="mt-1.5 shrink-0">
          <div className="text-[9px] font-pixel text-slate-400 mb-0.5">CHỌN NHÂN VẬT:</div>
          <div className="grid grid-cols-2 gap-1">
            {skins.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectSkin(s.id)}
                className={`p-1 sm:p-1.5 rounded-xl border text-left transition-all active:scale-95 cursor-pointer ${
                  currentSkin === s.id
                    ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-base sm:text-lg">{s.icon}</span>
                  <div className="truncate">
                    <div className="font-pixel text-[9px] sm:text-[10px] font-bold text-slate-200 truncate">{s.name}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Accessories list */}
        <div className="mt-1.5 shrink-0">
          <div className="text-[9px] font-pixel text-slate-400 mb-0.5">PHỤ KIỆN TRANG TRÍ:</div>
          <div className="grid grid-cols-3 gap-1">
            {accessories.map((a) => (
              <button
                key={a.id}
                onClick={() => onSelectAccessory(a.id)}
                className={`p-1 rounded-xl border flex items-center gap-1 text-xs transition-all active:scale-95 cursor-pointer ${
                  currentAccessory === a.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-sm">{a.icon}</span>
                <span className="font-pixel text-[8px] sm:text-[9px] truncate">{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-pixel text-xs rounded-xl font-bold transition-all cursor-pointer shrink-0"
        >
          XÁC NHẬN VÀ LẺN VỀ
        </button>
      </div>
    </div>
  );
};

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-1.5 sm:p-3 select-none">
      <div className="pixel-box bg-slate-900 border-2 border-sky-500 max-w-md w-full p-2.5 sm:p-4 rounded-2xl shadow-2xl max-h-[96dvh] flex flex-col justify-between overflow-y-auto my-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            <h3 className="font-pixel text-[11px] sm:text-xs text-sky-300">
              BÍ KÍP TRỐN SẾP 17:30
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-pixel text-xs cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        <div className="my-1.5 space-y-1.5 text-xs text-slate-300 font-chibi flex-1 min-h-0 overflow-y-auto pr-1">
          <div className="flex items-start gap-1.5 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-base">🕹️</span>
            <div>
              <div className="font-bold text-amber-300 font-pixel text-[9px] mb-0.5">ĐIỀU KHIỂN:</div>
              <p className="text-[11px]">Dùng <b>Cần gạt cảm ứng</b> (trên ĐT) hoặc phím <b>WASD</b> để di chuyển.</p>
            </div>
          </div>

          <div className="flex items-start gap-1.5 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-base">⚡</span>
            <div>
              <div className="font-bold text-amber-300 font-pixel text-[9px] mb-0.5">CHẠY NHANH:</div>
              <p className="text-[11px]">Bấm nút <b>[CHẠY]</b> / <b>Shift</b> để bứt tốc cực mạnh trong 3 giây.</p>
            </div>
          </div>

          <div className="flex items-start gap-1.5 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-base">📦</span>
            <div>
              <div className="font-bold text-amber-400 font-pixel text-[9px] mb-0.5">ẨN NẤP:</div>
              <p className="text-[11px]">Đến gần Thùng Giấy / Chậu Cây / Gầm Bàn nhấn nút <b>[NẤP]</b> để trốn sếp.</p>
            </div>
          </div>

          <div className="flex items-start gap-1.5 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-base">🥤</span>
            <div>
              <div className="font-bold text-sky-400 font-pixel text-[9px] mb-0.5">ĐÁNH LẠC HƯỚNG:</div>
              <p className="text-[11px]">Nhấn nút <b>[NÉM CỐC]</b> để dụ sếp quay đi vị trí khác.</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-pixel text-xs rounded-xl font-bold transition-all cursor-pointer shrink-0"
        >
          ĐÃ HIỂU, CHO TÔI VỀ!
        </button>
      </div>
    </div>
  );
};

interface PauseModalProps {
  levelTitle: string;
  deptName: string;
  onResume: () => void;
  onRestart: () => void;
  onGoToMenu: () => void;
  onOpenHelp: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  levelTitle,
  deptName,
  onResume,
  onRestart,
  onGoToMenu,
  onOpenHelp,
  isMuted,
  onToggleMute
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-1.5 sm:p-3 select-none">
      <div className="pixel-box bg-slate-900 border-2 border-amber-500 max-w-xs w-full p-2.5 sm:p-3.5 rounded-2xl shadow-2xl max-h-[96dvh] flex flex-col justify-between overflow-y-auto my-auto animate-in zoom-in-95 duration-150 text-center">
        {/* Header */}
        <div className="pb-1.5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base">⏸️</span>
            <span className="font-pixel text-[11px] sm:text-xs text-amber-400">TẠM DỪNG</span>
          </div>
          <button
            onClick={onToggleMute}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
          </button>
        </div>

        <div className="my-1.5 py-1.5 px-2 bg-slate-950/80 rounded-xl border border-slate-800 shrink-0">
          <div className="text-[8px] text-slate-400 font-pixel">ĐANG TRỐN TẠI:</div>
          <div className="text-xs font-bold text-slate-200 font-chibi truncate mt-0.5">{levelTitle}</div>
        </div>

        {/* Buttons */}
        <div className="space-y-1 shrink-0 pt-0.5">
          <button
            onClick={onResume}
            className="w-full py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-pixel text-xs rounded-xl font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3 h-3 fill-slate-950" />
            <span>TIẾP TỤC TRỐN</span>
          </button>

          <button
            onClick={onRestart}
            className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-pixel text-xs rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>CHƠI LẠI ẢI NÀY</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/40 font-pixel text-xs rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3 h-3" />
            <span>HƯỚNG DẪN CHƠI</span>
          </button>

          <button
            onClick={onGoToMenu}
            className="w-full py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/50 font-pixel text-xs rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Home className="w-3 h-3" />
            <span>VỀ MÀN HÌNH CHÍNH</span>
          </button>
        </div>
      </div>
    </div>
  );
};
