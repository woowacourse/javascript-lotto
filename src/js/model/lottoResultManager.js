/* eslint-disable max-lines-per-function */
import { LOTTO_MATCHING_RESULT_KEY } from '../utils/constants.js';

export default class LottoResultManager {
  #lottoMatchingResult;

  constructor() {
    this.#lottoMatchingResult = {
      [LOTTO_MATCHING_RESULT_KEY.THREE]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FOUR]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FIVE]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS]: 0,
      [LOTTO_MATCHING_RESULT_KEY.SIX]: 0,
      [LOTTO_MATCHING_RESULT_KEY.NOTHING]: 0,
    };
  }

  get lottoMatchingResult() {
    return this.#lottoMatchingResult;
  }

  createLottoMatchingResult(lottoWinningNumbers, lottoWinningBonusNumber, lottoList) {
    this.#lottoMatchingResult = this.calcLottoMatchingResult(
      lottoWinningNumbers,
      lottoWinningBonusNumber,
      lottoList
    );
  }

  // 15줄 넘기지 않도록 하기
  calcLottoMatchingResult(lottoWinningNumbers, lottoWinningBonusNumber, lottoList) {
    console.log(lottoList);
    lottoList.forEach((lotto) => {
      const matchedNumCount = lotto.filter((num) => {
        return lottoWinningNumbers.includes(num);
      }).length;

      const keyByMatchedNumCount = LottoResultManager.getKeyByMatchedNumCount(
        matchedNumCount,
        lotto,
        lottoWinningBonusNumber
      );

      this.#lottoMatchingResult[keyByMatchedNumCount] += 1;
    });

    return this.#lottoMatchingResult;
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
}
