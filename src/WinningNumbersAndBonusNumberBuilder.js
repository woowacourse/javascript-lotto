class WinningNumbersAndBonusNumberBuilder {
  #winningNumbers;
  #bonusNumber;

  setWinningNumbers(winningNumbers) {
    this.validateWinningNumbers(winningNumbers);
    this.#winningNumbers = winningNumbers;
    return this;
  }

  validateWinningNumbers(winningNumbers) {
    const isNotInteger = winningNumbers.some(
      (number) => !Number.isInteger(number),
    );

    const isOutOfRange = winningNumbers.some(
      (number) => number < 1 || number > 45,
    );

    if (isNotInteger || isOutOfRange) {
      throw new Error();
    }
  }

  validateBonusNumber(bonusNumber) {
    const isNotInteger = !Number.isInteger(bonusNumber);
    const isOutOfRange = bonusNumber < 1 || bonusNumber > 45;

    if (isNotInteger || isOutOfRange) {
      throw new Error();
    }

    if (this.#winningNumbers.includes(bonusNumber)) {
      throw new Error();
    }
  }
}

export default WinningNumbersAndBonusNumberBuilder;
