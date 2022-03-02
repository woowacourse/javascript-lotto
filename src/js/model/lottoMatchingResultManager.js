/* eslint-disable max-lines-per-function */
import { LOTTO_MATCHING_RESULT_KEY } from '../utils/constants.js';

export default class LottoMatchingResultManager {
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

  createLottoMatchingResult(
    winningLottoNumbers,
    winningLottoBonusNumber,
    lottoList
  ) {
    this.#lottoMatchingResult = this.calcLottoMatchingResult(
      winningLottoNumbers,
      winningLottoBonusNumber,
      lottoList
    );
  }

  // 15줄 넘기지 않도록 하기
  calcLottoMatchingResult(
    winningLottoNumbers,
    winningLottoBonusNumber,
    lottoList
  ) {
    lottoList.forEach((lotto) => {
      const matchedNumCount = lotto.filter((num) => {
        return winningLottoNumbers.includes(num);
      }).length;

      const keyByMatchedNumCount =
        LottoMatchingResultManager.getKeyByMatchedNumCount(
          matchedNumCount,
          lotto,
          winningLottoBonusNumber
        );

      this.#lottoMatchingResult[keyByMatchedNumCount] += 1;
    });

    return this.#lottoMatchingResult;
  }

  static getKeyByMatchedNumCount(
    matchedNumCount,
    lotto,
    winningLottoBonusNumber
  ) {
    let key;

    switch (matchedNumCount) {
      case 3:
        key = LOTTO_MATCHING_RESULT_KEY.THREE;
        break;
      case 4:
        key = LOTTO_MATCHING_RESULT_KEY.FOUR;
        break;
      case 5:
        key = lotto.includes(winningLottoBonusNumber)
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
