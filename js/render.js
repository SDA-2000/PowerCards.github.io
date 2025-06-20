import {
  playerMonsters,
  botMonsters,
  selectedPlayer,
  selectedBot
} from './game.js';

const monsterImage = './assets/images/Monster (2).png';

export function render() {
  const playerSide = document.getElementById('playerSide');
  const botSide = document.getElementById('botSide');
  const status = document.getElementById('status');

  playerSide.innerHTML = "<h2>Цонду</h2>";
  botSide.innerHTML = "<h2>Тенцинг</h2>";

  playerMonsters.forEach((hp, i) => {
    const div = document.createElement('div');
    div.className = 'monster' + (selectedPlayer === i ? ' selected' : '');
    div.dataset.side = 'player';
    div.dataset.index = i;

    div.innerHTML = `
      <img src="${monsterImage}" alt="monster" />
      <div class="hp">HP: ${hp}</div>
    `;

    playerSide.appendChild(div);
  });

  botMonsters.forEach((hp, i) => {
    const div = document.createElement('div');
    div.className = 'monster' + (selectedBot === i ? ' selected' : '');
    div.dataset.side = 'bot';
    div.dataset.index = i;

    div.innerHTML = `
      <img src="${monsterImage}" alt="monster" />
      <div class="hp">HP: ${hp}</div>
    `;

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

