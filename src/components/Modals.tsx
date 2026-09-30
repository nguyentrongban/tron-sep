import React from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Award, CheckCircle2, XCircle, ArrowRight, Sparkles, User, HelpCircle } from 'lucide-react';
import { CharacterSkin, Accessory, FloorLevel } from '../types/game';

interface IntroModalProps {
  level: FloorLevel;
  onStart: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ level, onStart }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="pixel-box bg-slate-900 border-2 border-amber-500 max-w-lg w-full p-6 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏃</span>
            <span className="font-pixel text-xs sm:text-sm text-amber-400">
              {level.title}
            </span>
          </div>
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-pixel px-2 py-0.5 rounded">
            17:30 TAN CA!
          </span>
        </div>

        {/* Department banner */}
        <div className="my-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0">
            🏢
          </div>
          <div>
            <div className="text-xs text-slate-400 font-pixel">ĐỊA ĐIỂM:</div>
            <div className="text-sm sm:text-base font-bold text-slate-200 font-chibi">
              {level.deptName}
            </div>
            <div className="text-xs text-amber-300 font-medium">
              {level.subtitle}
            </div>
          </div>
        </div>

        {/* Humorous Story Dialogues */}
        <div className="space-y-2 mb-6 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
          {level.dialogueIntro.map((text, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <span className="text-amber-400 font-pixel text-[10px] mt-0.5">▶</span>
              <p className="leading-relaxed font-chibi">{text}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-pixel text-xs sm:text-sm rounded-xl font-bold shadow-lg shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>BẮT ĐẦU LẺN VỀ!</span>
        </button>
      </div>
    </div>
  );
};

interface CaughtModalProps {
  level: FloorLevel;
  onRetry: () => void;
  onGoToMenu: () => void;
}

export const CaughtModal: React.FC<CaughtModalProps> = ({ level, onRetry, onGoToMenu }) => {
  return (
    <div className="fixed inset-0 z-50 bg-red-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="pixel-box bg-slate-900 border-2 border-red-500 max-w-lg w-full p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="text-center pb-4 border-b border-red-950">
          <div className="inline-block p-3 bg-red-500/20 rounded-full border border-red-500/40 mb-2">
            <XCircle className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-red-400 tracking-wider">
            BỊ SẾP BẮT QUẢ TANG!
          </h2>
          <p className="text-xs text-red-300/80 mt-1 font-pixel">
            HẬU QUẢ: TĂNG CA (OT) ĐẾN SÁNG!
          </p>
        </div>

        {/* Chibi Caught Scene & Dialogue */}
        <div className="my-5 p-4 bg-slate-950 rounded-xl border border-red-900/50 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-red-400 font-pixel text-xs">
            <span>🤬</span>
            <span>SẾP LA LỚN:</span>
          </div>
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 italic font-chibi">
            {level.dialogueCaught.map((text, idx) => (
              <p key={idx} className="leading-relaxed">
                "{text}"
              </p>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-amber-400 flex items-center gap-1 font-chibi">
            <span>💡 Mẹo nhỏ:</span>
            <span>Hãy chui vào Thùng Giấy [E] hoặc ném Cốc [Q] để dụ sếp quay đi hướng khác!</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-pixel text-xs rounded-xl font-bold shadow-lg shadow-red-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>THỬ LẺN LẠI</span>
          </button>
          <button
            onClick={onGoToMenu}
            className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-pixel text-xs rounded-xl border border-slate-700 active:scale-98 transition-all cursor-pointer"
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
    <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="pixel-box bg-slate-900 border-2 border-emerald-500 max-w-lg w-full p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="text-center pb-4 border-b border-emerald-900/60">
          <div className="inline-block p-3 bg-emerald-500/20 rounded-full border border-emerald-500/40 mb-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="font-pixel text-base sm:text-lg text-emerald-400 tracking-wider">
            {isAllCompleted ? '🎉 TRỐN THOÁT THÀNH CÔNG!' : 'TRỐN THOÁT KHỎI TẦNG!'}
          </h2>
          <p className="text-xs text-emerald-300/80 mt-1 font-pixel">
            {isAllCompleted
              ? 'BẠN ĐÃ RA KHỎI TÒA NHÀ - TỰ DO RỒI!'
              : 'SẾP KHÔNG KỊP GIAO TASK THÊM!'}
          </p>
        </div>

        {/* Stats & Score & Rewards */}
        <div className="my-5 p-4 bg-slate-950 rounded-xl border border-emerald-900/40 space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-400 font-pixel text-xs">Thời gian lẻn:</span>
            <span className="font-pixel text-amber-400">{escapeTime.toFixed(1)} giây</span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-400 font-pixel text-xs">Đánh giá kỹ năng:</span>
            <span className="text-amber-400 tracking-widest text-base">⭐⭐⭐</span>
          </div>

          {/* Coins Reward Breakdown */}
          <div className="p-2.5 bg-amber-950/30 rounded-lg border border-amber-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">💰</span>
              <div>
                <div className="font-pixel text-xs text-amber-300 font-bold">
                  TIỀN LƯƠNG & THƯỞNG:
                </div>
                <div className="text-[10px] text-slate-400 font-chibi">
                  {lootCoins > 0 ? `Lương cơ bản + ${lootCoins} Xu lượm được` : 'Lương tan ca đúng giờ'}
                </div>
              </div>
            </div>
            <div className="font-pixel text-base text-amber-300 font-bold animate-pulse">
              +{coinsEarned} Xu
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs sm:text-sm text-slate-200 font-chibi italic">
            {isAllCompleted ? (
              '🍻 Bạn đã vọt ra bãi giữ xe, nổ máy và thẳng tiến quán bia cùng bạn bè! Một buổi tối trọn vẹn không OT!'
            ) : (
              '⚡ Sếp vừa ngẩng mặt lên hỏi "Ủa đâu rồi?" thì bạn đã bấm thang máy chuồn êm đẹp!'
            )}
          </div>

          {/* Grand Champion Unlocks Box if game complete */}
          {isAllCompleted && (
            <div className="p-3 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-indigo-500/20 rounded-xl border-2 border-amber-400 text-left animate-pulse">
              <div className="font-pixel text-[11px] text-amber-300 font-bold mb-1 flex items-center gap-1.5">
                <span>👑</span>
                <span>PHẦN THƯỞNG PHÁ ĐẢO HUYỀN THOẠI:</span>
              </div>
              <div className="space-y-1 text-[11px] font-chibi text-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400">★</span>
                  <span>Đã mở khóa <b>Skin Chủ Tịch Giả Nghèo</b> (Suit hoàng kim dát vàng)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400">★</span>
                  <span>Đã mở khóa <b>Vương Miện Trốn OT Mạ Vàng</b> trong Tủ Đồ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400">★</span>
                  <span>Đã mở khóa <b>Chế độ Làm Sếp Săn Nhân Viên</b> (Đảo ngược vai trò!)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400">★</span>
                  <span>Tặng thưởng <b>+500 Xu Vàng</b> vào ví lương</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        {isAllCompleted ? (
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {onStartBossHunt && (
                <button
                  onClick={onStartBossHunt}
                  className="py-3 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-pixel text-xs rounded-xl font-bold shadow-lg shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>👑 CHƠI LÀM SẾP SĂN NV</span>
                </button>
              )}
              {onStartNightmare && (
                <button
                  onClick={onStartNightmare}
                  className="py-3 px-3 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-pixel text-xs rounded-xl font-bold shadow-lg shadow-red-600/30 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>🔥 THỬ ÁC MỘNG TẦNG 1</span>
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onGoToMenu}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-pixel text-xs rounded-xl border border-amber-500/40 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>VỀ MENU CHÍNH</span>
              </button>
              <button
                onClick={onReplay}
                className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-slate-400 font-pixel text-xs rounded-xl border border-slate-800 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Chơi lại</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onNextFloor}
              className="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-pixel text-xs rounded-xl font-bold shadow-lg shadow-emerald-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>XUỐNG TẦNG TIẾP THEO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onReplay}
              className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-pixel text-xs rounded-xl border border-slate-700 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
    { id: 'ceo_gold', name: 'Chủ Tịch Giả Nghèo', desc: 'Suit hoàng kim dát vàng, bước đi tiền rơi lấp lánh (Mở khi thắng Ải 8)', icon: '👑' }
  ];

  const accessories: { id: Accessory; name: string; icon: string }[] = [
    { id: 'none', name: 'Không có', icon: '❌' },
    { id: 'box_hat', name: 'Mũ Hộp Giấy', icon: '📦' },
    { id: 'sunglasses', name: 'Kính Râm Ngầu', icon: '🕶️' },
    { id: 'ninja_band', name: 'Băng Đô Đỏ', icon: '🧣' },
    { id: 'golden_crown', name: 'Vương Miện Vàng', icon: '👑' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="pixel-box bg-slate-900 border-2 border-indigo-500 max-w-md w-full p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" />
            <h3 className="font-pixel text-xs sm:text-sm text-indigo-300">
              TỦ ĐỒ & TÙY BIẾN CHIBI
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-pixel text-xs"
          >
            ✕
          </button>
        </div>

        {/* Skins list */}
        <div className="mt-4">
          <div className="text-[11px] font-pixel text-slate-400 mb-2">CHỌN NHÂN VẬT:</div>
          <div className="grid grid-cols-2 gap-2">
            {skins.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectSkin(s.id)}
                className={`p-2.5 rounded-xl border text-left transition-all active:scale-95 cursor-pointer ${
                  currentSkin === s.id
                    ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <div className="font-pixel text-[11px] font-bold text-slate-200">{s.name}</div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-chibi mt-1 line-clamp-1">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Accessories list */}
        <div className="mt-4">
          <div className="text-[11px] font-pixel text-slate-400 mb-2">PHỤ KIỆN TRANG TRÍ:</div>
          <div className="grid grid-cols-2 gap-2">
            {accessories.map((a) => (
              <button
                key={a.id}
                onClick={() => onSelectAccessory(a.id)}
                className={`p-2 rounded-xl border flex items-center gap-2 text-xs transition-all active:scale-95 cursor-pointer ${
                  currentAccessory === a.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-lg">{a.icon}</span>
                <span className="font-pixel text-[10px]">{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-pixel text-xs rounded-xl font-bold transition-all cursor-pointer"
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
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="pixel-box bg-slate-900 border-2 border-sky-500 max-w-lg w-full p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-400" />
            <h3 className="font-pixel text-xs sm:text-sm text-sky-300">
              BÍ KÍP TRỐN SẾP 17:30
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-pixel text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="my-4 space-y-3 text-xs sm:text-sm text-slate-300 font-chibi">
          <div className="flex items-start gap-3 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-lg">🕹️</span>
            <div>
              <div className="font-bold text-amber-300 font-pixel text-[10px] mb-0.5">ĐIỀU KHIỂN:</div>
              <p>Dùng <b>W, A, S, D</b> hoặc <b>Phím Mũi Tên</b> (hoặc Cần gạt cảm ứng trên Điện thoại) để di chuyển.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-lg">⚡</span>
            <div>
              <div className="font-bold text-amber-300 font-pixel text-[10px] mb-0.5">TĂNG TỐC THOÁT THÂN (3 GIÂY):</div>
              <p>Nhấn <b>Shift</b> hoặc nút <b>[CHẠY]</b> để bứt tốc cực mạnh trong 3 giây (kể cả khi đang bị dí)! Sau 3 giây sẽ khóa hồi chiêu 5 giây.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-lg">🚨</span>
            <div>
              <div className="font-bold text-red-400 font-pixel text-[10px] mb-0.5">KỸ NĂNG SẾP & GIỜ GIỚI NGHIÊM:</div>
              <p>Định kỳ sếp sẽ bật <b>KỸ NĂNG QUÉT TỐC ĐỘ CAO</b> (góc nhìn rộng gấp đôi). Hãy nhanh chóng nấp vào thùng giấy! Nhớ trốn về trước khi hết đồng hồ đếm ngược.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-lg">📦</span>
            <div>
              <div className="font-bold text-amber-400 font-pixel text-[10px] mb-0.5">ẨN NẤP (PHÍM E):</div>
              <p>Đến gần Thùng Giấy, Chậu Cây hoặc Gầm Bàn rồi nhấn <b>E</b> để chui vào trốn. Sếp đi qua sẽ không thấy bạn!</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-lg">🥤</span>
            <div>
              <div className="font-bold text-sky-400 font-pixel text-[10px] mb-0.5">ĐÁNH LẠC HƯỚNG (PHÍM Q):</div>
              <p>Nhấn <b>Q</b> để ném cốc giấy / lon nước ra xa. Tiếng động phát ra sẽ dụ sếp đi lại kiểm tra vị trí đó!</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-lg">🔑</span>
            <div>
              <div className="font-bold text-purple-400 font-pixel text-[10px] mb-0.5">MỤC TIÊU & VẬT PHẨM MỞ CỬA:</div>
              <p>Xem danh sách <b>[📋 ĐỒ CẦN TÌM]</b> ở thanh trên. Khi nhặt đủ Thẻ/Chìa, mũi tên xanh sẽ dẫn đường ra Cửa Thoát Hiểm!</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-pixel text-xs rounded-xl font-bold transition-all cursor-pointer"
        >
          ĐÃ HIỂU, CHO TÔI VỀ!
        </button>
      </div>
    </div>
  );
};
