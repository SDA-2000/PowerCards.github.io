import { render } from './render.js';
import { botTurn } from './bot.js';

export const state = {
    playerMonsters : [100, 90, 80],
    botMonsters : [95, 85, 75],
    selectedPlayer: null,
    selectedBot: null,
    currentTurn: 'player'
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

