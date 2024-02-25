import Lotto from './Lotto';
import { SETTING, RANKING } from '../constant/setting';

class Lottos {
  #lottos;
  #winningCriteria;
  #winningResults;

  constructor(lottoList) {
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
    this.#winningCriteria = this.#createWinningCriteria();
    this.#winningResults = this.#createWinningResults();
  }

  getWinningResults(winningNumbers, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      const matchedNumbers = lotto.countMatchedNumbers(winningNumbers);
      const hasBonusNumber = lotto.hasNumber(bonusNumber);
      this.#updateRanking(matchedNumbers, hasBonusNumber);
    });
    return { ...this.#winningResults };
  }

  #updateRanking(matchedNumbers, hasBonusNumber) {
    if (matchedNumbers >= SETTING.MIN_RANKING_MATCHING_NUMBER) {
      const rankingKey =
        matchedNumbers === RANKING.SECOND.MATCHING_COUNT && hasBonusNumber
          ? RANKING.SECOND.NAME
          : this.#winningCriteria[matchedNumbers];
      this.#winningResults[rankingKey] += 1;
    }
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
