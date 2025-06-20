    import { render } from './render.js';
    import { handlePlayerClick, attack } from './game.js';

    const endTurnButton = document.getElementById("endTurnBtn");

    document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('monster')) {
        handlePlayerClick(e.target.dataset)}});
    endTurnButton.addEventListener('click', (b) => {
        attack();
    })

    render();
