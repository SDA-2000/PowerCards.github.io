import {
  state,
  getCurrentTurn
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
    const currentTurn = getCurrentTurn();
    const playerSide = document.getElementById('playerSide');
    const playerName = document.getElementById('playerName');
    const botSide = document.getElementById('botSide');
    const botName = document.getElementById('botName');
    const status = document.getElementById('status');

    const endTurnButton = document.getElementById('endTurnBtn');

    if (getCurrentTurn() === 'player') {
        endTurnButton.disabled = !(state.selectedPlayer !== null && state.selectedBot !== null);
        endTurnButton.textContent = 'Закончить ход';
    } else {
        endTurnButton.disabled = true;
        endTurnButton.textContent = 'Ход противника';
    }
    
    playerSide.innerHTML = '<h2 id="playerName">Цонду (Вы)</h2>';
    botSide.innerHTML = '<h2 id="botName">Тенцинг</h2>';

    if (currentTurn === 'player') {
        playerSide.classList.add('active-turn');
        playerSide.classList.remove('inactive-turn');
        botSide.classList.add('inactive-turn');
        botSide.classList.remove('active-turn');
    } else {
        botName.classList.add('active-turn');
        botName.classList.remove('inactive-turn');
        playerName.classList.add('inactive-turn');
        playerName.classList.remove('active-turn');
    }

    state.playerMonsters.forEach((hp, i) => {
        const monster = createMonsterElement(hp, i, 'player', state.selectedPlayer);
        playerSide.appendChild(monster);
    });

    state.botMonsters.forEach((hp, i) => {
        const monster = createMonsterElement(hp, i, 'bot', state.selectedBot);
        botSide.appendChild(monster);
    });

    if (state.playerMonsters.length === 0 && state.botMonsters.length === 0) {
        status.textContent = "Ничья!";
    } else if (state.botMonsters.length === 0) {
        status.textContent = "Победа!";
    } else if (state.playerMonsters.length === 0) {
        status.textContent = "Поражение!";
    } else {
        status.textContent = "Выберите своего и вражеского монстра";
    }

  
    }


