const { LOTTO } = require('./constants');

class WinningNumbers {
  #numbers;

  constructor(winningNumbers) {
    this.#numbers = winningNumbers;

    this.validateWinningNumbers(winningNumbers);
  }

  validateWinningNumbers(winningNumbers) {
    if (!this.isLottoNumbersLength(winningNumbers)) {
      throw new Error(
        '[ERROR] 로또 당첨 번호는 1 ~ 45 범위의 숫자 6개만 입력 가능합니다. ex) 1,2,3,4,5,6'
      );
    }
    if (this.isDuplicateFor(winningNumbers)) {
      throw new Error('[ERROR] 입력하신 당첨번호 각각 중복이 되면 안됩니다. ');
    }
  }

  isLottoNumber(number) {
    return number >= 1 && number <= 45;
  }

  isDuplicateFor() {
    return new Set(this.#numbers).size !== 6;
  }

  isLottoNumbersLength(winningNumbers) {
    this.#numbers = winningNumbers.split(',').map((number) => Number(number));

    return (
      this.#numbers.filter((number) => this.isLottoNumber(number)).length ===
      LOTTO.count
    );
  }

  get numbers() {
    return this.#numbers;
  }
}

module.exports = WinningNumbers;
