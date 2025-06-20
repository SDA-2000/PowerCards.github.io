    import { render } from './render.js';
    import { setCurrentTurn, state } from './game.js';

    export function botTurn() {
    if (state.playerMonsters.length === 0 || state.botMonsters.length === 0) return;

    let botIndex = state.botMonsters.indexOf(Math.max(...state.botMonsters));
    let playerIndex = state.playerMonsters.indexOf(Math.min(...state.playerMonsters));

    let b = state.botMonsters[botIndex];
    let p = state.playerMonsters[playerIndex];

    b -= p;
    p -= state.botMonsters[botIndex];

    if (b <= 0) state.botMonsters.splice(state.botIndex, 1);
    else state.botMonsters[state.botIndex] = b;

    if (p <= 0) state.playerMonsters.splice(state.playerIndex, 1);
    else state.playerMonsters[state.playerIndex] = p;

    setCurrentTurn('player');

    render();
    }

