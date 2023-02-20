const {
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  LOTTO_NUMBERS_COUNT,
} = require('./constants');

class WinningNumbers {
  #numbers;

  constructor(winningNumbers) {
    this.validateWinningNumbers(winningNumbers);
    this.#numbers = winningNumbers
      .split(',')
      .map((number) => parseInt(number, 10));
  }

  validate(numbers) {
    if (!this.isValidWinningNumbers(numbers)) {
      throw new Error(
        `[ERROR] 당첨 번호는 ${MIN_LOTTO_NUMBER} 이상 ${MAX_LOTTO_NUMBER} 이하의 숫자 6개여야 합니다.`
      );
    }
    if (this.isDuplicateFor(winningNumbers)) {
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

  isLottoNumbersLength(winningNumbers) {
    return (
      winningNumbers
        .split(',')
        .filter((number) => this.isLottoNumber(parseInt(number, 10))).length ===
      6
    );
  }

  get numbers() {
    return this.#numbers;
  }
}

module.exports = WinningNumbers;
