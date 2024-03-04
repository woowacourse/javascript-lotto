import { NO_MATCH_PLACE, PERCENTAGE } from '../constants/prize-constants.js';
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
    const initialResult = prize.generateInitialResultObject();

    this.#lottoList.forEach((lotto) => {
      const rank = lotto.getRank(this.#winningLotto);
      if (rank !== NO_MATCH_PLACE) {
        initialResult[rank] += 1;
      }
    });

    return excludeKeyFromObject({ object: initialResult, removeKey: NO_MATCH_PLACE });
  }

  #getTotalReward() {
    const totalResult = this.getTotalResult();

    return prize.getTotalRewardByTotalResult(totalResult);
  }

  getProfit(purchaseAmount) {
    const totalReward = this.#getTotalReward();
    const profitBeforeRound = roundToSecondDecimalPlace(totalReward / purchaseAmount) * 100;

    return roundToSecondDecimalPlace(profitBeforeRound);
  }
}

export default LottoResultCalculator;
