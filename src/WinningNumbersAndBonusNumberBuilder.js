class WinningNumbersAndBonusNumberBuilder {
  #winningNumbers;
  #bonusNumber;

  setWinningNumbers(winningNumbers) {
    this.validateWinningNumbers(winningNumbers);
    this.#winningNumbers = winningNumbers;
    return {
      setBonusNumber: this.#setBonusNumber.bind(this),
    };
  }

  #setBonusNumber(bonusNumber) {
    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
    return {
      build: this.#build.bind(this),
    };
  }

  #build() {
    return {
      winningNumbers: this.#winningNumbers,
      bonusNumber: this.#bonusNumber,
    };
  }

  validateWinningNumbers(winningNumbers) {
    const isInteger = winningNumbers.every((number) =>
      Number.isInteger(number),
    );

    const isOutOfRange = winningNumbers.some(
      (number) => number < 1 || number > 45,
    );

    if (!isInteger || isOutOfRange) {
      throw new Error();
    }
  }

  validateBonusNumber(bonusNumber) {
    const isInteger = Number.isInteger(bonusNumber);
    const isOutOfRange = bonusNumber < 1 || bonusNumber > 45;

    if (!isInteger || isOutOfRange) {
      throw new Error();
    }

    if (this.#winningNumbers.includes(bonusNumber)) {
      throw new Error();
    }
  }
}

export default WinningNumbersAndBonusNumberBuilder;
