import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

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

// Collection of curated public Lottie sticker animation URLs
const LOTTIE_STICKER_MAP: Record<LottieStickerName, string> = {
  coin: 'https://assets2.lottiefiles.com/packages/lf20_vniks1e8.json', // Spinning Golden Coin
  wheel: 'https://assets7.lottiefiles.com/packages/lf20_kx2gij95.json', // Lucky Wheel / Gift
  trophy: 'https://assets4.lottiefiles.com/packages/lf20_tou29f.json', // Golden Trophy
  runner: 'https://assets8.lottiefiles.com/packages/lf20_2glq3x.json', // Running character
  hiding: 'https://assets9.lottiefiles.com/packages/lf20_3rw32.json', // Hiding box / mystery
  search: 'https://assets10.lottiefiles.com/packages/lf20_w51p28.json', // Magnifying glass search
  exit: 'https://assets1.lottiefiles.com/packages/lf20_96bov9a8.json', // Door Exit / Gate
  flame: 'https://assets5.lottiefiles.com/packages/lf20_y4nndpdr.json', // Fire / Nightmare
  clock: 'https://assets5.lottiefiles.com/packages/lf20_v443aw5p.json', // Clock countdown
  alert: 'https://assets2.lottiefiles.com/packages/lf20_ll4854y1.json', // Alert exclamation
  shop: 'https://assets3.lottiefiles.com/packages/lf20_ygiq3f.json', // Shopping bag
  wardrobe: 'https://assets1.lottiefiles.com/packages/lf20_42chgsp4.json', // Shirt / Outfit
  help: 'https://assets4.lottiefiles.com/packages/lf20_2cwls6m1.json', // Question mark help
  heart: 'https://assets9.lottiefiles.com/packages/lf20_k2397ksp.json', // Animated Heart
  crown: 'https://assets9.lottiefiles.com/packages/lf20_m6482i00.json', // Crown / Leader
  gift: 'https://assets7.lottiefiles.com/packages/lf20_kx2gij95.json' // Gift box
};

// Fallback emoji stickers if Lottie animation is loading or offline
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
  const src = LOTTIE_STICKER_MAP[name];
  const sizePx = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: sizePx, height: sizePx }}
    >
      <Player
        autoplay={autoplay}
        loop={loop}
        src={src}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Render Emoji Fallback if player is loading or offline */}
        <div className="w-full h-full flex items-center justify-center text-sm">
          {EMOJI_FALLBACK_MAP[name]}
        </div>
      </Player>
    </div>
  );
};
