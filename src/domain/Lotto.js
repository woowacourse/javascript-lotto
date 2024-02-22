import OPTIONS from '../constant/Options.js';
import LottoNumbersValidator from '../util/validation/LottoNumbersValidator.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    LottoNumbersValidator.validate(numbers);

    this.#numbers = this.#sortNumbersAscending(numbers);
  }

  #sortNumbersAscending(numbers) {
    return numbers.sort();
  }

  getNumbers() {
    return this.#numbers;
  }

  // TODO: 리팩터링 (메서드 depth 1, 매직넘버)
  // eslint-disable-next-line max-lines-per-function
  determineRank(winningNumbers, bonusNumber) {
    const matchingCount = this.#countMatchingNumbers(winningNumbers);
    const bonusMatch = this.#hasBonusNumber(bonusNumber);

    for (let rank = 1; rank <= 5; rank += 1) {
      if (this.#checkRankCondition(rank, matchingCount, bonusMatch)) {
        return rank;
      }
    }

    return 6;
  }

  // eslint-disable-next-line max-lines-per-function
  #checkRankCondition(rank, matchingCount, bonusMatch) {
    const {
      matchingCount: matchingCountCondition,
      bonusMatch: bonusMatchCondition
    } = OPTIONS.RANK_CONDITION[rank];

    return (
      matchingCountCondition === matchingCount &&
      (!bonusMatchCondition || bonusMatchCondition === bonusMatch)
    );
  }

  #countMatchingNumbers(winningNumbers) {
    return winningNumbers.reduce((matchingCount, winningNumber) => {
      return matchingCount + this.#numbers.includes(winningNumber);
    }, 0);
  }

  #hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
