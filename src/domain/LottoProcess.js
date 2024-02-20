import { WINNER } from '../constants/number';

class LottoProcess {
  #lottos;

  constructor(lottos) {
    this.#lottos = lottos;
  }

  getResult(winLotto = {}, bonusNumber = 0) {
    return this.#lottos.reduce(
      (acc, lotto) => {
        const matchCount = this.matchLottoNumbers(lotto, winLotto);
        if (matchCount >= WINNER.FIFTH.MATCH_COUNT) {
          const hasBonus = this.#hasBonus(lotto, bonusNumber);
          const rankIndex = this.#getRankIndex(matchCount, hasBonus);
          acc[rankIndex] += 1;
        }
        return acc;
      },
      [0, 0, 0, 0, 0]
    );
  }

  matchLottoNumbers(lotto, winLotto) {
    const lottoNumbers = lotto.getNumbers();
    return lottoNumbers.filter((value) => winLotto.getNumbers().includes(value))
      .length;
  }

  #getRankIndex(matchCount, matchBonus) {
    if (matchCount === WINNER.FIFTH.MATCH_COUNT) {
      return WINNER.FIFTH.INDEX;
    } else if (matchCount === WINNER.FOURTH.MATCH_COUNT) {
      return WINNER.FOURTH.INDEX;
    } else if (matchCount === WINNER.THIRD.MATCH_COUNT && matchBonus) {
      return WINNER.THIRD.INDEX;
    } else if (matchCount === WINNER.SECOND.MATCH_COUNT) {
      return WINNER.SECOND.INDEX;
    }
    return WINNER.FIRST.INDEX;
  }

  #hasBonus(lotto = {}, bonusNumber = 0) {
    return lotto.getNumbers().includes(bonusNumber);
  }
}

export default LottoProcess;
