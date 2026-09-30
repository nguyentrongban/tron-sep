import React, { useRef, useEffect, useState } from 'react';
import { Vector2D } from '../types/game';
import { soundManager } from '../utils/audio';

interface EmployeeAI {
  id: string;
  name: string;
  role: string;
  skin: 'coder' | 'designer' | 'sales' | 'ninja' | 'boba_lover';
  x: number;
  y: number;
  vx: number;
  vy: number;
  facingAngle: number;
  isCaught: boolean;
  isHiding: boolean;
  caughtQuote: string;
}

interface BossHuntCanvasProps {
  onVictory: (coins: number) => void;
  onDefeat: () => void;
  onExit: () => void;
  mobileMoveVector: Vector2D;
  catchSignal: number;
}

export const BossHuntCanvas: React.FC<BossHuntCanvasProps> = ({
  onVictory,
  onDefeat,
  onExit,
  mobileMoveVector,
  catchSignal
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [caughtCount, setCaughtCount] = useState(0);
  const [lastCaughtSpeech, setLastCaughtSpeech] = useState<string | null>(null);

  const totalEmployees = 5;

  const stateRef = useRef<{
    boss: { x: number; y: number; facingAngle: number; speed: number; isDashing: boolean };
    employees: EmployeeAI[];
    particles: { x: number; y: number; vx: number; vy: number; color: string; life: number; text?: string }[];
    keysDown: Record<string, boolean>;
    frame: number;
    gameStartTime: number;
    hasEnded: boolean;
  }>({
    boss: { x: 500, y: 350, facingAngle: 0, speed: 3.6, isDashing: false },
    employees: [
      {
        id: 'emp_1',
        name: 'Nam Coder',
        role: 'Lập Trình Viên',
        skin: 'coder',
        x: 150,
        y: 150,
        vx: 0,
        vy: 0,
        facingAngle: 0,
        isCaught: false,
        isHiding: false,
        caughtQuote: 'Em còn chưa kịp commit code mà sếp!'
      },
      {
        id: 'emp_2',
        name: 'Vy Designer',
        role: 'Thiết Kế Đồ Họa',
        skin: 'designer',
        x: 850,
        y: 180,
        vx: 0,
        vy: 0,
        facingAngle: 0,
        isCaught: false,
        isHiding: false,
        caughtQuote: 'Đừng bắt em sửa logo sang màu ngũ hành nữa!'
      },
      {
        id: 'emp_3',
        name: 'Hoàng Sales',
        role: 'Chốt Đơn',
        skin: 'sales',
        x: 200,
        y: 500,
        vx: 0,
        vy: 0,
        facingAngle: 0,
        isCaught: false,
        isHiding: false,
        caughtQuote: 'Khách hẹn em ký hợp đồng ở quán ốc mà!'
      },
      {
        id: 'emp_4',
        name: 'Linh Boba',
        role: 'Nghiện Trà Sữa',
        skin: 'boba_lover',
        x: 800,
        y: 520,
        vx: 0,
        vy: 0,
        facingAngle: 0,
        isCaught: false,
        isHiding: false,
        caughtQuote: 'Ly trà sữa của em đang tan hết đá rồi!'
      },
      {
        id: 'emp_5',
        name: 'Tuấn Ninja',
        role: 'Thực Tập Sinh Thần Tốc',
        skin: 'ninja',
        x: 520,
        y: 120,
        vx: 0,
        vy: 0,
        facingAngle: 0,
        isCaught: false,
        isHiding: false,
        caughtQuote: 'Em đã nấp kỹ thế này mà vẫn bị sếp túm!'
      }
    ],
    particles: [],
    keysDown: {},
    frame: 0,
    gameStartTime: Date.now(),
    hasEnded: false
  });

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      stateRef.current.keysDown[e.code] = true;
      if (e.code === 'Space') {
        attemptCatch();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      stateRef.current.keysDown[e.code] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mobile catch signal
  useEffect(() => {
    if (catchSignal > 0) {
      attemptCatch();
    }
  }, [catchSignal]);

  const attemptCatch = () => {
    const s = stateRef.current;
    if (s.hasEnded) return;

    soundManager.playAlert();

    // Check employees near Boss
    let caughtAny = false;
    s.employees.forEach((emp) => {
      if (emp.isCaught) return;
      const dist = Math.hypot(emp.x - s.boss.x, emp.y - s.boss.y);

      // Check distance and angle in flashlight
      if (dist < 80) {
        emp.isCaught = true;
        caughtAny = true;
        setLastCaughtSpeech(`${emp.name}: "${emp.caughtQuote}"`);

        // Spawn papers particles
        for (let i = 0; i < 15; i++) {
          s.particles.push({
            x: emp.x,
            y: emp.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            color: '#facc15',
            life: 30,
            text: 'BẮT ĐƯỢC!'
          });
        }
      }
    });

    if (caughtAny) {
      soundManager.playPickup();
      const currentCaught = s.employees.filter((e) => e.isCaught).length;
      setCaughtCount(currentCaught);

      if (currentCaught >= totalEmployees && !s.hasEnded) {
        s.hasEnded = true;
        soundManager.playVictory();
        onVictory(300);
      }
    }
  };

  // Main game loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      animId = requestAnimationFrame(loop);
      const s = stateRef.current;
      s.frame++;

      // Resize
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }

      // Timer
      const elapsed = Math.floor((Date.now() - s.gameStartTime) / 1000);
      const remain = Math.max(0, 60 - elapsed);
      setTimeLeft(remain);

      if (remain === 0 && !s.hasEnded) {
        s.hasEnded = true;
        const currentCaught = s.employees.filter((e) => e.isCaught).length;
        if (currentCaught >= totalEmployees) {
          onVictory(300);
        } else {
          onDefeat();
        }
        return;
      }

      // Boss Movement
      let mx = 0;
      let my = 0;
      if (s.keysDown['ArrowUp'] || s.keysDown['KeyW']) my -= 1;
      if (s.keysDown['ArrowDown'] || s.keysDown['KeyS']) my += 1;
      if (s.keysDown['ArrowLeft'] || s.keysDown['KeyA']) my -= 1;
      if (s.keysDown['ArrowRight'] || s.keysDown['KeyD']) my += 1;

      if (Math.hypot(mobileMoveVector.x, mobileMoveVector.y) > 0.1) {
        mx = mobileMoveVector.x;
        my = mobileMoveVector.y;
      }

      const len = Math.hypot(mx, my);
      if (len > 0) {
        s.boss.facingAngle = Math.atan2(my, mx);
        s.boss.x = Math.max(40, Math.min(w - 40, s.boss.x + (mx / len) * s.boss.speed));
        s.boss.y = Math.max(40, Math.min(h - 40, s.boss.y + (my / len) * s.boss.speed));
      }

      // Employees AI (Flee from Boss & Wander)
      s.employees.forEach((emp) => {
        if (emp.isCaught) return;

        const dx = emp.x - s.boss.x;
        const dy = emp.y - s.boss.y;
        const distToBoss = Math.hypot(dx, dy);

        if (distToBoss < 180) {
          // Flee!
          const fleeAngle = Math.atan2(dy, dx);
          emp.facingAngle = fleeAngle;
          emp.x += Math.cos(fleeAngle) * 2.8;
          emp.y += Math.sin(fleeAngle) * 2.8;
        } else {
          // Wander
          if (s.frame % 60 === 0) {
            emp.facingAngle += (Math.random() - 0.5) * 1.5;
          }
          emp.x += Math.cos(emp.facingAngle) * 1.2;
          emp.y += Math.sin(emp.facingAngle) * 1.2;
        }

        // Clamp inside map
        emp.x = Math.max(50, Math.min(w - 50, emp.x));
        emp.y = Math.max(50, Math.min(h - 50, emp.y));
      });

      // Update Particles
      s.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
      });
      s.particles = s.particles.filter((p) => p.life > 0);

      // --- RENDERING ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Floor
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Grid tiles
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw Desks / Plants as hiding spots
      ctx.fillStyle = '#334155';
      ctx.fillRect(120, 200, 160, 45);
      ctx.fillRect(500, 200, 160, 45);
      ctx.fillRect(w - 240, 200, 160, 45);
      ctx.fillRect(200, 420, 160, 45);
      ctx.fillRect(w - 320, 420, 160, 45);

      // Draw Employees
      s.employees.forEach((emp) => {
        if (emp.isCaught) return;

        ctx.save();
        ctx.translate(emp.x, emp.y);

        // Chibi body
        ctx.fillStyle = emp.skin === 'designer' ? '#ec4899' : emp.skin === 'sales' ? '#38bdf8' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();

        // Chibi head
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(0, -10, 10, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(emp.name, 0, -24);

        ctx.restore();
      });

      // Boss Flashlight Cone
      ctx.save();
      ctx.translate(s.boss.x, s.boss.y);
      ctx.rotate(s.boss.facingAngle);

      const fGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 140);
      fGrad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
      fGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');

      ctx.fillStyle = fGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 140, -Math.PI * 0.3, Math.PI * 0.3);
      ctx.closePath();
      ctx.fill();

      // Boss Chibi Body (Big Boss)
      ctx.fillStyle = '#1e1b4b'; // dark suit
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444'; // red tie
      ctx.fillRect(-2, -2, 4, 10);

      // Boss Head
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(0, -12, 12, 0, Math.PI * 2);
      ctx.fill();

      // Boss Glasses & Hair
      ctx.fillStyle = '#18181b';
      ctx.fillRect(-10, -16, 20, 5);

      ctx.restore();

      // Particles
      s.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        if (p.text) {
          ctx.font = 'bold 11px monospace';
          ctx.fillText(p.text, p.x, p.y);
        } else {
          ctx.fillRect(p.x, p.y, 4, 4);
        }
      });

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col justify-between p-3 select-none touch-none">
      {/* Top HUD */}
      <div className="flex items-center justify-between z-10 w-full">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 border border-amber-500/60 px-3 py-1.5 rounded-xl font-pixel text-xs text-amber-300">
            👑 VAI TRÒ: SẾP TỔNG HOÀNG
          </div>
          <div className="bg-red-950/80 border border-red-500/60 px-3 py-1.5 rounded-xl font-pixel text-xs text-red-400">
            BẮT ĐƯỢC: {caughtCount}/{totalEmployees}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl font-pixel text-xs text-amber-400">
            ⏱️ {timeLeft}s
          </div>
          <button
            onClick={onExit}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-pixel text-slate-300 cursor-pointer"
          >
            THOÁT
          </button>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="relative flex-1 w-full h-full my-2 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-full block pixel-art" />

        {/* Caught Speech Bubble */}
        {lastCaughtSpeech && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-bold text-xs px-4 py-1.5 rounded-full shadow-lg border-2 border-slate-900 animate-bounce">
            {lastCaughtSpeech}
          </div>
        )}
      </div>

      {/* Bottom Action Controls */}
      <div className="flex items-center justify-between z-10 w-full">
        <div className="text-[11px] text-slate-400 font-chibi">
          Di chuyển lại gần nhân viên rồi bấm <b>[BẮT OT]</b> hoặc phím <b>Space</b>!
        </div>

        <button
          onClick={attemptCatch}
          className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-pixel text-xs rounded-2xl font-bold shadow-xl active:scale-95 transition-all cursor-pointer"
        >
          🚨 BẮT KÝ OT! [SPACE]
        </button>
      </div>
    </div>
  );
};
