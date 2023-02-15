class WinningNumbers {
  #winningNumbers;

  constructor(winningNumbers) {
    this.#validateWinningNumbers(winningNumbers);
    this.#winningNumbers = winningNumbers.split(',');
  }

  #validateWinningNumbers(winningNumbers) {
    if (!this.#isLottoNumbersLength(winningNumbers)) {
      throw new Error(
        '[ERROR] 로또 당첨 번호는 1 ~ 45 범위 내에서만 가능합니다.'
      );
    }
  }

  #isLottoNumber(number) {
    return number >= 1 && number <= 45;
  }

  #isLottoNumbersLength(winningNumbers) {
    return (
      winningNumbers
        .split(',')
        .filter((number) => this.#isLottoNumber(parseInt(number, 10)))
        .length === 6
    );
  }
}

module.exports = WinningNumbers;
