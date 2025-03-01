import LottoGame from './domain/LottoGame.js';
import LottoMaker from './domain/LottoMaker.js';
import LottoMatch from './domain/LottoMatch.js';
import { eventHandler } from './web/eventHandler.js';

const state = {
  lottoMaker: new LottoMaker(),
  lottoGame: new LottoGame(),
  lottoMatch: new LottoMatch(),
};

document.addEventListener('DOMContentLoaded', () => {
  eventHandler(state);
});
