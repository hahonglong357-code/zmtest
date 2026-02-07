
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Cell, Operator, Position, GameState } from './types';
import { getGameHint } from './services/geminiService';

// Supabase Configuration
// Replace with your actual values or ensure they are set in Vercel Environment Variables
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const NUM_HEIGHT = 3;
const OP_HEIGHT = 4;
const OPERATORS: Operator[] = ['+', '-', '×', '÷'];
const TARGET_POOL = [24, 17, 37];

const getRandomTarget = () => TARGET_POOL[Math.floor(Math.random() * TARGET_POOL.length)];
const generateRandomId = () => Math.random().toString(36).substr(2, 9);

const createCell = (type: 'number' | 'operator'): Cell => {
  if (type === 'number') {
    return {
      id: generateRandomId(),
      value: Math.floor(Math.random() * 9) + 1,
      type: 'number'
    };
  } else {
    return {
      id: generateRandomId(),
      value: OPERATORS[Math.floor(Math.random() * OPERATORS.length)],
      type: 'operator'
    };
  }
};

const generatePreviewRow = (): Cell[] => [
  createCell('number'),
  createCell('number'),
  createCell('number')
];

const generateInitialGrid = (): Cell[][] => {
  const grid: Cell[][] = [];
  grid[0] = Array.from({ length: NUM_HEIGHT }, () => createCell('number'));
  grid[1] = OPERATORS.map(op => ({ id: `fixed-${op}`, value: op, type: 'operator' }));
  grid[2] = Array.from({ length: NUM_HEIGHT }, () => createCell('number'));
  return grid;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    resetGame();
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('high_scores')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);
    if (!error && data) setLeaderboard(data);
  };

  const saveScore = async () => {
    if (!gameState || !username.trim()) return;
    const { error } = await supabase
      .from('high_scores')
      .insert([{ username, score: gameState.score }]);
    if (!error) {
      fetchLeaderboard();
      resetGame();
    }
  };

  const resetGame = () => {
    setGameState({
      grid: generateInitialGrid(),
      previewCells: generatePreviewRow(),
      currentTarget: getRandomTarget(),
      nextTarget: getRandomTarget(),
      score: 0,
      selectedNum: null,
      selectedOp: null,
      combo: 0,
      isGameOver: false
    });
    setHint(null);
  };

  const handleCellClick = (col: number, row: number) => {
    if (!gameState || isSynthesizing || gameState.isGameOver) return;
    const cell = gameState.grid[col][row];
    if (!cell) return;

    if (cell.type === 'number') {
      if (gameState.selectedNum && gameState.selectedNum.col === col && gameState.selectedNum.row === row) {
        setGameState(prev => prev ? ({ ...prev, selectedNum: null, selectedOp: null }) : null);
        return;
      }
      if (gameState.selectedNum && gameState.selectedOp) {
        performSynthesis(gameState.selectedNum, gameState.selectedOp, { col, row });
        return;
      }
      setGameState(prev => prev ? ({ ...prev, selectedNum: { col, row } }) : null);
    } else {
      if (!gameState.selectedNum) return;
      if (gameState.selectedOp && gameState.selectedOp.col === col && gameState.selectedOp.row === row) {
        setGameState(prev => prev ? ({ ...prev, selectedOp: null }) : null);
      } else {
        setGameState(prev => prev ? ({ ...prev, selectedOp: { col, row } }) : null);
      }
    }
  };

  const performSynthesis = (numPos: Position, opPos: Position, targetPos: Position) => {
    if (!gameState) return;
    setIsSynthesizing(true);
    const numValue = gameState.grid[numPos.col][numPos.row].value as number;
    const op = gameState.grid[opPos.col][opPos.row].value as Operator;
    const targetValue = gameState.grid[targetPos.col][targetPos.row].value as number;

    let result = 0;
    switch (op) {
      case '+': result = numValue + targetValue; break;
      case '-': result = numValue - targetValue; break;
      case '×': result = numValue * targetValue; break;
      case '÷': result = targetValue !== 0 ? Math.floor(numValue / targetValue) : 0; break;
    }

    if (result < 0) {
      setMessage("Result cannot be negative");
      setGameState(prev => prev ? ({ ...prev, selectedNum: null, selectedOp: null }) : null);
      setIsSynthesizing(false);
      return;
    }

    setTimeout(() => {
      setGameState(prev => {
        if (!prev) return null;
        let newGrid = prev.grid.map(col => [...col]);
        const isMatch = result === prev.currentTarget;

        // @ts-ignore
        newGrid[numPos.col][numPos.row] = null;
        if (isMatch) {
          // @ts-ignore
          newGrid[targetPos.col][targetPos.row] = null;
        } else {
          newGrid[targetPos.col][targetPos.row] = {
            ...newGrid[targetPos.col][targetPos.row],
            value: result,
            id: generateRandomId()
          };
        }

        let processedGrid = newGrid.map((col, idx) => idx === 1 ? col : col.filter(cell => cell !== null));
        let newPreview = prev.previewCells;
        let nextTarget = prev.nextTarget;
        let currentTarget = prev.currentTarget;
        let score = prev.score;
        let combo = prev.combo;
        let isGameOver = false;

        if (isMatch) {
          score += 100 + (combo * 20);
          combo += 1;
          currentTarget = nextTarget;
          nextTarget = getRandomTarget();
          setHint(null);

          processedGrid = processedGrid.map((col, colIdx) => {
            if (colIdx === 1) return col;
            const filled = [...col];
            if (filled.length < NUM_HEIGHT) {
               const previewIdx = colIdx === 0 ? 0 : 2;
               filled.unshift({ ...prev.previewCells[previewIdx], id: generateRandomId() });
            }
            while (filled.length < NUM_HEIGHT) {
              filled.unshift(createCell('number'));
            }
            return filled;
          });
          newPreview = generatePreviewRow();
        } else {
          const numberCount = processedGrid[0].length + processedGrid[2].length;
          if (numberCount < 2) isGameOver = true;

          processedGrid = processedGrid.map((col, colIdx) => {
             const h = colIdx === 1 ? OP_HEIGHT : NUM_HEIGHT;
             const padded = [...col];
             while (padded.length < h) {
               // @ts-ignore
               padded.unshift(null);
             }
             return padded;
          });
        }

        return { ...prev, grid: processedGrid, previewCells: newPreview, selectedNum: null, selectedOp: null, score, combo, currentTarget, nextTarget, isGameOver };
      });
      setIsSynthesizing(false);
    }, 400);
  };

  const requestHint = async () => {
    if (!gameState || isHintLoading) return;
    setIsHintLoading(true);
    const hintText = await getGameHint(gameState);
    setHint(hintText || "Try mixing the numbers.");
    setIsHintLoading(false);
  };

  if (!gameState) return null;

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f2f2f7] text-black px-4 pt-12 pb-8 overflow-hidden relative">
      
      {/* iOS Style HUD */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 px-2">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-tight">Score</span>
          <span className="text-2xl font-bold">{gameState.score}</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowLeaderboard(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white ios-shadow active:scale-95 transition-all text-blue-600"
          >
            <i className="fas fa-trophy"></i>
          </button>
          <button 
            onClick={resetGame}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white ios-shadow active:scale-95 transition-all text-gray-600"
          >
            <i className="fas fa-undo"></i>
          </button>
        </div>
      </div>

      {/* Target Card */}
      <motion.div 
        layout
        className="w-full max-w-md bg-white/70 ios-blur ios-shadow rounded-[32px] p-6 mb-8 flex flex-col items-center border border-white/50"
      >
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Current Target</div>
        <motion.div 
          key={gameState.currentTarget}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-7xl font-extrabold tracking-tighter text-blue-600"
        >
          {gameState.currentTarget}
        </motion.div>
        
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Next:</span>
          <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{gameState.nextTarget}</span>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="w-full max-w-md grid grid-cols-3 gap-3 px-2">
        {gameState.grid.map((column, colIdx) => (
          <div key={`col-${colIdx}`} className={`flex flex-col gap-3 justify-end ${colIdx === 1 ? 'h-[360px]' : 'h-[270px] mb-[45px]'}`}>
            {column.map((cell, rowIdx) => {
              if (!cell) return <div key={`empty-${colIdx}-${rowIdx}`} className="h-20 w-full" />;
              
              const isSelected = (gameState.selectedNum?.col === colIdx && gameState.selectedNum?.row === rowIdx) ||
                                 (gameState.selectedOp?.col === colIdx && gameState.selectedOp?.row === rowIdx);
              
              return (
                <motion.button
                  key={cell.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleCellClick(colIdx, rowIdx)}
                  className={`
                    relative h-20 w-full flex items-center justify-center rounded-[22px] text-3xl font-bold transition-all duration-300 ios-shadow
                    ${cell.type === 'operator' ? 'bg-orange-100 text-orange-500' : 'bg-white text-black'}
                    ${isSelected ? 'ring-[3px] ring-blue-500 ring-offset-2 !bg-blue-500 !text-white' : ''}
                  `}
                >
                  {cell.value}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-md">
        <button 
          onClick={requestHint}
          disabled={isHintLoading || gameState.isGameOver}
          className="px-8 py-3 bg-white/80 ios-blur ios-shadow rounded-full text-sm font-semibold flex items-center gap-3 active:scale-95 transition-all disabled:opacity-50"
        >
          {isHintLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-lightbulb text-yellow-500"></i>}
          Need a Hint?
        </button>

        <AnimatePresence>
          {hint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-xs text-gray-500 italic max-w-xs px-4"
            >
              {hint}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game Over Modal */}
      <AnimatePresence>
        {gameState.isGameOver && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 ios-blur flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[38px] p-8 w-full max-w-sm ios-shadow text-center"
            >
              <h2 className="text-3xl font-extrabold mb-2">Game Over</h2>
              <p className="text-gray-500 text-sm mb-6">You've run out of combinations!</p>
              
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Final Score</div>
                <div className="text-4xl font-black text-blue-600">{gameState.score}</div>
              </div>

              <input 
                type="text" 
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-4 text-center font-semibold focus:outline-none ring-2 ring-transparent focus:ring-blue-500 transition-all"
              />

              <div className="flex flex-col gap-3">
                <button 
                  onClick={saveScore}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
                >
                  Save & Replay
                </button>
                <button 
                  onClick={resetGame}
                  className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold active:scale-95 transition-all"
                >
                  Discard Score
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leaderboard Slide-up */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white ios-blur flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold">Leaderboard</h2>
              <button 
                onClick={() => setShowLeaderboard(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {leaderboard.map((entry, i) => (
                <div key={entry.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <span className={`w-6 text-sm font-bold ${i < 3 ? 'text-blue-600' : 'text-gray-400'}`}>{i + 1}</span>
                    <span className="font-semibold">{entry.username}</span>
                  </div>
                  <span className="font-bold text-lg">{entry.score}</span>
                </div>
              ))}
              {leaderboard.length === 0 && (
                <div className="text-center text-gray-400 py-20">No scores yet. Be the first!</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-10 z-[70] bg-black/80 text-white text-xs font-bold px-6 py-3 rounded-full ios-blur ios-shadow"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
