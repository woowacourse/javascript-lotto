class LottoResult {
  #winningLotto;
  #bonusNumber;
  #lottoArray;

  constructor(winningLotto, lottoArray) {
    this.#bonusNumber = winningLotto.bonusNumber;
    this.#winningLotto = winningLotto;
    this.#lottoArray = lottoArray;
  }

  #isBonusMatched(lotto) {
    return lotto.has(this.#bonusNumber);
  }
  #calculateMatchCount(lotto) {
    return lotto.match(this.#winningLotto).length;
  }

  calculateResult() {
    const lottoResult = { 3: 0, 4: 0, 5: 0, 6: 0, bonus: 0 };

    this.#lottoArray.forEach((lotto) => {
      const matchingCount = this.#calculateMatchCount(lotto);

      if (matchingCount < 3) return;

      if (matchingCount === 5 && this.#isBonusMatched(lotto)) {
        lottoResult["bonus"]++;
        return;
      }

      lottoResult[matchingCount]++;
    });
    return lottoResult;
  }
}

export default LottoResult;
