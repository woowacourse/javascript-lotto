class WinningRank {
  #lottoDrawDetail;

  #winningRankDetail = {
    '1st': 0,
    '2nd': 0,
    '3rd': 0,
    '4th': 0,
    '5th': 0,
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

    if (matchCount === 6) return '1st';
    if (matchCount === 5 && this.#isIncludingBonusNumber(lottoNumber)) return '2nd';
    if (matchCount === 5) return '3rd';
    if (matchCount === 4) return '4th';
    if (matchCount === 3) return '5th';
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
