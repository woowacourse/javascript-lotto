import generateRandomNumbers from '../utils/random.js';
import repeatCallback from '../utils/repeat.js';
import Lotto from './Lotto.js';

export default class LottoBundle {
  constructor() {
    this.lottos = [];
  }

  pushLottoToBundle() {
    this.lottos.push(
      new Lotto(generateRandomNumbers({ count: 6, max: 45, min: 1 })),
    );
  }

  createLottoBundle(count) {
    repeatCallback(count, () => this.pushLottoToBundle());
  }
}
