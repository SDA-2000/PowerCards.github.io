import {
  playerMonsters,
  botMonsters,
  selectedPlayer,
  selectedBot
} from './game.js';

export function render() {
  const playerSide = document.getElementById('playerSide');
  const botSide = document.getElementById('botSide');
  const status = document.getElementById('status');

  playerSide.innerHTML = "<h2>Цонду</h2>";
  botSide.innerHTML = "<h2>Тенцинг</h2>";

  playerMonsters.forEach((hp, i) => {
    const div = document.createElement('div');
    div.className = 'monster' + (selectedPlayer === i ? ' selected' : '');
    div.textContent = `Монстр ${i + 1}: ${hp}`;
    div.dataset.side = 'player';
    div.dataset.index = i;
    playerSide.appendChild(div);
  });

  botMonsters.forEach((hp, i) => {
    const div = document.createElement('div');
    div.className = 'monster' + (selectedBot === i ? ' selected' : '');
    div.textContent = `Монстр ${i + 1}: ${hp}`;
    div.dataset.side = 'bot';
    div.dataset.index = i;
    botSide.appendChild(div);
  });

  if (playerMonsters.length === 0 && botMonsters.length === 0) {
    status.textContent = "Ничья!";
  } else if (botMonsters.length === 0) {
    status.textContent = "Победа!";
  } else if (playerMonsters.length === 0) {
    status.textContent = "Поражение!";
  } else {
    status.textContent = "Выберите своего и вражеского монстра";
  }
}
