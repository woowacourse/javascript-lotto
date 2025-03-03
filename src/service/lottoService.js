import { calculateRank } from '../domain/calculateRank.js';
import LottoResult from '../domain/LottoResult.js';
import { calculateWinningRate } from '../domain/calculateWinningRate.js';
import { LOTTO_CONDITION } from '../constants/constants.js';
import { purchaseLotto } from '../domain/purchaseLotto.js';

export const lottoService = {
  purchaseLotto(purchaseMoney) {
    return purchaseLotto(purchaseMoney);
  },

  calculateLottoResult(lottoList, winningLotto) {
    const rankingList = lottoList.map((lotto) => {
      return calculateRank(lotto.matchWinning(winningLotto.winningNumbers), lotto.hasNumber(winningLotto.bonusNumber));
    });
    return new LottoResult(rankingList);
  },

  calculateWinningRate(lottoList, lottoResult) {
    return calculateWinningRate(LOTTO_CONDITION.PRICE * lottoList.length, lottoResult.totalPrize);
  },
};
