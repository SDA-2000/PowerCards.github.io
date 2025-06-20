import { state, setCurrentTurn} from './game.js';
import { render } from './render.js';
import { playSound } from './sounds.js';

export function botTurn() {
  if (state.playerMonsters.length === 0 || state.botMonsters.length === 0) return;

    const botIndex = state.botMonsters.indexOf(Math.max(...state.botMonsters));
    const playerIndex = state.playerMonsters.indexOf(Math.min(...state.playerMonsters));
    playSound("cardClick");
    state.selectedBot = botIndex;
    state.selectedPlayer = null;
    render();

    setTimeout(() => {
        playSound("cardClick");
        state.selectedPlayer = playerIndex;
        render();

        setTimeout(() => {
        let b = state.botMonsters[botIndex];
        let p = state.playerMonsters[playerIndex];

        b -= p;
        p -= state.botMonsters[botIndex];

        if (b <= 0) state.botMonsters.splice(botIndex, 1);
        else state.botMonsters[botIndex] = b;

        if (p <= 0) state.playerMonsters.splice(playerIndex, 1);
        else state.playerMonsters[playerIndex] = p;

        state.selectedPlayer = null;
        state.selectedBot = null;

        setCurrentTurn('player');
        render();
        }, 600);
    }, 600);
    }


