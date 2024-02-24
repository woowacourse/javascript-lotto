import WINNER from '../constants/winner';

class LottoProcess {
  #lottos;

  constructor(lottos = []) {
    this.#lottos = lottos;
  }

  getRankIndex(matchCount = 0, matchBonus = false) {
    switch (matchCount) {
      case WINNER.FIFTH.MATCH_COUNT:  return WINNER.FIFTH.INDEX;
      case WINNER.FOURTH.MATCH_COUNT: return WINNER.FOURTH.INDEX;
      case WINNER.THIRD.MATCH_COUNT:  return matchBonus ? WINNER.THIRD.INDEX : WINNER.FIRST.INDEX; // THIRD 등수는 보너스 일치 여부에 따라 결정
      case WINNER.SECOND.MATCH_COUNT: return WINNER.SECOND.INDEX;
      default:  return WINNER.FIRST.INDEX;
    }
  }


  #hasBonus(lotto = {}, bonusNumber = 0) {
    return lotto.getNumbers().includes(bonusNumber);
  }

  mapWinningCountToPrizes(winningCount = []) {
    const RANK = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'];
    return winningCount
      .map((count, index) => {
        const currentRank = RANK[index];
        const { MATCH_COUNT, IS_BONUS, PRICE } = WINNER[currentRank];
        return [MATCH_COUNT, IS_BONUS, PRICE, count];
      })
      .reverse();
  }

  getResult(winLotto = {}, bonusNumber = 0) {
    const winningNubmer = this.#lottos.reduce((acc, lotto) => {
        const matchCount = lotto.matchLottoNumbers(winLotto);
        this.increaseLottoResult({matchCount, lotto, bonusNumber, acc})
        return acc;
      },
      Array.from({ length: Object.keys(WINNER).length }, () => 0)
    );
    return this.mapWinningCountToPrizes(winningNubmer);
  }

  increaseLottoResult({matchCount, lotto, bonusNumber, acc}) {
    if (matchCount >= WINNER.FIFTH.MATCH_COUNT) {
      const rankIndex = this.getRankIndex(matchCount, this.#hasBonus(lotto, bonusNumber));
      acc[rankIndex] += 1;
    }
  }

  getAllLottosNumbers() {
    return [...this.#lottos.map((lotto) => lotto.getNumbers())];
  }
}

export default LottoProcess;
