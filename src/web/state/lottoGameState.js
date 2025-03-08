import LottoGame from '../../common/domain/LottoGame.js';
import LottoMaker from '../../common/domain/LottoMaker.js';
import LottoMatch from '../../common/domain/LottoMatch.js';

export const state = {
  lottoMaker: new LottoMaker(),
  lottoGame: new LottoGame(),
  lottoMatch: new LottoMatch(),
};
