export default class LottoResult {
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

  compareWinningNumbers(lotto, winningNumbers) {
    const matchNumberCount = lotto.filter((number) => winningNumbers.includes(number)).length;
    const isMatchBonus = lotto.includes(winningNumbers[winningNumbers.length - 1]);
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

  resetLottoResult() {
    this.#lottoResult = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
  }
}
