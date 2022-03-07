import Lotto from './Lotto';
import { matchNumber } from './utils/util';
import { MIN_MATCH_NUMBER_FOR_PRIZE, MATCH_WINNING_NUMBER_INDEX } from './constants/constants';

export default class LottoManager {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  get lottos() {
    return this.#lottos;
  }

  generateNewLottos(count) {
    let currentCount;
    for (currentCount = 0; currentCount < count; currentCount += 1) {
      this.#lottos.push(new Lotto());
    }
  }

  checkWinnerLotto(winnerNumbers, bonusNumber) {
    this.matchResult = [0, 0, 0, 0, 0];
    this.#lottos.forEach(lotto => {
      const lottoArray = [...lotto.numbers];
      const totalMatch = matchNumber(lottoArray, winnerNumbers);
      if (totalMatch >= MIN_MATCH_NUMBER_FOR_PRIZE) this.#updateResult(totalMatch, lottoArray.includes(bonusNumber));
    });
    return this.matchResult;
  }

  #updateResult(totalMatch, isBonusMatch) {
    let totalMatchResult = totalMatch;
    if (totalMatch === 5 && isBonusMatch) totalMatchResult = '5_AND_BONUS_MATCH';
    this.matchResult[MATCH_WINNING_NUMBER_INDEX[totalMatchResult]] += 1;
  }
}
