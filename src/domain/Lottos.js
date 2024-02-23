import Lotto from './Lotto';
import { SETTING, RANKING } from '../constant/setting';

class Lottos {
  #lottos;
  #winningCriteria;

  constructor(lottoList) {
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
    this.#winningCriteria = this.#createWinningCriteria();
  }

  getWinningResults(winningNumbers, bonusNumber) {
    const winningResults = this.#createWinningResults();
    this.#lottos.forEach((lotto) => {
      const ranking = this.#getRanking(lotto, winningNumbers, bonusNumber);
      if (ranking in winningResults) {
        winningResults[ranking] += 1;
      }
    });
    return winningResults;
  }

  #getRanking(lotto, winningNumbers, bonusNumber) {
    const matchedNumbers = lotto.countMatchedNumbers(winningNumbers);
    if (matchedNumbers === RANKING.SECOND.MATCHING_COUNT && lotto.hasNumber(bonusNumber)) {
      return RANKING.SECOND.NAME;
    }
    return this.#winningCriteria[matchedNumbers >= SETTING.MIN_RANKING_MATCHING_NUMBER ? matchedNumbers : ''];
  }

  #createWinningResults() {
    return Object.values(RANKING).reduce((initRankingObject, { NAME }) => ({ ...initRankingObject, [NAME]: 0 }), {});
  }

  #createWinningCriteria() {
    return Object.values(RANKING).reduce((rankingMatchObject, { NAME, MATCHING_COUNT }) => {
      if (NAME === RANKING.SECOND.NAME) {
        return rankingMatchObject;
      }
      return { ...rankingMatchObject, [MATCHING_COUNT]: NAME };
    }, {});
  }
}

export default Lottos;
