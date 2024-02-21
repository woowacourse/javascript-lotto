class WinningRank {
  #lottoDrawDetail;

  #winningRankDetail = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  constructor({ winningNumber, lottoNumbers, bonusNumber }) {
    this.#lottoDrawDetail = { winningNumber, lottoNumbers, bonusNumber };
  }

  calculateRank() {
    return this.#lottoDrawDetail.lottoNumbers.reduce((prevWinningRankDetail, lottoNumber) => {
      const rank = this.#determineRank(lottoNumber);

      return rank !== null
        ? { ...prevWinningRankDetail, [rank]: prevWinningRankDetail[rank] + 1 }
        : prevWinningRankDetail;
    }, this.#winningRankDetail);
  }

  #determineRank(lottoNumber) {
    const matchCount = this.#countMatchingNumbers(lottoNumber);

    if (matchCount === 6) return 1;
    if (matchCount === 5 && this.#isIncludingBonusNumber(lottoNumber)) return 2;
    if (matchCount === 5) return 3;
    if (matchCount === 4) return 4;
    if (matchCount === 3) return 5;
    return null;
  }

  #countMatchingNumbers(lottoNumber) {
    const winningNumberSet = new Set(this.#lottoDrawDetail.winningNumber);

    return lottoNumber.reduce(
      (count, number) => (winningNumberSet.has(number) ? count + 1 : count),
      0,
    );
  }

  #isIncludingBonusNumber(lottoNumber) {
    return lottoNumber.includes(this.#lottoDrawDetail.bonusNumber);
  }
}

export default WinningRank;
