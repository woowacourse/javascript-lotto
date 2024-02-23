import WINNER from '../constants/winner';

class LottoProcess {
  #matchLottoNumbers(lotto, winLotto) {
    const lottoNumbers = lotto.getNumbers();
    return lottoNumbers.filter((value) => winLotto.winNumbers.includes(value)).length;
  }

  #getWinRank(matchCount = 0, hasBonus = false) {
    console.log('matchCount', matchCount);
    console.log('hasBonus', hasBonus);
    if (matchCount === WINNER[5].MATCH_COUNT) return 5;
    if (matchCount === WINNER[4].MATCH_COUNT) return 4;
    if (matchCount === WINNER[3].MATCH_COUNT && !hasBonus) return 3;
    if (matchCount === WINNER[2].MATCH_COUNT && hasBonus) return 2;
    return 1;
  }

  #hasBonus(lotto = {}, bonusNumber = 0) {
    return lotto.getNumbers().includes(bonusNumber);
  }

  getResult(lottos = [], winLotto = {}) {
    const winResults = lottos.reduce(
      (winResult, lotto) => {
        const matchCount = this.#matchLottoNumbers(lotto, winLotto);
        if (this.isWinLotto(matchCount)) {
          const hasBonus = this.#hasBonus(lotto, winLotto.bonusNumber);
          const winRank = this.#getWinRank(matchCount, hasBonus);
          winResult[winRank - 1] += 1;
        }
        return winResult;
      },
      Array.from({ length: Object.keys(WINNER) }.length, () => 0)
    );
    return winResults;
  }

  isWinLotto(matchCount) {
    return matchCount >= WINNER[5].MATCH_COUNT;
  }
}

export default LottoProcess;
