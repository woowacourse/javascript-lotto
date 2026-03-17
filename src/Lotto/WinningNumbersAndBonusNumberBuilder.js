import ERROR_MESSAGE from "../constants/errorMessage.js";
import LOTTO from "../constants/lotto.js";
import LottoNumber from "./LottoNumber.js";

class WinningNumbersAndBonusNumberBuilder {
  #winningNumbers;
  #bonusNumber;

  setWinningNumbers(winningNumbers) {
    this.validateWinningNumbers(winningNumbers);
    this.#winningNumbers = winningNumbers.map(
      (number) => new LottoNumber(number),
    );
    return this;
  }

  setBonusNumber(bonusNumber) {
    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = new LottoNumber(bonusNumber);
    return this;
  }

  build() {
    return {
      winningNumbers: this.#winningNumbers,
      bonusNumber: this.#bonusNumber,
    };
  }

  validateWinningNumbers(winningNumbers) {
    const uniqueNumbers = new Set(winningNumbers);

    if (uniqueNumbers.size !== winningNumbers.length) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.DUPLICATE);
    }

    if (
      winningNumbers.some(
        (number) => Number.isNaN(number) || !Number.isInteger(number),
      )
    ) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.INTEGER);
    }

    if (winningNumbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.LENGTH);
    }

    if (winningNumbers.some((number) => number < 1 || number > 45)) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.RANGE);
    }
  }

  validateBonusNumber(bonusNumber) {
    if (Number.isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.NUMBER);
    }

    if (parseInt(bonusNumber) !== bonusNumber) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.INTEGER);
    }

    if (bonusNumber < LOTTO.MIN || bonusNumber > LOTTO.MAX) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.RANGE);
    }

    if (
      this.#winningNumbers.some((winningNumber) =>
        winningNumber.equals(bonusNumber),
      )
    ) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.DUPLICATE);
    }
  }
}

export default WinningNumbersAndBonusNumberBuilder;
