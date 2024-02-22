import Lotto from './Lotto.js';
import { RANKING } from '../constant/setting.js';

class Lottos {
  #lottos;
  #winningCriteria;

  constructor(lottoList) {
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
    this.#winningCriteria = this.#initWinningCriteria();
  }

  getWinningResults(winningNumbers, bonusNumber) {
    const winningResults = this.#initWinningResults();
    this.#lottos.forEach((lotto) => {
      const ranking = this.#getRanking(lotto, winningNumbers, bonusNumber);
      if (ranking) winningResults[ranking] += 1;
    });
    return winningResults;
  }

  #getRanking(lotto, winningNumbers, bonusNumber) {
    const matchedNumbers = lotto.countMatchedNumbers(winningNumbers);
    if (matchedNumbers === RANKING.SECOND.MATCHING_COUNT && lotto.hasNumber(bonusNumber)) {
      return RANKING.SECOND.NAME;
    }
    return this.#winningCriteria[matchedNumbers >= 3 ? matchedNumbers : undefined];
  }

  #initWinningResults() {
    return Object.values(RANKING).reduce((initRankingObject, { NAME }) => {
      return { ...initRankingObject, [NAME]: 0 };
    }, {});
  }

  #initWinningCriteria() {
    return Object.values(RANKING).reduce((rankingMatchObject, { NAME, MATCHING_COUNT }) => {
      if (NAME === RANKING.SECOND.NAME) {
        return rankingMatchObject;
      }
      return { ...rankingMatchObject, [MATCHING_COUNT]: NAME };
    }, {});
  }
}

export default Lottos;
