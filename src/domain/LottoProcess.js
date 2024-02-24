import WINNER from '../constants/winner';

/**
 * @module LottoProcess 구매한 로또를 우승 로또와 비교하여 몇 등이 되었는지 확인해서 합산하는 모듈입니다.
 */

class LottoProcess {
  /**
   *
   * @param {Array[Lotto]} 구매한 로또 인스턴스를 담은 배열입니다.
   * @param {Lotto} 우승 로또의 인스턴스입니다.
   * @returns 최종적으로 모든 등수에서 몇개에 당첨되었는지를 계산하여 숫자로 1등부터 배열로 반환합니다.
   */
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

  #matchLottoNumbers(lotto, winLotto) {
    const lottoNumbers = lotto.numbers;
    return lottoNumbers.filter((value) => winLotto.winNumbers.includes(value)).length;
  }

  #getWinRank(matchCount = 0, hasBonus = false) {
    const winnerRank = Object.keys(WINNER);
    return winnerRank.find((rank) => {
      if (WINNER[rank].MATCH_COUNT === matchCount && WINNER[rank].IS_BONUS === hasBonus) return rank;
    });
  }

  #hasBonus(lotto = {}, bonusNumber = 0) {
    return lotto.numbers.includes(bonusNumber);
  }
}

export default LottoProcess;
