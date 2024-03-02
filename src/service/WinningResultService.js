import { SETTING, RANKING } from '../constant/setting';

class WinningResultService {
  #lottos;
  #winningCriteria;
  #winningResult;

  constructor(lottos, { winningNumbers, bonusNumber }) {
    this.#lottos = lottos;
    this.#winningCriteria = this.#createWinningCriteria();
    this.#winningResult = this.#createWinningResult();
    this.#calculateWinningResult(winningNumbers, bonusNumber);
  }

  getWinningResult() {
    return { ...this.#winningResult };
  }

  getProfitRate() {
    const totalProfit = Object.entries(this.#winningResult).reduce(
      (profit, [ranking, count]) => profit + RANKING[ranking].REWARD * count,
      0,
    );
    const profitRate = (totalProfit * 100) / (this.#lottos.length * SETTING.LOTTO_PRICE);
    return profitRate.toFixed(1);
  }

  #calculateWinningResult(winningNumbers, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      const matchedNumbers = lotto.countMatchedNumbers(winningNumbers);
      const hasBonusNumber = lotto.hasNumber(bonusNumber);
      this.#addRankingCount(matchedNumbers, hasBonusNumber);
    });
  }

  #addRankingCount(matchedNumbers, hasBonusNumber) {
    if (matchedNumbers >= SETTING.MIN_RANKING_MATCHING_NUMBER) {
      const rankingKey =
        matchedNumbers === RANKING.SECOND.MATCHING_COUNT && hasBonusNumber
          ? RANKING.SECOND.NAME
          : this.#winningCriteria[matchedNumbers];
      this.#winningResult[rankingKey] += 1;
    }
  }

  #createWinningResult() {
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

export default WinningResultService;
