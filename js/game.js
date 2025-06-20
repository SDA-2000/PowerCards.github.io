import { render } from './render.js';
import { botTurn } from './bot.js';

export let playerMonsters = [100, 90, 80];
export let botMonsters = [95, 85, 75];

export let selectedPlayer = null;
export let selectedBot = null;

export function handlePlayerClick({ side, index }) {
  if (side === 'player') {
    selectedPlayer = parseInt(index);
  } else if (side === 'bot') {
    selectedBot = parseInt(index);
  }
  render();
}

export function attack() {
  if (selectedPlayer == null || selectedBot == null) return;

  let p = playerMonsters[selectedPlayer];
  let b = botMonsters[selectedBot];

  p -= b;
  b -= playerMonsters[selectedPlayer];

  if (p <= 0) playerMonsters.splice(selectedPlayer, 1);
  else playerMonsters[selectedPlayer] = p;

  if (b <= 0) botMonsters.splice(selectedBot, 1);
  else botMonsters[selectedBot] = b;

  selectedPlayer = null;
  selectedBot = null;

  render();

  setTimeout(botTurn, 500);
}

