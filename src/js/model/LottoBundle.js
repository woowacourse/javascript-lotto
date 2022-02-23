import generateRandomNumbers from '../utils/random.js';
import Lotto from './Lotto.js';

export default class LottoBundle {
  constructor() {
    this.lottos = [];
  }

  createLottoBundle(count) {
    for (let index = 0; index < count; index += 1) {
      this.lottos.push(
        new Lotto(generateRandomNumbers({ count: 6, max: 45, min: 1 })),
      );
    }
  }
}
