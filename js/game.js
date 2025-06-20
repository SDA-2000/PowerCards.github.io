import { render } from './render.js';
import { botTurn } from './bot.js';

export const state = {
    playerMonsters : [100, 90, 80],
    botMonsters : [95, 85, 75],
    selectedPlayer: null,
    selectedBot: null,
    currentTurn: 'player'
}

export function generateBalancedMonsters() {
  const minCards = 3;
  const maxCards = 5;
  const totalCards = getRandom(6, 10);
  const minPower = 20;
  const maxPower = 200;

  let allCards = Array.from({ length: totalCards }, () => getRandom(minPower, maxPower));

  allCards.sort((a, b) => b - a);

  let player = [];
  let bot = [];
  let playerSum = 0;
  let botSum = 0;

  for (const card of allCards) {
    if (
      (player.length < maxCards && (playerSum <= botSum || bot.length >= maxCards)) ||
      bot.length >= maxCards
    ) {
      player.push(card);
      playerSum += card;
    } else {
      bot.push(card);
      botSum += card;
    }
  }

  if (player.length < minCards || bot.length < minCards) {
    return generateBalancedMonsters();
  }

  state.playerMonsters = player;
  state.botMonsters = bot;
  state.selectedPlayer = null;
  state.selectedBot = null;
  state.currentTurn = 'player';
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCurrentTurn(){
    return state.currentTurn;
}

export function setCurrentTurn(turn){
    state.currentTurn = turn;
}

export function handlePlayerClick({ side, index }) {
  if (side === 'player') {
    state.selectedPlayer = parseInt(index);
  } else if (side === 'bot') {
    state.selectedBot = parseInt(index);
  }
  render();
}

export function attack() {
    if (state.selectedPlayer == null || state.selectedBot == null) return;

    let p = state.playerMonsters[state.selectedPlayer];
    let b = state.botMonsters[state.selectedBot];

    p -= b;
    b -= state.playerMonsters[state.selectedPlayer];

    if (p <= 0) state.playerMonsters.splice(state.selectedPlayer, 1);
    else state.playerMonsters[state.selectedPlayer] = p;

    if (b <= 0) state.botMonsters.splice(state.selectedBot, 1);
    else state.botMonsters[state.selectedBot] = b;

    state.selectedPlayer = null;
    state.selectedBot = null;
    setCurrentTurn('bot');
    render();

    setTimeout(botTurn, 500);
}

export function resetGame() {
    generateBalancedMonsters();
    render();
}