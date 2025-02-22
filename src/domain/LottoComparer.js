import { PRIZE } from "../config/const.js";

class LottoComparer {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  lottoCompareResult(generatedLottos) {
    let compareResult = [];
    generatedLottos.forEach((lotto) => {
      const matchingCount = this.#getMatchingCount(lotto);
      this.#calculateCompareResult(matchingCount, lotto, compareResult);
    });
    return compareResult;
  }

  #getMatchingCount(lotto) {
    return lotto.filter((number) => this.#winningNumbers.includes(number))
      .length;
  }

  #calculateCompareResult(matchingCount, lotto, compareResult) {
    if (matchingCount >= PRIZE.MIN_MATCH_COUNT) {
      compareResult.push({
        matchCount: matchingCount,
        hasBonus: this.#hasBonusNumber(matchingCount, lotto),
      });
    }
  }

  #hasBonusNumber(matchingCount, lotto) {
    return matchingCount === 5 && lotto.includes(this.#bonusNumber);
  }
}

export default LottoComparer;
