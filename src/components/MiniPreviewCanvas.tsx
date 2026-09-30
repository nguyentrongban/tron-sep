import React, { useRef, useEffect } from 'react';

interface MiniPreviewProps {
  type: 'movement' | 'hiding' | 'explore' | 'exit';
  width?: number;
  height?: number;
}

export const MiniPreviewCanvas: React.FC<MiniPreviewProps> = ({ type, width = 240, height = 135 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (type === 'movement') {
      // 1. Movement & Avoid Boss preview
      ctx.fillStyle = '#1e1b4b'; // floor
      ctx.fillRect(0, 0, width, height);

      // Office Floor tiles
      ctx.strokeStyle = '#312e81';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Glass window wall
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, 40);
      ctx.fillStyle = '#38bdf8';
      ctx.globalAlpha = 0.3;
      ctx.fillRect(20, 10, width - 40, 25);
      ctx.globalAlpha = 1.0;

      // Boss standing in background
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(170, 20, 22, 28);
      ctx.fillStyle = '#f87171'; // tie
      ctx.fillRect(179, 32, 4, 10);
      ctx.fillStyle = '#fef08a'; // head
      ctx.fillRect(172, 12, 18, 16);

      // Running Chibi
      ctx.fillStyle = '#fbbf24'; // hair
      ctx.beginPath();
      ctx.arc(60, 65, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0284c7'; // suit
      ctx.fillRect(52, 75, 16, 20);

      // Speed lines
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(25, 65); ctx.lineTo(40, 65);
      ctx.moveTo(20, 75); ctx.lineTo(38, 75);
      ctx.moveTo(28, 85); ctx.lineTo(42, 85);
      ctx.stroke();

    } else if (type === 'hiding') {
      // 2. Hiding in Box/Desk preview
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Desk & Plant
      ctx.fillStyle = '#475569'; // desk
      ctx.fillRect(40, 50, 80, 45);
      ctx.fillStyle = '#0284c7'; // PC monitor
      ctx.fillRect(60, 25, 30, 25);

      // Plant
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(140, 50, 15, 0, Math.PI * 2);
      ctx.fill();

      // Hiding Chibi behind desk
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(65, 82, 9, 0, Math.PI * 2);
      ctx.fill();

      // Boss patrolling with red vision cone & Alert exclamation
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(180, 70);
      ctx.lineTo(120, 50);
      ctx.lineTo(120, 90);
      ctx.closePath();
      ctx.globalAlpha = 0.4;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Boss
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(180, 55, 20, 28);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(181, 40, 18, 16);

      // Exclamation alert above boss
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(190, 25, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('!', 190, 29);

    } else if (type === 'explore') {
      // 3. Explore Office preview
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, width, height);

      // Office Cubicle Rows
      ctx.fillStyle = '#334155';
      ctx.fillRect(20, 25, 75, 40);
      ctx.fillRect(115, 25, 75, 40);
      ctx.fillRect(20, 80, 75, 40);
      ctx.fillRect(115, 80, 75, 40);

      // PCs
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(35, 12, 22, 15);
      ctx.fillRect(130, 12, 22, 15);

      // Water cooler
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(205, 50, 18, 30);
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(214, 45, 8, 0, Math.PI * 2);
      ctx.fill();

      // Chibi exploring
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(105, 70, 10, 0, Math.PI * 2);
      ctx.fill();

    } else if (type === 'exit') {
      // 4. Find Exit door at sunset preview
      // Sunset Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#f97316');
      grad.addColorStop(0.5, '#c026d3');
      grad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Glass Doors with EXIT sign
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(width / 2 - 45, 20, 90, height - 20);

      ctx.fillStyle = '#22c55e'; // EXIT sign
      ctx.fillRect(width / 2 - 25, 10, 50, 14);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('EXIT', width / 2, 21);

      // Glass reflections
      ctx.fillStyle = '#38bdf8';
      ctx.globalAlpha = 0.25;
      ctx.fillRect(width / 2 - 40, 28, 38, height - 30);
      ctx.fillRect(width / 2 + 2, 28, 38, height - 30);
      ctx.globalAlpha = 1.0;

      // Chibi running towards door
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(width / 2, 85, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [type, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full object-cover rounded-xl pixel-art"
    />
  );
};
