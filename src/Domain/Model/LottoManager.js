import {
  LOTTO_DEFINITION,
  LOTTO_PRIZE_DEFINITION,
  LOTTO_PRIZE_MONEY_DEFINITION,
} from '../Constant/definition.js';

class LottoManager {
  #winningLotto;
  #lottoList;

  constructor(winningLotto, lottoList) {
    this.#winningLotto = winningLotto;
    this.#lottoList = lottoList;
  }

  compareWinningLotto() {
    return this.#lottoList.reduce(
      (lottoResult, lotto) => {
        const matchingCount = this.#winningLotto.countMatchingNumbers(lotto);
        const hasBonusNumber = this.#winningLotto.checkBonusNumber(lotto);
        const rank = this.#checkCondition(hasBonusNumber, matchingCount);
        lottoResult[rank] += 1;
        return lottoResult;
      },
      {
        FIRST_PRIZE: 0,
        SECOND_PRIZE: 0,
        THIRD_PRIZE: 0,
        FOURTH_PRIZE: 0,
        FIFTH_PRIZE: 0,
        NONE: 0,
      },
    );
  }

  #checkCondition(hasBonusNumber, counts) {
    if (counts === 6) {
      return LOTTO_PRIZE_DEFINITION.FIRST_PRIZE;
    } else if (counts === 5 && hasBonusNumber) {
      return LOTTO_PRIZE_DEFINITION.SECOND_PRIZE;
    } else if (counts === 5 && !hasBonusNumber) {
      return LOTTO_PRIZE_DEFINITION.THIRD_PRIZE;
    } else if (counts === 4) {
      return LOTTO_PRIZE_DEFINITION.FOURTH_PRIZE;
    } else if (counts === 3) {
      return LOTTO_PRIZE_DEFINITION.FIFTH_PRIZE;
    } else {
      return LOTTO_PRIZE_DEFINITION.NONE;
    }
  }

  calculatePrize(result) {
    return Object.entries(result).reduce(
      (acc, [key, count]) => acc + LOTTO_PRIZE_MONEY_DEFINITION[key] * count,
      0,
    );
  }

  calculateProfit(totalLottoPrize) {
    return (
      (totalLottoPrize /
        (LOTTO_DEFINITION.PRICE_UNIT * this.#lottoList.length)) *
      100
    );
  }
}

export default LottoManager;
