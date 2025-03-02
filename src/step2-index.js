import { eventHandler } from './web/eventHandler.js';
import { state } from './state/lottoGameState.js';

document.addEventListener('DOMContentLoaded', () => {
  eventHandler(state);
});
