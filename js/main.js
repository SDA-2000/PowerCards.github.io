    import { render } from './render.js';
    import { handlePlayerClick, attack } from './game.js';

    document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('monster')) {
        handlePlayerClick(e.target.dataset);
    } else {
        attack();
    }
    });

    render();
