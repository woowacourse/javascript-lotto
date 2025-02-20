import Lotto from './Lotto.js';

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);
    this.#bonusNumber = bonusNumber;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  countMatchingNumbers(lotto) {
    const matchingNumbers = this.getNumbers().filter((number) =>
      lotto.getNumbers().includes(number)
    ).length;
    return matchingNumbers;
  }

  checkBonusNumber(lotto) {
    return lotto.getNumbers().includes(this.#bonusNumber);
  }
}

export default WinningLotto;
