import { ERROR_MESSAGES } from '../constants/message';
import InvalidInputException from '../exceptions/InvalidInputException';

class WinningLotto {
  #winningLotto;

  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    WinningLotto.#validateDuplication(winningLotto, bonusNumber);
    this.#winningLotto = winningLotto;
    WinningLotto.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  static #validateBonusNumber(bonusNumber) {
    const regex = /^(?:[1-9]|[1-3][0-9]|4[0-5])$/;

    if (!regex.test(bonusNumber)) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidBonusNumberType);
    }
  }

  static #validateDuplication(winningLotto, bonusNumber) {
    const numericBonusNumber = Number(bonusNumber);
    if (winningLotto.hasNumber(numericBonusNumber)) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidBonusNumberUniqueness);
    }
  }

  getWinningInfo() {
    return {
      answer: this.#winningLotto.getNumbers(),
      bonusNumber: this.#bonusNumber,
    };
  }
}

export default WinningLotto;
