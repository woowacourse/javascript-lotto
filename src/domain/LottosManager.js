import Lotto from './Lotto.js';
import { SETTING, RANKING } from '../constant/setting.js';

class LottosManager {
  #lottos;
  #winningResults = {
    6: { title: 'FIRST', count: 0 },
    B5: { title: 'SECOND', count: 0 },
    5: { title: 'THIRD', count: 0 },
    4: { title: 'FOURTH', count: 0 },
    3: { title: 'FIFTH', count: 0 },
  };

  constructor(lottoList) {
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
  }

  getWinningResults(winningNumbers, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      const matchedNumbers = lotto.countMatchedNumbers(winningNumbers);
      const isBonusMatched = lotto.hasNumber(bonusNumber);
      this.#updateWinningResults(matchedNumbers, isBonusMatched);
    });
    return this.#winningResults;
  }

  #updateWinningResults(matchedNumbers, isBonusMatched) {
    if (matchedNumbers >= SETTING.MIN_RANKING_MATCHING_NUMBER) {
      const ranking = matchedNumbers === RANKING.SECOND.MATCHING_COUNT && isBonusMatched ? 'B5' : matchedNumbers;
      this.#winningResults[ranking].count += 1;
    }
  }
}

export default LottosManager;
