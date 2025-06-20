import {
  playerMonsters,
  botMonsters,
  selectedPlayer,
  selectedBot
} from './game.js';

    const monsterImagePath = 'assets/images/Monster (2).png';

    function createMonsterElement(hp, i, side, selectedIndex) {
        const div = document.createElement('div');
        div.className = 'monster' + (selectedIndex === i ? ' selected' : '');
        div.dataset.side = side;
        div.dataset.index = i;

        const img = new Image();
        img.src = monsterImagePath;
        img.alt = 'monster';
        img.className = 'monster-image';
        img.style.imageRendering = 'pixelated';

        const hpDiv = document.createElement('div');
        hpDiv.className = 'hp';
        hpDiv.textContent = `HP: ${hp}`;

        div.appendChild(img);
        div.appendChild(hpDiv);

        return div;
    }


    export function render() {
    const playerSide = document.getElementById('playerSide');
    const botSide = document.getElementById('botSide');
    const status = document.getElementById('status');

    playerSide.innerHTML = '<h2>Цонду</h2>';
    botSide.innerHTML = '<h2>Тенцинг</h2>';

    playerMonsters.forEach((hp, i) => {
        const monster = createMonsterElement(hp, i, 'player', selectedPlayer);
        playerSide.appendChild(monster);
    });

    botMonsters.forEach((hp, i) => {
        const monster = createMonsterElement(hp, i, 'bot', selectedBot);
        botSide.appendChild(monster);
    });

    // обновляем статус
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


