import { checkValidWinningNumberInput } from '../utils/Lotto/validator';

export default class WinningLotto {
  #winningNumbers = [];
  #bonusNumber = null;

  get winningNumbers() {
    return this.#winningNumbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  generate(winningNumbers, bonusNumber) {
    try {
      checkValidWinningNumberInput([...new Set(winningNumbers.concat(bonusNumber))]);
      this.#winningNumbers = winningNumbers;
      this.#bonusNumber = bonusNumber;
      return this;
    } catch (error) {
      return 'WRONG_WINNING_LOTTO';
    }
  }
}
