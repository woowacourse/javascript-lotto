export default class WinningNumbers {
  #winningNumbers = [];
  #lottoResult = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  getlottoResult() {
    return this.#lottoResult;
  }

  setWinningNumbers(winningNumbers) {
    this.#winningNumbers = winningNumbers;
  }

  compareWinningNumbers(lotto) {
    const matchNumberCount = lotto.filter((number) => this.#winningNumbers.includes(number)).length;
    const isMatchBonus = lotto.includes(this.#winningNumbers[this.#winningNumbers.length - 1]);
    if (matchNumberCount === 6) {
      this.#lottoResult.first += 1;
      return;
    }
    if (matchNumberCount === 5 && isMatchBonus) {
      this.#lottoResult.second += 1;
      return;
    }
    if (matchNumberCount === 5) {
      this.#lottoResult.third += 1;
      return;
    }
    if (matchNumberCount === 4) {
      this.#lottoResult.fourth += 1;
      return;
    }
    if (matchNumberCount === 3) {
      this.#lottoResult.fifth += 1;
    }
  }
}
