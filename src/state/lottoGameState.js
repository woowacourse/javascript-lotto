import LottoGame from '../domain/LottoGame.js';
import LottoMaker from '../domain/LottoMaker.js';
import LottoMatch from '../domain/LottoMatch.js';

export const state = {
  lottoMaker: new LottoMaker(),
  lottoGame: new LottoGame(),
  lottoMatch: new LottoMatch(),
};
