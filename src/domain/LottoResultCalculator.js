import { NO_MATCH_PLACE, PERCENTATION } from '../constants/prize-constants.js';
import excludeKeyFromObject from '../utils/excludeKeyFromObject.js';
import roundToSecondDecimalPlace from '../utils/roundToSecondDecimalPlace.js';
import prize from './prize.js';

class LottoResultCalculator {
  #lottoList;

  #winningLotto;

  constructor({ lottoList, winningLottoNumbers, bonusNumber }) {
    this.#lottoList = lottoList;
    this.#winningLotto = { winningLottoNumbers, bonusNumber };
  }

  getTotalResult() {
    const initialResult = prize.getInitiallResultObject();
    const totalResult = this.#lottoList.reduce((acc, lotto) => {
      const rank = lotto.getRank(this.#winningLotto);
      if (rank !== NO_MATCH_PLACE) {
        initialResult[rank] += 1;
      }
      return acc;
    }, initialResult);

    return excludeKeyFromObject({ object: totalResult, removeKey: NO_MATCH_PLACE });
  }

  #getTotalReward() {
    const totalResult = this.getTotalResult();

    return prize.getTotalRewardByTotalResult(totalResult);
  }

  getProfit(purchaseAmount) {
    const totalReward = this.#getTotalReward();

    return roundToSecondDecimalPlace(totalReward / purchaseAmount) * PERCENTATION;
  }
}

export default LottoResultCalculator;
