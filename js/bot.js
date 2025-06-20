import { playerMonsters, botMonsters } from './game.js';
import { render } from './render.js';

export function botTurn() {
  if (playerMonsters.length === 0 || botMonsters.length === 0) return;

  let botIndex = botMonsters.indexOf(Math.max(...botMonsters));
  let playerIndex = playerMonsters.indexOf(Math.min(...playerMonsters));

  let b = botMonsters[botIndex];
  let p = playerMonsters[playerIndex];

  b -= p;
  p -= botMonsters[botIndex];

  if (b <= 0) botMonsters.splice(botIndex, 1);
  else botMonsters[botIndex] = b;

  if (p <= 0) playerMonsters.splice(playerIndex, 1);
  else playerMonsters[playerIndex] = p;

  render();
}

