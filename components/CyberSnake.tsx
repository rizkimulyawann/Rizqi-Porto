"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, X, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 150; // ms

interface CyberSnakeProps {
  onClose: () => void;
}

export default function CyberSnake({ onClose }: CyberSnakeProps) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 3, y: 3 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const generateFood = useCallback((currentSnake: {x: number, y: number}[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleDirection = useCallback((newDir: {x: number, y: number}) => {
    setDirection(prev => {
      // Prevent reversing
      if (prev.x === -newDir.x && prev.y === -newDir.y && snake.length > 1) return prev;
      return newDir;
    });
  }, [snake.length]);

  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp':
        case 'w': handleDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown':
        case 's': handleDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft':
        case 'a': handleDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight':
        case 'd': handleDirection({ x: 1, y: 0 }); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, handleDirection]);

  useEffect(() => {
    if (!isPlaying) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        // Check collision with walls
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setIsPlaying(false);
          setGameOver(true);
          if (score > highScore) setHighScore(score);
          return prev;
        }

        // Check collision with self
        if (prev.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsPlaying(false);
          setGameOver(true);
          if (score > highScore) setHighScore(score);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, SPEED);
    return () => clearInterval(intervalId);
  }, [direction, food, isPlaying, score, highScore, generateFood]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-md bg-[#08080c] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.15)] flex flex-col mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-space-grotesk font-bold uppercase tracking-widest text-sm">Cyber Worm</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-cyan-400 font-space-grotesk text-xs">
            <Trophy className="w-3 h-3" /> {highScore}
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div className="p-6 flex flex-col items-center">
        <div className="flex justify-between w-full mb-4 px-2 font-space-grotesk text-sm uppercase tracking-widest">
          <span className="text-white/50">Score</span>
          <span className="text-cyan-400 font-bold">{score}</span>
        </div>

        <div 
          className="relative bg-black border border-white/10 rounded-lg overflow-hidden"
          style={{ 
            width: '100%', 
            aspectRatio: '1/1',
            display: 'grid',
            gridTemplateColumns: \`repeat(\${GRID_SIZE}, 1fr)\`,
            gridTemplateRows: \`repeat(\${GRID_SIZE}, 1fr)\`
          }}
        >
          {/* Render Grid cells to make it look like a terminal/board */}
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/[0.02]" />
          ))}

          {/* Render Food */}
          <div 
            className="absolute bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            style={{
              width: \`\${100 / GRID_SIZE}%\`,
              height: \`\${100 / GRID_SIZE}%\`,
              left: \`\${(food.x / GRID_SIZE) * 100}%\`,
              top: \`\${(food.y / GRID_SIZE) * 100}%\`,
            }}
          />

          {/* Render Snake */}
          {snake.map((segment, index) => (
            <div 
              key={index}
              className={\`absolute rounded-sm \${index === 0 ? 'bg-cyan-400 z-10' : 'bg-cyan-500/70'}\`}
              style={{
                width: \`\${100 / GRID_SIZE}%\`,
                height: \`\${100 / GRID_SIZE}%\`,
                left: \`\${(segment.x / GRID_SIZE) * 100}%\`,
                top: \`\${(segment.y / GRID_SIZE) * 100}%\`,
                boxShadow: index === 0 ? '0 0 15px rgba(0,255,255,0.6)' : 'none',
                transform: 'scale(0.9)' // slight gap between segments
              }}
            />
          ))}

          {/* Overlays */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20"
              >
                {gameOver && (
                  <h4 className="text-red-500 font-space-grotesk font-bold text-2xl mb-2 tracking-widest uppercase">System Failure</h4>
                )}
                <button 
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-space-grotesk font-bold uppercase tracking-widest text-sm rounded transition-all hover:scale-105 active:scale-95"
                >
                  {gameOver ? <><RotateCcw className="w-4 h-4" /> Restart</> : <><Play className="w-4 h-4" /> Start Game</>}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Controls */}
        <div className="grid grid-cols-3 gap-2 mt-8 w-full max-w-[200px] sm:hidden">
          <div />
          <button onClick={() => handleDirection({ x: 0, y: -1 })} className="p-4 bg-white/5 rounded-lg active:bg-cyan-500/20 flex justify-center items-center"><ChevronUp className="w-6 h-6 text-white/70" /></button>
          <div />
          <button onClick={() => handleDirection({ x: -1, y: 0 })} className="p-4 bg-white/5 rounded-lg active:bg-cyan-500/20 flex justify-center items-center"><ChevronLeft className="w-6 h-6 text-white/70" /></button>
          <button onClick={() => handleDirection({ x: 0, y: 1 })} className="p-4 bg-white/5 rounded-lg active:bg-cyan-500/20 flex justify-center items-center"><ChevronDown className="w-6 h-6 text-white/70" /></button>
          <button onClick={() => handleDirection({ x: 1, y: 0 })} className="p-4 bg-white/5 rounded-lg active:bg-cyan-500/20 flex justify-center items-center"><ChevronRight className="w-6 h-6 text-white/70" /></button>
        </div>
        <p className="text-white/30 text-[10px] font-space-grotesk uppercase tracking-widest mt-6 hidden sm:block text-center">
          Use WASD or Arrow Keys to hack the terminal
        </p>
      </div>
    </motion.div>
  );
}
