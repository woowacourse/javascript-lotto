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
    const winningNumbersSet = new Set(this.getNumbers());
    return lotto.getNumbers().filter((number) => winningNumbersSet.has(number))
      .length;
  }

  checkBonusNumber(lotto) {
    return lotto.getNumbers().includes(this.#bonusNumber);
  }
}

export default WinningLotto;
