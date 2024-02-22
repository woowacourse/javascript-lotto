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

  determineRank(winningNumbers, bonusNumber) {
    const matchingCount = this.#countMatchingNumbers(winningNumbers);
    const bonusMatch = this.#hasBonusNumber(bonusNumber);

    const rank = OPTIONS.RANK.find((rank_) =>
      this.#checkRankCondition(rank_, matchingCount, bonusMatch)
    );

    return rank;
  }

  #checkRankCondition(rank, matchingCount, bonusMatch) {
    return (
      this.#isMatchingCountEqual(rank, matchingCount) && this.#isBonusMatchEqual(rank, bonusMatch)
    );
  }

  #isMatchingCountEqual(rank, matchingCount) {
    const condition = OPTIONS.RANK_CONDITION[rank].matchingCount;
    return condition === undefined || condition === matchingCount;
  }

  #isBonusMatchEqual(rank, bonusMatch) {
    const condition = OPTIONS.RANK_CONDITION[rank].bonusMatch;
    return condition === undefined || condition === bonusMatch;
  }

  #countMatchingNumbers(winningNumbers) {
    return winningNumbers.reduce((matchingCount, winningNumber) => {
      return matchingCount + this.#numbers.includes(winningNumber);
    }, 0);
  }

  #hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
