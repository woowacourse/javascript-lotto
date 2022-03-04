export default class WinningNumbers {
  #winningNumbers = [];
  #winningResult = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  setWinningNumbers(winningNumbers) {
    this.#winningNumbers = winningNumbers;
  }

  compareWinningNumbers(lotto) {
    const matchNumberCount = lotto.filter((number) => this.#winningNumbers.includes(number)).length;
    const isMatchBonus = lotto.includes(this.#winningNumbers[this.#winningNumbers.length - 1]);
    if (matchNumberCount === 6) {
      this.#winningResult.first += 1;
      return;
    }
    if (matchNumberCount === 5 && isMatchBonus) {
      this.#winningResult.second += 1;
      return;
    }
    if (matchNumberCount === 5) {
      this.#winningResult.third += 1;
      return;
    }
    if (matchNumberCount === 4) {
      this.#winningResult.fourth += 1;
      return;
    }
    if (matchNumberCount === 3) {
      this.#winningResult.fifth += 1;
    }
  }
}
