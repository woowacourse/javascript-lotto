class WinningRank {
  static RANK_RULE = {
    '1st': { match: 6, hasBonus: false, description: '6개 일치' },
    '2nd': { match: 5, hasBonus: true, description: '5개 일치, 보너스 볼 일치' },
    '3rd': { match: 5, hasBonus: false, description: '5개 일치' },
    '4th': { match: 4, hasBonus: false, description: '4개 일치' },
    '5th': { match: 3, hasBonus: false, description: '3개 일치' },
  };

  #lottoDrawDetail;

  #winningRankResult = {
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
    }, this.#winningRankResult);
  }

  #determineRank(lottoNumber) {
    const matchCount = this.#countMatchingNumbers(lottoNumber);

    const [rank] = Object.entries(WinningRank.RANK_RULE).find(
      ([, { match, hasBonus }]) =>
        matchCount === match && this.#isIncludingBonusNumber(lottoNumber) === hasBonus,
    );

    return rank ?? null;
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
