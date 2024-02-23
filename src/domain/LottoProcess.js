import WINNER from '../constants/winner';

class LottoProcess {
  #matchLottoNumbers(lotto, winLotto) {
    const lottoNumbers = lotto.getNumbers();
    return lottoNumbers.filter((value) => winLotto.winNumbers.includes(value)).length;
  }

  #getWinRank(matchCount = 0, hasBonus = false) {
    const winnerRank = Object.keys(WINNER);
    return winnerRank.find((rank) => {
      if (WINNER[rank].MATCH_COUNT === matchCount && WINNER[rank].IS_BONUS === hasBonus) return rank;
    });
  }

  #hasBonus(lotto = {}, bonusNumber = 0) {
    return lotto.getNumbers().includes(bonusNumber);
  }

  getResult(lottos = [], winLotto = {}) {
    const winResults = lottos.reduce(
      (winResult, lotto) => {
        const matchCount = this.#matchLottoNumbers(lotto, winLotto);
        const hasBonus = this.#hasBonus(lotto, winLotto.bonusNumber);
        const winRank = this.#getWinRank(matchCount, hasBonus);
        winResult[winRank - 1] += 1;
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
