import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, X, Gift, RefreshCw } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface LuckyWheelModalProps {
  coins: number;
  onRewardCoins: (amount: number) => void;
  onRewardBonusItems?: (type: string, count: number) => void;
  onClose: () => void;
}

interface WheelSegment {
  label: string;
  sub: string;
  color: string;
  type: 'coins' | 'item' | 'jackpot';
  value: number;
  itemType?: string;
}

export const LuckyWheelModal: React.FC<LuckyWheelModalProps> = ({
  coins,
  onRewardCoins,
  onRewardBonusItems,
  onClose
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<WheelSegment | null>(null);
  const currentRotationRef = useRef(0);

  const segments: WheelSegment[] = [
    { label: '+50 XU', sub: 'Tiền Trà Đá', color: '#0284c7', type: 'coins', value: 50 },
    { label: '+100 XU', sub: 'Tiền Ăn Trưa', color: '#16a34a', type: 'coins', value: 100 },
    { label: '3 CỐC NÉM', sub: 'Đồ Lạc Hướng', color: '#ea580c', type: 'item', value: 3, itemType: 'paper' },
    { label: '+200 XU', sub: 'Thưởng Nóng', color: '#9333ea', type: 'coins', value: 200 },
    { label: '2 CÀ PHÊ', sub: 'Tăng Tốc x2', color: '#d97706', type: 'item', value: 2, itemType: 'coffee' },
    { label: 'JACKPOT!', sub: '+500 XU VÀNG', color: '#dc2626', type: 'jackpot', value: 500 },
    { label: '+80 XU', sub: 'Phụ Cấp OT', color: '#0d9488', type: 'coins', value: 80 },
    { label: '+150 XU', sub: 'Lì Xì Tan Ca', color: '#4f46e5', type: 'coins', value: 150 }
  ];

  const spinCost = 50;
  const numSegments = segments.length;
  const segmentAngle = 360 / numSegments;

  const handleSpin = () => {
    if (isSpinning || coins < spinCost) return;

    onRewardCoins(-spinCost); // Deduct spin cost
    setIsSpinning(true);
    setWonPrize(null);
    soundManager.playCoffeeBoost();

    // Pick random target segment
    const targetIdx = Math.floor(Math.random() * numSegments);
    const extraSpins = 5 + Math.floor(Math.random() * 3); // 5 to 7 full rotations
    const targetAngle = 360 * extraSpins + (360 - (targetIdx * segmentAngle + segmentAngle / 2));
    const finalRotation = currentRotationRef.current + targetAngle;
    currentRotationRef.current = finalRotation;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = segments[targetIdx];
      setWonPrize(prize);

      if (prize.type === 'coins' || prize.type === 'jackpot') {
        onRewardCoins(prize.value);
      } else if (prize.type === 'item' && onRewardBonusItems && prize.itemType) {
        onRewardBonusItems(prize.itemType, prize.value);
      }

      soundManager.playVictory();
      confetti({
        particleCount: prize.type === 'jackpot' ? 120 : 60,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-3 select-none">
      <div className="pixel-box bg-slate-900 border-2 border-amber-500 max-w-md w-full p-2.5 sm:p-4 rounded-2xl shadow-2xl max-h-[96dvh] overflow-y-auto my-auto animate-in zoom-in-95 duration-200 flex flex-col items-center text-center justify-between">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-1.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🎡</span>
            <h3 className="font-pixel text-[11px] sm:text-xs text-amber-400">
              VÒNG QUAY PHÚC LỢI CÔNG SỞ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[10px] sm:text-xs text-slate-300 font-chibi my-1 shrink-0">
          Dùng Xu thưởng để quay may mắn: Trúng tiền thưởng, cà phê tăng tốc hoặc Jackpot 500 Xu!
        </p>

        {/* Wheel Graphic Container */}
        <div className="relative my-2 flex items-center justify-center shrink-0">
          {/* Top Indicator Arrow */}
          <div className="absolute -top-2.5 z-20 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-amber-400 drop-shadow-[0_2px_6px_rgba(245,158,11,0.8)]" />

          {/* Rotating Wheel */}
          <div
            className="w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 rounded-full border-4 border-amber-400 shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
            style={{
              transform: `rotate(${rotation}deg)`
            }}
          >
            {segments.map((seg, i) => {
              const rotate = i * segmentAngle;
              return (
                <div
                  key={i}
                  className="absolute inset-0 origin-center"
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    clipPath: 'polygon(50% 50%, 30% 0%, 70% 0%)',
                    backgroundColor: seg.color
                  }}
                >
                  <div className="pt-1.5 text-center text-white">
                    <div className="font-pixel text-[8px] sm:text-[9px] font-bold drop-shadow">
                      {seg.label}
                    </div>
                    <div className="text-[7px] sm:text-[8px] font-chibi text-amber-100 opacity-90">
                      {seg.sub}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Inner Center Hub */}
            <div className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950 border-2 border-amber-300 flex items-center justify-center shadow-inner z-10">
              <span className="text-base sm:text-lg">🎁</span>
            </div>
          </div>
        </div>

        {/* Prize Notification */}
        {wonPrize && (
          <div className="p-1.5 bg-amber-500/20 border border-amber-400 rounded-xl my-1 animate-bounce flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <div className="text-[10px] font-pixel text-amber-300">
              TRÚNG {wonPrize.label} ({wonPrize.sub})!
            </div>
          </div>
        )}

        {/* Spin Button */}
        <div className="w-full flex items-center gap-2 mt-1 shrink-0">
          <button
            onClick={handleSpin}
            disabled={isSpinning || coins < spinCost}
            className={`flex-1 py-2.5 rounded-xl font-pixel text-xs font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer ${
              isSpinning
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : coins < spinCost
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/30'
            }`}
          >
            {isSpinning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>ĐANG QUAY...</span>
              </>
            ) : (
              <>
                <span>QUAY NGAY ({spinCost} Xu)</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-1 text-[9px] text-slate-400 font-pixel shrink-0">
          Số dư: <span className="text-amber-400 font-bold">{coins} Xu</span>
        </div>
      </div>
    </div>
  );
};
