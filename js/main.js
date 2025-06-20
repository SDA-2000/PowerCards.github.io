    import { render } from './render.js';
    import { handlePlayerClick, attack, generateBalancedMonsters, resetGame } from './game.js';

    const endTurnButton = document.getElementById("endTurnBtn");
    const restartButton = document.getElementById("restartBtn");

    document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('monster')) {
        handlePlayerClick(e.target.dataset)}});
    endTurnButton.addEventListener('click', (b) => {
        attack();
    })
    restartButton.addEventListener('click', () => {
        resetGame();
    });

    generateBalancedMonsters();
    render();
