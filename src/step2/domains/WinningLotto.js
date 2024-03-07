import { ERROR_MESSAGES } from "../constants/lotto";
import InvalidInputException from "../exceptions/InvalidInputException";

class WinningLotto {
  #winningLotto;

  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    WinningLotto.#validateBonusNumber(bonusNumber);
    WinningLotto.#validateDuplication(winningLotto, bonusNumber);
    this.#winningLotto = winningLotto;
    this.#bonusNumber = bonusNumber;
  }

  static #validateBonusNumber(bonusNumber) {
    const regex = /^(?:[1-9]|[1-3][0-9]|4[0-5])$/;

    if (!regex.test(bonusNumber)) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidBonusNumberType);
    }
  }

  static #validateDuplication(winningLotto, bonusNumber) {
    if (winningLotto.hasNumber(bonusNumber)) {
      throw new InvalidInputException(
        ERROR_MESSAGES.invalidBonusNumberUniqueness,
      );
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
