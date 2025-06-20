import {
  state,
  getCurrentTurn, resetGame
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
        const botSide = document.getElementById('botSide');
        const status = document.getElementById('status');
        const restartBtn = document.getElementById('restartBtn');
        status.innerHTML = "Выберите своего и вражеского монстра"
        const isGameOver =
        state.playerMonsters.length === 0 ||
        state.botMonsters.length === 0;
        const endTurnButton = document.getElementById('endTurnBtn');
        playerSide.innerHTML = '';
        botSide.innerHTML = '';
        restartBtn.style.display = 'none';

        const playerName = document.createElement('h2');
        playerName.id = 'playerName';
        playerName.textContent = 'Цонду (Вы)';
        playerSide.appendChild(playerName);

        const botName = document.createElement('h2');
        botName.id = 'botName';
        botName.textContent = 'Тенцинг';
        botSide.appendChild(botName);

        if (currentTurn === 'player') {
            endTurnButton.disabled = !(state.selectedPlayer !== null && state.selectedBot !== null);
            endTurnButton.textContent = 'Закончить ход';
            playerName.classList.add('active-turn');
            playerName.classList.remove('inactive-turn');
            botName.classList.add('inactive-turn');
            botName.classList.remove('active-turn');
        } else {
            endTurnButton.disabled = true;
            endTurnButton.textContent = 'Ход противника';
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
        if(isGameOver){

            if (state.playerMonsters.length === 0 && state.botMonsters.length === 0) {
                status.textContent = "Ничья!";
                restartBtn.style.display = 'inline-block';
            } else if (state.botMonsters.length === 0) {
                status.textContent = "Победа!";
                restartBtn.style.display = 'inline-block';
            } else if (state.playerMonsters.length === 0) {
                status.textContent = "Поражение!";
                restartBtn.style.display = 'inline-block';
            } else {
                status.textContent = "Выберите своего и вражеского монстра";
                restartBtn.style.display = 'none';
            }

        }
            
}