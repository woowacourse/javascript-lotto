class WinningNumbers {
  #numbers;

  constructor(winningNumbers) {
    this.validateWinningNumbers(winningNumbers);
    this.#numbers = winningNumbers
      .split(',')
      .map((number) => parseInt(number, 10));
  }

  validateWinningNumbers(winningNumbers) {
    if (!this.isLottoNumbersLength(winningNumbers)) {
      throw new Error(
        '[ERROR] 로또 당첨 번호는 1 ~ 45 범위 내에서만 가능합니다.'
      );
    }
    if (this.isDuplicateFor(winningNumbers)) {
      throw new Error('[ERROR] 당첨 번호가 중복이 되면 안됩니다. ');
    }
  }

  isLottoNumber(number) {
    return number >= 1 && number <= 45;
  }

  isDuplicateFor(winningNumbers) {
    return new Set(winningNumbers.split(',')).size !== 6;
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
