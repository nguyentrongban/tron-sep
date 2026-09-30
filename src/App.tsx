/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { GameMode, GameStatus, CharacterSkin, Accessory, FloorLevel, Player, Vector2D } from './types/game';
import { STORY_LEVELS, TUTORIAL_LEVEL, generateEndlessFloor } from './utils/levels';
import { soundManager } from './utils/audio';
import { loadGameSaveData, saveGameSaveData, GameSaveData } from './utils/progression';
import { MainMenu } from './components/MainMenu';
import { OfficeGameCanvas } from './components/OfficeGameCanvas';
import { GameHUD } from './components/GameHUD';
import { MobileControls } from './components/MobileControls';
import { IntroModal, CaughtModal, VictoryModal, WardrobeModal, HelpModal, PauseModal } from './components/Modals';
import { ShopModal, MissionsModal } from './components/ShopAndMissionsModal';
import { LuckyWheelModal } from './components/LuckyWheelModal';
import { HallOfFameModal } from './components/HallOfFameModal';
import { toggleFullscreen } from './utils/fullscreen';
import { BossHuntCanvas } from './components/BossHuntCanvas';

export default function App() {
  const [saveData, setSaveData] = useState<GameSaveData>(() => loadGameSaveData());
  const [status, setStatus] = useState<GameStatus | 'intro_dialogue' | 'game_complete'>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('story');
  const [currentFloorIndex, setCurrentFloorIndex] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<FloorLevel>(STORY_LEVELS[0]);

  // Player customizations
  const [playerSkin, setPlayerSkin] = useState<CharacterSkin>('coder');
  const [playerAccessory, setPlayerAccessory] = useState<Accessory>('none');

  // Game live states
  const [playerState, setPlayerState] = useState<Player | null>(null);
  const [alertLevel, setAlertLevel] = useState<number>(0);
  const [isNearHidingSpot, setIsNearHidingSpot] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Time & Reward tracking
  const [escapeTime, setEscapeTime] = useState<number>(0);
  const [gameTimeSeconds, setGameTimeSeconds] = useState<number>(0);
  const [floorCoinsEarned, setFloorCoinsEarned] = useState<number>(0);
  const [floorLootCoins, setFloorLootCoins] = useState<number>(0);

  // Modals & popups
  const [showWardrobe, setShowWardrobe] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showShop, setShowShop] = useState<boolean>(false);
  const [showMissions, setShowMissions] = useState<boolean>(false);
  const [showLuckyWheel, setShowLuckyWheel] = useState<boolean>(false);
  const [showHallOfFame, setShowHallOfFame] = useState<boolean>(false);
  const [bossHuntCatchSignal, setBossHuntCatchSignal] = useState<number>(0);

  // Mobile virtual controls
  const [mobileMoveVector, setMobileMoveVector] = useState<Vector2D>({ x: 0, y: 0 });
  const [mobileSneak, setMobileSneak] = useState<boolean>(false);
  const [mobileSprintSignal, setMobileSprintSignal] = useState<number>(0);
  const [throwSignal, setThrowSignal] = useState<number>(0);
  const [hideSignal, setHideSignal] = useState<number>(0);

  // Boss skill & escape timer live states
  const [isBossSkillActive, setIsBossSkillActive] = useState<boolean>(false);
  const [bossSkillDuration, setBossSkillDuration] = useState<number>(0);
  const [bossSkillNextInSeconds, setBossSkillNextInSeconds] = useState<number>(45);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);

  // Synchronize save data to localStorage
  const updateSaveData = useCallback((updater: (prev: GameSaveData) => GameSaveData) => {
    setSaveData((prev) => {
      const next = updater(prev);
      saveGameSaveData(next);
      return next;
    });
  }, []);

  // Timer tick
  useEffect(() => {
    let timer: number;
    if (status === 'playing' && !isPaused) {
      timer = window.setInterval(() => {
        setGameTimeSeconds((prev) => prev + 0.25);
      }, 250);
    }
    return () => clearInterval(timer);
  }, [status, isPaused]);

  // Audio mute toggle
  const handleToggleMute = () => {
    const nextMute = soundManager.toggleMute();
    setIsMuted(nextMute);
  };

  // Start Tutorial mode
  const handleStartTutorial = () => {
    setGameMode('tutorial');
    setCurrentFloorIndex(0);
    setCurrentLevel(TUTORIAL_LEVEL);
    setStatus('intro_dialogue');
    setGameTimeSeconds(0);
    setFloorLootCoins(0);
    setIsPaused(false);
  };

  // Start story mode from chosen floor
  const handleStartStory = (floorId: number) => {
    const idx = Math.max(0, Math.min(STORY_LEVELS.length - 1, floorId - 1));
    setGameMode('story');
    setCurrentFloorIndex(idx);
    setCurrentLevel(JSON.parse(JSON.stringify(STORY_LEVELS[idx])));
    setStatus('intro_dialogue');
    setGameTimeSeconds(0);
    setFloorLootCoins(0);
    setIsPaused(false);
  };

  // Start Nightmare mode (dark office, faster bosses, 3x coin loot)
  const handleStartNightmare = (floorId: number) => {
    const idx = Math.max(0, Math.min(STORY_LEVELS.length - 1, floorId - 1));
    setGameMode('nightmare');
    setCurrentFloorIndex(idx);
    setCurrentLevel(JSON.parse(JSON.stringify(STORY_LEVELS[idx])));
    setStatus('intro_dialogue');
    setGameTimeSeconds(0);
    setFloorLootCoins(0);
    setIsPaused(false);
  };

  // Start endless mode
  const handleStartEndless = () => {
    setGameMode('endless');
    setCurrentFloorIndex(1);
    setCurrentLevel(generateEndlessFloor(1));
    setStatus('intro_dialogue');
    setGameTimeSeconds(0);
    setFloorLootCoins(0);
    setIsPaused(false);
  };

  // After intro dialog is confirmed, start playing
  const handleConfirmStart = () => {
    setStatus('playing');
    soundManager.startBGM(false);
  };

  // Start Boss Hunt Mode (Reverse Role)
  const handleStartBossHunt = () => {
    setGameMode('boss_hunt');
    setStatus('playing');
    setIsPaused(false);
    soundManager.startBGM(false);
  };

  // Boss Hunt Mode Victory
  const handleBossHuntVictory = (rewardCoins: number) => {
    updateSaveData((prev) => ({
      ...prev,
      coins: prev.coins + rewardCoins,
      achievements: prev.achievements.map((a) => (a.id === 'boss_hunt_master' ? { ...a, isCompleted: true } : a))
    }));
    soundManager.stopBGM();
    setStatus('menu');
  };

  const handleBossHuntDefeat = () => {
    soundManager.stopBGM();
    setStatus('menu');
  };

  // Live item coin collection
  const handleCollectCoin = (amount: number) => {
    setFloorLootCoins((prev) => prev + amount);
  };

  // Progress mission
  const handleMissionProgress = useCallback((missionId: string, amount: number) => {
    updateSaveData((prev) => {
      const updatedMissions = prev.dailyMissions.map((m) => {
        if (m.id === missionId && !m.isCompleted) {
          const nextProg = Math.min(m.maxProgress, m.progress + amount);
          return {
            ...m,
            progress: nextProg,
            isCompleted: nextProg >= m.maxProgress
          };
        }
        return m;
      });
      return { ...prev, dailyMissions: updatedMissions };
    });
  }, [updateSaveData]);

  // Claim completed daily mission
  const handleClaimMission = (missionId: string) => {
    updateSaveData((prev) => {
      let reward = 0;
      const updatedMissions = prev.dailyMissions.map((m) => {
        if (m.id === missionId && m.isCompleted && !m.isClaimed) {
          reward = m.rewardCoins;
          return { ...m, isClaimed: true };
        }
        return m;
      });
      soundManager.playPickup();
      return {
        ...prev,
        coins: prev.coins + reward,
        dailyMissions: updatedMissions
      };
    });
  };

  // Buy skill upgrade in Shop
  const handleBuyUpgrade = (key: keyof GameSaveData['upgrades'], cost: number) => {
    if (saveData.coins < cost) return;
    updateSaveData((prev) => ({
      ...prev,
      coins: prev.coins - cost,
      upgrades: {
        ...prev.upgrades,
        [key]: prev.upgrades[key] + 1
      }
    }));
    soundManager.playPickup();
  };

  // Buy Skin in Shop
  const handleBuySkin = (skin: CharacterSkin, cost: number) => {
    if (saveData.coins < cost) return;
    updateSaveData((prev) => ({
      ...prev,
      coins: prev.coins - cost,
      unlockedSkins: [...prev.unlockedSkins, skin]
    }));
    setPlayerSkin(skin);
    soundManager.playPickup();
  };

  // Buy Accessory in Shop
  const handleBuyAccessory = (acc: Accessory, cost: number) => {
    if (saveData.coins < cost) return;
    updateSaveData((prev) => ({
      ...prev,
      coins: prev.coins - cost,
      unlockedAccessories: [...prev.unlockedAccessories, acc]
    }));
    setPlayerAccessory(acc);
    soundManager.playPickup();
  };

  // Floor victory triggered by canvas
  const handleFloorVictory = useCallback((timeTaken: number) => {
    setEscapeTime(timeTaken);

    // Calculate coin reward
    const isNightmare = gameMode === 'nightmare';
    const isLastFloor = currentFloorIndex >= STORY_LEVELS.length - 1;
    const baseWage = isNightmare ? 180 : 60;
    const speedBonus = timeTaken < 25 ? (isNightmare ? 75 : 25) : 0;
    const stealthBonus = alertLevel < 20 ? (isNightmare ? 75 : 25) : 0;
    const calculatedLoot = isNightmare ? floorLootCoins * 3 : floorLootCoins;
    const grandClearBonus = (gameMode === 'story' && isLastFloor) ? 500 : 0;
    const totalAwarded = baseWage + speedBonus + stealthBonus + calculatedLoot + grandClearBonus;

    setFloorCoinsEarned(totalAwarded);

    // Update player progression & achievements
    updateSaveData((prev) => {
      const nextCoins = prev.coins + totalAwarded;
      const nextEscapes = prev.totalEscapes + 1;
      const hasWonCampaign = (gameMode === 'story' && isLastFloor) || Boolean(prev.hasBeatenGame);

      // Unlock secret skins and accessories when beating 8 floors!
      const newSkins = [...prev.unlockedSkins];
      if (hasWonCampaign && !newSkins.includes('ceo_gold')) {
        newSkins.push('ceo_gold');
      }

      const newAccessories = [...prev.unlockedAccessories];
      if (hasWonCampaign && !newAccessories.includes('golden_crown')) {
        newAccessories.push('golden_crown');
      }

      // Check achievements
      const updatedAchievements = prev.achievements.map((ach) => {
        if (!ach.isCompleted) {
          if (ach.id === 'first_escape') return { ...ach, isCompleted: true };
          if (ach.id === 'speedrunner_1730' && timeTaken < 20) return { ...ach, isCompleted: true };
          if (ach.id === 'stealth_master' && alertLevel < 15) return { ...ach, isCompleted: true };
          if (ach.id === 'rich_employee' && nextCoins >= 1000) return { ...ach, isCompleted: true };
          if (ach.id === 'beat_all_8_floors' && hasWonCampaign) return { ...ach, isCompleted: true };
        }
        return ach;
      });

      // Unlock next level in campaign!
      const clearedFloorNum = currentFloorIndex + 1;
      const nextMaxUnlocked = Math.max(prev.maxLevelUnlocked || 1, Math.min(8, clearedFloorNum + 1));

      return {
        ...prev,
        coins: nextCoins,
        totalEscapes: nextEscapes,
        maxLevelUnlocked: nextMaxUnlocked,
        hasCompletedTutorial: gameMode === 'tutorial' ? true : prev.hasCompletedTutorial,
        hasBeatenGame: hasWonCampaign,
        unlockedSkins: newSkins,
        unlockedAccessories: newAccessories,
        achievements: updatedAchievements
      };
    });

    if (gameMode === 'story' || gameMode === 'nightmare') {
      setStatus(isLastFloor ? 'game_complete' : 'floor_cleared');
    } else if (gameMode === 'tutorial') {
      setStatus('floor_cleared');
    } else {
      // Endless mode record
      const nextFloor = currentFloorIndex + 1;
      if (nextFloor > saveData.highScoreEndless) {
        updateSaveData((prev) => ({ ...prev, highScoreEndless: nextFloor }));
      }
      setStatus('floor_cleared');
    }
    soundManager.stopBGM();
  }, [gameMode, currentFloorIndex, alertLevel, floorLootCoins, saveData.highScoreEndless, updateSaveData]);

  // Caught by boss triggered by canvas
  const handlePlayerCaught = useCallback(() => {
    setStatus('caught');
    soundManager.stopBGM();
  }, []);

  // Next floor after victory
  const handleNextFloor = () => {
    setFloorLootCoins(0);
    if (gameMode === 'story' || gameMode === 'nightmare') {
      const nextIdx = currentFloorIndex + 1;
      if (nextIdx < STORY_LEVELS.length) {
        setCurrentFloorIndex(nextIdx);
        setCurrentLevel(JSON.parse(JSON.stringify(STORY_LEVELS[nextIdx])));
        setStatus('intro_dialogue');
        setGameTimeSeconds(0);
      } else {
        setStatus('game_complete');
      }
    } else if (gameMode === 'tutorial') {
      // Finished tutorial, invite to play Story Floor 1!
      handleStartStory(1);
    } else {
      const nextFloor = currentFloorIndex + 1;
      setCurrentFloorIndex(nextFloor);
      setCurrentLevel(generateEndlessFloor(nextFloor));
      setStatus('intro_dialogue');
      setGameTimeSeconds(0);
    }
  };

  // Replay current floor
  const handleReplayFloor = () => {
    setIsPaused(false);
    setFloorLootCoins(0);
    if (gameMode === 'story' || gameMode === 'nightmare') {
      setCurrentLevel(JSON.parse(JSON.stringify(STORY_LEVELS[currentFloorIndex])));
    } else if (gameMode === 'tutorial') {
      setCurrentLevel(JSON.parse(JSON.stringify(TUTORIAL_LEVEL)));
    } else {
      setCurrentLevel(generateEndlessFloor(currentFloorIndex));
    }
    setStatus('playing');
    setGameTimeSeconds(0);
    soundManager.startBGM(false);
  };

  // Return to main menu
  const handleGoToMenu = () => {
    setIsPaused(false);
    setStatus('menu');
    soundManager.stopBGM();
  };

  // Unclaimed missions count
  const unclaimedCount = saveData.dailyMissions.filter((m) => m.isCompleted && !m.isClaimed).length;

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-slate-950 text-slate-100 select-none touch-none">
      {/* Mobile Portrait Rotation Prompt for Fullscreen Landscape */}
      <div className="md:hidden portrait:flex hidden fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex-col items-center justify-center p-6 text-center">
        <div className="animate-bounce mb-4 text-4xl">📱 🔄</div>
        <h3 className="font-pixel text-amber-300 text-base mb-2">VUI LÒNG XOAY NGANG MÀN HÌNH</h3>
        <p className="text-slate-300 font-pixel text-xs max-w-xs leading-relaxed mb-4">
          Game "Trốn Sếp Tan Ca" chuẩn Fullscreen Landscape. Hãy xoay ngang thiết bị để trải nghiệm toàn màn hình lấp đầy 100%!
        </p>
        <button
          onClick={toggleFullscreen}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-pixel text-xs rounded-xl font-bold active:scale-95 shadow-lg cursor-pointer"
        >
          📱 MỞ TOÀN MÀN HÌNH
        </button>
      </div>
      {/* 1. Main Menu Screen */}
      {status === 'menu' && (
        <MainMenu
          onStartStory={handleStartStory}
          onStartEndless={handleStartEndless}
          onStartTutorial={handleStartTutorial}
          onStartNightmare={handleStartNightmare}
          onStartBossHunt={handleStartBossHunt}
          onOpenShop={() => setShowShop(true)}
          onOpenMissions={() => setShowMissions(true)}
          onOpenWardrobe={() => setShowWardrobe(true)}
          onOpenHelp={() => setShowHelp(true)}
          onOpenLuckyWheel={() => setShowLuckyWheel(true)}
          onOpenHallOfFame={() => setShowHallOfFame(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          currentSkin={playerSkin}
          currentAccessory={playerAccessory}
          highScoreEndless={saveData.highScoreEndless}
          coins={saveData.coins}
          hasBeatenGame={saveData.unlockedSkins.includes('ceo_gold') || saveData.totalEscapes >= 8}
          unclaimedMissionsCount={unclaimedCount}
          maxLevelUnlocked={saveData.maxLevelUnlocked || 1}
        />
      )}

      {/* 2. REVERSE ROLE: BOSS HUNT MODE */}
      {gameMode === 'boss_hunt' && status === 'playing' && (
        <BossHuntCanvas
          onVictory={handleBossHuntVictory}
          onDefeat={handleBossHuntDefeat}
          onExit={() => setStatus('menu')}
          mobileMoveVector={mobileMoveVector}
          catchSignal={bossHuntCatchSignal}
        />
      )}

      {/* 3. Live Game Screen (Story / Endless / Tutorial Canvas + HUD + Touch Controls) */}
      {gameMode !== 'boss_hunt' && (status === 'playing' || status === 'paused' || status === 'intro_dialogue' || status === 'caught' || status === 'floor_cleared' || status === 'game_complete') && (
        <div className="relative w-full h-full flex flex-col">
          {/* Main Canvas Viewport */}
          <div className="relative flex-1 w-full h-full">
            <OfficeGameCanvas
              key={`level_${currentLevel.id}_${gameMode}_${gameTimeSeconds === 0 ? 'fresh' : 'active'}`}
              level={currentLevel}
              gameMode={gameMode}
              playerSkin={playerSkin}
              playerAccessory={playerAccessory}
              upgrades={saveData.upgrades}
              isPaused={isPaused || status !== 'playing'}
              onFloorVictory={handleFloorVictory}
              onPlayerCaught={handlePlayerCaught}
              onAlertChange={setAlertLevel}
              onPlayerUpdate={setPlayerState}
              onCollectCoin={handleCollectCoin}
              onMissionProgress={handleMissionProgress}
              onBossSkillUpdate={(active, duration, nextInSec) => {
                setIsBossSkillActive(active);
                setBossSkillDuration(duration);
                setBossSkillNextInSeconds(nextInSec);
              }}
              onTimeRemainingUpdate={setTimeRemaining}
              mobileMoveVector={mobileMoveVector}
              mobileSneak={mobileSneak}
              mobileSprintSignal={mobileSprintSignal}
              throwSignal={throwSignal}
              hideSignal={hideSignal}
              onNearHidingSpotChange={setIsNearHidingSpot}
            />

            {/* HUD Overlay */}
            {playerState && (
              <GameHUD
                player={playerState}
                level={currentLevel}
                maxAlert={alertLevel}
                gameTimeSeconds={gameTimeSeconds}
                timeRemaining={timeRemaining}
                isBossSkillActive={isBossSkillActive}
                bossSkillDuration={bossSkillDuration}
                bossSkillNextInSeconds={bossSkillNextInSeconds}
                isMuted={isMuted}
                isPaused={isPaused}
                onToggleMute={handleToggleMute}
                onTogglePause={() => setIsPaused(!isPaused)}
                onOpenHelp={() => setShowHelp(true)}
                onThrowDistraction={() => setThrowSignal((prev) => prev + 1)}
                onToggleHide={() => setHideSignal((prev) => prev + 1)}
                onTriggerSprint={() => setMobileSprintSignal((prev) => prev + 1)}
                onSkipTutorial={currentLevel.isTutorial ? () => handleStartStory(1) : undefined}
                isNearHidingSpot={isNearHidingSpot}
              />
            )}

            {/* Mobile Touch Controls */}
            {status === 'playing' && (
              <MobileControls
                onMoveChange={setMobileMoveVector}
                onSneakToggle={setMobileSneak}
                onSprintTrigger={() => setMobileSprintSignal((prev) => prev + 1)}
                sprintDuration={playerState?.sprintDuration || 0}
                sprintCooldown={playerState?.sprintCooldown || 0}
                isSprinting={playerState?.isSprinting || false}
                isSprintOnCooldown={playerState?.isSprintOnCooldown || false}
                onThrowDistraction={() => setThrowSignal((prev) => prev + 1)}
                onToggleHide={() => setHideSignal((prev) => prev + 1)}
                isNearHidingSpot={isNearHidingSpot}
                isHiding={playerState?.isHiding || false}
                distractionsCount={playerState?.inventory.distractionsCount || 0}
              />
            )}
          </div>
        </div>
      )}

      {/* 4. Intro Mission Dialogue Modal */}
      {status === 'intro_dialogue' && (
        <IntroModal level={currentLevel} onStart={handleConfirmStart} />
      )}

      {/* 5. Caught / OT Game Over Modal */}
      {status === 'caught' && (
        <CaughtModal
          level={currentLevel}
          onRetry={handleReplayFloor}
          onGoToMenu={handleGoToMenu}
        />
      )}

      {/* 6. Floor Victory or Game Complete Modal */}
      {(status === 'floor_cleared' || status === 'game_complete') && (
        <VictoryModal
          level={currentLevel}
          escapeTime={escapeTime}
          isAllCompleted={status === 'game_complete'}
          coinsEarned={floorCoinsEarned}
          lootCoins={floorLootCoins}
          onNextFloor={handleNextFloor}
          onReplay={handleReplayFloor}
          onGoToMenu={handleGoToMenu}
          onStartBossHunt={handleStartBossHunt}
          onStartNightmare={() => handleStartNightmare(1)}
        />
      )}

      {/* 7. Lucky Wheel Modal */}
      {showLuckyWheel && (
        <LuckyWheelModal
          coins={saveData.coins}
          onRewardCoins={(amount) => updateSaveData((prev) => ({ ...prev, coins: prev.coins + amount }))}
          onClose={() => setShowLuckyWheel(false)}
        />
      )}

      {/* 8. Hall of Fame Modal */}
      {showHallOfFame && (
        <HallOfFameModal
          totalEscapes={saveData.totalEscapes}
          highScoreEndless={saveData.highScoreEndless}
          achievements={saveData.achievements}
          hasBeatenGame={saveData.unlockedSkins.includes('ceo_gold') || saveData.totalEscapes >= 8}
          onClose={() => setShowHallOfFame(false)}
        />
      )}

      {/* 9. Shop Modal */}
      {showShop && (
        <ShopModal
          coins={saveData.coins}
          upgrades={saveData.upgrades}
          unlockedSkins={saveData.unlockedSkins}
          unlockedAccessories={saveData.unlockedAccessories}
          onBuyUpgrade={handleBuyUpgrade}
          onBuySkin={handleBuySkin}
          onBuyAccessory={handleBuyAccessory}
          onClose={() => setShowShop(false)}
        />
      )}

      {/* 10. Missions & Achievements Modal */}
      {showMissions && (
        <MissionsModal
          dailyMissions={saveData.dailyMissions}
          achievements={saveData.achievements}
          onClaimMission={handleClaimMission}
          onClose={() => setShowMissions(false)}
        />
      )}

      {/* 11. Wardrobe Modal */}
      {showWardrobe && (
        <WardrobeModal
          currentSkin={playerSkin}
          currentAccessory={playerAccessory}
          onSelectSkin={setPlayerSkin}
          onSelectAccessory={setPlayerAccessory}
          onClose={() => setShowWardrobe(false)}
        />
      )}

      {/* 12. How-To-Play Guide Modal */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {/* 13. Pause Menu Overlay */}
      {status === 'playing' && isPaused && (
        <PauseModal
          levelTitle={currentLevel.title}
          deptName={currentLevel.deptName}
          onResume={() => setIsPaused(false)}
          onRestart={handleReplayFloor}
          onGoToMenu={handleGoToMenu}
          onOpenHelp={() => setShowHelp(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}
    </div>
  );
}
