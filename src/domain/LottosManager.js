import Lotto from './Lotto.js';
import { SETTING, RANKING } from '../constant/setting.js';

class LottosManager {
  #lottos;
  #winningResults = {
    6: 0,
    B5: 0,
    5: 0,
    4: 0,
    3: 0,
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
      const matchedKey = matchedNumbers === RANKING.B5.MATCHING_COUNT && isBonusMatched ? 'B5' : matchedNumbers;
      this.#winningResults[matchedKey] += 1;
    }
  }
}

export default LottosManager;
