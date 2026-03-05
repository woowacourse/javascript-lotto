import ERROR_MESSAGE from "./constants/errorMessage.js";

class WinningNumbersAndBonusNumberBuilder {
  #winningNumbers;
  #bonusNumber;

  setWinningNumbers(winningNumbers) {
    this.validateWinningNumbers(winningNumbers);
    this.#winningNumbers = winningNumbers;
    return this;
  }

  setBonusNumber(bonusNumber) {
    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
    return this;
  }

  build() {
    return {
      winningNumbers: this.#winningNumbers,
      bonusNumber: this.#bonusNumber,
    };
  }

  validateWinningNumbers(winningNumbers) {
    const isInteger = winningNumbers.every((number) =>
      Number.isInteger(number),
    );

    if (!isInteger) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.INTEGER);
    }

    const isOutOfRange = winningNumbers.some(
      (number) => number < 1 || number > 45,
    );

    if (isOutOfRange) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.RANGE);
    }

    const uniqueNumbers = new Set(winningNumbers);

    if (uniqueNumbers.size !== winningNumbers.length) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.DUPLICATE);
    }
  }

  validateBonusNumber(bonusNumber) {
    const isInteger = Number.isInteger(bonusNumber);

    if (!isInteger) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.INTEGER);
    }

    const isOutOfRange = bonusNumber < 1 || bonusNumber > 45;

    if (isOutOfRange) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.RANGE);
    }

    if (this.#winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.DUPLICATE);
    }
  }
}

export default WinningNumbersAndBonusNumberBuilder;
