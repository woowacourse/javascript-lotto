class LottoResult {
  #winningNumbers;
  #bonusNumber;
  #lottoNumbersList;

  constructor(winningLotto, lottoArray) {
    this.#winningNumbers = winningLotto.numbers;
    this.#bonusNumber = winningLotto.bonusNumber;
    this.#lottoNumbersList = lottoArray.map((lotto) => lotto.numbers);
  }

  #isBonusMatched(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusNumber);
  }
  #calculateMatchCount(lottoNumbers) {
    return lottoNumbers.filter((number) => this.#winningNumbers.includes(number)).length;
  }

  calculateResult() {
    const lottoResult = { 3: 0, 4: 0, 5: 0, 6: 0, bonus: 0 };

    this.#lottoNumbersList.forEach((lottoNumbers) => {
      const matchingCount = this.#calculateMatchCount(lottoNumbers);

      if (matchingCount >= 3) {
        lottoResult[matchingCount]++;
      }
      if (matchingCount === 5 && this.#isBonusMatched(lottoNumbers)) {
        lottoResult[5]--;
        lottoResult["bonus"]++;
      }
    });
    return lottoResult;
  }
}

export default LottoResult;
