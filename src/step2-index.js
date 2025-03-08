import { lottoGameEventHandler, modalEventHandler, purchaseEventHandler } from './web/eventHandler.js';
import { state } from './web/state/lottoGameState.js';

document.addEventListener('DOMContentLoaded', () => {
  purchaseEventHandler(state);
  lottoGameEventHandler(state);
  modalEventHandler();
});
