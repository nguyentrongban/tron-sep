import { PlayerUpgrades, DailyMission, AchievementItem, CharacterSkin, Accessory } from '../types/game';

const STORAGE_KEY = 'tron_sep_progression_v2';

export interface GameSaveData {
  coins: number;
  hasCompletedTutorial: boolean;
  hasBeatenGame?: boolean;
  maxLevelUnlocked?: number;
  upgrades: PlayerUpgrades;
  unlockedSkins: CharacterSkin[];
  unlockedAccessories: Accessory[];
  dailyMissionsDate: string;
  dailyMissions: DailyMission[];
  achievements: AchievementItem[];
  highScoreEndless: number;
  totalEscapes: number;
  totalCaughtTimes?: number;     // Number of times caught
  monthlySalaryVND?: number;      // Current salary this month (starts at 15,000,000 VND)
  cumulativeSalaryEarned?: number; // Total cumulative career earnings in VND
}

export const INITIAL_UPGRADES: PlayerUpgrades = {
  sneakersLevel: 0,
  staminaLevel: 0,
  distractionsLevel: 0,
  camoBoxLevel: 0,
  radarLevel: 0
};

export const UPGRADE_CONFIG = {
  sneakers: {
    title: 'Giày Thể Thao Êm Ái',
    desc: 'Tăng tốc độ rón rén và giảm bán kính tiếng ồn khi chạy',
    maxLevel: 3,
    costs: [150, 350, 750],
    effectTexts: ['+15% Tốc độ rón rén', '+30% Tốc độ rón rén & Giảm 30% tiếng chạy', '+50% Tốc độ rón rén & Chạy siêu êm']
  },
  stamina: {
    title: 'Bình Giữ Nhiệt Nước Tăng Lực',
    desc: 'Tăng lượng Thể Lực (Stamina) tối đa để chạy nước rút lâu hơn',
    maxLevel: 3,
    costs: [120, 280, 600],
    effectTexts: ['120 Thể lực tối đa', '140 Thể lực tối đa', '160 Thể lực & Hồi phục nhanh x2']
  },
  distractions: {
    title: 'Túi Cốc Giấy & Lon Rỗng',
    desc: 'Bắt đầu mỗi tầng với nhiều đồ ném đánh lạc hướng hơn',
    maxLevel: 3,
    costs: [100, 250, 500],
    effectTexts: ['Khởi đầu 4 món đồ ném', 'Khởi đầu 5 món đồ ném', 'Khởi đầu 6 món đồ ném']
  },
  camoBox: {
    title: 'Thùng Giấy Ngụy Trang Cấp Cao',
    desc: 'Sếp đi ngang qua thùng carton sẽ ít chú ý hơn, giảm 50% nghi ngờ',
    maxLevel: 3,
    costs: [180, 400, 850],
    effectTexts: ['Giảm 25% tầm nhìn sếp tới thùng', 'Giảm 50% tầm nhìn & tăng tốc chui vào', 'Tàng hình hoàn hảo trong thùng']
  },
  radar: {
    title: 'Kính Chống Ánh Nhìn Sếp (Radar)',
    desc: 'Hiển thị mũi tên cảnh báo hướng của Sếp trên màn hình',
    maxLevel: 1,
    costs: [300],
    effectTexts: ['Mở radar định vị Sếp từ xa']
  }
};

export const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'first_escape',
    title: 'Tân Binh Đào Tẩu',
    desc: 'Trốn thoát thành công tầng đầu tiên',
    icon: '🏃',
    rewardCoins: 50,
    isCompleted: false
  },
  {
    id: 'stealth_master',
    title: 'Bậc Thầy Bóng Đêm',
    desc: 'Vượt qua 1 tầng với mức cảnh giác dưới 15%',
    icon: '🥷',
    rewardCoins: 100,
    isCompleted: false
  },
  {
    id: 'box_king',
    title: 'Vua Thùng Giấy',
    desc: 'Ẩn nấp trong thùng các-tông thành công 5 lần',
    icon: '📦',
    rewardCoins: 80,
    isCompleted: false
  },
  {
    id: 'master_distractor',
    title: 'Chuyên Gia Ném Cốc',
    desc: 'Đánh lạc hướng Sếp thành công 5 lần bằng đồ ném',
    icon: '🥤',
    rewardCoins: 90,
    isCompleted: false
  },
  {
    id: 'speedrunner_1730',
    title: 'Kỷ Lục 17:30',
    desc: 'Trốn thoát một tầng trong vòng dưới 20 giây',
    icon: '⚡',
    rewardCoins: 150,
    isCompleted: false
  },
  {
    id: 'endless_floor_5',
    title: 'Cựu Binh Sinh Tồn',
    desc: 'Vượt qua Tầng 5 trong Chế độ Sinh tồn Vô tận',
    icon: '🔥',
    rewardCoins: 200,
    isCompleted: false
  },
  {
    id: 'rich_employee',
    title: 'Đại Gia Công Sở',
    desc: 'Tích lũy tổng cộng 1.000 tiền thưởng',
    icon: '💰',
    rewardCoins: 250,
    isCompleted: false
  },
  {
    id: 'beat_all_8_floors',
    title: 'Huyền Thoại Chống OT',
    desc: 'Vượt qua toàn bộ 8 Ải chiến dịch và bước ra khỏi tòa nhà',
    icon: '👑',
    rewardCoins: 500,
    isCompleted: false
  }
];

export function generateDailyMissions(): DailyMission[] {
  return [
    {
      id: 'daily_escape_3',
      title: 'Tan ca đúng giờ 2 lần',
      desc: 'Trốn thoát thành công 2 tầng bất kỳ',
      rewardCoins: 100,
      progress: 0,
      maxProgress: 2,
      isCompleted: false,
      isClaimed: false
    },
    {
      id: 'daily_throw_3',
      title: 'Trêu Sếp 3 lần',
      desc: 'Ném cốc giấy hoặc vỏ lon đánh lạc hướng 3 lần',
      rewardCoins: 80,
      progress: 0,
      maxProgress: 3,
      isCompleted: false,
      isClaimed: false
    },
    {
      id: 'daily_collect_cash',
      title: 'Săn tiền thưởng dự án',
      desc: 'Nhặt được ít nhất 2 phong bì tiền thưởng hoặc ly trà sữa',
      rewardCoins: 120,
      progress: 0,
      maxProgress: 2,
      isCompleted: false,
      isClaimed: false
    }
  ];
}

export function loadGameSaveData(): GameSaveData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data: GameSaveData = JSON.parse(raw);
      const today = new Date().toISOString().slice(0, 10);
      // Reset daily missions if day changed
      if (data.dailyMissionsDate !== today) {
        data.dailyMissionsDate = today;
        data.dailyMissions = generateDailyMissions();
      }
      if (!data.maxLevelUnlocked) {
        data.maxLevelUnlocked = 1;
      }
      if (data.totalCaughtTimes === undefined) data.totalCaughtTimes = 0;
      if (data.monthlySalaryVND === undefined) data.monthlySalaryVND = 15000000;
      if (data.cumulativeSalaryEarned === undefined) data.cumulativeSalaryEarned = 15000000;
      return data;
    }
  } catch (e) {
    console.error('Failed to load save data', e);
  }

  const today = new Date().toISOString().slice(0, 10);
  return {
    coins: 200, // Starter bonus for fun
    hasCompletedTutorial: false,
    maxLevelUnlocked: 1,
    upgrades: { ...INITIAL_UPGRADES },
    unlockedSkins: ['coder', 'designer'],
    unlockedAccessories: ['none', 'sunglasses'],
    dailyMissionsDate: today,
    dailyMissions: generateDailyMissions(),
    achievements: [...DEFAULT_ACHIEVEMENTS],
    highScoreEndless: 0,
    totalEscapes: 0,
    totalCaughtTimes: 0,
    monthlySalaryVND: 15000000,
    cumulativeSalaryEarned: 15000000
  };
}

export function saveGameSaveData(data: GameSaveData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data', e);
  }
}
