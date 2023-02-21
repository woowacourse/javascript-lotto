const {
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  LOTTO_NUMBERS_COUNT,
} = require('./constants');

class WinningNumbers {
  #numbers;

  #bonusNumber;

  constructor(winningNumbersInput) {
    const numbers = winningNumbersInput.split(',').map(Number);
    this.validateWinningNumbers(numbers);
    this.#numbers = numbers;
  }

  validateWinningNumbers(numbers) {
    if (!this.isValidWinningNumbers(numbers)) {
      throw new Error(
        `[ERROR] 당첨 번호는 ${MIN_LOTTO_NUMBER} 이상 ${MAX_LOTTO_NUMBER} 이하의 숫자 6개여야 합니다.`
      );
    }
    if (this.hasDuplicateNumber(numbers)) {
      throw new Error('[ERROR] 당첨 번호가 중복이 되면 안됩니다. ');
    }
  }

  isValidWinningNumbers(numbers) {
    return (
      numbers.filter((number) => this.isValidWinningNumber(number)).length ===
      LOTTO_NUMBERS_COUNT
    );
  }

  isValidWinningNumber(number) {
    return number >= MIN_LOTTO_NUMBER && number <= MAX_LOTTO_NUMBER;
  }

  hasDuplicateNumber(numbers) {
    return new Set(numbers).size !== numbers.length;
  }

  initBonusNumber(bonusNumberInput) {
    const bonusNumber = Number(bonusNumberInput);

    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  validateBonusNumber(bonusNumber) {
    if (!this.isValidWinningNumber(bonusNumber)) {
      throw new Error(
        `[ERROR] 보너스 번호는 ${MIN_LOTTO_NUMBER} 이상 ${MAX_LOTTO_NUMBER} 이하의 숫자여야 합니다.`
      );
    }
    if (this.isDuplicateFor(this.#numbers, bonusNumber)) {
      throw new Error('[ERROR] 당첨 번호가 중복이 되면 안됩니다. ');
    }
  }

  isDuplicateFor(winningNumbers, bonusNumber) {
    return winningNumbers.includes(bonusNumber);
  }

  get numbers() {
    return this.#numbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

module.exports = WinningNumbers;
