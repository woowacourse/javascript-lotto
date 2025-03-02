import Lotto from './Lotto.js';

export default class WinningLotto {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = new Lotto(winningNumbers);
    this.#bonusNumber = bonusNumber;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  getWinningNumbers() {
    return this.#winningNumbers.getNumbers();
  }

  getMatchingCount(lotto) {
    return this.#winningNumbers.getMatchingCount(lotto.getNumbers());
  }
}
