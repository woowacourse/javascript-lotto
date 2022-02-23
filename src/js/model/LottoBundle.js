import generateRandomNumbers from '../utils/random.js';
import repeatCallback from '../utils/repeat.js';
import Lotto from './Lotto.js';
import LOTTO from '../constants/lotto.js';

export default class LottoBundle {
  constructor() {
    this.lottos = [];
  }

  pushLottoToBundle() {
    this.lottos.push(
      new Lotto(
        generateRandomNumbers({
          count: LOTTO.NUMBER_COUNT,
          max: LOTTO.MAX_NUMBER,
          min: LOTTO.MIN_NUMBER,
        }),
      ),
    );
  }

  createLottoBundle(count) {
    repeatCallback(count, () => this.pushLottoToBundle());
  }
}
