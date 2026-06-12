"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RotateCcw, Shield, Zap, Sword, Skull, BatteryCharging, Layers } from 'lucide-react';

// --- Card Database ---
type CardId = 'strike' | 'defend' | 'heavy' | 'poison' | 'shield' | 'overclock' | 'ultimate';

interface CardDef {
  id: CardId;
  name: string;
  type: 'attack' | 'skill' | 'power';
  desc: string;
  cost: number;
  icon: any;
  color: string;
}

const CARD_DB: Record<CardId, CardDef> = {
  strike: { id: 'strike', name: 'Strike', type: 'attack', desc: 'Deal 8 DMG', cost: 1, icon: Sword, color: 'text-rose-400' },
  defend: { id: 'defend', name: 'Defend', type: 'skill', desc: 'Gain 6 Block', cost: 1, icon: Shield, color: 'text-cyan-400' },
  heavy: { id: 'heavy', name: 'Heavy Slash', type: 'attack', desc: 'Deal 16 DMG', cost: 2, icon: Sword, color: 'text-red-500' },
  poison: { id: 'poison', name: 'Virus', type: 'skill', desc: 'Apply 3 Virus', cost: 1, icon: Skull, color: 'text-green-400' },
  shield: { id: 'shield', name: 'Forcefield', type: 'skill', desc: 'Gain 14 Block', cost: 2, icon: Shield, color: 'text-blue-400' },
  overclock: { id: 'overclock', name: 'Overclock', type: 'skill', desc: 'Draw 2 Cards', cost: 1, icon: BatteryCharging, color: 'text-yellow-400' },
  ultimate: { id: 'ultimate', name: 'Orbital Ray', type: 'attack', desc: 'Deal 30 DMG', cost: 3, icon: Zap, color: 'text-fuchsia-500' },
};

const STARTING_DECK: CardId[] = [
  'strike', 'strike', 'strike', 'strike',
  'defend', 'defend', 'defend', 'defend',
  'heavy', 'poison', 'shield', 'overclock', 'ultimate'
];

const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

// --- State Types ---
interface PlayerState {
  hp: number;
  block: number;
  ap: number;
  virus: number;
  deck: CardId[];
  hand: CardId[];
  discard: CardId[];
}

interface GameState {
  p1: PlayerState;
  p2: PlayerState;
  turn: 1 | 2;
  log: string[];
  winner: 1 | 2 | null;
}

const MAX_HP = 100;
const MAX_AP = 3;

const initGame = (): GameState => {
  const p1Deck = shuffle(STARTING_DECK);
  const p2Deck = shuffle(STARTING_DECK);
  
  // Draw 5 cards initially
  const p1Hand = p1Deck.splice(0, 5);
  const p2Hand = p2Deck.splice(0, 5);

  return {
    p1: { hp: MAX_HP, block: 0, ap: MAX_AP, virus: 0, deck: p1Deck, hand: p1Hand, discard: [] },
    p2: { hp: MAX_HP, block: 0, ap: MAX_AP, virus: 0, deck: p2Deck, hand: p2Hand, discard: [] },
    turn: 1,
    log: ['System initialized. Player 1 starts.'],
    winner: null
  };
};

export default function CyberRPG({ onClose }: { onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState<GameState>(initGame);

  const startGame = () => {
    setGameState(initGame());
    setIsPlaying(true);
  };

  const playCard = (cardIndex: number) => {
    setGameState(prev => {
      const state = JSON.parse(JSON.stringify(prev)) as GameState; // deep clone
      if (state.winner !== null) return state;

      const isP1 = state.turn === 1;
      const attacker = isP1 ? state.p1 : state.p2;
      const defender = isP1 ? state.p2 : state.p1;
      
      const cardId = attacker.hand[cardIndex];
      const card = CARD_DB[cardId];

      if (attacker.ap < card.cost) return prev; // Cannot afford

      // Pay cost & discard
      attacker.ap -= card.cost;
      attacker.hand.splice(cardIndex, 1);
      attacker.discard.push(cardId);

      let msg = `P${state.turn} played ${card.name}!`;

      const dealDamage = (amt: number) => {
        if (defender.block >= amt) {
          defender.block -= amt;
          msg += ` Blocked.`;
        } else {
          const dmg = amt - defender.block;
          defender.block = 0;
          defender.hp -= dmg;
          msg += ` ${dmg} DMG!`;
        }
      };

      switch (cardId) {
        case 'strike': dealDamage(8); break;
        case 'heavy': dealDamage(16); break;
        case 'defend': attacker.block += 6; msg += ` +6 Block.`; break;
        case 'shield': attacker.block += 14; msg += ` +14 Block.`; break;
        case 'poison': defender.virus += 3; msg += ` Enemy infected!`; break;
        case 'overclock':
          for (let i = 0; i < 2; i++) {
            if (attacker.hand.length >= 5) break; // Max hand size 5
            if (attacker.deck.length === 0) {
              if (attacker.discard.length === 0) break;
              attacker.deck = shuffle(attacker.discard);
              attacker.discard = [];
            }
            if (attacker.deck.length > 0) attacker.hand.push(attacker.deck.pop()!);
          }
          msg += ` Drew cards.`;
          break;
        case 'ultimate': dealDamage(30); break;
      }

      state.log.unshift(msg);
      if (state.log.length > 4) state.log.pop();

      if (defender.hp <= 0) {
        state.winner = state.turn;
        state.log.unshift(`PLAYER ${state.turn} WINS!`);
      }

      return state;
    });
  };

  const endTurn = () => {
    setGameState(prev => {
      const state = JSON.parse(JSON.stringify(prev)) as GameState;
      if (state.winner !== null) return state;

      const nextTurn = state.turn === 1 ? 2 : 1;
      const nextPlayer = nextTurn === 1 ? state.p1 : state.p2;

      // Apply virus damage to the person whose turn is starting
      if (nextPlayer.virus > 0) {
        nextPlayer.hp -= nextPlayer.virus;
        state.log.unshift(`P${nextTurn} took ${nextPlayer.virus} Virus DMG!`);
        nextPlayer.virus -= 1; // Reduces intensity over time
      }

      if (nextPlayer.hp <= 0) {
        state.winner = state.turn; // The guy who ended turn wins
        state.log.unshift(`PLAYER ${state.turn} WINS!`);
        return state;
      }

      // Reset AP and Block
      nextPlayer.ap = MAX_AP;
      nextPlayer.block = 0;

      // Draw 1 card at start of turn
      if (nextPlayer.hand.length < 5) {
        if (nextPlayer.deck.length === 0) {
          nextPlayer.deck = shuffle(nextPlayer.discard);
          nextPlayer.discard = [];
        }
        if (nextPlayer.deck.length > 0) nextPlayer.hand.push(nextPlayer.deck.pop()!);
      }

      state.turn = nextTurn;
      state.log.unshift(`--- P${nextTurn} Turn ---`);
      
      return state;
    });
  };

  const renderCard = (cardId: CardId, isHidden: boolean, disabled: boolean, onClick: () => void) => {
    if (isHidden) {
      return (
        <div className="w-[60px] md:w-[80px] h-[90px] md:h-[120px] bg-gray-800 rounded-xl border border-cyan-500/20 flex flex-col items-center justify-center shadow-lg relative overflow-hidden opacity-70">
           <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,255,255,0.05)_10px,rgba(0,255,255,0.05)_20px)]" />
           <Layers className="w-5 h-5 text-cyan-500/30" />
        </div>
      );
    }

    const c = CARD_DB[cardId];
    return (
      <button 
        onClick={onClick} 
        disabled={disabled}
        className={`w-[70px] md:w-[100px] h-[100px] md:h-[140px] rounded-xl border flex flex-col justify-between p-2 shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-all ${disabled ? 'border-gray-700 bg-gray-900 opacity-50 grayscale' : 'border-white/20 bg-gray-800 hover:-translate-y-2 hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer'}`}
      >
        <div className="flex justify-between items-start w-full">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] md:text-xs font-black text-white shadow-[0_0_8px_blue]">
            {c.cost}
          </div>
          <c.icon className={`w-4 h-4 md:w-5 md:h-5 ${c.color}`} />
        </div>
        
        <div className="flex-1 flex flex-col justify-end pb-1">
          <h4 className="text-[9px] md:text-xs font-black text-white leading-tight mb-1 uppercase text-center">{c.name}</h4>
          <p className="text-[7px] md:text-[9px] text-white/50 text-center leading-tight">{c.desc}</p>
        </div>
      </button>
    );
  };

  const renderPlayer = (playerNum: 1 | 2, isTop: boolean) => {
    const p = playerNum === 1 ? gameState.p1 : gameState.p2;
    const isMyTurn = gameState.turn === playerNum && !gameState.winner;
    const cText = playerNum === 1 ? 'text-cyan-400' : 'text-rose-400';
    const cBg = playerNum === 1 ? 'bg-cyan-500' : 'bg-rose-500';

    return (
      <div className={`flex-1 flex flex-col justify-between p-4 md:p-6 ${isTop ? 'rotate-180 md:rotate-0 border-b md:border-b-0 md:border-l' : ''} ${isMyTurn ? 'bg-white/[0.02]' : 'bg-black'} border-white/10 transition-colors relative`}>
        {/* Stats Header */}
        <div className="flex justify-between items-center mb-4 max-w-sm mx-auto w-full">
          <div>
             <h3 className={`${cText} font-black uppercase tracking-widest text-lg md:text-2xl`}>Player {playerNum}</h3>
             <div className="flex gap-2 text-[10px] md:text-xs font-bold text-white/50 mt-1">
               <span>DECK: {p.deck.length}</span>
               <span>DISCARD: {p.discard.length}</span>
             </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-1">
              {[...Array(MAX_AP)].map((_, i) => (
                <div key={i} className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${i < p.ap ? 'bg-blue-500 shadow-[0_0_10px_blue]' : 'bg-gray-800 border border-white/10'}`} />
              ))}
            </div>
            {isMyTurn && <span className="text-white text-[9px] md:text-[10px] font-bold animate-pulse border border-white/20 px-2 py-0.5 rounded uppercase tracking-widest">Your Turn</span>}
          </div>
        </div>

        {/* Health & Status Bars */}
        <div className="flex flex-col gap-2 mb-4 w-full max-w-sm mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-[10px] md:text-xs font-bold uppercase w-8">HP</span>
            <div className="flex-1 h-3 md:h-4 bg-gray-800 rounded-full overflow-hidden shadow-inner">
               <div className={`h-full ${cBg} transition-all duration-300`} style={{ width: `${Math.max(0, p.hp)}%` }} />
            </div>
            <span className="text-white font-black w-8 text-right text-sm md:text-base">{Math.max(0, p.hp)}</span>
          </div>
          
          <div className="flex gap-4 min-h-[20px]">
            {p.block > 0 && (
              <div className="text-blue-400 font-bold text-[10px] md:text-xs flex items-center gap-1 bg-blue-900/30 px-2 py-0.5 rounded">
                <Shield className="w-3 h-3"/> Block: {p.block}
              </div>
            )}
            {p.virus > 0 && (
              <div className="text-green-400 font-bold text-[10px] md:text-xs flex items-center gap-1 bg-green-900/30 px-2 py-0.5 rounded animate-pulse">
                <Skull className="w-3 h-3"/> Virus: {p.virus}
              </div>
            )}
          </div>
        </div>

        {/* Hand */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-center items-center gap-1 md:gap-3 min-h-[120px] md:min-h-[160px]">
            {p.hand.map((cardId, i) => (
              <div key={`${playerNum}-${i}`}>
                {renderCard(cardId, !isMyTurn, p.ap < CARD_DB[cardId].cost || gameState.winner !== null, () => playCard(i))}
              </div>
            ))}
            {p.hand.length === 0 && <p className="text-white/30 text-xs uppercase font-space-grotesk tracking-widest">Hand Empty</p>}
          </div>
        </div>

        {/* End Turn Button */}
        <div className="flex justify-center mt-4 h-10">
          {isMyTurn && gameState.winner === null && (
            <button 
              onClick={endTurn}
              className="px-8 py-2 border border-white/20 bg-white/5 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white/10 active:scale-95 rounded-full transition-all shadow-lg"
            >
              End Turn
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-sm md:max-w-5xl h-[95vh] md:h-[80vh] min-h-[600px] bg-[#08080c] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.15)] mx-auto flex"
    >
      <button onClick={onClose} className="absolute left-4 top-4 md:left-auto md:right-4 md:top-4 text-white/50 bg-black/80 p-3 border border-white/10 rounded-full hover:text-white z-50 transition-all hover:bg-red-500/20">
        <X className="w-5 h-5" />
      </button>

      {/* Battle UI (Only visible when playing) */}
      {isPlaying && (
        <div className="absolute inset-0 flex flex-col-reverse md:flex-row">
          {renderPlayer(1, false)}
          {renderPlayer(2, true)}
        </div>
      )}

      {/* Battle Log Center */}
      {isPlaying && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-auto md:min-w-[300px] py-2 md:py-3 px-4 md:px-6 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl z-40 text-center shadow-[0_0_30px_rgba(0,0,0,0.9)] pointer-events-none">
          <div className="flex flex-col gap-1">
            {gameState.log.map((line, i) => (
              <span key={i} className={`text-[10px] md:text-xs font-space-grotesk font-bold uppercase tracking-widest ${i === 0 ? 'text-white' : 'text-white/30'}`}>
                {line}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Overlays (Start Screen & Game Over) */}
      <AnimatePresence>
        {(!isPlaying || gameState.winner !== null) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6"
          >
            {gameState.winner ? (
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-space-grotesk font-black uppercase tracking-widest text-white mb-2 drop-shadow-[0_0_20px_currentColor]" style={{ color: gameState.winner === 1 ? '#22d3ee' : '#fb7185' }}>
                  PLAYER {gameState.winner} WINS!
                </h2>
                <p className="text-white/50 mb-8 tracking-widest uppercase text-sm">Deck Master</p>
                <button onClick={startGame} className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto">
                  <RotateCcw className="w-5 h-5" /> Rematch
                </button>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-space-grotesk font-black uppercase tracking-widest text-white mb-4">Cyber Deck</h2>
                <p className="text-white/70 max-w-sm mx-auto mb-8 font-inter text-sm md:text-base leading-relaxed">
                  A pure strategy card game. Draw cards, manage <span className="text-blue-400 font-bold">Action Points (AP)</span>, build <span className="text-cyan-400 font-bold">Block</span>, and infect your enemy with <span className="text-green-400 font-bold">Virus</span>.
                </p>
                <button onClick={startGame} className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest rounded-lg hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all flex items-center gap-2 mx-auto">
                  <Play className="w-5 h-5" /> Play Game
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
