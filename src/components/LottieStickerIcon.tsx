import React, { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

export type LottieStickerName =
  | 'coin'
  | 'wheel'
  | 'trophy'
  | 'runner'
  | 'hiding'
  | 'search'
  | 'exit'
  | 'flame'
  | 'clock'
  | 'alert'
  | 'shop'
  | 'wardrobe'
  | 'help'
  | 'heart'
  | 'crown'
  | 'gift';

interface LottieStickerProps {
  name: LottieStickerName;
  size?: number | string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LOTTIE_STICKER_MAP: Record<LottieStickerName, string> = {
  coin: 'https://assets2.lottiefiles.com/packages/lf20_vniks1e8.json',
  wheel: 'https://assets7.lottiefiles.com/packages/lf20_kx2gij95.json',
  trophy: 'https://assets4.lottiefiles.com/packages/lf20_tou29f.json',
  runner: 'https://assets8.lottiefiles.com/packages/lf20_2glq3x.json',
  hiding: 'https://assets9.lottiefiles.com/packages/lf20_3rw32.json',
  search: 'https://assets10.lottiefiles.com/packages/lf20_w51p28.json',
  exit: 'https://assets1.lottiefiles.com/packages/lf20_96bov9a8.json',
  flame: 'https://assets5.lottiefiles.com/packages/lf20_y4nndpdr.json',
  clock: 'https://assets5.lottiefiles.com/packages/lf20_v443aw5p.json',
  alert: 'https://assets2.lottiefiles.com/packages/lf20_ll4854y1.json',
  shop: 'https://assets3.lottiefiles.com/packages/lf20_ygiq3f.json',
  wardrobe: 'https://assets1.lottiefiles.com/packages/lf20_42chgsp4.json',
  help: 'https://assets4.lottiefiles.com/packages/lf20_2cwls6m1.json',
  heart: 'https://assets9.lottiefiles.com/packages/lf20_k2397ksp.json',
  crown: 'https://assets9.lottiefiles.com/packages/lf20_m6482i00.json',
  gift: 'https://assets7.lottiefiles.com/packages/lf20_kx2gij95.json'
};

const EMOJI_FALLBACK_MAP: Record<LottieStickerName, string> = {
  coin: '💰',
  wheel: '🎡',
  trophy: '🏆',
  runner: '👣',
  hiding: '🧰',
  search: '🔍',
  exit: '🏃',
  flame: '🔥',
  clock: '🕒',
  alert: '🚨',
  shop: '🛒',
  wardrobe: '👔',
  help: '❓',
  heart: '❤️',
  crown: '👑',
  gift: '🎁'
};

export const LottieStickerIcon: React.FC<LottieStickerProps> = ({
  name,
  size = 28,
  className = '',
  loop = true,
  autoplay = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const src = LOTTIE_STICKER_MAP[name];
  const sizePx = typeof size === 'number' ? `${size}px` : size;

  useEffect(() => {
    if (!containerRef.current) return;

    let animItem: AnimationItem | null = null;
    try {
      animItem = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop,
        autoplay,
        path: src
      });

      animItem.addEventListener('data_failed', () => {
        setHasError(true);
      });
    } catch {
      setHasError(true);
    }

    return () => {
      animItem?.destroy();
    };
  }, [src, loop, autoplay]);

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 overflow-hidden ${className}`}
      style={{ width: sizePx, height: sizePx }}
    >
      {hasError ? (
        <span className="text-sm select-none">{EMOJI_FALLBACK_MAP[name]}</span>
      ) : (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center pointer-events-none" />
      )}
    </div>
  );
};
