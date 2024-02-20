class LottoProcess {
  #lottos;

  constructor(lottos) {
    this.#lottos = lottos;
  }

  matchLottoNumbers(lotto, winLotto) {
    const lottoNumbers = lotto.getNumbers();
    return lottoNumbers.filter((value) => winLotto.getNumbers().includes(value))
      .length;
  }

  getResult(winLotto = {}, bonusNumber = 0) {
    return this.#lottos.reduce(
      (acc, cur) => {
        const matchCount = this.matchLottoNumbers(cur, winLotto);
        if (matchCount >= 3) {
          const rankIndex = this.#getRankIndex(
            matchCount,
            this.#hasBonus(cur, bonusNumber)
          );
          acc[rankIndex] += 1;
        }
        return acc;
      },
      [0, 0, 0, 0, 0]
    );
  }

  #getRankIndex(matchCount, matchBonus) {
    if (matchCount === 3) {
      return 0;
    } else if (matchCount === 4) {
      return 1;
    } else if (matchCount === 5 && matchBonus) {
      return 3;
    } else if (matchCount === 5) {
      return 2;
    }
    return 4;
  }

  #hasBonus(lotto = {}, bonusNumber = 0) {
    return lotto.getNumbers().includes(bonusNumber);
  }
}

export default LottoProcess;
