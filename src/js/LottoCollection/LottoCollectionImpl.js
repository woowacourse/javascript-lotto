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
    const { FIFTH, FORUTH, THIRD, SECOND, FIRST } = MATCH_COUNT_OF_LOTTO_RANKING;

    return {
      [FIFTH]: this.countingMatchedLotto(winningNumberSet, bonusNumber, FIFTH),
      [FORUTH]: this.countingMatchedLotto(winningNumberSet, bonusNumber, FORUTH),
      [THIRD]: this.countingMatchedLotto(winningNumberSet, bonusNumber, THIRD),
      [SECOND]: this.countingMatchedLotto(winningNumberSet, bonusNumber, SECOND),
      [FIRST]: this.countingMatchedLotto(winningNumberSet, bonusNumber, FIRST),
    };
  }

  countingMatchedLotto(winningNumberSet, bonusNumber, matchCount) {
    return this.lottos.filter((lotto) => lotto.match(winningNumberSet, bonusNumber) === matchCount)
      .length;
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
