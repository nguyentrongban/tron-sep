import React, { useState } from 'react';
import { ShoppingBag, Zap, Shield, Eye, Target, Sparkles, Check, Lock, Trophy, Award, Gift } from 'lucide-react';
import { PlayerUpgrades, CharacterSkin, Accessory, DailyMission, AchievementItem } from '../types/game';
import { UPGRADE_CONFIG } from '../utils/progression';
import { LottieStickerIcon } from './LottieStickerIcon';

interface ShopModalProps {
  coins: number;
  upgrades: PlayerUpgrades;
  unlockedSkins: CharacterSkin[];
  unlockedAccessories: Accessory[];
  onBuyUpgrade: (upgradeKey: keyof PlayerUpgrades, cost: number) => void;
  onBuySkin: (skin: CharacterSkin, cost: number) => void;
  onBuyAccessory: (acc: Accessory, cost: number) => void;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  coins,
  upgrades,
  unlockedSkins,
  unlockedAccessories,
  onBuyUpgrade,
  onBuySkin,
  onBuyAccessory,
  onClose
}) => {
  const [tab, setTab] = useState<'skills' | 'skins'>('skills');

  const skinOffers: { id: CharacterSkin; name: string; desc: string; cost: number; icon: string }[] = [
    { id: 'coder', name: 'Nam Lập Trình', desc: 'Áo xanh hoodie, chuyên gia né bug', cost: 0, icon: '💻' },
    { id: 'designer', name: 'Vy Thiết Kế', desc: 'Tóc xanh mint, anti OT số 1', cost: 0, icon: '🎨' },
    { id: 'sales', name: 'Hoàng Chốt Đơn', desc: 'Sơ mi cà vạt, chuồn đi gặp crush', cost: 150, icon: '💼' },
    { id: 'ninja', name: 'Ninja Công Sở', desc: 'Bộ đồ tàng hình bóng đêm', cost: 300, icon: '🥷' },
    { id: 'boba_lover', name: 'Thánh Trà Sữa', desc: 'Đam mê trà sữa 70% đường hơn làm việc', cost: 350, icon: '🧋' },
    { id: 'intern_vip', name: 'Thực Tập Sinh VIP', desc: 'Chủ tịch giả vờ làm thực tập sinh', cost: 500, icon: '👑' }
  ];

  const accOffers: { id: Accessory; name: string; cost: number; icon: string }[] = [
    { id: 'none', name: 'Không có', cost: 0, icon: '❌' },
    { id: 'box_hat', name: 'Mũ Hộp Giấy', cost: 120, icon: '📦' },
    { id: 'sunglasses', name: 'Kính Râm Ngầu', cost: 150, icon: '🕶️' },
    { id: 'ninja_band', name: 'Băng Đô Đỏ', cost: 200, icon: '🧣' },
    { id: 'golden_crown', name: 'Vương Miện Hoàng Gia', cost: 450, icon: '👑' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="pixel-box bg-slate-900 border-2 border-amber-500 max-w-xl w-full p-5 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-pixel text-sm sm:text-base text-amber-300">
              SHOP KỸ NĂNG & TRANG PHỤC
            </h2>
          </div>

          {/* Current balance */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-pixel text-xs">
            <LottieStickerIcon name="coin" size={20} />
            <span>{coins} Xu</span>
          </div>
        </div>

        {/* Tab selector */}
        <div className="flex gap-2 my-3">
          <button
            onClick={() => setTab('skills')}
            className={`flex-1 py-2 rounded-xl font-pixel text-xs transition-all cursor-pointer ${
              tab === 'skills'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            ⚡ KỸ NĂNG CÔNG SỞ
          </button>
          <button
            onClick={() => setTab('skins')}
            className={`flex-1 py-2 rounded-xl font-pixel text-xs transition-all cursor-pointer ${
              tab === 'skins'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            👔 TRANG PHỤC & ĐỒ CHƠI
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
          {tab === 'skills' && (
            <>
              {/* Sneakers */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl shrink-0">
                  👟
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-xs font-bold text-slate-200">
                      {UPGRADE_CONFIG.sneakers.title}
                    </span>
                    <span className="text-[10px] font-pixel text-emerald-400">
                      Lv {upgrades.sneakersLevel}/3
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-chibi mt-0.5">
                    {upgrades.sneakersLevel < 3
                      ? UPGRADE_CONFIG.sneakers.effectTexts[upgrades.sneakersLevel]
                      : 'ĐÃ NÂNG CẤP TỐI ĐA ✓'}
                  </p>
                </div>
                {upgrades.sneakersLevel < 3 ? (
                  <button
                    onClick={() =>
                      onBuyUpgrade('sneakersLevel', UPGRADE_CONFIG.sneakers.costs[upgrades.sneakersLevel])
                    }
                    disabled={coins < UPGRADE_CONFIG.sneakers.costs[upgrades.sneakersLevel]}
                    className={`px-3 py-2 rounded-xl font-pixel text-[11px] shrink-0 transition-all cursor-pointer ${
                      coins >= UPGRADE_CONFIG.sneakers.costs[upgrades.sneakersLevel]
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {UPGRADE_CONFIG.sneakers.costs[upgrades.sneakersLevel]} Xu
                  </button>
                ) : (
                  <span className="text-emerald-400 font-pixel text-[10px]">MAX</span>
                )}
              </div>

              {/* Stamina Thermos */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
                  ⚡
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-xs font-bold text-slate-200">
                      {UPGRADE_CONFIG.stamina.title}
                    </span>
                    <span className="text-[10px] font-pixel text-amber-400">
                      Lv {upgrades.staminaLevel}/3
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-chibi mt-0.5">
                    {upgrades.staminaLevel < 3
                      ? UPGRADE_CONFIG.stamina.effectTexts[upgrades.staminaLevel]
                      : 'ĐÃ NÂNG CẤP TỐI ĐA ✓'}
                  </p>
                </div>
                {upgrades.staminaLevel < 3 ? (
                  <button
                    onClick={() =>
                      onBuyUpgrade('staminaLevel', UPGRADE_CONFIG.stamina.costs[upgrades.staminaLevel])
                    }
                    disabled={coins < UPGRADE_CONFIG.stamina.costs[upgrades.staminaLevel]}
                    className={`px-3 py-2 rounded-xl font-pixel text-[11px] shrink-0 transition-all cursor-pointer ${
                      coins >= UPGRADE_CONFIG.stamina.costs[upgrades.staminaLevel]
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {UPGRADE_CONFIG.stamina.costs[upgrades.staminaLevel]} Xu
                  </button>
                ) : (
                  <span className="text-emerald-400 font-pixel text-[10px]">MAX</span>
                )}
              </div>

              {/* Distractions Bag */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-xl shrink-0">
                  🥤
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-xs font-bold text-slate-200">
                      {UPGRADE_CONFIG.distractions.title}
                    </span>
                    <span className="text-[10px] font-pixel text-sky-400">
                      Lv {upgrades.distractionsLevel}/3
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-chibi mt-0.5">
                    {upgrades.distractionsLevel < 3
                      ? UPGRADE_CONFIG.distractions.effectTexts[upgrades.distractionsLevel]
                      : 'ĐÃ NÂNG CẤP TỐI ĐA ✓'}
                  </p>
                </div>
                {upgrades.distractionsLevel < 3 ? (
                  <button
                    onClick={() =>
                      onBuyUpgrade('distractionsLevel', UPGRADE_CONFIG.distractions.costs[upgrades.distractionsLevel])
                    }
                    disabled={coins < UPGRADE_CONFIG.distractions.costs[upgrades.distractionsLevel]}
                    className={`px-3 py-2 rounded-xl font-pixel text-[11px] shrink-0 transition-all cursor-pointer ${
                      coins >= UPGRADE_CONFIG.distractions.costs[upgrades.distractionsLevel]
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {UPGRADE_CONFIG.distractions.costs[upgrades.distractionsLevel]} Xu
                  </button>
                ) : (
                  <span className="text-emerald-400 font-pixel text-[10px]">MAX</span>
                )}
              </div>

              {/* Camo Box */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-600/20 border border-amber-600/30 flex items-center justify-center text-xl shrink-0">
                  📦
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-xs font-bold text-slate-200">
                      {UPGRADE_CONFIG.camoBox.title}
                    </span>
                    <span className="text-[10px] font-pixel text-amber-400">
                      Lv {upgrades.camoBoxLevel}/3
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-chibi mt-0.5">
                    {upgrades.camoBoxLevel < 3
                      ? UPGRADE_CONFIG.camoBox.effectTexts[upgrades.camoBoxLevel]
                      : 'ĐÃ NÂNG CẤP TỐI ĐA ✓'}
                  </p>
                </div>
                {upgrades.camoBoxLevel < 3 ? (
                  <button
                    onClick={() =>
                      onBuyUpgrade('camoBoxLevel', UPGRADE_CONFIG.camoBox.costs[upgrades.camoBoxLevel])
                    }
                    disabled={coins < UPGRADE_CONFIG.camoBox.costs[upgrades.camoBoxLevel]}
                    className={`px-3 py-2 rounded-xl font-pixel text-[11px] shrink-0 transition-all cursor-pointer ${
                      coins >= UPGRADE_CONFIG.camoBox.costs[upgrades.camoBoxLevel]
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {UPGRADE_CONFIG.camoBox.costs[upgrades.camoBoxLevel]} Xu
                  </button>
                ) : (
                  <span className="text-emerald-400 font-pixel text-[10px]">MAX</span>
                )}
              </div>

              {/* Radar */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xl shrink-0">
                  📡
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-xs font-bold text-slate-200">
                      {UPGRADE_CONFIG.radar.title}
                    </span>
                    <span className="text-[10px] font-pixel text-indigo-400">
                      Lv {upgrades.radarLevel}/1
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-chibi mt-0.5">
                    {upgrades.radarLevel < 1
                      ? UPGRADE_CONFIG.radar.effectTexts[0]
                      : 'ĐÃ MỞ KHÓA RADAR ✓'}
                  </p>
                </div>
                {upgrades.radarLevel < 1 ? (
                  <button
                    onClick={() =>
                      onBuyUpgrade('radarLevel', UPGRADE_CONFIG.radar.costs[0])
                    }
                    disabled={coins < UPGRADE_CONFIG.radar.costs[0]}
                    className={`px-3 py-2 rounded-xl font-pixel text-[11px] shrink-0 transition-all cursor-pointer ${
                      coins >= UPGRADE_CONFIG.radar.costs[0]
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {UPGRADE_CONFIG.radar.costs[0]} Xu
                  </button>
                ) : (
                  <span className="text-emerald-400 font-pixel text-[10px]">SỞ HỮU</span>
                )}
              </div>
            </>
          )}

          {tab === 'skins' && (
            <div className="space-y-4">
              {/* Character skins */}
              <div>
                <div className="text-[11px] font-pixel text-slate-400 mb-2">NHÂN VẬT ĐỘC QUYỀN:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {skinOffers.map((sk) => {
                    const isUnlocked = unlockedSkins.includes(sk.id);
                    return (
                      <div
                        key={sk.id}
                        className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{sk.icon}</span>
                          <div>
                            <div className="font-pixel text-[11px] text-slate-200">{sk.name}</div>
                            <div className="text-[10px] text-slate-400 font-chibi">{sk.desc}</div>
                          </div>
                        </div>

                        {isUnlocked ? (
                          <span className="text-[10px] font-pixel text-emerald-400">ĐÃ CÓ</span>
                        ) : (
                          <button
                            onClick={() => onBuySkin(sk.id, sk.cost)}
                            disabled={coins < sk.cost}
                            className={`px-2.5 py-1.5 rounded-lg font-pixel text-[10px] shrink-0 cursor-pointer ${
                              coins >= sk.cost
                                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            {sk.cost} Xu
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Accessories */}
              <div>
                <div className="text-[11px] font-pixel text-slate-400 mb-2">PHỤ KIỆN TRANG TRÍ:</div>
                <div className="grid grid-cols-2 gap-2">
                  {accOffers.map((ac) => {
                    const isUnlocked = unlockedAccessories.includes(ac.id);
                    return (
                      <div
                        key={ac.id}
                        className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-1.5"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg">{ac.icon}</span>
                          <span className="font-pixel text-[10px] text-slate-200 truncate">{ac.name}</span>
                        </div>
                        {isUnlocked ? (
                          <span className="text-[9px] font-pixel text-emerald-400">ĐÃ CÓ</span>
                        ) : (
                          <button
                            onClick={() => onBuyAccessory(ac.id, ac.cost)}
                            disabled={coins < ac.cost}
                            className={`px-2 py-1 rounded font-pixel text-[9px] shrink-0 cursor-pointer ${
                              coins >= ac.cost
                                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            {ac.cost} Xu
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-pixel text-xs rounded-xl transition-all cursor-pointer"
        >
          ĐÓNG SHOP
        </button>
      </div>
    </div>
  );
};

interface MissionsModalProps {
  dailyMissions: DailyMission[];
  achievements: AchievementItem[];
  onClaimMission: (id: string) => void;
  onClose: () => void;
}

export const MissionsModal: React.FC<MissionsModalProps> = ({
  dailyMissions,
  achievements,
  onClaimMission,
  onClose
}) => {
  const [tab, setTab] = useState<'daily' | 'achievements'>('daily');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="pixel-box bg-slate-900 border-2 border-amber-500 max-w-lg w-full p-5 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="font-pixel text-sm sm:text-base text-amber-300">
              NHIỆM VỤ & THÀNH TÍCH
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-pixel text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 my-3">
          <button
            onClick={() => setTab('daily')}
            className={`flex-1 py-2 rounded-xl font-pixel text-xs transition-all cursor-pointer ${
              tab === 'daily'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            📅 NHIỆM VỤ HÀNG NGÀY
          </button>
          <button
            onClick={() => setTab('achievements')}
            className={`flex-1 py-2 rounded-xl font-pixel text-xs transition-all cursor-pointer ${
              tab === 'achievements'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            🏆 CÚP & DANH HIỆU
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
          {tab === 'daily' && (
            <>
              <div className="text-[11px] text-amber-300/80 font-chibi mb-2 italic">
                * Nhiệm vụ tự động làm mới mỗi ngày lúc 00:00!
              </div>

              {dailyMissions.map((m) => (
                <div
                  key={m.id}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="font-pixel text-xs text-slate-200">{m.title}</div>
                    <div className="text-[11px] text-slate-400 font-chibi mt-0.5">{m.desc}</div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (m.progress / m.maxProgress) * 100)}%` }}
                        />
                      </div>
                      <span className="font-pixel text-[10px] text-slate-400">
                        {m.progress}/{m.maxProgress}
                      </span>
                    </div>
                  </div>

                  <div>
                    {m.isClaimed ? (
                      <span className="text-[10px] font-pixel text-slate-500">ĐÃ NHẬN</span>
                    ) : m.isCompleted ? (
                      <button
                        onClick={() => onClaimMission(m.id)}
                        className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-pixel text-[10px] font-bold rounded-xl animate-bounce shadow-lg shadow-emerald-500/20 cursor-pointer"
                      >
                        +{m.rewardCoins} Xu
                      </button>
                    ) : (
                      <span className="text-[10px] font-pixel text-amber-400/70">
                        +{m.rewardCoins} Xu
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === 'achievements' && (
            <div className="space-y-2">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    a.isCompleted
                      ? 'bg-amber-950/20 border-amber-500/40 text-slate-200'
                      : 'bg-slate-950 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="text-2xl">{a.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-xs font-bold text-amber-300">{a.title}</span>
                      {a.isCompleted && <span className="text-[10px] text-emerald-400">✓ Đạt được</span>}
                    </div>
                    <div className="text-[11px] text-slate-400 font-chibi mt-0.5">{a.desc}</div>
                  </div>
                  <div className="text-[10px] font-pixel text-amber-400">+{a.rewardCoins} Xu</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-pixel text-xs rounded-xl transition-all cursor-pointer"
        >
          QUAY LẠI
        </button>
      </div>
    </div>
  );
};
