import LottoGameState from './View/Web/LottoGameState.js';
import LottoGameView from './View/Web/LottoGameView.js';
import LottoGameController from './View/Web/LottoGameController.js';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const state = new LottoGameState();
    const view = new LottoGameView(state);
    new LottoGameController(state, view);
  }, 0);
});
