import LottoGameState from './View/Web/LottoGameState.js';
import LottoGameView from './View/Web/LottoGameView.js';
import LottoGameController from './View/Web/LottoGameController.js';

document.addEventListener('DOMContentLoaded', () => {
  const state = new LottoGameState();
  new LottoGameView(state);
  new LottoGameController(state);
});
