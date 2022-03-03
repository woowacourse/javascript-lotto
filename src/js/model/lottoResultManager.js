/* eslint-disable max-lines-per-function */
import { LOTTO_PRIZE_MONEY_UNIT, LOTTO_MATCHING_RESULT_KEY } from '../utils/constants.js';

export default class LottoResultManager {
  // 15줄 넘기지 않도록 하기
  static calcLottoMatchingResult(lottoWinningNumbers, lottoWinningBonusNumber, lottoList) {
    const lottoMatchingResult = {
      [LOTTO_MATCHING_RESULT_KEY.THREE]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FOUR]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FIVE]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS]: 0,
      [LOTTO_MATCHING_RESULT_KEY.SIX]: 0,
      [LOTTO_MATCHING_RESULT_KEY.NOTHING]: 0,
    };

    lottoList.forEach((lotto) => {
      const matchedNumCount = lotto.filter((num) => {
        return lottoWinningNumbers.includes(num);
      }).length;

      const keyByMatchedNumCount = LottoResultManager.getKeyByMatchedNumCount(
        matchedNumCount,
        lotto,
        lottoWinningBonusNumber
      );

      lottoMatchingResult[keyByMatchedNumCount] += 1;
    });

    return lottoMatchingResult;
  }

  static getKeyByMatchedNumCount(matchedNumCount, lotto, lottoWinningBonusNumber) {
    let key;

    switch (matchedNumCount) {
      case 3:
        key = LOTTO_MATCHING_RESULT_KEY.THREE;
        break;
      case 4:
        key = LOTTO_MATCHING_RESULT_KEY.FOUR;
        break;
      case 5:
        key = lotto.includes(lottoWinningBonusNumber)
          ? LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS
          : LOTTO_MATCHING_RESULT_KEY.FIVE;
        break;
      case 6:
        key = LOTTO_MATCHING_RESULT_KEY.SIX;
        break;
      default:
        key = LOTTO_MATCHING_RESULT_KEY.NOTHING;
    }

    return key;
  }

  static calcProfit(purchaseMoney, lottoMatchingResult) {
    const totalPrizeMoney = Object.keys(lottoMatchingResult).reduce((currentPrizeMoney, key) => {
      const prizeAmount = lottoMatchingResult[key];
      const earnedPrizeMoney = this.getPrizeUnitByKey(key) * prizeAmount;

      return currentPrizeMoney + earnedPrizeMoney;
    }, 0);

    return Math.round(((totalPrizeMoney - purchaseMoney) / purchaseMoney) * 100);
  }

  static getPrizeUnitByKey(key) {
    switch (key) {
      case LOTTO_MATCHING_RESULT_KEY.THREE:
        return LOTTO_PRIZE_MONEY_UNIT.THREE;
      case LOTTO_MATCHING_RESULT_KEY.FOUR:
        return LOTTO_PRIZE_MONEY_UNIT.FOUR;
      case LOTTO_MATCHING_RESULT_KEY.FIVE:
        return LOTTO_PRIZE_MONEY_UNIT.FIVE;
      case LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS:
        return LOTTO_PRIZE_MONEY_UNIT.FIVE_PLUS_BONUS;
      case LOTTO_MATCHING_RESULT_KEY.SIX:
        return LOTTO_PRIZE_MONEY_UNIT.SIX;
      default:
        return 1;
    }
  }
}
