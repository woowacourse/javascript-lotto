import Lotto from './Lotto.js';
import { SETTING, RANKING } from '../constant/setting.js';

class LottosManager {
  #lottos;

  constructor(lottoList) {
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
  }

  getWinningResults(winningNumbers, bonusNumber) {
    const winningResults = {
      3: 0,
      4: 0,
      5: 0,
      B5: 0,
      6: 0,
    };

    this.#lottos.forEach((lotto) => {
      const matchedNumbers = lotto.countMatchedNumbers(winningNumbers);
      const isBonusMatched = lotto.hasNumber(bonusNumber);
      this.#updateWinningResults(winningResults, matchedNumbers, isBonusMatched);
    });
    return winningResults;
  }

  #updateWinningResults(winningResults, matchedNumbers, isBonusMatched) {
    if (matchedNumbers >= SETTING.MIN_RANKING_MATCHING_NUMBER) {
      const matchedKey = matchedNumbers === RANKING.B5.MATCHING_COUNT && isBonusMatched ? 'B5' : matchedNumbers;
      winningResults[matchedKey] += 1;
    }
  }
}

export default LottosManager;
