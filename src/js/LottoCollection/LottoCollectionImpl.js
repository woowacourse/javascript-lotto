import LottoCollection from './index.js';
import Lotto from './Lotto.js';
import { LOTTO_RULES, MATCH_COUNT_OF_LOTTO_RANKING } from '../constant/index.js';

export default class LottoCollectionImpl extends LottoCollection {
  constructor() {
    super();
    this.lottos = [];
  }

  createLottos(count) {
    for (let i = 0; i < count; i += 1) {
      this.lottos.push(new Lotto());
    }
  }

  matchResult(winningNumbers) {
    const winningNumberSet = new Set(winningNumbers.slice(0, LOTTO_RULES.BALL_COUNT));
    const bonusNumber = winningNumbers[LOTTO_RULES.BALL_COUNT];
    const initialValue = {
      [MATCH_COUNT_OF_LOTTO_RANKING.FIFHT]: 0,
      [MATCH_COUNT_OF_LOTTO_RANKING.FORUTH]: 0,
      [MATCH_COUNT_OF_LOTTO_RANKING.THRID]: 0,
      [MATCH_COUNT_OF_LOTTO_RANKING.SECOND]: 0,
      [MATCH_COUNT_OF_LOTTO_RANKING.FIRST]: 0,
    };

    return this.reducingMatchResult(winningNumberSet, bonusNumber, initialValue);
  }

  reducingMatchResult(winningNumberSet, bonusNumber, initialValue) {
    return this.lottos.reduce((acc, lotto) => {
      const matchCount = lotto.match(winningNumberSet, bonusNumber);

      if (matchCount >= MATCH_COUNT_OF_LOTTO_RANKING.FIFHT) {
        acc[matchCount] += 1;
      }

      return acc;
    }, initialValue);
  }

  getLottos() {
    return this.lottos.map(({ numbers }) => [...numbers]);
  }

  resetLottos() {
    this.lottos.length = 0;
  }

  isEmpty() {
    return this.lottos.length === 0;
  }
}
